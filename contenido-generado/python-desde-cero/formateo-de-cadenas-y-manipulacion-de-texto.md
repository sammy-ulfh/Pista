---
curso: "python-desde-cero"
modulo: "python-desde-cero/modulos-y-archivos"
leccion: "formateo-de-cadenas-y-manipulacion-de-texto"
titulo: "Formateo de cadenas y manipulación de texto"
orden: 29
minutos: 13.2
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 30
ejercicios: []
---

1. **Introducción**

	El formateo de cadenas y la manipulación de texto son habilidades esenciales en Python, especialmente en aplicaciones que involucran la presentación de datos al usuario o procesamiento de información textual. Nos centraremos en las técnicas y herramientas que Python ofrece para trabajar con cadenas de texto.

	*Formateo de Cadenas:*

	Aprenderemos los distintos métodos de formateo de cadenas que Python proporciona, incluyendo:

	- *Formateo Clásico:* A través del operador *%*, similar al *print* en C.
	- *Método format():* Un enfoque versátil que ofrece numerosas posibilidades para formatear y alinear texto, rellenar caracteres, trabajar con números y más.
	- *F-strings (Literal String Interpolation):* Incluido en Python 3.6, este método permite incrustar expresiones dentro de cadenas de texto de una manera concisa y legible.

	*Manipulación de Texto:*

	Exploraremos las funciones y métodos incorporados para la manipulación de cadenas, que incluyen:

	- *Métodos de Búsqueda y Reemplazo:* Como *find(), *index()*, *replace()* y métodos de expresiones regulares.
	- *Métodos de Prueba:* Para verificar el contenido de la cadena, como *isdigit(), *isalpha()*, *startswith()* y *enswith()*.
	- *Métodos de Transformación:* Que permiten cambiar el caso de una cadena, dividirla en una lista de subcadenas o unirlar, como *upper()*, *lower()*, *split()* y *join()*.

	También veremos cómo trabajar con cadenas Unicode en Python, lo que es esencial para aplicaciones modernas que necesitan soportar múltiples idiomas o caracteres especiales.

	Con esto tendrás una comprensión completa de cómo dar formato a las cadenas para la salida de datos y cómo realizar operaciones comunes de manipulación de texto. Estas habilidades son fundamentales para la creación de aplicaciones que necesitan una interfaz de usuario sofisticada y para el procesamiento de datos en aplicaciones de backend.
	<br/>
2. **Práctica**

	*Formateo de cadenas:*

	El formateo de cadenas lo hemos visto como la forma de manipular el texto que mostramos con la capacidad de implementar el uso de contenido no estático, como las variables.

	El método *format* es uno de ellos, el cual nos permite colocar las llaves y variables de forma posicional:

	<img src="/apuntes/python-desde-cero/img-547.webp" alt="Captura de los apuntes" width="734" height="297" decoding="async">

	De esta manera vemos cómo, de acuerdo con cómo se colocaron las llaves y los variables como argumentos en format, serán mostradas.

	O de otra forma, en caso de no poder colocarlos en orden, colocar el índice correspondiente de la variable, teniendo en cuenta que en Python se comienza a contar desde el 0:

	<img src="/apuntes/python-desde-cero/img-548.webp" alt="Captura de los apuntes" width="767" height="296" loading="lazy" decoding="async">

	*F-strings:*

	Este método es más cómodo, al estar más completo y más sencillo de implementar, ya que con colocar la variable o función dentro de los corchetes bastaría. 

	<img src="/apuntes/python-desde-cero/img-549.webp" alt="Captura de los apuntes" width="639" height="289" loading="lazy" decoding="async">

	Además de que nos permite incluso realizar operaciones:

	<img src="/apuntes/python-desde-cero/img-550.webp" alt="Captura de los apuntes" width="531" height="292" loading="lazy" decoding="async">

	*Manipulación de cadenas de texto:*

	Para la manipulación de cadenas hemos visto hasta ahora *strip()*, este realmente lo que hace es eliminar cualquier espacio o carácter especial como saltos de línea, tabulaciones, entre otros, que se encuentren al inicio o al final del texto.

	Por ejemplo, si creáramos una cadena que al inicio tenga espacios y al final  también, al utilizar *strip()* e imprimirlo, no veríamos esto:

	<img src="/apuntes/python-desde-cero/img-551.webp" alt="Captura de los apuntes" width="406" height="263" loading="lazy" decoding="async">

	Si agregáramos caracteres especiales como tabulaciones o saltos de línea, el resultado sería el mismo al aplicar *strip()*:

	<img src="/apuntes/python-desde-cero/img-552.webp" alt="Captura de los apuntes" width="528" height="265" loading="lazy" decoding="async">

	*Colocar todo en minúsculas:*

	Si tenemos una cadena de texto y esta si o si queremos mostrarla en minúsculas, para ello tendríamos *lower()*:

	<img src="/apuntes/python-desde-cero/img-553.webp" alt="Captura de los apuntes" width="377" height="275" loading="lazy" decoding="async">

	Lo mismo sucede para convertirlo todo a mayúsculas, con *upper()*:

	<img src="/apuntes/python-desde-cero/img-554.webp" alt="Captura de los apuntes" width="344" height="267" loading="lazy" decoding="async">

	*Reemplazar caracteres:*

	Podríamos reemplazar caracteres de una cadena utilizando *replace()*, colocando como primer argumento el carácter de nuestro texto que deseamos cambiar y como segundo argumento el carácter por el que deseamos cambiarlo:

	<img src="/apuntes/python-desde-cero/img-555.webp" alt="Captura de los apuntes" width="423" height="270" loading="lazy" decoding="async">

	O incluso aplicarlo en palabras:

	<img src="/apuntes/python-desde-cero/img-556.webp" alt="Captura de los apuntes" width="527" height="268" loading="lazy" decoding="async">

	*Método split():*

	Este es un método interesante, ya que si lo utilizamos sin argumentos, esto lo que hará es que de toda la cadena nos tomará como delimitador los espacios y cada cosa que esté entre los espacios lo almacenará en una lista:

	<img src="/apuntes/python-desde-cero/img-557.webp" alt="Captura de los apuntes" width="418" height="313" loading="lazy" decoding="async">

	Si quisiéramos, podríamos cambiar el delimitador, ya que por defecto serán los espacios, pero podríamos colocar algún carácter en específico, como las comas *,*:

	<img src="/apuntes/python-desde-cero/img-558.webp" alt="Captura de los apuntes" width="441" height="317" loading="lazy" decoding="async">

	Como todo se almacena en una lista, podríamos iterar en ella, acceder a los datos con los índices y trabajar de la mejor manera que consideremos con estos datos.

	*Comprobar el inicio de una cadena:*

	Con el método *startswith()*, podríamos pasar como argumento algún carácter o palabra y verificar si una cadena inicia por esto, esto retornará un valor booleano donde si inicie la cadena de texto con esto nos retornara *True* y de no ser así retornara *False* y sabemos que a nivel de comprobaciones podremos utilizar estos valores en condicionales, ya que en estos siempre se trabaja con *True* o *False*.

	<img src="/apuntes/python-desde-cero/img-559.webp" alt="Captura de los apuntes" width="444" height="544" loading="lazy" decoding="async">

	*Verificar el final de cadenas de texto:*

	O lo anterior de la misma manera, pero aplicado para verificar el final de una cadena con el método *endswith()*:

	<img src="/apuntes/python-desde-cero/img-560.webp" alt="Captura de los apuntes" width="584" height="567" loading="lazy" decoding="async">

	El error mostrado es de un propio comando de bash, no tiene nada que ver con Python.

	*find() e index():*

	Ambas sirven exactamente para lo mismo, es importante saber que una cadena de texto podríamos tratarla accediendo a índices, donde cada uno de estos representaran un carácter de la cadena, incluyendo espacios y símbolos especiales, por lo que si tenemos la cadena "Hola", realmente podríamos acceder a cada letra de forma individual colocando sus 4 índices, del 0 al 3.

	Con esto en mente, al utilizar *find()* y buscar en la cadena "Hola Mundo" la palabra "Hola", si esta se encuentra en la cadena, lo que nos regresará será el índice donde comienza la palabra. En este caso comienza en el índice [0], ya que con eso comienza la cadena de texto. En caso de no existir una palabra que busquemos, lo que *find()* nos retornara será un valor -1.

	<img src="/apuntes/python-desde-cero/img-561.webp" alt="Captura de los apuntes" width="497" height="758" loading="lazy" decoding="async">

	En el caso del *index()*, funcionaría exactamente de la misma manera, la diferencia aquí es que cuando un valor no exista en la lista, esto nos retornará una excepción:

	<img src="/apuntes/python-desde-cero/img-562.webp" alt="Captura de los apuntes" width="874" height="363" loading="lazy" decoding="async">

	*Método count():*

	El método *count()* nos sirve perfectamente para contar el número de veces que aparece un carácter en una cadena, como el siguiente ejemplo:

	<img src="/apuntes/python-desde-cero/img-563.webp" alt="Captura de los apuntes" width="867" height="311" loading="lazy" decoding="async">

	La mayúscula no la consideraría, ya que Python es sensible a mayúsculas y minúsculas.

	*Método .join():*
	Este método podría ser de mucha ayuda cuando queramos representar todos los elementos contenidos en algún tipo de dato como diccionarios, listas, conjuntos, entre otros. Lo cual nos puede servir para, por ejemplo, de elementos que tengamos en una lista, representarlos todos separados por espacios:

	<img src="/apuntes/python-desde-cero/img-564.webp" alt="Captura de los apuntes" width="386" height="268" loading="lazy" decoding="async">

	Como vemos, las comillas antes del join indican lo que será el separador para cada elemento, en este caso un espacio.

	Por lo cual podríamos hacer un ejemplo donde separemos nombres por un espacio y coma:

	<img src="/apuntes/python-desde-cero/img-565.webp" alt="Captura de los apuntes" width="847" height="294" loading="lazy" decoding="async">

	*Método capitalize():*

	Nosotros podríamos tener una cadena de texto y si queremos asegurar que el primer carácter de esta sea representado en mayúscula, pues podremos usar *capitalize()*:

	<img src="/apuntes/python-desde-cero/img-566.webp" alt="Captura de los apuntes" width="379" height="265" loading="lazy" decoding="async">

	*Método title():*

	Si quisiéramos representar cada palabra de una cadena de caracteres que empiece con mayúscula la primera letra, entonces utilizaríamos el método *title()*:

	<img src="/apuntes/python-desde-cero/img-567.webp" alt="Captura de los apuntes" width="332" height="262" loading="lazy" decoding="async">

	*Método swapcase():*

	Podríamos utilizar el método *swapcase()*, para nosotros realizar un cambio en una cadena, donde los caracteres en mayúsculas los transformaría en minúsculas y las minúsculas en mayúsculas:

	<img src="/apuntes/python-desde-cero/img-568.webp" alt="Captura de los apuntes" width="373" height="269" loading="lazy" decoding="async">

	*Método isalpha():*

	Este método lo podremos utilizar para verificar si en una cadena de texto todo su contenido corresponde a letras del alfabeto, retornará un valor booleano donde, de ser así, será *True*, de lo contrario *False*:

	<img src="/apuntes/python-desde-cero/img-569.webp" alt="Captura de los apuntes" width="457" height="545" loading="lazy" decoding="async">

	En este caso da *False* en un inicio, porque incluso detecta el espacio y no está dentro del abecedario.

	*Método isdigit():*

	Funciona de la misma manera que el método anterior, pero en este caso es para verificar que nuestra cadena contenga solamente números:

	<img src="/apuntes/python-desde-cero/img-570.webp" alt="Captura de los apuntes" width="400" height="542" loading="lazy" decoding="async">

	*Método isspace():*

	Incluso con el método *isspace()*, podríamos verificar si nuestra cadena contiene solamente espacios:

	<img src="/apuntes/python-desde-cero/img-571.webp" alt="Captura de los apuntes" width="400" height="274" loading="lazy" decoding="async">

	*Métodos islower() y isupper():*

	Con estos dos podríamos verificar si toda una cadena está en mayúsculas o minúsculas:

	<img src="/apuntes/python-desde-cero/img-572.webp" alt="Captura de los apuntes" width="389" height="535" loading="lazy" decoding="async">

	*Método istitle():*

	Incluso podremos verificar si tenemos una cadena con cada palabra, que su inicial sea mayúscula:

	<img src="/apuntes/python-desde-cero/img-573.webp" alt="Captura de los apuntes" width="341" height="269" loading="lazy" decoding="async">

	*Eliminar caracteres con el método replace():*

	La forma en que podríamos hacer esto, es que con esto podremos reemplazar caracteres. Por ello podríamos reemplazar un carácter 'x' a nada '', lo cual veríamos cómo eliminarlo:

	<img src="/apuntes/python-desde-cero/img-574.webp" alt="Captura de los apuntes" width="705" height="276" loading="lazy" decoding="async">

	*Aplicar reemplazos de una forma más compleja con maketrans y translate():*

	Con maketrans primeramente tendríamos que definir una tabla, la cual sería como la que registraría los cambios que se van a aplicar, donde aquí, si colocamos varios caracteres, aplicará el cambio correspondiente al carácter en la posición correspondiente.

	Por ejemplo, si en la definición de la tabla coloco 'abc', y a lo que se va a cambiar coloco 'dfg', lo que haría sería cambiarme todas las letras 'a' por 'd', todas las 'b' por 'f', y así sucesivamente.

	La definición de nuestra tabla la hacemos de la siguiente manera con maketrans:

	<img src="/apuntes/python-desde-cero/img-575.webp" alt="Captura de los apuntes" width="561" height="84" loading="lazy" decoding="async">

	Y finalmente, aplicándole el método *translate()* a nuestra cadena y pasándole como argumento, la tabla, nos haría el reemplazo correspondiente:

	<img src="/apuntes/python-desde-cero/img-576.webp" alt="Captura de los apuntes" width="624" height="311" loading="lazy" decoding="async">
