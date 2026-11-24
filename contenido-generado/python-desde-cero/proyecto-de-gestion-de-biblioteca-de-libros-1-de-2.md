---
curso: "python-desde-cero"
modulo: "python-desde-cero/proyectos"
leccion: "proyecto-de-gestion-de-biblioteca-de-libros-1-de-2"
titulo: "Proyecto de gestión de biblioteca de libros (1 de 2)"
orden: 30
minutos: 6.7
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 13
ejercicios: []
---

1. **Introducción**

	En este proyecto inicial, se desarrollara un sistema de gestión para una biblioteca.

	Este sistema nos permitirá agregar nuevos libros a la biblioteca y gestionar el préstamo de estos. A través de la creación de este sistema, aplicaremos de manera práctica los fundamentos de la Programación Orientada a Objetos (POO), haciendo especial énfasis en conceptos clave como herencia y polimorfismo. Diseñaremos clases para representar diferentes aspectos de una biblioteca, como libros, miembros y transacciones de préstamo.
	</br>
2. **Práctica**

	*Shebang:*

	Primero comenzaremos creando un archivo y colocando nuestro shebang para que en todo momento el propio script indique con qué lenguaje debe ejecutarse en caso de que no se indique directamente al ejecutarse:

	<img src="/apuntes/python-desde-cero/img-577.webp" alt="Captura de los apuntes" width="250" height="49" decoding="async">

	*Comprobación del módulo y contemplación del objeto:*

	Recordemos que con la variable que ya nuestro módulo tiene contemplada *\_\_name\_\_*, podremos comprobar si el script o módulo se está ejecutando directamente, y aquí definiremos las cosas que haremos, porque de no ser el script que se ejecute directamente no debería efectuarse nada.

	Entonces aquí, además, contemplaremos nuestra instancia de la clase *Libro* que estaremos creando y a esta tendremos contemplado pasarle como argumentos id (identificador del libro), autor (nombre del autor) y título (título del libro). Trataremos que, conforme se creen instancia, el identificador sea incremental, por lo que deberá ir aumentando en uno.

	<img src="/apuntes/python-desde-cero/img-578.webp" alt="Captura de los apuntes" width="755" height="134" loading="lazy" decoding="async">

	*Creación de la clase:*

	Con esto en mente crearíamos nuestra clase *Libro*, así como su constructor, que deberá tener los parámetros *id_libro*, *autor*, *nombre_libro* y, al estar en el constructor, deberemos asignarle los atributos a nuestro objeto.

	Además, pensando en la posibilidad de prestar libros que le asignaremos, más que asignarlo como parámetro en nuestro constructor, directamente vamos a crear el atributo y asignarle un valor booleano *False*, ya que al inicio ningún libro estará prestado.

	<img src="/apuntes/python-desde-cero/img-579.webp" alt="Captura de los apuntes" width="593" height="208" loading="lazy" decoding="async">

	*Método \_\_str\_\_:*

	A nivel de representación de nuestro objeto para una cadena de texto, utilizaremos este método especial, para al querer mostrarlo directamente con un *print()*, nos dé la información correspondiente:

	<img src="/apuntes/python-desde-cero/img-580.webp" alt="Captura de los apuntes" width="857" height="605" loading="lazy" decoding="async">

	De esta manera, nos regresaría la información en forma de una cadena de texto que hemos seteado de esta manera, para que se muestre como cuando creamos un objeto.

	*Clase Biblioteca:*

	Ahora, los libros son almacenados o están en una biblioteca, por lo que debajo de nuestra clase *Libro*, crearemos nuestra clase *Biblioteca*, de la que en su constructor definiremos un diccionario el cual almacenara todos los libros que estén disponibles en la biblioteca, por lo que no deberán de estar prestados.

	Nuestro constructor no recibirá ningún argumento e inicializaremos un diccionario vacío, en el cual tendremos en mente que le meteremos un identificador  como clave y el propio libro (objeto) como valor.

	Además, tendremos en mente la creación de nuestra instancia de la clase *Biblioteca*, antes de crear los libros:

	<img src="/apuntes/python-desde-cero/img-581.webp" alt="Captura de los apuntes" width="752" height="276" loading="lazy" decoding="async">

	Teniendo en cuenta la estructura que tendremos para el almacenamiento de los libros, consideraremos el método *agregar_libro*, por lo que tendremos que crearlo.

	Por lo que lo definiremos de la siguiente forma:

	<img src="/apuntes/python-desde-cero/img-582.webp" alt="Captura de los apuntes" width="398" height="302" loading="lazy" decoding="async">

	De esta manera, tengamos en cuenta que con *self* hacemos referencia al propio objeto *biblioteca*, el cual es una instancia de nuestra clase *Biblioteca* y por ello como argumento le pasamos nuestra instancia de la clase *Libro*.

	Para agregar un nuevo libro, lo que haremos será primeramente definir una condición, ya que solo agregaremos el libro si este no se encuentra en nuestra librería, por ende verificaremos si nuestro libro no se encuentra en la biblioteca, con el identificador del mismo libro:

	<img src="/apuntes/python-desde-cero/img-583.webp" alt="Captura de los apuntes" width="420" height="84" loading="lazy" decoding="async">

	De esta manera, una vez verifiquemos que este libro no esté en la biblioteca, quiere decir que podremos almacenarlo y, por ende lo almacenaremos.
	En caso de no poder almacenar el libro porque ya esté existente, retornaremos un mensaje por pantalla.

	<img src="/apuntes/python-desde-cero/img-584.webp" alt="Captura de los apuntes" width="849" height="125" loading="lazy" decoding="async">

	Ahora, para poder ver en algún momento los libros que se encuentran en la biblioteca, entonces definiremos un método que nos los mostrará, pero en este utilizaremos el decorador *@property* para no utilizar los paréntesis al llamarlo.

	Para realizar esto, vamos a hacerlo con una lista de comprensión, en la cual cuál iteraremos sobre todos los valores del diccionario (donde están los objetos de cada libro) y vamos a retornar el objeto solamente si el atributo *esta_prestado* es falso, ya que esto querrá decir que el libro no está prestado y por ende está físicamente en la biblioteca:

	<img src="/apuntes/python-desde-cero/img-585.webp" alt="Captura de los apuntes" width="816" height="90" loading="lazy" decoding="async">

	Con esto definido podremos ejecutar nuestro método:

	<img src="/apuntes/python-desde-cero/img-586.webp" alt="Captura de los apuntes" width="1175" height="124" loading="lazy" decoding="async">

	Aquí nos muestra la información del objeto. Recordemos que esto sucede, ya que a nivel de representación cuando un objeto está dentro de otros tipos de datos, para que nos represente información tenemos el método especial *\_\_repr\_\_*, por lo que tendremos que definirlo en nuestra clase *Libro*.

	Aquí aprovechando que ya tendríamos una forma de mostrar la información con *\_\_str\_\_*, pues llamaríamos a la función para reutilizarla y tendría el mismo efecto, pero ahora para representarlo para listarlo de esta manera:

	<img src="/apuntes/python-desde-cero/img-587.webp" alt="Captura de los apuntes" width="762" height="139" loading="lazy" decoding="async">

	Finalmente, como código y resultado tendríamos:

	<img src="/apuntes/python-desde-cero/img-588.webp" alt="Captura de los apuntes" width="903" height="898" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-589.webp" alt="Captura de los apuntes" width="1438" height="112" loading="lazy" decoding="async">
