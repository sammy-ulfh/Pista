---
curso: "python-practico"
modulo: "python-practico/apps-de-escritorio"
leccion: "chat-multiusuario-con-gui-y-cifrado-e2e-4-de-5"
titulo: "Chat Multiusuario con GUI y Cifrado E2E (4 de 5)"
orden: 25
minutos: 9.7
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 20
ejercicios: []
---

1. **Práctica**
	**client.py**

	Ahora gran parte de la lógica ya se encuentra definida, por ello nos enfocaremos más en la parte del cliente para mejorar la estética de nuestra aplicación.

	Primeramente, nos enfocaremos en agregar un botón de enviar, el cual se encuentre a un lado de nuestra entrada de texto para enviar el mensaje como usuario, si simplemente agregáramos el botón, se colocaría debajo:

	<img src="/apuntes/python-practico/img-1142.webp" alt="Captura de los apuntes" width="388" height="148" decoding="async">

	<img src="/apuntes/python-practico/img-1143.webp" alt="Captura de los apuntes" width="558" height="552" loading="lazy" decoding="async">

	De esta forma vemos como nuestro botón se coloca debajo de nuestro entry, esto se debe a que para que nos lo represente como esperamos tendremos que colocarlos dentro de un mismo frame, así como indicarle al entry que tendrá que estar colocado a la izquierda y nuestro botón a la derecha.

	Primeramente, crearemos el frame y le daremos las medidas que tenía nuestro entry, para visualizar que tome esta forma, debido a que no se muestra nada hasta que tiene contenido, le daremos un color de fondo:

	<img src="/apuntes/python-practico/img-1144.webp" alt="Captura de los apuntes" width="510" height="129" loading="lazy" decoding="async">

	Con esto en la aplicación solo veríamos una línea muy delgada del color seleccionado, por ello asignaremos el entry en el frame y lo colocaremos del lado izquierdo con la propiedad *side*:

	<img src="/apuntes/python-practico/img-1145.webp" alt="Captura de los apuntes" width="1183" height="204" loading="lazy" decoding="async">

	En nuestro entry, lo que hacemos es colocarlo a la izquierda y permitir que el tamaño se adapte en ambos ejes, permitiendo más allá del límite propio debido a que si no lo colocamos lo veremos muy pequeño en el eje X.

	Nuestro botón lo colocamos del lado derecho, con un padding de 5 píxeles del lado izquierdo en el eje X para que no quede pegado al entry:

	<img src="/apuntes/python-practico/img-1146.webp" alt="Captura de los apuntes" width="669" height="513" loading="lazy" decoding="async">

	Con esto ya lo tendríamos, solo faltaría eliminar el fondo que colocamos para el frame y agregarle el command a nuestro botón, el cual se aprovechara de la misma función que se ejecuta al presionar el *Enter*:

	Como reutilizaremos la función *send_message* y en esta realmente no utilizamos el evento que nos retorna bind, entonces recordemos que para ignorar o no tomar en cuenta un parámetro en una función lambda, tendremos que colocar un *\_* en su lugar, con lo cual podríamos quitarlo de la función y del llamado a la función, para reutilizarla en nuestro botón:

	<img src="/apuntes/python-practico/img-1147.webp" alt="Captura de los apuntes" width="1358" height="199" loading="lazy" decoding="async">

	De esta manera, ya tendríamos el funcionamiento esperado para el botón también y, por lo tanto, enviará el mensaje con el enter o con presionar el botón.

	*Listar usuarios*

	Ahora en la parte inferior agregaríamos un botón para listar a todos los usuarios que se encuentren en línea, para ello como command utilizaremos una función que crearemos la cual será *list_users_request*, donde como argumento pasaremos el socket, ya que con este podremos comunicarnos con el servidor, para enviarle un mensaje el cual sea *\!usuarios*:

	<img src="/apuntes/python-practico/img-1148.webp" alt="Captura de los apuntes" width="1291" height="131" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-1149.webp" alt="Captura de los apuntes" width="531" height="96" loading="lazy" decoding="async">

	Con esto, del lado del servidor, al recibir específicamente el mensaje *\!usuarios*, enviaremos de regreso a ese cliente en específico un mensaje con la lista de usuarios conectados:

	<img src="/apuntes/python-practico/img-1150.webp" alt="Captura de los apuntes" width="1113" height="357" loading="lazy" decoding="async">

	Una vez es enviado el mensaje de los usuarios al cliente, se aplica un *continue* para que regrese a la espera de más mensajes y no proceda a enviarle el mensaje *!usuarios* al resto de clientes.

	De esta manera, ya podríamos visualizar las personas que se encuentran conectadas:

	<img src="/apuntes/python-practico/img-1151.webp" alt="Captura de los apuntes" width="1162" height="564" loading="lazy" decoding="async">

	Aunque, por el momento solo se almacena cuando un cliente entra, pero si alguno sale ya no es eliminado, por ende al cerrar la aplicación de un cliente y solicitar nuevamente los usuarios, veremos que siguen saliendo los mismos usuarios activos:

	<img src="/apuntes/python-practico/img-1152.webp" alt="Captura de los apuntes" width="507" height="560" loading="lazy" decoding="async">

	Aquí es donde podremos aprovecharnos del *try*, ya que si un usuario sale automáticamente entraría en la excepción indicando un error de comunicación al estar en espera de un mensaje y por ende, fuera del bucle eliminaríamos a este usuario de la lista, así como del diccionario.

	Para hacer esto correctamente, primeramente crearemos un botón que nos ayude a controlar el flujo de salida, el cual será *exit_widget* y llamará a la función *exit_request* la cual recibirá como argumento el socket del cliente para con este controlar el flujo de salida, donde ademas le enviara al cliente el nombre del usuario para enviar un mensaje indicando que lo ha abandonado, asi como la ventana para aplicarle un *quir* y un *destroy* para asegurar que todos los procesos terminen correctamente:	

	<img src="/apuntes/python-practico/img-1153.webp" alt="Captura de los apuntes" width="1099" height="127" loading="lazy" decoding="async">

	Por lo tanto, en nuestra función *exit_request* lo que haremos será enviar un mensaje para el servidor indicando que usuario ha salido del chat, luego cerraremos nuestro socket como cliente y finalmente cerraremos correctamente la ventana, lo cual terminará con todos los procesos hijos, en este caso los hilos.

	<img src="/apuntes/python-practico/img-1154.webp" alt="Captura de los apuntes" width="961" height="171" loading="lazy" decoding="async">

	Finalmente, del lado del servidor, al cerrar el socket desde el lado del cliente, pues se generara un problema de comunicación con este cliente, por ende entrara a la excepción y terminara de estar en escucha, por lo que podremos desde el lado del servidor cerrar el socket de este cliente y finalmente eliminar tanto de la lista el socket de este cliente, como del diccionario, de esta manera actualizaremos la lista de usuarios conectados, así cada que se realice esta consulta ahora si saldrán únicamente los activos:

	<img src="/apuntes/python-practico/img-1155.webp" alt="Captura de los apuntes" width="1118" height="667" loading="lazy" decoding="async">

	De esta manera, al entrar múltiples usuarios, platicar y salirse, todo se actualizará automáticamente y veremos como podremos consultar los usuarios activos:

	<img src="/apuntes/python-practico/img-1156.webp" alt="Captura de los apuntes" width="587" height="580" loading="lazy" decoding="async">

	El único problema visual son los saltos de línea, pero esto se arregla editando como enviamos y mostramos el mensaje.

	**Visualizar el contenido más reciente del chat**

	Para visualizar el contenido más reciente del chat cada que enviemos un mensaje, para ello podremos utilizar la propiedad *text_widget.see(END)* y como vemos le asignamos como argumento que se enfoque en el final, de esta manera cada que enviemos un nuevo mensaje, se enfocará en mostrarnos lo más reciente de la conversación:

	<img src="/apuntes/python-practico/img-1160.webp" alt="Captura de los apuntes" width="741" height="237" loading="lazy" decoding="async">

	De esta manera, al tener muchos mensajes en el chat, ahora podremos visualizar siempre la conversación actual al enviar nuevos mensajes:

	<img src="/apuntes/python-practico/img-1161.webp" alt="Captura de los apuntes" width="669" height="575" loading="lazy" decoding="async">

	**Hilos en modo daemon**

	Si  recordamos, al momento de crear los hilos colocamos la propiedad *daemon* y la seteamos a *True*. Esta nos sirve para indicar que absolutamente todos los procesos hijos dependan totalmente de la función que los ejecuta, por ende si finaliza la ejecución, los hilos terminarán y se terminará de ejecutar completamente el programa.

	Si no colocáramos esta opción, los hilos serían como procesos independientes, por lo que al salir de la aplicación aún se quedarían en segundo plano, terminando posiblemente en un error al ya no contar con el resto de la funcionalidad:

	<img src="/apuntes/python-practico/img-1157.webp" alt="Captura de los apuntes" width="867" height="84" loading="lazy" decoding="async">

	En este caso la línea que define que el hilo sea dependiente de un proceso padre (la propia función que lo ejecuta) fue comentada, por lo que ahora cada hilo será tratado como si de un proceso independiente se tratase del lado del cliente, entonces ahora al ejecutar el programa y buscar cerrarlo, veremos como a pesar de que la ventana si se cierra se queda mediante la terminal esperando, debido a que aún quedan los hilos corriendo:

	<img src="/apuntes/python-practico/img-1158.webp" alt="Captura de los apuntes" width="714" height="648" loading="lazy" decoding="async">

	Y si activamos el hilo en modo *daemon*, veremos como todo se finaliza correctamente:

	<img src="/apuntes/python-practico/img-1159.webp" alt="Captura de los apuntes" width="691" height="471" loading="lazy" decoding="async">
