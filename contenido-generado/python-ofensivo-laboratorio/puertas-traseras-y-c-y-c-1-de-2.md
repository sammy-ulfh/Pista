---
curso: "python-ofensivo-laboratorio"
modulo: "python-ofensivo-laboratorio/control-remoto"
leccion: "puertas-traseras-y-c-y-c-1-de-2"
titulo: "Puertas traseras y C&C (1 de 2)"
orden: 12
minutos: 4.8
idioma: "es"
riesgo: "alto"
fuente: "notes-tecnologia"
imagenes: 9
ejercicios: []
---

El objetivo será conocer cómo funcionan los backdoors y los sistemas de Command and Control (C&C). Nuestro objetivo será crear un ejemplo práctico de un ejecutable, el cual una vez se encuentre corriendo en la máquina víctima, nos permita operar desde un centro de comando y control creado manualmente en Python. Esta herramienta nos dará la capacidad de controlar y ejecutar una variedad de operaciones en la máquina comprometida de forma automática. 

El backdoor que nosotros desarrollemos actuará como una puerta trasera en la máquina víctima, proporcionándonos acceso remoto y control sobre el sistema. Por otro lado, el sistema C&C será el centro de operaciones desde donde enviaremos comandos y recibiremos información de la máquina infectada. Este sistema es esencial en operaciones ofensivas avanzadas, ya que nos permite gestionar múltiples backdoors y coordinar acciones complejas en los sistemas comprometidos.

## Práctica

### Script para la máquina víctima

Un Command and Control es un sistema el cual nos permite tener de forma centralizada múltiples herramientas a desplegar en una máquina víctima, es algo muy similar a metasploit o sistemas similares. 

Por otro lado, un backdoor es el hecho de dejar en la máquina víctima de cierta forma una puerta trasera mediante la cual puedamos conectarnos a la máquina para tener control sobre la misma. 

En este caso iniciaremos desde nuestra máquina víctima, aquí realizaremos un script el cual con un socket realice una conexión a nuestra máquina de atacante y este constantemente recibiendo datos de ella, en la máquina de atacante nos pondremos en escucha momentáneamente con netcat con el comando ```nc -lnvp 443```.

En nuestra máquina víctima, nuestro script se verá de la siguiente manera:

<img src="/apuntes/python-ofensivo-laboratorio/backdoors-y-c-y-c-001.webp" alt="Captura de los apuntes" width="480" height="374" decoding="async">

Aquí estamos creando un socket para IPv4 y orientado a conexiones vía TCP, además utiliza **setsockopt** para editar **reuseaddr** seteandolo a 1, para que si cerramos nuestro script sin cerrar el socket, se pueda reutilizar esta misma conexión que se llegue a quedar abierta. 

Antes de correr el script, tendremos que estar en escucha con netcat en nuestra máquina de atacante:

<img src="/apuntes/python-ofensivo-laboratorio/backdoors-y-c-y-c-002.webp" alt="Captura de los apuntes" width="572" height="236" loading="lazy" decoding="async">

Con ello, al ejecutar el script, en nuestra máquina víctima estaremos a la espera de recibir información de nuestra máquina de atacante. Lo que haremos será enviar cosas como comandos y como lo tenemos definido, por el momento solo los imprimirá:

<img src="/apuntes/python-ofensivo-laboratorio/backdoors-y-c-y-c-003.webp" alt="Captura de los apuntes" width="406" height="153" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/backdoors-y-c-y-c-004.webp" alt="Captura de los apuntes" width="281" height="129" loading="lazy" decoding="async">

Con esto ya tendríamos lo inicial de una backdoor simple en nuestra máquina víctima, porque ya de aquí podremos crear una función **run_command** en la cual con ayuda de la librería **subprocess** y el método **run** podremos correr comandos.

<img src="/apuntes/python-ofensivo-laboratorio/backdoors-y-c-y-c-005.webp" alt="Captura de los apuntes" width="627" height="529" loading="lazy" decoding="async">

De esta manera estamos capturando el comando y después con **subprocess.run** le damos el comando en formato de lista si existen espacios y agregamos **capture_output** como True para poder capturar el output o el error con **stdout o stderr**, finalmente retornamos esto y lo enviamos nuevamente a nuestra máquina víctima:

<img src="/apuntes/python-ofensivo-laboratorio/backdoors-y-c-y-c-006.webp" alt="Captura de los apuntes" width="611" height="481" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/backdoors-y-c-y-c-007.webp" alt="Captura de los apuntes" width="614" height="136" loading="lazy" decoding="async">

En caso de tener errores en la ejecución de los comandos o no recibir el error, otra alternativa es colocar directamente el comando y, a nivel de Shell setearlo en **True**.

### Script para el atacante

Esto que hemos hecho con netcat, ahora lo realizaremos con un script en Python donde con socket nos pondremos en escucha en nuestra IP y el puerto 443, además de mediante un bucle infinito enviar siempre un comando que solicitaremos mediante un input y luego estaremos a la escucha de la respuesta de este mismo:

<img src="/apuntes/python-ofensivo-laboratorio/backdoors-y-c-y-c-008.webp" alt="Captura de los apuntes" width="661" height="587" loading="lazy" decoding="async">

De esta forma, ya tendremos una forma de estar interactuando con la máquina víctima, enviando comandos y recibiendo el output de cada uno que se encuentra ejecutándose desde la máquina víctima.

<img src="/apuntes/python-ofensivo-laboratorio/backdoors-y-c-y-c-009.webp" alt="Captura de los apuntes" width="721" height="727" loading="lazy" decoding="async">
