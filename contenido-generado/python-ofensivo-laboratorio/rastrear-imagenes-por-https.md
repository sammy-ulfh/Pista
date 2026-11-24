---
curso: "python-ofensivo-laboratorio"
modulo: "python-ofensivo-laboratorio/interceptar-trafico"
leccion: "rastrear-imagenes-por-https"
titulo: "Rastrear imágenes por HTTPS"
orden: 5
minutos: 3.3
idioma: "es"
riesgo: "alto"
fuente: "notes-tecnologia"
imagenes: 5
ejercicios: []
---

Crearemos un rastreador de imágenes por HTTPS utilizando mitmdump, usualmente conocido como HTTPS Image Sniffer. Tras encontrarnos en un esquema de **MITM** con el control del tráfico de nuestra víctima, buscaremos filtrar aquel tráfico sobre el que viajen imágenes y almacenarlas para tener la posibilidad de visualizarlas. Estas imágenes usualmente vienen del lado del servidor, por lo que se encontrarán en la respuesta.

## Práctica

En esta ocasión trabajaremos únicamente con la respuesta del servidor, por ende importamos http de la librería **mitmproxy**. Con ello, ahora trabajaremos con la función **response**. 

Esta recibe un paquete como argumento el cual nos pasa **mitmproxy**. De esta extraeremos el header **content-type**. Este header es clave, ya que es una cabecera que indica qué tipo de información está siendo enviada por el servidor y tiene un formato como "application/json", "image/png". 

Para recuperar los header es con **packet.response.headers**, pero en este caso, al querer únicamente el de content-type, vamos a utilizar **get** que puede recibir dos argumentos. El primero es el header que deseamos recuperar y el segundo es para asignar un valor en caso de que nos retorne un **None** que sería en aquellos paquetes que no contienen este valor. 

Esto es necesario para evitar errores al aplicar el split mediante el **/**:

<img src="/apuntes/python-ofensivo-laboratorio/https-image-sniffer-001.webp" alt="Captura de los apuntes" width="755" height="158" decoding="async">

En este caso nos enfocaremos en  deparar ambas primeramente y almacenar el segundo que podria ser la extension con la que almacenariamos la imagen, pero en caso de ser jpeg lo cambiaremos por jpg:

<img src="/apuntes/python-ofensivo-laboratorio/https-image-sniffer-002.webp" alt="Captura de los apuntes" width="756" height="101" loading="lazy" decoding="async">

Con ello podremos comprobar si **image** se encuentra dentro de nuestra lista que tiene los valores del header, si es así, quiere decir que estamos frente a una petición que se respondió con una imagen, por ello dentro de esto aplicando un **try**, ya que pueden llegar a surgir errores al guardar los datos de la imagen. 

Primeramente, recuperaremos el url de la petición utilizando **packet.request.url**, con el fin de que este sea el nombre, además reemplazaremos los **:** y **/** por **\_**. También recuperaremos el contenido del paquete que vendrían siendo los datos de la imagen para almacenarla. Estos se recuperan con **packet.response.content**:

<img src="/apuntes/python-ofensivo-laboratorio/https-image-sniffer-003.webp" alt="Captura de los apuntes" width="738" height="111" loading="lazy" decoding="async">

Finalmente, si recuperamos contenido, almacenaremos todo dentro de una carpeta **images** que tendremos que crear en el directorio actual para evitar errores con ello. El nombre será nuestra variable name y al final le agregaremos la extensión, para después imprimir su contenido y un mensaje que indique que se ha almacenado una imagen.

<img src="/apuntes/python-ofensivo-laboratorio/https-image-sniffer-004.webp" alt="Captura de los apuntes" width="582" height="168" loading="lazy" decoding="async">

Con esto ya estaría listo. Siguiendo el mismo principio del certificado ya instalado en nuestra máquina víctima con el proxy habilitado hacia nuestra IP, ejecutaremos **mitmdump** con nuestro script y veremos cómo va capturando las imágenes:

<img src="/apuntes/python-ofensivo-laboratorio/https-image-sniffer-005.webp" alt="Captura de los apuntes" width="1669" height="547" loading="lazy" decoding="async">
