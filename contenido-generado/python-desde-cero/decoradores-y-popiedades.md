---
curso: "python-desde-cero"
modulo: "python-desde-cero/objetos"
leccion: "decoradores-y-popiedades"
titulo: "Decoradores y popiedades"
orden: 23
minutos: 19.4
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 41
ejercicios: []
---

1. **Introducción:**

	*Decoradores:*

	Los decoradores en Python son una forma elegante de modificar las funciones o métodos. Se utilizan para extender o alterar el comportamiento de la función sin cambiar su código fuente. Un decorador en si mismo es una función que toma otra función como argumento y devuelve una nueva función que, opcionalmente, puede agregar una funcionalidad antes y después de la función original.

	*Propiedades:*

	Las propiedades son un caso especial de decoradores que permiten a los desarrolladores añadir *getter*,  *setter*  y *deleter* a los atributos de una clase de manera elegante, controlando así el acceso y modificación de los datos.

	En Python esto se logra con el decorador *@property*, que transforma un metodo para acceder a un atributo como si fuera un atributo público.

	*Getter y Setters:*

	* El *getter* obtiene un valor de un atributo manteniendo el encapsulamiento y permitiendo que se ejecute una lógica adicional durante el acceso.
	* El *setter* establece el valor de un atributo y puede incluir validación o procesamiento antes de que el cambio se refleje en el estado interno del objeto.
	* El *deleter* puede ser utilizado para definir un comportamiento cuando cuando un atributo es eliminado con *del*.

	Es importante saber cómo los decoradores pueden ser aplicados no solo para métodos y propiedades, sino también para funciones en general. También exploraremos cómo las propiedades se pueden utilizar para crear una interfaz pública para atributos privados/protegidos, mejorando la encapsulación y manteniendo la integridad de los datos de una clase.
	</br>
2. **Práctica:**

	*Decoradores:*

	Para estos ejemplos se emplearán directamente funciones y no clases, para que quede un poco más claro.

	Nosotros tenemos la posibilidad de crear decoradores para funciones. La forma en la que funcionan es que nos permiten alterar el comportamiento que vaya a tener una función o clase, sin alterar el código de esa función, si no tener la capacidad de agregar otras funcionalidades en su ejecución.

	Primeramente, crearemos una función *Saludo* que nos imprima por pantalla un mensaje:

	<img src="/apuntes/python-desde-cero/img-403.webp" alt="Captura de los apuntes" width="595" height="153" decoding="async">

	De esta forma, tendríamos un código sencillo que nos imprimiría por pantalla el mensaje indicado. Pero también podremos crear un decorador propio, el cual se definirá como si de una función se tratase y se utilizara con la función *Saludo* tal como se utilizan los decoradores que hemos visto para los métodos de clases:

	Es importante mencionar que a las funciones que son decoradores se les llama *Función de orden superior*.

	<img src="/apuntes/python-desde-cero/img-404.webp" alt="Captura de los apuntes" width="608" height="260" loading="lazy" decoding="async">

	La idea es que dentro de nuestra función de orden superior va a haber un tipo de envoltura, ya que dentro de esta se creará una nueva función, la cual se puede llamar como deseemos, pero para un mayor entendimiento, le llamaremos *envoltura* y esta retornará *envoltura*, ya que así se debe definir para su funcionamiento correcto:

	<img src="/apuntes/python-desde-cero/img-405.webp" alt="Captura de los apuntes" width="607" height="279" loading="lazy" decoding="async">

	Ahora, la idea aquí es que nuestra función de orden superior debe tener un parámetro, ya que este hará directamente referencia a nuestra función a la que se esté aplicando el decorador y esta misma nos permitirá que realmente ahora nuestra función *envoltura* ahora pase a ser prácticamente la función *Saludo*, ya que será la que se ejecute en lugar de *Saludo*.

	Con esto en mente, podremos definir lo que sea que queramos que se ejecute y luego referenciar a nuestro parámetro el cual realmente es la función *Saludo* original, por lo que al efectuar *funcion()* se ejecuta directamente, lo que nos permite efectuar acciones antes y después de una funcion ya definida:

	<img src="/apuntes/python-desde-cero/img-406.webp" alt="Captura de los apuntes" width="1046" height="563" loading="lazy" decoding="async">

	El retorno de la envoltura tendrá que ser dentro de la función de orden superior y no dentro de la propia envoltura o dará error.

	Por lo que con esta función *Saludo*, hemos expandido su funcionalidad gracias a un decorador que hemos creado.

	*Propiedades:*

	Cuando creamos una propiedad en Python con el decorador *@property*, tenemos algo llamado *getters y setter* lo cual es muy importante en el ámbito de las clases, ya que nos permite tener un mejor control sobre nuestros atributos.

	Para una práctica con esto, crearemos una clase *Persona* de la cual podremos crear objetos con los atributos, nombre y edad.

	Pero en la hora de realizar las asignaciones en nuestro constructor, vamos a definir estos atributos como protegidos:

	<img src="/apuntes/python-desde-cero/img-407.webp" alt="Captura de los apuntes" width="409" height="243" loading="lazy" decoding="async">

	Entonces aquí, si bien es posible poder modificar el contenido de los atributos fuera de la clase, a pesar de ser protegidos. No es una buena práctica, y con programadores que ya tengan más nivel sería un error fatal.

	Entonces, si llegáramos a querer modificar estos valores fuera de la clase, aquí es donde entran en juego las propiedades y los *getters* y *setters*.

	Estos se definen como propiedades, principalmente el *getter* el cual nos servirá para llamar desde fuera de la funcion y dentro de la funcion como un método lo que hará será acceder al atributo protegido y nos lo retornara, de esta manera ahora si estaría correcto aplicarlo porque se accede al atributo de forma directa dentro de la funcion y se retorna su valor:

	<img src="/apuntes/python-desde-cero/img-408.webp" alt="Captura de los apuntes" width="867" height="760" loading="lazy" decoding="async">

	De esta manera, estamos definiendo primero nuestro getter el cual solo nos retorna la información que contiene el atributo protegido *edad* y después se crea el setter con el decorador *\@edad.setter* y este lo que nos permite es reasignar el valor de este atributo protegido.

	En el setter lo que hacemos es verificar que el valor que se le quiere asignar como edad sea mayor a cero, de lo contraria nos lanzará una excepción de *ValueError* con el mensaje correspondiente.  
  
	De esta manera ya podríamos manejar de forma sencilla desde fuera de la clase el contenido del atributo protegido, teniendo buenas prácticas en nuestro código basándonos en el convenio de Python.

	Por lo que si ingresamos una "edad" negativa, esto nos lanzaría la excepción creada:

	<img src="/apuntes/python-desde-cero/img-409.webp" alt="Captura de los apuntes" width="953" height="814" loading="lazy" decoding="async">

	Por ende ahora sabemos de una buena práctica con base en *propiedades* para trabajar con los atributos protegidos y privados de una clase, ya que acceder a estos de forma directa desde fuera de la clase, se puede considerar una mala práctica.

	*Ejemplo con decoradores y la librería time:*

	Primeramente, importaremos la librería *time*:

	<img src="/apuntes/python-desde-cero/img-410.webp" alt="Captura de los apuntes" width="259" height="79" loading="lazy" decoding="async">

	Esta nos servirá en este caso para hacer lo mismo que en bash cuando queremos que el script espere ciertos segundos, lo cual logramos con *time.sleep(segundos)*

	Teniendo esto en cuenta, crearemos dos funciones, una que espere un tiempo corto y otra que espere más tiempo:

	<img src="/apuntes/python-desde-cero/img-411.webp" alt="Captura de los apuntes" width="333" height="433" loading="lazy" decoding="async">

	De esta manera queda en espera en total 3 segundos, ya que entre ambas funciones definimos que sean 3 segundos, 2 en una y 1 en otra.

	Solo veremos el cursor y podremos pensar que no sabemos que está sucediendo, por así decirlo. Entonces aquí podríamos aplicar decoradores.

	De esta manera, teniendo en cuenta la estructura, vamos a crear un decorador "cronometro" el cual recibirá la función a la que se esté aplicación y en nuestra envoltura será llamada, pero realizando una modificación para cambiar el comportamiento:

	<img src="/apuntes/python-desde-cero/img-412.webp" alt="Captura de los apuntes" width="277" height="450" loading="lazy" decoding="async">

	Ahora, antes de continuar. Para generar nuestro decorador cambiando el comportamiento de la función original, vamos a trabajar con la librería *time* y jugaremos con *time.time()*

	Si ejecutáramos esto en Python, nos retorna cierto tiempo representado en segundos. Este tiempo sé el tiempo que ha pasado desde cierto punto en el tiempo como referencia, lo que quiere decir que es el tiempo que ha pasado desde cierto año tomado como referencia, representado en segundos. A este punto de referencia se le conoce como *epoch* y la fecha de este es el 1 de enero de 1970.

	<img src="/apuntes/python-desde-cero/img-413.webp" alt="Captura de los apuntes" width="225" height="75" loading="lazy" decoding="async">

	De esta manera, podríamos tener el tiempo en el que se inicia el "cronometro" y almacenarlo y una vez se detiene, podremos almacenar ese tiempo final y restarle el tiempo inicial, de esta manera podríamos representar el tiempo que ha transcurrido:

	<img src="/apuntes/python-desde-cero/img-414.webp" alt="Captura de los apuntes" width="286" height="125" loading="lazy" decoding="async">

	Con esto en mente, ahora podríamos definir en nuestra envoltura  un inicio antes de ejecutar nuestra función original y un final cuando se ha terminado de ejecutar.

	Para representar el tiempo transcurrido podremos mostrar un mensaje en pantalla, además podremos referenciar directamente a la función para obtener el nombre de esta con *funcion.\_\_name\_\_*, de esta manera nos quedaría lo siguiente:

	<img src="/apuntes/python-desde-cero/img-415.webp" alt="Captura de los apuntes" width="1056" height="678" loading="lazy" decoding="async">

	Como podremos observar, el tiempo transcurrido no es exactamente 1 segundo o 2 segundos, ya que siempre habrá algunos milisegundos de por medio cada vez que utilicemos un sleep y no siempre serán los mismos:

	<img src="/apuntes/python-desde-cero/img-416.webp" alt="Captura de los apuntes" width="744" height="211" loading="lazy" decoding="async">

	Ahora, ¿Qué pasaría si en lugar de que el sleep sea directamente *1*, lo definimos para que se le pueda pasar un argumento y este pueda ser el número que deseemos?

	<img src="/apuntes/python-desde-cero/img-417.webp" alt="Captura de los apuntes" width="301" height="173" loading="lazy" decoding="async">

	Si estuviésemos empleando solamente las funciones sin decoradores, esto no sería un problema. Como estamos utilizando decoradores, nuestra envoltura también tendrá que tener en cuenta este argumento para al momento de llamar la función pasárselo y funcionar correctamente, por lo que tendríamos que definirlo en nuestra envoltura (puede ser con otro nombre) y pasárselo a la llamada de nuestra función original:

	<img src="/apuntes/python-desde-cero/img-418.webp" alt="Captura de los apuntes" width="280" height="96" loading="lazy" decoding="async">

	De esta manera ahora nosotros podríamos pasarle los segundos que deseemos como argumento al momento de llamar cada función y funcionaria de la misma manera:

	<img src="/apuntes/python-desde-cero/img-419.webp" alt="Captura de los apuntes" width="1047" height="697" loading="lazy" decoding="async">

	*Recibir múltiples valores de clave-valor:*

	Como ejemplo rápido, sin ninguna funcionalidad. Sabemos qué podremos pasar múltiples argumentos cuando definimos nuestro parámetro con un *\** al inicio:

	<img src="/apuntes/python-desde-cero/img-420.webp" alt="Captura de los apuntes" width="329" height="490" loading="lazy" decoding="async">

	De esta manera, aquí lo importante es fijarnos en la definición de nuestro parámetro, teniendo la capacidad de recibir múltiples argumentos y en los argumentos que le estamos pasando.

	Pero también tendremos la posibilidad de pasarle múltiples valores de *clave-valor*, tal como si fuese un diccionario y esto se representa con *\*\**:

	<img src="/apuntes/python-desde-cero/img-421.webp" alt="Captura de los apuntes" width="591" height="510" loading="lazy" decoding="async">

	De esta manera, podríamos trabajar con *\*\*kwargs* dentro de la función como si estuviésemos tratando a un diccionario.

	Ademas, es posible incluso colocar ambos y esto lo que querrá decir es que la función tiene la posibilidad de recibir múltiples argumentos o múltiples valores de clave-valor:

	<img src="/apuntes/python-desde-cero/img-422.webp" alt="Captura de los apuntes" width="590" height="485" loading="lazy" decoding="async">

	De esta manera podría funcionar si se le pasan múltiples argumentos o múltiples valores de clave-valor.

	*Ejemplo de cuando utilizar \*args:*

	<img src="/apuntes/python-desde-cero/img-423.webp" alt="Captura de los apuntes" width="393" height="397" loading="lazy" decoding="async">

	Aquí, mediante el uso de una función pasándole varios argumentos, estamos viendo como *args* se convierte en una tupla que almacena todos estos valores.

	De esta manera, ahora podríamos aprovechar el método que tiene Python *sum* para retornar la suma de todos estos valores e imprimirla:

	<img src="/apuntes/python-desde-cero/img-424.webp" alt="Captura de los apuntes" width="498" height="308" loading="lazy" decoding="async">

	De esta manera, en casos así es cuando utilizaremos los \*args para recibir múltiples argumentos.

	*Ejemplo de cuando utilizar \*\*kwargs:*

	Ahora vamos a crear una función *presentacion*, para realizar un tipo de presentacion de alguna persona, pasándole los pares de clave-valor para que con el uso de \*\*kwargs sean almacenados en un diccionario y podremos ver que es así imprimiendo el tipo de dato, así como el contenido:

	<img src="/apuntes/python-desde-cero/img-425.webp" alt="Captura de los apuntes" width="1056" height="418" loading="lazy" decoding="async">

	De esta manera, al saber que es un diccionario podríamos representar de mejor forma todo este contenido, iterando en el diccionario:

	<img src="/apuntes/python-desde-cero/img-426.webp" alt="Captura de los apuntes" width="1062" height="408" loading="lazy" decoding="async">

	*Ejemplo anterior con time:*

	Entonces, regresando al primer ejemplo que realizamos con time, sin pasar ningún argumento realmente podríamos tener estas definiciones e incluso sería mejor, ya que en cara a un momento en el que le queramos pasar múltiples argumentos o múltiples pares de clave-valor, estaría listo para recibir uno u otro, o simplemente no recibir ninguno y trabajar como ya está sin problema, lo cual lo haría más escalable:

	<img src="/apuntes/python-desde-cero/img-427.webp" alt="Captura de los apuntes" width="1110" height="697" loading="lazy" decoding="async">

	De esta manera, un ejemplo con esto podría ser el pasarle varios argumentos e imprimir la tupla, por ejemplo:

	<img src="/apuntes/python-desde-cero/img-428.webp" alt="Captura de los apuntes" width="1106" height="733" loading="lazy" decoding="async">

	De esta manera estamos agregando esta funcionalidad en el decorador, no nos da error, ya que estamos imprimiendo directamente la variable y podrá imprimirnos la tupla vacía, pero sí accediéramos a posiciones y esta no existen (en el caso de no pasar argumentos), entonces si daría un error.

	Ahora, si quisiéramos agregar diversos argumentos de pares de clave-valor, también funcionaria:

	<img src="/apuntes/python-desde-cero/img-429.webp" alt="Captura de los apuntes" width="1110" height="733" loading="lazy" decoding="async">

	Ahora si quisiéramos un print de una clave específica, funcionaria si le pasamos un valor con esa clave, de lo contraria daría error:

	<img src="/apuntes/python-desde-cero/img-430.webp" alt="Captura de los apuntes" width="1114" height="845" loading="lazy" decoding="async">

	En este caso, al ser un diccionario, podríamos arreglar este error fácilmente, donde indicaremos que el que nos muestre el contenido de la clave *nombre* solo lo realice si este existe:

	<img src="/apuntes/python-desde-cero/img-431.webp" alt="Captura de los apuntes" width="1109" height="748" loading="lazy" decoding="async">

	*Es posible incluso recibir tanto múltiples argumentos sencillos, como múltiples argumentos que sean pares de clave-valor al mismo tiempo.*

	<img src="/apuntes/python-desde-cero/img-432.webp" alt="Captura de los apuntes" width="516" height="62" loading="lazy" decoding="async">

	De esta manera, Python automáticamente lo organizara y ordenara en su respectivo tipo de dato, tanto en la tupla como en el diccionario sin problemas, y si en nuestro decorador imprimiéramos ambos, funcionaria sin problemas:

	<img src="/apuntes/python-desde-cero/img-433.webp" alt="Captura de los apuntes" width="1106" height="835" loading="lazy" decoding="async">

	Entonces, ahora, para que no nos muestre nada en caso de que amabas estén vacías, lo que podríamos hacer es una comprobación con el *if* donde le pasemos directamente la tupla o diccionario y automáticamente verificara si tiene contenido o no:

	<img src="/apuntes/python-desde-cero/img-434.webp" alt="Captura de los apuntes" width="192" height="128" loading="lazy" decoding="async">

	O de una forma más compactada:

	<img src="/apuntes/python-desde-cero/img-435.webp" alt="Captura de los apuntes" width="214" height="79" loading="lazy" decoding="async">

	Dejandonos un output mas limpio:

	<img src="/apuntes/python-desde-cero/img-436.webp" alt="Captura de los apuntes" width="812" height="128" loading="lazy" decoding="async">

	*Ejemplo final con clase Circunferencia:*

	Empezaremos creando una clase *Circunferencia*, de la cual para crear un objeto tendremos en cuenta que le pasaremos el radio de este mismo:

	<img src="/apuntes/python-desde-cero/img-437.webp" alt="Captura de los apuntes" width="327" height="180" loading="lazy" decoding="async">

	Como vamos a trabajar con getters y setters, así como también vamos a tener en cuenta que queremos saber el radio, diámetro y el área, entonces definiremos nuestro radio como atributo protegido:

	<img src="/apuntes/python-desde-cero/img-438.webp" alt="Captura de los apuntes" width="310" height="78" loading="lazy" decoding="async">

	Por ende, ahora configuraríamos el getter y setter para nuestro atributo *radio*:

	<img src="/apuntes/python-desde-cero/img-439.webp" alt="Captura de los apuntes" width="339" height="172" loading="lazy" decoding="async">

	Y ahora configuraríamos *getters* para poder recuperar el diámetro y el área:

	<img src="/apuntes/python-desde-cero/img-440.webp" alt="Captura de los apuntes" width="477" height="166" loading="lazy" decoding="async">

	De esta manera ahora podríamos solicitar cada uno de estos:

	<img src="/apuntes/python-desde-cero/img-441.webp" alt="Captura de los apuntes" width="610" height="872" loading="lazy" decoding="async">

	O incluso, gracias a *getter*, cambiar el valor de nuestro atributo protegido *radio* y volver a calcular el diámetro y el área:

	<img src="/apuntes/python-desde-cero/img-442.webp" alt="Captura de los apuntes" width="749" height="431" loading="lazy" decoding="async">

	Incluso, como vemos que nos muestra muchos decimales a la hora de calcular el *area*, para evitar esto podríamos utilizar *round()*, a este le tendremos que pasar como primer argumento el valor con los decimales y el segundo cuantos decimales deseamos mostrar (en este caso 2):

	<img src="/apuntes/python-desde-cero/img-443.webp" alt="Captura de los apuntes" width="369" height="135" loading="lazy" decoding="async">
