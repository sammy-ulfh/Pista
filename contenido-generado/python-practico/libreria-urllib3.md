---
curso: "python-practico"
modulo: "python-practico/librerias-comunes"
leccion: "libreria-urllib3"
titulo: "Librería Urllib3"
orden: 11
minutos: 13.3
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 29
ejercicios: []
---

1. **Introducción**

	*urllib3* es una biblioteca de Python ampliamente utilizada para realizar solicitudes HTTP y HTTPS. Es conocida por su robustes y sus numerosas características, que la hacen una herramienta versátil para una variedad de aplicaciones de red. A continuación, se presenta una descripción detallada de *urllib3* y sus capacidades.

	**Descripción Detallada de la Biblioteca urllib3**

	*Funcionalidades Clave*

	- *Gestión de Pool de Conexiones:* Una de las características más destacadas de *urllib3* es un manejo de pools de conexiones, lo que permite reutilizar y mantener conexiones abiertas. Esto es eficiente en términos de rendimiento, especialmente cuando se hacen múltiples solicitudes al mismo host.
	- dfd
	- *Soporte para Solicitudes HTTP y HTTPS:* *urllib3* ofrece un soporte sólido para realizar solicitudes tanto HTTP como HTTPS, brindando la flexibilidad necesaria para trabajar con una variedad de servicios web.
	- dde
	- *Reintentos Automáticos y Redirecciones:* Viene con un sistema incorporado para manejar reintentos automáticos y redirecciones, lo cual es esencial para mantener la robustez de las aplicaciones en entornos de red inestables.
	- dfdf
	- *Manejo de Diferentes Tipos de Autenticación:* Proporciona soporte para varios esquemas de autenticación, incluyendo una autenticación básica y digest, lo que la hace apta para interactuar con una amplia gama de APIs y servicios web.
	- dsds
	- *Soporte para Características Avanzadas del HTTP:* Incluye soporte para características como la compresión de contenido, el streaming de solicitudes y respuestas, y la manipulación de cookies, ofreciendo así un control detallado sobre las operaciones de red.
	- scdc
	- *Gestión de SSL/TLS:* *urllib3* tiene capacidades avanzadas para manejar la seguridad SSL/TSL. Incluyendo la posibilidad de trabajar con certificados personalizados y la verificación de la conexión segura.
	- sds
	- *Tratamiento de Excepciones y Errores:* La biblioteca maneja de manera eficiente las excepciones y errores, permitiendo a los desarrolladores gestionar situaciones con tiempos de espera, conexiones fallidas y errores de protocolo.

	*Aplicaciones y Uso*

	*urllib3* se utiliza en una variedad de contextos, desde scrapping web y automatización de tareas, hasta la construcción de clientes para interactuar con APIs complejas. Su capacidad para manejar conexiones de manera eficiente y segura la hace adecuada para aplicaciones que requieren un alto grado de interacción de red, así como para escenarios donde el rendimiento y la facilidad son cruciales.

	*Importancia en el Ecosistema de Python*

	Si bien existen otras bibliotecas como *requests* que son más amigables para principiantes, *urllib3* se destaca por su control detallado y su rendimiento en situaciones que requieren un manejo más profundo de las conexiones de red. Es una biblioteca fundamental para desarrolladores que busca un control más granular sobre sus operaciones HTTP/HTTPS en Python.
	</br>
2. **Práctica**

	Esta librería tendría básicamente la misma finalidad que *requests*; sin embargo, lo que cambiara es la facilidad al usarlas, ya que *requests* es una librería enfocada más al alto nivel otorgando una mayor facilidad de uso, mientras que *urllib3* va mucho más al detalle, siendo más compleja de emplear, ya que va un poco más a bajo nivel.

	Un dato interesante es que el emplear *requests* por detrás también se emplea parte de la biblioteca *urllib3*, ya que *requests* abstrae ciertas funcionalidades de esta, por lo que estas van de la mano realmente.

	En cuanto al *manejo de errores*, hemos visto que en request son muy sencillos de manejar con excepciones. Con *urllib3* también es posible hacerlo, pero al meterse más a bajo nivel nos da una mayor posibilidad de control de los tipos de errores y excepciones, aumentando más la dificultad de implementarlo, pero tiene sus ventajas, ya que a más control tengamos empleando esta librería, podremos mejorar el rendimiento de nuestros programas, otorgando una mayor optimización de nuestro código.

	*Solicitudes get*

	Una vez importada la librería, tendríamos que definir un controlador de conexiones, utilizando *PoolManager()*:

	<img src="/apuntes/python-practico/img-888.webp" alt="Captura de los apuntes" width="602" height="132" decoding="async">

	De esta forma, ahora *http* sería un controlador de conexiones de cara a futuras conexiones que queramos entablar.

	Ahora con esto, utilizando *request*, indicando como primer argumento el método por el cual se empleara la solicitud y como segundo el enlace, como lo haremos por *GET* utilizaremos el enlace `https://httpbin.org/get` y almacenaremos la respuesta en *response*.

	Para acceder a la respuesta, al emplear *urllib3*, ahora se accede a esta con la propiedad  *data*:

	<img src="/apuntes/python-practico/img-889.webp" alt="Captura de los apuntes" width="617" height="205" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-890.webp" alt="Captura de los apuntes" width="1773" height="63" loading="lazy" decoding="async">

	El problema con esto, es que por defecto nos retorna la respuesta en formato de *bytes* por ende tendríamos que aplicarle un *decode* para visualizarlo en el formato correcto:

	<img src="/apuntes/python-practico/img-891.webp" alt="Captura de los apuntes" width="612" height="205" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-892.webp" alt="Captura de los apuntes" width="662" height="240" loading="lazy" decoding="async">

	*Enviar datos por una petición POST*

	Ahora vamos a enviar datos en bruto mediante una petición *POST*, para nosotros enviar datos directamente y que no lo tome como formulario tendríamos que utilizar la propiedad *body*, mientras que si queremos que nos lo tome como formulario tendríamos que utilizar *fields*.

	Para ello, primeramente definiremos una variable data con un contenido y luego una variable *encoded_data* donde le pasemos el contenido de la variable data y le apliquemos un encode, para después pasarlo mediante la propiedad *body*:

	<img src="/apuntes/python-practico/img-893.webp" alt="Captura de los apuntes" width="815" height="271" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-894.webp" alt="Captura de los apuntes" width="671" height="341" loading="lazy" decoding="async">

	*Datos como diccionario*

	Si tratáramos nuestros datos a nivel de diccionario, no podremos aplicarle directamente un *encode*, ya que no es una cadena de texto, para ello tendríamos que emplear el uso de la librería *json*, ya que esta nos permite convertir un diccionario en una cadena de texto en este formato gracias a *dumps()* pasándole como argumento nuestro diccionario y a esto si que ya podríamos aplicarle un *encode:*

	<img src="/apuntes/python-practico/img-895.webp" alt="Captura de los apuntes" width="571" height="229" loading="lazy" decoding="async">

	Por lo que esto ya podríamos enviarlo mediante nuestra petición:

	<img src="/apuntes/python-practico/img-896.webp" alt="Captura de los apuntes" width="824" height="287" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-897.webp" alt="Captura de los apuntes" width="660" height="385" loading="lazy" decoding="async">

	De esta forma podremos enviar datos en forma de diccionario sin que el propio servidor lo llegue a percibir como si de un formulario se tratase.

	Al momento de enviar nuestros datos de esta manera se nos pudo presentar un error, en este caso no fue así, pero no será así siempre.

	Es por ello que lo mejor sería además arrastrar o agregar una cabecera *header* con la propiedad *headers*, la cual tendrá como llave *Content-Type* y como valor *application/json*:

	<img src="/apuntes/python-practico/img-898.webp" alt="Captura de los apuntes" width="1280" height="284" loading="lazy" decoding="async">

	Esto nos puede servir debido a que luego Python puede no saber como interpretar los datos que le están siendo enviados y de esta forma nos lo evitariamos.

	*Enviar un formulario*

	Si lo que queremos es que esto nos lo tome directamente como si de un formulario se tratase, lo que tendríamos que hacer sería pasarle mediante la propiedad *fields* directamente nuestro diccionario, sin aplicar ningún encode:

	<img src="/apuntes/python-practico/img-899.webp" alt="Captura de los apuntes" width="756" height="239" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-900.webp" alt="Captura de los apuntes" width="863" height="411" loading="lazy" decoding="async">

	*Mejor organización de nuestro request*

	También podríamos mandar una cabecera personalizada mediante una solicitud por el método *GET*, esto ya lo hemos hecho, por lo que ahora el enfoque será en cuanto a trabajar con esto teniendo una posible mejor organización si así lo consideramos.

	Ya que por cada coma en las cosas que vayamos colocando, podríamos dar un salto de línea, viendo todo de una forma un poco mejor organizada y esto no tendría ningún problema para ejecutar exactamente lo mismo:

	<img src="/apuntes/python-practico/img-901.webp" alt="Captura de los apuntes" width="607" height="327" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-902.webp" alt="Captura de los apuntes" width="668" height="261" loading="lazy" decoding="async">

	*Redirecciones*

	Con esta librería también podremos manejar redirecciones, en caso de no querer que nos redireccione nuestra solicitud, será tan simple como colocar la propiedad *redirect* y setearla en *False*, para este caso utilizaremos la dirección `https://httpbin.org/redirect/1`, la cual nos redirige a la ruta *get*.

	Teniendo esto en cuenta evitaremos la redirección e imprimiremos el código de estado con *status*:

	<img src="/apuntes/python-practico/img-903.webp" alt="Captura de los apuntes" width="676" height="433" loading="lazy" decoding="async">

	En este caso el código de estado es *302*, pero en el caso de permitir la redirección y llegar a la última página con éxito:

	<img src="/apuntes/python-practico/img-904.webp" alt="Captura de los apuntes" width="668" height="433" loading="lazy" decoding="async">

	Es importante mencionar que por defecto las redirecciones están permitidas.

	*Visualizar los distintos métodos y propiedades*

	Si en algún momento olvidamos los distintos métodos y propiedades que podrá contener nuestra respuesta, bastaría con pasarlo como argumento a nuestro método especial *dir()*, lo que nos retornara todas las posibilidades que tenemos:

	<img src="/apuntes/python-practico/img-905.webp" alt="Captura de los apuntes" width="1878" height="294" loading="lazy" decoding="async">

	*Recuperar la redirección final:*

	Para recuperar la redirección final que nos hizo nuestra solicitud, tendríamos que utilizar el método *get_redirect_location()* y con ello podríamos mostrarlo en pantalla en caso de tener las redirecciones en *False*:

	<img src="/apuntes/python-practico/img-906.webp" alt="Captura de los apuntes" width="1526" height="262" loading="lazy" decoding="async">

	*Webs con certificados SSL autofirmados*

	Para este caso nos iremos a la página `https://www.shodan.io/` y buscaremos por el puerto *443*:

	<img src="/apuntes/python-practico/img-907.webp" alt="Captura de los apuntes" width="1004" height="202" loading="lazy" decoding="async">

	En este caso, yo seleccioné la siguiente web:

	<img src="/apuntes/python-practico/img-908.webp" alt="Captura de los apuntes" width="413" height="283" loading="lazy" decoding="async">

	Si nos metemos en esta, veremos como tendremos que aceptar "riesgos", ya que contiene un certificado autofirmado:

	<img src="/apuntes/python-practico/img-909.webp" alt="Captura de los apuntes" width="988" height="396" loading="lazy" decoding="async">

	Lo cual tendremos que aceptar en *advanced* y dándole en *aceptar el riesgo y continuar*:

	<img src="/apuntes/python-practico/img-910.webp" alt="Captura de los apuntes" width="822" height="291" loading="lazy" decoding="async">

	Por lo tanto, si nosotros hiciéramos una petición *GET* a esta página y viéramos el output que esta nos trae, nos retornará un error, ya que tendremos que aceptar este certificado autofirmado:

	<img src="/apuntes/python-practico/img-911.webp" alt="Captura de los apuntes" width="607" height="269" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-912.webp" alt="Captura de los apuntes" width="1451" height="189" loading="lazy" decoding="async">

	La forma de evitar este error sería como tal ignorar el certificado autofirmado y entrar directamente, para ello utilizaríamos seguido de la importación de la librería:

	```python
	urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)  
	```

	Esto lo que hará por detrás es evitar que se realice una verificación por certificados autofirmados SSL, pero no será suficiente. También se tendrá que pasar como argumento la propiedad *cert_reqs* asignándole el valor *CERT_NONE* a nuestro *PoolManager()* para que funcione correctamente:

	<img src="/apuntes/python-practico/img-913.webp" alt="Captura de los apuntes" width="806" height="291" loading="lazy" decoding="async">

	De esta manera, ahora, al ejecutarlo, ya no tendríamos ningún problema:

	<img src="/apuntes/python-practico/img-914.webp" alt="Captura de los apuntes" width="464" height="198" loading="lazy" decoding="async">

	Esto mismo se puede realizar con request de la siguiente manera:

	<img src="/apuntes/python-practico/img-915.webp" alt="Captura de los apuntes" width="1072" height="202" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-914.webp" alt="Captura de los apuntes" width="464" height="198" loading="lazy" decoding="async">

	Como *requests* y *urllib3* son librerías que van muy de la mano, realmente queda de forma muy similar el evitar que nos dé errores al momento de que una página tenga una certificación SSL autofirmada y acceder.
