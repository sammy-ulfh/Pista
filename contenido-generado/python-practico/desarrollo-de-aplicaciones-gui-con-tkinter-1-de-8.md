---
curso: "python-practico"
modulo: "python-practico/apps-de-escritorio"
leccion: "desarrollo-de-aplicaciones-gui-con-tkinter-1-de-8"
titulo: "Desarrollo de aplicaciones GUI con Tkinter (1 de 8)"
orden: 13
minutos: 15.6
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 33
ejercicios: []
---

## **Introducción a las interfaces gráficas de usuario (GUI)**

*Tkinter* es una biblioteca estándar en Python para la creación de interfaces gráficas de usuario (GUI). Es una interfaz de programación para *Tk*, un toolkit de GUI que es parte de Tcl/Tk. Tkinter es notable por su simplicidad y eficiencia, siendo ampliamente utilizado en aplicaciones de escritorio y herramientas educativas.

*¿Por qué Tkinter?*

- *Facilidad de Uso:* Tkinter es amigable para principiantes. Su estructura sencilla y clara lo hace ideal para aprender los conceptos básicos de la programación de GUI.
  </br>
- *Portabilidad:* Las aplicaciones creadas con Tkinter pueden ejecutarse en diversos sistemas operativos sin necesidad de modificar el código.
  </br>
- *Amplia Disponibilidad:* Al ser partes de la biblioteca estándar de Python, Tkinter está disponible por defecto en la mayoría de las instalaciones de Python, lo que elimina la necesidad de instalaciones adicionales.

En esta sección nos sumergiremos con Tkinter, empezando por una introducción detallada que nos permitirá entender y utilizar múltiples funcionalidades. A través de proyectos prácticos, aplicaremos estos conocimientos para construir desde aplicaciones simples hasta interfaces más complejas, proporcionando una base sólida para cualquiera interesado en el desarrollo de GUI con Python.

## **Desarrollo de aplicaciones GUI con Tkinter (1/8)**

1. **Introducción**

	**Tkinter: Explorando Componentes Clave**

	1. *tk.label*

		- *Descripción:* *tk.Label* es un widget en Tkinter utilizado para mostrar texto o imágenes. El texto puede ser estático o actualizarse dinámicamente.
		 </br>
		- *Uso Común:* Se usa para añadir etiquetas en una GUI, como títulos, instrucciones o información de estado.
		 </br>
		- *Características Clave:*

			- *text:* Para establecer el texto que se mostrará.
			- *font:* Para personalizar la tipografía.
			- *bg y fg:* Para establecer el color de fondo (*bg*) y de texto (*fg*).
			- *image:* Para mostrar una imagen.
			- *wraplength:* Para especificar a qué ancho el texto debería envolverse.

	2. *mainloop()*

		- *Descripción:* *mainloop()* es una función especial en Tkinter que ejecuta el bucle de eventos de la aplicación. Este bucle espera eventos, como pulsaciones de teclas o clics del mouse, y los procesa.
		 </br>
		- *Importancia:* Sin *mainloop()*, aplicación GUI no responderá a eventos y parecerá congelada. Es lo que mantiene viva la aplicación.

	3. *pack()*

		- *Descripción:* *pack()* es un método de geometría para colocar widgets en una ventana.
		 </br>
		- *Funcionalidad:* Organiza los widgets en bloques antes de colocarlos en la ventana. Los widgets se "empaquetan" en el orden en que se llama a *pack()*.
		 </br>
		- *Características Clave:*

			- *side:* Para especificar el lado de la ventana donde se ubicará el widget (por ejemplo, top, bottom, left, right).
			 </br>
			- *fill:* Para determinar si el widget se expande para llenar el espacio disponible.
			 </br>
			- *expand:* Para permitir que el widget se expanda para ocupar cualquier espacio adicional en ventas.

	4. *grid()*

		- *Descripción:* *grid()* es otro método de geometría utilizado en Tkinter para colocar widgets.
		- dw
		- *Funcionalidad:* Organiza los widgets en una cuadrícula. Se especifica la fila y la columna donde debe ir cada widget.
		- ds
		- *Características Clave:* 

			- *row y column:* Para especificar la posición del widget en la cuadrícula.
			- *rowspan y columnspan:* Para permitir que un widget ocupe múltiples filas y columnas.
			- *sticky:* Para determinar cómo se alinea el widget dentro de su celda (Por ejemplo, N, S, E, W)

	*Conclusión:*

	Estos componentes de Tkinter (tk.Label, mainloop(), pack(), grid()) son fundamentales para la creación de aplicaciones GUI eficientes y atractivas. Comprender su funcionamiento y saber cómo implementarlos adecuadamente es crucial para cualquier desarrollador que busque crear insterfaces de usuario interactrivas y funcionales con Pytho y Tkinter.

2. **Práctica**

	*Instalación*

	Usualmente, *tkinter* ya viene instalado con Python, en caso de no ser así, lo podremos instalar utilizando pip:

	```python
	pip3 install tk  
	```

	Primeramente, importaremos la librería *tkinter*, para referenciarlo de una forma más corta lo haremos como *tk*:

	<img src="/apuntes/python-practico/img-930.webp" alt="Captura de los apuntes" width="270" height="74" decoding="async">

	Podremos generar una ventana principal con tkinter, para ello se utiliza la clase *Tk* de la propia librería, ya en esta nosotros iremos acomodando y organizando los widgets que queramos agregar y utilizar.

	Al generar una ventana con Tkinter, usualmente en la parte superior nos saldrá el nombre de la aplicación, por ello tendríamos que utilizar sobre nuestra instancia el método *title()* y como argumento asignarle un nombre

	Finalmente, para poder lanzar nuestra aplicación, tendremos que utilizar el método *mainloop()*, lo cual sería como el bucle principal de nuestra aplicación, lo que nos permite estar capturando entradas de teclado, interacción con botones, entre otras cosas:

	<img src="/apuntes/python-practico/img-931.webp" alt="Captura de los apuntes" width="334" height="194" loading="lazy" decoding="async">

	De esta manera, ahora al ejecutarlo se nos abriría una ventana, lo cual sería la ventana principal de nuestra aplicación, donde iremos acomodando y definiendo sus funcionalidades y widgets.

	<img src="/apuntes/python-practico/img-932.webp" alt="Captura de los apuntes" width="697" height="624" loading="lazy" decoding="async">

	En este caso no se ve el nombre de la aplicación, debido a que se está empleando un entorno personalizado en Linux.

	*Mostrar contenido en nuestra ventana*

	Para lograrlo tendríamos que utilizar *labels*, que son widgets que nos permiten mostrar cierta información por la aplicación, de forma que podremos mostrar un texto o imagen.

	Un widget tendremos que verlo como un elemento dentro de nuestra aplicación, a través del cual un usuario podrá interactuar con nuestra aplicación o visualizar cierto contenido.

	Para nosotros mostrar un contenido, tendríamos que crear un label, lo cual almacenaríamos en una variable. Por así decirlo, lo haríamos con el método *Label()*, donde como argumentos tendremos que pasarle nuestra ventana y como segundo argumento lo que mostraremos, en este caso un texto:

	<img src="/apuntes/python-practico/img-933.webp" alt="Captura de los apuntes" width="474" height="196" loading="lazy" decoding="async">

	De esta manera aún no tendremos nada dentro de nuestra ventana si la ejecutamos. Para poder representar/mostrar el contenido que deseemos en nuestro label, a nivel de posicionamiento, podremos utilizar distintas utilizades, como *pack()*, *grid()* o *place()*.

	En este caso aplicaremos *pack()* directamente en nuestro label y veremos cómo ahora sí se mostrará y estará todo el tiempo centrado en la parte superior:

	<img src="/apuntes/python-practico/img-934.webp" alt="Captura de los apuntes" width="469" height="211" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-935.webp" alt="Captura de los apuntes" width="329" height="262" loading="lazy" decoding="async">

	*Agregar un botón para definir una acción*

	Podremos definir un botón con el propio método *Button* de la librería tkinter, le pasaremos tres argumentos, el primero será la propia ventana en la que se va a colocar, el segundo será un contenido que tendrá nuestro botón asignándolo a la propiedad *text* y finalmente a la propiedad *command* tendremos que asignarle la funcionalidad que vamos a realizar, en este caso será la función *accion_de_boton()* que definiremos posteriormente, además de finalmente utilizar *pack()* para que se muestre en nuestra ventana:

	<img src="/apuntes/python-practico/img-936.webp" alt="Captura de los apuntes" width="724" height="203" loading="lazy" decoding="async">

	Finalmente, definiremos nuestra función para que muestre algo en pantalla, mediante la terminal:

	<img src="/apuntes/python-practico/img-937.webp" alt="Captura de los apuntes" width="715" height="286" loading="lazy" decoding="async">

	De esta manera, al ejecutarlo, tendríamos nuestra venta con nuestro botón y, si lo presionamos, veríamos lo siguiente en nuestra terminal:

	<img src="/apuntes/python-practico/img-938.webp" alt="Captura de los apuntes" width="326" height="340" loading="lazy" decoding="async">

	*Fondo en un label*

	Para colocar un fondo en un label tendremos que agregarle un argumento extra, el cual será indicar un color mediante un string a la propiedad *bg*:

	<img src="/apuntes/python-practico/img-939.webp" alt="Captura de los apuntes" width="630" height="226" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-940.webp" alt="Captura de los apuntes" width="263" height="191" loading="lazy" decoding="async">

	Ahora agregaríamos más labels y los mostraríamos en nuestra ventana con *pack()*:

	<img src="/apuntes/python-practico/img-941.webp" alt="Captura de los apuntes" width="751" height="342" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-942.webp" alt="Captura de los apuntes" width="439" height="252" loading="lazy" decoding="async">

	*Posicionar un label*

	Estos label son acomodados automáticamente de la forma anterior, pero nosotros podremos cambiar su posición y colocarlo como mejor se vaya a acomodar para nuestra aplicación.

	Para este caso pensaremos en que los primeros label queden en la parte superior, enfocando su posición en el eje X, mientras que el último lo acomodaremos sobre el eje Y, en la parte izquierda de nuestra ventana (eje X).

	Para esto utilizaríamos la propiedad *fill* para como argumento indicarle algún eje para que se adapte al resize de nuestra aplicación. Para esto, en los primeros dos vamos a colocarlos para el eje X, que lo que hará será posicionarlo para que su eje horizontal se acomode al resize:

	<img src="/apuntes/python-practico/img-943.webp" alt="Captura de los apuntes" width="640" height="328" loading="lazy" decoding="async">

	De esta manera, al nosotros estar cambiando el tamaño de nuestra ventana, el label siempre estará adaptándose:

	<img src="/apuntes/python-practico/img-944.webp" alt="Captura de los apuntes" width="472" height="331" loading="lazy" decoding="async">

	Para el tercer label haremos lo mismo, pero lo acomodaremos para el eje Y, para poder acomodarlo del lado izquierdo, agregaremos la propiedad *side* como argumento en *pack()*, donde le asignaremos *tk.LEFT*, para que se acomode a la izquierda:

	<img src="/apuntes/python-practico/img-945.webp" alt="Captura de los apuntes" width="416" height="99" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-946.webp" alt="Captura de los apuntes" width="400" height="402" loading="lazy" decoding="async">

	Así como lo hemos colocado a la izquierda, también podremos colocarlo a la derecha con *RIGHT*:

	<img src="/apuntes/python-practico/img-947.webp" alt="Captura de los apuntes" width="429" height="90" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-948.webp" alt="Captura de los apuntes" width="369" height="272" loading="lazy" decoding="async">

	O si deseamos colocarlo en la parte superior\/inferior, tendriamos que utilizar *TOP*\/*BOTTOM*:

	
	<img src="/apuntes/python-practico/img-949.webp" alt="Captura de los apuntes" width="409" height="105" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-950.webp" alt="Captura de los apuntes" width="274" height="230" loading="lazy" decoding="async">

	Con *TOP*:

	<img src="/apuntes/python-practico/img-951.webp" alt="Captura de los apuntes" width="283" height="231" loading="lazy" decoding="async">

	Y en caso de no indicar nada, pues veremos que se queda en el centro, en la parte superior.

	Esta sería la forma de acomodar el contenido de nuestra aplicación con *pack()*, pero ahora veremos cómo se hace con *grid()*.

	**Método grid()**

	El método grid sería como generar una tabla imaginaria dentro de nuestra aplicación y cada una de sus celdas podría contener uno o varios widgets.

	Sería como utilizar el método pack, la diferencia es que con *grid()* tendremos que indicar la fila y columna a nivel posicional.

	Como base, nos quedaría así:

	<img src="/apuntes/python-practico/img-952.webp" alt="Captura de los apuntes" width="671" height="353" loading="lazy" decoding="async">

	Es lo mismo, pero solo cambiaríamos la forma en la que indicamos que se muestren nuestros label.

	Al no colocar ninguna posición, se representarían en la misma columna:

	<img src="/apuntes/python-practico/img-953.webp" alt="Captura de los apuntes" width="321" height="219" loading="lazy" decoding="async">

	*Indicar posicionamiento:*

	Para indicar el posicionamiento, le tendremos que indicar la columna y fila correspondientes, donde queremos que se muestre.

	Para ello utilizaremos las propiedades *row* y *column* para, a nivel posicional (numérico), indicar en qué posición se muestre:

	<img src="/apuntes/python-practico/img-954.webp" alt="Captura de los apuntes" width="346" height="93" loading="lazy" decoding="async">

	En este caso, con la almohadilla *#* se han comentado los label 2 y 3, de esta manera no se mostrarán. Con el label 1, estamos indicando con *row* que se coloque en la fila 0 y con column en la columna 0, por lo que estará exactamente en la parte superior izquierda del todo:

	<img src="/apuntes/python-practico/img-955.webp" alt="Captura de los apuntes" width="296" height="226" loading="lazy" decoding="async">

	Teniendo esto en mente, ahora para colocar el segundo label, podríamos jugar moviéndolo cerca.

	A un lado del primer label:

	<img src="/apuntes/python-practico/img-956.webp" alt="Captura de los apuntes" width="407" height="342" loading="lazy" decoding="async">

	Si quisiéramos colocarlo debajo, tendría que ser en la primera fila, manteniéndose en la columna 0:

	<img src="/apuntes/python-practico/img-957.webp" alt="Captura de los apuntes" width="465" height="420" loading="lazy" decoding="async">

	O incluso colocarlo debajo del primero, en la celda de la derecha (1,1):

	<img src="/apuntes/python-practico/img-958.webp" alt="Captura de los apuntes" width="343" height="212" loading="lazy" decoding="async">

	De esta manera vemos cómo podremos colocar en distintas posiciones los elementos dentro de nuestra aplicación.

	Ahora podríamos tener dos label en la parte superior y uno en la parte inferior, de la siguiente manera:

	<img src="/apuntes/python-practico/img-959.webp" alt="Captura de los apuntes" width="491" height="301" loading="lazy" decoding="async">

	*Asignarle más celdas a un label:*

	Al momento de crear nuestros label y mostrarlos, como en el ejemplo anterior, podremos desear que nuestro label azul ocupe ambos espacios, quedando de alguna manera en conjunto con los dos de la parte superior, algo como lo siguiente:

	<img src="/apuntes/python-practico/img-960.webp" alt="Captura de los apuntes" width="199" height="119" loading="lazy" decoding="async">

	Para esto utilizaríamos la propiedad *columnspan* a la cual le asignaremos a nivel de representación, cuántas celdas queremos que nos tome a nivel de columnas:

	<img src="/apuntes/python-practico/img-961.webp" alt="Captura de los apuntes" width="542" height="349" loading="lazy" decoding="async">

	De esta manera estaría ocupando los dos espacios en cuanto a columnas respecta (horizontalmente). El tamaño del fondo no es ocupado totalmente debido a que se adapta al texto o contenido.

	Por lo que realmente nuestro label está ocupando las dos celdas, pero el contenido se centra automáticamente y el fondo que agregamos se adapta a este, por lo que si agregáramos más texto, veremos cómo el fondo se adapta al tamaño del contenido y se mantiene centrado.

	Si excediéramos el contenido en la parte inferior, lo que sucedería es que ahora la celda inferior se haría más grande, adaptando a las de arriba, por lo que ahora el contenido de los dos label superiores se vería más pequeño, pero realmente las celdas se han agrandado, mientras que el contenido se centra y mantiene su tamaño:

	<img src="/apuntes/python-practico/img-962.webp" alt="Captura de los apuntes" width="951" height="567" loading="lazy" decoding="async">
