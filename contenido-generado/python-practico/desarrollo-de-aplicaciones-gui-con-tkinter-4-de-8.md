---
curso: "python-practico"
modulo: "python-practico/apps-de-escritorio"
leccion: "desarrollo-de-aplicaciones-gui-con-tkinter-4-de-8"
titulo: "Desarrollo de aplicaciones GUI con Tkinter (4 de 8)"
orden: 16
minutos: 11.6
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 25
ejercicios: []
---

1. **Introducción**

	Se abordara un proyecto que consolidará todo lo aprendido hasta ahora con Tkinter: la creación de nuestro propio editor de texto, similar al Bloc de Notas.

	Este será un excelente ejercicio para aplicar nuestras habilidades en un contexto práctico y realista, permitiéndonos ver cómo los componentes individuales en Tkinter se unen para formar una aplicación funcional.

	Nuestro editor de texto incluirá funcionalidades básicas como:

	- Crear un nuevo archivo
	- Abrir y editar archivos existentes
	- Guardar los cambios
	- Cerrar la aplicación

	Para esto haremos uso de varios widgets y técnicas de Tkinter que hemos estudiado, como *tkinter.Text()* para el área de edición, *Menu()* para la barra de menús y *filedialog* para la gestión de archivos.

	Se adoptara un enfoque de Programación Orientada a Objetos (POO) en este proyecto. Utilizando clases para estructurar nuestro código, lo que permitirá dividir la funcionalidad de la aplicación  en bloques lógicos y reutilizables. Este método no solo facilitará la organización y gestión del código, sino que también nos proporcionará una sólida base para la escalabilidad y mantenimiento  futuro del proyecto.
	</br>
2. **Práctica**

	Para construir este proyecto iniciaremos creando un archivo *execise.py*, en el cual importaremos la librería *tkinter* y los módulos *filedialog* y *messagebox*:

	<img src="/apuntes/python-practico/img-1015.webp" alt="Captura de los apuntes" width="474" height="99" decoding="async">

	Con esto listo, ahora crearíamos nuestra ventana principal y al final agregaremos el *mainloop()* de nuestra ventana, para que el usuario pueda interactuar con las funcionalidades que generaremos:

	<img src="/apuntes/python-practico/img-1016.webp" alt="Captura de los apuntes" width="222" height="95" loading="lazy" decoding="async">

	*Construyendo el menú*

	Comenzaremos creando nuestra barra de menú y crearemos un primer menú de opciones, *Nuevo*, *Abrir*, *Guardar* y *Salir*:

	<img src="/apuntes/python-practico/img-1017.webp" alt="Captura de los apuntes" width="585" height="406" loading="lazy" decoding="async">

	Podremos observar como primeramente definimos la barra de menús y nuestro menú de opciones, luego agregamos las opciones correspondientes y finalmente indicamos a nuestro programa la configuración para que sean mostradas en nuestra ventana. Lo veríamos de la siguiente manera:

	<img src="/apuntes/python-practico/img-1018.webp" alt="Captura de los apuntes" width="516" height="305" loading="lazy" decoding="async">

	Para ver un poco mejor nuestra ventana, le asignaremos una proporción que se adapte a lo que mejor consideremos, en este caso una buena proporción podría ser *700x500*, la cual se asigna directamente a la ventana con el método *geometry()*:

	<img src="/apuntes/python-practico/img-1019.webp" alt="Captura de los apuntes" width="264" height="60" loading="lazy" decoding="async">

	*Comenzamos a trabajar con POO*

	Para ello vamos a crear una clase la cual se llame *SimpleTextEditor*, la cual visualizaremos, referenciando primeramente, hacia un objeto *editor* y pasándole como argumento nuestra ventana principal:

	<img src="/apuntes/python-practico/img-1020.webp" alt="Captura de los apuntes" width="343" height="96" loading="lazy" decoding="async">

	Con esto en mente comenzaríamos creando nuestra clase y en nuestro constructor recibiendo la ventana para asignarla como propiedad a nuestra clase. Además, aquí mismo aprovecharemos para crear nuestro widget *Text* para la edición del archivo (no se mostrará aún, porque solo lo estamos creando, recordemos que para dibujarlo en la venta tendremos que usar los métodos *pack*, *grid* o *place*).

	<img src="/apuntes/python-practico/img-1021.webp" alt="Captura de los apuntes" width="468" height="159" loading="lazy" decoding="async">

	En este caso creamos el widget *Text* para nuestra ventana y lo mostramos con *pack()*, pero podremos notar como tendremos un problema de que no se adapta a nuestra ventana y es lo que buscaremos en este caso:

	<img src="/apuntes/python-practico/img-1022.webp" alt="Captura de los apuntes" width="904" height="638" loading="lazy" decoding="async">

	Al utilizar pack sabremos que al utilizar la propiedad *fill*, podremos indicarle esto a nuestro widget, en el eje X siempre se adaptara al total de la pantalla, pero cuando lo intentamos en el eje Y, veremos que existe como un límite y por ende no se adapta al total de la ventana en el eje Y:

	<img src="/apuntes/python-practico/img-1023.webp" alt="Captura de los apuntes" width="1272" height="693" loading="lazy" decoding="async">

	Además de *tk.X* para el eje X y *tk.Y* para el eje Y, tenemos *tk.BOTH* la cual nos sirve para indicarle a un widget que se adapte en ambos ejes, *X* y *Y*:

	<img src="/apuntes/python-practico/img-1024.webp" alt="Captura de los apuntes" width="1248" height="696" loading="lazy" decoding="async">

	Pero a pesar de esto seguiremos notando como en el eje Y no se adapta totalmente, para ello tendremos la propiedad *expand*, la cual colocaremos como segundo argumento después de nuestro *fill* y le asignaremos un *1*, lo que significará que se podrá adaptar más allá de los límites preestablecidos, de esta manera ahora si se adaptará al total de nuestra ventana:

	<img src="/apuntes/python-practico/img-1025.webp" alt="Captura de los apuntes" width="1340" height="698" loading="lazy" decoding="async">

	*Metodo quit_confirm*

	De las 4 opciones que hemos colocado en nuestro menú, comenzaremos definiendo la funcionalidad de nuestra opción *salir*.

	Para ello en nuestra clase crearemos el método *quit_confirm*, lo esperado de esto es que nos salte una ventana la cual nos permita seleccionar entre *ok* y *cancel*, lo cual es un método del módulo *messagebox* de tkinter y este es *askokcancel()*.

	Si lo utilizamos directamente nos saltará la venta, pero buscaremos imprimir lo que esta nos retorne:

	<img src="/apuntes/python-practico/img-1026.webp" alt="Captura de los apuntes" width="443" height="85" loading="lazy" decoding="async">

	Para que esto funcione tendremos que indicarle a la opción *salir* que nos ejecute el método *quit_confirm* de nuestro objeto *editor*, lo cual hacemos con la propiedad *command:*

	<img src="/apuntes/python-practico/img-1027.webp" alt="Captura de los apuntes" width="736" height="201" loading="lazy" decoding="async">

	Finalmente, al ejecutarlo y presionar *salir*, nos cargará la siguiente ventana:

	<img src="/apuntes/python-practico/img-1028.webp" alt="Captura de los apuntes" width="700" height="532" loading="lazy" decoding="async">

	En este caso no nos muestra ningún contenido, ya que no se lo indicamos, ni le dimos nombre a la ventana.

	Pero podremos observar los dos botones, al presionarlo nos retornará algo y como hemos indicado que nos lo imprima en pantalla, lo veremos en la terminal. Primeramente, lo haremos para *ok* y después para *cancel* y esto será lo que veremos:

	<img src="/apuntes/python-practico/img-1029.webp" alt="Captura de los apuntes" width="943" height="561" loading="lazy" decoding="async">

	Como observamos, cuando fue presionado *ok* nos fue retornado un *True*, pero cuando se presionó *cancel* lo que se retornó fue un *False*, por lo que con ello podremos trabajar con condicionales para saber si el usuario realmente quiere salir de la aplicación o no.

	De esta manera, ahora le asignaremos como nombre a la ventana "Salir" y como contenido del mensaje para el usuario "¿Estás seguro de que deseas salir?", finalmente de forma directa meteremos esto en un condicional, donde si nos retorna *True*, entrará directamente y este será el caso donde se presione *ok*.

	Al entrar, lo que buscaremos es destruir nuestra ventana principal para que se cierre y se termine de ejecutar nuestro programa, recordando que tenemos nuestra ventana como una propiedad de la clase, solo tendremos que referencial al método *destroy()* de nuestra propia ventana, para que se finalice la ejecución de esta misma:

	<img src="/apuntes/python-practico/img-1030.webp" alt="Captura de los apuntes" width="814" height="111" loading="lazy" decoding="async">

	De esta forma, ahora lo que veremos al ejecutar nuestra venta y darle a salir será lo siguiente:

	<img src="/apuntes/python-practico/img-1031.webp" alt="Captura de los apuntes" width="700" height="532" loading="lazy" decoding="async">

	Si presionamos *cancel* no pasará nada, pero si presionamos *ok*, al ser *True* entrará en el condicional y se destruirá la ventana, por lo que se cerrará nuestro programa.

	*Opción Abrir archivo*

	Ahora programaremos el funcionamiento de la opción *Abrir*, el método que crearemos para esta será *open_file*, por lo que de nuestro objeto para esta opción, agregamos el método con nuestra propiedad *command*:

	<img src="/apuntes/python-practico/img-1032.webp" alt="Captura de los apuntes" width="727" height="105" loading="lazy" decoding="async">

	Ahora comenzaremos creando el método en nuestra clase, como utilizaremos el método *askopenfilename* del módulo *filedialog*, primero buscaremos imprimir en la terminal lo que nos retorna al seleccionar un archivo:

	<img src="/apuntes/python-practico/img-1033.webp" alt="Captura de los apuntes" width="523" height="90" loading="lazy" decoding="async">

	De esta manera, al presionar *Abrir* y seleccionar un archivo, veremos lo siguiente:

	<img src="/apuntes/python-practico/img-1034.webp" alt="Captura de los apuntes" width="700" height="532" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-1035.webp" alt="Captura de los apuntes" width="751" height="606" loading="lazy" decoding="async">

	Como vemos, lo que nos retornara al seleccionar un archivo es su ruta absoluta del mismo. Lo que haremos será almacenar su ruta absoluta en una variable, en este caso le daremos de nombre *filename*, de esta manera utilizamos *open()* con *with* para no preocuparnos por cerrar el archivo y lo abrimos en modo de lectura, nuestra área de texto cuenta con el método *insert* donde indicaremos que desde la primera línea y el carácter 0, nos inserte el contenido del archivo que recuperaremos con *file.read()*:

	<img src="/apuntes/python-practico/img-1036.webp" alt="Captura de los apuntes" width="578" height="381" loading="lazy" decoding="async">

	De esta forma, esto ya nos cargará el contenido del archivo que seleccionemos, pero puede ser que al momento de abrir un archivo ya tengamos otro cargado, por ende antes de abrir el archivo limpiaremos nuestra área de texto con el método *delete()*, donde le indicaremos que nos limpie nuestra área de texto desde la primera línea y el carácter 0 ("1.0"), hasta el final ("tkinter.END"), además en nuestro constructor agregaremos la propiedad *current_open_filename* para que después de cargar el contenido de ese archivo en esta almacenemos siempre la ruta absoluta del archivo que tengamos abierto:

	<img src="/apuntes/python-practico/img-1037.webp" alt="Captura de los apuntes" width="574" height="479" loading="lazy" decoding="async">

	De esta manera ahora si podremos seleccionar y cargar el contenido de cualquier archivo y empezar a editarlo:

	<img src="/apuntes/python-practico/img-1038.webp" alt="Captura de los apuntes" width="941" height="827" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-1039.webp" alt="Captura de los apuntes" width="941" height="827" loading="lazy" decoding="async">

	Incluso podríamos hacer la prueba de verificar si nos elimina un contenido que ya tengamos, si cerramos y ejecutamos nuevamente nuestra aplicación, podríamos escribir contenido y luego cargar un archivo, de esta manera observaremos como si nos elimina el contenido que ya tenía para cargarnos el de un archivo.
