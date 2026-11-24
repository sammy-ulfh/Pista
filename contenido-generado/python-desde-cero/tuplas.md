---
curso: "python-desde-cero"
modulo: "python-desde-cero/colecciones"
leccion: "tuplas"
titulo: "Tuplas"
orden: 13
minutos: 8.4
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 18
ejercicios: []
---

Las tuplas son una estructura de datos fundamental en Python, esta comparte algunas similitudes con las listas, per se distinguen por su inmutabilidad.

Las tuplas son colecciones ordenadas de elementos que no pueden modificarse una vez creadas. Esta característica las hace ideales para asegurar que ciertos datos permanezcan constantes a lo largo del ciclo de vida de un programa.

1. **Introducción**

	**Características de las tuplas:**

	- *Inmutabilidad:* Una vez que se crea una tupla, no puedes cambiar, añadir o eliminar elementos. Esta inmutabilidad garantiza la integridad de los datos que desea mantener constantes.
	- *Indexación y Slicing:* Al igual que las listas, puedes acceder a los elementos de la tupla mediante índices y también puedes realizar las operaciones de slicing para obtener subsecuencias de la tupla.
	- *Heterogeneidad:* Las tuplas pueden contener elementos de diferentes tipos, incluyendo otras tuplas, lo que las hace muy versátiles.

	**Operaciones con tuplas:**

	Aunque no puedes modificar una tupla, hay varias operaciones que se pueden realizas:

	- *Empaquetado y Desempaquetado de tuplas:* Las tuplas permiten asignar y designar sus elementos a múltiples variables de forma simultánea.
	- *Concatenación y Repetición:* Similar a las listas, puedes combinar tuplas usando el operador *+* y repetir los elementos de una tupla un número determinado de veces con el operador *\**.
	- *Métodos de Búsqueda:* Puedes usar métodos como *index()* para encontrar la posición de un elementos y *count()* para contar cuántas veces aparece un elemento en la tupla.

	**Uso de tuplas en Python:**

	- *Funciones y asignaciones múltiples:* Las tuplas son muy útiles cuando una función necesita devolver múltiples valores o cuando se realizan asignaciones múltiples en una sola línea.
	- *Estructuras de datos fijas:* Se usan para crear estructuras de datos que no deben cambiar, como los días de la semana o las coordenadas de un punto en el espacio.
	</br>
2. **Práctica:**

	La definición de una tupla  en Python es muy similar a la de la lista, la única diferencia es que en lugar de corchetes usaremos paréntesis:

	<img src="/apuntes/python-desde-cero/img-182.webp" alt="Captura de los apuntes" width="480" height="267" decoding="async">

	<img src="/apuntes/python-desde-cero/img-183.webp" alt="Captura de los apuntes" width="478" height="293" loading="lazy" decoding="async">

	**Índices:**

	Acceder a los elementos de una tupla para mostrarlos es exactamente de la misma manera que en la una lista:

	<img src="/apuntes/python-desde-cero/img-184.webp" alt="Captura de los apuntes" width="576" height="458" loading="lazy" decoding="async">

	**Modificar valores de una tupla:**

	Una vez creada una tupla no es posible modificar valores que ya contenga, por ende si intentamos cambiar el valor de alguna posición, lo que pasaría es que nos arrojaría un error:

	<img src="/apuntes/python-desde-cero/img-185.webp" alt="Captura de los apuntes" width="783" height="361" loading="lazy" decoding="async">

	**Soporte de distintos tipos de datos:**

	 En una tupla, al igual que en alguna lista, podremos almacenar distintos tipos de datos y no tendrán que ser necesariamente de un mismo valor todos los datos almacenados:

	<img src="/apuntes/python-desde-cero/img-186.webp" alt="Captura de los apuntes" width="675" height="310" loading="lazy" decoding="async">

	Podríamos visualizarlo mejor iterando sobre cada una de las posiciones de la tupla, de la misma forma en la que la lista lo permite:

	<img src="/apuntes/python-desde-cero/img-187.webp" alt="Captura de los apuntes" width="674" height="368" loading="lazy" decoding="async">

	**Inmutabilidad:**

	La inmutabilidad quiere decir que no se pueden modificar valores una vez se define la tupla, esto quiere decir que tampoco podremos utilizar métodos que modifiquen la tupla directamente, tales como *insert()*, *extend()*, *remove()*, *append()*, entre otras formas en las que podríamos modificar una lista gracias a su mutabilidad.

	Si intentáramos utilizar cualquiera de estos, en cualquier caso nos lanzaría una excepción mostrándonos el tipo de error y es que las tuplas no contienen o aceptan estos métodos:

	<img src="/apuntes/python-desde-cero/img-188.webp" alt="Captura de los apuntes" width="798" height="361" loading="lazy" decoding="async">

	**Asignación de los valores de una tupla a variables:**

	Es posible asignarle los valores de una tupla de forma individual a distintas variables colocadas en una sola línea, de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-189.webp" alt="Captura de los apuntes" width="378" height="524" loading="lazy" decoding="async">

	También es posible ver la longitud de una tupla o ver el número de valores totales en ella, de la misma manera que lo hacemos en una lista:

	<img src="/apuntes/python-desde-cero/img-190.webp" alt="Captura de los apuntes" width="383" height="276" loading="lazy" decoding="async">

	**Modificar de forma indirecta una tupla:**

	Si bien no es posible modificar de forma directa, es posible hacerlo de forma indirecta creando otra tupla como auxiliar para ello.

	<img src="/apuntes/python-desde-cero/img-191.webp" alt="Captura de los apuntes" width="469" height="348" loading="lazy" decoding="async">

	**Operaciones con tuplas:**

	Funcionarían de la misma forma que en las listas, por ejemplo, al utilizar el operador *\** nos repetiría n veces la tupla:

	<img src="/apuntes/python-desde-cero/img-192.webp" alt="Captura de los apuntes" width="480" height="350" loading="lazy" decoding="async">

	O incluso verificar qué números son pares y almacenarlos en nueva tupla con una lista de comprensión, lo cual finalmente forzaríamos su conversión a tupla:

	<img src="/apuntes/python-desde-cero/img-193.webp" alt="Captura de los apuntes" width="793" height="328" loading="lazy" decoding="async">

	Este tipo de sintaxis es de las listas de comprensión, por lo que itera en toda la tupla y almacenara cada elemento conforme vaya iterándola, ahora para que solo se almacenen los elementos pares, el condicional realiza la verificación de sí la división de ese número entre 2 da como restante 0, entonces almacenara el número.

	Finalmente, realiza su conversión a tupla y ahora tendríamos una tupla con los números pares.

	O si quisiéramos hacerlo para impares, bastaría con cambiar la parte que verifica si es par y esta es el condicional.

	Ya que si el restante es distinto a cero, esto significará que el número es impar:

	<img src="/apuntes/python-desde-cero/img-194.webp" alt="Captura de los apuntes" width="780" height="331" loading="lazy" decoding="async">

	**Mutabilidad de listas dentro de una tupla:**

	A pesar de que una tupla no es mutable, su inmutabilidad no es hereditaria como tal a todos los tipos de datos que puede almacenar.

	Es por ello que si contiene una lista dentro, a pesar de que es una tupla, el contenido específico de la lista sí puede ser modificado:

	<img src="/apuntes/python-desde-cero/img-199.webp" alt="Captura de los apuntes" width="667" height="440" loading="lazy" decoding="async">

	**¿Qué caso práctico podría existir para el uso de tuplas al ser inmutables?**

	Si bien son inmutables, pueden tener diversos usos dependiendo de lo que queramos conseguir.

	Un caso práctico para una buena implementación sería manejar con tuplas las credenciales de unas bases de datos y, por ende, estas no podrán ser modificadas.

	En caso de que se quiera intentar esto, pues con el conocimiento de lanzar excepciones podríamos manejarlo.

	<img src="/apuntes/python-desde-cero/img-195.webp" alt="Captura de los apuntes" width="789" height="378" loading="lazy" decoding="async">

	Esto nos indica el tipo de excepción que se está manejando para este error, por ende podríamos manejarlo con una excepción nosotros, recordando que podríamos ponerla de forma general para que funcione con cualquier error:

	<img src="/apuntes/python-desde-cero/img-196.webp" alt="Captura de los apuntes" width="1112" height="447" loading="lazy" decoding="async">

	O indicándole la excepción específica para que funcione correctamente (yo agregaré la librería pwntools para utilizarlos y se muestre con un colorcito el mensaje, funcionaría correctamente con solo utilizar el print):

	<img src="/apuntes/python-desde-cero/img-197.webp" alt="Captura de los apuntes" width="1101" height="456" loading="lazy" decoding="async">

	Además, log cuenta con otras opciones para lanzar mensajes:

	<img src="/apuntes/python-desde-cero/img-198.webp" alt="Captura de los apuntes" width="495" height="218" loading="lazy" decoding="async">
