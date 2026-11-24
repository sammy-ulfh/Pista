---
curso: "personaliza-tu-linux"
modulo: "personaliza-tu-linux/escritorio"
leccion: "configurando-la-zsh-e-instalando-la-powerlevel10k"
titulo: "Configurando la ZSH e instalando la Powerlevel10k"
orden: 7
minutos: 17.3
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 22
ejercicios: []
---

## ¿Que es la *zsh (Z shell)* y *Powerlevel10k*?

1. #### *zsh (Z shell)*

	ZSH, o Z Shell, es un interprete de comandos para sistemas Unix que se utiliza como una alternativa al tradicional shell bash. Ofrece muchas mejoras en términos de características, plugins y temas, lo que lo hace muy populas entre los usuarios avanzados y desarrolladores.

	Algunas de las características más notables de la ZSH incluyen:

	* *Autocompletado*: ZSH proporciona un sistema de autocompletado potente y versátil que puede predecir comandos basados en el contexto, incluyedo opciones y parámetros.
	* *Corrección de errores*: Ofrece sugerencias de corrección cuando se escribe un comando erróneamente.
	* *Gestión de scripts*: ZSH es compatible con todos los scripts de Bourne shell y Bash, y añade sus propias mejores en la programación de scripts.
	* *Personalización*: Se puede personalizar profundamente mediante temas y configuraciones que pueden cambiar su apariencia y comportamiento.

2. #### *Powerlevel10k*

	*Powerlevel10k* es un tema para ZSH diseñado para ser visualmente atractivo y altamente informativo.
	Esta diseñado para ser una versión más rápida y personalizada del popular tema *Powerlevel9k*.

	Algunas de las características que lo hacen destacar incluyen:

	* *Velocidad*: Es significativamente más rápido que otros temas para zsh, lo que reduce el tiempo de inicio del terminal y la latencia al escribir comandos.
	* *Personalizable*: Viene con un asistente de configuración que guía a los usuarios a través del proceso de configuración, permitiendo persinalizar el prompt dependiendo de las preferencias del usuario.
	* *Información contextual*: Muestra información útil en el prompt según el contexto, como el estado del repositorio git, el usuario actual, el tiempo de ejecución de comandos, y mucho más.
	* *Iconos y fuentes*: Utiliza fuentes de Nerd Fonts para mostrar iconos y otros elementos gráficos que hacen que la información sea fácil de leer y visualmente atractiva.

Juntos, *ZSH* y *Powerlevel10k*, ofrecen una experiencia de terminal rica y eficiente, mejorando tanto la funcionalidad como la apariencia del entorno de línea de comandos. Estas herramientas son particularmente populares entre los desarrolladores y los entusiastas de la personalización de los entornos de los sitemas Unix/Linux.

## Configurando la ZSH e instalando la Powerlevel10k

1. Ahora, antes de empezar a configurar, será necesario instalar los siguientes paquetes:

	```text
	sudo apt install zsh-autocomplete zsh-autosuggestions zsh-syntax-highlighting
	```

	Estos son tres plug-ins que vamos a utilizar junto con otro llamado *zsh sudo*, al final la instalación de estos plug-ins lo que hará sea almacenarnos estos recursos en sus respectivas carpetas dentro del directorio /usr/share/, dentro de cada uno habrá un archivo *.zsh* que será el que tendremos que cargar como source para que aplique el plug-in y pueda ser utilizado. 
	
	Podremos visualizarlos si listamos el contenido de este directorio y filtramos por *zsh*:

	```text
	ls -l /usr/share | grep "zsh"
	```


	Dentro de cada uno de estos directorios, de los plug-ins que hemos instalado, habrá un archivo *.zsh*, el cual es un script que cargaremos como source para que nos aplique cada plug-in y así podamos utilizarlo. 
	
	Antes de continuar con el tema *Powerlevel10k*, primero les agregaremos a los usuarios la Shell zsh, ya que actualmente operan con una bash. Esto lo notaremos si en terminal migramos de usuario constantemente:
	
	```text
	sudo su
	usermod --shell /usr/bin/zsh root
	usermod --shell /usr/bin/zsh user
	exit
	```

	Recordemos cambiar *user* por su usuario no privilegiado.

	Solo restaría cerrar y abrir nuevamente la terminal.

	Ahora iremos al repositorio del [*Powerlevel10k*](https://github.com/romkatv/powerlevel10k) y en nuestro directorio de usuario al cual podremos ir con  el comando *cd* vamos a efectuar los comandos del apartado *Manual*:

	```text
	git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k
	echo 'source /home/user/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc
	```

	Recordando igual cambiar *user* por su usuario no privilegiado. Esto es debido a que más adelante se le dará un enlace simbólico al usuario root desde aquí, por lo que si lo dejáramos representado con *~*, intentaría cargarlo desde su configuración de usuario y esta no existirá, lo cual nos daría error. Por eso es mejor manejarlo como ruta absoluta. 
	
	Ahora comenzaríamos con la configuración de nuestra zsh, para ello ejecutaríamos el comando *zsh*:

	```text
	zsh
	```

	Esto será un menú por el que iremos avanzando, seleccionando la configuración que deseemos y además podremos visualizar los iconos gracias a que ya tenemos las *Hack Nerd Fonts*, las configuraciones que yo considero mejores con las siguientes:

	1.  Primero responderemos a 3 preguntas, usualmente es sí, a las 3, pero estas podrían llegar a cambiar y tendrás que responderlas a cómo visualices los iconos, a cómo te preguntan.

	2.  En el primero seleccionaremos el prompt clásico: *2*

		<img src="/apuntes/personaliza-tu-linux/img-0014.webp" alt="Captura de los apuntes" width="917" height="113" decoding="async">

	3. En el segundo seleccionaremos unicode:  *1*

		<img src="/apuntes/personaliza-tu-linux/img-0015.webp" alt="Captura de los apuntes" width="901" height="125" loading="lazy" decoding="async">

	4.  En el tercero seleccionaremos dark:  *3*

		<img src="/apuntes/personaliza-tu-linux/img-0016.webp" alt="Captura de los apuntes" width="894" height="106" loading="lazy" decoding="async">

	5. En el cuarto seleccionaremos no: *n*

		<img src="/apuntes/personaliza-tu-linux/img-0017.webp" alt="Captura de los apuntes" width="888" height="118" loading="lazy" decoding="async">

	6.  En el separador seleccionaremos round:  *4*

		<img src="/apuntes/personaliza-tu-linux/img-0018.webp" alt="Captura de los apuntes" width="884" height="121" loading="lazy" decoding="async">

	7. En el sexto seleccionaremos sharp:  *3*

		<img src="/apuntes/personaliza-tu-linux/img-0019.webp" alt="Captura de los apuntes" width="896" height="120" loading="lazy" decoding="async">

	8. En el séptimo seleccionaremos blurred: *2*

		<img src="/apuntes/personaliza-tu-linux/img-0020.webp" alt="Captura de los apuntes" width="902" height="114" loading="lazy" decoding="async">

	9. En el octavo seleccionaremos one line:  *1*

		<img src="/apuntes/personaliza-tu-linux/img-0021.webp" alt="Captura de los apuntes" width="896" height="98" loading="lazy" decoding="async">

	10. En el noveno seleccionaremos sparce:  *2*

		<img src="/apuntes/personaliza-tu-linux/img-0022.webp" alt="Captura de los apuntes" width="895" height="131" loading="lazy" decoding="async">

	11. En el que décimo seleccionaremos many icons: *2*

		<img src="/apuntes/personaliza-tu-linux/img-0023.webp" alt="Captura de los apuntes" width="897" height="98" loading="lazy" decoding="async">

	12. En el undécimo seleccionaremos fluent: *2*

		<img src="/apuntes/personaliza-tu-linux/img-0024.webp" alt="Captura de los apuntes" width="893" height="95" loading="lazy" decoding="async">

	13. En el duodécimo seleccionaremos yes: *y*

		<img src="/apuntes/personaliza-tu-linux/img-0025.webp" alt="Captura de los apuntes" width="556" height="155" loading="lazy" decoding="async">

	14. En el decimotercero seleccionaremos verbose:  *1*

		<img src="/apuntes/personaliza-tu-linux/img-0027.webp" alt="Captura de los apuntes" width="312" height="58" loading="lazy" decoding="async">

	15. En el decimocuarto seleccionaremos yes:  *y*

		<img src="/apuntes/personaliza-tu-linux/img-0028.webp" alt="Captura de los apuntes" width="266" height="60" loading="lazy" decoding="async">

	Ahora solo tendríamos que esperar un momento y ya estaría toda la configuración de nuestro tema *Powerlevel10k* listo. 
	
	Con esto realizaremos algunas configuraciones para la barra que ahora nos muestra la zsh. Para esto accederemos al archivo *.p10k.zsh* el cual está en el directorio personal del usuario no privilegiado. 
	
	Una vez en el archivo, buscaremos el apartado que nos indicará todo lo que se mostrará del lado derecho en nuestra terminal, lo cual comentaremos con *#* al inicio. 
	
	Esto nos ayudará a no tener tantos plug-ins de ese lado y evitaría que llegase a ralentizarnos la terminal. Empezamos a comentar a partir de *status*:

	<img src="/apuntes/personaliza-tu-linux/img-0029.webp" alt="Captura de los apuntes" width="856" height="547" loading="lazy" decoding="async">

	Vamos a comentar, desde ahí, hasta el final de esta sección, quedando desde el inicio al final de la sección de la siguiente manera:

	<img src="/apuntes/personaliza-tu-linux/img-0030.webp" alt="Captura de los apuntes" width="1018" height="307" loading="lazy" decoding="async">

	En cuanto a elementos de la izquierda, tendríamos lo siguiente:

	<img src="/apuntes/personaliza-tu-linux/img-0031.webp" alt="Captura de los apuntes" width="944" height="155" loading="lazy" decoding="async">

	Aquí agregaremos los siguientes apartados:

	```text
	context
	command_execution_time
	status
	```

	Quedando de la siguiente manera:

	<img src="/apuntes/personaliza-tu-linux/img-0032.webp" alt="Captura de los apuntes" width="482" height="139" loading="lazy" decoding="async">

	Guardamos y cerramos. Ahora ya tendremos de una mejor manera representada nuestra barra en la terminal. 
	
	Con esto listo, ahora vamos a configurar el *powerlevel10k* para el usuario root, por lo que nos convertimos a root y con *cd* nos vamos a su directorio personal, para después traernos el *powerlevel10k*:

	```text
	git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k
	echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc
	```

	Luego de esto, ejecutamos *zsh* y configuramos todo como lo hicimos para el usuario no privilegiado. 
	
	Ahora haremos lo mismo de comentar todo lo de la derecha para el usuario root en su archivo *.p10k.zsh* el cual estará en el directorio personal de root. 
	
	Con esto agregaríamos lo mismo en el lado izquierdo:

	```text
	context
	command_execution_time
	status
	```

	Finalmente, lo que nos indica cuando nos hemos conectado como root es bastante largo y lo cambiaremos por algo identificativo como un icono. En lugar de ese texto, esto se encontrará en el apartado *ROOT TEMPLATE*, lo cual lo encontraremos rápidamente filtrando. 
	
	La idea será cambiar el contenido de la siguiente manera:

	<img src="/apuntes/personaliza-tu-linux/img-0033.webp" alt="Captura de los apuntes" width="701" height="95" loading="lazy" decoding="async">

	Aquí eliminaremos el contenido de las comillas, dejando solo *''*, después del igual. 
	
	Cambiar el contenido de las comillas:

	<img src="/apuntes/personaliza-tu-linux/img-0034.webp" alt="Captura de los apuntes" width="693" height="51" loading="lazy" decoding="async">

	Eliminando el contenido y agregando el icono de nuestra preferencia de los iconos disponibles en la página de [*Hack Nerd Fonts*](https://www.nerdfonts.com/cheat-sheet) para saber que estamos como root, en este caso utilizaremos: 󱗗

	<img src="/apuntes/personaliza-tu-linux/img-0035.webp" alt="Captura de los apuntes" width="285" height="107" loading="lazy" decoding="async">

	Si quisiéramos que los directorios no los representen en negritas, bastaría con filtrar en el archivo *.p10k.zsh* por *DIR_ANCHOR* y colocarlo en false, para ambos usuario y estaría listo.

2. Para la zsh, utilizaremos un archivo de configuración para ambos usuario, por lo que tendremos que crear un enlace simbólico para que el archivo *.zshrc* del usuario root apunte al del usuario no privilegiado. En el directorio *root/*, ejecutaremos el siguiente comando para ello:

	```text
	ln -s -f /home/user/.zshrc .zshrc
	```

	Sabremos si se hizo correctamente, ya que al listar el archivo se vería de la siguiente manera:

	<img src="/apuntes/personaliza-tu-linux/img-0036.webp" alt="Captura de los apuntes" width="745" height="45" loading="lazy" decoding="async">

	Por ende ahora este tendría el mismo contenido que el del usuario no privilegiado. 
	
	Ahora vamos a ejecutar un comando, para agregar el plug-in *zsh-autocomplete*, si esto nos diera error o se quedase esperando una respuesta, cerramos con *ctrl + c* y ejecutaremos *compaudit* y a la ruta que nos dé, le vamos a cambiar tanto propietario como grupo al usuario root (el segundo comando). 
	
	Y finalmente ejecutaremos nuevamente el primer comando:

	```text
	source /usr/share/zsh-autocomplete/zsh-autocomplete.plugin.zsh
	chown root:root /usr/local/share/zsh/site-functions/_bspc

	exit
	```

	Ahora realizaremos lo mismo para el autosuggestions, el cual será un tipo de autocolplete que nos mostrará posibles comandos de algo que empecemos a escribir, basado en el contexto y comandos ejecutados anteriormente.

	```text
	source /usr/share/zsh-autosuggestions/zsh-autosuggestions.zsh 
	```

	Esto, al escribir un posible comando, nos pondrá por detrás, con letras un poco más opacas, un posible comando a utilizar, lo cual nos puede servir demasiado. 
	
	Con esto anterior que realizamos, es la forma de cargar los plug-ins que hemos instalado anteriormente, para que esto se aplique correctamente siempre. Tendremos que agregar esta instrucción en nuestro archivo *.zshrc*, verificando antes si el archivo existe para que no nos dé errores. 
	
	Por lo tanto, agregaríamos al final lo siguiente:

	```text
	# ZSH autosuggestions Plugin
	if [ -f /usr/share/zsh-autosuggestions/zsh-autosuggestions.zsh ]; then
		source /usr/share/zsh-autosuggestions/zsh-autosuggestions.zsh
	fi

	# ZSH syntax highlighthind Plugin
	if [ -f /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh ]; then
		source /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
	fi

	# ZSH autocomplete Plugin
	if [ -f /usr/share/zsh-autocomplete/zsh-autocomplete.plugin.zsh ]; then
		source /usr/share/zsh-autocomplete/zsh-autocomplete.plugin.zsh
	fi
	```

	* *Autosuggestions plugin*: Este plug-in nos ayudará para darnos ayuda para comandos anteriores que hemos escrito y basándose en el contexto de lo que estamos haciendo, por lo que es una herramienta potente para autocompletar rápidamente comandos anteriores que hemos ejecutado y necesitamos ejecutar con cierta frecuencia.

	* *Syntax highlighthing plugin*: Este plug-in nos ayudará a reconocer la sintaxis de los comandos en bash y, por ende, nos lo representará con colores, dándole una mejor estética a nuestra terminal.

	* *Autocomplete plugin*: Este plug-in nos ayudará al momento de utilizar comandos con parámetros, ya que siempre y cuando en su panel de ayuda estén los parámetros a utilizar, este nos filtrará por los que estamos seleccionando y debajo del comando nos colocará lo que podremos hacer con el parámetro indicado.
	
	Además, si quisiéramos instalar otro plug-in existente con base en nuestros requerimientos, podremos hacerlo de la siguiente manera (se mostrará un ejemplo para agregar el ZSH SUDO):

	* *ZSH sudo plugin*: Este plug-in nos ayudará para que, al momento de estar escribiendo un comando en terminal, si al ir bastante avanzados en él, quisiéramos ejecutarlo como usuario privilegiado, bastaría con presionar 2 veces la tecla *esc* para que nos coloque *sudo* al inicio de todo el comando.

	Para agregar un nuevo plug-in, tendríamos que irnos primero como usuario privilegiado al directorio */usr/share* y aquí crearíamos el directorio *zsh-sudo* para después entrar en él. 
	
	Una vez dentro del directorio, buscaríamos [*zsh-sudo plug-in*](https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/sudo/sudo.plugin.zsh) y seleccionaríamos [*raw*](https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/refs/heads/master/plugins/sudo/sudo.plugin.zsh) para ver directamente el texto y poderlo descargar rápidamente hacia el directorio que previamente creamos. 
	
	Lo descargaríamos ejecutando el comando:

	```text
	wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/refs/heads/master/plugins/sudo/sudo.plugin.zsh
	```

	Finalmente, a esto, de la misma manera que con los otros plug-ins, le aplicaríamos un *source* dentro de nuestro archivo *.zshrc*, de la siguiente manera:

	```text
	# ZSH sudo plugin
	if [ -f /usr/share/zsh-sudo/sudo.plugin.zsh ]; then
		source /usr/share/zsh-sudo/sudo.plugin.zsh
	fi
	```

	De esta manera, si reiniciamos nuestra terminal, al ejecutar comandos y presionar *esc* dos veces, se nos colocaría *sudo* al inicio del comando. 
	
	Ahora, una de las cosas con las que cuenta la bash es su propio archivo que almacena comandos ejecutados incluso en sesiones anteriores de terminal, por lo que para habilitarlo y que se nos cree el archivo *.zsh_history* en el directorio personal, entonces tendremos que agregar en nuestro archivo *.zshrc* luego de la acción previamente establecida, lo siguiente:

	```text
	# History
	HISTFILE=~/.zsh_history # define el archivo para almacenar el historial
	HISTSIZE=10000 # Le da un tamaño para poder almacenar una gran cantidad
	SAVEHIST=10000 # guarda o mantiene el historial
	setopt histignorealldups sharehistory # nos permite mandar una cadena vacia al
	# archivo del historial de comandos, lo cual lo vaciara.
	```

	Finalmente, vamos a agregar un sistema de autocompletado inteligente luego de todo lo que hemos agregado. 
	
	Este sistema de autocompletado nos ayudará mucho cuando, por ejemplo, escribamos mal un comando bash, como ejemplo el comando *whoami*. Si escribiéramos *whomi*, al presionar TAB, el sistema inteligente nos colocaría correctamente el comando. 
	
	Este sistema es un script o una serie de instrucciones, las cuales se encuentran en un [*Pastebin*](https://pastebin.com/H87J3nMj) y son las siguientes instrucciones:

	```text
	# Use modern completion system
	
	autoload -Uz compinit
	
	compinit
	
	zstyle ':completion:*' auto-description 'specify: %d'
	zstyle ':completion:*' completer _expand _complete _correct _approximate
	zstyle ':completion:*' format 'Completing %d'
	zstyle ':completion:*' group-name ''
	zstyle ':completion:*' menu select=2
	eval "$(dircolors -b)"
	zstyle ':completion:*:default' list-colors ${(s.:.)LS_COLORS}
	zstyle ':completion:*' list-colors ''
	zstyle ':completion:*' list-prompt %SAt %p: Hit TAB for more, or the character to insert%s
	zstyle ':completion:*' matcher-list '' 'm:{a-z}={A-Z}' 'm:{a-zA-Z}={A-Za-z}' 'r:|[._-]=* r:|=* l:|=*'
	zstyle ':completion:*' menu select=long
	zstyle ':completion:*' select-prompt %SScrolling active: current selection at %p%s
	zstyle ':completion:*' use-compctl false
	zstyle ':completion:*' verbose true
	
	zstyle ':completion:*:*:kill:*:processes' list-colors '=(#b) #([0-9]#)*=0=01;31'
	zstyle ':completion:*:kill:*' command 'ps -u $USER -o pid,%cpu,tty,cputime,cmd'
	```

	Con esto, nuestro *.zshrc* final, quedaría de la siguiente manera:

	```text
	# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
	# Initialization code that may require console input (password prompts, [y/n]
	# confirmations, etc.) must go above this block; everything else may go below.
	if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
	  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
	fi
	
	# Created by newuser for 5.9
	source /home/sammy/powerlevel10k/powerlevel10k.zsh-theme
	
	# ZSH autosuggestions Plugin
	if [ -f /usr/share/zsh-autosuggestions/zsh-autosuggestions.zsh ]; then
		source /usr/share/zsh-autosuggestions/zsh-autosuggestions.zsh
	fi
	
	# ZSH syntax highlighthind Plugin
	if [ -f /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh ]; then
		source /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
	fi
	
	# ZSH autocomplete Plugin
	if [ -f /usr/share/zsh-autocomplete/zsh-autocomplete.plugin.zsh ]; then
		source /usr/share/zsh-autocomplete/zsh-autocomplete.plugin.zsh
	fi
	
	# ZSH sudo plugin
	if [ -f /usr/share/zsh-sudo/sudo.plugin.zsh ]; then
		source /usr/share/zsh-sudo/sudo.plugin.zsh
	fi
	
	
	# History
	HISTFILE=~/.zsh_history
	HISTSIZE=10000
	SAVEHIST=10000
	setopt histignorealldups sharehistory
	
	
	# Use modern completion system
	autoload -Uz compinit
	
	compinit
	
	zstyle ':completion:*' auto-description 'specify: %d'
	zstyle ':completion:*' completer _expand _complete _correct _approximate
	zstyle ':completion:*' format 'Completing %d'
	zstyle ':completion:*' group-name ''
	zstyle ':completion:*' menu select=2
	eval "$(dircolors -b)"
	zstyle ':completion:*:default' list-colors ${(s.:.)LS_COLORS}
	zstyle ':completion:*' list-colors ''
	zstyle ':completion:*' list-prompt %SAt %p: Hit TAB for more, or the character to insert%s
	zstyle ':completion:*' matcher-list '' 'm:{a-z}={A-Z}' 'm:{a-zA-Z}={A-Za-z}' 'r:|[._-]=* r:|=* l:|=*'
	zstyle ':completion:*' menu select=long
	zstyle ':completion:*' select-prompt %SScrolling active: current selection at %p%s
	zstyle ':completion:*' use-compctl false
	zstyle ':completion:*' verbose true
	
	zstyle ':completion:*:*:kill:*:processes' list-colors '=(#b) #([0-9]#)*=0=01;31'
	zstyle ':completion:*:kill:*' command 'ps -u $USER -o pid,%cpu,tty,cputime,cmd'
	
	# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
	[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
	
	```
