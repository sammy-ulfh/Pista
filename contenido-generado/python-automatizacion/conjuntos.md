---
curso: "python-automatizacion"
modulo: "python-automatizacion/sintaxis"
leccion: "conjuntos"
titulo: "Conjuntos"
orden: 21
minutos: 0.8
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 0
ejercicios: []
---

A set is an unordered collection with no duplicate elements. Basic uses include membership testing and eliminating duplicate entries. Set objects also support mathematical operations like union, intersection, difference, and symmetric difference.

```python
x = {1, 2, 3, 1, 2}
y = {2, 4, 5}

print("x:", x)

print("x & y:", x & y) # x.intersection(y)
print("x | y:", x | y) # x.union(y)
print("x - y:", x - y) # x.difference(y)
print("x ^ y:", x ^ y) # x.symmetric_difference()

l = list(x)  # convert to list
```

## Examples

```python
>>> numbers = {1, 2, 3, 4, 5}
>>> numbers.add(4)
>>> numbers.add(6)
>>> numbers
{1, 2, 3, 4, 5, 6}
>>> numbers.pop()
1
>>> numbers
{2, 3, 4, 5, 6}
>>> numbers.discard(4)
>>> numbers
{2, 3, 5, 6}
>>> numbers.clear()
>>> numbers
set()
```

__remove(elem) vs discard(elem)__

```python
>>> numbers = {2, 3, 4}
>>> numbers.discard(5)
>>> numbers.remove(5) # KeyError: 5
```

See also  [https://docs.python.org/3/tutorial/datastructures.html#sets](https://docs.python.org/3/tutorial/datastructures.html#sets)
