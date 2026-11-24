# analisis/

Etapa 1 de Pista: análisis del repositorio de apuntes. Aquí no hay código del sitio.

| Archivo o carpeta | Qué es |
|---|---|
| `ANALISIS_REPO.md` | El informe (generado; no editar a mano: se edita `curacion/plantilla_informe.md`) |
| `inventario.json` | Escuelas, áreas, cursos, módulos y lecciones con sus métricas y precios |
| `diagnostico.json` | Orientación, diagnósticos por área, reglas de ruta y los 3 perfiles resueltos |
| `temarios_muestra.md` | Temarios de los cursos de muestra (SUPUESTO) y sintaxis que deben usar |
| `problemas.csv` | Problemas detectados: tipo, archivo, línea, detalle, sugerencia |
| `curacion/` | Decisiones escritas a mano: agrupación en cursos, taxonomía, preguntas y plantilla del informe |
| `datos/` | Datos intermedios que producen los scripts (se pueden borrar y regenerar) |
| `scripts/` | Scripts del análisis; cada uno explica al inicio qué hace y cómo se ejecuta |

Para regenerar todo (requiere `fuentes/Notes`, ver `PROMPT_ANALISIS.md`):

```bash
bash analisis/scripts/ejecutar_todo.sh fuentes/Notes
```
