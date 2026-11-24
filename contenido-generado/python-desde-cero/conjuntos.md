---
curso: "python-desde-cero"
modulo: "python-desde-cero/colecciones"
leccion: "conjuntos"
titulo: "Conjuntos"
orden: 14
minutos: 13.3
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 30
ejercicios: []
---

Los conjuntos son conocidos en Python como *sets*. Son una colección de elementos sin orden y sin elementos repetidos, inspirados en la teoría de conjuntos de las matemáticas. Son ideales para la gestión  de colecciones de elementos únicos y operaciones que se requieren eliminar duplicados o realizar comparaciones de conjuntos.

1. **Introducción:**

	**Características de los Conjuntos:**

	- *Unicidad:* Los conjuntos automáticamente descartan elementos duplicados, lo que los hace perfectos para recolectar elementos únicos.
	- *Desordenados:* A diferencia de las listas y las tuplas, los conjuntos no mantienen los elementos en ningún orden específico.
	- *Mutabilidad:* Los elementos de un conjunto pueden ser agregados o eliminados, pero los elementos mismo deben ser inmutables (por ejemplo, no puedes tener un conjunto de listas, ya que estas listas se pueden modificar).

	**Operaciones con conjuntos:**

	Exploraremos las operaciones básicas de conjuntos que Python facilita, como:

	- *Adición y Eliminación:* Añadir elementos con *Add()* y eliminar elementos con *remove()* o *discard()*.
	- *Operaciones de conjuntos:* Realizar uniones, intersecciones, diferencias y diferencias simétricas utilizando métodos o operadores respectivos.
	- *Prueba de pertenencia:* Comprobar rápidamente si un elementos es miembro de un conjunto.
	- *Inmutabilidad opcional:* Usar el tipo *frozenset* para crear conjuntos que no se pueden modificar después de su creación.

	**Uso de conjuntos en Python:**
	</br>
	- *Eliminación de Duplicados:* Son útiles cuando necesitas asegurarte que una colección no tenga elementos repetidos.
	- *Relaciones entre colecciones:* Facilitan la comprensión y el manejo de relaciones matemáticas entre colecciones, como subconjuntos y superconjuntos.
	- *Rendimiento de Búsqueda:* Proporciona una búsqueda de elementos más rápida que las listas o las tuplas, lo que es útil para grandes volúmenes de datos.

	
2. **Práctica:**

	Los conjuntos los definiremos con llaves *{}*, a diferencia de las listas o tuplas estos no están enumerados. Esto se refiere a que sus datos no son marcados de forma posicional o general, un índice para ellos como en las listas.

	Recordemos que en las listas y tuplas podremos acceder a los datos indicando posiciones, por ende a los datos se le asigna una numeración:

	<img src="/apuntes/python-desde-cero/img-200.webp" alt="Captura de los apuntes" width="587" height="381" decoding="async">

	Esto no se puede realizar en los conjuntos debido a que no se les da una enumeración y, por lo tanto, no cuenta con posiciones o índices para sus datos.

	Además, es importante mencionar que en los conjuntos no podremos tener datos repetidos, ya sea repetir un mismo número o una misma cadena de texto, por ejemplo.

	La definición o creación de un conjunto se hace de forma sencilla, prácticamente de la misma manera que con las listas o tuplas:

	<img src="/apuntes/python-desde-cero/img-201.webp" alt="Captura de los apuntes" width="351" height="269" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-202.webp" alt="Captura de los apuntes" width="363" height="279" loading="lazy" decoding="async">

	**Capacidad de agregar nuevos elementos con  add() y update():**

	Los conjuntos o los tipos de datos *set* nos permiten agregar nuevos elementos en ellos, ya que son mutables, esto lo haríamos de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-203.webp" alt="Captura de los apuntes" width="360" height="286" loading="lazy" decoding="async">

	En este caso el 4 se nos almacena de forma ordenada, pero es importante tener en mente que en el caso de los conjuntos no funciona así al ser una estructura de datos no ordenada, por ende nunca debemos dar por hecho que el último valor que agreguemos estará al final.

	Esto se debe a que Python internamente realiza una organización de los datos de una forma más óptima, por lo que luego se dan casos como el siguiente:

	<img src="/apuntes/python-desde-cero/img-204.webp" alt="Captura de los apuntes" width="335" height="289" loading="lazy" decoding="async">

	Para agregar una mayor cantidad de elementos y no solo uno, podremos utilizar *update()*, lo cual es muy similar al extend en las listas:

	<img src="/apuntes/python-desde-cero/img-205.webp" alt="Captura de los apuntes" width="402" height="286" loading="lazy" decoding="async">

	**Remover o eliminar elementos en los conjuntos con remove():**

	En los conjuntos podremos eliminar elementos específicos empleando *remove()* y pasándole como argumento el dato específico que queremos eliminar:

	<img src="/apuntes/python-desde-cero/img-206.webp" alt="Captura de los apuntes" width="403" height="335" loading="lazy" decoding="async">

	**Remover elementos que no sabemos si existen con discard():**

	Podremos emplear *remove()* en múltiples ocasiones, pero además una cosa interesante es que los conjuntos permiten emplear el uso de un método, el cual puede ser utilizado sin dar ningún error en caso de que el dato no exista.

	Recordemos que en los conjuntos los datos son únicos y por ende no se repiten.  El emplear remove para un elemento que no sabemos si existe, se vería de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-207.webp" alt="Captura de los apuntes" width="796" height="398" loading="lazy" decoding="async">

	Esto nos dará error al no existir el elemento, pero al no estar seguros de si el elemento existe o no, para evitar que esto nos diera error podríamos emplear con mayor seguridad *discard()*:

	<img src="/apuntes/python-desde-cero/img-208.webp" alt="Captura de los apuntes" width="430" height="311" loading="lazy" decoding="async">

	Por ende, cuando existe lo eliminara como si de *remove()* se tratase, pero, si este no existe, no pasaría nada.

	**Intersecciones entre conjuntos con intersection():**

	Al generar una intersección entre dos conjuntos, esta podríamos almacenarla en un nuevo conjunto. El resultado de esta serán los datos que son iguales en ambos conjuntos, creando un nuevo conjunto con esos elementos.

	De esta manera podríamos saber que elementos contienen iguales dos conjuntos distintos:

	<img src="/apuntes/python-desde-cero/img-209.webp" alt="Captura de los apuntes" width="829" height="341" loading="lazy" decoding="async">

	**Generar uniones en conjuntos con union():**

	Es posible mezclar o unir dos conjuntos distintos, estos dos se unirán eliminando las repeticiones, dejando únicamente elementos únicos. Recordemos que los conjuntos contienen solamente elementos únicos:

	<img src="/apuntes/python-desde-cero/img-210.webp" alt="Captura de los apuntes" width="753" height="332" loading="lazy" decoding="async">

	**Subconjuntos y comprobación con issubset():**

	En Python decimos que un conjunto es un subconjunto de otro, cuando todos los elementos de este aparecen en otro conjunto.  
  
	Es por ello que en el siguiente ejemplo nuestro primer conjunto sería considerado subconjunto de nuestro segundo conjunto:

	<img src="/apuntes/python-desde-cero/img-211.webp" alt="Captura de los apuntes" width="596" height="369" loading="lazy" decoding="async">

	Ahora una forma de asegurarnos que todos los elementos de un conjunto aparecen en otro y por ende es considera subconjunto, sería aplicar una comprobación con *issubset()*, esto retornara un valor booleano, indicando si es verdadero o falso.

	True (verdadero) cuando si aparezcan todos sus elementos en el conjunto que es pasado como argumento o False (falso) cuando no y por ende no sea considerado subconjunto:

	<img src="/apuntes/python-desde-cero/img-212.webp" alt="Captura de los apuntes" width="665" height="291" loading="lazy" decoding="async">

	Aqui hacemos la comprobación de si los datos de nuestro primer conjunto, aparecen en el segundo conjunto y por ende nuestro primer conjunto será considerado subconjunto.

	En este caso retorna True porque, en efecto, es un subconjunto del segundo conjunto. 
	
	Es importante recordar que en los conjuntos no importa el orden, por más que parezca que se ordenan cuando insertamos datos, no debemos confiarnos de ello porque esto no es así, simplemente Python hará una organización del conjunto de la forma más óptima y no es la más ordenada.
	
	Usualmente puede notarse así, pero el creerlo de esta manera podría llevarnos a errores en nuestros programas.

	Si un solo elemento del primer conjunto no se encuentra en el segundo conjunto, ya no sería considerado subconjunto y por ende nos daría False ahora:

	<img src="/apuntes/python-desde-cero/img-213.webp" alt="Captura de los apuntes" width="657" height="312" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-214.webp" alt="Captura de los apuntes" width="657" height="291" loading="lazy" decoding="async">

	Lo mismo pasaría para cualquier otro dato como las cadenas de texto:

	<img src="/apuntes/python-desde-cero/img-215.webp" alt="Captura de los apuntes" width="756" height="291" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-216.webp" alt="Captura de los apuntes" width="759" height="286" loading="lazy" decoding="async">


	**Formas prácticas de utilizar los conjuntos set():**

	Podríamos emplearlo para de una lista que contenga múltiples repeticiones, crear o generar una que elimine completamente las repeticiones, esto lo logramos con *set()* que es el tipo de dato de los conjuntos y no contienen repeticiones:

	<img src="/apuntes/python-desde-cero/img-217.webp" alt="Captura de los apuntes" width="1124" height="308" loading="lazy" decoding="async">

	Aqui finalmente lo tendríamos en otra variable almacenada sin ninguna repetición, ahora nosotros esperamos generar una lista, pero como realizamos una conversión a conjunto, actualmente tenemos un conjunto, por lo que tendremos que transformarlo nuevamente a lista para que tengamos una lista sin repeticiones:

	<img src="/apuntes/python-desde-cero/img-218.webp" alt="Captura de los apuntes" width="1121" height="315" loading="lazy" decoding="async">

	Con esto listo, es importante que en los conjuntos los datos no están ordenados y nunca debemos esperar que sea así, es por ello que si queremos asegurar que nuestra lista esté ordenada tendremos que aplicarle un sort:

	<img src="/apuntes/python-desde-cero/img-219.webp" alt="Captura de los apuntes" width="1114" height="309" loading="lazy" decoding="async">

	*Búsquedas eficientes:*

	Los conjuntos pueden ser una vía mucho más rápida o eficiente de verificar si un dato existe, ya que en una lista podría ser menos eficiente.

	Un ejemplo sería el siguiente:

	Primeramente, generaríamos una secuencia o un rango de números de 10 mil números en total, pero esta llegará hasta el 9,999 porque recordemos que Python empieza a contar desde el cero.

	Si intentamos imprimirla, no nos mostrará los números como tal, pero podremos iterar sobre este:

	<img src="/apuntes/python-desde-cero/img-220.webp" alt="Captura de los apuntes" width="332" height="271" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-221.webp" alt="Captura de los apuntes" width="366" height="579" loading="lazy" decoding="async">

	Se muestran todos los números, pero en este caso con un comando de bash solo mostramos los últimos elementos.

	Entonces todos estos números podríamos almacenarlos en un conjunto:

	<img src="/apuntes/python-desde-cero/img-222.webp" alt="Captura de los apuntes" width="1871" height="665" loading="lazy" decoding="async">

	Al estar almacenado como un conjunto ahora si vemos todos los datos como números almacenados.

	Finalmente, para realizar una búsqueda, es sencillo y solo será verificar si en este caso un número está dentro de nuestro conjunto, de existir nos retornará el dato booleano True y de no existir retornara False:

	<img src="/apuntes/python-desde-cero/img-223.webp" alt="Captura de los apuntes" width="390" height="266" loading="lazy" decoding="async">

	Esto desde luego es más eficiente que verificar si un dato existe empleando el uso de una lista.

	Si intentáramos con un dato que sabemos que no estará en el conjunto, retornara False:

	<img src="/apuntes/python-desde-cero/img-224.webp" alt="Captura de los apuntes" width="381" height="266" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-225.webp" alt="Captura de los apuntes" width="389" height="272" loading="lazy" decoding="async">

	*Caso práctico con inserciones y uniones:*

	Un caso hipotético en el que tengamos usuarios de dos plataformas distintas, podríamos primeramente mostrar aquellos que se encuentran en ambas plataformas y posteriormente todos los usuarios de ambas plataformas, evitando las repeticiones gracias a este tipo de dato:\

	<img src="/apuntes/python-desde-cero/img-226.webp" alt="Captura de los apuntes" width="951" height="356" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-227.webp" alt="Captura de los apuntes" width="954" height="387" loading="lazy" decoding="async">

	**Comparaciones entre conjuntos:**

	También podremos realizar comparaciones en conjuntos gracias a *difference()*, este nos ayudará para verificar de los datos que tenemos en nuestro primer conjunto, cuáles datos no aparecen en el segundo conjunto, que es el que se le pasa como argumento a difference:

	<img src="/apuntes/python-desde-cero/img-228.webp" alt="Captura de los apuntes" width="883" height="355" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-229.webp" alt="Captura de los apuntes" width="884" height="366" loading="lazy" decoding="async">
