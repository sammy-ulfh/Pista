---
curso: "python-desde-cero"
modulo: "python-desde-cero/modulos-y-archivos"
leccion: "creacion-y-distribucion-de-paquetes"
titulo: "Creación y distribución de paquetes"
orden: 26
minutos: 21.1
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 43
ejercicios: []
---

1. **Introducción**

	La creación y distribución de paquetes es un proceso clave en el ecosistema de Python, que permite a los desarrolladoes compartir sus bibliotecas y módulos con la comunidad global. Un paquete en Python es una colección estructurada de módulos que pueden incluir código reutilizable, nuevos tipos de datos, o incluso aplicaciones completas.

	*Creación de Paquetes:*

	Para crearun paquete, primero se organiza el código en módulos y subpaquetes dentro de una estructura de directorios. Cada paquete en Python debe de contener un archivo especial llamado *\_\_init\_\_.py*, que puede estar vacío, pero indica que el directorio es un paquete de Python. Este archivo también puede contener código para inicializar el paquete.

	*Estructura de Directorios:*

	La estructura típica de un paquete podría incluir directorios para documentación, pruebas y el propio código, asi como archivos de configuración para la instalación y la distribución del paquete.

	*Archivos de Configuración:*

	Los archivo *setup.py* y *pyproject.toml* son fundamentales en la creación de paquetes. Contienen metadatos y configuraciones necesarias para la distribución del paquete, como el nombre del paquete, versión, descripción y dependencias.

	*Distribución de Paquetes:*

	Para distribuir un paquete se suele utilizar Python Package Index (*PyPi*), que es un repositorio de software para la comunidad de Python. Subir un paquete a PyPi lo hace accesible para otros desarroladores mediante herramientas de gestión de paquetes como *pip*.

	*Instalación Global:*

	Al distribuir un paque, los usuarios pueden instalarlo a nivel global en su entorno de Python, lo que significa que estará disponible para todos los proyectos en ese entorno. Esta es una manera eficaz de compartir código y permitir que otros se beneficien y contribuyan al trabajo que has hecho.

	*¿Por Qué Empaquetar y Distribuir?:*

	Empaquetas y distribuir software tiene varios beneficios. Permite la reutilización de código, facilita la colaboración entre desarrolladores, y ayuda a la gestión de dependencias y versiones de software. Además, contribuir a la comunidad de código abierto puede llevar al reconocimiento del trabajo del desarrollador y proporcionar oportunidades para recibir retroalimentación y mejoras colaborativas.

	En resumen, aprenderemos el proceso de empaquetado y distribución de software en Python, desde la organización inicial del código hasta su publicación en PyPI y la instalación global, brindando las habilidades necesarias para contribuir efectivamente al ecosistema de Python.

	</br>
2. **Práctica**

	Los paquetes en Python nos servirán para organizar nuestros módulos que son scripts en Python los cuales realizan diversas funcionalidades y además contiene un archivo *\_\_init\_\_.py*, para que Python entienda bien la jerarquía de directorios de nuestro paquete.

	**¿Qué es PyPi?**

	El *Python Package Index* es el repositorio de software oficial para aplicaciones de software de terceros en el lenguaje de programación Python.

	Si nosotros llegamos a instalar una librería como pwntools con pip3: *pip3 install pwntools*, al utilizar este gestor de paquetes lo estaríamos instalando directamente de PyPi.

	Por lo que si vamos a la web de [PyPi](https://pypi.org/) y buscamos por *pwntools*, aquí veríamos el proyecto de esta librería, una descripción de como funciona, los contribuidores e inclusos los releases que se le han dado.

	Incluso aquí podremos ver como instalar el paquete:

	<img src="/apuntes/python-desde-cero/img-464.webp" alt="Captura de los apuntes" width="313" height="133" decoding="async">

	Entonces, para poder subir proyectos en PyPi, tendremos que crearnos una cuenta y agregar nuestro móvil por el doble factor de autenticación y una vez hecho loguearnos, de lo contrario no podremos subir nuestros propios paquetes en PyPi.


	Una vez tengamos creada nuestra cuenta de PyPi, en el directorio del usuario nos crearemos un archivo *.pypirc*, el cual tendrá como contenido:

	```text
	[pypi]
		username = __token__
		password = 
	```

	La password o token es algo que aun no tenemos pero para ello nos tendemos que ir a nuestro perfil en PyPi y luego a *account setting*, ahí buscaríamos hasta API tokens y presionaríamos en *Add API tokens*:

	<img src="/apuntes/python-desde-cero/img-465.webp" alt="Captura de los apuntes" width="757" height="197" loading="lazy" decoding="async">

	De esta manera crearemos un token para todos los proyectos dándole un nombre y este será el que almacenaremos en el apartado de password.

	**Creando nuestro propio paquete en Python**

	La idea ahora será crear un paquete *Hack4u* o con cualquier otro nombre en el cual a través de algunos módulos se crearan funciones que nos permitirán en todo momento saber los cursos que están existentes en la academia *Hack4u* donde cada curso nos lo represente de la forma *Nombre* *Link* y *Duración*.

	Así mismo, luego crearemos un módulo *utils.py*, el cual luego se encargue de darnos la duración total de cada curso (la suma de las horas totales).

	Un paquete es un directorio que contiene una serie de módulos, por lo que primeramente crearemos nuestro directorio *hack4u_project* y dentro de este primeramente crearemos nuestro directorio *hack4u*, así como los archivo *setup.py* y *README.md*, donde README será para agregar la descripción de este proyectito.

	Por lo que ahora tendríamos nuestro directorio *hack4u_project* de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-466.webp" alt="Captura de los apuntes" width="529" height="114" loading="lazy" decoding="async">

	Ahora dentro del directorio *hack4u* el cual será nuestro paquete.

	Ahora estando dentro del paquete tendremos que crearnos un archivo *\_\_init\_\_.py*, en cada paquete que lleguemos a crear tendremos que colocar este archivo, por lo que si en nuestro directorio  principal *hack4u_project* tuviésemos otro paquete, este también tendría que llevar el archivo. Esto es necesario para que Python comprenda la jerarquía de los directorios.

	Ahora, en nuestro paquete *hack4u*, crearemos un módulo el cual se llamara *cursos.py*:

	<img src="/apuntes/python-desde-cero/img-467.webp" alt="Captura de los apuntes" width="287" height="76" loading="lazy" decoding="async">

	En módulo que hemos creado comenzaremos creando la clase Curso, la cual tendrá contemplado en el constructor los atributos *name*, *duration* y *link*:

	<img src="/apuntes/python-desde-cero/img-468.webp" alt="Captura de los apuntes" width="484" height="182" loading="lazy" decoding="async">

	Con esto, lo que tendremos en mente es que cada curso lo tendremos en cuenta como un objeto, por lo que crearemos una lista *courses*, que es una lista de objetos. Aquí se definirán objetos que serán instancias temporales de la clase *Cursos*. En este caso actualmente la academia cuenta con 4 cursos, por lo que pondremos estos:

	*Links*

	* *Introducción a Linux:*`https://hack4u.io/cursos/introduccion-a-linux/`
	* *Personalización de entorno en Linux:* `https://hack4u.io/cursos/personalizacion-de-entorno-en-linux/`
	* *Python ofensivo:* `https://hack4u.io/cursos/python-ofensivo/`
	* *Introducción al Hacking:* `https://hack4u.io/cursos/introduccion-al-hacking/`

	Con esto, ahora crearemos nuestro 4 objetos dentro de la lista y de esta manera al imprimir la lista veremos que es una lista de objetos:

	<img src="/apuntes/python-desde-cero/img-469.webp" alt="Captura de los apuntes" width="1761" height="571" loading="lazy" decoding="async">

	Aquí podremos recordar que tenemos la capacidad de listar un objeto con algo que queramos mostrar utilizando en método especial *\_\_str\_\_*, por ende lo que haremos será recorrer la lista y listar cada objeto:

	<img src="/apuntes/python-desde-cero/img-470.webp" alt="Captura de los apuntes" width="275" height="64" loading="lazy" decoding="async">

	Con esto listo, ahora definiríamos que vamos a mostrar cuando un objeto sea listado, mediante nuestro método especial *\_\_str\_\_*:

	<img src="/apuntes/python-desde-cero/img-471.webp" alt="Captura de los apuntes" width="1276" height="700" loading="lazy" decoding="async">

	De esta manera, al listar objeto a objeto recorriendo la lista, nos funcionaría correctamente.

	Pero aqui tenemos un pequeño problema, ya que solo funciona si queremos listar directamente el objeto, al hacerlo con la lista nos seguiría representando que son objetos:

	<img src="/apuntes/python-desde-cero/img-472.webp" alt="Captura de los apuntes" width="1749" height="108" loading="lazy" decoding="async">

	Para solucionar esto, lo que haremos será utilizar otro método especial, este será sustituido en el lugar de *\_\_str\_\_*, ya que funciona de la misma manera, pero nos permitirá que la información de cada curso llegue a mostrarse incluso cuando listemos la lista de objetos:

	<img src="/apuntes/python-desde-cero/img-473.webp" alt="Captura de los apuntes" width="682" height="91" loading="lazy" decoding="async">

	Este es el método especial *\_\_repr\_\_* y ahora al listar el contenido de la lista si funcionaria sin ningún problema:

	<img src="/apuntes/python-desde-cero/img-474.webp" alt="Captura de los apuntes" width="1855" height="132" loading="lazy" decoding="async">

	Y si volviéramos a colocar el listar cada objeto de forma individual, mientras recorremos la lista de objetos, nos funcionaría de la misma manera la que funciona como un tipo de *\_\_str\_\_*:

	<img src="/apuntes/python-desde-cero/img-475.webp" alt="Captura de los apuntes" width="1109" height="200" loading="lazy" decoding="async">

	Ahora lo que haremos será colocar lo que imprime los cursos en una función, la cual llamaremos *list_courses*:

	<img src="/apuntes/python-desde-cero/img-476.webp" alt="Captura de los apuntes" width="317" height="90" loading="lazy" decoding="async">

	Con esto listo, dentro del directorio de nuestro paquete vamos a ejecutar el intérprete de Python e importaremos nuestro paquete *hack4u*, tendrá que ser dentro del mismo directorio la que de esta manera buscara primeramente aqui y lo encontrara sin problemas:

	<img src="/apuntes/python-desde-cero/img-477.webp" alt="Captura de los apuntes" width="1111" height="282" loading="lazy" decoding="async">

	De esta manera, lo que estamos haciendo es que con *import hack4u.cursos*, estamos importando el módulo *cursos.py* de nuestra librería *hack4u*. Traemos directamente el módulo para poder llamar a la función con *hack4u.cursos.list_courses()* y de esta manera se nos listan los cursos.

	O podríamos importar de este módulo la función *list_courses*, de esta manera ya no tendríamos que referenciar a la librería y módulo al inicio:

	<img src="/apuntes/python-desde-cero/img-478.webp" alt="Captura de los apuntes" width="1106" height="174" loading="lazy" decoding="async">

	En este caso, nos estaremos dando cuenta de que tenemos que colocar el nombre del paquete y luego el nombre del módulo al momento de importarlo (*import hack4u.cursos*), por lo que no podríamos hacer *from hack4u import list_courses*, ya que esto nos daría error. Lo cual se debe a que Python entra en conflicto, ya que no sabe en qué módulo se encuentra esta función.l

	Entonces para esto tenemos nuestro archivo *\_\_init\_\_.py*, aquí definiremos que para nuestro módulo *cursos* no importe la función o directamente todo:

	<img src="/apuntes/python-desde-cero/img-479.webp" alt="Captura de los apuntes" width="1115" height="375" loading="lazy" decoding="async">

	O al definir en nuestro archivo *\_\_init\_\_.py* que nos importe todo, igual funcionaría:

	<img src="/apuntes/python-desde-cero/img-480.webp" alt="Captura de los apuntes" width="1105" height="357" loading="lazy" decoding="async">

	Es importante recordar que para poder importar nuestro paquete, el directorio *hack4u* de nuestro paquete tendrá que ser un subdirectorio del directorio actual, ya que será donde Python buscará.

	De esta manera, ahora también podríamos importar directamente la función *list_courses* de nuestro paquete, ya que gracias a la definición en nuestro *\_\_init\_\_.py* ya se estará cargando el contenido del módulo *cursos* y Python sabrá de dónde tomar la función.

	<img src="/apuntes/python-desde-cero/img-481.webp" alt="Captura de los apuntes" width="1105" height="209" loading="lazy" decoding="async">

	Por lo que si quisiéramos e importamos todo lo del módulo *courses* tanto en nuestro *\_\_init\_\_.py* como al intérprete, podríamos hasta jugar directamente con la lista de los objetos *courses*:

	<img src="/apuntes/python-desde-cero/img-482.webp" alt="Captura de los apuntes" width="1863" height="228" loading="lazy" decoding="async">

	Así como con cualquier otro contenido que estuviese definido dentro de nuestro módulo.

	Ahora, en nuestro módulo vamos a crear una función *search_course_by_name()*, con esta vamos a recorrer la lista de objetos y nos enfocaremos en el nombre, donde nosotros podremos pasarle como argumento un nombre la función y esta comparará este nombre con cada objeto, en caso de encontrar el curso con el nombre que le pasemos, lo retornará.

	De lo contrario, al terminar el bucle  retornaría None.

	<img src="/apuntes/python-desde-cero/img-483.webp" alt="Captura de los apuntes" width="381" height="184" loading="lazy" decoding="async">

	De esta manera, ahora podríamos buscar por nombre cuando carguemos todo de nuestro paquete en el intérprete de Python:

	<img src="/apuntes/python-desde-cero/img-484.webp" alt="Captura de los apuntes" width="875" height="161" loading="lazy" decoding="async">

	Con esto ya tendríamos representado lo que nos interesaría con base en los cursos, pero ahora vamos a crear otro módulo llamado *utils.py*, este nos servirá para devolver la duración total para todos los cursos.

	<img src="/apuntes/python-desde-cero/img-485.webp" alt="Captura de los apuntes" width="584" height="146" loading="lazy" decoding="async">

	En nuestro módulo *utils.py* primeramente tendremos que darle el acceso a la lista de objetos que contiene toda la información, por ende tendremos que importarlo desde el modulo *cursos* que tenemos en el directorio actual:

	<img src="/apuntes/python-desde-cero/img-486.webp" alt="Captura de los apuntes" width="308" height="49" loading="lazy" decoding="async">

	De esta  manera estaríamos importando la lista de objetos *courses*, para tener acceso a ella. Esto nos permitirá trabajar con toda la información de los cursos y en este caso acceder a lo que nos interesa que es la duración en horas de estos.

	Entonces ahora crearemos una función *total_duration()* y en esta definiremos en una sola línea si deseamos que nos itere en toda la lista  y por cada objeto tome el atributo *duration* y todo esto lo pondremos dentro de la función *sum()* que ya trae el propio Python, que recordemos que puede funcionar para iterables y va recogiendo y sumando los valores en cada iteración, por lo que nos regresaría una suma total de las horas de todos los cursos.

	<img src="/apuntes/python-desde-cero/img-487.webp" alt="Captura de los apuntes" width="555" height="86" loading="lazy" decoding="async">

	Sabiendo que esto nos retornaría la cantidad total de horas de todos los cursos, por último tendremos que indicar que nos importe todo lo de este módulo cuando sea llamado el paquete *hack4u*, lo cual también se especifica en nuestro archivo *\_\_init\_\_.py*:

	<img src="/apuntes/python-desde-cero/img-488.webp" alt="Captura de los apuntes" width="263" height="55" loading="lazy" decoding="async">

	Finalmente, lo importaríamos de nuestro paquete dentro del intérprete de Python y ahora estaría funcionando correctamente:

	<img src="/apuntes/python-desde-cero/img-489.webp" alt="Captura de los apuntes" width="714" height="188" loading="lazy" decoding="async">

	Recordemos que dentro del intérprete de Python, cuando valores son retornados de funciones, sin importar el tipo de dato, esto se mostrara directamente, a diferencia de cuando ejecutamos un script, ya que en este caso nosotros tendremos que decidir si mostrarlo en pantalla o no con *print()*.

	Ahora, si observáramos todos los archivos que tenemos dentro de donde se encuentran nuestros módulos, se nos genera una carpeta *\_\_pycache\_\_*, esta podremos borrarla y no afectara en nada:

	<img src="/apuntes/python-desde-cero/img-490.webp" alt="Captura de los apuntes" width="646" height="131" loading="lazy" decoding="async">

	Ahora, desde el directorio principal del proyecto, todos los archivos y carpetas los veríamos de esta manera (en cuanto a que existan, lo mostrado solo es una representación de todo en forma de arbol):

	<img src="/apuntes/python-desde-cero/img-491.webp" alt="Captura de los apuntes" width="280" height="232" loading="lazy" decoding="async">

	Ahora, para poder crear nuestro paquete y subirlo a *PyPi*, tendremos que colocar cierta información en nuestro archivo setup.py, lo cual es lo siguiente:

	```text
	from setuptools import setup, find_packages

	# Leer el contenido del archivo README.md
	with open("README.md", "r", encoding="utf-8") as fh:
		log_description = fh.read()

	setup(
		name="hack4u",
		version="0.1.0",
		packages=find_packages(),
		install_requires=[],
		author="Sammy-ulfh",
		description="Una biblioteca para consultar cursos de hack4u.",
		long_description=log_description,
		long_description_content_type="text/markdown",
		url="https://hack4u.io",
	)
	```

	Primeramente en *name* colocaríamos el nombre del paquete.

	En *version* la versión de nuestro paquete, al ser la primera versión, será la "0.1.0".

	En *packages* se utiliza la función *find_packages()* para encontrar o descubrir todos los paquetes que existan, es posible tener múltiples paquetes por lo que esta función en el directorio actual los busca y los muestra o representa.

	De resto colocamos el autor y la descripción.

	En *long_description* estaríamos colocando el contenido a mostrar, lo que pasa donde está el comentario es que se lee el archivo y todo su contenido se guarda en la variable *long_description*, por ello mismo se iguala a la variable y es todo el contenido del archivo de presentación del proyecto y está en formato Markdown y esto lo indicamos en *long_description_content_type*.

	Finalmente le agregamos una *url*.

	En este caso, como el mismo proyecto ha sido creado diversas veces por lo que es mejor cambiarlo para evitar errores al subirlo con twine.

	*Markdown* tiene cierta forma de configurar el contenido para una buena visualización mediante lugares que lo soporten, tales como *github*. Aquí no será explicado el uso de *Markdown* por ende lo que colocaremos en el archivo README.md, será lo siguiente:

	````markdown
	# Hack4u Academy Courses Library
	
	Una biblioteca de Python para consultar cursos de la academia Hack4u.
	## Cursos disponibles
	
	- Introducción a Linux [15 horas]
	- Personalización de entorno en Linux [3 horas]
	- Python ofensivo [35 horas]
	- Introducción al Hacking [53 horas]
	
	## Instalación
	
	Instala el paquete utilizando `pip3`
	
	```python3	
	pip3 install hack4u
	```
	
	## Uso básico
	
	### Listar todos los cursos
	
	```python
	from hack4u import list_courses
	
	for course in list_courses():
		print(course)
	```
	
	### Obtener un curso por nombre
	
	```python
	from hack4u import search_course_by_name
	
	course = search_course_by_name("Introducción a Linux")
	print(course)
	```
	
	
	### Calcular la duración total de los cursos
	
	```python
	from hack4u import total_duration
	
	print(f"Duración total: {total_duration()} horas")
	```
	````

	Con todos los archivos listos, ahora para subirlo ahora tendremos que instalar *twine* con *pip3*:

	<img src="/apuntes/python-desde-cero/img-492.webp" alt="Captura de los apuntes" width="328" height="79" loading="lazy" decoding="async">

	Ahora dentro de nuestro proyecto ejecutaremos `python3 -m build`:

	<img src="/apuntes/python-desde-cero/img-493.webp" alt="Captura de los apuntes" width="1121" height="200" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-494.webp" alt="Captura de los apuntes" width="793" height="131" loading="lazy" decoding="async">

	Esto nos creará un directorio *dist* y dentro de este tendríamos todo en un archivo comprimido:

	<img src="/apuntes/python-desde-cero/img-495.webp" alt="Captura de los apuntes" width="636" height="111" loading="lazy" decoding="async">

	Con todo listo, ahora podríamos subir el proyecto, y antes verificaríamos que nuestro perfil está sin proyectos:


	<img src="/apuntes/python-desde-cero/img-496.webp" alt="Captura de los apuntes" width="1134" height="257" loading="lazy" decoding="async">


	Recordemos tener el archivo .pypirc en el directorio home del usuario, con la configuracion del API TOKEN que creamos anteriormente.
	
	Ahora con twine le indicaremos que queremos subir todo lo que está en dist:

	<img src="/apuntes/python-desde-cero/img-498.webp" alt="Captura de los apuntes" width="639" height="89" loading="lazy" decoding="async">
	
	<img src="/apuntes/python-desde-cero/img-497.webp" alt="Captura de los apuntes" width="559" height="87" loading="lazy" decoding="async">

	Ahora veremos como ya tenemos un proyecto:

	<img src="/apuntes/python-desde-cero/img-499.webp" alt="Captura de los apuntes" width="772" height="102" loading="lazy" decoding="async">
	 
	 Y ya podríamos ver el README:

	<img src="/apuntes/python-desde-cero/img-500.webp" alt="Captura de los apuntes" width="826" height="640" loading="lazy" decoding="async">

	Para cualquier cambio que realicemos en nuestros proyectos de paquetes, tendremos que ir incrementando la version en nuestro *setup.py* y volver a hacer el *build* con python3 y subirlo con twine.

	Ahora podríamos perfectamente eliminar todo el paquete que tenemos como proyecto y olvidarlo:

	<img src="/apuntes/python-desde-cero/img-501.webp" alt="Captura de los apuntes" width="265" height="104" loading="lazy" decoding="async">

	De esta manera, ahora podríamos instalarlo y trabajar tal como en los ejemplos que estuvimos viendo durante su creación:

	<img src="/apuntes/python-desde-cero/img-502.webp" alt="Captura de los apuntes" width="496" height="143" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-503.webp" alt="Captura de los apuntes" width="645" height="131" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-504.webp" alt="Captura de los apuntes" width="1106" height="224" loading="lazy" decoding="async">

	Ahora si listáramos el archivo de este paquete que nosotros creamos, veremos como se almacena dentro de las rutas que Python tiene contempladas en su PATH:

	<img src="/apuntes/python-desde-cero/img-505.webp" alt="Captura de los apuntes" width="721" height="166" loading="lazy" decoding="async">

	Si nos moviéramos a este directorio veremos como esto es todo lo que hicimos nosotros:

	<img src="/apuntes/python-desde-cero/img-506.webp" alt="Captura de los apuntes" width="835" height="348" loading="lazy" decoding="async">

	Si deseamos podremos desinstalarlo con `pip3 uninstall paquete` y después para evitar conflictos `pip3 cache purge` para limpiar la caché.
