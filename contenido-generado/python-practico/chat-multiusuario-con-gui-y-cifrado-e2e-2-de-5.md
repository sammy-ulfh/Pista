---
curso: "python-practico"
modulo: "python-practico/apps-de-escritorio"
leccion: "chat-multiusuario-con-gui-y-cifrado-e2e-2-de-5"
titulo: "Chat Multiusuario con GUI y Cifrado E2E (2 de 5)"
orden: 23
minutos: 7.5
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 16
ejercicios: []
---

1. **Práctica**

	Si quieramos mostrar un mensaje como el que se le mostrara a todos los usuarios una vez tengamos nuestra interfaz gráfica, del lado del servidor podríamos mostrar que cierto usuario se ha conectado:

	<img src="/apuntes/python-practico/img-1120.webp" alt="Captura de los apuntes" width="707" height="138" decoding="async">

	<img src="/apuntes/python-practico/img-1119.webp" alt="Captura de los apuntes" width="687" height="525" loading="lazy" decoding="async">

	Del lado del cliente concluye todo al colocar el nombre de usuario, esto sucede porque aún no estamos gestionando nada del lado del cliente.

	En nuestro script para el cliente, primeramente vamos a importar todo lo necesario, en lugar de importar la librería tkinter, nos vamos a traer todo lo de la librería para referenciarlo directamente, también importaremos la librería threading para utilizar hilos y del módulo *scrolledtext* de la librería tkinter, nos traeremos la clase *ScrolledText*, que servirá para utilizar el scroll del mouse.

	<img src="/apuntes/python-practico/img-1121.webp" alt="Captura de los apuntes" width="489" height="138" loading="lazy" decoding="async">

	Con esto, ahora en nuestra función para el socket del cliente, continuaríamos definiendo nuestra ventana como *window*, le asignamos un título, colocamos el mainloop para que permita la interacción dinámica de los widgets y finalmente colocamos la instrucción de finalizar el socket del cliente, para cuando se deje de utilizar la aplicación:

	<img src="/apuntes/python-practico/img-1122.webp" alt="Captura de los apuntes" width="862" height="353" loading="lazy" decoding="async">

	En este caso, al utilizar el contenido de la librería tkinter ya no tendremos que referenciarlo utilizando *tkinter.Tk()* o *tk.Tk()*, lo cual se debe a que hemos importado directamente cada cosa de la librería y es como ya tenerlo dentro de nuestro documento, lo que nos permite una referenciación directa.

	Ahora utilizaremos el widget *ScrolledText* y lo almacenaremos en la variable *text_widget*, como argumento le daremos la ventana en la que se mostrara y después lo mostraremos con *pack()*:

	<img src="/apuntes/python-practico/img-1123.webp" alt="Captura de los apuntes" width="364" height="178" loading="lazy" decoding="async">

	Esto nos genera y muestra un widget similar al de *Text*, con la diferencia de que cuenta con un scroll:

	<img src="/apuntes/python-practico/img-1124.webp" alt="Captura de los apuntes" width="659" height="462" loading="lazy" decoding="async">

	Nos permite escribir, pero existe una propiedad que podremos cambiar, la cual es *state*, esta la podremos cambiar en un inicio al crearlo, o después de crearlo, utilizando el método *configure* sobre el widget, podremos cambiar configuraciones.

	Le podríamos dar el valor de *disable* a *state* y esto hará que el widget tenga un estado en el que no nos deje realizar cosas sobre el:

	<img src="/apuntes/python-practico/img-1125.webp" alt="Captura de los apuntes" width="531" height="177" loading="lazy" decoding="async">

	De esta manera el usuario no podrá colocar contenido y siempre que se quiera representar algún contenido se tendrá que cambiar la propiedad *state* para ese widget a *normal*. Esto viene bien, si lo consideramos el apartado donde se mostraran los mensajes de todos los usuarios.

	Para no observar el contenido del scrolltext tan pegado a los margenes, generaremos un padding en ambos ejes de 5 píxeles.

	Además, agregaremos un widget *Entry* para que el usuario pueda escribir sus mensajes, lo definiremos para nuestra ventana principal. Lo mostraremos con pack y le aremos un padding de 5 píxeles en ambos ejes y agregaremos un *fill* que recordemos que nos sirve para darle un tamaño a nuestro widget con respecto a un eje, pero lo haremos para ambos con *BOTH*:

	<img src="/apuntes/python-practico/img-1126.webp" alt="Captura de los apuntes" width="540" height="240" loading="lazy" decoding="async">

	Con esto tendremos nuestra aplicación con una vista similar a la siguiente:

	<img src="/apuntes/python-practico/img-1127.webp" alt="Captura de los apuntes" width="669" height="505" loading="lazy" decoding="async">

	Con esto listo, ahora configuramos que al nosotros escribir algo nos lo muestre en el *Scroll Text* y se borre de nuestro *entry*, ya que es  un envío.

	Ahora asociaremos con *bind* para reconocer un evento de teclado dentro de nuestro widget Entry, a la tecla de Enter (Return). Una vez se reconozca que se ha presionado esta tecla agregaremos a la función que se llamara, pero recordemos que para que no se llame al ser asignado tendremos que utilizar una función lambda.

	Como del propio *bind* automáticamente recibimos un evento, tendremos que colocarlo el inicio para considerarlo en la función lambda, de lo contrario nos dará error. Además, lo pasaremos como argumento principal a la función *send_message()* que se ejecutara, como otros argumento que serán *client_socket*, *username*, *text_widget*, *entry_widget*, para realizar lo del mensaje de forma local, así como realizar el envío hacia el servidor.

	<img src="/apuntes/python-practico/img-1128.webp" alt="Captura de los apuntes" width="1191" height="93" loading="lazy" decoding="async">

	Con esto, tendríamos que generar la función con todos los parámetros que recibirá en la parte superior, a manera de comprobación haremos que en terminal nos muestre un mensaje, para verificar su funcionamiento:

	<img src="/apuntes/python-practico/img-1129.webp" alt="Captura de los apuntes" width="1080" height="528" loading="lazy" decoding="async">

	Vemos que funciona correctamente, con esto ahora la idea será que el mensaje se borre de nuestro entry y aparezca en el scrolltext, además de realizar el envío.

	A manera de prueba recuperaremos el mensaje de nuestro *Entry* y lo mostraremos en la terminal:

	<img src="/apuntes/python-practico/img-1130.webp" alt="Captura de los apuntes" width="790" height="84" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-1131.webp" alt="Captura de los apuntes" width="696" height="648" loading="lazy" decoding="async">

	Con la recolección del mensaje en mente, entonces lo que tendríamos que hacer es enviarlo al servidor a nivel de socket, ya que este cuenta con la lista de todos los clientes a los cuales tendrá que enviarles el mensaje.

	Enviaremos al servidor el mensaje en un formato *username > message*, así como eliminaremos el mensaje de nuestro entry:

	<img src="/apuntes/python-practico/img-1132.webp" alt="Captura de los apuntes" width="796" height="126" loading="lazy" decoding="async">

	Ahora haremos que nos muestre el mensaje en nuestro mismo chat, por lo tanto, tendremos que cambiar la propiedad *state* del scrolledtext para que nos permita escribir, escribiremos el mensaje siempre al final para que se vea a como estamos acostumbrados en los chats y finalmente volveremos a colocar el *state* en *disable*:

	<img src="/apuntes/python-practico/img-1133.webp" alt="Captura de los apuntes" width="798" height="185" loading="lazy" decoding="async">

	De esta manera, de forma local la estaremos mostrando el mensaje que enviemos al servidor:

	<img src="/apuntes/python-practico/img-1134.webp" alt="Captura de los apuntes" width="688" height="589" loading="lazy" decoding="async">

	Ahora, del lado del servidor tenemos una forma de comunicarnos con cada uno de los clientes, por ello lo primero que haremos será enviar un mensaje a todos para indicarle a cada usuario cuando un usuario nuevo se haya conectado:
