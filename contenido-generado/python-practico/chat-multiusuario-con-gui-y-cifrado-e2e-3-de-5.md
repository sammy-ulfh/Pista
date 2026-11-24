---
curso: "python-practico"
modulo: "python-practico/apps-de-escritorio"
leccion: "chat-multiusuario-con-gui-y-cifrado-e2e-3-de-5"
titulo: "Chat Multiusuario con GUI y Cifrado E2E (3 de 5)"
orden: 24
minutos: 3.3
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 7
ejercicios: []
---

1. **Práctica**

	Ahora, del lado del servidor, una vez se conecte un nuevo cliente, gestionaremos que se envíe un mensaje indicando el usuario que se ha conectado al chat.

	Este mensaje tendrá que ser enviado a todos los usuarios y recordemos que tenemos almacenados los sockets de todos en una lista, por lo que solo tendremos que definir una iteración sobre todos y que no realice nada cuando el socket sea el del mismo cliente que ha entrado, para que este nos vea el propio mensaje de que se ha conectado.

	<img src="/apuntes/python-practico/img-1135.webp" alt="Captura de los apuntes" width="939" height="231" decoding="async">

	Como el servidor envía este mensaje, tendremos que recibirlo del lado del usuario, para ello crearemos la función *receive_message*, con la cual utilizaremos hilos y colocaremos entre las definiciones de nuestra aplicación, para que se esté ejecutando continuamente en espera de mensajes, además de la misma manera que en servidor, asignaremos el valor de *True* a la propiedad *daemon* de nuestro hilo.

	<img src="/apuntes/python-practico/img-1136.webp" alt="Captura de los apuntes" width="945" height="154" loading="lazy" decoding="async">

	Nuestra función recibe como argumentos el propio socket de cliente para recibir el mensaje y el *text_widget* para escribir el mensaje y el usuario pueda verlo.

	Por ello, en nuestra función vamos a utilizar una excepción dentro de un bucle infinito por posibles problemas de conexión, donde si se da un problema de conexión, pues se terminara la ejecución del bucle. En cuanto al *try*, recibiremos el mensaje y si este tiene contenido mostraremos el mensaje cambiando los estados del widget para el texto de los mensajes, de lo contrario terminaremos el bucle:

	<img src="/apuntes/python-practico/img-1137.webp" alt="Captura de los apuntes" width="800" height="496" loading="lazy" decoding="async">

	De esta manera, al conectar distintos clientes veremos como nos salta el mensaje de los usuarios que van ingresando:

	<img src="/apuntes/python-practico/img-1138.webp" alt="Captura de los apuntes" width="1848" height="795" loading="lazy" decoding="async">

	Ahora, si intentamos enviar algún mensaje, veremos como estos solo se nos muestran de forma individual y no son enviados al resto de usuarios, esto es porque aún no definimos que el servidor envíe este mensaje a todos los demás clientes:

	<img src="/apuntes/python-practico/img-1139.webp" alt="Captura de los apuntes" width="1865" height="543" loading="lazy" decoding="async">

	Por ende, ahora lo que tendremos que definir del lado de nuestro servidor es que una vez haya enviado el mensaje de que ha ingresado un nuevo usuario, se inicie un bucle infinito que este continuamente en escucha en espera de mensajes, para enviarlo al resto de usuarios que no sean el usuario que lo ha enviado:

	<img src="/apuntes/python-practico/img-1140.webp" alt="Captura de los apuntes" width="940" height="505" loading="lazy" decoding="async">

	Y como el cliente ya tiene definido el cómo recibirá los mensajes, ya funcionara todo el envío de mensajes de forma correcta:

	<img src="/apuntes/python-practico/img-1141.webp" alt="Captura de los apuntes" width="1774" height="536" loading="lazy" decoding="async">
