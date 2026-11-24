---
curso: "python-desde-cero"
modulo: "python-desde-cero/fundamentos"
leccion: "funciones-lambda-anonimas"
titulo: "Funciones lambda anónimas"
orden: 10
minutos: 5.2
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 9
ejercicios: []
---

1. **Introducción:**

	**Funciones lambda:**
	
	Las funciones lambda son también conocidas como funciones anónimas debido a que no se les asigna un nombre explícito al definirlas. Se utilizan para crear pequeñas funciones en el lugar donde se necesitan, generalmente para una operación específica y breve. En Python, una función lambda se define con la palabra clave *lambda*, seguida de una lista de argumentos, dos puntos y la expresión que se desea evaluar y devolver.

	Una de las ventajas de las funciones lambda es su simplicidad sintáctica, lo que las hace ideal para su uso en operaciones que requieren una función por un breve momento y para casos donde la definición de una función tradicional completa sería excesivamente verbosa.

	**Usos comunes de las funciones lambda:**

	- *Con funciones de orden superior:* Como aquellas que requieren otra función como argumento, por ejemplo, *map()*, *filter()* y *sorted()*.
	- *Operaciones simples:* Para realizar cálculos o acciones rápidas donde una función completa sería innecesariamente larga.
	- *Funcionalidad en línea:* Cuando se necesita una funcionalidad simple sin la necesidad de reutilizarla en otro lugar del código.

	Con esto prenderemos cómo y cuándo utilizar las funciones lambda de manera efectiva, además de entender cómo pueden ayudarnos a escribir código más limpio y eficiente. Aunque su utilidad es amplia, también discutiremos las limitaciones de las funciones lambda y cómo el abuso de estas puede llevar a un código menos legible.

2. **Práctica:**

	<img src="/apuntes/python-desde-cero/img-133.webp" alt="Captura de los apuntes" width="469" height="275" decoding="async">

	Este sería un ejemplo, aplicando la misma definición de cuando creamos esto con una función normal, haciéndolo más sencillo con una función lambda.

	Ahora también, podríamos crear el ejemplo de elevar un número al cuadrado, lo cual con una función lambda quedaría en una sola línea, pasándole un argumento:

	<img src="/apuntes/python-desde-cero/img-134.webp" alt="Captura de los apuntes" width="367" height="264" loading="lazy" decoding="async">

	De esta forma, para cosas sencillas, podremos simplemente crearlo con lambda, pero si quisiéramos hacer lo de la suma, sería generarlo para poder pasarle los 2 argumentos para la suma:

	<img src="/apuntes/python-desde-cero/img-135.webp" alt="Captura de los apuntes" width="351" height="283" loading="lazy" decoding="async">

	De esta forma podremos notar que antes de los dos puntos se tendrán que declarar los argumentos necesarios para lo que la función vaya a realizar, mientras que del lado derecho la operación o acción que realizara y además esto será lo que retornará, como si de un *return* de una función normal se tratase.

	Una forma de emplearlo con un ejemplo más realista o con el que podríamos toparnos con mayor facilidad, es mediante el uso de *map()*.

	De esta forma, recordando que *map()* nos permite pasarle dos argumentos, donde el primero será una función y el segundo el objeto a iterar.

	Lo cual resulta en un objeto y con ello podremos recordar que es posible iteraro:

	<img src="/apuntes/python-desde-cero/img-136.webp" alt="Captura de los apuntes" width="539" height="337" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-137.webp" alt="Captura de los apuntes" width="538" height="537" loading="lazy" decoding="async">

	De esta forma, también es importante que para finalizar y tenerlo de una forma en la que podamos mostrarlo como lista, es que lo que se retorna por map, podremos transformarlo en lista y finalmente tendríamos la lista de los números al cuadrado:

	<img src="/apuntes/python-desde-cero/img-138.webp" alt="Captura de los apuntes" width="571" height="332" loading="lazy" decoding="async">

	Otra forma de utilizarlo, sería aplicando *filter()*, debido a que podremos agregar condiciones en nuestras funciones lambda y estas retornarán True o False.

	Un ejemplo sería para verificar si un número es par en una lista. En caso de que este sea par, filter lo que hará será retornarnos el número. En caso de ser impar, no nos lo retornara, por lo que no se almacenará en nuestra nueva lista.

	<img src="/apuntes/python-desde-cero/img-139.webp" alt="Captura de los apuntes" width="693" height="331" loading="lazy" decoding="async">


	O de otra forma, para que nos regresara los impares, podríamos utilizar en lugar de comparar para que sea exactamente igual a cero, diferente a cero, ya que cuando sea impar, el módulo de una división entre 2 siempre será distinto de 0.

	<img src="/apuntes/python-desde-cero/img-140.webp" alt="Captura de los apuntes" width="686" height="331" loading="lazy" decoding="async">

	Otra forma muy interesante de aplicar lambda sería importando librerías o módulos, en este caso *reduce*.

	Como esto puede ser un poco más complejo, más adelante se explicará de mejor manera el cómo importar módulos y librerías a nuestros programas.

	En este caso, con reduce, primeramente lo traeremos de una librería.

	Luego de esto, haremos una declaración similar que con map y filter. Lo que nos permitirá esto es hacer una operatoria elemento a elementos, por ejemplo, multiplicar todos los elementos de la lista. El primero por el segundo y después el resultado de ambos por el tercero y así sucesivamente:

	<img src="/apuntes/python-desde-cero/img-141.webp" alt="Captura de los apuntes" width="569" height="400" loading="lazy" decoding="async">
