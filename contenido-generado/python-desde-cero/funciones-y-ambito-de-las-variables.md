---
curso: "python-desde-cero"
modulo: "python-desde-cero/fundamentos"
leccion: "funciones-y-ambito-de-las-variables"
titulo: "Funciones y ámbito de las variables"
orden: 9
minutos: 6.6
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 11
ejercicios: []
---

1. **Introducción:**

	**Funciones:**

	Las funciones son bloques de código reutilizables diseñados para realizar una tarea específica. En Python se definen utilizando la palabra clave *def* seguida de un nombre descriptivo, paréntesis que puede contener parámetros y dos puntos. Los parámetros son *variables de entrada* que pueden cambiar cada vez que se llama a la función. Esto permite a las funciones operar con diferentes datos y producir resultados correspondientes.

	Las funciones pueden devolver valores al programa principal o a otras funciones mediante la palabra clave *return*. Esto las hace increíblemente versátiles, ya que pueden procesar datos y luego pasar esos datos modificados a otras partes del programa.

	**Ámbito de las Variables (Scope):**

	El ámbito de una variable se refiere a la región de un programa donde esa variable es accesible. En Python hay dos tipos principales de ámbitos:

	- *Local:* Las variables definidas dentro de una función tenen un ámbito local, lo que significa que solo se pueden acceder y modificar dentro de la función donde fueron creadas.
	- *Global:* Las variables definidas fuera de todas las funciones tienen un ámbito global, lo que significa que se puede acceder a ellas desde cualquier parte del programa. Sin embargo, para modificar una variable global dentro de una función, de debe declarar como global.

	Estos conceptos son esenciales para escribir programas claros, eficientes y mantenibles en Python.
	 </br>
2. **Práctica:**

	**Funciones:**
	
	Para definir nuestras funciones en Python utilizaremos *def* el cual proviene de *define* y el bloque de código a ejecutar por esta función tendrá que estar identado/tabulado (por 4 espacios, ya que es lo más recomendable).

	<img src="/apuntes/python-desde-cero/img-122.webp" alt="Captura de los apuntes" width="474" height="270" decoding="async">

	En este caso realizamos solamente la definición de la variable, pero no sucede nada al ejecutar el programa.

	Esto sucede debido a que en Python las funciones son como bloques de código reutilizables, es por ello que podremos programar alguna tarea que pueda llegar a ser repetitiva y utilizarla múltiples ocasiones en nuestro programa, por lo tanto, para que esto funcione se tendrá que llamar o ejecutar la función, puede ser directamente para iniciar el flujo del programa o incluso dentro de una función:

	<img src="/apuntes/python-desde-cero/img-123.webp" alt="Captura de los apuntes" width="456" height="317" loading="lazy" decoding="async">

	De esta manera, mandamos a llamar la función, para que el código dentro de esta se ejecute.

	Ahora, una cosa interesante en las funciones es que podremos trabajar con los parámetros, esto quiere decir que podremos pasarle datos para que sean manipulados o usados dentro de esa función, siendo únicamente ámbito de esa función, o de otra forma, variable local.

	<img src="/apuntes/python-desde-cero/img-124.webp" alt="Captura de los apuntes" width="515" height="321" loading="lazy" decoding="async">

	De esta manera, definimos un argumento que  le tendremos que pasar a la función una vez que se llame. Este será como una variable definida dentro de la función, siendo así una variable local que como contenido tendrá lo que le pasemos como argumento.

	Es por ello que dentro de la función podremos utilizarla y, en este caso, imprimir el nombre que le hemos pasado.

	Además, algo interesante en las funciones es que pueden retornar valores. De esta manera, una forma de mostrarlo sería realizando una función de suma. El valor de una función es retornado justo al lugar de donde fue llamada, por lo que puede directamente imprimirse o ser almacenado en una función.

	<img src="/apuntes/python-desde-cero/img-125.webp" alt="Captura de los apuntes" width="598" height="359" loading="lazy" decoding="async">

	O al almacenar el dato en una función para imprimirlo después:

	<img src="/apuntes/python-desde-cero/img-126.webp" alt="Captura de los apuntes" width="499" height="393" loading="lazy" decoding="async">

	Además, por el entendimiento de variable temporal, que en este caso sería *result*.

	Quiere decir que será una variable que solo existirá mientras se esté ejecutando la función y, una vez se termine de ejecutar, estos datos o variables ya no existirán en el resto del flujo del programa. Esto lo podríamos ver si intentamos acceder a result fuera de la función:

	<img src="/apuntes/python-desde-cero/img-127.webp" alt="Captura de los apuntes" width="793" height="437" loading="lazy" decoding="async">

	**Ámbito de las variables:**

	Retomando un poco lo anterior, si generamos una función con una función dentro, esta sería considerada variable local, permitiendo modificarse y realizar cosas con ella solo dentro de la función donde fue creada.

	<img src="/apuntes/python-desde-cero/img-128.webp" alt="Captura de los apuntes" width="562" height="351" loading="lazy" decoding="async">

	De esta manera, si quisiéramos hacer algo con una variable local, fuera de la función donde fue declarada, no sería posible, ya que nos daría error.

	Podríamos considerar una variable local, como una variable temporal que solo existirá durante la ejecución de la función:

	<img src="/apuntes/python-desde-cero/img-129.webp" alt="Captura de los apuntes" width="803" height="461" loading="lazy" decoding="async">

	Es por ello que da el error de que la variable no está declarada, porque al ser un tipo de variable temporal, esta deja de existir una vez que la función termina su ejecución.

	Y a esta se le conoce como variable local.

	Si quisiéramos poder manipularla, aunque la función haya terminado de ejecutarse, tendríamos que declararla como variable global:

	<img src="/apuntes/python-desde-cero/img-130.webp" alt="Captura de los apuntes" width="605" height="436" loading="lazy" decoding="async">

	Esta definición está bien, pero una mejor forma de realizar declaraciones de variables globales sería antes de empezar a generar nuestras funciones:

	<img src="/apuntes/python-desde-cero/img-131.webp" alt="Captura de los apuntes" width="593" height="463" loading="lazy" decoding="async">

	En este caso, declarar una variable "global", de esta manera, nos permitiría trabajar con ella, pero los valores modificados dentro de una función no se tomarían en cuenta una vez se termine de ejecutar.

	Es por ello que lo mejor en Python a la hora de declarar variables globales es indicarle que será global, mediante el uso de la palabra clave *global*:

	En sí, al realizar esto por decirlo de alguna forma, lo que Python hace es traerse la variable a la función para permitir la modificación en el ámbito global, y no solo de forma local.

	Lo que haría que ahora sí se consideren los cambios realizados una vez que nuestra función se termine de ejecutar:

	<img src="/apuntes/python-desde-cero/img-132.webp" alt="Captura de los apuntes" width="638" height="483" loading="lazy" decoding="async">
