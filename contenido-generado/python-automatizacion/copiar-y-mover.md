---
curso: "python-automatizacion"
modulo: "python-automatizacion/archivos-y-carpetas"
leccion: "copiar-y-mover"
titulo: "Copiar y mover"
orden: 49
minutos: 0.4
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 0
ejercicios: []
---

```python
import shutil

src = 'path/to/file.txt'
dst = 'path/to/dest_dir'
shutil.copy(src, dst)

# to preserve metadata
shutil.copy2(src, dst)

# copy directory recursively
shutil.copytree('data_1', 'data1_backup')
```

## Moving and renaming

```python
import shutil

shutil.move('dir_1/', 'backup/')
# moves dir_1/ into backup/ if backup/ exists.
# If backup/ does not exist, dir_1/ will be renamed to backup

import os

os.rename('first.zip', 'first_01.zip')
```
