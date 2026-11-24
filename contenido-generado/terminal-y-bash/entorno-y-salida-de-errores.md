---
curso: "terminal-y-bash"
modulo: "terminal-y-bash/estilo"
leccion: "entorno-y-salida-de-errores"
titulo: "Entorno y salida de errores"
orden: 15
minutos: 0.3
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 0
ejercicios: []
---

## stdout vs stderr

All error messages should go to STDERR.

This makes it easier to separate normal status from actual issues.

A function to print out error messages along with other status information is recommended.

```shell
err() {
  echo "[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $*" >&2
}

if ! do_something; then
  err "Unable to do_something"
  exit 1
fi
```
