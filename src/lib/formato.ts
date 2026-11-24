/**
 * Cómo se muestran los datos en pantalla: duraciones, niveles, estados y plurales.
 * Funciones puras (sin HTML), probadas en `formato.test.ts`. Si cambias un texto de etiqueta, cámbialo aquí.
 */

/** Nombre visible de cada nivel de curso. */
export const NOMBRES_NIVEL = { basico: 'Básico', intermedio: 'Intermedio', avanzado: 'Avanzado' } as const;

/** Etiqueta visible del estado de una escuela, un área o un curso. */
export const ETIQUETAS_ESTADO = {
  disponible: 'Disponible',
  muestra: 'Curso de muestra',
  proximamente: 'Próximamente',
} as const;

/**
 * Duración aproximada de un curso o un área: «~1 h 10 min», «~50 min», «~3 h».
 * Se redondea a 5 minutos (nunca menos de 5) porque es solo una referencia para planear.
 */
export function formatoDuracion(minutos: number): string {
  const redondeado = Math.max(5, Math.round(minutos / 5) * 5);
  const horas = Math.floor(redondeado / 60);
  const resto = redondeado % 60;
  if (horas === 0) return `~${resto} min`;
  return resto === 0 ? `~${horas} h` : `~${horas} h ${resto} min`;
}

/** Duración de una lección: «14 min» (redondeada al minuto, nunca menos de 1). */
export function formatoMinutosLeccion(minutos: number): string {
  return `${Math.max(1, Math.round(minutos))} min`;
}

/** «1 curso», «3 cursos». */
export function plural(cantidad: number, singular: string, pluralTexto = `${singular}s`): string {
  return `${cantidad} ${cantidad === 1 ? singular : pluralTexto}`;
}

/** Cambia `{nombre}` por su valor: `rellenar('incluido «{curso}»', { curso: 'X' })`. */
export function rellenar(plantilla: string, valores: Record<string, string>): string {
  return plantilla.replace(/\{(\w+)\}/g, (completo, clave: string) => valores[clave] ?? completo);
}

/** Ritmo de la ruta: «1 h por semana», «30 min por semana», «1 h 30 min por semana». */
export function formatoHorasSemana(horas: number): string {
  const minutos = Math.round(horas * 60);
  const h = Math.floor(minutos / 60);
  const resto = minutos % 60;
  const texto = h === 0 ? `${resto} min` : resto === 0 ? `${h} h` : `${h} h ${resto} min`;
  return `${texto} por semana`;
}

/** Fecha de inicio de la ruta: «lunes 23 de noviembre». */
export function formatoFechaInicio(fecha: Date): string {
  return new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }).format(fecha).replace(',', '');
}

/**
 * «¿Por qué este orden?» cuando el área no trae su propio texto (`porQueEsteOrden` en `escuelas.json`):
 * «Cada curso prepara el siguiente: primero «A», después «B» y al final «C».»
 */
export function textoOrdenCursos(titulos: string[]): string {
  const t = titulos.map((titulo) => `«${titulo}»`);
  if (t.length === 0) return '';
  if (t.length === 1) return `Todo empieza y termina en ${t[0]}.`;
  const medio = t.slice(1, -1).map((x) => `después ${x}`);
  return `Cada curso prepara el siguiente: primero ${[t[0], ...medio].join(', ')} y al final ${t.at(-1)}.`;
}
