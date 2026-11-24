/**
 * Color y patrón de las portadas y píldoras de escuela (ui/Portada.astro, ui/Pildora.astro).
 *
 * El color de cada escuela es su campo `color` de `datos/escuelas.json` (uno de `COLORES_ESCUELA`), que
 * corresponde al token `--color-<color>` de `src/styles/global.css`. Dos escuelas pueden compartir color.
 * Los componentes no llaman a esto directamente: usan `colorDeEscuela(id)` de `lib/catalogo.ts`, que busca el campo.
 * El patrón se puede pasar a la portada; si no se pasa, se elige uno estable a partir del id de la escuela.
 * Funciones puras (sin leer archivos), así que también sirven en el navegador; pruebas en `portadas.test.ts`.
 */

/** Patrones disponibles; cada uno está dibujado en `global.css` (sección 5). */
export const PATRONES = ['cuadricula', 'rayas', 'puntos', 'renglones', 'circulos'] as const;

export type Patron = (typeof PATRONES)[number];

/** Valor CSS de un color de escuela (`"negocios"` → `var(--color-negocios, …)`), con la tinta como respaldo. */
export function valorColor(color: string | null | undefined): string {
  return color ? `var(--color-${color}, var(--color-tinta))` : 'var(--color-tinta)';
}

/**
 * Valor CSS del color de la escuela `id`, según el campo `color` de cada escuela. Una escuela que no existe usa la
 * tinta (nunca se adivina el color a partir del id).
 */
export function colorSegunEscuelas(escuelas: readonly { id: string; color: string }[], id: string): string {
  return valorColor(escuelas.find((escuela) => escuela.id === id)?.color);
}

/** Patrón por defecto de una escuela: siempre el mismo para el mismo id. */
export function patronDeEscuela(escuela: string): Patron {
  // Hash sencillo del texto (multiplicador 29): con las 5 escuelas actuales da 5 patrones distintos.
  let hash = 0;
  for (const letra of escuela) hash = (Math.imul(hash, 29) + (letra.codePointAt(0) ?? 0)) >>> 0;
  return PATRONES[hash % PATRONES.length];
}
