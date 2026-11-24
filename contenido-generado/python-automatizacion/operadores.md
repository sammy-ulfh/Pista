---
curso: "python-automatizacion"
modulo: "python-automatizacion/panorama"
leccion: "operadores"
titulo: "Operadores"
orden: 11
minutos: 2
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 6
ejercicios: []
---

<img src="/apuntes/python-automatizacion/operators.webp" alt="Operators" width="2025" height="1411" decoding="async">

## Arithmetic operators

<img src="/apuntes/python-automatizacion/arithmetics-operators.webp" alt="Arithmetics operators" width="3043" height="1567" loading="lazy" decoding="async">

```python
>>> a = 4
>>> b = 3
>>> +a
4
>>> -b
-3
>>> a + b
7
>>> a - b
1
>>> a * b
12
>>> a / b
1.3333333333333333
>>> a % b
1
>>> a ** b
64
```

## Assignment operators

<img src="/apuntes/python-automatizacion/assignment-operators.webp" alt="Assignment operators" width="1911" height="1430" loading="lazy" decoding="async">

```python
>>> a = 4
>>> b = 3
>>> a += b  
>>> print(a)
7
```

## Comparison operators: True or False

<img src="/apuntes/python-automatizacion/comparison-operators.webp" alt="Comparison operators" width="2997" height="1122" loading="lazy" decoding="async">

```python
>>> a = 4
>>> b = 3
>>> a != b
True
>>> a == b
False
>>> a > b
True
>>> a < b
False

>>> a >= b
True
>>> a <= b
False
```

## Membership operations

<img src="/apuntes/python-automatizacion/membership-operators.webp" alt="Membership operators" width="3043" height="673" loading="lazy" decoding="async">

```python
>>> s = 'Hello, world!'
>>> 'world' in s
True
```

## Identify operators

<img src="/apuntes/python-automatizacion/identity-operators.webp" alt="Identity operators" width="3043" height="682" loading="lazy" decoding="async">

Identity operators are used to compare the objects if both the objects are actually of the same data type and share the same memory location.

```python
>>> x = 1000  # int is immutable type
>>> y = 1000
>>> x == y
True
>>> x is y
False
>>> id(x), id(y)
(4461203152, 4461203216)
```
