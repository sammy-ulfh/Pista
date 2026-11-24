---
curso: "python-desde-cero"
modulo: "python-desde-cero/colecciones"
leccion: "diccionarios"
titulo: "Diccionarios"
orden: 15
minutos: 10.3
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 24
ejercicios: []
---

1. **Introducción:**

	Los diccionarios son una de las estructuras de datos más poderosas y flexibles de Python. Los diccionarios en Python son coleeciones desordenadas de pares clave-valor. A diferencia de las secuencias que se indexan mediante un rango numérico, los diccionarios de indexan con claves únicas, que pueden ser cualquier tipo inmutable, como cadenas o números.

	**Características de los Diccionarios:**

	- *Desordenados:* Los elementos de un diccionario no están ordenados y no se accede a ellos mediante un índice numérico, sino a través de claves únicas.
	- *Dinámicos:* Se pueden agregar, modificar y eliminar pares clave-valor.
	- *Claves únicas:* Cada clave en un diccionario es única, lo que previene duplicaciones y sobrescrituras accidentales.
	- *Valores accesibles:* Los valores no necesitan ser únicos y pueden ser de cualquier tipo de dato.

	**Operaciones con diccionarios:**

	- *Agregar y modificar:* Agregar nuevos pares clave-valor y modificar valores existentes.
	- *Eliminar:* Eliminar pares clave-valor usando *del* o el método *pop()*.
	- *Métodos de diccionario:* Utilizar métodos como *keys()*, *values()* y *items()*, para acceder a las claves, valores o ambos en forma de pares.
	- *Comprensiones de diccionarios:* Una forma elegante y consisa de construir diccionarios basados en secuencias o rangos.

	**Uso de diccionarios en Python:**

	- *Almacenamiento de datos estructurados:* Ideales para almacenar y organizar datos que están relacionados de manera lógica, como una base de datos en memoria.
	- *Búsqueda eficiente:* Los diccionarios son altamente optimizados para recuperar valores cuando se conoce la clave, proporcionando tiempos de búsqueda muy rápidos.
	- *Flexibilidad:* Pueden ser anidados, lo que significa que los valores dentro de un diccionario pueden ser otros diccionarios, listas o cualquier otro tipo de dato.


2. **Práctica:**

	Los diccionarios son otra estructura de datos no ordenada de pares clave-valor,  no tienen enumeración como en las listas, lo que lo haría un poco similar a los conjuntos, también son mutables y su principal diferencia frente a todas las demás estructuras de datos es su peculiaridad de almacenar valores en formato clave-valor.

	Ahora podríamos definir un diccionario e imprimir su tipo de dato, así como el contenido de este, y lo veríamos de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-230.webp" alt="Captura de los apuntes" width="798" height="314" decoding="async">

	Podremos acceder a los valores de un diccionario de forma similar a como lo hacemos en una lista, la diferencia es que en lugar de colocar índices, colocaremos las llaves o claves, que son las que colocamos a la izquierda de los  *:* en cada valor:

	<img src="/apuntes/python-desde-cero/img-231.webp" alt="Captura de los apuntes" width="790" height="349" loading="lazy" decoding="async">

	**Mutabilidad:**
	
	Como los diccionarios son mutables, podremos modificar los valores ya almacenados, casi de la misma manera en la que lo haríamos para una lista:

	<img src="/apuntes/python-desde-cero/img-232.webp" alt="Captura de los apuntes" width="795" height="417" loading="lazy" decoding="async">

	**Agregar nuevos valores:**

	Para agregar nuevos valores, como tambien tendremos que agregar una clave para este nuevo valor, se haría de la misma forma como si fuésemos a modificar alguno:

	<img src="/apuntes/python-desde-cero/img-233.webp" alt="Captura de los apuntes" width="829" height="381" loading="lazy" decoding="async">

	**Eliminar datos:**

	Podremos utilizar *del* para eliminar una llave y valor indicados, indicando entre corchetes la clave o llave para ese valor en concreto:

	<img src="/apuntes/python-desde-cero/img-234.webp" alt="Captura de los apuntes" width="808" height="320" loading="lazy" decoding="async">

	**Búsquedas por clave:**

	Para verificar si una clave existe en nuestro diccionario, sería similar a la condición que establecimos para verificar si un dato existía en un conjunto, donde si lo que retorna es True quiere decir que si existe esta clave y por ende tendrá algún dato almacenado:

	<img src="/apuntes/python-desde-cero/img-235.webp" alt="Captura de los apuntes" width="799" height="315" loading="lazy" decoding="async">

	De esta forma, podríamos verificar si existen diversas claves y con base en ello realizar una toma de decisiones en nuestros programas.

	**Recorrer diccionarios:**

	Para iterar en diccionarios, sería como si empleáramos enumerate en una lista e iteráramos sobre él, ya que al final de cuentas nuestra clave sería como el índice y para que esto funcione tendríamos que hacer uso de nuestro método *items()*:

	<img src="/apuntes/python-desde-cero/img-236.webp" alt="Captura de los apuntes" width="797" height="327" loading="lazy" decoding="async">

	**clear() y len()**

	En los diccionarios tambien podremos emplear los métodos *clear()* y *len()*, donde con len podremos calcular el número de elementos que contiene nuestro diccionario y con clear limpiar nuestro diccionario, lo cual funciona tal como en una lista:

	<img src="/apuntes/python-desde-cero/img-237.webp" alt="Captura de los apuntes" width="868" height="286" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-238.webp" alt="Captura de los apuntes" width="866" height="372" loading="lazy" decoding="async">

	**Diccionarios de comprensión:**

	Así como las listas comprensión, tambien podremos emplear diccionarios de comprensión, los cuales solo se diferencian porque al inicio tendriamos que indicarle la clave de cada valor:

	<img src="/apuntes/python-desde-cero/img-239.webp" alt="Captura de los apuntes" width="1593" height="278" loading="lazy" decoding="async">

	Esto nos generaría un diccionario donde se almacene el cuadrado de una serie de números.

	Podríamos verlo más claramente si iteramos sobre cada par de clave-valor:

	<img src="/apuntes/python-desde-cero/img-240.webp" alt="Captura de los apuntes" width="504" height="478" loading="lazy" decoding="async">

	**Listar las claves y los valores de un diccionario por separado:**

	Podremos listar las claves de un diccionario fácilmente gracias al método *keys()*:

	<img src="/apuntes/python-desde-cero/img-241.webp" alt="Captura de los apuntes" width="522" height="265" loading="lazy" decoding="async">

	De la misma manera para los valores, con el método *values()*:

	<img src="/apuntes/python-desde-cero/img-242.webp" alt="Captura de los apuntes" width="522" height="323" loading="lazy" decoding="async">

	**Verificar si una clave existe con el método get():**

	Podremos utilizar el método* get()* pasándole dos argumentos, el primero será la clave que buscaremos y el segundo será un string, ya que será un mensaje que podremos manejar en caso de que esa clave no exista:

	<img src="/apuntes/python-desde-cero/img-243.webp" alt="Captura de los apuntes" width="801" height="274" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-244.webp" alt="Captura de los apuntes" width="816" height="379" loading="lazy" decoding="async">

	Este método es de mucha ayuda, ya que no rompe el flujo del programa y por ende continúa funcionando, los datos que retorna, ya sea el valor o el mensaje en caso de que esa clave no existe, se pueden manejar, ya sea almacenándolo en otras variables y esto no mostrara nada en pantalla, en este caso lo hace porque lo pasamos por un *print()*.

	**Agregar múltiples datos de clave-valor a un diccionario con update():**

	Podremos agregar múltiples valores de clave-valor a un diccionario con *update()*, esto podemos hacerlo de forma directa pasándole un diccionario como argumento, tal como funcionaria *extend()* en las listas, o bien otro diccionario, que al final sería lo mismo.

	<img src="/apuntes/python-desde-cero/img-245.webp" alt="Captura de los apuntes" width="995" height="351" loading="lazy" decoding="async">

	**Diccionarios anidados:**

	Así como existen bucles y condicionales anidados, tambien tenemos diccionarios anidados y estos al final podrían ser similar al formato *json*.

	El uso de diccionario anidados podría ayudarnos a representar múltiples valores dentro de un valor cuando sea necesario, como lo siguiente:

	<img src="/apuntes/python-desde-cero/img-246.webp" alt="Captura de los apuntes" width="1074" height="402" loading="lazy" decoding="async">

	El diccionario anidado y su contenido serian elementos individuales tomados como valores de una clave, por lo que al final de cuentas nuestro diccionario realmente tiene 4 valores, así que cuidado con eso.

	<img src="/apuntes/python-desde-cero/img-247.webp" alt="Captura de los apuntes" width="709" height="394" loading="lazy" decoding="async">

	Con esto, podríamos acceder al diccionario en nuestro apartado de hobbies o a cada dato de forma individual:

	<img src="/apuntes/python-desde-cero/img-248.webp" alt="Captura de los apuntes" width="714" height="522" loading="lazy" decoding="async">

	**Formas de iterar en un diccionario:**

	Existen distintas formas de iterar sobre un diccionario, si lo hiciéramos como lo hacemos para una lista, iteraríamos sobre las claves de este diccionario, que tambien existe la forma de iterar solo sobre las claves del diccionario, que estas dos serian lo mismo:

	<img src="/apuntes/python-desde-cero/img-249.webp" alt="Captura de los apuntes" width="697" height="454" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-250.webp" alt="Captura de los apuntes" width="707" height="459" loading="lazy" decoding="async">

	Como tambien tenemos el método *values*, podríamos iterar solamente sobre los valores:

	<img src="/apuntes/python-desde-cero/img-251.webp" alt="Captura de los apuntes" width="704" height="452" loading="lazy" decoding="async">

	Además, como vimos el método *items()*, podremos saber que accedemos a dos valores separados porque funciona de la misma manera que enumerate, ya que si tomáramos el output de este con una sola variable nos retornaría tuplas con ambos valores:

	<img src="/apuntes/python-desde-cero/img-252.webp" alt="Captura de los apuntes" width="714" height="461" loading="lazy" decoding="async">

	Por ello podemos tomarlo con dos variables y separarlo automáticamente, tal como lo hacemos cuando empleamos el uso de enumerate en las listas:

	<img src="/apuntes/python-desde-cero/img-253.webp" alt="Captura de los apuntes" width="705" height="464" loading="lazy" decoding="async">
