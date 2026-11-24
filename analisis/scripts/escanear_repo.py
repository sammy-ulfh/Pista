#!/usr/bin/env python3
"""
escanear_repo.py — Escanea el repositorio de apuntes de Obsidian (solo lectura) y genera
los datos crudos que usan los demás scripts del análisis.

Qué hace:
  - Detecta vaults (carpetas de primer nivel; marca si tienen .obsidian/ y si hay .obsidian anidados).
  - Por cada nota .md: palabras, minutos de lectura (200 palabras/min + 0,2 min por imagen),
    imágenes incrustadas ![[...]], enlaces [[...]], lenguajes de bloques de código, encabezados,
    elementos de sintaxis (callouts, tablas, HTML, tags, checklists, LaTeX, Mermaid…),
    y la nota "siguiente" declarada en la sección "Siguientes apuntes"/"Next Notes".
  - Resuelve cada imagen/enlace con las reglas de Obsidian:
      1) relativo a la carpeta de la nota, 2) relativo a la raíz del vault,
      3) búsqueda por nombre dentro del vault (exacta; si falla, sin distinguir mayúsculas).
    Estado: ok | ok_mayusculas (solo coincide ignorando mayúsculas) | ambigua (varios candidatos) | rota.
  - Inventario de imágenes: tamaño, formato, usadas / sin usar.

Uso:
  python3 -I analisis/scripts/escanear_repo.py fuentes/Notes analisis/datos
Salida:
  <salida>/notas.json, <salida>/imagenes.json, <salida>/vaults.json, <salida>/repo.json
"""
import json
import os
import re
import subprocess
import sys
import unicodedata
from collections import defaultdict

IMG_EXT = {".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".bmp"}
ADJUNTO_EXT = {".pdf"}  # se incrustan con ![[...]] pero no son imágenes
WPM = 200
MIN_POR_IMAGEN = 0.2

RE_FENCE = re.compile(r"^(\s*)(`{3,}|~{3,})(.*)$")
RE_EMBED = re.compile(r"!\[\[([^\]\n]+?)\]\]")
RE_LINK = re.compile(r"(?<!!)\[\[([^\]\n]+?)\]\]")
RE_MD_IMG = re.compile(r"!\[[^\]\n]*\]\(([^)\n]+)\)")
RE_MD_LINK = re.compile(r"(?<!!)\[[^\]\n]+\]\(([^)\n]+)\)")
RE_HTML = re.compile(r"</?([a-zA-Z][a-zA-Z0-9]*)\b[^>\n]*>")
RE_HTML_TAGS_REALES = {"img", "p", "div", "br", "span", "a", "b", "i", "u", "center", "font",
                       "table", "tr", "td", "th", "h1", "h2", "h3", "details", "summary",
                       "sup", "sub", "mark", "kbd", "iframe", "video", "style", "code", "pre"}
RE_TAG = re.compile(r"(?:^|\s)#([A-Za-zÀ-ÿ][\w/\-À-ÿ]*)")
RE_CALLOUT = re.compile(r"^\s*>\s*\[!([A-Za-z\-]+)\]")
RE_TABLE_SEP = re.compile(r"^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$")
RE_CHECK = re.compile(r"^\s*[-*]\s+\[[ xX]\]\s")
RE_LATEX_BLOCK = re.compile(r"\$\$[^$]+\$\$", re.S)
RE_LATEX_INLINE = re.compile(r"(?<![\\$\w])\$[^\s$][^$\n]{0,80}?[^\s\\$]\$(?![\w$])")
RE_HEADING = re.compile(r"^(#{1,6})\s+(.+?)\s*#*\s*$")
RE_HIGHLIGHT = re.compile(r"==[^=\n]+==")
RE_COMMENT = re.compile(r"%%")
RE_FOOTNOTE = re.compile(r"\[\^[^\]]+\]")
RE_NEXT = re.compile(r"^#+\s*(siguientes?\s+(apuntes?|notas?)|next\s+notes?|continuar\s+apuntes)\s*$", re.I)


def norm(s):
    return unicodedata.normalize("NFC", s)


def git_commit(repo):
    try:
        return subprocess.check_output(["git", "-C", repo, "rev-parse", "HEAD"], text=True).strip()
    except Exception:
        return ""


def listar_archivos(repo):
    """Devuelve (notas, imagenes, otros) como rutas relativas al repo."""
    notas, imagenes, otros = [], [], []
    for d, dirs, fs in os.walk(repo):
        dirs[:] = [x for x in dirs if x != ".git"]
        for f in fs:
            rel = os.path.relpath(os.path.join(d, f), repo)
            if "/.obsidian/" in "/" + rel or rel.startswith(".obsidian/"):
                otros.append(rel)
                continue
            ext = os.path.splitext(f)[1].lower()
            if ext == ".md":
                notas.append(rel)
            elif ext in IMG_EXT:
                imagenes.append(rel)
            else:
                otros.append(rel)
    return sorted(notas), sorted(imagenes), sorted(otros)


def vault_de(rel):
    partes = rel.split("/")
    return partes[0] if len(partes) > 1 else None


def separar_codigo(texto):
    """Divide el texto en (lineas_prosa, bloques_codigo[(lenguaje, linea_inicio, lineas)])."""
    prosa, bloques = [], []
    en_bloque, valla, lang, ini, buf = False, "", "", 0, []
    for i, linea in enumerate(texto.split("\n"), 1):
        m = RE_FENCE.match(linea)
        if not en_bloque and m:
            en_bloque, valla, lang, ini, buf = True, m.group(2)[0] * 3, m.group(3).strip(), i, []
            prosa.append((i, ""))
            continue
        if en_bloque and m and m.group(2).startswith(valla) and not m.group(3).strip():
            bloques.append((lang, ini, buf))
            en_bloque = False
            prosa.append((i, ""))
            continue
        if en_bloque:
            buf.append(linea)
            prosa.append((i, ""))
        else:
            prosa.append((i, linea))
    if en_bloque:
        bloques.append((lang, ini, buf + ["<<SIN CERRAR>>"]))
    return prosa, bloques


def quitar_codigo_inline(linea):
    return re.sub(r"`[^`\n]*`", " ", linea)


def contar_palabras(texto):
    t = RE_EMBED.sub(" ", texto)
    t = RE_LINK.sub(lambda m: " " + m.group(1).split("|")[-1].split("#")[-1] + " ", t)
    t = re.sub(r"<[^>\n]+>", " ", t)
    t = re.sub(r"https?://\S+", " ", t)
    return len(re.findall(r"[0-9A-Za-zÀ-ÿ_]+", t))


class IndiceVault:
    """Índice de archivos de un vault para resolver como Obsidian."""

    def __init__(self, repo, vault, archivos):
        self.repo, self.vault = repo, vault
        self.por_nombre = defaultdict(list)
        self.por_nombre_ci = defaultdict(list)
        self.rutas = set()
        self.rutas_ci = defaultdict(list)
        for rel in archivos:
            if vault_de(rel) != vault:
                continue
            dentro = rel[len(vault) + 1:]
            self.rutas.add(norm(dentro))
            self.rutas_ci[norm(dentro).lower()].append(dentro)
            base = norm(os.path.basename(dentro))
            self.por_nombre[base].append(dentro)
            self.por_nombre_ci[base.lower()].append(dentro)

    def _hash(self, dentro):
        import hashlib
        with open(os.path.join(self.repo, self.vault, dentro), "rb") as fh:
            return hashlib.sha1(fh.read()).hexdigest()

    def resolver(self, objetivo, carpeta_nota, es_nota=False):
        """objetivo: texto dentro de [[ ]] sin |alias ni #ancla. carpeta_nota relativa al vault.
        Devuelve dict(estado, resuelta, candidatos, regla)."""
        obj = norm(objetivo.strip())
        variantes = [obj]
        if es_nota and not obj.lower().endswith(".md"):
            variantes = [obj + ".md", obj]
        # 1) carpeta de la nota  2) raíz del vault
        for regla, base in (("carpeta_nota", carpeta_nota), ("raiz_vault", "")):
            for v in variantes:
                cand = os.path.normpath(os.path.join(base, v)) if base else os.path.normpath(v)
                if cand in self.rutas:
                    return {"estado": "ok", "resuelta": cand, "candidatos": [cand], "regla": regla}
        for regla, base in (("carpeta_nota", carpeta_nota), ("raiz_vault", "")):
            for v in variantes:
                cand = os.path.normpath(os.path.join(base, v)) if base else os.path.normpath(v)
                if cand.lower() in self.rutas_ci:
                    r = self.rutas_ci[cand.lower()]
                    return {"estado": "ok_mayusculas", "resuelta": r[0], "candidatos": r, "regla": regla}
        # 3) búsqueda por nombre dentro del vault
        for v in variantes:
            nombre = os.path.basename(v)
            cands = self.por_nombre.get(nombre, [])
            estado_ok = "ok"
            if not cands:
                cands = self.por_nombre_ci.get(nombre.lower(), [])
                estado_ok = "ok_mayusculas"
            if cands:
                if len(cands) == 1:
                    return {"estado": estado_ok, "resuelta": cands[0], "candidatos": cands, "regla": "nombre"}
                # Varios candidatos: Obsidian elige el más cercano; nosotros proponemos el que
                # comparte más prefijo de carpeta con la nota, pero se marca ambigua.
                def cercania(c):
                    a, b = os.path.dirname(c).split("/"), carpeta_nota.split("/") if carpeta_nota else []
                    n = 0
                    for x, y in zip(a, b):
                        if x != y:
                            break
                        n += 1
                    return (-n, len(c))
                elegida = sorted(cands, key=cercania)[0]
                hashes = {self._hash(c) for c in cands}
                return {"estado": "ambigua", "resuelta": elegida, "candidatos": sorted(cands), "regla": "nombre",
                        "candidatos_identicos": len(hashes) == 1}
        return {"estado": "rota", "resuelta": None, "candidatos": [], "regla": None}


def analizar_nota(repo, rel, indices):
    vault = vault_de(rel)
    dentro = rel[len(vault) + 1:] if vault else rel
    carpeta = os.path.dirname(dentro)
    with open(os.path.join(repo, rel), encoding="utf-8", errors="replace") as fh:
        texto = fh.read()
    lineas = texto.split("\n")
    prosa, bloques = separar_codigo(texto)
    texto_prosa = "\n".join(quitar_codigo_inline(l) for _, l in prosa)
    texto_codigo = "\n".join("\n".join(b[2]) for b in bloques)
    palabras_prosa = contar_palabras(texto_prosa)
    palabras_codigo = contar_palabras(texto_codigo)
    idx = indices.get(vault)

    imagenes, enlaces, md_imgs, md_links, html, tags, callouts = [], [], [], [], [], [], []
    tablas = checks = latex = highlights = comentarios = footnotes = 0
    encabezados = []
    siguiente = None
    en_next = False
    for n, l in prosa:
        if not l:
            continue
        lc = quitar_codigo_inline(l)
        mh = RE_HEADING.match(lc)
        if mh:
            encabezados.append({"nivel": len(mh.group(1)), "texto": mh.group(2), "linea": n})
            en_next = bool(RE_NEXT.match(re.sub(r"[*_]", "", lc).strip()))
        for m in RE_EMBED.finditer(lc):
            crudo = m.group(1)
            objetivo, _, tam = crudo.partition("|")
            objetivo_sin_ancla = objetivo.split("#")[0]
            ext = os.path.splitext(objetivo_sin_ancla)[1]
            es_img = ext.lower() in IMG_EXT
            res = idx.resolver(objetivo_sin_ancla, carpeta, es_nota=not es_img) if idx else \
                {"estado": "rota", "resuelta": None, "candidatos": [], "regla": None}
            imagenes.append({
                "original": m.group(0), "linea": n, "objetivo": objetivo_sin_ancla,
                "tamano": tam or None, "extension": ext, "es_imagen": es_img,
                "forma": ("con_ruta" if "/" in objetivo_sin_ancla else "solo_nombre"),
                **res,
            })
        for m in RE_LINK.finditer(lc):
            crudo = m.group(1)
            objetivo, _, alias = crudo.partition("|")
            nota, _, ancla = objetivo.partition("#")
            if nota.strip() == "":
                forma = "ancla_misma_nota"
                res = {"estado": "ok", "resuelta": dentro, "candidatos": [dentro], "regla": "misma_nota"}
            else:
                forma = "nota" + ("#encabezado" if ancla else "") + ("|alias" if alias else "")
                if "/" in nota:
                    forma = "ruta/" + forma
                res = idx.resolver(nota, carpeta, es_nota=True) if idx else \
                    {"estado": "rota", "resuelta": None, "candidatos": [], "regla": None}
            enlaces.append({"original": m.group(0), "linea": n, "nota": nota, "ancla": ancla or None,
                            "alias": alias or None, "forma": forma, **res})
            if en_next and nota.strip():
                siguiente = res.get("resuelta")
        for m in RE_MD_IMG.finditer(lc):
            md_imgs.append({"original": m.group(0), "linea": n})
        for m in RE_MD_LINK.finditer(lc):
            md_links.append({"original": m.group(0)[:120], "linea": n})
        for m in RE_HTML.finditer(lc):
            if m.group(1).lower() in RE_HTML_TAGS_REALES:
                html.append({"etiqueta": m.group(1).lower(), "linea": n, "original": m.group(0)[:100]})
        if not mh:
            for m in RE_TAG.finditer(lc):
                tags.append({"tag": m.group(1), "linea": n})
        mc = RE_CALLOUT.match(lc)
        if mc:
            callouts.append({"tipo": mc.group(1), "linea": n})
        if RE_TABLE_SEP.match(lc):
            tablas += 1
        if RE_CHECK.match(lc):
            checks += 1
        if RE_HIGHLIGHT.search(lc):
            highlights += 1
        if RE_COMMENT.search(lc):
            comentarios += 1
        if RE_FOOTNOTE.search(lc):
            footnotes += 1
    # Comprobar anclas [[#Encabezado]] contra los encabezados de la propia nota
    def clave_ancla(t):
        # Obsidian quita el formato y los caracteres no permitidos en enlaces (: # ^ [ ] |)
        t = re.sub(r"[*_`]", "", norm(t))
        t = re.sub(r"[:#^\[\]|?]", " ", t)
        return re.sub(r"\s+", " ", t).strip().lower()
    titulos = {clave_ancla(e["texto"]) for e in encabezados}
    for l in enlaces:
        if l["forma"] == "ancla_misma_nota":
            if clave_ancla(l["ancla"] or "") not in titulos:
                l["estado"] = "ancla_rota"
    latex = len(RE_LATEX_BLOCK.findall(texto_prosa)) + len(RE_LATEX_INLINE.findall(texto_prosa))

    n_img = sum(1 for i in imagenes if i["es_imagen"])
    minutos = round(palabras_prosa / WPM + palabras_codigo / WPM + n_img * MIN_POR_IMAGEN, 1)
    return {
        "ruta": rel, "vault": vault, "dentro_vault": dentro, "carpeta": carpeta,
        "archivo": os.path.basename(rel),
        "frontmatter": texto.startswith("---\n"),
        "lineas": len(lineas),
        "palabras": palabras_prosa + palabras_codigo,
        "palabras_prosa": palabras_prosa, "palabras_codigo": palabras_codigo,
        "minutos": minutos,
        "n_imagenes": n_img,
        "imagenes": imagenes,
        "enlaces": enlaces,
        "siguiente": siguiente,
        "bloques_codigo": [{"lenguaje": b[0], "linea": b[1], "lineas": len(b[2]),
                            "sin_cerrar": bool(b[2] and b[2][-1] == "<<SIN CERRAR>>")} for b in bloques],
        "lenguajes_codigo": sorted({b[0] for b in bloques if b[0]}),
        "encabezados": encabezados,
        "md_imagenes": md_imgs, "md_enlaces": md_links, "html": html, "tags": tags,
        "callouts": callouts, "tablas": tablas, "checklists": checks, "latex": latex,
        "resaltados": highlights, "comentarios_obsidian": comentarios, "notas_pie": footnotes,
    }


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    repo, salida = sys.argv[1], sys.argv[2]
    os.makedirs(salida, exist_ok=True)
    notas, imagenes, otros = listar_archivos(repo)
    adjuntos = [o for o in otros if os.path.splitext(o)[1].lower() in ADJUNTO_EXT]
    todos = notas + imagenes + adjuntos

    vaults = sorted({vault_de(r) for r in todos + otros if vault_de(r)})
    indices = {v: IndiceVault(repo, v, todos) for v in vaults}
    datos_notas = [analizar_nota(repo, r, indices) for r in notas]

    # Uso de imágenes
    usadas = defaultdict(list)
    for n in datos_notas:
        for i in n["imagenes"]:
            if i["resuelta"] and i["es_imagen"]:
                usadas[f'{n["vault"]}/{i["resuelta"]}'].append(n["ruta"])
    datos_img = []
    for r in imagenes:
        p = os.path.join(repo, r)
        datos_img.append({
            "ruta": r, "vault": vault_de(r), "bytes": os.path.getsize(p),
            "extension": os.path.splitext(r)[1], "usada_por": usadas.get(norm(r), []),
        })

    # Vaults
    obsidian_dirs = []
    for d, dirs, _ in os.walk(repo):
        dirs[:] = [x for x in dirs if x != ".git"]
        if ".obsidian" in dirs:
            obsidian_dirs.append(os.path.relpath(d, repo))
    datos_vaults = []
    for v in vaults:
        ns = [n for n in datos_notas if n["vault"] == v]
        ims = [i for i in datos_img if i["vault"] == v]
        tam = 0
        for d, dirs, fs in os.walk(os.path.join(repo, v)):
            for f in fs:
                tam += os.path.getsize(os.path.join(d, f))
        datos_vaults.append({
            "vault": v,
            "tiene_obsidian": os.path.isdir(os.path.join(repo, v, ".obsidian")),
            "obsidian_anidados": [o for o in obsidian_dirs if o.startswith(v + "/")],
            "notas": len(ns), "imagenes": len(ims),
            "imagenes_bytes": sum(i["bytes"] for i in ims),
            "palabras": sum(n["palabras"] for n in ns),
            "minutos": round(sum(n["minutos"] for n in ns), 1),
            "mb": round(tam / 1024 / 1024, 2),
            "carpetas_primer_nivel": sorted({n["dentro_vault"].split("/")[0] for n in ns if "/" in n["dentro_vault"]}),
        })
    sueltos = [r for r in todos + otros if vault_de(r) is None or vault_de(r) == "images"]
    tam_total = 0
    for d, dirs, fs in os.walk(repo):
        dirs[:] = [x for x in dirs if x != ".git"]
        for f in fs:
            tam_total += os.path.getsize(os.path.join(d, f))
    repo_info = {
        "url": "https://github.com/sammy-ulfh/Notes", "commit": git_commit(repo),
        "notas": len(notas), "imagenes": len(imagenes), "adjuntos_pdf": adjuntos, "otros_archivos": len(otros),
        "mb_sin_git": round(tam_total / 1024 / 1024, 2),
        "mb_imagenes": round(sum(i["bytes"] for i in datos_img) / 1024 / 1024, 2),
        "palabras": sum(n["palabras"] for n in datos_notas),
        "obsidian_dirs": obsidian_dirs, "archivos_sueltos": sueltos,
        "otros": otros,
    }
    for nombre, obj in (("notas", datos_notas), ("imagenes", datos_img),
                        ("vaults", datos_vaults), ("repo", repo_info)):
        with open(os.path.join(salida, nombre + ".json"), "w", encoding="utf-8") as fh:
            json.dump(obj, fh, ensure_ascii=False, indent=1)
    print(f"notas={len(notas)} imagenes={len(imagenes)} otros={len(otros)} "
          f"mb={repo_info['mb_sin_git']} commit={repo_info['commit'][:7]}")


if __name__ == "__main__":
    main()
