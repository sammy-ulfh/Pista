---
curso: "python-automatizacion"
modulo: "python-automatizacion/panorama"
leccion: "datos-mutables-e-inmutables"
titulo: "Datos mutables e inmutables"
orden: 10
minutos: 2.5
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 4
ejercicios: []
---

In syntax and code descriptions, **square brackets** (**[ ]**) are used for notational purposes only. To avoid syntax errors, do not include them when entering a command or writing code.

Square brackets indicate **optional parts** of a statement. They should not be entered.

In many cases, items in the square brackets are optional because default values are provided.

__Multiline assignments__

```python
a = b = c = 1
a, b, c = 1, 2, "john"
```

__Deleting variables__

`del var1[, var2[, var3[...., varN]]] # syntax description`

Example:

```python
a = 1  
b = 2  
c = "Hello"  
del a  
del b, c  
print(a) # NameError: name is not defined
```

__Type conversion__

- `int(x [,base])` - returns an integer object constructed from a number or string
- `float(x)` - returns a floating-point object constructed from a number or string
- `str(x)` - returns a string version of an object

## Immutable vs Mutable

All the data in a Python code is represented by objects or by relations between objects. Every object has an **identity**, a **type**, and a **value**.

__Identify__

An object’s identity never changes once it has been created; you may think of it as the object’s address in memory. The is operator compares the identity of two objects; the **id()** function returns an integer representing its identity.

__Type__

An object’s type defines the possible values and operations (e.g. “does it have a length?”) that type supports. The `type()` function returns the type of an object. An object type is unchangeable like the identity.

__Value__

The value of some objects can change. Objects whose value can change are said to be mutable; objects whose value is unchangeable once they are created are called immutable.

The mutability of an object is determined by its type.

**Immutable**: int, float, string, tuple

```python
x = 'foo'
y = x
print(x) # foo
```

<img src="/apuntes/python-automatizacion/mutable1.webp" alt="Mutable1" width="302" height="134" decoding="async">

```python
y += 'bar'
print(x) # foo
```

<img src="/apuntes/python-automatizacion/mutable2.webp" alt="Mutable2" width="340" height="138" loading="lazy" decoding="async">

**Mutable**: list, dict, object, set

```python
x = [1, 2, 3]
y = x
print(x) # [1, 2, 3]
```

<img src="/apuntes/python-automatizacion/mutable3.webp" alt="Mutable3" width="392" height="293" loading="lazy" decoding="async">

```python
y += [3, 2, 1]
print(x) # [1, 2, 3, 3, 2, 1]
```

<img src="/apuntes/python-automatizacion/mutable4.webp" alt="Mutable4" width="542" height="304" loading="lazy" decoding="async">

Use [https://pythontutor.com/](https://pythontutor.com/) to visualize the memory usage of your code.
