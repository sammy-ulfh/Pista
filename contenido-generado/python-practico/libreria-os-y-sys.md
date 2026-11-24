---
curso: "python-practico"
modulo: "python-practico/librerias-comunes"
leccion: "libreria-os-y-sys"
titulo: "Librería os y sys"
orden: 8
minutos: 10.7
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 18
ejercicios: []
---

1. **Introducción**

	Las bibliotecas *os* y *sys* de Python son herramientas esenciales para cualquier desarrollador que busque interactuar eficazmente con el sistema operativo y gestionar el entorno de ejecución de sus programas. Estas bibliotecas proporcionan una amplia gama de funcionalidades que permiten una mayor flexibilidad y control en el desarrollo de software.

	*Biblioteca os*

	La biblioteca *os* en Python es una herramienta poderosa para interactuar con el sistema operativo. Proporciona una interfaz portátil para usar funcionalidades dependientes del sistema operativo, lo que significa que los programas pueden funcionar en diferentes sistemas operativos sin cambios significativos en el código. Algunas de sus capacidades incluyen:

	- *Manipulación de Archivos y Directorios:* Permite realizar operaciones como crear, eliminar, mover archivos y directorios, y consultar sus propiedades.
	  </br>
	- *Ejecución de Comandos del Sistema:* Facilita la ejecución de comandos del sistema operativo desde un programa en Python.
	  </br>
	- *Gestión de Variables de Entorno:* Ofrece funciones para leer y modificar las variables de entorno del sistema.
	  </br>
	- *Obtención de Información del Sistema:* Proporciona métodos para obtener información relevante sobre el sistema operativo, como la estructura de directorios, detalles del usuario, procesos, etc.

	*Biblioteca sys*

	La biblioteca *sys* es fundamental para interactuar con el entorno de ejecución del programa Python. A diferencia de *os*, que se centra en el sistema operativo. *sys* está más orientada a la interacción con el intérprete de Python. Sus principales usos incluyen:

	- *Argumentos de Línea de Comandos:* Permite acceder y manipular los argumentos que pasan al programa Python desde la línea de comandos.
	  </br>
	- *Gestión de la Salida del Programa:* Facilita el control sobre la salida estándar (*stdout*) y la salida de error (*stderr*), lo cual es esencial para la depuración y la presentación de resultados.
	  </br>
	- *Información del Intérprete:* Ofrece acceso a las configuraciones y funcionalidades relacionadas con el intérprete de Python, como la versión de Python en uso, la lista de módulos importados y la gestión de la ruta de búsqueda de módulos.

	Ambas bibliotecas son cruciales para el desarrollo de aplicaciones Python que requieren interacción avanzada con el entorno de sistema y el intérprete. Su comprensión y uso adecuado permite a los desarrolladores escribir código más robusto, portable y eficiente.
	</br>
2. **Práctica**

	Primeramente, crearemos un archivo y en este importaríamos la librería *os*:

	<img src="/apuntes/python-practico/img-809.webp" alt="Captura de los apuntes" width="258" height="74" decoding="async">

	Con esta librería tenemos diversas utilidades para interactuar con el sistema, tales como:

	*getcwd():*

	Con *getcwd()*, podremos obtener la ruta absoluta del directorio actual en el que se encuentra el script, ya que también es posible ir moviéndose entre el sistema gracias a otras utilidades de la librería *os*.

	<img src="/apuntes/python-practico/img-810.webp" alt="Captura de los apuntes" width="735" height="280" loading="lazy" decoding="async">

	*lisrdir()*

	Con la utilidad *listdir()*, podremos listar el contenido de un directorio. Podremos pasarle una ruta absoluta como argumento y nos listara el contenido de esta o no pasarle nada y listará el contenido de la ruta actual.

	  En este caso le pasaremos como argumento la ruta anterior, lo que nos retornara será una lista que almacenamos en la variable *files*. Como es una lista donde cada elemento es algún archivo o directorio de nuestra ruta que le hemos pasado como argumento.

	Para realizar una representación donde no se vea la estructura de la lista, podríamos utilizar un bucle o la utilidad *' '.join()*:

	<img src="/apuntes/python-practico/img-811.webp" alt="Captura de los apuntes" width="930" height="565" loading="lazy" decoding="async">

	*mkdir():*

	Con *mkdir()* pasándole como argumento el nombre del directorio que queremos crear, ya estaría listo.

	Podremos comprobarlo creándolo y volviendo a listar el directorio con lo anterior visto:

	<img src="/apuntes/python-practico/img-812.webp" alt="Captura de los apuntes" width="925" height="439" loading="lazy" decoding="async">

	*path.exist():*

	Con *path.exists()*, podremos con pasarle como argumento el nombre de un archivo o directorio, comprobar si este existe.

	Esta utilidad retornará *True* o *False* en función de si existe o no. En este caso podríamos comprobar si *mi_directorio* existe (funciona de la misma manera para archivos):

	<img src="/apuntes/python-practico/img-813.webp" alt="Captura de los apuntes" width="605" height="407" loading="lazy" decoding="async">

	Si ahora elimináramos el directorio y volviésemos a ejecutar el script, veríamos que ahora nos arroja el mensaje de que este no existe.

	<img src="/apuntes/python-practico/img-814.webp" alt="Captura de los apuntes" width="380" height="174" loading="lazy" decoding="async">

	Esto puede venirnos bien a la hora de estar manejando archivos y directorios en Python, ya que si intentamos crear uno ya existente nos lanzará una excepción,  en caso de no existir se creará correctamente.

	Por ello, si ya existe, podría eliminarse y crearse nuevamente o directamente no crearse.

	*getenv():*

	En los sistemas operativos tenemos las variables de entorno, estas almacenan contenido que ayudan a la funcionalidad del sistema.

	Algunas, como el *PATH*, contiene rutas que el sistema utilizara para buscar binarios que queramos ejecutar. En este caso yo estoy empleando una terminal personalizada (*kitty*), si en terminal veo la variable de entorno donde la tengo instalada *KITTY_INSTALLATION_DIR*, me regresará la ruta donde está almacenada:

	<img src="/apuntes/python-practico/img-815.webp" alt="Captura de los apuntes" width="314" height="72" loading="lazy" decoding="async">

	Podría obtener el contenido de las variables de entorno, utilizando *getenv()* en Python:

	<img src="/apuntes/python-practico/img-816.webp" alt="Captura de los apuntes" width="489" height="95" loading="lazy" decoding="async">

	De esta manera, al nosotros pasar como argumento a *getenv()*, el nombre de una variable de entorno nos regresará su contenido.

	**Librería sys**

	Esta librería se importa como cualquier otra con `import sys`. Con esta podremos controlar el código de estado a la hora que se termina el programa, ya sea de forma forzada, por el final del código o por algún error.

	Además, nos viene mucho de ayuda para controlar los argumentos que le pasemos a un script en Python.

	*Obtener el nombre del propio script*

	Los argumentos en Python funcionan de una manera posicional, siempre el que está en la posición 0 será el propio nombre del script y los que estén en posiciones posteriores serán los argumentos que podremos definir para que el programa pueda recibir.

	Aunque nosotros no hayamos definido el funcionamiento de nuestro script para trabajar con argumentos, la posición 0 siempre existirá, ya que es el nombre de nuestro propio script y se accede como propiedad con la librería *sys*, utilizando *argv\[0\]*:

	<img src="/apuntes/python-practico/img-817.webp" alt="Captura de los apuntes" width="518" height="130" loading="lazy" decoding="async">

	Con esto, si el nombre de nuestro propio script cambiara, esto no afectaría en nada, ya que el propio programa podría acceder a su nombre gracias a la librería sys.

	*Calcular el total de argumentos que le son pasados al script*

	Podremos ver *sys.argv* como una propiedad o atributo, el cual almacena en una forma de lista el total de argumentos que le son pasados. Teniendo esto en cuenta, podríamos ver cuantos argumentos le han pasado al programa con *len()* del propio Python:

	<img src="/apuntes/python-practico/img-818.webp" alt="Captura de los apuntes" width="563" height="147" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-819.webp" alt="Captura de los apuntes" width="368" height="130" loading="lazy" decoding="async">

	Nos marca uno, el cual es el nombre del propio script, y recordando que Python comienza a contar desde el 0, esto se almacena en la posición 0.

	Además, la forma en la que nosotros podremos pasarle más argumentos a nuestro script será colocarlos al momento de ejecutarlo de forma seguida, separando cada uno por espacios:

	<img src="/apuntes/python-practico/img-820.webp" alt="Captura de los apuntes" width="550" height="122" loading="lazy" decoding="async">

	De esta manera, el nombre del propio script, el nombre de la persona, el correo y la serie de números son considerados cada uno un argumento y estos se separan por espacios al agregarlos.

	De esta manera estaríamos trabajando con una lista donde, de forma posicional, se guardarían los argumentos y podríamos acceder a estos en función a su índice. Dos formas de hacer esto evitando errores serían primeramente calcular si el número total de argumentos corresponden sin problemas al índice al que queremos acceder o directamente intentar acceder a este mediante un *try* y si se presenta la excepción *IndexError* gestionarla para evitar que el programa se detenga.

	*Mostrar todos los argumentos*

	Como *argv* es una lista que almacenará todos los argumentos, podríamos listarla directamente, pero para que se vea mejor estéticamente, recordemos que tenemos *''.join()*:

	<img src="/apuntes/python-practico/img-821.webp" alt="Captura de los apuntes" width="835" height="232" loading="lazy" decoding="async">

	Se nos pueden presentar casos donde *join* nos represente de manera incorrecta lo esperado, en tales casos en lugar de pasarle directamente la lista, podríamos dentro de este, como argumento iterar sobre la lista e ir pasando cada elemento en cada iteración y esto nos lo representaría de la misma manera:

	<img src="/apuntes/python-practico/img-822.webp" alt="Captura de los apuntes" width="950" height="228" loading="lazy" decoding="async">

	*Ver los directorios del PATH del propio Python*

	Cuando vimos de forma rápida el concepto de *Library Hijacking* con Python, vimos que era posible ver cada dirección almacenada en el *PATH* con *sys.path*, y que estas eran recorridas en orden, empezando por el directorio actual donde se esté ejecutando nuestro programa.

	De esta manera, al estar todas las rutas almacenadas en una lista, podríamos mostrar cada una con un salto de línea con *join* o iterando sobre esta y en cada iteración mostrar las rutas:

	<img src="/apuntes/python-practico/img-823.webp" alt="Captura de los apuntes" width="579" height="397" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-824.webp" alt="Captura de los apuntes" width="699" height="443" loading="lazy" decoding="async">

	*Código de estado*

	En Bash después de ejecutar cada comando, es posible verificar su código de estado:

	<img src="/apuntes/python-practico/img-825.webp" alt="Captura de los apuntes" width="321" height="193" loading="lazy" decoding="async">

	De esta manera sabemos que un código de estado correcto siempre será cero y uno incorrecto, dependiendo del error que se de, será distinto de cero.

	Usualmente, para un error se suele utilizar el código de estado *1*, por lo que nosotros podríamos gestionar esto mismo con la librería *sys*, utilizando *exit()* y pasándole como argumento el código de estado con el que deseamos que salga el programa:

	<img src="/apuntes/python-practico/img-826.webp" alt="Captura de los apuntes" width="759" height="522" loading="lazy" decoding="async">
