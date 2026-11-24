---
curso: "python-practico"
modulo: "python-practico/apps-de-escritorio"
leccion: "desarrollo-de-aplicaciones-gui-con-tkinter-6-de-8"
titulo: "Desarrollo de aplicaciones GUI con Tkinter (6 de 8)"
orden: 18
minutos: 6.6
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 14
ejercicios: []
---

1. **Introducción**

	Se seguira construyendo la calculadora con interfaz gráfica. Nos enfocaremos en perfeccionar la funcionalidad y el diseño de la aplicación, asegurando que cada elemento opere de manera efectiva y que la interfaz sea intuitiva y atractiva.
	</br>
2. **Práctica**

	Comenzaremos teniendo en cuenta los botones que agregaremos para nuestra calculadora, por ello primeramente haremos una lista en la cual almacenemos el texto que mostrará cada uno de nuestros botones, de la siguiente manera:

	<img src="/apuntes/python-practico/img-1051.webp" alt="Captura de los apuntes" width="578" height="302" decoding="async">

	Ahora crearíamos dos variables, una para la fila y otra para la columna de cada botón. Estas serán *row* y *col*, que tendremos inicializadas en (1,0). Esto es debido a que nuestro display esta en la primera fila (0), por ende comenzaríamos a partir de la 1, donde mediante la iteración de un bucle vamos a ir incrementando las columnas y una vez haya pasado por todas las columnas, se pasará a la siguiente fila.

	Como vimos en los botones, tenemos en cuenta en total 4 columnas.

	<img src="/apuntes/python-practico/img-1052.webp" alt="Captura de los apuntes" width="258" height="231" loading="lazy" decoding="async">

	Lo siguiente será iterar sobre cada elemento de la lista que será el contenido de cada botón. Al iterar llamaremos a un método que se encargará de construir cada botón. El método será *build_button()* y recibirá como argumentos el contenido del botón, así como fila y columna.

	Después, como para cada fila tendremos 4 columnas, bastará con un condicional para verificar cuando la columna sea mayor a 3, en ese caso la regresaremos a la columna 0, así como aumentaremos la fila, para que ahora genere los de la siguiente fila.

	<img src="/apuntes/python-practico/img-1053.webp" alt="Captura de los apuntes" width="528" height="392" loading="lazy" decoding="async">

	Ahora podríamos colocar un string que nos muestre la información sobre cada botón y de en qué posición quedará representado, comentando la línea donde se manda a llamar el método, ya que por el momento no está creado:

	<img src="/apuntes/python-practico/img-1054.webp" alt="Captura de los apuntes" width="600" height="183" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-1055.webp" alt="Captura de los apuntes" width="638" height="399" loading="lazy" decoding="async">

	De esta manera veremos el contenido de cada botón y cuál será la posición de cada uno. Esto fue a manera de observar que es lo que está sucediendo, ahora podremos quitar esto y descomentar la línea que manda a llamar a nuestro método *build_button* para ahora si comenzar a generarlo.

	**Método build_button**

	Para este método tendremos en cuenta los parámetros que vamos a recibir y primeramente construiremos el botón, para este tendremos en cuenta que lo mostraremos en la ventana principal (*nuestra propiedad master*), después indicaremos el texto que mostrará cada botón, que será el parámetro *button* que recibe en cada iteración de la lista:

	<img src="/apuntes/python-practico/img-1056.webp" alt="Captura de los apuntes" width="493" height="72" loading="lazy" decoding="async">

	Ahora nos faltaría mostrar cada botón, donde con grid indicaremos la fila y columna correspondientes:

	<img src="/apuntes/python-practico/img-1057.webp" alt="Captura de los apuntes" width="464" height="90" loading="lazy" decoding="async">

	De esta manera, ahora al ejecutarlo veremos todo de la siguiente manera:

	<img src="/apuntes/python-practico/img-1058.webp" alt="Captura de los apuntes" width="392" height="214" loading="lazy" decoding="async">

	Todo se ve descuadrado, pero es debido a que todo trata de ocupar la columna correspondiente. Es por ello que le indicaremos a nuestro display, con la propiedad *columnspan* que ocupe las 4 columnas al mostrarse con grid, que corresponde a abarcar las columnas de los botones para que tengamos una mejor adaptación de todo:

	<img src="/apuntes/python-practico/img-1059.webp" alt="Captura de los apuntes" width="860" height="348" loading="lazy" decoding="async">

	Lo único que nos deja esto es un descuadramiento en cuanto al tamaño de cada botón. Esto sucede porque el tamaño del contenido es distinto en cada uno de ellos. Es por ello que les asignáramos un tamaño fijo a todos, para que se vean igual. Para ello utilizaremos la propiedad *width* en la creación de los botones, le daremos como valor 3 o 4 y dejaremos el que mejor quede a nuestra consideración:

	<img src="/apuntes/python-practico/img-1060.webp" alt="Captura de los apuntes" width="953" height="261" loading="lazy" decoding="async">

	Para la definición de cada botón, cambiará el *command* que será la asignación del método a ejecutar; es por ello que jugaremos con una serie de condicionales.

	Primeramente, nos enfocaremos en el botón *C* que será para limpiar el display de nuestra calculadora. En este caso, le asignará a este botón el método *clear_display()*, de no ser este el botón, generaremos los demás sin *command*, solo para que los muestre e ir viendo la funcionalidad:

	<img src="/apuntes/python-practico/img-1061.webp" alt="Captura de los apuntes" width="937" height="227" loading="lazy" decoding="async">

	Ahora definiríamos cómo se limpie nuestro display. En este caso, al ser un widget *Entry* se hace de forma similar al widget *Text*, solo cambia que se está trabajando con una sola línea y múltiples caracteres. Por ello no se utiliza "1.0", donde antes del punto se indica la línea y después del punto el carácter desde el cual considera, si no directamente el carácter número 0, hasta el final:

	<img src="/apuntes/python-practico/img-1062.webp" alt="Captura de los apuntes" width="939" height="382" loading="lazy" decoding="async">

	De esta manera, ya funciona el limpiar nuestro display si tenemos caracteres escritos.

	Ahora, para el botón de *\=*, definiremos un método *calculate* para que se calcule el resultado. Por el momento solo dejaremos un print para saber si se esté ejecutando correctamente:

	<img src="/apuntes/python-practico/img-1063.webp" alt="Captura de los apuntes" width="927" height="267" loading="lazy" decoding="async">

	Al ejecutarlo y presionar el *\=*, veremos cómo funciona correctamente lo que hemos definido en el método *calculate*:

	<img src="/apuntes/python-practico/img-1064.webp" alt="Captura de los apuntes" width="755" height="270" loading="lazy" decoding="async">
