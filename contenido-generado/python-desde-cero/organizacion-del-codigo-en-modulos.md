---
curso: "python-desde-cero"
modulo: "python-desde-cero/modulos-y-archivos"
leccion: "organizacion-del-codigo-en-modulos"
titulo: "Organización del código en módulos"
orden: 24
minutos: 5.8
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 10
ejercicios: []
---

1. **Introducción**

	La organización del código en módulos es una práctica esencial en Python para construir programas escalables y mantenibles. Los módulos son archivos de Python que contienen definiciones y declaraciones de variables, funciones, clases u otros objetos que se pueden reutilizar en diferentes partes del programa.

	*Estructura de Módulos:*

	Cada módulo en Python es un archivo *.py* que encapsula tu código para un propósito específico. Por ejemplo, puedes tener un módulo para operaciones matemáticas, otro para manejo de entradas/salidas y otro para la lógica de la interfaz de usuario. Esta estructura ayuda a mantener el código organizado, facilita la lectura y hace posible la reutilización de código.

	*Importación de Módulos:*

	Python utiliza la palabra clave *import* para utilizar módulos. Puedes importar un módulo completo como *import math*, o importar nombres específicos de un módulo utilizando *from math import sqrt*. Python tambien permite la importación de módulos con un alias para facilitar su uso dentro del código, como *import numpy as np*.

	*Paquetes:*

	Cuando los programas crecen y los módulos comienzan a acumularse, Python permite oprganizar módulos en paquetes. Un paquete es una carpeta que contiene módulos y un archivo especial llamado *\_\_init\_\_.py* , que indica a Python que esa carpeta contiene módulos que pueden ser importados.

	*Ventajas de los Módulos:*

	* *Mantenimiento:* Los módulos permiten trabajar en partes del código de manera independiente sin afectar otras partes del sistema.
	  </br>
	* *Espacio de nombres:* Los módulos definen su propio espacio de nombres, lo que significa que puedes tener funciones o clases con el mismo nombre en diferentes módulos sin conflicto.
	  </br>
	* *Reutilización:* El código escrito en módulos puede ser reutilizado en diferentes programas simplemente importándolos donde se necesiten.

	</br>
2. **Práctica**

	Un módulo será otro archivo en Python que tenga definiciones de clases, variables y funciones, los cuales podrán ser importados desde otros scripts, lo que nos ayuda a tener el código de una forma mucho más estructurada, limpia y escalable.

	Teniendo esto en cuenta, comenzaríamos creando un archivo *math_operations.py* y en este definiremos funciones con las operaciones básicas *suma*, *resta*, *multiplicacion* y *division*:

	<img src="/apuntes/python-desde-cero/img-444.webp" alt="Captura de los apuntes" width="826" height="452" decoding="async">

	De esta manera lo guardamos y ahora buscaríamos reutilizar todo este *script* y sus funciones definidas desde otro script, el cual llamaremos *main.py*, esto porque sería como nuestro script principal.

	Aquí lo que tendríamos que hacer es importarlo de la siguiente manera:

	<img src="/apuntes/python-desde-cero/img-445.webp" alt="Captura de los apuntes" width="429" height="212" loading="lazy" decoding="async">

	Lo que Python hará, será buscar este archivo en el directorio actual, por lo que no haría falta colocar una ruta absoluta. Tampoco hace falta colocar él *.py*, ya que al importarlo Python automáticamente sabe que nos referimos a otro módulo, el cual también es un script en Python.

	De esta manera, ahora con referenciar al módulo que hemos importado y luego a la función que queramos ejecutar, podríamos realizar lo siguiente:

	<img src="/apuntes/python-desde-cero/img-446.webp" alt="Captura de los apuntes" width="443" height="285" loading="lazy" decoding="async">

	De esta manera, ahora el script principal nos queda mucho más limpio.

	Ahora, si quisiéramos hacer referencia directamente a la función sin referencias al módulo, lo que podríamos hacer es importar directamente estas funciones del módulo:

	<img src="/apuntes/python-desde-cero/img-447.webp" alt="Captura de los apuntes" width="771" height="295" loading="lazy" decoding="async">

	Y esto nos funcionaría como si de una función que tuviésemos definida dentro de nuestro mismo script se tratase.

	*Bibliotecas estándar en Python*

	De esta manera, ahora podremos hablar sobre las bibliotecas estándar de Python, ya que estas están divididas en módulos y las podremos utilizar, por lo que podríamos importar alguna como *math*:

	<img src="/apuntes/python-desde-cero/img-448.webp" alt="Captura de los apuntes" width="157" height="57" loading="lazy" decoding="async">

	Y algo que podríamos hacer cuando no sepamos que contiene la librería y que podríamos utilizar de esta, es aplicarle un *dir()* y esto nos retornará en pantalla la capacidad que tenemos de módulos a utilizar:

	<img src="/apuntes/python-desde-cero/img-449.webp" alt="Captura de los apuntes" width="1870" height="338" loading="lazy" decoding="async">

	De esta manera tenemos algunas como *sqrt* (para raiz cuadrada), *pow* (para exponentes), *tan* (para tangente), entre otros.

	Ahora podríamos de math traernos *sqrt* y utilizarlo para sacar la raíz cuadrada de algún número:

	<img src="/apuntes/python-desde-cero/img-450.webp" alt="Captura de los apuntes" width="338" height="264" loading="lazy" decoding="async">

	En algunos casos específicos en los que lleguemos a utilizar una gran variedad de las funciones que ya tenga definida una librería, lo que podríamos hacer es importar todo.

	Lo malo es que nos traería absolutamente todos los módulos de esta librería, pero tampoco afectaría tanto en cuanto al rendimiento respecta:

	<img src="/apuntes/python-desde-cero/img-451.webp" alt="Captura de los apuntes" width="337" height="269" loading="lazy" decoding="async">

	Es importante aclarar que estos módulos no dependen como tal de un script, ya que estos ya vienen incorporados directamente con Python y traen sus propios módulos, por lo que no dependerán de un script.

	Esto podríamos verlo con un ejemplo en el que transformamos un texto a una cadena *md5* con la librería *hashlib*:

	<img src="/apuntes/python-desde-cero/img-452.webp" alt="Captura de los apuntes" width="396" height="127" loading="lazy" decoding="async">

	Esto nos transformaría un texto a md5, pero finalmente también podremos ver su archivo, ya que este módulo depende de uno para su funcionamiento.

	En cambio, en cuanto a *math*, como Python ya lo tiene incorporado, esto no dependerá de ningún archivo:

	<img src="/apuntes/python-desde-cero/img-453.webp" alt="Captura de los apuntes" width="599" height="117" loading="lazy" decoding="async">
