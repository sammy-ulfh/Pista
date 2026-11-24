/**
 * Reglas para resolver `![[...]]` y `[[...]]` igual que Obsidian (analisis/ANALISIS_REPO.md, sección 5.2).
 *
 * Todo aquí son funciones puras: reciben textos y listas de rutas y devuelven resultados. No leen el disco
 * (eso lo hace `index.mjs`), así que se prueban sin tocar los apuntes.
 *
 * Vocabulario:
 *   - «vault»: la carpeta de primer nivel de una fuente (`Linux_Introduction`, `Python_ofensivo`…). Las rutas de
 *     este módulo son relativas a su vault y usan `/`.
 *   - «destino»: lo que va dentro de los corchetes, sin `#encabezado` ni `|alias`.
 */
import path from 'node:path/posix';
import GithubSlugger, { slug as slugGithub } from 'github-slugger';

// ── Nombres ──────────────────────────────────────────────────────────────────

/**
 * Repara la codificación rota de algunos nombres: el espacio duro U+00A0 entre dos letras era una «á»
 * (en CP437 el byte 0xA0 es «á»). Así, `Comandos b sicos 1-2` → `Comandos básicos 1-2`.
 * También unifica la forma Unicode (NFC) para que «á» compuesta y descompuesta sean iguales.
 * @param {string} texto
 * @returns {string}
 */
export function repararNombre(texto) {
  return texto.normalize('NFC').replace(/(\p{L}) (?=\p{L})/gu, '$1á');
}

/**
 * Clave para comparar rutas: nombre reparado. Con `sinMayusculas`, además en minúsculas.
 * @param {string} ruta
 * @param {boolean} [sinMayusculas]
 */
function claveRuta(ruta, sinMayusculas = false) {
  const reparada = repararNombre(ruta);
  return sinMayusculas ? reparada.toLowerCase() : reparada;
}

/**
 * Slug: sin acentos, minúsculas, `&` → `y`, todo lo demás → `-` (analisis, sección 6).
 * @param {string} texto
 * @returns {string}
 */
export function slugificar(texto) {
  return repararNombre(texto)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, '-y-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ── Encabezados ──────────────────────────────────────────────────────────────

/**
 * Texto visible de un encabezado de Markdown: sin `*`, `_`, `` ` ``, enlaces ni etiquetas HTML.
 * Es el texto con el que Astro calcula el `id` del encabezado.
 * @param {string} texto
 */
export function textoVisibleEncabezado(texto) {
  return texto
    .replace(/<[^>]+>/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*`]/g, '')
    .replace(/(^|\W)_+|_+(?=\W|$)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Clave para comparar encabezados sin que importen el formato, las mayúsculas ni los acentos:
 * quita `*`, `_`, `` ` ``, `#` y los caracteres que Obsidian ignora en las anclas (`: ^ [ ] | ?`),
 * junta los espacios y quita los de los extremos. Sirve para `[[#Título]]` y para `seccion` de `datos/cursos/`.
 * @param {string} texto
 * @returns {string}
 */
export function claveEncabezado(texto) {
  return repararNombre(texto)
    .replace(/[*_`#:^[\]|?]/g, ' ')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * `id` que Astro le da a un encabezado (usa github-slugger sobre el texto visible). Así, un enlace `#ancla`
 * que generamos apunta exactamente al encabezado de la página.
 * @param {string} textoEncabezado  Texto del encabezado tal como está en el Markdown.
 * @param {GithubSlugger} [slugger] Para numerar repetidos (`-1`, `-2`) igual que Astro dentro de una página.
 */
export function idEncabezado(textoEncabezado, slugger) {
  const visible = textoVisibleEncabezado(textoEncabezado);
  return slugger ? slugger.slug(visible) : slugGithub(visible);
}

export { GithubSlugger };

// ── Partes de un enlace ──────────────────────────────────────────────────────

/**
 * @typedef {object} PartesEnlace
 * @property {string} destino   Ruta o nombre, sin ancla ni alias (puede ser `''` en `[[#Título]]`).
 * @property {string | null} ancla   Lo que va después de `#` (encabezado), o `null`.
 * @property {string | null} alias   Texto después de `|` que no es un tamaño, o `null`.
 * @property {string | null} tamano  `300` o `300x200` si lo que va después de `|` es un tamaño, o `null`.
 */

/**
 * Separa `destino#ancla|alias` (o `|300`, `|300x200`). Acepta `\|`, que es como se escribe `|` dentro de tablas.
 * @param {string} contenido Lo que hay entre `[[` y `]]`.
 * @returns {PartesEnlace}
 */
export function separarEnlace(contenido) {
  const limpio = contenido.replace(/\\\|/g, '|');
  const barra = limpio.indexOf('|');
  const objetivo = (barra === -1 ? limpio : limpio.slice(0, barra)).trim();
  const despues = barra === -1 ? null : limpio.slice(barra + 1).trim();
  const esTamano = despues !== null && /^\d+(x\d+)?$/.test(despues);
  const almohadilla = objetivo.indexOf('#');
  return {
    destino: (almohadilla === -1 ? objetivo : objetivo.slice(0, almohadilla)).trim(),
    ancla: almohadilla === -1 ? null : objetivo.slice(almohadilla + 1).trim(),
    alias: despues && !esTamano ? despues : null,
    tamano: esTamano ? despues : null,
  };
}

// ── Índice de archivos de un vault ───────────────────────────────────────────

/**
 * @typedef {object} IndiceVault
 * @property {Map<string, string>} porRuta           clave de ruta → ruta real
 * @property {Map<string, string>} porRutaSinMayus   igual, sin distinguir mayúsculas
 * @property {Map<string, string[]>} porNombre       clave de nombre de archivo → rutas reales
 * @property {Map<string, string[]>} porNombreSinMayus
 */

/**
 * Prepara las búsquedas sobre la lista de archivos de un vault.
 * @param {string[]} archivos Rutas relativas al vault, con `/`.
 * @returns {IndiceVault}
 */
export function crearIndiceVault(archivos) {
  /** @type {IndiceVault} */
  const indice = { porRuta: new Map(), porRutaSinMayus: new Map(), porNombre: new Map(), porNombreSinMayus: new Map() };
  const agregar = (/** @type {Map<string, string[]>} */ mapa, /** @type {string} */ clave, /** @type {string} */ ruta) => {
    const lista = mapa.get(clave);
    if (lista) lista.push(ruta);
    else mapa.set(clave, [ruta]);
  };
  for (const ruta of [...archivos].sort()) {
    indice.porRuta.set(claveRuta(ruta), ruta);
    if (!indice.porRutaSinMayus.has(claveRuta(ruta, true))) indice.porRutaSinMayus.set(claveRuta(ruta, true), ruta);
    agregar(indice.porNombre, claveRuta(path.basename(ruta)), ruta);
    agregar(indice.porNombreSinMayus, claveRuta(path.basename(ruta), true), ruta);
  }
  return indice;
}

/**
 * Cuántas carpetas iniciales comparten dos rutas de carpeta (`a/b/c` y `a/b/d` → 2).
 * @param {string} carpetaA
 * @param {string} carpetaB
 */
function carpetasEnComun(carpetaA, carpetaB) {
  const a = carpetaA === '.' ? [] : carpetaA.split('/');
  const b = carpetaB === '.' ? [] : carpetaB.split('/');
  let n = 0;
  while (n < a.length && n < b.length && claveRuta(a[n]) === claveRuta(b[n])) n++;
  return n;
}

/**
 * Elige el candidato más cercano a la nota: el que comparte más carpetas con ella; a igualdad, el de ruta
 * más corta (normalmente `<carpeta de la nota>/images/`); a igualdad, el primero en orden alfabético.
 * @param {string[]} candidatos
 * @param {string} carpetaNota
 */
function masCercano(candidatos, carpetaNota) {
  return [...candidatos].sort((x, y) => {
    const diferencia = carpetasEnComun(path.dirname(y), carpetaNota) - carpetasEnComun(path.dirname(x), carpetaNota);
    if (diferencia) return diferencia;
    const profundidad = x.split('/').length - y.split('/').length;
    return profundidad || (x < y ? -1 : x > y ? 1 : 0);
  })[0];
}

/**
 * @typedef {object} Resolucion
 * @property {string} ruta          Ruta real del archivo, relativa al vault.
 * @property {'carpeta-nota' | 'ruta-vault' | 'nombre'} como  Qué paso de la búsqueda lo encontró.
 * @property {string[]} candidatos  Todos los candidatos (más de uno = imagen ambigua resuelta por cercanía).
 */

/**
 * Busca un archivo como lo hace Obsidian:
 *   (1) relativo a la carpeta de la nota; (2) relativo a la raíz del vault; (3) por nombre dentro del vault,
 *   quedándose con el más cercano. Cada paso se intenta primero exacto y luego sin distinguir mayúsculas.
 * Los nombres con U+00A0 en lugar de «á» se encuentran igual (ver `repararNombre`).
 * @param {string} destino   Ruta o nombre escrito en el enlace (sin ancla ni alias).
 * @param {string} rutaNota  Ruta de la nota que enlaza, relativa al vault.
 * @param {IndiceVault} indice
 * @param {{ extensiones?: string[] }} [opciones]  Extensiones que se prueban si el destino no la trae (para notas: `['.md']`).
 * @returns {Resolucion | null}
 */
export function resolverArchivo(destino, rutaNota, indice, opciones = {}) {
  if (!destino) return null;
  const carpetaNota = path.dirname(rutaNota);
  const variantes = [destino, ...(opciones.extensiones ?? []).map((ext) => destino + ext)];

  for (const sinMayus of [false, true]) {
    const porRuta = sinMayus ? indice.porRutaSinMayus : indice.porRuta;
    const porNombre = sinMayus ? indice.porNombreSinMayus : indice.porNombre;
    for (const v of variantes) {
      const relativa = path.normalize(path.join(carpetaNota, v));
      const encontrada = porRuta.get(claveRuta(relativa, sinMayus));
      if (encontrada) return { ruta: encontrada, como: 'carpeta-nota', candidatos: [encontrada] };
    }
    for (const v of variantes) {
      const encontrada = porRuta.get(claveRuta(path.normalize(v), sinMayus));
      if (encontrada) return { ruta: encontrada, como: 'ruta-vault', candidatos: [encontrada] };
    }
    for (const v of variantes) {
      const sufijo = claveRuta(path.normalize(v), sinMayus);
      const candidatos = (porNombre.get(claveRuta(path.basename(v), sinMayus)) ?? []).filter((c) => {
        const clave = claveRuta(c, sinMayus);
        return clave === sufijo || clave.endsWith(`/${sufijo}`);
      });
      if (candidatos.length) return { ruta: masCercano(candidatos, carpetaNota), como: 'nombre', candidatos };
    }
  }
  return null;
}

// ── Tipos de destino ─────────────────────────────────────────────────────────

const EXTENSIONES_IMAGEN = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.avif']);

/** `true` si el destino es una imagen (sin importar mayúsculas en la extensión). */
export function esImagen(/** @type {string} */ destino) {
  return EXTENSIONES_IMAGEN.has(path.extname(destino).toLowerCase());
}

const EXTENSIONES_ADJUNTO = new Set(['.pdf', '.zip', '.txt', '.csv', '.mp3', '.mp4', '.docx', '.xlsx', '.pptx']);

/** `true` si el destino es un archivo adjunto que se ofrece para descargar (por ejemplo, un PDF). */
export function esAdjunto(/** @type {string} */ destino) {
  return EXTENSIONES_ADJUNTO.has(path.extname(destino).toLowerCase());
}

// ── Enlaces a lecciones ──────────────────────────────────────────────────────

/**
 * Una lección visible que puede recibir enlaces.
 * @typedef {object} LeccionDestino
 * @property {string} id      `curso/slug`
 * @property {string} curso
 * @property {string} url     `/cursos/<curso>/<leccion>`
 * @property {Map<string, string | null>} anclas  `claveEncabezado` → `id` del encabezado en la página
 *                                                (`null` si es el encabezado con el que empieza la lección).
 */

/**
 * @typedef {{ tipo: 'enlace', url: string, texto: string } | { tipo: 'texto', texto: string, motivo: string }} DestinoEnlace
 */

/**
 * Decide a dónde lleva un `[[…]]` que no es imagen ni adjunto.
 *   - `[[#Título]]` → ancla en la misma lección, o enlace a la lección hermana (misma nota partida) que tiene ese
 *     encabezado; si no existe, texto plano.
 *   - `[[nota]]`, `[[nota#Título]]`, `[[nota|alias]]` → enlace a la lección de esa nota (con ancla si se puede); si la
 *     nota no es una lección, o todas sus lecciones están ocultas, texto plano.
 * Si una nota está en varios cursos, se prefiere la lección del mismo curso.
 * @param {object} p
 * @param {PartesEnlace} p.partes
 * @param {LeccionDestino} p.leccionActual
 * @param {LeccionDestino[]} p.leccionesNotaActual   Lecciones visibles que salen de la misma nota (en orden).
 * @param {(destino: string) => { encontrada: boolean, lecciones: LeccionDestino[] }} p.leccionesDeNota
 * @returns {DestinoEnlace}
 */
export function resolverEnlaceNota({ partes, leccionActual, leccionesNotaActual, leccionesDeNota }) {
  const mismaNota = partes.destino === '';
  const textoAncla = partes.ancla ? textoVisibleEncabezado(partes.ancla) : '';
  const nombreNota = repararNombre(path.basename(partes.destino)).replace(/\.md$/i, '');
  const texto = partes.alias ?? (mismaNota ? textoAncla : nombreNota);

  /** @type {LeccionDestino[]} */
  let candidatas;
  if (mismaNota) {
    if (!partes.ancla) return { tipo: 'texto', texto, motivo: 'ancla vacía' };
    candidatas = leccionesNotaActual;
  } else {
    const busqueda = leccionesDeNota(partes.destino);
    if (!busqueda.encontrada) return { tipo: 'texto', texto, motivo: 'la nota no existe' };
    if (!busqueda.lecciones.length) return { tipo: 'texto', texto, motivo: 'la nota no es una lección visible' };
    candidatas = busqueda.lecciones;
  }
  // Orden de preferencia: la lección actual, las del mismo curso y luego las demás.
  const ordenadas = [
    ...candidatas.filter((l) => l.id === leccionActual.id),
    ...candidatas.filter((l) => l.id !== leccionActual.id && l.curso === leccionActual.curso),
    ...candidatas.filter((l) => l.curso !== leccionActual.curso),
  ];

  if (partes.ancla) {
    const clave = claveEncabezado(partes.ancla);
    const conAncla = ordenadas.find((l) => l.anclas.has(clave));
    if (conAncla) {
      const id = conAncla.anclas.get(clave) ?? null;
      if (conAncla.id === leccionActual.id) return id ? { tipo: 'enlace', url: `#${id}`, texto } : { tipo: 'texto', texto, motivo: 'ancla al título de la misma lección' };
      return { tipo: 'enlace', url: id ? `${conAncla.url}#${id}` : conAncla.url, texto };
    }
    if (mismaNota) return { tipo: 'texto', texto, motivo: 'el encabezado no existe o está en una lección oculta' };
  }
  const destino = ordenadas.find((l) => l.curso === leccionActual.curso) ?? ordenadas[0];
  if (destino.id === leccionActual.id) return { tipo: 'texto', texto, motivo: 'enlace a la misma lección' };
  return { tipo: 'enlace', url: destino.url, texto };
}
