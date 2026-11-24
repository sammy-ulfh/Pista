---
curso: "hacking-etico-reconocimiento"
modulo: "hacking-etico-reconocimiento/escaneo-de-red"
leccion: "scripts-de-nmap"
titulo: "Scripts de Nmap"
orden: 4
minutos: 13.2
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 20
ejercicios: []
---

Una de las características más poderosas de Nmap es su capacidad de automatizar tareas utilizando scripts personalizados. Los scripts de Nmap permiten a los profesionales de seguridad automatizar el reconocimiento y descubrimiento en la red, además de obtener información valiosa sobre los sistemas y servicios que se están ejecutando en ellos. El parámetro **\-script** de Nmap permite al usuario seleccionar un conjunto de scripts para ejecutar en un objetivo de escaneo específico.

Existen diferentes categorías de scripts disponibles en Nmap, cada una diseñada para realizar una tarea específica. Algunas de las categorías más comunes incluyen:

- **default**: Esta es la categoría predeterminada en Nmap, que incluye una gran cantidad de scripts de reconocimiento básicos y útiles para la mayoría de escaneos.
- **discovery:** Esta categoría se enfoca en descubrir información sobre la red, como la detección de hosts y dispositivos activos, y la resolución de nombres de dominio.
- **safe:** Esta categoría incluye scripts que son considerados seguros y que no realizan actividades invasivas que pueden desencadenar una alerta de seguridad en la red.
- **intrusive:** Esta categoría incluye scripts más invasivos que pueden ser detectados más fácilmente por un sistema de detección de intrusos o un Firewall, pero que pueden proporcionar información valiosa sobre vulnerabilidades y debilidades en la red.
- **vuln:** Esta categoría se enfoca específicamente en la detección de vulnerabilidades y debilidades en los sistemas y servicios que se están ejecutando en la red.

Con ello, sabremos que el uso de scripts y categorías en Nmap es una forma de automatizar tareas de reconocimiento y descubrimiento en la red. El parámetro **\-script** permite al usuario seleccionar un conjunto de scripts personalizados para ejecutar en un objetivo de escaneo específico, mientras que las disponibles categorías en Nmap se enfocan en realizar tareas específicas para obtener información valiosa sobre la red.

## Práctica

### scripts

Nmap cuenta con diversos scripts, los cuales se encuentran programados en el lenguaje multiparadigma **Lua**. Si instalamos **locate** podremos buscar estos scripts:

```shell
locate .nse
```

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-001.webp" alt="Captura de los apuntes" width="805" height="704" decoding="async">

Para Nmap tenemos el parámetro **-sV** para mostrar las versiones de los servicios que se encuentran corriendo. También tenemos el parámetro **-sC** el cual empleará distintos scripts, los cuales son los más usuales para tratar de recopilar la mayor información posible. 

Estos parámetros los podremos emplear por separado o incluso juntos con **-sCV**. Si efectuamos un escaneo de esta manera a nuestro router, veremos cómo nos dará más información:

```shell
nmap -p23 192.168.100.1 -sCV
```

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-002.webp" alt="Captura de los apuntes" width="985" height="265" loading="lazy" decoding="async">

En este caso no nos ha reportado algo importante. Esto se debe a que de los scripts que ha podido lanzar, ninguno de ellos ha encontrado alguna vulnerabilidad, pero de cara a otros puertos podrá llegar a encontrar cosas interesantes.

Algunos de los scripts que Nmap suele lanzar cuando realizamos el escaneo de esta manera, son el **ftp-anon.nse** que para auditar un FTP en ocasiones está habilitado el usuario anónimo y nos permite conectarnos sin proporcionar credenciales, por lo tanto, esto nos lo reportaría para tenerlo en cuenta o el **http-robots.txt.nse** verifica la existencia de **/robots.txt** y con ello ya te reporta las rutas existentes sin necesidad de tener que emplear un ataque de fuerza bruta. 

Todos estos son scripts visibles y están programados en Lua. Si nosotros quisiéramos ver si estructura podríamos y esta se ve de la siguiente manera:

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-003.webp" alt="Captura de los apuntes" width="926" height="748" loading="lazy" decoding="async">

Estos scripts usualmente suelen tener un apartado de descripción, uno de reglas y uno de acción. Más adelante, nos montaremos un pequeño script en Lua para Nmap el cual sea simple, pero que nos permita entender la estructura y sintaxis de los mismos. 

Con **-sC** lanzamos un conjunto de scripts comunes, pero con **--script** podremos indicar cuáles scripts queremos lanzar. Antes de ver esto más a fondo, primero tendremos que ver los scripts y sus categorías, ya que cada script podrá encontrarse dentro de una categoría. 

Si nosotros con locate encontramos todos estos scripts y le agregamos un filtro con grep el cual sea "categories".

```shell
locate .nse | xargs grep "categories"
```

Esto nos mostrará la línea de cada uno de los scripts donde se les asigna la categoría, existen varias y por ende podríamos agregarle una expresión regular que únicamente nos muestre lo que tenga contenido dentro de comillas dobles, ya que así se muestran las categorias.

```shell
locate .nse | xargs grep "categories" | grep -oP '".*?"'
```

De esta manera, nos mostrará únicamente las categorías. Ahora veremos muchísimas líneas e incluso habrá muchas repetidas. Para verlas sin tener repetidas, tendremos que aplicar un ordenamiento con **sort** e indicar que nos muestre los elementos únicos con la flag **-u**:

```shell
locate .nse | xargs grep "categories" | grep -oP '".*?"' | sort -u
```

De esta manera veremos las categorías únicas y sabremos cuáles existen:

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-004.webp" alt="Captura de los apuntes" width="746" height="369" loading="lazy" decoding="async">

Podríamos ver cuántas categorías tenemos en total si le agregamos **wc -l** al final, ya que esto nos permite contar las líneas de algún archivo u output. 

Como vemos, existen distintas categorías, las cuales cuentan con propósitos distintos e incluso podremos combinarlas para lanzar un escaneo con distintos scripts. Un ejemplo es que podríamos a llegar a lanzar el escaneo con **vuln** para encontrar posibles vulnerabilidades. La cosa es que este es muy intrusivo e incluso podría llegar a complicar las cosas en producción y para evitar esto para que lleve una especie de validaciones, podríamos combinarlo con **safe**. 

Para ver como podremos agregar estos scripts lanzaremos el escaneo a nuestro router con el parámetro **--script** y con un **\=** en una cadena de texto ingresaremos las categorías "vuln and safe" de esta manera se lanzarían ambos, aplicando una serie de validaciones para evitar problemas debido a lo intrusivos que puede llegar a ser por sí solo.

También podremos lanzarlo como "vuln or safe", en este caso lanzará uno u otro, pero en el caso de vuln no se realizará esa serie de validaciones.

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-005.webp" alt="Captura de los apuntes" width="898" height="457" loading="lazy" decoding="async">

Esto ya nos arroja una mayor cantidad de información.

### Ejercicio practico

En un directorio crearemos el directorio **admin** y aquí mismo correremos un servidor http en el puerto 80 con python, siendo usuario root:

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-006.webp" alt="Captura de los apuntes" width="713" height="181" loading="lazy" decoding="async">

Además, una utilidad que tenemos en Linux es **lsof** que mediante el parámetro **-i** podremos indicar un puerto seguido de dos puntos y esto nos dará información de qué servicio se encuentra corriendo en un puerto dado:

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-007.webp" alt="Captura de los apuntes" width="714" height="99" loading="lazy" decoding="async">

Algo más que podremos hacer, tomando el **PID** podremos utilizar el comando **pwdx**. Podremos pasarle el PID y con ello nos dirá en qué ruta del sistema se encuentra corriendo este servicio:

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-008.webp" alt="Captura de los apuntes" width="443" height="64" loading="lazy" decoding="async">

Si abrimos la página en el navegador, veremos lo siguiente:

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-009.webp" alt="Captura de los apuntes" width="656" height="327" loading="lazy" decoding="async">

Como vemos, aquí está el directorio **admin** que hemos creado. Si ahora quisiéramos aplicar una especie de "fuerza bruta" para tartar de encontrar rutas, tendríamos que utilizar el script **http-enum** hacia nuestra propia IP en el puerto 80, este script realiza un ataque de fuerza bruta de una lista de directorios mediante peticiones GET y basándose en el código de estado de la respuesta, sabrá si este es accesible o no. 

Entonces, lo aplicaríamos de la siguiente manera:

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-010.webp" alt="Captura de los apuntes" width="681" height="266" loading="lazy" decoding="async">

Aquí vemos cómo ha encontrado **admin** como un posible directorio. Si vemos la parte en la que tenemos nuestro servidor corriendo, veremos todas las peticiones que fueron hechas:

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-011.webp" alt="Captura de los apuntes" width="1265" height="732" loading="lazy" decoding="async">

Si quisiéramos ver más a detalle esto capturando el tráfico, podríamos utilizar tcpdump para capturar en este caso de nuestra interfaz **loopback** al realizar el escaneo, debido a que lo estamos haciendo con nuestra misma IP, lo cual sería en nuestra propia interfaz local.

```shell
tcpdump -i lo -w Captura.cap -v
```

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-012.webp" alt="Captura de los apuntes" width="1684" height="783" loading="lazy" decoding="async">

**Wireshark** nos sirve perfectamente para visualizar este tráfico, pero también podremos utilizar otra herramienta, la cual es **tshark**. Esta es lo mismo que **Wireshark**, la diferencia es que podremos utilizarlo desde la misma terminal. 

Para abrirlo tendríamos que utilizar el parámetro **-r** y además algo a considerar sería enviar los errores al **DEVNULL**, debido a que, de cara a posibles errores que se puedan generar, pues no visualizarlos.

```shell
tshark -r Captura.cap 2>/dev/null
```

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-013.webp" alt="Captura de los apuntes" width="1678" height="548" loading="lazy" decoding="async">

Esto nos arroja todo lo que ha capturado sin ningún tipo de filtro. En este caso lo que nos interesa es todo el tráfico HTTP y por ende con el parámetro **-Y** y entre comillas indicaríamos el filtro que queremos, en este caso **http**:

```shell
tshark -r Captura.cap -Y "http" 2>/dev/null
```

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-014.webp" alt="Captura de los apuntes" width="1349" height="667" loading="lazy" decoding="async">

De esta manera vemos únicamente este tráfico de solicitudes por HTTP. 

Aquí vemos cómo está tramitando solicitudes por GET que es un tipo de solicitud que solo recibe datos desde el servidor y en este caso la petición la hace para distintas rutas como por ejemplo la penúltima que es hacia la ruta **/sitecore/system/Setting/Security/Profiles**. 

De aquí podríamos filtrar con GREP directamente por las peticiones **GET**:

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-015.webp" alt="Captura de los apuntes" width="1229" height="585" loading="lazy" decoding="async">

Aquí buscaremos quedarnos únicamente con la ruta a la que se intenta acceder. 

Buscaremos ver unicamente estos para poder calcular el tamaño del diccionario que se ha empleado en este caso. Para ello, será mejor obtener toda esta información en formato json con tshark empleando el parámetro **Tjson**:

```shell
tshark -r Captura.cap -Y "http" -Tjson 2>/dev/null
```

De esta manera empezamos a ver todo en este formato y si lo detenemos en algún momento, podremos ver cómo tenemos el atributo **tcp.payload** en hexadecimal:

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-016.webp" alt="Captura de los apuntes" width="1636" height="210" loading="lazy" decoding="async">

En ocasiones también podremos tener **data.data**, pero en este caso no es así. 

Lo de **tcp.payload** al final es información y datos en bruto, solo que tendremos que hacer la reversión de hexadecimal para verlo todo claramente.

Filtraríamos por **tcp.payload**, quitando el parámetro **Tjson** y en su lugar utilizando **Tfields** agregando la opción **-e** para pasarle el nombre del elemento porque queremos filtrar:

```shell
tshark -r Captura.cap -Y "http" -Tfields -e tcp.payload 2>/dev/null
```

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-017.webp" alt="Captura de los apuntes" width="1677" height="468" loading="lazy" decoding="async">

Todo esto estará representado en hexadecimal, pero está de una forma en la que fácilmente podemos revertir esto para verlo de forma clara.

```shell
tshark -r Captura.cap -Y "http" -Tfields -e tcp.payload 2>/dev/null | xxd -ps -r
```

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-018.webp" alt="Captura de los apuntes" width="1466" height="536" loading="lazy" decoding="async">

Esto nos arroja una gran cantidad de información. Para ver lo que nos interesa, en este caso tendremos que filtrar de nuevo por las peticiones **GET** únicamente:

```shell
tshark -r Captura.cap -Y "http" -Tfields -e tcp.payload | xxd -ps -r | grep "GET"
```

<img src="/apuntes/hacking-etico-reconocimiento/scriptsnmap-019.webp" alt="Captura de los apuntes" width="1092" height="630" loading="lazy" decoding="async">

Finalmente, filtraríamos por el segundo argumento con awk y ya con esto podríamos utilizar **wc -l** para ver la cantidad de directorios que se han probado:

```shell
tshark -r Captura.cap -Y "http" -Tfields -e tcp.payload 2>/dev/null | xxd -ps -r | grep "GET" | awk '{print $2}' | wc -l
```

Si queremos asegurarnos de no tener repeticiones, podríamos agregar un sort con el parámetro -u antes del wc y así veríamos realmente los directorios únicos probados:

<img src="/apuntes/hacking-etico-reconocimiento/020.webp" alt="Captura de los apuntes" width="1392" height="126" loading="lazy" decoding="async">

Con esto ya podríamos ver de distinta forma la información que es recibida o, en el caso de distintos tipos de peticiones como POST, enfocarnos en ellas y llegar a ver los datos enviados por el usuario a través de esta petición. 

Nmap tiene muchísimos scripts y ya será cuestión de que conozcas por tu cuenta diversos scripts para que, con base en lo que requieras, puedas emplear uno u otro.
