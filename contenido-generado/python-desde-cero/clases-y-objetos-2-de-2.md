---
curso: "python-desde-cero"
modulo: "python-desde-cero/objetos"
leccion: "clases-y-objetos-2-de-2"
titulo: "Clases y objetos (2 de 2)"
orden: 18
minutos: 11.8
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 20
ejercicios: []
---

1. **Introducción**

	Dentro del paradigma de la Programación Orientada a Objetos en Python, existen conceptos avanzados como los decoradores, métodos de clase y métodos estáticos que enriquecen y expanden las posibilidades de cómo insteractuamos con las clases y sus instancias.

	*Decoradores:*

	Los decoradores son una herramienta poderosa en Python que permiten modificar el comportamiento de una función o método. Funcionan como "envoltorios", que agregan funcionalidad antes y después del método o función decorada sin cambiar su código fuente. En POO, los decoradores son frecuentemente utilizados para agregar funcionalidades de manera dinámica a los métodos, como la sincronización de hilos, la memorización de resultados o la verificación de permisos.

	*Métodos de Clase:*

	Un método de clase es un método que está ligado a la clase y no a una instancia de la clase. Esto significa que el método puede ser llamado sobre la clase misma, en lugar de sobre un objeto de la clase. Se definen utilizando el decorador *@classmethod* y su primer argumento es siempre una referencia a la clase, convencionalmente llamada *cls*. Los métodos de la clase son utilizados a menudo para definir métodos "factory" que pueden crear instancias de la clase de diferentes maneras.

	*Métodos Estáticos:*

	Los métodos estáticos, definidos con el decorador *@staticmethod*, no reciben una referencia implícita ni a la instancia (self) ni a la clase (cls). Son básicamente como funciones regulares, pero pertenecen al espacio de nombres de la clase. Son útiles cuando queremos realizar alguna funcionalidad que está relacionada con la clase, pero no requiere acceder a la instancia o a los atributos de clase.
	</br>
2. **Práctica**

	Ahora crearemos una clase *Rectangulo*, donde a ese objeto correspondiente se le van a asignar los atributos *ancho* y *alto*, los cuales le pasaremos al crear una instancia.

	Esto lo podremos necesitar, por ejemplo, para realizar un cálculo como el área de un rectángulo.

	<img src="/apuntes/python-desde-cero/img-300.webp" alt="Captura de los apuntes" width="404" height="207" decoding="async">

	Con esto, podríamos crear un método simple para nuestro cálculo del área y que este sea retornado para mostrarlo en pantalla:

	<img src="/apuntes/python-desde-cero/img-301.webp" alt="Captura de los apuntes" width="673" height="496" loading="lazy" decoding="async">

	Teniendo los métodos de esta forma se llaman como si de una función se tratase, ya que se le agregan los paréntesis, ya que recordemos que a la clase se le pasa el objeto y se recibe mediante el uso de *self*.

	Recordemos que podremos acceder a los atributos del objeto simplemente colocándolo después del punto. Para nuestro método podríamos llegar a hacer exactamente lo mismo gracias al decorador *@property*, que se utiliza de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-302.webp" alt="Captura de los apuntes" width="654" height="517" loading="lazy" decoding="async">

	Esto nos permitiría llamarlo como si de un atributo se tratase.

	**Imprimiendo un objeto y modificando el output:**

	Es posible imprimir un objeto pasándolo simplemente por un print. Esto nos mostrará en pantalla la información de que es un objeto:

	<img src="/apuntes/python-desde-cero/img-303.webp" alt="Captura de los apuntes" width="520" height="497" loading="lazy" decoding="async">

	Este es un output que se nos da al querer imprimir un objeto, pero podremos cambiar o manejar lo que se muestre gracias a un método especial, el cual es *\_\_str\_\_*:

	<img src="/apuntes/python-desde-cero/img-304.webp" alt="Captura de los apuntes" width="1041" height="607" loading="lazy" decoding="async">

	De esta forma retornamos un mensaje que nosotros definamos y con esto ahora, en lugar de mostrar cierta información del objeto, mostrara la información deseada.

	Por lo que con esto podríamos mostrar las propiedades del rectángulo y después calcular su área:

	<img src="/apuntes/python-desde-cero/img-305.webp" alt="Captura de los apuntes" width="1060" height="648" loading="lazy" decoding="async">

	**Comparaciones entre objetos con el método especial \_\_eq\_\_:**

	Nosotros podremos hacemos comparaciones entre objetos con el operador *\=\=*:

	<img src="/apuntes/python-desde-cero/img-306.webp" alt="Captura de los apuntes" width="305" height="112" loading="lazy" decoding="async">

	Esto a simple vista parecerá que funciona, pero incluso al tener los mismos datos, esto nos retornará *Flase*. Esto es porque aún no definimos nuestro método especial para manejar este y lo definiríamos con *\_\_eq\_\_*:

	<img src="/apuntes/python-desde-cero/img-307.webp" alt="Captura de los apuntes" width="1034" height="682" loading="lazy" decoding="async">

	De esta manera, al realizar la comparativa entre dos objetos, se manda llamar directamente el método especial *\_\_eq\_\_* y nos regresará *True* o *False* de acuerdo con la comprobación que estamos realizando, ya que comparamos si los atributos de ambos objetos son iguales.

	Lo que hace el hecho de colocar una igualdad entre ambos objetos, es mandarlos a ambos como argumentos a nuestro método especial y, por ende, *self* y *otro*, son nuestros dos objetos de rectángulo.

	**Para otro ejemplo, creando la clase Libro:**

	Empezaremos definiendo nuestra clase, así como nuestro constructor para asignar el título, autor y precio.

	<img src="/apuntes/python-desde-cero/img-308.webp" alt="Captura de los apuntes" width="749" height="283" loading="lazy" decoding="async">

	Con esto ahora podríamos ver un ejemplo en el cual no es necesario pasar nuestro objeto, ya que no vamos a referenciar a nuestros atributos, sabemos que cuando tenemos un método al llamarlo, es como llamar a la clase con el método y pasándole el objeto, seguido de los argumentos requeridos para que vaya a funcionar lo cual se vería como  *Libro.metodo(objeto)*, es por ello que utilizamos *self* para referenciarlo.

	Un ejemplo donde no requeriríamos de este para el funcionamiento del método sería simplemente con un valor booleano calcular si nuestro libro se puede considerar *bestseller*, lo cual quiere decir que ha tenido éxito con sus ventas después de un cierto número de ventas, en este caso como delimitador tomaremos 5000 ventas, nosotros le pasaremos las ventas como argumento:

	<img src="/apuntes/python-desde-cero/img-309.webp" alt="Captura de los apuntes" width="735" height="375" loading="lazy" decoding="async">

	De esta manera, al ejecutarlo, nos imprimirá True debido a que el argumento para el total de ventas que le hemos pasado sí es mayor a 5000.

	Con ello podremos notar que realmente no estamos utilizando *self* para hacer referencia al propio objeto y acceder a sus atributos.

	Para esto nos vienen bien los métodos estáticos, los cuales no requieren del propio objeto y trabajarán únicamente con los argumentos que se le han pasado o con las variables de clase.

	Podremos declarar el método estático gracias al decorador *@staticmethod*:

	<img src="/apuntes/python-desde-cero/img-310.webp" alt="Captura de los apuntes" width="809" height="520" loading="lazy" decoding="async">

	De esta manera ya no fue necesario colocar el *self* y trabajo únicamente con los argumentos que le fueron pasados.

	Como esté un método de la propia clase que ya no requiere tampoco que se le pase el objeto, entonces referenciaríamos a este de mejor manera, haciéndolo directamente con la clase y no con un objeto en específico, donde podríamos hacerlo así:

	<img src="/apuntes/python-desde-cero/img-311.webp" alt="Captura de los apuntes" width="813" height="512" loading="lazy" decoding="async">

	Como mencionamos que los métodos estáticos pueden trabajar con las variables de clase, nuestro delimitador 5000 para verificar si el total de ventas se consideraría *bestseller*, podríamos almacenarlo en una variable de clase y acceder a este referenciando a la clase para realizar la verificación, que al final sería lo mismo que ya tenemos:

	<img src="/apuntes/python-desde-cero/img-312.webp" alt="Captura de los apuntes" width="808" height="552" loading="lazy" decoding="async">

	El método estático no quiere decir que no le podamos pasar objetos a nuestro método, realmente sí se podría, que sería hacer lo mismo que referencias al método mediante el objeto, ya que:

	*objeto.es_bestseller(5000)* es exactamente lo mismo que *clase.es_bestseller(objeto, 5000)*, por lo que de la segunda manera podríamos hacerlo para un método estático y sería lo mismo que hacerlo de la primera manera.

	Por lo que podríamos hacerlo aplicándolo de esta manera si nuestro *bestseller_value* lo definiéramos en nuestro constructor para asignarlo como atributo al objeto:

	<img src="/apuntes/python-desde-cero/img-313.webp" alt="Captura de los apuntes" width="804" height="545" loading="lazy" decoding="async">

	**Método para calcular el precio, incluyendo el IVA:**
	
	Ahora podríamos crear un método que nos calcule el precio de nuestro libro,  incluyendo el IVA. Primero lo haremos empleando un método estático:

	<img src="/apuntes/python-desde-cero/img-314.webp" alt="Captura de los apuntes" width="1120" height="709" loading="lazy" decoding="async">

	Aquí, en lugar de pasar el objeto, se para directamente el precio que contiene el atributo del objeto, pero haciéndolo con un método normal para trabajar con el objeto, sería así:

	<img src="/apuntes/python-desde-cero/img-315.webp" alt="Captura de los apuntes" width="992" height="686" loading="lazy" decoding="async">

	para la posibilidad de trabajar con cualquier atributo.

	**Decorador para método de clase: @classmethod**

	Esto sería una forma de referenciar a nuestra clase utilizando *cls*, que sería prácticamente lo mismo a cuando utilizamos el método referenciándolo con nuestro objeto, en este caso es para cuando lo referenciamos con nuestra clase, pues esta es pasada como argumento y la mostraríamos con el parámetro *cls*:

	<img src="/apuntes/python-desde-cero/img-316.webp" alt="Captura de los apuntes" width="1121" height="690" loading="lazy" decoding="async">

	Esto podría parecer que no tiene mucha utilidad ahora, ya que con poner el nombre de la clase sin aplicar ningún decorador nos funcionaría perfectamente, pero cuando hacemos uso de la herencia y polimorfismo en Python, esto cobra más sentido.

	**Herencia en clases**

	La herencia en clases quiere decir que podremos pasar de una clase a otra, todos sus métodos y atributos, creando un tipo de subclase, que contendrá todo lo de la clase principal, así como atributos y métodos nuevos que se le agreguen.

	Si hiciéramos una herencia de una clase a otra, para, por ejemplo, tener una definición del libro y una definición para el mismo libro de forma digital, donde cambiar el IVA que se aplique al momento de realizar su compra, aquí tendríamos un problema si efectuamos un método estático:

	<img src="/apuntes/python-desde-cero/img-317.webp" alt="Captura de los apuntes" width="1341" height="823" loading="lazy" decoding="async">

	En este caso, nuestra clase LibroDigital es una clase con herencia de la clase Libro, lo cual se indica con los paréntesis.

	Esto quiere decir que la nueva clase tendra todo lo que tiene la anterior, pero modificamos el IVA para que el digital tenga un IVA menor.

	Pero al momento de imprimir el resultado, tenemos un problema, y es que en nuestra clase Libro referenciamos a la misma clase y, por ende, en ambos nos retorna el mismo precio final, ya que en ambos casos está tomando el IVA de la clase *Libro*.

	Entonces, si quisiéramos intentar solucionarlo referenciando a la clase *LibroDigital*, tampoco se solucionaría, ya que ahora ambos casos nos mostrarían un resultado tomando en consideración el IVA del 0.10:

	<img src="/apuntes/python-desde-cero/img-318.webp" alt="Captura de los apuntes" width="1344" height="826" loading="lazy" decoding="async">

	Como vemos ahora toma para ambos el IVA del 0.10, entonces en estos casos es donde viene bien utilizar el decorador *@classmethod*, ya que por sí mismo pasa la clase desde la cual se hace referencia al método y por ende sabe cuál utilizar para mostrar los valores indicados, quedando de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-319.webp" alt="Captura de los apuntes" width="1377" height="823" loading="lazy" decoding="async">

	Y ahora, como se manda a llamar de cada una de las clases, retorna los valores correctos esperados para cada caso.
