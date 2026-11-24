---
curso: "personaliza-tu-linux"
modulo: "personaliza-tu-linux/escritorio"
leccion: "instalacion-de-batcat-y-lsd"
titulo: "Instalación de Batcat y Lsd"
orden: 8
minutos: 4.7
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 2
ejercicios: []
---

## ¿Que es *Batcat* y *Lsd*?

1. #### *Batcat*

	*Batcat* es la versión distribuida en Debian y Ubuntu del programa *bat*, una herramiente de línea de comandos que sirve como una versión mejorada del clásico comando *cat* de Unix. Batcat ofrece resultado de sintaxis para una gran variedad de lenguajes de programación y formatos de archivo, facilitando la lectura y comprensión del código directamente en la terminal. Además integra funcionalidades como la integración con git para mostrar diferencias en el código, numeración de lineas, y la capacidad de previsualizar el contenido de archivos en formato paginado.

	Esta herramienta es especialmente útil para desarrolladores y personas que trabajan frecuentemente con código fuente o scripts, ya que mejora significativamente la legibilidad y la eficiencia al explorar o revisar archivos en la terminal.
	</br>
2. #### *Lsd*

	*Lsd* (abreviatura de LSDeluxe) es un reemplazo moderno para el tradicional comando *ls* de Unix. Diseñado para mejorar la visualización de los archivos en la terminal. *Lsd* ofrece un resaltado de colores basado en el tipo de archivo y permisos, además de utilizar iconos para cada tipo de archivo, lo que hace que la navegación y comprensión de la estructura de los directorios sea mucho más intuitiva y visualmente agradable. Al igual que *bat*, *lsd* soporta fuentes de *Nerd Fonts* para mostrar iconos, y puede ser completamente personalizado mediante un archivo de configuración para adaptarse a las preferencias del usuario.

	Lsd también soporta características como el árbol de directorios directamente en la lista de archivos lo cual es útil para obtener una visión rápida de la jerarquía de directorios sin necesidad de comandos adicionales. Su funcionalidad y estética mejorada lo hacen popular entre los usuarios que desean una experiencia más rica y eficiente en la linea de comandos.


## Instalación de *Batcat* y *Lsd*

1. Iniciaremos con batcat y buscando [*batcat GitHub*](https://github.com/sharkdp/bat) para ir a su repositorio, de aquí nos iremos al apartado de releases y descargaremos el archivo *.deb* que sea *amd64*:

	<img src="/apuntes/personaliza-tu-linux/img-0037.webp" alt="Captura de los apuntes" width="248" height="49" decoding="async">

	Una vez descargado, nos dirigiremos al directorio de descargas y nos colocaremos como usuario root.

	Ahora instalaremos batcat:

	```text
	dpkg -i batcat.deb
	```

	Con esto quedaría instalado y podríamos ver las diferencias entre cada uno al listar el contenido de un archivo con *cat* y con *bat*. 
	
	Ahora se definirá un apartado de *Custom alisases* dentro de nuestro *.zshrc*. Esto nos servirá para definir que nuestro *cat* ejecute directamente un *bat* y veamos todo con una mejor estética:

	```text
	# Custom aliases
	#---------------------------------------

	#bat
	alias cat='bat' # bat con modo pagina
	alias catn='bat --style=plain' # similar al cat normal
	alias catn='bat --style=plain --pagin=never' # elimina el modo pagina en el output
	```


2. Ahora con Lsd y buscarepos [*lsd github*](https://github.com/lsd-rs/lsd) para ir a su repositorio, de aquí nos iremos al apartado de releases y descargaremos el archivo *.deb* que sea *amd64*:

	<img src="/apuntes/personaliza-tu-linux/img-0038.webp" alt="Captura de los apuntes" width="214" height="54" loading="lazy" decoding="async">

	Una vez descargado, nos dirigiremos al directorio de descargas y nos colocaremos como usuario root.

	Ahora instalaremos lsd:

	```text
	dpkg -i lsd.deb
	```

	Con esto quedaría instalado y podríamos ver las diferencias entre cada uno al listar el contenido de un directorio con *ls* y con *lsd*. 
	
	Al utilizar lsd notaremos que ciertas cosas que lista las pone en negritas, esto ya es preferencial, pero en este caso le quitaremos las negritas, esta es una instrucción que se almacena en la variable de entorno *$LS_COLORS* y lo que representa la indicación de las negritas es *01;*, lo cual estaremos eliminando y se hace fácilmente con el siguiente comando:

	```text
	export LS_COLORS="$(echo $LS_COLORS | sed 's/=01;/=/g')"
	```

	Esto reemplazaría el contenido que tiene la indicación en negritas por el mismo, pero sin esa indicación, ya que se reemplazó empleando el comando *sed*. 
	
	Este es un cambio que se realiza momentáneamente, por lo tanto, para tenerlo siempre de esta manera, tendríamos que agregar esta instrucción en nuestro archivo *.zshrc*. 
	
	Dentro de nuestro apartado *Custom aliases*, vamos a agregar ahora la definición para los alias de *lsd*:

	```text
	# Custom aliases
	#---------------------------------------

	#bat
	alias cat='bat' # bat con modo pagina
	alias catn='bat --style=plain' # similar al cat normal
	alias catn='bat --style=plain --pagin=never' # elimina el modo pagina en el output

	#ls
	alias ll='lsd -lh --group-dirs=first' # Muestra mayor informacion
	alias la='lsd -la --group-dirs=first' # Muestra ocultos
	alias l='lsd --group-dirs=first' # aplica un ls normal
	alias lla='lsd -lha --group-dirs=first' # Muestra mayor informacion y ocultos
	alias ls='lsd --group-dirs=first' # ls normal
	```


Una cosa importante es la variable de entorno *$PATH*, ya que en esta se almacenan los directorios en los cuales se buscaran los comandos o aplicaciones que estemos utilizando.

Si utilizamos el comando:

```text
echo $PATH
```

Si lo hacemos para usuario root y no privilegiado, podremos notar que en root no se contempla la ruta absoluta de la kitty que estamos empleando, por ello en nuestro comando .zshrc en el directorio del usuario no privilegiado, agregaremos lo siguiente:

```text
export PATH="/opt/kitty/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games:/usr/sbin"
```

Las rutas agregadas son del *PATH* del usuario no privilegiado, por ende si te diera problemas solo coloca las que tenga tu usuario no privilegiado. 

De esta manera, ahora, si quisiéramos ejecutar una kitty desde consola como usuario privilegiado, podríamos hacerlo sin problemas.
