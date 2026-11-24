---
curso: "personaliza-tu-linux"
modulo: "personaliza-tu-linux/escritorio"
leccion: "tema-de-rofi-y-bloqueo-de-pantalla"
titulo: "Tema de rofi y bloqueo de pantalla"
orden: 13
minutos: 2
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 0
ejercicios: []
---

1. Rofi de primeras se ve un poco feo, para ello agregaremos un tema nosotros.

	Para ello, en nuestro directorio *~/.config/* crearemos el directorio *rofi/* como usuario no privilegiado:

	```text
	mkdir ~/.config/rofi
	```

	Nos metemos en este directorio y ahora crearíamos un directorio *themes*:

	```text
	cd !$
	mkdir themes
	cd !$
	```

	Dejaríamos este panel en el directorio themes y abriríamos un nuevo panel con *ctrl + shift + enter*. En este nos dirigiríamos a la ruta /opt/ como usuario root y nos clonaríamos un repositorio:

	```text
	git clone https://github.com/newmanls/rofi-themes-collection.git
	```

	Aquí nos meteríamos al directorio que cree y dentro de este al directorio *themes/*:

	```text
	cd rofi-themes-collection/themes
	```

	Aquí adentro notaremos que tendremos muchos archivos *.rasi*, y lo que haremos es copiarlo al directorio previamente creado:

	```text
	cp ./* /home/user/.config/rofi/themes/
	```

	Realizamos un *Windows + shift + r* para recargar la configuración y ahora, si ejecutamos *rofi-theme-selector*, esto nos permitirá seleccionar entre algún tema para el rofi. 
	
	En este apartado, presionamos una vez la tecla hacia arriba y aquí estarán los temas que hemos metido. Podremos ir presionando enter en cada tema hasta encontrar el que nos guste más y, una vez lo tengamos seleccionado, solo tendremos que presionar *alt + a*.

	Ahora, al abrir rofi, ya tendrá una mejor estética.

## Bloqueando la pantalla con *i3lock*


1. Primeramente, tendremos que instalar *i3lock*, para ello lo haríamos con apt:

	```text
	sudo apt install i3lock
	```

	Ahora buscaríamos el repositorio de [*i3lock-fancy*](https://github.com/meskarune/i3lock-fancy), así que nos meteríamos al directorio /opt/ y como usuario root nos clonaríamos el repositorio:

	```text
	git clone https://github.com/meskarune/i3lock-fancy.git
	```

	Nos metemos al directorio que cree, en este caso *i3lock-fancy* y efectuamos el siguiente comando:

	```text
	make install
	```

	Con esto, para comprobar que haya sido instalado, utilizamos:

	```text
	which i3lock-fancy
	```

	Si esto nos regresa su ruta absoluta, quiere decir que todo ha salido bien y ya lo tenemos instalado. 
	
	Ahora podríamos ejecutar *i3lock-fancy*, para ello antes tendríamos que regresar al usuario no privilegiado, esto debido a que root como tal, no tiene contraseña y por ello no podríamos ingresar de nuevo si lo intentáramos.

	```text
	i3lock-fancy
	```

	De esta manera se bloquearía y, al colocar nuestra contraseña, iría todo bien. 
	
	Con esto en nuestro archivo *sxhkdrc*, al final del todo agregaríamos un nuevo atajo de teclado, para bloquear rápidamente nuestra máquina si así lo deseáramos:

	```text
	# i3lock-fancy
	super + shift + x
		/usr/bin/i3lock-fancy
	```

	Una vez guardado, actualizamos nuestra configuración de sxhkdrc con *Windows + esc* y ahora estaría funcionando correctamente.
