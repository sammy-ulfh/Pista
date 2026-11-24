/**
 * Regla de visibilidad: decide si un curso o una lección se oculta en la demo.
 *
 * Es JavaScript con tipos JSDoc (no TypeScript) para que la usen sin compilar tanto el sitio
 * (`src/lib/catalogo.ts`) como los scripts de Node (`scripts/validar-datos.mjs`, la sincronización).
 * No copies esta regla en otro lado: impórtala.
 *
 * La regla (CONSTRUCCION.md, sección 5). Los dos interruptores viven en `datos/ajustes.json`:
 *   - un curso se oculta si tiene `oculto: true` (siempre);
 *   - una lección se oculta si su curso está oculto,
 *     si `ocultarDatosPersonales` es `true` y la lección tiene `datosPersonales: true`,
 *     o si `ocultarRiesgoAlto` es `true` y la lección tiene `riesgo: "alto"`.
 * Desde la parte 3.9 la demo usa `ocultarDatosPersonales: true` y `ocultarRiesgoAlto: false`: lo de riesgo alto se
 * publica con su aviso ético fuerte (`textoAvisoEticoAlto`) y lo que tiene datos personales sigue oculto.
 */

/**
 * @typedef {object} AjustesVisibilidad
 * @property {boolean} ocultarDatosPersonales
 * @property {boolean} ocultarRiesgoAlto
 */

/**
 * @typedef {object} CursoVisibilidad
 * @property {boolean} oculto
 */

/**
 * @typedef {object} LeccionVisibilidad
 * @property {'ninguno' | 'medio' | 'alto'} riesgo
 * @property {boolean} datosPersonales
 */

/**
 * Por qué se oculta algo. `null` significa que se muestra.
 * @typedef {'curso-oculto' | 'riesgo-alto' | 'datos-personales' | null} MotivoOculto
 */

/**
 * Motivo por el que se oculta un curso, o `null` si se muestra.
 * @param {CursoVisibilidad} curso
 * @param {AjustesVisibilidad} [_ajustes]  No se usa: `oculto: true` oculta el curso con cualquier ajuste.
 * @returns {MotivoOculto}
 */
export function motivoCursoOculto(curso, _ajustes) {
  return curso.oculto ? 'curso-oculto' : null;
}

/**
 * Motivo por el que se oculta una lección, o `null` si se muestra.
 * Los datos personales van antes que el riesgo: es el motivo que más importa si una lección tiene los dos.
 * @param {LeccionVisibilidad} leccion
 * @param {CursoVisibilidad} curso  El curso al que pertenece la lección.
 * @param {AjustesVisibilidad} ajustes
 * @returns {MotivoOculto}
 */
export function motivoLeccionOculta(leccion, curso, ajustes) {
  if (curso.oculto) return 'curso-oculto';
  if (ajustes.ocultarDatosPersonales && leccion.datosPersonales) return 'datos-personales';
  if (ajustes.ocultarRiesgoAlto && leccion.riesgo === 'alto') return 'riesgo-alto';
  return null;
}

/**
 * `true` si el curso se oculta.
 * @param {CursoVisibilidad} curso
 * @param {AjustesVisibilidad} [ajustes]
 * @returns {boolean}
 */
export function cursoOculto(curso, ajustes) {
  return motivoCursoOculto(curso, ajustes) !== null;
}

/**
 * `true` si la lección se oculta.
 * @param {LeccionVisibilidad} leccion
 * @param {CursoVisibilidad} curso
 * @param {AjustesVisibilidad} ajustes
 * @returns {boolean}
 */
export function leccionOculta(leccion, curso, ajustes) {
  return motivoLeccionOculta(leccion, curso, ajustes) !== null;
}
