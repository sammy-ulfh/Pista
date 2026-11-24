---
curso: "python-ofensivo-laboratorio"
modulo: "python-ofensivo-laboratorio/control-remoto"
leccion: "forward-shell-3-de-4"
titulo: "Forward shell (3 de 4)"
orden: 16
minutos: 6
idioma: "es"
riesgo: "alto"
fuente: "notes-tecnologia"
imagenes: 14
ejercicios: []
---

Después de almacenar el comando en el archivo **input**, iremos leyendo el archivo **output** y será lo que retornaremos para el usuario como output del comando. Para ello crearemos la función **read_output**:

<img src="/apuntes/python-ofensivo-laboratorio/043.webp" alt="Captura de los apuntes" width="716" height="588" decoding="async">

Además, al momento de enviar el mando al archivo **input** le agregaremos un salto de línea para que simule el presionar el **Enter** y así esto sea como la ejecución del comando, de lo contrario no recibiremos output. 

Si vamos ejecutando comandos, veremos cómo nos arrastra el output de los comandos anteriores:

<img src="/apuntes/python-ofensivo-laboratorio/044.webp" alt="Captura de los apuntes" width="317" height="343" loading="lazy" decoding="async">

Para evitar esto, bastaría que, cada vez que agreguemos un nuevo comando al archivo **input**, limpiemos el contenido del comando **output**. De esta manera recibiríamos únicamente el output del comando recién ejecutado.

<img src="/apuntes/python-ofensivo-laboratorio/045.webp" alt="Captura de los apuntes" width="728" height="624" loading="lazy" decoding="async">

De esta manera, veremos cómo ya tenemos realmente una Shell interactiva:

<img src="/apuntes/python-ofensivo-laboratorio/046.webp" alt="Captura de los apuntes" width="609" height="741" loading="lazy" decoding="async">

Ahora solo vemos un problema y es que cuando llegamos a ejecutar una Shell interactiva o incluso cuando vayamos a tener outputs grandes, estos no los recibiremos completos debido a que no alcanzamos a leerlos cuando realizamos el **cat**. Para evitar esto, nos aseguraremos de repetir el leer el comando al menos 5 veces y entre cada vez que lo lea le aplicaremos una espera de **0.2** segundos. De esta manera, ahora sí recibiremos bien el output, ya que nos aseguramos de esperar el tiempo suficiente para poder leer todo el output:

<img src="/apuntes/python-ofensivo-laboratorio/048.webp" alt="Captura de los apuntes" width="525" height="526" loading="lazy" decoding="async">

La desventaja que podríamos ver es que ahora para recibir el output de cada comando esperaremos 1 segundo, pero es algo válido para asegurar recibir correctamente el output de este comando. 

Ahora podríamos tener este problema, al momento en el que ejecutamos un comando cuando corrimos una bash con **script /dev/null -c bash**. Al ejecutar comandos como el **whoami** veremos el output de la siguiente manera:

<img src="/apuntes/python-ofensivo-laboratorio/049.webp" alt="Captura de los apuntes" width="374" height="212" loading="lazy" decoding="async">

Primeramente, nos repetirá el comando, después nos pondrá el output y finalmente la traza de que estamos en una Shell **bash**. Nosotros, como mejor lo buscaremos representar, es primeramente mostrar la traza de la terminal y seguido de esto el output del comando. 

Para ello, primero que nada, reorganizaremos todo nuestro código para que manejarlo como una clase y después utilizaremos un archivo **main.py** donde lo correremos.

<img src="/apuntes/python-ofensivo-laboratorio/050.webp" alt="Captura de los apuntes" width="725" height="717" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/051.webp" alt="Captura de los apuntes" width="1106" height="681" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/052.webp" alt="Captura de los apuntes" width="662" height="230" loading="lazy" decoding="async">

De esta manera, ya lo tendríamos todo listo para, en un archivo main.py, empezar a correr nuestra **Forward Shell** creando una instancia de la clase y ejecutando el método **run()**. Además manejaremos la salida del programa desde el archivo principal **main.py**:

<img src="/apuntes/python-ofensivo-laboratorio/053.webp" alt="Captura de los apuntes" width="749" height="447" loading="lazy" decoding="async">

Ahora, nosotros para lanzar una pseudo terminal bash, utilizamos el comando **script /dev/null -c bash**, por lo que podremos agregar un atributo **is_pseudo_terminal** el cual en un principio esté en **False**, pero si se introduce este comando, se cambie su valor a **True**. De esta manera podremos validarlo para manejar el output para que nos lo muestre como quisiéramos dejarlo:

<img src="/apuntes/python-ofensivo-laboratorio/054.webp" alt="Captura de los apuntes" width="569" height="380" loading="lazy" decoding="async">

Para manejar el output recordemos cómo teníamos la salida. Primeramente nos mostraba el comando que ejecutábamos, después el output y finalmente la traza de la pseudo terminal. Como sabemos que entre cada uno existe un salto de línea, entonces crearemos una lista de cada parte que se nos muestra considerando como delimitador el salto de línea:

<img src="/apuntes/python-ofensivo-laboratorio/055.webp" alt="Captura de los apuntes" width="547" height="344" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/056.webp" alt="Captura de los apuntes" width="1690" height="232" loading="lazy" decoding="async">

Como podremos observar, el último elemento siempre es la traza de la pseudo terminal, por lo que podremos mostrar primeramente esto y después la penúltima posición, que es el output del comando.

Si agregamos que imprima el número de caracteres que tiene cuando inicia y cuando ya estás ejecutando comandos, veremos que cuando iniciamos la pseudo terminal, la lista contiene 2 o 3 elementos y, cuando ya ejecutamos comandos, tiene 4, pero puede ser mayor dependiendo del comando ejecutado. Con esto en mente, lo que haremos será mostrar con un salto de línea el último elemento de la misma cuando sea equivalente a 2 o 3:

<img src="/apuntes/python-ofensivo-laboratorio/057.webp" alt="Captura de los apuntes" width="694" height="468" loading="lazy" decoding="async">

Con esto, ya estaremos mostrando correctamente el output de la pseudo terminal cuando recién la ejecutamos.
