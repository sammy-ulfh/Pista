---
curso: "python-ofensivo-laboratorio"
modulo: "python-ofensivo-laboratorio/interceptar-trafico"
leccion: "rastrear-consultas-dns"
titulo: "Rastrear consultas DNS"
orden: 2
minutos: 8
idioma: "es"
riesgo: "alto"
fuente: "notes-tecnologia"
imagenes: 15
ejercicios: []
---

Un DNS Sniffer es una herramienta ofensiva que permite interceptar y analizar las consultas DNS en una red. Estas consultas son esenciales en la comunicación de internet, ya que convierten el nombre de dominio en direcciones IP. 

on Scapy podremos capturar paquetes DNS de forma activa para explorar cómo los dispositivos de una red interactúan con los servidores DNS. Este conocimiento es crucial en el contexto ofensivo, ya que permite identificar objetivos potenciales para ataques y explotar vulnerabilidades en la comunicación DNS.
## Practica

Como trabajaremos con el sniffer será, por un lado, ejecutar el envenenamiento ARP con el ARP Spoofer para poder capturar el tráfico y con nuestro Sniffer vamos a capturar solamente las consultas DNS aplicando un filtro. En Wireshark utilizamos el filtro **dns**, pero también sabemos que las consultas DNS trabajan mediante el protocolo **UDP** y se realizan mediante el puerto **53**, por lo que el filtro que realizaremos en scapy será este mismo (**udp and port 53**). 

Para nuestro **dns_sniffer.py** vamos a hacerlo directamente sin utilizar argparse, en este caso importaremos scapy y guardaremos el nombre de nuestra interfaz en una variable, después utilizaremos **scapy.sniff** para poder ponernos en escuchar, le pasaremos la interfaz con el argumento **iface** y nuestro filtro para upd, lo aplicaremos con el atributo **filter** indicando que el filtro sea **udp and port 53**:

<img src="/apuntes/python-ofensivo-laboratorio/dns-sniffer-001.webp" alt="Captura de los apuntes" width="596" height="222" decoding="async">

Además, nosotros estaremos recibiendo cada paquete y podremos hacer algo con cada uno de ellos. Para procesar los paquetes que vayamos recibiendo, utilizaremos el atributo **prn** con el cual le pasaremos una función que recibirá como argumento el paquete y será ejecutada con cada paquete que sea recibido:

<img src="/apuntes/python-ofensivo-laboratorio/dns-sniffer-002.webp" alt="Captura de los apuntes" width="834" height="189" loading="lazy" decoding="async">

Además, los paquetes se suelen guardar en memoria. En este caso queremos evitar esto y que se haga en el momento que se reciba el paquete la ejecución de la función que definimos para tratar ese paquete, lo que nos ayuda a tener mayor control. 

Para hacerlo de esta manera, agregaremos el argumento **store** y lo igualaremos a cero en nuestro sniff (**scapy.sniff**).

<img src="/apuntes/python-ofensivo-laboratorio/dns-sniffer-003.webp" alt="Captura de los apuntes" width="923" height="306" loading="lazy" decoding="async">

Con esto, al imprimir el paquete, ya podremos visualizarlo y ver el tráfico cuando nuestro spoofer y sniffer estén corriendo:

<img src="/apuntes/python-ofensivo-laboratorio/dns-sniffer-004.webp" alt="Captura de los apuntes" width="876" height="935" loading="lazy" decoding="async">

Con esto ya observamos el tráfico DNS del dispositivo target, pero buscaremos visualizarlo de una mejor manera. 

Para visualizar más a fondo el paquete, utilizaremos el método **show()** para observar de qué forma veremos algunos datos al visitar una página:

<img src="/apuntes/python-ofensivo-laboratorio/dns-sniffer-005.webp" alt="Captura de los apuntes" width="918" height="210" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/dns-sniffer-006.webp" alt="Captura de los apuntes" width="467" height="736" loading="lazy" decoding="async">

Aquí hemos visitado la página hack4u.io en la máquina víctima. Si nos enfocamos en el layer o capa **qd** veremos que es un **DNS Question Record** que, en otras ocasiones, podríamos visualizar como **DNS QR**. Vemos cómo esta tiene el atributo **qname** que contiene el nombre del dominio. Esto es así con todos los paquetes, ya que cada que se realice una resolución DNS existirá una capa DNS Question Record o DNS Query Record y con este campo **qname** podría darnos el nombre del dominio que está visitando nuestra víctima. 

Para ello, en nuestro sniffer, como de primeras, solo nos interesan todos aquellos paquetes que tengan esta capa en la cual se encuentra el nombre del dominio. Nos aseguraremos de que los paquetes con los que vayamos a trabajar tengan la capa de **DNS Question Record**. 

Esto lo haremos con el método **haslayer** del paquete y para indicarle que nos interesa solo aquel que tenga la capa **DNSQR** lo indicaremos a nivel de argumento con el método de scapy **scapy.DNSQR**, de esta forma solo estaríamos entrando al condicional si el paquete tiene la capa **DNSQR**:

<img src="/apuntes/python-ofensivo-laboratorio/dns-sniffer-007.webp" alt="Captura de los apuntes" width="373" height="81" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/dns-sniffer-008.webp" alt="Captura de los apuntes" width="526" height="122" loading="lazy" decoding="async">

En este caso, estamos recuperando el dominio a nivel de la capa **DNSQR** como si de una posición se tratase y extraemos el atributo **qname** que ya es directamente el nombre de dominio. Es necesario aplicarle un **decode** a esto, ya que lo recibimos en formato de bytes y al imprimirlo queremos ver el texto en formato legible:

<img src="/apuntes/python-ofensivo-laboratorio/009.webp" alt="Captura de los apuntes" width="498" height="872" loading="lazy" decoding="async">

Como podremos ver, se repiten algunos dominios, es por ello que en este caso podríamos utilizar **set** en Python, que es algo similar a una lista, pero la diferencia es que un set solo puede almacenar elementos únicos. 

Por ello, en nuestra función principal vamos a definir una variable global **domains_seen** y la definiremos como un **set**.

<img src="/apuntes/python-ofensivo-laboratorio/010.webp" alt="Captura de los apuntes" width="355" height="114" loading="lazy" decoding="async">

Ahora en nuestra función **process_dns_packet** primeramente crearemos una lista de palabras en la cual si alguna hace match con algún dominio, lo descartaríamos, ya que, navegadores o páginas suelen hacer peticiones que no nos pueden interesar, como **google**, **bing**, algunas que tienen por delante cloudflare **cloud** o incluso **static** que se puede llegar a ver en alguna petición para Google Maps o fuentes.

<img src="/apuntes/python-ofensivo-laboratorio/011.webp" alt="Captura de los apuntes" width="653" height="126" loading="lazy" decoding="async">

Ahora iteraremos sobre nuestra lista de palabras que no deberían estar en un dominio que queremos considerar para almacenar y para evitar hacer una comprobación extra, directamente podemos emplear **any**, donde con un único match que llegue a existir de nuestras palabras clave regresará **True**:

<img src="/apuntes/python-ofensivo-laboratorio/012.webp" alt="Captura de los apuntes" width="674" height="184" loading="lazy" decoding="async">

Si no utilizáramos **any**, podríamos emplear una lista de comprensión, donde después se verifique si en algún punto dio **True** o si **True** está dentro de la lista, lo que daría como resultado que el dominio es uno de los que quisiéramos excluir:

<img src="/apuntes/python-ofensivo-laboratorio/013.webp" alt="Captura de los apuntes" width="554" height="750" loading="lazy" decoding="async">

De esta manera, estamos visualizando todos aquellos donde el **any** nos da true con las palabras clave que hemos colocado, por ende tendremos que hacer que nuestra condición tenga un **not** para solo entrar al condicional con todos esos dominios que sí nos interesan. Con ello también agregaremos el dominó a nuestro set con el método **add**:

<img src="/apuntes/python-ofensivo-laboratorio/014.webp" alt="Captura de los apuntes" width="712" height="183" loading="lazy" decoding="async">

Como ya mencionamos, con un **set** solo podremos almacenar valores que no estén dentro de él, por lo que si intentamos incorporar un valor que ya se encuentra en el set nos data error, por ello en nuestro condicional colocaremos la condición **not domain in domains_seen**, con ello dará True si el dominio que interceptemos un no se encuentra en nuestro **set**:

<img src="/apuntes/python-ofensivo-laboratorio/015.webp" alt="Captura de los apuntes" width="1027" height="181" loading="lazy" decoding="async">

Con esto, ahora con print mostrarás todos los dominios sin repetirlos.

### Siguienes apuntes

[Creando un rastreador de consultas HTTP (HTTP Sniffer) con Scapy](/cursos/python-ofensivo-laboratorio/rastrear-trafico-http)
