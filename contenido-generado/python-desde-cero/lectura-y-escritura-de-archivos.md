---
curso: "python-desde-cero"
modulo: "python-desde-cero/modulos-y-archivos"
leccion: "lectura-y-escritura-de-archivos"
titulo: "Lectura y escritura de archivos"
orden: 28
minutos: 18
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 31
ejercicios: []
---

1. **Introducción**

	La lectura y escritura de archivos son operaciones fundamentales en la mayoría de los programas, y Python proporciona herramientas sencillas y poderosas para manejar archivos. Por lo que, aprenderemos cómo abrir, leer, escribir y cerrar archivos de manera eficiente y segura.

	*Manejo Básico de Archivos:*

	Se explicará cómo utilizar la función *open()*  para crear un objeto archivo y cómo los modos de apertura (*r* para lectura, *w* para escritura, *a* para añadir y *b* para modo binario) afectan la manera en que trabajamos con archivos.

	*Lectura de Archivos:*

	Detallaremos cómo leer contenido de un archivo en memoria, ya sea de una sola vez con el método *read()* o línea por línea con *readline()* o iterando sobre el objeto archivo.

	*Escritura en Archivos:*

	Examinaremos cómo escribir en un archivo usando métodos como *write()* o *writelines()*, y cómo estos métodos difieren en cuanto a su manejo de strings y secuencia de strings.

	*Manejadores de Contexto:*

	Uno de los aspectos más importantes en la lectura y escritura de archivos en Python es el uso de manejadores de contexto, proporcionados por la declaración *with*. Los manejadores de contexto garantizan que los recursos se manejen correctamente, abriendo el archivo y segurándose de que, sin importar cómo o dónde termine el bloque de código, el archivo siempre se cierre adecuadamente. Esto ayuda a prevenir errores comunes como fugas de recursos o archivos que no se cierran si ocurre una excepción.

	El uso de *with open()* no solo mejora la legibilidad del código, sino que también simplifica el manejo de excepciones al trabajar con archivos, haciendo el código más seguro y robusto.

	</br>
2. **Práctica**

	El manejo de archivos en Python nos permite trabajar con el contenido de archivos existentes o incluso crear nuevos archivos para introducir contenido en ellos, así como también es posible editar y agregar nuevas líneas en archivos ya existentes o que ya tengan contenido.

	Para un ejemplo inicial, buscaremos crear un archivo *example.txt* desde nuestro script de Python y a este a nivel de contenido esperaremos que tenga un "¡Hola mundo!".

	Existen diversas formas de hacerlo y algunas son más óptimas que otras, por lo que se explicaran las diferencias.

	Primeramente en nuestro archivo de Python, definiremos lo siguiente:

	<img src="/apuntes/python-desde-cero/img-516.webp" alt="Captura de los apuntes" width="322" height="58" decoding="async">

	En este caso utilizamos el método especial *open()*, a este como primer argumento le indicamos el nombre del archivo y como segundo será la acción que realizaremos con este archivo, *w* representa que estaremos utilizando este archivo para introducir información en este.

	Para indicar que queremos abrir el documento para leerlo cambiaríamos la *w* por una *r* (read) y con ello ahora podríamos abrir un archivo para leerlo, aunque esto ya realmente daría por hecho que el archivo existe, por lo que para evitar errores es mejor aplicarlo cuando un archivo ya esté existente.

	Además, algo importante a mencionar es que cuando utilizamos *w*, esto lo que hace es borrarnos directamente todo el contenido que el archivo ya tenga y lo sobreescribe con lo que vayamos a querer escribir en él.

	En cambio, para escribir en un archivo sin afectar el contenido ya existente en él, tendríamos la *a* (append), que con esto incorporaríamos lo que queramos siempre al final del archivo.

	Entonces, ahora retomando lo de la imagen, al nosotros utilizar *open()* lo que pasa es que por detrás existe una clase *File* la cual estamos instanciando, por lo cual estaríamos asignándole a la variable *f* una instancia de la clase *File*, la cual tiene sus métodos.

	Entre ellos, esta *write()*, en el cual nosotros podríamos decirle que ahora que se ha abierto el archivo le vamos a meter "!.

	Esto funcionaria ya que con *w* (write), si el archivo no existe, este será creado:

	<img src="/apuntes/python-desde-cero/img-517.webp" alt="Captura de los apuntes" width="439" height="472" loading="lazy" decoding="async">

	Con esto estaríamos viendo como con *open()* estaríamos creando el archivo al no existir, así como abriéndolo con capacidad de escritura y con el método *write()* le asignamos como contenido un "¡Hola mundo!".

	Entonces ahora, si editamos el contenido que se le asigna al archivo y volvemos a ejecutar el código, veremos como lo que sucede es que el contenido que ya tenía el archivo desaparece, por lo que estaría siendo reescrito:

	<img src="/apuntes/python-desde-cero/img-518.webp" alt="Captura de los apuntes" width="424" height="389" loading="lazy" decoding="async">

	Entonces, para casos en los que no queramos borrar el contenido de este archivo tendremos *a* en lugar de *w*, que sería como indicarle que este archivo ya tiene contenido y que no queremos borrarlo.

	Por ende ahora el contenido que queramos agregar, nos lo agregara en la última línea del archivo que tiene contenido, como esto no efectúa directamente un salto de línea, lo veríamos en la misma línea del contenido que ya tenemos:

	<img src="/apuntes/python-desde-cero/img-519.webp" alt="Captura de los apuntes" width="454" height="561" loading="lazy" decoding="async">

	Si queramos que nuestro contenido realmente se efectúe en la línea siguiente porque nuestra última línea ya tiene contenido, bastaría con agregar el carácter especial de salto de línea al inicio de la cadena:

	<img src="/apuntes/python-desde-cero/img-520.webp" alt="Captura de los apuntes" width="403" height="415" loading="lazy" decoding="async">

	Realmente lo de que con *w* borre el contenido sucede al momento de que se abre el archivo, por lo que al cerrarse lo que si se almacena es todo lo que se le introdujo durante la ejecución del código, por lo que mientras nuestro código no se deje de ejecutar, podríamos escribir múltiple contenido en el archivo indicando *w*:

	<img src="/apuntes/python-desde-cero/img-521.webp" alt="Captura de los apuntes" width="424" height="498" loading="lazy" decoding="async">

	Ahora, al nosotros abrir un archivo, siempre una buena práctica será cerrarlo para evitar cualquier tipo de error, lo cual lo hacemos con el método *close()*.

	Esto nos cierra el archivo, por lo que automáticamente ya no hay forma de acceder a este, aunque luego tengamos otra línea que quiera escribir, como el siguiente ejemplo:

	<img src="/apuntes/python-desde-cero/img-522.webp" alt="Captura de los apuntes" width="891" height="448" loading="lazy" decoding="async">

	Como vemos esto nos cierra el archivo y ya no permite el acceso.

	Esto está bien, sin embargo, en scripts más robustos y complejos puede llegar a suceder que por cualquier motivo, ya sea que este se termine de ejecutar a medias o suceda cualquier cosa, el archivo podría quedar abierto y para evitar cualquier error o que un archivo se quede colgado abierto,  existe una manera más conveniente de hacerlo y esto es empleando *with*.

	Por lo que ahora con lo siguiente:

	<img src="/apuntes/python-desde-cero/img-523.webp" alt="Captura de los apuntes" width="472" height="429" loading="lazy" decoding="async">

	Esto realmente es algo muy similar a lo que hicimos anteriormente asignándole directamente la instancia a *f*, la diferencia es que de esta forma es más óptimo debido a que Python siempre se encargara de que el archivo se cierre, por lo que de cara a posibles errores en un programa, al aplicar esta forma más óptima nos despreocuparemos de posibles errores en cuanto al manejo de archivos.

	*Leer contenido de archivos:*

	Si quisiéramos leer el contenido de un archivo y poder tomar de una sola vez todo el contenido de este mismo, para ello tendríamos que cambiar la forma de abrir el archivo y en lugar de usar *w*, utilizaríamos *r* (read) y en cuanto al método el que nos permite recuperar todo el contenido de un archivo es *read()*, lo cual retornara el contenido del archivo y por ende tendremos que almacenarlo en una variable y luego podremos mostrarla.

	El archivo */etc/hosts* que estamos listando es un archivo existente en Linux, el cual tiene ya un contenido, que es el que estamos viendo:

	<img src="/apuntes/python-desde-cero/img-524.webp" alt="Captura de los apuntes" width="506" height="456" loading="lazy" decoding="async">

	El leer el contenido de un archivo también se puede hacer de distintas formas, en este caso extrajimos todo el contenido del archivo, pero también es posible leer un archivo línea a línea, esto es posible debido a que nuestro objeto *f*, que es como lo estamos referenciando, es iterable y el iterar sobre este con un bucle lo que nos permite es ir línea a línea y por ende podríamos mostrarlas y al final al terminar haber escrito por pantalla todas las líneas de esta, a diferencia de la otra forma, esta es iterando sobre el objeto de archivo y mostrar cada  línea del archivo:

	<img src="/apuntes/python-desde-cero/img-525.webp" alt="Captura de los apuntes" width="517" height="593" loading="lazy" decoding="async">

	Esto funciona correctamente, pero vemos cada línea muy separada debido a que por cada impresión de una línea que se realiza, al final de esta se agrega un salto de línea, si quisiéramos eliminarlo tendríamos que utilizar *strip()* y esto nos quitaría el salto de línea del final de cada línea que se imprima por pantalla:

	<img src="/apuntes/python-desde-cero/img-526.webp" alt="Captura de los apuntes" width="523" height="453" loading="lazy" decoding="async">

	Esta forma vendría siendo la más óptima de leer un archivo, ya que al leer un archivo línea a línea, lo que nos hace es que se carga menos cantidad de contenido del archivo en memoria a diferencia de cargar todo el contenido de un archivo directamente.

	El cargar todo el contenido ahora no afecta, pero en archivos demasiado grandes con mucho contenido puede ser un problema de cara a la memoria, por ende al leer línea a línea, no importará si el archivo es demasiado grande, ya que va leyendo línea a línea y no carga todo el contenido del archivo directamente en memoria, lo cual representa un mejor manejo de los recursos de memoria en un dispositivo.

	Por ende realmente esta sería la mejor forma de leer un archivo, ya que viene siendo la más óptima al empezar a leer directamente línea a línea sin cargar directamente el contenido en memoria.

	Existe otra forma de leer un archivo y es muy similar, pero la diferencia es que al objeto le agregaríamos el método *readlines()*, funcionaria prácticamente de la misma manera, pero antes de empezar a leer el archivo, carga todo su contenido en memoria y lo retorna línea a línea en una lista, por ende al iterar sobre la lista podremos leer línea a línea.

	<img src="/apuntes/python-desde-cero/img-527.webp" alt="Captura de los apuntes" width="496" height="452" loading="lazy" decoding="async">

	Con archivos cortos lo notaremos normal, pero la idea es que el código sea escalable y por ende con archivos muy grandes esto podría ser un proceso más lento, siendo más óptimo que empieza a leer directamente línea a línea sin antes cargarlo en memoria.

	En cuanto a ciberseguridad existe un archivo el cual es un diccionario que contiene muchas posibles contraseñas para realizar ataques de fuerza bruta, este es el diccionario *rockyou.txt*:

	<img src="/apuntes/python-desde-cero/img-528.webp" alt="Captura de los apuntes" width="1019" height="481" loading="lazy" decoding="async">

	Es un archivito un tanto especial y podría llegar a sucedernos  que con el simple indicativo de lectura *r* nos daría error debido a que cuenta con ciertas líneas en formato *raw binary* y con esto hacemos referencia con *b*, lo cual nos permitiría poder realizar lectura sobre las líneas que estén en este formato.

	Al leerlas, algnunas serán líneas no legibles y tendran un formato peculiar (formato bytes):

	<img src="/apuntes/python-desde-cero/img-529.webp" alt="Captura de los apuntes" width="527" height="261" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-530.webp" alt="Captura de los apuntes" width="291" height="356" loading="lazy" decoding="async">

	Para evitar esto bastaría con aplicar un *decode()* para que incluso aquellas líneas no legibles nos las muestre correctamente:

	<img src="/apuntes/python-desde-cero/img-531.webp" alt="Captura de los apuntes" width="488" height="271" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-532.webp" alt="Captura de los apuntes" width="179" height="442" loading="lazy" decoding="async">

	Con *b* (raw binary), que son archivos binarios o archivos no legibles como imágenes, por ejemplo. Esto nos permite leer este tipo de contenido en archivos y el decode es para representarlos de forma legible.

	Aquí también podremos ver un ejemplo de una ventaja de que *readlines()* primero cargue el contenido del archivo a memoria y luego nos lo retorne en una lista para iterar en ella, ya que si solo tuviésemos el indicador *r*, de que vamos a leer el archivo e iteramos línea a línea, esto nos lanzaría el error hasta encontrarse con una línea que no puede representar a menos que se le indique que lea en *raw binary* con la letra *b*.

	<img src="/apuntes/python-desde-cero/img-533.webp" alt="Captura de los apuntes" width="458" height="280" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-534.webp" alt="Captura de los apuntes" width="1018" height="202" loading="lazy" decoding="async">

	A diferencia de *readlines()*, donde podríamos comprobar si podemos leer todo el archivo con solamente el indicador *r* sin problemas, antes de empezar a leerlo, lo cual podríamos ver como ventaja para no quedarnos a media lectura del archivo.

	*Escribir múltiples líneas en un archivo con el método writelines():*

	Este método lo podemos tener en cuenta para cuando vayamos a escribir en un archivo, si tenemos algún objeto iterable y el contenido de este queremos escribirlo en el archivo, un ejemplo sería tener una lista con distintas cadenas de caracteres y queremos escribirlas una a una en el archivo, pues esto podríamos hacerlo con *writelines()* pasándole como argumento la lista:

	<img src="/apuntes/python-desde-cero/img-535.webp" alt="Captura de los apuntes" width="963" height="516" loading="lazy" decoding="async">

	*Leer únicamente la primera línea de un archivo:*

	Una cosa es leer un archivo completo y utilizar el método *readlines()*, pero también podremos leer la primera línea de un archivo y para esto se utiliza *readline()* y para esto tomaremos de referencia el archivo que acabamos de crear y agregarle líneas:

	<img src="/apuntes/python-desde-cero/img-536.webp" alt="Captura de los apuntes" width="466" height="362" loading="lazy" decoding="async">

	*Almacenar contenido en un archivo con print:*

	El propio *print()*, como segundo argumento, le podremos pasar el objeto de archivo a *file*, asignándolo como si de una variable se tratase. Esto haría que el output de nuestro print, en lugar de mostrarlo en pantalla, lo mandaría hacia el archivo y lo escribiría en él.

	<img src="/apuntes/python-desde-cero/img-537.webp" alt="Captura de los apuntes" width="497" height="445" loading="lazy" decoding="async">

	*Trabajar con un archivo binario:*

	En un directorio específico yo tengo una imagen, la cual es el fondo de un entorno en Linux, si trato de ver el contenido de esta veremos como nos mostrara que es un archivo binario, esto se debe a que no es legible:

	<img src="/apuntes/python-desde-cero/img-538.webp" alt="Captura de los apuntes" width="697" height="105" loading="lazy" decoding="async">

	Ahora en nuestro archivo comenzaríamos abriendo esta imagen en modo de lectura, ya que buscaríamos leer el contenido de esta para crear una imagen en nuestro directorio actual:

	<img src="/apuntes/python-desde-cero/img-539.webp" alt="Captura de los apuntes" width="718" height="97" loading="lazy" decoding="async">

	De esta manera estamos indicando que abriremos un archivo para lectura y con la *b* que es un binario, lo utilizaremos como *f_in*, ya que será nuestro archivo input y en esta misma línea definiremos nuestro archivo output, el cual se abrirá como escritura y también será binario:

	<img src="/apuntes/python-desde-cero/img-540.webp" alt="Captura de los apuntes" width="1070" height="98" loading="lazy" decoding="async">

	Finalmente, leeríamos todo el contenido de la imagen input y almacenaríamos todo el contenido del binario en nuestro nuevo archivo de imagen:

	<img src="/apuntes/python-desde-cero/img-541.webp" alt="Captura de los apuntes" width="1070" height="156" loading="lazy" decoding="async">

	Con esto listo, ahora ejecutaríamos nuestro programa y veríamos como se genera la imagen en el directorio actual:

	<img src="/apuntes/python-desde-cero/img-542.webp" alt="Captura de los apuntes" width="1145" height="348" loading="lazy" decoding="async">

	Por lo que podremos verificar que efectivamente si nos reconozca el archivo como una imagen e incluso mostrarla:

	<img src="/apuntes/python-desde-cero/img-543.webp" alt="Captura de los apuntes" width="1858" height="719" loading="lazy" decoding="async">

	Entonces, si en algún punto estamos tratando con archivos que tengan caracteres especiales y no se puedan leer de forma normal, debemos tener en cuenta que deberemos indicar que estamos trabajando con un archivo binario.

	A la hora de abrir un archivo que no existe en modo escritura, este es creado, pero al hacerlo en modo escritura esto nos podrá dar un error, por ende podríamos lanzar una excepción para ello:

	<img src="/apuntes/python-desde-cero/img-544.webp" alt="Captura de los apuntes" width="880" height="402" loading="lazy" decoding="async">

	El programa nos lanza este error, el cual contiene la excepción "FileNotFoundError". Anteriormente, cuando referenciábamos a un archivo y se daba algún error al momento de abrirlo, la excepción que lanzábamos con *try* es "IOError" y funcionaria bien:

	<img src="/apuntes/python-desde-cero/img-545.webp" alt="Captura de los apuntes" width="715" height="330" loading="lazy" decoding="async">

	Funciona correctamente, pero realmente lo más óptimo es aplicar la propia excepción que nos da el mismo error por consola, el cual es "FileNotFoundError":

	<img src="/apuntes/python-desde-cero/img-546.webp" alt="Captura de los apuntes" width="779" height="332" loading="lazy" decoding="async">
