---
curso: "python-ofensivo-laboratorio"
modulo: "python-ofensivo-laboratorio/control-remoto"
leccion: "forward-shell-2-de-4"
titulo: "Forward shell (2 de 4)"
orden: 15
minutos: 6.7
idioma: "es"
riesgo: "alto"
fuente: "notes-tecnologia"
imagenes: 12
ejercicios: []
---

Cuando jugamos con **mkfifo** y utilizamos el comando:

```shell
mkfifo input; tail -f input | /bin/sh 2>&1 > output
```

Lo que estamos haciendo es que cada comando que entre en el archivo input se lea y se ejecute de forma automática por una sh, almacenando el resultado en el archivo output, del cual nosotros podremos recuperar el contenido al leer dicho archivo. 

Un ejemplo práctico de esto, podría ser ir agregando comandos y observando el contenido de output, viendo así que la ejecución de cada comando ahora si que tiene que ver con los anteriores, manteniendo así algo similar a una sesión de una terminal:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-031.webp" alt="Captura de los apuntes" width="654" height="438" decoding="async">

De esta manera vemos cómo todo se maneja en una especie de sesión y todo ya es más cercano a tener una terminal interactiva. Además, aquí si llegamos a ejecutar cosas como una Shell interactiva con php, si que la tendríamos:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-032.webp" alt="Captura de los apuntes" width="669" height="635" loading="lazy" decoding="async">

En php una forma de crear y mostrar variables es con lo siguiente:

```php
$variable = "valor";
echo $variable;
```

Como hemos solicitado una Shell php interactiva y en teoría ahora la tenemos, este código php debería interpretarnoslo correctamente:

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-033.webp" alt="Captura de los apuntes" width="622" height="606" loading="lazy" decoding="async">

Si vemos que nos interpreta correctamente el código php, de esta Shell php interactiva podremos salirnos con solo escribir **quit**. Y si volvemos a los comandos tradicionales de la **sh**, veremos que ahora hemos vuelto a la sh.

<img src="/apuntes/python-ofensivo-laboratorio/forward-shell-034.webp" alt="Captura de los apuntes" width="650" height="599" loading="lazy" decoding="async">

Además, algo importante a tener en cuenta es que cuando ejecutado comando podremos a llegar a colocar muchísimos caracteres especiales los cuales pueden llegar a corromper una cadena como la que estamos colocando entre las comillas simples, cuando colocamos múltiples veces los mismos tipos de comillas dentro de una cadena de texto.

Por ende, si esto sucediera, aplicaremos un tratado en base64 en nuestro script para evitarlo. Con este concepto claro, ahora pasaremos al script.
## Script

Mencionando lo de evitar romper nuestro comando con los posibles caracteres especiales que pueda llevar, lo convertiremos en base64. Para ello, traeremos b64encode de la librería base64. Lo que pasemos a la función necesitará estar en formato bytes y lo que nos retorne estará en formato bytes, pero nosotros lo buscaremos en string, por lo que le aplicaremos un decode:

<img src="/apuntes/python-ofensivo-laboratorio/035.webp" alt="Captura de los apuntes" width="714" height="459" loading="lazy" decoding="async">

De esta forma, estamos enviando el comando en base64 y lo decodificamos en nuestro propio contenedor, para ejecutarlo con una sh. Con esto en mente, con esta función lo único que haremos será ejecutar el comando con **mkfifo** que nos crearía tanto los archivos **input** y **output** para manejar un tipo de sesión. 

Tenemos la ruta **/tmp** la cual es muy usual para trabajar con archivos temporales; sin embargo, en este caso vamos a trabajar con la ruta **/dev/shm** que es lo mismo que la ruta **/tmp**. 

Para evitar conflictos con que se nos llegue a cerrar nuestro script y se queden creados estos archivos y que al volvernos a conectar retome los mismos archivos de una sesión anterior, utilizaremos la librería random para generar un número aleatorio para la sesión y así evitar estos problemas.

Aquí lo que haremos será crear el número aleatorio para así almacenar nuestros archivos en esta ruta con el nombre **{num}.input/{num}.output**. Para posteriormente trabajar con estos para la ejecución de los comandos. 

Además, recordando que en nuestra terminal se nos quedaba totalmente en espera al ejecutarlo, le pondremos un timeout de 5 segundo a la petición y como sabremos que dará error, la manejaremos con un try para evitar que de error, pero por detrás se quedarán corriendo los archivos con mkfifo funcionando de forma correcta:

<img src="/apuntes/python-ofensivo-laboratorio/036.webp" alt="Captura de los apuntes" width="439" height="142" loading="lazy" decoding="async">

De esta manera generamos el número de nuestra sesión y generamos la ruta completa de cada uno de los archivos respetando la misma sesión.

<img src="/apuntes/python-ofensivo-laboratorio/037.webp" alt="Captura de los apuntes" width="953" height="275" loading="lazy" decoding="async">

De esta manera ya estaríamos creando los archivos con nuestra función **set_setup()** y esto es algo que podríamos verificar si obtenemos una Shell interactiva de nuestro contenedor:

<img src="/apuntes/python-ofensivo-laboratorio/038.webp" alt="Captura de los apuntes" width="633" height="421" loading="lazy" decoding="async">

En este caso, a pesar de estar como root, el único usuario que podrá utilizar este archivo para que funcione como un tipo de sesión será con el que nos conectamos en nuestra webshell. 

Con lo anterior en mente, ahora crearíamos una función distinta para enviar todos los comandos con los que vamos a manejar una sesión, en este caso, lo que se hará es ir introduciendo estos comandos en el archivo **input**:

<img src="/apuntes/python-ofensivo-laboratorio/039.webp" alt="Captura de los apuntes" width="936" height="510" loading="lazy" decoding="async">

<img src="/apuntes/python-ofensivo-laboratorio/040.webp" alt="Captura de los apuntes" width="692" height="320" loading="lazy" decoding="async">

De esta manera, estamos viendo cómo llega correctamente el comando que enviamos al archivo input. 

Además, podremos hacer que cuando nosotros presionemos **CTRL + C** en busca de cerrar el programa, automáticamente nos mande a llamar una función que elimine estos archivos:

<img src="/apuntes/python-ofensivo-laboratorio/041.webp" alt="Captura de los apuntes" width="481" height="93" loading="lazy" decoding="async">

## Extra

Como dato extra, en cuanto a organización en nuestro código podremos llegar a utilizar lo siguiente si lo deseamos:

<img src="/apuntes/python-ofensivo-laboratorio/042.webp" alt="Captura de los apuntes" width="532" height="103" loading="lazy" decoding="async">

Esto nos sirve para de una forma visual observar que es lo que nosotros esperaríamos recibir como tipo de dato y, por el lado de la flecha, sería lo que esperamos retornar. Esto está más enfocado a la organización visual, ya que, no habrá problema si al final no se retornan o reciben estos tipos de datos. Es meramente conceptual de una forma en la que podría ayudarnos a llevar de forma más organizada la estructura y construcción del código. En este caso no lo usaré, pero desde luego es un concepto interesante.
