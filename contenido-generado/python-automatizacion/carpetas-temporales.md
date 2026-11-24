---
curso: "python-automatizacion"
modulo: "python-automatizacion/archivos-y-carpetas"
leccion: "carpetas-temporales"
titulo: "Carpetas temporales"
orden: 47
minutos: 0.2
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 0
ejercicios: []
---

```python
import tempfile
with tempfile.TemporaryDirectory() as tmpdir:
     print('Created temporary directory ', tmpdir)
     # Created temporary directory, e.g. /tmp/tmpoxbkrm6c
     print(os.path.exists(tmpdir))
     # True

# Directory contents have been removed
os.path.exists(tmpdir)
# False
```
