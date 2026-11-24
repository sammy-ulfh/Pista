---
curso: "python-ofensivo-laboratorio"
modulo: "python-ofensivo-laboratorio/interceptar-trafico"
leccion: "rastrear-trafico-http"
titulo: "Rastrear tráfico HTTP"
orden: 3
minutos: 9.6
idioma: "es"
riesgo: "alto"
fuente: "notes-tecnologia"
imagenes: 20
ejercicios: []
---

Un HTTP Sniffer es una herramienta ofensiva crucial para interceptar y analizar el tráfico HTTP de una red, lo que permite revelar información crítica como cabeceras HTTP, URL's solicitadas, y posiblemente datos de formularios y cookies. Estos datos son esenciales para comprender la comunicación entre clientes y servidores web, y pueden ser explotados para varios tipos de ataques, incluyendo la inyección de código, el secuestro de sesiones y la recopilación de información sensible.

## Practica

Puede ser que nos preguntemos como es que fue posible interceptar en texto claro el nombre de los dominios con nuestro DNS Sniffer si a día de hoy todo viaja cifrado por HTTPS, y si es así, pero en el caso de las consultas DNS es un poco distinto, ya que al realizar la solicitud el nombre del dominio viaja en texto claro, es por ello que podemos interceptarlo fácilmente. 

Sería muy distinto que una página tuviese un formulario de autenticación y tratar de obtener esas credenciales, es más complicado al ir cifrado por HTTPS, pero existen formas de intentar obtenerlas. También al intentar ver sobre una ruta específica de un dominio, podemos llegar a interceptarlo, pero al ir cifrado solo tendremos datos no legibles. 

Para entender el concepto primero trabajaremos sobre consultas HTTP creando un HTTP Sniffer interceptando el tráfico, tratando de interceptar credenciales, entre otros datos. 

Trabajaremos con una web de ejemplo, la cual es [acunetix](http://testphp.vulnweb.com/login.php):

<img src="/apuntes/python-ofensivo-laboratorio/http-sniffer-001.webp" alt="Captura de los apuntes" width="784" height="603" decoding="async">

Comenzaríamos creando nuestro script **http_sniffer.py** el cual trabajará con nuestra interfaz de red, prácticamente el mismo concepto de nuestro dns_sniffer:

<img src="/apuntes/python-ofensivo-laboratorio/http-sniffer-002.webp" alt="Captura de los apuntes" width="350" height="267" loading="lazy" decoding="async">

En este caso, el sniff se hace directamente con la interfaz de red, pero también tenemos que darle más argumentos dependiendo de lo que vayamos a realizar. A nivel de filtro, no coloraremos nada para recibir todo el tráfico, pero lo vamos a filtrar mediante condicionales al tratar cada paquete, lo cual indicábamos con **prn** para darle una función a ejecutar con cada paquete. Además, indicaremos a nivel de **store** el valor de 0, para que no nos almacene nada en memoria y todo se trabaje al momento en el que se reciba.

<img src="/apuntes/python-ofensivo-laboratorio/http-sniffer-003.webp" alt="Captura de los apuntes" width="633" height="322" loading="lazy" decoding="async">

Si aquí imprimiéramos el paquete directamente, al correr el envenenamiento ARP y después nuestro http sniffer, veremos cómo recibimos todo tipo de paquetes, TCP, UDP, trazas ICMP, ARP, entre otras. 

Para enfocarnos solamente en el tráfico HTTP, tendremos que importar la utilidad **http** desde **scapy.layers** y con ello, ahora utilizando el método **haslayer** de nuestro paquete, podremos verificar si es HTTP con ***http.HTTPRequest**:

<img src="/apuntes/python-ofensivo-laboratorio/http-sniffer-004.webp" alt="Captura de los apuntes" width="627" height="378" loading="lazy" decoding="async">

De esta forma ya solo mostraríamos los paquetes HTTP, por lo tanto, ahora si corremos primero nuestro envenenador ARP y después nuestro http sniffer para capturar las peticiones con la página que tenemos de prueba, al ingresar a la página veremos una solicitud:

<img src="/apuntes/python-ofensivo-laboratorio/http-sniffer-005.webp" alt="Captura de los apuntes" width="1831" height="346" loading="lazy" decoding="async">

Imaginemos que queremos interceptar las credenciales para este caso. Para ello, primero veremos toda la información del paquete, más a fondo, por ello le aplicaremos un **show()** para ver toda la información. Al hacerlo y volver a correr nuestro sniffer, veremos que, en efecto, tiene una capa HTTP y que se realizó una petición POST al enviar las credenciales:

<img src="/apuntes/python-ofensivo-laboratorio/http-sniffer-007.webp" alt="Captura de los apuntes" width="693" height="197" loading="lazy" decoding="async">

Vemos cómo se envía una petición post y, en este caso, al ser una petición en el login, es la que envía las credenciales. Usualmente en una petición post está la capa **raw** la cual contiene un **load** con los datos que se envían desde el cliente. En este caso, si nos vamos al final de la solicitud, podremos verlo:

<img src="/apuntes/python-ofensivo-laboratorio/http-sniffer-008.webp" alt="Captura de los apuntes" width="561" height="95" loading="lazy" decoding="async">

Con ello, ahora en nuestro script podremos filtrar nuevamente con **haslayer** mediante un condicional. Para ahora mostrar únicamente los paquetes que contengan datos enviados a través de peticiones POST, como la capa que contiene los datos es **Raw** utilizaremos **scapy.Raw**:

<img src="/apuntes/python-ofensivo-laboratorio/http-sniffer-009.webp" alt="Captura de los apuntes" width="419" height="97" loading="lazy" decoding="async">

Con ello, ahora solo estamos mostrando aquellos paquetes HTTP y que además tengan la capa Raw, la cual se encuentra cuando se envían datos por una petición POST. 

Con ello ya podremos extraer el **load** de nuestra capa **Raw** tal como lo hicimos con nuestro DNS Sniffer, indicando la capa entre corchetes, después el atributo **load** y finalmente aplicando un decode, ya que, recordemos que recibimos los bytes:

<img src="/apuntes/python-ofensivo-laboratorio/http-sniffer-010.webp" alt="Captura de los apuntes" width="514" height="109" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/http-sniffer-011.webp" alt="Captura de los apuntes" width="369" height="101" loading="lazy" decoding="async">

La propia web hace la petición dos veces, es por ello que vemos la información repetida al enviar nuestras credenciales. 

En una web se pueden enviar muchísimos datos por POST, por lo que realmente ahora no sabemos cuándo se estén enviando únicamente credenciales. Para hacer un filtro extra para quedarnos únicamente con posibles credenciales, utilizaremos una lista de posibles credenciales, ya que, usualmente, donde se almacenan estas credenciales suelen ser variables clave como **user**, **username**, **login**, **pass**, **password**:

<img src="/apuntes/python-ofensivo-laboratorio/http-sniffer-012.webp" alt="Captura de los apuntes" width="709" height="232" loading="lazy" decoding="async">

De esta manera, almacenamos la respuesta y con **any** realizamos la verificación de que alguna de las palabras clave que hemos definido se encuentren en la respuesta, de ser así, es posible que sean credenciales y con ello mostramos únicamente aquello que potencialmente pueden ser credenciales. 

Cuando se trata con paquetes, se pueden llegar a generar errores en ciertas ocasiones. Es por ello que sería mejor trabajar todo esto dentro de una excepción general que, en caso de que suceda, solo la ignore, para evitar que nuestro programa llegue a petar:

<img src="/apuntes/python-ofensivo-laboratorio/http-sniffer-013.webp" alt="Captura de los apuntes" width="749" height="287" loading="lazy" decoding="async">

Ahora buscaremos también mostrar el url y path visitado por la víctima, es por ello que, después de verificar que el paquete tenga la capa HTTP Request, vamos a mostrarlo para ver de dónde podríamos extraer estos datos:

<img src="/apuntes/python-ofensivo-laboratorio/http-sniffer-014.webp" alt="Captura de los apuntes" width="444" height="93" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/http-sniffer-015.webp" alt="Captura de los apuntes" width="605" height="606" loading="lazy" decoding="async">

De esta forma, si visitamos nuevamente desde la máquina víctima la página, veremos cómo en la petición podremos ver el **path** de la ruta a la que accede y, además, en **Host** tendríamos la página a la que está accediendo. Teniendo esto en cuenta, podríamos recuperar **Host** y **path** de la capa HTTPRequest y nosotros al principio agregar el **http://**, ya que sabemos que únicamente estamos capturando peticiones HTTP.

<img src="/apuntes/python-ofensivo-laboratorio/016.webp" alt="Captura de los apuntes" width="1072" height="344" loading="lazy" decoding="async">

De esta forma construimos la URL recuperando el host y el path y lo imprimimos en pantalla:

<img src="/apuntes/python-ofensivo-laboratorio/017.webp" alt="Captura de los apuntes" width="762" height="197" loading="lazy" decoding="async">

De esta forma ya estamos capturando las páginas visitadas, lo vemos dos veces porque la propia web realiza la solicitud dos veces. 

También podemos ahora loguearnos, ya que la web brinda credenciales válidas que son **test** en ambas partes y con ello nos loguearíamos y además podríamos estar interceptándolos:

<img src="/apuntes/python-ofensivo-laboratorio/018.webp" alt="Captura de los apuntes" width="759" height="157" loading="lazy" decoding="async">

Con ello vemos cómo ahora la víctima se encuentra en la página userinfo.php, dentro de esta tenemos un formulario que, si enviamos, no estamos interceptando:

<img src="/apuntes/python-ofensivo-laboratorio/019.webp" alt="Captura de los apuntes" width="405" height="278" loading="lazy" decoding="async">

El no interceptarlo se debe a que en nuestras palabras clave no tenemos algo que haga referencia a los datos que son enviados, pero si agregamos algo como **mail** para que intercepte si hay algún correo, veremos cómo ahora lo estaríamos interceptando:

<img src="/apuntes/python-ofensivo-laboratorio/020.webp" alt="Captura de los apuntes" width="560" height="99" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/021.webp" alt="Captura de los apuntes" width="916" height="231" loading="lazy" decoding="async">

Ahora lo interceptamos, esto se debe a que tenemos el campo **uemail**, pero al final, como la palabra mail se encuentra, pues lo interceptamos.
