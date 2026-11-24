/**
 * Catálogo: escuelas, áreas, cursos, lecciones y el plan, ya filtrados por la regla de visibilidad.
 *
 * Las páginas y componentes leen el catálogo SOLO desde aquí (no con `getCollection` directo), para que
 * ningún curso o lección oculto se cuele. La regla vive en `compartido/visibilidad.js` y los interruptores
 * `ocultarDatosPersonales` y `ocultarRiesgoAlto` en `datos/ajustes.json`.
 *
 * Se usa al generar el sitio (en el frontmatter de las páginas), no en el navegador.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import datosAjustes from '../../datos/ajustes.json';
import datosEscuelas from '../../datos/escuelas.json';
import datosPerfiles from '../../datos/perfiles-demo.json';
import { esquemaAjustes } from './compartido/esquemas.js';
import { cursoOculto, leccionOculta } from './compartido/visibilidad.js';
import { ETIQUETAS_ESTADO, formatoDuracion, plural } from './formato';
import { colorSegunEscuelas } from './portadas';
import type { CursoRuta, DatosRuta } from './ruta';

export type Escuela = CollectionEntry<'escuelas'>['data'];
export type Area = Escuela['areas'][number];
export type Curso = CollectionEntry<'cursos'>['data'];
export type Modulo = Curso['modulos'][number];
export type Leccion = Modulo['lecciones'][number];
export type Perfil = CollectionEntry<'perfiles'>['data'];
export type Ajustes = ReturnType<typeof esquemaAjustes.parse>;
export type Plan = Ajustes['plan'];
/** Una lección ya convertida (`contenido-generado/`): frontmatter + Markdown, lista para `render()`. */
export type ContenidoLeccion = CollectionEntry<'lecciones'>;

/** Un área con el id y el nombre de su escuela. */
export type AreaConEscuela = Area & { escuela: string; nombreEscuela: string };

// Se valida al cargar: si `ajustes.json` tiene un error, el build se detiene con un mensaje claro.
const ajustes: Ajustes = esquemaAjustes.parse(datosAjustes);

// ── Ajustes y plan ───────────────────────────────────────────────────────────

/** Interruptores de la demo (`datos/ajustes.json`). */
export function obtenerAjustes(): Ajustes {
  return ajustes;
}

/** El único plan de Pista: nombre, precio, moneda, periodo y lo que incluye. */
export function obtenerPlan(): Plan {
  return ajustes.plan;
}

/** «$50 MXN al mes», listo para mostrar. */
export function textoPrecioPlan(plan: Plan = ajustes.plan): string {
  return `$${plan.precio} ${plan.moneda} al ${plan.periodo}`;
}

// ── Escuelas y áreas ─────────────────────────────────────────────────────────

// `getCollection` devuelve las entradas ordenadas por id; el orden que vale es el del archivo
// (desempata la orientación y ordena el catálogo). Para cambiarlo, mueve la escuela en `escuelas.json`.
const ordenEscuelas = datosEscuelas.map((escuela) => escuela.id);

/**
 * Valor CSS del color de una escuela por su id (`curso.escuela`, `area.escuela`…), según su campo `color` de
 * `escuelas.json`. Es lo que usan portadas, píldoras y tarjetas.
 */
export function colorDeEscuela(id: string): string {
  return colorSegunEscuelas(datosEscuelas, id);
}

/** Todas las escuelas, en el orden de `escuelas.json`. */
export async function obtenerEscuelas(): Promise<Escuela[]> {
  return (await getCollection('escuelas'))
    .map((entrada) => entrada.data)
    .sort((a, b) => ordenEscuelas.indexOf(a.id) - ordenEscuelas.indexOf(b.id));
}

export async function obtenerEscuela(id: string): Promise<Escuela | undefined> {
  return (await obtenerEscuelas()).find((escuela) => escuela.id === id);
}

/** Todas las áreas de todas las escuelas, cada una con su escuela. */
export async function obtenerAreas(): Promise<AreaConEscuela[]> {
  return (await obtenerEscuelas()).flatMap((escuela) =>
    escuela.areas.map((area) => ({ ...area, escuela: escuela.id, nombreEscuela: escuela.nombre })),
  );
}

export async function obtenerArea(id: string): Promise<AreaConEscuela | undefined> {
  return (await obtenerAreas()).find((area) => area.id === id);
}

// ── Cursos y lecciones ───────────────────────────────────────────────────────

/** `true` si el curso se muestra en la demo. */
export function esCursoVisible(curso: Curso): boolean {
  return !cursoOculto(curso, ajustes);
}

/** `true` si la lección se muestra en la demo. */
export function esLeccionVisible(leccion: Leccion, curso: Curso): boolean {
  return !leccionOculta(leccion, curso, ajustes);
}

/** Todos los cursos visibles (incluidos los «próximamente», que solo tienen ficha). */
export async function obtenerCursosVisibles(): Promise<Curso[]> {
  return (await getCollection('cursos')).map((entrada) => entrada.data).filter(esCursoVisible);
}

/** Un curso visible por su id, o `undefined` si no existe o está oculto. */
export async function obtenerCurso(id: string): Promise<Curso | undefined> {
  return (await obtenerCursosVisibles()).find((curso) => curso.id === id);
}

/** Los cursos visibles de un área, en el orden en que el área los lista. */
export async function obtenerCursosDeArea(areaId: string): Promise<Curso[]> {
  const area = await obtenerArea(areaId);
  if (!area) return [];
  const visibles = new Map((await obtenerCursosVisibles()).map((curso) => [curso.id, curso]));
  return area.cursos.flatMap((id) => visibles.get(id) ?? []);
}

/** Los módulos del curso con solo sus lecciones visibles (los módulos que quedan vacíos se quitan). */
export function modulosVisibles(curso: Curso): Modulo[] {
  return curso.modulos
    .map((modulo) => ({ ...modulo, lecciones: modulo.lecciones.filter((leccion) => esLeccionVisible(leccion, curso)) }))
    .filter((modulo) => modulo.lecciones.length > 0);
}

/** Las lecciones visibles del curso, en orden. */
export function leccionesVisibles(curso: Curso): Leccion[] {
  return modulosVisibles(curso).flatMap((modulo) => modulo.lecciones);
}

/**
 * Duración del curso en minutos, contando solo las lecciones visibles.
 * Un curso «próximamente» no tiene lecciones: devuelve su duración estimada.
 */
export function duracionCurso(curso: Curso): number {
  if (curso.estado === 'proximamente') return curso.minutosEstimados ?? 0;
  const total = leccionesVisibles(curso).reduce((suma, leccion) => suma + leccion.minutos, 0);
  return Math.round(total * 10) / 10;
}

/** `true` si alguna lección visible del curso es de riesgo alto (la ficha muestra el aviso ético fuerte). */
export function cursoTieneRiesgoAlto(curso: Curso): boolean {
  return leccionesVisibles(curso).some((leccion) => leccion.riesgo === 'alto');
}

/** `true` si todas las lecciones visibles del curso están «en preparación». */
export function cursoEnPreparacion(curso: Curso): boolean {
  const lecciones = leccionesVisibles(curso);
  return lecciones.length > 0 && lecciones.every((leccion) => leccion.enPreparacion);
}

/**
 * El contenido convertido de una lección (`contenido-generado/<curso>/<leccion>.md`), listo para `render()`.
 * `undefined` si la lección está oculta, en preparación o todavía no se sincronizó.
 */
export async function obtenerContenidoLeccion(cursoId: string, slug: string): Promise<ContenidoLeccion | undefined> {
  return getEntry('lecciones', `${cursoId}/${slug}`);
}

// ── Para las páginas del catálogo (parte 3.5) ────────────────────────────────

/** Textos de la tarjeta del plan y del diálogo de suscripción (`ajustes.json` → `suscripcion`). */
export function obtenerTextosSuscripcion(): Ajustes['suscripcion'] {
  return ajustes.suscripcion;
}

/** `true` si el área tiene página propia (`/areas/<area>`): las «próximamente» solo se listan. */
export function areaTienePagina(area: Area): boolean {
  return area.estado !== 'proximamente';
}

/** Las áreas que tienen página propia, cada una con su escuela. */
export async function obtenerAreasConPagina(): Promise<AreaConEscuela[]> {
  return (await obtenerAreas()).filter(areaTienePagina);
}

/**
 * El área que se muestra en las migas de pan de un curso: la primera de sus áreas que tiene página.
 * Si ninguna tiene página, la primera de la lista (sin enlace).
 */
export async function areaPrincipalDeCurso(curso: Curso): Promise<{ area: AreaConEscuela; tienePagina: boolean } | undefined> {
  const areas = (await obtenerAreas()).filter((area) => curso.areas.includes(area.id));
  areas.sort((a, b) => curso.areas.indexOf(a.id) - curso.areas.indexOf(b.id));
  const conPagina = areas.find(areaTienePagina);
  if (conPagina) return { area: conPagina, tienePagina: true };
  return areas[0] ? { area: areas[0], tienePagina: false } : undefined;
}

/** Duración total de los cursos visibles de un área, en minutos. */
export async function duracionArea(areaId: string): Promise<number> {
  return (await obtenerCursosDeArea(areaId)).reduce((suma, curso) => suma + duracionCurso(curso), 0);
}

/** «3 cursos · ~3 h 45 min en total · incluidos en Pista completo» (pantallas 03 y 05). */
export async function resumenArea(areaId: string): Promise<string> {
  const cursos = await obtenerCursosDeArea(areaId);
  return [
    plural(cursos.length, 'curso'),
    `${formatoDuracion(await duracionArea(areaId))} en total`,
    `${cursos.length === 1 ? 'incluido' : 'incluidos'} en ${ajustes.plan.nombre}`,
  ].join(' · ');
}

/** La primera lección visible que ya se puede abrir (no «en preparación»), o `undefined`. */
export function primeraLeccionDisponible(curso: Curso): Leccion | undefined {
  return leccionesVisibles(curso).find((leccion) => !leccion.enPreparacion);
}

/**
 * Idioma de las lecciones visibles del curso: `es`, `en` (todas en inglés) o `mixto`.
 * Un curso sin lecciones usa la lista `idiomas` de su ficha.
 */
export function idiomaDeCurso(curso: Curso): 'es' | 'en' | 'mixto' {
  const lecciones = leccionesVisibles(curso);
  const idiomas = new Set(lecciones.length > 0 ? lecciones.map((leccion) => leccion.idioma) : curso.idiomas);
  if (idiomas.size > 1) return 'mixto';
  return idiomas.has('en') ? 'en' : 'es';
}

/**
 * Etiqueta de idioma para fichas y tarjetas: «En inglés», «Incluye lecciones en inglés» o `null`.
 * Respeta el interruptor `mostrarEtiquetaIdioma` de `ajustes.json`.
 */
export function etiquetaIdiomaDeCurso(curso: Curso): string | null {
  if (!ajustes.mostrarEtiquetaIdioma) return null;
  const idioma = idiomaDeCurso(curso);
  if (idioma === 'en') return 'En inglés';
  if (idioma === 'mixto') return 'Incluye lecciones en inglés';
  return null;
}

/**
 * Etiqueta de estado de un curso para tarjetas y fichas, o `null` si no lleva (curso disponible).
 * «Lecciones en preparación» gana sobre «Curso de muestra» porque es lo que más importa saber.
 */
export function etiquetaEstadoCurso(curso: Curso): string | null {
  if (curso.estado === 'proximamente') return ETIQUETAS_ESTADO.proximamente;
  if (cursoEnPreparacion(curso)) return 'Lecciones en preparación';
  if (curso.estado === 'muestra') return ETIQUETAS_ESTADO.muestra;
  return null;
}

/** Cuántas preguntas tiene el diagnóstico del área, o 0 si el área no tiene diagnóstico. */
export async function numeroPreguntasDiagnostico(areaId: string): Promise<number> {
  // Con getCollection (y no getEntry) un área sin diagnóstico no produce advertencias en el build.
  const diagnostico = (await getCollection('diagnosticos')).find((d) => d.data.area === areaId);
  return diagnostico?.data.preguntas.length ?? 0;
}

/** Cuántas preguntas tiene la orientación («No sé por dónde empezar»). */
export async function numeroPreguntasOrientacion(): Promise<number> {
  const orientacion = await getEntry('orientacion', 'orientacion');
  return orientacion?.data.preguntas.length ?? 0;
}

// ── Datos que se incrustan en las páginas para el navegador (parte 3.6) ─────
//
// La orientación y la ruta se calculan en el navegador con `lib/orientacion.ts` y `lib/ruta.ts`. Estas funciones
// preparan, al generar el sitio, SOLO lo que esas reglas y la pantalla necesitan, ya sin lo oculto.

/** Una etapa del roadmap de un área (`escuelas.json` → `etapas`). */
export type EtapaArea = NonNullable<Area['etapas']>[number];

/** Un área tal como la necesitan las pantallas de Recomendación y Tu ruta. */
export type AreaParaNavegador = {
  id: string;
  nombre: string;
  estado: Area['estado'];
  escuela: string;
  nombreEscuela: string;
  /** Valor CSS del color de su escuela (`colorDeEscuela`), para pintarlo en el navegador. */
  colorEscuela: string;
  /** «3 cursos · ~3 h 45 min en total · incluidos en Pista completo». */
  resumen: string;
  /** 0 si el área no tiene diagnóstico. */
  preguntasDiagnostico: number;
  ruta: string[];
  porQueEsteOrden: string | null;
  /** Etapas del roadmap, o `null` si el área usa la ruta por semanas. */
  etapas: EtapaArea[] | null;
};

/** Todas las áreas, en el orden de `escuelas.json`. */
export async function areasParaNavegador(): Promise<AreaParaNavegador[]> {
  const areas = await obtenerAreas();
  return Promise.all(
    areas.map(async (area) => ({
      id: area.id,
      nombre: area.nombre,
      estado: area.estado,
      escuela: area.escuela,
      nombreEscuela: area.nombreEscuela,
      colorEscuela: colorDeEscuela(area.escuela),
      resumen: await resumenArea(area.id),
      preguntasDiagnostico: await numeroPreguntasDiagnostico(area.id),
      ruta: area.ruta,
      porQueEsteOrden: area.porQueEsteOrden ?? null,
      etapas: area.etapas ?? null,
    })),
  );
}

/** Lo que necesita `recomendarArea()` (pantalla 05). */
export async function datosOrientacion() {
  const orientacion = await getEntry('orientacion', 'orientacion');
  if (!orientacion) throw new Error('Falta datos/orientacion.json');
  const { preguntas, avisoProximamente, notaAlFinal } = orientacion.data;
  const escuelas = (await obtenerEscuelas()).map((escuela) => ({
    id: escuela.id,
    areas: escuela.areas.map(({ id, nombre, estado }) => ({ id, nombre, estado })),
  }));
  return { preguntas, avisoProximamente, notaAlFinal, escuelas };
}

/** Las preguntas de la orientación, para el cuestionario (pantalla 04). */
export async function preguntasOrientacion() {
  return (await datosOrientacion()).preguntas;
}

/** El diagnóstico de un área (pantalla 06), o `undefined` si no tiene. */
export async function obtenerDiagnostico(areaId: string) {
  return (await getCollection('diagnosticos')).find((d) => d.data.area === areaId)?.data;
}

/** Un curso de la ruta con lo que la pantalla muestra de él. */
export type CursoParaNavegador = CursoRuta & {
  escuela: string;
  nombreEscuela: string;
  /** «Curso de muestra», «Lecciones en preparación», «Próximamente» o `null`. */
  etiqueta: string | null;
  /** Primera lección que ya se puede abrir, o `null`. */
  primeraLeccion: string | null;
};

/**
 * Lo que necesita `calcularRuta()` para cualquier área (pantalla 07): cursos visibles con sus lecciones visibles
 * (solo los campos que usa la regla), todos los diagnósticos y el ritmo.
 */
export async function datosRuta(): Promise<
  Omit<DatosRuta, 'diagnostico' | 'cursos'> & {
    cursos: Record<string, CursoParaNavegador>;
    diagnosticos: Record<string, DatosRuta['diagnostico']>;
  }
> {
  const escuelas = new Map((await obtenerEscuelas()).map((e) => [e.id, e.nombre]));
  const cursos = Object.fromEntries(
    (await obtenerCursosVisibles()).map((curso): [string, CursoParaNavegador] => [
      curso.id,
      {
        id: curso.id,
        titulo: curso.titulo,
        estado: curso.estado,
        oculto: curso.oculto,
        prerrequisitos: curso.prerrequisitos,
        minutosEstimados: curso.minutosEstimados,
        factorPractica: curso.factorPractica ?? 1,
        modulos: modulosVisibles(curso).map((modulo) => ({
          id: modulo.id,
          lecciones: modulo.lecciones.map(({ id, slug, titulo, minutos, enPreparacion, riesgo, datosPersonales }) => ({
            id,
            slug,
            titulo,
            minutos,
            enPreparacion,
            riesgo,
            datosPersonales,
          })),
        })),
        escuela: curso.escuela,
        nombreEscuela: escuelas.get(curso.escuela) ?? curso.escuela,
        etiqueta: etiquetaEstadoCurso(curso),
        primeraLeccion: primeraLeccionDisponible(curso)?.slug ?? null,
      },
    ]),
  );
  const diagnosticos = Object.fromEntries((await getCollection('diagnosticos')).map((d) => [d.data.area, d.data]));
  return {
    cursos,
    diagnosticos,
    horasSemanaPorDefecto: ajustes.ritmo.horasSemanaPorDefecto,
    ocultarDatosPersonales: ajustes.ocultarDatosPersonales,
    ocultarRiesgoAlto: ajustes.ocultarRiesgoAlto,
  };
}

// ── Lector de lecciones (parte 3.7) ──────────────────────────────────────────

/** Una lección del lector con su posición en el curso y la lección siguiente. */
export type LeccionEnLector = {
  curso: Curso;
  leccion: Leccion;
  /** Posición entre las lecciones visibles del curso, desde 1. */
  numero: number;
  total: number;
  /** `true` si es la vista previa gratis (la primera lección que ya se puede abrir). */
  esVistaPrevia: boolean;
  /** La siguiente lección que ya se puede abrir (se saltan las «en preparación»), o `null` si es la última. */
  siguiente: Leccion | null;
};

/** Todas las lecciones visibles de todos los cursos visibles: una página del lector por cada una. */
export async function leccionesDelLector(): Promise<LeccionEnLector[]> {
  return (await obtenerCursosVisibles()).flatMap((curso) => {
    const lecciones = leccionesVisibles(curso);
    const primera = primeraLeccionDisponible(curso);
    return lecciones.map((leccion, i) => ({
      curso,
      leccion,
      numero: i + 1,
      total: lecciones.length,
      esVistaPrevia: leccion.id === primera?.id,
      siguiente: lecciones.slice(i + 1).find((l) => !l.enPreparacion) ?? null,
    }));
  });
}

/**
 * Lo mínimo para saber en el navegador qué cursos tiene la ruta de la persona (`lib/mi-ruta.ts`), sin las
 * lecciones: la lista de cursos de la ruta no depende de ellas. Así cada página del lector carga pocos datos.
 */
export async function datosMiRutaCompactos() {
  const { cursos, diagnosticos, horasSemanaPorDefecto, ocultarDatosPersonales, ocultarRiesgoAlto } = await datosRuta();
  return {
    areas: (await obtenerAreas()).map(({ id, ruta, etapas }) => ({ id, ruta, etapas: etapas ?? null })),
    cursos: Object.fromEntries(
      Object.values(cursos).map(({ id, titulo, estado, oculto, prerrequisitos, minutosEstimados, factorPractica }) => [
        id,
        { id, titulo, estado, oculto, prerrequisitos, minutosEstimados, factorPractica, modulos: [] },
      ]),
    ),
    diagnosticos: Object.fromEntries(
      Object.entries(diagnosticos).map(([area, d]) => [
        area,
        {
          area: d.area,
          preguntas: d.preguntas.map((p) => ({
            id: p.id,
            opciones: p.opciones.map(({ id, efectos }) => ({ id, texto: '', efectos })),
          })),
        },
      ]),
    ),
    horasSemanaPorDefecto,
    ocultarDatosPersonales,
    ocultarRiesgoAlto,
  };
}

// ── Panel del presentador (/demo) ────────────────────────────────────────────

// Igual que con las escuelas: `getCollection` ordena por id, pero el orden que vale es el del archivo
// (Sofía primero). Para cambiarlo, mueve el perfil en `datos/perfiles-demo.json`.
const ordenPerfiles = datosPerfiles.map((perfil) => perfil.id);

/** Los perfiles de la presentación, en el orden de `perfiles-demo.json`. */
export async function obtenerPerfiles(): Promise<Perfil[]> {
  return (await getCollection('perfiles'))
    .map((entrada) => entrada.data)
    .sort((a, b) => ordenPerfiles.indexOf(a.id) - ordenPerfiles.indexOf(b.id));
}

/**
 * Ejercicios del curso para la ficha (pantalla 08): «un ejercicio en cada lección», «3 ejercicios» o `null`.
 * Cuenta las líneas `Ejercicio:` de las lecciones ya sincronizadas (`contenido-generado/`).
 */
export async function textoEjerciciosCurso(curso: Curso): Promise<string | null> {
  const lecciones = leccionesVisibles(curso).filter((leccion) => !leccion.enPreparacion);
  const porLeccion = await Promise.all(
    lecciones.map(async (leccion) => (await obtenerContenidoLeccion(curso.id, leccion.slug))?.data.ejercicios.length ?? 0),
  );
  const total = porLeccion.reduce((suma, n) => suma + n, 0);
  if (total === 0) return null;
  if (porLeccion.every((n) => n === 1)) return 'un ejercicio en cada lección';
  return plural(total, 'ejercicio');
}
