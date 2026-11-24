# scripts/ — herramientas de Node que corren fuera del sitio

| Archivo | Qué hace | Cómo se usa |
|---|---|---|
| `importar-analisis.mjs` | Genera `datos/` desde `analisis/`. **Se usó una vez**; si `datos/` ya existe, avisa y no sobrescribe (salvo con `--forzar`, que pierde las ediciones a mano). | `npm run importar-analisis` |
| `validar-datos.mjs` | Revisa `datos/`: esquemas, ids, que el plan tenga precio y nada más lo tenga, orden de prerrequisitos, perfiles y contenido sensible. | `npm run validar` (también dentro de `npm run build`) |
| `medir-contraste.mjs` | Mide el contraste de los tokens de color de `src/styles/global.css` y de los colores del código de las lecciones en `dist/` (mínimo 4,5:1). | `npm run contraste` (después de `npm run build`) |
| `sincronizar/` | Convierte los apuntes de Obsidian en lecciones (`contenido-generado/`) y copia sus imágenes (`public/apuntes/`). Detalle en `sincronizar/README.md`. | `npm run sincronizar` (también dentro de `build`; `dev` lo corre solo si falta el contenido) |

**Orden:** `validar` → `sincronizar` → `astro check` → `astro build` (es lo que hace `npm run build`).

Los esquemas y la regla de visibilidad que usan estos scripts viven en `src/lib/compartido/` (los comparte el sitio): no los copies aquí.

## Cómo depurar una imagen que no aparece

1. Corre `npm run sincronizar` y mira el resumen: «imágenes no encontradas» lista cada `![[…]]` con su archivo y línea.
2. Busca la lección en `contenido-generado/_reporte.json`:
   - `imagenesNoEncontradas` → el archivo no existe en el vault con ese nombre (revisa mayúsculas, acentos o si está en otra carpeta);
   - `imagenesAmbiguas` → había varios archivos con ese nombre; `elegida` dice cuál se usó (el más cercano a la nota) y `candidatos`, cuáles había;
   - `imagenesOmitidas` → está en `imagenesOcultas` de la lección (`datos/cursos/<curso>.json`).
3. Abre `contenido-generado/<curso>/<leccion>.md` y busca la etiqueta `<img src="/apuntes/<curso>/<nombre>" …>`: ese archivo debe existir en `public/apuntes/<curso>/` (las capturas PNG y JPG se publican como `.webp`). Si una no se pudo convertir, aparece en `imagenesSinConvertir`.
4. Si la lección ni siquiera existe en `contenido-generado/`, está oculta (riesgo alto, datos personales, curso oculto), en preparación, o su `seccion` no coincide con ningún encabezado (el resumen lo marca con ✗).
