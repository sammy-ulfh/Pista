#!/usr/bin/env python3
"""
proponer_slugs.py — Propone un slug y un título limpio para cada carpeta y nota, marca los
nombres problemáticos y detecta choques (dos rutas que producirían el mismo slug).

Regla de slug (también se usa en construir_inventario.py, importándola desde aquí):
  1. Reparar la codificación rota: U+00A0 (espacio duro) entre dos letras -> "á"
     (en CP437 el byte 0xA0 es "á"; así se rompió "Comandos básicos" -> "Comandos b\\xa0sicos").
  2. Normalizar a NFKD y quitar acentos/diacríticos (á->a, ñ->n).
  3. Minúsculas. "&" -> " y ". "C&C" -> "c-y-c".
  4. Cualquier carácter que no sea [a-z0-9] -> "-". Colapsar guiones repetidos y quitarlos de los extremos.
  5. Sufijos de parte "(1-2)", " 1-2", "(1/4)" -> "-1-de-2" (se conserva el orden).
  6. Se quita la extensión .md.

Título limpio: misma reparación de codificación, "_" -> espacio, "(1-2)"/" 1-2" -> "(1 de 2)".

Uso:
  python3 -I analisis/scripts/proponer_slugs.py fuentes/Notes analisis/datos
Salida:
  <datos>/slugs.json
"""
import json
import os
import re
import sys
import unicodedata
from collections import defaultdict

RE_PARTE = re.compile(r"\s*\(?\b(\d+)\s*[-/]\s*(\d+)\)?\s*$")


def reparar_codificacion(s):
    s = unicodedata.normalize("NFC", s)
    return re.sub(r"(?<=[A-Za-z]) (?=[A-Za-z])", "á", s)


def slugify(nombre):
    s = reparar_codificacion(nombre)
    s = re.sub(r"\.md$", "", s, flags=re.I)
    m = RE_PARTE.search(s)
    sufijo = ""
    if m and int(m.group(1)) <= int(m.group(2)) <= 9:
        sufijo = f"-{m.group(1)}-de-{m.group(2)}"
        s = s[:m.start()]
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace("&", " y ")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return (s + sufijo).strip("-")


def titulo_limpio(nombre):
    s = reparar_codificacion(nombre)
    s = re.sub(r"\.md$", "", s, flags=re.I).replace("_", " ")
    m = RE_PARTE.search(s)
    if m and int(m.group(1)) <= int(m.group(2)) <= 9:
        s = s[:m.start()].rstrip() + f" ({m.group(1)} de {m.group(2)})"
    s = re.sub(r"\s+", " ", s).strip()
    return s[:1].upper() + s[1:]


def problemas(nombre):
    p = []
    if " " in nombre or "�" in nombre:
        p.append("codificacion_rota")
    if " " in nombre:
        p.append("espacios")
    if any(unicodedata.combining(c) for c in unicodedata.normalize("NFKD", nombre)):
        p.append("acentos")
    if re.search(r"[&()\[\],'’–—#%!?¿¡:;+]", nombre):
        p.append("simbolos")
    if "–" in nombre or "—" in nombre:
        p.append("guion_largo")
    if re.search(r"\.(PNG|JPG|JPEG|GIF|SVG)$", nombre):
        p.append("extension_mayusculas")
    return p


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    repo, datos = sys.argv[1], sys.argv[2]
    filas = []
    for d, dirs, fs in os.walk(repo):
        dirs[:] = sorted(x for x in dirs if x not in (".git", ".obsidian", "images", "imagenes", "files"))
        rel_d = os.path.relpath(d, repo)
        if rel_d != ".":
            nombre = os.path.basename(d)
            filas.append({"tipo": "carpeta", "ruta": rel_d, "nombre": nombre, "slug": slugify(nombre),
                          "titulo": titulo_limpio(nombre), "problemas": problemas(nombre)})
        for f in sorted(fs):
            if f.endswith(".md"):
                rel = os.path.normpath(os.path.join(rel_d, f))
                filas.append({"tipo": "nota", "ruta": rel, "nombre": f, "slug": slugify(f),
                              "titulo": titulo_limpio(f), "problemas": problemas(f)})
    # Choques: ruta completa en slugs, y slug de nota dentro del mismo vault
    por_ruta = defaultdict(list)
    por_vault_nota = defaultdict(list)
    for x in filas:
        partes = x["ruta"].split("/")
        x["ruta_slug"] = "/".join(slugify(p) for p in partes)
        por_ruta[x["ruta_slug"]].append(x["ruta"])
        if x["tipo"] == "nota":
            por_vault_nota[(partes[0], x["slug"])].append(x["ruta"])
    choques_ruta = {k: v for k, v in por_ruta.items() if len(v) > 1}
    choques_nota = {f"{k[0]}::{k[1]}": v for k, v in por_vault_nota.items() if len(v) > 1}
    res = {"regla": __doc__.split("Regla de slug")[1].split("Uso:")[0].strip(),
           "filas": filas, "choques_ruta_completa": choques_ruta, "choques_slug_nota_en_vault": choques_nota}
    with open(os.path.join(datos, "slugs.json"), "w", encoding="utf-8") as fh:
        json.dump(res, fh, ensure_ascii=False, indent=1)
    n_prob = sum(1 for x in filas if x["problemas"])
    print(f"nombres={len(filas)} con_problemas={n_prob} choques_ruta={len(choques_ruta)} "
          f"choques_nota_en_vault={len(choques_nota)}")
    for k, v in choques_nota.items():
        print("  choque:", k, v)


if __name__ == "__main__":
    main()
