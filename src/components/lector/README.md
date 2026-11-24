# components/lector/ — el lector de lecciones (pantallas 10 y 11)

Lo arma `pages/cursos/[curso]/[leccion].astro` dentro de `layouts/LayoutLector.astro` (barra lateral + lección).

- `ListaLecciones.astro` — barra lateral: escuela y área, curso, «Lección N de M», barra de vistas, lecciones por módulo (vista ✓ / actual / pendiente, candado sin plan) y «← Volver al curso / a mi ruta». En móvil es el desplegable «Lecciones del curso».
- `NavegacionLeccion.astro` — «Siguiente: …» y «Marcar como vista y seguir →» (guarda la lección y el día; en la última lleva a `/bitacora`).
- `InvitacionSuscripcion.astro` — «Suscríbete para continuar» + `TarjetaPlan` para las lecciones que no son vista previa, sin plan.
- `VisorImagenes.astro` — abre en grande (en un `Dialogo`) la imagen en la que se hace clic.
- `AvisoEtico.astro` (lecciones de riesgo medio: «Uso ético»; de riesgo alto: «Solo en tu laboratorio», con `textoAvisoEticoAlto`) · `EtiquetaIdioma.astro` («En inglés»).

**¿Cambiar algo?** Estilo del texto de las lecciones (imágenes, código, `<mark>`, tablas): `src/styles/global.css`, sección 6.
Textos de la vista previa y del bloqueo: `datos/ajustes.json` → `suscripcion`. Uso ético: `textoAvisoEtico`.
Medidas de las imágenes, título repetido y ejercicios: se resuelven en `scripts/sincronizar/` (no aquí).
