---
curso: "python-desde-cero"
modulo: "python-desde-cero/proyectos"
leccion: "proyecto-de-administracion-de-flota-de-vehiculos"
titulo: "Proyecto de administración de flota de vehículos"
orden: 33
minutos: 7.6
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 16
ejercicios: []
---

1. **Introducción**

	En este proyecto se creara un sistema de administración para una flota de vehículos, aplicando nuevamente los principios de la Programación Orientada a Objetos. Este proyecto se centrará en el diseño y la implementación de dos clases interactivas, que trabajarán en conjunto para gestionar eficientemente una flota de vehículos.

	Dentro de las capacidades de nuestro sistema, incluiremos métodos para generar nuevos vehículos a la flota, lo que nos permitirá expandir y diversificar nuestras opciones de alquiler. Además, desarrollaremos funcionalidades para el alquiler de vehículos, brindando a los clientes la posibilidad de elegir entre diferentes tipos de vehículos según sus necesidades.

	Otra característica clave será la gestión de la devolución de vehículos. Este método facilitará el proceso de retorno de los vehículos alquilados, asegurando un control eficiente y organizando la flota.

	Este proyecto no solo fortalecerá nuestra comprensión y habilidad en POO, sino que también nos proporcionará valiosas lecciones sobre cómo las clases pueden interactuar para administrar operaciones complejas en un entorno empresarial real.

2. **Práctica**

	Con este proyecto buscaremos facilitar la posibilidad de alquilar coches que tengamos disponibles, teniendo también la posibilidad de tenerlos o no disponibles con base en si alguno se encuentra alquilado o no, por lo que alguien puede alquilarlo y devolverlo tiempo después.

	Comenzaremos creando nuestra clase *Vehiculo*, donde para su constructor contemplaremos *matricula* y *modelo* como argumentos que pasaremos y serán asignados como atributos, además internamente asignaremos el atributo *disponible*, donde por defecto lo consideraremos en *True*, ya que inicialmente todos los coches que se generen, pues van a estar disponibles.

	<img src="/apuntes/python-desde-cero/img-619.webp" alt="Captura de los apuntes" width="475" height="182" decoding="async">

	*Clase Flota:*

	Una cosa sería los vehículos que vayamos generando con la clase anterior, pero cada uno de estos se irá almacenando en una *Flota* de vehículos, la cual será esta clase.

	A la hora de crear nuestra clase *Flota*, nuestro constructor no contemplará ningún argumento que le vayamos a pasar, pero sí iniciará un atributo *vehiculos* el cual será una lista que almacenará a todos los vehiculos de nuestra flota.

	<img src="/apuntes/python-desde-cero/img-620.webp" alt="Captura de los apuntes" width="320" height="117" loading="lazy" decoding="async">

	Ahora, realizando la comprobación de que este script se está ejecutando directamente, vamos a crear una instancia de nuestra clase flota y ya estaremos contemplando el método *agregar_vehiculo*:

	<img src="/apuntes/python-desde-cero/img-621.webp" alt="Captura de los apuntes" width="346" height="124" loading="lazy" decoding="async">

	De esta manera, ahora definiríamos en nuestro método *agregar_vehiculo* que le podremos pasar como argumento un atributo y este atributo será el propio objeto de un vehiculo el que se almacenará en la lista:

	<img src="/apuntes/python-desde-cero/img-622.webp" alt="Captura de los apuntes" width="715" height="319" loading="lazy" decoding="async">

	Con esto ya estaríamos almacenando dos objetos.

	*Listar la flota inicial:*

	Para listar la flota inicial, jugaremos listando directamente nuestra instancia de la clase *Flota*, en esta haremos algo similar al proyecto anterior, donde utilizamos un método para mostrar el contenido mediante su iteración, realmente estaríamos efectuando lo mismo, pero ahora directamente en el método especial *\_\_str\_\_* y lo haremos con un *join()*, donde representaremos la información con un salto de línea:

	<img src="/apuntes/python-desde-cero/img-623.webp" alt="Captura de los apuntes" width="639" height="74" loading="lazy" decoding="async">

	La idea es que esto nos va a representar cada objeto con un salto de línea. Esto de primeras daría error, ya que en ningún momento estamos realizando directamente un print al objeto para acceder a su método *\_\_str\_\_*, por lo que tendremos que aplicárselo directamente para que nos retorne la forma que vamos a definir en nuestro método especial de la clase Vehiculo:

	<img src="/apuntes/python-desde-cero/img-624.webp" alt="Captura de los apuntes" width="749" height="419" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-625.webp" alt="Captura de los apuntes" width="462" height="90" loading="lazy" decoding="async">

	Al funcionar correctamente, solo nos quedaría definir el método especial *\_\_str\_\_* que representaría a cada vehiculo por individual. La forma en la que representaremos la información será: *Vehiculo(matriculo=X, modelo=Y, disponible=True/False)*

	<img src="/apuntes/python-desde-cero/img-626.webp" alt="Captura de los apuntes" width="1051" height="83" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-627.webp" alt="Captura de los apuntes" width="701" height="217" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-628.webp" alt="Captura de los apuntes" width="708" height="158" loading="lazy" decoding="async">

	Con esto ya veríamos la información, tal como lo esperamos.

	*Alquilar un vehículo:*

	Ahora, para alquilar un vehículo, crearíamos el método *alquilar_vehiculo* para nuestra clase *Flota*, al cual le pasaremos como argumento el número de matrícula y mediante la iteración de la lista tendremos que verificar si está disponible un coche con la matrícula que indicamos:

	<img src="/apuntes/python-desde-cero/img-629.webp" alt="Captura de los apuntes" width="525" height="362" loading="lazy" decoding="async">

	Ahora de aquí, para ese vehículo, cuando se haya verificado que si existe uno con esa matrícula, ahora para nuestro objeto mandaremos llamar a un método *alquilar()* propio de la clase *Vehiculo*, este se encargará de que si nuestro vehiculo sé en cuenta como un vehiculo disponible nos cambiará su estatus a *False* o no disponible, de no ser así nos mostraría un mensaje por pantalla indicando que este vehiculo no se puede alquilar:

	<img src="/apuntes/python-desde-cero/img-630.webp" alt="Captura de los apuntes" width="964" height="119" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-631.webp" alt="Captura de los apuntes" width="754" height="587" loading="lazy" decoding="async">

	En nuestro método *alquilar_vehiculo*, asegúrenos de que la comparación que se realiza entre matrículas sea con \=\=. De esta manera evitariamos el error que da.

	 Finalmente, volveremos a ver la flota, para verificar que, en este caso, el automóvil Toyota ha sido colocado en "False":

	<img src="/apuntes/python-desde-cero/img-632.webp" alt="Captura de los apuntes" width="832" height="571" loading="lazy" decoding="async">

	Ahora tendremos en cuenta un método *devolver_vehiculo*. Este no tendrá en cuenta la matrícula para volver a colocarla en *True*, de que este vuelve a estar disponible porque ha sido regresado. Para ello utilizaremos el contenido del método *alquilar_vehiculo*, ya que este sera muy similar. La diferencia será que, en lugar de llamar a *alquilar*, tendría que llamar a *devolver*, donde regresará el valor booleano a *True:*

	<img src="/apuntes/python-desde-cero/img-633.webp" alt="Captura de los apuntes" width="1040" height="623" loading="lazy" decoding="async">

	Finalmente, la forma en la que mandamos al método e imprimiremos nuevamente la flota para ver cómo regresamos a un estado donde ha sido devuelto:

	<img src="/apuntes/python-desde-cero/img-634.webp" alt="Captura de los apuntes" width="809" height="813" loading="lazy" decoding="async">

	De esta manera, en el último ejemplo, realmente en caso de que un vehiculo esté en *True*, quiere decir que el vehículo ya está en la flota y aún no ha sido alquilado a nadie.
