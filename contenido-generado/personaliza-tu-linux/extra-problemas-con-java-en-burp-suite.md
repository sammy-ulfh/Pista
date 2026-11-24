---
curso: "personaliza-tu-linux"
modulo: "personaliza-tu-linux/escritorio"
leccion: "extra-problemas-con-java-en-burp-suite"
titulo: "Extra: problemas con Java en Burp Suite"
orden: 16
minutos: 1.5
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 0
ejercicios: []
---

1. Si llegamos a tener problemas con burpsuite al intentar abrirlo, con la versión de java, podríamos intentar cambiando esta misma con las otras alternativas:

	```text
	update-alternatives --config java
	sudo update-alternatives --config java
	```

	Aquí cambiaremos entre las versiones que se nos muestres. 
	
	Si esto no funciona, tendremos que obtener una versión específica de java, la cual podremos traer con un comando y esto nos ayuda a solucionarlo un [*artículo*](https://medium.com/@fidjolakoka/burpsuite-no-longer-launches-after-parrot-upgrade-d1c6b17cb70d). 
	
	Primeramente, tendremos que irnos al directorio de descargas y convertirnos en usuario privilegiado, para después traernos lo siguiente:

	```text
	wget https://download.java.net/java/GA/jdk21.0.2/f2283984656d49d69e91c558476027ac/13/GPL/openjdk-21.0.2_linux-x64_bin.tar.gz
	```

	Luego vamos a extraer todo el contenido del archivo recién descargado:

	```text
	tar xvf openjdk-21.0.2_linux-x64_bin.tar.gz
	```

	Ahora lo vamos a mover a otro folder:

	```text
	sudo mv jdk-21.0.2/ /usr/lib/jvm/jdk-21
	```

	Ahora tendremos que abrir el archivo y editar la ruta */usr/lib/jvm/java-17-openjdk-$(dpkg-architecture -q DEB_HOST_ARCH)/bin/java* por */usr/lib/jvm/jdk-21/bin/java*, lo abriremos con:

	```text
	sudo nano /usr/bin/burpsuite
	```

	Con esto ya estaría funcional.
	
## ¿Problemas con el tamaño de la ventana *burpsuite*?

1. En el archivo *.zshrc* vamos a agregar el siguiente apartado:

	```text
	# Fix the java Problem
	export _JAVA_AWT_WM_NONREPARENTING=1
	```

2. Al final de nuestro archivo *bspwmrc* vamos a agregar:

	```text
	wmname LG3D &
	```

3. Por último, vamos a crear un archivo para no tener problemas al ejecutar burpsuite desde el rofi y se nos apliquen los cambios del tamaño, lo podremos crear en el directorio *usr/bin*:

	```text
	sudo su
	touch burpsuite-launcher
	chmod +x burpsuite-launcher
	```

	Con esto, finalmente, vamos a agregar lo siguiente en el archivo:

	```text
	#!/bin/bash

	export _JAVA_AWT_WM_NONREPARENTING=1
	wmname LG3D &

	/usr/bin/burpsuite # ruta absoluta de burpsuite
	```

	Ya por último vamos a utilizar el atajo de teclado *Windows + shift + q* para reiniciar el bspwm y guardé todos los cambios, ahora estará todo funcional.
