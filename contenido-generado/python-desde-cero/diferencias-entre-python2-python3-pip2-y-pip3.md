---
curso: "python-desde-cero"
modulo: "python-desde-cero/fundamentos"
leccion: "diferencias-entre-python2-python3-pip2-y-pip3"
titulo: "Diferencias entre Python2, Python3, PIP2 y PIP3"
orden: 2
minutos: 3.6
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 5
ejercicios: []
---

*Python 2*  y *Python 3* son dos versiones del lenguaje de programación Python, cada una con sus propias características y diferencias clave. *PIP2*  y *PIP3* son herramientas de gestión de paquetes correspondientes a cada versión, utilizadas para instalar y administrar bibliotecas y dependencias.

**Python2 vs Python 3:**

Para instalar Python 2, si tenemos problemas, simplemente agregamos el repositorio de Debian:

```text
deb http://deb.debian.org/debian/ bullseye main contrib non-free  
```

A nuestra lista de repositorios, normalmente suele estar en /etc/apt/sources.list, podrá cambiar dependiendo de la distribución y siempre lo indican en este archivo.

Una vez hecho esto, realizamos un update e intentamos instalar Python 2:

```text
sudo apt update
sudo apt install python2
```

Para la instalación de pip2 tendremos problemas, pero se soluciona ejecutando lo siguiente:

```python
wget https://bootstrap.pypa.io/pip/2.7/get-pip.py
python2 get-pip.py
```

Finalmente, tendremos que agregar al PATH la ruta que nos dé, ya que nos menciona que la ruta donde se instaló no está contemplada dentro del PATH, en este caso a mí me dio la siguiente:

```text
/home/user/.local/bin
```

Si quieres que te funcione para usuario root, tendrás que ejecutar el script de Python descargado para root, con eso quedaría.


- *Sintaxis de print:* En Python 2, <mark>print</mark> es una declaración, mientras que en Python 3, <mark>print()</mark> es una función, lo que requiere el uso de paréntesis.

	<img src="/apuntes/python-desde-cero/img-001.webp" alt="Captura de los apuntes" width="742" height="210" decoding="async">

	<img src="/apuntes/python-desde-cero/img-002.webp" alt="Captura de los apuntes" width="726" height="196" loading="lazy" decoding="async">

  </br>
- *División de enteros:* Python 2 realiza una  división entera por defecto, mientras que en Python 3 se realiza una división real (flotante) por defecto.

	<img src="/apuntes/python-desde-cero/img-003.webp" alt="Captura de los apuntes" width="727" height="204" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-004.webp" alt="Captura de los apuntes" width="748" height="189" loading="lazy" decoding="async">

  </br>
- *Unicode:* Python 3 usa Unicode (texto) como tipo de dato por defecto para representar cadenas, mientras que Python 2 utiliza ASCII.
  </br>
- *Librerías:*  Muchas librerías populares de Python 2 han sido actualizadas o reescritas para Python 3, con mejoras y nuevas funcionalidades.
  </br>
- *Soporte:* Python 2  llegó al final de su vida útil en 2020, lo que significa que ya no recibe actualizaciones, ni siquiera para correcciones de seguridad.

**PIP2 vs PIP3:**

- *Gestión de paquetes:* PIP2 y PIP3 son herramientas que permiten instalar paquetes para Python 2 y Python 3, respectivamente. Es importante usar la versión correcta para garantizar la compatibilidad con la versión de Python que estés utilizando.
  </br>
-  *Comandos de instalación:* El uso de pip2 o pip3 antes de un comando determina si el paquete se instalará en Python 2 o Python 3. Algunos sistemas operativos pueden requerir especificar pip2 o pip3 explícitamente para evitar ambigüedades.
   </br>
-  *Ambientes virtuales:* Es una buena práctica usar ambientes virtuales para mantener separadas las dependencias de proyectos específicos y evitar conflictos entre versiones de paquetes para Python2 y Python 3.

	Además, en sistemas como parrot actualmente incluso puede darnos problemas y forzarnos a tener que crear ambientes virtuales, de esta manera podríamos crearlo:

	```text
	python3 -m venv nombre_del_entorno
	```

	Finalmente, para que nos funcione tendríamos que cargar este entorno, para que aquí almacene pip las dependencias. Esto lo podríamos hacer con un source y la ruta absoluta:

	```text
	source /ruta/absoluta/nombre_del_entorno/bin/activate
	```

	Quedando de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-053.webp" alt="Captura de los apuntes" width="933" height="339" loading="lazy" decoding="async">


La transición de Python 2 a Python 3 ha sido significativa en la comunidad de desarrolladores de Python, y es fundamental que los programadores comprendan las diferencias y sepan cómo trabajar con ambas versiones del lenguaje y sus herramientas asociadas.
