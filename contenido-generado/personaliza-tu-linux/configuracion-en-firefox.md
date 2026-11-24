---
curso: "personaliza-tu-linux"
modulo: "personaliza-tu-linux/escritorio"
leccion: "configuracion-en-firefox"
titulo: "Configuración en Firefox"
orden: 14
minutos: 4.2
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 9
ejercicios: []
---

1. Primeramente, en configuración vamos a filtrar por el historial y vamos a configurarlo para que no guarde ni recuerde el historial.
	</br>

2. Ahora, un problema que llega a pasar es que cuando llegamos a resolver una máquina y a nivel de dominio tenemos *mantis.htb*, se suele dar el problema que en lugar de entrar a la página esperada, lo busque en el buscador del navegador, para evitar esto, tendremos que irnos al buscador de nuestro navegador y escribir *about\:config* y tendremos lo siguiente:

	<img src="/apuntes/personaliza-tu-linux/img-0041.webp" alt="Captura de los apuntes" width="1687" height="473" decoding="async">

	Ahora, en el buscador que nos brinda, buscaremos lo siguiente:

	```text
	browser.fixup.domainsuffixwhitelist.htb
	```

	<img src="/apuntes/personaliza-tu-linux/img-0042.webp" alt="Captura de los apuntes" width="1683" height="231" loading="lazy" decoding="async">

	Aquí le daremos al *+*, de esta manera como por defecto estará en true, ya estaremos seguros de que cuando intentemos utilizar *mantis.htb* ya intentará resolverlo y no lo buscara en el buscador:

	<img src="/apuntes/personaliza-tu-linux/img-0043.webp" alt="Captura de los apuntes" width="1681" height="707" loading="lazy" decoding="async">

	</br>

3. Buscaremos y agregaremos la extensión *Wappalyzer extensión* y le daremos permisos para correr en ventanas privadas.

	Esta extensión es un plug-in que al ejecutarlo en una página, nos detectara las tecnologías que esta misma emplea. Lo cual vendrá bien de cara a la etapa de reconocimiento cuando se resuelven máquinas.

4. Ahora buscaríamos por *foxiproxy addon*, lo cual será otra extensión que nos servirá para enviar las solicitudes al *burpsuite*.

	Vamos a generar un ejemplo con esto, en un espacio de trabajo abriremos el *burpsuite*, podríamos hacerlo con rofi, recordando que lo que nos lo lanzaría de forma correcta es el script que configuramos *burpsuite-launcher*, entrando le damos a *next* e *iniciar*. 
	
	De aquí nos iríamos a *proxy* y en proxy a *proxy settings*:

	<img src="/apuntes/personaliza-tu-linux/img-0044.webp" alt="Captura de los apuntes" width="1704" height="809" loading="lazy" decoding="async">

	Aquí vemos que tenemos un proxy en el equipo local por el puerto 8080 ya configurado. 
	
	De esta forma, presionamos en foxyproxy y en el apartado de opciones, dándonos una ventana así:

	<img src="/apuntes/personaliza-tu-linux/img-0045.webp" alt="Captura de los apuntes" width="1688" height="694" loading="lazy" decoding="async">

	Aquí nos iríamos a *proxies* y crearíamos uno nuevo con *Add*, colocándole lo siguiente:

	<img src="/apuntes/personaliza-tu-linux/img-0046.webp" alt="Captura de los apuntes" width="1165" height="360" loading="lazy" decoding="async">

	Le damos a guardar y ya con esto, si lo activáramos, presionando en la extensión:

	<img src="/apuntes/personaliza-tu-linux/img-0047.webp" alt="Captura de los apuntes" width="295" height="171" loading="lazy" decoding="async">

	Ahora, al realizar una búsqueda, por ejemplo *google.es*, esto se enviaría mediante el *burpsuite*, aquí interceptaría la petición y burpsuite se encargaría de enviarla a su destino, de la siguiente manera:

	<img src="/apuntes/personaliza-tu-linux/img-0048.webp" alt="Captura de los apuntes" width="1387" height="683" loading="lazy" decoding="async">

	El navegador queda en espera, aquí le daremos a *Forward* y después a *Intercept is on* para dejar que la petición siga fluyendo. 
	
	Esto de primeras nos dará un error en nuestro navegador, para solucionarlo tendremos que buscar por http://burp/ y le daremos a *CA Certificate*, lo cual será para viajar e interceptar de forma segura por páginas https.

	Esto lo almacenaremos en el directorio de descargas y luego en el navegador nos iremos a configuraciones, buscamos por *certificates* y finalmente en el apartado *autorithies* cargamos el recién descargado y vamos a seleccionar únicamente la primera casilla, para después guardarlo.

	<img src="/apuntes/personaliza-tu-linux/img-0049.webp" alt="Captura de los apuntes" width="836" height="469" loading="lazy" decoding="async">

	De esta forma, si volviésemos a intentarlo, ahora sí iría todo bien y podríamos interceptar búsquedas, hacer investigaciones y entre otras cosas para las que podríamos utilizar esta herramienta.
