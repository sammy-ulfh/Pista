---
curso: "python-practico"
modulo: "python-practico/apps-de-escritorio"
leccion: "desarrollo-de-aplicaciones-gui-con-tkinter-7-de-8"
titulo: "Desarrollo de aplicaciones GUI con Tkinter (7 de 8)"
orden: 19
minutos: 7.5
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 14
ejercicios: []
---

1. **Introducción**

	Se seguirá avanzando con el proyecto de la calculadora con interfaz gráfica. Nos enfocaremos en perfeccionar la funcionalidad y el diseño de la aplicación, asegurando que cada elemento opere de manera efectiva y que la interfaz sea intuitiva y atractiva.
	</br>
2. **Práctica**

	Ahora para el resto de botones agregaremos un método, el que requerirá de un argumento, lo cual se agrega al *command* de la misma manera, pero agregando el argumento, en este caso será el contenido del botón para saber con cuál se trabaja y la función imprimirá esa información:

	<img src="/apuntes/python-practico/img-1065.webp" alt="Captura de los apuntes" width="946" height="271" decoding="async">

	Aqui parece todo bien, pero tendremos un problema. Hasta ahora cada que en la propiedad *command* queremos agregar alguna función o método, lo hemos hecho sin paréntesis y esto es porque no han requerido de argumentos, pero el colocarle los paréntesis lo que ocasiona es que se ejecute directamente en lugar de asignarse para cada vez que sea presionado el botón.

	<img src="/apuntes/python-practico/img-1066.webp" alt="Captura de los apuntes" width="645" height="694" loading="lazy" decoding="async">

	Es por ello que para a que se dé la asignación correctamente sin que se ejecute. Haremos uso de las funciones anónimas lambda, lo cual ahora sí nos permitirá tener el funcionamiento que esperamos:

	<img src="/apuntes/python-practico/img-1067.webp" alt="Captura de los apuntes" width="1015" height="266" loading="lazy" decoding="async">

	De esta manera se hace la asignación correctamente y cada que presionemos los botones correspondientes al método *click* nos dará su información:

	<img src="/apuntes/python-practico/img-1068.webp" alt="Captura de los apuntes" width="621" height="330" loading="lazy" decoding="async">

	Ahora en el método *click* lo que haremos será insertar el valor de cada tecla que sea presionada en el display y para ello utilizaremos *insert* como se usa en el widget *Text*. Vamos a colocar que cada que se presione una tecla el carácter siempre se agregue al final, para que sea a la derecha siempre, y si escribimos primero 7 y luego 8, nos represente correctamente el 78, ya que si colocamos que se ingrese al inicio o en la posición 0, siempre lo colocara a la izquierda y en lugar de 78 veríamos un 87:

	<img src="/apuntes/python-practico/img-1069.webp" alt="Captura de los apuntes" width="1037" height="462" loading="lazy" decoding="async">

	Utilizar *end* o *tk.END* al insertar los datos o cualquier otra operatoria con los widgets de texto es exactamente lo mismo y no tendrá ningún efecto distinto.

	Además, al utilizar las funciones lambda en la asignación de *command* para los botones, tendremos que colocar dentro de ellas los paréntesis para cada método, aunque estos no requieran argumentos, de lo contrario no se ejecutarán al presionar los botones.

	Con lo anterior, al ejecutar la aplicación y presionar los botones, ya nos estaría colocando todo dentro del display:

	<img src="/apuntes/python-practico/img-1070.webp" alt="Captura de los apuntes" width="282" height="218" loading="lazy" decoding="async">

	*Método click*

	Para nuestro método click, primeramente pensaremos en agregar dos propiedades más a nuestro constructor de la clase, será *op_validation* que será un valor booleano inicializado en *False* para validar cuando se pare de introducir números a realizar cierta operación con otro número, además de la propiedad *current* que en forma de string irá almacenando número a número, incluyendo el punto de una forma conjunta, lo cual cambiará una vez se presione uno de los botones para realizar la operación, almacenando totalmente nuestro primer número, asignando nuevamente una cadena vacía a *current* y empezando a almacenar ahora el segundo número.

	<img src="/apuntes/python-practico/img-1071.webp" alt="Captura de los apuntes" width="1344" height="196" loading="lazy" decoding="async">

	Ahora, en nuestro método click primeramente definiremos una validación de si el botón que se ha presionado está entre una serie de números del 0 al 9 o si es el punto, de lo contrario serán los distintos tipos de opción y para ello se utilizará *else*.

	<img src="/apuntes/python-practico/img-1072.webp" alt="Captura de los apuntes" width="527" height="233" loading="lazy" decoding="async">

	La idea entonces será que, mientras solo se ingresen números y, en su respectivo caso, el punto para generar un número con decimales, iremos agregando uno a uno a nuestra propiedad *current* que será el número actual que vayamos introduciendo.

	Además, mostraremos en pantalla, al final de cada que presionemos un botón, el número que vamos generando, así como el estado de nuestra propiedad *op_verification*, que por el momento estará siempre en False:

	<img src="/apuntes/python-practico/img-1073.webp" alt="Captura de los apuntes" width="692" height="274" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-1074.webp" alt="Captura de los apuntes" width="751" height="394" loading="lazy" decoding="async">

	De esta manera vamos visualizando nuestro número. Nuestro estatus cambiará una vez que se presione cualquier tecla de alguna operación, así como almacenaremos el número que ya tenemos y regresaremos *current* a una cadena vacía para almacenar el siguiente número.

	De esta manera, primeramente deberemos agregar las propiedades *op* para almacenar el valor del botón de la operación que se quiere realizar y *total* para ahí almacenar el primer valor ya en un valor *float*, una vez que necesitemos vaciar el valor de current:

	<img src="/apuntes/python-practico/img-1075.webp" alt="Captura de los apuntes" width="350" height="196" loading="lazy" decoding="async">

	Ahora nos iremos al *else* en nuestro método *click*, donde entrará una vez que presionemos el botón para realizar algún tipo de operación. Aqui vamos a validar primeramente si *current* tiene contenido, porque podremos presionar algún botón de una operación sin haber ingresado números.

	En el caso de que nuestro current ya tenga contenido, quiere decir que tenemos un número para ya almacenar, entonces aqui verificaremos si nuestra propiedad *op* está vacía, que al ser el primer dato lo estará, en este caso almacenaremos en *total* el valor de current como un dato numérico flotante y regresaremos nuestra propiedad *current* a un dato vacío para que poder almacenar el siguiente número.
	
	Finalmente, fuera de los condicionales, vamos a asignarle a *op* el valor del botón que se ha presionado para saber el tipo de operación que se realizará y le asignaremos el valor de *True* a nuestro *op_validation*:

	<img src="/apuntes/python-practico/img-1076.webp" alt="Captura de los apuntes" width="687" height="401" loading="lazy" decoding="async">

	Finalmente, al inicio de nuestro método agregaremos una verificación, donde si nuestro *op_validation* es *True* lo setearemos a *False* y al final mostraremos a forma de nosotros observar el funcionamiento los datos de lo que valdrá nuestra propiedad *op* al seleccionar un tipo de operación, así como el valor de *total* una vez  que *current* regresa a ser una cadena vacía:

	<img src="/apuntes/python-practico/img-1077.webp" alt="Captura de los apuntes" width="702" height="514" loading="lazy" decoding="async">

	Con esto listo, podremos observar el funcionamiento planeado hasta ahora, con los primeros dos dígitos que se ingresen con tipo de operación seleccionada de por medio:

	<img src="/apuntes/python-practico/img-1078.webp" alt="Captura de los apuntes" width="681" height="551" loading="lazy" decoding="async">
