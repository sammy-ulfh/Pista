---
curso: "python-desde-cero"
modulo: "python-desde-cero/modulos-y-archivos"
leccion: "importacion-y-uso-de-modulos"
titulo: "Importación y uso de módulos"
orden: 25
minutos: 8.7
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 10
ejercicios: []
---

1. **Introducción**

	La importación y uso de módulos es una técnica fundamental en Python que permite la modularidad y la reutilización del código. Los módulos son archivos de Python con extensión *.py* que contienen definiciones de funciones, clases y variables que se pueden utilizar en otros scripts de Python.

	*Importación de Módulos:*

	La declaración *import*  es usada para incluir un módulo en el script actual. Cuando importas un módulo, Python busca ese archivo en una lista de directorios definida por *sys.path*, la cual incluye el directorio actual, los directorios listados en al variable de entorno *PYTHONPATH*, y los directorios de instalación por defecto.

	*Uso de Módulos:*

	Una vez que un módulo es importado, puedes hacer uso de sus funciones, clases y variables, utilizando la sintaxis *nombre_del_modulo.nombre_del_elemento*. Esto es esencial para organización del código, ya que permite acceder a código reutilizable sin necesidad de duplicarlo.

	*Importación con Alias:*

	A veces, por conveniencia o para evitar conflictos de nombres, puedes querer darle a un módulo un alias al importarlo usando la palabra clave *as*: *import module as alias*

	Esto permite acceder a los componentes del módulo usando el alias en lugar del nombre completo del módulo.

	*Importación Específica:*

	Si solo necesitas una o varias funciones específicas de un módulo, puedes importarlas directamente usando *from modulo import function*. Esto permite no tener que prefijar las funciones con el nombre del módulo cada vez que se llaman. Además, puedes importar todas las definiciones de un módulo (aunque no es una práctica recomendada) usando *from modulo import \**.

	*Módulos de la Biblioteca Estándar:*

	Python viene con una biblioteca estándar extensa que ofrece módulos para realizar una variedad de tareas, desde manipulación de texto, fecha y hora, hasta acceso a internet y desarrollo web. Familiarizarse con la biblioteca estándar es crucial para ser un programador eficiente en Python.

	*Módulos de Terceros:*

	Además de las bibliotecas estándar, hay una amplia gama de módulos de terceros disponibles que puedes instalar y utilizar en tus programas. Estos módulos a menudo se instalan utilizando herramientas de gestión de paquetes como *pip*.

	</br>
2. **Práctica**

	Podríamos importar una librería en Python con un alias, lo cual nos puede servir para tener una forma más sencilla de referirnos a esta librería, para esto se utiliza *as* y podríamos hacerlo con cualquier librería:

	<img src="/apuntes/python-desde-cero/img-454.webp" alt="Captura de los apuntes" width="274" height="119" decoding="async">

	De esta manera, cuando referenciamos a un módulo de la librería math, para referenciar a la misma librería, bastaría con colocar *m*, ya que fue el alias que le dimos.

	O de la misma forma podría funcionarnos para el módulo con el que sacamos la raíz cuadrada si quisiéramos traerlo directamente:

	<img src="/apuntes/python-desde-cero/img-455.webp" alt="Captura de los apuntes" width="404" height="319" loading="lazy" decoding="async">

	**Concepto de Python Library Hijacking:**

	Este concepto en ciberseguridad hace referencia al *secuestro de librerías*, teniendo en cuenta que las librerías son un conjunto de módulos que trabajan en sincronía para proporcionar una funcionalidad, por lo que una librería contendrá varios módulos y paquetes.

	Entonces tendremos que tener en cuenta que Python busca sus librerías y para ello está algo similar al PATH en Linux.

	Estas rutas podremos verlas en el intérprete de Python si utilizamos la librería *sys* y referenciamos al path:

	<img src="/apuntes/python-desde-cero/img-456.webp" alt="Captura de los apuntes" width="1852" height="160" loading="lazy" decoding="async">

	Por lo que estas rutas, que están separadas por comas, son las que Python tiene en cuenta cuando queremos importar una librería, buscando en cada una de las rutas, una a una, la librería que queremos importar.

	Por lo que si importáramos la librería *hashlib* al imprimir la dirección de su archivo, esta estaría dentro de una de las direcciones contempladas por el PATH mostradas anteriormente:

	<img src="/apuntes/python-desde-cero/img-457.webp" alt="Captura de los apuntes" width="353" height="80" loading="lazy" decoding="async">

	Pero también, si observamos el PATH que tiene en cuenta Python, hay que tener cuidado porque este se puede modificar, tal como el PATH de Linux y además la primera referencia a módulos y librerías que es el *' '*, referencia al directorio de trabajo actual.

	Por lo que con base en esto, por ejemplo, de un archivo que tuviese la librería *hashlib*, pues al saber esto podríamos crearnos un script *hashlib.py* en el directorio actual, de forma que ahora nosotros podríamos definir su comportamiento.

	Antes de esto, podríamos tener en cuenta la librería *os*, ya que en Linux esta nos podría permitir ejecutar comandos de bash desde Python:

	<img src="/apuntes/python-desde-cero/img-458.webp" alt="Captura de los apuntes" width="252" height="128" loading="lazy" decoding="async">

	De esta manera, con *os.system()*, podremos ejecutar cualquier comando, en el output del comando *whoami* que ejecutamos, la primera línea es el resultado del comando y la segunda es el código que retorna la ejecución de este, en este caso es 0 porque fue exitoso.

	Por lo que ahora en nuestro archivo *main.py* vamos a importar la librería *hashlib*, si hemos creado antes el archivo *hashlib.py* en el directorio actual, la renombraremos temporalmente para que no entre en conflicto:

	<img src="/apuntes/python-desde-cero/img-459.webp" alt="Captura de los apuntes" width="260" height="79" loading="lazy" decoding="async">

	Al importar la librería luego crearemos una variable con el texto "hola":

	<img src="/apuntes/python-desde-cero/img-460.webp" alt="Captura de los apuntes" width="272" height="115" loading="lazy" decoding="async">

	Esta es una cadena de texto la cual está en UNICODE, pero le agregaremos una *b* al inicio para convertir a BYTES para que sea una representación numérica de los datos y esto lo hacemos, ya que *md5* de esta librería requiere que esto esté en bytes para poder representar la cadena en *md5* y lo haríamos de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-461.webp" alt="Captura de los apuntes" width="503" height="317" loading="lazy" decoding="async">

	¿Qué es md5?

	El md5 es un algoritmo de reducción criptográfico, usualmente es utilizado para por ejemplo transformar dos archivos o cadenas y ver si la conversión fue igual, lo cual nos puede servir para verificar si algún archivo fue modificado.

	Lo que quiere decir que mientras algo no sea modificado, la cadena resultante será estática.

	Entonces, ahora podremos ver como nuestro script en el archivo *main.py* está funcionando correctamente, pero si ahora nuestro archivo *test.py* lo renombramos a *hashlib.py*, donde tendremos como contenido:

	<img src="/apuntes/python-desde-cero/img-462.webp" alt="Captura de los apuntes" width="348" height="260" loading="lazy" decoding="async">

	Por lo que ahora si ejecutáramos nuestro archivo *main.py* con el contenido que ya tenía, ahora realmente nos estaría llamando como módulo al archivo *hashlib.py* que está en el directorio actual, por lo que nos ejecutaría el comando "whoami":

	<img src="/apuntes/python-desde-cero/img-463.webp" alt="Captura de los apuntes" width="886" height="427" loading="lazy" decoding="async">

	De esta manera, ahora vemos como primeramente se ve el output del comando y luego el error mostrado se debe a que Python no ha encontrado el módulo que queremos ejecutar para efectuar la conversión a *md5* y esto es evidente, ya que realmente no estamos importando la librería necesaria para efectuar esas operaciones.

	Entonces, con esto, como nosotros podemos crearnos nuestros propios módulos, Python buscara primeramente en el directorio actual de trabajo, lo que claramente podría suponer un riesgo de cara a la seguridad.

	Por ejemplo, si somos un usuario *pepito* sin privilegios, pero por alguna razón se nos otorga el permiso de que con *sudo*, podremos ejecutar el script con permisos de usuario con privilegios y suponiendo que estamos en un entorno controlado, pues no tendremos permisos para editar el archivo *main.py*, pero suponiendo que por alguna razón el directorio sí que tiene permisos de escritura para el usuario *pepito*, entonces al ver que desde el archivo *main.py* se utiliza la librería *hashlib*, entonces el usuario podrá crearse el script *hashlib.py*.

	Por lo que esto representa un riesgo, ya que al ser ejecutado con permisos de usuario privilegiado, este archivo en lugar de ejecutar el comando "whoami" pues podría ejecutar otro y la diferencia aquí es que ahora los comando se estarían inyectando como *root* con los permisos privilegiados, algo que ya es crítico porque se puede hacer cualquier cosa.

	Otra forma de llegar a poder realizar el *Python Library Hijacking*, sería el poder tener un permiso de escritura sobre alguna de las rutas del PATH en el que Python realiza sus búsquedas, pues aquí podríamos directamente editar *hashlib.py*, ya que la librería *hashlib* si depende de un archivo de Python.

	O por ejemplo si la librería que se solicita está en la última ruta del PATH, pero por alguna razón tenemos permisos de escritura en algún directorio que una de las rutas absolutas que en el PATH esta antes de la que tiene la librería, pues podremos en esa crear un script con el nombre de la librería y dado que Python va revisando cada ruta una a una, de izquierda a derecha, se quedará con el primero que encuentre.
