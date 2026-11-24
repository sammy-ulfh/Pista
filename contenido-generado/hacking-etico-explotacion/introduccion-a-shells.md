---
curso: "hacking-etico-explotacion"
modulo: "hacking-etico-explotacion/explotacion"
leccion: "introduccion-a-shells"
titulo: "Introducción a Shells"
orden: 13
minutos: 2.5
idioma: "es"
riesgo: "medio"
fuente: "notes-tecnologia"
imagenes: 1
ejercicios: []
---

A lo largo de la explicación de los tipos de shells que se pueden obtener, abordaremos el funcionamiento de las Reverse, Bind y Forward shells.

- __Reverse Shell__: Es una técnica que permite a un atacante conectarse a una máquina remota desde una máquina de su propiedad. Es decir, se establece una conexión desde la máquina comprometida hacia la máquina del atacante. Esto se logra ejecutando un programa malicioso o una instrucción específica en la máquina remota que establece la conexión de vuelta hacia la máquina del atacante, permitiéndole tomar el control de la máquina remota.
- __Bind Shell__: Esta técnica es el opuesto de la reverse shell, ya que en lugar de que la máquina comprometida se conecte a la máquina del atacante, es el atacante quien se conecta a la máquina comprometida. La máquina comprometida se pone en escucha sobre un puerto, ofreciendo una terminal interactiva a cualquier conexión entrante; luego el atacante intenta establecer una conexión y recibe una terminal, lo que le permite tomar el control de la máquina.
- __Forward Shell__: Esta técnica se utiliza cuando no se pueden establecer conexiones Reverse o Bind debido a reglas de Firewall implementadas en la red. Se logra mediante el uso de __mkfifo__, que crea un archivo __FIFO (named pipe)__, que se utiliza como una especie de __consola simulada__ interactiva a través de la cual el atacante puede operar en la máquina remota. En lugar de establecer una conexión directa, el atacante redirige el tráfico a través del archivo FIFO, lo que permite la comunicación bidireccional con la máquina remota.

## Explicación

### Escenario

Cuando nosotros podemos llegar a aprovecharnos de un escenario en el cual podremos obtener uno de estos tipos de shells, es cuando un servidor está ofreciendo una página web y de alguna forma nosotros tuvimos la oportunidad de subir un archivo; en este caso lo consideraremos PHP, que además la web es capaz de interpretar. 

Nuestro script lo que hará es que, tomando un parámetro que le pasemos en la URL, ejecutará eso como comando. De tal manera que tenemos el escenario donde una máquina Linux ofrece una web mediante el puerto 80 y el atacante lo que ve inicialmente es la web.

<img src="/apuntes/hacking-etico-explotacion/shells-001.webp" alt="Captura de los apuntes" width="958" height="359" decoding="async">

Esta pagina o servidor web puede estar siendo levantada por un usuario, generalmente veremos que es el usuario __www-data__, pero también puede ser cualquier usuario en el sistema. Si de algún modo quien levanto el servidor es el usuario __root__, la momento en el que puedamos ejecutar comandos, los ejecutariamos como el usuario __root__. 

Con esto en mente, podremos pasar a ver como podriamos aprovechar cada tipo de shell.

### Shells

- [Reverse Shell](/cursos/hacking-etico-explotacion/reverse-shell)
- [Bind Shell](/cursos/hacking-etico-explotacion/bind-shell)
- [Forward Shell](/cursos/hacking-etico-explotacion/forward-shell)
