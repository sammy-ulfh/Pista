---
curso: "python-practico"
modulo: "python-practico/biblioteca-estandar"
leccion: "expresiones-regulares"
titulo: "Expresiones regulares"
orden: 2
minutos: 16
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 27
ejercicios: []
---

1. **Introducción**

	La librería *re* en Python proporciona un conjunto completo de herramientas para trabajar con expresiones regulares, que son patrones de cadenas diseñados para la búsqueda y manipulación de texto.

	Varios aspectos importantes de esta librería:

	- *Funciones Básicas:* *re* incluye funciones como *search* (para buscar un patrón dentro de una cadena), *match* (para verificar si una cadena comienza con un patrón específico), *findall* (para encontrar todas las ocurrencias de un patrón) y *sub* (para reemplazar partes de una cadena que coinciden con un patron).
	  </br>
	- *Compilación de Patrones:* Permite compilar expresiones regulares en objetos de patrón, lo que puede mejorar el rendimiento cuando se usan repentinamente.
	  </br>
	- *Grupos y Captura:* Ofrece una capacidad de definir grupos dentro de patrones de expresiones regulares, lo que facilita extraer partes específicas de una cadena que coinciden con subpatrones.
	  </br>
	- *Flags:* Soporta modificaciones que alteran la forma en que las expresiones regulares son interpretadas y coincididas, como ignorar mayúsculas y minúsculas o permitir el modo multilínea.
	  </br>
	- *Patrones Complejos:* Permite la creación de patrones complejos utilizando una variedad de símbolos y secuencias especiales, como cuantificadores, aserciones y clases de caracteres.
	  </br>
	- *Aplicaciones Prácticas:* Las expresiones regulares son extremadamente útiles en tareas como la validación de formatos (por ejemplo, direcciones de correo electrónico), el análisis de registros (logs), el procesamiento del lenguaje natural, y la limpieza y preparación de datos.
	  </br>
	- *Curva de Aprendizaje:* Aunque potentes, las expresiones regulares pueden ser complejas y requieren de una curva de aprendizaje. Sin embargo, una vez dominadas, se convierten en una herramienta invaluable en el arsenal de cualquier programador.

	En resumen, la librería ‘**re**‘ en Python es una herramienta esencial para cualquier tarea que implique procesamiento complejo de cadenas de texto, proporcionando una forma poderosa y flexible de buscar, analizar, y manipular datos basados en texto.
	</br>
2. **Práctica**

	La librería que estaremos utilizando para todo esto es *re*, por ende la importaremos y crearemos una cadena para, con base en esta cadena, empezar a ver cómo podríamos utilizarla:

	<img src="/apuntes/python-practico/img-690.webp" alt="Captura de los apuntes" width="699" height="124" decoding="async">

	Con esto, ahora con *findall* de esta librería, podríamos buscar matches de alguna secuencia de caracteres, por ejemplo si buscáramos cuantas veces aparece 'gato', a *findall* le pasaríamos como primer argumento la secuencia a buscar y como segundo argumento en donde la buscara, en este caso será nuestra variable *text* y lo que esto nos retornara son las coincidencias de nuestra cadena y en una lista lo colocara, lo que además nos hará saber cuantas veces lo encontró:

	<img src="/apuntes/python-practico/img-691.webp" alt="Captura de los apuntes" width="777" height="355" loading="lazy" decoding="async">

	*Consideración de dígitos con \\d:*

	Incluso podríamos jugar con caracteres especiales para casos un poco distintos, por ejemplo, si tuviésemos un texto con dos fechas representas:

	<img src="/apuntes/python-practico/img-692.webp" alt="Captura de los apuntes" width="852" height="121" loading="lazy" decoding="async">

	En este caso tendemos dos fechas, las cuales tienen exactamente el mismo formato, día-mes-año, y tiene dos elementos entre cada '/', por ende con ello lo que haremos será utilizar un carácter especial *\\d{num}*, donde con *num* le indicamos el número de caracteres a considerar.

	En este caso serían 2, ya que entre cada barra */* tenemos dos números, por lo que al realizar esto, colocaríamos la búsqueda como "\\d{2}/\\d{2}/\\d{2}", indicándole que en cada barra tendrá que considerar 2 caracteres, gracias al carácter especiales *\\d*:

	<img src="/apuntes/python-practico/img-693.webp" alt="Captura de los apuntes" width="923" height="358" loading="lazy" decoding="async">

	De esta manera, con conocer solamente un patrón igual en ambas fechas, podremos extraerlas.

	Esto nos lanzará el resultado esperado, pero desde luego es recomendable que cuando indicamos nuestra barra */* que sí que está en el texto, le indiquemos antes una barra invertida *\\*, esto nos ayudará a que no interprete la barra */* como que queremos indicar otra cosa y simplemente la ignore o la considere texto. Esto es importante, ya que en expresiones regulares, dependiendo de lo que queramos realizar, la barra */* también permite realizar cosas.

	<img src="/apuntes/python-practico/img-694.webp" alt="Captura de los apuntes" width="926" height="355" loading="lazy" decoding="async">

	Entonces, realmente *\\d* por sí solo lo podremos considerar como que podrá considerar un dígito en la cadena, pero gracias a las llaves podremos colocar cierta cantidad de caracteres que nos interese tomar. En este caso, al final realmente se toman 4 dígitos, ya que el año tiene 4 dígitos y se han colocado 2, por lo que realmente nos quedaría de la siguiente manera:

	<img src="/apuntes/python-practico/img-695.webp" alt="Captura de los apuntes" width="922" height="346" loading="lazy" decoding="async">

	Por lo que aquí hemos jugado de igual con patrones de búsqueda, pero además empleamos caracteres especiales.

	*Patrones de búsqueda para la obtención de grupos:*

	Un ejemplo sería tener una cadena donde tengamos 2 correos electrónicos a los que los usuarios podrían contactar, pero lo que queremos con base en este texto es obtener de los correos electrónicos, de cada uno una tupla donde tomando como delimitador el *@*, nos regrese en la primera posición de la tupla lo que esta antes del *@* y como segunda posición lo que esta después, el texto sería:

	<img src="/apuntes/python-practico/img-696.webp" alt="Captura de los apuntes" width="916" height="123" loading="lazy" decoding="async">

	Y esperando como resultado algo como: *\[(soporte, hack4u.io)\]*.

	Entonces, para obtener esto, tendríamos que considerar primero, buscar un match y esto lo podremos hacer con *()@()*, lo cual nos sirve para indicar que vamos a contemplar una secuencia de caracteres antes y después de un *@* el cual será nuestro delimitador.

	Dentro del primer paréntesis vamos a colocar *\\w*, esto nos sirve para indicar que en este apartado podremos tener un carácter alfanumérico, como claramente habrá más de 1, para que lo considere tendremos que agregarle un *+* luego de *\\w*, quedándonos como *\\w+*, de esta manera consideraría múltiples caracteres alfanuméricos (números y letras).

	Para nuestro segundo paréntesis indicaríamos lo mismo, pero seguido de esto tendremos que contemplar el punto *.* y este también lo escaparemos con *\\*, ya que los puntos en expresiones regulares también nos permiten indicar ciertas cosas. Una vez escapado el número, volveremos a indicar que aquí puede haber caracteres alfanuméricos, pero haciendo uso de las llaves colocaremos que después del punto todos tienen un mínimo de 2 caracteres alfanuméricos: *\\w{2,}* y la coma nos permite representar que 2 es un mínimo y no conocemos el máximo.

	De esta manera, nos quedaría lo siguiente:

	<img src="/apuntes/python-practico/img-697.webp" alt="Captura de los apuntes" width="985" height="360" loading="lazy" decoding="async">

	Lo del mínimo después del punto es porque todos los correos tienen siempre mínimo dos caracteres después del punto. Con esto conseguimos obtener distintos grupos que son almacenados en una tupla y estas tuplas por cada match en una lista.

	Si nosotros colocáramos un límite de caracteres alfanuméricos, el final de nuestro correo es demasiado largo, listaría solamente hasta el límite indicado:

	<img src="/apuntes/python-practico/img-698.webp" alt="Captura de los apuntes" width="1084" height="353" loading="lazy" decoding="async">

	En este caso, en el primer grupo lista todo sin problemas, pero en el segundo, al tener en *technologies* 12 caracteres, solo nos mostrará hasta el límite indicado de 5, que sería *techn*.

	*Sustituciones con expresiones regulares::*

	La librería *re* cuenta con *sub()*, lo cual nos permite realizar sustituciones en texto, por ende si nosotros tuviésemos la siguiente cadena:

	<img src="/apuntes/python-practico/img-699.webp" alt="Captura de los apuntes" width="613" height="117" loading="lazy" decoding="async">

	Utilizando *sub()* podríamos especificar como primer argumento algún match, por ejemplo *gato* y en caso de que este exista en el texto reemplazarlo por otra cadena como *perro* indicada como segundo argumento, y finalmente como tercer argumento el texto donde esperamos realizar la sustitución:

	<img src="/apuntes/python-practico/img-700.webp" alt="Captura de los apuntes" width="686" height="353" loading="lazy" decoding="async">

	Si en ambos tuviésemos gato, al encontrar dos matches, en ambos nos cambiaría *gato* por *perro*.

	*Realizar split en textos con la librería re:*

	Podríamos imaginar que tenemos el contenido de un archivo *csv*, como el siguiente texto:

	<img src="/apuntes/python-practico/img-702.webp" alt="Captura de los apuntes" width="465" height="128" loading="lazy" decoding="async">

	Y ahora, para utilizar split y separar cada campo y colocarlo en una lista, el primer argumento tendrá que ser el delimitador, en este caso la coma, y el segundo argumento tendrá que ser donde buscará este delimitador y separado almacenará todo en una lista y lo retornará:

	<img src="/apuntes/python-practico/img-703.webp" alt="Captura de los apuntes" width="543" height="356" loading="lazy" decoding="async">

	**Ejercicio de validador de correo**

	Ahora crearemos un programita el cual nos sirva para validar la estructura de un correo electrónico, donde si es correcta nos retornará un *True* y si es incorrecta nos retornará un *False*.

	Para esto comenzaremos creando la función *validar_correo*, esta recibirá como argumento el correo y primeramente crearemos un patrón:

	<img src="/apuntes/python-practico/img-704.webp" alt="Captura de los apuntes" width="611" height="163" loading="lazy" decoding="async">

	De esta manera estaríamos haciendo exactamente lo mismo que cuando hicimos el match con el correo anteriormente, la diferencia sería que estaríamos englobando nuestros propios caracteres haciéndolo más personalizable. De esta manera, antes de arroba, dentro de los corchetes con *A-Z* estamos haciendo referencia a todas las letras mayúsculas de la A a la Z, lo mismo aplica para las minúsculas y los números, además agregamos un punto, guion bajo, más y menos.

	Esto quiere decir que cualquiera de estos caracteres puede ser el que esté ahí, finalmente fuera de los corchetes se le agrega el *+* para indicar que cualquiera de los caracteres englobados podrá estar ahí y que puede haber múltiples.

	El *@* nuevamente lo tenemos considerándolo como nuestro delimitador y después del arroba englobamos posibles caracteres y quitamos el punto, menos, más y guion bajo, ya que en esta parte no debería de haber, nuevamente se le coloca el *+* después lo que englobamos, ya que puede haber múltiples caracteres de acuerdo a los que englobamos. Llegamos al punto y lo escapamos y luego después del punto también englobaremos los posibles caracteres que puedan estar si es un correo y nuevamente con las llaves indicaremos un mínimo de dos caracteres.

	Luego de que nuestro patrón este definido, vamos a buscar el match con la librería y *findall*, pasándole como primer argumento el patrón y como segundo argumento, donde tendrá que buscarlo:

	<img src="/apuntes/python-practico/img-705.webp" alt="Captura de los apuntes" width="616" height="215" loading="lazy" decoding="async">

	Finalmente, si hay un match  regresará una lista con un elemento, pero si no hay match regresará una lista vacía. Verificar si una lista tiene contenido o no es algo que podremos verificar con un condicional, por lo que aprovechándonos de esto, cuando la lista tenga contenido nos retornará *True* y cuando no, quiere decir que no hubo match, por lo que nos retornará *False*:

	<img src="/apuntes/python-practico/img-706.webp" alt="Captura de los apuntes" width="633" height="273" loading="lazy" decoding="async">

	Por ende, finalmente vamos a llamar la función y pasarle un correo correcto y haremos un print de lo que retorne:

	<img src="/apuntes/python-practico/img-707.webp" alt="Captura de los apuntes" width="681" height="449" loading="lazy" decoding="async">

	Y en caso de pasarle un correo incorrecto:

	<img src="/apuntes/python-practico/img-708.webp" alt="Captura de los apuntes" width="701" height="457" loading="lazy" decoding="async">

	*Concepto de búsquedas con las regex:*

	Cuando realizamos búsquedas con *findall*, se hace incluso tomando palabras que en su contenido pueden llegar a completar alguna palabra. Por ejemplo, si tuviésemos las siguientes palabras:

	<img src="/apuntes/python-practico/img-709.webp" alt="Captura de los apuntes" width="476" height="115" loading="lazy" decoding="async">

	En este caso nos retorna 4 veces *car*, porque en 4 palabras se llegan a completas estos 3 caracteres.

	Pero también podremos hacer referencia a que nos llegue a hacer match solamente de aquellas que inicien con estos 3 caracteres, pero puedan contener más a la derecha, esto lo haremos con *\\b* al inicio, pero a la izquierda de la cadena que indica esto, tendremos que colocar una *r*, lo cual hace referencia a que nos tome en consideración los caracteres especiales:

	<img src="/apuntes/python-practico/img-710.webp" alt="Captura de los apuntes" width="479" height="107" loading="lazy" decoding="async">

	De esta manera, nos va a considerar solo aquellas que inicien con *car*. También podremos aplicarlo si queremos aquellas que finalicen con *car* o lo tengan cerca del final, agregando el carácter especial *\\b* al final:

	<img src="/apuntes/python-practico/img-711.webp" alt="Captura de los apuntes" width="468" height="116" loading="lazy" decoding="async">

	Con esto, lo que nos retorna son los matches donde las palabras contiene *car* cerca del final, por ende nos estaría retornando los matches de las palabras masticar y magicarp.

	Si quisiéramos que nos encuentre match únicamente con la palabra *car*, pues tendremos que colocar el carácter especial al inicio y al final.

	<img src="/apuntes/python-practico/img-712.webp" alt="Captura de los apuntes" width="465" height="134" loading="lazy" decoding="async">

	Esto lo podríamos traducir como que inicia con *car* y finaliza con *car*, lo que nos resultaría en que si hay algo a la izquierda o derecha de esta palabra, entonces no nos lo va a considerar.

	Entonces, considerando esto para nuestro validador de correos, podremos agregar este carácter especial y nos funcionará sin problemas, siendo más preciso:

	<img src="/apuntes/python-practico/img-713.webp" alt="Captura de los apuntes" width="741" height="463" loading="lazy" decoding="async">

	*Utilizando finditer:*

	Primeramente, tomaremos el ejemplo de las fechas y realizaremos la misma búsqueda, pero ahora lo que haremos será hacerlo aplicando un grupo:

	<img src="/apuntes/python-practico/img-714.webp" alt="Captura de los apuntes" width="755" height="358" loading="lazy" decoding="async">

	Lo que *finditer* nos permite, es de alguna forma iterar para poder realizar cosas con esto, la forma en la que podriamos usarlo es directamente iterando ya que nos retorna un objeto que podremos iterar:

	<img src="/apuntes/python-practico/img-715.webp" alt="Captura de los apuntes" width="762" height="396" loading="lazy" decoding="async">

	De esta manera le pasamos a *finditer* los argumentos del patrón y el texto donde buscara con este patrón.

	Esto lo que nos retorna realmente es un objeto el cual podremos iterar y en cada iteración guardamos el contenido en *match*, por lo que al imprimir lo que vemos son como dos objetos.

	Lo cómodo de esto, es que si quisiéramos obtener la fecha correspondiente al match, bastaría con utilizar *group* sobre este objeto y pasarle el argumento *0*:

	<img src="/apuntes/python-practico/img-716.webp" alt="Captura de los apuntes" width="759" height="390" loading="lazy" decoding="async">

	Lo interesante de esto, es que directamente podríamos ir iterando entra cada match y con *group(0)* mostrar el match, pero con *start()* podríamos mostrar a partir de qué índice de la cadena de texto empieza y con *end()* donde finaliza:

	<img src="/apuntes/python-practico/img-717.webp" alt="Captura de los apuntes" width="1438" height="397" loading="lazy" decoding="async">

	Como ya sabemos, a una cadena de caracteres podremos acceder a sus caracteres individuales, por lo que accediendo a una posición, accederíamos a un carácter, la posición 0 por ejemplo en este caso, sería la *H*.

	Las expresiones regulares son un tema bastante extenso, por lo que se puede profundizar más, estas se suelen utilizar mucho para realizar comprobaciones y verificar que el texto está planteado como queremos.

	Es por ello que se puede profundizar más en el siguiente video: [Expresiones regulares](https://www.youtube.com/watch?v=MRKpVxn5fqI&t=59s)
