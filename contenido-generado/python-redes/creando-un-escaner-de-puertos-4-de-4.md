---
curso: "python-redes"
modulo: "python-redes/escaner-de-puertos"
leccion: "creando-un-escaner-de-puertos-4-de-4"
titulo: "Creando un escáner de puertos (4 de 4)"
orden: 4
minutos: 2.9
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 5
ejercicios: []
---

## Manejando el cierre correcto del escaner

Si llegamos a cerrar intencionalmente, es posible que se nos queden sockets abiertos, por ello manejaremos todos los sockets para que se almacenen en una lista al ser creados, así como la librería **signal** para utilizar **SIGINT** que hace referencia a cuando presionamos **CTRL + C** y mandamos a llamar a una función, la cual nosotros definimos y la cual siempre que sea llamada considerando el presionar teclas, recibirá 2 argumentos, la señal y el frame o momento en el cual se detuvo:

<img src="/apuntes/python-redes/v4-4-001.webp" alt="Captura de los apuntes" width="557" height="204" decoding="async">

Además, agregaremos al final **sys.exit(1)** para salir con un código de error. 

Con esto podremos cuáles son los valores que recibimos cuando cortamos el flujo del programa:

<img src="/apuntes/python-redes/v4-4-002.webp" alt="Captura de los apuntes" width="1070" height="141" loading="lazy" decoding="async">

Cerrarlo de esta forma, es muy posible que nos deje colgando o abiertos bastantes socket, por ello, cada que se cree uno, lo almacenaremos en una lista y cuando cerremos el programa de forma intencional con **CTRL + C** iteraremos la lista para cerrarlos todos antes de salir del programa:

<img src="/apuntes/python-redes/v4-4-003.webp" alt="Captura de los apuntes" width="1213" height="744" loading="lazy" decoding="async">

## Extraer version y servicio que se encuentra corriendo en un puerto especifico

Cuando realizamos un escaneo, una de las cosas más importantes es el poder visualizar que servicio y que versión se encuentra corriendo en ese puerto, es por ello que con los sockets podremos recibir el primer mensaje que nos envíe al establecer la conexión, esto es el encabezado y la primera línea contiene servicio y versión. 

Por ello cambiaremos la forma en la que establecemos la conexión. En lugar de utilizar **connect_ex**, haremos una conexión normal y para errores de **ConnectionRefusedError** y **socket.timeout**:

<img src="/apuntes/python-redes/v4-4-004.webp" alt="Captura de los apuntes" width="690" height="478" loading="lazy" decoding="async">

En este caso, al decodificar el mensaje que recibimos, puede dar errores al no saber cómo decodificar ciertos caracteres, por ello los ignoramos. 

Finalmente, hacemos un split de cada salto de línea y nos quedamos con la primera que es la que nos da la información. En caso de no recibir esta información, solo indicaremos que el puerto se encuentra abierto y, en caso de sí recibirla, la imprimiriamos:

<img src="/apuntes/python-redes/v4-4-005.webp" alt="Captura de los apuntes" width="713" height="564" loading="lazy" decoding="async">

Tenemos que enviar un mensaje para luego recibir el encabezado. Aprovechando la situación, enviamos siempre el mensaje **HEAD / HTTP/1.0** agregando dos saltos de línea. Esto sirve en casos donde el puerto esté corriendo el servicio HTTP, ya que solo de esta manera obtendremos su encabezado. 

Con esto ya estaría finalizado nuestro escáner de puertos.
