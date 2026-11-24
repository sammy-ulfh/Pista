# scripts/sincronizar/__pruebas__/ — pruebas de la sincronización

Corren con `npm run probar` (Vitest) y no necesitan `fuentes/` clonado.

- `casos-reales.test.mjs` — 10 casos de `analisis/problemas.csv` (imágenes ambiguas, nombres con U+00A0, `.PNG`, `|300`, alias y anclas), con los nombres reales de los vaults escritos a mano.
- `nota-prueba.md` + `nota-prueba.test.mjs` — una nota pequeña que ejercita todo: índice, comentario, partición por `seccion` (con un H3) y `bloquesExtra`, imágenes, una imagen en `imagenesOcultas`, enlaces, PDF, resaltado y código.
- `lector.test.mjs` — ajustes para el lector: quitar el H1 inicial (con una nota real y una de muestra, y con `bloquesExtra`), ejercicios, `<img>` con medidas y separación de imágenes sueltas.
- `modulos.test.mjs` — piezas sueltas: nombres públicos de imágenes, hoja de revisión (adjuntos), qué lecciones se generan, decisión de git, lenguajes y textos alternativos (también con `|texto`).

Si cambias una regla de conversión, agrega aquí el caso que la motivó.
