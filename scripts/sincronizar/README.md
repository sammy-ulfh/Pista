# scripts/sincronizar/ — de apuntes de Obsidian a lecciones

`npm run sincronizar` corre `index.mjs`, que solo orquesta estos pasos (cada módulo exporta funciones puras que se prueban en `__pruebas__/`):

| Paso | Archivo | Qué hace |
|---|---|---|
| 1 | `obtener-fuentes.mjs` | Clona cada repositorio de `datos/fuentes.json` si falta y comprueba que esté en su `commit`. Si está en otro, avisa y no lo toca (salvo `-- --actualizar`). |
| 2 | `filtrar-sensibles.mjs` | Qué lecciones se generan: usa `src/lib/compartido/visibilidad.js` (no la copia) y deja fuera las «en preparación». También decide si una imagen está en `imagenesOcultas`. |
| 3 | `convertir-obsidian.mjs` | Quita frontmatter, comentarios `%%` y secciones de navegación («Índice», «Siguientes apuntes»…); parte las notas largas por `seccion`; `==texto==` → `<mark>`; lenguajes de código en minúsculas; quita el `# Título` inicial (el lector ya lo muestra), saca las líneas `Ejercicio:` al frontmatter y arma las `<img>` con `width`/`height` y `loading="lazy"` (salvo la primera). |
| 4 | `resolver-enlaces.mjs` | Encuentra el archivo de cada `![[…]]` y `[[…]]` como Obsidian (carpeta de la nota → raíz del vault → por nombre, el más cercano) y decide si un enlace va a una lección, a un ancla o queda como texto. |
| 5 | `copiar-imagenes.mjs` | Nombres públicos sin choques (`021.PNG` → `021.webp`); publica solo lo usado en `public/apuntes/<curso>/`, **convirtiendo PNG y JPG a WebP** (calidad 85, ~74 % menos peso; SVG, GIF y PDF se copian tal cual), borra lo que sobra, arma la hoja de revisión de capturas y mide cada imagen (`medirImagen`, con `sharp`, que ya viene con Astro; no es dependencia propia). |

**Salida:** `contenido-generado/<curso>/<leccion>.md`, `contenido-generado/_reporte.json` (todo lo que pasó, con archivo y línea) y `contenido-generado/_revision-capturas.html`. Las dos carpetas de salida se borran y regeneran: no edites nada ahí.

**Partir notas:** cada `seccion` es el encabezado donde empieza su lección. Los bloques sin lección (como «¿Qué es Picom?») se unen a la lección siguiente; el reporte los lista en `bloquesUnidos`. Para mandar un bloque a otra lección (por ejemplo, a la anterior, si es su continuación), escribe su encabezado en `bloquesExtra` de esa lección en `datos/cursos/<curso>.json`.

**Texto alternativo:** sale de lo que va después de `|` en `![[imagen|texto]]` (los cursos de `apuntes-demo/` lo usan); si no hay, del nombre del archivo.

**Hoja de revisión:** `_revision-capturas.html` muestra, en una sección aparte «Riesgo alto (nuevo)», las capturas de las lecciones de riesgo alto que se publican desde la parte 3.9; después, las de riesgo medio, y enlaza todos los adjuntos publicados (PDF). Ambos se ocultan con `imagenesOcultas`.

**¿Cambiar una regla?** Conversión → `convertir-obsidian.mjs`; búsqueda de archivos o enlaces → `resolver-enlaces.mjs`; nombres de imágenes → `copiar-imagenes.mjs`. Agrega o ajusta su prueba en `__pruebas__/` y corre `npm run probar`.

**WebP:** la primera sincronización convierte ~2 000 capturas (unos 20 s); las siguientes solo convierten lo que cambió. Si una imagen no se puede convertir, el resumen la lista y el comando termina con error. Para cambiar la calidad, edita `CALIDAD_WEBP` en `copiar-imagenes.mjs` y borra `public/apuntes/` para que todo se vuelva a convertir. `imagenesOcultas` acepta el nombre original (`021.PNG`) o el publicado (`021.webp`).
