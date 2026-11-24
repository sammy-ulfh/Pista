---
curso: "python-automatizacion"
modulo: "python-automatizacion/sintaxis"
leccion: "entrada-y-salida-en-consola"
titulo: "Entrada y salida en consola"
orden: 23
minutos: 0.4
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 0
ejercicios: []
---

## input(\[prompt]), print

```python
>>> l = list(map(int, input('--> ').split()))
--> 1 2 3 4
>>> print(' '.join([str(i) for i in l]))
1 2 3 4
>>> print(*l)
1 2 3 4
>>> print(l)
[1, 2, 3, 4]

>>> import json
>>> d = json.loads(input('Input dict:'))
Input dict:{1: 'one', 2: 'two'}
>>> print(d) 
{1: 'one', 2: 'two'}
```
