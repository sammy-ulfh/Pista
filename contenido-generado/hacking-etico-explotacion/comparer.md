---
curso: "hacking-etico-explotacion"
modulo: "hacking-etico-explotacion/burp-suite"
leccion: "comparer"
titulo: "Comparer"
orden: 23
minutos: 1.3
idioma: "es"
riesgo: "medio"
fuente: "notes-tecnologia"
imagenes: 3
ejercicios: []
---

## Práctica

Para el comparer, podríamos irnos a nuestro target y del site map buscar dos peticiones distintas.

Un ejemplo sería el del **index.php** y el del **login.php**. Seleccionamos primero una, le damos clic derecho y la enviamos al comprarer; hacemos lo mismo con la segunda.

<img src="/apuntes/hacking-etico-explotacion/burpsuite-041.webp" alt="Captura de los apuntes" width="632" height="637" decoding="async">

En el comparer lo veremos de la siguiente manera:

<img src="/apuntes/hacking-etico-explotacion/042.webp" alt="Captura de los apuntes" width="1884" height="591" loading="lazy" decoding="async">

Esto nos permite, en la parte inferior, hacer una comparativa, ya sea por **bytes** o por **words**. En este caso haremos la comparación por palabras (words) y veremos lo siguiente.

<img src="/apuntes/hacking-etico-explotacion/043.webp" alt="Captura de los apuntes" width="904" height="514" loading="lazy" decoding="async">

En este caso, las diferencias entre peticiones se marcan en colores:

- Azul: Para valores que hayan sido modificados entre una petición u otra.
- Rojo: Valores que hayan sido eliminados de una petición a otra.
- Verde: Valores nuevos que hayan sido agregados entre una petición u otra.
### Extensions

- [Extensions](/cursos/hacking-etico-explotacion/extensiones)
