# apuntes-demo/ — cursos de muestra en Markdown de Obsidian

Aquí están los cursos de las escuelas que todavía no tienen apuntes reales. Se escriben igual que una nota de
Obsidian y pasan por la misma sincronización que los apuntes de `fuentes/Notes`, así que en el lector se ven igual.
Es la fuente `demo` de `datos/fuentes.json`. **El equipo debe revisar estos textos antes de presentarlos.**

```
apuntes-demo/
└── <escuela>/                 ← id de la escuela (negocios, comunicacion, habilidades…)
    └── <curso>/               ← id del curso, igual que datos/cursos/<curso>.json
        ├── 01-<slug>.md       ← una nota por lección; el número fija el orden
        └── images/<nombre>.svg  ← esquemas propios (sin fotos, personas reales ni marcas)
```

## Cómo se escribe una lección

- Primera línea: `# Título`. Después, una introducción corta y 2 o 3 secciones `##`.
- Imágenes: `![[images/nombre.svg|Texto alternativo]]`. Lo que va después de `|` es lo que leen los lectores de pantalla.
- Al final, una línea que empiece con `Ejercicio:` (el lector la muestra en una caja).
- Se permite lo mismo que en los apuntes reales: `**negritas**`, listas, tablas, `==resaltado==` y `[[02-otra-leccion|enlaces]]`.
  No uses HTML, callouts `> [!note]`, etiquetas `#tag` ni frontmatter.
- Entre 400 y 900 palabras. Minutos = palabras / 200 + 0,2 por imagen + minutos del ejercicio (se anotan en `datos/cursos/<curso>.json`).
- Consejo general, sin estadísticas, estudios ni citas inventados.

## Cómo añadir un curso nuevo

1. Crea `apuntes-demo/<escuela>/<curso>/` con sus notas y su carpeta `images/`.
2. En `datos/cursos/<curso>.json`, en cada lección: `"fuente": "demo"`, `"ruta": "<escuela>/<curso>/01-<slug>.md"`, sus `minutos` y `"enPreparacion": false`.
3. Si es una escuela nueva, agrégala (con su color) en `datos/escuelas.json`.
4. Corre `npm run validar` y `npm run sincronizar`: el resumen avisa si falta una nota o una imagen.

Cuando lleguen apuntes reales de otra escuela en un repositorio aparte, no van aquí: se agrega su entrada en
`datos/fuentes.json` (como `notes-tecnologia`) y sus lecciones apuntan a esa fuente.
