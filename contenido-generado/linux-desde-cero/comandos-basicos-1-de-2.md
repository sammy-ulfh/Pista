---
curso: "linux-desde-cero"
modulo: "linux-desde-cero/comandos"
leccion: "comandos-basicos-1-de-2"
titulo: "Comandos básicos (1 de 2)"
orden: 3
minutos: 5.2
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 9
ejercicios: []
---

- **whoami**

	El comando **whoami** nos sirve para en todo momento saber como que usuario estamos trabajando en el sistema.

- **id**

	<img src="/apuntes/linux-desde-cero/1.webp" alt="Captura de los apuntes" width="1677" height="152" decoding="async">

	El comando id es muy importante, ya que de cara a encontrarnos atacando una máquina puede ser muy importante e interesante ver a qué grupos perece dicho usuario al que en algún punto se logre tener acceso, ya que dependiendo del grupo al que se tenga acceso se podrá realizar alguna escalada de privilegio.

	* **UID**
		El User ID (UID) es el identificador del usuario, cada usuario tendrá un UID distinto en el sistema, pero siempre deberemos tener uno muy en mente. El usuario root (administrador) por defecto siempre tendrá el UID 0 en el sistema.

	- **GID**

		El GID es el identificador del grupo para ese usuario, cuando nosotros creamos un usuario en Linux usualmente de forma automática se le asigna directamente un grupo con su mismo nombre de usuario.

	- **Groups**

		El apartado de groups nos muestra todos los usuarios a los cuales pertenecemos. Los grupos son creados con el propósito de una mayor seguridad en el sistema, siempre y cuando se gestionen correctamente.

		El estar dentro de ciertos grupos nos permitirá realizar mayores cosas en el sistema.

- **sudo su**

	El comando **sudo su** nos permite cambiar de nuestro usuario al usuario root en el sistema, esto sucederá siempre y cuando nuestro usuario no privilegiado este agregado dentro del grupo root, lo cual sería un privilegio para un usuario normal, permitiéndole convertirse en usuario root con su propia contraseña al utilizar el comando.

	<img src="/apuntes/linux-desde-cero/2.webp" alt="Captura de los apuntes" width="438" height="269" loading="lazy" decoding="async">

- **sudo**

	Con **sudo su** podremos cambiar prácticamente de forma total al usuario privilegiado, pero con **sudo** podremos ejecutar dichos comandos como si del usuario root se tratase, sin necesidad de convertirnos en el usuario root:

	<img src="/apuntes/linux-desde-cero/3.webp" alt="Captura de los apuntes" width="1664" height="248" loading="lazy" decoding="async">

- **exit**

	El comando **exit** nos es de ayuda para casos en donde llegamos a cambiar de usuario o entramos a alguna sesión, lo que nos permitira cerar de alguna manera ese proceso y regresar a lo anterior. Con el usuario root funcionaria de tal manera que nos retornaría de root a nuestro usuario base:

	<img src="/apuntes/linux-desde-cero/4.webp" alt="Captura de los apuntes" width="1666" height="347" loading="lazy" decoding="async">

- **passwd**

	El comando passwd es muy importante de cara a cada usuario de forma individual. Este nos permitirá cambiar nuestra contraseña como usuario, solicitando la actual y después la nueva contraseña a colocar:

	<img src="/apuntes/linux-desde-cero/5.webp" alt="Captura de los apuntes" width="446" height="230" loading="lazy" decoding="async">

- **which** || **command \-v**

	Los comandos que ejecutamos el sistema los reconoce automáticamente. Sin embargo, **which** es de mucha ayuda para saber donde se encuentra realmente el comando, script o aplicación que lleguemos a ejecutar.

	Este nos retorna la ruta absoluta de donde está almacenado realmente. No hay diferencia entre usar la ruta absoluta o directamente solo el nombre del comando.

	La ejecución directa de un comando, sin especificar su ruta total (absoluta), se le conoce como ejecución de comando mediante ruta relativa.

	<img src="/apuntes/linux-desde-cero/temario-7.webp" alt="Captura de los apuntes" width="229" height="107" loading="lazy" decoding="async">

	¿El sistema como determina en donde se encuentra el comando que quiero ejecutar?

	Esto es gracias a las variables de entorno, las cuales son variables con contenido que el sistema tiene en consideración para su funcionamiento correcto dentro de la terminal.

	En este caso la que considera es el PATH, esta contiene muchas rutas en las cuales en un orden de izquierda a derecha, separadas por dos puntos, va revisando hasta encontrar el binario/aplicación a ejecutar.

	La variable de entorno del PATH se encuentra configurada dentro del archivo de configuración de nuestra terminal, el cual si nunca hemos configurado nuestro entorno será **.bashrc** y estará en el directorio **home** del usuario.

- **cat**

	El comando **cat** nos permite listar/mostrar dentro de la terminal el contenido de un archivo. Este contenido lo visualizaremos de una forma legible siempre y cuando sea un archivo que contenga texto.

	<img src="/apuntes/linux-desde-cero/temario-6.webp" alt="Captura de los apuntes" width="539" height="646" loading="lazy" decoding="async">

- **echo**

	El comando **echo** es técnicamente el print en bash. Podremos imprimir cualquier cadena en terminal, colocándolo dentro de comillas:

	<img src="/apuntes/linux-desde-cero/temario-8.webp" alt="Captura de los apuntes" width="239" height="98" loading="lazy" decoding="async">

	Además , nos es posible hacer que al imprimir algo en pantalla se reconozcan los caracteres especiales, para ello se utiliza el parámetro **\-e**:

	<img src="/apuntes/linux-desde-cero/temario-9.webp" alt="Captura de los apuntes" width="329" height="160" loading="lazy" decoding="async">

	En este caso, **\\t** hace referencia a una tabulación dentro del texto, mientras que **\\n** hace referencia a un salto de línea.
