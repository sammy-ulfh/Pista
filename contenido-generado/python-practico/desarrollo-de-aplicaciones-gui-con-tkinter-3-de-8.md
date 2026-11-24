---
curso: "python-practico"
modulo: "python-practico/apps-de-escritorio"
leccion: "desarrollo-de-aplicaciones-gui-con-tkinter-3-de-8"
titulo: "Desarrollo de aplicaciones GUI con Tkinter (3 de 8)"
orden: 15
minutos: 15.3
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 30
ejercicios: []
---

1. **Introducción**

	**Tkinter: Explorando Widgets Avanzados y Funcionalidades de Diálogo**

	1. *Frame()*

	- *Descripción:* *Frame()* es un widget en tkinter utilizado como contenedor para otros widgets.
	- *Uso Común:* Organizar el layout de la aplicación, agrupando widgets relacionados.
	- *Características Clave:*

		- Actúa como un contenedor invisible que puedecontener otros widgets.
		- Útil para mejorar la organización y la gestión del layout en aplicaciones complejas.
	</br>
	2. *Canvas()*

	- *Descripción:* *Canvas()* es un widget que proporciona un área para dibujar gráficos, líneas, figuras, etc.
	- *Funciones de Dibujo:*

		- *create_oval():* Crea figuras ovales o círculos. Los parámetros especifican las coordenadas rectángulo delimitador.
		- *create_rectangle():* Dibuja rectángulos. Los parámetros definen las coordenadas de las esquinas.
		- *create_line():* Permite dibujar líneas. Se especifican las coordenadas de inicio y fin de la línea.
		- *Uso Común:* Crear gráficos, interfaces de juegos, o elementos visuales personalizados.
	</br>
	3. *Menu()*

	- *Descripción:* *Menu()* se utiliza para crear menús en una aplicación Tkinter.
	- *Uso Común:* Añadir barras de menús con opciones como *Archivo*, *Editar*, *Ayuda*, etc.
	- *Características Clave:*

		- Se pueden crear menús desplegables y menús contextuales.
		- Los menús pueden contener comandos, opciones de selección y otros submenús.
	</br>
	4. *messagebox*

	- *Descripción:* *messagebox* es un módulo en Tkinter que proporciona ventanas emergentes de diálogo.
	- *Funciones Comunes:*
		- *showinfo()*, *showwarning()*, *showerror()*: Muestran mensajes informativos, de advertencia y de error, respectivamente.
		- *Uso Común:* Informar al usuario sobre eventos, confirmaciones, errores o advertencias.
	</br>
	5. *filedialog*

	- *Descripción:* *filedialog* es un módulo que ofrece diálogos para seleccionar archivos y directorios.
	- *Funciones Clave:*
		- *askopenfilename():* Abre un cuadro de diálogo para seleccionar un archivo para abrir.
		- *asksavefilename():* Abre un cuadro de diálogo para seleccionar la ubicación y el nombre del archivo para guardar.
		- *askdirectory():* Permite al usuario seleccionar un directorio.

	- *Uso Común:* Integrar la funcionalidad de apertura y guardado de archivos en aplicaciones.

	**Conclusión**

	El dominio de estos widgets y módulos (*Frame()*, *Canvas()*, *Menu()*, *messagebox*, *filedialog*) es crucial para desarrollar aplicaciones GUI interactivas y completas en Tkinter. Cada uno aporta funcionalidades específicas que permiten crear interfaces de usuario más ricas y dinámicas, adaptadas a una amplia variedad de necesidades.
	</br>
2. *Práctica*

	*Widget Frame()*

	En nuestra ventana, utilizar el widget *Frame()* es como agregar nuevos elementos, los cuales serán como contenedores, donde podremos representar nuestra información. Esto nos será de ayuda para tener la representación de nuestro contenido de una forma mucho más organizada, ya que podremos agregar múltiples contenedores del widget *Frame()* para representar nuestra información o contenido de la aplicación.

	Podríamos ver nuestra ventana como un contenedor principal. Al agregar contenedores dentro de esta, los elementos que agreguemos en nuestro contenedor  Frame se verán de la misma forma que en la ventana principal, como lo hemos visto hasta ahora.

	*Creación del widget*

	Para crear este widget utilizaremos *Frame()*, donde como hemos visto anteriormente le colocaremos como primer argumento la ventana, le daremos un fondo con *bg* y como nueva propiedad para aprender, utilizaremos *bd* para asignarle un valor numérico para que se le de un ancho al borde que tendrá:

	<img src="/apuntes/python-practico/img-985.webp" alt="Captura de los apuntes" width="431" height="252" decoding="async">

	Recordemos que al crear un widget, no se representa automáticamente. En este caso utilizaremos *place()* para colocarlo al centro de la ventana, de forma relativa y que tome como punto de enfoque el centro del frame:

	<img src="/apuntes/python-practico/img-986.webp" alt="Captura de los apuntes" width="546" height="73" loading="lazy" decoding="async">

	Si ahora ejecutamos esto, tendríamos nuestra ventana de la siguiente manera:

	<img src="/apuntes/python-practico/img-987.webp" alt="Captura de los apuntes" width="335" height="215" loading="lazy" decoding="async">

	En este caso no visualizamos nada debido a que nuestro frame no tiene nada de contenido, pero sí por ejemplo creáramos un *Label()*, sería de la misma manera que como lo hemos hecho, la diferencia será que ahora en lugar de pasarle como primer argumento nuestra ventana principal, será el frame que hemos creado.

	<img src="/apuntes/python-practico/img-988.webp" alt="Captura de los apuntes" width="712" height="664" loading="lazy" decoding="async">

	Podríamos agregar otro label e incluso aumentar el tamaño de nuestro borde en el frame, cambiando el valor de *bd*:

	<img src="/apuntes/python-practico/img-989.webp" alt="Captura de los apuntes" width="718" height="632" loading="lazy" decoding="async">

	Se puede jugar con tamaños para verlo del mismo tamaño, en este caso se ve así porque un label es más grande que otro por el contenido, pero en lugar de jugar con tamaños, en este caso podríamos poner un texto más general como "Label1" y cambiar solo el número para el segundo, teniendo un resultado mucho mejor visualmente:

	<img src="/apuntes/python-practico/img-990.webp" alt="Captura de los apuntes" width="371" height="286" loading="lazy" decoding="async">

	Otra forma más correcta de afrontar el que los label no estén alineados, sería que al estar mostrándolos con *pack()* podremos utilizar la propiedad *fill* para que se adapte a todo el tamaño sobre el eje X.

	<img src="/apuntes/python-practico/img-991.webp" alt="Captura de los apuntes" width="801" height="634" loading="lazy" decoding="async">

	**Widget Canvas()**

	El widget *Canvas()* nos permitirá dibujar figuras dentro de nuestra aplicación. Para utilizarlo lo crearíamos como hemos creado otros widgets y en este caso lo haremos para nuestra ventana principal. Le daremos un alto y ancho, así como un color de fondo, y al mostrarlo con *pack()* le daremos un padding para que no quede tan pegado a la parte superior:

	<img src="/apuntes/python-practico/img-992.webp" alt="Captura de los apuntes" width="606" height="267" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-993.webp" alt="Captura de los apuntes" width="601" height="575" loading="lazy" decoding="async">

	*Crear un círculo u óvalo*

	Para crear el círculo, almacenado en la variable *oval*, vamos a utilizar el método *create_oval* de nuestro canvas. Como argumentos principales tendremos 4, que podremos verlos como *w*, *x* , *y* y *z*, además de *fill* para asignarle un fondo a nuestra figura.

	Tendremos que ver *w*, *x*, *y* y *z* como los vertices de un cuadrado imaginario, donde indicaremos los puntos necesarios mediante pixeles para que cada vertice se acomode en nuestro canvas y crear nuestro óvalo, dependiendo de que tan alejado pongamos el vertical del vertical o el horizontal del horizontal, tendremos como resultado un círculo o un óvalo.

	Otra forma de verlo sería como colocar las coordenadas de dos puntos, el primero sería viendo nuestro objeto como un cuadrado imaginario, donde el punto iniciara en la esquina superior izquierda y el final será en la esquina inferior derecha, tal como trazar una línea en un plano, sobre la cual se creara nuestro óvalo o círculo.

	<img src="/apuntes/python-practico/img-994.webp" alt="Captura de los apuntes" width="634" height="114" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-995.webp" alt="Captura de los apuntes" width="576" height="553" loading="lazy" decoding="async">

	Para crear un rectángulo aplicaríamos la misma lógica anterior, pero utilizando el método *create_rectangle*, le daremos unos puntos distintos para que no colisione con el círculo que ya tenemos:

	<img src="/apuntes/python-practico/img-996.webp" alt="Captura de los apuntes" width="785" height="932" loading="lazy" decoding="async">

	*Crear una línea*

	Para crear una línea, es de la misma forma que lo hemos hecho anteriormente, colocando el punto inicial y el punto final. En todas las figuras que representemos, podremos ver los primeros dos valores dados como el *x* y*y* del primer punto, así como los últimos dos valores, los puntos del punto final:

	<img src="/apuntes/python-practico/img-997.webp" alt="Captura de los apuntes" width="886" height="940" loading="lazy" decoding="async">

	En este caso, la línea se ve muy delgada, por lo que podremos agregar el atributo *width* e indicarle a nivel de píxeles como queremos que se vea de grosor:

	<img src="/apuntes/python-practico/img-998.webp" alt="Captura de los apuntes" width="784" height="924" loading="lazy" decoding="async">

	**Crear un Menú con Tkinter**

	Para esto, primero crearemos una ventana totalmente vacía:

	<img src="/apuntes/python-practico/img-999.webp" alt="Captura de los apuntes" width="594" height="587" loading="lazy" decoding="async">

	Recordemos que el *mainloop()* para nuestra ventana, lo utilizamos para que toda la interacción en nuestra aplicación tenga su funcionalidad y el usuario pueda interactuar con cada apartado  realizar las tareas que la aplicación permite.

	Para nuestro menú, comenzaríamos creando una barra principal sobre la cual estarán las distintas opciones de nuestro menú y en cada una de estas podremos poner opciones o submenú. Para ello utilizaríamos el widget *Menu()* y le pasaríamos como argumento la ventana en la que lo mostraremos, además utilizaremos el método *config* de nuestra ventana para a nivel de propiedad indicarle como argumento nuestra barra, para que así se muestre:

	<img src="/apuntes/python-practico/img-1000.webp" alt="Captura de los apuntes" width="843" height="420" loading="lazy" decoding="async">

	Para agregar nuestro primer apartado de nuestro menú, tendremos que crear un nuevo widget *Menu*, el cual para mostrarlo utilizaremos un método de nuestra propia barra de menu, el cual es *add_cascade()* y como propiedades colocaremos *label* donde indicaremos el texto que mostrara nuestra opción y con *menu* pasaremos el widget de menu que recién creamos, donde al presionarlo se mostrarán las opciones de nuestro primer menu:

	<img src="/apuntes/python-practico/img-1001.webp" alt="Captura de los apuntes" width="613" height="608" loading="lazy" decoding="async">

	En este caso, al seleccionar el menú solo veremos unas líneas. Esto se debe a que aún no agregamos opciones. Para poder agregar utilizaremos el método *add_command* directamente en nuestro widget *menu1*:

	<img src="/apuntes/python-practico/img-1002.webp" alt="Captura de los apuntes" width="1920" height="1080" loading="lazy" decoding="async">

	Las líneas sobre nuestras opciones las podremos llamar fragmentado, estas están por defecto y nos permiten que al presionarlo nos separe en una ventana distinta las opciones de nuestro primer menú.

	Es posible que no nos interese la posibilidad de fragmentarlo y separarlo de nuestra ventana principal, es por ello que al momento de crear nuestro widget del primer menú tendremos que agregar la propiedad *tearoff* y asignarle el valor de 0, de esta manera ahora lo veremos así:

	<img src="/apuntes/python-practico/img-1003.webp" alt="Captura de los apuntes" width="1920" height="1080" loading="lazy" decoding="async">

	Además, al crear el widget del menu también agregamos que este será mostrado en nuestra barra del menú, que será la principal e incluirá todos los menús.

	Por lo que nuestro widget menu1, al crearlo con *Menu()* tendrá como primer argumento donde se mostrará *bar_menu* y como segundo argumento la propiedad *tearoff* seteada a *0*, para indicar que no queremos que nuestras opciones de cada menu se puedan fragmentar.

	Ahora crearemos un *segundo menú*, para ello lo haremos de la misma forma anterior. A este menú le llamaremos *Extras* y como opción le agregaremos *Mostrar mensaje*, ya que configuraremos una función la que efectúe mostrarnos un mensaje en pantalla mediante el módulo *messagebox* de tkinter:

	<img src="/apuntes/python-practico/img-1004.webp" alt="Captura de los apuntes" width="1920" height="1080" loading="lazy" decoding="async">

	Para lanzar el mensaje, importaremos el módulo *messagebox* de tkinter y crearemos nuestra función *action_menu* donde, con *showinfo* del módulo *messagebox*, dándole como primer argumento el nombre de la ventana y como segundo el contenido que mostrará como mensaje, se lanzará nuestro mensaje informativo:

	<img src="/apuntes/python-practico/img-1005.webp" alt="Captura de los apuntes" width="750" height="204" loading="lazy" decoding="async">

	Ahora, en nuestra primera opción de nuestro menú *Extras*, tendremos que agregar el atributo *command* para que al presionar en la primera opción indicarle que se tiene que ejecutar esta función:

	<img src="/apuntes/python-practico/img-1006.webp" alt="Captura de los apuntes" width="678" height="105" loading="lazy" decoding="async">

	Por lo que ahora, al ejecutarlo y presionar en la primera opción de nuestro segundo menú, tendremos la siguiente ventana con el mensaje:

	<img src="/apuntes/python-practico/img-1007.webp" alt="Captura de los apuntes" width="651" height="245" loading="lazy" decoding="async">

	De esta manera, a cada opción dentro de los menús que coloquemos  en nuestra barra de menús, podremos agregarles una funcionalidad específica que se ejecute al presionarlo.

	*Messagebox*

	El módulo *messagebox* de la librería *tkinter* nos permite mostrar mensajes al usuario en distintas formas. Es por ello que no solo podremos aplicar esto en el caso de los menús, sino que también en botones o incluso cuando el programa llegue a presentar un error inesperado.

	Para ello crearemos una ventana con un único botón que, al presionarlo, nos lance un mensaje:

	<img src="/apuntes/python-practico/img-1008.webp" alt="Captura de los apuntes" width="707" height="413" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-1009.webp" alt="Captura de los apuntes" width="390" height="258" loading="lazy" decoding="async">

	Además de *showinfo*, tenemos otras formas de lanzar mensajes como *showwarning()* y *showerror()*, que se utilizan de la misma forma, solo cambia la visualización al mostrar el mensaje.

	*filediaolog*

	En tkinter tenemos muchísimos módulos que nos permiten hacer distintas cosas, otro muy interesante es *filedialog* el cual nos permite mediante su método *askopenfilename()*, abrir una ventana para la selección de algún archivo y nos retornara la ruta absoluta de este mismo, lo cual podremos almacenar en una variable:

	<img src="/apuntes/python-practico/img-1010.webp" alt="Captura de los apuntes" width="788" height="351" loading="lazy" decoding="async">

	De la forma anterior, además de guardar la ruta absoluta en la variable *ruta_absoluta*, la mostraremos en pantalla. Una vez presionado el botón, podremos seleccionar cualquier archivo en el sistema:

	<img src="/apuntes/python-practico/img-1011.webp" alt="Captura de los apuntes" width="576" height="473" loading="lazy" decoding="async">

	Al seleccionar el archivo y darle a *open*, se nos almacenará la ruta absoluta en la variable y, como indicamos, se mostrará en la terminal:

	<img src="/apuntes/python-practico/img-1012.webp" alt="Captura de los apuntes" width="1073" height="343" loading="lazy" decoding="async">

	De la misma forma que tenemos *askopenfilename()*, también tenemos *asksaveasfilename()*, nos permite seleccionar una carpeta y escribir un nombre en la barra para darle save, esto no nos guardara el archivo, pero si nos almacenara en nuestra variable la ruta absoluta con todo y el nombre del archivo que deseamos crear o almacenar, para lo cual podríamos apoyarnos con le uso de *open()*:

	<img src="/apuntes/python-practico/img-1013.webp" alt="Captura de los apuntes" width="878" height="927" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-1014.webp" alt="Captura de los apuntes" width="1063" height="330" loading="lazy" decoding="async">

	*askdirectory()*

	También tenemos *askdirectory()*, funciona exactamente igual que los anteriores y nos permitirá almacenar la ruta absoluta de algún directorio para trabajar con él en nuestro sistema.
