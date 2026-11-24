---
curso: "python-practico"
modulo: "python-practico/apps-de-escritorio"
leccion: "desarrollo-de-aplicaciones-gui-con-tkinter-5-de-8"
titulo: "Desarrollo de aplicaciones GUI con Tkinter (5 de 8)"
orden: 17
minutos: 6.8
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 11
ejercicios: []
---

1. **Introducción**

	Continuaremos con el proyecto del editor de texto, con el objetivo de finalizarlo. Hasta ahora se ha logrado implementar funciones clave como la creación, edición, guardado y apertura de archivos de texto. En esta sesión, nos enfocaremos en pulir nuestra aplicación, asegurándonos de que todas las funcionalidades trabajen de manera fluida y eficiente.

	Una vez hayamos completado y perfeccionado nuestro editor de texto, daremos un paso adelante en nuestro aprendizaje con el inicio de un nuevo y fascinante proyecto: creación de una calculadora con interfaz gráfica interactiva. Este proyecto nos permitirá aplicar y expandir aún más nuestros conocimientos en Tkinter, abordando nuevos desafíos y explorando diferentes aspectos de la creación de GUIs.

	En la calculadora, implementaremos funciones básicas como:

	- Sumar
	- Restar
	- Multiplicar
	- Dividir

	Así como una interfaz de usuario intuitiva que permita a los usuarios interactuar fácilmente con la aplicación. Este proyecto no solo reforzará nuestras habilidades en tkinter y la programación orientada a objetos, sino que también nos brindará la oportunidad de abordar problemas de lógica de programación y diseño de interfaces de usuario.
	</br>
2. **Práctica**

	*Nuevo archivo*

	Ahora definiremos el funcionamiento para la opción de generar una nueva nota, esto es sencillo, ya que solo definiremos el método *new_file* y lo que haremos será limpiar todo nuestra área de texto, porque es posible que ya tenga algún texto y además como en este momento no está siendo asignado el contenido a ningún archivo, setear la propiedad *current_open_file()* como un string vacío:

	<img src="/apuntes/python-practico/img-1040.webp" alt="Captura de los apuntes" width="927" height="864" decoding="async">

	De esta manera, al tener ya contenido o algún archivo abierto, al presionar *Nuevo*, nos elimina el texto que se esté mostrando en nuestro widget *Text* y además seteamos nuestro *current_open_file()* a una cadena vacía.

	*Guardar*

	En el caso de guardar, la lógica podría ser un poco más compleja. En este caso tendremos que tener en cuenta primeramente si nuestra propiedad *current_open_file* tiene contenido, de tenerlo ya sabemos con qué archivo se está trabajando y solos se tendrá que guardar el contenido, de lo contrario haremos uso de *filedialog* para que con el método *asksaveasfilename* indiquemos en donde y con qué nombre lo guardaremos.

	De esta manera, a nuestra opción *Guardar* le asignaremos como función a ejecutar *save_file* del objeto *editor* y comenzaremos definiendo un condicional donde verifique la propiedad *current_open_file* no tiene contenido, de no tenerlo entrará en el condicional:

	<img src="/apuntes/python-practico/img-1041.webp" alt="Captura de los apuntes" width="863" height="502" loading="lazy" decoding="async">

	De esta manera, en nuestro condicional definiremos que al no saber con qué archivo se está trabajando se utilice *asksaveasfilename()* del módulo *filedialog* para saber como guardaremos el contenido que estemos escribiendo.

	Tendremos que verificar si esto nos retorna contenido o no, porque en caso de que en la variable donde vayamos a almacenarlo este vacía, quiere decir que no se seleccionó un directorio y nombre para saber con qué archivo estemos trabajando.

	De esta manera, si tiene contenido almacenaremos el archivo con el que trabajaremos en *current_open_file*, de lo contrario no haremos nada y saldremos de la función con un *return*:

	<img src="/apuntes/python-practico/img-1042.webp" alt="Captura de los apuntes" width="583" height="224" loading="lazy" decoding="async">

	Finalmente, si no hemos salido de la función, quiere decir que ya sabemos con qué archivo estamos trabajando, por lo que se abrirá en forma de escritura y almacenaremos el contenido que tenga nuestro widget *Text*, el cual podemos recuperar gracias a su propiedad *get*, indicando que nos tome encuenta desde el incio hasta el final:

	<img src="/apuntes/python-practico/img-1043.webp" alt="Captura de los apuntes" width="633" height="294" loading="lazy" decoding="async">

	De esta manera ya podremos almacenar archivos y de ser un archivo nuevo, podremos almacenarlo en un directorio deseado y con el nombre que quieramos.

	Con esto ya tendremos totalmente funcional nuestro primer proyecto hecho con interfaz gráfica.

	**Calculadora**

	Comenzaremos creándonos el archivo *calculadora.py*, en este archivo principalmente tendremos en cuenta nuestra ventana y la creación de una instancia de la clase *Calculadora* que crearemos con la definición de la lógica y la interfaz de nuestro programa, por lo que le pasaremos como argumento la ventana principal:

	<img src="/apuntes/python-practico/img-1044.webp" alt="Captura de los apuntes" width="309" height="171" loading="lazy" decoding="async">

	Con esto en mente, comenzaríamos a crear nuestra clase con su constructor. Aquí recibiremos la ventana principal *root* como *master* para referenciarla en todo momento, así en nuestra clase.

	Además, en una calculadora usualmente en la parte superior contamos con un display, es por ello que crearemos uno que sea un widget *Entry()* y además lo mostraremos con *grid()* en la posición (0,0), así como todo el contenido de nuestra aplicación, ya que al contar con todos los botones, conviene más mostrarlo a nivel de casillas:

	<img src="/apuntes/python-practico/img-1045.webp" alt="Captura de los apuntes" width="523" height="417" loading="lazy" decoding="async">

	De esta manera, tendríamos una ventana inicial pequeña la cual solo contiene nuestro widget *Entry()*.

	Para darle forma a nuestro display, tendremos que modificarlo, para ello primeramente le indicaremos como argumento la ventana en la que se tiene que mostrar, así como darle un tamaño en píxeles, en este caso con la propiedad *width* le daremos un valor de *15*, ademas utilizaremos la propiedad *font* donde asignándole una tupla, primeramente indicamos la fuente y luego el tamaño, en este caso será *Arial, 23* y finalmente agregaremos un borde con *bd* de *10*:

	<img src="/apuntes/python-practico/img-1046.webp" alt="Captura de los apuntes" width="858" height="313" loading="lazy" decoding="async">

	Esto nos daría un resultado así:

	<img src="/apuntes/python-practico/img-1047.webp" alt="Captura de los apuntes" width="279" height="59" loading="lazy" decoding="async">

	Esto ya tiene una mayor forma, pero podríamos mejorarlo. Agregaríamos un fondo con *bg*, en este caso podríamos jugar con el color `#17dfff`, finalmente, como el cursor se ve bastante grueso al momento de escribir en nuestro display, utilizaremos *insertwidth* y le daremos un valor de 1, para verlo delgado:

	<img src="/apuntes/python-practico/img-1048.webp" alt="Captura de los apuntes" width="1137" height="140" loading="lazy" decoding="async">

	Con estos cambios, ya tendríamos nuestro display de la siguiente forma:

	<img src="/apuntes/python-practico/img-1049.webp" alt="Captura de los apuntes" width="279" height="59" loading="lazy" decoding="async">

	En una calculadora siempre se suele visualizar la entrada de datos al lado derecho, es por ello que en nuestro mismo widget tendremos que utilizar la propiedad *justify* y asignarle *right* para verlo de esta manera:

	<img src="/apuntes/python-practico/img-1050.webp" alt="Captura de los apuntes" width="1389" height="393" loading="lazy" decoding="async">
