#!/usr/bin/env bash
# ejecutar_todo.sh — Ejecuta todo el análisis en orden y regenera los entregables de analisis/.
# Uso: bash analisis/scripts/ejecutar_todo.sh fuentes/Notes
# (si fuentes/Notes no existe: git clone --depth 1 https://github.com/sammy-ulfh/Notes.git fuentes/Notes)
set -euo pipefail
REPO="${1:-fuentes/Notes}"
S="$(dirname "$0")"
A="$(dirname "$S")"
python3 -I "$S/escanear_repo.py" "$REPO" "$A/datos"
python3 -I "$S/buscar_sensibles.py" "$REPO" "$A/datos"
python3 -I "$S/analizar_imagenes.py" "$A/datos"
python3 -I "$S/analizar_sintaxis.py" "$A/datos" > /dev/null
python3 -I "$S/proponer_slugs.py" "$REPO" "$A/datos"
python3 -I "$S/construir_inventario.py" "$REPO" "$A" > /dev/null
python3 -I "$S/generar_diagnostico.py" "$A" > /dev/null
python3 -I "$S/validar.py" "$REPO" "$A"
python3 -I "$S/generar_problemas.py" "$REPO" "$A" > /dev/null
python3 -I "$S/generar_temarios.py" "$A"
python3 -I "$S/armar_informe.py" "$A" | head -1
