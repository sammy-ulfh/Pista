---
curso: "python-redes"
modulo: "python-redes/escaner-de-puertos"
leccion: "creando-un-escaner-de-puertos-1-de-4"
titulo: "Creando un escáner de puertos (1 de 4)"
orden: 1
minutos: 5
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 10
ejercicios: []
---

### **Creando un escáner de puertos (1-4)**

1. **Introducción**

	Una característica clave para la construcción de nuestro escáner, será la implementación de threading para acelerar nuestro proceso de escaneo. Utilizando **ThreadingPoolExecutor** podremos gestionar y limitar los hilos, evitando así los errores comunes como exceso de conexiones máximas.
	
	Además, se integrará **argparse** en la herramienta, lo que permitirá personalizar las opciones de ejecución. Esto nos permitirá obtener una comprensión más profunda de como optimizar el rendimiento y la eficiencia de nuestras herramientas de seguridad en red, manteniendo un equilibrio entre velocidad y estabilidad.

2. **Práctica**

	La construcción de este escáner lo haremos de una forma en la que haremos como distintas versiones, haciéndolo cada vez un poco más completo.

	Primeramente, crearemos nuestro archivo **port_scan.py** y colocamos nuestro shebang.

	### **Primera versión**

	Empezaremos definiendo nuestra estructura básica, creando nuestra función principal donde mandaremos a llamar a la función que nos ayudara a saber si un puerto en un dado host se encuentra abierto, para ello además importaremos la librería socket:

	<img src="/apuntes/python-redes/img-001.webp" alt="Captura de los apuntes" width="363" height="309" decoding="async">

	Con esto listo, la forma en la que trabajaremos será intentar conectarnos mediante un socket al puerto dado. Cuando utilizamos **connect*** esto suele retornarnos una excepción si el puerto se encuentre cerrar, pero existe una forma que es como aplicar una conexión extendida **connect_ext**, la cual en lugar de retornarnos una excepción al no lograr la conexión, nos retornará un código de estado, lo cual podremos manejar fácilmente con condicionales:

	<img src="/apuntes/python-redes/img-002.webp" alt="Captura de los apuntes" width="608" height="376" loading="lazy" decoding="async">

	<img src="/apuntes/python-redes/img-003.webp" alt="Captura de los apuntes" width="605" height="237" loading="lazy" decoding="async">

	De esta manera, cada vez que la conexión sea exitosa podremos observar como nos retornara un 0.

	Cuando esté cerrado nos retornará el código de estado 111 que hace referencia a conexión rechazada, ya que este puerto se encuentra cerrado.

	Con esto en mente ya podremos trabajar con un condicional, teniendo en cuenta los números. Consideremos que cuando un número en un condicional es exactamente 0, automáticamente es considerado como **false** mientras que si es un número distinto de cero es considerado como **true**.

	<img src="/apuntes/python-redes/img-004.webp" alt="Captura de los apuntes" width="602" height="484" loading="lazy" decoding="async">

	<img src="/apuntes/python-redes/img-005.webp" alt="Captura de los apuntes" width="714" height="324" loading="lazy" decoding="async">

	Todo parece ir rápido, porque lo estamos probando con nuestro host local, el cual sabemos que sí existe, pero en dado caso de que no exista la IP a la que deseamos conectarnos, esto tarda bastante tiempo, ya que primero trata de conectarse a la IP dada. Para evitar esto, podremos setear un tiempo límite en el socket, dentro del cual, si no se logra conectar en un segundo, automáticamente nos determina que la conexión fue fallida.

	De esta manera, ahora todo sería mucho más rápido, aun así la IP no exista:

	<img src="/apuntes/python-redes/img-006.webp" alt="Captura de los apuntes" width="604" height="445" loading="lazy" decoding="async">

	Siguiendo este mismo principio, utilice la libreria **sys** para generar el script de manera en que le pasaramos el host y puerto como argumentos, teniendo el codigo de la siguiente manera:
	
	<img src="/apuntes/python-redes/img-007.webp" alt="Captura de los apuntes" width="676" height="836" loading="lazy" decoding="async">

	**sys.argv** nos da la lista de los argumentos que haya recibido el script al ejecutarse en terminal.

## **Colores en un script**

Sin duda alguna la representacion de lo que se realice, con colores es mucho mejor, ya que, le da mas vida a nuestros programas basados en terminal.

Para ello, importaremos **colored** desde la libreria **termcolor**:

```python
from termcolor import colored
```

Es posible que tengamos que instalar la libreria.

Primeramente, reorganizaremos el script para que pueda recibir como argumentos un rango de puertos a escanear, considerando siempre que el primer puerto que se de en el rango debera ser menor al segundo:

<img src="/apuntes/python-redes/img-008.webp" alt="Captura de los apuntes" width="674" height="826" loading="lazy" decoding="async">

<img src="/apuntes/python-redes/img-009.webp" alt="Captura de los apuntes" width="820" height="229" loading="lazy" decoding="async">

Finalmente, para la representacion de nuestro output en colores, bastara con usar la funcion **colored**, como primer argumento pasarle el output que mostraremos y como segundo el color que queremos representar:

<img src="/apuntes/python-redes/img-010.webp" alt="Captura de los apuntes" width="978" height="875" loading="lazy" decoding="async">
