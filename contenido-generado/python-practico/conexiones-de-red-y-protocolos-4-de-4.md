---
curso: "python-practico"
modulo: "python-practico/biblioteca-estandar"
leccion: "conexiones-de-red-y-protocolos-4-de-4"
titulo: "Conexiones de red y protocolos (4 de 4)"
orden: 7
minutos: 11.9
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 24
ejercicios: []
---

1. **Introducción**

	El uso de hilos con *threading* en Python, es crucial para gestionar múltiples clientes en aplicaciones de red que utilizan sockets, especialmente en servidores.

	*¿Por qué es necesario?*

	- *Concurrencia y Manejo de Múltiples Conexiones:* Los servidores de red a menudo necesitan manejar múltiples conexiones de clientes simultáneamente. Sin hijos, un servidor tendría que atender a un cliente a la vez, lo cual es ineficiente y no estable. Con *threading*, cada cliente puede ser manejado en un hilo separado, permitiendo al servidor atender múltiples solicitudes al mismo tiempo.
	  </br>
	- *Bloqueo de Operaciones de Red:* Las operaciones de red, como *recv* y *accept*, suelen ser bloqueantes. Esto significa que el servidor se detendrá en estas operaciones hasta que reciba algo de la red. Si un cliente se demora en enviar datos, esto puede bloquear todo el servidor, impidiendo que atienda a otros clientes. Con los hilos, cada cliente tiene su propio hilo de ejecución, por lo que la lentitud o el bloqueo de uno no afecta a los demás.
	  </br>
	- *Escalabilidad:* Los hilos permiten a los desarrolladores crear servidores que escalan bien con el número de clientes. Al asignar un hilo a cada cliente, el servidor puede manejar muchos clientes a la vez, ya que cada hilo ocupa relativamente pocos recursos del sistema.
	  </br>
	- *Simplicidad en el Diseño de la Aplicación:* Aunque existen modelos alternativos para manejar la concurrencia (como programación asíncrona), el uso de hilos puede simplificar el diseño y la lógica de la aplicación. Cada hilo puede ser diseñado como si estuviera manejando solo un cliente, lo que facilita la programación y el mantenimiento del código.
	  </br>
	- *Uso Eficiente de Recursos de CPU en Sistemas Multi-Core:* Los hilos pueden ejecutarse en paralelo en diferentes núcleos de un procesador multi-core, lo que permite a un servidor aprovechar mejor el hardware moderno y manejar más eficientemente varias conexiones al mismo tiempo.
	  </br>
	- *Independencia y Aislamiento de Clientes:* Cada hilo opera de manera independiente, lo que significa que un problema en un hilo (como un error o una excepción) no necesariamente afectará a los demás. Esto proporciona un aislamiento efectivo entre las conexiones de los clientes, mejorando la robustez del servidor.

	En resumen, el uso de *threading* para manejar múltiples clientes en aplicaciones basadas en sockets es esencial para lograr una alta concurrencia, escalabilidad y un diseño eficiente que aprovecha al máximo los recursos del sistema y proporcione un servicio fluido y estable a múltiples clientes simultáneamente.
	</br>
2. **Práctica**

	Para el script de la conexión del lado del cliente, es algo más sencillo, ya que no se tendrá que emplear la librería threading porque eso lo manejara el servidor.

	Por ende, para ello crearíamos un script *client.py* y definiríamos la función *start_client*, dentro de esta nuestro host, puerto y comenzaríamos a definir nuestro socket de cliente con direcciones IPv4 y mediante TCP::

	<img src="/apuntes/python-practico/img-785.webp" alt="Captura de los apuntes" width="741" height="326" decoding="async">

	Ahora definiríamos nuestra conexión como cliente por el host y puerto indicados, para despues mediante un bucle infinito estar solicitando un mensaje como input para que el usuario lo ingrese y almacenarlo:

	<img src="/apuntes/python-practico/img-786.webp" alt="Captura de los apuntes" width="676" height="242" loading="lazy" decoding="async">

	De esta manera estamos enviando el mensaje al cliente en forma de bytes, ya que así tienen que ser enviados los datos siempre.

	Despues verificamos si nuestro mensaje es "bye", porque en caso de serlo, también tendría que cerrarnos el socket del lado del cliente, por ende salir del bucle.

	En caso de que el mensaje no sea "bye", ejecutara las líneas de código debajo del *if*, de hacerlo, definiremos que reciba el mensaje del servidor y lo imprima en pantalla:

	<img src="/apuntes/python-practico/img-787.webp" alt="Captura de los apuntes" width="728" height="343" loading="lazy" decoding="async">

	Recordemos agregar correctamente los *F-string*, para la representación de datos en las cadenas.

	De esta manera ahora podríamos conectarnos, enviar y recibir mensajes con el servidor:

	<img src="/apuntes/python-practico/img-788.webp" alt="Captura de los apuntes" width="517" height="583" loading="lazy" decoding="async">

	Y ahora que estamos utilizando hilos, es algo que podremos hacer con múltiples clientes sin ningún problema.

	Esto sería similar a tener un chat con el servidor, pero no es del todo así.

	Es por ello que como ejercicio crearemos un chat, el cual acepte una única conexión para poder entablar una conversación entre cliente-servidor.

	De esta manera, este tendrá mucha similitud con los scripts cliente-servidor que hemos estado montando, un poco la diferencia será el recibir el mensaje del servidor mediante un input y luego ser enviado.

	*Chat de mensajeria directa*

	Para nuestro servidor definiremos una función *start_chat_server*, en esta al tener nuestro host, puerto y socket de servidor, definiremos que sea posible reutilizar el mismo host y puertos recientemente utilizados, en caso de cerrar o terminar el servidor.

	<img src="/apuntes/python-practico/img-789.webp" alt="Captura de los apuntes" width="722" height="262" loading="lazy" decoding="async">

	Con esto lo que hacemos es setear el valor de la propiedad *SO_REUSEADDR* para que nos permita volver a utilizar la misma conexión en caso de que esta nos la pueda marcar como ocupada con *TIME_WAIT*.

	Con esto, ahora empezaríamos definiendo a nuestro socket en escucha con *bind()* por el host y puerto correspondientes, además de con *listen* definir que estaremos permitiendo que se establezca solo una conexión a la vez. Además de aceptarla y con ello mostrar mensajes correspondientes:

	<img src="/apuntes/python-practico/img-790.webp" alt="Captura de los apuntes" width="666" height="287" loading="lazy" decoding="async">

	Ahora, mediante el bucle infinito, definiremos la gestión en cuanto al chat. Teniendo en cuenta que cuando una conexión se entable, el primero que tendrá que hablar es el cliente, por lo tanto, pondremos en espera al servidor de recibir un mensaje.

	<img src="/apuntes/python-practico/img-791.webp" alt="Captura de los apuntes" width="638" height="137" loading="lazy" decoding="async">

	Con esto,  primeramente compararíamos si el mensaje del cliente es *bye*, porque de serlo cerraríamos su conexión. (Realment eel bucle queda dentro de *with connection*)

	Ahora nosotros dentro del servidor tendremos que escribir un mensaje, por lo que ahora utilizando input vamos a solicitar un mensaje y este mismo lo enviaremos al cliente con *send*:

	<img src="/apuntes/python-practico/img-792.webp" alt="Captura de los apuntes" width="664" height="242" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-793.webp" alt="Captura de los apuntes" width="773" height="706" loading="lazy" decoding="async">

	Por lo tanto, ahora podríamos verificar su funcionamiento, conectándonos por netcat.

	<img src="/apuntes/python-practico/img-794.webp" alt="Captura de los apuntes" width="560" height="435" loading="lazy" decoding="async">

	Por el momento, yo le agregué un salto de línea al momento en el que el servidor envía un mensaje al cliente, para que no se viese empalmado.

	De esta forma, con todo esto listo, ahora comenzaríamos con nuestro script para inicializar la conexión al chat desde el cliente.

	Para ello crearemos la función *start_chat_client*, definiremos nuestro host, puerto y sokcet de cliente, para entablar directamente la conexión al address del servidor con *connect*.

	<img src="/apuntes/python-practico/img-795.webp" alt="Captura de los apuntes" width="722" height="328" loading="lazy" decoding="async">

	De esta manera, ahora para enviar y recibir mensajes, como cliente, iniciaríamos introduciendo un mensaje para enviarlo, despues una verificación de sí, el mensaje que hemos introducido es *bye*, para de ser así que se cierre la conexión y nuestro socket como cliente se cierre:

	<img src="/apuntes/python-practico/img-796.webp" alt="Captura de los apuntes" width="751" height="575" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-797.webp" alt="Captura de los apuntes" width="605" height="653" loading="lazy" decoding="async">

	Con esto ya nos hemos hecho un chat directo con el servidor, el cual funciona correctamente, es algo sencillo y no está ni encriptado. A nivel de seguridad, desde luego que no es lo mejor, ya que si nosotros abriéramos la herramienta *wireshark* lo normal sería poder ver la comunicación, al no estar cifrada.

	<img src="/apuntes/python-practico/img-798.webp" alt="Captura de los apuntes" width="471" height="59" loading="lazy" decoding="async">

	Esto tiene una interfaz de la siguiente manera:

	<img src="/apuntes/python-practico/img-799.webp" alt="Captura de los apuntes" width="1900" height="1005" loading="lazy" decoding="async">

	Puede que no nos aparezcan todas las opciones, para que nos aparezcan tendremos que ejecutar la aplicación como administrador, con *sudo* al inicio o siendo directamente usuario admin. De esta forma ya lo tendríamos:

	<img src="/apuntes/python-practico/img-800.webp" alt="Captura de los apuntes" width="1542" height="327" loading="lazy" decoding="async">

	Aquí seleccionaremos la opción *Loopback: lo*, presionándolo 2 veces seguidas. Ahora regresaremos a nuestro chat cliente-servidor y seguiremos enviando mensajes.

	Con esto listo, volvemos a wireshark y ahora veremos como este captura una conexión por TCP:

	<img src="/apuntes/python-practico/img-801.webp" alt="Captura de los apuntes" width="1202" height="96" loading="lazy" decoding="async">

	Y en la parte inferior veríamos la información y el mensaje que se ha enviado, ya de forma decodificada:

	<img src="/apuntes/python-practico/img-802.webp" alt="Captura de los apuntes" width="1518" height="128" loading="lazy" decoding="async">

	Incluso podríamos de la parte izquierda inferior, el último campo es que *DATA*, seleccionamos *data* y lcopeamos esto como *value* y en nuestra terminal decodificarlos con *xxd* y mostrarlo en pantalla:

	<img src="/apuntes/python-practico/img-803.webp" alt="Captura de los apuntes" width="688" height="82" loading="lazy" decoding="async">

	De esta forma funcionaria con *wireshark*, pero también funcionaria en nuestra terminal utilizando *tshark*:

	<img src="/apuntes/python-practico/img-804.webp" alt="Captura de los apuntes" width="1858" height="580" loading="lazy" decoding="async">

	De esta manera, con *tshark -i lo -Y "tcp" -e data.data -Tjson*:

	Al utilizar *-i lo*, estamos indicando que nos pondremos en escucha por *Loopback*, tal como en wireshark.

	Despues con -Y "tcp", estamos filtrando solamente por las conexiones TCP.

	Con *-e data.data*, estamos accediendo directamente al campo de los datos transmitidos en bytes y finalmente con *-Tjson* le indicamos que nos lo muestre en formato *json*.

	Ahora podríamos tomar *data* y nuevamente convertirlo a una cadena de texto legible:

	<img src="/apuntes/python-practico/img-805.webp" alt="Captura de los apuntes" width="692" height="81" loading="lazy" decoding="async">

	Y si quisiéramos únicamente quedarnos con la cadena en bytes, reemplazaríamos *-Tjson* por *-Tfields*:

	<img src="/apuntes/python-practico/img-806.webp" alt="Captura de los apuntes" width="866" height="189" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-807.webp" alt="Captura de los apuntes" width="867" height="102" loading="lazy" decoding="async">

	Lo que se ve sobre los mensajes interceptados realmente son errores, por lo que se podrían mandar a */dev/null*, con esto además aplicando *stdbuf* al inicio, con los parámetros oL, en tiempo real podríamos ir aplicación la conversión a una cadena legible:

	<img src="/apuntes/python-practico/img-808.webp" alt="Captura de los apuntes" width="870" height="117" loading="lazy" decoding="async">

	De esta manera hemos visto como entablar conexiones de cliente-servidor e incluso un chat cliente-servidor, así como en conjunto la forma de interceptar comunicaciones no encriptadas mediante el uso de herramientas como *wireshark* o *tshark*.
