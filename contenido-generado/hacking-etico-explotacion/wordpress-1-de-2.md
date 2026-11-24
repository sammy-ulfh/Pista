---
curso: "hacking-etico-explotacion"
modulo: "hacking-etico-explotacion/gestores-de-contenido"
leccion: "wordpress-1-de-2"
titulo: "WordPress (1 de 2)"
orden: 7
minutos: 24.9
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 41
ejercicios: []
---

Ahora se abordarán técnicas de enumeración para el gestor de contenido (CMS) __WordPress__. Un gestor de contenido es una herramienta que permite la creación, gestión y publicación de contenidos digitales en la web, como por ejemplo, páginas web, blogs, tiendas en línea, entre otros. 

WordPress es un CMS de código abierto muy popular que fue lanzado en 2003. Es utilizado por millones de sitios web en todo el mundo y se destaca por su facilidad de uso y flexibilidad. Con WordPress los usuarios pueden crear y personalizar sitios web sin necesidad de conocimientos de programación avanzados. Además, cuentan con una amplia variedad de plantillas y plugins que permiten añadir funcionalidades adicionales al sitio.

El proyecto que se utiliza en esta ocasión para enumerar WordPress es el siguiente:
`https://github.com/vavkamil/dvwp`

Una de las herramientas que se verán para enumerar sitios construidos con este gestor de contenido es __Wpscan__. Wpscan es una herramienta de código abierto que se utiliza para escanear sitios web en busca de vulnerabilidades de seguridad en WordPress. 

Con Wpscan podemos realizar una enumeración completa del sitio web y obtener información detallada sobre la instalación de WordPress, como la versión utilizada, los plugins y temas instalados y los usuarios registrados en el sitio. También nos permite realizar pruebas de fuerza bruta para descubrir contraseñas débiles y vulnerabilidades conocidas en plugins y temas.

Wpscan es una herramienta muy útil para los administradores de sitios web que desean mejorar la seguridad de su sitio WordPress, ya que permite identificar y corregir vulnerabilidades antes de que sean explotadas por atacantes malintencionados. Además, es una herramienta fácil de usar y muy efectiva para identificar posibles debilidades de seguridad en nuestro sitio web. 

El uso de esta herramienta es bastante sencillo; la sintaxis básica es la siguiente:
```shell
wpscan --url https://example.com
```

Si se desea enumerar usuarios o plugins vulnerables en WordPress con esta herramienta, se pueden agregar los siguientes comandos:

```shell
wpscan --url https://example.com --enumerate u
```

En caso de querer enumerar plugins existentes, los cuales sean vulnerables, se puede agregar el siguiente parámetro:

```shell
wpscan --url https://example.com --enumerate vp
```

Además, otros de los recursos contemplados es el archivo __xmlrpc.php__. Este archivo es una característica de WordPress que permite la comunicación entre el sitio web y aplicaciones externas utilizando el protocolo __XML-RPC__. 

El archivo __xmlrpc.php__ es utilizado por muchos plugins y aplicaciones móviles de WordPress para interactuar con el sitio web y realizar diversas tareas, como publicar contenido, actualizar el sitio y obtener información.

Sin embargo, este archivo también puede ser abusado por atacantes malintencionados para aplicar __fuerza bruta__ y descubrir __credenciales válidas__ de los usuarios del sitio. Esto se debe a que xmlrpc.php permite a los atacantes realizar un número ilimitado de solicitudes de inicio de sesión sin ser bloqueados, lo que hace que la ejecución de un ataque de fuerza bruta sea relativamente sencillo.
## Practica

En este caso utilizaremos el repositorio anteriormente mencionado para desplegar nuestro entorno con un CMS. Por ello, vamos a primeramente clonarnos el repositorio:

```shell
git clone https://github.com/vavkamil/dvwp.git
```

Una vez tengamos listo esto, entramos en la carpeta __dvwp__. 

Lo siguiente será desplegar el entorno:

```shell
docker-compose up -d --build
```

Cuando lancemos este comando, veremos un concepto muy interesante, y es que con Docker también existen los volúmenes; en este caso se crean dos. Los volúmenes en Docker los podremos ver como un tipo de almacenamiento. 

Si al ejecutar este laboratorio nos metemos al apartado de configuración, creamos diversos usuarios y agregamos diversas configuraciones, una vez que hayamos terminado de prácticas y eliminado las imágenes y contenedores corriendo, pensaremos que ya habrá quedado todo eliminado.

Pero si en algún momento deseamos volver a lanzar este laboratorio, al momento de correr el comando de docker-compose veremos cómo toda la configuración e instalación dentro del contenedor sigue siendo la misma realizada la primera vez que abrimos el proyecto. 

Esto se debe a que los volúmenes son un tipo de persistencia que te ayudan a no borrar todo, incluso si eliminas el contenedor e imagen existente.

<img src="/apuntes/hacking-etico-explotacion/1-2-001.webp" alt="Captura de los apuntes" width="466" height="187" decoding="async">

Para visualizar estos volúmenes creados, podremos utilizar el siguiente comando:

```shell
docker volume ls
```

<img src="/apuntes/hacking-etico-explotacion/1-2-002.webp" alt="Captura de los apuntes" width="247" height="108" loading="lazy" decoding="async">

Es por ello que, si realmente queremos eliminar todo y que cuando volvamos a levantar el laboratorio esté todo totalmente desde cero, como es la construcción del mismo, tendríamos que eliminar estos volúmenes. 

Para nosotros poder eliminar volúmenes con Docker, tendremos que utilizar el comando:

```shell
docker volume rm $(docker volume ls -q)
```

Lo que hace el comando es con rm indicar que se borren los volúmenes en base a un ID dado y justamente `docker volume ls -q`, extrae todos los ID de volúmenes activos. 

Es por ello que es importante considerar esto al momento de borrar todo nuestro laboratorio para no llevarnos una sorpresa de la cual no conocíamos.

Ahora, despues de la ejecucion de nuestro comando que levanta todos los servicios, si verificamos con `docker ps` que es lo que esta corriendo, veremos lo siguiente:

<img src="/apuntes/hacking-etico-explotacion/1-2-003.webp" alt="Captura de los apuntes" width="1342" height="213" loading="lazy" decoding="async">

Tenemos corriendo PHPMYADMIN en el puerto __31338__ y el que puede interesarnos totalmente es el puerto __31337__, ya que es donde se encuentra corriendo nuestro Wordpress. Si ahora lo abrimos en el navegador, veremos lo siguiente:

<img src="/apuntes/hacking-etico-explotacion/1-2-004.webp" alt="Captura de los apuntes" width="1334" height="646" loading="lazy" decoding="async">

Aquí responderemos a todo para crear nuestra configuración para nuestro primer usuario, que será el administrador del CMS.

<img src="/apuntes/hacking-etico-explotacion/1-2-005.webp" alt="Captura de los apuntes" width="769" height="515" loading="lazy" decoding="async">

Con ello listo, será tan fácil como darle a __Install WordPress__, esto nos lo instala y nos lo deja listo para irnos a la página de login:

<img src="/apuntes/hacking-etico-explotacion/1-2-006.webp" alt="Captura de los apuntes" width="597" height="492" loading="lazy" decoding="async">

Al ingresar con las credenciales previstas, veremos cómo entramos al panel de administración de nuestro CMS:

<img src="/apuntes/hacking-etico-explotacion/1-2-007.webp" alt="Captura de los apuntes" width="1341" height="640" loading="lazy" decoding="async">

Dentro de un panel del CMS WordPress, ya se puede directamente instalar plugins, construir páginas, etc. 

En este caso vemos cómo se nos dice que la versión 6.9 está disponible y que la versión que se está empleando es la 5.3. 

Esto es muy importante de considerar, ya que el mismo hecho de que no sea una versión actualizada hace muy posible el hecho de que sea vulnerable a alguna vulnerabilidad existente para ciertas versiones.
#### Enumeración

Como atacantes no tenemos acceso al panel de administración; por ende, lo que se hará es la etapa de enumeración. Para ello tendremos que desloguearnos de nuestro panel de administración. 

Además, cabe aclarar que el panel de login para la administración se encuentra expuesto; por lo tanto, ya es directamente una entrada que lo ideal sería que no estuviese expuesto e incluso desde la ruta principal podremos llegar a verificar si la ruta **wp-admin/** existe.

`https://127.0.0.1:31337/wp-admin/`

En este caso sí existe y el nombre no le fue cambiado. 

Dejando un poco de lado el panel de administración, iremos primeramente a la página principal a ver qué tenemos:

`https://127.0.0.1:31337/`

<img src="/apuntes/hacking-etico-explotacion/1-2-008.webp" alt="Captura de los apuntes" width="1332" height="637" loading="lazy" decoding="async">

En este caso ya tenemos prácticamente todo, pero a nivel de práctica, un entorno real suele tener plugins y cosas instaladas, por lo que llegados a este punto tendremos que correr el siguiente comando para asegurarnos de que tengamos múltiples cosas instaladas:

```shell
docker-compose run --rm wp-cli install-wp
```

<img src="/apuntes/hacking-etico-explotacion/1-2-009.webp" alt="Captura de los apuntes" width="448" height="257" loading="lazy" decoding="async">

Con esto listo, al volver a nuestra página veremos cómo algunas cosas han cambiado:

<img src="/apuntes/hacking-etico-explotacion/1-2-010.webp" alt="Captura de los apuntes" width="1337" height="641" loading="lazy" decoding="async">

En este caso vemos cómo es un tipo de foro para realizar posts; por ende, tenemos cosas interesantes como el irnos a presionar donde dice __By sammy__.

<img src="/apuntes/hacking-etico-explotacion/1-2-011.webp" alt="Captura de los apuntes" width="1328" height="643" loading="lazy" decoding="async">

Esto nos lleva a esta página donde, si podemos observar el autor a nivel de parámetro en la URL, se ve como author=1. Esto puede llegar a ser crítico porque en este caso podremos empezar a intentar cambiar el número 1 por cualquier otro. Cuando lleguemos a alguno no existente, nos arrojará __Page Not Found__.

<img src="/apuntes/hacking-etico-explotacion/1-2-012.webp" alt="Captura de los apuntes" width="1340" height="640" loading="lazy" decoding="async">

Pero es interesante cómo podemos llegar a mostrar el 2, a pesar de no ver algún nombre, lo cual podría ser un indicador de que existe algún otro usuario además del que nosotros creamos.

<img src="/apuntes/hacking-etico-explotacion/1-2-013.webp" alt="Captura de los apuntes" width="1336" height="634" loading="lazy" decoding="async">

De momento podríamos considerar, a manera de que han intentado distintos tipos de ID para un autor dado, que estos son usuarios existentes. Esto es muy interesante, porque a partir de esto nosotros tendríamos una forma de validar si un usuario es correcto o no. 

Considerando ahora mismo __sammy__ como único usuario, podríamos irnos en la web al directorio `wp-admin/` y tratar de realizar un login con este usuario.

<img src="/apuntes/hacking-etico-explotacion/1-2-014.webp" alt="Captura de los apuntes" width="464" height="468" loading="lazy" decoding="async">

Primeramente, si introducimos credenciales inválidas, pues no llegamos a tener nada de información, sin embargo, WordPress puede llegar a tener una consideración importante que puede ser mala, donde si se ingresa el usuario correcto, simplemente te indica que la contraseña para ese usuario es incorrecta:

<img src="/apuntes/hacking-etico-explotacion/1-2-015.webp" alt="Captura de los apuntes" width="471" height="489" loading="lazy" decoding="async">

En este caso, si nosotros como atacantes nos encontramos realizando una etapa de reconocimiento, ahora mismo tendríamos nueva información al respecto, ya que sabríamos que el usuario Sammy existe, solo que por ahora no tenemos su contraseña. 

Por lo tanto, esto en WordPress puede ser malo, al permitir una vía potencial de enumerar usuarios válidos. 

Como atacantes, nosotros tendríamos dos posibles objetivos:

1. Hackear al servidor para ganar acceso a la máquina que aloja y hostea el servicio web.
2. Ganar acceso a la interfaz de administración.

#### Enumeración de usuarios

Además de todo lo visto, para WordPress tenemos formas posibles para la enumeración de usuarios. 

Tenemos una posibilidad de utilizar una herramienta de terminal, la cual es __searchsploit__. Esta se puede tener instalada si se instala el paquete __exploitdb__. 

Esta se conecta directamente con la web de `https://www.exploit-db.com/` y esto es bueno porque nos permite encontrar vulnerabilidades donde en ocasiones hasta podemos obtener un script para atacar dicha vulnerabilidad.

La herramienta se conecta directamente con esta web, por lo que si la utilizamos, podríamos realizar una búsqueda por vulnerabilidades que permitan la enumeración de usuarios en WordPress:

```shell
searchsploit wordpress user enumeration
```

<img src="/apuntes/hacking-etico-explotacion/1-2-016.webp" alt="Captura de los apuntes" width="1212" height="157" loading="lazy" decoding="async">

En este caso, si observamos la información reportada, existe una vulnerabilidad para versiones de WordPress menores a la 4.7.1 que permite la enumeración de usuarios. En este caso, esta vulnerabilidad ya no aplica, debido a que nos encontramos en la versión 5.3. 

Si tenemos dudas al respecto, podemos llegar a utilizar la herramienta __WhatWeb__, para que nos muestre dicha información:

<img src="/apuntes/hacking-etico-explotacion/1-2-017.webp" alt="Captura de los apuntes" width="1318" height="135" loading="lazy" decoding="async">

En este caso vemos cómo utiliza la versión __5.3__ y, pues, como sabemos que actualmente vamos por la versión 6.9, vulnerabilidades seguro que tiene en algún lado. 

En ocasiones se llega a ocultar la posibilidad de ver la versión de WordPress utilizada; es por ello que herramientas como __WhatWeb__ son de ayuda para esto.

Anteriormente se mencionó la herramienta __searchsploit__ que se puede utilizar en la terminal y está sincronizada directamente con la plataforma exploitdb. Esto lo podríamos validar realizando exactamente la misma búsqueda en la propia web:

<img src="/apuntes/hacking-etico-explotacion/1-2-018.webp" alt="Captura de los apuntes" width="1333" height="639" loading="lazy" decoding="async">

Es el mismo resultado.

En la página web, ver el código que nos ayuda a explotar esta vulnerabilidad es tan sencillo como presionarlo e irnos a verlo. En el caso de la herramienta de terminal, tendríamos que utilizar el parámetro __-x__ y pasarle el identificador con el que está almacenado el script:

```shell
searchsploit -x 41497 
```

<img src="/apuntes/hacking-etico-explotacion/1-2-019.webp" alt="Captura de los apuntes" width="1291" height="222" loading="lazy" decoding="async">

<img src="/apuntes/hacking-etico-explotacion/1-2-020.webp" alt="Captura de los apuntes" width="654" height="616" loading="lazy" decoding="async">

Este script lo que hace es que primeramente en __url__ se almacena la URL de la web, que en este caso sería nuestro localhost, pero en el puerto 31337. 

Y el payload es una ruta típica de WordPress. 

Para el __urli__ podemos ver que se utiliza __file_get_contents__ y dentro de este concatena la URL con el payload, básicamente haciendo la URL completa con la ruta correspondiente que quiere validar.

Si esta ruta la verificamos en el navegador, veremos que tiene lo siguiente:

```shell
http://127.0.0.1:31337/wp-json/wp/v2/users/
```

<img src="/apuntes/hacking-etico-explotacion/1-2-021.webp" alt="Captura de los apuntes" width="699" height="250" loading="lazy" decoding="async">

En este caso no vemos que la ruta existe y esto sucede debido a que la vulnerabilidad es funcional para servidores que estén utilizando versiones de WordPress 4.7 o inferiores. Para versiones superiores, esto se encuentra parcheado.

Por ende, esta no sería una forma de enumerar usuarios para esta versión, pero viene bien conocerla.
#### wpscan

wpscan es una herramienta que emplea varias técnicas para recolectar información, entre ellas usuarios, plugins vulnerables y otras cosas. 

Existen otras herramientas como esta, las cuales son __WPSeku__ o __Wordpresscan__. 

Con __wpscan__ nosotros podremos aplicar un escaneo a una web (URL) que contenga como gestor de contenido un WordPress. 

Para utilizarla, bastaría con utilizar el parámetro __--url__ y pasarle la URL de la web.

```shell
wpscan --url http://127.0.0.1:31337
```

Si nos llega a dar problemas con que no tenemos actualizada la base de datos, bastaría con actualizarla utilizando el siguiente comando:

```shell
wpscan --update
```

Y después volver a correr el escaneo para la web. 

Este tipo de herramientas nos ayudan a ver información como temas, plugins y un poco de todo lo que utiliza por detrás.

<img src="/apuntes/hacking-etico-explotacion/1-2-022.webp" alt="Captura de los apuntes" width="773" height="216" loading="lazy" decoding="async">

Si vemos, nos empezó a identificar los plugins e incluso nos menciona que no está en la versión más actualizada. 

En este caso, el mismo repositorio nos menciona las vulnerabilidades contempladas para este laboratorio en cuanto a plugins respecta, y estas son las siguientes:

<img src="/apuntes/hacking-etico-explotacion/1-2-023.webp" alt="Captura de los apuntes" width="780" height="491" loading="lazy" decoding="async">

En nuestro escaneo con wpscan no nos está reportando vulnerabilidades para los plugins encontrados a pesar de estar desactualizados. 

Esto sucede debido a que tendríamos que registrarnos en la página que él nos muestra en los propios resultados del escaneo, para que nos proporcione una API Key y poder utilizarla para que nos encuentre vulnerabilidades.

<img src="/apuntes/hacking-etico-explotacion/1-2-024.webp" alt="Captura de los apuntes" width="1042" height="110" loading="lazy" decoding="async">

En breve se mostrará. 

Existe un parámetro de esta herramienta, el cual es __-e__ y es de ayuda para enumerar múltiples cosas.

<img src="/apuntes/hacking-etico-explotacion/1-2-025.webp" alt="Captura de los apuntes" width="1321" height="511" loading="lazy" decoding="async">

Además, podríamos seleccionar múltiples cosas que queremos que nos muestre separadas por comas; por ejemplo, si queremos que nos muestre pliguns vulnerables y usuarios, el comando quedaría de la siguiente manera:

```shell
wpscan --url http://127.0.0.1:31337 -e vp,u
```

<img src="/apuntes/hacking-etico-explotacion/1-2-026.webp" alt="Captura de los apuntes" width="1327" height="439" loading="lazy" decoding="async">

En este caso vemos cómo nos ha encontrado dos usuarios, el que hemos creado y otro que se llama Editor. Si vamos al login y tratamos de verificar si este segundo usuario existe, veremos que sí. 

Por el lado de los plugins vulnerables, no nos encontró ninguno debido a que aún no estamos utilizando nuestra API key.

El hecho de tener la posibilidad de enumerar cosas como los plugins es bueno, ya que, a pesar de que en una web se tenga la versión más actual de WordPress, puede estar utilizando plugins vulnerables. 

Ahora, lo que podríamos utilizar para que nos llegue a reportar los plugins vulnerables podría ser utilizar el API key o token, el cual podemos obtener registrándonos en la web: `https://wpscan.com/register`.

Una vez registrados, al iniciar sesión veremos directamente nuestro API token. Este lo podremos utilizar con wpscan. 

Para utilizarlo, bastaría con utilizar `--api-token="TOKEN"`

```shell
wpscan --url http://127.0.0.1:31337 -e vp --api-token="<TOKEN>"
```

Esto ya ahora sí que en la parte de plugins nos mostrará en rojo aquellos que tengan alguna vulnerabilidad.

<img src="/apuntes/hacking-etico-explotacion/1-2-027.webp" alt="Captura de los apuntes" width="1331" height="592" loading="lazy" decoding="async">

Si nos fijamos bien, tenemos una vulnerabilidad RCE, la cual nos permite una ejecución remota de comandos sin autenticación. Lo interesante de wpscan es que además nos proporciona enlaces en los que podemos indagar más acerca de la vulnerabilidad:

<img src="/apuntes/hacking-etico-explotacion/1-2-028.webp" alt="Captura de los apuntes" width="908" height="138" loading="lazy" decoding="async">

En ocasiones hasta se nos pueden representar exploits para explotar dichas vulnerabilidades. Si indagamos más sobre todos los resultados, observaremos cómo es que existen otros tipos de ataque que se pueden efectuar, como SQLi, XSS, CSRF, entre otros. De ahí la importancia de siempre tener la versión más reciente. 

Este tipo de herramientas son muy buenas, pero en ocasiones puede ser que no nos lleguen a listar todos los plugins que se lleguen a utilizar. Por ello también existe la posibilidad de emplear un procedimiento más manual.

#### Manual

En el CMS WordPress existe una ruta típica que contiene los plugins instalados; por ende, podríamos intentar acceder al mismo para verificar si llegamos a tener capacidad de directory listing, que sería prácticamente la posibilidad de colocar una ruta y visualizar las rutas y contenido existente en la misma:

```text
http://127.0.0.1:31337/wp-content/plugins/
```

<img src="/apuntes/hacking-etico-explotacion/1-2-029.webp" alt="Captura de los apuntes" width="1325" height="641" loading="lazy" decoding="async">

En este caso, no tenemos esta capacidad de directory listing. En este caso, el recurso está oculto o perfectamente se podría mostrar un Forbidden.

#### Petición con Curl

Podremos realizar una petición GET con curl y filtrar por la palabra plugins; en ocasiones, en el propio código fuente se pueden llegar a ver los plugins que utiliza.

```shell
curl -s -X GET http://127.0.0.1:31337 | grep plugins
```

<img src="/apuntes/hacking-etico-explotacion/1-2-030.webp" alt="Captura de los apuntes" width="1333" height="562" loading="lazy" decoding="async">

Como lo que se nos muestra es bastante extenso, podríamos utilizar una expresión regular para enfocarnos únicamente en los plugins:

```shell
curl -s -X GET http://127.0.0.1:31337 | grep -oP "plugins/.*"
```

<img src="/apuntes/hacking-etico-explotacion/1-2-031.webp" alt="Captura de los apuntes" width="1314" height="450" loading="lazy" decoding="async">

Esto ya es un poco más lo que nos interesa. Cuando en una petición queremos ver los plugins, lo que nos interesa es la siguiente palabra después de __plugins/__ hasta el próximo __/__. Es por ello que aplicaremos la expresión regular para que únicamente nos dé este resultado:

```shell
curl -s -X GET http://127.0.0.1:31337 | grep -oP "plugins/\K[^/]+"
```

<img src="/apuntes/hacking-etico-explotacion/1-2-032.webp" alt="Captura de los apuntes" width="713" height="430" loading="lazy" decoding="async">

De esta forma ya estaríamos listando los plugins y, finalmente, para evitar los repetidos, bastaría realizar un sort con unique:

```shell
curl -s -X GET http://127.0.0.1:31337 | grep -oP "plugins/\K[^/]+" | sort -u
```

En la expresión regular __\\K__ lo que hace es resetear todo lo que está antes de ella; es por ello que en el resultado no se muestra __plugins/__ y el resto indica que puede tener caracteres hasta que llegue a una barra __/__.

<img src="/apuntes/hacking-etico-explotacion/1-2-033.webp" alt="Captura de los apuntes" width="807" height="108" loading="lazy" decoding="async">

En este caso vemos que tenemos estos plugins y podríamos enfocarnos en el social-warfare. Como tenemos __searchsploit__ que puede ayudarnos a buscar exploits existentes, podemos hacer una búsqueda para warfare:

<img src="/apuntes/hacking-etico-explotacion/034.webp" alt="Captura de los apuntes" width="1260" height="296" loading="lazy" decoding="async">

De esta manera podremos ir enumerando y buscando cosas en internet con la información encontrada, teniendo posibilidades de explotar algunas vulnerabilidades.

#### Averiguar contraseñas

Si se da el caso en el que queremos averiguar la contraseña de algún usuario, podríamos utilizar BurpSuite para ver los datos que se tramitan en el login y, con ayuda de Python, montarnos un script. Otra opción es utilizando el intruder de Burpsuite, pero sin la versión PRO está más complicado debido a los hilos, y estos son muy necesarios para un ataque rápido.

##### XMLRPC

WordPress suele tener un archivo, el cual es el __xmlrpc.php__ en la ruta principal, y si este llega a estar expuesto, existe una forma interesante de llegar a listar o encontrar credenciales válidas.

<img src="/apuntes/hacking-etico-explotacion/035.webp" alt="Captura de los apuntes" width="640" height="127" loading="lazy" decoding="async">

En este caso está accesible y podemos observar cómo solo acepta solicitudes POST. Con ello en mente, podríamos tratar de enviarle una solicitud POST con curl y ver qué sucede:

<img src="/apuntes/hacking-etico-explotacion/036.webp" alt="Captura de los apuntes" width="752" height="401" loading="lazy" decoding="async">

Nos responde con una estructura XML y nos marca __parse error__. Esto se debe a que la petición o el servidor espera una estructura XML. Es aquí donde, cuando veamos que este archivo existe y está accesible, podremos aprovecharnos de él para descubrir credenciales correctas. 

Como hay múltiples cosas que se pueden hacer con este recurso, lo primero que tenemos que hacer como atacante es enumerar o investigar al respecto de las posibilidades que tenemos con este archivito.

<img src="/apuntes/hacking-etico-explotacion/037.webp" alt="Captura de los apuntes" width="866" height="391" loading="lazy" decoding="async">

En este caso consideramos la primera opción que se nos da.

La web: `https://nitesculucian.github.io/2019/07/02/exploiting-the-xmlrpc-php-on-all-wordpress-versions/`

Lo primero que tendríamos que hacer como atacantes es listar o averiguar cuáles son los métodos disponibles. 

Para ello consideraremos la POST Request que se nos da a considerar, que tiene la estructura XML:

```xml
<?xml version="1.0" encoding="utf-8"?>
<methodCall>
<methodName>system.listMethods</methodName>
<params></params>
</methodCall>
```

Esto lo podremos usar para enviarlo en nuestra petición con curl y, específicamente, si se nos llega a listar un método, el cual es __wp.getUsersBlogs__, tendremos la posibilidad de enumerar credenciales válidas. 

Para ello creamos un archivo __file.xml__ y le colocamos el contenido anterior.

```shell
curl -s -X POST http://127.0.0.1:31337/xmlrpc.php -d@file.xml
```

Con el parámetro __-d__ y un @, estaríamos indicando el archivo que acabamos de crear. Al ejecutarlo, si el archivo está en la misma ruta en la que ejecutamos el comando, nos listará los métodos existentes:

<img src="/apuntes/hacking-etico-explotacion/038.webp" alt="Captura de los apuntes" width="800" height="429" loading="lazy" decoding="async">

Entre todos estos, si observamos, sí tenemos disponible el de wp.getUsersBlogs.

<img src="/apuntes/hacking-etico-explotacion/039.webp" alt="Captura de los apuntes" width="651" height="193" loading="lazy" decoding="async">

Considerando esto, ahora en la web anterior podríamos empezar a buscar, debido a que podríamos considerar una estructura que nos ayudara a poder llegar a enumerar o listar credenciales válidas. En este caso es en la parte de Brute Force Attacks:

<img src="/apuntes/hacking-etico-explotacion/040.webp" alt="Captura de los apuntes" width="774" height="515" loading="lazy" decoding="async">

```xml
<?xml version="1.0" encoding="UTF-8"?>
<methodCall>
<methodName>wp.getUsersBlogs</methodName>
<params>
<param><value>\{\{your username\}\}</value></param>
<param><value>\{\{your password\}\}</value></param>
</params>
</methodCall>
```


Si esto lo colocamos en un archivo y se lo pasamos en nuestra petición, tendríamos la siguiente respuesta:

<img src="/apuntes/hacking-etico-explotacion/041.webp" alt="Captura de los apuntes" width="804" height="602" loading="lazy" decoding="async">

Por lo tanto, si editamos el apartado donde iría el nombre de usuario y contraseña, podríamos aprovecharnos de crear un script en bash, el cual aproveche esto y esté cambiando la contraseña para uno usuarios dado, aplicando un ataque de fuerza bruta con un diccionario de contraseñas. 

El script que nos ayude a hacerlo estará en los siguientes apuntes.
