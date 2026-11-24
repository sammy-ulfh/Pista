#!/usr/bin/env python3
"""
armar_informe.py — Genera analisis/ANALISIS_REPO.md a partir de la plantilla escrita a mano
(analisis/curacion/plantilla_informe.md), sustituyendo los marcadores {{...}} por tablas y cifras
calculadas por los demás scripts. Así ninguna cifra del informe se escribe a mano.

Marcadores admitidos:
  {{CIFRA:clave}}            una cifra suelta (ver función cifras())
  {{INVENTARIO_VAULTS}}      tabla de vaults
  {{SUELTOS}}                archivos fuera de cualquier vault
  {{CURSO:id}}               ficha + tabla de lecciones de un curso
  {{TAXONOMIA_TEC}}          áreas de Tecnología
  {{TAXONOMIA_OTRAS}}        escuelas, áreas y cursos de las demás escuelas
  {{DESTACADAS}}             lecciones destacadas para la demo
  {{ORIENTACION}}            preguntas de orientación con puntos
  {{DIAGNOSTICOS}}           preguntas de diagnóstico por área
  {{PERFILES}}               recorrido completo de los 3 perfiles
  {{SINTAXIS}}               conteos de sintaxis
  {{LENGUAJES}}              lenguajes de bloques de código
  {{AMBIGUAS}}               resumen de imágenes ambiguas
  {{ENLACES_PROBLEMA}}       enlaces rotos y anclas que no coinciden
  {{SLUGS}}                  nombres problemáticos y su slug
  {{IMAGENES_FORMATOS}} {{TOP20}} {{SIN_USAR}}
  {{OFENSIVAS}} {{SENSIBLES}}
  {{CATALOGO}} {{PRECIOS}} {{PAQUETES}}
  {{VALIDACION}}

Uso:
  python3 -I analisis/scripts/armar_informe.py analisis
"""
import json
import os
import re
import sys
from collections import Counter, defaultdict

NIVEL = {"basico": "básico", "intermedio": "intermedio", "avanzado": "avanzado"}
ESTADO = {"disponible": "disponible", "muestra": "de muestra", "proximamente": "próximamente"}


def md_tabla(cab, filas):
    out = ["| " + " | ".join(cab) + " |", "|" + "|".join("---" for _ in cab) + "|"]
    for f in filas:
        out.append("| " + " | ".join(str(x).replace("|", "\\|").replace("\n", " ") for x in f) + " |")
    return "\n".join(out)


def hm(minutos):
    h, m = divmod(int(round(minutos)), 60)
    return f"{h} h {m:02d} min" if h else f"{m} min"


def main():
    base = sys.argv[1] if len(sys.argv) > 1 else "analisis"
    d = os.path.join(base, "datos")
    J = lambda p: json.load(open(p, encoding="utf-8"))
    inv, dia = J(os.path.join(base, "inventario.json")), J(os.path.join(base, "diagnostico.json"))
    notas, vaults, repo = J(os.path.join(d, "notas.json")), J(os.path.join(d, "vaults.json")), J(os.path.join(d, "repo.json"))
    img, sint, slugs = J(os.path.join(d, "resumen_imagenes.json")), J(os.path.join(d, "resumen_sintaxis.json")), J(os.path.join(d, "slugs.json"))
    sens, ofe, precios, val = J(os.path.join(d, "sensibles.json")), J(os.path.join(d, "ofensivas.json")), J(os.path.join(d, "precios.json")), J(os.path.join(d, "validacion.json"))
    cursos = {c["id"]: c for c in inv["cursos"]}
    areas = {a["id"]: (a, e) for e in inv["escuelas"] for a in e["areas"]}
    lecc = {l["id"]: l for c in inv["cursos"] for m in c["modulos"] for l in m["lecciones"]}
    plantilla = open(os.path.join(base, "curacion", "plantilla_informe.md"), encoding="utf-8").read()

    reales = [c for c in inv["cursos"] if c["estado"] == "disponible"]
    cif = {
        "notas": repo["notas"], "imagenes": repo["imagenes"], "mb": repo["mb_sin_git"], "mb_imagenes": repo["mb_imagenes"],
        "palabras": f"{repo['palabras']:,}".replace(",", " "), "commit": repo["commit"][:7],
        "vaults_con_obsidian": sum(1 for v in vaults if v["tiene_obsidian"]),
        "horas_lectura": round(sum(n["minutos"] for n in notas) / 60, 1),
        "cursos_reales": len(reales), "lecciones_reales": sum(c["lecciones_total"] for c in reales),
        "horas_reales": round(sum(c["minutos"] for c in reales) / 60, 1),
        "notas_en_cursos": len({l["ruta_md"].split("#")[0] for c in reales for m in c["modulos"] for l in m["lecciones"]}),
        "cursos_muestra": sum(1 for c in inv["cursos"] if c["estado"] == "muestra"),
        "cursos_proximamente": sum(1 for c in inv["cursos"] if c["estado"] == "proximamente"),
        "ambiguas": len(img["ambiguas"]), "ambiguas_identicas": sum(1 for a in img["ambiguas"] if a["candidatos_identicos"]),
        "sin_usar": img["sin_usar"]["n"], "sin_usar_mb": img["sin_usar"]["mb"],
        "rotas_img": len(img["rotas"]), "incrustaciones": img["incrustaciones_total"],
        "enlaces_rotos": sint["conteo"].get("enlace_estado:rota", 0), "anclas_rotas": sint["conteo"].get("enlace_estado:ancla_rota", 0),
        "nombres_repetidos": img["nombres_repetidos_en_vault"]["n_nombres"], "archivos_nombre_repetido": img["nombres_repetidos_en_vault"]["n_archivos"],
        "mayor_1mb": img["mayor_a_1mb"], "mayor_500kb": img["mayor_a_500kb"], "promedio_kb": img["promedio_kb"],
        "png_mayus": img["formatos"].get(".PNG", {}).get("n", 0),
        "ofensivas_alto": sum(1 for o in ofe if o["riesgo"] == "alto"), "ofensivas_medio": sum(1 for o in ofe if o["riesgo"] == "medio"),
        "ofensivas_bajo": sum(1 for o in ofe if o["riesgo"] == "bajo"),
        "sensibles_alta": sum(1 for s in sens if s["severidad"] == "alta"), "sensibles_media": sum(1 for s in sens if s["severidad"] == "media"),
        "sensibles_baja": sum(1 for s in sens if s["severidad"] == "baja"), "sensibles_fp": sum(1 for s in sens if s["severidad"] == "falso_positivo"),
        "bloques_codigo": sint["bloques_codigo"]["total"], "bloques_sin_lenguaje": sint["bloques_codigo"]["sin_lenguaje"],
        "resaltados": sint["conteo"].get("resaltado_==", 0),
        "notas_con_indice": sint["conteo"].get("notas_con_indice_al_inicio", 0), "notas_con_siguientes": sint["conteo"].get("notas_con_siguientes_apuntes", 0),
        "problemas": sum(1 for _ in open(os.path.join(base, "problemas.csv"), encoding="utf-8")) - 1,
        **{f"n{r}_{k}": sum(1 for p in precios if p["estado"] != "proximamente" and p[f"precio_regla_{k}"] == r)
           for r in (20, 35, 50) for k in ("propuesta", "original")},
        "cursos_a_la_venta": sum(1 for p in precios if p["estado"] != "proximamente"),
        "lecciones_ingles": sum(1 for c in reales for m in c["modulos"] for l in m["lecciones"] if l["idioma"] == "en"),
        "lecciones_sensibles": sum(1 for c in reales for m in c["modulos"] for l in m["lecciones"] if l["sensible"]),
        "nombres_con_problemas": sum(1 for f in slugs["filas"] if f["problemas"]), "nombres_total": len(slugs["filas"]),
    }

    def r_cifra(m):
        k = m.group(1)
        if k not in cif:
            raise SystemExit(f"Cifra desconocida: {k}")
        return str(cif[k])

    def t_vaults():
        filas = []
        for v in vaults:
            if v["vault"] == "images":
                continue
            filas.append([f"`{v['vault']}`", v["notas"], v["imagenes"], f"{v['palabras']:,}".replace(",", " "), hm(v["minutos"]), v["mb"],
                          "sí" if v["tiene_obsidian"] else "**no**", ", ".join(f"`{o.split('/',1)[1]}`" for o in v["obsidian_anidados"]) or "—"])
        filas.append(["**Total** (incluye el README raíz)", repo["notas"], sum(v["imagenes"] for v in vaults), cif["palabras"],
                      hm(sum(v["minutos"] for v in vaults)), cif["mb"], f"{cif['vaults_con_obsidian']} de 8", ""])
        return md_tabla(["Vault", "Notas", "Imágenes", "Palabras", "Lectura", "MB", ".obsidian/", ".obsidian anidados"], filas)

    def t_sueltos():
        return "\n".join(f"- `{s}`" for s in repo["archivos_sueltos"])

    def t_curso(cid):
        c = cursos[cid]
        areas_n = ", ".join(areas[a][0]["nombre"] for a in c["areas"])
        pre = ", ".join(cursos[p]["titulo"] for p in c["prerrequisitos"]) or "ninguno"
        cab = (f"- **Subtítulo:** {c['subtitulo']}\n- **Áreas:** {areas_n} · **Nivel:** {NIVEL[c['nivel']]} — {c.get('justificacion_nivel','')}\n"
               f"- **Prerrequisitos:** {pre}\n- **Duración:** {hm(c['minutos'])} · {c['lecciones_total']} lecciones · {c['imagenes_total']} imágenes · **${c['precio_mxn']} MXN**"
               + (f" · apuntes en: {', '.join(c['idioma_apuntes'])}" if c.get("idioma_apuntes") and c["idioma_apuntes"] != ["es"] else "")
               + f"\n- **Portada:** `{c['portada']}`" + (" (SUPUESTO: revisar a mano)" if c["portada"] else " — ninguna imagen apta: usar ilustración genérica")
               + ("\n- **Aviso ético:** sí" if c["aviso_etico"] else "")
               + "\n- **Lo que aprenderás:**\n" + "\n".join(f"  - {x}" for x in c["aprenderas"]) + "\n")
        partes = [cab]
        for m in c["modulos"]:
            filas = []
            for l in m["lecciones"]:
                ruta = l["ruta_md"]
                corta = ruta[len(m["carpeta"]) + 1:] if ruta.startswith(m["carpeta"] + "/") else ruta
                marca = (" ★" if l["destacada_para_demo"] else "") + (" ⚠" if l["sensible"] else "")
                filas.append([l["orden"], l["titulo"] + marca, f"`{corta}`", f"`{l['slug']}`", l["palabras"], l["minutos"], len(l["imagenes"]),
                              ", ".join(l["lenguajes_codigo"]) or "—", NIVEL[l["nivel"]]])
            partes.append(f"**Módulo «{m['titulo']}»** — carpeta `{m['carpeta']}`\n\n" +
                          md_tabla(["#", "Lección", "Archivo original", "Slug", "Palabras", "Min", "Img", "Código", "Nivel"], filas))
        return "\n\n".join(partes)

    def t_tax_tec():
        e = next(x for x in inv["escuelas"] if x["id"] == "tecnologia")
        filas = []
        for a in e["areas"]:
            filas.append([f"`{a['id']}`", a["nombre"], a["descripcion"], " → ".join(cursos[c]["titulo"] for c in a["ruta"]),
                          ", ".join(cursos[c]["titulo"] for c in a["cursos"] if c not in a["ruta"]) or "—",
                          a["lecciones"], a["horas"], a["cobertura"], ESTADO[a["estado"]]])
        return md_tabla(["id", "Área", "Descripción", "Ruta (orden)", "Otros cursos", "Lecciones", "Horas", "Cobertura", "Estado"], filas)

    def t_tax_otras():
        out = []
        for e in inv["escuelas"]:
            if e["id"] == "tecnologia":
                continue
            out.append(f"#### {e['nombre']} (`{e['id']}`) — {ESTADO[e['estado']]} · SUPUESTO\n\n{e['descripcion']} Apuntes: " + (f"`{e['fuente_apuntes']}`" if e['fuente_apuntes'] else "todavía no hay") + ".\n")
            filas = []
            for a in e["areas"]:
                cs = []
                for cid in a["cursos"]:
                    c = cursos[cid]
                    if c["escuela"] != e["id"]:
                        cs.append(f"{c['titulo']} (de otra escuela)")
                        continue
                    cs.append(f"{c['titulo']} — {c['subtitulo']} *({ESTADO[c['estado']]}, ${c['precio_mxn']})*")
                filas.append([f"`{a['id']}`", a["nombre"], a["descripcion"], "<br>".join(cs), ESTADO[a["estado"]]])
            out.append(md_tabla(["id", "Área", "Descripción", "Cursos", "Estado"], filas))
        return "\n\n".join(out)

    def t_destacadas():
        filas = []
        for lid in inv["lecciones_destacadas_para_demo"]:
            l = lecc[lid]
            c = cursos[lid.split("/")[0]]
            filas.append([l["titulo"], c["titulo"], f"`{l['ruta_md']}`", len(l["imagenes"]), l["minutos"], ", ".join(l["lenguajes_codigo"]) or "—"])
        return md_tabla(["Lección", "Curso", "Ruta", "Imágenes", "Min", "Código"], filas)

    def t_orient():
        out = []
        for i, q in enumerate(dia["orientacion"]["preguntas"], 1):
            filas = []
            for o in q["opciones"]:
                s = o["suma"]
                pts = ", ".join([f"{k} +{v}" for k, v in s.get("escuelas", {}).items()] + [f"*{k}* +{v}" for k, v in s.get("areas", {}).items()])
                filas.append([o["texto"], pts])
            out.append(f"**{i}. {q['texto']}** (`{q['id']}`)\n\n" + md_tabla(["Opción", "Suma (escuelas, *áreas*)"], filas))
        return "\n\n".join(out)

    def t_diag():
        out = []
        for a in dia["areas"]:
            filas = []
            for i, q in enumerate(a["preguntas"], 1):
                for o in q["opciones"]:
                    e = o["efectos"]
                    ef = []
                    if e.get("curso_inicio"):
                        ef.append(f"empieza en *{cursos[e['curso_inicio']]['titulo']}*")
                    if e.get("omitir_modulos"):
                        ef.append("omite módulo(s) " + ", ".join(f"`{x}`" for x in e["omitir_modulos"]))
                    if e.get("omitir_lecciones"):
                        ef.append("lección(es) opcional(es) " + ", ".join(f"`{x}`" for x in e["omitir_lecciones"]))
                    if e.get("omitir_cursos"):
                        ef.append("quita " + ", ".join(cursos[x]["titulo"] for x in e["omitir_cursos"]))
                    if e.get("agregar_cursos"):
                        ef.append("agrega " + ", ".join(cursos[x]["titulo"] for x in e["agregar_cursos"]))
                    if e.get("horas_semana"):
                        ef.append(f"{e['horas_semana']} h/semana")
                    filas.append([f"{i}. {q['texto']}" if o is q["opciones"][0] else "", o["texto"], "; ".join(ef) or "—"])
            out.append(f"**{areas[a['area_id']][0]['nombre']}** (`{a['area_id']}`) — ruta base: " +
                       " → ".join(cursos[c]["titulo"] for c in areas[a["area_id"]][0]["ruta"]) + "\n\n" +
                       md_tabla(["Pregunta", "Opción", "Efecto en la ruta"], filas))
        return "\n\n".join(out)

    def t_perfiles():
        out = []
        oq = {q["id"]: q for q in dia["orientacion"]["preguntas"]}
        for i, p in enumerate(dia["perfiles_demo"], 1):
            a, e = areas[p["area_id"]]
            dq = {q["id"]: q for x in dia["areas"] if x["area_id"] == p["area_id"] for q in x["preguntas"]}
            resp_o = "; ".join(f"{oq[k]['texto']} → *{next(o['texto'] for o in oq[k]['opciones'] if o['id'] == v)}*" for k, v in p["respuestas_orientacion"].items())
            resp_d = "; ".join(f"{dq[k]['texto']} → *{next(o['texto'] for o in dq[k]['opciones'] if o['id'] == v)}*" for k, v in p["respuestas_diagnostico"].items())
            tam = p["tambien_te_puede_servir"]
            tam_t = f"{areas[tam['area_id']][0]['nombre']} (Escuela de {areas[tam['area_id']][1]['nombre']})" if tam else "ninguna (ninguna otra escuela sumó puntos)"
            pts = ", ".join(f"{k} {v}" for k, v in sorted(p["puntos"]["escuelas"].items(), key=lambda x: -x[1]) if v)
            filas = []
            for s in p["roadmap"]:
                nombres = []
                for x in s["lecciones"]:
                    nombres.append(f"*{cursos[x[6:]]['titulo']}* (curso próximamente)" if x.startswith("curso:") else lecc[x]["titulo"])
                filas.append([s["semana"], s["titulo"], "; ".join(nombres), s["minutos"]])
            cursos_t = "\n".join(f"  {j}. {cursos[c['curso']]['titulo']} — {ESTADO[c['estado']]} — " + (f"{c['lecciones']} lecciones" if c['lecciones'] else "sin lecciones todavía") +
                                 (f" ({c['omitidas']} omitidas)" if c.get("omitidas") else "") + f" — {hm(c['minutos'])} — ${c['precio_mxn']}"
                                 for j, c in enumerate(p["cursos_ruta"], 1))
            omit = "; ".join(f"{cursos[o['curso']]['titulo']} ({'ya lo sabe' if o['motivo']=='curso_inicio' else 'no lo necesita para su objetivo'})" for o in p["omitidos"]) or "ningún curso"
            omit_l = ", ".join(lecc[x]["titulo"] for x in p["omitir_lecciones"] if x in lecc)
            omit_m = ", ".join(f"`{x}`" for x in p["omitir_modulos"])
            out.append(
                f"#### Perfil {i}: {p['nombre']} — {p['carrera']}{' (tecnología)' if p['es_tecnologia'] else ''}\n\n"
                f"- **Objetivo:** {p['objetivo']}\n- **Orientación:** {resp_o}\n"
                f"- **Puntos:** {pts} → **{e['nombre']} / {a['nombre']}**; también te puede servir: {tam_t}\n"
                f"- **Diagnóstico:** {resp_d}\n"
                f"- **Se omite:** {omit}" + (f"; lecciones opcionales: {omit_l}" if omit_l else "") + (f"; módulos: {omit_m}" if omit_m else "") + "\n"
                f"- **Cursos de la ruta:**\n{cursos_t}\n"
                f"- **Ritmo:** {p['horas_semana']} h/semana → **{p['semanas']} semanas**, {hm(p['minutos_total'])} en total\n"
                f"- **Costo:** **${p['costo_total_mxn']} MXN** (o ${p['paquete_mxn']} con el paquete de la ruta)\n\n" +
                md_tabla(["Semana", "Título de la semana", "Lecciones", "Min"], filas))
        return "\n\n".join(out)

    def t_sintaxis():
        c = sint["conteo"]
        ej = sint["ejemplos"]

        def e(k, n=2):
            return "<br>".join(f"`{x['ejemplo']}` — `{x['ruta']}:{x['linea']}`" for x in ej.get(k, [])[:n]) or "—"
        filas = [
            ["Imagen con solo el nombre `![[x.png]]`", c.get("embed:imagen:solo_nombre", 0), e("embed:imagen:solo_nombre")],
            ["… con extensión en mayúsculas `![[x.PNG]]`", c.get("embed:imagen:solo_nombre:EXT_MAYUSCULAS", 0), e("embed:imagen:solo_nombre:EXT_MAYUSCULAS", 1)],
            ["Imagen con ruta desde la raíz del vault", c.get("embed:imagen:con_ruta", 0), e("embed:imagen:con_ruta")],
            ["… con ruta y extensión en mayúsculas", c.get("embed:imagen:con_ruta:EXT_MAYUSCULAS", 0), e("embed:imagen:con_ruta:EXT_MAYUSCULAS", 1)],
            ["Imagen con tamaño `![[x.png\\|300]]`", sum(v for k, v in c.items() if k.endswith(":con_tamano")), "—"],
            ["PDF incrustado `![[archivo.pdf]]`", c.get("embed:archivo_pdf:solo_nombre", 0), e("embed:archivo_pdf:solo_nombre", 1)],
            ["Nota incrustada `![[nota]]`", c.get("embed:nota_incrustada:solo_nombre", 0), e("embed:nota_incrustada:solo_nombre", 1)],
            ["Enlace a encabezado de la misma nota `[[#Título]]`", c.get("enlace:ancla_misma_nota", 0), e("enlace:ancla_misma_nota", 1)],
            ["Enlace a nota `[[nota]]`", c.get("enlace:nota", 0), e("enlace:nota")],
            ["Enlace a nota con ruta `[[carpeta/nota]]`", c.get("enlace:ruta/nota", 0), e("enlace:ruta/nota", 1)],
            ["Enlace con alias `[[ruta/nota\\|alias]]`", c.get("enlace:ruta/nota|alias", 0), e("enlace:ruta/nota|alias", 1)],
            ["Enlace a encabezado de otra nota `[[nota#Título]]`", c.get("enlace:nota#encabezado", 0), e("enlace:nota#encabezado", 1)],
            ["Enlace Markdown externo `[texto](url)`", c.get("markdown:enlace", 0), e("markdown:enlace", 1)],
            ["Imagen Markdown `![](ruta)`", c.get("markdown:imagen", 0), "—"],
            ["HTML embebido (`<br>`, `<p>`, `<pre>`)", sum(v for k, v in c.items() if k.startswith("html:")), e("html:<br>", 1)],
            ["Tablas (filas separadoras)", c.get("tabla", 0), "—"],
            ["Resaltado `==texto==` (líneas)", c.get("resaltado_==", 0), "—"],
            ["Comentario de Obsidian `%%`", c.get("comentario_%%", 0), "—"],
            ["Callouts `> [!note]`", sum(v for k, v in c.items() if k.startswith("callout:")), "—"],
            ["Tags `#tag`", c.get("tag", 0), "—"],
            ["Checklists `- [ ]`", c.get("checklist", 0), "—"],
            ["LaTeX `$...$`", c.get("latex", 0), "—"],
            ["Mermaid", c.get("mermaid", 0), "—"],
            ["Frontmatter YAML", c.get("frontmatter", 0), e("frontmatter", 1)],
            ["Notas con índice al inicio", c.get("notas_con_indice_al_inicio", 0), "—"],
            ["Notas con «Siguientes apuntes»", c.get("notas_con_siguientes_apuntes", 0), "—"],
        ]
        return md_tabla(["Elemento", "Cantidad", "Ejemplos reales"], filas)

    def t_lenguajes():
        filas = [[f"`{l['lenguaje']}`", l["bloques"], "sí" if l["mayusculas"] else "", "" if l["estandar"] else "**no**", f"`{l['normalizar_a']}`"]
                 for l in sint["bloques_codigo"]["lenguajes"]]
        filas.append(["(sin lenguaje)", sint["bloques_codigo"]["sin_lenguaje"], "", "", "`text`"])
        return md_tabla(["Lenguaje", "Bloques", "Mayúsculas", "Estándar", "Normalizar a"], filas)

    def t_ambiguas():
        por = defaultdict(lambda: [0, 0, set()])
        for a in img["ambiguas"]:
            k = a["nota"]
            por[k][0] += 1
            por[k][1] += 1 if a["candidatos_identicos"] else 0
            por[k][2].add(os.path.dirname(a["propuesta"]))
        filas = [[f"`{k}`", v[0], v[1], ", ".join(f"`{x}`" for x in sorted(v[2]))] for k, v in sorted(por.items(), key=lambda x: -x[1][0])]
        return md_tabla(["Nota", "Imágenes ambiguas", "Candidatos idénticos", "Carpeta propuesta (más cercana)"], filas)

    def t_enlaces():
        filas = []
        for n in notas:
            for l in n["enlaces"]:
                if l["estado"] in ("rota", "ancla_rota"):
                    filas.append([l["estado"].replace("_", " "), f"`{n['ruta']}:{l['linea']}`", f"`{l['original'][:70]}`"])
        return md_tabla(["Tipo", "Dónde", "Enlace"], filas)

    def t_slugs():
        filas = []
        for f in slugs["filas"]:
            if set(f["problemas"]) & {"codificacion_rota", "simbolos", "guion_largo"}:
                filas.append([f["tipo"], f"`{f['ruta']}`", ", ".join(f["problemas"]), f"`{f['slug']}`"])
        return md_tabla(["Tipo", "Ruta", "Problemas", "Slug propuesto"], filas)

    def t_img_formatos():
        return md_tabla(["Formato", "Archivos", "MB"], [[k, v["n"], v["mb"]] for k, v in img["formatos"].items()])

    def t_top20():
        return md_tabla(["#", "Imagen", "KB"], [[i, f"`{t['ruta']}`", t["kb"]] for i, t in enumerate(img["top20"], 1)])

    def t_sin_usar():
        return "\n".join(f"- `{r}`" for r in img["sin_usar"]["lista"])

    def t_ofensivas():
        filas = []
        for o in sorted(ofe, key=lambda x: ({"alto": 0, "medio": 1, "bajo": 2}[x["riesgo"]], x["archivo"])):
            if o["riesgo"] == "bajo":
                continue
            cur = next((c["titulo"] for c in inv["cursos"] for m in c["modulos"] for l in m["lecciones"] if l["ruta_md"].split("#")[0] == o["archivo"]), "—")
            filas.append([o["riesgo"], f"`{o['archivo']}`", ", ".join(c["categoria"] for c in o["categorias"]), cur])
        return md_tabla(["Riesgo", "Nota", "Técnicas detectadas", "Curso"], filas)

    def t_sensibles():
        filas = [[s["severidad"], s["tipo"], f"`{s['archivo']}`", s["linea"], s["motivo"]] for s in sens if s["severidad"] in ("alta", "media")]
        return md_tabla(["Severidad", "Tipo", "Archivo", "Línea", "Motivo (valor omitido)"], filas)

    def t_catalogo():
        out = []
        for c in inv["cursos"]:
            if c["estado"] == "proximamente":
                continue
            e = next(x for x in inv["escuelas"] if x["id"] == c["escuela"])
            out.append(md_tabla(["Campo", "Valor"], [
                ["Título", f"**{c['titulo']}**" + (" · *curso de muestra (SUPUESTO)*" if c["estado"] == "muestra" else "")],
                ["Subtítulo", c["subtitulo"]], ["Escuela", e["nombre"]], ["Área(s)", ", ".join(areas[a][0]["nombre"] for a in c["areas"])],
                ["Nivel", NIVEL[c["nivel"]]], ["Duración", hm(c["minutos"])], ["Lecciones", c["lecciones_total"]],
                ["Lo que aprenderás", "<br>".join("• " + x for x in c["aprenderas"])], ["Portada", f"`{c['portada']}`" if c["portada"] else "ilustración genérica"],
                ["Prerrequisitos", ", ".join(cursos[p]["titulo"] for p in c["prerrequisitos"]) or "ninguno"],
                ["Precio", f"${c['precio_mxn']} MXN"], ["Aviso ético", "sí" if c["aviso_etico"] else "no"]]))
        return "\n\n".join(out)

    def t_precios():
        filas = []
        for p in precios:
            c = cursos[p["id"]]
            filas.append([c["titulo"], ESTADO[c["estado"]], hm(p["minutos"]), f"**${p['precio_regla_propuesta']}**", f"${p['precio_regla_original']}"])
        return md_tabla(["Curso", "Estado", "Duración", "Precio (regla propuesta)", "Con la regla de PROYECTO.md"], filas)

    def t_paquetes():
        filas = []
        for e in inv["escuelas"]:
            for a in e["areas"]:
                pq = a["paquete"]
                if pq.get("precio_mxn"):
                    filas.append([e["nombre"], a["nombre"], " + ".join(f"${cursos[c]['precio_mxn']}" for c in a["ruta"]), f"${pq['suma_cursos_mxn']}", f"**${pq['precio_mxn']}**"])
        return md_tabla(["Escuela", "Área", "Cursos de la ruta", "Suma", "Paquete"], filas)

    def t_validacion():
        return "\n".join([f"- OK: {x}" for x in val["ok"]] + [f"- Aviso: {x}" for x in val["avisos"]] + [f"- **Error:** {x}" for x in val["errores"]])

    gen = {"INVENTARIO_VAULTS": t_vaults, "SUELTOS": t_sueltos, "TAXONOMIA_TEC": t_tax_tec, "TAXONOMIA_OTRAS": t_tax_otras,
           "DESTACADAS": t_destacadas, "ORIENTACION": t_orient, "DIAGNOSTICOS": t_diag, "PERFILES": t_perfiles,
           "SINTAXIS": t_sintaxis, "LENGUAJES": t_lenguajes, "AMBIGUAS": t_ambiguas, "ENLACES_PROBLEMA": t_enlaces,
           "SLUGS": t_slugs, "IMAGENES_FORMATOS": t_img_formatos, "TOP20": t_top20, "SIN_USAR": t_sin_usar,
           "OFENSIVAS": t_ofensivas, "SENSIBLES": t_sensibles, "CATALOGO": t_catalogo, "PRECIOS": t_precios,
           "PAQUETES": t_paquetes, "VALIDACION": t_validacion}

    def reemplazo(m):
        k = m.group(1)
        if k.startswith("CIFRA:"):
            return r_cifra(re.match(r"CIFRA:(.+)", k))
        if k.startswith("CURSO:"):
            return t_curso(k[6:])
        if k not in gen:
            raise SystemExit(f"Marcador desconocido: {k}")
        return gen[k]()

    salida = re.sub(r"\{\{([A-Z0-9_]+(?::[a-z0-9_\-]+)?)\}\}", reemplazo, plantilla)
    with open(os.path.join(base, "ANALISIS_REPO.md"), "w", encoding="utf-8") as fh:
        fh.write(salida)
    with open(os.path.join(d, "cifras.json"), "w", encoding="utf-8") as fh:
        json.dump(cif, fh, ensure_ascii=False, indent=1)
    print(f"ANALISIS_REPO.md: {len(salida.splitlines())} líneas")
    print(json.dumps(cif, ensure_ascii=False))


if __name__ == "__main__":
    main()
