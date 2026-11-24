---
curso: "python-automatizacion"
modulo: "python-automatizacion/archivos-y-carpetas"
leccion: "listar-una-carpeta"
titulo: "Listar una carpeta"
orden: 43
minutos: 0.1
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 0
ejercicios: []
---

```python
import os

with os.scandir('.') as entries:
    for entry in entries:
        print(entry.name)
```
