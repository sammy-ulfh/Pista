#!/usr/bin/env python3
"""
construir_inventario.py — Construye analisis/inventario.json combinando:
  - las métricas calculadas por escanear_repo.py (analisis/datos/notas.json) y buscar_sensibles.py,
  - la curación escrita a mano (analisis/curacion/cursos_tecnologia.json y escuelas.json).

Reglas que aplica (todas explícitas aquí):
  * Minutos de una lección = palabras/200 + 0,2 por imagen (+ minutos de ejercicio en los cursos
    de muestra). Minutos de un curso = suma de sus lecciones.
  * Notas marcadas con "dividir_h2": cada entrada del índice inicial de la nota (o cada H2 si no hay
    índice) es una lección; las secciones de < 2 min sin imágenes se unen a la siguiente.
  * Orden: el de la curación; si un módulo no lo fija, cadena "Siguientes apuntes" -> sufijo (n-m) -> alfabético.
  * Precio (REGLA_PRECIO): < 60 min = $20 · 60 a 180 min = $35 · > 180 min = $50 (MXN).
    También se calcula la regla original de PROYECTO.md (< 3 h = $20 · 3-8 h = $35 · > 8 h = $50)
    para compararla en el informe.
  * Paquete por área: suma de los precios de los cursos de su ruta × 0,85, redondeado hacia abajo
    al múltiplo de 5. Solo si la ruta tiene 2 cursos o más. Siempre queda por debajo de la suma.
  * Cobertura de un área de Tecnología: sólida (>= 2 cursos con apuntes reales y >= 3 h),
    básica (>= 1 curso y >= 30 min), insuficiente (lo demás). Otras escuelas: muestra / sin_contenido.
  * Portada: primera imagen resuelta de la primera lección del curso con 3 o más imágenes y sin
    contenido sensible.
  * Lección destacada para la demo: curso sin aviso ético, nota sin riesgo ofensivo, >= 8 imágenes,
    entre 4 y 25 minutos; se eligen las 5 con más imágenes (máximo 2 por curso).

Uso:
  python3 -I analisis/scripts/construir_inventario.py fuentes/Notes analisis
Salida:
  analisis/inventario.json y analisis/datos/precios.json
"""
import importlib.util
import json
import sys as _sys
_sys.dont_write_bytecode = True  # no dejar __pycache__ dentro de analisis/scripts
import math
import os
import re
import sys
from collections import defaultdict

AQUI = os.path.dirname(os.path.abspath(__file__))


def cargar_modulo(nombre):
    spec = importlib.util.spec_from_file_location(nombre, os.path.join(AQUI, nombre + ".py"))
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


esc = cargar_modulo("escanear_repo")
slg = cargar_modulo("proponer_slugs")

WPM = 200
MIN_IMG = 0.2
REGLA_PRECIO = "Según la duración total del curso: menos de 60 min = $20 · de 60 a 180 min = $35 · más de 180 min = $50 MXN."
REGLA_PRECIO_ORIGINAL = "Regla de PROYECTO.md: menos de 3 h = $20 · de 3 a 8 h = $35 · más de 8 h = $50 MXN."
REGLA_PAQUETE = "Suma de los precios de los cursos de la ruta del área × 0,85, redondeado hacia abajo al múltiplo de 5 (solo si la ruta tiene 2 cursos o más)."
RE_SECCION_OMITIR = re.compile(r"(?i)^(índice|indice|index|siguientes?\s+(apuntes|notas)|next\s+notes?|apuntes anteriores|continuar apuntes)$")


def precio(minutos):
    return 20 if minutos < 60 else (35 if minutos <= 180 else 50)


def precio_original(minutos):
    return 20 if minutos < 180 else (35 if minutos <= 480 else 50)


def paquete(precios):
    if len(precios) < 2:
        return {"precio_mxn": None, "regla": "Sin paquete: la ruta tiene un solo curso."}
    p = int(math.floor(sum(precios) * 0.85 / 5) * 5)
    return {"precio_mxn": p, "suma_cursos_mxn": sum(precios), "regla": REGLA_PAQUETE}


def limpiar_titulo_seccion(t):
    t = re.sub(r"[*_`]", "", t).strip()
    t = re.sub(r"\((\d+)\s*/\s*(\d+)\)", r"(\1 de \2)", t)
    t = re.sub(r"\s+", " ", t)
    return t[:1].upper() + t[1:]


def ordenar_auto(rutas, notas_por_ruta):
    """Orden por cadena 'Siguientes apuntes', luego sufijo (n-m), luego alfabético."""
    conj = set(rutas)
    sig = {}
    for r in rutas:
        n = notas_por_ruta[r]
        if n["siguiente"]:
            destino = f'{n["vault"]}/{n["siguiente"]}'
            if destino in conj:
                sig[r] = destino
    apuntados = set(sig.values())

    def clave(r):
        m = re.search(r"\((\d+)-(\d+)\)", r)
        return (os.path.dirname(r), int(m.group(1)) if m else 0, r)

    inicios = sorted([r for r in rutas if r not in apuntados], key=clave)
    orden, vistos = [], set()
    for i in inicios:
        c = i
        while c and c not in vistos:
            orden.append(c)
            vistos.add(c)
            c = sig.get(c)
    orden += sorted([r for r in rutas if r not in vistos], key=clave)
    return orden


def clave_titulo(t):
    t = re.sub(r"[*_`]", "", slg.reparar_codificacion(t))
    t = re.sub(r"[:#^\[\]|?]", " ", t)
    return re.sub(r"\s+", " ", t).strip().lower()


def secciones_h2(repo, nota):
    """Divide una nota en lecciones.
    Regla: si la nota tiene un índice al inicio ([[#...]] en las primeras 25 líneas), cada entrada
    del índice marca el inicio de una lección (sin importar si el encabezado es H2 o H3).
    Si no hay índice, se corta en cada H2. Las secciones de menos de 2 minutos y sin imágenes
    se unen a la siguiente (p. ej. «¿Qué es X?» + «Instalación de X»)."""
    with open(os.path.join(repo, nota["ruta"]), encoding="utf-8") as fh:
        lineas = fh.read().split("\n")
    prosa, _ = esc.separar_codigo("\n".join(lineas))
    es_prosa = {n: l for n, l in prosa}
    indice = [clave_titulo(l["ancla"]) for l in nota["enlaces"]
              if l["forma"] == "ancla_misma_nota" and l["linea"] <= 25 and l["ancla"]]
    indice = [x for x in indice if not RE_SECCION_OMITIR.match(x)]
    cortes = []
    for e in nota["encabezados"]:
        k = clave_titulo(e["texto"])
        if RE_SECCION_OMITIR.match(k):
            cortes.append((e["linea"], None))  # Índice / Siguientes apuntes: cierra la sección anterior
        elif indice and k in indice:
            cortes.append((e["linea"], e["texto"]))
        elif not indice and e["nivel"] == 2:
            cortes.append((e["linea"], e["texto"]))
        elif e["nivel"] == 1 and not indice:
            cortes.append((e["linea"], None))
    cortes.sort()
    crudas = []
    for i, (ini, titulo) in enumerate(cortes):
        fin = cortes[i + 1][0] if i + 1 < len(cortes) else len(lineas) + 1
        if titulo is None:
            continue
        crudas.append({"titulo": limpiar_titulo_seccion(titulo), "titulo_original": titulo, "linea_ini": ini, "linea_fin": fin})

    def medir(sec):
        ini, fin = sec["linea_ini"], sec["linea_fin"]
        prosa_s = "\n".join(esc.quitar_codigo_inline(es_prosa.get(k, "")) for k in range(ini + 1, fin))
        codigo_s = "\n".join(lineas[k - 1] for k in range(ini + 1, fin)
                             if es_prosa.get(k, None) == "" and not lineas[k - 1].strip().startswith(("```", "~~~")))
        sec["palabras"] = esc.contar_palabras(prosa_s) + esc.contar_palabras(codigo_s)
        sec["n_img"] = sum(1 for e in nota["imagenes"] if ini <= e["linea"] < fin and e["es_imagen"])
        sec["min"] = sec["palabras"] / WPM + sec["n_img"] * MIN_IMG
        return sec

    crudas = [medir(x) for x in crudas]
    unidas = []
    pendiente = None
    for sec in crudas:
        if pendiente:
            # la sección corta se une a la siguiente: empieza donde empezaba la corta
            sec = medir({**sec, "linea_ini": pendiente["linea_ini"]})
            pendiente = None
        if sec["min"] < 2 and sec["n_img"] == 0 and sec is not crudas[-1]:
            pendiente = sec
            continue
        unidas.append(sec)
    if pendiente:
        if unidas:
            unidas[-1] = medir({**unidas[-1], "linea_fin": pendiente["linea_fin"]})
        else:
            unidas.append(pendiente)
    return unidas


def lecciones_de_nota(repo, nota, dividir, titulo_override, ofensivas, mapa_leccion):
    """Genera una o varias lecciones a partir de una nota."""
    v = nota["vault"]

    def imagenes_en(ini, fin):
        out = []
        for e in nota["imagenes"]:
            if ini <= e["linea"] < fin and e["es_imagen"]:
                estado = "ok" if e["estado"] in ("ok", "ok_mayusculas") else e["estado"]
                out.append({"original": e["original"], "resuelta": f"{v}/{e['resuelta']}" if e["resuelta"] else None,
                            "estado": estado, **({"candidatos": [f"{v}/{c}" for c in e["candidatos"]]} if estado == "ambigua" else {})})
        return out

    def enlaces_en(ini, fin):
        out = []
        for l in nota["enlaces"]:
            if not (ini <= l["linea"] < fin) or l["forma"] == "ancla_misma_nota":
                continue
            destino_ruta = f"{v}/{l['resuelta']}" if l["resuelta"] else None
            estado, nota_rep = ("ok" if l["estado"] != "rota" else "rota"), None
            if l["estado"] == "rota":
                # ¿Se resuelve al reparar la codificación rota del nombre de archivo?
                buscado = slg.reparar_codificacion(l["nota"]).strip() + ".md"
                for r in mapa_leccion["_rutas"]:
                    if r.startswith(v + "/") and slg.reparar_codificacion(os.path.basename(r)) == buscado:
                        destino_ruta, estado, nota_rep = r, "ok", "se resuelve al reparar la codificación del nombre del archivo"
                        break
            destino = mapa_leccion.get(destino_ruta) if destino_ruta else None
            item = {"original": l["original"], "destino": destino, "estado": estado}
            if nota_rep:
                item["nota"] = nota_rep
            if destino_ruta and not destino and estado == "ok":
                item["nota"] = "la nota destino no es una lección del inventario"
            out.append(item)
        return out

    riesgo = ofensivas.get(nota["ruta"])
    sensible = riesgo in ("alto", "medio")
    if not dividir:
        ini, fin = 0, 10 ** 9
        imgs = imagenes_en(ini, fin)
        return [{
            "titulo": titulo_override or slg.titulo_limpio(nota["archivo"]),
            "ruta_md": nota["ruta"], "palabras": nota["palabras"],
            "minutos": round(nota["palabras"] / WPM + len(imgs) * MIN_IMG, 1),
            "lenguajes_codigo": nota["lenguajes_codigo"], "imagenes": imgs, "enlaces": enlaces_en(ini, fin),
            "sensible": sensible, "riesgo_ofensivo": riesgo,
        }]
    out = []
    for s in secciones_h2(repo, nota):
        imgs = imagenes_en(s["linea_ini"], s["linea_fin"])
        langs = sorted({b["lenguaje"] for b in nota["bloques_codigo"] if s["linea_ini"] <= b["linea"] < s["linea_fin"] and b["lenguaje"]})
        out.append({
            "titulo": s["titulo"], "ruta_md": f'{nota["ruta"]}#{s["titulo_original"]}', "palabras": s["palabras"],
            "minutos": round(s["palabras"] / WPM + len(imgs) * MIN_IMG, 1), "lenguajes_codigo": langs,
            "imagenes": imgs, "enlaces": enlaces_en(s["linea_ini"], s["linea_fin"]),
            "sensible": sensible, "riesgo_ofensivo": riesgo, "seccion_de": nota["ruta"],
        })
    return out


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    repo, base = sys.argv[1], sys.argv[2]
    datos = os.path.join(base, "datos")
    notas = json.load(open(os.path.join(datos, "notas.json"), encoding="utf-8"))
    repo_info = json.load(open(os.path.join(datos, "repo.json"), encoding="utf-8"))
    ofensivas = {o["archivo"]: o["riesgo"] for o in json.load(open(os.path.join(datos, "ofensivas.json"), encoding="utf-8"))}
    cur_tec = json.load(open(os.path.join(base, "curacion", "cursos_tecnologia.json"), encoding="utf-8"))
    cur_esc = json.load(open(os.path.join(base, "curacion", "escuelas.json"), encoding="utf-8"))
    por_ruta = {n["ruta"]: n for n in notas}

    # 1) Resolver qué notas van en cada módulo (primero, para poder mapear enlaces a lecciones)
    plan = []
    for c in cur_tec["cursos"]:
        for m in c["modulos"]:
            carpeta = m["carpeta"]
            if "notas" in m:
                rutas = [os.path.normpath(os.path.join(carpeta, x)) for x in m["notas"]]
            else:
                rutas = ordenar_auto([r for r in por_ruta if r.startswith(carpeta + "/")], por_ruta)
            faltan = [r for r in rutas if r not in por_ruta]
            if faltan:
                sys.exit(f"ERROR: notas inexistentes en {c['id']}/{m['id']}: {faltan}")
            plan.append((c, m, rutas))

    usadas = defaultdict(list)
    for c, m, rutas in plan:
        for r in rutas:
            usadas[r].append(f"{c['id']}/{m['id']}")
    repetidas = {r: v for r, v in usadas.items() if len(v) > 1}

    # Mapa ruta de nota -> id de la primera lección generada (se rellena en dos pasadas)
    mapa = {"_rutas": list(por_ruta)}
    cursos_out = []
    for paso in (1, 2):
        cursos_out = []
        for c in cur_tec["cursos"]:
            modulos, orden, slugs_usados = [], 0, set()
            for (cc, m, rutas) in [p for p in plan if p[0] is c]:
                lecciones = []
                for r in rutas:
                    nota = por_ruta[r]
                    rel_mod = os.path.relpath(r, m["carpeta"])
                    t_over = m.get("titulos", {}).get(rel_mod) or m.get("titulos", {}).get(os.path.basename(r))
                    for lx in lecciones_de_nota(repo, nota, m.get("dividir_h2", False), t_over, ofensivas, mapa):
                        orden += 1
                        s = slg.slugify(lx["titulo"])
                        base_s, k = s, 2
                        while s in slugs_usados:
                            s = f"{base_s}-{k}"
                            k += 1
                        slugs_usados.add(s)
                        lid = f"{c['id']}/{s}"
                        if paso == 1 and r not in mapa:
                            mapa[r] = lid
                        lecciones.append({
                            "id": lid, "slug": s, "titulo": lx["titulo"], "ruta_md": lx["ruta_md"], "orden": orden,
                            "nivel": m.get("nivel", c["nivel"]), "idioma": m.get("idioma", c.get("idioma", "es")),
                            "palabras": lx["palabras"], "minutos": lx["minutos"],
                            "lenguajes_codigo": lx["lenguajes_codigo"], "imagenes": lx["imagenes"],
                            "enlaces": lx["enlaces"], "sensible": lx["sensible"],
                            **({"riesgo_ofensivo": lx["riesgo_ofensivo"]} if lx["riesgo_ofensivo"] else {}),
                            "destacada_para_demo": False,
                        })
                modulos.append({"id": f"{c['id']}/{m['id']}", "titulo": m["titulo"], "carpeta": m["carpeta"], "lecciones": lecciones})
            todas = [l for mo in modulos for l in mo["lecciones"]]
            minutos = round(sum(l["minutos"] for l in todas), 1)
            portada = None
            for l in todas:
                oks = [i for i in l["imagenes"] if i["estado"] == "ok" and i["resuelta"].lower().endswith((".png", ".jpg", ".jpeg"))]
                if len(l["imagenes"]) >= 3 and not l["sensible"] and oks:
                    portada = oks[0]["resuelta"]
                    break
            if portada is None:
                for l in todas:
                    oks = [i for i in l["imagenes"] if i["estado"] == "ok" and i["resuelta"].lower().endswith((".png", ".jpg", ".jpeg"))]
                    if oks and not l["sensible"]:
                        portada = oks[0]["resuelta"]
                        break
            cursos_out.append({
                "id": c["id"], "estado": "disponible",
                # carpeta común de los módulos; si el curso junta varios vaults, se listan separados por «;»
                "carpeta": os.path.commonpath([m["carpeta"] for m in c["modulos"]])
                           or "; ".join(sorted({m["carpeta"].split("/")[0] for m in c["modulos"]})),
                "titulo": c["titulo"], "subtitulo": c["subtitulo"], "escuela": "tecnologia", "areas": c["areas"],
                "nivel": c["nivel"], "justificacion_nivel": c["justificacion_nivel"], "prerrequisitos": c["prerrequisitos"],
                "idioma_apuntes": sorted({l["idioma"] for l in todas}),
                "minutos": minutos, "lecciones_total": len(todas), "imagenes_total": sum(len(l["imagenes"]) for l in todas),
                "precio_mxn": precio(minutos), "portada": portada, "aprenderas": c["aprenderas"],
                "aviso_etico": c.get("aviso_etico", False) or any(l["sensible"] for l in todas),
                "mostrar_en_presentacion": c.get("mostrar_en_presentacion", not c.get("aviso_etico", False)),
                "destacada_para_demo": False, "es_muestra": False,
                **({"es_base_de": c["es_base_de"]} if c.get("es_base_de") else {}),
                "modulos": modulos,
            })

    # 2) Lecciones destacadas para la demo
    candidatas = []
    for c in cursos_out:
        if c["aviso_etico"]:
            continue
        for m in c["modulos"]:
            for l in m["lecciones"]:
                if not l["sensible"] and len(l["imagenes"]) >= 8 and 4 <= l["minutos"] <= 25:
                    candidatas.append((len(l["imagenes"]), c, l))
    candidatas.sort(key=lambda x: (-x[0], x[2]["id"]))
    ranking = [{"id": l["id"], "imagenes": n, "minutos": l["minutos"]} for n, c, l in candidatas[:15]]
    lecc_por_id = {l["id"]: (c, l) for c in cursos_out for m in c["modulos"] for l in m["lecciones"]}
    elegidas = cur_tec.get("destacadas_para_demo", {}).get("lecciones", [])
    destacadas = []
    if elegidas:
        ids_cand = {l["id"] for _, _, l in candidatas}
        for lid in elegidas:
            if lid not in lecc_por_id:
                sys.exit(f"ERROR: lección destacada inexistente: {lid}")
            c, l = lecc_por_id[lid]
            if lid not in ids_cand:
                print(f"AVISO: {lid} no cumple los filtros de destacada (se mantiene por elección manual)")
            l["destacada_para_demo"] = True
            c["destacada_para_demo"] = True
            destacadas.append(lid)
    else:
        por_curso = defaultdict(int)
        for n, c, l in candidatas:
            if por_curso[c["id"]] >= 2:
                continue
            l["destacada_para_demo"] = True
            c["destacada_para_demo"] = True
            por_curso[c["id"]] += 1
            destacadas.append(l["id"])
            if len(destacadas) == 5:
                break
    with open(os.path.join(datos, "ranking_destacadas.json"), "w", encoding="utf-8") as fh:
        json.dump(ranking, fh, ensure_ascii=False, indent=1)

    # 3) Cursos de muestra y próximamente
    for s in cur_esc["cursos_muestra"]:
        lecciones = []
        for i, l in enumerate(s["lecciones"], 1):
            minutos = round(l["palabras_objetivo"] / WPM + len(l["imagenes_previstas"]) * MIN_IMG + l["ejercicio_min"], 1)
            lecciones.append({
                "id": f"{s['id']}/{l['slug']}", "slug": l["slug"], "titulo": l["titulo"],
                "ruta_md": f"apuntes-demo/{s['escuela']}/{s['id']}/{i:02d}-{l['slug']}.md", "orden": i,
                "nivel": s["nivel"], "idioma": "es", "palabras": 0, "minutos": minutos, "lenguajes_codigo": [],
                "imagenes": [], "enlaces": [], "sensible": False, "destacada_para_demo": False,
                "objetivo": l["objetivo"], "palabras_objetivo": l["palabras_objetivo"],
                "imagenes_previstas": l["imagenes_previstas"], "ejercicio": l["ejercicio"], "ejercicio_min": l["ejercicio_min"],
            })
        minutos = round(sum(l["minutos"] for l in lecciones), 1)
        cursos_out.append({
            "id": s["id"], "estado": "muestra", "carpeta": f"apuntes-demo/{s['escuela']}/{s['id']}",
            "titulo": s["titulo"], "subtitulo": s["subtitulo"], "escuela": s["escuela"], "areas": s["areas"],
            "nivel": s["nivel"], "prerrequisitos": s["prerrequisitos"], "idioma_apuntes": ["es"],
            "minutos": minutos, "lecciones_total": len(lecciones), "imagenes_total": sum(len(l["imagenes_previstas"]) for l in s["lecciones"]),
            "precio_mxn": precio(minutos), "portada": f"apuntes-demo/{s['escuela']}/{s['id']}/images/portada.png",
            "aprenderas": s["aprenderas"], "aviso_etico": False, "mostrar_en_presentacion": True,
            "destacada_para_demo": s["id"] == "tus-primeros-clientes", "es_muestra": True, "supuesto": True,
            "modulos": [{"id": f"{s['id']}/temario", "titulo": "Temario", "carpeta": f"apuntes-demo/{s['escuela']}/{s['id']}", "lecciones": lecciones}],
        })
    for p in cur_esc["cursos_proximamente"]:
        cursos_out.append({
            "id": p["id"], "estado": "proximamente", "carpeta": None, "titulo": p["titulo"], "subtitulo": p["subtitulo"],
            "escuela": p["escuela"], "areas": p["areas"], "nivel": p["nivel"], "prerrequisitos": [],
            "minutos": p["minutos_estimados"], "precio_mxn": precio(p["minutos_estimados"]), "precio_es_referencia": True,
            "portada": None, "aprenderas": [], "aviso_etico": False, "mostrar_en_presentacion": True,
            "destacada_para_demo": False, "es_muestra": False, "supuesto": True, "modulos": [],
        })

    por_id = {c["id"]: c for c in cursos_out}

    # 4) Escuelas y áreas
    escuelas = []
    for e in cur_esc["escuelas"]:
        areas = []
        for a in e["areas"]:
            ruta = a["ruta"]
            otros = [c["id"] for c in cursos_out if a["id"] in c["areas"] and c["id"] not in ruta]
            cursos = ruta + otros
            for cid in cursos:
                if cid not in por_id:
                    sys.exit(f"ERROR: el área {a['id']} usa un curso inexistente: {cid}")
            reales = [por_id[c] for c in cursos if por_id[c]["estado"] == "disponible"]
            minutos_area = round(sum(por_id[c]["minutos"] for c in cursos if por_id[c]["estado"] != "proximamente"), 1)
            lecciones_area = sum(len(l) for c in cursos for l in [[x for m in por_id[c]["modulos"] for x in m["lecciones"]]])
            if e["id"] == "tecnologia":
                if len(reales) >= 2 and minutos_area >= 180:
                    cob = "solida"
                elif len(reales) >= 1 and minutos_area >= 30:
                    cob = "basica"
                else:
                    cob = "insuficiente"
            else:
                cob = "muestra" if any(por_id[c]["estado"] == "muestra" for c in cursos) else "sin_contenido"
            if a.get("cobertura_maxima") == "basica" and cob == "solida":
                cob = "basica"  # ajuste manual justificado en escuelas.json
            areas.append({
                "id": a["id"], "nombre": a["nombre"], "descripcion": a["descripcion"], "cobertura": cob,
                "estado": a["estado"], "cursos": cursos, "ruta": ruta,
                "lecciones": lecciones_area, "minutos": minutos_area, "horas": round(minutos_area / 60, 1),
                "paquete": paquete([por_id[c]["precio_mxn"] for c in ruta]),
                **({"nota": a["nota"]} if a.get("nota") else {}),
            })
        escuelas.append({"id": e["id"], "nombre": e["nombre"], "descripcion": e["descripcion"], "estado": e["estado"],
                         "fuente_apuntes": e["fuente_apuntes"], "supuesto": e["id"] != "tecnologia", "areas": areas})

    inventario = {
        "repo": {"url": repo_info["url"], "commit": repo_info["commit"], "notas": repo_info["notas"],
                 "imagenes": repo_info["imagenes"], "mb": repo_info["mb_sin_git"], "palabras": repo_info["palabras"]},
        "moneda": "MXN",
        "regla_precio": REGLA_PRECIO,
        "regla_paquete": REGLA_PAQUETE,
        "regla_minutos": "palabras / 200 + 0,2 min por imagen (+ minutos de ejercicio en cursos de muestra)",
        "escuelas": escuelas,
        "cursos": cursos_out,
        "recursos_extra": cur_tec["recursos_extra"],
        "descartados": cur_tec["descartados"],
        "lecciones_destacadas_para_demo": destacadas,
    }
    with open(os.path.join(base, "inventario.json"), "w", encoding="utf-8") as fh:
        json.dump(inventario, fh, ensure_ascii=False, indent=1)

    # Comparativa de precios para el informe
    tabla = [{"id": c["id"], "estado": c["estado"], "minutos": c["minutos"], "horas": round(c["minutos"] / 60, 2),
              "precio_regla_propuesta": precio(c["minutos"]), "precio_regla_original": precio_original(c["minutos"])}
             for c in cursos_out]
    with open(os.path.join(datos, "precios.json"), "w", encoding="utf-8") as fh:
        json.dump(tabla, fh, ensure_ascii=False, indent=1)

    # Cobertura de notas reales
    en_cursos = set(usadas)
    extra = {os.path.normpath(r["ruta_md"]) for r in cur_tec["recursos_extra"] + cur_tec["descartados"]}
    sin_asignar = [r for r in por_ruta if r not in en_cursos and r not in extra
                   and not any(r.startswith(x.rstrip("/") + "/") for x in extra) and por_ruta[r]["vault"]]
    print(f"cursos={len(cursos_out)} (disponibles={sum(1 for c in cursos_out if c['estado']=='disponible')}, "
          f"muestra={sum(1 for c in cursos_out if c['estado']=='muestra')}, proximamente={sum(1 for c in cursos_out if c['estado']=='proximamente')})")
    print(f"lecciones reales={sum(c['lecciones_total'] for c in cursos_out if c['estado']=='disponible')} "
          f"notas asignadas={len(en_cursos)} repetidas={len(repetidas)} sin_asignar={sin_asignar}")
    print("destacadas:", destacadas)
    for c in cursos_out:
        if c["estado"] != "proximamente":
            print(f"  {c['id']:32s} {c['estado']:10s} lecc={c['lecciones_total']:3d} min={c['minutos']:7.1f} "
                  f"${c['precio_mxn']} (orig ${precio_original(c['minutos'])}) portada={c['portada']}")


if __name__ == "__main__":
    main()
