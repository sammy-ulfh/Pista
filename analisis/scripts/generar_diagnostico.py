#!/usr/bin/env python3
"""
generar_diagnostico.py — Genera analisis/diagnostico.json a partir de las preguntas y reglas
escritas a mano (analisis/curacion/diagnostico_base.json) y de analisis/inventario.json.

Aplica exactamente las reglas que usará la demo, para dejar resueltos los perfiles:
  1. Orientación: suma de puntos por escuela y área; se recomienda la escuela con más puntos y
     sus 1-2 áreas con más puntos. Área en "próximamente" -> aviso + alternativa disponible más cercana.
  2. Diagnóstico del área: se combinan los efectos de todas las respuestas:
       - curso_inicio: si varias respuestas lo fijan, gana el que está más adelante en la ruta;
         los cursos anteriores se marcan "omitidos".
       - omitir_lecciones / omitir_modulos / omitir_cursos / agregar_cursos: se unen.
       - horas_semana: la última respuesta distinta de 0.
  3. Ritmo: lecciones por semana = max(1, floor(horas_semana * 60 / minutos promedio por lección
     del curso)). Cada curso empieza en una semana nueva. Un curso "próximamente" (sin lecciones)
     ocupa ceil(minutos / (horas_semana * 60)) semanas.
  4. Costo = suma de precios de los cursos de la ruta (incluye precios de referencia de los
     próximamente). Paquete = suma × 0,85 redondeado hacia abajo al múltiplo de 5.

Uso:
  python3 -I analisis/scripts/generar_diagnostico.py analisis
Salida:
  analisis/diagnostico.json
"""
import json
import math
import os
import sys

CLAVES = {"curso_inicio": "", "omitir_lecciones": [], "omitir_modulos": [], "horas_semana": 0}
NOTA_FINAL = "No hay respuestas malas: esto solo sirve para saber dónde empezar."


def completar_efectos(e):
    out = {k: (list(v) if isinstance(v, list) else v) for k, v in CLAVES.items()}
    out.update(e)
    return out


def recomendar(orient, respuestas, inv):
    escuelas = inv["escuelas"]
    p_esc = {e["id"]: 0 for e in escuelas}
    p_area = {a["id"]: 0 for e in escuelas for a in e["areas"]}
    for q in orient["preguntas"]:
        op = next(o for o in q["opciones"] if o["id"] == respuestas[q["id"]])
        for k, v in op["suma"].get("escuelas", {}).items():
            p_esc[k] += v
        for k, v in op["suma"].get("areas", {}).items():
            p_area[k] += v
    orden_esc = [e["id"] for e in escuelas]
    esc_id = max(orden_esc, key=lambda k: (p_esc[k], -orden_esc.index(k)))
    esc = next(e for e in escuelas if e["id"] == esc_id)
    areas = sorted(esc["areas"], key=lambda a: (-p_area[a["id"]], esc["areas"].index(a)))
    recomendadas = [areas[0]["id"]] + ([areas[1]["id"]] if len(areas) > 1 and p_area[areas[1]["id"]] > 0 else [])
    principal = areas[0]
    aviso, area_final = None, principal["id"]
    if principal["estado"] == "proximamente":
        disp_misma = [a for a in areas if a["estado"] == "disponible" and p_area[a["id"]] > 0]
        todas_disp = sorted([a for e in escuelas for a in e["areas"] if a["estado"] == "disponible" and p_area[a["id"]] > 0],
                            key=lambda a: -p_area[a["id"]])
        if disp_misma:
            area_final = disp_misma[0]["id"]
        elif todas_disp:
            area_final = todas_disp[0]["id"]
        else:
            area_final = next((a["id"] for a in esc["areas"] if a["estado"] == "disponible"), None)
        aviso = f"«{principal['nombre']}» llega pronto. Mientras tanto te recomendamos un área disponible."
    otras = sorted([(a, e) for e in escuelas if e["id"] != esc_id for a in e["areas"]
                    if a["estado"] == "disponible" and p_area[a["id"]] > 0], key=lambda x: -p_area[x[0]["id"]])
    tambien = {"area_id": otras[0][0]["id"], "escuela_id": otras[0][1]["id"]} if otras else None
    return {"puntos_escuelas": p_esc, "puntos_areas": {k: v for k, v in p_area.items() if v},
            "escuela_id": esc_id, "areas_recomendadas": recomendadas, "area_id": area_final,
            "aviso_proximamente": aviso, "tambien_te_puede_servir": tambien}


def generar_ruta(area, preguntas, respuestas, cursos):
    efectos = completar_efectos({})
    efectos["omitir_cursos"], efectos["agregar_cursos"] = [], []
    inicios = []
    for q in preguntas:
        op = next(o for o in q["opciones"] if o["id"] == respuestas[q["id"]])
        e = op["efectos"]
        if e.get("curso_inicio"):
            inicios.append(e["curso_inicio"])
        for k in ("omitir_lecciones", "omitir_modulos", "omitir_cursos", "agregar_cursos"):
            efectos[k] += [x for x in e.get(k, []) if x not in efectos[k]]
        if e.get("horas_semana"):
            efectos["horas_semana"] = e["horas_semana"]
    ruta = list(area["ruta"]) + [c for c in efectos["agregar_cursos"] if c not in area["ruta"]]
    omitidos = []
    if inicios:
        idx = max(ruta.index(c) for c in inicios if c in ruta)
        omitidos = [{"curso": c, "motivo": "curso_inicio"} for c in ruta[:idx]]
        ruta = ruta[idx:]
    for c in efectos["omitir_cursos"]:
        if c in ruta:
            ruta.remove(c)
            omitidos.append({"curso": c, "motivo": "objetivo"})
    horas = efectos["horas_semana"] or 1
    cap = horas * 60
    semanas, sem = [], 0
    detalle = []
    for cid in ruta:
        c = cursos[cid]
        if c["estado"] == "proximamente" or not c["modulos"]:
            n = max(1, math.ceil(c["minutos"] / cap))
            for i in range(n):
                sem += 1
                semanas.append({"semana": sem, "lecciones": [f"curso:{cid}"], "titulo": c["titulo"] + (f" ({i + 1} de {n})" if n > 1 else ""),
                                "minutos": round(c["minutos"] / n, 1), "proximamente": True})
            detalle.append({"curso": cid, "lecciones": 0, "omitidas": 0, "minutos": c["minutos"], "precio_mxn": c["precio_mxn"], "estado": c["estado"]})
            continue
        lecc = [l for m in c["modulos"] if m["id"] not in efectos["omitir_modulos"] for l in m["lecciones"]
                if l["id"] not in efectos["omitir_lecciones"]]
        total = sum(len(m["lecciones"]) for m in c["modulos"])
        prom = sum(l["minutos"] for l in lecc) / len(lecc)
        lpw = max(1, math.floor(cap / prom))
        for i in range(0, len(lecc), lpw):
            sem += 1
            bloque = lecc[i:i + lpw]
            semanas.append({"semana": sem, "lecciones": [l["id"] for l in bloque], "titulo": bloque[0]["titulo"],
                            "minutos": round(sum(l["minutos"] for l in bloque), 1)})
        detalle.append({"curso": cid, "lecciones": len(lecc), "omitidas": total - len(lecc),
                        "minutos": round(sum(l["minutos"] for l in lecc), 1), "lecciones_por_semana": lpw,
                        "precio_mxn": c["precio_mxn"], "estado": c["estado"]})
    costo = sum(cursos[c]["precio_mxn"] for c in ruta)
    paquete = int(math.floor(costo * 0.85 / 5) * 5) if len(ruta) >= 2 else None
    return {"horas_semana": horas, "cursos": detalle, "omitidos": omitidos,
            "omitir_lecciones": efectos["omitir_lecciones"], "omitir_modulos": efectos["omitir_modulos"],
            "roadmap": semanas, "semanas": sem, "minutos_total": round(sum(d["minutos"] for d in detalle), 1),
            "costo_total_mxn": costo, "paquete_mxn": paquete}


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)
    base = sys.argv[1]
    b = json.load(open(os.path.join(base, "curacion", "diagnostico_base.json"), encoding="utf-8"))
    inv = json.load(open(os.path.join(base, "inventario.json"), encoding="utf-8"))
    cursos = {c["id"]: c for c in inv["cursos"]}
    areas_inv = {a["id"]: a for e in inv["escuelas"] for a in e["areas"]}

    tiempo = {**b["pregunta_tiempo"], "opciones": [{**o, "efectos": completar_efectos(o["efectos"])} for o in b["pregunta_tiempo"]["opciones"]]}
    tiempo.pop("_nota", None)
    areas_out = []
    for a in b["areas"]:
        preguntas = []
        for q in a["preguntas"]:
            if q == "tiempo":
                preguntas.append(json.loads(json.dumps(tiempo)))
            else:
                preguntas.append({**q, "opciones": [{**o, "efectos": completar_efectos(o["efectos"])} for o in q["opciones"]]})
        areas_out.append({"area_id": a["area_id"], "preguntas": preguntas, "nota_al_final": NOTA_FINAL})
    preg_por_area = {a["area_id"]: a["preguntas"] for a in areas_out}

    perfiles = []
    for p in b["perfiles_demo"]:
        rec = recomendar(b["orientacion"], p["respuestas_orientacion"], inv)
        area = areas_inv[rec["area_id"]]
        ruta = generar_ruta(area, preg_por_area[rec["area_id"]], p["respuestas_diagnostico"], cursos)
        perfiles.append({
            "nombre": p["nombre"], "carrera": p["carrera"], "objetivo": p["objetivo"], "es_tecnologia": p["es_tecnologia"],
            "respuestas_orientacion": p["respuestas_orientacion"], "escuela_id": rec["escuela_id"], "area_id": rec["area_id"],
            "areas_recomendadas": rec["areas_recomendadas"], "tambien_te_puede_servir": rec["tambien_te_puede_servir"],
            "aviso_proximamente": rec["aviso_proximamente"], "puntos": {"escuelas": rec["puntos_escuelas"], "areas": rec["puntos_areas"]},
            "respuestas_diagnostico": p["respuestas_diagnostico"],
            "horas_semana": ruta["horas_semana"], "semanas": ruta["semanas"], "cursos_ruta": ruta["cursos"],
            "omitidos": ruta["omitidos"], "omitir_lecciones": ruta["omitir_lecciones"], "omitir_modulos": ruta["omitir_modulos"],
            "roadmap": ruta["roadmap"], "minutos_total": ruta["minutos_total"],
            "costo_total_mxn": ruta["costo_total_mxn"], "paquete_mxn": ruta["paquete_mxn"],
        })
    casos = []
    for c in b.get("casos_de_prueba", []):
        rec = recomendar(b["orientacion"], c["respuestas_orientacion"], inv)
        casos.append({**c, "resultado": {k: rec[k] for k in ("escuela_id", "areas_recomendadas", "area_id", "aviso_proximamente", "tambien_te_puede_servir")}})

    out = {
        "orientacion": b["orientacion"],
        "areas": areas_out,
        "ritmo": {"regla": "lecciones por semana = horas_semana * 60 / minutos promedio por lección (hacia abajo, mínimo 1); cada curso empieza en semana nueva; un curso próximamente ocupa ceil(minutos / (horas_semana * 60)) semanas",
                  "combinar_respuestas": "curso_inicio: gana el que va más adelante en la ruta; omitir_* y agregar_cursos: se unen; horas_semana: la última respuesta distinta de 0 (se usa el mínimo del rango elegido)",
                  "costo": "suma de los precios de los cursos de la ruta (los próximamente con su precio de referencia); paquete = suma × 0,85 redondeado hacia abajo al múltiplo de 5"},
        "perfiles_demo": perfiles,
        "casos_de_prueba": casos,
    }
    with open(os.path.join(base, "diagnostico.json"), "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=1)
    for p in perfiles:
        print(f"{p['nombre']}: {p['escuela_id']}/{p['area_id']} (también: {p['tambien_te_puede_servir']}) "
              f"{p['semanas']} semanas a {p['horas_semana']} h/sem, costo ${p['costo_total_mxn']} paquete ${p['paquete_mxn']}")
        print("   cursos:", [(c['curso'], c['lecciones'], c['precio_mxn']) for c in p["cursos_ruta"]], "omitidos:", p["omitidos"])
        for s in p["roadmap"]:
            print(f"   Sem {s['semana']}: {s['titulo']} ({len(s['lecciones'])} lecc, {s['minutos']} min)")
    for c in casos:
        print("caso:", c["nombre"], c["resultado"])


if __name__ == "__main__":
    main()
