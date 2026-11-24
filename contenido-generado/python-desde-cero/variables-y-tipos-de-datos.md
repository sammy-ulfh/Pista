---
curso: "python-desde-cero"
modulo: "python-desde-cero/fundamentos"
leccion: "variables-y-tipos-de-datos"
titulo: "Variables y tipos de datos"
orden: 5
minutos: 19.7
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 39
ejercicios: []
---

Las variables en Python son como nombres que se le asignan a los datos que manejamos. Piensa en una variable como un nombre que le asignas a un valor, para poder referirte a él y utilizarlo en distintas partes de tu código.

Ahora, vamos a enfocarnos en comprender las variables y algunos de los tipos de datos fundamentales en Python, Estos conceptos son esenciales, ya que nos permiten almacenar y manipular la información en nuestros programas.

**Variables:**

Una variable en Python es como un nombre que se le asigna a un dato. No es necesario declarar el tipo de dato, ya que Python es inteligente para inferirlo.

**Cadenas (Strings):**

Las cadenas son secuencias de caracteres que se utilizan para manejar texto. Son inmutables, lo que significa que una vez creadas, no puedes cambiar sus *caracteres individuales*.

Teniendo esto en cuenta, podríamos definir variables de la siguiente manera y aunque contengan valores numéricos, estos se manejarían como texto, debido a la forma en la que lo estamos declarando:

<img src="/apuntes/python-desde-cero/img-014.webp" alt="Captura de los apuntes" width="490" height="417" decoding="async">

De esta manera generamos y mostramos por pantalla nuestras cadenas de texto.

En la parte de la *ip_address*, mostramos entre llaves la variable para mostrarla con más texto en conjunto. Para que esto funcione y nos tome nuestra variable es importante agregar la *f* antes de nuestras comillas, de lo contrario lo tomaría como texto.

Cuando en un script queramos mostrar algo en pantalla, será importante colocarle siempre el print, de lo contrario no se mostrará en pantalla.

Tenido esto en cuenta podríamos ver el tipo de dato de la variable y veremos que aunque tengamos una con un número, es reconocida como cadena de texto debido a la forma en la que la estamos declarando.

Además, es posible realizarlo de ambas maneras que mostramos:

<img src="/apuntes/python-desde-cero/img-015.webp" alt="Captura de los apuntes" width="981" height="579" loading="lazy" decoding="async">


**Números:**

Python maneja varios tipos numéricos, pero nos enfocaremos principalmente en:

- *Enteros (Integers):* Números sin parte decimal.

	Ahora para declarar nuestras variables numéricas, quitándole el detalle de las comillas, hace la diferencia, ya que si se las quitamos ahora si el tipo de dato sería numérico:

	<img src="/apuntes/python-desde-cero/img-016.webp" alt="Captura de los apuntes" width="459" height="303" loading="lazy" decoding="async">

	Así como lo mostramos anteriormente, también es posible mostrarlo junto con otro texto, en caso de querer agregar algún mensaje antes de nuestro dato entero:

	<img src="/apuntes/python-desde-cero/img-017.webp" alt="Captura de los apuntes" width="586" height="316" loading="lazy" decoding="async">

	</br>
- *Flotantes (Floats):* Números que incluyen decimales.

	Y para nuestras variables de tipo numérico float, sería de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-018.webp" alt="Captura de los apuntes" width="1041" height="276" loading="lazy" decoding="async">
	

*Type Casting:*

En Python podremos referirnos a forzar o cambiar un tipo de dato como Type Casting.

Un ejemplo de como podríamos hacer esto es convirtiendo una variable de dato numérico a flotante:

<img src="/apuntes/python-desde-cero/img-019.webp" alt="Captura de los apuntes" width="1039" height="276" loading="lazy" decoding="async">

Como podremos agregamos un dato número entero, pero lo forzamos a ser float.

Podríamos realizarlo de la misma manera para convertir de float a entero:

<img src="/apuntes/python-desde-cero/img-020.webp" alt="Captura de los apuntes" width="1026" height="271" loading="lazy" decoding="async">

Así como también es posible convertir a Sting:

<img src="/apuntes/python-desde-cero/img-021.webp" alt="Captura de los apuntes" width="1037" height="267" loading="lazy" decoding="async">

**Listas:**

Las listas son colecciones ordenadas y mutables que pueden contener elementos de diferentes tipos. Son ideales para almacenar y acceder a secuencias de datos.

Y para trabajar con estas listas, así como con cadenas y rangos de números, utilizaremos los bucles *for*, que nos permiten iterar sobre cada elemento de una secuencia de manera eficiente.

Tendremos una forma sencilla de declarar una lista, la cual sería de la siguiente manera:

<img src="/apuntes/python-desde-cero/img-022.webp" alt="Captura de los apuntes" width="396" height="281" loading="lazy" decoding="async">

Esta sería una declaración de una variable con datos ya preestablecidos.

¿Pero qué pasa si queremos meterle datos sobre la marcha y declarar la lista vacía?

Pues para ello tendremos *append* que lo que hace es almacenar un dato en la última posición de la lista, lo que quiere decir que siempre irá agregando el dato a su vez que una nueva posición, por decirlo de alguna forma.

<img src="/apuntes/python-desde-cero/img-023.webp" alt="Captura de los apuntes" width="371" height="492" loading="lazy" decoding="async">

En Python es posible acceder a los datos de una lista de forma individual, por lo que en lugar de mostrar toda la lista podríamos mostrar posiciones específicas de la lista.

La forma en la que trabajaremos con los índices en Python será empezando desde el número 0, siendo de esta manera que el 0 corresponde a la última posición y n-1 será el número de nuestra última posición.

Un ejemplo para ello sería tener la lista [1,2,3,4], si queramos imprimir nuestro número 4, sería imprimiendo la posición 3 de este, ya que siempre empezamos a contar desde el 0.

<img src="/apuntes/python-desde-cero/img-024.webp" alt="Captura de los apuntes" width="354" height="389" loading="lazy" decoding="async">

Si quisiéramos acceder al índice 4, nos daría error, ya que simplemente este no existe:

<img src="/apuntes/python-desde-cero/img-025.webp" alt="Captura de los apuntes" width="829" height="483" loading="lazy" decoding="async">

Además, en Python tenemos una forma de referencias a nuestro índice final en nuestra lista, podríamos tener una lista muy larga y por ende no saber cuantos datos tiene en total, pero querer acceder al dato final, entonces lo podríamos hacer referenciando *-1* como nuestro índice:

<img src="/apuntes/python-desde-cero/img-026.webp" alt="Captura de los apuntes" width="336" height="473" loading="lazy" decoding="async">

Ahora bien, si lo que haremos será recorrer prácticamente índice a índice toda la lista, esta sería una mala forma de hacerlo.

En lugar de eso, lo mejor sería hacerlo mediante un bucle:

<img src="/apuntes/python-desde-cero/img-027.webp" alt="Captura de los apuntes" width="396" height="642" loading="lazy" decoding="async">

La forma de la imagen anterior, lo que hace es iterar posición por posición de toda la lista, asignándole en cada iteración el valor a port y por ende la acción que hace al recibir el valor es la que le indicamos que es que imprima la variable port.

Ahora, para la siguiente forma de hacerlo, es haciendo que el bucle for nos itere en un rango de números, generando una sumatoria en una variable en cada iteración hasta llegar al número indicado, en este caso del 0 al 8 para acceder hasta la posicion 7, debido a que en el bucle for cuando se indica un numero hasta el cual iterar, siempre llegara hasta un numero antes del indicado y aumentara el valor uno a uno.

Además, indicándole como acción en cada iteración que acceda a la posición en la que vaya:

<img src="/apuntes/python-desde-cero/img-028.webp" alt="Captura de los apuntes" width="435" height="835" loading="lazy" decoding="async">

Una forma más compleja de explicarlo sería que realmente lo que hace por atrás el bucle sería que:

- Tenemos nuestra variable i, la cual es inicializada en 0, por defecto nuestro bucle irá aumentando esta variable 1 a 1 hasta llegar un valor antes del indicado, pero esto es así porque realmente la condición aplicada es que sé detiene una vez que nuestra variable i llega a un valor menor al que nosotros indicamos, de esta manera.

  Si i < 8, esto será verdad y el bucle hará su última acción y se detendrá, ya que para la próxima valdrá 8 y la condición no será verdad.

En cuanto a la escalabilidad de nuestro código, utilizar bucles representa un mejor manejo.

Cuando nosotros agregamos código o indicaciones para nuestro programa dentro de funciones, clases o bucles, es muy importante que este contenido esté tabulado (4 espacios hacia adentro de nuestra declaración del bucle, clase o función)

De esta manera podremos diferencias entre lo que ejecutará nuestra declaración y lo que no, por ende si hacemos lo siguiente, veremos cómo el primer texto se repite en bucle, mientras que el segundo no.

<img src="/apuntes/python-desde-cero/img-029.webp" alt="Captura de los apuntes" width="445" height="876" loading="lazy" decoding="async">

En Python es posible saber cuantos datos está almacenando una lista con la función *len()*, pasándole la lista como argumento.

Además, como *append()* solo nos permite agregar un solo elemento a la lista, tenemos una alternativa que permite agregar múltiples elementos y esta es *extend()*.

Ambas se utilizarían de la siguiente manera:

<img src="/apuntes/python-desde-cero/img-030.webp" alt="Captura de los apuntes" width="806" height="519" loading="lazy" decoding="async">

También es importante notar que en las listas podremos repetir elementos y estos también serán contados al utilizar *len()*, por lo que en las listas se contemplan repeticiones de elementos anteriores.

También, es posible agregar elementos como si estuviésemos sumando lista con lista, de la siguiente manera:

<img src="/apuntes/python-desde-cero/img-031.webp" alt="Captura de los apuntes" width="819" height="607" loading="lazy" decoding="async">

La forma anterior será una forma más corta de representarlo, pero es lo mismo que realizar lo siguiente:

<img src="/apuntes/python-desde-cero/img-032.webp" alt="Captura de los apuntes" width="804" height="604" loading="lazy" decoding="async">

*Ordenamiento en listas:*

En Python, al tener una lista totalmente ordenada, podremos ordenarla con el uso de la función *sorted()*, de la siguiente manera:

<img src="/apuntes/python-desde-cero/img-033.webp" alt="Captura de los apuntes" width="800" height="656" loading="lazy" decoding="async">

*Eliminar elementos en una lista:*

Para eliminar valores en una lista, podríamos utilizar *del* y podríamos borrar el elemento almacenado en un índice específico. Por ejemplo, el índice 0, eliminaría el valor almacenado y recorría a todos los que están delante de él.

De esta manera, ahora el elemento en el índice 0, sería el que anteriormente se encontraba en el índice 1:

**Sin aplicar la eliminación:**

<img src="/apuntes/python-desde-cero/img-034.webp" alt="Captura de los apuntes" width="795" height="680" loading="lazy" decoding="async">

**Aplicando la eliminación:**

<img src="/apuntes/python-desde-cero/img-035.webp" alt="Captura de los apuntes" width="790" height="659" loading="lazy" decoding="async">

**Probando cosas con la consola interactiva:**

En nuestra consola interactiva probaremos lo siguiente, de esta manera podremos observar como podremos mostrar múltiples elementos desde el inicio de la lista hasta donde deseemos:

<img src="/apuntes/python-desde-cero/img-036.webp" alt="Captura de los apuntes" width="393" height="239" loading="lazy" decoding="async">

De esta manera, al agregar en el índice *:*, seguidamente le podremos indicar el número de elementos que queremos que nos muestre, en este caso si sería del primer valor de la lista en adelante.

Además, si llegamos a colocar más números de los existentes que tiene la lista, esto no nos daría error, pero realmente solo podría mostrarnos los existentes.

Pero ahora, si quisiéramos trabajar sobre rangos, ahí sí sería con base en el índice, teniendo la posibilidad de indicar que te muestre desde el índice 1 al 4 [*1:4]*, y nos mostrará desde el primer índice indicado hasta uno antes del colocado después de los *:*

<img src="/apuntes/python-desde-cero/img-037.webp" alt="Captura de los apuntes" width="787" height="413" loading="lazy" decoding="async">

Otra forma de realizarlo, es colocar los elementos a la izquierda en lugar de la derecha.

Esto lo que haría sería evitar mostrarnos el número de elementos indicados, desde el principio, y mostrarnos elementos partiendo del siguiente al que le indicamos, de la siguiente manera:

<img src="/apuntes/python-desde-cero/img-038.webp" alt="Captura de los apuntes" width="704" height="326" loading="lazy" decoding="async">

Además, lo mencionado anteriormente, para acceder al último elemento con el índice *-1*, realmente nos funcionaría para recorrer la lista de forma inversa, tomando como penúltimo elemento el índice *-2* y así sucesivamente.

<img src="/apuntes/python-desde-cero/img-039.webp" alt="Captura de los apuntes" width="721" height="352" loading="lazy" decoding="async">

Ya si indicáramos un índice *-7*, nos pasaría lo mismo que al tratar de acceder a un índice que no existe, dándonos error.

*Insertar datos en una posición específica:*

Para poder insertar datos en una posición específica, podríamos utilizar la función *insert()*, recibiendo dos argumentos, donde el primero es el índice y el segundo el dato a ingresar.

De esta manera, el dato que estaba en ese índice y  los siguientes, se recorrerán una posición hacia adelante, para permitir a este ingresar en esta posición.

Además, es posible que nuestras listas contengan distintos tipos de datos, por lo que podríamos mezclar entre enteros y strings, pero aquí, al querer utilizar por ejemplo un ordenamiento, ya no funcionaría y tiene todo el sentido del mundo.

<img src="/apuntes/python-desde-cero/img-040.webp" alt="Captura de los apuntes" width="676" height="444" loading="lazy" decoding="async">

*Eliminar contenido de una lista:*

Para eliminar el último elemento de una lista, vamos a contemplar la lista anterior.

Lo que nos ayudaría para ello sería *pop()*, usándolo de la misma forma que utilizamos append, extend, etc.

<img src="/apuntes/python-desde-cero/img-041.webp" alt="Captura de los apuntes" width="369" height="432" loading="lazy" decoding="async">

También podremos *saber el índice de un dato en concreto*, si llegamos a tener una lista muy grande. Sabemos que tenemos un dato, pero, sin embargo, no tenemos su índice. Para esto realizaríamos lo siguiente.  
  
Además, lo que haríamos primeramente sería una reasignación de la lista. De esta manera eliminaríamos el contenido anterior de la variable y agregaríamos contenido nuevo, sin que permanezca el anterior.

Para ello utilizaríamos *index()*:

<img src="/apuntes/python-desde-cero/img-042.webp" alt="Captura de los apuntes" width="797" height="181" loading="lazy" decoding="async">

*Pero, ¿qué pasa si tenemos elementos repetidos?*

En este caso, si utilizamos indexa, no funcionaría para listar los índices de todos los elementos repetidos, ya que en este caso se podría considerar que index revisa la lista uno a uno desde el índice inicial.

Por ende, a la primera coincidencia con el dato que se está buscando, ese será el índice que nos retorne:

<img src="/apuntes/python-desde-cero/img-043.webp" alt="Captura de los apuntes" width="753" height="277" loading="lazy" decoding="async">

Por lo tanto, si quisiéramos tener todos los índices de este dato, existe una forma de hacerlo.

Para ello, una forma de hacerlo sería creando una nueva lista, la cual contenga como elementos los índices de ese elemento en la lista principal.

Antes de esto, tenemos la función *enumerate()* a la cual, si le pasamos nuestra lista esta nos devolverá que es un objeto, y si iteramos en ella por un lado, el índice y, por otro lado, el valor que almacena:

<img src="/apuntes/python-desde-cero/img-044.webp" alt="Captura de los apuntes" width="738" height="545" loading="lazy" decoding="async">

Aquí la variable x almacenaría el valor del índice, mientras que y almacenaría el valor o dato en ese índice.

Ahora, teniendo esto en consideración, podríamos aplicar lo siguiente:

<img src="/apuntes/python-desde-cero/img-045.webp" alt="Captura de los apuntes" width="746" height="269" loading="lazy" decoding="async">

De esta manera, lo que se hace dentro de nuestra declaración dentro la lista es indicarle que:

- *La X al inicio:* Nos almacena o "muestre" el contenido de la variable x cuando el bucle esté iterando sobre cada posición.

- *El bucle:* Con enumerate obtendrá el índice y el valor, iterando en cada posición de la lista.

- *El condicional:* Se aplica una condición en la que si *y* (el valor en las posiciones) es igual al número que estamos buscando, entonces si se cumplirá el hecho de que nos almacene el contenido de x, como posición individual en la lista dentro de cada iteración.

  Si no indicáramos este condicional, lo que pasaría sería que nos almacenaría todos los índices.


*Contar el número de veces que sale un elemento:*

Para esto podremos utilizar *count()*, pasándole como argumento el número del cual queremos saber cuántas veces se repite:

<img src="/apuntes/python-desde-cero/img-046.webp" alt="Captura de los apuntes" width="748" height="141" loading="lazy" decoding="async">

*Forzar el no tener repeticiones en una lista:*

Para esto, realmente lo que tendríamos que hacer es convertir nuestra lista a un tipo de dato *set*. Este lo que tiene es que, por defecto, no contempla repeticiones de datos y además de ello podremos convertirlo o forzar su conversión nuevamente a una lista:

<img src="/apuntes/python-desde-cero/img-047.webp" alt="Captura de los apuntes" width="792" height="397" loading="lazy" decoding="async">

Como podremos ver, lo que hacemos es forzar las conversiones entre *set* y *list*. Al convertir nuestra lista a set, vemos que queda desordenada, por lo que, por último, la ordenamos y nos queda nuestra lista sin ningún dato repetido.

Además, en el set, si en algún momento intentamos meter algún dato repetido, hasta podría llegar a darnos algún tipo de error.

Ahora lo siguiente es exactamente lo mismo, pero representado de una mejor manera:

<img src="/apuntes/python-desde-cero/img-048.webp" alt="Captura de los apuntes" width="899" height="181" loading="lazy" decoding="async">

*Encontrar el número más grande y más pequeño en una lista:*

Para esto utilizamos *max()* y *min()* y funcionará este o no ordenada la lista:

<img src="/apuntes/python-desde-cero/img-049.webp" alt="Captura de los apuntes" width="666" height="180" loading="lazy" decoding="async">

*Sumar todos los valores de una lista:*

Para ello podremos utilizar *sum()*:

<img src="/apuntes/python-desde-cero/img-050.webp" alt="Captura de los apuntes" width="678" height="125" loading="lazy" decoding="async">

Entonces, ahora, si quisiéramos, hasta, podríamos sacar la media o promedio implementando el uso de *len()* para dividir entre el número total de datos en la lista:

<img src="/apuntes/python-desde-cero/img-051.webp" alt="Captura de los apuntes" width="675" height="131" loading="lazy" decoding="async">

Además, como por ejemplo, si contamos con 7 elementos, al dividir entre 7 suele darnos muchos decimales, por ello tenemos *round()* y este nos ayuda a mostrar la cantidad de elementos decimales que deseemos. Es importante considerar que aplicará redondeos.

Mientras no le indiquemos el número de decimales que deseamos mostrar, como segundo argumento, solo nos mostrará el número entero redondeándolo.

<img src="/apuntes/python-desde-cero/img-052.webp" alt="Captura de los apuntes" width="616" height="292" loading="lazy" decoding="async">


Estas son solo algunas de las estructuras de datos con las que trabajaremos por el momento, a medida que avancemos exploraremos más tipos de datos y estructuras más complejas, ampliando nuestras herramientas para resolver problemas y contruir programas más sofisticados.
