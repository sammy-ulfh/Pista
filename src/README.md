# src/ — el código del sitio (Astro)

- `pages/` — una página por pantalla (su guía es `pages/_README.md`) de `pantallas.html` (la ruta sale del nombre del archivo).
- `layouts/` — el esqueleto común de las páginas.
- `components/` — piezas reutilizables, agrupadas por tema.
- `lib/` — lógica en TypeScript sin HTML (avisos, diálogos, portadas, catálogo, estado de la demo, ruta, bitácora e insignias).
- `content.config.ts` — conecta los archivos de `datos/` con Astro (colecciones `escuelas`, `cursos`, `orientacion`, `diagnosticos` y `perfiles`) y las lecciones de `contenido-generado/` (colección `lecciones`).
- `styles/global.css` — Tailwind y los tokens del estilo «Cuaderno» (colores, fuentes, radios, sombras).

¿Cambiar un color o una fuente? `styles/global.css`. ¿Un texto de una pantalla? Su archivo en `pages/`.
