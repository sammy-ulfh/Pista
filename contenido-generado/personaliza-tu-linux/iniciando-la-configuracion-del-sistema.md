---
curso: "personaliza-tu-linux"
modulo: "personaliza-tu-linux/escritorio"
leccion: "iniciando-la-configuracion-del-sistema"
titulo: "Iniciando la configuración del sistema"
orden: 1
minutos: 1.3
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 1
ejercicios: []
---

1. Inicialmente, al tener instalado ya nuestro sistema operativo parrot. Como primer paso, realizaríamos un update. Aquí podríamos llegar a encontrarnos con un problema al realizar él:

	```text
		sudo apt update
	```

	el cual se muestra de la siguiente manera:
	 <img src="/apuntes/personaliza-tu-linux/img-0001.webp" alt="Captura de los apuntes" width="892" height="59" decoding="async">

2. Para solucionar este problema tendríamos que acceder a la ruta del archivo mostrado y comentar una de las líneas, ya que este error se da debido a que está dos veces la misma línea:

	```text
		sudo vim /etc/apt/sources.list.d/parrot.list
	```
	 
	 (actualmente, para la última versión de parrot este problema ha sido totalmente solucionado)
3. En parrot no podremos realizar un upgrade como en otras versiones de Linux, ya que esto podría romper el sistema; por lo tanto, en su lugar emplearemos un comando propio de parrot:

	```text
		 sudo parrot-upgrade
	```
	 
	 Esto actualizaría correctamente todas las listas de paquetes del sistema.
	 
4. En caso de que nos indique que podría ser necesario remover algún paquete con:

	```text
		 sudo apt autoremove
	```
	 
	 Lo más recomendable sería no realizarlo de esta manera, debido a que puede terminar borrando un montón de paquetes que es posible que quisiéramos mantener en el sistema.

	Una forma de ver qué cosas terminaría borrando sería ejecutando:
	 
	```text
		 sudo apt autoremove —-dry-run
	```

	Pero en todo caso, lo mejor sería utilizar como alternativa:
	 
	```text
		 sudo apt remove <binario a eliminar>
	```
