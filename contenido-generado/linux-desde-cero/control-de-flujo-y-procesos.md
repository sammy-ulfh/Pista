---
curso: "linux-desde-cero"
modulo: "linux-desde-cero/comandos"
leccion: "control-de-flujo-y-procesos"
titulo: "Control de flujo y procesos"
orden: 5
minutos: 6.4
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 15
ejercicios: []
---

## Operadores

- **;**

	El operador **;** nos permite realizar separación de comandos en la misma línea de ejecución. Esto hará que todos los comandos que coloquemos se ejecutaran:

	<img src="/apuntes/linux-desde-cero/39.webp" alt="Captura de los apuntes" width="1085" height="159" decoding="async">

- **&&**

	El operador **&&** nos permite ejecutar comandos consecutivamente, solamente si el comando anterior devolvió un código de estado exitoso:

	<img src="/apuntes/linux-desde-cero/40.webp" alt="Captura de los apuntes" width="1103" height="183" loading="lazy" decoding="async">

	Si en algún punto uno de los comando retorna un código de estado no exitoso, ya sea por un error o comando no existente, retorna el  error de dicho comando y se detiene en ese punto:

	<img src="/apuntes/linux-desde-cero/41.webp" alt="Captura de los apuntes" width="385" height="157" loading="lazy" decoding="async">

	¿Como es posible visualizar este código de estado?

	Para visualizar el código de estado, primeramente tendremos que ejecutar un comando y despues de este utilizaremos el comando **echo** el cual nos permite imprimir **$?**, lo cual contiene el codigo de estado del comando anteriormente ejecutado:

	<img src="/apuntes/linux-desde-cero/42.webp" alt="Captura de los apuntes" width="361" height="278" loading="lazy" decoding="async">

	De esta manera, observamos como cuando un comando se ejecuta y concluye su ejecución de manera correcta, obtenemos un código de estado igual a 0, de lo contrario el código de estado será distinto de 0.

- **||**

	Ahora, la forma en la que funciona el **||** es que nos permite ejecutar el siguiente comando, solamente si el primero retorna un código de estado no exitoso:

	<img src="/apuntes/linux-desde-cero/43.webp" alt="Captura de los apuntes" width="1135" height="271" loading="lazy" decoding="async">

	En caso de que el primer comando retorne un código de estado exitoso, veremos como ya no se ejecutara el siguiente:

	<img src="/apuntes/linux-desde-cero/44.webp" alt="Captura de los apuntes" width="360" height="214" loading="lazy" decoding="async">

## Control de flujo

El control de flujo nos da mucha facilidad a la hora de trabajar con scripting en bash, ya que lo que permite es decidir a donde queremos enviar lo que nos retorne un comando, ya sea output (stdout) o errores (stderr).


- **stdout**

	Todos los comandos que hemos ejecutado correctamente, lo que nos retornan es el stdout o la respuesta de lo que esperamos que realice el comando. Esta respuesta podremos decidir a donde queremos que vaya y existen dos formas de referenciarla con redirectores.

	- **>**

	Si utilizamos el redirector y seguido de este colocamos un nombre, lo que hará será crearnos un archivo con el output del comando:

	<img src="/apuntes/linux-desde-cero/45.webp" alt="Captura de los apuntes" width="369" height="199" loading="lazy" decoding="async">

	- **1>**

	Esta seria la forma más indicada de redireccionarlo, en cuanto a referencia respecta. Ya que utilizamos el número 1 para referirnos al output y el 2 para referirnos a los errores.

	<img src="/apuntes/linux-desde-cero/46.webp" alt="Captura de los apuntes" width="402" height="232" loading="lazy" decoding="async">

	Como vemos, ambas cumplen la misma función. El redirector individual colocará el contenido en el archivo, eliminando el contenido existente. Si colocamos un doble redirector lo que hará será colocarnos el contenido en formato append:

	<img src="/apuntes/linux-desde-cero/47.webp" alt="Captura de los apuntes" width="314" height="253" loading="lazy" decoding="async">

- **stderr**

	Para los errores es exactamente lo mismo, pero para ellos los referenciamos con el número 2:

	<img src="/apuntes/linux-desde-cero/48.webp" alt="Captura de los apuntes" width="381" height="168" loading="lazy" decoding="async">

	De esta manera se envía el error al archivo y no lo muestra en terminal.

	Esto en scripting, para evitar todo el tiempo tener un archivo con contenido almacenando los errores, tenemos un archivo especial, el cual es **\/dev\/null**. Este es un tipo de archivo especial, el cual podremos ver como un contenedor o desechador de basura, donde perfectamente podremos enviar los errores y olvidarnos de ellos:

	<img src="/apuntes/linux-desde-cero/49.webp" alt="Captura de los apuntes" width="401" height="128" loading="lazy" decoding="async">

- **Ambos**

	Podremos controlar el flujo tanto del output como de los errores con un **&** en lugar de los números:

	<img src="/apuntes/linux-desde-cero/50.webp" alt="Captura de los apuntes" width="365" height="115" loading="lazy" decoding="async">

	Esto toma en cuenta errores y output, por ende no observaremos ninguno de los dos en terminal al utilizarlo.

## **Procesos en segundo plano**

Cuando nosotros ejecutamos un comando o aplicación desde terminal, esta crea un subproceso el cual depende totalmente de la terminal, si ejecutáramos Firefox, estaríamos viendo todo el tiempo el output de cada acción que se realice y además no podríamos utilizar la terminal, ya que está siendo ocupada por el proceso de la ejecución de Firefox:

<img src="/apuntes/linux-desde-cero/51.webp" alt="Captura de los apuntes" width="1687" height="537" loading="lazy" decoding="async">

- **&**

	Para mandar este proceso a segundo plano, tendríamos que utilizar el **&** al final del todo, de esta manera podríamos seguir utilizando la terminal:

	<img src="/apuntes/linux-desde-cero/52.webp" alt="Captura de los apuntes" width="1698" height="536" loading="lazy" decoding="async">

	Esto ya nos funciona perfectamente; sin embargo, sigue siendo un proceso el cual depende de la terminal, por lo que si nosotros cerráramos la terminal automáticamente se nos cerraría Firefox.

	Para evitar esto tendríamos que agregar la palabra clave **disown** al final, lo cual indicara que será un proceso que no es dependiente de si la terminal se encuentre aún abierta o no:

	<img src="/apuntes/linux-desde-cero/53.webp" alt="Captura de los apuntes" width="1585" height="346" loading="lazy" decoding="async">

	De esta manera, la terminal ya podría cerrarse y no forzaría el cierre del navegador.

## Material de apoyo

[Descargar «bash_redirections.pdf»](/apuntes/linux-desde-cero/bash-redirections.pdf)
