/**
 * Estado de la demo en el navegador (CONSTRUCCION.md, sección 7).
 *
 * Es el ÚNICO lugar que toca `localStorage`. Los componentes usan estas funciones:
 *   leerEstado() · guardarEstado(estado) · actualizarEstado(cambio)
 *   activarPlan() · tienePlanActivo() · marcarLeccionVista(id) · cargarPerfil(perfil) · reiniciarDemo()
 *   alCambiarEstado(funcion)  ← para repintar algo cuando el estado cambia
 *
 * - Toda lectura y escritura va con try/catch. Si el almacenamiento falla (modo privado, bloqueado,
 *   lleno), la demo sigue funcionando con una copia en memoria hasta que se recarga la página.
 * - Cada cambio emite el evento `estado-demo:cambio` en `window`, con el estado nuevo en `detail`.
 * - Los datos que se calculan (racha, insignias) NO se guardan aquí.
 */

import { fechaLocal } from './bitacora';

/** Estado completo de la demo. Si cambias su forma, sube `version`: los estados viejos se descartan. */
export type EstadoDemo = {
  version: 1;
  /** Id de `datos/perfiles-demo.json`, o null. */
  perfil: string | null;
  /** preguntaId → opcionId */
  orientacion: Record<string, string>;
  /** areaId → (preguntaId → opcionId) */
  diagnosticos: Record<string, Record<string, string>>;
  areaElegida: string | null;
  /** true después de «Sí, compré». */
  planActivo: boolean;
  /** "curso/leccion" */
  leccionesVistas: string[];
  /** "AAAA-MM-DD" */
  diasEstudio: string[];
};

/** Clave de `localStorage` donde se guarda el estado. */
export const CLAVE_ALMACEN = 'pista:estado-demo';

/** Nombre del evento que se emite en `window` cada vez que el estado cambia. */
export const EVENTO_CAMBIO = 'estado-demo:cambio';

/** Estado de una demo recién empezada. Devuelve un objeto nuevo cada vez. */
export function estadoInicial(): EstadoDemo {
  return {
    version: 1,
    perfil: null,
    orientacion: {},
    diagnosticos: {},
    areaElegida: null,
    planActivo: false,
    leccionesVistas: [],
    diasEstudio: [],
  };
}

// Copia en memoria: es la que se usa si `localStorage` falla, y también evita leerlo en cada llamada.
let enMemoria: EstadoDemo | null = null;

/** El `localStorage` del navegador, o null si no existe o no se puede usar. */
function almacen(): Storage | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    // Algunos navegadores lanzan un error solo por acceder a `localStorage` si está bloqueado.
    return null;
  }
}

const esTexto = (valor: unknown): valor is string => typeof valor === 'string';
const esObjeto = (valor: unknown): valor is Record<string, unknown> =>
  typeof valor === 'object' && valor !== null && !Array.isArray(valor);

/** Se queda solo con las entradas cuyo valor es texto. */
function soloTextos(valor: unknown): Record<string, string> {
  if (!esObjeto(valor)) return {};
  return Object.fromEntries(Object.entries(valor).filter((entrada): entrada is [string, string] => esTexto(entrada[1])));
}

/**
 * Convierte lo guardado en un `EstadoDemo` válido. Lo que esté dañado o tenga otra versión se cambia
 * por el valor inicial, campo por campo: un dato malo nunca rompe la página.
 */
export function normalizarEstado(crudo: unknown): EstadoDemo {
  const inicial = estadoInicial();
  if (!esObjeto(crudo) || crudo.version !== 1) return inicial;
  return {
    version: 1,
    perfil: esTexto(crudo.perfil) ? crudo.perfil : null,
    orientacion: soloTextos(crudo.orientacion),
    diagnosticos: esObjeto(crudo.diagnosticos)
      ? Object.fromEntries(Object.entries(crudo.diagnosticos).map(([area, respuestas]) => [area, soloTextos(respuestas)]))
      : {},
    areaElegida: esTexto(crudo.areaElegida) ? crudo.areaElegida : null,
    planActivo: crudo.planActivo === true,
    leccionesVistas: Array.isArray(crudo.leccionesVistas) ? [...new Set(crudo.leccionesVistas.filter(esTexto))] : [],
    diasEstudio: Array.isArray(crudo.diasEstudio) ? [...new Set(crudo.diasEstudio.filter(esTexto))] : [],
  };
}

/** Copia profunda, para que nadie modifique la copia en memoria por accidente. */
const copiar = (estado: EstadoDemo): EstadoDemo => structuredClone(estado);

/** Lee el estado guardado. Si no hay nada o no se puede leer, devuelve la copia en memoria o el inicial. */
export function leerEstado(): EstadoDemo {
  if (enMemoria) return copiar(enMemoria);
  let estado = estadoInicial();
  try {
    const texto = almacen()?.getItem(CLAVE_ALMACEN);
    if (texto) estado = normalizarEstado(JSON.parse(texto));
  } catch {
    // JSON dañado o almacenamiento bloqueado: se empieza de cero.
  }
  enMemoria = estado;
  return copiar(estado);
}

/** Avisa a la página que el estado cambió (`estado-demo:cambio`). */
function emitirCambio(estado: EstadoDemo): void {
  try {
    globalThis.dispatchEvent?.(new CustomEvent<EstadoDemo>(EVENTO_CAMBIO, { detail: copiar(estado) }));
  } catch {
    // Sin `window` (por ejemplo, en pruebas) no hay a quién avisar.
  }
}

/** Guarda el estado completo y avisa del cambio. */
export function guardarEstado(estado: EstadoDemo): void {
  const limpio = normalizarEstado(estado);
  enMemoria = limpio;
  try {
    almacen()?.setItem(CLAVE_ALMACEN, JSON.stringify(limpio));
  } catch {
    // Almacenamiento lleno o bloqueado: el cambio vive en memoria hasta recargar.
  }
  emitirCambio(limpio);
}

/** Lee, aplica un cambio y guarda. Devuelve el estado nuevo. */
export function actualizarEstado(cambio: (estado: EstadoDemo) => EstadoDemo | void): EstadoDemo {
  const actual = leerEstado();
  const nuevo = cambio(actual) ?? actual;
  guardarEstado(nuevo);
  return leerEstado();
}

// ── Plan ────────────────────────────────────────────────────────────────────

/** Activa el plan «Pista completo» (botón «Sí, compré»). */
export function activarPlan(): void {
  actualizarEstado((estado) => {
    estado.planActivo = true;
  });
}

export function tienePlanActivo(): boolean {
  return leerEstado().planActivo;
}

// ── Respuestas de los cuestionarios ─────────────────────────────────────────

/** Guarda una respuesta de la orientación («No sé por dónde empezar»). */
export function guardarRespuestaOrientacion(preguntaId: string, opcionId: string): void {
  actualizarEstado((estado) => {
    estado.orientacion[preguntaId] = opcionId;
  });
}

/** Guarda una respuesta del diagnóstico de un área. */
export function guardarRespuestaDiagnostico(areaId: string, preguntaId: string, opcionId: string): void {
  actualizarEstado((estado) => {
    estado.diagnosticos[areaId] = { ...estado.diagnosticos[areaId], [preguntaId]: opcionId };
  });
}

/** Marca el área cuya ruta se muestra en «Mi ruta» (al terminar su diagnóstico). */
export function elegirArea(areaId: string): void {
  actualizarEstado((estado) => {
    estado.areaElegida = areaId;
  });
}

// ── Progreso ────────────────────────────────────────────────────────────────

/**
 * «Marcar como vista»: guarda la lección (`curso/leccion`) y el día de estudio (fecha local de `cuando`).
 * Marcar dos veces la misma lección no la cuenta doble. La racha y las insignias se calculan aparte
 * (`lib/bitacora.ts`, `lib/insignias.ts`): aquí no se guardan.
 */
export function marcarLeccionVista(leccionId: string, cuando: Date = new Date()): void {
  actualizarEstado((estado) => {
    if (!estado.leccionesVistas.includes(leccionId)) estado.leccionesVistas.push(leccionId);
    const dia = fechaLocal(cuando);
    if (!estado.diasEstudio.includes(dia)) estado.diasEstudio.push(dia);
  });
}

// ── Perfiles de la presentación ─────────────────────────────────────────────

/** Lo que se carga de un perfil de `datos/perfiles-demo.json`. */
export type PerfilParaCargar = {
  id: string;
  area: string;
  respuestasOrientacion: Record<string, string>;
  respuestasDiagnostico: Record<string, string>;
};

/**
 * «Cargar perfil» del panel `/demo`: empieza una demo limpia con las respuestas y el área del perfil, el plan SIN
 * activar y sin progreso (así el presentador muestra la suscripción y la primera lección desde cero).
 */
export function cargarPerfil(perfil: PerfilParaCargar): void {
  guardarEstado({
    ...estadoInicial(),
    perfil: perfil.id,
    orientacion: { ...perfil.respuestasOrientacion },
    diagnosticos: { [perfil.area]: { ...perfil.respuestasDiagnostico } },
    areaElegida: perfil.area,
  });
}

// ── Sesión de demo ──────────────────────────────────────────────────────────

/**
 * `true` si la persona ya «entró» a la demo: eligió un área, respondió algún diagnóstico o activó el plan.
 * Decide qué cabecera se ve (con sesión o sin ella).
 *
 * OJO: el script en línea de `layouts/LayoutBase.astro` repite esta misma condición (no puede importar
 * módulos). Si la cambias aquí, cámbiala allá.
 */
export function haySesion(estado: EstadoDemo): boolean {
  return (
    estado.areaElegida !== null ||
    Object.values(estado.diagnosticos).some((respuestas) => Object.keys(respuestas).length > 0) ||
    estado.planActivo
  );
}

// ── Reinicio ────────────────────────────────────────────────────────────────

/** Borra todo el estado de la demo («Reiniciar demo»). */
export function reiniciarDemo(): void {
  const inicial = estadoInicial();
  enMemoria = inicial;
  try {
    almacen()?.removeItem(CLAVE_ALMACEN);
  } catch {
    // Si no se puede borrar, al menos la copia en memoria ya está limpia.
  }
  emitirCambio(inicial);
}

// ── Escuchar cambios ────────────────────────────────────────────────────────

/**
 * Llama a `funcion` cada vez que el estado cambia (en esta pestaña o en otra del mismo sitio).
 * Devuelve una función para dejar de escuchar.
 */
export function alCambiarEstado(funcion: (estado: EstadoDemo) => void): () => void {
  const enEstaPestana = (evento: Event) => funcion((evento as CustomEvent<EstadoDemo>).detail);
  const enOtraPestana = (evento: StorageEvent) => {
    if (evento.key !== CLAVE_ALMACEN && evento.key !== null) return;
    enMemoria = null; // Se vuelve a leer lo que guardó la otra pestaña.
    funcion(leerEstado());
  };
  globalThis.addEventListener?.(EVENTO_CAMBIO, enEstaPestana);
  globalThis.addEventListener?.('storage', enOtraPestana as EventListener);
  return () => {
    globalThis.removeEventListener?.(EVENTO_CAMBIO, enEstaPestana);
    globalThis.removeEventListener?.('storage', enOtraPestana as EventListener);
  };
}

/** Solo para pruebas: olvida la copia en memoria, como si se recargara la página. */
export function _olvidarMemoria(): void {
  enMemoria = null;
}
