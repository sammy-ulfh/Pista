---
curso: "hacking-etico-explotacion"
modulo: "hacking-etico-explotacion/burp-suite"
leccion: "introduccion-a-burp-suite"
titulo: "Introducción a Burp Suite"
orden: 20
minutos: 6.1
idioma: "es"
riesgo: "medio"
fuente: "notes-tecnologia"
imagenes: 9
ejercicios: []
---

**Burpsuite** es una herramienta de prueba de penetración utilizada para encontrar vulnerabilidades de seguridad en aplicaciones web. Es una de las herramientas de penetración más populares y utilizadas en la industria de la seguridad informática. Burpsuite se compone de varias herramientas diferentes que se pueden utilizar juntas para identificar vulnerabilidades en una aplicación web.

Las principales herramientas que componen a Burpsuite son las siguientes:

- __Proxy__: Es la herramienta principal de Burpsuite y actúa como un intermediario entre el navegador web y el servidor web. Esto permite a los usuarios interceptar las solicitudes y respuestas HTTP y HTTPS enviadas entre el navegador y el servidor. El proxy también es útil para la identificación de vulnerabilidades, ya que permite a los usuarios examinar el tráfico y analizar las solicitudes y respuestas.
- __Scanner__: Es una herramienta de prueba de vulnerabilidades automatizada que se utiliza para identificar vulnerabilidades en aplicaciones web. El scanner utiliza técnicas de exploración avanzadas para detectar vulnerabilidades en la aplicación web, como inyecciones SQL, cross-site scripting (XSS), vulnerabilidades de seguridad de la capa de aplicación (OWASP TOP 10) y más.
- __Repeater__: Es una herramienta que permite a los usuarios reenviar y repetir solicitudes HTTP y HTTPS. Esto es útil para probar diferentes entradas y verificar la respuesta del servidor. También es útil para la identificación de vulnerabilidades, ya que permite a los usuarios probar diferentes valores y detectar respuestas inesperadas.
- __Intruder__: Es una herramienta que se utiliza para automatizar ataques de fuerza bruta. Los usuarios pueden definir diferentes payloads para diferentes partes de la solicitud, como la URL, el cuerpo de la solicitud y las cabeceras. Posteriormente, el intruder automatiza la ejecución de las solicitudes utilizando diferentes payloads y los usuarios pueden examinar las respuestas para identificar vulnerabilidades.
- __Comparer__: Es una herramienta que se utiliza para comparar dos solicitudes HTTP o HTTPS. Esto es útil para detectar diferencias entre las solicitudes y respuestas y analizar la seguridad de la aplicación.

Se trata de una herramienta extremadamente potente, la cual se utiliza para identificar una gran variedad de vulnerabilidades de seguridad en una aplicación web. Al utilizar las diferentes herramientas que son parte de Burpsuite, los usuarios pueden identificar vulnerabilidades de forma automatizada o manual, según sus necesidades. Esto permite a los usuarios encontrar vulnerabilidades y corregirlas antes de que sean explotadas por un atacante.

En resumen, Burpsuite es una herramienta imprescindible para cualquier profesional de la seguridad informática que busque asegurar la seguridad de aplicaciones web.

## Práctica

### Despliegue y configuración

Para la parte práctica se utilizará el siguiente proyecto que se tendrá que desplegar con Docker Compose: [SQL Training App](https://github.com/appsecco/sqlinjection-training-app)

Una vez desplegado, recordemos reiniciar la base de datos con el botón al inicio de la web. Esta web será la que utilizaremos para ver las funcionalidades dentro de Burpsuite. Dentro de nuestro navegador, nos iremos a la parte de **multiple exercises** en la web.

<img src="/apuntes/hacking-etico-explotacion/burpsuite-001.webp" alt="Captura de los apuntes" width="1055" height="448" decoding="async">

Esto nos llevará a un panel de login. Aquí es donde ya podremos abrir burpsuite para empezar a visualizar lo que podemos realizar con el mismo. Al abrirlo, nos saltan opciones que tenemos que responder; bastará con darle a siguiente o aceptar lo que nos aparezca.

Una vez realizado, veremos el panel general de Burpsuite:

<img src="/apuntes/hacking-etico-explotacion/burpsuite-002.webp" alt="Captura de los apuntes" width="1896" height="1001" loading="lazy" decoding="async">

Si nos vamos a Proxy y opciones, veremos cómo el proxy está automáticamente seteado para funcionar en localhost en el puerto 8080. De esta manera se permite que las peticiones pasen por burpsuite como intermediario.

<img src="/apuntes/hacking-etico-explotacion/burpsuite-003.webp" alt="Captura de los apuntes" width="1901" height="319" loading="lazy" decoding="async">

Para que las peticiones de nuestro navegador pasen por el proxy de Burpsuite, tendremos que utilizar una extensión en nuestro navegador que nos permita redirigir el tráfico. En este caso, la extensión que nos sirve perfectamente es FoxyProxy.

<img src="/apuntes/hacking-etico-explotacion/burpsuite-004.webp" alt="Captura de los apuntes" width="1890" height="587" loading="lazy" decoding="async">

Para configurar un proxy, seleccionaremos la extensión que hemos agregado, nos iremos a opciones y después a proxies, dándole a "ADD" para agregar uno nuevo.

<img src="/apuntes/hacking-etico-explotacion/burpsuite-005.webp" alt="Captura de los apuntes" width="1234" height="537" loading="lazy" decoding="async">

Agregamos el localhost "127.0.0.1" y el puerto donde estará en escucha el proxy de burpsuite, que en este caso es el puerto 8080.

Al guardarlo, podremos utilizarlo seleccionando nuestra extensión y seleccionando el proxy que hemos agregado para que redirija el tráfico hacia este.

<img src="/apuntes/hacking-etico-explotacion/burpsuite-006.webp" alt="Captura de los apuntes" width="819" height="478" loading="lazy" decoding="async">

Una vez habilitado, es posible que tengamos problemas con el certificado de confianza del proxy, es por ello que nos iremos a [Burp Web CA](http://burp/) y le daremos al botón de CA CERTIFICATE para descargar el certificado.

Una vez descargado, tendremos que irnos a la configuración del navegador > certificados. Aquí tendremos que agregar este que hemos descargado: "view certificates".

<img src="/apuntes/hacking-etico-explotacion/burpsuite-009.webp" alt="Captura de los apuntes" width="1141" height="490" loading="lazy" decoding="async">

Aquí iremos al apartado Authorities, le daremos a **import** y seleccionaremos el certificado descargado.

<img src="/apuntes/hacking-etico-explotacion/burpsuite-010.webp" alt="Captura de los apuntes" width="1676" height="806" loading="lazy" decoding="async">

Finalmente, le damos a OK en ambas ventanas para almacenarlo. Aquí, al encender el proxy, empezaremos a recibir las peticiones del navegador y estas estarán en espera hasta que las redireccionemos o las desechemos.

<img src="/apuntes/hacking-etico-explotacion/burpsuite-011.webp" alt="Captura de los apuntes" width="1896" height="1001" loading="lazy" decoding="async">

Es posible que, aunque la configuración esté correctamente realizada en el navegador, tengamos problemas y el tráfico de la página que tenemos desplegada con Docker no pase por BurpSuite. En dado caso, lo mejor será utilizar otro navegador o, para mayor seguridad, el navegador que tiene el propio burpsuite, que además ya viene configurado.
### Apartados de Burpsuite

- [Proxy](/cursos/hacking-etico-explotacion/proxy)
- [Intruder](/cursos/hacking-etico-explotacion/intruder)
- [Repeater](/cursos/hacking-etico-explotacion/repeater)
- [Decoder](/cursos/hacking-etico-explotacion/decoder)
- [Comparer](/cursos/hacking-etico-explotacion/comparer)
- [Extensions](/cursos/hacking-etico-explotacion/extensiones)
