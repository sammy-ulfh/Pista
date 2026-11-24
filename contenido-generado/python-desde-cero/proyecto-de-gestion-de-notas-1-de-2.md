---
curso: "python-desde-cero"
modulo: "python-desde-cero/proyectos"
leccion: "proyecto-de-gestion-de-notas-1-de-2"
titulo: "Proyecto de gestión de notas (1 de 2)"
orden: 34
minutos: 14.2
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 24
ejercicios: []
---

1. **Introducción**

	En este proyecto se realizará la construcción de un gestor de notas avanzado, aprovechando las técnicas de la Programación Orientada a Objetos (POO). Nuestro objetivo es crear un sistema interactivo que nos permita manejar eficientemente una variedad de notas.

	El corazón de nuestro proyecto será un menú interactivo desde el cual podremos realizar múltiples acciones. Entre estas, incluiremos la capacidad de crear nuevas notas que serán almacenadas en disco, virtualizar todas las notas existentes, buscar notas específicas por ciertos criterios y eliminar notas que ya no sean necesarias.

	Para lograr esto, definiremos varias clases y métodos que colaborarán para manejar las diferentres operaciones relacionadas con las notas. Una parte crucial de nuestro proyecto será la implementación de módulos múltiples, lo que nos permitirá organizar mejor nuestro código y hacerlo más mantenible.

	Además, exploraremos los conceptos de serialización y deserialización de datos utilizando Pickle. Esto nos permitirá guardar y recuperar eficientemente el estado de nuestras notas desde y hacia el disco, facilitando la persistencia de los datos a través de las sesiones de uso del gestor.

	Este proyecto no solo fortalecerá nuestras habilidades en POO y manejo de datos, sino que también nos proporcionará experiencia práctica en la creación de aplicaciones Python que interactúan con el sistema de archivos y gestionan la información de manera eficiente.
	</br>
2. **Práctica:**

	Esta será un proyecto para trabajar con una gestión de notas y además le agregaremos la serialización y deserializacion de datos con Pickle, lo que nos permitirá serializar objetos (un proceso el cual nos permite que este se almacene a nivel de disco o transmitido a nivel de red) y también aplicar una deserializacion (un proceso en el cual se trata de recuperar un objeto para poder acceder a sus datos).

	Por lo tanto, hasta ahora entendemos un objeto como una instancia de una clase, pero en el concepto de la serialización y deserializacion de datos, un objeto abarca algo más amplio, ya que se pueden considerar desde *listas*, *tuplas*, *diccionarios*, *numeros*, *cadenas*, entre otros.

	Esto le añade un nivel más de complejidad, pero desde luego nos permitirá manejar todo de una forma mucho más cómoda.

	*main.py*

	Comenzaríamos definiendo un archivo *main.py*, en este vamos a colocar el shebang y después la comprobación de que este script o módulo, se esté ejecutando de forma directa y si es así se realizarán las acciones correspondientes:

	<img src="/apuntes/python-desde-cero/img-635.webp" alt="Captura de los apuntes" width="301" height="80" decoding="async">

	En esta ocasión lo cambiaremos un poco y es una de las formas que incluso yo consideraría mejor, ya que lo que haríamos sería crear una función principal donde se encuentre nuestro menú principal y esta función la llamaremos desde nuestra comprobación del archivo.

	La función principal suele ser llama *main()*, en esta nosotros definiremos todo nuestro menú principal, el cual se repetirá de forma infinita a menos que el usuario desee salir de este, lo cual también estará en una de las opciones.

	<img src="/apuntes/python-desde-cero/img-636.webp" alt="Captura de los apuntes" width="641" height="352" loading="lazy" decoding="async">

	Esto mostraría nuestro pequeño menú de forma infinita, por lo que una vez se termine de ejecutar la acción que efectuemos, regresaremos al menú.

	Lo siguiente sería almacenar en una variable la opción seleccionada, como con *input()* al convertirlo a entero para asegurar que sea un número puede darnos algún error, pues lo haremos efectuando un *try* y lanzaremos una excepción de *ValueError*, donde lanzaremos un mensaje y luego colocaremos un *continue* para asegurar que no entre de ninguna manera a nuestro condicional en esa ocasión, a menos que el usuario ingrese correctamente un dato numérico:

	<img src="/apuntes/python-desde-cero/img-637.webp" alt="Captura de los apuntes" width="961" height="396" loading="lazy" decoding="async">

	Comenzaremos contemplando las opciones, primeramente definiremos la *1*, donde al agregarse una nota le pediremos al usuario que la ingrese para almacenarla. Contemplando la opción final *5*, colocaríamos un *break* para salir del bucle y finalmente, en el peor de los casos donde la opción ingresada sea un número mayor 5 o menor a 1, imprimiremos un mensaje en pantalla de que es una opción incorrecta:

	<img src="/apuntes/python-desde-cero/img-638.webp" alt="Captura de los apuntes" width="567" height="167" loading="lazy" decoding="async">

	Nuestro condicional lo iremos completando conforme vayamos creando la funcionalidad del programa. Por ahora, seguido del condicional, colocaremos un input sin almacenar nada, solo será para mostrar una pausa, donde solo avanzara el programa una vez el usuario le dé *\<Enter\>*.

	Además, cada que lleguemos a este punto, como ya se han terminado de efectuar ciertas cosas, pues buscaremos limpiar la pantalla y esto lo podremos hacer con la librería *os*. La forma en la que podremos hacer es utilizar primeramente *os.name*, nos servirá para comprobar si el sistema es *Linux* o *Windows*, este nos retorna 'posix' para Linux y 'nt' para Windows, el comando para limpiar la pantalla en *Linux* es *clear*, mientras que en *Windows* es *cls*.

	Con base en la comprobación le pasaremos como argumento el comando a *os.system()* y esto se encargará de ejecutarlo.

	<img src="/apuntes/python-desde-cero/img-639.webp" alt="Captura de los apuntes" width="525" height="81" loading="lazy" decoding="async">

	Recordemos que para que funcione tendremos que importar la librería *os*, debajo del shebang:

	<img src="/apuntes/python-desde-cero/img-640.webp" alt="Captura de los apuntes" width="160" height="46" loading="lazy" decoding="async">

	*Librería pickle:*

	Si vamos al intérprete de Python, la librería *pickle* deberíamos poder importarla sin problemas porque ya debería venir el módulo en Python, ya que esta dependerá de un archivo en el PATH que Python contempla.

	En cado de que al importarla nos dé error, esto quiere decir que no la tenemos instalada, pero es sencillo de instalar con:

	```shell
	pip3 install pickle-mixin  
	```

	Yo aplico un *source* al inicio porque cargo un entorno donde se  me instalan las librerías:

	<img src="/apuntes/python-desde-cero/img-641.webp" alt="Captura de los apuntes" width="547" height="237" loading="lazy" decoding="async">

	Ahora, en el intérprete de Python vamos  a importar la librería *pickle*, con esto vamos a pensar en que ya tenemos un objeto, pero este objeto es pensado en el ámbito de la serialización y deserializacion, lo que quiere decir que puede ser cualquier cosa que almacene un tipo de dato, como listas, diccionarios, cadenas de texto, etc.

	Estos serán los que convertiremos a formato bytes, lo que será una secuencia de bytes que almacenaremos en disco o transmitirlo a nivel de red, en función de lo que deseemos realizar.

	Con esto en mente, crearemos una lista de diccionarios que almacenará las notas, donde cada nota será un diccionario con dos pares de clave-valor, donde se almacenara el nombre de la nota y el contenido de esta.

	<img src="/apuntes/python-desde-cero/img-642.webp" alt="Captura de los apuntes" width="1755" height="182" loading="lazy" decoding="async">

	Si nosotros quisiéramos almacenar esto en un archivo, manteniendo incluso el tipo de dato, sería algo complejo de realizar, pero con *pickle* esto se puede hacer de una forma mucho más cómoda serializando objetos a un formato de bytes o incluso para volver a transformar esa secuencia de bytes a un objeto para interpretarlo e ingresar a su contenido. Por lo que es más conveniente.

	Con esto en mente, de la forma que podríamos realizarlo es primeramente creando o abriendo un archivo *notas.pkl* y recordemos que almacenara en contenido en bytes, por lo que aparte de abrir para escritura con *w*, también tendremos que agregar la *b* para que nos lo interprete correctamente, por lo tanto, quedaría *wb*.

	Además, con *pickle*, utilizaremos *dump()*, donde como primer argumento le pasaremos el objeto que deseamos almacenar y como segundo argumento el archivo donde lo almacenará:

	<img src="/apuntes/python-desde-cero/img-643.webp" alt="Captura de los apuntes" width="408" height="92" loading="lazy" decoding="async">

	Si observáramos nuestro directorio actual observaríamos como este archivo ya está existente y se considerará un binario, si listamos su contenido se vería de la siguiente forma:

	<img src="/apuntes/python-desde-cero/img-644.webp" alt="Captura de los apuntes" width="1629" height="144" loading="lazy" decoding="async">

	Como vemos, el contenido es almacenado de una forma un tanto peculiar y es complicado que sea legible.

	Pero con esto lo interesante viene a la hora de volver a abrir el archivo pero ahora con posibilidad de lectura, ya que aquí ahora podremos definir que con *load()*, pasándole como argumento el archivo nos recupere el objeto, de esta manera podríamos guardarlo en una variable *mis_notas* y con esto ahora al ver el contenido dela variable, observaríamos como tenemos la lista que almacenamos con *dump()*:

	<img src="/apuntes/python-desde-cero/img-645.webp" alt="Captura de los apuntes" width="1752" height="142" loading="lazy" decoding="async">

	Por lo tanto, esta seria la idea con *pickle* para almacenar en un archivo binario nuestras notas y recuperarlas para tenerlas legibles en nuestro propio programa.

	*Gestor de notas:*

	Con esto en mente, ahora crearíamos un nuevo módulo *gestor_notar.py*, en el cual definiremos la clase *GestorNotas* en la cual para nuestro constructor contemplaremos como argumento *archivo_notas*, esté lo contemplaremos para que por defecto se cree un archivo con nombre "notas.pkl", pero sí deseamos cambiar el nombre bastaría con pasarle otro al instanciar la clase.

	<img src="/apuntes/python-desde-cero/img-646.webp" alt="Captura de los apuntes" width="547" height="151" loading="lazy" decoding="async">

	Con esto ahora en nuestro archivo *main.py*, importaríamos directamente la clase *GestorNotas* del módulo *gestor_notas.py* y crearíamos una instancia *gestor* de la misma:

	<img src="/apuntes/python-desde-cero/img-647.webp" alt="Captura de los apuntes" width="433" height="143" loading="lazy" decoding="async">

	Ahora en nuestro módulo *gestor_notas.py* vamos a manejar una excepción donde intentaremos abrir el archivo en modo de lectura, tú esto es posible quiere decir que el archivo existe y por ende cargaremos al atributo *notas* el contenido del archivo "notas.pkl", lo cual lo tendremos en mente como si fuese una lista, por la forma en que almacenaremos todo el contenido.

	En caso de que el archivo no exista, tendremos que lanzar la excepción *FileNotFoundError* y definiremos el atributo *notas* como una lista vacía:

	<img src="/apuntes/python-desde-cero/img-648.webp" alt="Captura de los apuntes" width="576" height="273" loading="lazy" decoding="async">

	De esta manera, en caso de que el archivo no exista, las notas que iremos agregando se irán almacenando en la lista de nuestro atributo *notas*, por ende al cargar el contenido al archivo será la lista y al recuperarlo también.

	*Método agregar_notas:*

	Con todo lo anterior definido, ahora definiríamos en nuestra clase *GestorNotas* un método el cual se encargue de agregar las notas a nuestra lista de nuestro atributo *notas*, donde como argumento recibirá el contenido de la nota:

	<img src="/apuntes/python-desde-cero/img-649.webp" alt="Captura de los apuntes" width="377" height="69" loading="lazy" decoding="async">

	Esto está bien, pero realmente para no tener solamente una lista con cadenas de texto, lo mejor sería representar esto a nivel de objeto, el cual tenga sus atributos y métodos.

	Por ende aquí inicializaríamos una instancia temporal de la clase *Nota*, donde le pasaremos como argumento el contenido de la nota y esto hará que nos almacene en nuestra lista un objeto.

	<img src="/apuntes/python-desde-cero/img-650.webp" alt="Captura de los apuntes" width="408" height="81" loading="lazy" decoding="async">

	Entonces, en nuestro módulo *gestor_notas*, estamos utilizando *pickle* para el manejo del archivo binario y la clase *Nota*, esta la definiremos en un módulo *notas*, por ende tendremos que importar tanto la clase como pickle al módulo *gestor_notas*:

	<img src="/apuntes/python-desde-cero/img-651.webp" alt="Captura de los apuntes" width="572" height="393" loading="lazy" decoding="async">

	*Módulo notas y clase Nota:*

	Con esto, definiríamos nuestro módulo *notas* en el directorio actual y en este crearíamos la clase *Nota*, donde su constructor contemplara el atributo *contenido* para almacenarlo como atributo:

	<img src="/apuntes/python-desde-cero/img-652.webp" alt="Captura de los apuntes" width="380" height="138" loading="lazy" decoding="async">

	*Método guarar_notas:*

	Ahora tendremos que definir un método que se mandara a llamar desde nuestro método *agregar_nota*, en nuestro módulo *gestor_notas*, este será el método *guardar_notas* y en este definiremos que mediante serialización nos almacene la lista que contiene todas las notas en nuestro archivo 'notas.pkl':

	<img src="/apuntes/python-desde-cero/img-653.webp" alt="Captura de los apuntes" width="479" height="186" loading="lazy" decoding="async">

	Finalmente, tendremos que llamar a nuestro método *agregar_nota* desde nuestro archivo principal *main.py*, donde la primera opción es la que nos permitirá agregar una nueva nota:

	<img src="/apuntes/python-desde-cero/img-654.webp" alt="Captura de los apuntes" width="570" height="80" loading="lazy" decoding="async">

	De esta manera, ahora al ejecutar nuestro *main.py*, podremos agregar una nueva nota:

	<img src="/apuntes/python-desde-cero/img-655.webp" alt="Captura de los apuntes" width="570" height="451" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-656.webp" alt="Captura de los apuntes" width="703" height="314" loading="lazy" decoding="async">

	Ahora veremos como el archivo se ha creado y almacenado el contenido:

	<img src="/apuntes/python-desde-cero/img-657.webp" alt="Captura de los apuntes" width="760" height="113" loading="lazy" decoding="async">

	Por lo tanto, si quisiéramos verificar que el contenido del archivo, si sea lo que nosotros colocamos, podríamos hacerlo desde el intérprete de Python:

	<img src="/apuntes/python-desde-cero/img-658.webp" alt="Captura de los apuntes" width="417" height="204" loading="lazy" decoding="async">

	Como es un objeto lo que hemos almacenado, es mostrado de esta manera porque aún no definimos el método especial *\_\_repr\_\_*, para que a nivel de representación lo veamos como deseemos mostrarlo.

	Por ende accedemos directamente al objeto que está en la primera posición y recordemos que la nota que agregamos es almacenada en el atributo *contenido*, por ende hacemos referencia a él y ya esto nos retornaría el contenido que nosotros hemos almacenado en este objeto que es una instancia de la clase *Nota*.
