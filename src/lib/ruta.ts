/**
 * Ruta («Tu ruta»): aplica el diagnóstico de un área y reparte las lecciones en semanas.
 *
 * Funciones puras, sin HTML ni `localStorage`: las usan la página `/mi-ruta` (en el navegador) y las pruebas
 * (`ruta.test.ts`, que comprueban los perfiles de `datos/perfiles-demo.json`). Las mismas respuestas dan
 * siempre la misma ruta. Sin precios: todo está incluido en el plan.
 *
 * Reglas (escritas en `datos/ajustes.json` → `ritmo`; si cambian allá, cambian aquí):
 *
 * Cómo se combinan las respuestas (`ritmo.combinarRespuestas`):
 *   - cursoInicio: gana el que va más adelante en la ruta del área; los cursos anteriores se omiten.
 *     Se acredita a la primera pregunta que llegó a ese curso.
 *   - omitirLecciones, omitirModulos, omitirCursos y agregarCursos: se suman los de todas las respuestas
 *     (agregarCursos va al final, en orden).
 *   - horasSemana: la última respuesta que lo indique; si ninguna, `horasSemanaPorDefecto`.
 *
 * Prerrequisitos: un curso de la ruta nunca va antes que un prerrequisito que también está en la ruta.
 * Si un curso agregado necesita otro que no está y que el diagnóstico no omitió, ese otro entra justo antes.
 * Un prerrequisito que el diagnóstico omitió se da por sabido.
 *
 * Ritmo (`ritmo.descripcion`): las semanas se llenan por minutos acumulados, sin pasar de horasSemana × 60.
 * Una lección nunca se parte; si sola pasa del límite, ocupa su propia semana. Un curso nuevo sigue en la
 * misma semana si aún cabe. Las lecciones ocultas no cuentan. Un curso «próximamente» (sin lecciones) ocupa
 * sus `minutosEstimados` en semanas propias, en partes iguales, y lo que sigue empieza en semana nueva.
 * Las lecciones «en preparación» sí tienen minutos y cuentan como cualquier lección.
 * Los minutos se redondean a un decimal.
 *
 * Tiempo de práctica (parte 3.9): en la ruta, cada lección dura `minutos × factorPractica` de su curso (por defecto 1,
 * solo lectura). Un curso con factor 1 da exactamente la ruta de antes.
 *
 * Cortes por grupo (opcional, lo usa el roadmap de `lib/roadmap.ts`): si se pasa `grupoDeCurso`, cuando cambia el
 * grupo (la etapa) empieza una semana nueva. Sin él, todo sigue igual.
 */
import { cursoOculto, leccionOculta } from './compartido/visibilidad.js';

// ── Datos que necesita la regla (lo mínimo de `datos/`) ─────────────────────

export type LeccionRuta = {
  id: string;
  slug: string;
  titulo: string;
  minutos: number;
  enPreparacion: boolean;
  riesgo: 'ninguno' | 'medio' | 'alto';
  datosPersonales: boolean;
};

export type CursoRuta = {
  id: string;
  titulo: string;
  estado: 'disponible' | 'muestra' | 'proximamente';
  oculto: boolean;
  prerrequisitos: string[];
  minutosEstimados: number | null;
  /** Lectura + práctica: la duración en la ruta es `minutos × factorPractica`. Por defecto 1. */
  factorPractica?: number;
  modulos: { id: string; lecciones: LeccionRuta[] }[];
};

export type EfectosRespuesta = {
  cursoInicio?: string;
  omitirLecciones?: string[];
  omitirModulos?: string[];
  omitirCursos?: string[];
  agregarCursos?: string[];
  horasSemana?: number;
  /** Solo para áreas con etapas (`lib/roadmap.ts`); la ruta por semanas no los usa. */
  etapasOpcionales?: string[];
  etapasPrimero?: string[];
};

export type DiagnosticoRuta = {
  area: string;
  preguntas: { id: string; opciones: { id: string; texto: string; motivo?: string; efectos: EfectosRespuesta }[] }[];
};

export type AreaRuta = { id: string; ruta: string[] };

export type DatosRuta = {
  diagnostico: DiagnosticoRuta;
  /** Cursos por id (basta con los que puede tocar la ruta). */
  cursos: Record<string, CursoRuta>;
  /** `ajustes.json` → `ritmo.horasSemanaPorDefecto`. */
  horasSemanaPorDefecto: number;
  /** `ajustes.json` → `ocultarDatosPersonales`. */
  ocultarDatosPersonales: boolean;
  /** `ajustes.json` → `ocultarRiesgoAlto`. */
  ocultarRiesgoAlto: boolean;
};

export type OpcionesRuta = {
  /** Grupo (etapa) de cada curso: al cambiar de grupo empieza una semana nueva. */
  grupoDeCurso?: (curso: string) => string;
};

// ── Resultado ───────────────────────────────────────────────────────────────

export type CursoOmitido = {
  curso: string;
  motivo: 'cursoInicio' | 'diagnostico';
  /** Pregunta que lo quitó. */
  pregunta: string;
  /** Texto para la pantalla: «ya le vendes a conocidos». */
  texto: string;
};

export type LeccionOmitida = { leccion: string; pregunta: string; texto: string };

/** Algo que se estudia en una semana: una lección o un trozo de un curso «próximamente». */
export type ElementoSemana =
  | { tipo: 'leccion'; id: string; curso: string; titulo: string; minutos: number; enPreparacion: boolean }
  | { tipo: 'proximamente'; id: `curso:${string}`; curso: string; titulo: string; minutos: number };

/**
 * Estado de una semana: `proximamente` si solo tiene cursos sin lecciones; `en-preparacion` si todas sus
 * lecciones están en preparación; `disponible` si hay al menos una lección que ya se puede ver.
 */
export type EstadoSemana = 'disponible' | 'en-preparacion' | 'proximamente';

export type Semana = {
  numero: number;
  /** Ids de lección (`curso/leccion`) o `curso:<id>` para un curso «próximamente». */
  lecciones: string[];
  minutos: number;
  estado: EstadoSemana;
  elementos: ElementoSemana[];
};

export type CursoEnRuta = {
  curso: string;
  /** Minutos de este curso dentro de la ruta (sin lo omitido). */
  minutos: number;
  /** Por qué entró, si no venía en la ruta del área. */
  agregadoPor: 'diagnostico' | 'prerrequisito' | null;
  leccionesOmitidas: LeccionOmitida[];
};

export type Ruta = {
  area: string;
  horasSemana: number;
  /** Cursos en orden. */
  cursos: string[];
  cursosOmitidos: CursoOmitido[];
  leccionesOmitidas: LeccionOmitida[];
  semanas: Semana[];
  totalSemanas: number;
  minutosTotal: number;
  /** Detalle por curso, en el mismo orden que `cursos`. */
  detalleCursos: CursoEnRuta[];
};

// ── Ayudantes ───────────────────────────────────────────────────────────────

/** Redondea a un decimal. */
export const redondear1 = (minutos: number): number => Math.round(minutos * 10) / 10;

/** Evita que 59.99999 o 60.00001 cambien el reparto: compara en milésimas de minuto. */
const milesimas = (minutos: number): number => Math.round(minutos * 1000);

export type Elegida = {
  pregunta: string;
  /** El `motivo` de la opción o, si no tiene, «respondiste «…»». */
  texto: string;
  /** `true` si la opción tiene `motivo` escrito en el diagnóstico. */
  conMotivo: boolean;
  efectos: EfectosRespuesta;
};

/** Las respuestas válidas, en el orden de las preguntas del diagnóstico. */
export function respuestasElegidas(diagnostico: DiagnosticoRuta, respuestas: Record<string, string>): Elegida[] {
  return diagnostico.preguntas.flatMap((pregunta) => {
    const opcion = pregunta.opciones.find((o) => o.id === respuestas[pregunta.id]);
    if (!opcion) return [];
    return [
      { pregunta: pregunta.id, texto: opcion.motivo ?? `respondiste «${opcion.texto}»`, conMotivo: Boolean(opcion.motivo), efectos: opcion.efectos },
    ];
  });
}

/** La primera respuesta (en orden de preguntas) que cumple la condición. */
const primeraQue = (elegidas: Elegida[], cumple: (e: EfectosRespuesta) => boolean) => elegidas.find((e) => cumple(e.efectos));

// ── La regla ────────────────────────────────────────────────────────────────

/** Calcula la ruta de un área a partir de las respuestas de su diagnóstico. */
export function calcularRuta(
  area: AreaRuta,
  respuestas: Record<string, string>,
  datos: DatosRuta,
  opciones: OpcionesRuta = {},
): Ruta {
  const ajustes = { ocultarDatosPersonales: datos.ocultarDatosPersonales, ocultarRiesgoAlto: datos.ocultarRiesgoAlto };
  const curso = (id: string): CursoRuta | undefined => {
    const c = datos.cursos[id];
    return c && !cursoOculto(c, ajustes) ? c : undefined;
  };
  const elegidas = respuestasElegidas(datos.diagnostico, respuestas);

  // Horas por semana: la última respuesta que lo indique.
  let horasSemana = datos.horasSemanaPorDefecto;
  for (const e of elegidas) if (e.efectos.horasSemana !== undefined) horasSemana = e.efectos.horasSemana;

  // Curso de inicio: el que va más adelante en la ruta del área.
  const base = area.ruta.filter((id) => curso(id));
  let inicio = 0;
  let quienInicia: Elegida | undefined;
  for (const e of elegidas) {
    const indice = e.efectos.cursoInicio ? base.indexOf(e.efectos.cursoInicio) : -1;
    if (indice > inicio) {
      inicio = indice;
      quienInicia = e;
    }
  }

  // Cursos omitidos (en el orden de la ruta del área).
  const cursosOmitidos: CursoOmitido[] = [];
  base.forEach((id, i) => {
    if (i < inicio && quienInicia) {
      cursosOmitidos.push({ curso: id, motivo: 'cursoInicio', pregunta: quienInicia.pregunta, texto: quienInicia.texto });
      return;
    }
    const quien = primeraQue(elegidas, (ef) => ef.omitirCursos?.includes(id) ?? false);
    if (quien) cursosOmitidos.push({ curso: id, motivo: 'diagnostico', pregunta: quien.pregunta, texto: quien.texto });
  });
  const omitidos = new Set(cursosOmitidos.map((o) => o.curso));

  // Cursos de la ruta + agregados por el diagnóstico (al final, en orden).
  const lista = base.filter((id) => !omitidos.has(id));
  const agregadoPor = new Map<string, CursoEnRuta['agregadoPor']>();
  for (const e of elegidas) {
    for (const id of e.efectos.agregarCursos ?? []) {
      if (!curso(id) || lista.includes(id) || omitidos.has(id)) continue;
      lista.push(id);
      agregadoPor.set(id, 'diagnostico');
    }
  }

  // Prerrequisitos: cada curso después de los que necesita.
  const enLista = new Set(lista);
  const cursos: string[] = [];
  const visitar = (id: string, camino: Set<string>) => {
    if (cursos.includes(id) || camino.has(id)) return; // `camino` evita ciclos en datos mal escritos
    camino.add(id);
    for (const previo of curso(id)?.prerrequisitos ?? []) {
      if (enLista.has(previo)) visitar(previo, camino);
      else if (!omitidos.has(previo) && curso(previo)) {
        enLista.add(previo);
        agregadoPor.set(previo, 'prerrequisito');
        visitar(previo, camino);
      }
    }
    camino.delete(id);
    cursos.push(id);
  };
  for (const id of lista) visitar(id, new Set());

  // Lecciones: las visibles, menos las omitidas por el diagnóstico.
  const leccionesOmitidas: LeccionOmitida[] = [];
  const elementos: ElementoSemana[] = [];
  const detalleCursos: CursoEnRuta[] = cursos.map((id) => {
    const c = curso(id)!;
    const detalle: CursoEnRuta = { curso: id, minutos: 0, agregadoPor: agregadoPor.get(id) ?? null, leccionesOmitidas: [] };
    if (c.estado === 'proximamente') {
      detalle.minutos = c.minutosEstimados ?? 0;
      elementos.push({ tipo: 'proximamente', id: `curso:${id}`, curso: id, titulo: c.titulo, minutos: detalle.minutos });
      return detalle;
    }
    let suma = 0;
    const factor = c.factorPractica ?? 1;
    for (const modulo of c.modulos) {
      for (const leccion of modulo.lecciones) {
        if (leccionOculta(leccion, c, ajustes)) continue;
        const quien = primeraQue(
          elegidas,
          (ef) => (ef.omitirModulos?.includes(modulo.id) ?? false) || (ef.omitirLecciones?.includes(leccion.id) ?? false),
        );
        if (quien) {
          const omitida = { leccion: leccion.id, pregunta: quien.pregunta, texto: quien.texto };
          leccionesOmitidas.push(omitida);
          detalle.leccionesOmitidas.push(omitida);
          continue;
        }
        const minutos = conPractica(leccion.minutos, factor);
        suma += minutos;
        elementos.push({
          tipo: 'leccion',
          id: leccion.id,
          curso: id,
          titulo: leccion.titulo,
          minutos,
          enPreparacion: leccion.enPreparacion,
        });
      }
    }
    detalle.minutos = redondear1(suma);
    return detalle;
  });

  const semanas = repartirEnSemanas(elementos, horasSemana, opciones.grupoDeCurso);
  return {
    area: area.id,
    horasSemana,
    cursos,
    cursosOmitidos,
    leccionesOmitidas,
    semanas,
    totalSemanas: semanas.length,
    minutosTotal: redondear1(elementos.reduce((total, e) => total + e.minutos, 0)),
    detalleCursos,
  };
}

/** Minutos de lectura × factor de práctica, sin ruido de coma flotante (5.5 × 2.5 = 13.75, no 13.750000001). */
export const conPractica = (minutos: number, factor: number): number => Math.round(minutos * factor * 1000) / 1000;

/**
 * Reparte los elementos en semanas según `ajustes.json` → `ritmo.descripcion`.
 * Con `grupoDeCurso`, un elemento de otro grupo (otra etapa) empieza semana nueva.
 */
export function repartirEnSemanas(
  elementos: ElementoSemana[],
  horasSemana: number,
  grupoDeCurso?: (curso: string) => string,
): Semana[] {
  const limite = milesimas(horasSemana * 60);
  const semanas: { elementos: ElementoSemana[]; milesimas: number }[] = [];
  let actual: (typeof semanas)[number] | null = null;
  const nueva = () => {
    actual = { elementos: [], milesimas: 0 };
    semanas.push(actual);
    return actual;
  };

  let grupoAnterior: string | undefined;
  for (const elemento of elementos) {
    const grupo = grupoDeCurso?.(elemento.curso);
    if (grupoDeCurso && grupoAnterior !== undefined && grupo !== grupoAnterior) actual = null;
    grupoAnterior = grupo;
    if (elemento.tipo === 'proximamente') {
      // Semanas propias, en partes iguales; lo que sigue empieza en semana nueva.
      const partes = Math.max(1, Math.ceil(milesimas(elemento.minutos) / limite));
      for (let i = 0; i < partes; i++) {
        const semana = nueva();
        semana.elementos.push({ ...elemento, minutos: elemento.minutos / partes });
        semana.milesimas = limite;
      }
      actual = null;
      continue;
    }
    const m = milesimas(elemento.minutos);
    let semana: (typeof semanas)[number] = actual ?? nueva();
    if (semana.elementos.length > 0 && semana.milesimas + m > limite) semana = nueva();
    semana.elementos.push(elemento);
    semana.milesimas += m;
  }

  return semanas.map((s, i) => ({
    numero: i + 1,
    lecciones: s.elementos.map((e) => e.id),
    minutos: redondear1(s.elementos.reduce((total, e) => total + e.minutos, 0)),
    estado: estadoSemana(s.elementos),
    elementos: s.elementos,
  }));
}

function estadoSemana(elementos: ElementoSemana[]): EstadoSemana {
  const lecciones = elementos.filter((e) => e.tipo === 'leccion');
  if (lecciones.length === 0) return 'proximamente';
  return lecciones.every((e) => e.enPreparacion) ? 'en-preparacion' : 'disponible';
}

// ── Para la pantalla ────────────────────────────────────────────────────────

/**
 * La semana en curso: la primera con una lección que ya se puede ver y que aún no se vio.
 * Si ya no queda ninguna, la última. Una ruta recién hecha empieza en la semana 1.
 */
export function semanaActual(ruta: Ruta, leccionesVistas: readonly string[]): number {
  if (ruta.semanas.length === 0) return 1;
  const vistas = new Set(leccionesVistas);
  const pendiente = ruta.semanas.find((s) =>
    s.elementos.some((e) => e.tipo === 'leccion' && !e.enPreparacion && !vistas.has(e.id)),
  );
  if (pendiente) return pendiente.numero;
  const hayVisibles = ruta.semanas.some((s) => s.elementos.some((e) => e.tipo === 'leccion' && !e.enPreparacion));
  return hayVisibles ? ruta.semanas.length : 1;
}

/** El lunes siguiente a `hoy` (si hoy es lunes, el de la semana que viene). Hora local. */
export function lunesSiguiente(hoy: Date): Date {
  const fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const dias = ((8 - fecha.getDay()) % 7) || 7; // getDay(): 0 = domingo, 1 = lunes…
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}

/** `true` si el diagnóstico del área tiene respuesta válida en todas sus preguntas. */
export function diagnosticoCompleto(diagnostico: DiagnosticoRuta, respuestas: Record<string, string>): boolean {
  return diagnostico.preguntas.every((p) => p.opciones.some((o) => o.id === respuestas[p.id]));
}
