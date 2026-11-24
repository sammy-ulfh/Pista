#!/usr/bin/env node
/**
 * Importa el resultado del análisis (etapa 1, carpeta `analisis/`) a `datos/`.
 *
 * Se usa UNA vez. Desde ese momento `datos/` es la fuente de verdad y se edita a mano.
 * Si `datos/` ya tiene archivos, el script avisa y no toca nada, salvo que se ejecute con `--forzar`
 * (que vuelve a generar los JSON y deja intacto `datos/README.md`).
 *
 *   node scripts/importar-analisis.mjs            # primera vez
 *   node scripts/importar-analisis.mjs --forzar   # vuelve a generar todo (¡pierde las ediciones a mano!)
 *
 * Qué hace con el análisis:
 *   - Descarta todos los precios, paquetes y costos (ahora hay un solo plan; ver PROYECTO.md, sección 7).
 *   - Toma `riesgo` y `datosPersonales` de cada lección de `inventario.json` y de `problemas.csv`.
 *   - Marca *Python ofensivo* como oculto y da lecciones «en preparación» a *Hablar para vender* y *Precios sin miedo*.
 *   - Parte `diagnostico.json` en `orientacion.json`, `diagnosticos/<area>.json` y `perfiles-demo.json`,
 *     y vuelve a calcular la ruta esperada de cada perfil con la regla de ritmo nueva (minutos acumulados).
 *
 * No lee ni modifica `fuentes/` ni `analisis/` (solo lee `analisis/`).
 */
import { access, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cursoOculto, leccionOculta } from '../src/lib/compartido/visibilidad.js';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ANALISIS = path.join(RAIZ, 'analisis');
const DATOS = path.join(RAIZ, 'datos');
const forzar = process.argv.includes('--forzar');

// ── Decisiones de la construcción que el análisis no trae (CONSTRUCCION.md, sección 1) ──────────

const AJUSTES = {
  plan: {
    nombre: 'Pista completo',
    precio: 50,
    moneda: 'MXN',
    periodo: 'mes',
    incluye: ['Todos los cursos de todas las escuelas', 'Cambia de área cuando quieras'],
  },
  ocultarDatosPersonales: true,
  ocultarRiesgoAlto: false,
  mostrarEtiquetaIdioma: true,
  textoFuncionNoDisponible: 'Disponible en la versión completa',
  ritmo: {
    horasSemanaPorDefecto: 1,
    descripcion:
      'Las semanas se llenan por minutos acumulados: caben las lecciones mientras su suma no pase de horasSemana × 60 minutos. ' +
      'Una lección nunca se parte entre semanas; si una sola lección pasa del límite, ocupa una semana para ella sola. ' +
      'Un curso nuevo sigue en la misma semana si aún cabe. Las lecciones ocultas no cuentan. ' +
      'Un curso «próximamente» (sin lecciones) ocupa sus minutosEstimados en semanas propias: se divide en partes iguales, ' +
      'tantas como semanas necesite, y lo que sigue empieza en semana nueva. Los minutos se redondean a un decimal.',
    combinarRespuestas:
      'cursoInicio: gana el que va más adelante en la ruta del área (los cursos anteriores se omiten). ' +
      'omitirLecciones, omitirModulos, omitirCursos y agregarCursos: se suman los de todas las respuestas (agregarCursos va al final, en orden). ' +
      'horasSemana: la última respuesta que lo indique; si ninguna lo indica, horasSemanaPorDefecto.',
  },
};

const FUENTES = [
  {
    id: 'notes-tecnologia',
    repositorio: 'https://github.com/sammy-ulfh/Notes',
    commit: 'a3438f4',
    carpeta: 'fuentes/Notes',
    escuela: 'tecnologia',
  },
  { id: 'demo', repositorio: null, carpeta: 'apuntes-demo', escuela: null },
];

/** Cursos que se ocultan en la demo aunque sus lecciones no sean todas de riesgo alto. */
const CURSOS_OCULTOS = new Set(['python-ofensivo-laboratorio']);

/**
 * Cursos con ficha y lecciones «en preparación» (CONSTRUCCION.md, sección 1).
 * SUPUESTO: el análisis no les da lecciones; los títulos salen de su subtítulo y los minutos reparten
 * la duración estimada del análisis (70 y 50 min).
 */
const CURSOS_EN_PREPARACION = {
  'hablar-para-vender': [
    ['tu-presentacion-de-un-minuto', 'Tu presentación de un minuto', 35],
    ['cuenta-lo-que-haces-con-una-historia', 'Cuenta lo que haces con una historia', 35],
  ],
  'precios-sin-miedo': [
    ['calcula-cuanto-cobrar', 'Calcula cuánto cobrar', 25],
    ['di-tu-precio-con-seguridad', 'Di tu precio con seguridad', 25],
  ],
};

// ── Utilidades ───────────────────────────────────────────────────────────────

async function existe(ruta) {
  try {
    await access(ruta);
    return true;
  } catch {
    return false;
  }
}

async function leerJson(ruta) {
  return JSON.parse(await readFile(ruta, 'utf8'));
}

async function escribirJson(ruta, datos) {
  await mkdir(path.dirname(ruta), { recursive: true });
  await writeFile(ruta, JSON.stringify(datos, null, 2) + '\n', 'utf8');
}

/** Lector de CSV mínimo (comillas dobles y saltos de línea dentro de comillas). */
function leerCsv(texto) {
  const filas = [];
  let fila = [];
  let campo = '';
  let enComillas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (enComillas) {
      if (c === '"' && texto[i + 1] === '"') {
        campo += '"';
        i++;
      } else if (c === '"') enComillas = false;
      else campo += c;
    } else if (c === '"') enComillas = true;
    else if (c === ',') {
      fila.push(campo);
      campo = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && texto[i + 1] === '\n') i++;
      fila.push(campo);
      filas.push(fila);
      fila = [];
      campo = '';
    } else campo += c;
  }
  if (campo || fila.length) {
    fila.push(campo);
    filas.push(fila);
  }
  const [encabezado, ...resto] = filas.filter((f) => f.length > 1 || f[0]);
  return resto.map((f) => Object.fromEntries(encabezado.map((col, i) => [col, f[i] ?? ''])));
}

const redondear = (n) => Math.round(n * 10) / 10;
const aSlug = (t) =>
  t
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// ── Conversión ───────────────────────────────────────────────────────────────

/** Riesgo y datos personales por archivo de nota, según `problemas.csv`. */
function marcasSensibles(problemas) {
  const riesgo = new Map();
  const datosPersonales = new Set();
  for (const p of problemas) {
    if (p.tipo === 'contenido_ofensivo_alto') riesgo.set(p.archivo, 'alto');
    else if (p.tipo === 'contenido_ofensivo_medio' && riesgo.get(p.archivo) !== 'alto') riesgo.set(p.archivo, 'medio');
    // SUPUESTO: solo «dato_sensible_alta» es un dato personal real (correos de personas). Los de «media» son
    // nombres de host de un laboratorio, no de una persona: la lección se publica.
    else if (p.tipo === 'dato_sensible_alta') datosPersonales.add(p.archivo);
  }
  return { riesgo, datosPersonales };
}

const ORDEN_RIESGO = { ninguno: 0, medio: 1, alto: 2 };
const mayorRiesgo = (a, b) => (ORDEN_RIESGO[a] >= ORDEN_RIESGO[b] ? a : b);

function convertirLeccion(leccion, marcas) {
  const esDemo = leccion.ruta_md.startsWith('apuntes-demo/');
  const [archivo, ...seccion] = leccion.ruta_md.split('#');
  const riesgoInventario = leccion.riesgo_ofensivo === 'alto' || leccion.riesgo_ofensivo === 'medio' ? leccion.riesgo_ofensivo : 'ninguno';
  return {
    id: leccion.id,
    slug: leccion.slug,
    titulo: leccion.titulo,
    fuente: esDemo ? 'demo' : 'notes-tecnologia',
    ruta: esDemo ? archivo.slice('apuntes-demo/'.length) : archivo,
    seccion: seccion.length ? seccion.join('#') : null,
    minutos: leccion.minutos,
    idioma: leccion.idioma,
    riesgo: mayorRiesgo(riesgoInventario, marcas.riesgo.get(archivo) ?? 'ninguno'),
    datosPersonales: marcas.datosPersonales.has(archivo),
    enPreparacion: false,
  };
}

function convertirCurso(curso, marcas) {
  let modulos = curso.modulos.map((m) => ({
    id: m.id,
    titulo: m.titulo,
    lecciones: m.lecciones.map((l) => convertirLeccion(l, marcas)),
  }));
  let estado = curso.estado;

  const enPreparacion = CURSOS_EN_PREPARACION[curso.id];
  if (enPreparacion) {
    // SUPUESTO: estado «muestra», porque tiene lecciones (en preparación) y no es «solo ficha».
    estado = 'muestra';
    modulos = [
      {
        id: `${curso.id}/temario`,
        titulo: 'Temario',
        lecciones: enPreparacion.map(([slug, titulo, minutos]) => ({
          id: `${curso.id}/${slug}`,
          slug,
          titulo,
          fuente: 'demo',
          ruta: null,
          seccion: null,
          minutos,
          idioma: 'es',
          riesgo: 'ninguno',
          datosPersonales: false,
          enPreparacion: true,
        })),
      },
    ];
  }

  const lecciones = modulos.flatMap((m) => m.lecciones);
  const idiomas = ['es', 'en'].filter((i) => lecciones.some((l) => l.idioma === i));
  return {
    id: curso.id,
    estado,
    oculto: CURSOS_OCULTOS.has(curso.id),
    titulo: curso.titulo,
    subtitulo: curso.subtitulo,
    escuela: curso.escuela,
    areas: curso.areas,
    nivel: curso.nivel,
    prerrequisitos: curso.prerrequisitos,
    aprenderas: curso.aprenderas,
    idiomas: idiomas.length ? idiomas : ['es'],
    avisoEtico: Boolean(curso.aviso_etico) || lecciones.some((l) => l.riesgo !== 'ninguno'),
    minutosEstimados: estado === 'proximamente' ? curso.minutos : null,
    modulos,
  };
}

function convertirEscuela(escuela) {
  // En el análisis, las escuelas con cursos de muestra están «disponibles» con `supuesto: true`.
  const estado = escuela.estado === 'proximamente' ? 'proximamente' : escuela.supuesto ? 'muestra' : 'disponible';
  return {
    id: escuela.id,
    nombre: escuela.nombre,
    descripcion: escuela.descripcion,
    estado,
    color: escuela.id,
    areas: escuela.areas.map((a) => ({
      id: a.id,
      nombre: a.nombre,
      descripcion: a.descripcion,
      estado: a.estado === 'proximamente' ? 'proximamente' : a.cobertura === 'muestra' ? 'muestra' : 'disponible',
      cursos: a.cursos,
      ruta: a.ruta,
    })),
  };
}

function convertirEfectos(e) {
  const efectos = {};
  if (e.curso_inicio) efectos.cursoInicio = e.curso_inicio;
  if (e.omitir_lecciones?.length) efectos.omitirLecciones = e.omitir_lecciones;
  if (e.omitir_modulos?.length) efectos.omitirModulos = e.omitir_modulos;
  if (e.omitir_cursos?.length) efectos.omitirCursos = e.omitir_cursos;
  if (e.agregar_cursos?.length) efectos.agregarCursos = e.agregar_cursos;
  if (e.horas_semana) efectos.horasSemana = e.horas_semana;
  const desconocidos = Object.keys(e).filter(
    (k) => !['curso_inicio', 'omitir_lecciones', 'omitir_modulos', 'omitir_cursos', 'agregar_cursos', 'horas_semana'].includes(k),
  );
  if (desconocidos.length) throw new Error(`Efecto desconocido en el análisis: ${desconocidos.join(', ')}`);
  return efectos;
}

function convertirDiagnostico(d) {
  return {
    area: d.area_id,
    notaAlFinal: d.nota_al_final,
    preguntas: d.preguntas.map((p) => ({
      id: p.id,
      texto: p.texto,
      opciones: p.opciones.map((o) => ({ id: o.id, texto: o.texto, efectos: convertirEfectos(o.efectos) })),
    })),
  };
}

const convertirOrientacionEsperada = (r) => ({
  escuela: r.escuela_id,
  area: r.area_id,
  areasRecomendadas: r.areas_recomendadas,
  tambienTePuedeServir: r.tambien_te_puede_servir
    ? { escuela: r.tambien_te_puede_servir.escuela_id, area: r.tambien_te_puede_servir.area_id }
    : null,
  avisoProximamente: r.aviso_proximamente,
});

/**
 * Ruta esperada de un perfil, con la regla de `AJUSTES.ritmo` (texto arriba).
 * Es el cálculo de referencia para escribir `perfiles-demo.json`; la implementación del sitio será
 * `src/lib/ruta.ts` (parte 3.6), y sus pruebas deben dar exactamente este resultado.
 */
function calcularRutaEsperada(area, respuestas, diagnostico, cursosPorId, ajustes) {
  let inicio = null;
  let preguntaInicio = null;
  const omitirLecciones = new Map();
  const omitirModulos = new Map();
  const omitirCursos = new Map();
  const agregar = [];
  let horas = null;

  for (const pregunta of diagnostico.preguntas) {
    const opcion = pregunta.opciones.find((o) => o.id === respuestas[pregunta.id]);
    if (!opcion) throw new Error(`Respuesta inválida a «${pregunta.id}» en el diagnóstico de ${area.id}`);
    const e = opcion.efectos;
    if (e.cursoInicio) {
      const nuevo = area.ruta.indexOf(e.cursoInicio);
      if (nuevo > (inicio ? area.ruta.indexOf(inicio) : -1)) {
        inicio = e.cursoInicio;
        preguntaInicio = pregunta.id;
      }
    }
    for (const id of e.omitirLecciones ?? []) if (!omitirLecciones.has(id)) omitirLecciones.set(id, pregunta.id);
    for (const id of e.omitirModulos ?? []) if (!omitirModulos.has(id)) omitirModulos.set(id, pregunta.id);
    for (const id of e.omitirCursos ?? []) if (!omitirCursos.has(id)) omitirCursos.set(id, pregunta.id);
    for (const id of e.agregarCursos ?? []) if (!agregar.includes(id)) agregar.push(id);
    if (e.horasSemana) horas = e.horasSemana;
  }
  horas ??= ajustes.ritmo.horasSemanaPorDefecto;

  const desde = inicio ? area.ruta.indexOf(inicio) : 0;
  const cursosOmitidos = area.ruta.slice(0, desde).map((curso) => ({ curso, motivo: 'cursoInicio', pregunta: preguntaInicio }));
  const cursos = [];
  for (const id of [...area.ruta.slice(desde), ...agregar]) {
    if (cursos.includes(id)) continue;
    if (omitirCursos.has(id)) {
      cursosOmitidos.push({ curso: id, motivo: 'diagnostico', pregunta: omitirCursos.get(id) });
      continue;
    }
    if (cursoOculto(cursosPorId.get(id), ajustes)) continue;
    cursos.push(id);
  }

  const capacidad = horas * 60;
  const semanas = [];
  const leccionesOmitidas = [];
  let actual = null;
  const nuevaSemana = () => {
    actual = { numero: semanas.length + 1, lecciones: [], minutos: 0 };
    semanas.push(actual);
  };

  for (const id of cursos) {
    const curso = cursosPorId.get(id);
    if (curso.estado === 'proximamente') {
      const partes = Math.max(1, Math.ceil(curso.minutosEstimados / capacidad));
      for (let i = 0; i < partes; i++) {
        nuevaSemana();
        actual.lecciones.push(`curso:${id}`);
        actual.minutos = redondear(curso.minutosEstimados / partes);
      }
      actual = null;
      continue;
    }
    for (const modulo of curso.modulos) {
      for (const leccion of modulo.lecciones) {
        if (leccionOculta(leccion, curso, ajustes)) continue;
        const pregunta = omitirModulos.get(modulo.id) ?? omitirLecciones.get(leccion.id);
        if (pregunta) {
          leccionesOmitidas.push({ leccion: leccion.id, pregunta });
          continue;
        }
        if (!actual || (actual.lecciones.length > 0 && redondear(actual.minutos + leccion.minutos) > capacidad)) nuevaSemana();
        actual.lecciones.push(leccion.id);
        actual.minutos = redondear(actual.minutos + leccion.minutos);
      }
    }
  }

  return {
    horasSemana: horas,
    cursos,
    cursosOmitidos,
    leccionesOmitidas,
    semanas,
    totalSemanas: semanas.length,
    minutosTotal: redondear(semanas.reduce((suma, s) => suma + s.minutos, 0)),
  };
}

// ── Programa ─────────────────────────────────────────────────────────────────

async function main() {
  if ((await existe(DATOS)) && !forzar) {
    const contenido = (await readdir(DATOS)).filter((f) => f !== 'README.md');
    if (contenido.length) {
      console.warn('⚠ datos/ ya existe y es la fuente de verdad: no se sobrescribe.');
      console.warn('  Si de verdad quieres volver a generarlo desde analisis/ (se pierden las ediciones a mano):');
      console.warn('  node scripts/importar-analisis.mjs --forzar');
      return;
    }
  }

  const inventario = await leerJson(path.join(ANALISIS, 'inventario.json'));
  const diagnostico = await leerJson(path.join(ANALISIS, 'diagnostico.json'));
  const problemas = leerCsv(await readFile(path.join(ANALISIS, 'problemas.csv'), 'utf8'));
  const marcas = marcasSensibles(problemas);

  const escuelas = inventario.escuelas.map(convertirEscuela);
  const cursos = inventario.cursos.map((c) => convertirCurso(c, marcas));
  const cursosPorId = new Map(cursos.map((c) => [c.id, c]));
  const diagnosticos = diagnostico.areas.map(convertirDiagnostico);
  const areasPorId = new Map(escuelas.flatMap((e) => e.areas).map((a) => [a.id, a]));

  const orientacion = {
    regla: diagnostico.orientacion.regla,
    notaAlFinal: 'No hay respuestas malas: esto solo sirve para saber dónde empezar.',
    preguntas: diagnostico.orientacion.preguntas.map((p) => ({
      id: p.id,
      texto: p.texto,
      opciones: p.opciones.map((o) => ({
        id: o.id,
        texto: o.texto,
        suma: { escuelas: o.suma.escuelas ?? {}, areas: o.suma.areas ?? {} },
      })),
    })),
    casosDePrueba: diagnostico.casos_de_prueba.map((c) => ({
      nombre: c.nombre,
      respuestas: c.respuestas_orientacion,
      esperado: convertirOrientacionEsperada(c.resultado),
    })),
  };

  const perfiles = diagnostico.perfiles_demo.map((p) => {
    const diag = diagnosticos.find((d) => d.area === p.area_id);
    return {
      id: aSlug(p.nombre),
      nombre: p.nombre,
      carrera: p.carrera,
      objetivo: p.objetivo,
      esTecnologia: p.es_tecnologia,
      respuestasOrientacion: p.respuestas_orientacion,
      orientacionEsperada: { ...convertirOrientacionEsperada(p), puntos: p.puntos },
      area: p.area_id,
      respuestasDiagnostico: p.respuestas_diagnostico,
      resultadoEsperado: calcularRutaEsperada(areasPorId.get(p.area_id), p.respuestas_diagnostico, diag, cursosPorId, AJUSTES),
    };
  });

  if (forzar) {
    await rm(path.join(DATOS, 'cursos'), { recursive: true, force: true });
    await rm(path.join(DATOS, 'diagnosticos'), { recursive: true, force: true });
  }
  await escribirJson(path.join(DATOS, 'ajustes.json'), AJUSTES);
  await escribirJson(path.join(DATOS, 'fuentes.json'), FUENTES);
  await escribirJson(path.join(DATOS, 'escuelas.json'), escuelas);
  for (const curso of cursos) await escribirJson(path.join(DATOS, 'cursos', `${curso.id}.json`), curso);
  await escribirJson(path.join(DATOS, 'orientacion.json'), orientacion);
  for (const d of diagnosticos) await escribirJson(path.join(DATOS, 'diagnosticos', `${d.area}.json`), d);
  await escribirJson(path.join(DATOS, 'perfiles-demo.json'), perfiles);

  // Resumen
  const lecciones = cursos.flatMap((c) => c.modulos.flatMap((m) => m.lecciones.map((l) => ({ l, c }))));
  const ocultas = lecciones.filter(({ l, c }) => leccionOculta(l, c, AJUSTES)).length;
  console.log(`✓ datos/ generado desde analisis/`);
  console.log(`  ${escuelas.length} escuelas · ${areasPorId.size} áreas · ${cursos.length} cursos · ${lecciones.length} lecciones (${ocultas} ocultas)`);
  console.log(`  ${diagnosticos.length} diagnósticos · ${perfiles.length} perfiles`);
  for (const p of perfiles) {
    console.log(`  ${p.nombre}: ${p.resultadoEsperado.totalSemanas} semanas · ${p.resultadoEsperado.cursos.join(' → ')}`);
  }
  console.log('  Descartado del análisis: precios por curso, precios de referencia, paquetes, costos de ruta,');
  console.log('  portadas (se generan con CSS), recursos extra, notas descartadas y métricas (palabras, imágenes, enlaces).');
}

main().catch((error) => {
  console.error('✗ No se pudo importar el análisis:', error.message);
  process.exit(1);
});
