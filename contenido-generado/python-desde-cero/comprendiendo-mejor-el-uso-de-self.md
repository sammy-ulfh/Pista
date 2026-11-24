---
curso: "python-desde-cero"
modulo: "python-desde-cero/objetos"
leccion: "comprendiendo-mejor-el-uso-de-self"
titulo: "Comprendiendo mejor el uso de self"
orden: 20
minutos: 8.1
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 13
ejercicios: []
---

1. **Introducción**

	El uso de self es uno de los aspectos más fundamentales y a la vez confusos para quienes se adentran en la Programación Orientada a Objetos (POO) en Python. Este identificador es crucial para entender cómo Python maneja los métodos y atributos dentro de sus clases y objetos.

	*Definición de self:*

	A nivel conceptual, *self* es una referencia al objeto actual dentro de la clase. Es el primer parámetro que pasa a cualquier método de una clase en Python. A través de *self* un método puede acceder y manipular los atributos del objeto y llamar a otros métodos dentro del mismo objeto.

	*Uso de self:*

	Cuando se crea una nueva instancia de una clase, Python pasa automáticamente la instancia recién creada como el primer argumento al método *\_\_init\_\_* y a otros métodos definidos en la clase que tienen *self* como su primer parámetro. Esto es lo que permite que un método opere con datos específicos del objeto y no con datos de la clase en general o de otras instancias de la clase/

	*Importancia de self:*

	El concepto de *self* es importante en la POO ya que asegura que los métodos y atributos se apliquen al objeto correcto. Sin self, no poriamos diferenciar entre las operaciones y datos de diferentes instancias de una clase.
	</br>
2. **Práctica**

	Comenzaremos creando una clase, donde vayamos inicializando su constructor y una instancia de esta:

	<img src="/apuntes/python-desde-cero/img-336.webp" alt="Captura de los apuntes" width="296" height="191" decoding="async">

	Para esto, estamos creando una instancia *Marcelo* de la clase *Persona* y, por lo tanto, le pasaremos las propiedades o atributos del nombre y la edad.

	<img src="/apuntes/python-desde-cero/img-337.webp" alt="Captura de los apuntes" width="370" height="217" loading="lazy" decoding="async">

	Por lo tanto, aquí estaríamos creando este objeto y tendríamos que construirlo de alguna forma. Es por ello que tenemos nuestro método especial *\_\_init\_\_* que es nuestro constructor y aquí es donde como parámetro tendremos que pasarle *self*.

	Este, aunque no se lo pasemos nosotros, de forma directa, Python por detrás pasa el objeto y, por ende, mediante un parámetro *self* tendremos que recibirlo para poder trabajar con él y mediante el constructor asignar los atributos.

	Por ende, en este caso tendríamos nuestro self y otros dos parámetros, que serían el nombre y edad que pasaríamos como argumentos:

	<img src="/apuntes/python-desde-cero/img-338.webp" alt="Captura de los apuntes" width="421" height="198" loading="lazy" decoding="async">

	La forma en que podríamos verlo, es como si referenciáramos a la clase y de esta a nuestro método especial *\_\_init\_\_*, el cual es nuestro constructor, y como argumentos le estuviésemos pasando el objeto, el nombre y la edad:

	Persona.\_\_init\_\_(marcelo, nombre, edad)

	De esta manera, realmente al emplear *self*, lo que estamos haciendo es hacer referencia al objeto *marcelo* y un self.nombre, es exactamente lo mismo que marcelo.nombre

	Es por ello que podemos asignar y trabajar con los atributos empleando self:

	<img src="/apuntes/python-desde-cero/img-339.webp" alt="Captura de los apuntes" width="868" height="242" loading="lazy" decoding="async">

	Es por esto que al pasarlo, realmente en lugar de llamarlo *self*, podríamos llamarlo como deseemos y hacer referencia al objeto de la manera que mejor se nos acomode, pero por convenio y para que nuestro código tenga una mejor legibilidad, es recomendable como buena práctica utilizar *self*.

	Un ejemplo en donde además creemos un método donde se presente la persona, por así decirlo, haciendo ciertos cambios, sería lo mismo de lo que hemos visto hasta ahora:

	<img src="/apuntes/python-desde-cero/img-340.webp" alt="Captura de los apuntes" width="878" height="279" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-341.webp" alt="Captura de los apuntes" width="443" height="58" loading="lazy" decoding="async">

	De esta manera, cada vez que utilizamos un método, pasamos indirectamente al objeto. La cosa cambia si utilizamos decoradores, ya que el decorador *@staticmethod* es independiente del objeto, pero el *@classmethod* es exactamente lo mismo que el que estamos viendo con *self*, la diferencia es que aquí hacemos referencia con *cls* y esto hace referencia directamente a la clase de la que está siendo llamada por así decirlo.

	Con el decorador *@staticmethod* podríamos trabajar también con objetos, pero es importante recordar que para poder utilizarlo se tendrá que definir el parámetro para ser pasado ahora, sí de forma directa.

	**Ejemplo con clase calculadora:**

	Ahora crearemos una clase calculadora, donde empezaremos definiendo su constructor y para hacerlo más entendible con la inicialización de una instancia (objeto).

	<img src="/apuntes/python-desde-cero/img-342.webp" alt="Captura de los apuntes" width="632" height="183" loading="lazy" decoding="async">

	De esta manera, se está pasando la referencia a nuestro objeto, la cual identificamos dentro de la clase empleando *self* como primer parámetro y el dato que le estamos pasando (el número 5) con el parámetro *num*.

	Es importante saber que, al crear funciones o métodos, las definiciones de variables dentro de los paréntesis se le llaman parámetros y argumentos a los datos que le pasamos al llamar a la función.

	En este caso, *self* y *num* son nuestros parámetros y  los argumentos serían el objeto y el número que se le vaya a pasar, en este caso *calc* y *5*. Visto de otra forma, la declaración de las variables dentro de los paréntesis son los parámetros y los datos que le pasamos para asignarle a esos parámetros serían los argumentos.

	Por último, completaríamos nuestro constructor para que le asigne el número a un atributo del objeto:

	<img src="/apuntes/python-desde-cero/img-343.webp" alt="Captura de los apuntes" width="634" height="182" loading="lazy" decoding="async">

	Ahora crearemos otro método el cual nos permita sumar un número al atributo *numero* que ya tenemos:

	<img src="/apuntes/python-desde-cero/img-344.webp" alt="Captura de los apuntes" width="638" height="315" loading="lazy" decoding="async">

	De esta manera se hace algo similar que con el constructor, pero los métodos normales no se utilizan para inicializar los atributos, sino para trabajar con ellos y modificarlos.

	Es por ello que inicializamos con nuestro constructor el atributo *numero* en 5, después con el método *suma* le sumamos el 10 que le pasamos como argumento y finalmente al imprimir nuestro atributo *numero* nos retorna la suma de estos dos:

	<img src="/apuntes/python-desde-cero/img-345.webp" alt="Captura de los apuntes" width="231" height="63" loading="lazy" decoding="async">

	**Método de doble suma:**

	Ahora creamos un método *doble_suma*. En este lo que haremos será permitir el paso de dos números y de esta manera aprovechar el método *suma* que ya está creado para realizar una suma con el número que ya está de forma individua para cada uno de los números que le pasemos, por lo que en lugar de modificar la variable directamente, solo imprimiremos el valor sin modificarla en el método *suma*:

	<img src="/apuntes/python-desde-cero/img-346.webp" alt="Captura de los apuntes" width="691" height="346" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-347.webp" alt="Captura de los apuntes" width="258" height="82" loading="lazy" decoding="async">

	De esta manera, es como aprovechar el uso de *self*, pasando entre métodos la referencia de nuestro objeto *calc* todo el tiempo para manejar los atributos de este.

	Recordemos que lo que está seguido de la almohadilla son comentarios en Python, lo que quiere decir que será contenido que no tomará en cuenta al ejecutar el programa.

	De esta manera, entendiendo el concepto, ahora sí realizaríamos la doble suma, ya que sumariamos el resultado de estas dos sumas individuales y lo imprimiríamos en pantalla.

	Para que esto funcione, recordemos que tendremos que recuperar los valores y no imprimirlos en pantalla. Es por ello que los resultados de las sumas individuales los recuperaremos con *return* y ahora sí podremos sumar ambos para tener un resultado final, que en este caso sería "7+15":

	<img src="/apuntes/python-desde-cero/img-348.webp" alt="Captura de los apuntes" width="759" height="502" loading="lazy" decoding="async">
