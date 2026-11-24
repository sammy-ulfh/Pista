---
curso: "python-desde-cero"
modulo: "python-desde-cero/fundamentos"
leccion: "operadores-basicos-en-python"
titulo: "Operadores básicos en Python"
orden: 6
minutos: 9.1
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 20
ejercicios: []
---

1. *Introducción:*

	Los operadores aritméticos son símbolos que Python utiliza para realizar cálculos matemáticos.

- **Los fundamentales son:**

	- *Suma (+):* No solo suma números, sino que también une secuencias como cadenas y listas, creando una nueva secuencia que es la combinación de ambas.
	  </br>
	- *Resta (-):* Se utiliza para restar un número de otro. Con listas, su uso es menos directo y generalmente no se aplica como operador directo.
	  </br>
	- *Multiplicación (\*):* Cuando se multiplica un número por otro, obtendremos el producto. Con cadenas y listas, este operador repite los elementos la cantidad de veces especificada.
	  </br>
	- *División (/):* Divide un número entre otro y el resultado es siempre un número flotante, incluso si los números son enteros.
	  </br>
	- *Exponente (\*\*):* Eleva un número a la potencia de otro. Por ejemplo, ‘2 \*\* 3‘ resultará en 8. Este operador es menos común en operaciones con cadenas o listas.

-  **Operaciones con cadenas:**

	En Python, las cadenas son objetos que representan secuencias de caracteres y se pueden manupilar usando operadores aritméticos:

	- *Concatenación (+):* Une varias cadenas en una sola. Por ejemplo, 'Hola ' + 'Mundo' se convierte en 'Hola Mundo'.
	  </br>
	- *Repetición (\*):* Crea repeticiones de la misma cadena. 'Hola' \* 3 generará 'HolaHolaHola'.

- **Operaciones con listas:**

	Las listas son colecciones ordenadas y mutables de elementos:

	- *Concatenación (+):* Similar a las cadenas, unir dos listas las combina en una nueva lista.
	 </br>
	- *Repetición (\*):* Repite todos los elementos de la lista un número determinado de veces.

- **Funciones especiales para listas:**

	- *Zip:* Toma dos o más listas y las empareja, creando una lista de tuplas. Cada tupla contiene elementos de las listas originales que ocupan la misma posición.
     </br>
	- *Map:* Aplica una función específica a cada elemento de un iterable, lo que resulta útil para transformas los datos contenidos.

	Asi mismo, otro de los conceptos mencionados es el de *TypeCast*. El TypeCast o conversión de tipos, es el proceso mediante el cual se cambia una variable de un tipo de dato a otro.

	En Python, esto se realiza de forma muy directa, utilizando el nombre del tipo de dato con una función para realizar la conversión. Por ejemplo, convertir una cadena a un entero se hace pasando la cadena como argumento a la función *int()*, y transformar un número a una cadena se hace con la función *str()*. Esta capacidad de cambiar el tipo de dato es especialmente útil cuando se necesita estandarizar los tipos de datos para operaciones especificas o para cumplir con los requisitos de las estructuras de datos.

	A medida del progreso, se ampliara incluiremos operaciones más complejas y exploraremos otros tipos de datos y estructuras en Python.

2. *Práctica:*

	- *Sumas:*

		En Python es posible realizar operaciones directamente en un *print*, o asignarle el valor de esta operación a una variable:

		<img src="/apuntes/python-desde-cero/img-054.webp" alt="Captura de los apuntes" width="485" height="287" decoding="async">

		<img src="/apuntes/python-desde-cero/img-055.webp" alt="Captura de los apuntes" width="509" height="331" loading="lazy" decoding="async">

	- *Restas:*

		<img src="/apuntes/python-desde-cero/img-056.webp" alt="Captura de los apuntes" width="479" height="330" loading="lazy" decoding="async">

	 - *Multiplicación:*

		<img src="/apuntes/python-desde-cero/img-057.webp" alt="Captura de los apuntes" width="481" height="337" loading="lazy" decoding="async">

	- *Exponente:*

		<img src="/apuntes/python-desde-cero/img-058.webp" alt="Captura de los apuntes" width="499" height="340" loading="lazy" decoding="async">

		<img src="/apuntes/python-desde-cero/img-059.webp" alt="Captura de los apuntes" width="493" height="348" loading="lazy" decoding="async">

	Además, nosotros podremos formatear los resultados y, con *formatear los resultados* nos referimos a convertir datos en una representación específica o estructura.

	 Esto quiere decir que les daremos un formato específico siguiendo una serie de reglas

	Con esto en mente, a nivel de string podríamos aplicar un formateo a nuestra última respuesta de los exponentes, al ser bastante grande:

	<img src="/apuntes/python-desde-cero/img-060.webp" alt="Captura de los apuntes" width="515" height="340" loading="lazy" decoding="async">

	De esta manera lo que estamos haciendo es formatear la respuesta, donde con los *:* le estaríamos indicando que, a partir de ahí, vamos a indicar nuestras reglas y con la *,* le estaríamos indicando que queremos que nos separe los miles con comas.

	Aquí, si intentáramos separarlos con punto en lugar de coma, nos daría error, pero es posible hacerlo, solo que tendríamos que remplazar la coma por el punto utilizando *replace()*:

	<img src="/apuntes/python-desde-cero/img-061.webp" alt="Captura de los apuntes" width="825" height="418" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-062.webp" alt="Captura de los apuntes" width="613" height="334" loading="lazy" decoding="async">

	De esta manera le estaríamos indicando que queremos que nos reemplace la coma por el punto, y funcionaria correctamente.


	- *Módulo o restante:*

		En Python podremos sacar el módulo o restante de las divisiones con *%*:

		<img src="/apuntes/python-desde-cero/img-063.webp" alt="Captura de los apuntes" width="487" height="331" loading="lazy" decoding="async">

		Esto suele ser muy utilizado cuando aplicamos comprobaciones para saber si un número es par o impar, ya que al utilizar el módulo de un número entre dos, si nos regresa 0 quiere decir que el número es par.


   **Cadenas:**
     </br>
	- **Sumas:**
		La suma de cadenas de texto o strings, la podríamos considerar como una concatenación de estos, ya que podríamos utilizarlo de la siguiente manera:

		<img src="/apuntes/python-desde-cero/img-064.webp" alt="Captura de los apuntes" width="531" height="321" loading="lazy" decoding="async">

	- *Multiplicaciones:*

		Con las multiplicaciones, lo que hace es repetir o multiplicar el contenido, el número de veces por el que se está multiplicando.

		<img src="/apuntes/python-desde-cero/img-065.webp" alt="Captura de los apuntes" width="365" height="320" loading="lazy" decoding="async">

		Además, en nuestras cadenas de texto podremos acceder a los caracteres de forma individual, como si de una lista se tratase. Permitiéndonos utilizar rangos también:

		<img src="/apuntes/python-desde-cero/img-066.webp" alt="Captura de los apuntes" width="363" height="353" loading="lazy" decoding="async">

	**Suma de elementos de dos listas en las mismas posiciones:**

	Cuando deseamos sumar elementos, podríamos automáticamente pensar en simplemente agregar '+' entre ambas listas para obtener el resultado esperado, pero realmente esto lo que haría, sería concatenar ambas listas:

	<img src="/apuntes/python-desde-cero/img-067.webp" alt="Captura de los apuntes" width="486" height="358" loading="lazy" decoding="async">

	Es por ello que para esto tendremos la función *zip()*, donde le pasaríamos nuestras listas como argumentos:

	<img src="/apuntes/python-desde-cero/img-068.webp" alt="Captura de los apuntes" width="502" height="354" loading="lazy" decoding="async">

	Esto lo que hace es crearnos un objeto sobre el cual podremos iterar, lo cual es muy similar a cuando utilizamos *enumerate()* para poder sacar tanto el índice como el valor en esa posición.

	Con esto, al iterar sobre el objeto podremos observar como lo que hace es emparejarnos todas las posiciones o índices similares de ambas listas en una tupla que es otro tipo de dato en Python, lo cual se ve de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-069.webp" alt="Captura de los apuntes" width="568" height="667" loading="lazy" decoding="async">

	*\n* representa un salto de línea. 

	Ahora con esto, en lugar de aplicar un bucle, tenemos una cosa muy interesante, la cual es la función *map()*. Esta itera sobre todo el objeto y pasa sobre cada una de las tuplas y además nos permite indicarle si queremos realizar algo, por lo que podríamos indicarle como primer argumento que queremos que nos sume todos los elementos que se encuentre dentro de la tupla, cuando itere sobre cada una de ellas:

	<img src="/apuntes/python-desde-cero/img-070.webp" alt="Captura de los apuntes" width="606" height="445" loading="lazy" decoding="async">

	Además, por último podríamos indicar que esto nos lo genere como una lista y finalmente, pues en result se nos almacenaría una lista:

	<img src="/apuntes/python-desde-cero/img-072.webp" alt="Captura de los apuntes" width="680" height="338" loading="lazy" decoding="async">

	La diferencia es que al hacerlo sin map, pues tendríamos que aplicar una conversión de cada tupla a una lista y luego sumarlo:

	<img src="/apuntes/python-desde-cero/img-071.webp" alt="Captura de los apuntes" width="533" height="469" loading="lazy" decoding="async">

	Para tenerlo como lista, bastaría con crear una antes del bucle y almacenar cada resultado:

	<img src="/apuntes/python-desde-cero/img-073.webp" alt="Captura de los apuntes" width="498" height="466" loading="lazy" decoding="async">

    Esto es un poco el cómo funcionan ciertas cosas y si por ahora es algo complicado no hay que preocuparse, con el paso de los temas todo se irá explicando y quedará más claro.
