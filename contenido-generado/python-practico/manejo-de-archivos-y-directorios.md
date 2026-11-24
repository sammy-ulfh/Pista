---
curso: "python-practico"
modulo: "python-practico/biblioteca-estandar"
leccion: "manejo-de-archivos-y-directorios"
titulo: "Manejo de archivos y directorios"
orden: 3
minutos: 9
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 17
ejercicios: []
---

1. **Introducción**

	La librería *os* y el módulo *shutil* en Python son herramientas fundamentales para interactuar con el sistema de archivos, especialmente en lo que respecta a la creación y eliminación de archivos y directorios.

	Aquí tienes una descripción detallada de ambas:

	*Librería os:*

	- *Funcionalidades Básicas:* *os* proporciona una interfaz rica y variada para interactuar con el sistema operativo subyacente. Permite realizar operaciones como la creación y eliminación de archivos y directorios, así como la manipulación de rutas y el manejo de la información del sistema de archivos.

	*Creación y Eliminación de Archivos y Directorios:*

	- *Creación de Directorios:* Utilizando *os.mkdir()* u *os.makedirs()*, se pueden crear directorios individuales o múltiples directorios (y subdirectorios) respectivamente.
	  </br>
	- *Eliminación:* *os.remove()* se usa para eliminar archivos, mientras que *os.rmdir()* y *os.removedirs()* permiten eliminar directorios y directorios con subdirectorios, respectivamente.
	  </br>
	- *Gestión de Rutas:* La sublibrería *os.path* es crucial para manipular rutas de archivos y directorios, como unir rutas, obtener nombres de archivos, verificar si un archivo o directorio existe, etc.

	*Módulo shutil:*

	- *Operaciones de Alto Nivel:* Mientras que *os* se enfoca en operaciones básicas, *shutil* proporciona funciones de nivel superior, más orientadas a tareas complejas y operaciones en lotes.
	  </br>
	- *Copiar y Mover Archivos y Directorios:* *shutil* es especialmente util para copiar y mover archivos y directorios. Funciones como *shutil.copy()*, *shutil.copytree()* y *shutil.move()* facilitan estas tareas.
	  </br>
	- *Eliminación de Directorios:* Aunque *os* puede eliminar directorios, *shutil.rmtree()* es una herramienta más poderosa para eliminar un directorio completo y todo su contenido.
	  </br>
	- *Manejo de Archivos Temporales:* *shutil* también ofrece funcionalidades para trabajar con archivos temporales, lo que es útil para operaciones que requieren almacenamiento temporal de datos.

	En resumen *os* y *shutil* en Python son bibliotecas complementarias para la gestión de archivos y directorios.
	Mientras *os* ofrece una gran flexibilidad para operaciones básicas y de bajo nivel, *shutil* brinda herramientas más potentes y de alto nivel, adecuadas para tareas complejas y operaciones en lotes. Juntas, forman un conjunto integral de herramientas para la manipulación eficaz del sistema de archivos en Python.

	</br>
2. **Práctica**

	El manejo en cuanto a directorios y archivos con estas librerías es muy importante en Python, ya que por ejemplo en cuanto a un programa que nosotros utilicemos en nuestro propio ordenador, teniendo en cuenta una carpeta o archivo que para nosotros si es existente, pero para otra persona no, entonces con *os* y *shutil*, podremos definir cierta lógica que nos ayude a trabajar de alguna manera para ya sea crear estos archivos o directorios o extraerlos de algún lado, para que también estén contemplados para esa persona.

	Con esto en mente, nosotros podríamos comprobar  si un archivo existe con *os.path.exists()* y como argumento le tendremos que pasar el nombre de este archivo, esto retornara un *True* si existe y un *False* si no existe, por ende lo podríamos gestionar con un condicional. Para esto tendremos que importar la librería *os*:

	<img src="/apuntes/python-practico/img-718.webp" alt="Captura de los apuntes" width="536" height="397" decoding="async">

	Si ahora creáramos el archivo, pues nos regresaría un *True* porque si existe:

	<img src="/apuntes/python-practico/img-719.webp" alt="Captura de los apuntes" width="341" height="138" loading="lazy" decoding="async">

	*Crear directorios con os.mkdir()*

	De esta misma forma podríamos verificar si un directorio no existe y en caso de que no exista, podremos crearlo, para crearlo utilizaremos *os.mkdir()* y como argumento le pasaremos el nombre de este directorio que vamos a crear.

	<img src="/apuntes/python-practico/img-720.webp" alt="Captura de los apuntes" width="492" height="354" loading="lazy" decoding="async">

	Además, con *os* también podremos crear directorios anidados, lo cual se refiere a crear directorios con subdirectorios gracias a *makedirs()*, de esta manera si borráramos el directorio *mi_directorio*, pues este ya no existiría, pero ahora si comprobamos si existe *mi_directorio* y a la vez su subdirectorio *mi_subdirectorio*, pues no existen, por lo que gracias a *makedirs()*, podríamos crear los dos a la vez:

	<img src="/apuntes/python-practico/img-721.webp" alt="Captura de los apuntes" width="676" height="504" loading="lazy" decoding="async">

	*Listar el directorio actual con listdir():*

	Si utilizamos *listdir()* podremos listar todo el contenido del directorio actual, esto nos será dado en forma de una lista (se crearon 5 archivos de texto solo para el ejemplo):

	<img src="/apuntes/python-practico/img-722.webp" alt="Captura de los apuntes" width="1007" height="327" loading="lazy" decoding="async">

	Al ser una lista lo que nos es retornado, podríamos listarlo con *join*, colocando un salto de línea como separador entre cada elemento:

	<img src="/apuntes/python-practico/img-723.webp" alt="Captura de los apuntes" width="975" height="545" loading="lazy" decoding="async">

	O también iterando en la lista:

	<img src="/apuntes/python-practico/img-724.webp" alt="Captura de los apuntes" width="726" height="555" loading="lazy" decoding="async">

	*Eliminar archivos con remove()*

	Podremos eliminar archivos también, utilizando  *remove()* y pasándole como argumento el nombre del archivo, de esta manera primeramente podríamos verificar si un archivo existe y de ser así, eliminarlo:

	<img src="/apuntes/python-practico/img-725.webp" alt="Captura de los apuntes" width="969" height="352" loading="lazy" decoding="async">

	*Eliminar directorios vacios con rmdir():*

	Si creáramos un directorio vacío, por ejemplo *prueba*, si este no tienen ningún contenido dentro podremos borrarlo, de lo contrario nos lanzaría una excepción indicando que el directorio no está vacío:

	<img src="/apuntes/python-practico/img-726.webp" alt="Captura de los apuntes" width="937" height="376" loading="lazy" decoding="async">

	*Utilizando shutil para eliminar directorio que no esten vacios:*

	Realizando la misma comprobación de si un directorio existe, en caso de que este tenga contenido (en esta caso un subdirectorio), podríamos eliminarlo utilizando la librería *shutil* y de esta *rmtree()*, que le pasaríamos como argumento el nombre del directorio y lo eliminaría:

	<img src="/apuntes/python-practico/img-727.webp" alt="Captura de los apuntes" width="833" height="377" loading="lazy" decoding="async">

	*Renombrar archivos con rename en os:*

	Mediante el uso de la librería *os*, podremos renombrar archivos con *rename()*, donde el primer argumento será el nombre actual del archivo y el segundo el nuevo nombre:

	<img src="/apuntes/python-practico/img-728.webp" alt="Captura de los apuntes" width="704" height="363" loading="lazy" decoding="async">

	*Calcular el tamaño de un archivo en bytes:*

	Empleando la librería *os*, podríamos utilizar *path.getsize()* y pasándole un archivo nos retornaría el tamaño en byte, en este caso le pasaré un archivo propio del sistema Linux:

	<img src="/apuntes/python-practico/img-729.webp" alt="Captura de los apuntes" width="807" height="353" loading="lazy" decoding="async">

	Contemplar rutas con *path.join()*, la forma en la que este funciona es que le tendremos que pasar como argumento los distintos directorios y subdirectorios , uno a uno en orden y finalmente el archivo al cual queremos llegar, por lo que el colocar de esta manera los directorios, subdirectorios y el archivo, nos retornará la representación del directorio:

	<img src="/apuntes/python-practico/img-730.webp" alt="Captura de los apuntes" width="281" height="214" loading="lazy" decoding="async">

	Para representar la ruta absoluta desde el directorio actual hasta *mi_archivo.txt*, pues sería <mark>mi_directorio/mi_subdirectorio/mi_archivo.txt</mark>, lo cual está bien, pero dependiendo del sistema, el Linux se representa de esta manera, pero en Windows podría llegar a dar errores porque se representan con la barra invertida *\\*, en este caso tenemos *path.join()*, al cual pasándole como argumento cada directorio de forma ordenada hasta llegar a nuestro archivo nos ayudaría a representarlo:

	<img src="/apuntes/python-practico/img-731.webp" alt="Captura de los apuntes" width="730" height="108" loading="lazy" decoding="async">

	Con esto en mente, incluso podremos hacer referencia a *basename* que hace referencia al archivo y *dirname* que hace referencia al directorio:

	<img src="/apuntes/python-practico/img-732.webp" alt="Captura de los apuntes" width="860" height="512" loading="lazy" decoding="async">

	De esta manera, de acuerdo a una ruta dada, el último que le pasamos es nuestro archivo y el resto será el directorio o ruta para llegar a ese archivo. Es importante contemplar este orden, ya que siempre nos tomaría como *basename* lo último que ingresamos, mientras que el resto será tomado como *dirname*:

	<img src="/apuntes/python-practico/img-733.webp" alt="Captura de los apuntes" width="725" height="502" loading="lazy" decoding="async">

	De esta manera podríamos conseguir gestionar y manipular rutas dentro del sistema. Incluso aquí podría ser un ejemplo donde podríamos utilizar *split()* con la librería *os*, para separar toda la ruta, pasandola directamente como argumento y podríamos almacenar cada cosa en variables distintas:

	<img src="/apuntes/python-practico/img-734.webp" alt="Captura de los apuntes" width="857" height="490" loading="lazy" decoding="async">
