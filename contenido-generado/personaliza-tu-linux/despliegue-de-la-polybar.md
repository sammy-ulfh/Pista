---
curso: "personaliza-tu-linux"
modulo: "personaliza-tu-linux/escritorio"
leccion: "despliegue-de-la-polybar"
titulo: "Despliegue de la Polybar"
orden: 5
minutos: 2.8
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 1
ejercicios: []
---

## ¿Que es la *Polybar*?

1. #### *Polybar*

	La *polybar* es una herramienta muy utilizada en la personalización de entornos de escritorio en sistemas Linux, especialmente en aquellos que emplean gestores de ventanas livianos o "tiling windows manager" como *i3*, *bspwm* y otros. Es una barra de estado que se destaca por ser altamente configurable y modular.

	*Polybar* permite a los usuarios crear barras de estado que se adaptan precisamente a sus necesidades y estética del escritorio. Puedes configurar elementos como módulos de reloj, indicadores de batería, controles de volumen, monitores de sistema (como CPU, memoria, etc.), espacios de trabajo y muchos otros. Cada módulo en la barra puede ser personalizado en términos de funcionalidad y apariencia.

	La configuración de polybar se realiza a través de archivos de texto plano, lo que proporciona una gran flexibilidad. Los usuarios pueden escribir sus propios módulos utilzando scripts en diferentes lenguajes de programación o adaptar módulos existentes para personalizar su experiencia. Además polybar es capaz de lanzar y mostrar notificaciones o resultados de comandos específicos, lo que lo hace una herramienta extremadamente potente para aquellos que desean tener un control total sobre la información que se muestra en su entorno de escritorio.

## Despliegue de la Polybar

1. Para el despliegue de la polybar, nos iremos al directorio de descargas de nuestra máquina. 

   Aquí nos clonaremos el repositorio [bluesky](https://github.com/VaughnValle/blue-sky) de *VaughnValle* con el comando:

	```text
	git clone https://github.com/VaughnValle/blue-sky.git
	```

	Lo que nos interesara de este repositorio son las configuraciones ya previamente realizadas, ya que tomaremos parte de ellas al configurar nuestros módulos. 
	
	Por lo que nos vamos a la carpeta del repositorio *blue-skye/* y después a *polybar/*, ya en esta estaríamos viendo todos los archivos de configuración para la polybar:

	<img src="/apuntes/personaliza-tu-linux/img-0013.webp" alt="Captura de los apuntes" width="1128" height="101" decoding="async">

	Aquí además de archivos tendremos directorios, por lo que tendremos que copear todo de forma recursiva para que arrastre tanto directorios como archivos, hacia nuestro directorio *~/.config/polybar/:

	```text
	cp -r * ~/.config/polybar/
	```

	De esta forma ya tendríamos toda esta configuración para nuestra polybar. 
	
	Ahora para lanzar nuestra polybar está el archivo *launch.sh*, que cuando se ejecute nos lanzará la polybar y para que este sea un proceso automatizado y evitar tener que ejecutarlo cada que iniciemos nuestro entorno, pues tendremos que colocar lo siguiente en nuestro archivo *bspwmrc*:

	```text
	echo '~/.config/polybar/./launch.sh &' >> ~/.config/bspwm/bspwmrc
	```

	De esta manera agregaríamos la instrucción al final de nuestro archivo bspwmrc, en formato append. 
	
	Ahora como usuario root, de cara a las fuentes que tiene el directorio *fonts/*, nos metemos en este y vamos a copearlas a nuestro directorio */usr/share/fonts/truetype*

	```text
	cp ./* /usr/share/fonts/truetype/
	```

	Finalmente, vamos a sincronizar y actualizar la caché de fuente, con el siguiente comando:

	```text
	fc-cache -v
	```

	Con esto listo, ahora efectuaríamos la combinación de teclas *Windows + shift + r*, para recargar o actualizar nuestro bspwm y esto ahora nos cargaría la polybar. 
	
	Con esto listo, hasta ahora ya nos cargaría por defecto nuestro fondo, la polybar y las demás cosas que hemos agregado ciertas configuraciones, como la kitty. 
	
	Lo siguiente será utilizar picom para trabajar los sombreados, bordes y opacidad, lo cual dará una mejor estética.
