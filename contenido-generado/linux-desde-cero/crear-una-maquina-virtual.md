---
curso: "linux-desde-cero"
modulo: "linux-desde-cero/preparar-equipo"
leccion: "crear-una-maquina-virtual"
titulo: "Crear una máquina virtual"
orden: 1
minutos: 5.5
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 15
ejercicios: []
---

## **Creación**

Para instalar otro sistema operativo tendríamos dos alternativas, una de ellas sería eliminar nuestro sistema actual e instalar nativamente Linux. Otra y la más recomendada sería instalar otro sistema dentro de nuestro sistema principal, lo cual es posible mediante virtualización.  

Para empezar con nuestra máquina virtual, en este caso se estará utilizando [VMWARE](https://support.broadcom.com/group/ecx/productdownloads?subfamily=VMware+Workstation+Pro) (link de descarga directo), pero se puede utilizar cualquier aplicación que nos permita virtualizar un sistema.

<img src="/apuntes/linux-desde-cero/6.webp" alt="Captura de los apuntes" width="1468" height="525" decoding="async">

Siendo lo anterior nuestra ventana principal al ejecutar VMware y tendremos que crear una nueva máquina virtual:

<img src="/apuntes/linux-desde-cero/7.webp" alt="Captura de los apuntes" width="497" height="529" loading="lazy" decoding="async">

Seleccionaremos la recomendada y después solicitará un tipo de instalación, para ello le daremos a seleccionar nuestra imagen ISO y buscaremos entre las carpetas la que hemos descargado para instalar el sistema:

<img src="/apuntes/linux-desde-cero/8.webp" alt="Captura de los apuntes" width="495" height="520" loading="lazy" decoding="async">

Como siguiente paso darle a continuar, seleccionaremos que estaremos instalando un Ubuntu de 64 bits, para que no tengamos ningún problema de configuración.

<img src="/apuntes/linux-desde-cero/9.webp" alt="Captura de los apuntes" width="504" height="536" loading="lazy" decoding="async">

Como siguiente paso, veremos donde se almacenara la máquina virtual e incluso podremos modificar su PATH. Además de poder cambiar el nombre.

Es importante mencionar que si llegamos a borrar la máquina virtual de VMware, también tendremos que eliminarla, el directorio que se crea al crear la máquina, ya que este no se elimina directamente.

En este caso le nombraré a la VM **My parrot VM**:

<img src="/apuntes/linux-desde-cero/11.webp" alt="Captura de los apuntes" width="500" height="530" loading="lazy" decoding="async">


Ahora tendremos que asignarle un espacio de disco virtual. Algo recomendado para que no de ningún problema es asignarle 80 GB, ya que es muy difícil de realmente acabarte el ese total de espacio.

Además, seleccionaremos que se guarde el disco virtual en un solo archivo:

<img src="/apuntes/linux-desde-cero/12.webp" alt="Captura de los apuntes" width="491" height="525" loading="lazy" decoding="async">

## **Configuración**

Como pasos finales, podremos configurar la máquina virtual para asignarle ram y una configuración específica de red:

<img src="/apuntes/linux-desde-cero/14.webp" alt="Captura de los apuntes" width="881" height="878" loading="lazy" decoding="async">

Para la memoria RAM lo mínimo recomendado serían 5 GB. Podríamos aumentarlo si lo consideramos bueno y siempre y cuando no afecte al rendimiento de nuestro ordenador en general.

Los procesadores también podremos configurarlos, podríamos asignar varios procesadores y el doble para core processors. En este caso, al mover la configuración, automáticamente nos mencionará si la que estamos colocando no sería buena considerando las capacidades de nuestro ordenador:

<img src="/apuntes/linux-desde-cero/15.webp" alt="Captura de los apuntes" width="881" height="879" loading="lazy" decoding="async">

Finalmente, el apartado de network está seleccionado en NAT, eso quiere decir que tomaría por defecto la IP del propio ordenador.

<img src="/apuntes/linux-desde-cero/16.webp" alt="Captura de los apuntes" width="873" height="482" loading="lazy" decoding="async">
  
La opción recomendada es configurarlo en el apartado BRIDGED y replicar la conexión del host. Esto hará que se tome nuestra VM como un dispositivo aislado dentro de nuestra red local, lo cual dará más seguridad al asignarle una IP propia y privada.

<img src="/apuntes/linux-desde-cero/17.webp" alt="Captura de los apuntes" width="886" height="575" loading="lazy" decoding="async">

Ahora, por verificación:

- Nos iremos a **USB Controller** y nos aseguraremos de que se encuentre en USB 3.0 o mayor, agregando la posibilidad del reconocimiento de USB dentro de nuestra VM.

	<img src="/apuntes/linux-desde-cero/18.webp" alt="Captura de los apuntes" width="768" height="309" loading="lazy" decoding="async">

- Nos iremos al apartado **Display** y nos aseguraremos de que este tenga la aceleración 3D activada.

	<img src="/apuntes/linux-desde-cero/19.webp" alt="Captura de los apuntes" width="740" height="283" loading="lazy" decoding="async">

Finalmente, le damos a **close** y finalizamos la configuración.

## **Ejecución**

Finalmente, nos cargará nuestra máquina virtual y bastará con darle a encender la máquina virtual.

<img src="/apuntes/linux-desde-cero/20.webp" alt="Captura de los apuntes" width="1482" height="860" loading="lazy" decoding="async">

<img src="/apuntes/linux-desde-cero/21.webp" alt="Captura de los apuntes" width="612" height="285" loading="lazy" decoding="async">

Nos saldrá un menú similar al anterior y tendremos que darle a **try/install**.

<img src="/apuntes/linux-desde-cero/22.webp" alt="Captura de los apuntes" width="1715" height="953" loading="lazy" decoding="async">

Con esto ya estaremos dentro del sistema, solo faltará seguir los pasos del instalador...
