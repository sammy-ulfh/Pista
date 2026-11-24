---
curso: "linux-desde-cero"
modulo: "linux-desde-cero/comandos"
leccion: "comandos-basicos-2-de-2"
titulo: "Comandos básicos (2 de 2)"
orden: 4
minutos: 11.9
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 29
ejercicios: []
---

- **grep**

	El comando **grep** será uno de los que más utilizaremos debido a que nos permitirá realizar filtrados en los outputs que generemos, ya sea de comandos o de archivos. Podremos manejar de cierta manera que información mostrar mediante un filtrado.

	Para utilizar grep con filtrado base, verificando si algo esta entre cada linea. Podremos hacerlo sin agregar ningún parámetro, solamente el contenido a filtrar entre comillas:

	<img src="/apuntes/linux-desde-cero/10.webp" alt="Captura de los apuntes" width="898" height="273" decoding="async">

	Como vemos, las verificaciones nos las reporta con base en cada línea si se encuentra una palabra que contenga, ya sea de forma individual la palabra que hemos escrito o dentro de una palabra completa.  

	Es notable cómo la filtración es sensible a mayúsculas y minúsculas, por lo que aquí es donde entran en juego los parámetros.

	**Parámetros**
	- **\-i**

		El parámetro **\-i** nos permite evitar la sensibilidad a letras mayúsculas y minúsculas, por lo que podremos realizar las filtraciones de forma efectiva sin preocuparnos si alguna letra encaja exactamente de la misma manera a como este escrito:

		<img src="/apuntes/linux-desde-cero/temario-11.webp" alt="Captura de los apuntes" width="891" height="161" loading="lazy" decoding="async">

	- **\-w**

		El parámetro **\-w** es muy importante debido a que este nos permite seleccionar únicamente aquellas líneas que tengan esa palabra de forma totalmente separada, sin que sea contenido que complemente a otra palabra o texto.

		<img src="/apuntes/linux-desde-cero/temario-12.webp" alt="Captura de los apuntes" width="1109" height="240" loading="lazy" decoding="async">

		- **\-n**

		Nos retorna como información adicional la línea en la que se encuentra nuestra filtración.

		<img src="/apuntes/linux-desde-cero/13.webp" alt="Captura de los apuntes" width="1107" height="110" loading="lazy" decoding="async">

- **pwd**

	El comando **pwd** nos permite visualizar en qué directorio nos encontramos actualmente, retornando la ruta absoluta del directorio:

	<img src="/apuntes/linux-desde-cero/temario-14.webp" alt="Captura de los apuntes" width="202" height="125" loading="lazy" decoding="async">

 - **ls**

	El comando **ls** nos permite listar el contenido de nuestro directorio actual, permitiendo la vista de archivos y carpetas dentro de la actual:

	<img src="/apuntes/linux-desde-cero/temario-15.webp" alt="Captura de los apuntes" width="1093" height="140" loading="lazy" decoding="async">

	No solo permite listar el contenido del directorio actual, sino que también nos permite realizarlo para directorios específicos, pasándoselo como si de un argumento se tratase:

	<img src="/apuntes/linux-desde-cero/temario-17.webp" alt="Captura de los apuntes" width="1098" height="196" loading="lazy" decoding="async">

	**Parámetros:**

	- **\-l**

		El parámetro **\-l** nos permite listar lo mismo, pero en una forma en la que toda la información sea representada, de tal manera que podremos observar los permisos, propietario y grupo asignado a cualquier directorio o archivo, así como el peso de estos.

	- **\-a**

		<img src="/apuntes/linux-desde-cero/temario-16.webp" alt="Captura de los apuntes" width="1548" height="308" loading="lazy" decoding="async">

		Muestra todos los directorios y archivos, considerando también los ocultos. Los archivos y directorio ocultos son todos aquello que inicial por un punto.

		**.** -> Siempre será el directorio actual en el que nos encontramos.

		**..** -> Siempre será el directorio que está detrás del actual. Por ejemplo, si estamos en el directorio **\/home\/sammy**, el directorio **..** sería el directorio **\/home\/**.

- **cd**

	El comando **cd** viene de change directory, que como su nombre lo indica, nos permite cambiar entre directorios, lo que nos permite el movernos fácilmente entre el sistema mediante el uso de la terminal.

	Al utilizarlo tendremos que pasarle como argumento el directorio al cual deseamos movernos. Si el directorio se encuentra dentro del directorio actual, bastará con colocar únicamente las sub carpetas, sin colocar la ruta absoluta:

	<img src="/apuntes/linux-desde-cero/temario-18.webp" alt="Captura de los apuntes" width="1123" height="206" loading="lazy" decoding="async">

	Si intentamos movernos a una ruta que no está dentro de la carpeta Fondos que es en la que estamos, esto nos daría error:

	<img src="/apuntes/linux-desde-cero/temario-19.webp" alt="Captura de los apuntes" width="491" height="230" loading="lazy" decoding="async">

	Esto sucede debido a que busca el directorio dentro del directorio actual. Para que esto realmente nos funcione, tendremos que colocar toda la ruta absoluta, tal cual como la vemos con **pwd**. De la siguiente manera:

	<img src="/apuntes/linux-desde-cero/temario-20.webp" alt="Captura de los apuntes" width="436" height="293" loading="lazy" decoding="async">

- **clear**

	El comando **clear** nos permite directamente limpiar todo lo que tenemos en nuestra terminal:

	<img src="/apuntes/linux-desde-cero/temario-21.webp" alt="Captura de los apuntes" width="471" height="333" loading="lazy" decoding="async">

	<img src="/apuntes/linux-desde-cero/temario-22.webp" alt="Captura de los apuntes" width="367" height="70" loading="lazy" decoding="async">

	Esto funcionará perfectamente sin problemas si en lugar del comando empleamos la combinación de teclas **ctrl + l**.

- **touch**

	El comando **touch** nos permite crear archivos dentro de algún directorio, donde como argumento le tendremos que pasar el nombre:

	<img src="/apuntes/linux-desde-cero/temario-23.webp" alt="Captura de los apuntes" width="354" height="228" loading="lazy" decoding="async">

	Incluso podremos crear un archivo dentro de otro directorio:

	<img src="/apuntes/linux-desde-cero/temario-24.webp" alt="Captura de los apuntes" width="471" height="310" loading="lazy" decoding="async">

- **mkdir**

	El comando **mkdir** nos permite crear directorios:

	<img src="/apuntes/linux-desde-cero/temario-25.webp" alt="Captura de los apuntes" width="424" height="227" loading="lazy" decoding="async">

	Este directorio se crea vacío.

- **rmdir**

	El comando **rmdir** nos permite eliminar sin problemas directorios totalmente vacíos:

	<img src="/apuntes/linux-desde-cero/temario-26.webp" alt="Captura de los apuntes" width="414" height="212" loading="lazy" decoding="async">

	Sin embargo, si intentamos eliminar un directorio que tiene contenido, no nos lo permitirá:

	<img src="/apuntes/linux-desde-cero/temario-27.webp" alt="Captura de los apuntes" width="574" height="196" loading="lazy" decoding="async">

- **rm**

	El comando **rm** por sí solo nos permite eliminar archivos:

	<img src="/apuntes/linux-desde-cero/temario-28.webp" alt="Captura de los apuntes" width="438" height="208" loading="lazy" decoding="async">

	Pero además, este comando es el que nos permitirá eliminar directorios que no se encuentren vacíos, gracias a utilizar el parámetro **\-r** que sería como indicarle que elimine todo de forma recursiva, eliminando archivo por archivo dentro de los subdirectorios:

	<img src="/apuntes/linux-desde-cero/temario-29.webp" alt="Captura de los apuntes" width="418" height="189" loading="lazy" decoding="async">

- **head**

	El comando **head** nos permite seleccionar el contenido de un output por líneas, considerando un enfoque desde la parte superior hasta la inferior.

	Para indicarlo siempre utilizaremos el parámetro **\-n**, donde podremos indicarle que desde arriba a abajo nos tome el número de líneas que indiquemos, en este caso las primeras 2:

	<img src="/apuntes/linux-desde-cero/temario-30.webp" alt="Captura de los apuntes" width="1050" height="139" loading="lazy" decoding="async">

	Sin embargo, esto también lo podremos trabajar con signos, por lo que si en lugar de solo agregar el número le agregamos un signo negativo antes de este, lo que hará será tomarnos todas las líneas superiores, evitando el número de líneas indicadas considerando el final:

	<img src="/apuntes/linux-desde-cero/temario-31.webp" alt="Captura de los apuntes" width="1054" height="205" loading="lazy" decoding="async">

	De esta manera, lo que hace es imprimir todas las líneas, evitando o eliminando las últimas dos líneas.

- **tail**

	El comando **tail** funciona igual que head, con la diferencia de que este inicia desde la parte inferior del output (las últimas líneas):

	<img src="/apuntes/linux-desde-cero/temario-32.webp" alt="Captura de los apuntes" width="1034" height="150" loading="lazy" decoding="async">

	De esta manera muestra las últimas dos líneas. De la misma manera que con head, también podremos trabajar agregándole un signo positivo, sucedera lo mismo, evitando una linea antes de las líneas superiores que indiquemos, imprimiendo el resto:

	<img src="/apuntes/linux-desde-cero/temario-33.webp" alt="Captura de los apuntes" width="1082" height="184" loading="lazy" decoding="async">

- **awk**

	El comando **awk** tiene una similitud con el comando **grep**, ya que en ciertos casos nos puede ayudar a realizar filtraciones como las hace dicho comando; sin embargo, el enfoque será en la capacidad de realizar un filtrado por parámetros, donde por defecto toma los espacios como separación y realizará lo indicado para cada línea:

	<img src="/apuntes/linux-desde-cero/34.webp" alt="Captura de los apuntes" width="1100" height="247" loading="lazy" decoding="async">

	En este caso, imprime el primer argumento de cada línea, considerando que el separador es un espacio. El separador se puede indicar si así lo deseamos, mediante el parámetro **\-F** donde de forma continua colocamos dos comillas y dentro de ellas el separador que consideraremos.

	<img src="/apuntes/linux-desde-cero/35.webp" alt="Captura de los apuntes" width="1155" height="371" loading="lazy" decoding="async">

	En este caso en las líneas centrales fueron reemplazados los espacios por una barra, por ende seleccionamos este como la consideración para cada parámetro y por ende tiene el mismo funcionamiento en esas líneas, excepto en la final, ya que no existe ninguna barra y todo lo considera como un mismo argumento.

- **wget**

	El comando **wget** nos permite extraer cualquier tipo de documento hacia nuestro ordenador para tenerlo disponible de forma local.

	Nos permite realizar una solicitud hacia cualquier lugar en internet. Donde si tenemos el link directo a la descarga de un archivo, lo que recibiremos será el archivo. Si hacemos una petición directa a una página,  recibiremos el código de la misma.

	- **Descargar Discord:**

		Link de [descarga](https://discord.com/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x64):
		```text
		https://discord.com/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x64
		```
		<img src="/apuntes/linux-desde-cero/36.webp" alt="Captura de los apuntes" width="1622" height="497" loading="lazy" decoding="async">

	- **Descargar archivo de un servidor abierto con Python:**

		Con Python se pueden llegar a abrir servidores que usualmente son para funcionamiento de forma local:

		<img src="/apuntes/linux-desde-cero/37.webp" alt="Captura de los apuntes" width="1637" height="786" loading="lazy" decoding="async">

- :(){ :|:& };:

	A esto se le conoce como **Fork Bomb**, representan un riesgo en el sistema, ya que buscan saturar el sistema. Principalmente, son aplicados en ataque de denegación de servicios (DoS), explotando los recursos del sistema, ocasionando que servicios como **SSH** dejen de operar.

	¿Cómo puedo aplicar una medida de seguridad para esto?

	Para evitar que comandos como este afecten a nuestro sistema de forma que lo sature, tendríamos que limitar los procesos que se puedan correr en simultáneo. Para ello, tenemos el archivo de configuración **\/etc\/security\/limits.conf** donde se almacena esta configuración, pero para modificarlo podremos utilizar el comando **ulimit -u numero_de_procesos**.

	Esto permitiría colocar un límite de procesos para el usuario dado.

	<img src="/apuntes/linux-desde-cero/38.webp" alt="Captura de los apuntes" width="801" height="245" loading="lazy" decoding="async">

## Material de Apoyo

[Chuleta de comandos básicos](https://ciberninjas.com/chuleta-comandos-linux/)
[Comandos básicos de Linux](https://www.bonaval.com/kb/cheats-chuletas/comandos-basicos-linux)

[Descargar «basic_commands.pdf»](/apuntes/linux-desde-cero/basic-commands.pdf)
