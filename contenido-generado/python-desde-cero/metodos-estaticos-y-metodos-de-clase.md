---
curso: "python-desde-cero"
modulo: "python-desde-cero/objetos"
leccion: "metodos-estaticos-y-metodos-de-clase"
titulo: "Métodos estáticos y métodos de clase"
orden: 19
minutos: 9.5
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 16
ejercicios: []
---

1. **Introducción**

	Los métodos estáticos y los métodos de clase son dos herramientas poderosas en la programación orientada a objetos en Python, que ofrecen flexibilidad en cómo se pueden acceder y utilizar la funcionalidad asociada con una clase.

	*Métodos de Clase:*

	Se define con el decorador *@classmethod*, lo que le permite tomar la clase como primer argumento, generalmente nombrada *cls*. Este acceso a la clase permite que los métodos de clase interactúen con la estructura de la clase en si, como modificar atributos de clase que afectarán a todas las instancias. Se utilizan para tareas que requieren conocimiento del estado global de la clase, como la construcción de instancias de maneras específicas, también conocidos como métodos factory.

	*Métodos Estáticos:*

	Se definen con el decorador *@staticmethod*, y no reciben un argumento implícito de referencia a la clase o instancia. Son similares a las funciones regulares dentro del cuerpo de una clase. Se utilizan como funciones que, aunque conceptualmente pertenecen a una clase debido a la relevancia temática, no necesitan acceder a ningún dato específico de la clase o instancia. Proporcionan una manera de encapsular la funcionalidad dentro de una clase, manteniendo la cohesión y la organización del código.

	Ambos métodos contribuyen a un diseño de software más limpio y modular, permitiendo una clara separación entre la funcionalidad que opera con respecto a la clase en su totalidad y la funcionalidad que es independiente de las instancias de clase y de la clase misma. La elección entre utilizar un método de clase o un método estático a menudo depende del requisito específico de acceso o no a la clase o a sus instancias.
	</br>
2. **Práctica**

	*Empleando métodos estáticos con una clase Calculadora que nos permita realizar operaciones directamente sin tener que crear instancias de esta misma:*

	Para empezar, realizaremos la definición de nuestra clase con un método estático que nos permita realizar la suma de dos números, lo cual podremos efectuar llamando a la clase con ese método y pasándole los dos número a sumar:

	<img src="/apuntes/python-desde-cero/img-320.webp" alt="Captura de los apuntes" width="480" height="344" decoding="async">

	Aplicando el mismo principio, definiríamos un método para resta y otro para multiplicación:

	<img src="/apuntes/python-desde-cero/img-321.webp" alt="Captura de los apuntes" width="505" height="594" loading="lazy" decoding="async">

	Ahora crearíamos uno para la división, en el cual tendríamos que emplear una lógica donde, si el segundo número es cero, nos retorne un mensaje para indicar que no es posible dividir entre cero y evitar que el programa nos dé errores.

	<img src="/apuntes/python-desde-cero/img-322.webp" alt="Captura de los apuntes" width="990" height="325" loading="lazy" decoding="async">

	De esta manera, estamos definiendo que si nuestra variable num2 es diferente de cero, entonces nos retornará el resultado de la división, pero si este no es distinto de cero (que será igual a cero), entonces entrará al else y nos retornará el mensaje, el cual imprimiremos también:

	<img src="/apuntes/python-desde-cero/img-323.webp" alt="Captura de los apuntes" width="1008" height="328" loading="lazy" decoding="async">

	**Métodos de clases con el decorador @classmethod**

	Comenzaremos creando una clase *Automovil* a la cual le pasaremos tanto marca como modelo para inicializar en el constructor.

	<img src="/apuntes/python-desde-cero/img-324.webp" alt="Captura de los apuntes" width="420" height="167" loading="lazy" decoding="async">

	Podremos crear un objeto de la forma que lo hemos hecho anteriormente:

	<img src="/apuntes/python-desde-cero/img-325.webp" alt="Captura de los apuntes" width="512" height="222" loading="lazy" decoding="async">

	Pero podríamos experimentar con una forma más interesante, donde este se cree con un método de clase:

	<img src="/apuntes/python-desde-cero/img-326.webp" alt="Captura de los apuntes" width="843" height="611" loading="lazy" decoding="async">

	Aquí sucede exactamente lo mismo que hicimos anteriormente para crear el objeto, solo que de una forma un tanto más en partes, primeramente llamamos a nuestro método de clase donde le pasamos la marca de nuestro automóvil, este con *cls* hace referencia a la misma clase, lo que es equivalente a utilizar *Automovil()*, como lo hicimos anteriormente.

	Esto, al pasarle los atributos de marca y modelo, pues nos crearía el objeto, ya que lo hace exactamente de la misma manera en la que lo haríamos sin este método de clase. Pero nosotros le pasamos solamente la marca y este ya le asigna que es un modelo deportivo.

	Finalmente, con el return no retorna el objeto, por lo que ahora nuestra variable *deportivo* será un objeto, tal como si lo creáramos como lo hicimos anteriormente.

	Por último, para comprobar que realmente el objeto se haya creado sin ningún problema, utilizamos nuestro método especial *\_\_str\_\_*, donde podremos manejar el output si queremos imprimir nuestro objeto.

	Con esto en mente, ahora podríamos crear un método que nos ayude a definir objetos de esta clase, para definir automóviles Sedán.

	<img src="/apuntes/python-desde-cero/img-327.webp" alt="Captura de los apuntes" width="796" height="303" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-328.webp" alt="Captura de los apuntes" width="533" height="167" loading="lazy" decoding="async">

	**Variables de clase**

	Las variables de clase son las variables de la propia clase que comparten todos los objetos de una clase, teniendo esto en cuenta podríamos hacer un ejemplo donde no se creen objetos directamente, sino con un método estático y uno de clase, utilizaremos nuestro constructor para agregar contenido a una variable de clase.

	Lo que haríamos sería crear una clase donde vamos a tener una variable de clase donde vayamos a almacenar estudiantes, esto lo haremos con un método de clase para mandar a llamar a nuestro constructor, pero solo lo haremos si la edad del estudiante es mayor o igual a 18 años, por lo que haremos uso de un método estático para realizar esta comprobación.

	Primeramente, definimos nuestra clase y nuestro método de clase que nos ayudará a almacenar nuevos estudiantes:

	<img src="/apuntes/python-desde-cero/img-329.webp" alt="Captura de los apuntes" width="491" height="322" loading="lazy" decoding="async">

	Aquí primeramente tenemos nuestra clase, y con nuestro método de clase primeramente comprobamos si la edad que nos llegó para agregar un nuevo estudiante es mayor o igual a 18, para esto empleamos un método estático que solo recibirá la variable edad y verificara si es mayor o igual a 18, por lo que retornara un valor booleano (True o False) y con base en esto nuestro condicional entrará en el if si recibe True.

	<img src="/apuntes/python-desde-cero/img-330.webp" alt="Captura de los apuntes" width="526" height="435" loading="lazy" decoding="async">

	Aquí lo que estamos definiendo es que cuando nuestro constructor sea llamado, creará un objeto al cual le asignará el nombre y la edad indicados, finalmente el objeto lo almacenará en la lista, por lo que de forma indirecta estaríamos creando objetos de esta clase, que serían almacenados en una misma variable de clase, que en este caso es una lista.
	
	Por lo que nos faltaría que, si el estudiante es mayor a 18, se haga la llamada a la clase  para con el constructor crear el objeto y este se almacene, de no ser mayor de edad, entonces se imprimiría un mensaje indicando que el estudiante es menor de edad..

	<img src="/apuntes/python-desde-cero/img-331.webp" alt="Captura de los apuntes" width="793" height="521" loading="lazy" decoding="async">

	Con esto definido, finalmente solo nos faltaría llamar al método de clase, pasándole el nombre y edad de estudiantes a agregar:

	<img src="/apuntes/python-desde-cero/img-332.webp" alt="Captura de los apuntes" width="806" height="643" loading="lazy" decoding="async">

	Ahora, si lo ejecutáramos, gracias a nuestro print, veríamos a los estudiantes que son menores de edad y, por ende, su objeto no se crea ni se almacena en la variable de clase.

	<img src="/apuntes/python-desde-cero/img-333.webp" alt="Captura de los apuntes" width="546" height="127" loading="lazy" decoding="async">

	Ahora podríamos crear otro método estático, el que nos ayude a representar o mostrar por pantalla todos los estudiantes que sí fueron almacenados con éxito.

	<img src="/apuntes/python-desde-cero/img-334.webp" alt="Captura de los apuntes" width="725" height="168" loading="lazy" decoding="async">

	De esta manera, en nuestro método jugamos con enumerate para listar a nuestros estudiantes. Recordemos que enumerate nos crea un objeto iterable donde el primer elemento es el índice y el segundo lo almacenado en la lista.

	En este caso, utilizamos el argument *start* en enumerate, ya que Python comenzaría a contar desde el índice 0, pero *start* nos permite que, como se vaya mostrando en la variable i, sea a partir del número indicado.

	Para nuestro objeto, tendremos que llamarlo mediante la llamada de la clase, apuntando a su variable, por así decirlo. Al hacerlo así, al ir iterando, ahora el índice se almacenaría en *i* y el objeto en *estudiante*. Finalmente, para mostrar al estudiante, mostramos el número y el nombre del objeto.
	
	Finalmente, llamamos al método para listar a los estudiantes almacenados correctamente y al ejecutar el programa tendríamos lo siguiente:

	<img src="/apuntes/python-desde-cero/img-335.webp" alt="Captura de los apuntes" width="613" height="442" loading="lazy" decoding="async">

	Con esto vemos un claro ejemplo de una variable de clase, en donde vamos modificándola por cada objeto que vayamos creando y finalmente vemos cómo es una variable que comparten todos los objetos creados a partir de esta clase.
