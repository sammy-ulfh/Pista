---
curso: "python-desde-cero"
modulo: "python-desde-cero/objetos"
leccion: "encapsulamiento-y-metodos-especiales"
titulo: "Encapsulamiento y métodos especiales"
orden: 22
minutos: 20.1
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 32
ejercicios: []
---

1. **Introducción**

	El encapsulamiento en la programación orientada a objetos (POO) maneja principalmente tres niveles de visibilidad para los atributos y métodos de una clase: públicos, protegidos y privados. En Python, esta distinción se realiza mediante convenciones en la nomenclatura, más que a través de estrictas restricciones de acceso como en otros lenguajes.

	*Atributos Públicos:*

	Son accesibles desde cualquier parte del programa y, por convención, no tienen un prefijo especial. Se espera que estos atributos sean parte de la interfaz permanente de la clase.

	*Atributos Protegidos:*

	Se indica con un único guion bajo al principio del nombre (por ejemplo, *\_atributo*). Esto es solo una convención y no impide el acceso desde fuera de la clase, pero se entiende que esto atributos están protegidos y no deberían ser accesibles directamente, excepto dentro de la propia clase y en subclases.

	*Atributos Privados:*

	En Python, los atributos privados se indican con un doble guion bajo al principio del nombre (por ejemplo, *\_\_atributo*). Esto activa un mecanismo de cambio de nombre conocido como *name mangling*, donde el intérprete de Python altera internamente el nombre del atributo para hacer más difícil el acceso desde fuera de la clase.

	*Métodos Especiales:*

	Los métodos especiales en Python son también conocidos como métodos mágicos y son identificados por doble guion bajo al inicio y al final (*\_\_metodo\_\_*). Permiten a las clases en Python emular el comportamiento de los tipos incorporados y responder a operadores específicos. Por ejemplo el metodo *\_\_init\_\_* se utiliza para inicializar una nueva instancia de una clase, *\_\_str\_\_*  se invoca para una representación en forma de cadena legible del objeto y *\_\_len\_\_* devuelve la longitud del objeto.


	Algunos métodos especiales importantes en POO son:

	* *\_\_init\_\_(self, \[...\])*: Inicializa una nueva instancia de la clase.
	* *\_\_str\_\_(self):* Devuelve una representación en cadena de texto del objeto, invocado por la función *str(object)* y *print*
	* *\_\_repr\_\_(self):* Devuelve una representación del objeto que debería, en teoría, ser una expresión válida de Python, invocado por la función *repr(object)*
	* *\_\_eq\_\_(self, other):* Define un comportamiento del operador de igualdad *\=\=*
	* *\_\_lt\_\_(self, other), \_\_le\_\_(self, other), \_\_gt\_\_(self, other), \_\_ge\_\_(self, other):* Definen el comportamiento de los operadores de comparación(**<**, **<=**, **>** y **>=** respectivamente).
	* *\_\_add\_\_(self, other), \_\_sub\_\_(self, other), \_\_mul\_\_(self, other), etc.:* Definen el comportamiento de los operadores aritméticos (**+**, **–**, \*, etc.).

	El encapsulamiento y los métodos especiales son herramientas poderosas que, cuando se utilizan correctamente, pueden mejorar la seguridad, la flexibilidad y la claridad en la construcción de aplicaciones.
	</br>
2. **Práctica**

	**Encapsulamiento en Python:**

	El encapsulamiento en la POO nos permitirá restringir el acceso a ciertas partes o componentes de un objeto, sobre todo si se intenta acceder a estos desde fuera de la clase (funciones externas, por ejemplo).

	*Atributos protegidos:*
	
	Para ver esto comenzaremos creando nuestra clase *Ejemplo* y su constructor:

	<img src="/apuntes/python-desde-cero/img-371.webp" alt="Captura de los apuntes" width="931" height="180" decoding="async">

	En este caso no estamos pasando ningún argumento a los parámetros de nuestro constructor, más que internamente Python el objeto cuando este es creado, por ello el uso de self.

	Dentro de nuestro constructor estamos creando un atributo protegido, este lo definimos de la misma manera que los demás, pero la diferencia es que al inicio se le colocara un guion bajo *\_* (*\_atributo*). Estos son utilizados más por convenio, indicando que no debería accederse o hacer referencia a este atributo desde fuera de la clase, aunque es posible, por convenio, no deberías hacerlo, ya que fue construido así para alguna funcionalidad de programa.

	Si hacemos referencia a este fuera de la clase, funcionaria:

	<img src="/apuntes/python-desde-cero/img-372.webp" alt="Captura de los apuntes" width="1010" height="415" loading="lazy" decoding="async">

	Pero como ya se mencionó, por convenio no debe de hacerse cuando un atributo se define como protegido. Esto es considerado como buenas prácticas para generar un mejor código legible y organizado.

	*Atributos privados:*

	Para crear un atributo privado le agregaremos dos guiones bajos al inicio (*\_\_atributo\_privado*), este cambia un poco en cuanto al atributo protegido, ya que este no puede ser accedido directamente desde fuera de la clase:

	<img src="/apuntes/python-desde-cero/img-373.webp" alt="Captura de los apuntes" width="974" height="499" loading="lazy" decoding="async">

	Aquí lo que realmente sucede es que al definir un atributo privado Python, por detrás lo que hace es aplicar un concepto llamado *name mangling*, este básicamente cambia el nombre del atributo para que no sea posible acceder a este de forma tan fácil.

	Lo que hace es como hacer una reasignación del nombre, donde al inicio colocara un guion bajo seguido del nombre de la clase y después el nombre del atributo, quedando *\_Clase\_\_atributo_privado*, por lo que si intentáramos acceder a este atributo de esta manera, ahora si podríamos:

	<img src="/apuntes/python-desde-cero/img-374.webp" alt="Captura de los apuntes" width="973" height="419" loading="lazy" decoding="async">

	Entonces realmente el atributo privado existe pero Python por detrás hace un tipo de reasignación de nombre para que tenga una mayor seguridad y no se pueda acceder tan fácil fuera de la clase.

	**Ejemplos prácticos:**

	*Practicando con un atributo privado:*

	Crearemos una clase *Coche* en al cual definiremos los atributos *marca* y *modelo* y los pasaremos mediante nuestro constructor, pero también definiremos un atributo privado, el cual sea *\_\_kilometraje*:

	<img src="/apuntes/python-desde-cero/img-375.webp" alt="Captura de los apuntes" width="449" height="259" loading="lazy" decoding="async">

	Con esto crearemos un método *conducir*, al cual le pasaremos una cantidad y con base en eso el kilometraje del auto cambiará:

	<img src="/apuntes/python-desde-cero/img-376.webp" alt="Captura de los apuntes" width="692" height="389" loading="lazy" decoding="async">

	De esta manera los kilómetros cambiarán o aumentarán, siempre y cuando le ingresemos una cantidad positiva de kilómetros, ya que no tendría sentido el querer aumentar una cantidad negativa o menor a cero.

	Con esto el cambio se haría pero no lo visualizaríamos en pantalla al ejecutar el código, es por ello que ahora generaríamos un método el cual nos muestre por pantalla el kilometraje:

	<img src="/apuntes/python-desde-cero/img-377.webp" alt="Captura de los apuntes" width="760" height="710" loading="lazy" decoding="async">

	De esta manera, podremos observar que el objetivo de los atributos privados es que solo se pueda trabajar con ellos dentro de la clase y no fuera de ella, por ello el acceso a un atributo privado se hace un poco más complejo cuando se quiere hacer fuera de la clase, porque no deberías de hacerlo.

	Prácticamente, la idea de un atributo privado, es como crear un atributo que se desconoce para todo el programa fuera de la clase.

	**Métodos especiales**

	*\_\_str\_\_:*

	Empezaremos creando una clase *Libro*, donde inicialicemos un objeto con autor y  título, luego intentaremos imprimir el objeto que crearemos de la clase Libro:

	<img src="/apuntes/python-desde-cero/img-378.webp" alt="Captura de los apuntes" width="758" height="410" loading="lazy" decoding="async">

	De esta manera, al querer imprimir el objeto, lo que es retornado es la información de que en efecto estamos intentando imprimir un objeto.

	Aquí es donde entra el método especial *\_\_str\_\_*, que nos permite controlar el retornar algo específico al querer imprimir un objeto, por ende podremos retornar alguna cadena de texto específica la cual podremos imprimir:

	<img src="/apuntes/python-desde-cero/img-379.webp" alt="Captura de los apuntes" width="864" height="499" loading="lazy" decoding="async">

	De esta manera podremos controlar lo que será retornado al querer trabajar directamente con el objeto, en este caso nos retorna la cadena que hemos definido y la imprimimos para ver la información sobre este objeto en específico.

	Por ende, al trabajar con más objetos y querer imprimirlos, nos mostrará la información del objeto correspondiente:

	<img src="/apuntes/python-desde-cero/img-380.webp" alt="Captura de los apuntes" width="863" height="560" loading="lazy" decoding="async">

	**Método especial \_\_eq\_\_**

	Este método lo podemos utilizar para que directamente sea llamado en caso de querer definir comparaciones directas entre objetos, en donde se harán ciertas comparaciones de algunos atributos específicos que hayamos definido accediendo directamente a este si está definido, de lo contrario retornará algo, pero siempre será lo mismo al no estar definido.

	<img src="/apuntes/python-desde-cero/img-381.webp" alt="Captura de los apuntes" width="873" height="595" loading="lazy" decoding="async">

	De esta manera, al "igualar" ambos objetos en nuestro string a mostrar en pantalla, se manda a llamar a la función especial *\_\_eq\_\_*, donde tenemos definido que se reciben ambos objetos y esto retornara un valor booleano si el título y autor son iguales en ambos libros.

	Una forma que podría dejarnos más claro lo que se hace por detrás al comparar dos objetos *objeto1 \=\= objeto2*, es que se hace referenciando directamente a la clase y al método especial, donde como argumentos se pasan los objetos: *Clase.\_\_eq\_\_(objeto1, objeto2)*

	*Ejemplo aplicando encapsulamiento y métodos especiales:*

	Crearemos una clase *CuentaBancaria*, la cual como atributos tenga el número de cuenta, titular, como atributos públicos. El atributo saldo que se deberá inicializar en cero si no le es pasado ese argumento y lo pondremos como atributo privado.

	<img src="/apuntes/python-desde-cero/img-382.webp" alt="Captura de los apuntes" width="654" height="175" loading="lazy" decoding="async">

	Con esto ahora tendremos en mente crear los métodos *depositar_dinero*, *retirar_dinero* y *mostrar_dinero*.

	*Método depositar_dinero:*

	En este definiremos que incrementaremos el saldo actual solo si la cantidad que el usuario quiere ingresar en mayor a cero, de lo contrario imprimiremos un mensaje en pantalla de que es incorrecto.

	<img src="/apuntes/python-desde-cero/img-383.webp" alt="Captura de los apuntes" width="629" height="155" loading="lazy" decoding="async">

	*Método retirar_dinero:*

	Para tirar dinero, mantendremos el condicional que nos ayuda a verificar que la cantidad que se quiere retirar sea positiva, pero además tendremos que agregar uno donde nos retire el dinero solamente si la cantidad que vamos a retirar es menor al saldo actual en nuestra cuenta, por ende nunca podremos retirar más dinero del que tenemos en la cuenta y de intentarlo el programa nos lanzaría un mensaje.

	<img src="/apuntes/python-desde-cero/img-384.webp" alt="Captura de los apuntes" width="878" height="199" loading="lazy" decoding="async">

	*Método mostrar_dinero:*

	En este nos imprimirá el saldo actual en la cuenta mediante una cadena de texto para verlo de una mejor manera en pantalla.

	<img src="/apuntes/python-desde-cero/img-385.webp" alt="Captura de los apuntes" width="603" height="94" loading="lazy" decoding="async">

	Ahora, para verificar el funcionamiento de todo esto, crearemos un objeto de la clase y utilizaremos los métodos agregando dinero, retirando dinero e imprimiendo el saldo actual:

	<img src="/apuntes/python-desde-cero/img-386.webp" alt="Captura de los apuntes" width="651" height="284" loading="lazy" decoding="async">

	*Recibir múltiples argumentos en una sola variable:*

	Podremos recibir múltiples argumentos para un método o función de forma sencilla con un *\** y este será almacenado en una variable en forma de *tupla*, por lo que un ejemplo sería el siguiente, donde, después de inicializarlo, crearemos un método que nos muestre todas las frutas iterando en la tupla:

	<img src="/apuntes/python-desde-cero/img-387.webp" alt="Captura de los apuntes" width="667" height="578" loading="lazy" decoding="async">

	De esta manera, sin importar cuantos argumentos agreguemos, todos serán almacenados en el parámetro *items* gracias a que colocamos un asterisco antes y esto será almacenado en una tupla.

	Con base en esto, podríamos requerir de llegar a mostrar la longitud de nuestra tupla, pero claramente aquí no funcionaría hacer directamente uso del método *len()* sobre el objeto. Si bien podríamos hacerlo de forma indirecta generando un método solamente para eso, ya tenemos un método especial *\_\_len\_\_*, el cual nos puede ayudar a definir este comportamiento.

	<img src="/apuntes/python-desde-cero/img-388.webp" alt="Captura de los apuntes" width="695" height="199" loading="lazy" decoding="async">

	De esta manera, aprovechando el uso de este método especial, podremos hacer directamente *len()* sobre el objeto y esto llamará a la función *\_\_len\_\_* si está definida y retornará lo que nosotros le indiquemos, en este caso retornamos la longitud de la tupla, aplicándole directamente el método *len()* a la tupla.

	*Ejemplo con clase Pizza:*

	Crearemos una clase *Pizza* donde, como argumentos primeramente, le pasemos una longitud para la pizza en centímetros y después una serie de ingredientes que esta llevará:

	<img src="/apuntes/python-desde-cero/img-389.webp" alt="Captura de los apuntes" width="534" height="221" loading="lazy" decoding="async">

	Ahora, con un método *descripcion*, haremos que nos muestre en pantalla un mensaje con la longitud de la pizza, así como con el contenido de la tupla que son los ingredientes, pero con el uso del *' '.join()* hacemos que se nos muestre todo el contenido de la tupla separado por comas solamente.

	Recordemos que esto también lo llegamos a aplicar con los conjuntos, para tener una vista más limpia al momento de listar algún contenido.

	<img src="/apuntes/python-desde-cero/img-390.webp" alt="Captura de los apuntes" width="1357" height="501" loading="lazy" decoding="async">

	*Método especial \_\_getitem\_\_:*

	Si nosotros creáramos una clase en la cual tenemos una lista, podríamos acceder a sus índices de forma individual si referenciamos a la variable y a un índice en concreto:

	<img src="/apuntes/python-desde-cero/img-391.webp" alt="Captura de los apuntes" width="487" height="426" loading="lazy" decoding="async">

	Esto mismo podríamos aplicarlo pasando directamente al objeto el índice sin referenciar a la lista de forma directa, lo cual llamaría directamente al método especial *\_\_getitem\_\_* donde recibe el objeto como cualquier otro método  y el índice como si de un argumento se tratase, después tú defines referenciando a la lista y el índice como lo visto anteriormente y retornamos el dato correspondiente:

	<img src="/apuntes/python-desde-cero/img-392.webp" alt="Captura de los apuntes" width="497" height="482" loading="lazy" decoding="async">

	*Método especial \_\_call\_\_:*

	El método especial *\_\_call\_\_* nos puede servir para pasar un argumento al objeto también, ya que una vez creado un objeto, podremos después utilizar este objeto pasándole un argumento. Esto entrará en la función especial *\_\_call\_\_* y hará lo que nosotros deseemos definir con este argumento.

	En este caso crearemos una clase *Saludo* en esta definiremos constructor donde el saludo será un *hola*, con esto al crear nuestro objeto le pasaríamos un nombre, por lo que entraría al método especial *\_\_call\_\_* donde recibiremos este nombre y con el uso de self recuperaremos el *hola* y agregaremos el nombre al final para retornarlo e imprimirlo desde donde se llamó a la función especial:

	<img src="/apuntes/python-desde-cero/img-393.webp" alt="Captura de los apuntes" width="521" height="470" loading="lazy" decoding="async">

	*Método especial \_\_add\_\_:*

	Este método especial nos puede servir, por ejemplo, suponiendo que tenemos una clase *Punto* a la cual le pasamos como argumentos *x* y *y*, donde creamos dos objetos que tengan estos valores y queremos que para ambos objetos nos realice la suma de ambos en *x* y ambos en *y*:

	<img src="/apuntes/python-desde-cero/img-394.webp" alt="Captura de los apuntes" width="744" height="352" loading="lazy" decoding="async">

	Ahora mismo solo tenemos *self* como parámetro en nuestro método especial, pero al utilizar estos métodos recordemos que se le pasan ambos objetos, por lo que también tendríamos que recibir el segundo objeto, lo dejaremos como *otro* en este caso.

	Y aquí tendremos que indicar cómo sumar *x* y *y* de ambos objetos:

	<img src="/apuntes/python-desde-cero/img-395.webp" alt="Captura de los apuntes" width="782" height="389" loading="lazy" decoding="async">

	Aquí vemos que se realiza la suma de x con x, y con y para ambos objetos, pero de una forma un tanto interesante.

	Podríamos hacerlo y retornar una lista donde simplemente el índice 0 sea la suma de *x* y el 1 la suma de *y*, pero ya que tenemos la clase, la reutilizamos para generar una nueva instancia, la cual nos almacenará la suma de los objetos.

	De esta forma, ahora al imprimir el contenido, como no estamos retornando un string, sino un objeto, podremos ver cómo aquí requerimos del método especial *\_\_str\_\_*, ya que este nos viene bien al querer listar directamente un objeto:

	<img src="/apuntes/python-desde-cero/img-396.webp" alt="Captura de los apuntes" width="852" height="607" loading="lazy" decoding="async">

	De esta manera habremos creado una forma de sumar los dos puntos de dos objetos. Es importante mencionar que el objeto que se retorna al utilizar el operador *+*, sería como un objeto temporal en este caso, esto se debe a que nos es retornado un objeto y nosotros "imprimimos su contenido", pero en ningún momento lo estamos almacenando como los objetos que solemos crear, por ende al salir del print no habría forma de volver a referenciarlo, al menos de que lo almacenemos como al crear uno con *p3 = p1 + p2* y finalmente listemos en objeto *p3*.

	*Ejemplo final:*

	Vamos a crear un objeto de una clase, donde le pasaremos un valor y estaremos considerando que lo vamos a tratar como si de un iterable se tratase:

	<img src="/apuntes/python-desde-cero/img-397.webp" alt="Captura de los apuntes" width="257" height="205" loading="lazy" decoding="async">

	Nuestro constructor lo crearíamos como anteriormente, considerando que el valor que nos es pasado será el *límite*:

	<img src="/apuntes/python-desde-cero/img-398.webp" alt="Captura de los apuntes" width="349" height="124" loading="lazy" decoding="async">

	Para poder jugar con esto, tendríamos que convertir nuestro objeto a un iterable, por lo que aquí es donde utilizamos el método especial *\_\_iter\_\_*, donde este método devolverá un iterador que sería el propio objeto.

	Dentro de nuestro método especial *\_\_iter\_\_* tendremos que definir la inicialización de un contador para generar nuestro iterador, así como ya previamente definir que retornaremos el propio objeto:

	<img src="/apuntes/python-desde-cero/img-399.webp" alt="Captura de los apuntes" width="364" height="284" loading="lazy" decoding="async">

	Luego, utilizaremos un método especial *\_\_next\_\_*, el cual nos ayudara a definir que sucederá en cada iteración que realice el bucle, por lo que aquí definiremos un condicional que hará una funcionalidad similar a cuando termina el bucle *while*, ya que nuestro condicional verificara si el atributo contador es menor al atributo límite en cada iteración:

	<img src="/apuntes/python-desde-cero/img-400.webp" alt="Captura de los apuntes" width="471" height="388" loading="lazy" decoding="async">

	De esta forma, vamos a definir que cada que el atributo contador sea menor al atributo límite, nos aumente en uno el contador y nos retorne el contador, para que la reciba la variable *i* de nuestro bucle ya definido:

	<img src="/apuntes/python-desde-cero/img-401.webp" alt="Captura de los apuntes" width="468" height="570" loading="lazy" decoding="async">

	De esta manera ya nos funcionaría correctamente y nos imprimiría los valores uno a uno, pero aún nos faltará definir qué hará el *else*, ya que si este no lo colocamos, sería como si se estuviese iterando infinitamente, solo que sin que se cumpla el condicional.

	Aquí es donde lanzamos con *raise* una forma especial de en estos casos detener el iterador, de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-402.webp" alt="Captura de los apuntes" width="519" height="851" loading="lazy" decoding="async">

	Podríamos considerar una forma de entenderlo que al efectuar el bucle *for* entra al método especial *\_\_iter\_\_*, aquí aprovechando inicializamos nuestro contador y le retorna el mismo objeto al bucle con la capacidad de iterarlo. De ahí solo faltaría definir qué hace el objeto en cada iteración con *\_\_next\_\_*, que en este caso incrementamos el contador. (Así lo entendí yo :D)
