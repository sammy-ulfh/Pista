---
curso: "python-practico"
modulo: "python-practico/apps-de-escritorio"
leccion: "desarrollo-de-aplicaciones-gui-con-tkinter-2-de-8"
titulo: "Desarrollo de aplicaciones GUI con Tkinter (2 de 8)"
orden: 14
minutos: 12
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 22
ejercicios: []
---

1. **Introducción**

	**Tkinter: Profundizando en Componentes y Gestión de Layout**

	1. **place()**

	- *Descripción*: *place()* es un método de gestión de geometría en Tkinter que permite posicionar widgets en ubicaciones específicas mediante coordenadas x-y.
	- *Características clave:*

		- *x* y *y*: Especifican la posición del widget en términos de coordenadas.
		- *width* y *height*: Definen el tamaño del widget.
		- *anchor*: Determina desde qué punto del widget se aplican las coordenadas (por ejemplo, *nw* para esquina superior izquierda).
		- *Posiciones Relativas:* Se pueden utilizar valores relativos (por ejemplo *relx*, *rely*) para posicionar widgets en relación con el tamaño de la ventana, lo que hace que la interfaz sea más adaptable al cambiar el tamaño de la ventana.
		</br>
	2. **tkinter.Entry()**

	- *Descripción:* *tkinter.Entry()* es un widget en Tkinter que permite a los usuarios introducir una línea de texto.
	- *Uso común:* Ideal para campos de entrada de texto como nombres de usuario, contraseñas, etc.
	- *Funcionalidades Clave:*

		- *get():* Para obtener el texto del campo de entrada.
		- *delete():* Para borrar el texto del campo de entrada.
		- *insert():* Para insertar texto en una posición específica.
	  </br>
	3. **tkinter.Button()**

	- *Descripción:* *tkinter.Button()* es un widget que los usuariospueden presionar para realizar una acción.
	- *Uso común:* Ejecutar una función o comando cuando se hace clic en él.
	- *Características clave:*

		- *text:* Define el texto que aparece en el botón.
		- *command:* Establece la función que se llamará cuando se haga clic en el botón.
	  </br>
	4. **geometry()**

	- *Descripción:* *geometry()* es una función que define las dimensiones y la posición inicial de la ventana principal.
	- *Funcionalidad:* Permite especificar el tamaño y la ubicación de la ventana en el formato *ancho x alto + X + Y*.
	- *Importancia:* Es fundamental para establecer el tamaño inicial de la ventana y su posición en la pantalla.
	  </br>
	5. **tk.Text()**

	- *Descripción:* *tkinter.Text()* es un widget que permite la entrada y visualización de múltiples líneas de texto.
	- *Uso Común:* Ideal para campos de texto más extensos, como áreas de comentarios, editores de texto, etc.
	- *Funcionalidades Clave:*

		- Similar a *tkinter.Entry()*, pero diseñado para manejar texto de varias líneas.
		- Permiten funciones como copiar, pegar, seleccionar texto.

	**Conclusión**

	Estos componentes y funciones (*place()*, *tkinter.Entry()*, *tkinter.Button()*, *geometry()*, *tkinter.Text()*) son esenciales en la construcción de interfaces de usuario ricas y funcionales con Tkinter. Proporcinan la flexibilidad necesaria para crear aplicaciones GUI interactivas y atractivas, adaptándose a una amplia gama de necesidades de diseño de interfaz.
	</br>
2. **Práctica**

	**Método place()**

	Place nos puede ser de ayuda para posicionar nuestros label a nivel de píxeles, podríamos posicionar un label de forma absoluta indicándole con *x* y *y* una posición a nivel de píxeles en los que esta quedara representado.

	De esta manera con *x\=20* le indicamos que quede posicionado 20 píxeles a la derecha de forma absoluta, mientras con *y\=20* indicamos que quede 20 píxeles hacia abajo. De esta manera veremos como queda posicionado y será de forma absoluta, lo que quiere decir que no habrá cambios al momento de manipular el tamaño de nuestra ventana:

	<img src="/apuntes/python-practico/img-963.webp" alt="Captura de los apuntes" width="624" height="368" decoding="async">

	<img src="/apuntes/python-practico/img-964.webp" alt="Captura de los apuntes" width="293" height="282" loading="lazy" decoding="async">

	*Asignar una posición de forma relativa*

	Posicionar un label de forma relativa, querrá decir que este va a respetar la posición en relación con el tamaño total de la ventana. Tomaremos como total de *x* \= 1, así como el total de *y* \= 0.

	Lo que quiere decir que todo el eje X de nuestra ventana tendrá un valor total de 1, así como el eje Y. Al manipular el tamaño de nuestra ventana, el espacio de nuestros ejes asignados, siempre será el mismo.

	Si en *X* asignamos 0.8, siempre será 0.8 la distancia entre nuestro tope izquierdo y nuestro label.  

	Para asignar una posición relativa, utilizaremos *relx* y *rely*:

	<img src="/apuntes/python-practico/img-965.webp" alt="Captura de los apuntes" width="740" height="829" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-966.webp" alt="Captura de los apuntes" width="883" height="416" loading="lazy" decoding="async">

	De esta manera, considerando que el valor total de nuestra ventana en *X* y *Y* es de *1*, sin importar el tamaño que tenga la ventana *X* siempre será *0.5* e *Y* siempre será *0.2*, ya que estos fueron los asignados.

	La forma en la que podremos entender el cómo se posiciona es con los bordes izquierdo y superior, ya que el borde izquierdo siempre quedará en la posición que asignemos en el eje X, así como el borde superior siempre quedara posicionado en la posición que asignemos para el eje Y.

	Esto lo podremos visualizar mejor si colocamos ambas posiciones del segundo label exactamente a la mitad:

	<img src="/apuntes/python-practico/img-967.webp" alt="Captura de los apuntes" width="789" height="831" loading="lazy" decoding="async">

	*Centrar un label*

	Al momento de posicionar un label, como vimos anteriormente, lo que queda como tal posicionado son los bordes, pero sí queremos centrar el label en esa posición exactamente, pues lo que tendremos que hacer es utilizar la propiedad *anchor* y asignarle *CENTER* de la propia librería.

	Podremos verlo de forma más clara al ponerlo exactamente al centro:

	<img src="/apuntes/python-practico/img-968.webp" alt="Captura de los apuntes" width="646" height="432" loading="lazy" decoding="async">

	De esta manera ahora lo que es tomado como punto de referencia para asignar el posicionamiento es el centro de nuestro label, por ello se ve centrado.
	
	Si le quitáramos la propiedad anchor, solo se posicionaría considerando lo explicado anteriormente, los bordes izquierdo y superior:

	<img src="/apuntes/python-practico/img-969.webp" alt="Captura de los apuntes" width="669" height="479" loading="lazy" decoding="async">

	*Asignar un tamaño a nuestra ventana*

	Al momento de utilizar posicionamiento relativo, cuando ejecutamos nuestro código nos puede pasar que la ventana de primeras sea pequeña y por ende no nos permita visualizar totalmente el contenido.

	Como este ejemplo:

	<img src="/apuntes/python-practico/img-970.webp" alt="Captura de los apuntes" width="800" height="664" loading="lazy" decoding="async">

	*Método geometry()*

	En este caso tendríamos que asignarle un mayor tamaño para que podamos visualizarlo correctamente sin ningún problema.

	Para ello utilizaremos el método *geometry()* al cual le pasaremos como argumento en formato de texto la proporción que tendrá nuestra ventana y se aplicará directamente en la ventana, la cual estamos manejando como *root*:

	<img src="/apuntes/python-practico/img-971.webp" alt="Captura de los apuntes" width="320" height="146" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-972.webp" alt="Captura de los apuntes" width="828" height="146" loading="lazy" decoding="async">

	Ya con esta base, nosotros podremos ir asignando una proporción la cual se adapte de mejor forma a lo que estemos construyendo.

	*Widget Entry()*

	Este widget nos sirve para poder manejar la entrada de datos del usuario, por lo que al colocarlo se nos agregara a nuestra ventana un recuadro el cual nos permitirá escribir en el:

	<img src="/apuntes/python-practico/img-973.webp" alt="Captura de los apuntes" width="497" height="645" loading="lazy" decoding="async">

	Para generarlo se hace de la misma forma que con un label, ya que podremos solo indicarle la ventana en la que queremos colocarlo.

	Para mostrarlo, en este caso  utilizamos pack(), por ende aquí para indicar una distancia de padding o separación en cuanto al eje *X* y *Y* se utiliza *pad* y se le agrega *x* o *y*, dependiendo de cuál nos interese modificar.

	En este caso vamos a poner que quede 5 píxeles separados del borde superior:

	<img src="/apuntes/python-practico/img-974.webp" alt="Captura de los apuntes" width="511" height="361" loading="lazy" decoding="async">

	También colocaremos un padding a los lados, para que quede bien también haremos que nuestro *Entry()* se acople al resize de la ventana, que es cuando manipulamos el tamaño:

	<img src="/apuntes/python-practico/img-975.webp" alt="Captura de los apuntes" width="553" height="375" loading="lazy" decoding="async">

	Con esto, ahora nosotros podríamos escribir contenido, pero para poder nosotros almacenarlo en una variable y realizar cosas con ello, lo que haremos será agregar un botón que nos permita indicar que se realice esta acción y dentro de nuestra acción, finalmente nos mostrará por terminal el contenido de la variable.

	*Recoger los datos de entrada*

	Para esto tendríamos que crear un botón debajo, al cual le agregaremos como *command* una función que definiremos, la cual nos permitirá aprovechar el widget creado con el método *get()* para recibir los datos y en este caso mostrarlos en la terminal:

	<img src="/apuntes/python-practico/img-976.webp" alt="Captura de los apuntes" width="733" height="414" loading="lazy" decoding="async">

	Lo cual nos daría la siguiente funcionalidad cada que presionemos el botón:

	<img src="/apuntes/python-practico/img-977.webp" alt="Captura de los apuntes" width="915" height="247" loading="lazy" decoding="async">

	El widget *Entry()* está bien, pero en cuanto a limitaciones solo nos permite introducir una línea de texto, si nosotros quisiéramos realizar cosas como saltos de línea al presionar enter, para ello tendremos que utilizar un widget distinto.

	*Widget Text()*

	En cuanto a representación visual en nuestra ventana será prácticamente lo mismo que utilizar *Entry()*, la diferencia aquí es que *Text()* por defecto tiene una mayor dimensión, por lo que tendremos que agrandar nuestra ventana con *geometry()* dándole por lo menos una resolución de *600x550*.

	Por lo que con solo realizar los cambios de *Entry()* a *Text()*, así como de la variable del widget y las dimensiones, lo tendríamos de la siguiente manera:

	<img src="/apuntes/python-practico/img-978.webp" alt="Captura de los apuntes" width="309" height="94" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-979.webp" alt="Captura de los apuntes" width="688" height="129" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-980.webp" alt="Captura de los apuntes" width="625" height="577" loading="lazy" decoding="async">

	Al escribir y darla al botón nos daría un error. Esto se debe a que ahora tendríamos que hacer un cambio en nuestra función que se manda a llamar para recuperar los datos y es que ahora tendremos que indicar desde que línea empiece a tomar los datos y como segundo argumento hasta cuál línea los tome.

	En este caso, nosotros representamos la primera línea con "1.0", la segunda con "2.0", etc. Teniendo en cuenta como podemos representar las líneas, podríamos indicar desde que línea empiece a tomar el contenido, como segundo argumento para indicarle hasta que línea lo tome, como quisiéramos que lo haga hasta el final, pues eso lo haríamos con *tkinter.END*, que en nuestro caso al exportar la librería para hacer referencia a ella como *tk*, pues sería *tk.END*

	<img src="/apuntes/python-practico/img-981.webp" alt="Captura de los apuntes" width="632" height="79" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-982.webp" alt="Captura de los apuntes" width="1113" height="669" loading="lazy" decoding="async">

	Ademas, es importante mencionar que en nuestro formato "1.0" de las lineas, con el numero antes del punto indicamos el numero de linea, pero con el numero despues del punto indicamos el caracter, como si de una cadena de texto se tratase.
	
	Con esto en mente, pues también podríamos empezar desde la tercera línea y a partir del tercer caracter, lo que nos ignoraría la primera y segunda línea al recuperar el contenido:

	<img src="/apuntes/python-practico/img-983.webp" alt="Captura de los apuntes" width="669" height="97" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-984.webp" alt="Captura de los apuntes" width="1037" height="660" loading="lazy" decoding="async">
