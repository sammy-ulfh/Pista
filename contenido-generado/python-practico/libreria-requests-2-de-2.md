---
curso: "python-practico"
modulo: "python-practico/librerias-comunes"
leccion: "libreria-requests-2-de-2"
titulo: "Librería requests (2 de 2)"
orden: 10
minutos: 16.6
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 31
ejercicios: []
---

1. **Introducción**

	*Curiosidades y Aspectos Complementarios de requests*

	- *Orígenes y Popularidad:* requests fue creada por Kenneth Reitz en 2011. Su diseño enfocado en la simplicidad y la legibilidad rápidamente la convirtió en una de las bibliotecas más populares en Python. Su lema es *HTTP for Humans*, reflejando su objetivo de hacer solicitudes HTTP accesibles y fáciles para los desarrolladores.
	- ds
	- *Comunidad y Contribuciones:* requests es un proyecto de código abierto y ha recibido contribuciones de numerosos desarrolladores. Esto asegura su constante actualización y adaptación a las nuevas necesidades y estándares de la web.
	- sdd
	- *Inspiración en Otros Lenguajes:* El diseño de requests se inspira en otras bibliotecas HTTP de alto nivel de otros lenguajes de programación, buscando combinar lo mejor de cada uno para crear una experiencia de usuario óptima en Python.
	- sds
	- *Extensibilidad:* Aunque requests es poderosa por si sola, su funcionalidad se puede ampliar con varios complementos. Esto incluye adaptadores para diferentes tipos de autenticación, soporte para servicios como AWS, o herramientas para aumentar su rendimiento.
	- dsdd
	- *Uso en la Educación y la Industria:* Debido a su simplicidad y potencia, requests se ha convertido en una herramienta de enseñanza estándar para la programación de red en Python. Además, es ampliamente utilizada en la industria para desarrollar aplicaciones que requieren comunicación con servidores web.
	- dsdfe
	- *Casos de Uso Diversos:* Desde la automatización de tareas y el scraping web hasta el testing y la integración con APIs, requests tiene un rango de aplicaciones muy amplio. Su versatilidad la hace adecuada tanto para proyectos pequeños como para aplicaciones empresariales a gran escala.
	- dsdds
	- *Soporte para Proxies y Timeouts:* requests ofrece un control detallado sobre aspectos como proxies y timeouts, lo cual ews crucial en entornos de producción donde la gestión del tráfico de red y la eficiencia son importantes.
	- sdd
	- *Manejo Eficiente de Excepciones:* Proporciona una forma clara y consistente de manejar errores de red y HTTP, lo que ayuda a los desarroladores a escribir aplicaciones más robustas y confiables.

	En resumen, requests no es solo una biblioteca de alto nivel para solicitudes HTTP en Python, sino que también es un ejemplo brillando de diseño de software y colaboración comunitaria. Su facilidad de uso, junto con su potente funcionalidad, la convierte en una herramienta indispensable para cualquier desarrollador que trabaje con Python en el ámbito de la web.
	</br>
2. **Práctica**

	*Autenticarse  mediante una petición*

	Existen páginas como la siguiente:

	`https://httpbin.org/basic-auth/foo/bar`

	Esto nos servirá para realizar esta práctica, pero al nosotros abrir el sitio en el navegador lo que nos solicitara será credenciales para tener acceso.

	<img src="/apuntes/python-practico/img-857.webp" alt="Captura de los apuntes" width="540" height="334" decoding="async">

	El usuario correcto es *foo* y la contraseña es *bar*.

	Con esto en mente, ahora realizaríamos una petición *get* a este enlace y como argumentos estarán el enlace primeramente y como segundo tendremos la propiedad *auth* a la cual le asignaremos una tupla donde el primer elemento será el usuario y el segundo la contraseña:

	<img src="/apuntes/python-practico/img-858.webp" alt="Captura de los apuntes" width="890" height="165" loading="lazy" decoding="async">

	Primeramente, lo ejecutaremos con credenciales válidas y veremos como esto no nos retorna nada; sin embargo, si en lugar de tratar de mostrar la respuesta, mostramos el código de estado, tendríamos lo siguiente:

	<img src="/apuntes/python-practico/img-859.webp" alt="Captura de los apuntes" width="976" height="300" loading="lazy" decoding="async">

	Si buscáramos este error, veríamos como el error 401 en solicitudes HTTP significa de *unauthorized*, lo cual es un error que se presenta cuando no tenemos autorización de entrar, debido a que hemos colocado las credenciales incorrectas.

	Ahora, si colocáramos las credenciales correctas, veríamos como ya nos retornaría una respuesta:

	<img src="/apuntes/python-practico/img-860.webp" alt="Captura de los apuntes" width="966" height="379" loading="lazy" decoding="async">

	Existe una forma más "complicada" de realizar una autenticación y esta sería autenticarnos mediante la creación de un objeto temporal.

	Para realizar esto, tendríamos que importar de *requests.auth* la clase *HTTPBasicAuth* y con esta crear la instancia temporal a donde le pasaremos los argumentos de usuario y contraseña:

	<img src="/apuntes/python-practico/img-861.webp" alt="Captura de los apuntes" width="1094" height="389" loading="lazy" decoding="async">

	Esto lo podríamos considerar como complicarnos más, ya que sin ningún problema podríamos autenticarnos solo con la propiedad *auth* y pasándole como tupla las credenciales correctas.

	Esto funciona correctamente debido a que la web tiene un login sencillo al cual se le llama *HTTPBasciAuth*. Si en lugar de esto fuese una web más completa con su propio formulario y que llegan a manejar más datos, no funcionaria de esta forma, ya que tendríamos que adecuarlo para iniciar sesión correctamente.

	Por lo que, lo que hemos realizado solamente es para paneles básicos de autenticación.

	*Modificar las cookies*

	De la misma forma que es posible modificar nuestros *headers* también es posible modificar nuestras *cookies*. Esto puede venir bien para no dar información de nuestro lado de la petición que estamos realizando, por lo que la información entregada al servidor sería modificada por nosotros mismos.

	En este caso, utilizando la misma página, tendremos:

	`https://httpbin.org/cookies`

	La cual no contendrá ninguna cookie, ya que no estamos enviando ni arrastrando ninguna cookie de sesión.

	<img src="/apuntes/python-practico/img-862.webp" alt="Captura de los apuntes" width="323" height="115" loading="lazy" decoding="async">

	Entonces, si nosotros hiciéramos una petición *get* a esta url veríamos como nos retorna las cookies vacías. Recordando de qué manera realizábamos la petición para modificar nuestros *headers*, podremos hacer lo mismo para nuestras cookies, creando primeramente un diccionario de pares de clave-valor y pasándolo a la propiedad *cookies*.

	Ahora crearemos nuestro diccionario de forma un poco distinta, le asignaremos un valor a una variable y luego le haremos un *typecasting* para convertirlo a diccionario, donde si lo mostramos por pantalla lo tendríamos de la siguiente manera:

	<img src="/apuntes/python-practico/img-863.webp" alt="Captura de los apuntes" width="415" height="73" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-864.webp" alt="Captura de los apuntes" width="288" height="73" loading="lazy" decoding="async">

	Entonces, nosotros podríamos enviárselo a nuestra petición y al mostrar la respuesta, tendríamos lo siguiente:

	<img src="/apuntes/python-practico/img-865.webp" alt="Captura de los apuntes" width="814" height="415" loading="lazy" decoding="async">

	*Enviar archivos mediante una petición*

	Recordando cuando realizamos nuestra petición por *POST*, la respuesta tenía un apartado *files:*

	<img src="/apuntes/python-practico/img-866.webp" alt="Captura de los apuntes" width="356" height="217" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-867.webp" alt="Captura de los apuntes" width="664" height="365" loading="lazy" decoding="async">

	Entonces este apartado nos listaría algún archivo en caso de subirlo.

	Para esto, primeramente crearemos por ejemplo *mi_archivo.txt* y en este pondremos cualquier cosa, como "Hola, soy el contenido del archivo".

	<img src="/apuntes/python-practico/img-868.webp" alt="Captura de los apuntes" width="460" height="142" loading="lazy" decoding="async">

	En este caso, para enviar el archivo desde nuestra petición también tendríamos que crear un diccionario, donde la clase sería la que nosotros queramos, como *archivo* y el valor sería el archivo, donde con *open* lo abriremos en modo de lectura y finalmente lo pasaremos para la petición con el atributo *files*:

	<img src="/apuntes/python-practico/img-869.webp" alt="Captura de los apuntes" width="537" height="178" loading="lazy" decoding="async">

	Por lo que si lo ejecutáramos, veríamos como ahora el contenido de nuestro archivo estaría en el apartado de *files*:

	<img src="/apuntes/python-practico/img-870.webp" alt="Captura de los apuntes" width="866" height="432" loading="lazy" decoding="async">

	*Arrastrar cookies*

	Al momento de estar en páginas que requieren de un logueo, si se listan contenidos internos, pues para cada petición tendríamos que estar colocando las cookies *cookies=cookies*, pero existe una forma de ahorrarnos esto y directamente saber con qué usuario se está tratando. Esto es posible gracias al uso de *sesiones*.

	Un ejemplo sería primeramente setear una cookie, esto es posible gracias a:

	`https://httpbin.org/cookies/set/{name}/{value}`

	Si nosotros en name colocáramos "my_cookie" y en value "123123", nos redirige a *cookies* y vemos como aquí ya está almacenada:

	<img src="/apuntes/python-practico/img-871.webp" alt="Captura de los apuntes" width="325" height="110" loading="lazy" decoding="async">

	Lo cual nos almacenará una cookie y después si cerramos y entráramos directamente a `https://httpbin.org/cookies/`, veríamos como nos sigue cargando esta cookie sin ningún problema.

	Esto se debe a que el navegador por defecto nos almacena las cookies y las arrastra en una misma sesión, pero por terminal sería distinto, ya que no tenemos nada que nos esté arrastrando una sesión.

	Lo podríamos ver si lanzamos nuevamente una petición a la página de las cookies, donde a menos que nosotros definamos una *cookie*, no nos retornara más que las cookies vacías.

	*Ejemplo:*

	Ahora podríamos replicar lo mismo que hicimos en el navegador, primeramente enviando la solicitud en la que seteamos una cookie y después otra petición en la que recuperamos los valores en la página de las cookies.

	<img src="/apuntes/python-practico/img-872.webp" alt="Captura de los apuntes" width="676" height="250" loading="lazy" decoding="async">

	Pero al momento de ejecutarlo, veremos cómo el resultado final es que las cookies están vacías, lo cual se debe a que  ambas peticiones son como dos peticiones totalmente distintas y separadas una de la otra, por lo que no arrastra las cookies de la anterior.

	Esto se debe a la forma en la que trabaja Python con las peticiones, pero con *requests* podremos utilizar *Session()*, lo cual lo almacenaremos como una variable y ahora cada que ejecutemos algún método de petición en lugar de utilizar *requests* utilizaríamos el nombre de la variable, debido a que esta ya será una sesión la cual almacenara las peticiones que se realicen y en el caso de que se almacenen cosas, esto ya lo arrastrará sin ningún problema:

	<img src="/apuntes/python-practico/img-873.webp" alt="Captura de los apuntes" width="744" height="520" loading="lazy" decoding="async">

	Por ende, esto viene bien cuando nos autenticamos en un sitio, ya que ya no tendríamos que preocuparnos por estar arrastrando las cookies y esto automáticamente lo haría, por lo que podremos acceder ya a rutas internas, sin ninguna preocupación, ya que ya lo considerará.

	*Preparar una solicitud antes de enviarla*

	Para esto, primeramente tendremos que traer *Request* y *Session* de la libreria *requests* y trabajaremos con la pagina `https://httpbin.org/get`:

	<img src="/apuntes/python-practico/img-874.webp" alt="Captura de los apuntes" width="410" height="119" loading="lazy" decoding="async">

	Ahora, definiríamos una sesión con *Session* y lo almacenaríamos en la variable *s*, lo cual nos servirá para ir arrastrando las cosas que vayamos realizando.

	Después de esto, definiremos nuestra consulta con *Request* como si de una clase se tratase, está como argumentos principales, tendrá primeramente el método por el que vamos a  realizar la consulta, en este caso *GET*, como segundo argumento la URL y de ahí podremos agregar cosas que vayamos a modificar como headers o cookies, en este caso agregaremos un *Custom-Header*:

	<img src="/apuntes/python-practico/img-875.webp" alt="Captura de los apuntes" width="512" height="117" loading="lazy" decoding="async">

	Aquí tendríamos ya definida nuestra *request*, pero esta tendríamos que prepararla, para por ejemplo poder ir realizando modificaciones en función de las peticiones que vayamos a desear realizar.

	Para esto, en una variable *prepped* guardaremos el resultado de preparar nuestra *request*, que será la  variable *req* y utilizaremos el método *prepare()*. Con esto listo ahora podremos modificar, por ejemplo, nuestro *Custom-Header* y como si de un valor en un diccionario se tratase, tendríamos que acceder a este mediante *prepped.headers* y seleccionar la posición indicada para cambiar su valor:

	<img src="/apuntes/python-practico/img-876.webp" alt="Captura de los apuntes" width="622" height="81" loading="lazy" decoding="async">

	Con esto listo solo nos quedaría enviar nuestra solicitud, para ello utilizaremos nuestra sesión con el método *send()*, donde pasaremos como argumento nuestra request ya preparado *prepped* y almacenaremos la respuesta en *response*, donde finalmente podremos acceder a la respuesta como lo hemos visto antes, con el atributo *text*:

	<img src="/apuntes/python-practico/img-877.webp" alt="Captura de los apuntes" width="353" height="91" loading="lazy" decoding="async">

	Quedando el código finalmente así:

	<img src="/apuntes/python-practico/img-878.webp" alt="Captura de los apuntes" width="633" height="393" loading="lazy" decoding="async">

	Finalmente, tendríamos como resultado nuestra respuesta con el custom header que colocamos en un inicio, modificado:

	<img src="/apuntes/python-practico/img-879.webp" alt="Captura de los apuntes" width="684" height="266" loading="lazy" decoding="async">

	Con esto en mente, realmente lo que nos permitiría hacer es irlo preparando sobre la marcha para realizar modificaciones antes de realizar el envío final de nuestra solicitud, por lo que, por ejemplo, en este caso podríamos agregar un header nuevo en el proceso de preparar nuestra solicitud:

	<img src="/apuntes/python-practico/img-880.webp" alt="Captura de los apuntes" width="663" height="140" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-881.webp" alt="Captura de los apuntes" width="662" height="287" loading="lazy" decoding="async">

	*Manejar un historio de las redirecciones que se den en una solicitud*

	Al momento de estar manejando solicitudes, puede pasar en alguna página que al momento de realizar una solicitud esta haga redirecciones hacia otras páginas, por lo cual nosotros tendremos una forma de recoger todas las url's de estas páginas, para tener como un histórico de ellas.

	Para esto podríamos poner un ejemplo propio con *github*, ya que esta página, si nosotros intentamos entrar con *http:\/\/github.com*, nos hará una redirección a *https:\/\/github.com*.

	Para ver esto, al hacer una petición con Python, podríamos realizar una solicitud por el método *get* a `http://github.com` y al final mostrar el url de la respuesta:

	<img src="/apuntes/python-practico/img-882.webp" alt="Captura de los apuntes" width="437" height="357" loading="lazy" decoding="async">

	Veremos como nos aplica la redirección y nos devuelve la url de la redirección que aplica github.

	Incluso en Python, tenemos la posibilidad de evitar las redirecciones al momento de realizar una solicitud, utilizando la propiedad *allow_redirects* y asignándole el valor *False*, lo cual nos retornara la misma url que tendremos en un inicio:

	<img src="/apuntes/python-practico/img-883.webp" alt="Captura de los apuntes" width="622" height="344" loading="lazy" decoding="async">

	Teniendo esto en mente, tenemos la posibilidad de ver todas las URL anteriores a la final por las que hemos pasado, utilizando el método *history* en nuestra respuesta:

	<img src="/apuntes/python-practico/img-884.webp" alt="Captura de los apuntes" width="386" height="352" loading="lazy" decoding="async">

	Esto por si solo, nos retorna un iterable, que podremos ir iterando y por cada iteración, teniendo la posibilidad de extraer el url y el código de estado que nos ha dado. Finalmente, si todas las url por las que se ha pasado antes de llegar a la final se muestran sin problemas, mostraremos la final gracias al *else* en los bucles:

	<img src="/apuntes/python-practico/img-885.webp" alt="Captura de los apuntes" width="1183" height="484" loading="lazy" decoding="async">

	De esta forma ya podríamos gestionar todas las url por las que pasa nuestra petición cuando nos redirecciona a otras páginas.

	*Mejor manejo de sesiones*

	Las sesiones se pueden manejar de mejor manera con *with*, colocando así todo lo que deseemos realizar con la sesión correspondiente dentro de un bloque, como dos peticiones *get*

	<img src="/apuntes/python-practico/img-886.webp" alt="Captura de los apuntes" width="394" height="300" loading="lazy" decoding="async">

	Una forma de ver esto sería utilizar la propiedad *auth* para setearlo a una tupla con el valor del usuario y contraseña, para la ruta, donde en la primera solicitud se autenticaría, pero ya para la segunda nos estaría arrastrando la autenticación con la sesión correspondiente:

	<img src="/apuntes/python-practico/img-887.webp" alt="Captura de los apuntes" width="575" height="674" loading="lazy" decoding="async">

	Con esto ya no tendríamos que autenticarnos para la segunda petición, finalmente, pues esta sería una forma más organizada de trabajar con sesiones.
