---
curso: "personaliza-tu-linux"
modulo: "personaliza-tu-linux/escritorio"
leccion: "instalacion-y-configuracion-de-bspwm-y-sxhkd"
titulo: "Instalación y configuración de Bspwm y Sxhkd"
orden: 2
minutos: 10.4
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 3
ejercicios: []
---

## ¿Que es *Bspwm* y *Sxhkd*?

1. #### *Bspwm (Binary Space Partitioning Window Manager)*

	*Bspwm* es un gestor de ventanas que utiliza la técnica de partición binaria del espacio para organizar las ventanas del escritorio. Es conocido por su simplicidad y eficiencia, ya que se configura y se controla exclusivamente a través de scripts y comandos en terminal.
	Bspwm no maneja teclados ni otros dispositivos de entrada por sí mismo, sino que delega esta tarea a otras herramientas, lo que permite una mayor personalización y flexibilidad.
	
	Cada ventana se organiza automáticamente de manera que ocupe un área divisoria del espacio disponible en el escritorio, optimizando el uso de espacio y facilitando la navegación entre diferentes aplicaciones y documentos abiertos.
	</br>
1. #### *Sxhkd (Simple X Hotkey Daemon)*

	*Sxhkd* es un demonio de teclas de acceso rápido para sistemas X Window. Funciona en conjunto con gestores de ventanas como <mark>Bspwm</mark> y permite a los usuarios asignar acciones a combinaciones de teclas y botones del mouse. Su configuración se realiza a través de un archivo de texto plano , donde el usuario define combinaciones de teclas y las acciones correspondientes que se deben de ejecutar. <mark>Sxhkd</mark> es altamente configurable y ligero, diseñado para ser rápido y eficiente en el manejo de eventos de entrada, lo que lo hace ideal para entornos donde los recursos del sistema son limitados o cuando se busca una experiencia de usuario altamente personalizable y controlada.

Ambos programas son muy populares en la comunidad de entusiastas de Linux que prefieren un entorno de escritorio altamente personalizable y orientado al uso del teclado.

## Instalación y configuración de *Bspwm* y *Sxhkd*

1. *bspwm* es importante, ya que será el entorno donde se va a estar trabajando, ya que este es un gestor de ventanas, lo que nos permite sobre este desplegar la polybar y configuraciones que harán que nuestro entorno sea más presentable.

	Por otro lado, pero igual de importante, tendremos el *sxhkd*, el cual nos permitirá configurar todos los atajos de teclado para navegar en nuestro entorno.


	Todo esto proviene de un repositorio en GitHub, de una persona, la que ha realizado este proyecto con estas utilidades.
	</br>


2.  Con esto en mente nos moveríamos a nuestro directorio de descargas:

	```text
		cd ~/Downloads
	```


	Antes de empezar a utilizar los recursos mencionados, se tendrán que instalar una serie de paquetes necesarios para todo el proceso. Estos son bastantes paquetes y se instalan con el siguiente comando, estando como usuario root:
	
	```text
		sudo su
		apt install build-essential git vim xcb libxcb-util0-dev libxcb-ewmh-dev libxcb-randr0-dev libxcb-icccm4-dev libxcb-keysyms1-dev libxcb-xinerama0-dev libasound2-dev libxcb-xtest0-dev libxcb-shape0-dev
	```

	Al momento de preguntar si queremos instalarlo todo, le damos a la tecla ”Y”.
	</br>


3.  Para la instalación de *bspwm*, regresamos a nuestro usuario no privilegiado, tan solo con el comando:


	```text
		exit 
	```

	o 

	```text
		su <nombre de usuario>
	```

	Instalamos de forma sencilla y rapida, para evitar problemas de que el sistema no detecte bspwm:

	```text
		apt install bspwm
	```

	Y ademas de otra forma, clonamos el repositorio original, el cual pertenece a [Baskerville](https://github.com/baskerville?tab=overview&from=2024-10-01&to=2024-10-27):

	```text
		git clone https://github.com/baskerville/bspwm.git
	```

	De una vez, nos traeremos el *sxhkd* también:

	```text
		git clone https://github.com/baskerville/sxhkd.git
	```


	Con estos repositorios clonados, tendríamos las carpetas:

	*bspwm/* y *Sxhkd/*

	Para instalarlo, nos iríamos a la carpeta *bspwm/*, y ejecutaríamos los comandos:

	```text
		cd bspwm/
		make
		sudo make install
	```

	Con esto listo, podríamos verificar si se instaló con el comando:

	```text
		which bspwm
	```

	Si todo ha salido bien, nos regresará la ruta absoluta de este programa, lo que querrá decir que se ha instalado sin problemas.

	Ahora, encontrándonos nuevamente en el directorio *Downloads/* entramos en *sxhkd/*, la instalación va a ser de la misma manera que con bspwm:

	```text
		make
		sudo make install
	```

	Y para verificar que esté instalado correctamente:

	```text
		which sxhkd
	```
	</br>

4.  Con esto instalado, ahora nos tocaría ver los archivos de configuración, recordando que:

	Para *bspwm*, su archivo de configuración es:
	* <mark>bspwmrc</mark> 

	Para *sxhkd*, su archivo de configuración es:
	* <mark>sxhkdrc</mark>

	Pero hasta este momento no es del todo así, ya que estos archivos de configuración aún no se encuentran creados o más bien en su lugar correcto para ser tomados en cuenta por el sistema, por lo que tendríamos que crear dos directorios dentro de nuestro directorio *.config/*:

	```text
		mkdir ~/.config/{bspwm,sxhkd}
	```

	Esto crearía los dos directorios dentro de este directorio, el cual es un directorio oculto del sistema.

	Con ello, como aún permanecemos en el directorio *Downloads/*, entramos nuevamente al directorio *bspwm/* y dentro de este en un directorio *examples/* nos dan ambos archivos con una configuración base:

	```text
		cd Downloads/bspwm/examples
		ls -l
	```
		
	<img src="/apuntes/personaliza-tu-linux/img-0003.webp" alt="Captura de los apuntes" width="634" height="227" decoding="async">

	Estos archivos ya contienen una configuración base, pero durante la configuración del entorno le iremos agregando más cositas.

	Por ello realizaríamos una copia de estos archivos de configuración, cada uno a su correspondiente directorio que hemos creado dentro del directorio *.config/*:

	```text
		cp bspwmrc ~/.config/bspwm/
		cp sxhkdrc ~/.config/sxhkd/
	```

	Con ello comprobamos que se hayan copeado correctamente:
	
	```text
		ls ~/.config/bspwm/
		ls ~/.config/sxhkd/
	```
    <img src="/apuntes/personaliza-tu-linux/img-0004.webp" alt="Captura de los apuntes" width="497" height="156" loading="lazy" decoding="async">

5. Configurando un poco nuestro *sxhkdrc*:

	En este nos enfocaremos primeramente en el apartado <mark># terminal emulador</mark>; este será nuestro atajo por defecto para abrir nuestra terminal y lo que está en la siguiente línea es el comando a ejecutar, en este caso ahí tendríamos que colocar la *kitty*, que es una terminal más completa que estaremos empleando y configurando más adelante.

	Contenido actual en el apartado <mark># terminal emulador</mark>:
	
	```text
		# terminal emulador
		super + return
			urxvt
	```

	De primeras, esto no funcionaría, ya que si escribimos *urxvt* en terminal, esta terminal no existe y, por ende no se ejecuta nada.

	La terminal que emplea parrot es una *gnome-terminal* y no una <mark>urxvt</mark>.
	
	Contenido al que se cambiará:
	
	```text
		# terminal emulador
		super + return
			Kitty
	```

	Esto es debido a que al presionar la combinación de teclas “windows + enter” nos ejecutaría la terminal kitty.
	</br>


6. Ok. Pero, ¿dónde está mi terminal kitty?

	Esta terminal no existe por defecto, por lo que tendremos que instalarla mediante el siguiente comando:

	```text
		sudo apt install kitty
	```

	Esta versión no será la más reciente que emplearemos, pero momentáneamente la dejaremos para más adelante agregar la más reciente. En la fecha actual 26-10-24 se encuentra en la versión <mark>0.36.4</mark>.

	Se puede verificar la versión de la *kitty* descargada, con el comando:

	```text
		Kitty —-version
	```

	La versión más actual podrá verificarse en el repositorio oficial de GitHub.

	Ahora podríamos ver su ruta absoluta con:

	```text
		which kitty
	```

	Esto nos dará la ruta absoluta de la *kitty*, si se nos hace mejor, podríamos cambiar *kitty* que será el comando que la ejecute. Por su ruta absoluta, al final de cuentas sería prácticamente lo mismo.

	Una terminal *kitty*, se ve de la siguiente manera:

	<img src="/apuntes/personaliza-tu-linux/img-0005.webp" alt="Captura de los apuntes" width="643" height="290" loading="lazy" decoding="async">


	Ahora mismo se ve algo fea, pero se verá mejor.
	</br>

7. Viendo y configurando algunos atajos de teclado

	En nuestro mismo archivo *sxhkdrc*, podremos observar los atajos de teclado seguidos del apartado <mark># quit/restart bspwm</mark>, empezaremos por aquí.

	*bspwm* nos sirve para cargar nuestro entorno, ya que su configuración se carga apenas arranca el sistema, en este podremos definir por ejemplo, que se cargue el fondo de pantalla, que se habilite la clipboard bidireccional para que nos permita copear de afuera de la máquina virtual hacia la máquina virtual y viceversa, entre otras cosas.

	Si estos cambios los hiciéramos mientras utilizamos el sistema, el apartado <mark># quit/restart</mark> *bspwm* nos ayudaría a aplicar los cambios sin necesidad de tener que reiniciar el sistema.

	Para esta acción tenemos predeterminado:

	```text
		# quit/restart bspwm
		super + alt + {q,r}
			bspc {quit,wm -r}
	```

	Al presionar la combinación de teclas con “q”, cerraríamos o saldríamos del entorno hacia el login; al hacerlo con “r”, reiniciaríamos, lo que quiere decir que tomaría en cuenta la configuración más actual del entorno, lo que sería como recargarlo.

	Una forma mas cómoda para esto seria con shift:

	```text
		# quit/restart bspwm
		super + shift + {q,r}
			bspc {quit,wm -r}
	```

	De esta misma forma podríamos modificar el apartado <mark># close and kill</mark> para hacerlo un poco más cómodo con el atajo de teclado, el cual está de la siguiente manera:

	```text
		# close and kill
		super + {_,shift + }w
			bspc node -{c,k}
	```

	Y sería mayormente cómodo si dejamos que para este sea la "q", en lugar de "w":

	```text
		# close and kill
		super + {_,shift + }q
			bspc node -{c,k}
	```


	Esta opción lo que nos permite es cerrar cualquier ventana que tengamos abierta en nuestro entorno. Un ejemplo, sería encontrándonos en uso de nuestra terminal y que necesitemos cerrarla, pues esta combinación de teclas sería la indicada.

	El apartado <mark># focus the node in the given direction</mark> nos permite desplazarnos entre ventanas de aplicaciones. Sí tenemos el navegador y una terminal abierta, podríamos movernos de izquierda a derecha y viceversa entre ambas cosas.
	
	Esto como configuración base está de la siguiente manera:

	```text
		# focus the node in the given direction
		super + {_,shift + }{h,j,k,l}
		bscp node -{f,s} {west,south,north,east}
	```

	Una forma más cómoda sería poder movernos entre las ventanas con las flechas del teclado, lo cual quedaría de la siguiente manera, definiendo la tecla con la orientación correspondiente:
	
	```text
		# focus the node in the given direction
		super + {_,shift + } {Left,Down,Up,Right}
		bspc node -{f,s} {west,south,north,east}
	```

	Con esto directamente vamos al apartado de los preselectores <mark># preselect</mark>, estos lo que nos permiten es previsualizar el tamaño que tomará la aplicación una vez sea abierta, lo cual será representado mediante un rectángulo de color amarillo.

	Esto es interesante por si queremos darle un tamaño más pequeño del esperado a la aplicación o en alguna parte específica de las disponibles en el escritorio.

	La forma base sería:

	```text
		# preselect the direction
		super + ctrl + {h,j,k,l}
			bspc node -p {west,south,north,east}
	```

	Está bien de esta manera, pero una forma más cómoda sería utilizar las flechas y agregar el "alt" a la combinación ya establecida:

	```text
		# preselect the direction
		super + ctrl + {Left,Down,Up.Right}
			bspc node -p {est,south,north,east}
	```


	Después de esto, podríamos definir un tamaño específico con el apartado <mark># preselect the ratio</mark>, quedando con las teclas:

	```text
		# preselect the ratio
		super + ctrl + {1-9}
		bspc node -o 0.{1-9}
	```


	Ahora bien, si quisiéramos cancelar la preselección y simplemente no seleccionar nada, la opción correcta sería:

	```text
		# cancel the preselection for the focused node
		super + ctrl + space
			bspc node -p cancel
	```

	Nuevamente, una mejor forma para esto, es configurándolo como el atajo de teclado:

	```text
		# calcel the preselection for the focused node
		super + ctrl + alt + space
			bspc node -p cancel
	```


	Para el apartado <mark># move/resize</mark>, eliminamos los primeros dos atajos de teclado, esto es debido a que más adelante configuraríamos un archivo específico para el redimensionamiento.

	En el apartado que nos queda <mark># move a floating window</mark>, nos sirve para darnos la posibilidad de mover una pestaña abierta:

	```text
		# move a floating window
		super + {Left,Down,Up,Right}
			bspc node -v {-20 0,0 20,0 -20,20 0}
	```

	Para una mayor comodidad seria agregar shift:

	```text
		# move a floating window
		super + shift + {Left,Down,Up,Right}
			bspc node -v {-20 0,0 20,0 -20,20 0}
	```

	Con esto ya definiríamos un apartado de <mark># Custom resize</mark>, esto nos permite ajustar el tamaño de una pestaña hacia cualquier lado.
	
	```text
		# Custom rezise
		 super + alt + {Left,Down,Up,Right}
		  /home/<user_name>/.config/bspwm/scripts/bspwm_resize {west,south,north,east}
	```
	
	Esto al final será ejecutar un script propio, el que nos permitirá realizar esto mismo. Aún no existe la ruta del directorio scripts dentro de <mark>bspwm/</mark>, por ello la creamos y creamos nuestro script *bspwm_resize*, el cual tendrá como contenido lo siguiente:

	```text
	#!/usr/bin/env dash

	if bspc query -N -n focused.floating > /dev/null; then
		step=20
	else
		step=100
	fi

	case "$1" in
		west) dir=right; falldir=left; x="-$step"; y=0;;
		east) dir=right; falldir=left; x="$step"; y=0;;
		north) dir=top; falldir=bottom; x=0; y="-$step";;
		south) dir=top; falldir=bottom; x=0; y="$step";;
	esac

	bspc node -z "$dir" "$x" "$y" || bspc node -z "$falldir" "$x" "$y"
	```
