---
curso: "python-practico"
modulo: "python-practico/apps-de-escritorio"
leccion: "chat-multiusuario-con-gui-y-cifrado-e2e-1-de-5"
titulo: "Chat Multiusuario con GUI y Cifrado E2E (1 de 5)"
orden: 22
minutos: 7.9
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 13
ejercicios: []
---

1. **Introducción**

	Nos enfocaremos en construir un chat multiusuario desde cero, utilizando conceptos avanzados como threading y socket para gestionar la comunicación en tiempo real. Se empleará Tkinter para crear una interfaz gráfica intuitiva, permitiendo a varios usuarios conectarse y conversar de manera efectiva.

	Aprenderemos cómo estas herramientas pueden ser integradas para desarrollar una aplicación de chat robusta y funcional, explorando tanto la programación de back-end como de front-end para una experiencia de usuario completa.

	</br>
2. **Práctica**

	**IMPORTANTE:**
	Recordemos que para ejecutar el cliente, tendremos que tener siempre corriendo el servidor, además cada que se realicen cambios en uno u otro, se tendrá que cerrar y volver a ejecutar para que se carguen los cambios.

	Para este chat multiusuario, estaremos creando dos scripts, uno para el servidor y uno para el cliente. El servidor estará continuamente en escucha para conexiones entrantes, todo será totalmente establecido en la red local, pero si quisiéramos que funcione fuera de nuestra red local, tendríamos que alojar nuestro script del servidor en algún vps público para que cualquier cliente pudiese establecer una conexión.

	Toda la parte de nuestra interfaz gráfica estará del lado del cliente, ya que el servidor estará operando las conexiones, no requerirá realmente de una.

	En el cliente, tendremos en cuenta que cuando un cliente entre le aparece en el momento el cliente que se haya conectado al resto de clientes conectados, así como cuando este se desconecte. Además, manejaremos un campo donde se verán todos los mensajes de los distintos clientes, así como para enviar mensajes e incluso un campo donde al presionar un botón nos pueda listar los clientes.

	**server.py**

	Este será el script que se encargue de gestionar y actualizar en todo momento las conexiones de los clientes.

	Para nuestro servidor, iniciaríamos importando la librería **socket**, ya que vamos a entablar conexiones, así como la librería **threading** para la gestión de múltiples usuarios.

	Para todo el lado de nuestro servidor, definiríamos una función **server_program** la cual solo se ejecutara si el script es ejecutado directamente:

	<img src="/apuntes/python-practico/img-1106.webp" alt="Captura de los apuntes" width="302" height="225" decoding="async">

	Comenzaríamos creando nuestro socket, donde como primer argumento indicamos que trabajaremos con la familia de direcciones *IPv4*, mientras que, como segundo argumento, indicamos que trabajaremos mediante TCP:

	<img src="/apuntes/python-practico/img-1107.webp" alt="Captura de los apuntes" width="753" height="71" loading="lazy" decoding="async">

	Además, utilizaremos la propiedad *setsockopt*, donde en el nivel **SOL_SOCKET** cambiaremos la propiedad **SO_REUSEADDR** a **1** para que nos reutilice el mismo puerto en caso de que la conexión se cierre y se abra rápidamente, ademas indicaremos el host y puerto al inicio:

	<img src="/apuntes/python-practico/img-1108.webp" alt="Captura de los apuntes" width="743" height="168" loading="lazy" decoding="async">

	Ahora estaremos inicializando el servidor con **bind**, pasándole mediante una tupla el host y el puerto donde se inicializará, para después ponernos en escucha con *listen*.

	Finalmente, colocaremos un mensaje que se mostrará en la terminal, para en todo momento saber en qué parte del código vamos. Así, en caso de presentarse un error, tendremos un poco la idea de por dónde se dio:

	<img src="/apuntes/python-practico/img-1109.webp" alt="Captura de los apuntes" width="822" height="254" loading="lazy" decoding="async">

	Como en todo momento deseamos gestionar a los clientes e incluso saber qué usuario es el que está conectado, para ello crearemos una lista *clients* que será una lista de sockets y un diccionario *usernames*, donde la llave será un socket de usuario y el contenido, el nombre de usuario.

	Además, mediante un bucle infinito vamos a estar recibiendo las conexiones de los clientes, donde con *accept* recibimos su socket y su address, almacenaremos el socket en la lista de clientes.

	Finalmente, mostraremos un mensaje de la conexión que se ha generado, mostrando por la terminal el addr, a manera de confirmación para nosotros (recordemos agregar la *f* para que muestre bien la variable):

	<img src="/apuntes/python-practico/img-1110.webp" alt="Captura de los apuntes" width="864" height="241" loading="lazy" decoding="async">

	De esta manera, ahora visualizamos si generamos una conexión al servidor:

	<img src="/apuntes/python-practico/img-1111.webp" alt="Captura de los apuntes" width="684" height="297" loading="lazy" decoding="async">

	Con esto listo, ahora crearemos un nuevo hilo, donde como argumentos le pasaremos una función como target, la cual será *client_thread* para gestionar cada cliente, como segundo argumento con la propiedad *args* asignaremos los argumentos que le pasaremos, que serán el socket del cliente, la lista de sockets de cada cliente y el diccionario de los nombres de usuario.

	Luego, antes de inicializar el hilo colocaremos la propiedad *daemon* y le asignaremos el valor de *True*, lo cual nos sirve como una forma de asegurar que una vez se finalice la ejecución principal, que sería la función *server_program* en este caso, se asegure el cierre de todos los hilos, sin que nos de problemas de que se queden en ejecución y, por lo tanto, no podamos cerrar el servidor y se nos quede en un estado de espera.

	Finalmente, inicializamos el hilo con *start()* y en nuestra función para gestionar el hilo del cliente, por lo pronto solo definiremos un mensaje para mostrar en terminal, para verificar que todo esté funcionando correctamente.

	<img src="/apuntes/python-practico/img-1112.webp" alt="Captura de los apuntes" width="1014" height="582" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-1113.webp" alt="Captura de los apuntes" width="1342" height="419" loading="lazy" decoding="async">

	Además, como buena práctica recordemos que tendremos que agregar el método especial *close()* para nuestro socket del servidor, el cual irá después de nuestro bucle. Es posible que no siempre lleguemos al punto que corresponda a cerrar correctamente el socket, pero como buena práctica recordemos siempre agregarlo:

	<img src="/apuntes/python-practico/img-1114.webp" alt="Captura de los apuntes" width="1006" height="810" loading="lazy" decoding="async">

	De esta manera, ya tendremos clientes separados donde, en nuestra función *client_thread* definiremos lo que deseamos que suceda para cada cliente de forma individual.

	Antes de empezar a definir del lado del servidor lo que sucedera para cada cliente, crearemos nuestro script para el cliente, que será donde se requerirá de la interfaz gráfica.

	**Client**

	Empezaremos definiendo que nuestra función principal *client_program* se ejecute solamente si el script es ejecutado directamente, así como colocando el host y puerto correspondientes a la dirección del servidor al que nos conectaremos y definiriamos el socket del cliente de la misma manera:

	<img src="/apuntes/python-practico/img-1115.webp" alt="Captura de los apuntes" width="867" height="298" loading="lazy" decoding="async">

	Con esto listo, estableceríamos la conexión con el servidor, luego la parte donde se solicitará el nombre de usuario por consola y será lo primero que se enviará al servidor:

	<img src="/apuntes/python-practico/img-1116.webp" alt="Captura de los apuntes" width="867" height="376" loading="lazy" decoding="async">

	Esto se utilizará del lado del servidor, para mostrarle a los demás usuarios conectados, el usuario que se ha conectado.

	Ahora, del lado del servidor, para cada cliente recibiremos el nombre de usuario y en el diccionario, utilizando el socket del cliente como llave, almacenaremos el nombre de usuario enviado por el usuario y mostrando finalmente el contenido del diccionario:

	<img src="/apuntes/python-practico/img-1117.webp" alt="Captura de los apuntes" width="578" height="147" loading="lazy" decoding="async">

	De esta manera, al inicializar el servidor y conectarnos con el script del cliente múltiples veces, obtendremos el siguiente funcionamiento:

	<img src="/apuntes/python-practico/img-1118.webp" alt="Captura de los apuntes" width="1865" height="525" loading="lazy" decoding="async">

	De esta manera, del lado izquierdo en cada posición visualizamos todo el socket del cliente y del lado del valor visualizamos el nombre de usuario para ese cliente.
