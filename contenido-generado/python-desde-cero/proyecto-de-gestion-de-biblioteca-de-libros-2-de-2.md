---
curso: "python-desde-cero"
modulo: "python-desde-cero/proyectos"
leccion: "proyecto-de-gestion-de-biblioteca-de-libros-2-de-2"
titulo: "Proyecto de gestión de biblioteca de libros (2 de 2)"
orden: 31
minutos: 5.5
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 12
ejercicios: []
---

Continuamos avanzando en nuestro emocionante primer proyecto en Python, el desarrollo de un sistema de gestión de biblioteca. Esta fase del proyecto nos permitirá profundizar en las funcionalidades que hemos comenzado a construir. Nos enfocaremos en perfeccionar las características existentes y en añadir nuevas funcionalidades.


1. **Práctica**

	*Método prestar_libros:*

	Para prestar libros, lo que haremos es pasarle como argumento a nuestro método de la instancia de nuestra clase *Biblioteca* el id del libro que queremos prestar.

	La lógica de nuestro método sería realizar 2 validaciones, una donde verifiquemos si el id del libro está existente y a su vez verificar que este no haya sido prestado. De ser el caso, el atributo *esta_prestado* lo colocaremos en *True*. De lo contrario, lanzaremos un mensaje de que el libro no se puede prestar. Esto se debe a que esta ya se encuentre prestado o simplemente no exista, gracias a las validaciones que realizamos.

	<img src="/apuntes/python-desde-cero/img-590.webp" alt="Captura de los apuntes" width="782" height="138" decoding="async">

	Por ende, al colocar que nos muestre los libros existentes y que no han sido prestados, luego prestar uno y volver a mostrarlos, veríamos lo siguiente:

	<img src="/apuntes/python-desde-cero/img-591.webp" alt="Captura de los apuntes" width="1435" height="317" loading="lazy" decoding="async">

	*Listar libros prestados:*

	Para listar los libros prestados, nos aprovecharemos del método con el decorador *@property* que ya generamos y  lo modificaremos para que nos muestre todos los libros que en su atributo *esta_prestado* tengan *True*:

	<img src="/apuntes/python-desde-cero/img-592.webp" alt="Captura de los apuntes" width="824" height="195" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-593.webp" alt="Captura de los apuntes" width="1441" height="354" loading="lazy" decoding="async">

	*Clase BibliotecaInfantil:*

	Ahora implementaremos la posibilidad de tener una biblioteca infantil, por lo que crearemos la clase *BibliotecaInfantil*. Esta funcionaria en conjunto con nuestra clase *Biblioteca* al ser una herencia de esta misma.

	Vamos a sobreescribir el constructor para crear un nuevo diccionario donde, con base en el libro, con su ID, almacenaremos como valor un *True* si es un libro infantil o un *False*, si no es un libro infantil. Pero desde luego requerimos de que  en esta clase esté funcionando correctamente el almacenamiento de los libros, por lo que con el uso de *super()* llamaremos al mismo método de la clase base.

	<img src="/apuntes/python-desde-cero/img-594.webp" alt="Captura de los apuntes" width="646" height="232" loading="lazy" decoding="async">

	Hasta aquí tendríamos todo bien, pero tendríamos que modificar algunos métodos para, por ejemplo, primeramente recibir si el libro es infantil o no al momento en el que se almacena.

	Definiremos para la clase *BibliotecaInfantil* el método *agregar_libro*. En este, además de recibir como argumento el libro, también recibiremos un estado que será *True* o *False*, dependiendo si es para niños o no. Llamaremos al método *agregar_libro* de la clase base, para que esta se encargue de agregar este libro y lo siguiente que haremos será en el diccionario que nuestro constructor crea para esta clase agregar como llave el ID del libro y como valor el *True* o *False* que indica si es un libro para niños o no.

	<img src="/apuntes/python-desde-cero/img-595.webp" alt="Captura de los apuntes" width="772" height="419" loading="lazy" decoding="async">

	Ahora sobreescribiríamos todo el método *prestar_libro*, que realmente tendría todo el contenido, pero le agregaríamos una tercera verificación en el *if*, ya que comprobaríamos el libro con el ID correspondiente y un segundo argumento que recibirá el método *True* si es niño y *False* si no es niño, donde si ambos concuerdan, entonces el libro se puede prestar. Esto al final nos deja que solo los niños pueden pedir prestados libros para niños, mientras que solo los adultos pueden pedir prestados libros para adultos.

	<img src="/apuntes/python-desde-cero/img-596.webp" alt="Captura de los apuntes" width="1329" height="741" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-597.webp" alt="Captura de los apuntes" width="1434" height="187" loading="lazy" decoding="async">

	Si quisiera un adulto solicitar prestado el libro con ID 2, que es un libro para niños, en este caso no podría:

	<img src="/apuntes/python-desde-cero/img-598.webp" alt="Captura de los apuntes" width="1458" height="384" loading="lazy" decoding="async">

	Finalmente por curiosear, podríamos agregar una propiedad la cual solo pertenecerá a nuestra clase *BibliotecaInfantil*, esta nos podrá servir para mostrar el contenido de nuestro atributo *libros_para_ninos*, que lo podremos considerar como estar mostrando el estado de los libros para saber los libros con que ID son para niños.

	<img src="/apuntes/python-desde-cero/img-599.webp" alt="Captura de los apuntes" width="460" height="88" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-600.webp" alt="Captura de los apuntes" width="995" height="407" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-601.webp" alt="Captura de los apuntes" width="1431" height="252" loading="lazy" decoding="async">

	Así vemos cómo esto concuerda a cómo almacenamos los libros cuando referenciamos si era un libro para niño o no.
