---
curso: "python-practico"
modulo: "python-practico/librerias-comunes"
leccion: "libreria-threading-y-multiprocessing"
titulo: "Librería threading y multiprocessing"
orden: 12
minutos: 9.2
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 14
ejercicios: []
---

1. **Introducción**

	Las bibliotecas *threading* y *multiprocessing* en Python son herramientas esenciales para la programación concurrente y paralela. Proporcionan mecanismos para ejecutar múltiples tareas simultáneamente, aprovechando mejor los recursos del sistema. A continuación, se presenta una descripción detallada de ambas bibliotecas y sus diferencias.

	**Descripción Detallada de threading y multiprocessing**

	*Biblioteca threading*

	*threading* es una biblioteca para la programación concurrente que permite a los programas ejecutar múltiples *hilos* de ejecución al mismo tiempo. Los hilos son entidades más ligeras que los procesos, comparten el mismo espacio de memoria y son ideales para tareas que requieren poco procesamiento o que están limitadas por E/S.

	- *Uso Principal:* Ideal para tareas que no son intensivas en CPU o que esperan recursos (como E/S de red o de archivos)
	- ds
	- *Ventajas:* Bajo costo de creación y cambio de contexto, compartición eficiente de memoria y recursos entre hilos.
	- xsd
	- *Desventajas:* Limitada por el Global Interpretes Lock (GIL) en CPython, que previene la ejecución de múltiples hilos de Python al mismo tiempo en un solo proceso.

	**Biblioteca multiprocessing**

	*multiprocessing*, por otro lado, se enfoca en la creación de procesos. Cada proceso en multiprocessing tiene su propio espacio de memoria. Esto significa que pueden ejecutarse en paralelo real en sistema con múltiples núcleos de CPU, superando la limitación de GIL.

	- *Uso Principal:* Ideal para tareas intensivas en CPU que requieren paralelismo real.
	- sada
	- *Ventajas:* Capacidad de realizar cálculos intensivos en paralelo, aprovechando múltiples núcleos de CPU.
	- dsw
	- *Desventajas:* Mayor costo en recursos y complejidad en la comunicación entre procesos debido a espacios de memoria separados.

	**Diferencias Clave**

	- *Modelo de Ejecución:* *threading* ejecuta hilos en un solo proceso compartiendo el mismo espacio de memoria, mientras *multiprocessing* ejecuta múltiples procesos con memoria independiente.
	- sds
	- *Uso de CPU:* *multiprocessing* es más adecuado para tareas que requieren mucho cálculo y pueden beneficiarse de múltiples núcleos de CPU, mientras que *threading* es mejor para tareas limitadas por E/S.
	- dsd
	- *Global Interpreter Lock (GIL):* *threading* está limitado por el GIL de CPython, lo que restringe la ejecución en paralelo de hilos, mientras que *multiprocessing* no tiene esta limitación.
	- sddf
	- *Gestión de Recursos:* *threading* es más eficiente en términos de memoria y creación de hilos, pero *multiprocessing* es más eficaz para tareas aisladas y seguras en cuanto a datos.

	**Conclusión**

	Entender y utilizar adecuadamente *threading* y *multiprocessing* es crucial para optimizar aplicaciones en Python, especialmente en términos de rendimiento y eficiencia. La elección entre ambas depende de las necesidades específicas de la tarea, como el tipo de carga de trabajo (CPU-intensiva vs E/S-intensiva) y los requisitos de arquitectura de la aplicación.
	</br>
2. **Práctica**

	El uso de *hilos* puede ser muy conveniente en casos que necesitemos realizar múltiples cosas en un mismo proceso,

	Podremos construir un ejemplo donde tengamos una función con dos mensajes, donde inicia y finaliza, pero entre estos colocaremos un tiempo de espera de dos segundos, posteriormente ejecutaremos la función dos veces, pasándole como argumento el número de tarea que se está ejecutando:

	<img src="/apuntes/python-practico/img-916.webp" alt="Captura de los apuntes" width="472" height="266" decoding="async">

	De esta manera, las dos tareas que hemos creado se ejecutaran de forma secuencial, para que la segunda se ejecute tendrá que haber terminado la primera.

	Y esto si tenemos múltiples tareas, es un proceso que se vuelve demasiado lento y dependiente de que las tareas anteriores hayan concluido.

	Para ello tendremos en mente los hilos, ya que nos permitirán ejecutar estas múltiples tareas, dentro de un mismo proceso en paralelo.

	*Implementación de hilos*

	Para los hilos utilizaremos la librería *threading*, recordemos que para esta tenemos la clase *Thread* y a esta le pasaremos como argumentos, a la propiedad *target* a la que asignaremos la función de nuestra tarea y también la propiedad *args* donde le pasaremos los argumentos de nuestra función, estos se pasan en forma de tupla, por lo que al ser solo un elemento se le tendrá que agregar una coma al final, para que lo tome como tupla.

	<img src="/apuntes/python-practico/img-917.webp" alt="Captura de los apuntes" width="569" height="324" loading="lazy" decoding="async">

	De esta manera, creamos nuestros hilos como instancias y con *start()* se inicializan a la vez.

	Finalmente, podremos imprimir un mensaje que indique que los hilos han finalizado correctamente, pero para que esto espere a que finalicen, tendremos que utilizar el método *join()* de la propia instancia de nuestro hilo. Seguido de esto ya podremos colocar lo que deseamos ejecutar como siguiente.

	<img src="/apuntes/python-practico/img-918.webp" alt="Captura de los apuntes" width="596" height="450" loading="lazy" decoding="async">

	Teniendo como resultado que ambos procesos se ejecutan en simultáneo con los hilos, además de que nuestro mensaje final espera a que los hilos finalicen, al aplicar *join()* en ambas instancias.

	<img src="/apuntes/python-practico/img-919.webp" alt="Captura de los apuntes" width="484" height="262" loading="lazy" decoding="async">

	De esta manera, también se ha reducido el tiempo total de ejecución de nuestro ejemplo sin aplicar hilos.

	*Multiprocesos con multiprocessing*

	Es similar a *threading*, la principal diferencia es que al ejecutar diversos procesos con *multiprocessing* estos no compartirán memoria, por lo que serán procesos totalmente separados uno del otro. Esto significa que no podrán compartir variables de la misma forma a como sucede con los hilos.

	Algo interesante es que pueden aprovechar múltiples núcleos de la CPU, lo que viene útil al implementar tareas de CPU intensivas. Además de tener una sintaxis muy similar a *threading*:

	<img src="/apuntes/python-practico/img-920.webp" alt="Captura de los apuntes" width="641" height="449" loading="lazy" decoding="async">

	Aqui se aplica el mismo concepto, con una sintaxis muy similar, ahora la diferencia será que al ser dos procesos totalmente independientes, no siempre finalizaran en el mismo orden, en ocasiones será uno pero en ocasiones otro.

	<img src="/apuntes/python-practico/img-921.webp" alt="Captura de los apuntes" width="490" height="251" loading="lazy" decoding="async">

	*Ejemplo práctico*

	Implementando la ayuda de la librería *requests*, crearemos una lista de diversos dominios y a estos le realizaremos una petición *GET* mediante un bucle. Además, mediante el uso de la librería *time* recogeremos el tiempo en el que se inicia y en el que finaliza para así calcular el tiempo que tardo en total el solicitar todas estas peticiones.

	<img src="/apuntes/python-practico/img-922.webp" alt="Captura de los apuntes" width="1194" height="549" loading="lazy" decoding="async">

	De esta manera se iría haciendo petición por petición conforme se tome cada url mediante el bucle.

	<img src="/apuntes/python-practico/img-923.webp" alt="Captura de los apuntes" width="949" height="242" loading="lazy" decoding="async">

	De esta manera, para cada URL, se calcula el tamaño del contenido que esta retorna como respuesta y se muestra.

	Finalmente, gracias al tiempo inicial y final, se calcula la diferencia y es posible saber cuánto duró la ejecución de todas las peticiones en conjunto.

	*Empleando hilos*

	Lo anterior tiene este tiempo de cálculo sin emplear hilos, por lo que empleándolos debería ser mucho más rápido.

	Para emplear hilos, en este caso, la idea sería que toda la lógica de nuestro bucle, en donde itera sobre la lista y aplica la petición a cada dominio, tendríamos que colocarlo dentro de una función, a la cual llamaremos *realizar_peticion*, a esto le pasaríamos como argumento nuestro URL, ya que el bucle lo definiríamos en la parte inferior:

	<img src="/apuntes/python-practico/img-924.webp" alt="Captura de los apuntes" width="1189" height="205" loading="lazy" decoding="async">

	Ahora en nuestro bucle iríamos definiendo cada hilo por cada iteración. Al ser hilos temporales, antes del bucle definiríamos una lista de hilos, donde los iremos guardando luego de generar nuestro hilo e inicializarlo:

	<img src="/apuntes/python-practico/img-925.webp" alt="Captura de los apuntes" width="723" height="221" loading="lazy" decoding="async">

	Recordemos que para que el resto de nuestro código se ejecute una vez los hilos hayan finalizado de ejecutarse, tendremos que utilizar el método *join()* para cada hilo, por lo que como hemos almacenado cada uno de ellos en una lista, ahora podremos iterar sobre esta y para cada hilo aplicar el *join()*, lo cual nos servirá para esperar a que todos los hilos finalicen correctamente:

	<img src="/apuntes/python-practico/img-926.webp" alt="Captura de los apuntes" width="709" height="208" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-927.webp" alt="Captura de los apuntes" width="970" height="244" loading="lazy" decoding="async">

	De esta manera, al ejecutarlo, ya notaremos una mayor rapidez. Además del cálculo del tiempo que transcurre, se nota que ha disminuido bastante.

	*Utilizando multiprocessing*

	Para utilizar la librería *multiprocessing* hemos visto que la sintaxis es prácticamente la misma, solo cambian los nombres para las referencias de la librería y clase:

	<img src="/apuntes/python-practico/img-928.webp" alt="Captura de los apuntes" width="825" height="209" loading="lazy" decoding="async">

	En cuanto al tiempo de ejecución, será algo muy similar:

	<img src="/apuntes/python-practico/img-929.webp" alt="Captura de los apuntes" width="946" height="251" loading="lazy" decoding="async">

	Es importante, dependiendo del caso, esperar a que finalicen los hilos, ya que si elimináramos el bucle que nos permite esperar a que finalicen todos los hilos aplicando *join()*, nos llevaría directamente a la ejecución de las siguientes líneas, antes de esperar a que estos procesos o hilos finalicen.
