---
curso: "python-ofensivo-laboratorio"
modulo: "python-ofensivo-laboratorio/control-remoto"
leccion: "forward-shell-1-de-4"
titulo: "Forward shell (1 de 4)"
orden: 14
minutos: 16.9
idioma: "es"
riesgo: "alto"
fuente: "notes-tecnologia"
imagenes: 30
ejercicios: []
---

Una **Forward Shell** es una alternativa cuando las opciones más comunes, como las reverse shells, no son viables debido a restricciones como las reglas del firewall. 

La Forward Shell es una técnica ingeniosa que se utiliza en situaciones donde, a pesar de tener acceso a un sistema a través de una webshell u otro método, no podremos establecer una reverse Shell debido a las restricciones impuestas por el firewall del sistema objetivo. En estos casos, la Forward Shell nos permite ejecutar comandos y obtener una Shell interactiva utilizando métodos alternativos que no requieren establecer una conexión TCP directa con el sistema de la forma tradicional. 

Una de las claves de esta técnica es el uso de **mkfifo**, una herramienta para crear named pipes (tuberías con nombre) en sistemas Unix/Linux. Mediante estas tuberías, podremos establecer una comunicación bidireccional entre la máquina atacante y la máquina objetivo, permitiendo una interacción más fluida y completa con la Shell del sistema comprometido. Esto nos brinda una mayor movilidad y flexibilidad para operar, incluso en entornos restringidos.
## Práctica

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-001.webp" alt="Captura de los apuntes" width="623" height="339" decoding="async">

Viendo la imagen anterior, imaginemos que tenemos una web a la cual, mediante un parámetro en su URL tenemos la posibilidad de realizar ejecución de comandos. Esto viene bien, pero tiene sus limitaciones de cara a querer efectuar cambios de directorios o abrir binarios como nano para edición de archivos o incluso querer solicitar algún tipo de terminal como abrir una bash desde una sh debido a que la ejecución de cada comando es una petición independiente y, por lo tanto, son procesos independientes, es como ejecutar el comando cada vez en una terminal distinta. 

Nuestra **Forward Shell** viene a ser la alternativa que nos permitirá llegar a realizar estas acciones, debido a que por configuraciones del firewall de la máquina víctima no podremos realizar una comunicación desde la misma hacia nuestra máquina de atacante para recibir una reverse Shell. 

Principalmente, realizaremos la misma simulación del envío de comandos enviando las peticiones **get** y recibiendo la respuesta de los comandos, lo cual sería nuestra webshell, a esto le agregaremos la utilidad **mkfifo** que es lo que nos permitirá expandir nuestras posibilidades en el sistema, teniendo de una forma más cercana lo que realmente sería una shell.

Un FIFO es un tipo de fichero especial que permite a procesos independientes comunicarse. Un proceso abre el fichero FIFO para escribir y otro para leer, tras lo cual los datos pueden fluir como con las tuberías sin nombre usuales en shells o donde sea. 

Para ello, nos montaremos nuestro servidor dejando la posibilidad de la ejecución de comandos mediante el parámetro **cmd**. Esto lo haremos montándonos un pequeño laboratorio con **docker** el cual esté corriendo un servidor http con php.

### Montando el laboratorio

Para ello, primero tendremos que instalar **docker.io** o **docker**.

Iniciaremos el servicio de docker con:

```shell
sudo service docker start
```

o una forma más moderna:

```shell
sudo systemctl start docker
```

Ahora, encontrándonos como administrador, podremos verificar si tenemos algún contenedor corriendo con docker utilizando:

```shell
docker ps
```

O si se llegó a quedar algún contenedor por ahí pendiente:

```shell
docker ps -a
```

O incluso podremos verificar si tenemos alguna imagen creada:

```shell
docker image
```

Es normal que no veamos nada de ser el caso de recién instalarlo en nuestro sistema, porque no hemos trabajado nada con docker. 

En el directorio que nos encontramos crearemos un archivo con el nombre **Dockerfile**, a este le agregaremos únicamente 3 líneas. 

Antes de esto, primeramente crearemos nuestro archivo php malicioso, el cual subiremos a nuestro contenedor y este será el archivo **index.php**. Este únicamente tendrá una ejecución en php con **system()**, lo cual permitirá la ejecución de comandos y el comando que tomará será tomado el parámetro **cmd**:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-002.webp" alt="Captura de los apuntes" width="291" height="353" loading="lazy" decoding="async">

Ahora en nuestro **Dockerfile** vamos a agregar las siguientes líneas:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-003.webp" alt="Captura de los apuntes" width="386" height="334" loading="lazy" decoding="async">

De esta manera, primeramente estamos indicando que tendremos corriendo un servidor php con apache, con la segunda línea nos estamos copeando nuestro archivo malicioso a la ruta **/var/www/html** para que sea lo que muestre nuestro servicio web y finalmente exponemos el puerto 80 de nuestra propia máquina de atacante para que sea nuestra forma de manejar el **port forwarding** debido a que los comandos que ejecutaremos se ejecutaran en el propio contenedor y no en nuestra máquina que estará corriendo el contenedor. 

Con esto listo y el contenido del archivo guardado, ahora construiremos nuestra imagen con docker utilizando el comando:

```shell
docker build . -t web_server
```

De tal manera que le estamos indicando que en nuestro directorio actual construya una imagen de nuestro **Dockerfile** y como nombre le estamos dando **web_server**. 

Esto tarda un poco, pero una vez completado, veremos cómo con el comando ```docker images``` veremos ahora la imagen creada:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-004.webp" alt="Captura de los apuntes" width="664" height="123" loading="lazy" decoding="async">

Con ello, ahora aprovechándonos de la imagen que hemos creado, lanzaremos el contenedor habilitando el port forwarding. 

Para ello utilizaremos el comando:

```shell
docker run --rm -dit -p 80:80 web_server
```

Con **--rm** estamos indicando que, cuando el contenedor deje de correr, se borre todo automáticamente. Con **-d** estamos indicando que se corra en segundo plano, **it** viene de interactive para indicar que queremos poder obtener una terminal para nuestro contenedor. Finalmente, con **-p** le estamos indicando que el puerto 80 de nuestro contenedor sea el puerto 80 de nuestra máquina. Por último, le pasamos el nombre de la, imagen y con ello ya estaría corriendo nuestro contenedor.

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-005.webp" alt="Captura de los apuntes" width="673" height="164" loading="lazy" decoding="async">

Esto nos retornará el id de nuestro contenedor, pero si utilizamos el comando **docker ps** para ver si tenemos algún contenedor corriendo, aquí también nos mostrará el ID de una forma más corta, pero podremos utilizar este. No es necesario el ID completo si queremos referirnos a nuestro contenedor.
<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-006.webp" alt="Captura de los apuntes" width="1531" height="105" loading="lazy" decoding="async">

Aquí, como no le hemos dado nombre al contenedor, vemos cómo se le asignó uno de forma automática. Con este nombre podremos ver cosas como el puerto del contenedor:

```shell
docker port awesome_zhukosky
```

O incluso obtener una terminal interactiva con:

```shell
docker exec -it awesome_zhukosky bash
```

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-007.webp" alt="Captura de los apuntes" width="445" height="188" loading="lazy" decoding="async">

Nuestro contenedor sería como estar en otra máquina, podríamos ver perfectamente que la IP que tenemos nosotros es distinta a la de nuestra interfaz docker:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-008.webp" alt="Captura de los apuntes" width="323" height="151" loading="lazy" decoding="async">

Y si listamos la IP de nuestro contenedor con el comando, ```hostname -I``` veremos cómo es diferente a la de nuestra interfaz de docker0:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-009.webp" alt="Captura de los apuntes" width="1313" height="92" loading="lazy" decoding="async">

Como podremos ver, nos encontramos en la ruta **/ar/www/html** y si listamos el contenido en esta ruta, veremos que está el archivo que hemos copiado **index.php**. Recordemos que esto lo hicimos al crear nuestro Dockerfile, llevando nuestro archivo malicioso a esta ruta, por ello es que lo tenemos:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-010.webp" alt="Captura de los apuntes" width="526" height="189" loading="lazy" decoding="async">

Con ello ya tendremos montado nuestro laboratorio y tendremos corriendo un servicio http por el puerto 80, el cual se encuentra corriendo en un contenedor.

### Ejecución de comandos

Si ahora en nuestro navegador colocamos **localhost**, veremos lo siguiente:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-011.webp" alt="Captura de los apuntes" width="655" height="201" loading="lazy" decoding="async">

Esto se debe a que nuestro archivo malicioso no puede ejecutar el comando debido a que no recibe nada del parámetro **cmd** en la url, es por ello que nosotros tendremos que pasárselo y, una vez haciéndolo, veremos cómo el comando se ejecuta:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-012.webp" alt="Captura de los apuntes" width="522" height="177" loading="lazy" decoding="async">

En este caso no pasa nada si no apuntamos de forma directa al archivo **index.php**, ya que, es el único recurso que existe, pero en sí la ruta sería **localhost/index.php** y aquí es donde tendríamos que enviar nuestro parámetro con el comando a ejecutar:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-013.webp" alt="Captura de los apuntes" width="569" height="176" loading="lazy" decoding="async">

Aquí ya podremos inyectar ciertos comandos, como por ejemplo listar el contenido del archivo /etc/hosts:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-014.webp" alt="Captura de los apuntes" width="1120" height="197" loading="lazy" decoding="async">

Y si quisiéramos verlo en el formato en el que es como tal el output, bastaría con hacer **CTRL + U** en nuestro teclado:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-015.webp" alt="Captura de los apuntes" width="810" height="264" loading="lazy" decoding="async">

Esto ya sería básicamente tener una mini webshell.

#### Ejecutar los comandos mediante peticiones con CURL

Tomando completamente el link de cuando hicimos nuestra petición en el navegador, para ejecutar el comando **cat /etc/hosts** utilizaremos el comando curl con ello:

```shell
curl -s -X GET 'http:/localhost/index.php?cmd=cat%20/etc/hosts'
```

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-016.webp" alt="Captura de los apuntes" width="701" height="193" loading="lazy" decoding="async">

El **%20** que vemos corresponde al salto de línea, esto se debe a que el navegador automáticamente hace esto para ciertos caracteres especiales, aplicando un url encoding. 

Si al querer realizar la petición con Curl queremos evitar colocarlo de esta forma, podríamos utilizar el comando de la siguiente manera:

```shell
curl -s -X GET 'http:/localhost/index.php' -G --data-urlencode 'cmd=cat /etc/hosts'
```

Con esto le estamos dando primeramente la ruta para después con **-G** le estamos indicando que le vamos a pasar datos, pero esta es una forma de indicarle que se estarán enviando mediante el método **GET** y finalmente **--data-urlencode** que nos permitirá agregar el texto directamente sin tener que agregar nosotros en url encoding.

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-017.webp" alt="Captura de los apuntes" width="888" height="204" loading="lazy" decoding="async">

De esta manera funciona exactamente de la misma manera y nos evitamos tener que colocar nosotros mismos el encoding del url. 

Si nosotros tratáramos de ejecutar un comando que no existe, esto no nos retornará nada, ya que, no podemos ver los errores. Para ello tendremos que convertir nuestro **stderr** en **stdout** y así nos lo redirigirá para poder verlo:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-018.webp" alt="Captura de los apuntes" width="845" height="103" loading="lazy" decoding="async">

Si esto mismo tratáramos de ejecutarlo en el navegador, no nos aplicaría correctamente el **url encode**, esto se debe a que ciertos caracteres especiales tendremos que url encodearlos nosotros mismos, en este caso el **&** que en este caso sería **%26**:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-019.webp" alt="Captura de los apuntes" width="594" height="194" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-020.webp" alt="Captura de los apuntes" width="611" height="172" loading="lazy" decoding="async">

Si tenemos duda de qué número en hexadecimal podría tener cada uno de los caracteres, podríamos utilizar **man** con la tabla **ascii** para verlo. En caso de que no nos funcione, tendremos que instalar **ascii** y con el parámetro **-X** nos dará la tabla con el valor de cada carácter en HEXADECIMAL. En este caso podremos ver cómo para el **&** sí es el **26** y, por ende en el url encoding lo representamos como **%26**:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-021.webp" alt="Captura de los apuntes" width="842" height="608" loading="lazy" decoding="async">

### Creación del script

Considerando lo anterior de haciendo una petición, lo que haremos será con la librería **requests** enviar una petición por **get**, enviándole el comando a nivel de datos.

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-022.webp" alt="Captura de los apuntes" width="485" height="452" loading="lazy" decoding="async">

Aquí hacemos lo mismo que hicimos con curl, solamente almacenamos en **data** los parámetros que queremos enviar. En este caso para **cmd** indicamos con '%s' que lo que le estaremos pasando es un string y con **% command** le estamos indicando que el string que le estaremos pasando es el comando.

Finalmente, en nuestra petición colocamos la url y, a nivel de parámetro, le pasamos data, ya que, es una petición por **GET**. Si fuese una petición por **POST**, ahí los datos ya los enviaríamos a nivel de **data**. 

En este caso, estamos recuperando la respuesta con **r.text** y finalmente lo imprimimos, retornándonos la respuesta del comando:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-023.webp" alt="Captura de los apuntes" width="312" height="87" loading="lazy" decoding="async">

Aquí ya podríamos jugar con **input** y un bucle para estar pidiendo constantemente los comandos, simulando una terminal. Además agregaremos color en nuestro input simulando la terminal y adicionalmente manejaremos la salida de nuestro programa con **signal**:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-024.webp" alt="Captura de los apuntes" width="664" height="690" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-025.webp" alt="Captura de los apuntes" width="442" height="317" loading="lazy" decoding="async">

En este caso, nuestra máquina no tiene configuradas reglas en el firewall que impidan una salida de conexiones como para enviarnos una reverse Shell, pero en este caso supondremos que así es. 

Sobre lo que mencionamos en un inicio sobre la limitación de nuestra posibilidad de ejecutar comandos, lo podremos ver, aprovechando que php está instalado, al solicitar una terminal de php con **php --interactive**:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-026.webp" alt="Captura de los apuntes" width="646" height="206" loading="lazy" decoding="async">

Esto se queda cargando porque el navegador no es un entorno que nos pueda brindar una Shell y, por ende, no tendremos forma de poder trabajar con la misma. 

Si esto lo hiciéramos en nuestro sistema, lo veríamos de la siguiente manera:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-027.webp" alt="Captura de los apuntes" width="403" height="235" loading="lazy" decoding="async">

Otra forma más visible es en nuestra webshell que hemos construido con el script, tratar de movernos entre directorios:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-028.webp" alt="Captura de los apuntes" width="618" height="554" loading="lazy" decoding="async">

Siempre estaremos donde comenzamos a pesar de hacerlo. Esto se debe a que cada ejecución de comando es un proceso independiente que, cada vez que enviamos, se ejecuta directamente del script que nosotros colocamos, por lo que no se arrastra ninguna sesión, como lo es con nuestra terminal en el sistema. 

Incluso esto lo podríamos ver al crear una variable. Si le asignamos el valor de "Hola" y después quisiéramos mostrar su contenido, no lo veríamos debido a que son dos consultas totalmente independientes y no existe como un registro o sesión de lo que realizaron las consultas anteriores.

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-029.webp" alt="Captura de los apuntes" width="254" height="172" loading="lazy" decoding="async">

Aquí es donde entra en juego el uso de **mkfifo** y las tuberías con nombre para poder llegar a tener como una sesión que tenga el contexto de todo lo que estamos realizando, así como que al ejecutar una Shell interactiva con php ahora sí la recibamos. 

Como concepto, si instalamos **mkfifo** y ejecutamos el siguiente comando:

```shell
mkfifo input; tail -f input | /bin/sh 2>&1 > output
```

Con esto, como tal, si mostramos lo que tenemos en el directorio, hemos creado dos tipos de archivos:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-030.webp" alt="Captura de los apuntes" width="635" height="316" loading="lazy" decoding="async">

De primeras tendremos los archivos vacíos. Lo que el comando hace es que está creando un archivo fifo **input** del cual con **tail -f** estamos continuamente leyendo las últimas líneas de archivo, **tail -f** sirve para leer continuamente las últimas líneas de un archivo. En este caso, lo que le corresponderá a las nuevas entradas que estemos colando como input. 

En este caso estaremos continuamente leyendo los inputs para que me los ejecute automáticamente con una Shell **sh** y, además, por lo que vimos anteriormente de los errores, los transformará en el output para así almacenarlos en **output**.
