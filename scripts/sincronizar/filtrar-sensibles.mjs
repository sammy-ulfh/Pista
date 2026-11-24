/**
 * Decide qué lecciones se generan. La regla NO vive aquí: se importa de `src/lib/compartido/visibilidad.js`,
 * la misma que usa el sitio, para que la sincronización y las páginas nunca discrepen.
 *
 * Una lección no se genera (ni se copian sus imágenes) si:
 *   - la regla de visibilidad la oculta (curso oculto, datos personales con `ocultarDatosPersonales` o riesgo alto con
 *     `ocultarRiesgoAlto`);
 *   - está «en preparación» (no tiene nota todavía);
 *   - su curso es «próximamente» (solo ficha).
 */
import { motivoLeccionOculta } from '../../src/lib/compartido/visibilidad.js';

/**
 * @typedef {object} LeccionPlana
 * @property {any} curso      El curso completo de `datos/cursos/`.
 * @property {any} modulo
 * @property {any} leccion
 * @property {number} orden   Posición de la lección dentro del curso, desde 1 (contando también las ocultas,
 *                            para que el orden no cambie al encender o apagar el interruptor).
 */

/**
 * Recorre todos los cursos y separa las lecciones que se generan de las que no, con su motivo.
 * @param {any[]} cursos  Cursos de `datos/cursos/` (ya validados).
 * @param {{ ocultarDatosPersonales: boolean, ocultarRiesgoAlto: boolean }} ajustes
 * @returns {{ visibles: LeccionPlana[], omitidas: (LeccionPlana & { motivo: string })[] }}
 */
export function separarLecciones(cursos, ajustes) {
  /** @type {LeccionPlana[]} */
  const visibles = [];
  /** @type {(LeccionPlana & { motivo: string })[]} */
  const omitidas = [];
  for (const curso of cursos) {
    let orden = 0;
    for (const modulo of curso.modulos) {
      for (const leccion of modulo.lecciones) {
        orden++;
        const plana = { curso, modulo, leccion, orden };
        const motivo = motivoLeccionOculta(leccion, curso, ajustes) ?? (leccion.enPreparacion || leccion.ruta === null ? 'en-preparacion' : null);
        if (motivo) omitidas.push({ ...plana, motivo });
        else visibles.push(plana);
      }
    }
  }
  return { visibles, omitidas };
}

/**
 * `true` si la imagen está en `imagenesOcultas` de la lección. Se compara el nombre del archivo, sin carpetas
 * y sin distinguir mayúsculas; vale tanto el nombre original (`021.PNG`) como el publicado (`021.webp`).
 * @param {{ imagenesOcultas?: string[] }} leccion
 * @param {string} rutaOriginal
 * @param {string} [nombrePublico]
 */
export function imagenOculta(leccion, rutaOriginal, nombrePublico) {
  const lista = (leccion.imagenesOcultas ?? []).map((n) => n.replace(/^.*\//, '').normalize('NFC').toLowerCase());
  if (!lista.length) return false;
  const original = rutaOriginal.replace(/^.*\//, '').normalize('NFC').toLowerCase();
  return lista.includes(original) || (nombrePublico !== undefined && lista.includes(nombrePublico.toLowerCase()));
}
