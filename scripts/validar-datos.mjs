#!/usr/bin/env node
/**
 * Valida `datos/` (`npm run validar`). Corre también dentro de `npm run build`.
 *
 * Comprueba:
 *   1. que cada archivo cumple su esquema (`src/lib/compartido/esquemas.js`, el mismo que usa Astro);
 *   2. que todos los ids referenciados existen y que no hay ids ni slugs repetidos;
 *   3. que existe el plan con un precio mayor que 0 y que nada más en `datos/` lleva precio, costo o paquete
 *      (el valor del precio no se repite aquí: vive solo en `datos/ajustes.json`);
 *   4. que cada prerrequisito aparece antes en su ruta (rutas de área y rutas esperadas de los perfiles) y, en las
 *      áreas con roadmap (`etapas`), que la ruta son los cursos de las etapas en orden y ningún curso necesita
 *      algo de una etapa posterior;
 *   5. que hay al menos 2 perfiles de ciberseguridad (área con etapas) con roadmaps esperados distintos;
 *   6. que, con los interruptores de `ajustes.json` (`ocultarDatosPersonales`, `ocultarRiesgoAlto`), ningún curso
 *      visible queda sin lecciones y ningún perfil espera una lección oculta;
 *   7. que cada color de escuela permitido (`COLORES_ESCUELA`) tiene su token `--color-<color>` en
 *      `src/styles/global.css` (si faltara, la escuela se vería en tinta sin avisar).
 *
 * Termina con código 1 si encuentra errores. No modifica nada.
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  COLORES_ESCUELA,
  esquemaAjustes,
  esquemaCurso,
  esquemaDiagnostico,
  esquemaEscuela,
  esquemaFuentes,
  esquemaOrientacion,
  esquemaPerfil,
} from '../src/lib/compartido/esquemas.js';
import { cursoOculto, leccionOculta } from '../src/lib/compartido/visibilidad.js';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATOS = path.join(RAIZ, 'datos');

/** Nombres de campo que delatan un precio fuera del plan. */
const CAMPO_DE_PRECIO = /precio|costo|paquete|price|cost/i;

const errores = [];
const error = (donde, mensaje) => errores.push(`${donde}: ${mensaje}`);

async function leerJson(rutaRelativa) {
  try {
    return JSON.parse(await readFile(path.join(DATOS, rutaRelativa), 'utf8'));
  } catch (e) {
    error(`datos/${rutaRelativa}`, `no se pudo leer (${e.message})`);
    return undefined;
  }
}

/** Valida con un esquema y anota cada problema con su ruta dentro del archivo. */
function validarEsquema(esquema, datos, archivo) {
  if (datos === undefined) return undefined;
  const resultado = esquema.safeParse(datos);
  if (resultado.success) return resultado.data;
  for (const problema of resultado.error.issues) {
    const ruta = problema.path.length ? ` → ${problema.path.join('.')}` : '';
    error(`datos/${archivo}${ruta}`, problema.message);
  }
  return undefined;
}

/** Busca campos de precio en cualquier nivel de un objeto. */
function buscarPrecios(valor, archivo, ruta = []) {
  if (Array.isArray(valor)) valor.forEach((v, i) => buscarPrecios(v, archivo, [...ruta, i]));
  else if (valor && typeof valor === 'object') {
    for (const [clave, v] of Object.entries(valor)) {
      if (CAMPO_DE_PRECIO.test(clave)) error(`datos/${archivo} → ${[...ruta, clave].join('.')}`, 'solo el plan de ajustes.json puede tener precio');
      buscarPrecios(v, archivo, [...ruta, clave]);
    }
  }
}

function repetidos(lista) {
  const vistos = new Set();
  return [...new Set(lista.filter((x) => vistos.size === vistos.add(x).size))];
}

async function main() {
  // ── 1. Esquemas ───────────────────────────────────────────────────────────
  const ajustesCrudos = await leerJson('ajustes.json');
  const ajustes = validarEsquema(esquemaAjustes, ajustesCrudos, 'ajustes.json');
  const fuentesCrudas = await leerJson('fuentes.json');
  const fuentes = validarEsquema(esquemaFuentes, fuentesCrudas, 'fuentes.json') ?? [];
  const escuelasCrudas = await leerJson('escuelas.json');
  const escuelas = (Array.isArray(escuelasCrudas) ? escuelasCrudas : [])
    .map((e, i) => validarEsquema(esquemaEscuela, e, `escuelas.json → ${i}`))
    .filter(Boolean);
  if (!Array.isArray(escuelasCrudas)) error('datos/escuelas.json', 'debe ser una lista de escuelas');

  const archivosCursos = (await readdir(path.join(DATOS, 'cursos'))).filter((f) => f.endsWith('.json')).sort();
  const cursosCrudos = [];
  const cursos = [];
  for (const archivo of archivosCursos) {
    const crudo = await leerJson(`cursos/${archivo}`);
    cursosCrudos.push([`cursos/${archivo}`, crudo]);
    const curso = validarEsquema(esquemaCurso, crudo, `cursos/${archivo}`);
    if (!curso) continue;
    if (`${curso.id}.json` !== archivo) error(`datos/cursos/${archivo}`, `el archivo debe llamarse «${curso.id}.json»`);
    cursos.push(curso);
  }

  const orientacionCruda = await leerJson('orientacion.json');
  const orientacion = validarEsquema(esquemaOrientacion, orientacionCruda, 'orientacion.json');

  const archivosDiag = (await readdir(path.join(DATOS, 'diagnosticos'))).filter((f) => f.endsWith('.json')).sort();
  const diagnosticosCrudos = [];
  const diagnosticos = [];
  for (const archivo of archivosDiag) {
    const crudo = await leerJson(`diagnosticos/${archivo}`);
    diagnosticosCrudos.push([`diagnosticos/${archivo}`, crudo]);
    const diag = validarEsquema(esquemaDiagnostico, crudo, `diagnosticos/${archivo}`);
    if (!diag) continue;
    if (`${diag.area}.json` !== archivo) error(`datos/diagnosticos/${archivo}`, `el archivo debe llamarse «${diag.area}.json»`);
    diagnosticos.push(diag);
  }

  const perfilesCrudos = await leerJson('perfiles-demo.json');
  const perfiles = (Array.isArray(perfilesCrudos) ? perfilesCrudos : [])
    .map((p, i) => validarEsquema(esquemaPerfil, p, `perfiles-demo.json → ${i}`))
    .filter(Boolean);
  if (!Array.isArray(perfilesCrudos)) error('datos/perfiles-demo.json', 'debe ser una lista de perfiles');

  // ── 2. Ids únicos y referencias ───────────────────────────────────────────
  const areas = escuelas.flatMap((e) => e.areas.map((a) => ({ ...a, escuela: e.id })));
  const idsFuentes = new Set(fuentes.map((f) => f.id));
  const idsEscuelas = new Set(escuelas.map((e) => e.id));
  const areasPorId = new Map(areas.map((a) => [a.id, a]));
  const cursosPorId = new Map(cursos.map((c) => [c.id, c]));
  const modulos = new Map();
  const lecciones = new Map();

  for (const id of repetidos(fuentes.map((f) => f.id))) error('datos/fuentes.json', `id repetido «${id}»`);
  for (const id of repetidos(escuelas.map((e) => e.id))) error('datos/escuelas.json', `escuela repetida «${id}»`);
  for (const id of repetidos(areas.map((a) => a.id))) error('datos/escuelas.json', `área repetida «${id}»`);
  for (const f of fuentes) if (f.escuela && !idsEscuelas.has(f.escuela)) error('datos/fuentes.json', `«${f.id}» apunta a la escuela «${f.escuela}», que no existe`);

  for (const area of areas) {
    const donde = `datos/escuelas.json → área «${area.id}»`;
    for (const id of repetidos(area.cursos)) error(donde, `curso repetido «${id}» en cursos`);
    for (const id of repetidos(area.ruta)) error(donde, `curso repetido «${id}» en ruta`);
    for (const id of area.cursos) {
      const curso = cursosPorId.get(id);
      if (!curso) error(donde, `el curso «${id}» no existe en datos/cursos/`);
      else if (!curso.areas.includes(area.id)) error(donde, `lista «${id}», pero ese curso no tiene «${area.id}» en sus áreas`);
    }
    for (const id of area.ruta) if (!area.cursos.includes(id)) error(donde, `la ruta incluye «${id}», que no está en los cursos del área`);
  }

  for (const curso of cursos) {
    const donde = `datos/cursos/${curso.id}.json`;
    if (!idsEscuelas.has(curso.escuela)) error(donde, `la escuela «${curso.escuela}» no existe`);
    for (const a of curso.areas) {
      const area = areasPorId.get(a);
      if (!area) error(donde, `el área «${a}» no existe`);
      else if (!area.cursos.includes(curso.id)) error(donde, `dice pertenecer a «${a}», pero esa área no lo lista`);
    }
    for (const p of curso.prerrequisitos) if (!cursosPorId.has(p)) error(donde, `el prerrequisito «${p}» no existe`);
    if (curso.estado === 'proximamente') {
      if (curso.modulos.length) error(donde, 'un curso «proximamente» no lleva módulos (solo ficha)');
      if (curso.minutosEstimados === null) error(donde, 'un curso «proximamente» necesita minutosEstimados');
    } else {
      if (!curso.modulos.length) error(donde, `un curso «${curso.estado}» necesita al menos un módulo`);
      if (curso.minutosEstimados !== null) error(donde, 'minutosEstimados es solo para cursos «proximamente» (usa null)');
    }
    const slugs = [];
    for (const modulo of curso.modulos) {
      if (!modulo.id.startsWith(`${curso.id}/`)) error(donde, `el módulo «${modulo.id}» debe empezar con «${curso.id}/»`);
      if (modulos.has(modulo.id)) error(donde, `módulo repetido «${modulo.id}»`);
      modulos.set(modulo.id, { modulo, curso });
      for (const leccion of modulo.lecciones) {
        slugs.push(leccion.slug);
        if (leccion.id !== `${curso.id}/${leccion.slug}`) error(donde, `la lección «${leccion.id}» debe tener el id «${curso.id}/${leccion.slug}»`);
        if (lecciones.has(leccion.id)) error(donde, `lección repetida «${leccion.id}»`);
        lecciones.set(leccion.id, { leccion, curso, modulo });
        if (!idsFuentes.has(leccion.fuente)) error(donde, `la fuente «${leccion.fuente}» de «${leccion.slug}» no existe en fuentes.json`);
        if (leccion.ruta === null && !leccion.enPreparacion) error(donde, `«${leccion.slug}» no tiene ruta y no está en preparación`);
        if (leccion.bloquesExtra && !leccion.seccion) error(donde, `«${leccion.slug}» tiene bloquesExtra pero no seccion (solo sirven en notas partidas)`);
      }
    }
    for (const slug of repetidos(slugs)) error(donde, `slug repetido «${slug}»`);
  }

  if (orientacion) {
    for (const id of repetidos(orientacion.preguntas.map((p) => p.id))) error('datos/orientacion.json', `pregunta repetida «${id}»`);
    for (const pregunta of orientacion.preguntas) {
      for (const id of repetidos(pregunta.opciones.map((o) => o.id))) error('datos/orientacion.json', `opción repetida «${id}» en «${pregunta.id}»`);
      for (const opcion of pregunta.opciones) {
        for (const e of Object.keys(opcion.suma.escuelas)) if (!idsEscuelas.has(e)) error('datos/orientacion.json', `«${pregunta.id}/${opcion.id}» suma a la escuela «${e}», que no existe`);
        for (const a of Object.keys(opcion.suma.areas)) if (!areasPorId.has(a)) error('datos/orientacion.json', `«${pregunta.id}/${opcion.id}» suma al área «${a}», que no existe`);
      }
    }
    for (const caso of orientacion.casosDePrueba) {
      validarRespuestas(orientacion.preguntas, caso.respuestas, `datos/orientacion.json → caso «${caso.nombre}»`);
      validarOrientacionEsperada(caso.esperado, `datos/orientacion.json → caso «${caso.nombre}»`, idsEscuelas, areasPorId);
    }
  }

  const diagnosticoPorArea = new Map();
  for (const diag of diagnosticos) {
    const donde = `datos/diagnosticos/${diag.area}.json`;
    const area = areasPorId.get(diag.area);
    if (!area) {
      error(donde, `el área «${diag.area}» no existe`);
      continue;
    }
    diagnosticoPorArea.set(diag.area, diag);
    for (const id of repetidos(diag.preguntas.map((p) => p.id))) error(donde, `pregunta repetida «${id}»`);
    for (const pregunta of diag.preguntas) {
      for (const id of repetidos(pregunta.opciones.map((o) => o.id))) error(donde, `opción repetida «${id}» en «${pregunta.id}»`);
      for (const opcion of pregunta.opciones) {
        const d = `${donde} → ${pregunta.id}/${opcion.id}`;
        const e = opcion.efectos;
        if (e.cursoInicio && !area.ruta.includes(e.cursoInicio)) error(d, `cursoInicio «${e.cursoInicio}» no está en la ruta del área`);
        for (const id of e.omitirLecciones ?? []) if (!lecciones.has(id)) error(d, `la lección «${id}» no existe`);
        for (const id of e.omitirModulos ?? []) if (!modulos.has(id)) error(d, `el módulo «${id}» no existe`);
        for (const id of e.omitirCursos ?? []) if (!cursosPorId.has(id)) error(d, `el curso «${id}» no existe`);
        for (const id of e.agregarCursos ?? []) if (!cursosPorId.has(id)) error(d, `el curso «${id}» no existe`);
        const idsEtapas = new Set((area.etapas ?? []).map((x) => x.id));
        for (const id of [...(e.etapasOpcionales ?? []), ...(e.etapasPrimero ?? [])]) {
          if (!area.etapas) error(d, `etapasOpcionales y etapasPrimero solo valen en áreas con etapas («${diag.area}» no tiene)`);
          else if (!idsEtapas.has(id)) error(d, `la etapa «${id}» no existe en el área`);
        }
        if (area.etapas) {
          for (const id of e.agregarCursos ?? []) if (!area.ruta.includes(id)) error(d, `agregarCursos «${id}»: en un área con etapas, el curso debe estar en alguna etapa`);
        }
      }
    }
  }

  for (const id of repetidos(perfiles.map((p) => p.id))) error('datos/perfiles-demo.json', `perfil repetido «${id}»`);
  for (const perfil of perfiles) {
    const donde = `datos/perfiles-demo.json → «${perfil.id}»`;
    if (orientacion) validarRespuestas(orientacion.preguntas, perfil.respuestasOrientacion, `${donde} → respuestasOrientacion`);
    validarOrientacionEsperada(perfil.orientacionEsperada, `${donde} → orientacionEsperada`, idsEscuelas, areasPorId);
    const diag = diagnosticoPorArea.get(perfil.area);
    if (!diag) error(donde, `el área «${perfil.area}» no tiene diagnóstico`);
    else validarRespuestas(diag.preguntas, perfil.respuestasDiagnostico, `${donde} → respuestasDiagnostico`);

    const r = perfil.resultadoEsperado;
    for (const id of r.cursos) if (!cursosPorId.has(id)) error(donde, `el curso «${id}» de la ruta no existe`);
    for (const { curso } of r.cursosOmitidos) if (!cursosPorId.has(curso)) error(donde, `el curso omitido «${curso}» no existe`);
    for (const { leccion } of r.leccionesOmitidas) if (!lecciones.has(leccion)) error(donde, `la lección omitida «${leccion}» no existe`);
    r.semanas.forEach((semana, i) => {
      if (semana.numero !== i + 1) error(donde, `las semanas deben ir numeradas 1, 2, 3… (la ${i + 1}.ª dice ${semana.numero})`);
      for (const id of semana.lecciones) {
        if (id.startsWith('curso:')) {
          const curso = cursosPorId.get(id.slice(6));
          if (!curso) error(donde, `semana ${semana.numero}: el curso «${id.slice(6)}» no existe`);
          else if (curso.estado !== 'proximamente') error(donde, `semana ${semana.numero}: «${id}» solo vale para cursos «proximamente»`);
        } else if (!lecciones.has(id)) error(donde, `semana ${semana.numero}: la lección «${id}» no existe`);
      }
    });
    if (r.totalSemanas !== r.semanas.length) error(donde, `totalSemanas (${r.totalSemanas}) no coincide con las semanas listadas (${r.semanas.length})`);

    const areaPerfil = areasPorId.get(perfil.area);
    if (areaPerfil?.etapas && !perfil.roadmapEsperado) error(donde, `el área «${perfil.area}» tiene etapas: falta roadmapEsperado`);
    if (!areaPerfil?.etapas && perfil.roadmapEsperado) error(donde, `el área «${perfil.area}» no tiene etapas: quita roadmapEsperado`);
    if (areaPerfil?.etapas && perfil.roadmapEsperado) {
      const rm = perfil.roadmapEsperado;
      const idsEtapas = areaPerfil.etapas.map((x) => x.id);
      if ([...rm.etapas.map((x) => x.id)].sort().join() !== [...idsEtapas].sort().join()) error(donde, 'roadmapEsperado debe listar cada etapa del área una vez');
      for (const etapa of rm.etapas) {
        const definida = areaPerfil.etapas.find((x) => x.id === etapa.id);
        for (const c of etapa.cursos) if (definida && !definida.cursos.includes(c)) error(donde, `la etapa «${etapa.id}» no incluye el curso «${c}»`);
      }
      if (rm.totalSemanas !== r.totalSemanas) error(donde, `roadmapEsperado.totalSemanas (${rm.totalSemanas}) no coincide con resultadoEsperado (${r.totalSemanas})`);
    }
  }

  // ── 3. Precio: solo el plan ───────────────────────────────────────────────
  if (ajustesCrudos && typeof ajustesCrudos === 'object') {
    // El esquema ya exige `plan` con `precio` numérico > 0; esto da un mensaje claro si falta.
    const plan = ajustesCrudos.plan;
    if (!plan || typeof plan !== 'object') error('datos/ajustes.json', 'falta el «plan» (el único producto de Pista)');
    else if (typeof plan.precio !== 'number' || !(plan.precio > 0)) error('datos/ajustes.json → plan.precio', 'debe ser un número mayor que 0');
    const restoAjustes = Object.fromEntries(Object.entries(ajustesCrudos).filter(([clave]) => clave !== 'plan'));
    buscarPrecios(restoAjustes, 'ajustes.json');
  }
  buscarPrecios(fuentesCrudas, 'fuentes.json');
  buscarPrecios(escuelasCrudas, 'escuelas.json');
  for (const [archivo, crudo] of cursosCrudos) buscarPrecios(crudo, archivo);
  buscarPrecios(orientacionCruda, 'orientacion.json');
  for (const [archivo, crudo] of diagnosticosCrudos) buscarPrecios(crudo, archivo);
  buscarPrecios(perfilesCrudos, 'perfiles-demo.json');

  // ── 4. Prerrequisitos antes en su ruta ────────────────────────────────────
  const revisarOrden = (ruta, donde) => {
    ruta.forEach((id, i) => {
      for (const previo of cursosPorId.get(id)?.prerrequisitos ?? []) {
        const j = ruta.indexOf(previo);
        if (j > i) error(donde, `«${previo}» es prerrequisito de «${id}» y debe ir antes en la ruta`);
      }
    });
  };
  for (const area of areas) revisarOrden(area.ruta, `datos/escuelas.json → ruta de «${area.id}»`);
  for (const area of areas.filter((a) => a.etapas)) {
    const donde = `datos/escuelas.json → etapas de «${area.id}»`;
    for (const id of repetidos(area.etapas.map((e) => e.id))) error(donde, `etapa repetida «${id}»`);
    const enEtapas = area.etapas.flatMap((e) => e.cursos);
    for (const id of repetidos(enEtapas)) error(donde, `el curso «${id}» está en más de una etapa`);
    for (const id of enEtapas) if (!area.cursos.includes(id)) error(donde, `«${id}» no está en los cursos del área`);
    if (enEtapas.join() !== area.ruta.join()) error(donde, 'la ruta del área debe ser exactamente los cursos de las etapas, en el mismo orden');
    // Cada curso necesita solo cosas de su etapa (antes que él) o de etapas anteriores: así ningún prerrequisito se agrega fuera de las etapas.
    revisarOrden(enEtapas, donde);
  }
  for (const perfil of perfiles) revisarOrden(perfil.resultadoEsperado.cursos, `datos/perfiles-demo.json → ruta de «${perfil.id}»`);

  // ── 5. Al menos 2 perfiles de ciberseguridad con roadmaps distintos ───────
  const conRoadmap = perfiles.filter((p) => areasPorId.get(p.area)?.etapas && p.roadmapEsperado);
  const roadmapsDistintos = new Set(conRoadmap.map((p) => JSON.stringify(p.roadmapEsperado)));
  if (conRoadmap.length < 2 || roadmapsDistintos.size < 2) {
    error('datos/perfiles-demo.json', `hacen falta al menos 2 perfiles de ciberseguridad (área con etapas) con roadmaps distintos; hay ${conRoadmap.length} perfil(es) con ${roadmapsDistintos.size} roadmap(s) distinto(s)`);
  }
  for (const p of perfiles) {
    const esDeTecnologia = areasPorId.get(p.area)?.escuela === 'tecnologia';
    if (p.esTecnologia !== esDeTecnologia) error(`datos/perfiles-demo.json → «${p.id}»`, `esTecnologia dice ${p.esTecnologia}, pero su área es de ${areasPorId.get(p.area)?.escuela}`);
  }

  // ── 6. Con los interruptores de ajustes.json, nada queda vacío ────────────
  const ocultando = ajustes ?? { ocultarDatosPersonales: true, ocultarRiesgoAlto: true };
  let leccionesOcultas = 0;
  for (const curso of cursos) {
    const ocultas = curso.modulos.flatMap((m) => m.lecciones).filter((l) => leccionOculta(l, curso, ocultando)).length;
    leccionesOcultas += ocultas;
    if (cursoOculto(curso, ocultando) || curso.estado === 'proximamente') continue;
    const visibles = curso.modulos.flatMap((m) => m.lecciones).length - ocultas;
    if (visibles === 0) error(`datos/cursos/${curso.id}.json`, 'con los interruptores de ajustes.json el curso queda sin lecciones; márcalo como oculto');
  }
  for (const perfil of perfiles) {
    for (const id of perfil.resultadoEsperado.cursos) {
      const curso = cursosPorId.get(id);
      if (curso && cursoOculto(curso, ocultando)) error(`datos/perfiles-demo.json → «${perfil.id}»`, `la ruta incluye el curso oculto «${id}»`);
    }
    for (const semana of perfil.resultadoEsperado.semanas) {
      for (const id of semana.lecciones) {
        const datos = lecciones.get(id);
        if (datos && leccionOculta(datos.leccion, datos.curso, ocultando)) error(`datos/perfiles-demo.json → «${perfil.id}»`, `la semana ${semana.numero} incluye la lección oculta «${id}»`);
      }
    }
  }

  // ── 7. Cada color de escuela tiene su token en global.css ────────────────
  const estilos = await readFile(path.join(RAIZ, 'src/styles/global.css'), 'utf8');
  for (const color of COLORES_ESCUELA) {
    if (!new RegExp(`--color-${color}\\s*:`).test(estilos)) {
      error('src/styles/global.css', `falta el token «--color-${color}» (es un color permitido en escuelas.json → color)`);
    }
  }

  // ── Resultado ─────────────────────────────────────────────────────────────
  if (errores.length) {
    console.error(`✗ datos/ tiene ${errores.length} error(es):\n`);
    for (const e of errores) console.error(`  - ${e}`);
    process.exit(1);
  }
  const visibles = cursos.filter((c) => !cursoOculto(c, ocultando));
  console.log('✓ datos/ es válido');
  console.log(
    `  ${escuelas.length} escuelas · ${areas.length} áreas · ${cursos.length} cursos (${visibles.length} visibles) · ` +
      `${lecciones.size} lecciones (${leccionesOcultas} ocultas con ocultarDatosPersonales: ${ocultando.ocultarDatosPersonales} y ocultarRiesgoAlto: ${ocultando.ocultarRiesgoAlto}) · ` +
      `${diagnosticos.length} diagnósticos · ${perfiles.length} perfiles`,
  );
}

/** Cada pregunta tiene respuesta y cada respuesta es una opción que existe. */
function validarRespuestas(preguntas, respuestas, donde) {
  for (const pregunta of preguntas) {
    const respuesta = respuestas[pregunta.id];
    if (respuesta === undefined) error(donde, `falta la respuesta a «${pregunta.id}»`);
    else if (!pregunta.opciones.some((o) => o.id === respuesta)) error(donde, `«${respuesta}» no es una opción de «${pregunta.id}»`);
  }
  for (const id of Object.keys(respuestas)) if (!preguntas.some((p) => p.id === id)) error(donde, `la pregunta «${id}» no existe`);
}

function validarOrientacionEsperada(o, donde, idsEscuelas, areasPorId) {
  if (!idsEscuelas.has(o.escuela)) error(donde, `la escuela «${o.escuela}» no existe`);
  for (const a of [o.area, ...o.areasRecomendadas]) if (!areasPorId.has(a)) error(donde, `el área «${a}» no existe`);
  if (o.tambienTePuedeServir) {
    if (!idsEscuelas.has(o.tambienTePuedeServir.escuela)) error(donde, `la escuela «${o.tambienTePuedeServir.escuela}» no existe`);
    if (!areasPorId.has(o.tambienTePuedeServir.area)) error(donde, `el área «${o.tambienTePuedeServir.area}» no existe`);
  }
}

main().catch((e) => {
  console.error('✗ No se pudo validar datos/:', e.message);
  process.exit(1);
});
