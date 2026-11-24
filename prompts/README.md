# Prompts de construcción (Etapa 3)

Cada archivo es una parte de la construcción. Se ejecutan **en orden, una por sesión**, y cada una
empieza solo cuando la anterior terminó con su lista de comprobación en verde.

| Parte | Archivo | Qué deja hecho |
|---|---|---|
| 3.1 | `3.1-base.md` | Proyecto Astro + Tailwind, estilo «Cuaderno», layout y componentes base |
| 3.2 | `3.2-datos.md` | `datos/` con escuelas, cursos, cuestionarios y perfiles, validados |
| 3.3 | `3.3-sincronizacion.md` | Apuntes de Obsidian convertidos a lecciones listas para Astro |
| 3.4 | `3.4-cursos-muestra.md` | Los 3 cursos de muestra escritos en `apuntes-demo/` |
| 3.5 | `3.5-catalogo-compra.md` | Escuelas, Área, Curso y suscripción simulada al plan de $50 al mes |
| 3.6 | `3.6-orientacion-ruta.md` | Orientación, Recomendación, Diagnóstico y Mi ruta |
| 3.7 | `3.7-lector-bitacora.md` | Lector de lecciones y Mi bitácora |
| 3.8 | `3.8-pulido-presentacion.md` | Panel `/demo`, revisión final y guion de la presentación |
| 3.9 | `3.9-roadmap-ciberseguridad.md` | Roadmap por etapas de Ciberseguridad (foco de la demo), perfiles Sofía y Valeria y guion nuevo |

## Prompt corto para cada sesión

Cambia `3.X` por la parte que toca:

```text
Lee PROYECTO.md y CONSTRUCCION.md, y después ejecuta prompts/3.X-*.md.
Haz solo esa parte. Al terminar, revisa la lista de comprobación de la parte y la de
CONSTRUCCION.md (sección 12) y dame el reporte que pide el prompt.
```

Después de cada parte, revisa el resultado con `npm run dev` antes de pasar a la siguiente.
