---
curso: "python-ofensivo-laboratorio"
modulo: "python-ofensivo-laboratorio/control-remoto"
leccion: "keylogger-1-de-2"
titulo: "Keylogger (1 de 2)"
orden: 8
minutos: 7.2
idioma: "es"
riesgo: "alto"
fuente: "notes-tecnologia"
imagenes: 14
ejercicios: []
---

Un **keylogger** es una herramienta fundamental en el mundo de la ciberseguridad ofensiva. Para esto, utilizaremos la biblioteca **pynput** de Python, que es una herramienta efectiva para monitorear y registrar las pulsaciones del teclado. 

**pynput** es una biblioteca que nos permite controlar y monitorear la entrada del usuario desde teclado y el ratón. En el contexto de un **keylogger**, nos centraremos en la capacidad de pynput para registrar cada tecla presionada en el teclado. Esto es específicamente útil en escenarios de ciberseguridad ofensiva, donde la recopilación de pulsaciones de teclas puede revelar información sensible como contraseñas, mensajes privados o cualquier otro tipo de datos ingresados a través del teclado. 

El aspecto clave será no solo registrar estas pulsaciones, sino también aprender a enviar esta información de manera automática y discreta por correo electrónico. Esto implica configurar un sistema que agrupe las pulsaciones de teclas capturadas y las envíe periódicamente a una dirección de correo electrónico especificada. Esta funcionalidad aumenta la eficacia del keylogger, permitiéndonos acceder a la información capturada de forma remota y continua, lo cual es crucial para operaciones prolongadas de vigilancia o recopilación de datos.
## Práctica

En esta ocasión importaremos **pynput.keyboard**, con esto crearíamos un objeto utilizando el método **Listener** donde, como parámetro **on_press** le pasaremos una función que recibirá el paquete y con ella lo trataremos nosotros.

<img src="/apuntes/python-ofensivo-laboratorio/keylogger-001.webp" alt="Captura de los apuntes" width="612" height="206" decoding="async">

En este caso imprimimos directamente la tecla presionada. Además al final de nuestro script jugaremos con **with** para utilizar el método **join()** en el objeto que hemos creado de la tecla para que se encargue de esperar y cerrar correctamente cada proceso con cada tecla presionada, evitando así errores.

<img src="/apuntes/python-ofensivo-laboratorio/keylogger-002.webp" alt="Captura de los apuntes" width="623" height="284" loading="lazy" decoding="async">

Cuando estemos corriendo el script y empecemos a presionar teclas, veremos algo como esto:

<img src="/apuntes/python-ofensivo-laboratorio/keylogger-003.webp" alt="Captura de los apuntes" width="615" height="425" loading="lazy" decoding="async">

Nos lo va representando uno a uno y en un formato específico, aquí nosotros podremos colocar todo dentro de una variable la cual definamos de forma pública y sea nuestro **log** el cual irá almacenando la tecla poco a poco y así irlo mostrando:

<img src="/apuntes/python-ofensivo-laboratorio/keylogger-004.webp" alt="Captura de los apuntes" width="327" height="211" loading="lazy" decoding="async">

Además, al almacenarlo aplicamos un typecast para asegurarnos de tener un string. Esto nos es de ayuda para los casos de las teclas especiales como los **Enter**, **Espacios**, entre otras teclas. Si con ello imprimiéramos log tendríamos lo siguiente:

<img src="/apuntes/python-ofensivo-laboratorio/keylogger-005.webp" alt="Captura de los apuntes" width="1497" height="689" loading="lazy" decoding="async">

Seguimos teniendo un formato un poco raro en la representación, para evitar que en las letras nos muestre, utilizaremos el atributo **char** de nuestra **key**:

<img src="/apuntes/python-ofensivo-laboratorio/keylogger-006.webp" alt="Captura de los apuntes" width="304" height="115" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/keylogger-007.webp" alt="Captura de los apuntes" width="1261" height="390" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/keylogger-008.webp" alt="Captura de los apuntes" width="562" height="77" loading="lazy" decoding="async">

Con ello podremos ver cómo ya tenemos lo que son las letras en mejor formato, pero cuando presionamos una tecla especial como el espacio o el entre, veremos que recibimos el error de que para estas teclas no existe este atributo, viendo que es el error **AttributeError**.

Como sabemos que al ser estas teclas no tenemos este atributo, podremos aprovecharnos de esta excepción y cuando sea el caso de que no cuente con el atributo, colocar únicamente la **key** con un typecast de string y agregarle un espacio a los lados para evitar que nos lo represente muy pegado a las teclas normales como letras o símbolos:

<img src="/apuntes/python-ofensivo-laboratorio/keylogger-009.webp" alt="Captura de los apuntes" width="372" height="216" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/keylogger-010.webp" alt="Captura de los apuntes" width="752" height="209" loading="lazy" decoding="async">

De esta manera, sea cualquiera de ambos casos, nos aseguramos de mostrarlo de forma correcta y ahora sí que lo tendríamos con un mejor formato. Adicionalmente, buscaremos representar de mejor forma aquellas teclas especiales. El espacio que lo tenemos como **Key.space** buscaremos representarlo como un espacio y el resto de teclas nos enfocaremos en recuperar su parte después del punto y con **upper()** mostrarlo en mayúsculas. 

Para ello, mediante un condicional, primeramente verificamos si es el espacio. De ser así solo dejamos un espacio y, de lo contrario, recuperamos la parte después del punto y lo hacemos mayúsculas:

<img src="/apuntes/python-ofensivo-laboratorio/keylogger-011.webp" alt="Captura de los apuntes" width="897" height="220" loading="lazy" decoding="async">

De esta manera, si es exactamente el espacio, solo colocaremos una cadena con un espacio y, de lo contrario, recuperaremos el segundo elemento al convertirlo en lista con el punto como delimitador y lo convertiremos en mayúsculas, quedándonos lo siguiente:

<img src="/apuntes/python-ofensivo-laboratorio/keylogger-012.webp" alt="Captura de los apuntes" width="761" height="406" loading="lazy" decoding="async">

Con esto ya lo tenemos en un mejor formato. Buscaremos cada cierto tiempo limpiar nuestro log y antes de limpiarlo enviarnos esta información a nosotros mediante internet, en este caso será por correo. Primeramente, nos aseguraremos de limpiar correctamente el log cada cierto tiempo, para ello crearemos un **timer** con la librería **threading**.

<img src="/apuntes/python-ofensivo-laboratorio/keylogger-013.webp" alt="Captura de los apuntes" width="624" height="311" loading="lazy" decoding="async">

Aquí creamos nuestra función **clear_log** y asegurándonos de, mediante la función global **log** para trabajar en un ámbito global con los mismos datos que está modificando la otra función. 

Lo vamos a deja en un string vacío y con **threading.Timer()** construimos un objeto el cual como primer argumento tendrá un número el cual serán los segundo en los cuales llamara a una función nuevamente, en este caso nos aprovechamos de la recursividad para que se llame a sí misma cada 5 segundos y nos deje vacío nuestro string. 

Finalmente, para asegurarnos de que se realice, inicializamos nuestro hilo. Para asegurarnos de que este se esté ejecutando por detrás, tendremos que inicializar primeramente la función, es por ello que donde indicamos el **join()** nos aseguramos de colocar la función para que se ejecute en un inicio y ya se quede por detrás ejecutándose así misma cada 5 segundo, vaciando por completo el log:

<img src="/apuntes/python-ofensivo-laboratorio/keylogger-014.webp" alt="Captura de los apuntes" width="337" height="307" loading="lazy" decoding="async">

Con ello ya tendremos listo la primera parte de capturar las teclas y limpiar nuestra captura cada cierto tiempo.
