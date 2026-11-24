/**
 * Bitácora: racha, calendario de estudio y avance, calculados a partir del estado de la demo.
 *
 * Funciones puras (sin HTML ni `localStorage`), probadas en `bitacora.test.ts` con fechas fijas. Nada de esto se
 * guarda: se recalcula cada vez desde `diasEstudio` y `leccionesVistas` (CONSTRUCCION.md, sección 7).
 *
 * Días: siempre con la fecha LOCAL del navegador («AAAA-MM-DD»), no con UTC; así, estudiar a las 11 de la noche
 * cuenta para ese día y no para el siguiente.
 */
import type { Ruta } from './ruta';

/** Fecha local en formato «AAAA-MM-DD» (el que se guarda en `diasEstudio`). */
export function fechaLocal(fecha: Date): string {
  const dos = (n: number) => String(n).padStart(2, '0');
  return `${fecha.getFullYear()}-${dos(fecha.getMonth() + 1)}-${dos(fecha.getDate())}`;
}

/** «AAAA-MM-DD» → fecha local a medianoche, o `null` si el texto no es una fecha válida. */
export function leerFecha(texto: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(texto);
  if (!m) return null;
  const fecha = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return fechaLocal(fecha) === texto ? fecha : null; // descarta «2026-02-31»
}

/** La misma fecha `dias` días después (o antes, si es negativo). Respeta los cambios de horario. */
export function sumarDias(fecha: Date, dias: number): Date {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + dias);
}

/** Días de estudio válidos, sin repetir y en orden. */
function diasValidos(dias: readonly string[]): string[] {
  return [...new Set(dias.filter((d) => leerFecha(d) !== null))].sort();
}

// ── Racha ───────────────────────────────────────────────────────────────────

/**
 * Racha actual: cuántos días seguidos se estudió, hasta hoy.
 * Hoy todavía no termina: si hoy no se ha estudiado pero ayer sí, la racha sigue viva (cuenta hasta ayer).
 * Un día completo sin estudiar la reinicia a 0.
 */
export function calcularRacha(diasEstudio: readonly string[], hoy: Date): number {
  const dias = new Set(diasValidos(diasEstudio));
  let dia = dias.has(fechaLocal(hoy)) ? hoy : sumarDias(hoy, -1);
  let racha = 0;
  while (dias.has(fechaLocal(dia))) {
    racha++;
    dia = sumarDias(dia, -1);
  }
  return racha;
}

/** La racha más larga de toda la bitácora (sirve para las insignias: una vez ganada, no se pierde). */
export function mejorRacha(diasEstudio: readonly string[]): number {
  let mejor = 0;
  let actual = 0;
  let anterior: string | null = null;
  for (const dia of diasValidos(diasEstudio)) {
    const seguido = anterior !== null && fechaLocal(sumarDias(leerFecha(anterior)!, 1)) === dia;
    actual = seguido ? actual + 1 : 1;
    mejor = Math.max(mejor, actual);
    anterior = dia;
  }
  return mejor;
}

// ── Calendario ──────────────────────────────────────────────────────────────

export type DiaCalendario = {
  /** «AAAA-MM-DD» */
  fecha: string;
  /** Día del mes. */
  dia: number;
  estudiado: boolean;
  esHoy: boolean;
  /** Días que todavía no llegan (el resto de la semana actual). */
  futuro: boolean;
};

/** El lunes de la semana de `fecha` (las semanas van de lunes a domingo). */
export function lunesDeLaSemana(fecha: Date): Date {
  const desdeLunes = (fecha.getDay() + 6) % 7; // getDay(): 0 = domingo
  return sumarDias(fecha, -desdeLunes);
}

/**
 * Las últimas `semanas` semanas, de lunes a domingo, terminando con la semana de hoy.
 * Devuelve una lista por semana, de la más antigua a la actual.
 */
export function calendarioEstudio(diasEstudio: readonly string[], hoy: Date, semanas = 3): DiaCalendario[][] {
  const dias = new Set(diasValidos(diasEstudio));
  const textoHoy = fechaLocal(hoy);
  const inicio = sumarDias(lunesDeLaSemana(hoy), -7 * (semanas - 1));
  return Array.from({ length: semanas }, (_, s) =>
    Array.from({ length: 7 }, (_, d) => {
      const fecha = sumarDias(inicio, s * 7 + d);
      const texto = fechaLocal(fecha);
      return { fecha: texto, dia: fecha.getDate(), estudiado: dias.has(texto), esHoy: texto === textoHoy, futuro: texto > textoHoy };
    }),
  );
}

// ── Avance ──────────────────────────────────────────────────────────────────

export type AvanceCurso = {
  vistas: number;
  total: number;
  /** Primera lección disponible que todavía no se ve (`curso/leccion`), o `null` si ya se vieron todas. */
  siguiente: string | null;
};

/**
 * Avance de un curso. `disponibles` son los ids de sus lecciones que ya se pueden ver (visibles y que no están
 * «en preparación»), en orden.
 */
export function avanceCurso(disponibles: readonly string[], leccionesVistas: readonly string[]): AvanceCurso {
  const vistas = new Set(leccionesVistas);
  return {
    vistas: disponibles.filter((id) => vistas.has(id)).length,
    total: disponibles.length,
    siguiente: disponibles.find((id) => !vistas.has(id)) ?? null,
  };
}

/** Lecciones de la ruta que ya se pueden ver (sin las «en preparación» ni los cursos «próximamente»). */
export function leccionesDisponiblesDeRuta(ruta: Ruta): string[] {
  return ruta.semanas.flatMap((s) => s.elementos.flatMap((e) => (e.tipo === 'leccion' && !e.enPreparacion ? [e.id] : [])));
}

/**
 * Semanas de la ruta completadas: las que tienen al menos una lección disponible y ya se vieron todas.
 * Las semanas que solo tienen cursos «próximamente» o lecciones «en preparación» no se pueden completar todavía.
 */
export function semanasCompletadas(ruta: Ruta, leccionesVistas: readonly string[]): number {
  const vistas = new Set(leccionesVistas);
  return ruta.semanas.filter((s) => {
    const disponibles = s.elementos.filter((e) => e.tipo === 'leccion' && !e.enPreparacion);
    return disponibles.length > 0 && disponibles.every((e) => vistas.has(e.id));
  }).length;
}

// ── «Mis cursos» ────────────────────────────────────────────────────────────

/** Lo que «Mis cursos» necesita de cada curso (es parte de `CursoParaNavegador`, de `lib/catalogo.ts`). */
export type CursoBitacora = {
  id: string;
  titulo: string;
  estado: 'disponible' | 'muestra' | 'proximamente';
  modulos: { lecciones: { id: string; slug: string; enPreparacion: boolean }[] }[];
};

export type FilaMisCursos = {
  curso: string;
  titulo: string;
  /**
   * empezado: tiene al menos una lección vista (con su avance) · por-empezar: de la ruta, sin lecciones vistas ·
   * en-preparacion / proximamente: de la ruta, sin lecciones que ya se puedan ver.
   */
  tipo: 'empezado' | 'por-empezar' | 'en-preparacion' | 'proximamente';
  avance: AvanceCurso;
  /** A dónde lleva el botón de la fila. */
  href: string;
  boton: 'Seguir' | 'Repasar' | 'Empezar' | 'Ver';
};

/** Ids de las lecciones del curso que ya se pueden ver (sin las «en preparación»), en orden. */
export function leccionesDisponibles(curso: CursoBitacora): string[] {
  return curso.modulos.flatMap((m) => m.lecciones.filter((l) => !l.enPreparacion).map((l) => l.id));
}

/** `curso/leccion` → la URL de su página en el lector. */
const urlLeccion = (id: string) => `/cursos/${id}`;

/**
 * Filas de «Mis cursos» (pantalla 12): primero los cursos empezados (los de la ruta en su orden, luego los demás
 * en el orden en que se empezaron) y después el resto de los cursos de la ruta.
 * Un curso terminado lleva «Repasar» (a su ficha); uno empezado, «Seguir» (a la primera lección sin ver).
 */
export function filasMisCursos(
  cursos: Record<string, CursoBitacora>,
  cursosRuta: readonly string[] | null,
  leccionesVistas: readonly string[],
): FilaMisCursos[] {
  const ruta = (cursosRuta ?? []).filter((id) => cursos[id]);
  const porVista = leccionesVistas.map((id) => id.split('/')[0]).filter((id) => cursos[id]);
  const fila = (id: string): FilaMisCursos => {
    const curso = cursos[id];
    const disponibles = leccionesDisponibles(curso);
    const avance = avanceCurso(disponibles, leccionesVistas);
    const base = { curso: id, titulo: curso.titulo, avance };
    if (avance.vistas > 0) {
      return avance.siguiente
        ? { ...base, tipo: 'empezado', href: urlLeccion(avance.siguiente), boton: 'Seguir' }
        : { ...base, tipo: 'empezado', href: `/cursos/${id}`, boton: 'Repasar' };
    }
    if (disponibles.length > 0) return { ...base, tipo: 'por-empezar', href: urlLeccion(disponibles[0]), boton: 'Empezar' };
    return { ...base, tipo: curso.estado === 'proximamente' ? 'proximamente' : 'en-preparacion', href: `/cursos/${id}`, boton: 'Ver' };
  };

  const filas = [...new Set([...ruta, ...porVista])].map(fila);
  const empezados = filas.filter((f) => f.tipo === 'empezado');
  const resto = filas.filter((f) => f.tipo !== 'empezado' && ruta.includes(f.curso));
  return [...empezados, ...resto];
}
