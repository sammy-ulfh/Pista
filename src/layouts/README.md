# src/layouts/ — esqueletos de página

- `LayoutBase.astro` — `<head>`, fuentes, estilos, cabecera, pie y avisos flotantes. Lo usan todas las páginas.
  Props: `titulo` (pestaña), `salirA` (cabecera de cuestionario), `ocultarDeBuscadores`.
  La cabecera con o sin sesión depende del estado de la demo; un script en línea en `<head>` evita el parpadeo al recargar.
- `LayoutLector.astro` — el lector de lecciones: barra lateral (`slot="lateral"`) y la lección; en móvil, la barra va arriba.

¿Cambiar el título de la pestaña o la descripción por defecto? `LayoutBase.astro`.
