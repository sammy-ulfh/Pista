---
curso: "python-practico"
modulo: "python-practico/biblioteca-estandar"
leccion: "conexiones-de-red-y-protocolos-1-de-4"
titulo: "Conexiones de red y protocolos (1 de 4)"
orden: 4
minutos: 14.2
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 20
ejercicios: []
---

1. **Introducción**

	Los protocolos *TCP* (Transmission Control Protocol) y *UDP* (User Datagram Protocol) son fundamentales en la comunicación de red, y la librería *socket* en Python proporciona las herramientas necesarias para interactuar con ellos. Aquí tienes una descripción detallada de ambos protocolos y el uso de ‘*socket*‘:

	*Protocolos TCP:*

	- *Orientado a la Conexión:* TCP es un protocolo orientado a la conexión, lo que significa que establece una conexión segura y confiable entre el emisor y el receptor antes de la transmisión de datos.
	  </br>
	- *Fiabilidad y Control de Flujo:* Garantiza la entrega de datos sin errores y en el mismo orden que se enviaron. También gestiona el control de flujo y la corrección de errores.
	  </br>
	- *Uso en Aplicaciones:* Es ampliamente utilizado en aplicaciones que requieren una entrega fiable de datos, como navegadores web, correo electrónico, y transferencia de archivos.

	*Protocolo UDP:*

	- *No Orientado a la Conexión:* A diferencia de TCP, UDP es un protocolo no orientado a la conexión. Envía datagramas (paquetes de datos) sin establecer una conexión previa.
	  </br>
	- *Rápido y Ligero:* UDP es más rápido y tiene menos sobrecarga que TCP, ya que no verifica la llegada de paquetes ni mantiene en orden los mismos.
	  </br>
	- *Uso en Aplicaciones:* Ideal para aplicaciones donde la velocidad es crucial y se pueden tolerar algunas pérdidas de datos, como en juegos en línea, streaming de video y voz sobre IP (VoIP).

	*Librería 'socket' en Python:*

	La librería *socket* en Python es una herramienta esencial para la programación de comunicaciones en red. Permite a los desarrolladores crear aplicaciones que pueden enviar y recibir datos a través de la red, ya sea una red local o a través de internet. Aquí tienes una visión general de la librería *socket*:

	- *Creación de sockets:* La librería *socket* proporciona clases y funciones para crear sockets, que son puntos finales de comunicación. Puedes crear sockets tanto para el protocolo TCP (Transmission Control Protocol) como para UDP (User Datagram Protocol).
	- sd
	- *Conexiones TCP:* Puedes utilizar *socket* para establecer conexiones TCP, que son conexiones confiables y orientadas a la conexión. Esto es útil para aplicaciones que requieren transferencia de datos confiable, como la transmisió de archivo o la comunicación cliente-servidor.
	- sddsd
	- *Comunicación UDP:* La librería *socket* también admite la comunicación mediante UDP, que es un protocolo de envío de mensajes sin conexión. Es adecuado para aplicaciones que necesitan una comunicación rápida y eficiente, como juegos en línea o aplicaciones de transmisión de video en tiempo real.
	- sds
	- *Funciones de envío y recepción:* Puedes utilizar métodos como *send()* y *recv()* para enviar y recibir datos a través de sockets. Esto permite tranferir información entre dispositivos de manera eficiente.
	- sds
	- *Gestión de conexiones:* La librería *socket* incluye métodos como *bind()* para asociar un socket a una dirección y puertos específicos, y *listen()* para poner un socket en modo de escucha, lo que permite aceptar conexiones entrantes.
	- dsd
	- *Conexiones cliente-servidor:* Con *socket*, puedes crear aplicaciones cliente-servidor, donde un programa actúa como servidor esperando conexiones entrantes y otro actúa como cliente para conectarse al servidor.

	En resumen, la librería *socket* en Python proporciona las herramientas necesarias para desarrollar aplicaciones de red, permitiendo la comunicación entre dispositivos a través de diferentes protocolos y ofreciendo control sobre la tranferencia de datos. Es una parte fundamental  de la programación de redes en Pytho y se utiliza en una amplia variedad de aplicaciones, desde servidores web hasta aplicaciones de chat y juegos en línea.
	</br>
2. **Práctica**

	En Python es común crear exploits y al saber que diversos servicios operan en un puerto dado, al nosotros saberlo y querer explotar este servicio tendremos que entablar la conexión o comunicación desde nuestro script con este servicio. Por ende utilizaremos la librería *socket*, la cual nos permitirá entablar las conexiones tanto por TCP como por UDP, que a nivel de protocolo sería orientado a conexión y no orientado a conexión.

	De esta manera, un socket lo podremos considerar como una asignación o designación de un concepto abstracto, el cual nos permitirá intercambiar cualquier flujo de datos, generalmente de una forma fiable y ordenada. Lo que además nos permite que dos máquinas se comuniquen entre ellas.

	Algo que vamos a estar creando es prácticamente un servidor que se ponga en escucha en un puerto dado y en otro realizar la conexión y enviar algo, como lo siguiente con netcat:

	<img src="/apuntes/python-practico/img-735.webp" alt="Captura de los apuntes" width="605" height="392" decoding="async">

	De esta manera, la parte superior es la que está en escucha en *localhost* mediante el puerto 123, mientras que la parte inferior realiza una conexión al *localhost* al puerto dado, por lo que si nosotros enviamos el *Hola, esto es una prueba* desde nuestra conexión, nuestra parte superior que está en escucha lo recibe.

	Con esto en mente, vamos a crear un nuevo archivo en Python, colocaremos nuestro *shebang* e importaremos la librería *socket*:

	<img src="/apuntes/python-practico/img-736.webp" alt="Captura de los apuntes" width="274" height="87" loading="lazy" decoding="async">

	Lo primero que tendríamos que hacer, es crear el socket del servidor. Donde ahora *server_socket* nos permitirá aceptar conexiones entrantes y por ende establecer este servicio en escucha para que otros clientes se conecten:

	<img src="/apuntes/python-practico/img-737.webp" alt="Captura de los apuntes" width="688" height="119" loading="lazy" decoding="async">

	De esta manera, con el método *socket()*, nuestro primer argumento *socket.AF_INET* hace referencia a la familia de direcciones que acepta, que en este caso estamos tratando con IPv4, por ende con *socket.AF_INET* estamos indicándolo. Con *socket.SOCK_STREAM*, estamos indicando que vamos a trabajar con conexiones *TCP* (Transmission Control Protocol).

	Por ende esta sería la primera línea, pero para estar nosotros en escucha, en este caso definiremos que será en el equipo local (*localhost*) por el puerto *1234*, por lo tanto, tendríamos que definir *server_address*, donde estaremos indicando que estará por escucha en el localhost y por el puerto 1234:

	<img src="/apuntes/python-practico/img-738.webp" alt="Captura de los apuntes" width="680" height="148" loading="lazy" decoding="async">

	De esta manera, al utilizar *bind()* sobre nuestro socket y pasarle como argumento en donde se pondrá en escucha, ahora estaríamos poniéndonos en escucha en *localhost* por el puerto *1234*.

	<img src="/apuntes/python-practico/img-739.webp" alt="Captura de los apuntes" width="679" height="161" loading="lazy" decoding="async">

	Con esto, ahora la idea es que para nosotros aceptar conexiones de múltiples clientes y en paralelo comunicarnos con todos, lo conveniente sería jugar con hilos.

	En este caso, primeramente estaríamos trabajando con un único cliente y lo que estaríamos definiendo es como una cola de espera donde si ya esta entablada una conexión con un cliente, el resto de conexiones que se intenten estarán como en una cola de espera, de forma que mientras que no se cierre una conexión que ya esta entablada con un cliente, no va a llegar la información o mensaje del siguiente. Por lo que para efectuar esto podríamos utilizar directamente con nuestro socket *listen()* y como argumento pasarle el número de conexiones a las que vamos a limitarlo.

	<img src="/apuntes/python-practico/img-740.webp" alt="Captura de los apuntes" width="688" height="226" loading="lazy" decoding="async">

	Ahora, mediante un bucle infinito, podremos definir otro socket, pero este será un socket que recibiremos del cliente que se conecte, de forma que ahora nosotros también podríamos comunicarnos con él y enviar información, este lo recibiremos con la propiedad *accept()*  y nos retornara dos valores, uno que será el propio socket y otro que será la información desde donde se esta conectando y el otro que sea el puerto:

	<img src="/apuntes/python-practico/img-741.webp" alt="Captura de los apuntes" width="690" height="330" loading="lazy" decoding="async">

	Por ende, ahora la idea aquí es que el cliente se conecta y primeramente recibimos su socket y address para también nosotros poder comunicarnos con él. Entonces, como también el cliente nos enviara datos, lo que haremos será que mediante el socket del cliente vamos a recibir esos datos, información o mensaje con *recv()* y como argumento le pasaremos el número de bytes que queremos recuperar de esa información enviada por el cliente, de tal manera que esa información en bytes la almacenaremos en una variable *data*:

	<img src="/apuntes/python-practico/img-742.webp" alt="Captura de los apuntes" width="626" height="112" loading="lazy" decoding="async">

	Como esta información esta en bytes, a la hora de representarla de una forma legible para nosotros, tendríamos que utilizar *decode()*, para transformarlo a una cadena legible (tengamos en cuenta que cuando nosotros seamos el cliente, también tendremos que convertir estos bytes a una cadena antes de enviarlo), de esta manera al mostrarlo por pantalla, que sería la variable *data*, tendríamos que aplicar el *decode()*:

	<img src="/apuntes/python-practico/img-743.webp" alt="Captura de los apuntes" width="635" height="150" loading="lazy" decoding="async">

	También podríamos representar la información del cliente con la conexión que se ha realizado, por lo que podríamos mostrar *client_address* con un mensaje. Además, utilizar *sendall()* para automáticamente enviarle un mensaje al cliente una vez nos envíe uno, jugaremos con *f* strings para que interprete el salto de línea y al final de la cadena colocaremos *.encode()* para que la cadena sea enviada en bytes al cliente.

	<img src="/apuntes/python-practico/img-744.webp" alt="Captura de los apuntes" width="845" height="213" loading="lazy" decoding="async">

	Finalmente con *close()*, vamos a indicar que nos cierre esa conexión con el cliente una vez se haya acontecido todo lo anterior, de forma que solo estaríamos permitiendo recibir un mensaje y una vez recibido, le retronaríamos al cliente "Un saludo, crack!", y una vez esto suceda se cerrara la conexión:

	<img src="/apuntes/python-practico/img-745.webp" alt="Captura de los apuntes" width="855" height="224" loading="lazy" decoding="async">

	De esta forma ya tendríamos montado un pequeño servidor, el cual pondremos a correr. Primeramente, estableceríamos la conexión utilizando *netcat* y después vamos a montanos el script para que, siendo un cliente, conectarnos con Python.

	<img src="/apuntes/python-practico/img-746.webp" alt="Captura de los apuntes" width="762" height="425" loading="lazy" decoding="async">

	Si estamos en Linux y movemos algunas cosas en el script por curiosidad, o forzamos el cierre de este, puede ser que el puerto no se llegue a cerrar correctamente y al ejecutar el script de nuevo nos diga que este puerto esta ocupado, para este caso podremos utilizar el comando `sudo ufw deny PORT` (cambia PORT por el puerto correspondiente).

	De esta forma, vemos como cuando un cliente se conecta, esta conexión abre un puerto aleatorio al cual mismamente nosotros podremos enviarle información que proporcionamos en el script.

	Por lo que si una vez se cierra ese socket nos volviéramos a conectar, funcionaria correctamente:

	<img src="/apuntes/python-practico/img-747.webp" alt="Captura de los apuntes" width="722" height="472" loading="lazy" decoding="async">

	Ahora, si viéramos lo de las múltiples conexiones con respecto a la cola de usuarios por usuario de acuerdo en el orden que se conecten, si ahora hiciéramos 3 conexiones, enviamos en mensaje de la primera, pero luego un mensaje de la tercera, el mensaje de la tercera no se vería reflejado:

	<img src="/apuntes/python-practico/img-748.webp" alt="Captura de los apuntes" width="1468" height="477" loading="lazy" decoding="async">

	De esta forma, hasta que el cliente que en orden se conectó como segundo envíe algo, no se enviara nada del tercero, y una vez el segundo envíe un mensaje, la representación de todo se efectuara en el orden que se conectaron:

	<img src="/apuntes/python-practico/img-749.webp" alt="Captura de los apuntes" width="1734" height="462" loading="lazy" decoding="async">

	*Conexión de un cliente:*

	Ahora, si quisiéramos generar un script para realizar una conexión desde el lado del cliente, el concepto sería el mismo. Crearíamos un script *client.py* y en este vamos a aplicar el mismo principio para crear el socket del cliente y en cuanto a la conexión que realizara, para nuestro *server_address*, aquí colocaríamos la dirección de a donde se va a conectar el cliente:

	<img src="/apuntes/python-practico/img-750.webp" alt="Captura de los apuntes" width="681" height="151" loading="lazy" decoding="async">

	De esta manera, le estamos indicando al crear el socket del cliente que con *socket.AF_INET* estamos creando un socket para conexión utilizando IPv4 y con *socket.SOCK_STREAM* que es una conexión TCP (Transmission Control Protocol).

	Luego en *server_addres*, estamos indicando la dirección de a donde nos conectaremos.

	Aquí, tomando directamente el socket de cliente vamos a indicar que nos vamos a conectar a la dirección dada, en el caso del servidor para abrirlo se utiliza *bind()*, pero cuando se trata de un cliente para conectarse, se utiliza *connect()* y de igual manera le pasaremos el *address* del servidor:

	<img src="/apuntes/python-practico/img-751.webp" alt="Captura de los apuntes" width="683" height="160" loading="lazy" decoding="async">

	Finalmente, como lo de limitar la cantidad de conexiones a la vez  se gestiona del lado del servidor, aquí lo que nosotros haremos será efectuar un *try*, pero no utilizaremos excepciones, ya que realmente no se suelen dar errores del lado del cliente, más bien utilizaremos luego del *try* un *finally* que sabremos que si o si se ejecutara después del *try* y en nuestro *finally* lo que haremos será cerrar nuestro propio socket, ya que esto siempre es una buena práctica para evitar que quede por ahí abierto y tener fugas de información:

	<img src="/apuntes/python-practico/img-752.webp" alt="Captura de los apuntes" width="308" height="117" loading="lazy" decoding="async">

	Ahora escribiremos un mensaje el cual enviaremos en forma de bytes con *sendall()*, así como también recibiremos lo que el servidor nos retorne con *recv()* y lo mostraremos aplicándole un *decode*, ya que recordemos que los datos son siempre enviados en formato de bytes.

	<img src="/apuntes/python-practico/img-753.webp" alt="Captura de los apuntes" width="694" height="247" loading="lazy" decoding="async">

	De esta manera, al ejecutarlo tendríamos lo siguiente:

	<img src="/apuntes/python-practico/img-754.webp" alt="Captura de los apuntes" width="702" height="326" loading="lazy" decoding="async">

	Aquí en nuestro script del servidor estamos cerrando solamente el socket del cliente, pero realmente aún nos faltaría cerrar el socket del servidor, de la forma en que podríamos gestionarlo es que una vez presionemos *ctrl + c*  (*KeyboardInterrupt*) para terminar el programa, nuestro programa detecte esto y sería como la forma de capturar el flujo de salida de nuestro script y aquí ya cerraríamos el programa.
