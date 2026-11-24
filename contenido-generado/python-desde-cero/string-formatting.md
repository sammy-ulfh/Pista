---
curso: "python-desde-cero"
modulo: "python-desde-cero/fundamentos"
leccion: "string-formatting"
titulo: "String Formatting"
orden: 7
minutos: 4.5
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 7
ejercicios: []
---

1. **Introducción:**

	Python proporciona variar formas de formatear cadenas, permitiendo insertar variables en ellas, así como controlar el espaciado, alineación y precisión de los datos mostrados. Estas son las técnicas de formateo de cadenas que exploraremos:

	- *Operador % (Porcentaje):*  También conocido como *interpolación de cadenas*, este método clásico utiliza marcadores de posición como *%s* para cadenas, *%d* para enteros, o *%f*  para números de punto flotantes.
	  </br>
	- *Método format():* Introducido en Python 2.6, permite una mayor flexibilidad y claridad. Utiliza llaves *{}* como marcadores de posición dentro de la cadena y puede incluir detalles sobre el formato de la salida.
	  </br>
	- *F-Strings (Literal String Interpolation):* Disponible desde Python 3.6, los F-strings ofrecen una forma concisa y legible para incrustar expresiones dentro de literales de cadena usando la letra *f* antes de las comillas de apertura y llaves para indicar dónde se insertarán las variables o expresiones.
 
2.  **Práctica:**

	El *string formatting* nos puede ser de mucha ayuda al momento de trabajar con variables y texto. Para esto podríamos contemplar lo siguiente:

	<img src="/apuntes/python-desde-cero/img-074.webp" alt="Captura de los apuntes" width="521" height="276" decoding="async">

	En este caso no nos da ningún tipo de error, porque al final lo que estamos haciendo es unir dos cadenas de texto. Pero si cambiamos el tipo de dato nos dará error y por ello debemos aplicar el *string formatting*.

	- *Operador % (Porcentaje):* 
       Con el operador  *%*, lo que podremos hacer es colocarlo dentro de la cadena de texto indicando el tipo de variable que vamos a colocar, después nuevamente seguido de las comillas de cierre colocaremos el operador *%* y finalmente la variable. Esto tendrá que ser de forma posicional, lo que quiere decir es que tendrán que ir en el orden en el que las colocamos en nuestra cadena de texto.
	
	   Siendo así de la siguiente manera:

	   <img src="/apuntes/python-desde-cero/img-075.webp" alt="Captura de los apuntes" width="505" height="272" loading="lazy" decoding="async">

		Considerando que tendremos que utilizar:

		*%s* para strings, *%d* para enteros y *%f* para flotantes.

		<img src="/apuntes/python-desde-cero/img-076.webp" alt="Captura de los apuntes" width="1065" height="320" loading="lazy" decoding="async">

		Como podremos observar, por defecto con los flotantes nos muestra muchísimos decimales, para evitar esto tendríamos que indicarle a nuestro operador del flotante cuantos decimales queremos que nos muestre.
		
        Esto se puede realizar colocando *.* y el número de decimales que deseamos mostrar entre el operador *%* y la letra *f*:

		<img src="/apuntes/python-desde-cero/img-077.webp" alt="Captura de los apuntes" width="428" height="346" loading="lazy" decoding="async">

		Como lo vimos, al tener más de una variable agregada en nuestro *string formatting*,  es importante que las agreguemos separadas por comas y entre paréntesis: 
		*"cadena %s, cadena  %s, cadena %d" % (variable 1, variable 2, variable 3)*.

		En Python al aplicar esta forma de *string formatting*, si por ejemplo tuviéramos un número entero y lo aplicamos como si fuese un Sting.

        Podría no dar ningún error, pero esto es porque realmente Python internamente  aplica o fuerza la conversión del número entero a una cadena de texto con *str()*. Sin embargo, lo más recomendable siempre es indicar el tipo de dato correcto, ya que con esto podríamos evitarnos errores.
        </br>
	- *Método format():*

		El *método format* se utiliza de forma similar, la diferencia es que tiene ciertas mejoras.
		
        Al utilizar format, para poner una variable dentro en nuestro texto tendríamos que colocar llaves *{}*, y en nuestro format poner las variables como argumentos, todas separadas por comas:

	    <img src="/apuntes/python-desde-cero/img-078.webp" alt="Captura de los apuntes" width="799" height="319" loading="lazy" decoding="async">

		Lo bueno de esto es que toma las variables de acuerdo en el orden en el que nosotros las coloquemos y además, ahora Python se encargara del tipo de dato que sea, por lo que ya no tendremos que indicárselo y no daría ningún tipo de error.

		También es interesante que con format podremos trabajar con las variables que coloquemos como si de una lista se tratase y por ende referenciarnos a ellas como el índice de una lista:

		<img src="/apuntes/python-desde-cero/img-079.webp" alt="Captura de los apuntes" width="1004" height="313" loading="lazy" decoding="async">

	- *F-strings:*

		Los F-string son una forma aún más sencilla y cómoda de implementar, ya que directamente colocaríamos una *f* antes de nuestra llave de apertura y con esto, dentro del texto solo tendríamos que colocar la variable dentro de llaves *{}*:

		<img src="/apuntes/python-desde-cero/img-080.webp" alt="Captura de los apuntes" width="930" height="321" loading="lazy" decoding="async">
