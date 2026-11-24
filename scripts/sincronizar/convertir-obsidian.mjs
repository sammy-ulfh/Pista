/**
 * Convierte el Markdown de Obsidian en Markdown estándar que Astro entiende sin plugins.
 *
 * Funciones puras sobre texto. Una nota se maneja como una lista de líneas `{ texto, num }`, donde `num` es el
 * número de línea en la nota original: así, aunque se quiten secciones o se parta la nota, los avisos
 * («imagen no encontrada en la línea 42») señalan la línea real del apunte.
 *
 * Qué hace:
 *   - quita el frontmatter, los comentarios `%%…%%` y las secciones de navegación («Índice», «Siguientes apuntes»…);
 *   - parte las notas largas por el encabezado indicado en `seccion` (datos/cursos/*.json);
 *   - quita el H1 inicial (el lector ya muestra el título), baja un nivel los encabezados si quedan más H1, y saca
 *     las líneas `Ejercicio:` (van al frontmatter);
 *   - arma las `<img>` con su tamaño (`htmlImagen`);
 *   - `==texto==` → `<mark>texto</mark>`;
 *   - normaliza el lenguaje de los bloques de código (`HTML` → `html`, `python3` → `python`…);
 *   - reemplaza `![[…]]` y `[[…]]` con lo que devuelvan las funciones que recibe (ver `convertirLeccion`).
 * Nunca toca lo que está dentro de bloques de código ni de código en línea.
 */
import { claveEncabezado, GithubSlugger, idEncabezado, separarEnlace } from './resolver-enlaces.mjs';

/** @typedef {{ texto: string, num: number }} Linea */
/** @typedef {Linea & { enCodigo: boolean }} LineaAnalizada */
/** @typedef {{ indice: number, nivel: number, texto: string, num: number }} Encabezado */

// ── Líneas, bloques de código y encabezados ─────────────────────────────────

/**
 * Parte un texto en líneas numeradas desde 1.
 * @param {string} texto
 * @returns {Linea[]}
 */
export function aLineas(texto) {
  return texto.replace(/\r\n?/g, '\n').split('\n').map((t, i) => ({ texto: t, num: i + 1 }));
}

/** @param {Linea[]} lineas */
export function aTexto(lineas) {
  return lineas.map((l) => l.texto).join('\n');
}

const CERCO = /^\s*(`{3,}|~{3,})(.*)$/;

/**
 * Marca qué líneas están dentro de un bloque de código cercado (``` o ~~~). Las líneas del cerco también cuentan
 * como código.
 * @param {Linea[]} lineas
 * @returns {LineaAnalizada[]}
 */
export function marcarCodigo(lineas) {
  /** @type {string | null} */
  let abierto = null;
  return lineas.map((linea) => {
    const cerco = linea.texto.match(CERCO);
    if (abierto === null && cerco) {
      abierto = cerco[1];
      return { ...linea, enCodigo: true };
    }
    if (abierto !== null) {
      if (cerco && cerco[1][0] === abierto[0] && cerco[1].length >= abierto.length && cerco[2].trim() === '') abierto = null;
      return { ...linea, enCodigo: true };
    }
    return { ...linea, enCodigo: false };
  });
}

/**
 * Encabezados ATX (`## Título`) fuera de los bloques de código. Solo cuentan los que empiezan en la columna 0
 * a 3 (con un tabulador delante, Markdown lo trata como código o como parte de una lista).
 * @param {Linea[]} lineas
 * @returns {Encabezado[]}
 */
export function buscarEncabezados(lineas) {
  /** @type {Encabezado[]} */
  const encontrados = [];
  marcarCodigo(lineas).forEach((linea, indice) => {
    if (linea.enCodigo) return;
    const m = linea.texto.match(/^ {0,3}(#{1,6})[ \t]+(.*?)(?:[ \t]+#+)?[ \t]*$/);
    if (m && m[2].trim()) encontrados.push({ indice, nivel: m[1].length, texto: m[2].trim(), num: linea.num });
  });
  return encontrados;
}

// ── Limpieza ─────────────────────────────────────────────────────────────────

/**
 * Quita el frontmatter YAML del inicio (solo una nota del repositorio lo tiene).
 * @param {Linea[]} lineas
 */
export function quitarFrontmatter(lineas) {
  if (lineas[0]?.texto.trim() !== '---') return lineas;
  const fin = lineas.findIndex((l, i) => i > 0 && l.texto.trim() === '---');
  return fin === -1 ? lineas : lineas.slice(fin + 1);
}

/**
 * Quita los comentarios de Obsidian `%%…%%` (en una línea o en varias), fuera de los bloques de código.
 * @param {Linea[]} lineas
 */
export function quitarComentarios(lineas) {
  let dentro = false;
  /** @type {Linea[]} */
  const resultado = [];
  for (const linea of marcarCodigo(lineas)) {
    if (linea.enCodigo && !dentro) {
      resultado.push({ texto: linea.texto, num: linea.num });
      continue;
    }
    let texto = '';
    const trozos = linea.texto.split('%%');
    trozos.forEach((trozo, i) => {
      if (i > 0) dentro = !dentro;
      if (!dentro) texto += trozo;
    });
    // Una línea que solo tenía un comentario desaparece; las demás se quedan.
    if (texto.trim() !== '' || linea.texto.trim() === '') resultado.push({ texto, num: linea.num });
  }
  return resultado;
}

/**
 * Encabezados de navegación que se quitan: el lector ya tiene su propia lista de lecciones y botones de
 * «anterior / siguiente» (CONSTRUCCION.md, sección 1). Se comparan con `claveEncabezado`, así que no importan
 * mayúsculas, acentos ni negritas. Incluye las variantes reales del repositorio (y sus erratas).
 */
export const SECCIONES_NAVEGACION = [
  'Índice', 'Indice', 'Index',
  'Siguientes apuntes', 'Siguiente apuntes', 'Siguientes notas', 'Next Notes', 'Nexto Notes',
  'Apuntes anteriores',
];
const CLAVES_NAVEGACION = new Set(SECCIONES_NAVEGACION.map(claveEncabezado));

/**
 * `true` si la línea es solo una lista de enlaces a encabezados (`- [[#Título]]`): así se ven los índices.
 * @param {string} texto
 */
function esLineaDeIndice(texto) {
  return /^\s*([-*+]|\d+\.)\s+\[\[#[^\]]*\]\]\s*$/.test(texto);
}

/**
 * Quita las secciones de navegación: desde su encabezado hasta el siguiente encabezado (de cualquier nivel; estas
 * secciones nunca tienen subsecciones, y en la nota de POO el índice H2 va seguido de una lección H3).
 * Una sección cuenta como navegación si su encabezado está en `SECCIONES_NAVEGACION`, o si todo su contenido es una
 * lista de enlaces `[[#…]]` (un índice con otro nombre, como «Temario» en `HTML (Conceptos).md`).
 * @param {Linea[]} lineas
 * @param {Set<string>} [claves]  Claves (`claveEncabezado`) de los encabezados a quitar.
 */
export function quitarSeccionesNavegacion(lineas, claves = CLAVES_NAVEGACION) {
  const encabezados = buscarEncabezados(lineas);
  const quitar = new Set();
  encabezados.forEach((e, i) => {
    const fin = encabezados[i + 1]?.indice ?? lineas.length;
    const contenido = lineas.slice(e.indice + 1, fin).filter((l) => l.texto.trim() !== '');
    const esIndice = contenido.length > 0 && contenido.every((l) => esLineaDeIndice(l.texto));
    if (!claves.has(claveEncabezado(e.texto)) && !esIndice) return;
    for (let j = e.indice; j < fin; j++) quitar.add(j);
  });
  return lineas.filter((_, i) => !quitar.has(i));
}

/**
 * `true` si un `[[#Título]]` apunta a una sección de navegación (por ejemplo, el «volver al [[#Índice]]» del final
 * de algunas secciones). Esos enlaces se quitan, porque su destino ya no existe.
 * @param {string | null} ancla
 */
export function esAnclaDeNavegacion(ancla) {
  return ancla !== null && CLAVES_NAVEGACION.has(claveEncabezado(ancla));
}

/**
 * Quita líneas vacías al principio y al final, y deja como mucho dos líneas vacías seguidas.
 * @param {Linea[]} lineas
 */
export function recortarVacias(lineas) {
  let inicio = 0;
  let fin = lineas.length;
  while (inicio < fin && lineas[inicio].texto.trim() === '') inicio++;
  while (fin > inicio && lineas[fin - 1].texto.trim() === '') fin--;
  /** @type {Linea[]} */
  const resultado = [];
  let vacias = 0;
  for (const linea of marcarCodigo(lineas.slice(inicio, fin))) {
    vacias = !linea.enCodigo && linea.texto.trim() === '' ? vacias + 1 : 0;
    if (vacias <= 2) resultado.push({ texto: linea.texto, num: linea.num });
  }
  return resultado;
}

// ── Partir notas largas ──────────────────────────────────────────────────────

/**
 * @typedef {object} ResultadoParticion
 * @property {Map<string, Linea[]>} partes  `seccion` → líneas de esa lección (empieza en su encabezado o en
 *                                           los bloques sin lección que se le unieron antes).
 * @property {string[]} sinEmpatar          `seccion` (o encabezados de `bloquesExtra`) que no coinciden con ningún
 *                                           encabezado (es un error).
 * @property {{ encabezado: string, num: number, seUneA: string, porBloquesExtra?: true }[]} unidos
 *                                           Bloques sin lección y a cuál se unieron.
 */

/**
 * Parte una nota en lecciones según las `seccion` de `datos/cursos/` (en el orden en que aparecen en la nota).
 *
 * Regla (analisis/ANALISIS_REPO.md, sección 2.1): cada `seccion` es el encabezado donde empieza una lección. La
 * nota se corta en bloques en cada encabezado de nivel 1 o 2 y en cada encabezado que sea una `seccion` (aunque
 * sea de nivel 3: en la nota de POO, «Clases y objetos (1/2)» es H3). Un bloque que no es de ninguna lección
 * (por ejemplo «¿Qué es Picom?») se une a la lección siguiente; lo que quede al final, a la última.
 *
 * Excepción: un bloque cuyo encabezado aparece en `bloquesExtra` de una lección (datos/cursos/*.json) va a esa
 * lección, en el orden en que está en la nota (sirve para unirlo a la lección ANTERIOR, si es su continuación).
 *
 * Los encabezados se comparan con `claveEncabezado`: sin `*`, `_`, `` ` ``, `#`, mayúsculas ni acentos.
 * @param {Linea[]} lineas  La nota ya sin frontmatter ni secciones de navegación.
 * @param {string[]} secciones
 * @param {Record<string, string[]>} [bloquesExtra]  `seccion` → encabezados de bloques que se le agregan.
 * @returns {ResultadoParticion}
 */
export function partirPorSecciones(lineas, secciones, bloquesExtra = {}) {
  const encabezados = buscarEncabezados(lineas);
  /** @type {Map<number, string>} índice de línea → seccion que empieza ahí */
  const inicios = new Map();
  /** @type {string[]} */
  const sinEmpatar = [];
  let desde = 0;
  for (const seccion of secciones) {
    const clave = claveEncabezado(seccion);
    // Se busca después de la sección anterior; si no está ahí, en toda la nota (el orden de datos/ puede variar).
    const posicion =
      encabezados.findIndex((e, i) => i >= desde && claveEncabezado(e.texto) === clave && !inicios.has(e.indice)) ;
    const encontrada = posicion !== -1 ? posicion : encabezados.findIndex((e) => claveEncabezado(e.texto) === clave && !inicios.has(e.indice));
    if (encontrada === -1) {
      sinEmpatar.push(seccion);
      continue;
    }
    inicios.set(encabezados[encontrada].indice, seccion);
    desde = encontrada + 1;
  }

  // Cortes: encabezados de nivel 1-2 y todos los que empiezan una lección.
  const cortes = encabezados.filter((e) => e.nivel <= 2 || inicios.has(e.indice)).map((e) => e.indice);
  if (!cortes.includes(0)) cortes.unshift(0);
  const bloques = cortes.map((inicio, i) => ({
    inicio,
    lineas: lineas.slice(inicio, cortes[i + 1] ?? lineas.length),
    seccion: inicios.get(inicio) ?? null,
  }));

  /** @type {ResultadoParticion['unidos']} */
  const unidos = [];

  // Bloques sin lección que `bloquesExtra` manda a una lección concreta.
  const seccionesEncontradas = new Set(inicios.values());
  /** @type {Map<string, string>} clave del encabezado → seccion */
  const destinoExtra = new Map();
  for (const [seccion, encabezadosExtra] of Object.entries(bloquesExtra)) {
    if (!seccionesEncontradas.has(seccion)) continue; // su seccion ya está en sinEmpatar
    for (const e of encabezadosExtra) destinoExtra.set(claveEncabezado(e), seccion);
  }
  /** @type {Map<typeof bloques[number], string>} bloque → seccion a la que va por `bloquesExtra` */
  const bloquesAsignados = new Map();
  for (const bloque of bloques) {
    if (bloque.seccion !== null) continue;
    const titulo = buscarEncabezados(bloque.lineas)[0];
    if (!titulo || titulo.indice !== 0) continue;
    const seccion = destinoExtra.get(claveEncabezado(titulo.texto));
    if (seccion === undefined) continue;
    bloquesAsignados.set(bloque, seccion);
    unidos.push({ encabezado: titulo.texto, num: titulo.num, seUneA: seccion, porBloquesExtra: true });
  }
  for (const [seccion, encabezadosExtra] of Object.entries(bloquesExtra)) {
    if (!seccionesEncontradas.has(seccion)) continue;
    for (const e of encabezadosExtra) {
      const usado = unidos.some((u) => u.porBloquesExtra && claveEncabezado(u.encabezado) === claveEncabezado(e));
      if (!usado) sinEmpatar.push(e);
    }
  }

  /** @type {Map<string, Linea[]>} */
  const partes = new Map();
  /** @type {typeof bloques} */
  let pendientes = [];
  /** @type {string | null} */
  let ultima = null;
  for (const bloque of bloques) {
    if (bloquesAsignados.has(bloque)) continue;
    if (bloque.seccion === null) {
      pendientes.push(bloque);
      continue;
    }
    partes.set(bloque.seccion, [...pendientes.flatMap((b) => b.lineas), ...bloque.lineas]);
    for (const b of pendientes) registrarUnion(b, bloque.seccion);
    pendientes = [];
    ultima = bloque.seccion;
  }
  if (ultima !== null && pendientes.length) {
    partes.set(ultima, [...(partes.get(ultima) ?? []), ...pendientes.flatMap((b) => b.lineas)]);
    for (const b of pendientes) registrarUnion(b, ultima);
  }
  // Los bloques extra se agregan a su lección respetando el orden de la nota (`num` es la línea original).
  for (const [bloque, seccion] of bloquesAsignados) {
    const lineasLeccion = [...(partes.get(seccion) ?? []), ...bloque.lineas].sort((a, b) => a.num - b.num);
    partes.set(seccion, lineasLeccion);
  }
  return { partes, sinEmpatar, unidos };

  /** @param {{ lineas: Linea[] }} bloque @param {string} seccion */
  function registrarUnion(bloque, seccion) {
    const primera = bloque.lineas.find((l) => l.texto.trim() !== '');
    if (!primera) return; // un bloque vacío no se reporta
    const titulo = buscarEncabezados(bloque.lineas)[0];
    unidos.push({ encabezado: titulo && titulo.indice === 0 ? titulo.texto : '(texto antes del primer encabezado)', num: primera.num, seUneA: seccion });
  }
}

/**
 * Si la lección empieza con su propio encabezado (el de `seccion`), lo quita: el lector ya muestra el título.
 * @param {Linea[]} lineas
 * @param {string} seccion
 */
export function quitarEncabezadoInicial(lineas, seccion) {
  const primera = lineas.findIndex((l) => l.texto.trim() !== '');
  if (primera === -1) return lineas;
  const encabezado = buscarEncabezados(lineas.slice(primera, primera + 1))[0];
  if (!encabezado || claveEncabezado(encabezado.texto) !== claveEncabezado(seccion)) return lineas;
  return [...lineas.slice(0, primera), ...lineas.slice(primera + 1)];
}

/**
 * Si el cuerpo de la lección empieza con un H1 (`# Título`), lo quita: el lector ya muestra el título de la
 * lección, y sin esto se vería dos veces. Se ignoran las líneas vacías previas y el encabezado se reconoce como
 * los de `seccion` (`buscarEncabezados`: hasta 3 espacios delante, `#` de cierre opcional; nunca dentro de
 * código). Solo se quita esa línea: lo que sigue (incluido un bloque unido con `bloquesExtra`) se conserva.
 * @param {Linea[]} lineas
 * @returns {{ lineas: Linea[], titulo: string | null }}  `titulo`: el texto del H1 quitado (para las anclas).
 */
export function quitarH1Inicial(lineas) {
  const primera = lineas.findIndex((l) => l.texto.trim() !== '');
  if (primera === -1) return { lineas, titulo: null };
  const encabezado = buscarEncabezados(lineas.slice(primera, primera + 1))[0];
  if (!encabezado || encabezado.nivel !== 1) return { lineas, titulo: null };
  return { lineas: [...lineas.slice(0, primera), ...lineas.slice(primera + 1)], titulo: encabezado.texto };
}

/**
 * La página ya tiene su `<h1>` (el título de la lección), y debe haber uno solo. Si al cuerpo le quedan
 * encabezados de nivel 1 (notas con varias secciones `# …`), todos sus encabezados bajan un nivel
 * (`#` → `##`, `##` → `###`…; `######` se queda igual). Las anclas no cambian: no dependen del nivel.
 * @param {Linea[]} lineas
 * @returns {{ lineas: Linea[], bajados: boolean }}
 */
export function bajarEncabezados(lineas) {
  const encabezados = buscarEncabezados(lineas);
  if (!encabezados.some((e) => e.nivel === 1)) return { lineas, bajados: false };
  const indices = new Set(encabezados.filter((e) => e.nivel < 6).map((e) => e.indice));
  return {
    lineas: lineas.map((l, i) => (indices.has(i) ? { ...l, texto: l.texto.replace(/^( {0,3})#/, '$1##') } : l)),
    bajados: true,
  };
}

// ── Ejercicios ───────────────────────────────────────────────────────────────

/**
 * Saca del cuerpo las líneas que empiezan con `Ejercicio:` (fuera de código y sin sangría) y devuelve su texto.
 * El lector las muestra en una caja (`CajaAviso`) al final de la lección; los cursos de `apuntes-demo/` las
 * escriben como última línea de cada nota.
 * @param {Linea[]} lineas
 * @returns {{ lineas: Linea[], ejercicios: string[] }}
 */
export function separarEjercicios(lineas) {
  /** @type {string[]} */
  const ejercicios = [];
  /** @type {Linea[]} */
  const resto = [];
  for (const linea of marcarCodigo(lineas)) {
    const m = !linea.enCodigo && linea.texto.match(/^Ejercicio:\s*(.+?)\s*$/);
    // Va sola en una caja titulada «Ejercicio», así que empieza con mayúscula.
    if (m) ejercicios.push(m[1].charAt(0).toUpperCase() + m[1].slice(1));
    else resto.push({ texto: linea.texto, num: linea.num });
  }
  return { lineas: resto, ejercicios };
}

// ── Imágenes ─────────────────────────────────────────────────────────────────

/** Escapa texto para un atributo HTML. */
function escaparAtributo(/** @type {string} */ texto) {
  return texto.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c);
}

/**
 * Etiqueta `<img>` de una imagen de la lección (HTML dentro del Markdown, que Astro respeta tal cual).
 * Lleva `width` y `height` (medidos en la sincronización) para que la página no salte al cargar, y
 * `loading="lazy"` salvo la primera imagen de la lección, que se ve pronto.
 * @param {{ url: string, alt: string, ancho?: number | null, alto?: number | null, primera?: boolean }} imagen
 */
export function htmlImagen({ url, alt, ancho = null, alto = null, primera = false }) {
  const atributos = [
    `src="${escaparAtributo(url)}"`,
    `alt="${escaparAtributo(alt)}"`,
    ...(ancho && alto ? [`width="${ancho}"`, `height="${alto}"`] : []),
    ...(primera ? [] : ['loading="lazy"']),
    'decoding="async"',
  ];
  return `<img ${atributos.join(' ')}>`;
}

const IMAGEN_SOLA = /^[ \t]*<img [^>]*>[ \t]*$/;

/**
 * En Markdown, una línea que solo tiene `<img …>` abre un bloque de HTML que dura hasta la siguiente línea vacía:
 * el texto pegado debajo («## Título», «**negritas**») saldría tal cual, sin formato. Con `![…](…)` eso no pasaba,
 * así que aquí se agrega una línea vacía después de esas imágenes cuando la siguiente línea tiene texto.
 * @param {Linea[]} lineas
 */
export function separarImagenesSolas(lineas) {
  /** @type {Linea[]} */
  const resultado = [];
  const analizadas = marcarCodigo(lineas);
  analizadas.forEach((linea, i) => {
    resultado.push({ texto: linea.texto, num: linea.num });
    const siguiente = analizadas[i + 1];
    if (linea.enCodigo || !IMAGEN_SOLA.test(linea.texto) || !siguiente) return;
    if (siguiente.texto.trim() !== '' && !IMAGEN_SOLA.test(siguiente.texto)) resultado.push({ texto: '', num: linea.num });
  });
  return resultado;
}

// ── Bloques de código ────────────────────────────────────────────────────────

/**
 * Lenguajes que no son estándar o que el resaltador no conoce, y a qué se cambian
 * (analisis/ANALISIS_REPO.md, sección 5.1). Lo demás solo pasa a minúsculas. Sin lenguaje → `text`.
 */
export const LENGUAJES = {
  python3: 'python', msf: 'shell', pip: 'shell', pip3: 'shell', docker: 'shell', smbclient: 'shell', shebang: 'shell',
  git: 'shell', txt: 'text', url: 'text', web: 'text', post: 'http', j2: 'jinja', yml: 'yaml',
};

/**
 * Normaliza el lenguaje de cada bloque de código: minúsculas y los cambios de `LENGUAJES`.
 * @param {Linea[]} lineas
 */
export function normalizarLenguajes(lineas) {
  /** @type {string | null} */
  let abierto = null;
  return lineas.map((linea) => {
    const cerco = linea.texto.match(/^(\s*)(`{3,}|~{3,})\s*([^\s`]*)(.*)$/);
    if (!cerco) return linea;
    if (abierto !== null) {
      if (cerco[2][0] === abierto[0] && cerco[2].length >= abierto.length && !cerco[3] && !cerco[4].trim()) abierto = null;
      return linea;
    }
    abierto = cerco[2];
    const original = cerco[3].toLowerCase();
    const lenguaje = original === '' ? 'text' : (LENGUAJES[/** @type {keyof typeof LENGUAJES} */ (original)] ?? original);
    return { ...linea, texto: `${cerco[1]}${cerco[2]}${lenguaje}${cerco[4]}` };
  });
}

// ── Texto en línea ───────────────────────────────────────────────────────────

/**
 * Aplica `fn` solo a los trozos de la línea que no son código en línea (`` `así` ``).
 * @param {string} texto
 * @param {(trozo: string) => string} fn
 */
export function fueraDeCodigoEnLinea(texto, fn) {
  return texto
    .split(/(`+[^`]*`+)/)
    .map((trozo, i) => (i % 2 === 1 ? trozo : fn(trozo)))
    .join('');
}

/**
 * `==texto==` → `<mark>texto</mark>`.
 * @param {string} texto
 */
export function convertirResaltado(texto) {
  return fueraDeCodigoEnLinea(texto, (t) => t.replace(/==(?=\S)(.+?)(?<=\S)==/g, '<mark>$1</mark>'));
}

/**
 * Texto alternativo de una imagen. Si la nota lo escribe después de `|` (`![[images/mapa.svg|Mapa de canales]]`,
 * como en Obsidian), se usa ese. Si no, sale del nombre de archivo: los nombres genéricos (`001.png`,
 * `IMG_0040.png`, `Pasted image…`, `Screenshot…`) dan «Captura de los apuntes»; los demás se vuelven
 * frase (`quality_gates.png` → «Quality gates»).
 * @param {string} nombreArchivo
 * @param {string | null} [alias]  Texto después de `|` (no un tamaño).
 */
export function textoAlternativo(nombreArchivo, alias = null) {
  if (alias) return alias.replace(/[[\]]/g, '');
  const base = nombreArchivo.replace(/^.*\//, '').replace(/\.[^.]+$/, '');
  const generico = /^(img|image|imagen|pasted image|screenshot|captura|cap)?[\s_-]*[\d\s_-]*$/i;
  if (generico.test(base) || /^(pasted image|screenshot)/i.test(base)) return 'Captura de los apuntes';
  const frase = base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  return frase.charAt(0).toUpperCase() + frase.slice(1);
}

// ── Conversión de una lección ────────────────────────────────────────────────

/**
 * @typedef {object} EnlaceEncontrado
 * @property {boolean} incrustado            `true` para `![[…]]`.
 * @property {import('./resolver-enlaces.mjs').PartesEnlace} partes
 * @property {number} num                    Línea en la nota original.
 * @property {string} sangria                Espacios o tabuladores al inicio de la línea (para incrustar bloques).
 */

/**
 * Convierte las líneas de una lección. `reemplazarEnlace` decide qué texto va en lugar de cada `![[…]]` o
 * `[[…]]` (imagen, enlace a otra lección, ancla o texto plano); así, esta función no necesita saber nada del
 * catálogo ni del disco.
 * @param {Linea[]} lineas
 * @param {(enlace: EnlaceEncontrado) => string} reemplazarEnlace
 * @returns {Linea[]}
 */
export function convertirLeccion(lineas, reemplazarEnlace) {
  const analizadas = marcarCodigo(normalizarLenguajes(lineas));
  /** @type {Linea[]} */
  const resultado = [];
  for (const linea of analizadas) {
    if (linea.enCodigo) {
      resultado.push({ texto: linea.texto, num: linea.num });
      continue;
    }
    const sangria = linea.texto.match(/^\s*/)?.[0] ?? '';
    const texto = fueraDeCodigoEnLinea(linea.texto, (trozo) =>
      trozo.replace(/(!?)\[\[([^\]]*)\]\]/g, (_, signo, contenido) =>
        reemplazarEnlace({ incrustado: signo === '!', partes: separarEnlace(contenido), num: linea.num, sangria }),
      ),
    );
    // Un reemplazo puede traer varias líneas (por ejemplo, una nota incrustada): conservan el mismo número.
    for (const parte of convertirResaltado(texto).split('\n')) resultado.push({ texto: parte, num: linea.num });
  }
  return resultado;
}

/**
 * Prepara una nota completa antes de partirla: quita frontmatter, comentarios y secciones de navegación.
 * @param {string} texto
 * @returns {Linea[]}
 */
export function prepararNota(texto) {
  return quitarSeccionesNavegacion(quitarComentarios(quitarFrontmatter(aLineas(texto))));
}

// ── Anclas y archivo final ───────────────────────────────────────────────────

/**
 * Anclas de una lección: para cada encabezado, su clave (`claveEncabezado`) y el `id` que le pondrá Astro.
 * El encabezado inicial de la lección (que se quitó del cuerpo) se registra con `null`: un enlace a él lleva a
 * la lección, sin ancla.
 * Lo mismo con el H1 inicial que quitó `quitarH1Inicial` (`tituloQuitado`).
 * @param {Linea[]} lineas  Cuerpo de la lección (ya sin su encabezado inicial).
 * @param {string | null} seccion
 * @param {string | null} [tituloQuitado]
 * @returns {Map<string, string | null>}
 */
export function calcularAnclas(lineas, seccion, tituloQuitado = null) {
  const slugger = new GithubSlugger();
  /** @type {Map<string, string | null>} */
  const anclas = new Map();
  if (seccion) anclas.set(claveEncabezado(seccion), null);
  if (tituloQuitado) anclas.set(claveEncabezado(tituloQuitado), null);
  for (const e of buscarEncabezados(lineas)) {
    const id = idEncabezado(e.texto, slugger);
    const clave = claveEncabezado(e.texto);
    if (!anclas.has(clave)) anclas.set(clave, id);
  }
  return anclas;
}

/**
 * Archivo `.md` final: frontmatter (como JSON, que también es YAML válido) y el cuerpo.
 * @param {Record<string, string | number | string[]>} frontmatter
 * @param {Linea[]} cuerpo
 */
export function armarArchivoLeccion(frontmatter, cuerpo) {
  const cabecera = Object.entries(frontmatter).map(([clave, valor]) => `${clave}: ${JSON.stringify(valor)}`);
  return ['---', ...cabecera, '---', '', aTexto(recortarVacias(cuerpo)), ''].join('\n');
}

/**
 * Bloque de código que muestra el texto de una nota incrustada (`![[README]]`) cuando esa nota no es una lección.
 * Las líneas siguientes llevan la misma sangría que la línea original, para no romper una lista.
 * @param {string} texto
 * @param {string} sangria
 */
export function bloqueNotaIncrustada(texto, sangria) {
  const masLarga = Math.max(2, ...[...texto.matchAll(/`+/g)].map((m) => m[0].length));
  const cerco = '`'.repeat(masLarga + 1);
  const lineas = [`${cerco}markdown`, ...texto.replace(/\r\n?/g, '\n').trimEnd().split('\n'), cerco];
  return lineas.map((l, i) => (i === 0 ? l : sangria + l)).join('\n');
}
