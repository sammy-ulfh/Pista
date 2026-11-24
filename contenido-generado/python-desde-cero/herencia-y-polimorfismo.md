---
curso: "python-desde-cero"
modulo: "python-desde-cero/objetos"
leccion: "herencia-y-polimorfismo"
titulo: "Herencia y polimorfismo"
orden: 21
minutos: 12.6
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 22
ejercicios: []
---

1. **Introducción**

	La herencia y polimorfismo son conceptos fundamentales en la programación orientada a objetos, que permiten la creación de una estructura de clases flexible y reutilizable.

	*Herencia:*

	Es un principio de la POO que permite a una clase heredar atributos y métodos de una clase, conocida como su clase base o superclase. La herencia facilita la reutilización de código y creación de una jerarquía de clases. Las subclases heredan las características de la superclase, lo que permite que se especialicen o modifiquen comportamientos existentes.

	*Polimorfismo:*

	Este concepto se refiere a la habilidad de objetos de diferentes clases de ser tratados como instancias de una clase común. El polimorfismo permite que una función o método interactúe con objetos de diferentes clases y los trate como si fueran del mismo tipo, siempre y cuando compartan la misma interfaz o método. Esto significa que el mismo método puede comportarse de manera diferentes en distintas clases, un concepto conocido como sobrecarga de métodos.

	Ambos, herencia y polimorfismo, son piedras angulares en la POO y son ampliamente utilizados para diseñar sistemas que son fácilmente extensibles y mantenibles.
	</br>
2. **Práctica:**

	*Herencia:*

	La herencia es la forma que tenemos de crear subclase de una clase base o superclase, lo que podríamos traducirlo a crear una copia directa de una clase base, la cual podremos modificar.

	Para tener más claro este concepto, empezaremos creando una clase *Animal*, donde su constructor definirá el atributo del nombre:

	<img src="/apuntes/python-desde-cero/img-349.webp" alt="Captura de los apuntes" width="353" height="197" decoding="async">

	De esta manera, estaríamos creando la clase Animal con su atributo *nombre*, donde  estamos creando dos objetos, *gato* y *perro* con un  nombre propio.

	Ahora crearíamos un método de hablar, pensando para que el gato diga "¡Miau!":

	<img src="/apuntes/python-desde-cero/img-350.webp" alt="Captura de los apuntes" width="551" height="552" loading="lazy" decoding="async">

	Aquí, al utilizar el método para *gato* y *perro* notaríamos un problema y es que para ambos se imprime MIAU, pero un gato dice GUAU.

	Teniendo esto, no sería algo escalable para, basándonos en el tipo de animal que estemos creando, el sonido que este haga sea distinto. Aquí es donde entra la herencia y, en lugar de tener creada de esta forma nuestro método *hablar*, lo que haríamos sería colocar *pass*:

	<img src="/apuntes/python-desde-cero/img-351.webp" alt="Captura de los apuntes" width="388" height="279" loading="lazy" decoding="async">

	De esta manera, sería como una indicación de que tendríamos que crear este método para subclases, definiendo así qué hará. Recordemos que *pass* nos permite generar una definición sin que esta haga nada para que no dé error.

	Entonces, el crearla sería como una definición de qué se tiene que crear en subclases con las indicaciones correspondientes.

	El decorador utilizado *@property*. Recordemos que lo utilizamos simplemente para poder llamar a un método como si de una propiedad o atributo se tratara, que sería sin utilizar los *()* ya que no le estamos pasando argumentos por el momento.

	*Aplicando la herencia:*

	Teniendo esto en cuenta, lo que haríamos sería crear dos clases que hereden los atributos y métodos de la clase base *Animal*:

	<img src="/apuntes/python-desde-cero/img-352.webp" alt="Captura de los apuntes" width="379" height="317" loading="lazy" decoding="async">

	De esta manera, la clase *Gato* y *Perro* ahora serían subclases de la clase *Animal* y tendrían exactamente los mismos atributos y métodos.

	Aquí lo que podremos hacer sería "modificar" un método creado. Esto solo lo modificaría para la subclase, pero el método en la clase principal seguiría siendo el mismo que contiene únicamente *pass*.

	<img src="/apuntes/python-desde-cero/img-353.webp" alt="Captura de los apuntes" width="489" height="410" loading="lazy" decoding="async">

	Ahora, la forma de crear el objeto también cambiará, ya que ahora en lugar de llamar directamente a la clase principal, llamaríamos a la subclase indicada y se podría decir que está de forma indirecta llama a la clase principal para crear el objeto, pero todos los métodos y atributos modificados o agregados en la subclase serán los que se aplicarán:

	<img src="/apuntes/python-desde-cero/img-354.webp" alt="Captura de los apuntes" width="458" height="228" loading="lazy" decoding="async">

	De esta manera, al llamar al método *hablar*, como la instancia se creó con la subclase correspondiente, retornarán lo esperado.

	Aquí podríamos jugar con *raise* para lanzar un error en caso de que se intente acceder al método *hablar* desde la clase principal, donde nos muestre un mensaje:

	<img src="/apuntes/python-desde-cero/img-355.webp" alt="Captura de los apuntes" width="1036" height="872" loading="lazy" decoding="async">

	De esta manera, al crear una instancia *nutria* de la clase principal, al acceder al método, vemos que nos lanza el error que generamos con el output indicado.

	*Polimorfismo:*

	Para implementar el polimorfismo tendremos que hacerlo de una forma un tanto distinta.

	Podríamos generar una función fuera de las clases, la cual reciba un objeto y, por ejemplo, en este caso, ejecutar el método *hablar* desde esta misma.

	<img src="/apuntes/python-desde-cero/img-356.webp" alt="Captura de los apuntes" width="1016" height="801" loading="lazy" decoding="async">

	Aquí modificamos el método *hablar* para que solo tenga lo que queremos que el animal vaya a decir, por ello mediante nuestra función *hacer_hablar* definimos que nos imprima en pantalla un texto donde basándose en el objeto que le fue pasado acceda al nombre y a este método, teniendo así el mismo output pero accediendo a la información del objeto desde una función. Lo cual sería emplear polimorfismo.

	Entonces, teniendo esto en cuenta, nuestra función puede acceder y trabajar con la información de estas clases.

	*Ejemplo con clase Automovil:*

	<img src="/apuntes/python-desde-cero/img-357.webp" alt="Captura de los apuntes" width="642" height="562" loading="lazy" decoding="async">

	De esta manera, estamos creando la clase *Automovil* en la que como atributos tenemos la marca y el modelo. En nuestro método *describir* buscamos mostrar una descripción del vehículo, pero al ser un coche y una moto, podría gustarnos que se mostrara qué tipo de automóvil es.

	¡Entonces aquí sería un buen caso de aplicar herencia y polimorfismo!

	<img src="/apuntes/python-desde-cero/img-358.webp" alt="Captura de los apuntes" width="594" height="231" loading="lazy" decoding="async">

	De esta forma creamos dos subclases que son heredadas de la clase base *Automovil* y modificamos para cada una de la forma correspondientes el método *describir*.

	Por ende, al crear los objetos, tendremos que referenciar a la subclase correspondiente:

	<img src="/apuntes/python-desde-cero/img-359.webp" alt="Captura de los apuntes" width="396" height="125" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-360.webp" alt="Captura de los apuntes" width="259" height="80" loading="lazy" decoding="async">

	Si quisiéramos hacerlo empleando polimorfismo, tendríamos que crear una función a la que le pasemos el objeto para acceder a las propiedades de estos y con estas imprimir lo que queremos:

	<img src="/apuntes/python-desde-cero/img-361.webp" alt="Captura de los apuntes" width="525" height="322" loading="lazy" decoding="async">

	De esta manera, estaríamos haciendo lo mismo, pero ahora empleando el polimorfismo gracias a la función accediendo a los valores mediante esta al recibir el objeto.

	*Ejemplo con clase Dispositivo:*

	Creamos nuestra clase principal *Dispositivo* con su constructor y un método *abstracto*, lo cual quiere decir que crearemos un método que no tendrá un contenido en la clase principal, podremos dejarlo definido con *pass* o agregar un error con *raise* para que nos retorne el mensaje de que tiene que ser definido en las subclases.

	<img src="/apuntes/python-desde-cero/img-362.webp" alt="Captura de los apuntes" width="996" height="247" loading="lazy" decoding="async">

	De esta forma, *escanear_vulnerabilidades*, sería un método abstracto.

	De esta forma, ahora podríamos crear subclases donde retornaríamos resultados de casos hipotéticos donde se haya escaneado un tipo de dispositivo en busca de vulnerabilidades:

	<img src="/apuntes/python-desde-cero/img-363.webp" alt="Captura de los apuntes" width="1566" height="657" loading="lazy" decoding="async">

	Con esto listo, podríamos empezar a crear nuestros objetos, donde, basándonos en el dispositivo, crearemos la instancia con la subclase correspondiente:

	Empezaremos creando un objetos para cada subclase y jugando con polimorfismo crearemos una función que, con base en el objeto que le pasemos, nos liste la información correspondiente en pantalla:

	<img src="/apuntes/python-desde-cero/img-364.webp" alt="Captura de los apuntes" width="593" height="276" loading="lazy" decoding="async">

	De esta manera podríamos para cada dispositivo acceder a su "escaneo de vulnerabilidades" y listarlo, listando el modelo antes.

	Lo cual, al efectuarlo para cada objeto, sería de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-365.webp" alt="Captura de los apuntes" width="1367" height="570" loading="lazy" decoding="async">

	Recordemos agregar la *f* en el string para setearlo correctamente con variables, métodos, funciones...

	De esta forma tendríamos todo de una forma mucho más organizada y que nos permitiría reutilizarlo para crear múltiples instancias de una misma subclase.

	*Pasar por el método de la clase base y subclase:*

	Cuando nosotros utilizamos la herencia, modificamos algunos métodos y, por ende, ya no se tiene en cuenta el que fue definido en la clase base, sino el nuevo que ahora está definido en la subclase.

	Esto lo podríamos ver mejor con el siguiente ejemplo:

	<img src="/apuntes/python-desde-cero/img-366.webp" alt="Captura de los apuntes" width="449" height="518" loading="lazy" decoding="async">

	De esta manera, estamos inicializando primeramente un objeto de la clase A con el constructor, por ello, nos muestra el mensaje de que se está inicializando.

	Luego creamos un objeto *b* desde la subclase B y esta es una herencia de la clase A, dentro de esta se modifica el constructor y, por ende, solo tendrá en cuenta el constructor dentro de la subclase, por lo que solo nos muestra que se está inicializando B.

	Podremos toparnos con casos donde nos interese que lo que esté definido en la clase base también se aplique, pasando por ese método, teniendo de esta manera que pase por el método de la clase base y por el método modificado de la subclase.

	Para ello tendremos que hacer uso de *super()* para forzar que pase por el método que tiene el mismo nombre en la clase base, a pesar de que fue modificado para ser aplicado en la subclase de forma distinta, teniendo como resultado que pasa por ambos:

	<img src="/apuntes/python-desde-cero/img-367.webp" alt="Captura de los apuntes" width="459" height="563" loading="lazy" decoding="async">

	Como es notable, con *super()*, tendremos que hacer referencia al método que nos interesa con el nombre, y efectuará el método de la forma en la que esté definida en la clase base.

	En este caso aplica dos cosas, porque entra en nuestro método para inicializar el objeto e imprime lo indicado para la subclase, pero como luego con super definimos que también ejecute el constructor de la clase base, por ello se imprimen los dos mensajes, porque estaría pasando por ambos constructores.

	*Jugando con super() de una forma más práctica:*

	<img src="/apuntes/python-desde-cero/img-368.webp" alt="Captura de los apuntes" width="498" height="521" loading="lazy" decoding="async">

	De esta manera, nuestra clase base está programada solamente para poder trabajar con un parámetro, pero en nuestra subclase estamos definiendo que puede trabajar con dos, por ello es reutilizado el constructor de nuestra clase principal para que asigne el primer valor y en nuestra subclase asignamos el segundo de forma directa.

	No tienen porque ser los constructores, realmente esto funcionaría con cualquier método.

	<img src="/apuntes/python-desde-cero/img-369.webp" alt="Captura de los apuntes" width="692" height="498" loading="lazy" decoding="async">

	De esta forma, en nuestro método *saludo()* de la subclase, estamos definiendo que se ejecute el método *saludo()* de la clase base y que el string que es retornado lo almacene en la variable *original*.

	Por ello, después imprimiremos en pantalla este string, agregándole que también se está haciendo el saludo desde B.

	*Ejemplo más práctico:*

	<img src="/apuntes/python-desde-cero/img-370.webp" alt="Captura de los apuntes" width="930" height="652" loading="lazy" decoding="async">

	De esta manera modificamos los métodos existentes en la clase base para que sean distintos en la subclase, pero también reutilizamos los de la clase base para que nos almacene el nombre y edad, así como para recuperar el mensaje de quién es y la edad que tiene.
