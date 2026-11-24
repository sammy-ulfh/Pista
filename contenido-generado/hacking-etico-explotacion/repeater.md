---
curso: "hacking-etico-explotacion"
modulo: "hacking-etico-explotacion/burp-suite"
leccion: "repeater"
titulo: "Repeater"
orden: 24
minutos: 1.7
idioma: "es"
riesgo: "medio"
fuente: "notes-tecnologia"
imagenes: 5
ejercicios: []
---

## Práctica

Con la petición en el repeater, si la enviamos y vemos la respuesta, veremos que regresa un código de estado 302, el cual es una redirección.

<img src="/apuntes/hacking-etico-explotacion/burpsuite-036.webp" alt="Captura de los apuntes" width="1218" height="832" decoding="async">

<img src="/apuntes/hacking-etico-explotacion/burpsuite-037.webp" alt="Captura de los apuntes" width="1499" height="777" loading="lazy" decoding="async">

Aquí lo interesante es que además tenemos el botón de **follow redirection,** el cual nos permitirá seguir la redirección que se aplica en la petición.

<img src="/apuntes/hacking-etico-explotacion/burpsuite-038.webp" alt="Captura de los apuntes" width="1511" height="409" loading="lazy" decoding="async">

Esto ya nos traería la respuesta al estar logueados y, si renderizamos, lo veríamos correctamente.

Si vemos tal cual las peticiones, veremos cómo nos redirecciona de /login a /products:

<img src="/apuntes/hacking-etico-explotacion/burpsuite-039.webp" alt="Captura de los apuntes" width="1267" height="343" loading="lazy" decoding="async">

Cuando ya realizamos diversas peticiones para ver cómo nos está respondiendo el servidor, en el Intruder tenemos las flechitas que nos permiten movernos entre estas peticiones, y la flechita hacia abajo nos permite ver un histórico de las que se han realizado desde esta petición enviada al Repeater:
<img src="/apuntes/hacking-etico-explotacion/burpsuite-040.webp" alt="Captura de los apuntes" width="584" height="212" loading="lazy" decoding="async">

Ahora podremos regresar a ver el [Intruder](/cursos/hacking-etico-explotacion/intruder) en el __pitchfork__ attack.
