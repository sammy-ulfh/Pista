---
curso: "python-desde-cero"
modulo: "python-desde-cero/fundamentos"
leccion: "control-de-flujo-condicionales-y-bucles"
titulo: "Control de flujo (Condicionales y Bucles)"
orden: 8
minutos: 24.2
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 40
ejercicios: []
---

Estos conceptos son fundamentales para entender cómo crear programas en Python que puedan tomar decisiones y repetir aciones hasta cumplir ciertos criterios. Aquí es donde nuestros programas obtienen la capacidad de responder a diferentes situaciones y datos.

1. **Introducción:**

	Los condicionales son estructuras de control que permiten ejecutar diferentes bloques de código dependiendo de si una o más condiciones son verdaderas o falsas, En Python las declaraciones condicionales más comunes son *if*, *elif* y *else*.

	- *if:* Evalúa si una condición es verdadera y, de ser así, ejecuta un bloque de código.
	- *elif:* Abreviatura de *else if*, se utiliza para verificar múltiples expresiones sólo si las anteriores no son verdaderas.
	- *else:* Captura cualquier caso que no haya sido capturado por las declaraciones *if* y *elif* anteriores.

	**Bucles:**

	Los bucles permiten ejecutar un bloque de código repetidamente mientras una condición sea verdadera o para cada elemento en una secuencia. Los dos bucles principales que utilizamos en Python son *for* y *while*.

	- *for:* Se usa para iterar sobre una secuencia (Como una lista, un diccionario, una tupla o un conjunto) y ejecutar un bloque de código para cada elemento de la secuencia.
	- *while:* Ejecuta un bloque de código repetidamente mientras una condición específica se mantiene verdadera.

	**Control de flujo en bucles:**

	Existen declaraciones de control de flujo que permiten modificar el comportamiento de los bucles, como *break*, *continue* y *pass*.

	- *break:* Termina el bucle y pasa el control a la siguiente declaración fuera del bucle.
	- *continue:* Omite el resto de código dentro del bucle y continúa con la siguiente iteración.
	- *pass:* No hace nada, se utiliza como una declaración de relleno donde el código eventualmente irá, pero no ha sido escrito todavía.

	Con esto se profundizará cada uno de los ejemplos de forma más detallada. Aprendiendo como tomar decisiones dentro de nuestros programas y como automatizar tareas repetitivas. Esto nos dará la base para escribir programas que puedan manejar tareas complejas y responder dinámicamente a los datos de entrada.


2. **Práctica:**

	- **Bucle for:**
		<img src="/apuntes/python-desde-cero/img-081.webp" alt="Captura de los apuntes" width="353" height="333" decoding="async">

		Aquí vemos una forma de como utilizar el bucle for.

        Como podremos notar, lo que está sucediendo es que nos genera una secuencia la cual irá desde el número cero hasta uno antes del indicado en *range()*.

        Además, en cada iteración lo que sucede es que se le asigna a *i* el valor de la iteración en la que va y por ende cuando imprimimos su valor, en este caso imprimir la secuencia de esta manera.

		Es por ello que se dice que for nos ayuda a iterar sobre secuencias, pero además nos permite iterar sobre listas, un ejemplo utilizando variables descriptivas para un mayor entendimiento sería el siguiente:

		<img src="/apuntes/python-desde-cero/img-082.webp" alt="Captura de los apuntes" width="648" height="361" loading="lazy" decoding="async">

		Con esto, también podremos observar que la variable donde se almacenan los contenidos de cada iteración, en este caso, es una declaración temporal y además, como podremos observar, ya sea *i* o *name*, realmente este es un nombre que nosotros podremos cambiar por el que nos parezca oportuno.

		Ahora, si antes de nuestra secuencia llegamos a declarar exactamente la misma variable que iterara con un valor distinto a cero, este no le afectara al bucle, ya que automáticamente le asignara el 0, pero una vez termine el bucle la variable quedara con el valor de la última iteración almacenado:

		<img src="/apuntes/python-desde-cero/img-085.webp" alt="Captura de los apuntes" width="479" height="507" loading="lazy" decoding="async">
    
		Además, como sabremos que podremos iterar con for tanto en listas como objetos. Recordemos la funcion *enumerate()*, ya que esta nos transformaba una lista en un objeto y podríamos iterar sobre él.

		Esto lo que nos retorna son distintas tuplas donde el índice 0 contiene el índice de ese valor de la lista y el índice 1, contiene el valor que almacena la lista en ese índice.

		<img src="/apuntes/python-desde-cero/img-086.webp" alt="Captura de los apuntes" width="735" height="387" loading="lazy" decoding="async">

		Como vemos, esto funciona correctamente, pero la representación del nombre en cuanto al número se ve un poco raro que comience desde el cero, esto es así porque recordemos que los índices en las listas comienzan a partir del número 0.

        Pero para tener una mejor vista de ello, al momento de mostrar i podríamos sumarle uno, esto no afectaría ni modificaría nada, simplemente cambiaria el output o la salida que ve el usuario en pantalla.

		<img src="/apuntes/python-desde-cero/img-087.webp" alt="Captura de los apuntes" width="718" height="372" loading="lazy" decoding="async">
	  
	  **Iterar sobre un diccionario:**
		
		En Python tenemos un tipo de estructura a la cual se le llama diccionario, está como tal en cada posición en lugar de índice, se le considera llave, un ejemplo sería tener:

		*frutas = { "manzanas": 3, "plátanos": 2 }*
		
		En este caso, la fruta sería nuestra llave y tiene que ser única para poder acceder al contenido, el contenido como tal sería el número de frutas. Con un bucle for podremos iterar sobre un diccionario y extraer ambas.

		<img src="/apuntes/python-desde-cero/img-088.webp" alt="Captura de los apuntes" width="633" height="343" loading="lazy" decoding="async">

	  </br>
	- **While:**

		Con while también podremos generar secuencias, pero aquí se aplica de forma un poco distinta.
		
        Esto se debe a que while se enfoca principalmente en verificar si una condición es verdadera, y si se cumple ejecutará el bucle de código siempre, como ejemplo antes de implementar una secuencia:

		<img src="/apuntes/python-desde-cero/img-083.webp" alt="Captura de los apuntes" width="348" height="348" loading="lazy" decoding="async">

		Inicializamos la variable en 0 y despues verificamos que esta sea menor a 5, de esta manera generaríamos una secuencia de 0 a 4. Sin embargo, lo anterior resulta en un bucle que infinitamente nos mostrara el 0, es por ello que tendremos que aumentar en uno la variable i para cada iteración.

		<img src="/apuntes/python-desde-cero/img-084.webp" alt="Captura de los apuntes" width="589" height="395" loading="lazy" decoding="async">


	- **Bucles anidados:**

		Los bucles anidados es una forma de hacer un tipo de *multitarea*, ya que estos nos ayudan a hacer cosas como recorrer una lista en la que cada índice de ella es una lista, conocido como lista de listas.

		Para recorrer cada elemento en la lista de listas tendremos que usar bucles anidados, para así recorrer ambas listas, la lista principal y la lista que se encuentre en cada posición de la lista principal.

		Ya que, al hacerlo con un solo bucle, quedaría de la siguiente manera:

		<img src="/apuntes/python-desde-cero/img-089.webp" alt="Captura de los apuntes" width="544" height="344" loading="lazy" decoding="async">

		Y al aplicar los dos, de la siguiente manera (adjunto un mensaje en cada iteración del primer bucle para que sea más fácil visualizarlo):

		<img src="/apuntes/python-desde-cero/img-090.webp" alt="Captura de los apuntes" width="589" height="694" loading="lazy" decoding="async">

		Aqui la variable *i* toma cada posición de la lista principal y como cada una de ellas es una lista, pues podremos iterar sobre esa lista, por lo que con el segundo bucle lo hacemos y finalmente los valores individuales los tiene la variable number, ya que itera sobre cada lista que almacena la variable *i*.

	- **Listas de comprensión con for:**

		Algo interesante en Python es que  si queremos trabajar sobre una lista y con base en esta crear otra, es que es posible definir esto en una sola línea mediante la iteración de la lista original.

		Un ejemplo seria tener la lista principal y crear una secundaria donde estén los números de la anterior, pero elevados al cuadrado, entonces podríamos definir un bucle for y que por cada iteración saque el cuadrado del dato en esa posición y lo almacene en la posición correspondiente en nuestra nueva lista:

		<img src="/apuntes/python-desde-cero/img-091.webp" alt="Captura de los apuntes" width="578" height="310" loading="lazy" decoding="async">

		De esta manera, dentro de  la definición de la lista estamos indicando que se itere sobre la lista numbers y en cada posición donde number valdrá al número en el índice correspondiente, lo eleve al cuadrado, que seria la asignación del lado izquierdo.
		
        Al elevar al cuadrado ese número, automáticamente se almacenaría en el índice correspondiente de acuerdo a la iteración de la lista principal.

	- **break:**

		En los bucles nosotros podremos utilizar 3 operadores muy importantes que pueden ser de mucha utilidad dependiendo del contexto en el que nos encontremos con nuestro código.
		
        Uno de ellos es *break*, este es muy importante y podremos indicar a nuestro código que se detenga sin completar la condición principal, en el caso de un *for*, se hace una iteración en un total de números, en caso de querer detener el bucle si se da una condición específica.

		Primeramente, podremos observar nuestro bucle como se comportaría de forma normal:

		<img src="/apuntes/python-desde-cero/img-092.webp" alt="Captura de los apuntes" width="354" height="468" loading="lazy" decoding="async">

		Con esto en mente, podríamos tener un programa donde justo en un bucle, si se llegase a dar el número 6, se tenga que detener el bucle para evitar errores.

        De esta manera, aplicaríamos una condición donde si *i* es igual a 6, entonces nos detenga por completo el bucle mediante el uso de *break*:

		<img src="/apuntes/python-desde-cero/img-093.webp" alt="Captura de los apuntes" width="376" height="444" loading="lazy" decoding="async">

		Ahora bien, si nuestro bucle pasa por el número 6 no se imprime.

        Esto se debe a que el orden del código importa y por ende si la declaración donde se realiza la comparación es primero, primero se detendrá el bucle antes de poder imprimir el 6, es por ello que se tendría que cambiar el orden y ya no tendríamos problema con ello:

		<img src="/apuntes/python-desde-cero/img-094.webp" alt="Captura de los apuntes" width="345" height="483" loading="lazy" decoding="async">


	- **continue:**

		Ahora, podremos tener un caso similar al anterior con el break, pero en lugar de querer que el bucle se detenga, simplemente queremos que no realice nada para esa iteración, pero sí para las anteriores y las próximas, ignorando una iteración en específico.

		Para ello tenemos *continue*:

		<img src="/apuntes/python-desde-cero/img-095.webp" alt="Captura de los apuntes" width="355" height="553" loading="lazy" decoding="async">

		De esta manera todo nuestro bucle funciona correctamente, pero cuando nuestro número es exactamente igual a 6, lo que hará será ignorar el bloque de código dentro del bucle después del condicional y saltará a la siguiente iteración.

        Viéndolo de otra manera, una vez pasa por el continue, el bucle simplemente realiza un salto u omite ese paso en específico en el que se encuentre, pasando al siguiente.

        Es por ello que se imprimen todos los números menos el 6, ya que al pasar por el continue es ignorado el print y pasa automáticamente a la siguiente iteración.i

	- *if-else en un bucle:*

		Los condicionales son una de las formas más utilizadas para realizar toma de decisiones en nuestros programas, es por ello que utilizarlos en bucles también es importante.

		Un condicional *if-else*, técnicamente con if verificará que una condición sea verdadera y else será para de lo contrario, también poder ejecutar un bloque de código.

		Tendríamos el siguiente ejemplo, donde solo entrara al if si la condición es verdadera, pero de ser lo contrario entrará a ejecutar el bloque de código en el else:

		<img src="/apuntes/python-desde-cero/img-096.webp" alt="Captura de los apuntes" width="809" height="598" loading="lazy" decoding="async">

		De esta forma podremos realizar verificaciones y con base en eso ejecutar o no bloques de código específicos.

	- *else en bucles:*

		Aunque hay gente que no lo sabe, los bucles también cuentan con una definición del else, a la que el bucle solo entrara si su ejecución es exitosa y no es interrumpida, lo cual se utiliza de la siguiente manera:

		<img src="/apuntes/python-desde-cero/img-097.webp" alt="Captura de los apuntes" width="525" height="356" loading="lazy" decoding="async">

		En este caso, el bucle nos permite entrar al else, ya que finaliza su ejecución correctamente.

		Aquí no es interrumpido en ningún momento, ya que, recordemos que el bucle siempre llega un número antes del que le hemos indicado, es por ello que en este caso nunca llega al 10 y por ende el break no interrumpe su ejecución.

		Un caso donde si lo haría, es donde *i* si llegue a valer 10:

		<img src="/apuntes/python-desde-cero/img-098.webp" alt="Captura de los apuntes" width="538" height="388" loading="lazy" decoding="async">

		Teniendo esto en cuenta, es importante siempre recordar que todo el código que este, después de la declaración del bucle, se le considerara aparte, por lo que sin importar que pase dentro del bucle, esto se ejecutara sin problemas, al ser indicaciones independientes de lo que suceda en este:

		<img src="/apuntes/python-desde-cero/img-099.webp" alt="Captura de los apuntes" width="833" height="441" loading="lazy" decoding="async">

		Esto funcionará de la misma manera para los bucles while:

		<img src="/apuntes/python-desde-cero/img-100.webp" alt="Captura de los apuntes" width="901" height="598" loading="lazy" decoding="async">

		Incluso él continúe no le afectará para marcar como exitosa la ejecución, la que solo hace que se salte una iteración o las requeridas.

		Y es considerada exitosa, ya que sí se realiza toda la ejecución de nuestro bucle. Además, siempre será importante el orden del código, ya que en el bucle *while* si nuestro incremento para *i* estuviese después del condicional, entraríamos en un bucle infinito, ya que una vez valga 6, siempre valdrá 6, ya que el condicional no permitirá que pase hacia la siguiente instrucción, porque el if siempre será verdadero.

		Por ello, primero se coloca primero el incremento para i, en for no sucede lo mismo, ya que por defecto realiza el incremento para i.

		<img src="/apuntes/python-desde-cero/img-101.webp" alt="Captura de los apuntes" width="997" height="606" loading="lazy" decoding="async">


	- **Condicionales:**

		La estructura de los condicionales es sencilla, primero tendremos una forma de verificar si una condición es verdadera, de serlo, se ejecutará un bloque de código el cual se identificara que es específicamente para la condición, ya que tendrá una indentación o separación hacia adentro por 4 espacios:


		<img src="/apuntes/python-desde-cero/img-102.webp" alt="Captura de los apuntes" width="501" height="331" loading="lazy" decoding="async">

		En este caso, al ser la edad mayor o igual a 18, imprimiremos que es mayor de edad.

		Pero en caso de no cumplirse la condición no pasará nada.

		<img src="/apuntes/python-desde-cero/img-103.webp" alt="Captura de los apuntes" width="516" height="347" loading="lazy" decoding="async">

		Si queremos que en caso de que la edad sea menor a 18 se muestre que la persona es menor de edad, entonces tendremos que utilizar *else*:

		<img src="/apuntes/python-desde-cero/img-104.webp" alt="Captura de los apuntes" width="525" height="415" loading="lazy" decoding="async">

		Además, es importante mencionar que no pasara nada si nuestro código está compactado y no tiene tantos saltos de línea como se muestra en las imágenes.

		Simplemente, es mostrado así para que se vea de mejor forma y se de un mayor entendimiento de lo que se realiza.

		Tendremos varias formas de definir las condiciones en nuestros condicionales, para realizar validaciones dependiendo de la necesidad:

		- *\=\=*: Este se utiliza para indicar una comparación en donde solo se considerara verdadera donde si el primer valor es exactamente igual al segundo.
		- *>=*: Este se utiliza, para definir que una condición solo será verdadera si el primer valor es mayor o igual al segundo valor.
		-  *<=*: Este se utiliza, para definir que una condición solo será verdadera si el primer valor es menor o igual al segundo valor.
		-  *<*: Este se utiliza, para definir que una condición solo será verdadera si el primer valor es menor al segundo valor.
		- *>*: Este se utiliza, para definir que una condición solo será verdadera si el primer valor es mayor al segundo valor.

		**Múltiples condiciones:**

		Con los condicionales, una peculiaridad es que puedes hacer que tus datos pasen por una serie de validaciones para realizar cosas dependiendo de lo esperado o requerido, para ello se utiliza *elif*.

		<img src="/apuntes/python-desde-cero/img-105.webp" alt="Captura de los apuntes" width="521" height="391" loading="lazy" decoding="async">

		Esto a final de cuentas lo que hace es hacer las validaciones una a una, pero en el momento que una es correcta se mete en ella y ya no tiene por qué realizar las siguientes.

		Es por ello que si la primera llega a ser falsa, se salta a la segunda validación, donde estamos indicando que si edad está entre un rango de 13 a 17 años de edad, entonces esa condición será verdadera:

		<img src="/apuntes/python-desde-cero/img-106.webp" alt="Captura de los apuntes" width="501" height="399" loading="lazy" decoding="async">

		Finalmente, el *else*, lo que quiere decir es que si ninguna de las condiciones aplicadas es correcta, directamente entrará ahí y ejecutará el código indicado.

		Es por ello que va verificando las condiciones una a una.

		<img src="/apuntes/python-desde-cero/img-107.webp" alt="Captura de los apuntes" width="519" height="395" loading="lazy" decoding="async">


	- **Ternarias con condicionales:**

		Las ternarias con los condicionales es una forma de poder definir un condicional en una misma línea y almacenarlo en una variable, de esta manera se aplicaría automáticamente la validación y al imprimir la variable nos quedaría un solo mensaje:

		<img src="/apuntes/python-desde-cero/img-108.webp" alt="Captura de los apuntes" width="939" height="355" loading="lazy" decoding="async">

		De esta manera, si la condición es verdadera, se cumplirá la instrucción colocada antes del condicional y si es falsa, la que sigue del esle:

		<img src="/apuntes/python-desde-cero/img-109.webp" alt="Captura de los apuntes" width="937" height="355" loading="lazy" decoding="async">

	- **Operadores lógicos:**

		Los operadores lógicos nos permiten efectuar múltiples comprobaciones en una misma condición, para verificar que se cumpla una o más condiciones para ejecutar un solo bloque de código.

		- *or:* OR lo utilizamos para verificar que se cumpla una u otra condición para que se considere verdadera una instancia.
		- *and:* AND lo que nos permite es colocar dos o más condiciones, de las cuales absolutamente todas tendrán que ser verdaderas para que la condición lo considere verdadero.
		- *not:* NOT nos permite invertir el resultado de una condición, donde cuando el resultado de una condición es verdadero, lo convertirá a falso y viceversa.

		<img src="/apuntes/python-desde-cero/img-110.webp" alt="Captura de los apuntes" width="662" height="342" loading="lazy" decoding="async">

		En este caso solo se mostrará el mensaje cuando edad sea mayor o igual a 20 y que también nacionalidad sea "mexicana". De lo contrario, no mostrará nada en pantalla.

		Una forma de que muestre el mensaje sería utilizando or, de manera que si se cumple una u otra, se muestre el mensaje:

		<img src="/apuntes/python-desde-cero/img-111.webp" alt="Captura de los apuntes" width="665" height="345" loading="lazy" decoding="async">

		En este caso no se cumple la edad, pero como se cumple que nacionalidad es "mexicana", la condición será verdadera e imprimirá el mensaje.

		Retomando el ejemplo con and, hagamos que la condición sea falsa a propósito.

		<img src="/apuntes/python-desde-cero/img-112.webp" alt="Captura de los apuntes" width="663" height="343" loading="lazy" decoding="async">

		De esta manera no nos muestra el mensaje, ya que es falsa, si bien el mensaje que queremos mostrar solo tendría sentido mostrarlo si la condición es falsa; sin embargo, no se muestra, ya que esto tendríamos que agregarlo para un *else*.

		Precisamente aquí es donde entra *not*, ya que dependiendo de lo requerido puede ahorrarnos el utilizar un else al invertir la condición, por lo que aplicando not conseguiríamos lo que queremos, sin necesidad de agregar un else:

		<img src="/apuntes/python-desde-cero/img-113.webp" alt="Captura de los apuntes" width="657" height="338" loading="lazy" decoding="async">

		Esto puede ser conveniente si no queremos realizar nada en caso de que la condición sea verdadera, ya que si quitamos el not y hacemos todo de la forma convencional, al no mostrar alguna indicación para que se realice en caso de que la condición sea verdadera, automáticamente nos daría error:

		<img src="/apuntes/python-desde-cero/img-114.webp" alt="Captura de los apuntes" width="786" height="428" loading="lazy" decoding="async">

		Pero si queremos tenerlo de esta manera, existe algo que hará que no nos dé ningún error y eso es *pass*, esto sería similar al continue en bucles, por así decirlo, simplemente nos permitiría tener de alguna forma vacía una validación en un condicional, para que el código no de error.

		<img src="/apuntes/python-desde-cero/img-118.webp" alt="Captura de los apuntes" width="667" height="392" loading="lazy" decoding="async">
		

		Otra forma de usar not, sería directamente en una comparación, por ejemplo, si queremos validar si nacionalidad no es igual a "mexicana", lo utilizaríamos cómo *!=*:

		<img src="/apuntes/python-desde-cero/img-115.webp" alt="Captura de los apuntes" width="571" height="310" loading="lazy" decoding="async">

		Además, algo interesante que podremos hacer con los condicionales es realizar validaciones en listas, verificando por ejemplo si un número está en una lista:

	- *Condicionales anidados:*

		Otra forma de realizar una comparación doble, por así decirlo, al utilizar and verificamos que se cumplan dos condiciones, pero también podríamos hacerlo con condicionales anidados, que sería colocar un condicional dentro de otro, al final cumpliría la misma función que el and:

		<img src="/apuntes/python-desde-cero/img-117.webp" alt="Captura de los apuntes" width="699" height="349" loading="lazy" decoding="async">

	
	**Verificar si un número es par o no:**

	Recordando el operador del módulo o resto de una división *%*, si cualquier número lo dividimos entre 2, este recuperara el restante, y si el número es par, si restante siempre será igual a 0, es por ello que podremos aplicar esto de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-119.webp" alt="Captura de los apuntes" width="692" height="504" loading="lazy" decoding="async">

	**Ejemplo de todo lo visto anteriormente:**

	<img src="/apuntes/python-desde-cero/img-120.webp" alt="Captura de los apuntes" width="670" height="508" loading="lazy" decoding="async">

	En lo anterior lo que hicimos es la posibilidad de verificar que todos los números de una lista sean pares.

	El bucle recorrerá la lista validando si cada uno de los números es par, y si en algún momento se encuentra con un número impar, la variable que indica que los números son pares cambiara a *False* el cual es un tipo de dato booleano y el bucle se romperá o se detendrá, ya que si se encontró un impar no tendría sentido seguir iterando en la lista porque ya sabemos que ahora no podremos decir que todos son pares.

	Finalmente en el condicional, al pasarle una variable de tipo booleano no será necesario verificar si es *True* utilizando el operador *\=\=*, al ser un tipo de dato booleano con poner la variable el condicional podrá verificar si este es *True*, en caso de que no, se va para el *else*.

	Además, otra forma de hacerlo sería empleando una lista de comprensión e incluso uso del operador lógico not:

	<img src="/apuntes/python-desde-cero/img-121.webp" alt="Captura de los apuntes" width="745" height="414" loading="lazy" decoding="async">

	Una cosa que podría ser negativa si el rendimiento es importante y esperamos detener el programa una vez encuentre un número impar, es que en la lista de comprensión no es posible manejar el flujo del bucle for, por lo que no se puede utilizar ni break ni continue y se iterara sobre toda la lista.

	Nuestro if verifica si se encuentra False en la lista de comprensión, en caso de ser verdadero, pues quisiéramos que nos arroje el mensaje de que no todos los números son pares, es por ello que revertirnos la condición con not, para que así nos envíe al else, de ser el caso.
