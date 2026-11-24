---
curso: "python-practico"
modulo: "python-practico/biblioteca-estandar"
leccion: "conexiones-de-red-y-protocolos-3-de-4"
titulo: "Conexiones de red y protocolos (3 de 4)"
orden: 6
minutos: 9.1
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 11
ejercicios: []
---

1. **Introducción**

	La función *setsockopt* en la programación en redes juega un papel crucial al permitir a los desarrolladores a ajustar y controlar varios aspectos de los sockets. Los sockets son fundamentales en la comunicación de red, proporcionando un punto final para el envío y recepción de datos en una red.

	*Niveles en setsockopt:*

	Cuando utilizas *setsockopt*, puedes especificar diferentes niveles de configuración, que determinan el ámbito y la aplicación de las opciones que estableces:

	- *Nivel de socket (SOL_SOCKET):* Este nivel afecta a las opciones aplicables a todos los tipos de sockets, independientemente del protocolo que estén utilizando. Las opciones de este nivel controlan aspectos generales del comportamiento del socket, como el tiempo de espera, el tamaño del buffer, y el reuso de direcciones y puertos.
	  </br>
	- *Nivel de protocolo:* Este nivel permite configurar opciones específicas para un protocolo en particular, como TCP o UDP. Por ejemplo, puedes ajustar opciones relacionadas con la calidad del servicio, la forma en que se manejan los paquetes de datos, o características específicas de un portocolo.

	*socket.SOL_SOCKET*

	*socket.SOL_SOCKET* es una constante en muchos lenguajes de programación, que se usa con *setsockopt* para indicar que las opciones que se van a ajustar son a nivel de socket. Esto significa que las opciones aplicadas en este nivel afectarán a todas las operaciones de red realizadas a través del socket, sin importar el protocolo de transporte específico (como TCP o UDP) que esté utilizando.

	*socket.SO_REUSEADDR*

	*socket.SO_REUSEADDR* es otra opción comúnmente utilizada en setsockopt. Esta opción es muy útil en el desarrollo de aplicaciones de red. Lo que hace es permitir que un socket se enlace a un puerto que todavía está siendo utilizado por un socket y que ya no está activo. Esto es particularmente útil en situaciones donde un servidor se reinicia y sus sockets aún están en estado de "espera de cierre" (*TIME_WAIT*), lo que podría impedir que el servidor se vuelva a enlazar al mismo puerto.

	Al establecer *SO_REUSEADDR*, el sistema operativo permite reutilizar el puerto inmediatamente, lo que facilita la reanudación rápida de los servicios del servidor.

	En resumen, *setsockopt* con diferentres niveles y opciones, como *SOL_SOCKET* y *SO_REUSEADDR*, proporciona una flexibilidad significativa en la configuración de sockets para una comunicación de red eficiente y efectiva.
</br>
2. **Práctica**

	Empezaremos definiendo nuestro host, puerto y un socket el cual vaya a entablar una conexión TCP:

	<img src="/apuntes/python-practico/img-774.webp" alt="Captura de los apuntes" width="751" height="190" decoding="async">

	Recordemos que el primer argumento *socket.AF_INET* es para indicar la familia de direcciones IP, en este caso IPv4.

	Con esto en mente, algo interesante con socket es que nosotros podremos modificar las propiedades que ya contiene el propio socket, para esto utilizaríamos *setsockopt()*, donde nosotros tendremos que pasarle tres argumentos.

	El primero es para indicarle un nivel que vayamos a modificar, en el segundo la propiedad que vamos a modificar y en el tercer argumento la igualdad de esa opción que deseamos establecer.

	Con esto en mente, en el primer argumento, cuando queramos referenciar al propio nivel del socket, para poder acceder a sus propiedades utilizaremos *socket.SOL_SOCKET*,  donde *SOL* proviene de *SocketLevel*, lo cual es la capa que hace referencia al propio SOCKET para poder acceder a sus propiedades.

	En este caso, como segundo argumento alteraremos la propiedad *socket.SO_REUSEADDR* y como tercer argumento le asignaremos el valor a *1*.

	<img src="/apuntes/python-practico/img-775.webp" alt="Captura de los apuntes" width="768" height="102" loading="lazy" decoding="async">

	Esto nos serviría para que cuando cerremos el servidor, forzando el cierre de nuestro script, reutilizar el *TIME_WAIT* que sucedia dejando el address en un estado de espera, lo que no nos deja utilizar el mismo puerto de forma rápida. Al setear la propiedad *SO_REUSEADDR* a *1*, esto ya nos permite que cuando forcemos el cierre del servidor, reutilizar el mismo puerto y host sin ningún problema.

	Como primer argumento, en cuanto a niveles del socket, algunos son:

	- *socket.IPPROTO_IP:* Nos ayuda a alterar propiedades relacionadas con protocolo IP.
	- *socket.IPPROTO_TCP:* Para cambiar propiedades de TCP
	- *socket.IPPROTO_UDP:* Para cambiar propiedades de UDP

	Con esta propiedad que hemos modificado lista, ahora lo que restaría es ponernos en escucha de conexiones que se puedan realizar, con *bind()* pasando mediante una tupla el host y el puerto.

	<img src="/apuntes/python-practico/img-776.webp" alt="Captura de los apuntes" width="754" height="294" loading="lazy" decoding="async">

	Ahora lo que se define en el bucle para cuando una conexión se entabla, lo haremos empleando el uso de hilos. Esto nos permitirá realizar cosas con múltiples clientes a la vez.

	Para ello vamos a utilizar la librería *threading*, de esta forma nuestra definición en el bucle, se tendría que poner *listen()*. Realmente listen es como la indicación que nos permite estar como a la espera de conexiones para que se genere una cola del orden en el que se vayan realizando las conexiones, anteriormente le indicábamos *1* como argumento, pero realmente al trabajar con hilos ya no es necesario, ya que Python gestiona internamente el total de conexiones que se entablen.

	De esta manera, como anteriormente lo hacíamos, también aceptaremos la conexión para recibir el socket del cliente y su address (IP y host):

	<img src="/apuntes/python-practico/img-777.webp" alt="Captura de los apuntes" width="755" height="413" loading="lazy" decoding="async">

	Con la librería *threading*, por lo que con *threading.Thread()*, estaríamos instanciando a una clase a la cual como argumentos tendríamos que pasarle un *target* el cual debe de tener como contenido una función la cual debe gestionar todo el funcionamiento que se realizara cuando un cliente se conecte, así como *args*, lo que debe tener como contenido el socket del cliente y el address. Lo que nos permitirá trabajar con cada cliente de forma individual.

	Desde luego, al instanciar una clase, esto tendremos que almacenarlo, por lo que estaríamos creando un objeto, para lo cual luego podremos utilizar *start()* para iniciar nuestro nuevo hilo.

	<img src="/apuntes/python-practico/img-778.webp" alt="Captura de los apuntes" width="899" height="164" loading="lazy" decoding="async">

	Esto está bien, pero realmente la clase *Thread* por sí sola no está preparada para lo que nosotros queremos hacer de trabajar con múltiples hilos para múltiples conexiones en un servidor TCP.

	Por ende, tendremos que modificar esta clase, por lo que crearemos nuestra propia clase que herede de la clase *threading.Thread*, tendremos en cuenta que le pasaremos al constructor como argumentos los datos del cliente (el socket y el address), además de que tendremos que llamar al propio constructor de la clase *Thread*, ya que este inicializa cosas importantes para el funcionamiento de los hilos.

	De esta manera, si dentro del constructor mostráramos la información del nuevo cliente que se ha conectado, funcionaria correctamente:

	<img src="/apuntes/python-practico/img-779.webp" alt="Captura de los apuntes" width="754" height="692" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-780.webp" alt="Captura de los apuntes" width="731" height="405" loading="lazy" decoding="async">

	*hola* fue algo que ya escribí. Con esto estaríamos viendo que funciona correctamente, por lo que podríamos tener múltiples conexiones.

	Ahora mismo, cuando intentamos conectar a un cliente cuando ya hay uno activo, se termina la sesión del que ya se encuentra activo, esto sucede porque aún no tenemos nada definido que se vaya a realizar cuando los clientes se conecten.

	Lo que haremos en este caso, será definir que se retronará el mensaje que el cliente nos envíe.

	Para esto, la clase principal corre el método *run()* cuando utilizamos *start()* para inicializar el hilo. Por ende lo que haremos será reescribir este método y definir que es lo que queremos que suceda. Definiremos que el servidor reciba el mensaje del cliente, lo muestre y luego lo envíe al mismo, si este ingresa la palabra *bye* cerraremos el bucle que constantemente esperara un mensaje del usuario y se cerrará su sesión.

	<img src="/apuntes/python-practico/img-781.webp" alt="Captura de los apuntes" width="785" height="369" loading="lazy" decoding="async">

	Finalmente, mostramos un mensaje indicando que cliente se termina desconectando y tendríamos lo siguiente:

	<img src="/apuntes/python-practico/img-782.webp" alt="Captura de los apuntes" width="1760" height="681" loading="lazy" decoding="async">

	Todo funciona correctamente porque en el código, al momento de recibir el mensaje del cliente, le metemos un *strip*, lo que elimina cualquier carácter especial que este al inicio o al final de este.

	Si elimináramos el *strip*, esto ahora tendría un salto de línea y por ende en nuestro condicional, si nuestra condición es que nuestro mensaje sea igual a "bye", no lo tomaría como igual y continuaría la ejecución del programa.

	Pero, algo interesante es que tenemos la librería *pbd*, la cual nos permite colocar un breakpoint, este lo colocaríamos justo después de asignarle el contenido a nuestra variable *message:*

	<img src="/apuntes/python-practico/img-783.webp" alt="Captura de los apuntes" width="564" height="541" loading="lazy" decoding="async">

	Si esto lo ejecutáramos, el programa haría una pausa luego de asignarle el contenido a *message* y con esto podremos utilizar *l*, para listar la parte del código donde nos encontramos y usar *p* para listar el contenido de una variable, en este caso de la variable *message*:

	<img src="/apuntes/python-practico/img-784.webp" alt="Captura de los apuntes" width="888" height="617" loading="lazy" decoding="async">

	De esta manera podremos ver como nos llega el mensaje y que sucede si le aplicamos el *strip*.
