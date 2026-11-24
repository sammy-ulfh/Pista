---
curso: "linux-desde-cero"
modulo: "linux-desde-cero/preparar-equipo"
leccion: "instalar-el-sistema"
titulo: "Instalar el sistema"
orden: 2
minutos: 3.7
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 11
ejercicios: []
---

Primeramente, tendremos que ejecutar el instalador que nos dice que instalaremos Debian:

<img src="/apuntes/linux-desde-cero/23.webp" alt="Captura de los apuntes" width="562" height="252" decoding="async">

- **Selección de idioma:**
	<img src="/apuntes/linux-desde-cero/24.webp" alt="Captura de los apuntes" width="1021" height="560" loading="lazy" decoding="async">

- **Selección de zona horaria:**

	<img src="/apuntes/linux-desde-cero/25.webp" alt="Captura de los apuntes" width="1022" height="556" loading="lazy" decoding="async">

- **Selección de teclado:**

	
	<img src="/apuntes/linux-desde-cero/26.webp" alt="Captura de los apuntes" width="1035" height="554" loading="lazy" decoding="async">

- **Particiones:**

	En las particiones no tendremos ningún problema. Bastará con seleccionar **Erase disk** para borrar automáticamente todo el contenido de nuestro disco virtual y automáticamente se instale el sistema con las particiones correspondientes.

	<img src="/apuntes/linux-desde-cero/27.webp" alt="Captura de los apuntes" width="1029" height="561" loading="lazy" decoding="async">

	También tendemos la opción de encriptar el sistema. Si decidimos realizarlo, bastará con seleccionar la casilla y colocar una contraseña. Esta contraseña será clave para iniciar nuestro sistema, ya que la solicitará para poder entrar al sistema al encender la máquina. Puede ser totalmente distinta a la de nuestro login como usuario en el sistema.

- **Información de usuario a nivel de sistema:**

	Ahora tendremos que colocar el nombre de usuario para que nos cree un usuario base sobre el que vamos a trabajar en el sistema. Es algo similar a nuestro usuario en Windows, donde realizamos todas las tareas como un usuario, pero luego podremos realizar algunas tareas o ejecución de aplicaciones específicas como administrados.

	En Linux existe la misma forma de operar e incluso la posibilidad de gestionar de forma más específica y segura los permisos de directorios o archivos.

	<img src="/apuntes/linux-desde-cero/28.webp" alt="Captura de los apuntes" width="1029" height="562" loading="lazy" decoding="async">

	Podremos seleccionar un logueo automático para que no solicite la contraseña cada que iniciemos en el sistema, pero lo mejor será siempre tener que colocar nuestra contraseña.

- **Resumen de configuración:**

	Finalmente, nos será retornado un resumen de toda la configuración del sistema que hemos agregado para  su instalación y, si todo está correcto, comenzaremos la instalación y esperaremos a que finalice.

	<img src="/apuntes/linux-desde-cero/29.webp" alt="Captura de los apuntes" width="1030" height="610" loading="lazy" decoding="async">

	<img src="/apuntes/linux-desde-cero/30.webp" alt="Captura de los apuntes" width="1025" height="614" loading="lazy" decoding="async">

- **Reinicio del sistema:**

	<img src="/apuntes/linux-desde-cero/31.webp" alt="Captura de los apuntes" width="1022" height="596" loading="lazy" decoding="async">

	Finalmente, reiniciamos el sistema y al entrar nuevamente tendremos que loguearnos con nuestra información de usuario:

	<img src="/apuntes/linux-desde-cero/32.webp" alt="Captura de los apuntes" width="1711" height="753" loading="lazy" decoding="async">

	Con esto ya estaría listo, tendremos el sistema instalado en nuestra máquina virtual. Además, una vez instalado, ya podremos eliminar el archivo ISO de nuestro ordenador.

	<img src="/apuntes/linux-desde-cero/33.webp" alt="Captura de los apuntes" width="1717" height="917" loading="lazy" decoding="async">
