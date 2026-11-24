---
curso: "python-desde-cero"
modulo: "python-desde-cero/colecciones"
leccion: "proyecto-de-videojuegos"
titulo: "Proyecto de videojuegos"
orden: 16
minutos: 12.3
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 22
ejercicios: []
---

Con base en todo lo anterior, se realizará un proyecto de gestión de videojuegos en Python. Este proyecto servirá para consolidar nuestras habilidades de programación, abordando administración de ventas, la gestión del stock y la actualización de datos en un sistema de control central.

Este proyecto será guiado paso a paso, mostrando cómo se puede aplicar cada estructura de datos en situaciones concretas de manejo de información. Se creará un programa que no solo administre eficientemente los datos de videojuegos, sino que también sea capaz de interactuar con el usuario para realizar consultas y actualizar el inventario.

Para todo el proyecto haremos como una versión simple y una un poco más compleja.

**Shebang**

Desde luego, inicialmente tendremos que agregar el *shebang*, el cual ya sabemos que nos ayudará a indicarle al sistema con que interprete ejecutarse, en este caso, python3:


```shell
#!/usr/bin/env python3
```

**Representación**

Vamos a tratar de representar nuestro proyecto en partes, de esta manera podríamos empezar creando un tipo de separadores mediante el uso de comentarios:

<img src="/apuntes/python-desde-cero/img-254.webp" alt="Captura de los apuntes" width="373" height="265" decoding="async">

**Apartado Géneros**

En este apartado comenzaríamos creando un diccionario en el cual almacenaremos nuestros juegos. Aquí, como se trabajará, será que la clave es el nombre del juego y el valor viene siendo la categoría del juego.

Por ejemplo, teniendo el juego "Super Mario Bros" donde su categoría es "Aventura", quedándonos varios juegos representados de la siguiente manera:

<img src="/apuntes/python-desde-cero/img-255.webp" alt="Captura de los apuntes" width="554" height="409" loading="lazy" decoding="async">

**Apartado ventas y stock**

Ahora, para  nuestro apartado de ventas y stock, crearíamos un diccionario tomando como clave los mismos juegos, pero como valor le agregaremos una tupla que contendrá dos valores, como primer valor el total de juegos que se han vendido y como segundo valor el total de juegos disponibles en stock:

<img src="/apuntes/python-desde-cero/img-256.webp" alt="Captura de los apuntes" width="579" height="494" loading="lazy" decoding="async">

**Apartado clientes**

Ahora, en el apartado de clientes, vamos a generar un diccionario en el cual la clave seguirá siendo el juego, pero en el valor agregaremos un conjunto, el que indicará los nombres de los clientes.

Para efectos prácticos agregaremos una serie de pocos clientes y consideraremos que entre ellos compraron un total del número de ventas que tenemos para cada juego, ya que el colocar 924 como lo es en el caso del *Final Fantasy VII*, sería más tedioso y además para efectos más prácticos en sistemas ya complejos los clientes se van agregando conforme los clientes van realizando sus compras.

Por ello quedaría representado de la siguiente manera:

<img src="/apuntes/python-desde-cero/img-257.webp" alt="Captura de los apuntes" width="885" height="183" loading="lazy" decoding="async">

**Sumario**

Para el sumario antes tendremos una variable donde tendremos un juego y luego imprimiremos o mostraremos información sobre este dentro del apartado de sumario.

<img src="/apuntes/python-desde-cero/img-258.webp" alt="Captura de los apuntes" width="604" height="163" loading="lazy" decoding="async">

Hasta aquí, lo que estamos definiendo es que nos vaya a empezar a mostrar un resumen del juego que tenemos en la variable "mi_juego".

Los corchetes y las cosas sobre estos son para representar de una mejor forma el output de lo que vayamos a mostrar, y los símbolos especiales como "\n" nos sirve para realizar un salto de línea y no mostrar las cosas en líneas pegadas, dándole una mejor vista.

El otro símbolo especial "\t" nos sirve para efectuar un tabulado en nuestro output. Tengamos en cuenta que, como tabulado, querría decir prácticamente separar 4 espacios donde sea colocado, en este caso al inicio.

De esta manera, hasta ahora tendríamos un output así:

<img src="/apuntes/python-desde-cero/img-259.webp" alt="Captura de los apuntes" width="952" height="924" loading="lazy" decoding="async">

Ahora agregaríamos el mostrar total de ventas para el juego en cuestión, recordando que en la tupla podremos acceder a los valores como en una lista y el primer valor (índice 0) es el que corresponde a las ventas, mientras que el segundo valor corresponde al stock.

<img src="/apuntes/python-desde-cero/img-260.webp" alt="Captura de los apuntes" width="847" height="433" loading="lazy" decoding="async">

Realizaríamos lo mismo para mostrar el total de unidades de ese juego que quedan existentes en el stock:

<img src="/apuntes/python-desde-cero/img-261.webp" alt="Captura de los apuntes" width="947" height="473" loading="lazy" decoding="async">

Ahora faltaría mostrar los clientes que han comprado este juego, para ello podríamos mostrarlo accediendo de la misma manera, pero al realizarlo observaremos que la representación de este se nos haría en el tipo de dato del conjunto, por lo que para representar los nombres así directamente se vería un poco feo:

<img src="/apuntes/python-desde-cero/img-262.webp" alt="Captura de los apuntes" width="1100" height="499" loading="lazy" decoding="async">

Para corregir esto o mostrarlo de una mejor manera, tendríamos la posibilidad de utilizar *' '.join()*, el cual nos ayuda a indicarle de qué manera representarnos el contenido y qué colocar entre cada elemento del conjunto:

<img src="/apuntes/python-desde-cero/img-263.webp" alt="Captura de los apuntes" width="981" height="537" loading="lazy" decoding="async">

De esta manera, dentro de las comillas del join tendremos que indicarle cómo queremos representar los elementos del conjunto y qué colocar entre cada elemento. En este caso, le indicamos que nos coloque una coma y un espacio, para una representación más limpia de cada cliente.

Hasta aquí ya tendríamos un programa sencillo, el cual nos listaría la información de los juegos que tengamos registrados. Ahora, con cambiar el juego en nuestra variable *mi_juego*, que en programas más complejos sería un input del usuario, nos mostraría la informacion para ese juego.

<img src="/apuntes/python-desde-cero/img-264.webp" alt="Captura de los apuntes" width="974" height="542" loading="lazy" decoding="async">

Con esto ya tendríamos un pequeño programa que nos permite listar la información de los juegos, pero aún podemos hacerlo más interesante.

**Haciendo nuestro programa más completo**

Ahora, al inicio de nuestro programa, crearíamos una lista en la cual ingresaríamos los juegos que tenemos disponibles:

<img src="/apuntes/python-desde-cero/img-265.webp" alt="Captura de los apuntes" width="1010" height="82" loading="lazy" decoding="async">

De esta manera, ahora podríamos eliminar nuestra variable *mi_juego* y colocar nuestro sumario en una función. A esta le pasaremos como argumento elemento a elemento el contenido de la lista para que nos dé un resumen de todos los juegos.

Por ende, tendríamos que definir el parámetro *juego* en nuestra función y a este se le pasaría como argumento el juego correspondiente cuando iteremos nuestra lista. Por lo que, también tendríamos que cambiar la llave por la que se buscará en cada diccionario debido a que ahora la variable *mi_juego* ya no existe. En su lugar utilizaremos el parámetro definido *juego*, el cual recibirá el contenido y será prácticamente una variable dentro de la función:

<img src="/apuntes/python-desde-cero/img-266.webp" alt="Captura de los apuntes" width="928" height="194" loading="lazy" decoding="async">

Ahora iteraríamos en la lista y le pasaríamos el nombre de cada juego para que nos liste toda la información:

<img src="/apuntes/python-desde-cero/img-267.webp" alt="Captura de los apuntes" width="288" height="70" loading="lazy" decoding="async">

Aquí entra en juego la reutilización del código, ya que mandamos a llamar múltiples veces nuestra  función.

Así como también en las variables, entraría en juego el ámbito de las variables, por lo que no habría conflicto si le pasamos una variable con el mismo nombre del parámetro de nuestra función. Esto lo podríamos ver como si fuesen dos variables distintas, una existente en nuestro bucle y otra en nuestra función, y es como si le pasáramos a la variable de la función el contenido de la variable del bucle.

Por lo que no nos generaría ningún conflicto, ya que el ámbito de cada variable está en su respectivo bloque, una en el bucle y una en la función, como si de dos variables distintas se tratase.

Ahora, si ejecutáramos nuestro programa, nos mostraría un resumen de todos los juegos:

<img src="/apuntes/python-desde-cero/img-268.webp" alt="Captura de los apuntes" width="997" height="637" loading="lazy" decoding="async">

Teniendo esto, podríamos jugar con distintas cosas. Un ejemplo sería el querer que nos muestre los datos de solamente aquellos juegos que hayan tenido más de 500 ventas, en este caso tendríamos que agregar un condicional que verifique las ventas para los juegos:

<img src="/apuntes/python-desde-cero/img-269.webp" alt="Captura de los apuntes" width="930" height="281" loading="lazy" decoding="async">

De esta manera se nos mostrarían solamente aquellos que hayan tenido más de 500 ventas:

<img src="/apuntes/python-desde-cero/img-270.webp" alt="Captura de los apuntes" width="976" height="333" loading="lazy" decoding="async">

Y además, con lo que hemos hecho, podremos tener múltiples formas que se nos ocurran de agregar como característica para mostrar la información, así como lo es la de mostrar solamente aquellas que hayan tenido cierto numero de ventas.

Al final del todo, podríamos considerar agregar algo que nos retornara el total de unidades que han sido vendidas considerando todos los juegos. Para esto podríamos emplear una función lambda e iterar sobre todos los valores del diccionario que almacena las ventas y el stock:

<img src="/apuntes/python-desde-cero/img-271.webp" alt="Captura de los apuntes" width="964" height="637" loading="lazy" decoding="async">

La definición de nuestra función lambda es sencilla de comprender, al iterar sobre los valores de nuestro diccionario gracias a *.value()*, accedemos a las tuplas que, por un lado, contienen las ventas y por otro el stock. Con esto sabemos que podemos acceder a ambos mediante un bucle y almacenarlo en dos variables, en este caos almacenamos el dato de ventas en la variable ventas y para el valor del stock colocamos un guion bajo *_*, esto quiere decir que queremos ignorar o eliminar ese valor, ya que no lo tomaremos en cuenta para lo que realizaremos.

Con el recorrido listo, a la izquierda del bucle tendremos que indicar que hacer, como queremos que retorne el valor de ventas, pues colocamos la variable, como conforme se vaya ejecutando, queremos que se vaya sumando para tener un total de las unidades vendidas, por lo que agregamos el método *sum()* para esto y finalmente almacenar el valor total de unidades vendidas.

Como podremos observar, el total de ventas que nos representa es de todos los productos, pero nosotros solo estamos mostrando los productos con ventas arriba de las 500 unidades, por lo que para arreglarlo haríamos lo siguiente:

<img src="/apuntes/python-desde-cero/img-272.webp" alt="Captura de los apuntes" width="1092" height="172" loading="lazy" decoding="async">

<img src="/apuntes/python-desde-cero/img-273.webp" alt="Captura de los apuntes" width="1292" height="121" loading="lazy" decoding="async">

De esta manera, lo que estamos haciendo es que además de recuperar los valores, también recuperamos las claves en cada iteración del diccionario, por lo que ahora tendríamos cada uno de los nombres.

Con esto, podríamos agregar la misma condición que agregamos en el primer bucle, asegurando que solo nos realice la suma de las ventas cuando el total de ventas sea mayor al tope que hayamos definido, para ello se crea una variable global *tope*, para poder considerarla en ambas.

Por lo que ahora nuestro output quedaría de la siguiente manera:

<img src="/apuntes/python-desde-cero/img-274.webp" alt="Captura de los apuntes" width="960" height="376" loading="lazy" decoding="async">

Si llegáramos a cambiar el tope de unidades vendidas para que nos muestre más, con un tope de 100 quedaría de la siguiente manera:

<img src="/apuntes/python-desde-cero/img-275.webp" alt="Captura de los apuntes" width="972" height="526" loading="lazy" decoding="async">

Con esto hemos concluido el proyecto, finalmente con una herramienta la cual está completa debido a que dependiendo de características que modifiquemos, en este caso como lo es el tope, nos mostrara distinta información.
