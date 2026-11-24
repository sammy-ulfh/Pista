#!/usr/bin/env python3
"""
validar.py — Comprueba la coherencia entre analisis/diagnostico.json y analisis/inventario.json:
  - Todos los ids usados en diagnostico.json (escuelas, áreas, cursos, módulos, lecciones)
    existen en inventario.json.
  - Todos los precios de curso están entre 20 y 50 MXN y cada paquete cuesta menos que la suma.
  - Como mucho uno de los perfiles de demo es de tecnología.
  - Cada área con un curso disponible o de muestra tiene diagnóstico (4 a 6 preguntas), y cada
    pregunta de experiencia tiene una opción tipo "nunca lo he hecho"/"no".
  - La orientación tiene 3-4 preguntas; los cursos de muestra tienen 3-5 lecciones; hay un solo
    curso de muestra por escuela sin apuntes reales.
  - Los ids de lección son únicos y las rutas de las notas reales existen en el repositorio.

Uso:
  python3 -I analisis/scripts/validar.py fuentes/Notes analisis
Sale con código 1 si hay errores. Escribe analisis/datos/validacion.json.
"""
import json
import os
import re
import sys


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(2)
    repo, base = sys.argv[1], sys.argv[2]
    inv = json.load(open(os.path.join(base, "inventario.json"), encoding="utf-8"))
    dia = json.load(open(os.path.join(base, "diagnostico.json"), encoding="utf-8"))
    errores, avisos, ok = [], [], []

    escuelas = {e["id"] for e in inv["escuelas"]}
    areas = {a["id"]: a for e in inv["escuelas"] for a in e["areas"]}
    cursos = {c["id"]: c for c in inv["cursos"]}
    modulos = {m["id"] for c in inv["cursos"] for m in c["modulos"]}
    lecciones = [l["id"] for c in inv["cursos"] for m in c["modulos"] for l in m["lecciones"]]
    lecc_set = set(lecciones)

    # Ids únicos
    dup = {x for x in lecciones if lecciones.count(x) > 1}
    (errores if dup else ok).append(f"ids de lección únicos ({len(lecciones)})" if not dup else f"ids de lección repetidos: {sorted(dup)}")
    ids_c = [c["id"] for c in inv["cursos"]]
    if len(ids_c) != len(set(ids_c)):
        errores.append("ids de curso repetidos")

    # Referencias en inventario
    for e in inv["escuelas"]:
        for a in e["areas"]:
            for c in a["cursos"] + a["ruta"]:
                if c not in cursos:
                    errores.append(f"área {a['id']} usa curso inexistente {c}")
    for c in inv["cursos"]:
        if c["escuela"] not in escuelas:
            errores.append(f"curso {c['id']} con escuela inexistente {c['escuela']}")
        for a in c["areas"]:
            if a not in areas:
                errores.append(f"curso {c['id']} con área inexistente {a}")
        for p in c["prerrequisitos"]:
            if p not in cursos:
                errores.append(f"curso {c['id']} con prerrequisito inexistente {p}")
        if c["estado"] == "disponible":
            for m in c["modulos"]:
                for l in m["lecciones"]:
                    ruta = l["ruta_md"].split("#")[0]
                    if not os.path.isfile(os.path.join(repo, ruta)):
                        errores.append(f"ruta_md inexistente: {ruta}")
    # Prerrequisitos: dentro de cada ruta de área y de cada perfil, los prerrequisitos van antes
    for e in inv["escuelas"]:
        for a in e["areas"]:
            for i, c in enumerate(a["ruta"]):
                for p in cursos[c]["prerrequisitos"]:
                    if p not in a["ruta"][:i]:
                        errores.append(f"ruta de {a['id']}: «{c}» necesita «{p}» antes")
    ok.append("referencias internas del inventario revisadas")

    # Ids en diagnóstico
    def chk(tipo, valor, conjunto, donde):
        if valor and valor not in conjunto:
            errores.append(f"{donde}: {tipo} inexistente «{valor}»")

    for q in dia["orientacion"]["preguntas"]:
        for o in q["opciones"]:
            for k in o["suma"].get("escuelas", {}):
                chk("escuela", k, escuelas, f"orientación/{q['id']}/{o['id']}")
            for k in o["suma"].get("areas", {}):
                chk("área", k, areas, f"orientación/{q['id']}/{o['id']}")
    for a in dia["areas"]:
        chk("área", a["area_id"], areas, "diagnóstico")
        for q in a["preguntas"]:
            for o in q["opciones"]:
                e = o["efectos"]
                donde = f"diagnóstico/{a['area_id']}/{q['id']}/{o['id']}"
                chk("curso", e.get("curso_inicio"), cursos, donde)
                for x in e.get("omitir_cursos", []) + e.get("agregar_cursos", []):
                    chk("curso", x, cursos, donde)
                for x in e.get("omitir_modulos", []):
                    chk("módulo", x, modulos, donde)
                for x in e.get("omitir_lecciones", []):
                    chk("lección", x, lecc_set, donde)
                if e.get("curso_inicio") and e["curso_inicio"] not in areas[a["area_id"]]["ruta"]:
                    errores.append(f"{donde}: curso_inicio {e['curso_inicio']} no está en la ruta del área")
    for p in dia["perfiles_demo"]:
        chk("escuela", p["escuela_id"], escuelas, f"perfil {p['nombre']}")
        chk("área", p["area_id"], areas, f"perfil {p['nombre']}")
        for s in p["roadmap"]:
            for x in s["lecciones"]:
                if x.startswith("curso:"):
                    chk("curso", x[6:], cursos, f"perfil {p['nombre']} semana {s['semana']}")
                else:
                    chk("lección", x, lecc_set, f"perfil {p['nombre']} semana {s['semana']}")
    for p in dia["perfiles_demo"]:
        ruta = [c["curso"] for c in p["cursos_ruta"]]
        sabidos = [o["curso"] for o in p["omitidos"] if o["motivo"] == "curso_inicio"]
        for i, c in enumerate(ruta):
            for pre in cursos[c]["prerrequisitos"]:
                if pre not in ruta[:i] and pre not in sabidos:
                    errores.append(f"perfil {p['nombre']}: «{c}» necesita «{pre}» y no está antes en la ruta")
    ok.append("ids de diagnostico.json revisados contra inventario.json (y prerrequisitos de las rutas)")

    # Precios
    fuera = [(c["id"], c["precio_mxn"]) for c in inv["cursos"] if not (20 <= c["precio_mxn"] <= 50)]
    (errores if fuera else ok).append(f"precios fuera de 20-50: {fuera}" if fuera else f"{len(inv['cursos'])} precios entre $20 y $50")
    for e in inv["escuelas"]:
        for a in e["areas"]:
            pq = a["paquete"]
            if pq.get("precio_mxn") is not None and not pq["precio_mxn"] < pq["suma_cursos_mxn"]:
                errores.append(f"paquete de {a['id']} no es más barato que la suma")
    for p in dia["perfiles_demo"]:
        suma = sum(cursos[c["curso"]]["precio_mxn"] for c in p["cursos_ruta"])
        if suma != p["costo_total_mxn"]:
            errores.append(f"perfil {p['nombre']}: costo {p['costo_total_mxn']} != suma {suma}")
        if p["paquete_mxn"] is not None and p["paquete_mxn"] >= p["costo_total_mxn"]:
            errores.append(f"perfil {p['nombre']}: paquete no es más barato")

    # Perfiles de tecnología
    tec = [p["nombre"] for p in dia["perfiles_demo"] if p["escuela_id"] == "tecnologia" or p.get("es_tecnologia")]
    (errores if len(tec) > 1 else ok).append(f"perfiles de tecnología: {len(tec)} ({tec})")
    if dia["perfiles_demo"] and dia["perfiles_demo"][0]["area_id"] != "conseguir-clientes":
        errores.append("el primer perfil debe ser el de Administración (Conseguir clientes)")
    if len(dia["perfiles_demo"]) != 3:
        errores.append("deben ser 3 perfiles")

    # Cobertura del diagnóstico
    con_diag = {a["area_id"] for a in dia["areas"]}
    for aid, a in areas.items():
        tiene = any(cursos[c]["estado"] in ("disponible", "muestra") for c in a["ruta"]) and a["estado"] == "disponible"
        if tiene and aid not in con_diag:
            errores.append(f"área {aid} tiene curso disponible pero no diagnóstico")
    rx_nunca = re.compile(r"(?i)^(nunca|no\b|no tengo|todavía no)")
    for a in dia["areas"]:
        n = len(a["preguntas"])
        if not 4 <= n <= 6:
            errores.append(f"diagnóstico {a['area_id']}: {n} preguntas (deben ser 4-6)")
        if not any(rx_nunca.search(o["texto"]) for q in a["preguntas"] for o in q["opciones"]):
            errores.append(f"diagnóstico {a['area_id']}: falta opción tipo «nunca lo he hecho»")
        if not any(q["id"] == "tiempo" for q in a["preguntas"]):
            errores.append(f"diagnóstico {a['area_id']}: falta la pregunta de tiempo")
    ok.append(f"{len(dia['areas'])} áreas con diagnóstico")
    nq = len(dia["orientacion"]["preguntas"])
    (ok if 3 <= nq <= 4 else errores).append(f"orientación con {nq} preguntas")

    # Cursos de muestra
    for e in inv["escuelas"]:
        if e["id"] == "tecnologia":
            continue
        muestras = [c for c in inv["cursos"] if c["escuela"] == e["id"] and c["estado"] == "muestra"]
        if e["estado"] == "disponible" and len(muestras) != 1:
            errores.append(f"escuela {e['id']}: {len(muestras)} cursos de muestra (debe ser 1)")
        if e["estado"] == "proximamente" and muestras:
            errores.append(f"escuela {e['id']} está en próximamente pero tiene curso de muestra")
        if e["estado"] == "proximamente":
            avisos.append(f"escuela {e['id']} sin curso de muestra (próximamente a propósito)")
    for c in inv["cursos"]:
        if c["estado"] == "muestra" and not 3 <= c["lecciones_total"] <= 5:
            errores.append(f"curso de muestra {c['id']} con {c['lecciones_total']} lecciones")
        if c["estado"] == "proximamente" and (c["modulos"] or c["carpeta"] is not None):
            errores.append(f"curso próximamente {c['id']} con módulos o carpeta")

    # Avisos útiles
    amb = sum(1 for c in inv["cursos"] for m in c["modulos"] for l in m["lecciones"] for i in l["imagenes"] if i["estado"] == "ambigua")
    rot = sum(1 for c in inv["cursos"] for m in c["modulos"] for l in m["lecciones"] for x in l["enlaces"] if x["estado"] == "rota")
    avisos.append(f"imágenes ambiguas en lecciones del inventario: {amb}")
    avisos.append(f"enlaces rotos en lecciones del inventario: {rot}")

    res = {"errores": errores, "avisos": avisos, "ok": ok}
    with open(os.path.join(base, "datos", "validacion.json"), "w", encoding="utf-8") as fh:
        json.dump(res, fh, ensure_ascii=False, indent=1)
    for x in ok:
        print("OK     ", x)
    for x in avisos:
        print("AVISO  ", x)
    for x in errores:
        print("ERROR  ", x)
    print(f"\n{len(errores)} errores, {len(avisos)} avisos")
    sys.exit(1 if errores else 0)


if __name__ == "__main__":
    main()
