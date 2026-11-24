---
curso: "personaliza-tu-linux"
modulo: "personaliza-tu-linux/escritorio"
leccion: "ultimo-detalle-con-nvim"
titulo: "Último detalle con nvim"
orden: 12
minutos: 1.9
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 0
ejercicios: []
---

1. Esto será totalmente al gusto de cada uno, pero nvim cuenta con una ventana emergente la cual te ofrece sugerencias al ir escribiendo el código. Esto podría ser más molesto en ciertas ocasiones.

	Por ende, para eliminar esto y no moleste, al igual que podría serlo el *zsh-autocomplete*, tendríamos que abrir el siguiente archivo:
	
	```text
	nvim ~/.local/share/nvim/lazy/NvChad/lua/nvchad/plugins/init.lua
	```
	
	Aquí filtraríamos presionando */* y escribiendo *cmp*; de este modo, nos llevaría al inicio de este apartado y borraríamos desde donde se abre la llave hasta donde se cierra. 
	
	Esto lo realizaríamos presionando colocándonos al inicio de este apartado, luego presionamos *esc* y después *v* para entrar en modo visual, hacemos la selección desde donde se abre el primer corchete hasta donde se cierra ese mismo, que lo notaremos porque estará en la misma posición, pero líneas más abajo y una vez seleccionadas las líneas presionamos *d*, esto las eliminaría.
	
	Finalmente, guardamos con *:wq* y nos cerraría también el nvim. Con esto listo, si volviéramos a abrir el nvim, ya no tendríamos este mismo problema.
	</br>

2. Ahora, todo lo que hemos hecho para nvim, solo estará para el usuario no privilegiado, para que root también tenga todo de la misma manera. Primeramente, nos convertiríamos en root y nos iríamos a su directorio personal.

	Con esto nos tendríamos que crear el directorio nvim en .config, sé la siguiente manera:

	```text
	mkdir ~/.config/nvim
	cd !$
	```

	Y ahora nos traemos todo el contenido, del mismo directorio, pero del usuario no privilegiado, hacia este:
	
	```text
	cp -r /home/user/.config/nvim/* .
	```

	Con esto listo, cerramos la terminal y abrimos una nueva. Ahora vamos a ejecutar nvim y esperamos a que se realice toda la configuración. 
	
	Para arreglar el mismo problema de algunos lenguajes no instalados, entraremos como root al directorio */root/.config/nvim/* y abriremos el archivo *init.lua*, ahora presionando *:* escribiremos *MasonInstallAll*, dejamos que se instale todo y ahora si cerramos y abrimos nuevamente ya no tendríamos este problema.

	Ahora, como usuario root eliminamos también el tipo de ayuda que nos proporciona al ir escribiendo nuestro código, lo cual está en la ruta:

	```text
	nvim ~/.local/share/nvim/lazy/NvChad/lua/nvchad/plugins/init.lua
	```

	Recordemos hacerlo como root, repitiendo lo que hicimos para el usuario no privilegiado.
