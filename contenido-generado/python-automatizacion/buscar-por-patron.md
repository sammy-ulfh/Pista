---
curso: "python-automatizacion"
modulo: "python-automatizacion/archivos-y-carpetas"
leccion: "buscar-por-patron"
titulo: "Buscar por patrón"
orden: 45
minutos: 0.1
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 0
ejercicios: []
---

```python
import fnmatch
import os

for filename in os.listdir('.'):
     if fnmatch.fnmatch(filename, 'data_*_backup.txt'):
         print(filename)
```
