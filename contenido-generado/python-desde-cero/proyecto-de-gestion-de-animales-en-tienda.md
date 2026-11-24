---
curso: "python-desde-cero"
modulo: "python-desde-cero/proyectos"
leccion: "proyecto-de-gestion-de-animales-en-tienda"
titulo: "Proyecto de gestión de animales en tienda"
orden: 32
minutos: 8.5
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 16
ejercicios: []
---

1. **Introducción**

	En este proyecto se continua explorando la Programación Orientada a Objetos (POO), esta vez con un enfoque distinto. Sin emplear herencia ni polimorfismo, nos centramos en la creación de un sistema de gestión de animales en una tienda.

	El proyecto involucrará el diseño y la implementación de dos clases principales que trabajarán de manera sinérgica. Estas dos clases nos permitirán realizar una variedad de operaciones esenciales en la gestión de una tienda de animales.
	Entre las funcionalidades que desarrollaremos, se incluyen métodos para agregar nuevos animales al inventario, mostrar los animales disponibles, alimentar a los animales y gestionar su venta.

	A través de este proyecto, no solo afianzaremos nuestras habilidades en POO, sino que también demostraremos cómo diferentes clases pueden colaborar de forma efectiva para lograr objetivos comunes. Este sistema nos dará una perspectiva práctica y realista sobre cómo la POO puede ser utilizada para resolver problemas y gestionar información en un contexto de negocios.
	</br>
2. **Práctica**

	Agregaremos nuestro *shebang* y luego haremos la comprobación de que el programa se esté ejecutando directamente, lo cual nos servirá para colocar la funcionalidad de nuestro programa.

	Aquí comenzaremos teniendo en cuenta ya las definiciones de un objeto *perro* y otro *grato*. Estos serán instancias de la clase *Animal* y para crearlos tendremos que pensar en el constructor, para el cual les pasaremos los argumentos, el nombre del animal y el tipo de animal.

	<img src="/apuntes/python-desde-cero/img-602.webp" alt="Captura de los apuntes" width="432" height="154" decoding="async">

	*Clase Animal:*

	Contemplando esto para nuestro constructor, comenzaremos creando nuestra clase *Animal* y asignándole los atributos que ya son pasados al crear un nuevo animal, tanto *animal* como *especie*. Además, internamente asignaremos el atributo *alimentado*, el cual será un valor booleano para saber si el animal correspondiente ha sido alimentado. El atributo no estará ni protegido, ni privado.

	Primeramente, colocaremos a cada animal como que no está alimentando y ya, en función de si son alimentados o no, esto cambiará.

	<img src="/apuntes/python-desde-cero/img-603.webp" alt="Captura de los apuntes" width="442" height="163" loading="lazy" decoding="async">

	*Clase TiendaAnimales:*

	Empezaremos teniendo en cuenta que crearemos un objeto *tienda* el cual será una instancia de la clase *TiendaAnimales* y como argumento le pasaremos un nombre, este será el nombre de la propia tienda.

	Por lo que esto lo definiremos en nuestro constructor también.

	<img src="/apuntes/python-desde-cero/img-604.webp" alt="Captura de los apuntes" width="601" height="266" loading="lazy" decoding="async">

	Ahora, con base en estas dos clases que tenemos ahora, lo interesante sería agregar o meter los animales que tengamos en esta tienda, por lo que de alguna manera tendríamos que tenerlos dentro de la propia clase *TiendaAnimales*.

	Por ende, para la clase *TiendaAnimales* definiríamos un método *agregar_animales*, para tener la posibilidad de agregarlos. Por lo tanto, lo que le pasaremos como argumento será el objeto que tengamos del animal.

	<img src="/apuntes/python-desde-cero/img-605.webp" alt="Captura de los apuntes" width="289" height="57" loading="lazy" decoding="async">

	*Agregar animales:*

	Primeramente, vamos a agregar de una vez el atributo *animales* a nuestra clase, el cual nos servirá para almacenar en todo momento el total de animales que tengamos.

	Con esto, ahora definiríamos el método *agregar_animal* en la clase *TiendaAnimales* y lo que hará es que con append nos almacenará el objeto dentro del atributo *animales*, que es una lista. Por ende, aquí tendremos almacenados todos los animales.

	<img src="/apuntes/python-desde-cero/img-606.webp" alt="Captura de los apuntes" width="427" height="198" loading="lazy" decoding="async">

	*mostrar_animales*

	Hasta aquí tendríamos todo correctamente definido, pero al ejecutarlo no veríamos nada y esto se debe a que no estamos mostrando nada.

	Por ello generaríamos un método *mostrar_animales*, en este iteraremos sobre la lista y listaremos cada animal con un *print()*, lo cual veremos de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-607.webp" alt="Captura de los apuntes" width="592" height="350" loading="lazy" decoding="async">

	Si esto lo ejecutamos ahora, veremos cómo solo se nos muestra información de qué son objetos:

	<img src="/apuntes/python-desde-cero/img-608.webp" alt="Captura de los apuntes" width="448" height="94" loading="lazy" decoding="async">

	*Método especial \_\_str\_\_:*

	En nuestro método especial *\_\_str\_\_* definiremos una estética, donde nos muestre la información del objeto de manera que sea: "Tijuana (Gato) - Alimentado" o "Púrpura (Perro) - Hambriento"

	<img src="/apuntes/python-desde-cero/img-609.webp" alt="Captura de los apuntes" width="1069" height="228" loading="lazy" decoding="async">

	De esta manera, lo que puede resultar un poco más interesante es el condicional, ya que este retornara 'Alimentado' si el contenido del atributo *alimentado* es *True*, de lo contrario retornara 'Hambriento' y por ende con base en eso, será lo que se mostrará:

	<img src="/apuntes/python-desde-cero/img-610.webp" alt="Captura de los apuntes" width="330" height="89" loading="lazy" decoding="async">

	Como por defecto consideramos que un animal recién ingresado, no está alimentado, nos retorna que ambos están hambrientos.

	*Alimentar animales:*

	En nuestra clase *TiendaAnimales*, crearemos un método *alimentar_animales* con el cual la idea será alimentar a todos los animales, para después volver a mostrarlos y por ende ya veremos que todos están alimentados.

	Dentro de nuestro método *alimentar_animales*, recorríamos la lista donde tenemos a todos los animales y por cada animal mandaríamos a llamar a un método, el cual se encargue de directamente cambiar el atributo *alimentado* a *True*, para que de esta manera ya estén alimentados.

	<img src="/apuntes/python-desde-cero/img-611.webp" alt="Captura de los apuntes" width="337" height="81" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-612.webp" alt="Captura de los apuntes" width="439" height="216" loading="lazy" decoding="async">

	De esta manera, finalmente solo mandaríamos a llamar el método *alimentar_animales* de la clase *TiendaAnimales* y volveriamos a mostrar los animales para verificar que ya están alimentados:

	<img src="/apuntes/python-desde-cero/img-613.webp" alt="Captura de los apuntes" width="688" height="351" loading="lazy" decoding="async">

	Una vez lo ejecutemos, veríamos lo siguiente:

	<img src="/apuntes/python-desde-cero/img-614.webp" alt="Captura de los apuntes" width="490" height="191" loading="lazy" decoding="async">

	*Vender animal:*

	La idea ahora es crear un método para vender un animal. Este será el método *vender_animal* y este será un método de la clase *TiendaAnimales*.

	Para esto, antes de definir el método de la tienda, la idea es que venderemos estos animales sin que estén alimentados, por lo que en nuestra clase *Animal*, definiremos el método *vender* donde cambiará el estatus de que el animal esté alimentado a *False*:

	<img src="/apuntes/python-desde-cero/img-615.webp" alt="Captura de los apuntes" width="325" height="73" loading="lazy" decoding="async">

	Con esto,  en nuestra clase *TiendaAnimales* definiremos el método *vender_animal*, donde como argumento será recibido el nombre de este para comprobar en la lista si existe un animal con este nombre y, de ser el caso, venderlo, por ende eliminarlo de la lista con *remove()*.

	Entonces, en nuestro método *vender_animal* primeramente iteraríamos sobre la lista que contiene todos los animales y con esto comprobaríamos el nombre de cada objeto con el argumento que le pasemos el cual también será el nombre de un animal, una vez lo encuentre mandaría a llamar el método vender de ese mismo animal para que ya no esté alimentado y después para la lista de animales con *remove()* le pasaría como argumento al propio animal para que sea eliminado y una vez haya encontrado al animal y eliminado a este de la lista, finalizara el bucle y a su vez la ejecución del método con *return*, ya que no tendría sentido seguir iterando la lista.

	Al finalizar la función aquí, nos permite definir fuera del bucle algo que solo se ejecutara si nunca se encuentra un animal con ese nombre. Lo que se ejecutará aquí será un mensaje indicando que el animal con el nombre indicado no ha sido encontrado.

	<img src="/apuntes/python-desde-cero/img-616.webp" alt="Captura de los apuntes" width="763" height="194" loading="lazy" decoding="async">

	De esta manera, ahora venderíamos a un animal y con esto volveriamos a mostrar a los animales:

	<img src="/apuntes/python-desde-cero/img-618.webp" alt="Captura de los apuntes" width="515" height="285" loading="lazy" decoding="async">
