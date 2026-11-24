---
curso: "python-desde-cero"
modulo: "python-desde-cero/colecciones"
leccion: "listas"
titulo: "Listas"
orden: 12
minutos: 14.3
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 27
ejercicios: []
---

1. **Introducción:**

	Las listas son estructuras de datos que nos permiten almacenar secuencias ordenadas de elementos. Son mutables, lo que significa que podemos modificarlas después de su creación, y son dinámicas, permitiéndonos añadir o quitar elementos en ellas.

	**Características de las Listas**

	Vamos a explorar las características clave de las listas en Python, que incluyen su capacidad para:

	- Almacenar datos heterogéneo, es decir, pueden contener elementos de diferentes tipos (enteros, cadenas, flotantes y más) dentro de la misma lista.
	- Ser indecadar y cortadas, lo que permite acceder a elementos específicos de la lista directamente a través de su índice.
	- Ser anidadas, es decir, una lista puede contener otras listas como elementos, lo que permite crear estructuras de datos completas como matrices.

	**Operaciones con listas:**

	También cubriremos las operaciones fundamentales que se pueden realizar con listas, como:

	- Añadir elementos con métodos como *append()* y *extend()*
	- Eliminar elementos con métodos como *remove()* y *pop()*
	- Ordenar listas con el método *sort()* o la función incorporada *sorted()*
	- Invertir los elementos con el método *reverse()* o la sintaxis de corte \[::-1\]
	- Comprender las comprensiones de listas, una forma "pythonica" de crear y manipular listas de manera concisa y eficiente.

	**Métodos de Listas:**

	Profundirzaremos en la rica gama de métodos que Python ofrece para trabajar con listas y cómo estos métodos pueden ser utilizados para manipular listas de acuerdo a nuestras necesidades.

	**Buenas Prácticas:**

	Se darán las mejores prácticas en el manejo de listas, incluyendo cómo y cuándo usar listas en comparación con otros tipos de colecciones en Python, como tuplas, conjuntos y diccionarios.
	</br>
2. **Práctica**

	Empezaremos retomando la creación de una lista en Python:

	<img src="/apuntes/python-desde-cero/img-155.webp" alt="Captura de los apuntes" width="616" height="281" decoding="async">

	De esta manera, crearíamos la lista y mostraríamos su contenido.

	**len():**
	
	También, es importante recordar que podremos usar el método *len()* para saber cuantos índices o datos contiene nuestra lista:

	<img src="/apuntes/python-desde-cero/img-156.webp" alt="Captura de los apuntes" width="617" height="274" loading="lazy" decoding="async">

	**append() y extend():**

	La forma de agregar un solo elemento a la lista con *append()* o agregar múltiples elementos con *extend()*:

	<img src="/apuntes/python-desde-cero/img-157.webp" alt="Captura de los apuntes" width="861" height="545" loading="lazy" decoding="async">

	**Iterar en una lista:**
	
	Iterar individualmente sobre cada elemento de una lista para trabajar con ellos:

	<img src="/apuntes/python-desde-cero/img-158.webp" alt="Captura de los apuntes" width="613" height="440" loading="lazy" decoding="async">

	**remove() y pop()**

	Eliminar elementos específicos con *remove()*, el ejemplo que se mostrará será una lista de vulnerabilidades en cuanto ciberseguridad respecta, y veremos como podremos eliminar cualquiera de las que tengamos con indicar el nombre o contenido específico de esta:

	<img src="/apuntes/python-desde-cero/img-159.webp" alt="Captura de los apuntes" width="862" height="433" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-160.webp" alt="Captura de los apuntes" width="800" height="435" loading="lazy" decoding="async">

	Si llegamos a tener elementos repetidos, solo eliminará el primero con el que se encuentre de inicio a fin, ya que podríamos pensarlo como si lo recorriese de esta manera.

	O bien eliminar el último elemento de una lista con *pop()*:

	<img src="/apuntes/python-desde-cero/img-161.webp" alt="Captura de los apuntes" width="779" height="432" loading="lazy" decoding="async">

	Con pop también podremos eliminar posiciones específicas, indicándole el índice como argumento:

	<img src="/apuntes/python-desde-cero/img-178.webp" alt="Captura de los apuntes" width="613" height="439" loading="lazy" decoding="async">

	Además de eliminar el elemento, es posible que al momento de que se elimine se almacene en una variable, por ende podríamos lanzar un mensaje de que una persona ha sido eliminada de la lista, de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-179.webp" alt="Captura de los apuntes" width="703" height="523" loading="lazy" decoding="async">

	**Ordenar listas numéricas con sort():**

	<img src="/apuntes/python-desde-cero/img-162.webp" alt="Captura de los apuntes" width="835" height="440" loading="lazy" decoding="async">

	O también haciéndolo de forma directa, pasando la lista como argumento:

	<img src="/apuntes/python-desde-cero/img-163.webp" alt="Captura de los apuntes" width="820" height="395" loading="lazy" decoding="async">

	De esta manera sería lo mismo; la diferencia sería que, cuando pasamos la lista como argumento, la nueva lista ordenada no se almacena en *numbers*, por lo que alterará la lista, pero fuera de ella, por así decirlo.

	Teniendo exactamente la misma lista desordenada, lo podremos ver si en la siguiente línea imprimimos nuevamente la lista *numbers*.

	**Voltear listar con reverse():**

	Esto nos ayudaría a prácticamente voltear toda la lista, donde el primer elemento ahora será el último, el ultimo el primero, el penultimo el segundo, etc...

	<img src="/apuntes/python-desde-cero/img-164.webp" alt="Captura de los apuntes" width="1024" height="439" loading="lazy" decoding="async">

	**Acceder a posiciones especificas:**

	Cuando queremos acceder a índices específicos en una lista, debemos tener en cuenta que en Python siempre se empezará a contar desde el número cero, por ende el último índice siempre será 1 menos al total de elementos.

	Si una lista tiene 50 elementos, su último elemento estará en el índice 49.

	<img src="/apuntes/python-desde-cero/img-165.webp" alt="Captura de los apuntes" width="1039" height="569" loading="lazy" decoding="async">

	Podremos acceder al último elemento de una lista con *-1*, pero no solo eso. Una lista en Python puede ser recorrida de forma inversa, donde -1 es el último elemento, -2 el penúltimo y así sucesivamente.


	**Crear sublista de la lista principal:**

	Es posible mostrar elementos de una lista mediante rangos, es por ello que si quisiéramos crear una sublista con elementos desde el primero hasta n elementos, podríamos hacerlo de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-166.webp" alt="Captura de los apuntes" width="1024" height="395" loading="lazy" decoding="async">

	Aquí con *\[:3\]* generamos una sublista donde almacenamos los valores en un rango desde el primer elemento de la lista hasta el tercero.

	Nos mostrará hasta el índice 2, debido a que tenemos que tener en consideración que los índices en las listas comienzan desde el cero y siempre nos mostrará un índice menor al indicado.

	También es posible hacerlo de forma un poco distinta, donde lo haríamos inversamente por así decirlo.

	Indicándole que no nos muestre los últimos elementos, colocando un signo *-* antes del número o índice.

	<img src="/apuntes/python-desde-cero/img-167.webp" alt="Captura de los apuntes" width="1034" height="394" loading="lazy" decoding="async">

	Nos muestra lo mismo, pero no se está realizando lo mismo.

	Aquí lo que le indicamos con *\[:-2\]* es que no nos muestren los últimos dos elementos de esa lista.

	Otra forma sería indicándole desde el inicio, de cuál índice debería iniciar y acabar en el último índice de la lista:

	<img src="/apuntes/python-desde-cero/img-168.webp" alt="Captura de los apuntes" width="1027" height="391" loading="lazy" decoding="async">

	Con *\[2:\]*, estamos indicándole que comience en el índice 2, que sería el tercer elemento de la lista y sería un rango desde ese elemento hasta el último de la lista.

	Ahora, si quisiéramos trabajar específicamente con rangos, donde le indicamos ambas partes, debemos tener en cuenta que a la izquierda deberá ir el índice desde el cual iniciará el rango, mientras que a la derecha tendremos que indicar el índice donde finalizará más 1.

	<img src="/apuntes/python-desde-cero/img-169.webp" alt="Captura de los apuntes" width="1037" height="390" loading="lazy" decoding="async">

	De esta manera, le estamos indicando que nos dé un rango para crear una sublista, que vaya desde el índice 1, hasta el índice 2, pero indicándolo con un número más, o visto de otra forma, desde el índice 1 hasta el elemento 3 de la lista.

	**Recorrer listas con bucles:**

	*for:*

	Recorrer una lista elemento a elemento con for es sencillo, se puede hacer iterando en un rango de números y por ende acceder elemento a elemento, tal como lo haríamos con while.
	
	Una forma sencilla es indicarle al for que itere sobre la lista (que es un tipo de objeto) elemento a elemento. Como lo hemos visto anteriormente, for puede iterar sobre objetos.

	Entonces quedaría que de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-170.webp" alt="Captura de los apuntes" width="1040" height="377" loading="lazy" decoding="async">

	De esta manera, *attack* va tomando el valor de cada uno de los elementos de forma individual, recorriendo toda la lista.

	*while:*

	Con while podremos recorrer la lista elemento a elemento, accediendo a ellos de forma individual gracias a una variable que iremos incrementando. Sabremos dónde detener el incremento de la variable, ya que con *len()* podremos saber el número total de elementos de la lista.

	Como una lista siempre empieza desde el índice cero, nuestra variable que incrementa siempre tendrá que ser menor al número total de elementos, ya que el último elemento tendrá como índice el número total de elementos menos uno.

	Por lo tanto, quedaría de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-171.webp" alt="Captura de los apuntes" width="1441" height="568" loading="lazy" decoding="async">

	El texto seguido de '#', son comentarios de una sola línea y Python no tendrá en consideración esto como si de código se tratase. Será como algo que ignore al momento de ejecutar el programa, pero que a la hora de ver el código puede ayudar a que cualquier persona lo entienda.

	Crear un objeto iterable de la lista que retorne, por un lado, el índice y, por el otro, el valor almacenado en ese índice es posible con *enumerate()*.

	Como ya mencionamos con for es posible iterar sobre objetos, por ende podremos iterar sobre el objeto de enumerate y tomar del lado izquierdo el índice, así como del lado derecho el valor almacenado y  trabajar con ellos, en este caso imprimirlos en pantalla:

	<img src="/apuntes/python-desde-cero/img-172.webp" alt="Captura de los apuntes" width="1025" height="490" loading="lazy" decoding="async">

	**Acceder a los índices de una lista sin bucles:**

	Anteriormente se vieron métodos como *map()* y funciones *lambda anónimas*. Realizando una aplicación de estas para finalmente convertirlas en una lista, nos ayudaría a generar una lista de los índices de la lista principal, de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-173.webp" alt="Captura de los apuntes" width="1028" height="307" loading="lazy" decoding="async">

	Aquí lo que pasa es que map itera sobre el objeto que crea enumerate, con la función lambda lo que hacemos es que en cada iteración la tupla creada por enumerate la pasamos a la variable *x* y queda almacenada en ella, finalmente tomamos el primer valor (índice 0) que es donde se almacena el índice de nuestra lista principal, de acuerdo a la iteración en la que va.

	Una vez *map()* termina de realizar esto y nos da todos los índices, recordemos que nos los da como valores individuales en cada iteración, por ello con *list()* hacemos que todo se transforme en una lista y de esta manera tenemos todos los índices representados en una lista.

	**upper() y lower():**

	Generar listas de los mismos datos mediante listas de comprensión solo en mayúsculas o solo en minúsculas es posible gracias al método *upper()* y *lower()*:

	<img src="/apuntes/python-desde-cero/img-174.webp" alt="Captura de los apuntes" width="1030" height="542" loading="lazy" decoding="async">

	Aqui lo que pasa es que se itera sobre toda la lista principal con *for* y recordemos que en una lista de comprensión la acción u operatoria al iterar en un bucle se coloca antes de este, por lo que utilizamos *upper()* y *lower()* para que se almacene en mayúsculas o minúsculas todo el texto en cada posición.

	**Iterar dos litas a la vez mediante el uso de zip():**

	Recordemos que con *zip()* podremos combinar listas, lo cual sería muy similar a utilizar enumerate. Pero en el primer (0) índice estaría el valor de la primera lista que le pasemos y en el segundo (1) estaría el valor de la segunda lista que le pasemos, ambas del mismo índice en su misma lista.

	Si tenemos las listas:

	numeros = \[1, 2, 3\]  
	nombres = \["Andrés", "Jaime", "Pedro"\]
	
	si utilizamos zip: zip(numeros, nombres), se crea un objeto tal como lo hace *enumerate()*, una forma de visualizar esto sería:
	
	(1, "Andrés")
	(2, "Jaime")
	(3, "Pedro")

	Estas serían tuplas, tal como lo hace enumerate, por ende podríamos acceder de la misma manera a estos:

	<img src="/apuntes/python-desde-cero/img-175.webp" alt="Captura de los apuntes" width="601" height="474" loading="lazy" decoding="async">

	**Eliminar índices específicos de una lista con del:**

	*del* nos ayuda para eliminar índices en específicos en una lista, de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-176.webp" alt="Captura de los apuntes" width="609" height="436" loading="lazy" decoding="async">

	**Limpiar una lista:**

	Es posible limpiar una lista con *clear()*. Esto lo que haría sería dejar vacía nuestra lista y, por ende, una vez limpia, ya no contendrá ningún dato:

	<img src="/apuntes/python-desde-cero/img-177.webp" alt="Captura de los apuntes" width="622" height="441" loading="lazy" decoding="async">

	**Alterar o modificar valores en posiciones específicas:**

	Así como podemos acceder a los valores para mostrarlos, es posible que conociendo el índice específico modifiquemos el valor en esa posición, reemplazándolo por otro:

	<img src="/apuntes/python-desde-cero/img-180.webp" alt="Captura de los apuntes" width="588" height="454" loading="lazy" decoding="async">

	**Añadir un valor en una posición específica con insert() sin eliminar ninguno:**

	Es posible añadir un nuevo valor en una posición donde ya existe un dato. Lo que pasaría luego de esto es que todos los datos ya existentes se recorrían una posición hacia adelante a partir de donde nosotros insertemos el dato:

	<img src="/apuntes/python-desde-cero/img-181.webp" alt="Captura de los apuntes" width="594" height="461" loading="lazy" decoding="async">
