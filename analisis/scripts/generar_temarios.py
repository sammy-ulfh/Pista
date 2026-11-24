#!/usr/bin/env python3
"""
generar_temarios.py — Escribe analisis/temarios_muestra.md con el temario de cada curso de muestra
(SUPUESTO), listo para redactar sus lecciones después con la misma sintaxis de Obsidian que usan
los apuntes reales (ver sección 5 del informe). Toma los datos de analisis/curacion/escuelas.json y
los minutos/precios ya calculados en analisis/inventario.json.

Uso:
  python3 -I analisis/scripts/generar_temarios.py analisis
"""
import json
import os
import sys

SINTAXIS = """## Sintaxis que deben usar los cursos de muestra

Es el mismo subconjunto que aparece en los apuntes reales, para que el conversor trate igual a ambos.

| Elemento | Cómo se escribe | Por qué |
|---|---|---|
| Archivo de lección | `NN-slug.md` (ej. `01-cliente-ideal.md`), sin espacios ni acentos | El prefijo fija el orden; el nombre ya es el slug |
| Título | `# Título visible` en la primera línea | Las notas reales no tienen frontmatter; el título sale del H1 |
| Secciones | `## Sección` y `### Subsección` | Igual que en los apuntes |
| Texto | párrafos, `**negritas**`, listas `-` y `1.` | Igual que en los apuntes |
| Tablas | tablas Markdown con `\\|---\\|` | Se usan en los apuntes reales |
| Imágenes | `![[images/NN-nombre.png]]` (ruta relativa a la carpeta del curso, minúsculas, `.png`) | Ruta explícita: evita las imágenes ambiguas del repositorio real |
| Enlace a otra lección | `[[02-donde-encontrarlo\\|Dónde encontrarlo]]` | Variante `[[nota\\|alias]]`, ya soportada |
| Ejercicio | sección `## Ejercicio` al final | El lector la muestra como caja de ejercicio (pantalla 09); no se usan callouts porque los apuntes reales no los tienen |
| Siguiente lección | sección `## Siguientes apuntes` con `[[NN-slug]]` | Misma convención que {n_sig} notas reales |
| Resaltado | `==texto==` (con moderación) | Lo usan los apuntes reales; se muestra como `<mark>` |
| **No usar** | HTML, callouts `> [!note]`, tags `#tag`, LaTeX, Mermaid, frontmatter | No aparecen (o casi no aparecen) en los apuntes reales |

Plantilla de una lección:

```markdown
# ¿Quién es tu cliente ideal?

Tu cliente ideal no es «todo el mundo». Es una persona concreta…

## Empieza por un problema

Piensa en las últimas tres personas que te pidieron ayuda…

![[images/01-persona-problema-solucion.png]]

## Ejercicio

Completa la frase «Ayudo a ___ que tienen problemas con ___».

## Siguientes apuntes

[[02-donde-encontrarlo|Dónde encontrarlo]]
```
"""


def main():
    base = sys.argv[1] if len(sys.argv) > 1 else "analisis"
    cur = json.load(open(os.path.join(base, "curacion", "escuelas.json"), encoding="utf-8"))
    inv = json.load(open(os.path.join(base, "inventario.json"), encoding="utf-8"))
    cursos = {c["id"]: c for c in inv["cursos"]}
    areas = {a["id"]: a for e in inv["escuelas"] for a in e["areas"]}
    esc = {e["id"]: e for e in inv["escuelas"]}
    out = ["# Temarios de los cursos de muestra",
           "",
           "> **SUPUESTO.** Todo este archivo es una propuesta: no hay apuntes reales de estas escuelas. "
           "Se escribe un curso de muestra por escuela (Negocios, Comunicación y Habilidades personales). "
           "La Escuela de Diseño y Creatividad queda en «próximamente» sin curso de muestra.",
           "",
           "Minutos estimados con la misma fórmula que los apuntes reales: palabras/200 + 0,2 min por imagen, "
           "más los minutos del ejercicio. Los precios salen de la regla de la sección 9 del informe.",
           "",
           SINTAXIS.replace("{n_sig}", str(json.load(open(os.path.join(base, "datos", "resumen_sintaxis.json"), encoding="utf-8"))["conteo"]["notas_con_siguientes_apuntes"]))]
    for s in cur["cursos_muestra"]:
        c = cursos[s["id"]]
        carpeta = c["carpeta"]
        out += [f"## {c['titulo']}", "",
                f"- **Escuela / área:** {esc[c['escuela']]['nombre']} / {', '.join(areas[a]['nombre'] for a in c['areas'])}",
                f"- **Nivel:** {c['nivel'].replace('basico', 'básico')} · **Lecciones:** {c['lecciones_total']} · "
                f"**Duración estimada:** {round(c['minutos'])} min · **Precio:** ${c['precio_mxn']} MXN",
                f"- **Carpeta:** `{carpeta}/` (lecciones `NN-slug.md`, imágenes en `{carpeta}/images/`)",
                f"- **Subtítulo:** {c['subtitulo']}",
                "- **Lo que aprenderás:**"] + [f"  - {x}" for x in c["aprenderas"]] + [""]
        filas = ["| # | Lección | Objetivo | Palabras | Imágenes / esquemas | Ejercicio | Min |", "|---|---|---|---|---|---|---|"]
        for l in c["modulos"][0]["lecciones"]:
            filas.append(f"| {l['orden']} | **{l['titulo']}**<br>`{os.path.basename(l['ruta_md'])}` | {l['objetivo']} | ~{l['palabras_objetivo']} | "
                         + "<br>".join(f"{i}. {x}" for i, x in enumerate(l["imagenes_previstas"], 1))
                         + f" | {l['ejercicio']} ({l['ejercicio_min']} min) | {l['minutos']} |")
        out += filas + [""]
    out += ["## Cursos que aparecen en las rutas pero quedan en «próximamente»", "",
            "No se escriben ahora; tienen ficha y precio de referencia. Si se quiere que la ruta del perfil 1 "
            "(pantalla 06) se pueda comprar completa, habría que escribir también «Hablar para vender» y «Precios sin miedo» "
            "(ver Preguntas abiertas).", "",
            "| Curso | Escuela | Minutos estimados | Precio de referencia |", "|---|---|---|---|"]
    for c in inv["cursos"]:
        if c["estado"] == "proximamente":
            out.append(f"| {c['titulo']} | {esc[c['escuela']]['nombre']} | {c['minutos']} | ${c['precio_mxn']} |")
    with open(os.path.join(base, "temarios_muestra.md"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(out) + "\n")
    print("temarios_muestra.md escrito")


if __name__ == "__main__":
    main()
