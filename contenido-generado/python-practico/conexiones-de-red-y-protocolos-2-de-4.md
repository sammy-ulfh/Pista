---
curso: "python-practico"
modulo: "python-practico/biblioteca-estandar"
leccion: "conexiones-de-red-y-protocolos-2-de-4"
titulo: "Conexiones de red y protocolos (2 de 4)"
orden: 5
minutos: 9.7
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 19
ejercicios: []
---

1. **Introducción**

	*Manejadores de contexto con conexiones:*

	Los manejadores de contexto (*with* en Python) se utilizan para garantizar que los recursos se gestionen de manera adecuada. En el contexto de las conexiones de socket, un manejador de contexto se encarga de abrir y cerrar el socket de manera segura. Esto evita que los recursos del sistema queden en uso indefinidamente y asegura una gestión adecuada de las conexiones.

	*Diferencias entre send y sendall:*

	- *send(data):* El método *send()* se utiliza para enviar una cantidad específica de datos a través del socket. Puede no enviar todos los datos en una sola llamada y puede ser necesario llamarlo múltiples veces para enviar todos los datos.
	- sd
	- *sendall(data):* El método *sendall()* se utiliza para enviar todos los datos especificados a través del socket. Realiza llamadas repetidas a *send()* internamente para garantizar que todos los datos se envíen por completo sin pérdidas.

	La elección entre *send* y *sendall* depende de si se necesita garantizar la entrega completa de los datos o si se permite que los datos se envíen en fragmentos. send puede enviar datos fragmentos, mientras que sendall garantiza que todos los datos se envíen sin pérdida.
	</br>
2. **Práctica**

	Utilizando *with* podremos optimizar de mejor manera todo el servidor que hemos montado anteriormente, ya que al colocarlo lo que conseguimos es que automáticamente se cierren los sockets tanto de servidor y cliente sin ningún problema, evitando que quede información colgada y sería mucho más eficiente.

	<img src="/apuntes/python-practico/img-755.webp" alt="Captura de los apuntes" width="672" height="224" decoding="async">

	Aquí, de una forma mucho más organizada, estaríamos creando una función que nos permitiría inicializar el servidor, estaríamos definiendo de forma separada el *host* y el *puerto*, luego con *with* estaríamos realizando exactamente la misma definición de un socket y finalmente al socket del servidor lo vamos a referencias con *s*, esto es algo mucho mejor, ya que se asegurara de que se cierre correctamente, evitando que se quede abierto.

	Luego de esto inicializaríamos el server pasando la información por una tupla como lo hacíamos anteriormente, utilizando *bind()*, así como también definiríamos que aceptara en escucha de 1 a uno. Luego recibiremos el socket del cliente y su address:

	<img src="/apuntes/python-practico/img-756.webp" alt="Captura de los apuntes" width="622" height="119" loading="lazy" decoding="async">

	Luego de esto también utilizaríamos *with* con el socket del cliente que es *conn*, para asegurar que se cierre correctamente una vez lo terminemos de utilizar.

	En este primeramente definiremos el poder recibir 1024 bytes con *recv()* y lo almacenaremos en *data* y lo que haremos en esta ocasión será enviarlo de vuelta al mismo cliente. Esto será gestionado dentro de un bucle infinito, por lo que en caso de que recibamos una entrada vacía del cliente, la conexión se cerrara automáticamente al salir del bucle infinito con *break*:

	<img src="/apuntes/python-practico/img-757.webp" alt="Captura de los apuntes" width="327" height="162" loading="lazy" decoding="async">

	Finalmente, mandaríamos a llamar a la función *start_server()*, para iniciar el servidor al ejecutar el script:

	<img src="/apuntes/python-practico/img-758.webp" alt="Captura de los apuntes" width="210" height="57" loading="lazy" decoding="async">

	Ahora, al ejecutar nuestro script, inicializaríamos nuestro servidor y nuestra conexión la veríamos así:

	<img src="/apuntes/python-practico/img-759.webp" alt="Captura de los apuntes" width="242" height="391" loading="lazy" decoding="async">

	Y si enviáramos una cadena vacía o interrumpiéramos la conexión, también se cerraría todo correctamente del lado del servidor:

	<img src="/apuntes/python-practico/img-760.webp" alt="Captura de los apuntes" width="678" height="444" loading="lazy" decoding="async">

	*Conexión del lado del cliente con esta estructura:*

	Para el cliente definiremos todo dentro de una función *start_client()* y en esta definiremos mismamente el host y el puerto para realizar la conexión, así como con *with* nuestro socket para una conexión con IPv4 mediante TCP al cual haremos referencia con *s* y aquí en lugar de jugar con *bind*, utilizaremos *connect()* debido a que del lado del cliente lo que se busca es conectarse al servidor.

	<img src="/apuntes/python-practico/img-761.webp" alt="Captura de los apuntes" width="677" height="244" loading="lazy" decoding="async">

	Con este hecho, enviaremos un mensaje al servidor en formato bytes con *sendall()* y como el servidor nos responderá, este lo recibiremos en una variable *data*, gracias a *recv()*, indicándole que esperamos recibir como máximo 1024 bytes y al final mostrar ese mensaje aplicandole un *decode*.

	<img src="/apuntes/python-practico/img-762.webp" alt="Captura de los apuntes" width="649" height="146" loading="lazy" decoding="async">

	Por último, ejecutaremos la funcion *start_client()*:

	<img src="/apuntes/python-practico/img-763.webp" alt="Captura de los apuntes" width="184" height="79" loading="lazy" decoding="async">

	Ahora, antes de ejecutar el servidor, en el script del servidor agregaremos que nos muestre mensajes de en donde y en que puerto se pone en escucha y de las conexiones que se realicen (recordemos agregar la *f* para representar correctamente el F-string):

	<img src="/apuntes/python-practico/img-764.webp" alt="Captura de los apuntes" width="666" height="313" loading="lazy" decoding="async">

	Finalmente, al ejecutar ambos script, primeramente abriendo el servidor y luego la conexión del cliente, tendríamos lo siguiente:

	<img src="/apuntes/python-practico/img-765.webp" alt="Captura de los apuntes" width="624" height="424" loading="lazy" decoding="async">


	**UDP**

	Con UDP cambiará un poco la cosa en cuanto a su implementación y recordemos que al utilizar UDP no se entabla una conexión con el cliente, sino directamente se empieza a trabajar con los datos que se envíen y además, el utilizar UDP no nos asegura que los paquetes lleguen en el orden enviado, así como tampoco nos asegura que lleguen todos los paquetes, ya que puede haber perdidas de estos.

	Como no queremos entablar una conexión con UDP, no se utilizara una cola de espera con *listen* y tampoco *accept* para entablar la conexión, más bien lo que se utilizara será *recvfrom* para recibir los datos que sean enviados, tanto los datos como la dirección de donde son enviados.

	La diferencia aquí es que ya no estaríamos utilizando un *socket* que hace referencia al cliente, porque UDP ya no se enfoca en tener una conexión con el cliente.

	Empezaríamos creando un archivo *server.py* y en este definiríamos nuestra función *start_udp_server*, definiríamos nuestro host y nuestro socket de servidor casi de la misma manera, la diferencia aquí será es que el segundo argumento para *socket.socket()*, ahora será *socket.SOCK_DGRAM*, ya que aquí estaremos indicando que vamos a estar utilizando UDP.

	<img src="/apuntes/python-practico/img-766.webp" alt="Captura de los apuntes" width="718" height="249" loading="lazy" decoding="async">

	Para inicializar el servidor se hace de la misma forma que con TCP, con bind.

	Luego, para recibir los datos, como con UDP no se entabla una conexión, lo que se hace es directamente recibir los datos y la dirección de donde se realizó la conexión con *recvfrom()*, pasando como argumento el número de bytes que deseamos recibir.

	Por lo que con esto, recibiremos los datos y la dirección, almacenándolos y luego podríamos mostrarlos:

	<img src="/apuntes/python-practico/img-767.webp" alt="Captura de los apuntes" width="900" height="488" loading="lazy" decoding="async">

	Con esto ahora podríamos inicializar el servidor. Ahora la idea utilizando *netcat* primeramente, para conectarnos por UDP, tendríamos que asignar el parámetro -u, de lo contrario intentara hacerlo por TCP y no funcionara:

	<img src="/apuntes/python-practico/img-768.webp" alt="Captura de los apuntes" width="791" height="422" loading="lazy" decoding="async">

	Para programar la parte del cliente, crearíamos un script *client.py* y en este vamos a crear nuestra función *start_udp_client* siguiendo el mismo principio.

	Primeramente, almacenaríamos el host y el puerto en variables, luego crearíamos nuestro socket de cliente para UDP y finalmente con enviar mediante *sendto* el mensaje en bytes, por un lado, y por otro colocar el host y el puerto, ya estaría listo:

	<img src="/apuntes/python-practico/img-769.webp" alt="Captura de los apuntes" width="763" height="316" loading="lazy" decoding="async">

	Por lo tanto, al ejecutarlo tendríamos lo siguiente:

	<img src="/apuntes/python-practico/img-770.webp" alt="Captura de los apuntes" width="767" height="421" loading="lazy" decoding="async">

	Si quisiéramos enviar un mensaje con tildes, se nos presentaría un problema y es que Python no sabría como representarlas en bytes:

	<img src="/apuntes/python-practico/img-771.webp" alt="Captura de los apuntes" width="1046" height="74" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-772.webp" alt="Captura de los apuntes" width="1035" height="137" loading="lazy" decoding="async">

	Por lo tanto, antes tendríamos que aplicar un *encode* al mensaje y como argumento indicar como tiene que hacerlo, en este caso con *utf-8*, de esta manera evitaríamos el error:

	<img src="/apuntes/python-practico/img-773.webp" alt="Captura de los apuntes" width="1135" height="718" loading="lazy" decoding="async">

	Con esto en mente, sabemos que podremos crear servidores TCP y UDP, pero estos, como los hemos montado, solo podrán manejar un cliente a la vez, por lo que se podría generar una cola de espera.

	Como dato, para evitar esto y tener la posibilidad de tener múltiples conexiones y trabajar con ellas en paralelo, se utiliza la librería *threading*.
