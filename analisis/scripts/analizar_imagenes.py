#!/usr/bin/env python3
"""
analizar_imagenes.py — Resume las imágenes del repositorio a partir de los datos del escáner:
formatos, tamaño total, las 20 más pesadas, imágenes sin usar, imágenes que se usan pero no
existen, nombres repetidos entre carpetas y extensiones en mayúsculas.

Requiere haber ejecutado antes escanear_repo.py.
Uso:
  python3 -I analisis/scripts/analizar_imagenes.py analisis/datos
Salida:
  <datos>/resumen_imagenes.json
"""
import json
import os
import sys
from collections import Counter, defaultdict


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)
    datos = sys.argv[1]
    imgs = json.load(open(os.path.join(datos, "imagenes.json"), encoding="utf-8"))
    notas = json.load(open(os.path.join(datos, "notas.json"), encoding="utf-8"))

    formatos = Counter()
    bytes_fmt = Counter()
    for i in imgs:
        formatos[i["extension"]] += 1
        bytes_fmt[i["extension"]] += i["bytes"]
    total = sum(i["bytes"] for i in imgs)
    top = sorted(imgs, key=lambda i: -i["bytes"])[:20]
    sin_usar = [i for i in imgs if not i["usada_por"]]
    por_vault_sin_usar = Counter(i["vault"] for i in sin_usar)

    rotas, ambiguas, embeds_total, embeds_no_imagen = [], [], 0, []
    usos_por_nota = []
    for n in notas:
        for e in n["imagenes"]:
            embeds_total += 1
            if not e["es_imagen"]:
                embeds_no_imagen.append({"nota": n["ruta"], "linea": e["linea"], "original": e["original"],
                                         "estado": e["estado"], "resuelta": e["resuelta"]})
            if e["estado"] == "rota":
                rotas.append({"nota": n["ruta"], "linea": e["linea"], "original": e["original"]})
            elif e["estado"] == "ambigua":
                ambiguas.append({"nota": n["ruta"], "linea": e["linea"], "original": e["original"],
                                 "candidatos": e["candidatos"], "propuesta": e["resuelta"],
                                 "candidatos_identicos": e.get("candidatos_identicos")})
        usos_por_nota.append((n["ruta"], n["n_imagenes"]))

    # Nombres repetidos dentro de un mismo vault (riesgo de resolver la imagen equivocada)
    por_nombre = defaultdict(list)
    for i in imgs:
        por_nombre[(i["vault"], os.path.basename(i["ruta"]))].append(i["ruta"])
    repetidos = {f"{v}::{n}": r for (v, n), r in por_nombre.items() if len(r) > 1}
    # Nombres que solo se distinguen por mayúsculas en la extensión dentro de la misma carpeta
    ci = defaultdict(list)
    for i in imgs:
        ci[i["ruta"].lower()].append(i["ruta"])
    choque_mayusculas = [r for r in ci.values() if len(r) > 1]

    # Imágenes por encima de 1 MB y 500 KB
    grandes_1mb = sum(1 for i in imgs if i["bytes"] > 1024 * 1024)
    grandes_500k = sum(1 for i in imgs if i["bytes"] > 500 * 1024)

    res = {
        "total_imagenes": len(imgs),
        "mb_total": round(total / 1024 / 1024, 2),
        "formatos": {k: {"n": v, "mb": round(bytes_fmt[k] / 1024 / 1024, 2)} for k, v in formatos.most_common()},
        "mayor_a_1mb": grandes_1mb, "mayor_a_500kb": grandes_500k,
        "promedio_kb": round(total / len(imgs) / 1024, 1) if imgs else 0,
        "top20": [{"ruta": i["ruta"], "kb": round(i["bytes"] / 1024, 1)} for i in top],
        "sin_usar": {"n": len(sin_usar), "mb": round(sum(i["bytes"] for i in sin_usar) / 1024 / 1024, 2),
                     "por_vault": dict(por_vault_sin_usar), "lista": [i["ruta"] for i in sin_usar]},
        "incrustaciones_total": embeds_total,
        "incrustaciones_no_imagen": embeds_no_imagen,
        "rotas": rotas,
        "ambiguas": ambiguas,
        "nombres_repetidos_en_vault": {"n_nombres": len(repetidos), "n_archivos": sum(len(v) for v in repetidos.values())},
        "choque_mayusculas_misma_ruta": choque_mayusculas,
        "notas_con_mas_imagenes": sorted(usos_por_nota, key=lambda x: -x[1])[:15],
    }
    with open(os.path.join(datos, "resumen_imagenes.json"), "w", encoding="utf-8") as fh:
        json.dump(res, fh, ensure_ascii=False, indent=1)
    print(f"imagenes={len(imgs)} mb={res['mb_total']} sin_usar={len(sin_usar)} rotas={len(rotas)} "
          f"ambiguas={len(ambiguas)} nombres_repetidos={len(repetidos)}")


if __name__ == "__main__":
    main()
