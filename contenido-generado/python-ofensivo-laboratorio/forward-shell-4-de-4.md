---
curso: "python-ofensivo-laboratorio"
modulo: "python-ofensivo-laboratorio/control-remoto"
leccion: "forward-shell-4-de-4"
titulo: "Forward shell (4 de 4)"
orden: 17
minutos: 2
idioma: "es"
riesgo: "alto"
fuente: "notes-tecnologia"
imagenes: 3
ejercicios: []
---

Si buscamos imprimir ahora el comando, es importante considerar que nuestro comando llegará hasta un elemento antes del último y comenzará a partir del tercer elemento. Esto se debe a que el primero será una cadena vacía **''**, mientras que el segundo será el propio comando que ejecutamos, por lo tanto, el tercero será donde inicie nuestro comando. 

Con ello en mente, tomaremos a partir del tercer elemento hasta el penúltimo, lo cual lo haríamos con **\[2:-1]**:

<img src="/apuntes/python-ofensivo-laboratorio/058.webp" alt="Captura de los apuntes" width="641" height="259" decoding="async">

Con ello, ahora ya lo tendríamos totalmente funcional:

<img src="/apuntes/python-ofensivo-laboratorio/059.webp" alt="Captura de los apuntes" width="1677" height="556" loading="lazy" decoding="async">

Bastaríamos con eliminar el print que nos muestra la lista para observar que concuerde correctamente y que sí estemos tomando todos los elementos del output del comando ejecutado. Como aquí no estamos colocando la traza de la pseudo terminal, podríamos colocarlo antes de cada comando, copiando el primero de cuando se inicia la pseudo terminal o colocándolo en la misma lista para el **join**:

<img src="/apuntes/python-ofensivo-laboratorio/060.webp" alt="Captura de los apuntes" width="1024" height="357" loading="lazy" decoding="async">

Ya por último, para nuestra Shell, podríamos agregar que cuando nos encontremos en una pseudo terminal y escribamos el comando **exit**, nos cambie a **False** el contenido del atributo **is_pseudo_terminal** y además de evitar que se imprima el output del comando y en su lugar mostrar un mensaje como que se ha salido de la pseudo terminal. 

De esta manera, realmente ya lo tendremos e incluso podríamos agregar cosas, como una enumeración de archivos buscando aquellos que tengan permisos especiales como el SUID, lo cual podremos hacer enviando un comando ```find / -perm -4000 2>/dev/null | xargs ls -l``` 

Esto ya lo podremos gestionar en nuestra Shell para que el usuario pueda efectuar esto únicamente utilizando un comando dado por nosotros, tal como **enum suid**, con lo cual ya tendríamos la posibilidad de incluso crear un C&C dentro de nuestra misma Forward Shell.

## Fin de las notas ;D
