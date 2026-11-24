---
curso: "python-desde-cero"
modulo: "python-desde-cero/fundamentos"
leccion: "manejo-de-errores-y-excepciones"
titulo: "Manejo de errores y excepciones"
orden: 11
minutos: 7.9
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 13
ejercicios: []
---

El manejo de errores y excepciones son un aspecto crítico para la creación de programas robustos y confiables en Python. Los errores son inevitables en la programación, pero manejarlos correctamente es lo que diferencia a un buen programa de uno que falla constantemente.


1. **Introducción:**

	**Manejo de errores:**

	Los errores pueden ocurrir por muchas razones: errores de código, datos de entrada incorrectos, problemas de conectividad, entre otros. En lugar de permitir que un programa falle con un error, Python nos proporciona una herramienta para 'atrapar' estos errores y manejarlos de manera controlada, evitando así que el programa se detenga inesperadamente y permitiendo reaccionar de manera adecuada.

	**Excepciones:**

	Una excepción en Python es un evento que ocurre durante la ejecución de un programa que interrumple el flujo normal de las instrucciones del programa. Cuando el intérprete se encuentra con una situación que no puede manejar, 'levanta' o 'arroja' una excepción.

	**Bloques try y except:**

	Para manejar las excepciones, utilizamos los bloques *try* y *except*. Un bloque *try* contienen código que puede producir una excepción, mientras que un bloque *except* captura la excepción y contiene el código que se ejecuta cuando se produce una.

	**Otras palabras clave de manejo de excepciones:**

	- *else:* Se puede usar después de los bloques *except* para ejecutar código si el bloque *try* no generó una excepción.
	- *finally:* Se utiliza para ejecutar código que debe correr inependientemente de si se genero un excepción o no, como cerrar un archivo o una conexión de red.

	**Levantar excepciones:**

	También es posible ‘levantar’ una excepción intencionalmente con la palabra clave *raise*, lo que permite forzar que se produzca una excepción bajo condiciones específicas.

	En esta clase, aprenderemos a identificar diferentes tipos de excepciones y cómo manejarlas de manera específica.
	También exploraremos cómo utilizar la declaración *raise* para crear excepciones que ayuden a controlar el flujo del programa y evitar estados erróneos o datos corruptos.

	Con esto tendrás las habilidades para escribir programas que manejen situaciones inesperadas de manera elegante y mantengan una ejecución limpia y controlada, incluso cuando se encuentren con problemas imprevistos.

2. **Práctica:**

	Los manejos de excepciones nos permitirán dar una serie de instrucciones a nuestro programa, para que al momento en el que se dé un error, el programa no se cierre de forma inesperada y rápida.

	De esta forma, podríamos controlar el flujo de salida del programa y, por ejemplo, en aplicaciones de escritorio, mostrar ventanas con mensajes sobre el error, para que no se cierre repentinamente.

	Una forma de realizarlo sería, por ejemplo, manejar una excepción cuando se intente realizar una división entre cero.

	Primeramente, tendremos que visualizar qué pasa si solo hacemos la división:

	<img src="/apuntes/python-desde-cero/img-142.webp" alt="Captura de los apuntes" width="788" height="341" decoding="async">

	Aquí podremos observar que nos da un error. Este mensaje que nos muestra al final de cuentas es una excepción que lo que hace es mostrarnos dónde surgió el error y qué tipo de excepción se produjo.

	Entonces, para nosotros poder manejar una excepción cualquiera, lo haríamos de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-143.webp" alt="Captura de los apuntes" width="796" height="316" loading="lazy" decoding="async">

	De esta manera, *try* lo que hace es ejecutar un bloque de código y, en este caso, except tomaría cualquier tipo de error que se produzca y nos mostrará el mensaje.

	Sin embargo, la excepción puede ser mucho más específica, ya que puede que se dé algo inesperado, pero que no queremos realizar una instrucción en concreto para ello. Aquí es donde entran los tipos de excepciones.

	Por ello, si vemos el mensaje que nos arrojó el error cuando no utilizamos el try, veremos que la excepción en este caso es *ZeroDivisionError*, entonces, si queremos manejar solamente esta excepción en específico, tendremos que colocarlo después del except:

	<img src="/apuntes/python-desde-cero/img-144.webp" alt="Captura de los apuntes" width="789" height="342" loading="lazy" decoding="async">

	Es por ello que si ahora generáramos un error con un tipo de excepción distinta, al estar definida una específica, para alguna distinta no mostraría el mensaje que colocamos:

	<img src="/apuntes/python-desde-cero/img-145.webp" alt="Captura de los apuntes" width="825" height="416" loading="lazy" decoding="async">

	Por ello, nos muestra la excepción definida en el propio Python; por ello, si quisiéramos que se considere esta excepción, tendríamos que colocar como excepción específica *IndexError* que es lo que muestra el error.

	O bien, dejarlo sin especificar una  para que para cualquier tipo de excepción realice lo indicado.

	<img src="/apuntes/python-desde-cero/img-146.webp" alt="Captura de los apuntes" width="776" height="361" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-147.webp" alt="Captura de los apuntes" width="801" height="359" loading="lazy" decoding="async">


	Además, es posible tratar múltiples excepciones en un mismo *try*:

	<img src="/apuntes/python-desde-cero/img-148.webp" alt="Captura de los apuntes" width="799" height="512" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-149.webp" alt="Captura de los apuntes" width="804" height="509" loading="lazy" decoding="async">

	Además, algo interesante es que, ya considerando el apartado de librerías, podríamos importar *log* de la librería *pwn* y esto con una instrucción específica directamente nos ayudará a representar un error de una mejor manera e incluso con colorcitos.

	<img src="/apuntes/python-desde-cero/img-150.webp" alt="Captura de los apuntes" width="806" height="521" loading="lazy" decoding="async">

	**Problema con las librerías:**

	Es posible que al importar la librería de errores e incluso al querer instalar librerías, para esto la solución será crear un entorno específico para nuestras librerías y tendremos que cargarlo cada vez que lo vayamos a utilizar. Primeramente crearemos un entorno:

	```text
	python3 -m venv nombre_del_entorno
	```

	Debemos asegurarnos de tener esto en una ruta absoluta en que no vayamos a manipular tanto, esto debido a que una vez hayamos creado el entorno deberemos cargar la ruta absoluta con un *source*, lo que quiere decir que le indicaremos al sistema donde deberá almacenar las librerías que queremos instalar o utilizar.

	```text
	source /ruta/nombre_del_entorno/bin/activate
	```

	Después de esto, podremos utilizar *pip3* para instalar la librería pwntools o cargar el entorno para ejecutar algún programa si llega a dar error con alguna librería que ya tengamos instalada ahí.

	```text
	pip3 install pwntools
	```

	**else con try:**

	Es posible utilizar *else* para un *try*, lo cual se utilizará en caso de que ninguno de los errores esperados se dé, quiere decir que todo ha salido bien y por ende podremos decidir qué hacer en nuestro programa:

	<img src="/apuntes/python-desde-cero/img-151.webp" alt="Captura de los apuntes" width="1068" height="604" loading="lazy" decoding="async">

	Además, en *try* tenemos *finally* en el cual podremos defini un bloque de código que siempre se va a ejecutar, de error o no.

	Como su nombre lo indica, es importante siempre colocarlo al final del todo para evitar errores:

	<img src="/apuntes/python-desde-cero/img-152.webp" alt="Captura de los apuntes" width="1068" height="756" loading="lazy" decoding="async">

	Por lo que si da error, de igual forma se ejecutará el *finally*:

	<img src="/apuntes/python-desde-cero/img-153.webp" alt="Captura de los apuntes" width="1075" height="732" loading="lazy" decoding="async">

	**Lanzar excepciones:**

	También es posible lanzar las excepciones. Un ejemplo sería tener un dato numérico, pero que si este es menor a cero, nos lance una excepción. Esto se hace con *raise* indicándole que queremos lanzar una excepción::

	<img src="/apuntes/python-desde-cero/img-154.webp" alt="Captura de los apuntes" width="813" height="381" loading="lazy" decoding="async">

	De esta manera, lo que vemos al final es la excepcion que hemos lanzado y, por ende, se ha detenido el flujo del programa.

	Y lo que observamos antes de nuestra excepcion es conocido como *stack trace* y es una indicación de exactamente qué ha pasado y dónde.

	¡Intenta ocasionar distintos tipos de errores y utilizar excepciones con ello para controlar el flujo de salida de tu programa!
