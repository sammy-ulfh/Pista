#!/usr/bin/env python3
"""
generar_problemas.py — Junta en analisis/problemas.csv todos los problemas detectados por los
demás scripts (columnas: tipo, archivo, linea, detalle, sugerencia). Nunca escribe valores
sensibles: solo archivo, línea y tipo.

Requiere haber ejecutado: escanear_repo.py, buscar_sensibles.py, analizar_imagenes.py,
analizar_sintaxis.py, proponer_slugs.py y construir_inventario.py.
Uso:
  python3 -I analisis/scripts/generar_problemas.py fuentes/Notes analisis
"""
import csv
import json
import os
import re
import sys
from collections import Counter, defaultdict


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    repo, base = sys.argv[1], sys.argv[2]
    d = os.path.join(base, "datos")
    cargar = lambda n: json.load(open(os.path.join(d, n), encoding="utf-8"))
    notas, repo_info, vaults = cargar("notas.json"), cargar("repo.json"), cargar("vaults.json")
    sens, ofe, img, sint, slugs = cargar("sensibles.json"), cargar("ofensivas.json"), cargar("resumen_imagenes.json"), cargar("resumen_sintaxis.json"), cargar("slugs.json")
    inv = json.load(open(os.path.join(base, "inventario.json"), encoding="utf-8"))
    filas = []
    add = lambda t, a, l, det, sug: filas.append({"tipo": t, "archivo": a, "linea": l if l is not None else "", "detalle": det, "sugerencia": sug})

    # README raíz: enlaces a carpetas que no existen
    with open(os.path.join(repo, "README.md"), encoding="utf-8") as fh:
        for n, linea in enumerate(fh, 1):
            for m in re.finditer(r"\]\(([^)]+)\)", linea):
                destino = m.group(1)
                if destino.startswith("http"):
                    continue
                if not os.path.exists(os.path.join(repo, destino)):
                    add("readme_enlace_roto", "README.md", n, f"El README enlaza a «{destino}», que no existe", "No usar el README raíz como índice; el catálogo sale de inventario.json")

    for v in vaults:
        if v["vault"] == "images":
            add("archivo_suelto", "images/IMG_001.png", None, "Imagen suelta en la raíz usada solo por el README", "Ignorar en la sincronización")
            continue
        if not v["tiene_obsidian"]:
            add("vault_sin_obsidian", v["vault"] + "/", None, "Carpeta de primer nivel sin .obsidian/ (no es un vault de Obsidian, pero sí un curso)", "Tratar igual que un vault: la raíz para resolver rutas es la carpeta de primer nivel")
        for o in v["obsidian_anidados"]:
            add("obsidian_anidado", o + "/.obsidian", None, "Hay un .obsidian dentro de una subcarpeta: Obsidian pudo abrir esa carpeta como vault aparte", "Resolver siempre contra la carpeta de primer nivel; ignorar los .obsidian anidados")

    for n in notas:
        for e in n["imagenes"]:
            if e["estado"] == "ambigua":
                ident = "sí" if e.get("candidatos_identicos") else "no"
                add("imagen_ambigua", n["ruta"], e["linea"], f"{e['original']} tiene {len(e['candidatos'])} candidatos (archivos idénticos: {ident}); se propone {e['resuelta']}",
                    "Resolver por cercanía a la nota (misma carpeta o subcarpeta images/ de la nota) y fijar la ruta resuelta en el inventario")
            elif e["estado"] == "rota":
                add("imagen_rota", n["ruta"], e["linea"], f"{e['original']} no existe", "Revisar el nombre o quitar la imagen")
            if e["extension"].lower() == ".pdf" or (not e["es_imagen"] and e["extension"]):
                add("incrustacion_archivo", n["ruta"], e["linea"], f"{e['original']} incrusta un {e['extension']} (no es imagen)", "Mostrarlo como enlace de descarga, no como imagen")
            if not e["extension"]:
                add("incrustacion_nota", n["ruta"], e["linea"], f"{e['original']} incrusta otra nota", "El conversor debe insertar el contenido de la nota o convertirlo en enlace")
        for l in n["enlaces"]:
            if l["estado"] == "rota":
                add("enlace_roto", n["ruta"], l["linea"], f"{l['original']} no encuentra la nota", "Se resuelve al reparar la codificación del nombre del archivo (á -> U+00A0)" if " " not in l["nota"] else "Revisar")
            elif l["estado"] == "ancla_rota":
                add("ancla_rota", n["ruta"], l["linea"], f"{l['original']} no coincide con ningún encabezado de la nota", "Ignorar el ancla o corregir el índice; el conversor no debe fallar")
        if n["frontmatter"]:
            add("frontmatter_unico", n["ruta"], 1, "Es la única nota con frontmatter", "El conversor debe ignorar o respetar el frontmatter sin romperse")
        for b in n["bloques_codigo"]:
            if b["sin_cerrar"]:
                add("bloque_sin_cerrar", n["ruta"], b["linea"], "Bloque de código sin cerrar", "Cerrar el bloque en la copia o tolerarlo en el conversor")
        if n["palabras"] < 20:
            add("nota_casi_vacia", n["ruta"], None, f"Solo {n['palabras']} palabras", "Descartar o usar como recurso extra")

    sin_leng = Counter(n["vault"] for n in notas for b in n["bloques_codigo"] if not b["lenguaje"])
    for v, c in sin_leng.items():
        add("bloque_sin_lenguaje", f"{v}/", None, f"{c} bloques de código sin lenguaje", "Mostrar como texto plano; no adivinar el lenguaje")
    for l in sint["bloques_codigo"]["lenguajes"]:
        if l["mayusculas"] or not l["estandar"]:
            add("lenguaje_codigo_no_estandar", l["ejemplo"]["ruta"], l["ejemplo"]["linea"],
                f"```{l['lenguaje']} aparece {l['bloques']} veces", f"Normalizar a «{l['normalizar_a']}» antes de resaltar")

    mayus = Counter(i["vault"] for i in cargar("imagenes.json") if i["extension"] != i["extension"].lower())
    for v, c in mayus.items():
        add("extension_mayusculas", f"{v}/", None, f"{c} imágenes con extensión en mayúsculas (.PNG)", "Conservar el nombre exacto; en Linux .png y .PNG son archivos distintos")
    for r in img["sin_usar"]["lista"]:
        add("imagen_sin_usar", r, None, "Ninguna nota la incrusta", "No copiarla al sitio")
    for t in img["top20"]:
        if t["kb"] > 1024:
            add("imagen_pesada", t["ruta"], None, f"{t['kb']} KB", "Optimizar (WebP/AVIF) o reducir a 1600 px de ancho")

    for f in slugs["filas"]:
        if "codificacion_rota" in f["problemas"]:
            add("codificacion_rota", f["ruta"], None, "El nombre tiene U+00A0 (espacio duro) donde iba «á»", f"Slug «{f['slug']}», título «{f['titulo']}»")
        elif "guion_largo" in f["problemas"] or "&" in f["nombre"]:
            add("nombre_con_simbolos", f["ruta"], None, f"Símbolos en el nombre: {', '.join(f['problemas'])}", f"Slug «{f['slug']}»")
    for k, v in slugs["choques_slug_nota_en_vault"].items():
        add("choque_slug", " | ".join(v), None, f"Dos notas del mismo vault producen el slug «{k.split('::')[1]}»", "Usar el slug dentro del curso (curso/slug) o el título traducido; en el inventario no chocan")

    for s in sens:
        if s["severidad"] in ("alta", "media"):
            add(f"dato_sensible_{s['severidad']}", s["archivo"], s["linea"], f"{s['tipo']}: {s['motivo']} (valor omitido)", "Reemplazar por un dato de ejemplo en la copia que se publique")
    for o in ofe:
        if o["riesgo"] in ("alto", "medio"):
            cats = ", ".join(c["categoria"] for c in o["categorias"])
            add(f"contenido_ofensivo_{o['riesgo']}", o["archivo"], None, f"Técnicas: {cats}", "Añadir aviso de uso ético y legal; no usar en la presentación")

    for c in inv["cursos"]:
        if "en" in c.get("idioma_apuntes", []):
            add("apuntes_en_ingles", c["carpeta"] or c["id"], None, f"El curso «{c['titulo']}» tiene lecciones en inglés", "Marcar «Apuntes en inglés» en la ficha o traducir antes de la demo")

    with open(os.path.join(base, "problemas.csv"), "w", encoding="utf-8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=["tipo", "archivo", "linea", "detalle", "sugerencia"])
        w.writeheader()
        w.writerows(filas)
    c = Counter(f["tipo"] for f in filas)
    print(f"{len(filas)} filas")
    for k, v in sorted(c.items(), key=lambda x: -x[1]):
        print(f"  {v:4d} {k}")


if __name__ == "__main__":
    main()
