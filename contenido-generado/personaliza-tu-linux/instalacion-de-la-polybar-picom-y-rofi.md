---
curso: "personaliza-tu-linux"
modulo: "personaliza-tu-linux/escritorio"
leccion: "instalacion-de-la-polybar-picom-y-rofi"
titulo: "Instalación de la Polybar, Picom y Rofi"
orden: 3
minutos: 4.7
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 3
ejercicios: []
---

## ¿Que son la *Polybar*, *Picom* y *Rofi*?

Estos tres son paquetes esenciales para la personalización de un entorno en Bspwm, mejorando la interfaz y la usabilidad.

1. #### *Polybar*

	Es una barra de tareas altamente personalizable para sistemas de ventanas X.
	*Polybar* se destaca por su flexibilidad y capacidad de mostrar información variada, como la fecha, la utilización del CPU, la memoria, y mucho más. 
	
	Puedes configurar completamente su apariencia y los módulos que muestra, lo que la hace muy popular entre los usuarios que desean un escritorio minimalista y funcional.
	</br>
1. #### *Picom*

	Es un compositor para el sistema de ventanas X, lo que significa que maneja cómo se muestran las ventanas y los efectos visuales del escritorio, como sombras, transparencias y animaciones suaves.
	
	*Picom* ayuda a mejorar la estética general del escritorio y reduce el desgarro de la pantalla durante la reproducción de video y el movimiento de ventanas.
	</br>
1. #### *Rofi*

	Es un lanzador de aplicaciones ligero y personalizable, que también puede servir como conmutador de ventanas y más.
	
	*Rofi* permite a los usuarios buscar y lanzar aplicaciones rápidamente, cambiar entre ventanas  activas, o incluso ejecutar comandos personalizados. Su interfaz es altamente configurable, lo que permite a los usuarios adaptarla a sus necesidades específicas y estética del escritorio.


## Instalación de la *Polybar*, *Picom* y *Rofi*

1. Para la instalación de la *Polybar* se podría realizar mediante su repositorio, pero existe una forma más sencilla y es con el comando <mark>apt install</mark>:

	```text
	sudo apt install polybar
	```
	</br>

2. Para la instalación de *Picom* utilizaríamos su [repositorio](https://github.com/yshui/picom) el cual pertenece a [yshui](https://github.com/yshui).

	Empezando con su instalación, tendríamos que primeramente instalar los paquetes indicados. 
	
	Como parrot es una versión basada en Debian, entonces tendríamos que fijarnos qué paquetes se requieren para las versiones basadas en Debian. Que los instalaras de la siguiente manera:

	```text
	sudo apt install libconfig-dev libdbus-1-dev libegl-dev libev-dev libgl-dev libepoxy-dev libpcre2-dev libpixman-1-dev libx11-xcb-dev libxcb1-dev libxcb-composite0-dev libxcb-damage0-dev libxcb-glx0-dev libxcb-image0-dev libxcb-present-dev libxcb-randr0-dev libxcb-render0-dev libxcb-render-util0-dev libxcb-shape0-dev libxcb-util-dev libxcb-xfixes0-dev meson ninja-build uthash-dev	
	```

	Luego de instalar todos estos paquetes, de preferencia realizar un update de todos los paquetes en el sistema y además instalar CMake:

	```text
	sudo apt update
	sudo apt install cmake
	```

	Ahora, como <mark>usuario no privilegiado</mark>, nos dirigimos a la carpeta de descargas y nos clonamos este mismo repositorio:

	```text
	git clone https://github.com/yshui/picom.git
	```

	Una vez clonado, nos dirigimos al directorio del repositorio clonado y, gracias a un paquete recién instalado, aplicamos los siguientes comandos:

	```text
	meson setup --buildtype=release build
	ninja -C build
	ninja -C build install
	```

	El último comando solicitará la contraseña para el usuario root.
	Con esto, si verificamos con *which* veríamos la ruta donde fue instalado picom:

	```text
	which picom
	```
	</br>

3. Ahora instalaremos *Rofi* que será como nuestro buscador y lanzador de aplicaciones.

	```text
	sudo apt install rofi
	```

	Si estamos como usuario privilegiado (root), salimos de este. Ahora podremos ejecutar el rofi para ver cómo es de estética (más adelante se mejorará) y funcionalidad:

	```text
	rofi -show run
	```

	Tiene la siguiente estetica y desde aqui podremos lanzar *firefox*, por ejemplo:

	<img src="/apuntes/personaliza-tu-linux/img-0006.webp" alt="Captura de los apuntes" width="882" height="316" decoding="async">

	De esta manera, al darle al <mark>enter</mark>, la ejecutaríamos. Funciona de la misma manera para  cualquier aplicación. 
	
	Esta misma acción, lo ideal sería de una vez definirla en nuestro archivo de configuración de   los atajos de teclado, el cual se encuentra almacenado en *~/.config/sxhkd/*, nos dirigimos aquí y abrimos nuestro archivo, ya sea con nvim o nano. 
	
	Editamos el apartado <mark># program launcher</mark>:

	```text
	# program launcher
	super + @space
		dmenu_run
	```

	Donde colocaremos que la acción a ejecutar sea el rofi, además para mayor comodidad también cambiaremos el atajo de teclado, podríamos simplemente colocar el comando de ejecución, pero preferiblemente agregaremos su ruta absoluta:

	```text
	# program launcher
	super + d
		/usr/bin/rofi -show run
	```

	De esta manera, con Windows + d, estaríamos abriendo rofi una vez que cambiemos de  entorno. 
	
	Para esto vamos a reiniciar la máquina o irnos a la pantalla de bloqueo para cambiar el  entorno que nos da parrot por bspwm, con el comando:

	```text
	kill -9 -1
	```

	Ahora buscaremos un círculo con un símbolo especial. Esto podría cambiar dependiendo de la versión de parrot; en este caso lo observamos en la parte superior de la siguiente manera:

	<img src="/apuntes/personaliza-tu-linux/img-0007.webp" alt="Captura de los apuntes" width="295" height="89" loading="lazy" decoding="async">

	Presionamos el primer símbolo y cambiamos la selección actual (<mark>MATE</mark>) por el que será nuestro entorno de ventanas <mark>bspwm</mark>:

	<img src="/apuntes/personaliza-tu-linux/img-0008.webp" alt="Captura de los apuntes" width="240" height="109" loading="lazy" decoding="async">

	Con esto listo, volvemos a iniciar sesión, ahora solo nos quedaría un entorno totalmente  oscuro y vacío, debido a que aún no tenemos un nada totalmente configurado, ni la polybar lista. 
	
	Si utilizamos algunas de las distintas combinaciones de teclas que hemos configurado,   veremos cómo todo funciona perfectamente; ahora la que nos interesa para seguir trabajando en el entorno es *Windows + enter*, ya que esta nos abrirá la terminal *kitty*. 
	
	Con esto listo, ahora toca configurar las fuentes, la terminal kitty e instalar Feh, pero antes  sus conceptos.
