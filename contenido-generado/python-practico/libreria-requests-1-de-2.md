---
curso: "python-practico"
modulo: "python-practico/librerias-comunes"
leccion: "libreria-requests-1-de-2"
titulo: "Librería requests (1 de 2)"
orden: 9
minutos: 15.4
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 30
ejercicios: []
---

1. **Introducción**

	La biblioteca *requests* en Python es una de las herramientas más populares y poderosas para realizar solicitudes HTTP. Su diseño es intuitivo y fácil de usar, lo que lo hace la opción preferida para interacturar con APIs y servicios web.

	*Introducción a requests*

	*requests* es una biblioteca de Python que simplifica enormemente el proceso de enviar solicitudes HTTP. Está diseñada para ser más fácil de usar que las opciones incorporadas en Python, como *Urllib*, proporcionando una API más amigable.

	*Características Principales:*

	- *Simplicidad y Facilidad de Uso:* Con requests, enviar solicitudes GET, POST, PUT, DELETE, entre otras, se puede realizar en pocas líneas de código. Su sintaxis es clara y concisa.
	  </br>
	- *Gestión de Parámetros URL:* Permite manejar parámetros de consulta y cuerpos de solicitud con facilidad, autorizando la codificación de URL.
	  </br>
	- *Manejo de Respuestas:* *requests* facilita la interpretación de respuestas HTTP, proporcionando un objeto de respuestas que incluye el contenido, el estado, los encabezados, y más. 
	  </br>
	- *Soporte para Autenticaciones:* Ofrece soporte integrado para diferentes formas de autenticación, incluyendo autenticación básica, gigest y OAuth.
	  </br>
	- *Manejo de Sesiones y Cookies:* Permite mantener sesiones y gestionar cookies, lo cual es útil para interactuar con sitios web que requieren autenticación y mantienen estado.
	  </br>
	- *Soporte para SSL:* *requests* maneja SSL (Secure Sockets Layer) y TLS (Transport Layer Security), permitiendo realizar solicitudes seguras a sitios HTTPS.
	  </br>
	- *Manejo de Excepciones y Errores:* Proporciona métodos para manejar y reportar errores de red y HTTP de manera efectiva.

	*Uso Práctico:*

	La biblioteca se utiliza ampliamene para interactuar con APIs RESTful, automatizar interacciones con sitios web, y en tareas de scrapping web. Sus capacidades para manejar solicitudes complejas y sus características de seguridad la hacen ideal para una amplia gama de aplicaciones, desde scripts simples hasta sistemas empresariales complejos.

	*Conclusión:*

	La comprensión y el uso efectivo de *requests* son habilidades esenciales para cualquier desarrollador en Python que trabaje con HTTP y APIs web. Esta biblioteca no solo facilita la realización de tareas relacionadas con la red, sino que también ayuda a escribir código más limpio y mantenible.
	</br>
2. **Práctica**

	Esta librería se llegará a utilizar mucho, sobre todo en el hacking web.

	Empezaremos creando un archivo e importando la librería, es importante mencionar que un script también entraría en conflicto si tiene el mismo nombre de alguna librería, ya que como el PATH de Python comienza a buscar por el directorio actual, básicamente se estaría importando así mismo el script.

	Esta librería nos permitiría hacer peticiones a páginas y esta nos respondería, por lo que podríamos almacenar la respuesta

	Para ello utilizaríamos el método *get()*.

	A este le pasamos como argumento la dirección de la página web a la que seremos realizar la solicitud,  y en nuestra variable *response* se almacenaría un objeto por lo que podríamos acceder a sus atributos.

	Una petición retornará un código de estado y podremos acceder a este con el objeto que nos retorna mediante el atributo *status_code*:

	<img src="/apuntes/python-practico/img-827.webp" alt="Captura de los apuntes" width="556" height="168" decoding="async">

	<img src="/apuntes/python-practico/img-828.webp" alt="Captura de los apuntes" width="238" height="84" loading="lazy" decoding="async">

	*200* suele ser un código de estado exitoso.

	*Ver el código fuente de la respuesta*

	Para ver el código fuente de la respuesta, ahora tendríamos que utilizar *text* y esto nos retornaría como tal la respuesta, por lo que podríamos mostrarla con print:

	<img src="/apuntes/python-practico/img-829.webp" alt="Captura de los apuntes" width="1858" height="611" loading="lazy" decoding="async">

	Si bien, solo veremos código HTML, no sabremos que es sin verlo de forma interpretada por el navegador, por ello lo almacenaremos en un nuevo archivo:

	<img src="/apuntes/python-practico/img-830.webp" alt="Captura de los apuntes" width="543" height="212" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-831.webp" alt="Captura de los apuntes" width="304" height="130" loading="lazy" decoding="async">

	Ahora que todo el HTML está almacenado en un *index.html* y sabemos que esto puede interpretarlo un navegador, podríamos abrirnos un pequeño servidor en localhost con Python por HTTP para que interprete la página:

	```python
	python3 -m http.server 8080
	```

	Ejecutaríamos el anterior comando en terminal, justo en el directorio donde sé en cuenta nuestro *index.html* que acabamos de crear con la respuesta.

	Con esto listo iríamos al navegador y colocaríamos *localhost* y recordemos que al comando para abrir el servidor le indicamos unos números, estos serían el puerto, por lo que se representaría como *localhost:8080*

	<img src="/apuntes/python-practico/img-832.webp" alt="Captura de los apuntes" width="1890" height="488" loading="lazy" decoding="async">

	Si nos vamos a la terminal donde abrimos el servidor, observaremos que además intento realizar peticiones de carpetas que claramente no existen en nuestro pequeño servidor:

	<img src="/apuntes/python-practico/img-833.webp" alt="Captura de los apuntes" width="1323" height="431" loading="lazy" decoding="async">

	Con esto, realmente nos hemos traído la página principal del buscador de Google, si la abrimos se ve prácticamente igual. La diferencia aquí es que nosotros en local no tenemos ni los estilos, ni los recursos faltantes para que se vea exactamente igual a cuando abrimos Google directamente en el navegador.

	*Petición en formato Json*

	Jugando con el siguiente enlace:
	
	```text
	https://httpbin.org/get
	```

	Al colocarlo en el navegador, directamente nos retorna un formato JSON:

	<img src="/apuntes/python-practico/img-834.webp" alt="Captura de los apuntes" width="777" height="491" loading="lazy" decoding="async">

	Esto contiene cierta información y al final del todo vemos como nos muestra el enlace. Al inicio veremos primeramente *args* y veremos como es un conjunto o diccionario vacío.

	Esto está así, ya que nosotros seguido del enlace que ya tenemos podremos pasarle argumentos, para pasarle un primer argumento tendremos que colocar un signo interrogante *?* y seguido de este un par de clave-valor: *?key1=test*:

	<img src="/apuntes/python-practico/img-835.webp" alt="Captura de los apuntes" width="786" height="512" loading="lazy" decoding="async">

	Veremos como ahora nos coloca en los argumentos el que hemos pasado por medio del enlace y también es representado en el enlace en la parte inferior.

	Con esto en mente, si quisiéramos agregar múltiples argumentos, una vez agregado el primero para agregar más tendremos que usar *&* y colocarlos juntos de la misma manera, ahora sin el interrogante:

	<img src="/apuntes/python-practico/img-836.webp" alt="Captura de los apuntes" width="778" height="556" loading="lazy" decoding="async">

	Esto mismo podríamos hacerlo en Python de una forma más interesante, primeramente los parámetros que queramos agregar los almacenaremos como pares de clave-valor en un diccionario y luego con el método *get* como primer argumento le pasaremos el enlace base y como segundo argumento pasaremos nuestro diccionario, asignándolo al parámetro *params*:

	<img src="/apuntes/python-practico/img-837.webp" alt="Captura de los apuntes" width="677" height="166" loading="lazy" decoding="async">

	Finalmente, podríamos ver como la URL quedara compuesta como la hemos visto antes gracias al método *url* y con *text* recordemos que podremos ver la respuesta:

	<img src="/apuntes/python-practico/img-838.webp" alt="Captura de los apuntes" width="691" height="228" loading="lazy" decoding="async">

	Al ejecutarlo tendríamos lo siguiente:

	<img src="/apuntes/python-practico/img-839.webp" alt="Captura de los apuntes" width="774" height="376" loading="lazy" decoding="async">

	Al realizar esta petición por *get* vemos cómo los parámetros que le pasamos son mostrados en la *url*. Si cambiáramos nuestro método de consulta por *post* en el url también tendríamos que cambiar *get* por *post* y, al momento de pasar los parámetros, ahora no sería asignarlos a *params* sino a *data*.

	Con esto en mente, nuestro diccionario con los valores que pasaremos se llama *values*, esto es totalmente opcional, pero al momento de realizar una petición mediante el método *post* puede llegar a ser más descriptivo llamarlo *payload*, lo cual nos quedaría de la siguiente manera:

	<img src="/apuntes/python-practico/img-840.webp" alt="Captura de los apuntes" width="705" height="203" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-841.webp" alt="Captura de los apuntes" width="672" height="495" loading="lazy" decoding="async">

	Lo cual nos serviría para enviar datos a través de una petición post y vemos cómo todo se ha almacenado en el apartado *form*.

	*Modificar headers*

	Si observamos la petición que realizamos, esta cuenta con sus propios *headers*, en este caso podríamos ver el *User-Agent* el cual contiene información desde donde se ha realizado la petición, en este caso de Python.

	Con esto en mente, nosotros podríamos modificarlo creando un diccionario *headers* y en este agregar el par clave-valor, que tenga como clave *User-Agent* y como valor el que nosotros deseemos. En este caso colocaremos *myapp/1.0.1*, lo cual asignaremos directamente en nuestra petición al parámetro *headers* como argumento:

	<img src="/apuntes/python-practico/img-842.webp" alt="Captura de los apuntes" width="866" height="230" loading="lazy" decoding="async">

	Viendo esto, tengamos que *data* y *headers*, que son a los que les estamos asignando los diccionarios de clave-valor que hemos creado, son propiedades de la propia petición, por ende podremos asignarles valores o cambiarlos en función de lo que consideremos necesario.

	Con esto en mente, al ejecutar esto veríamos cómo ahora hemos cambiado el valor del header *User-Agent*:

	<img src="/apuntes/python-practico/img-843.webp" alt="Captura de los apuntes" width="648" height="429" loading="lazy" decoding="async">

	*Header en una pagina*

	Si nos vamos a la página de google.es y abrimos la consola del navegador, podremos irnos al apartado de *Network*:

	<img src="/apuntes/python-practico/img-844.webp" alt="Captura de los apuntes" width="541" height="152" loading="lazy" decoding="async">

	Al presionar, por ejemplo, en la primera petición *POST* que nos salga, veremos en *Request headers* los headers de esta petición, entre ellos el de *User-Agent*.

	<img src="/apuntes/python-practico/img-845.webp" alt="Captura de los apuntes" width="1024" height="507" loading="lazy" decoding="async">

	Por lo tanto, nosotros podríamos solicitar una petición mediante get a *https:\/\/google.es* y mediante *headers* asignarle un valor distinto al valor *User-Agent*:

	<img src="/apuntes/python-practico/img-846.webp" alt="Captura de los apuntes" width="647" height="174" loading="lazy" decoding="async">

	Finalmente, con *response* que es donde se guarda el objeto de nuestra petición, utilizaríamos *request* para recuperar la petición de nuestro lado y *headers* para únicamente recuperar los headers y no mostrar todo:

	<img src="/apuntes/python-practico/img-847.webp" alt="Captura de los apuntes" width="1217" height="144" loading="lazy" decoding="async">

	Así veremos cómo hemos modificado el valor que recibimos para el *User-Agent* del header de nuestro lado en la petición.

	*Manejo de excepciones*

	A la hora de realizar solicitudes, Python nos permite realizar un manejo de excepciones. Un ejemplo sería colocar un timeout en nuestra petición *get*,  esto es importante, ya que habrá páginas que puedan tardar hasta 10 segundos en darnos una respuesta y podremos definir un límite de tiempo, que en caso de que no responda mediante el uso agregado de donde se almacene la respuesta con el método *raise_fo_status()*, nos lanzará una excepción para indicar que tuvimos un error en cuanto a una petición:

	<img src="/apuntes/python-practico/img-848.webp" alt="Captura de los apuntes" width="609" height="141" loading="lazy" decoding="async">

	En este caso, sí o sí, se generará la excepción de tiempo de respuesta excedido, ya que Google no responderá en 0.1 segundos. Podremos tratar las excepciones con *try*, en el caso del timeout su excepción se gestiona con *requests.Timeout*:

	<img src="/apuntes/python-practico/img-849.webp" alt="Captura de los apuntes" width="720" height="374" loading="lazy" decoding="async">

	Al nosotros trabajar con peticiones, podría presentarse un tipo de error HTTPError. Este se puede manejar como excepción e incluso gestionarse con un nombre específico para mostrarlo al usuario:

	<img src="/apuntes/python-practico/img-850.webp" alt="Captura de los apuntes" width="512" height="61" loading="lazy" decoding="async">

	Esto sería para en caso de presentarse un error HTTP. Algo que también podríamos gestionar es imprimiendo un mensaje en caso de que todo salga bien, con un *else* al final de todas las excepciones y si lo ejecutamos funcionaría correctamente:

	<img src="/apuntes/python-practico/img-851.webp" alt="Captura de los apuntes" width="804" height="455" loading="lazy" decoding="async">

	Para visualizar este efecto donde todo sale bien, he modificado el timeout a 1 segundo para que la petición a Google nos sea respondida.

	Además, tenemos *RequestException* la cual nos engloba de forma general errores de tiempo de espera, HTTP, errores de conexión y entre muchos más. Lo cual también podremos manejarlo de forma más descriptiva para mostrarlo al usuario:

	<img src="/apuntes/python-practico/img-852.webp" alt="Captura de los apuntes" width="743" height="339" loading="lazy" decoding="async">

	Esto al final sería algo más general, englobando muchos tipos de errores para mostrarse en caso de presentarse (recordemos agregar la *f* de *F-strings*).

	Un ejemplo sería modificar nuestro url por uno que no sea correcto, lo cual terminaría dándonos un error y nos entraría a nuestra excepción recientemente agregada:

	<img src="/apuntes/python-practico/img-853.webp" alt="Captura de los apuntes" width="1857" height="119" loading="lazy" decoding="async">

	De esta forma se ha dado un tipo de error general que no ha coincidido con ninguno de los primeros dos y por ello se nos ha mostrado gracias a nuestra excepción *RequestException*.

	Entonces estas excepciones son las principales que nos pueden ayudar a saber qué es lo que ha pasado con nuestra solicitud.

	*Manejo de los datos de una respuesta*

	Con el ejemplo de la página *https:\/\/httpbin.org\/get*  nosotros realizamos una petición  y vemos cómo la respuesta que recibimos la obtenemos en un formato tipo JSON, con utilizar donde se nos guarda la respuesta, podremos utilizar el método *json()* para convertirlo directamente a este formato, teniendo como resultado un diccionario de diccionarios:

	<img src="/apuntes/python-practico/img-854.webp" alt="Captura de los apuntes" width="542" height="216" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-855.webp" alt="Captura de los apuntes" width="1759" height="56" loading="lazy" decoding="async">

	Esto en Python realmente es de mucha ayuda, ya que directamente nos sirve para tratar los datos de forma directa sin ningún problema, al estar todo como si de un diccionario se tratase.

	Al tenerlo en un diccionario, al ver los datos, vemos cómo el *User-Agent* se encuentra almacenado dentro de los *headers*. Es por ello que primeramente podríamos realizar una validación de si se encuentran *headers* en el diccionario y luego de si se encuentra el *User-Agent* en los headers.

	De esta manera, almacenar y mostrar su valor o, de lo contrario, indicar que  este campo no se encuentra disponible:

	<img src="/apuntes/python-practico/img-856.webp" alt="Captura de los apuntes" width="682" height="481" loading="lazy" decoding="async">
