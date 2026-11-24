---
curso: "personaliza-tu-linux"
modulo: "personaliza-tu-linux/escritorio"
leccion: "configuracion-e-integracion-de-nvchad-en-neovim"
titulo: "Configuración e integración de NVChad en Neovim"
orden: 11
minutos: 7.4
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 1
ejercicios: []
---

## ¿Que son *NVchad* y *Neovim*?

1. #### *Neovim*

	*Neovim* es un editor de texto extensible basado en Vim, diseñado para mejorar la eficiencia en la edición de código y la experiencia del usuario. Se desarrolló como una bifurcación de Vim, con el objetivo de modernizar el código base, introducir mejoras en la arquitectura y facilitar la contribución de la comunidad. Neovim añade caracteristicas como una API mejorada para plug-ins y soporte integrado para ejecutar procesos de fondo asíncronos, lo que permite una experiencia más fluida y rica en características sin bloquear la interfaz del usuario mientras se ejecutan tareas complejas.
	</br>

2. #### *NVChad*

	*NVChad* es un framework de configuración para Neovim que ofrece una experiencia de usuario mejorada y una suite de características prediseñadas. Es conocido por su interfaz de usuario estéticamente agradable y por su enfoque en la simplicidad y la eficiencia. NVChad viene preconfigurado con una serie de plug-ins cuidadosamente seleccionados y configuracioens optimizadas que abordan tanto a la funcionalidad como a la visualización. Esto incluye soporte para temas de color, gestión de buffers mejorada, autocompletado inteligente, y mucho más, todo ello manteniendo un rendimiento rápido. NVChad está diseñado para ser fácil de instalar y configurar, ofreciendo a los usuarios una plataforma robusta sobre la cual pueden construir o adaptar según sus necesidades específicas.

Ambas herramientas están diseñadas para completarse entre sí, donde Neovim proporciona el entorno base y NVChad aprovecha y amplía sus capacidades, facilitando una experiencia de usuario altamente personalizada y eficiente para programadores y editores de texto.

## Configuración e integración de *NVChad* en *Neovim*

1. Primeramente, vamos a eliminar Neovim, que será alguno de los dos siguientes:

	```text
	sudo apt remove nvim
	sudo apt remove neovim
	```

	Con esto buscaremos el repositorio con [*NVChad GitHub*](https://github.com/NvChad/NvChad) y nos iremos al apartado de [*install*](https://nvchad.com/docs/quickstart/install/). Ahora, como usuario no privilegiado en el directorio personal, ejecutaremos los siguientes comandos:

	```text
	mkdir ~/.config/nvim
	git clone https://github.com/NvChad/starter ~/.config/nvim
	```

	Esto nos almacenará el repositorio en *~/.config/nvim*. 
	
	Ahora nos iremos al repositorio de [*nvim*](https://github.com/neovim/neovim), aquí nos iremos al aparato de releases y en el más reciente, descargaremos el archivo *.tar.gz*:

	<img src="/apuntes/personaliza-tu-linux/img-0039.webp" alt="Captura de los apuntes" width="225" height="53" decoding="async">

	Con esto, como usuario root crearemos una carpeta en el directorio */opt/* para el Neovim:

	```text
	sudo su
	cd /opt/
	mkdir nvim
	cd !$
	```

	Ahora nos traeremos a este directorio el archivo del Neovim del directorio de descargas:

	```text
	mv /home/user/Downloads/nvim.tar.gz .
	```

	Recordando cambiar el usuario por el suyo y el nombre del nvim por el que tiene el almacenado en el directorio de descargas. Luego vamos a descomprimir el archivo *.tar.gz*:

	```text
	tar -xf nvim.tar.gz
	rm nvim.tar.gz
	```

	Ahora ya tendríamos todo el contenido dentro de una carpeta *nvim-linux64*, aquí internamente, si nos vamos a la sub carpeta *bin/*, aquí es donde se encuentra nuestro *nvim*, por ende tendremos que contemplar también esta ruta en el *PATH*, entonces la cargaremos en nuestro archivo *.zshrc* en nuestra línea donde exportamos el PATH, lo agregaremos:

	```text
	export PATH="/opt/kitty/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games:/usr/sbin:/opt/nvim/nvim-linux64/bin"
	```

	Ahora ejecutaremos en terminal *nvim* como usuario no privilegiado, esto comenzará a instalarnos el *Neovim* y nos aplicaría un tema de NVChad. 
	
	Cuando todo se halla completado, solo tendremos que presionar *:q!* y darle enter. Si no nos saca rápidamente, con hacerlo en repetidas ocasiones bastará, ya que nos sacará de las otras ventanitas abiertas dentro del nvim.

	Ahora, una de las cosas que se ve dentro de nuestro *nvim* es que al final de cada línea se nos queda un *$*. Este lo eliminaremos con una línea específica en el archivo *init.lua*, el cual está en el directorio *~/.config/nvim*.

	```text
	vim.opt.listchars = "tab:»·,trail:·"	
	```

	Esta indicación hace que ya no se muestre este símbolo. Lo pegaremos justo después de las primeras dos instrucciones, en la primera línea libre que veamos. Guardamos y cerramos. 
	
	Ahora, al abrir algún archivo, ya no se mostraría este símbolo.
	</br>

2. Instalaremos *locate*, lo cual es una utilidad que nos ayudara a encontrar de forma rápida archivos del sistema.

	```text
	sudo apt install locate -y
	```

	Una vez instalado, ejecutaremos:

	```text
	sudo updatedb
	```

	Parecerá que hay un problema si llega a mostrar que no se tiene el permiso de acceder a algunas rutas absolutas. Con esto realmente no hay problema, ya que con desmontarlos con *umount* bastaría. En este caso son dos rutas y bastaría con efectuar los siguientes comandos:

	```text
	umount /run/user/1000/doc
	umount /run/user/1000/gvfs
	```

	Verifica que sean las mismas rutas que a ti te dio. En caso de que no, simplemente acomódalo para las rutas a las cuales te salía que no tenías permiso. Con esto listo, ahora cuando volvamos a realizar un *sudo updatedb* ya no habrá ningún problema.

	El *updatedb* lo que hace es cómo cargar todos los archivos, para que al utilizar *locate* pueda encontrar lo que buscamos sin ningún problema.

	Un ejemplo sería buscar todos los archivos *init.lua* que se encuentran en el sistema operativo, esto se haría simplemente con:

	```text
	locate init.lua
	```

	Lo cual los listará.
	</br>

3. Los lenguajes no preinstalados los reconocerá *nvim*, nos daremos cuenta, ya que en la parte inferior nos aparecerá un mensaje, pero solucionarlo bastaría con preisonar *:* y escribir MasonInstallAll. 

   Si lo hiciéramos para el archivo init.lua, al volverlo a abrir ya no habría ningún problema.
   </br>

4. Cosas que se pueden realizar con nvim:

	Las combinaciones de teclas que se representen con *->* en nvim se hacen por separado, ya que nvim va registrando las teclas que presionemos, para tomarlo como un tipo de comando y realizar las acciones que necesitemos.
   
	*  *Seleccionar tema para nvim*: Si presionamos *esc* y luego *espacio -> t -> h*, esto nos abrirá un menú de temas, ya que en nvim con nvchad, podremos seleccionar el tema que más nos agrade.

	* *Navegar entre subdirectorios*: Al presionar *esc* y luego *ctrl + n*, como estamos empleando nvchad, a la izquierda nos estaría abriendo las carpetas y sub carpetas del directorio en el que estemos trabajando y podremos navegar y abrir archivos.
	
	* *Creación de nuevos archivos*: Al entrar al menú que nos permite navegar entre subdirectorios, si presionamos la tecla *a*, en la parte inferior se nos pone el directorio actual y ahí podríamos escribir el nombre del archivo. Al darle enter, este se nos crearía.
	
	* *Eliminación de archivos:* Al estar en el menú que nos permite navegar entre los archivos, siempre habrá uno seleccionado, podremos cambiar entre ellos con las flechas si así lo deseamos, si presionamos la tecla *d*, nos preguntará si estamos seguros de eliminar el archivo que estaba seleccionado y con presionar *y*, estaríamos borrándolo.

	* *Renombrar archivos:* Si presionamos la tecla *r*, nos pondrá en la parte inferior su nombre actual, podremos borrarlo y cambiarlo. Al dar enter se realizará el cambio.

	* *Copear y pegar archivos:* Si presionamos la tecla *c*, nos copiaría el archivo seleccionado. Podremos movernos entre directorios y si quisiéramos pegarlo 2 subdirectorios dentro, bastaría con colocarnos en él mediante el uso de las flechas y presionar *p*; de esta forma haríamos una copia.
   
	* *Navegar entre archivos de la sesión actual*: Cuando tengamos múltiples archivos abiertos, podríamos navegar entre ellos con solo utilizar el teclado, presionando *esc* y después *espacio -> f -> b*, aquí nos mostrará todos los archivos abiertos actualmente, además de una previsualización. Para abrir uno deseado, solo daríamos enter.

	* *Búsquedas en subdirectorios*: Podremos realizar búsqueda de archivos del directorio actual, así como de sus subdirectorios. Para ello simplemente haremos un *esc* y después *espacio -> f -> f*, esto nos abrirá un buscador y aquí podremos buscar por lo que deseemos.

	* *Abrir terminales*: Podríamos abrir una terminal dentro del nvim, con presionar *esc* y después *espacio -> v* para abrirla de forma vertical o, en su lugar, *espacio -> h* para abrirla de forma horizontal.

	  Ya si quisiéramos salir de esta misma, bastaría con presionar *esc*.
	  </br>

5. Además, nvim cuenta con modos de visualización que pudiéramos requerir con base en el tipo de archivo que estemos abriendo.

	* *vsp*: si presionamos *esc* y luego escribimos *:vsp*, esto nos crearía una copia visual exacta del archivo con el que estemos trabajando, lo cual se abriría de forma vertical y a un lado del actual, de esta manera podríamos navegar en el segundo, sin perder de vista algo especifico que tengamos en el primero. Para salir bastaría con presionar *esc* y después escribir *:q!* y darle al enter.

	* *sp*: es lo mismo que el anterior, pero en lugar de abrirlo con *:vsp*, lo abriríamos con *:sp*. Esto lo abriría de forma horizontal y debajo.

6. NVChad cuenta con una hoja donde podremos visualizar los comandos. Para poder verla o abrirla, bastaría con presionar *esc* y después *espacio -> c -> h*. Podremos salir de esta con presionar la letra *q*.
