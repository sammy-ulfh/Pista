#!/usr/bin/env python3
"""
buscar_sensibles.py — Busca en las notas (solo lectura):
  1) Datos que NO deben publicarse: contraseñas, tokens/claves, llaves privadas, IPs públicas,
     correos y teléfonos. Reporta archivo, línea y tipo, pero NUNCA el valor (se enmascara).
  2) Notas sobre técnicas ofensivas (keylogger, malware, backdoor, C&C, spoofing, sniffer,
     shells, explotación…) para añadirles un aviso de uso ético y legal.

Uso:
  python3 -I analisis/scripts/buscar_sensibles.py fuentes/Notes analisis/datos
Salida:
  <salida>/sensibles.json  (lista de hallazgos con valor enmascarado)
  <salida>/ofensivas.json  (notas con técnicas ofensivas y su nivel de riesgo)
"""
import ipaddress
import json
import os
import re
import sys

PATRONES = [
    ("llave_privada", re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----")),
    ("token_github", re.compile(r"\bgh[pousr]_[A-Za-z0-9]{20,}\b")),
    ("clave_aws", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
    ("token_slack", re.compile(r"\bxox[abpr]-[A-Za-z0-9-]{10,}\b")),
    ("clave_api_generica", re.compile(r"(?i)\b(api[_-]?key|secret[_-]?key|access[_-]?token|auth[_-]?token|bearer)\b\s*[:=]\s*['\"]?([A-Za-z0-9_\-\.]{12,})")),
    ("jwt", re.compile(r"\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}")),
    ("contrasena", re.compile(r"(?i)\b(password|passwd|pass|pwd|contrase(?:ñ|n)a|clave)\b\s*[:=]\s*['\"]?([^\s'\"]{4,})")),
    ("hash_contrasena", re.compile(r"\$(?:1|2[aby]?|5|6|y)\$[^\s:$]{1,}\$[./A-Za-z0-9]{20,}")),
    ("correo", re.compile(r"\b[A-Za-z0-9._%+-]+\\?@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b")),
    ("telefono", re.compile(r"(?<![\d.])(?:\+?\d{1,3}[ -]?)?\(?\d{2,3}\)?[ -]\d{3,4}[ -]\d{4}(?![\d.])")),
]
RE_IP = re.compile(r"(?<![\d.])(\d{1,3}(?:\.\d{1,3}){3})(?![\d.])")

# Correos de ejemplo o genéricos que no son datos personales
CORREOS_EJEMPLO = re.compile(r"(?i)@(example\.(com|org|net)|ejemplo\.|test\.|domain\.|dominio\.|localhost|users\.noreply\.github\.com)")
# Valores de contraseña que son evidentemente marcadores de ejemplo
CONTRASENAS_EJEMPLO = re.compile(r"(?i)^(\*+|x+|<.*>|\$\w+|\{.*\}|password|contraseña|secret|tu_?password|your_?password|changeme|example)$")

OFENSIVAS = [
    # (palabra clave en ruta o texto, categoría, riesgo)
    (r"keylogger", "keylogger", "alto"),
    (r"malware", "malware", "alto"),
    (r"backdoor", "backdoor", "alto"),
    (r"command and control|\bC&C\b|\bC2\b", "comando_y_control", "alto"),
    (r"spoof", "suplantacion_spoofing", "alto"),
    (r"envenenador|poisoning", "envenenamiento_arp", "alto"),
    (r"hijack|interceptor de tr", "secuestro_trafico", "alto"),
    (r"sniffer|rastreador", "captura_trafico", "alto"),
    (r"reverse shell|bind shell|forward shell", "shells_remotas", "alto"),
    (r"payload", "payloads", "medio"),
    (r"explotaci[oó]n|exploit", "explotacion", "medio"),
    (r"evasi[oó]n de firewall", "evasion_firewall", "medio"),
    (r"fuerza bruta|brute", "fuerza_bruta", "medio"),
    (r"sqli|inyecci[oó]n sql|sql injection", "inyeccion_sql", "medio"),
    (r"fuzzing", "fuzzing", "medio"),
    (r"m[aá]quinas vulnerables", "laboratorio_vulnerable", "bajo"),
    (r"macchanger|cambie la direcci[oó]n mac", "cambio_mac", "medio"),
    (r"brechas de seguridad|credenciales", "osint_credenciales", "medio"),
    (r"descubrimiento de correos", "osint_correos", "medio"),
    (r"google dorks|google hacking", "osint_dorks", "medio"),
    (r"escaneo|esc[aá]ner|nmap|enumeraci[oó]n|reconocimiento", "reconocimiento", "bajo"),
    (r"burpsuite|burp suite", "proxy_interceptacion", "medio"),
    (r"pentesting", "pentesting", "bajo"),
]
ORDEN_RIESGO = {"alto": 3, "medio": 2, "bajo": 1}


# Clasificación explícita de cada hallazgo (regla -> severidad). La primera regla que coincide manda.
# Se evalúa sobre (tipo, archivo, texto de la línea). Severidad: alta | media | baja | falso_positivo.
CLASIFICACION = [
    ("ip_publica", r"Chrome/|Safari/|Mozilla/", None, "falso_positivo", "Número de versión del navegador, no es una IP"),
    ("ip_publica", r"", r"[Ss]ubnetting", "baja", "IP inventada para un ejercicio de subredes"),
    ("ip_publica", r"1\.2\.3\.4|8\.8\.8\.8|1\.1\.1\.1", None, "baja", "IP de ejemplo o DNS público"),
    ("ip_publica", r"", None, "baja", "IP pública de ejemplo de un manual (whois/dig/nslookup); conviene cambiarla por 203.0.113.x"),
    ("contrasena", r"PWD=|passwd:\s+files|password = 'passwd'|password=null", None, "falso_positivo", "Variable, archivo de configuración o consulta SQL de ejemplo"),
    ("contrasena", r"", None, "media", "Revisar a mano"),
    ("correo", r"", r"Correos|Brechas", "alta", "Correo real de una persona de una empresa real, obtenido con OSINT"),
    ("correo", r"", r"Keylogger", "alta", "Correo personal (gmail) usado en el ejemplo; revisar también las capturas de esa nota (posible contraseña de aplicación)"),
    ("correo", r"type@asset", None, "falso_positivo", "Parte de una URL, no es un correo"),
    ("correo", r"\.epam\.com", None, "media", "Nombre de host interno de una empresa (laboratorio corporativo)"),
    ("correo", r"@google\.com|@foo\.example|builder@|captain_jack|-d@", None, "baja", "Correo público (whois), de ejemplo o falso positivo de curl -d@archivo"),
    ("correo", r"", None, "media", "Revisar a mano"),
]


def clasificar(tipo, archivo, linea):
    for t, rx_linea, rx_archivo, sev, motivo in CLASIFICACION:
        if t != tipo:
            continue
        if rx_linea and not re.search(rx_linea, linea):
            continue
        if rx_archivo and not re.search(rx_archivo, archivo):
            continue
        return sev, motivo
    return "media", "Revisar a mano"


def enmascarar(v):
    """No se guarda ningún carácter del valor: solo su longitud."""
    return f"<oculto: {len(v)} caracteres>"


def ip_publica(s):
    try:
        ip = ipaddress.ip_address(s)
    except ValueError:
        return False
    if any(int(o) > 255 for o in s.split(".")):
        return False
    return ip.is_global and not ip.is_multicast and not s.startswith(("0.", "255."))


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    repo, salida = sys.argv[1], sys.argv[2]
    hallazgos, ofensivas = [], []
    for d, dirs, fs in os.walk(repo):
        dirs[:] = [x for x in dirs if x not in (".git", ".obsidian")]
        for f in sorted(fs):
            if not f.endswith(".md"):
                continue
            ruta = os.path.relpath(os.path.join(d, f), repo)
            with open(os.path.join(d, f), encoding="utf-8", errors="replace") as fh:
                lineas = fh.read().split("\n")
            for n, l in enumerate(lineas, 1):
                for tipo, rx in PATRONES:
                    for m in rx.finditer(l):
                        valor = m.group(m.lastindex) if m.lastindex else m.group(0)
                        if tipo == "correo" and CORREOS_EJEMPLO.search(valor):
                            continue
                        if tipo == "contrasena" and CONTRASENAS_EJEMPLO.match(valor):
                            continue
                        sev, motivo = clasificar(tipo, ruta, l)
                        hallazgos.append({"tipo": tipo, "archivo": ruta, "linea": n, "severidad": sev,
                                          "motivo": motivo, "valor_enmascarado": enmascarar(valor)})
                for m in RE_IP.finditer(l):
                    if ip_publica(m.group(1)):
                        sev, motivo = clasificar("ip_publica", ruta, l)
                        hallazgos.append({"tipo": "ip_publica", "archivo": ruta, "linea": n, "severidad": sev,
                                          "motivo": motivo, "valor_enmascarado": enmascarar(m.group(1))})
            texto = "\n".join(lineas).lower()
            ruta_l = ruta.lower()
            cats, riesgo = [], 0
            for patron, cat, r in OFENSIVAS:
                en_ruta = re.search(patron, ruta_l, re.I)
                n_texto = len(re.findall(patron, texto, re.I))
                if en_ruta or n_texto >= 3:
                    cats.append({"categoria": cat, "en_titulo": bool(en_ruta), "menciones": n_texto})
                    if en_ruta:
                        riesgo = max(riesgo, ORDEN_RIESGO[r])
                    else:
                        riesgo = max(riesgo, ORDEN_RIESGO[r] - 1)
            if cats and riesgo > 0:
                ofensivas.append({"archivo": ruta, "riesgo": {3: "alto", 2: "medio", 1: "bajo"}[riesgo],
                                  "categorias": cats})
    os.makedirs(salida, exist_ok=True)
    with open(os.path.join(salida, "sensibles.json"), "w", encoding="utf-8") as fh:
        json.dump(hallazgos, fh, ensure_ascii=False, indent=1)
    with open(os.path.join(salida, "ofensivas.json"), "w", encoding="utf-8") as fh:
        json.dump(ofensivas, fh, ensure_ascii=False, indent=1)
    from collections import Counter
    print("sensibles:", dict(Counter(h["tipo"] for h in hallazgos)))
    print("severidad:", dict(Counter(h["severidad"] for h in hallazgos)))
    print("ofensivas:", dict(Counter(o["riesgo"] for o in ofensivas)))


if __name__ == "__main__":
    main()
