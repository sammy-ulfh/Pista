---
curso: "hacking-etico-explotacion"
modulo: "hacking-etico-explotacion/burp-suite"
leccion: "decoder"
titulo: "Decoder"
orden: 25
minutos: 0.8
idioma: "es"
riesgo: "medio"
fuente: "notes-tecnologia"
imagenes: 2
ejercicios: []
---

## Práctica

El decoder nos sirve para decodificar textos que estén codificados; por ejemplo, si utilizamos el texto URL encodeado, Burp Suite nos permitirá seleccionar este tipo de codificación para decodificarlo en esta herramienta y ver cómo realmente es el texto:

<img src="/apuntes/hacking-etico-explotacion/burpsuite-028.webp" alt="Captura de los apuntes" width="1879" height="329" decoding="async">

Lo mismo aplica para mensajes codificados, por ejemplo, en base 64:

```shell
echo "Hola mundo, soy hacker" | base64
> SG9sYSBtdW5kbywgc295IGhhY2tlcgo=
```

Si esto lo ponemos en nuestro decoder y seleccionamos base64, veremos cómo nos da el mensaje que codificamos:

<img src="/apuntes/hacking-etico-explotacion/burpsuite-029.webp" alt="Captura de los apuntes" width="1892" height="333" loading="lazy" decoding="async">

- [Intruder](/cursos/hacking-etico-explotacion/intruder)
