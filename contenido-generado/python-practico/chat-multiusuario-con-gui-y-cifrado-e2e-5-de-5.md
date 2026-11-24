---
curso: "python-practico"
modulo: "python-practico/apps-de-escritorio"
leccion: "chat-multiusuario-con-gui-y-cifrado-e2e-5-de-5"
titulo: "Chat Multiusuario con GUI y Cifrado E2E (5 de 5)"
orden: 26
minutos: 9.9
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 17
ejercicios: []
---

1. **Introducción**

	Esta es la etapa final para nuestro chat multiusuario, por ende nos enfocaremos en la seguridad y privacidad de las conversaciones. Utilizaremos la librería SSL y herramientas como OpenSSL para implementar un cifrado robusto.

	Aprenderemos como integrar estas tecnologías en nuestro chat para asegurar que las comunicaciones entre usuarios sean seguras y privadas. Esta sesión es crucial para entender la importancia del cifrado en aplicaciones de mensajería y como aplicarlo efectivamente en aplicaciones reales.

	Lo siguiente son los comandos utilizados a lo largo de la generación del cifrado:

	- **openssl genpkey \-algorithm RSA \-out server\-key.key \-aes256**

		Esta instrucción genera una nueva clave privada RSA. La opción *\-algorithm RSA* especifica el uso del algoritmo RSA. *\-out server-key.key* indica que la clave generada se guardara en un archivo generado llamado *server-key.key*. La opción *\-aes256* significa que la clave privada será cifrada utilizando el algoritmo AES \-256, lo que añade una capa de seguridad al requerir una contraseña para acceder a la clave.

	- **openssl rew \-new \-key server-key.key -out server.csr**

		Esta línea crea una Solicitud de Firma de Cifrado (CSR) utilizando la clave privada RSA que generaste *\-new* indica que se trata de una nueva solicitud, *\-key server-key.key* especifica que se usara la clave privada almacenada en *server-key.key*, y *\-out server.csr* guarda la CSR generada en un archivo llamado *server.csr*. La CSR es necesaria para solicitar un certificado digital a una autoridad certificadora (CA).

	- **openssl x509 \-req \-days 365 \-in server.csr \-signkey server\-key.key \-out server-cert.pem**

		Este comando genera un certificado autofirmado basado en la CSR. *\-req* indica que se está procesando una CSR. *\-days 365* establece una valides de certificado por un año, *\-in server.csr* especifica la CSR de entrada, *\-signkey server\-key.key* utiliza la misma clave privada para firmar el certificado, y *\-out server\-cert.pem* guarda el certificado generado en un archivo llamado *server\-cert.pem*.

	- **openssl rsa \-in server\-key.key \-out server\-key.key**

		Este comando se utiliza para quitar la contraseña de una clave privada RSA protegida. *\-in server\-key.key* especifica el archivo de clave privada cifrada como entrada, y *\-out server\-key.key* indica que la clave privada sin cifrar se guardara en el mismo archivo. Al ejecutar este comando, se pedirá la contraseña actual de la clave privada. Una vez proporcionada, OpenSSL generara una versión sin cifrar y la guardara en el mismo archivo, sobreescribiendo la versión cifrada.

		Este paso se hace a menudo para simplificar la automatización en entornos donde ingresar una contraseña manualmente no es práctico. Sin embargo, es importante ser consciente de que al eliminar la contraseña, la clave privada se vuelve más vulnerable al acceso no autorizado.
	</br>
2. **Práctica**

	Primeramente, recordemos que alguien como intermediario puede tratar de interceptar las conversaciones, por ende nuestros mismos podríamos ponernos en escucha con *tshark* o *wireshark*, por ende si establecemos la comunicación entre dos clientes con nuestro chat multiusuario, y ejecutamos el siguiente comando en otra ventana:

	```bash
	tshark -i lo -Tfields -e data.data  
	```

	<img src="/apuntes/python-practico/img-1162.webp" alt="Captura de los apuntes" width="1356" height="585" decoding="async">

	Con esto listo, ya tenemos tshark en escucha para interceptar los mensajes que enviemos, estos nos saldrán en hexadecimal:

	<img src="/apuntes/python-practico/img-1163.webp" alt="Captura de los apuntes" width="940" height="230" loading="lazy" decoding="async">

	Por ende, al convertir este mensaje de hexadecimal a un formato legible, estaríamos viendo el mensaje que hemos enviado:

	<img src="/apuntes/python-practico/img-1164.webp" alt="Captura de los apuntes" width="927" height="100" loading="lazy" decoding="async">

	Por lo tanto, es posible interceptar la comunicación de nuestra aplicación, por ahora.

	Para evitar esto tendremos que seguir una serie de pasos, para ello utilizaremos *OpenSSL*, donde tenemos que seguir una serie de pasos.

	**Crear clave privada**

	```bash
	openssl genpkey -algorithm RSA -out server-key.key -aes256
	```

	Con el comando anterior, lo que estamos haciendo es crear una clave privada, la cual se crea empleando el algoritmo RSA, la cual se almacenara como server-key.key y para crearla nos solicitara colocarle una contraseña:

	<img src="/apuntes/python-practico/img-1165.webp" alt="Captura de los apuntes" width="783" height="219" loading="lazy" decoding="async">

	Aquí colocaremos la contraseña que nosotros queramos y ya la veremos creada:

	<img src="/apuntes/python-practico/img-1166.webp" alt="Captura de los apuntes" width="504" height="115" loading="lazy" decoding="async">

	**Solicitud de forma de certificado (CSR)**

	Luego de crear nuestra key, la idea será generar una solicitud de forma de certificado, para lo cual utilizaremos el siguiente comando:

	```bash
	openssl req -new -key server-key.key -out server.csr
	```

	Para generar el certificado dependeremos de la clave que ya le hemos asignado y la pedirá primeramente, para el resto de información podríamos solo darle al enter hasta que termine, sin rellenar nada:

	<img src="/apuntes/python-practico/img-1167.webp" alt="Captura de los apuntes" width="781" height="584" loading="lazy" decoding="async">

	Ahora mismo ya tendríamos nuestro archivo csr y la clave privada, en este punto ya podríamos crear un certificado autofirmado, que sería el que vamos a estar utilizando.

	**Certificado autofirmado**

	```bash
	openssl x509 req -days 365 -in server.csr -signkey server-key.key -out server-cert.pem
	```

	De esta forma estaríamos creando un certificado autofirmado, donde le damos una valides de un año, pasándole nuestro archivo CSR, la clave privada y almacenándolo como out en *server\-cert.pem*.

	Ahora esto dependería de la contraseña que le hemos asignado a nuestra clave privada y por ende ya tendríamos todo lo que necesitamos:

	<img src="/apuntes/python-practico/img-1168.webp" alt="Captura de los apuntes" width="917" height="168" loading="lazy" decoding="async">

	Con lo que tenemos hasta ahora, el servidor podría iniciar y tendríamos que estar colocando de forma continua la contraseña, para que esto no sea necesario tendríamos que ejecutar el comando:

	```bash
	openssl rsa -in server-key.key -out server-key.key
	```

	Lo que este último comando hace es tomar la clave privada y almacenarla con el mismo nombre, por lo tanto, la sobreescribe para que ya no sea necesario estar proporcionando continuamente la contraseña en nuestro servidor, pero para realizar esto si nos pedirá la contraseña:

	<img src="/apuntes/python-practico/img-1168.webp" alt="Captura de los apuntes" width="917" height="168" loading="lazy" decoding="async">

	**Encriptación de las comunicaciones**

	Ahora estos archivos o recursos siempre tendrán que estar en la misma carpeta/directorio, porque ahora tendremos que indicarle al servidor que opere por SSL, por lo que tendremos que importar la librería *ssl* en nuestro sevidor:

	<img src="/apuntes/python-practico/img-1170.webp" alt="Captura de los apuntes" width="333" height="125" loading="lazy" decoding="async">

	Por ende, ahora en nuestro servidor justo después de utilizar el *bind* con nuestro socket de servidor, tendremos que utilizar la siguiente acción:

	```python
	server_socket = ssl.wrap_socket(server_socket, keyfile="server-key.key", certfile="server-cert.pem", server_side=True)
	```

	Con esto le estamos indicando a nuestro socket que queremos manejar una comunicación encriptada, donde como primer argumento pasamos el propio socket del servidor, después el archivo de nuestra clase privada, para después pasar el certificado autofirmado.

	<img src="/apuntes/python-practico/img-1173.webp" alt="Captura de los apuntes" width="1270" height="233" loading="lazy" decoding="async">

	Esto sería a nivel de servidor, a nivel de cliente ahora tendríamos que importar la misma librería:

	<img src="/apuntes/python-practico/img-1171.webp" alt="Captura de los apuntes" width="499" height="162" loading="lazy" decoding="async">

	Por ende, ahora antes de realizar la conexión con el servidor le indicaremos a nuestro socket la misma acción para indicarle que vamos a trabajar con ssl para tener una comunicación cifrada, pasando como único argumento nuestro propio socket de cliente:

	<img src="/apuntes/python-practico/img-1172.webp" alt="Captura de los apuntes" width="874" height="201" loading="lazy" decoding="async">

	Aquí se ha utilizado *ssl.wrap_socket*, pero para una mayor seguridad puede ser mucho mejor utilizar *ssl.SSLContext.wrap_socket()*.

	**Mensajear con el cifrado**

	Si ahora con todo listo ejecutamos el servidor y conectamos dos clientes para que interactúen, veremos como se reciben y envían los mensajes correctamente:

	<img src="/apuntes/python-practico/img-1174.webp" alt="Captura de los apuntes" width="1397" height="590" loading="lazy" decoding="async">

	Ahora si nos pusiéramos de nuevo en escucha con *tshark* con el comando:

	```bash
	tshark -i lo -Tfields -e data.data
	```

	Recordando que como usuario con privilegios *root*.

	Por ahora, al enviar mensajes y luego ver lo que recogió *tshark* veríamos lo siguiente:

	<img src="/apuntes/python-practico/img-1175.webp" alt="Captura de los apuntes" width="1397" height="586" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-1176.webp" alt="Captura de los apuntes" width="934" height="305" loading="lazy" decoding="async">

	No vemos que reciba nada, pero esto puede ser porque la comunicación se esté dando, por un lado, distinto, por ende ahora utilizaremos el comando para ver en formato json por cuál es y enviaremos un mensaje largo para visualizarlo correctamente:

	```bash
	tshark -i lo -Tjson
	```

	Por ende podremos enfocarnos en *payload*, que parece ser que es donde está el mensaje, solo tendríamos que quitarle los puntos e intentar convertirlo de hexadecimal a un formato legible:

	<img src="/apuntes/python-practico/img-1177.webp" alt="Captura de los apuntes" width="1867" height="304" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-1178.webp" alt="Captura de los apuntes" width="1866" height="153" loading="lazy" decoding="async">

	Y resulta que ahora no es legible. Obtendríamos este mismo resultado si intentáramos visualizar el contenido de *app_data* de lo que se recogió con *tshark*.

	Así que ahora está finalizado nuestro chat multiusuario con interfaz gráfica y lo más importante, cifrado para quela conversación no pueda ser interceptada.
