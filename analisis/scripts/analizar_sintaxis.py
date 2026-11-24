#!/usr/bin/env python3
"""
analizar_sintaxis.py — Cuenta la sintaxis de Obsidian/Markdown que usan las notas, con
2-3 ejemplos reales (ruta y línea) por variante: incrustaciones ![[...]], enlaces [[...]],
callouts, tags, tablas, HTML, LaTeX, Mermaid, checklists, resaltados, comentarios %% %%,
lenguajes de bloques de código (y los no estándar o en mayúsculas), imágenes/enlaces Markdown.

Requiere haber ejecutado antes escanear_repo.py.
Uso:
  python3 -I analisis/scripts/analizar_sintaxis.py analisis/datos
Salida:
  <datos>/resumen_sintaxis.json
"""
import json
import os
import sys
from collections import Counter, defaultdict

# Lenguajes reconocidos por resaltadores comunes (Shiki/Prism). Lo demás se considera no estándar.
ESTANDAR = {"bash", "shell", "sh", "zsh", "python", "html", "css", "javascript", "js", "json", "yaml",
            "yml", "sql", "php", "xml", "dockerfile", "powershell", "lua", "c", "cpp", "java", "ini",
            "toml", "diff", "text", "txt", "markdown", "md", "jinja", "ruby", "go", "nginx", "apache",
            "console", "plaintext", "http", "makefile", "perl", "awk", "sed"}
# Normalización propuesta: lenguaje original (en minúsculas) -> lenguaje para el resaltador
NORMALIZAR = {"python3": "python", "pip": "shell", "pip3": "shell", "msf": "shell", "smbclient": "shell",
              "shebang": "shell", "git": "shell", "docker": "shell", "web": "text", "url": "text",
              "post": "http", "j2": "jinja", "txt": "text", "yml": "yaml"}


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)
    datos = sys.argv[1]
    notas = json.load(open(os.path.join(datos, "notas.json"), encoding="utf-8"))
    conteo = Counter()
    ejemplos = defaultdict(list)

    def add(clave, nota, linea, original, n=1):
        conteo[clave] += n
        if len(ejemplos[clave]) < 3 and original is not None:
            ejemplos[clave].append({"ruta": nota, "linea": linea, "ejemplo": original[:120]})

    lenguajes = Counter()
    lenguajes_ej = {}
    sin_lenguaje = 0
    for n in notas:
        r = n["ruta"]
        for e in n["imagenes"]:
            tipo = "imagen" if e["es_imagen"] else ("nota_incrustada" if not e["extension"] else "archivo_" + e["extension"].lower().strip("."))
            clave = f"embed:{tipo}:{e['forma']}"
            if e["extension"] and e["extension"] != e["extension"].lower():
                clave += ":EXT_MAYUSCULAS"
            if e["tamano"]:
                clave += ":con_tamano"
            add(clave, r, e["linea"], e["original"])
            add(f"embed_estado:{e['estado']}", r, e["linea"], e["original"])
        for l in n["enlaces"]:
            add(f"enlace:{l['forma']}", r, l["linea"], l["original"])
            add(f"enlace_estado:{l['estado']}", r, l["linea"], l["original"])
        for x in n["md_imagenes"]:
            add("markdown:imagen", r, x["linea"], x["original"])
        for x in n["md_enlaces"]:
            add("markdown:enlace", r, x["linea"], x["original"])
        for x in n["html"]:
            add(f"html:<{x['etiqueta']}>", r, x["linea"], x["original"])
        for x in n["tags"]:
            add("tag", r, x["linea"], "#" + x["tag"])
        for x in n["callouts"]:
            add(f"callout:{x['tipo']}", r, x["linea"], x["tipo"])
        if n["tablas"]:
            add("tabla", r, None, None, n["tablas"])
        if n["checklists"]:
            add("checklist", r, None, None, n["checklists"])
        if n["latex"]:
            add("latex", r, None, None, n["latex"])
        if n["resaltados"]:
            add("resaltado_==", r, None, None, n["resaltados"])
        if n["comentarios_obsidian"]:
            add("comentario_%%", r, None, None, n["comentarios_obsidian"])
        if n["notas_pie"]:
            add("nota_al_pie", r, None, None, n["notas_pie"])
        if n["frontmatter"]:
            add("frontmatter", r, 1, "---")
        for b in n["bloques_codigo"]:
            if b["lenguaje"].lower() == "mermaid":
                add("mermaid", r, b["linea"], "```mermaid")
            if b["sin_cerrar"]:
                add("bloque_codigo_sin_cerrar", r, b["linea"], "```" + b["lenguaje"])
            if not b["lenguaje"]:
                sin_lenguaje += 1
            else:
                lenguajes[b["lenguaje"]] += 1
                lenguajes_ej.setdefault(b["lenguaje"], {"ruta": r, "linea": b["linea"]})
        # Índice al inicio de la nota ([[#...]] en las primeras líneas)
        if any(l["forma"] == "ancla_misma_nota" and l["linea"] <= 15 for l in n["enlaces"]):
            conteo["notas_con_indice_al_inicio"] += 1
        if n["siguiente"]:
            conteo["notas_con_siguientes_apuntes"] += 1

    leng = []
    for lang, c in lenguajes.most_common():
        low = lang.lower()
        leng.append({"lenguaje": lang, "bloques": c, "mayusculas": lang != low,
                     "estandar": low in ESTANDAR, "normalizar_a": NORMALIZAR.get(low, low),
                     "ejemplo": lenguajes_ej[lang]})
    res = {"conteo": dict(sorted(conteo.items())), "ejemplos": ejemplos,
           "bloques_codigo": {"total": sum(lenguajes.values()) + sin_lenguaje, "sin_lenguaje": sin_lenguaje,
                              "lenguajes": leng}}
    with open(os.path.join(datos, "resumen_sintaxis.json"), "w", encoding="utf-8") as fh:
        json.dump(res, fh, ensure_ascii=False, indent=1)
    for k, v in sorted(conteo.items()):
        print(f"{v:6d}  {k}")
    print(f"bloques de código: {res['bloques_codigo']['total']} (sin lenguaje {sin_lenguaje})")


if __name__ == "__main__":
    main()
