/**
 * Imágenes y adjuntos: nombres públicos y copia a `public/apuntes/<curso>/`.
 *
 * - Solo se publican los archivos que usa alguna lección visible (lo decide `index.mjs`).
 * - Las capturas PNG y JPG se **convierten a WebP** (calidad `CALIDAD_WEBP`): pesan ~74 % menos y se ven igual.
 *   SVG, GIF (puede estar animado) y adjuntos (PDF…) se copian tal cual. La conversión usa `sharp`, que ya trae
 *   Astro; si no estuviera, todo se copia sin convertir.
 * - El nombre público es el slug del nombre más la extensión en minúsculas (`021.PNG` → `021.webp`; un SVG,
 *   `mapa.svg`). Si dos archivos distintos del mismo curso darían el mismo nombre, se antepone el slug de su carpeta
 *   (`bash-syntax-001.webp`) y, si aún choca, un número (`001-2.webp`).
 * - Una segunda ejecución solo publica lo que cambió y borra lo que ya no se usa. Una copia se repite si cambian su
 *   tamaño o su fecha; una conversión, si el original es más nuevo que el WebP. Si cambias `CALIDAD_WEBP`, borra
 *   `public/apuntes/` para que todo se vuelva a convertir.
 * - `medirImagen` lee el ancho y el alto de cada imagen para las `<img>` (el WebP conserva las medidas).
 */
import { copyFile, mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { slugificar } from './resolver-enlaces.mjs';

/**
 * Reparte nombres públicos sin colisiones dentro de un curso. Recordar la asignación hace que la misma imagen
 * usada en dos lecciones tenga un solo nombre.
 */
export class NombresPublicos {
  /** @param {{ webp?: boolean }} [opciones]  `webp`: los PNG y JPG se publican como `.webp`. */
  constructor({ webp = false } = {}) {
    this.webp = webp;
    /** @type {Map<string, string>} clave de origen → nombre público */
    this.asignados = new Map();
    /** @type {Set<string>} */
    this.usados = new Set();
  }

  /**
   * @param {string} rutaOrigen  Ruta del archivo original, única (se usa como clave). Puede llevar delante el id de
   *                             su fuente (`notes-tecnologia:Vault/images/001.png`); ese prefijo no entra en el nombre.
   * @returns {string}           Nombre público, por ejemplo `021.webp`.
   */
  nombre(rutaOrigen) {
    const previo = this.asignados.get(rutaOrigen);
    if (previo) return previo;
    const partes = rutaOrigen.replace(/^[^/:]*:/, '').split('/');
    const archivo = partes[partes.length - 1];
    const punto = archivo.lastIndexOf('.');
    const original = punto > 0 ? archivo.slice(punto).toLowerCase() : '';
    const ext = this.webp && SE_CONVIERTEN_A_WEBP.has(original) ? '.webp' : original;
    const base = slugificar(punto > 0 ? archivo.slice(0, punto) : archivo) || 'archivo';
    // Carpeta que da contexto: la más cercana que no sea «images» o «imagenes».
    const carpeta = [...partes.slice(0, -1)].reverse().find((c) => !/^(images?|imagenes|img|assets|files)$/i.test(c));
    const opciones = [`${base}${ext}`, ...(carpeta ? [`${slugificar(carpeta)}-${base}${ext}`] : [])];
    let elegido = opciones.find((o) => !this.usados.has(o));
    for (let n = 2; !elegido; n++) if (!this.usados.has(`${base}-${n}${ext}`)) elegido = `${base}-${n}${ext}`;
    this.usados.add(elegido);
    this.asignados.set(rutaOrigen, elegido);
    return elegido;
  }
}

// ── WebP ─────────────────────────────────────────────────────────────────────

/** Extensiones que se publican como WebP. GIF no: puede estar animado. */
export const SE_CONVIERTEN_A_WEBP = new Set(['.png', '.jpg', '.jpeg']);

/** Calidad de las capturas en WebP (0-100). 85 se ve igual que el PNG y pesa ~74 % menos. */
export const CALIDAD_WEBP = 85;

/** Cuántas imágenes se convierten a la vez. */
const EN_PARALELO = 4;

/** `true` si se pueden convertir imágenes (está `sharp`). */
export async function puedeConvertirAWebp() {
  return (await obtenerSharp()) !== null;
}

/** `true` si ese archivo se publica convirtiéndolo (el destino es `.webp` y el original no). */
export function seConvierte(/** @type {string} */ origen, /** @type {string} */ destino) {
  return destino.toLowerCase().endsWith('.webp') && !origen.toLowerCase().endsWith('.webp');
}

/**
 * Convierte una imagen a WebP, girada según su EXIF (igual que las medidas de `medirImagen`).
 * @param {string} origen
 * @param {string} destino
 */
export async function convertirAWebp(origen, destino) {
  const sharp = await obtenerSharp();
  if (!sharp) throw new Error('falta sharp para convertir a WebP');
  await sharp(origen).rotate().webp({ quality: CALIDAD_WEBP }).toFile(destino);
}

// ── Publicar ─────────────────────────────────────────────────────────────────

/**
 * Publica los archivos en su destino si faltan o cambiaron (copiándolos o convirtiéndolos a WebP, según la extensión
 * del destino), y borra de `carpetaDestino` lo que ya no está en la lista (así, una imagen puesta en
 * `imagenesOcultas` o de una lección que se ocultó desaparece de `public/apuntes/`).
 * Un archivo que no se puede convertir no detiene a los demás: queda en `fallidos`.
 * @param {{ origen: string, destino: string }[]} archivos  Rutas absolutas.
 * @param {string} carpetaDestino  Raíz que se limpia (`public/apuntes`).
 * @returns {Promise<{ copiados: number, convertidos: number, sinCambios: number, borrados: number, bytesOriginales: number, fallidos: { origen: string, error: string }[] }>}
 */
export async function copiarArchivos(archivos, carpetaDestino) {
  let copiados = 0;
  let convertidos = 0;
  let sinCambios = 0;
  let bytesOriginales = 0;
  /** @type {{ origen: string, error: string }[]} */
  const fallidos = [];
  const esperados = new Set(archivos.map((a) => path.resolve(a.destino)));

  const publicarUno = async (/** @type {{ origen: string, destino: string }} */ { origen, destino }) => {
    const datosOrigen = await stat(origen);
    bytesOriginales += datosOrigen.size;
    const datosDestino = await stat(destino).catch(() => null);
    const convertir = seConvierte(origen, destino);
    const alDia = datosDestino && datosDestino.mtimeMs >= datosOrigen.mtimeMs && (convertir || datosDestino.size === datosOrigen.size);
    if (alDia) {
      sinCambios++;
      return;
    }
    await mkdir(path.dirname(destino), { recursive: true });
    if (!convertir) {
      await copyFile(origen, destino);
      copiados++;
      return;
    }
    try {
      await convertirAWebp(origen, destino);
      convertidos++;
    } catch (error) {
      await rm(destino, { force: true });
      fallidos.push({ origen, error: error instanceof Error ? error.message : String(error) });
    }
  };

  // Varias a la vez: convertir es lo lento (la primera vez, unos minutos para ~2 000 capturas).
  const cola = [...archivos];
  await Promise.all(
    Array.from({ length: EN_PARALELO }, async () => {
      for (let siguiente = cola.shift(); siguiente; siguiente = cola.shift()) await publicarUno(siguiente);
    }),
  );
  const borrados = await borrarSobrantes(carpetaDestino, esperados);
  return { copiados, convertidos, sinCambios, borrados, bytesOriginales, fallidos };
}

/**
 * Borra los archivos de `carpeta` (recursivo) que no están en `esperados`, y las carpetas que queden vacías.
 * @param {string} carpeta
 * @param {Set<string>} esperados  Rutas absolutas que se conservan.
 * @returns {Promise<number>} Cuántos archivos borró.
 */
export async function borrarSobrantes(carpeta, esperados) {
  let borrados = 0;
  const entradas = await readdir(carpeta, { withFileTypes: true }).catch(() => []);
  for (const entrada of entradas) {
    const ruta = path.resolve(carpeta, entrada.name);
    if (entrada.isDirectory()) {
      borrados += await borrarSobrantes(ruta, esperados);
      if (!(await readdir(ruta)).length) await rm(ruta, { recursive: true });
    } else if (!esperados.has(ruta)) {
      await rm(ruta);
      borrados++;
    }
  }
  return borrados;
}

/**
 * Tamaño total de una carpeta, en bytes.
 * @param {string} carpeta
 * @returns {Promise<number>}
 */
export async function tamanoCarpeta(carpeta) {
  let total = 0;
  const entradas = await readdir(carpeta, { withFileTypes: true, recursive: true }).catch(() => []);
  for (const e of entradas) if (e.isFile()) total += (await stat(path.join(e.parentPath, e.name))).size;
  return total;
}

// ── Medidas de las imágenes ─────────────────────────────────────────────────

/**
 * `sharp` no es una dependencia propia: llega con Astro (que lo usa para sus imágenes), así que no se instala
 * nada más. Se carga al primer uso; si no está, las imágenes salen sin `width`/`height` y el reporte lo dice.
 * @type {Promise<any> | null}
 */
let cargaSharp = null;
async function obtenerSharp() {
  cargaSharp ??= import('sharp').then((m) => m.default).catch(() => null);
  return cargaSharp;
}

/** @type {Map<string, { ancho: number, alto: number } | null>} ruta → medidas (una imagen usada dos veces se mide una vez) */
const medidasLeidas = new Map();

/**
 * Ancho y alto en píxeles de una imagen (PNG, JPG, GIF, WebP, SVG…), ya girada según su EXIF.
 * Solo lee la cabecera del archivo. Devuelve `null` si no se puede medir.
 * @param {string} ruta  Ruta absoluta del archivo original.
 * @returns {Promise<{ ancho: number, alto: number } | null>}
 */
export async function medirImagen(ruta) {
  if (medidasLeidas.has(ruta)) return medidasLeidas.get(ruta) ?? null;
  const sharp = await obtenerSharp();
  let medidas = null;
  if (sharp) {
    try {
      const m = await sharp(ruta).metadata();
      const ancho = m.autoOrient?.width ?? m.width;
      const alto = m.autoOrient?.height ?? m.height;
      if (ancho && alto) medidas = { ancho, alto };
    } catch {
      // Archivo dañado o formato que sharp no lee: sin medidas.
    }
  }
  medidasLeidas.set(ruta, medidas);
  return medidas;
}

/** Escapa texto para meterlo en HTML. */
function escaparHtml(/** @type {string} */ texto) {
  return texto.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c);
}

/**
 * @typedef {object} CapturaParaRevisar
 * @property {string} leccionId    `curso/slug`
 * @property {string} titulo       Título de la lección.
 * @property {string} original     Nombre del archivo original (el que se escribe en `imagenesOcultas`).
 * @property {string} rutaRelativa Ruta de la copia, relativa a `contenido-generado/` (`../public/apuntes/…`).
 */

/**
 * Hoja HTML con miniaturas de las capturas de lecciones de riesgo medio, para que una persona las revise y,
 * si alguna muestra datos reales, la agregue a `imagenesOcultas` de su lección en `datos/cursos/<curso>.json`.
 * Las capturas de riesgo alto (publicadas desde la parte 3.9, con `ocultarRiesgoAlto: false`) van aparte, en
 * «Riesgo alto (nuevo)», para revisarlas primero.
 * También lista los adjuntos publicados (PDF…) de cualquier lección, con un enlace a cada uno: pueden contener
 * datos reales y no tienen miniatura.
 * @param {CapturaParaRevisar[]} capturas  Riesgo medio.
 * @param {CapturaParaRevisar[]} [adjuntos]
 * @param {CapturaParaRevisar[]} [capturasRiesgoAlto]
 * @returns {string}
 */
export function hojaRevisionCapturas(capturas, adjuntos = [], capturasRiesgoAlto = []) {
  const porLeccion = agruparPorLeccion(capturas);
  const porLeccionAlto = agruparPorLeccion(capturasRiesgoAlto);
  const seccionAlto = capturasRiesgoAlto.length
    ? `  <h2 class="bloque" id="riesgo-alto">Riesgo alto (nuevo) <small>${capturasRiesgoAlto.length} imágenes de ${porLeccionAlto.size} lecciones · se publican desde la parte 3.9 (<code>ocultarRiesgoAlto: false</code>); revísalas primero</small></h2>
${seccionesPorLeccion(porLeccionAlto).join('\n')}
  <h2 class="bloque" id="riesgo-medio">Riesgo medio <small>${capturas.length} imágenes de ${porLeccion.size} lecciones</small></h2>`
    : '';
  const filasAdjuntos = adjuntos
    .map(
      (a) => `      <li><a href="${escaparHtml(encodeURI(a.rutaRelativa))}" target="_blank"><strong>${escaparHtml(a.original)}</strong></a> · ${escaparHtml(a.titulo)} <small>(${escaparHtml(a.leccionId)})</small></li>`,
    )
    .join('\n');
  const seccionAdjuntos = adjuntos.length
    ? `    <section>
      <h2>Adjuntos (PDF y otros) <small>${adjuntos.length} archivo(s) · ábrelos y revisa cada página</small></h2>
      <ul>
${filasAdjuntos}
      </ul>
    </section>`
    : '';
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Revisión de capturas · Pista</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; background: #FBFAF7; color: #1F1E1C; }
    h1 { margin-bottom: .25rem; }
    h2 { font-size: 1.1rem; margin-top: 2.5rem; border-bottom: 2px solid #1F1E1C; padding-bottom: .25rem; }
    h2 small { font-weight: normal; color: #57534E; }
    h2.bloque { font-size: 1.5rem; border-bottom-width: 4px; margin-top: 3rem; }
    .rejilla { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin-top: 1rem; }
    figure { margin: 0; background: #fff; border: 2px solid #1F1E1C; border-radius: 12px; padding: .5rem; }
    img { width: 100%; height: 160px; object-fit: contain; background: #F4F2ED; border-radius: 6px; }
    figcaption { font-size: .8rem; margin-top: .4rem; word-break: break-word; color: #57534E; }
    figcaption strong { color: #1F1E1C; }
    .aviso { background: #F4F2ED; border-radius: 12px; padding: 1rem; max-width: 60rem; }
  </style>
</head>
<body>
  <h1>Revisión de capturas</h1>
  <p>${capturasRiesgoAlto.length ? `${capturasRiesgoAlto.length} imágenes de riesgo alto (nuevas), ` : ''}${capturas.length} imágenes de ${porLeccion.size} lecciones con riesgo medio y ${adjuntos.length} adjunto(s). Haz clic en una miniatura para verla completa.</p>
  <div class="aviso">
    <p><strong>Qué buscar:</strong> correos, contraseñas, tokens, direcciones IP públicas, nombres reales o cualquier dato de una persona o empresa real.</p>
    <p><strong>Para ocultar una imagen:</strong> en <code>datos/cursos/&lt;curso&gt;.json</code>, busca la lección y agrega el nombre del archivo
    (el que aparece en negritas) a su lista <code>"imagenesOcultas"</code>. Luego corre <code>npm run sincronizar</code>: la imagen deja de copiarse
    y en su lugar la lección dice «Imagen omitida en esta versión». Con un adjunto (PDF) funciona igual.</p>
  </div>
${seccionAdjuntos}
${seccionAlto}
${seccionesPorLeccion(porLeccion).join('\n')}
</body>
</html>
`;
}

/** @param {CapturaParaRevisar[]} capturas */
function agruparPorLeccion(capturas) {
  /** @type {Map<string, CapturaParaRevisar[]>} */
  const porLeccion = new Map();
  for (const c of capturas) porLeccion.set(c.leccionId, [...(porLeccion.get(c.leccionId) ?? []), c]);
  return porLeccion;
}

/**
 * Una sección por lección, con sus miniaturas.
 * @param {Map<string, CapturaParaRevisar[]>} porLeccion
 */
function seccionesPorLeccion(porLeccion) {
  return [...porLeccion].map(([id, lista]) => {
    const tarjetas = lista
      .map(
        (c) => `      <figure>
        <a href="${escaparHtml(encodeURI(c.rutaRelativa))}" target="_blank"><img src="${escaparHtml(encodeURI(c.rutaRelativa))}" alt="" loading="lazy"></a>
        <figcaption><strong>${escaparHtml(c.original)}</strong><br>${escaparHtml(c.titulo)}</figcaption>
      </figure>`,
      )
      .join('\n');
    return `    <section>
      <h2>${escaparHtml(lista[0].titulo)} <small>${escaparHtml(id)} · ${lista.length} imagen(es)</small></h2>
      <div class="rejilla">
${tarjetas}
      </div>
    </section>`;
  });
}
