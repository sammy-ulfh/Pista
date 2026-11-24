# src/pages/ — una página por pantalla

> Se llama `_README.md` (con guion bajo) porque Astro publicaría un `README.md` dentro de `pages/` como página.

Astro crea una ruta por archivo: `index.astro` → `/`, `demo.astro` → `/demo`.

- `index.astro` — pantalla 01 · Inicio (contenido fijo).
- `escuelas.astro` — pantalla 02 · Escuelas.
- `areas/[area].astro` — pantalla 03 · Área (una página por área `disponible` o `muestra`).
- `orientacion/index.astro` — pantalla 04 · Orientación («No sé por dónde empezar»).
- `orientacion/resultado.astro` — pantalla 05 · Recomendación.
- `areas/[area]/diagnostico.astro` — pantalla 06 · Diagnóstico del área (una por área con `datos/diagnosticos/<área>.json`).
- `mi-ruta.astro` — pantalla 07 · Tu ruta (sin diagnóstico, invita a hacerlo).
- `cursos/[curso].astro` — pantallas 08 · Curso y 09 · Suscripción simulada (una página por curso visible).
- `cursos/[curso]/[leccion].astro` — pantallas 10 y 11 · Lección (una página por lección visible; vista previa, bloqueo sin plan y «en preparación»).
- `bitacora.astro` — pantalla 12 · Mi bitácora.
- `demo.astro` — panel del presentador (`/demo`, oculto y `noindex`): cargar un perfil, reiniciar y el recorrido.
- `404.astro` — página no encontrada, con enlace a Inicio.

Las páginas solo arman componentes: la lógica va en `src/lib/` (CONSTRUCCION.md, sección 12).
