---
curso: "python-redes"
modulo: "python-redes/escaneres-de-red"
leccion: "escaner-de-red-con-icmp"
titulo: "Escáner de red con ICMP"
orden: 6
minutos: 4.6
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 10
ejercicios: []
---

Se desarrollara un escaner de red utilizando el protocolo ICMP. Siguiendo el proceso de programacion de un escaner eficiente y confiable que pueda detectar dispositivos activos en una red. Se cubriran los fundamentos del protocolo ICMP y como es utilizado en el escaneo de redes.

## Practica

Crearemos nuestro script **scanner.py**, vamos a considerar el argumento **-t** al cual podremos indicarle un target de una IP o un rango. Para el rango lo haremos de la siguiente manera **192.168.1.1-100**, de esta forma le estamos indicando que nos realice un escaneo desde la IP 192.168.1.1 hasta la 192.168.1.101. 

Para ello, empezamos definiendo la lógica inicial y nuestro menú de argumentos:

<img src="/apuntes/python-redes/icmp-scanner-001.webp" alt="Captura de los apuntes" width="1619" height="424" decoding="async">

Con ello, generamos una función **parse_target** la cual nos ayudará a gestionar el string dado por el usuario para generar el rango de IP's y retornarlo:

<img src="/apuntes/python-redes/icmp-scanner-002.webp" alt="Captura de los apuntes" width="400" height="143" loading="lazy" decoding="async">

Ahora en parse target vamos a tener en cuenta la entrada que podremos tener que es **192.168.1.1-100**, en este caso al tener que retornar una lista de una IP o una lista con un rango de IP's. Tendremos en cuenta que el único octeto que va a variar será el último, por ende comenzaremos realizando un split de todo con base en el punto. 

Con ello crearemos una variable que sea **first_three_octets** y que su valor sea los primeros tres octetos de la IP:

<img src="/apuntes/python-redes/icmp-scanner-003.webp" alt="Captura de los apuntes" width="803" height="133" loading="lazy" decoding="async">

Aplicaríamos un join para tenerlo todo en un string y no en lista. 

Después vamos a verificar si nuestro target splitted tiene elementos, de ser así la IP está bien seteada y en ello verificaremos si el cuarto elemento tiene un **-**, lo que nos dirá si es un rango o una IP. De ser un rango, almacenaremos el inicio y el final en variables:

<img src="/apuntes/python-redes/icmp-scanner-004.webp" alt="Captura de los apuntes" width="888" height="305" loading="lazy" decoding="async">

De esta manera, si tenemos un **-**, vamos a retornar todo el rango de IP's. De no ser así, solo tendríamos una IP y, por lo tanto, la retornaríamos.

Si target_splitted no tiene 4 elementos, quiere decir que el formato está mal. 

Si ahora imprimimos lo retornado en ambos casos, veremos lo siguiente:

<img src="/apuntes/python-redes/icmp-scanner-005.webp" alt="Captura de los apuntes" width="778" height="105" loading="lazy" decoding="async">

Con ello ya podríamos iterar en la lista y tener cada IP de forma individual. 

Crearemos la función host_diiscovery a la cual le pasaremos como argumento la lista de IP's y iteraremos sobre ella, ejecutando el comando **ping** con subprocess y dándole un time out. Además de no querer ver el output ni errores, los enviamos al **DEVNULL** mediante un argumento en subprocess.

Finalmente, verificamos si el código de estado de la ejecución del comando, en el atributo **returncode** de **ping** es exitoso (0). De ser así, imprimimos esta IP indicando que está activa:

<img src="/apuntes/python-redes/icmp-scanner-006.webp" alt="Captura de los apuntes" width="1247" height="171" loading="lazy" decoding="async">

Esto nos generará una excepción por el time out, por ende debemos controlarla para que no suceda nada al sobrepasar este time out:

<img src="/apuntes/python-redes/icmp-scanner-007.webp" alt="Captura de los apuntes" width="1285" height="252" loading="lazy" decoding="async">

Además, será importante gestionar la salida forzada del programa utilizando CTRL + C.

<img src="/apuntes/python-redes/icmp-scanner-008.webp" alt="Captura de los apuntes" width="631" height="254" loading="lazy" decoding="async">

Finalmente, agregaremos los hilos aprovechándonos de lo que ya tenemos para que el escaneo sea mucho más rápido.

<img src="/apuntes/python-redes/icmp-scanner-009.webp" alt="Captura de los apuntes" width="1254" height="374" loading="lazy" decoding="async">

De esta forma, al ejecutarlo ya tendremos un escáner de red ICMP rápido y potente.

<img src="/apuntes/python-redes/icmp-scanner-010.webp" alt="Captura de los apuntes" width="414" height="204" loading="lazy" decoding="async">
