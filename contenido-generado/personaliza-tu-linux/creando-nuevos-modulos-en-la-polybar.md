---
curso: "personaliza-tu-linux"
modulo: "personaliza-tu-linux/escritorio"
leccion: "creando-nuevos-modulos-en-la-polybar"
titulo: "Creando nuevos módulos en la polybar"
orden: 10
minutos: 3.3
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 0
ejercicios: []
---

1. Vamos a definir una barra, la cual nos mostrará cualquier IP que almacenemos en un archivo, gracias a unas funciones que estaremos definiendo. 

   Para esto, podríamos editar la barra de volumen ya definida, que es la primera en el apartado *right bar*. Le cambiaremos el nombre a *target_to_hack*

	Después, en nuestro archivo *current.ini*, vamos a definir nuestra tarjeta. Para esto podríamos copiarnos la secondary y pegarlo arriba de esa. Cambiaremos el nombre a *target_to_hack*, le daremos un width de 15% y su posición en x, será de *81.7%*. Estos podrán variar a cómo mejor se nos vaya a acomodar. 
	
	En cuanto al módulo que crearemos, le daremos como module-center *victim_to_hack*. Posteriormente, crearíamos este módulo, filtrando por vpn_status, seguido de los que hemos creado anteriormente, copiándonos de estos mismos, ya que tendrá la misma estructura.

	Aquí el script que le daremos será el *target_to_hack.sh*, y este script lo crearemos en el directorio *~/.config/bspwm/scripts*. Posteriormente, le damos permisos de ejecución, como a los anteriores. 
	
	De esta manera, hasta aquí, lo definido tendrá como contenido lo siguiente:

	* *bar/target_to_hack*:

		```text
		[bar/target_to_hack]
		inherit = bar/main
		width = 15%
		height = 40
		offset-x = 81.7%
		offset-y = 15
		background = ${color.bg}
		foreground = ${color.white}
		bottom = false
		padding = 1
		;padding-top = 2
		module-margin-left = 0
		module-margin-right = 0
		;modules-left = date sep mpd
		modules-center = victim_to_hack 
		wm-restack = bspwm
		```

	* *module/victim_to_hack*:
		```text
		[module/victim_to_hack]
		type = custom/script
		interval = 2
		exec = ~/.config/bspwm/scripts/target_to_hack.sh
		```

	* *target_to_hack.sh*:
		```text
		#!/bin/bash
	 
		ip_address=$(/bin/cat /home/user/.config/bin/target | awk '{print $1}')
		machine_name=$(/bin/cat /home/user/.config/bin/target | awk '{print $2}')
		 
		if [ "$ip_address" ] && [ "$machine_name" ]; then
		    echo "%{F#e51d0b}󰯐 %{F#ffffff}$ip_address%{u-} - $machine_name"
		else
		    echo "%{F#e51d0b} %{u-}%{F#ffffff} No target"
		fi
		```

	Recordemos cambiar el usuario por el de ustedes. 
	
	Ahora, el script lista contenido de un archivo, el cual tiene como ruta absoluta *~/.config/bin/target*. En el directorio *.config*, no tenemos directorio *bin/* y, por ende tampoco el archivo *target*. Por ello los crearemos.

	Ya con esto no nos daría ningún error. 
	
	Ahora en nuestro archivo *.zshrc*, creamos un apartado *# custom functions*, aquí definiremos las funciones que nos ayudarán a agregar el contenido y eliminarlo del archivo *target*:

	```text
	# Custom funstions

	# Set Target to hack
	function settarget(){
	    ip_address=$1
	    machine_name=$2
	    echo "$ip_address $machine_name" > /home/user/.config/bin/target
	}

	# Clear Target to hack
	function cleartarget(){
	    echo '' > /home/user/.config/bin/target
	}
	```

	Recordando colocar a su usuario en la ruta absoluta. 
	
	Con esto, si reiniciamos la zsh y ejecutamos *settarget tentacle 10.10.10.224*, funcionaría perfectamente, al igual que *cleartarget*.

3. Por último, en la polybar cambiaremos los colores de los espacios de trabajo, para en todo momento visualizar correctamente en dónde estamos trabajando y cuáles otros espacios se encuentran ocupados.

	Abriremos el archivo *workspace.ini* y filtraremos por *occupied*. Ahora cambiaremos el *active-foreground*, de su color blue, a un *red*. Esto nos ayudará a distinguir con mayor facilidad cuál es nuestra ventana actual de trabajo. 
	
	Y además, en el apartado *occupied-foreground*, cambiaremos el white a un yellow, para visualizar con facilidad qué espacios están ocupados.

4. Finalmente, instalaremos la *fzf*, este es una herramienta que nos puede servir como buscador para encontrar archivos rápidamente o listar el historial de comandos y movernos con una interfaz bastante moderna.

	Para ello, nos buscaremos [*fzf github*](https://github.com/junegunn/fzf) y nos dirigiremos a su repositorio. Aquí nos indican dos comandos a efectuar, que los haremos desde el directorio principal de cada usuario. Será por separado tanto para root como para usuario no privilegiado.
	
	```text
	git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
	~/.fzf/install
	```

	Esto hace que al querer ejecutar un comando, si presionamos *ctrl + r*, nos hará una búsqueda dentro del historial de comandos, de comandos similares que hemos ejecutado anteriormente. 
	
	O si quisiéramos utilizar *cat* para algún posible archivo, bastaría con presionar *ctrl + t* y con palabras que lleguen a tener esa ruta absoluta, nos mostraría rutas similares.
