---
curso: "personaliza-tu-linux"
modulo: "personaliza-tu-linux/escritorio"
leccion: "configurando-las-fuentes-la-kitty-e-instalacion-de-feh"
titulo: "Configurando las fuentes, la kitty e instalación de Feh"
orden: 4
minutos: 11.3
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 4
ejercicios: []
---

##  ¿Que son la *kitty*, *Hack Nerd Fonts* y *Feh*?

Estas herramientas son bastantes populares en la comunidad de usuarios avanzados en Linux, especialmente aquellos que prefieren entornos altamente personalizables y eficientes.
</br>

1. #### ¿Que es la *kitty*?

	*Kitty* es un emulador de terminal moderno para sistemas operativos pasados en Unis, como Linux y macOS.

	Es especialmente conocido por su eficiencia y capacidad para manejar gráficos modernos como imágenes y emojis directamente en la terminal. Kitty es altamente personalizable y ofrece funcionalidades avanzadas como pestañas, división de ventanas, y transparencia, entre otros.

	Además utiliza aceleración por GPU para renderizar los textos, lo que lo hace particularmente rápido.
	</br>
2. #### ¿Que son las *Hack Nerd Fonts*?

	Las *Hack Nerd Fonts* son una versión modificada de la fuente mono-espaciada Hack, que ha sido ampliada con una gran cantidad de iconos y símbolos adicionales, comocidos como "glyphs". 
	
	Estos incluyen íconos de populares herramientas de desarrollo y sistemas, lo que hace a esta fuente muy útil para desarrolladores y usuarios de terminales, ya que permite visualizar íconos específicos de herramientas directamente de la interfaz de la terminal.
	</br>
3. #### ¿Que es *Feh*?

	*Feh* es un visor de imágenes ligero y rápido para Linux que también puede ser utilizado para configurar fondos de pantalla en sistemas de escritorio. 
	
	Es muy eficiente y funciona bien en entornos de escritorio ligeros o configuraciones minimalistas, ya que no depende de grandes librerías gráficas. Feh puede ser utilizado en scripts y configuraciones para cambiar automáticamente fondos de pantalla o para mostrar imágenes en presentaciones de diapositivas.
## Configurando las fuentes, la kitty e instalación de Feh

1. Iniciaremos con la instalación de la fuente <mark>Hack Nerd Font</mark>, esta nos será de mucha ayuda durante la personalización de nuestra terminal mediante el uso de la <mark>PowerLevel10k</mark> que será lo que nos permitirá darle una mejor estética a la terminal o para representar iconos en nuestra <mark>polybar</mark>. 
	
   Para esto la idea es llevar las fuentes a nuestro directorio <mark>/usr/local/share/fonts</mark>, para ello utilizaremos un navegador, <mark>firefox</mark> viene por defecto y agregaremos de una vez una combinación de teclas para este al final del archivo <mark>sxhkdrc</mark>, recordando que se encuentra en el directorio <mark>~/.config/sxhkd</mark>. 
   
    El atajo que agregaremos recordando siempre colocar la ruta absoluta de los programas, será:

	```text
	# open firefox
	super + shift + f
		/usr/bin/firefox
	```
	
	Nota: 
	Firefox es un buen navegador, pero si queremos una opción que nos dé una mayor privacidad, para ello tenemos [*LibreWolf*](https://librewolf.net/installation/debian/) (un navegador basado en firefox) u otro que además por defecto nos borra todo lo que hemos realizado una vez se cierra [*Mullvad Browser*](https://mullvad.net/en/download/browser/linux). 
	
	Si ahora quisiéramos efectuar la combinación de teclas, notaremos que esta no funciona y esto se debe a que tenemos el apartado <mark># make sxhkd reload its configuration files</mark>, donde su atajo de teclado efectúa o actualiza los cambios realizados en nuestro <mark>sxhkd</mark>, para ello tendríamos que realizar primero este atajo de teclas, una vez realizado ahora si nos funcionaría el del navegador. 
	
	Ahora se abrirá el navegador y lo pasaremos al segundo escritorio con <mark>windows + shift + 2</mark>, que es uno de los atajos de teclado ya configurados, el cual nos permite cambiar la ventana seleccionada de escritorio y con <mark>windows + 2</mark> nos estaríamos cambiando a este escritorio. 
	
	De esta manera tendremos en el primer escritorio la terminal y en el segundo el navegador, en nuestro navegador buscaremos [nerdfonts.com](https://www.nerdfonts.com/). Una vez estando en la página, nos iremos al apartado de descargas y buscaremos entre todas las fuentes la de <mark>Hack Nerd Font</mark>, la descagaremos por lo pronto en la carpeta <mark>Downloads/</mark> del directorio home del usuario. 
	
	Este será un archivo <mark>.zip</mark>. Recordando que nuestra terminal del primer escritorio está en el directorio <mark>/usr/local/share/fonts</mark>, moveremos a este directorio, el archivo recién descargado:

	```text
	sudo mv ~/Downloads/Hack.zip .
	```

	Esto tendrá como contenido diversos archivos <mark>.ttf</mark>, esta terminación en archivos se utiliza para las fuentes. Por lo que una vez las llamemos desde distintas configuraciones veremos como son estas fuentes. 
	
	<mark>7z</mark> es un comando que nos permite descomprimir cualquier tipo de archivo, para descomprimirlo solo ejecutaremos:

	```text
	sudo 7z x Hack.zip
	```

	Finalmente, borraremos 3 archivos que ya no serán necesarios:

	```text
	sudo rm Hack.zip LICENSE.md README.md
	```

	Con esto listo ahora instalaríamos la terminal que vamos a emplear, ya que actualmente estamos utilizando una terminal <mark>bash</mark> y vamos a emplear una <mark>zsh</mark> la cual nos permitirá una mayor configuración.

	```text
	sudo apt install zsh -y
	```

	Ahora, antes de continuar configuraremos la clipboard bidireccional, esta nos servirá para poder copear y pegar contenido entre nuestra máquina base y nuestra máquina virtualizada. 
	
	Para ello nos dirigiremos al archivo <mark>bspwmrc</mark> y al final del todo agregaremos la siguiente instrucción, agregando & al final para que se ejecute en segundo plano siempre:

	 ```text
	 vmware-user-suid-wrapper &
	```

	Como hemos realizado cambios en nuestro archivo de configuración de bspwm, tendremos que efectuar la combinación de teclas <mark>windows + shift + r</mark>, esto reiniciara el bspwm y ahora si intentamos copear y pegar contenido entre la máquina virtual y nuestra máquina base, funcionaria sin ningún problema. 
	
	Teniendo en cuenta que en la máquina virtual: 
	
	<mark>ctrl + shift + c</mark> --> copea contenido 
	<mark>ctrl + shift + v</mark> --> pega contenido
	</br>
2. Ahora vamos a actualizar la versión de la kitty que tenemos, para ello nos iríamos a su [repositorio](https://github.com/kovidgoyal/kitty) y en el apartado de releases seleccionamos siempre la última versión:

	<img src="/apuntes/personaliza-tu-linux/img-0009.webp" alt="Captura de los apuntes" width="381" height="169" decoding="async">

	Una vez aquí nos encontraremos con bastantes paquetes, nos iremos al final y buscaremos el que diga <mark>Linux amd64 binary bundle</mark>:

	<img src="/apuntes/personaliza-tu-linux/img-0010.webp" alt="Captura de los apuntes" width="1465" height="47" loading="lazy" decoding="async">

   Damos clic y automáticamente se nos descargará. Se nos guardaría en el directorio <mark>Downloads</mark>, con esto nosotros lo moveríamos al directorio <mark>/opt/</mark>, donde tendremos que manejarlo como usuario root, ya que en este directorio se requiere de permisos de administrador para escribir.
   
	Estando en el directorio <mark>/opt/</mark>:

	```text
	sudo su
	```

	Colocamos la contraseña y ahora eliminaremos la kitty, qué cuidado porque aquí podría fallar debido a que estamos en una terminal kitty. 
	
	Si esto llegara a suceder, solo tendríamos que abrir el rofi con <mark>Windows + d</mark> y ejecutar una gnome-terminal. 
	
	La eliminaríamos con:

	```text
	apt remove kitty
	```

	Si ahora la kitty funciona bien y no nos da fallos, seguimos en ella, de lo contrario nos vamos a la gnome-terminal. 
	
	Con esto listo, dentro del directorio /opt, vamos a traer el archivo .txz que hemos descargado de la kitty más actualizada:

	```text
	mv /home/<user>/Downloads/kitty.txz .
	```

	Recordando cambiar \<user\> por su usuario y que el nombre <mark>kitty.txz</mark> cambiara dependiendo del nombre con el que se descargue el paquete. 
	
	Una forma de siempre ver qué contenido hay dentro de un archivo comprimido, es utilizando <mark>7z l file</mark>, en lugar de "x", de esta manera antes de descomprimir podremos verificar y ya almacena todo en un directorio o si se almacenarán todos los archivos por separado en nuestra carpeta actual, tendríamos que crear una carpeta para que se almacenen todos los archivos de la kitty. 
	
	Ahora descomprimimos el archivo:

	```text
	7z x kitty.txz
	```

	Este tendrá otro archivo .tar dentro, por lo que una vez descomprimido vamos a eliminar él .txz. Quedándonos con el archivo .tar. 
	
	Como en este caso el archivo .tar trae directamente las sub carpetas, crearemos un directorio para kitty y ahí almacenaremos todo el contenido, con los siguientes comandos:

	```text
	mkdir kitty
	mv kitty.tar ./kitty/
	cd kitty
	7z x kitty.tar -y
	rm -f kitty.tar
	```

	De esta manera ahora tendríamos todo descomprimido y el archivo .tar eliminado. 
	
	Ahora entraríamos al directorio bin/, en caso de que kitty y kitten no tengan permisos de ejecución, se los daríamos y después vamos a cambiar el directorio de ejecución de kitty en nuestro archivo de configuración sxhkdrc, para que funcione correctamente el atajo de teclado.
	
	<img src="/apuntes/personaliza-tu-linux/img-0011.webp" alt="Captura de los apuntes" width="494" height="322" loading="lazy" decoding="async">

	```text
	chmod +x kitty kitten
	```

	Con esto listo, en nuestro archivo sxhkdrc cambiaríamos el directorio de kitty, por el que acabamos de agregar:

	```text
	# terminal emulador
	super + Return
		/opt/kitty/bin/kitty
	```

	Con esto ya estaría actualizada nuestra kitty. 
	
	Es posible que esto nos dé bastantes problemas con los permisos al quererlo ejecutar como usuario no privilegiado, al estarlo haciendo como root, por lo que tendremos que ir viendo a qué sub carpetas y archivos darle permisos de lectura y ejecución. 
	
	Una vez dados correctamente los permisos, ahora si vamos a efectuar un <mark>Windows + esc</mark> para recargar la configuración del sxhkdrc y cerraremos manualmente nuestra kitty escribiendo <mark>exit</mark> hasta que se cierre. 
	
	Ahora si presionamos <mark>Windows + enter</mark> y tendremos nuestra kitty actualizada. 
	
	Ahora la idea es empezar a modificar la estética de nuestra terminal, por ello nos iremos al directorio <mark>/home/\<usuario\>/.config/kitty</mark>, si el directorio final "kitty" no existe, lo creamos. 
	
	Encontrándonos en el directorio, crearemos el archivo <mark>kitty.conf</mark> y le agregaremos como contenido lo siguiente:

	```text
	enable_audio_bell no

	include color.ini
	
	font_family HackNerdFont
	font_size 13
	
	disable_ligatures never
	
	url_color #61afef
	
	url_style curly

	# cambiar entre paneles de una kitty
	map ctrl+left neighboring_window left
	map ctrl+right neighboring_window right
	map ctrl+up neighboring_window up
	map ctrl+down neighboring_window down

	# clipboards para copear y pegar contenido en la kitty
	map f1 copy_to_buffer a
	map f2 paste_from_buffer a
	map f3 copy_to_buffer b
	map f4 paste_from_buffer b

	# tamaño del cursor
	cursor_shape beam
	cursor_beam_thickness 1.8
	
	mouse_hide_wait 3.0
	detect_urls yes
	
	repaint_delay 10
	input_delay 3
	sync_to_monitor yes
	
	map ctrl+shift+z toggle_layout stack
	tab_bar_style powerline
	
	inactive_tab_background #e06c75
	active_tab_background #98c379
	inactive_tab_foreground #000000
	tab_bar_margin_color black

	# abrira un nuevo panel
	map ctrl+shift+enter new_window_with_cwd
	map ctrl+shift+t new_tab_with_cwd

	# opacidad (tambien se definira desde picom)
	background_opacity 0.95

	# forzar tipo de shell
	shell zsh
	```

	Como podemos observar al final estamos forzando que la terminal sea un zsh, pero de cualquier manera vamos a configurar para que tanto el usuario no privilegiado como el root, tengan por defecto esta terminal. 
	
	Kitty es bastante configurable, con estas configuraciones podría bastar, pero de cualquier manera kitty tiene su propia [documentación](https://sw.kovidgoyal.net/kitty/).
	
	Ahora nos crearemos un archivo <mark>color.ini</mark> para que tengamos una presentación bonita con los colores al momento de trabajar en nuestra sesión con la kitty y le colocaremos el siguiente contenido:

	```text
	cursor_shape          Underline
	cursor_underline_thickness 1
	window_padding_width  20
	
	# Special
	foreground #a9b1d6
	background #1a1b26
	
	# Black
	color0 #414868
	color8 #414868
	
	# Red
	color1 #f7768e
	color9 #f7768e
	
	# Green
	color2  #73daca
	color10 #73daca
	
	# Yellow
	color3  #e0af68
	color11 #e0af68
	
	# Blue
	color4  #7aa2f7
	color12 #7aa2f7
	
	# Magenta
	color5  #bb9af7
	color13 #bb9af7
	
	# Cyan
	color6  #7dcfff
	color14 #7dcfff
	
	# White
	color7  #c0caf5
	color15 #c0caf5
	
	# Cursor
	cursor #c0caf5
	cursor_text_color #1a1b26
	
	# Selection highlight
	selection_foreground #7aa2f7
	selection_background #28344a
	```

	Si ahora guardamos y cerramos la kitty, al volver a abrirla veremos como ya se están aplicando los cambios y tendremos una mejor estética.

	<img src="/apuntes/personaliza-tu-linux/img-0012.webp" alt="Captura de los apuntes" width="934" height="532" loading="lazy" decoding="async">

	Nos mostrará esto como problemita, ya que actualmente no existe archivo de configuración para nuestra zsh Shell, por lo que utilizaremos el número <mark>0</mark>, para que nos cree un archivo de configuración, el cual será bastante simple, pero le iremos agregando cosas. 
	
	Con esto listo, ahora instalaríamos un paquete nos va a servir para el tratamiento de imágenes, en este caso abrir una desde nuestra terminal.

	```text
	sudo apt install imagemagick
	```

	Con esto instalado, nos descargamos cualquier imagen de internet y dentro de la carpeta donde se nos guardó esta imagen:

	```text
	kitty +kitten icat image.jpg
	```

	Esto no abriría la imagen dentro de la misma terminal.

3. Ahora vamos a instalar feh, esto lo hariamos con un comando:

	```text
	sudo apt install feh
	```

	Este no servirá para colocar nuestro fondo de pantalla. 
	
	Como fondo puedes seleccionar alguno a tu gusto o aplicar él el que utiliza [s4vitar](https://wallpapercave.com/download/4k-ultra-hd-neon-mask-boy-wallpapers-wp7885623). 
	
	Lo que haremos será crear un directorio <mark>Fondos</mark> en nuestro directorio personal y nos traeremos para aquí el o los fondos. 
	
	De forma que si ejecutáramos:

	```text
	feh --bg-fill Fondo.jpg
	```

	Nos colocaría la imagen seleccionada de fondo. 
	
	Ahora, para evitar tener que estar ejecutando este comando cada que entremos a nuestra máquina, lo que tendríamos que hacer es colocarlo al final de nuestro bspwmrc, pero de la siguiente manera:

	```text
	/usr/bin/feh --bg-fill /home/<user>/Desktop/Fondos/Fondo.jpg
	```

	Con esto, podremos regresar a la pantalla de bloqueo con <mark>Windows + shift + q</mark> y veremos como automáticamente se carga el fondo. 
	
	Por último, nos faltaría que nuestro usuario root tenga su propia configuración de la kitty, debido a que si desde la terminal actual abriéramos una nueva kitty como usuario root esta se vería como la teníamos antes. 
	
	Esto se debe a que el usuario root tiene su propio directorio personal, así como sus directorios para archivos de configuración, por lo que como usuario root dentro del directorio <mark>~/.config/kitty</mark> nos traeremos toda la configuración del directorio <mark>/home/user/.config/kitty/</mark>, de la siguiente manera:

	```text
	cp /home/user/.config/kitty/* .
	```

	Con esto ya tendríamos la configuración lista, la configuración de la kitty para el usuario root y por ende si abriéramos ahora una nueva terminal kitty como usuario root, esta ya tendría la misma configuración.
