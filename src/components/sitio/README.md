# components/sitio/ — lo que se repite en todas las páginas

- `Cabecera.astro` — logo y navegación. Dibuja las dos variantes (sin sesión, pantalla 01; con sesión, pantalla 08) y el CSS muestra la que toca según el estado de la demo. Los enlaces están en `ENLACES`, al inicio del archivo.
- `PieDePagina.astro` — «Hecho por estudiantes, para estudiantes» y «Reiniciar demo» (borra el estado; lo conecta `lib/estado-en-pagina.ts`).
- `MenuUsuario.astro` — círculo del usuario de demo; lleva a «Mi bitácora».

Los incluye `src/layouts/LayoutBase.astro`; las páginas no los importan.
