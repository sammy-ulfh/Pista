---
curso: "redes-desde-cero"
modulo: "redes-desde-cero/direcciones-y-protocolos"
leccion: "direcciones-mac-oui-y-nic"
titulo: "Direcciones MAC (OUI y NIC)"
orden: 2
minutos: 4.1
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 5
ejercicios: []
---

## Introducción

La dirección MAC es un número hexadecimal de 12 dígitos (número binario de 6 bytes), que está representado principalmente por una *notación hexadecimal* de dos puntos.

Los primeros *6 dígitos* (digamos *00:40:96*) de MAC Address  identifican al fabricante, llamado *OUI* (Identificador Único Organizacional). El comité de autoridad de registro de *IEEE* asigna estos prefijos MAC a sus proveedores registrados.

Los seis dígitos más a la derecha representan al *controlador de interfaz de red*, que es asignado por el fabricante.

Es decir, los primeros *3 bytes* (24 bits) representan el fabricante de la tarjeta, y los últimos *3 bytes* (24 bits) identifican la tarjeta particular de ese fabricante. Cada grupo de *3 bytes* se puede representar con *6 dígitos hexadecimales*, formando un número hexadecimal de 12 dígitos que representa la MAC completa.

Para una búsqueda de fabricante usando direcciones MAC, se requieren al menos los primeros *3 bytes* (6 caracteres) de la dirección MAC. Una de las herramientas que se verán para lograr este fin es **macchanger**, una herramienta de GNU/Linux para la visualización y manipulación de direcciones MAC.

## Práctica

Primeramente, si utilizamos el comando *ifconfig* podremos visualizar nuestra interfaz de red, en este caso la **ens33** donde en el apartado *ether* tendremos una estructura como la siguiente:

<img src="/apuntes/redes-desde-cero/005.webp" alt="Captura de los apuntes" width="792" height="227" decoding="async">

En este caso es **00:0c:29:96:94:37**. Esta estructura es la dirección MAC la cual es de 48 bits y es un identificador el cual corresponde de forma única a una tarjeta o dispositivo de red.

La podremos considerar "única" para cada dispositivo, pero realmente existen herramientas como **macchanger** para cambiar esta dirección.

En cuanto a la estructura respecta, podremos dividirla en dos partes. Los primeros 3 pares son el *OUI* para identificar al fabricante y los últimos 3 pares *NCI* (Network Interface Controller specific) para identificar a esa tarjeta de red de forma única.

### Escaneo en red local

Para esto utilizaremos la herramienta **arp-scan** como usuario *root* y aprovecharemos nuestra interfaz *ens33* para realizar un escaneo de forma local. Para indicar la interfaz de red es mediante el parámetro **\-I** y para indicar qué será en la red local, se indica directamente con **\-\-localnet**

```text
arp-scan -I ens33 --localnet
```

<img src="/apuntes/redes-desde-cero/006.webp" alt="Captura de los apuntes" width="923" height="230" loading="lazy" decoding="async">

Esto nos descubrirá distintos equipos conectados a la red, en este caso los que estén configurados dentro de la máquina virtual, ya que estoy en un entorno virtualizado.

#### ¿Cómo es que al realizar el escaneo puede mostrarnos qué tipo de controlador de red es?

Como se mencionó anteriormente, esto es posible gracias a la primera parte de 3 bytes de nuestra dirección MAC.

Considerando la primera que nos sale en nuestro escaneo, tomaremos el primer apartado *OUI* que es **a0:e7:ae**.

Para ello, tendremos en cuenta la herramienta **macchanger** donde con el parámetro **\-l** podremos listar las organizaciones a las que corresponden ciertas direcciones OUI:

<img src="/apuntes/redes-desde-cero/007.webp" alt="Captura de los apuntes" width="1073" height="632" loading="lazy" decoding="async">

Lo mostrado es una parte del listado y tiene en cuenta una gran cantidad de organizaciones, por ende filtraremos por **Arris group**, donde el filtrado no sea sensible a mayúsculas-minúsculas:

<img src="/apuntes/redes-desde-cero/008.webp" alt="Captura de los apuntes" width="560" height="472" loading="lazy" decoding="async">

Esto nos retorna un listado bastante largo, por lo que, con base en la dirección OUI que nosotros tenemos, podremos realizar otro filtrado para verificar si realmente se encuentra dentro de esta organización:

<img src="/apuntes/redes-desde-cero/009.webp" alt="Captura de los apuntes" width="660" height="88" loading="lazy" decoding="async">

Como observamos, en este caso no nos aparece. Este sería un ejemplo en el que no sería efectiva esta forma para tener conocimiento de a qué nos estamos enfrentando, pero habrá casos en los que sí funcione o incluso que esta dirección haya sido modificada a propósito.
