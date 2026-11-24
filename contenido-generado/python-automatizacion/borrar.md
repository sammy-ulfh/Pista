---
curso: "python-automatizacion"
modulo: "python-automatizacion/archivos-y-carpetas"
leccion: "borrar"
titulo: "Borrar"
orden: 48
minutos: 0.2
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 0
ejercicios: []
---

```python
import os

if os.path.isfile(data_file):
    os.remove(data_file)
else:
    os.rmdir(data_file) # remove empty directory
```

```python
import shutil

trash_dir = 'my_documents/bad_dir'
try:
    shutil.rmtree(trash_dir)
except OSError as e:
    print(f'Error: {trash_dir} : {e.strerror}')
```
