---
curso: "python-desde-cero"
modulo: "python-desde-cero/objetos"
leccion: "clases-y-objetos-1-de-2"
titulo: "Clases y objetos (1 de 2)"
orden: 17
minutos: 14.3
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 24
ejercicios: []
---

1. **Introducción**
	La Programación Orientada a Objetos (POO) es un paradigma de programación que utiliza objetos y clases en su enfoque central. Es una manera de estructurar y organizar el código que refleja cómo los desarrolladores piensan sobre el mundo real y las entidades dentro de él.
	
	*Clases:*
	
	Las clases son fundamentos de la POO. Actúan como plantillas para la creación de objetos y definen atributos y comportamientos que los objetos creados a partir de ellas tendrán. En Python una clase se define con la palabra clave *class* y proporciona la estructura inicial para todo objeto que se derive de ella.
	
	*Instancias de Clase y Objetos:*
	
	Un objeto es una instancia de una clase. Cada ves que se crea objeto, se está creando una instancia que tiene su propio espacio de memoria y conjunto de valores para los atributos definidos por su clase. Los objetos encapsulan datos y funciones juntos en una entidad discreta.
	
	*Métodos de Clase:*

	Los métodos de clase son funciones que se definen dentro de una clase y solo pueden ser llamados por las instancias de esa clase. Estos métodos son el mecanismo principal para interactuar con los objetos, permitiéndoles realizar operaciones o acciones, modificar su estado o incluso interactuar con otros objetos.


2. **Práctica**

	Comenzaremos creando una clase *persona*, buscando un entendimiento más sencillo de esto, una definición o creación para una clase quedaría de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-276.webp" alt="Captura de los apuntes" width="405" height="198" decoding="async">

	Al definir nuestra clase, tendremos que definir también un constructor, este se define con ciertos parámetros los cuales serán asignados a los atributos de un objeto:

	<img src="/apuntes/python-desde-cero/img-277.webp" alt="Captura de los apuntes" width="488" height="214" loading="lazy" decoding="async">

	Nuestro constructor es un método de la propia clase y nos permitirá asignar los atributos mediante el uso de self, *self* se utiliza, ya que al asignar valores a nuestros atributos lo haremos llamando al mismo objeto y es como la forma de llamarse a sí mismo, de la misma manera al utilizar self podremos recuperar lo almacenado en los atributos:

	<img src="/apuntes/python-desde-cero/img-278.webp" alt="Captura de los apuntes" width="508" height="278" loading="lazy" decoding="async">

	De esta manera, estamos asignando a nuestros atributos los valores que son pasados a la definición de la clase cuando se crea un objeto.

	Con esto podríamos definir un método para que nos retorne o haga algo, esto lo podríamos definir como si de una función dentro de una clase se tratase, pero se le llaman métodos:

	<img src="/apuntes/python-desde-cero/img-279.webp" alt="Captura de los apuntes" width="775" height="354" loading="lazy" decoding="async">

	De esta manera, estaríamos definiendo que nuestro método nos retorne la información del nombre y la edad mediante un mensaje seteado con un *f-string* y una vez recuperado este mensaje podríamos imprimirlo por pantalla.

	Para poder realizar esto, primero tendríamos que crear una instancia la cual sería nuestro objeto.

	<img src="/apuntes/python-desde-cero/img-280.webp" alt="Captura de los apuntes" width="782" height="391" loading="lazy" decoding="async">

	Esto nos crearía un objeto y podríamos llamar la información de la misma manera que lo hace el self, pero para hacerlo fuera de la clase tendríamos que mandar llamar nuestro objeto creado, de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-281.webp" alt="Captura de los apuntes" width="786" height="491" loading="lazy" decoding="async">

	De esta manera, nuestro *objeto* creado de la clase *Persona*, lo llamamos y accedemos a los atributos indicando un *.* antes de ellos.

	Para ejecutar o efectuar lo que tenemos en nuestro método, sería como ejecutar una función y esto haría que nos retorne el string anteriormente programado en nuestro método:

	<img src="/apuntes/python-desde-cero/img-282.webp" alt="Captura de los apuntes" width="779" height="523" loading="lazy" decoding="async">

	Con esto podremos tener en cuenta de la definición de una instancia u objeto se realizan como si de una variable se tratase, pero en esta llamamos a la clase que hemos creado y le pasamos los datos necesarios colocados en nuestro constructor, que sería el inicializador de los atributos, asignándoles los datos que le pasemos a la clase al llamarla.

	*self*, explicado de una mejor forma lo que hace es hacer referencia al objeto que se está creando o se creo, es por ello que en el constructor o en el método también se le pasó como parámetro *self*, porque es una forma de referencias a la instancia creada.

	**Método:**
	
	Entonces, una forma de entenderlo es que cuando nosotros hacemos un *sammy.saludo()*, lo que se hace por detrás es que para la clase *Persona* ejecutamos nuestro método *saludo* y le pasamos nuestro objeto *sammy*, lo cual se puede ver como: *Persona.saludo(sammy)*.

	De esta manera en nuestro método es donde tenemos que pasar *self*, ya que involucra al objeto y mediante este accedemos a los atributos, sería prácticamente lo mismo que hicimos para imprimir el nombre por fuera de la clase, pero dentro de la clase se hace referencia al objeto con *self*.

	**Constructor:**

	Cuando  creamos la instancia(objeto) de nuestra clase, lo que estamos haciendo es pasarle dos argumentos, los cuales son el nombre y la edad. ¿Pero de qué objeto o a qué objeto se le están asignando estos atributos?
	
	En este caos al objeto *sammy* y esto lo maneja ya Python para saber qué instancia fue creada, lo que podríamos ver como: *Persona.__init__(sammy, nombre, edad)*.

	Es por ello que *self* se maneja mucho en las clases, ya que nos permite manejar los atributos para una instancia(objeto) dada.

	**Variables de clase:**
	
	Existen variables de clases, por lo que los atributos que tenemos creados son solamente para los objetos conforme los vayamos creando.
	
	Un ejemplo es que podremos asignar los atributos propios de cada objeto creado, los atributos serán únicos de cada objeto, pero todos los objetos de una clase que hayan sido creados compartirán las variables de clase.

	Con esto en mente podríamos crear más instancias de nuestra clase, donde al crearla tendremos que pasar los argumentos de nombre y edad para que sean asignador por nuestro constructor a los atributos correspondientes. Después llamaremos al método *saludo* de cada instancia creada y esto nos retornaría el string, por lo que lo imprimiremos en pantalla:

	<img src="/apuntes/python-desde-cero/img-283.webp" alt="Captura de los apuntes" width="785" height="622" loading="lazy" decoding="async">

	**Ejemplo de clase de animales:**

	Con base en lo anterior, ahora crearemos una clase *Animales*, en nuestro constructor buscaremos iniciar nuestros atributos para un nombre animal, así para un tipo de animal.

	Después crearemos un constructor el cual nos dé una descripción del nombre y animal de nuestro objeto dado.

	<img src="/apuntes/python-desde-cero/img-284.webp" alt="Captura de los apuntes" width="890" height="579" loading="lazy" decoding="async">

	De esta manera, al crear un objeto, mediante nuestro constructor se asignan los valores a los atributos para ese objeto. Luego, mediante nuestro método descripción, recibe el objeto con *self* para poder acceder a los datos y mostrarlos con el string, el cual es retornado y mostrado en pantalla por el print.

	Lo que hace Python, por detrás, por así decirlo, es llamar la clase y pasarle los argumentos que nosotros le hemos pasado y el objeto creado.

	Lo cual es equivalente a lo que está comentado en el código después de los *#*, por lo que si intentáramos usar el constructor o el método llamando directamente a la clase, también funcionaria, pero tendría que estar creado el objeto desde antes o daría error:

	<img src="/apuntes/python-desde-cero/img-285.webp" alt="Captura de los apuntes" width="889" height="589" loading="lazy" decoding="async">

	La forma usual desde luego es como se vio primero, llamando al objeto y aplicando el uso de  los métodos en este.

	Además, nosotros hemos estado jugando con *return* para que nos regrese el string y nosotros podamos mostrarlo, almacenarlo o jugar con él, pero si directamente quisiéramos realizar el print en nuestro método podríamos hacerlo y nos ahorraríamos el print fuera de este al llamar al método mediante cada objeto, ya que recordemos que cada objeto es independiente y en sus atributos contendrá sus datos propios:
	
	<img src="/apuntes/python-desde-cero/img-286.webp" alt="Captura de los apuntes" width="897" height="581" loading="lazy" decoding="async">

	**Ejemplo con clase CuentaBancaria:**

	Para esta clase lo haremos un poco más complejo y crearemos métodos que operen con los valores que indiquemos para un cliente, donde el cliente será nuestra instancia(objeto).

	La definición de nuestra clase podremos empezar a plantearla viendo cuantos y cuáles argumentos le pasáremos al crear el objeto:

	<img src="/apuntes/python-desde-cero/img-287.webp" alt="Captura de los apuntes" width="631" height="130" loading="lazy" decoding="async">

	De esta manera podremos tener en cuenta que para nuestro constructor tendremos en cuenta un ID o número de cuenta, un nombre de un cliente y su cantidad de dinero. Creando nuestro constructor de la siguiente manera:


	<img src="/apuntes/python-desde-cero/img-288.webp" alt="Captura de los apuntes" width="632" height="261" loading="lazy" decoding="async">

	Aquí podríamos jugar con un concepto nuevo, si intentáramos evitar mandar el argumento de dinero esto nos ocasionaría un error, pero en nuestro constructor en la definición de los parámetros podríamos directamente setear el dinero en *0*.  

	Esto lo que nos permite es que en caso de no se coloque como argumento el contenido para el parámetro dinero, este automáticamente será 0, y si lo agregamos tomará el valor que nosotros coloquemos, por ende esto podría verse de las siguientes dos maneras:

	*Donde no le mandemos una cantidad de dinero y por defecto sea 0:*

	<img src="/apuntes/python-desde-cero/img-289.webp" alt="Captura de los apuntes" width="570" height="267" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-291.webp" alt="Captura de los apuntes" width="646" height="429" loading="lazy" decoding="async">

	*Donde le mandemos una cantidad de dinero como argumento y por ende la cantidad que nosotros coloquemos será la que se almacenara en el atributo:*

	<img src="/apuntes/python-desde-cero/img-290.webp" alt="Captura de los apuntes" width="628" height="255" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-292.webp" alt="Captura de los apuntes" width="698" height="432" loading="lazy" decoding="async">

	Con esto, crearemos dos métodos de los cuales uno nos permitirá agregar dinero y el otro retirarlo.

	**Método para depositar dinero:**

	Para nuestro método de depositar dinero, lo que tendremos que hacer es pasarle como argumento una cantidad de dinero y en nuestros parámetros del método tendremos que agregarlo, así como la referencia a nuestro objeto que es *self* para poder trabajar con los atributos.
	
	Ya dentro de nuestro método definiríamos el incremento del dinero con la cantidad que se le ingrese como argumento y nos quedaría de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-293.webp" alt="Captura de los apuntes" width="658" height="391" loading="lazy" decoding="async">

	Finalmente, podríamos definir que nuestro método nos retorne un string con la información de lo realizado y mediante un print imprimir el texto al llamar al método:

	<img src="/apuntes/python-desde-cero/img-294.webp" alt="Captura de los apuntes" width="1213" height="585" loading="lazy" decoding="async">

	Es importante aclarar que el atributo o variable del objeto a la que se accede con *self* es totalmente independiente de nuestro parámetro de nombre *dinero*, colocado después de *self*. Este podría tener perfectamente otro nombre y no afectaría en nada al funcionamiento de nuestro programa:

	<img src="/apuntes/python-desde-cero/img-295.webp" alt="Captura de los apuntes" width="1204" height="584" loading="lazy" decoding="async">

	**Método para retirar dinero:**


	Este va a ser de una forma muy similar al de depositar dinero, pero tendrá una diferencia que es fundamental. Al retirar dinero tendremos que tener cuidado con que la cantidad que queremos retirar sea menor a la cantidad que tenemos disponible de dinero.

	Es por ello que agregaremos un condicional el cual nos retornara un string con información, si la cantidad de dinero que se quiere retirar supera nuestro dinero disponible, es importante recordar que cuando utilizamos return indicamos que nos regrese una información a la función (método en este caso) y por ende se termina de ejecutar en esa línea de código y no ejecuta las siguientes:

	<img src="/apuntes/python-desde-cero/img-296.webp" alt="Captura de los apuntes" width="1207" height="946" loading="lazy" decoding="async">

	Ahora tendremos lo mismo que al depositar, pero lo que haría sería restar el dinero y, en caso de superar el dinero disponible, retornaría un mensaje el cual te indicaría que tus fondos son insuficientes.

	Esto además se puede ver con algunos ejemplos aplicados de depósito y retiro de dinero.

	En un caso realista, también tendríamos que tener cuidado con que una persona no intente depositar o retirar valores negativos, ya sea mediante el programa o simplemente evitando que donde lo ingresen no se pueda colocar el caracter *-*.

	Además, es importante tener muy en cuenta que cada objeto que creemos tendrá los mismos atributos, ya que pertenecen a la misma clase, pero serán totalmente independientes uno del otro, por lo que si modificamos algo en un objeto el cambio solamente se hará en ese y otro será totalmente independiente:

	<img src="/apuntes/python-desde-cero/img-297.webp" alt="Captura de los apuntes" width="1325" height="314" loading="lazy" decoding="async">

	Primero modifiqué los métodos para que al imprimir el contenido también esté el nombre y sea más fácil visualizarlo.

	Después cree otro objeto para otra persona y deposité dinero para esta, de esta manera podremos  ver cómo es totalmente independiente un objeto de otro.

	<img src="/apuntes/python-desde-cero/img-298.webp" alt="Captura de los apuntes" width="689" height="229" loading="lazy" decoding="async">

	En la llamada a la función para depositar dinero hay un error, el cual se soluciona llamando al método con el nombre correcto. Finalmente tendríamos como output de nuestro programa lo siguiente:

	<img src="/apuntes/python-desde-cero/img-299.webp" alt="Captura de los apuntes" width="1105" height="391" loading="lazy" decoding="async">

	Aquí inicializamos los objetos ya con $1000 cada uno y después depositamos o retiramos dinero.
