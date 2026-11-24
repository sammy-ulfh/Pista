---
curso: "python-desde-cero"
modulo: "python-desde-cero/modulos-y-archivos"
leccion: "entrada-por-teclado-y-salida-por-pantalla"
titulo: "Entrada por teclado y salida por pantalla"
orden: 27
minutos: 5.3
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 9
ejercicios: []
---

1. **Introducción**

	La interacción del usuario a través de la consola es una habilidad esencial en Python, exploraremos las funciones que permiten la entrada y salida de datos. Utilizaremos *input()* para recoger la entrada del teclado y *print()* para mostrar mensajes en pantalla.

	En cuanto al formato de texto, veremos cómo manejar y representar la información de manera amigable. Esto incluye desde la manipulación básica de cadenas hasta técnicas más avanzadas de formateo de cadenas, que permiten la inserción de variables y la alineación del texto.

	La codificación de caracteres es un arpecto clave para garantizar que la entrada y salida manejen adecuadamente diferentes idiomas y conjuntos de caracteres, preservando la integridad de los datos y la claridad de la comunicación en la consola.

	Dominar estas funciones es crucial para crear programas que requieran interacción con el usuario, y te brindarán las herramientas necesarias para construir aplicaciones interactivas robustas y fáciles de usar.
	</br>
2. **Práctica**

	A la hora de crear programas o scripts, mediante Python podríamos solicitarle al usuario alguna entrada de datos con los cuales nuestro programa trabajara, por ejemplo si solicitamos la edad o nombre del usuario, lo recibiremos con un *input()* y podremos trabajar con ello en nuestro programa, ya sea mostrando información con ello o almacenándolo en una variable.

	Un ejemplo sencillo es que podríamos solicitar un nombre por pantalla y tendremos la posibilidad de, gracias a *input()*, colocar un mensaje que se mostrara al momento de solicitar que el usuario ingrese algo.

	<img src="/apuntes/python-desde-cero/img-507.webp" alt="Captura de los apuntes" width="695" height="244" decoding="async">

	De esta manera, al momento que entra en el input se muestra el mensaje para solicitar el nombre y únicamente lo que el usuario escriba por teclado será almacenado en la variable *nombre*, al ingresar y presionar enter, después mostraremos lo almacenado en la variable con un mensaje y *print()* y veremos como es lo que ingresamos:

	<img src="/apuntes/python-desde-cero/img-508.webp" alt="Captura de los apuntes" width="467" height="124" loading="lazy" decoding="async">

	¿Qué pasa si intentamos hacer esto para solicitar la edad?

	En principio todo iría bien, pero habría un pequeño detalle y es que todo lo que sea introducido por pantalla, input lo almacenara en la variable como un tipo de dato *string* (cadena de texto), por lo que si se espera que se ingrese un número para realizar operaciones, se tendría que aplicar type casting para convertir este número a su tipo de dato *int*.

	Si solicitáramos la edad y luego en el input indicáramos la edad de esa persona el próximo año, al sumar un número a una cadena de texto nos daría error:

	<img src="/apuntes/python-desde-cero/img-509.webp" alt="Captura de los apuntes" width="881" height="364" loading="lazy" decoding="async">

	En cambio, al aplicar type casting y transformar el input al tipo de dato número, ahora sí que nos permitiría sumarle 1 a la edad para representar la del próximo año:

	<img src="/apuntes/python-desde-cero/img-510.webp" alt="Captura de los apuntes" width="755" height="293" loading="lazy" decoding="async">

	Ahora podríamos hacer un ejemplo más completo, en el cual efectuemos una excepción, ya que el usuario realmente podría ingresar texto y no números, y esto seguiría con el problema, ya que los caracteres no pueden ser convertidos a números.

	Para solucionar esto, la excepción que lanzaremos será de *ValueError*:

	<img src="/apuntes/python-desde-cero/img-511.webp" alt="Captura de los apuntes" width="792" height="428" loading="lazy" decoding="async">

	Esto está perfecto porque ya va bien sin lanzarnos un error, ahora lo único que nos faltaría sería colocar todo esto en un bucle infinito donde su condición siempre será *True* y en caso de que el usuario haya introducido bien el tipo de dato al momento de que termine de ejecutar todo sin problemas el bucle debería de terminar y lo haremos con un *break*, ya que todo ha salido bien, mientras que si todo sale mal se seguirá ejecutando hasta que el usuario ingrese bien los datos:

	<img src="/apuntes/python-desde-cero/img-512.webp" alt="Captura de los apuntes" width="848" height="549" loading="lazy" decoding="async">

	Ahora bien, no siempre le pediremos al usuario datos que quedamos mostrar sin problemas, supongamos que estamos solicitando la contraseña del usuario, pues en este caso realmente lo mejor sería que conforme vaya escribiendo el usuario no se vea lo que está escribiendo.

	Para ello vamos a utilizar *getpass*, lo cual es un módulo el cual depende de un script que está entre las rutas del PATH de Python, por lo que si deseamos incluso podremos ver su archivo:

	<img src="/apuntes/python-desde-cero/img-513.webp" alt="Captura de los apuntes" width="335" height="105" loading="lazy" decoding="async">

	Entonces ahora en nuestro archivo importaremos *getpass* desde el módulo *getpass* y similar a nuestro input utilizaremos *getpass()*.

	Funcionaria exactamente de la misma manera que un input, la diferencia sería que lo que vayamos a introducir no lo vamos a ver, a menos de que mostremos el contenido de la variable:

	<img src="/apuntes/python-desde-cero/img-514.webp" alt="Captura de los apuntes" width="624" height="304" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-515.webp" alt="Captura de los apuntes" width="626" height="347" loading="lazy" decoding="async">
