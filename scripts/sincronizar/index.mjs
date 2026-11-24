#!/usr/bin/env node
/**
 * `npm run sincronizar`: convierte los apuntes de Obsidian en lecciones listas para Astro.
 *
 * Este archivo solo ORQUESTA; las reglas están en los demás módulos de esta carpeta:
 *   1. obtener-fuentes.mjs    → clona `fuentes/` o comprueba que esté en el commit fijado;
 *   2. filtrar-sensibles.mjs  → qué lecciones se generan (usa la regla de `src/lib/compartido/visibilidad.js`);
 *   3. convertir-obsidian.mjs → limpia la nota, la parte por `seccion` y convierte la sintaxis;
 *   4. resolver-enlaces.mjs   → a qué archivo o lección apunta cada `![[…]]` y `[[…]]`;
 *   5. copiar-imagenes.mjs    → nombres públicos y copia a `public/apuntes/<curso>/`.
 *
 * Salida:
 *   - `contenido-generado/<curso>/<leccion>.md` (frontmatter + Markdown estándar);
 *   - `public/apuntes/<curso>/…` (solo las imágenes y adjuntos que usan las lecciones visibles);
 *   - `contenido-generado/_reporte.json` (todo lo que pasó, con archivo y línea);
 *   - `contenido-generado/_revision-capturas.html` (miniaturas de las capturas de lecciones de riesgo medio y, aparte,
 *     las de riesgo alto que se publican desde la parte 3.9).
 *
 * Opciones:
 *   --actualizar  mueve `fuentes/` al commit de `datos/fuentes.json` si está en otro;
 *   --si-falta    no hace nada si ya hay contenido generado (lo usa `npm run dev`).
 *
 * Termina con código 1 si una nota no existe o una `seccion` no coincide con ningún encabezado.
 * Nunca escribe dentro de `fuentes/`.
 */
import { existsSync, readFileSync } from 'node:fs';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { esquemaAjustes, esquemaCurso, esquemaFuentes } from '../../src/lib/compartido/esquemas.js';
import {
  armarArchivoLeccion,
  bajarEncabezados,
  bloqueNotaIncrustada,
  calcularAnclas,
  convertirLeccion,
  esAnclaDeNavegacion,
  htmlImagen,
  partirPorSecciones,
  prepararNota,
  quitarEncabezadoInicial,
  quitarH1Inicial,
  separarEjercicios,
  separarImagenesSolas,
  textoAlternativo,
} from './convertir-obsidian.mjs';
import {
  borrarSobrantes,
  CALIDAD_WEBP,
  copiarArchivos,
  hojaRevisionCapturas,
  medirImagen,
  NombresPublicos,
  puedeConvertirAWebp,
  tamanoCarpeta,
} from './copiar-imagenes.mjs';
import { imagenOculta, separarLecciones } from './filtrar-sensibles.mjs';
import { obtenerFuentes } from './obtener-fuentes.mjs';
import { crearIndiceVault, esAdjunto, esImagen, repararNombre, resolverArchivo, resolverEnlaceNota } from './resolver-enlaces.mjs';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SALIDA = path.join(RAIZ, 'contenido-generado');
const PUBLICO = path.join(RAIZ, 'public', 'apuntes');
const REPORTE = path.join(SALIDA, '_reporte.json');
const HOJA_REVISION = path.join(SALIDA, '_revision-capturas.html');

const TEXTO_IMAGEN_OMITIDA = '*Imagen omitida en esta versión.*';
const TEXTO_IMAGEN_FALTANTE = '*(Imagen no disponible)*';

const argumentos = new Set(process.argv.slice(2));
const inicio = Date.now();

async function leerJson(/** @type {string} */ rutaRelativa) {
  return JSON.parse(await readFile(path.join(RAIZ, rutaRelativa), 'utf8'));
}

/** Lista los archivos de un vault (sin `.git` ni `.obsidian`), con rutas relativas y `/`. */
async function listarVault(/** @type {string} */ carpetaVault) {
  const entradas = await readdir(carpetaVault, { withFileTypes: true, recursive: true });
  return entradas
    .filter((e) => e.isFile())
    .map((e) => path.relative(carpetaVault, path.join(e.parentPath, e.name)).split(path.sep).join('/'))
    .filter((r) => !r.split('/').some((parte) => parte === '.git' || parte === '.obsidian'));
}

/** `Vault/sub/nota.md` → `{ vault: 'Vault', enVault: 'sub/nota.md' }`. */
function separarVault(/** @type {string} */ ruta) {
  const [vault, ...resto] = ruta.split('/');
  return { vault, enVault: resto.join('/') };
}

async function main() {
  if (argumentos.has('--si-falta') && existsSync(REPORTE)) {
    console.log('✓ contenido-generado/ ya existe (usa `npm run sincronizar` para regenerarlo).');
    return;
  }

  // ── Datos ──────────────────────────────────────────────────────────────────
  const ajustes = esquemaAjustes.parse(await leerJson('datos/ajustes.json'));
  const fuentes = esquemaFuentes.parse(await leerJson('datos/fuentes.json'));
  const archivosCursos = (await readdir(path.join(RAIZ, 'datos/cursos'))).filter((f) => f.endsWith('.json')).sort();
  const cursos = [];
  for (const archivo of archivosCursos) cursos.push(esquemaCurso.parse(await leerJson(`datos/cursos/${archivo}`)));
  const fuentePorId = new Map(fuentes.map((f) => [f.id, f]));

  // ── 1. Fuentes ─────────────────────────────────────────────────────────────
  const avisos = await obtenerFuentes(fuentes, { raiz: RAIZ, actualizar: argumentos.has('--actualizar'), registrar: console.log });

  // ── 2. Qué se genera ───────────────────────────────────────────────────────
  const { visibles, omitidas } = separarLecciones(cursos, ajustes);

  /** Índices de archivos por `fuente:vault`, creados al necesitarlos. */
  const indices = new Map();
  async function indiceDe(/** @type {string} */ fuenteId, /** @type {string} */ vault) {
    const clave = `${fuenteId}:${vault}`;
    if (!indices.has(clave)) {
      const carpeta = path.join(RAIZ, /** @type {any} */ (fuentePorId.get(fuenteId)).carpeta, vault);
      indices.set(clave, existsSync(carpeta) ? crearIndiceVault(await listarVault(carpeta)) : null);
    }
    return indices.get(clave);
  }
  const claveNota = (/** @type {string} */ fuenteId, /** @type {string} */ ruta) => `${fuenteId}:${repararNombre(ruta)}`;

  // Registro de todo lo que pasa (va a _reporte.json y al resumen).
  const reporte = {
    notasFaltantes: /** @type {any[]} */ ([]),
    fuentesPendientes: /** @type {any[]} */ ([]),
    seccionesSinEmpatar: /** @type {any[]} */ ([]),
    bloquesUnidos: /** @type {any[]} */ ([]),
    enlacesATextoPlano: /** @type {any[]} */ ([]),
    imagenesNoEncontradas: /** @type {any[]} */ ([]),
    imagenesAmbiguas: /** @type {any[]} */ ([]),
    imagenesOmitidas: /** @type {any[]} */ ([]),
    notasIncrustadas: /** @type {any[]} */ ([]),
    imagenesSinMedidas: /** @type {any[]} */ ([]),
    imagenesSinConvertir: /** @type {any[]} */ ([]),
    enlacesANavegacionQuitados: 0,
    titulosRepetidosQuitados: 0,
    leccionesConEncabezadosBajados: 0,
  };

  // ── 3a. Leer y partir cada nota ────────────────────────────────────────────
  /** @type {Map<string, typeof visibles>} */
  const porNota = new Map();
  for (const plana of visibles) {
    const clave = claveNota(plana.leccion.fuente, plana.leccion.ruta);
    porNota.set(clave, [...(porNota.get(clave) ?? []), plana]);
  }

  /** Lecciones listas para convertir. */
  const preparadas = [];
  /** @type {Map<string, import('./resolver-enlaces.mjs').LeccionDestino[]>} nota → lecciones visibles (destinos de enlaces) */
  const destinosPorNota = new Map();

  for (const [clave, lecciones] of porNota) {
    const { fuente: fuenteId, ruta } = lecciones[0].leccion;
    const fuente = /** @type {any} */ (fuentePorId.get(fuenteId));
    const carpetaFuente = path.join(RAIZ, fuente.carpeta);
    if (!existsSync(carpetaFuente)) {
      for (const l of lecciones) reporte.fuentesPendientes.push({ leccion: l.leccion.id, fuente: fuenteId, carpeta: fuente.carpeta, ruta });
      continue;
    }
    const { vault, enVault } = separarVault(ruta);
    const indice = await indiceDe(fuenteId, vault);
    const encontrada = indice && resolverArchivo(enVault, enVault, indice);
    if (!encontrada) {
      for (const l of lecciones) reporte.notasFaltantes.push({ leccion: l.leccion.id, archivo: `${fuente.carpeta}/${ruta}` });
      continue;
    }
    const archivoNota = `${vault}/${encontrada.ruta}`;
    const nota = prepararNota(await readFile(path.join(carpetaFuente, archivoNota), 'utf8'));

    const conSeccion = lecciones.filter((l) => l.leccion.seccion);
    /** @type {Map<string, import('./convertir-obsidian.mjs').Linea[]>} */
    let partes = new Map();
    if (conSeccion.length) {
      /** @type {Record<string, string[]>} */
      const bloquesExtra = {};
      for (const l of conSeccion) if (l.leccion.bloquesExtra) bloquesExtra[l.leccion.seccion] = l.leccion.bloquesExtra;
      const particion = partirPorSecciones(nota, conSeccion.map((l) => l.leccion.seccion), bloquesExtra);
      partes = particion.partes;
      for (const seccion of particion.sinEmpatar) {
        const l = conSeccion.find((x) => x.leccion.seccion === seccion || x.leccion.bloquesExtra?.includes(seccion));
        reporte.seccionesSinEmpatar.push({ leccion: l?.leccion.id, archivo: `${fuente.carpeta}/${archivoNota}`, seccion });
      }
      for (const u of particion.unidos) {
        const l = conSeccion.find((x) => x.leccion.seccion === u.seUneA);
        reporte.bloquesUnidos.push({
          archivo: `${fuente.carpeta}/${archivoNota}`,
          linea: u.num,
          encabezado: u.encabezado,
          seUneA: l?.leccion.id,
          ...(u.porBloquesExtra ? { porBloquesExtra: true } : {}),
        });
      }
    }

    for (const plana of lecciones) {
      const { curso, leccion } = plana;
      let cuerpo;
      if (leccion.seccion) {
        const parte = partes.get(leccion.seccion);
        if (!parte) continue; // ya reportada en seccionesSinEmpatar
        cuerpo = quitarEncabezadoInicial(parte, leccion.seccion);
      } else {
        cuerpo = nota;
      }
      // Un `# Título` al inicio repetiría el título que ya muestra el lector.
      const sinTitulo = quitarH1Inicial(cuerpo);
      if (sinTitulo.titulo !== null) reporte.titulosRepetidosQuitados++;
      // Un encabezado inicial de otro nivel con el mismo texto que el título («## Etiquetas para textos») también sobra.
      const sinRepetido = quitarEncabezadoInicial(sinTitulo.lineas, leccion.titulo);
      if (sinRepetido.length !== sinTitulo.lineas.length) reporte.titulosRepetidosQuitados++;
      // Y si quedan más `# …`, todo baja un nivel: la página tiene un solo <h1>, el título de la lección.
      const bajados = bajarEncabezados(sinRepetido);
      cuerpo = bajados.lineas;
      if (bajados.bajados) reporte.leccionesConEncabezadosBajados++;
      const destino = {
        id: leccion.id,
        curso: curso.id,
        url: `/cursos/${curso.id}/${leccion.slug}`,
        anclas: calcularAnclas(cuerpo, leccion.seccion, sinTitulo.titulo ?? (sinRepetido.length !== sinTitulo.lineas.length ? leccion.titulo : null)),
      };
      destinosPorNota.set(clave, [...(destinosPorNota.get(clave) ?? []), destino]);
      preparadas.push({ plana, cuerpo, destino, clave, vault, enVault: encontrada.ruta, fuente, carpetaFuente, archivoNota });
    }
  }

  // ── 3b. Convertir cada lección ─────────────────────────────────────────────
  // Las capturas PNG y JPG se publican como WebP (si está sharp, que trae Astro).
  const webp = await puedeConvertirAWebp();
  if (!webp) avisos.push('No se encontró sharp: las capturas se copian sin convertir a WebP (pesan más).');
  /** @type {Map<string, NombresPublicos>} */
  const nombresPorCurso = new Map();
  /** @type {Map<string, { origen: string, destino: string }>} */
  const copias = new Map();
  /** @type {import('./copiar-imagenes.mjs').CapturaParaRevisar[]} */
  const capturasRiesgoMedio = [];
  /** @type {import('./copiar-imagenes.mjs').CapturaParaRevisar[]} riesgo alto: van aparte en la hoja («Riesgo alto (nuevo)») */
  const capturasRiesgoAlto = [];
  /** @type {import('./copiar-imagenes.mjs').CapturaParaRevisar[]} adjuntos publicados (van a la hoja de revisión) */
  const adjuntosParaRevisar = [];
  const imagenesPorLeccion = [];
  const generados = new Set([path.resolve(REPORTE), path.resolve(HOJA_REVISION)]);
  let escritos = 0;

  for (const p of preparadas) {
    const { curso, modulo, leccion, orden } = p.plana;
    const indice = await indiceDe(leccion.fuente, p.vault);
    if (!nombresPorCurso.has(curso.id)) nombresPorCurso.set(curso.id, new NombresPublicos({ webp }));
    const nombres = /** @type {NombresPublicos} */ (nombresPorCurso.get(curso.id));
    const donde = `${p.fuente.carpeta}/${p.archivoNota}`;
    const imagenesUsadas = new Set();
    /**
     * Imágenes de la lección, en orden. `convertirLeccion` es síncrona y medir una imagen no: cada imagen deja una
     * marca en el texto y, al terminar, se cambia por su `<img>` con ancho y alto.
     * @type {{ marca: string, origen: string, url: string, alt: string, enlace: string, num: number }[]}
     */
    const imagenes = [];

    /** Registra un archivo para copiar y devuelve su URL pública. */
    const publicar = (/** @type {string} */ rutaEnVault) => {
      const origen = path.join(p.carpetaFuente, p.vault, rutaEnVault);
      const nombre = nombres.nombre(`${leccion.fuente}:${p.vault}/${rutaEnVault}`);
      const destino = path.join(PUBLICO, curso.id, nombre);
      copias.set(path.resolve(destino), { origen, destino });
      return { nombre, url: `/apuntes/${curso.id}/${encodeURI(nombre)}`, destino };
    };

    const leccionesDeNota = (/** @type {string} */ destino) => {
      const r = resolverArchivo(destino, p.enVault, indice, { extensiones: ['.md'] });
      if (!r || !r.ruta.toLowerCase().endsWith('.md')) return { encontrada: false, lecciones: [] };
      return { encontrada: true, lecciones: destinosPorNota.get(claveNota(leccion.fuente, `${p.vault}/${r.ruta}`)) ?? [] };
    };

    const cuerpo = convertirLeccion(p.cuerpo, ({ incrustado, partes, num, sangria }) => {
      const original = `${incrustado ? '!' : ''}[[${partes.destino}${partes.ancla !== null ? `#${partes.ancla}` : ''}${partes.alias ? `|${partes.alias}` : ''}]]`;

      // Imagen
      if (esImagen(partes.destino)) {
        const r = resolverArchivo(partes.destino, p.enVault, indice);
        if (!r) {
          reporte.imagenesNoEncontradas.push({ leccion: leccion.id, archivo: donde, linea: num, enlace: original });
          return TEXTO_IMAGEN_FALTANTE;
        }
        if (r.candidatos.length > 1) {
          reporte.imagenesAmbiguas.push({ leccion: leccion.id, archivo: donde, linea: num, enlace: original, elegida: r.ruta, candidatos: r.candidatos });
        }
        const nombreArchivo = r.ruta.split('/').pop() ?? r.ruta;
        if (imagenOculta(leccion, r.ruta, nombres.nombre(`${leccion.fuente}:${p.vault}/${r.ruta}`))) {
          reporte.imagenesOmitidas.push({ leccion: leccion.id, archivo: donde, linea: num, imagen: nombreArchivo });
          return TEXTO_IMAGEN_OMITIDA;
        }
        const { nombre, url } = publicar(r.ruta);
        const marca = `\u0000imagen-${imagenes.length}\u0000`;
        imagenes.push({ marca, origen: path.join(p.carpetaFuente, p.vault, r.ruta), url, alt: textoAlternativo(nombreArchivo, partes.alias), enlace: original, num });
        if (!imagenesUsadas.has(nombre)) {
          imagenesUsadas.add(nombre);
          const captura = { leccionId: leccion.id, titulo: leccion.titulo, original: nombreArchivo, rutaRelativa: `../public/apuntes/${curso.id}/${nombre}` };
          if (leccion.riesgo === 'medio') capturasRiesgoMedio.push(captura);
          if (leccion.riesgo === 'alto') capturasRiesgoAlto.push(captura);
        }
        return marca;
      }

      // Adjunto (PDF…): enlace de descarga
      if (esAdjunto(partes.destino)) {
        const r = resolverArchivo(partes.destino, p.enVault, indice);
        const nombreArchivo = partes.destino.split('/').pop() ?? partes.destino;
        if (!r) {
          reporte.enlacesATextoPlano.push({ leccion: leccion.id, archivo: donde, linea: num, enlace: original, motivo: 'el adjunto no existe' });
          return nombreArchivo;
        }
        if (imagenOculta(leccion, r.ruta, nombres.nombre(`${leccion.fuente}:${p.vault}/${r.ruta}`))) {
          reporte.imagenesOmitidas.push({ leccion: leccion.id, archivo: donde, linea: num, imagen: nombreArchivo });
          return TEXTO_IMAGEN_OMITIDA;
        }
        const adjunto = publicar(r.ruta);
        if (!adjuntosParaRevisar.some((a) => a.rutaRelativa.endsWith(`/${curso.id}/${adjunto.nombre}`))) {
          adjuntosParaRevisar.push({ leccionId: leccion.id, titulo: leccion.titulo, original: nombreArchivo, rutaRelativa: `../public/apuntes/${curso.id}/${adjunto.nombre}` });
        }
        return `[Descargar «${partes.alias ?? nombreArchivo}»](${adjunto.url})`;
      }

      // Nota incrustada que no es una lección: se muestra su texto en un bloque.
      if (incrustado) {
        const busqueda = leccionesDeNota(partes.destino);
        if (!busqueda.lecciones.length) {
          const r = resolverArchivo(partes.destino, p.enVault, indice, { extensiones: ['.md'] });
          if (r) {
            reporte.notasIncrustadas.push({ leccion: leccion.id, archivo: donde, linea: num, nota: `${p.vault}/${r.ruta}` });
            const texto = readFileSync(path.join(p.carpetaFuente, p.vault, r.ruta), 'utf8');
            return bloqueNotaIncrustada(texto, sangria);
          }
        }
      }

      // «Volver al [[#Índice]]» y similares: su destino se quitó, así que el enlace también.
      if (!incrustado && partes.destino === '' && esAnclaDeNavegacion(partes.ancla)) {
        reporte.enlacesANavegacionQuitados++;
        return '';
      }

      // Enlace a otra nota o a un encabezado
      const resultado = resolverEnlaceNota({
        partes,
        leccionActual: p.destino,
        leccionesNotaActual: destinosPorNota.get(p.clave) ?? [],
        leccionesDeNota,
      });
      if (resultado.tipo === 'enlace') return `[${resultado.texto}](${resultado.url})`;
      reporte.enlacesATextoPlano.push({ leccion: leccion.id, archivo: donde, linea: num, enlace: original, motivo: resultado.motivo });
      return resultado.texto;
    });

    // Cada marca se cambia por su <img> con medidas; la primera imagen de la lección no lleva `loading="lazy"`.
    /** @type {Map<string, string>} */
    const etiquetas = new Map();
    for (const [i, img] of imagenes.entries()) {
      const medidas = await medirImagen(img.origen);
      if (!medidas) reporte.imagenesSinMedidas.push({ leccion: leccion.id, archivo: donde, linea: img.num, enlace: img.enlace });
      etiquetas.set(img.marca, htmlImagen({ url: img.url, alt: img.alt, ancho: medidas?.ancho, alto: medidas?.alto, primera: i === 0 }));
    }
    const conImagenes = etiquetas.size
      ? cuerpo.map((l) => ({ ...l, texto: l.texto.replace(/\u0000imagen-\d+\u0000/g, (m) => etiquetas.get(m) ?? '') }))
      : cuerpo;
    const { lineas: cuerpoFinal, ejercicios } = separarEjercicios(separarImagenesSolas(conImagenes));

    imagenesPorLeccion.push({ leccion: leccion.id, titulo: leccion.titulo, imagenes: imagenesUsadas.size });

    const archivo = path.join(SALIDA, curso.id, `${leccion.slug}.md`);
    const contenido = armarArchivoLeccion(
      {
        curso: curso.id,
        modulo: modulo.id,
        leccion: leccion.slug,
        titulo: leccion.titulo,
        orden,
        minutos: leccion.minutos,
        idioma: leccion.idioma,
        riesgo: leccion.riesgo,
        fuente: leccion.fuente,
        imagenes: imagenes.length,
        ejercicios,
      },
      cuerpoFinal,
    );
    generados.add(path.resolve(archivo));
    const anterior = await readFile(archivo, 'utf8').catch(() => null);
    if (anterior !== contenido) {
      await mkdir(path.dirname(archivo), { recursive: true });
      await writeFile(archivo, contenido);
      escritos++;
    }
  }

  // ── 4. Limpieza, copia de imágenes y reportes ──────────────────────────────
  await mkdir(SALIDA, { recursive: true });
  const leccionesBorradas = await borrarSobrantes(SALIDA, generados);
  await mkdir(PUBLICO, { recursive: true });
  if (webp) console.log(`Publicando imágenes en public/apuntes/ (PNG y JPG → WebP, calidad ${CALIDAD_WEBP}; la primera vez tarda unos minutos)…`);
  const copia = await copiarArchivos([...copias.values()], PUBLICO);
  reporte.imagenesSinConvertir = copia.fallidos.map((f) => ({ archivo: path.relative(RAIZ, f.origen), error: f.error }));
  const bytesPublico = await tamanoCarpeta(PUBLICO);

  await writeFile(HOJA_REVISION, hojaRevisionCapturas(capturasRiesgoMedio, adjuntosParaRevisar, capturasRiesgoAlto));

  const conteoOmitidas = omitidas.reduce((acc, o) => ({ ...acc, [o.motivo]: (acc[o.motivo] ?? 0) + 1 }), /** @type {Record<string, number>} */ ({}));
  const masImagenes = [...imagenesPorLeccion].sort((a, b) => b.imagenes - a.imagenes).slice(0, 10);
  const resumen = {
    leccionesGeneradas: preparadas.length,
    leccionesEscritas: escritos,
    leccionesBorradas,
    leccionesNoGeneradas: conteoOmitidas,
    archivosPublicados: copias.size,
    archivosCopiados: copia.copiados,
    archivosConvertidosAWebp: copia.convertidos,
    tamanoOriginalesMB: Math.round((copia.bytesOriginales / 1024 / 1024) * 10) / 10,
    archivosBorrados: copia.borrados,
    tamanoPublicoMB: Math.round((bytesPublico / 1024 / 1024) * 10) / 10,
    capturasParaRevisar: capturasRiesgoMedio.length + capturasRiesgoAlto.length,
    capturasRiesgoAlto: capturasRiesgoAlto.length,
    segundos: Math.round((Date.now() - inicio) / 100) / 10,
  };
  await writeFile(
    REPORTE,
    `${JSON.stringify({ ocultarDatosPersonales: ajustes.ocultarDatosPersonales, ocultarRiesgoAlto: ajustes.ocultarRiesgoAlto, resumen, avisos, masImagenes, ...reporte }, null, 2)}\n`,
  );

  imprimirResumen(resumen, reporte, avisos, masImagenes);
  const errores = reporte.notasFaltantes.length + reporte.seccionesSinEmpatar.length + reporte.imagenesSinConvertir.length;
  if (errores) process.exitCode = 1;
}

/**
 * @param {Record<string, any>} resumen
 * @param {Record<string, any>} reporte
 * @param {string[]} avisos
 * @param {any[]} masImagenes
 */
function imprimirResumen(resumen, reporte, avisos, masImagenes) {
  const lista = (/** @type {any[]} */ elementos, /** @type {(x: any) => string} */ formato, limite = 15) => {
    for (const e of elementos.slice(0, limite)) console.log(`    - ${formato(e)}`);
    if (elementos.length > limite) console.log(`    … y ${elementos.length - limite} más (ver contenido-generado/_reporte.json)`);
  };
  const noGeneradas = Object.entries(resumen.leccionesNoGeneradas).map(([m, n]) => `${n} ${m}`).join(', ');
  console.log('\nSincronización de apuntes');
  console.log(`  ✓ ${resumen.leccionesGeneradas} lecciones generadas (${resumen.leccionesEscritas} con cambios, ${resumen.leccionesBorradas} borradas por ya no ser visibles)`);
  console.log(`    No se generan: ${noGeneradas || 'ninguna'}`);
  console.log(`  ✓ ${resumen.archivosPublicados} imágenes y adjuntos en public/apuntes/ (${resumen.archivosConvertidosAWebp} convertidos a WebP y ${resumen.archivosCopiados} copiados ahora, ${resumen.archivosBorrados} borrados) · ${resumen.tamanoPublicoMB} MB (los originales pesan ${resumen.tamanoOriginalesMB} MB)`);
  if (reporte.imagenesSinConvertir.length) {
    console.log(`  ✗ ${reporte.imagenesSinConvertir.length} imágenes no se pudieron convertir a WebP (WebP admite hasta 16 383 px por lado):`);
    lista(reporte.imagenesSinConvertir, (e) => `${e.archivo}: ${e.error}`);
  }
  console.log(`  · ${reporte.imagenesAmbiguas.length} imágenes ambiguas resueltas por cercanía (detalle en _reporte.json)`);
  console.log(`  · ${reporte.imagenesOmitidas.length} imágenes omitidas por imagenesOcultas`);
  console.log(`  · ${resumen.capturasParaRevisar} capturas en contenido-generado/_revision-capturas.html (${resumen.capturasRiesgoAlto} de riesgo alto, en su propia sección)`);
  console.log(`  · ${reporte.enlacesANavegacionQuitados} enlaces «volver al índice» quitados`);
  console.log(`  · ${reporte.titulosRepetidosQuitados} títulos repetidos quitados al inicio de la lección (el lector ya muestra el título)`);
  console.log(`  · ${reporte.leccionesConEncabezadosBajados} lecciones con sus encabezados un nivel abajo (tenían más de un «# …»)`);
  console.log(`  ${reporte.imagenesSinMedidas.length ? '!' : '✓'} ${reporte.imagenesSinMedidas.length} imágenes sin ancho y alto (se ven, pero la página puede saltar al cargar)`);
  console.log(`  · ${reporte.enlacesATextoPlano.length} enlaces convertidos a texto plano:`);
  lista(reporte.enlacesATextoPlano, (e) => `${e.leccion}: ${e.enlace} (${e.motivo}) — ${e.archivo}:${e.linea}`);
  console.log(`  ${reporte.imagenesNoEncontradas.length ? '✗' : '✓'} ${reporte.imagenesNoEncontradas.length} imágenes no encontradas`);
  lista(reporte.imagenesNoEncontradas, (e) => `${e.enlace} — ${e.archivo}:${e.linea}`, 50);
  if (reporte.fuentesPendientes.length) {
    const carpetas = [...new Set(reporte.fuentesPendientes.map((f) => f.carpeta))].join(', ');
    console.log(`  · ${reporte.fuentesPendientes.length} lecciones esperan su carpeta de apuntes (${carpetas}, todavía no existe)`);
  }
  if (reporte.notasFaltantes.length) {
    console.log(`  ✗ ${reporte.notasFaltantes.length} notas no encontradas:`);
    lista(reporte.notasFaltantes, (e) => `${e.leccion}: ${e.archivo}`);
  }
  if (reporte.seccionesSinEmpatar.length) {
    console.log(`  ✗ ${reporte.seccionesSinEmpatar.length} «seccion» sin encabezado que coincida:`);
    lista(reporte.seccionesSinEmpatar, (e) => `${e.leccion}: «${e.seccion}» en ${e.archivo}`);
  }
  for (const aviso of avisos) console.log(`  ! ${aviso}`);
  console.log(`  Lecciones con más imágenes: ${masImagenes.slice(0, 3).map((l) => `${l.leccion} (${l.imagenes})`).join(', ')}`);
  console.log(`  Tiempo: ${resumen.segundos} s\n`);
}

main().catch((e) => {
  console.error('✗ La sincronización falló:', e instanceof Error ? e.message : e);
  console.error('  Si el error habla de datos/, corre `npm run validar` para ver el detalle.');
  process.exit(1);
});
