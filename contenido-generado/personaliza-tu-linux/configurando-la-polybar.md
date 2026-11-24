---
curso: "personaliza-tu-linux"
modulo: "personaliza-tu-linux/escritorio"
leccion: "configurando-la-polybar"
titulo: "Configurando la polybar"
orden: 9
minutos: 5.2
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 0
ejercicios: []
---

1. Para nuestra configuración en la polybar, realizaremos distintas cosas. Primeramente, tendremos que estar en su directorio, el cual es *~/.config/polybar*. Aquí estaremos trabajando realizando modificaciones en los archivos *launch.sh* y *current.ini*.

	*launch.sh* define o carga los elementos o barras que estamos cargando, que son como los bloques que muestran la información en la parte superior. 
	
	*current .ini* contiene la configuración para cada barra o elemento que se encuentre definido.

	Empezaremos con el archivo *current.ini*, en este vamos a cambiar de primeras los colores de fondo de nuestras tarjetas, tanto de la izquierda, como de la derecha. 
	
	Primeramente, filtraremos por *log*, esto nos llevará a la configuración de la barra o tarjeta de la izquierda, que cuenta con el icono. Las diversas opciones que tiene las podremos modificar si deseamos, para desplazar, modificar su tamaño, color o lo que muestre, etc.

	En el apartado *background* borraremos el color que está y en su lugar colocaremos ${color.bg}, al recargar la polybar, esto nos cambiaría su color de fondo al gris con el que todas las demás ya cuentan. 
	
	Si ahora observáramos el apartado *modules-center*, este tendrá *my-text-label*, entonces filtraremos por él, para llegar hasta al apartado de módulos y poder modificar el icono que se muestra cambiando el apartado de *content*, por un icono que deseemos de la página [*nerdfonts*](https://www.nerdfonts.com/cheat-sheet).

	Aquí podríamos llegar a tener problema con que no nos cargue algunos iconos, esto se debe a que antes del icono se está referenciando a una fuente de número *7*, la cual no se encuentra creada, por así decirlo, dentro de nuestro current.ini. Para ello, vamos a filtrar por *font-name* y al final, luego de la fuente 6, crearemos la fuente 7, con lo siguiente:

	```text
	font-7 = "Hack Nerd Font Mono:size=22;5"
	```

	En el apartado size, nuestro valor de la izquierda será para regular el tamaño del icono, mientras que el de la derecha será para regular la altura. De esta manera, si al hacerlo más grande no queda centrado, podríamos centrarlo.
	</br>
2. Ahora crearemos una barra personalizada en la polybar, para ello iremos al archivo *launch.sh* 

    En este tomaremos la segunda barra creada para el apartado izquierdo y después de *polybar*, lo que sigue es su nombre, por lo tanto, lo borraremos y le pondremos como nombre *ethernet_bar*.
    
	Este nombre tendrá que ser creado como barra dentro del *current.ini*, para ello filtraremos por *secondary* y copearemos todo su contenido, para colocarlo sobre esa misma. 
	
	Como *width* le daremos un 10%. Si se llegara a necesitar más espacio para mostrar todo el contenido, se le daría más porcentaje.

	Ahora en el apartado *modules-center*, cambiaremos el de *date*, por uno que vamos a crear, a este le llamaremos *ethernet_status*. 
	
	De esta manera, nuestro apartado de definición de la barra, quedaría de esta manera:

	```text
	[bar/ethernet_bar]
	inherit = bar/main
	width = 11.5%
	height = 40
	offset-x = 3.8%
	offset-y = 15
	background = ${color.bg}
	foreground = ${color.white}
	bottom = false
	padding = 1
	;padding-top = 2
	module-margin-left = 0
	module-margin-right = 0
	;modules-left = date sep mpd
	modules-center = ethernet_status 
	wm-restack = bspwm
	```

	Ahora, filtrando por *module/date*, copiaremos sus primeras dos líneas y definiremos nuestro módulo, al final de todos los existentes. 
	
	Este tendrá de nombre *ethernet_status*, de tipo será un *custom/script*, se ejecutara con un intervalo de cada 2 segundos, y con *exec* le indicaremos la ruta absoluta donde se encontrara nuestro script, en este caso será *~/.config/bspwm/scripts/ethernet_status.sh*, de esta manera nuestro módulo quedaría así:

	```text
	[module/ethernet_status]
	type = custom/script
	interval = 2
	exec = ~/.config/bspwm/scripts/ethernet_status.sh
	```

	Ahora, en cuanto a nuestro script respecta, este nos mostrará la IP privada de la máquina, y tendrá el siguiente contenido:

	```text
	#!/bin/sh
	
	if [  "$(/usr/sbin/ifconfig ens33 | grep "inet " | awk '{print $2}')" ]; then
	  echo "%{F#00FF00}󱚸 %{F#ffffff}$(/usr/sbin/ifconfig ens33 | grep "inet " | awk '{print $2}')%{u-}"
	else
	  echo "%{F#FF0000}󰤭 %{F#ffffff} NO WIFI%{u-}"
	fi
	```

	Aquí tendremos que asegurarnos de que la ruta absoluta de *ifconfig* sí es la indicada y de que además nuestro nombre de interfaz de red también sea *ens33*. 
	
	Ahora mismo ya estaría lista nuestra barra de la IP privada, y en todo momento podríamos visualizar nuestra IP privada.
	</br>

3. Ahora crearemos una nueva barra, primero la definiremos dentro de nuestro *launch.sh*, copiando la línea de la última que definimos y le cambiamos el nombre a *vpn_bar*, esto nos será de ayuda cuando, por ejemplo, nos conectemos a máquinas de *HackTheBox*, para ver en todo momento su IP. 

	Para nuestro *current.ini*, copeamos todo el contenido de la barra anteriormente definida y le cambiaremos el nombre a *vpn_bar*, aquí lo que cambiaremos será la posición en x, ya que actualmente se encontraría justo debajo de la barra *ethernet_status*, en x pondríamos un *15.6%*, esto cambiara dependiendo de como se acomoden mejor tus barras, para que no queden empalmadas.

	El *module-center* ahora quitaríamos ethernet_status y colocaríamos *vpn_status*, luego filtraríamos por el módulo recientemente creado, copiaríamos todo su contenido y modificaríamos la ruta absoluta para un nuevo script, el cual nos mostrará la información al conectarnos por VPN. 
	
	De esta manera, tendríamos de contenido:

	* *vpn bar*:
		```text
		[bar/vpn_bar]
		inherit = bar/main
		width = 11.5%
		height = 40
		offset-x = 15.6%
		offset-y = 15
		background = ${color.bg}
		foreground = ${color.white}
		bottom = false
		padding = 1
		;padding-top = 2
		module-margin-left = 0
		module-margin-right = 0
		;modules-left = date sep mpd
		modules-center = vpn_status 
		wm-restack = bspwm
		```

	* *vpn module*:
		```text
		[module/vpn_status]
		type = custom/script
		interval = 2
		exec = ~/.config/bspwm/scripts/vpn_status.sh
		```
	* *vpn script*:
		```text
		#!/bin/sh
		 
		IFACE=$(/usr/sbin/ifconfig | grep tun0 | awk '{print $1}' | tr -d ':')
		 
		if [ "$IFACE" = "tun0" ]; then
		    echo "%{F#1bbf3e}󰆧 %{F#ffffff}$(/usr/sbin/ifconfig tun0 | grep "inet " | awk '{print $2}')%{u-}"
		else
		    echo "%{F#1bbf3e} %{u-} Disconnected"
		fi
		```
4. Vamos a cambiar el color de fondo de nuestro botón para apagar o reiniciar la máquina. Para ello, nos iremos a nuestro *current.ini*, en este vamos a filtrar por *bar/primary* y en background, cambiaremos *white* por *bg*. De esta manera ya tendríamos todas las barras con el mismo color de fondo.
