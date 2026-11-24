---
curso: "python-desde-cero"
modulo: "python-desde-cero/proyectos"
leccion: "proyecto-de-gestion-de-notas-2-de-2"
titulo: "Proyecto de gestión de notas (2 de 2)"
orden: 35
minutos: 10.5
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 24
ejercicios: []
---

1. **Introducción**

	Ahora concluiremos el proyecto de gestor de nostas en Pytho utilizando Pickle. Tras haber sentado las bases es momento de integrar y finalizar todos los componentes de nuestro sistema. Vamos a revisar y perfeccionar las clases principales, asegurándonos de que todas las funcionalidades clave, como crear, visualizar, buscar  y eliminar notas, funcionen de manera fluida.

	Un enfoque importante sera la serialización y deserialización con Pickle. Esta técnica es cricual para la persistencia de las notas en el disco, permitiendo que se guarden de forma segura y se recuperen en futuras sesiones del programa.

	Al concluir habremos completado un gestor de notas funcional y eficiente. Este proyecto no solo refuerza las habilidades en programación orientada a objetos y manejo de datos, sino que también nos proporciona experiencia práctica en la creación de aplicaciones Python interactivas y robustas.

2. **Práctica**

	Ahora, en nuestro archivo principal *main.py*, pasaríamos a nuestra opción *2*, la cual sería para leer todas las notas, entonces lo que tendremos que hacer será llamar un método *leer_notas* de nuestra clase *GestorNotas*, recordando que tenemos la instancia *gestor*.

	<img src="/apuntes/python-desde-cero/img-659.webp" alt="Captura de los apuntes" width="407" height="67" decoding="async">

	Con ello ahora en nuestra clase *GestorNotas* definiríamos el método *leer_notas*, el cual no recibe ningún argumento y lo que este hará será retornar la lista de las notas, ya no se tendría que aplicar deserializacion debido a que esto se aplica en el momento en el que se crea la instancia de la clase, dentro del propio constructor.

	<img src="/apuntes/python-desde-cero/img-660.webp" alt="Captura de los apuntes" width="309" height="73" loading="lazy" decoding="async">

	Recordemos que la definición de cualquier método normal tendrá que tener siempre como parámetro el propio objeto referenciado con *self*, así que también se tiene que agregar en nuestro método: *leer_notas(self)*.

	Con esto, ahora en nuestro archivo *main.py*, en la opción de leer notas, pues recibiremos la lista de objetos, lo que haremos con esto será jugar con enumerate, iniciando en 1, para que puedamos tomar el número de objetos que se le da con enumerate a partir del 1 y como segundo valor tomar el argumento y por cada iteración mostrarlo:

	<img src="/apuntes/python-desde-cero/img-661.webp" alt="Captura de los apuntes" width="528" height="159" loading="lazy" decoding="async">

	De esta manera, al ejecutarlo veríamos lo siguiente:

	<img src="/apuntes/python-desde-cero/img-662.webp" alt="Captura de los apuntes" width="546" height="411" loading="lazy" decoding="async">

	Configuraríamos enumerate para que inicie en 1:

	<img src="/apuntes/python-desde-cero/img-663.webp" alt="Captura de los apuntes" width="512" height="162" loading="lazy" decoding="async">

	De esta manera, ahora, al agregar más notas y mostrarlas, las veríamos así:

	<img src="/apuntes/python-desde-cero/img-664.webp" alt="Captura de los apuntes" width="650" height="370" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-665.webp" alt="Captura de los apuntes" width="578" height="469" loading="lazy" decoding="async">

	Ahora, vemos los objetos de las notas representados como tal, para que su representación sea dando la información tendremos que definir en método especial *\_\_str\_\_* en nuestra clase *Nota* la cual está en nuestro módulo *notas*.

	Buscaremos retornar directamente la nota, lo cual es una cadena, y finalmente quedaría el método especial así:

	<img src="/apuntes/python-desde-cero/img-666.webp" alt="Captura de los apuntes" width="386" height="215" loading="lazy" decoding="async">

	Y al mostrar las notas ahora lo veríamos correctamente:

	<img src="/apuntes/python-desde-cero/img-667.webp" alt="Captura de los apuntes" width="521" height="506" loading="lazy" decoding="async">

	*Opción 3: buscar por una nota*

	Comenzaríamos definiendo nuestra tercera opción de nuestro panel principal, para cuando selecciones 3, entre en este. Aquí definiremos la variable *texto_busqueda*, donde mediante un input almacenaremos texto que ingresara el usuario, donde se espera que el usuario ingrese cierta cantidad de texto de una nota, para internamente realizar una validación de si internamente existe una nota que contenga ese texto.

	De una forma sencilla haríamos referencia a un método *buscar_nota*, a este le pasaremos como argumento el texto que el usuario ingrese y lo que el método retorne lo almacenaremos en *nota*, lo cual luego mostraremos con un *print()*:

	<img src="/apuntes/python-desde-cero/img-668.webp" alt="Captura de los apuntes" width="919" height="154" loading="lazy" decoding="async">

	*Método buscar_nota:*

	Este método lo definiríamos en nuestra clase *GestorNotas*, donde recibirá el argumento del texto de búsqueda, aquí lo que haremos será iterar en toda la lista que tiene las notas y por cada nota tendremos que hacer una validación donde si el *texto_busqueda* se encuentra dentro del atributo *contenido* de alguno de los objetos, esta validación la podremos realizar verificando si algún texto o palabra está dentro de una cadena, con *if "Hola" in "Hola mundo"*, esto devolvería *True*, ya que "Hola" si está dentro de la cadena "Hola mundo".

	De esta manera almacenaremos cada match en una lista y al final retornaremos la lista:

	<img src="/apuntes/python-desde-cero/img-669.webp" alt="Captura de los apuntes" width="535" height="210" loading="lazy" decoding="async">

	Esto funcionaria, pero nos mostraría la lista, lo cual podríamos llegar a cambiar utilizando *.join()*, pero en este caso ahora veremos como realizarlo con una lista de comprensión.

	<img src="/apuntes/python-desde-cero/img-670.webp" alt="Captura de los apuntes" width="751" height="84" loading="lazy" decoding="async">

	De esta manera estamos haciendo exactamente lo mismo, pero para tenerlo mejor estructurado, para cada instancia de la clase *Nota*, crearemos el método *coincide* al que estamos haciendo referencia, de esta manera exactamente la misma validación la aplicaríamos con un método propio de la clase y solo retornaríamos *True* o *False*.

	<img src="/apuntes/python-desde-cero/img-671.webp" alt="Captura de los apuntes" width="706" height="69" loading="lazy" decoding="async">

	Que al final sería lo mismo que:

	<img src="/apuntes/python-desde-cero/img-672.webp" alt="Captura de los apuntes" width="452" height="77" loading="lazy" decoding="async">

	Ahora, para el mostrar el contenido, podríamos hacerlo de la misma que en nuestra opción 2, ya que nos es regresada una lista la cual se puede iterar.

	<img src="/apuntes/python-desde-cero/img-673.webp" alt="Captura de los apuntes" width="918" height="204" loading="lazy" decoding="async">

	Es importante agregar los ':' en el bucle for, ya que en la imagen no está agregado.
	Teniendo como resultado para nuestras búsquedas:

	<img src="/apuntes/python-desde-cero/img-674.webp" alt="Captura de los apuntes" width="702" height="558" loading="lazy" decoding="async">

	*Eliminar una nota*

	Ahora tendríamos que agregar la opción de eliminar una, la cual sería el '4' dentro de nuestro condicional, lo que tendremos pensado aquí será que el usuario nos ingrese el índice del objeto y con ello eliminar esa nota.

	En nuestro condicional para la condición, cuando nuestra opción sea igual a 4, solicitaremos un input del usuario, cuál será un número, este será una entrada numérica, pero aquí también aplicaremos un *try* para lanzar una excepción en caso de que algo salga mal y lo colocaremos dentro de un bucle para que continue hasta que el usuario ingrese un número:

	<img src="/apuntes/python-desde-cero/img-675.webp" alt="Captura de los apuntes" width="939" height="299" loading="lazy" decoding="async">

	Aquí lo que estamos haciendo es realizar una validación doble, primeramente manejamos una excepción en caso de que el usuario ingrese un tipo de dato que no sea numérico, pero una vez se ingrese un número, este podría ser menor a cero, por la forma en que lo verificaremos requeriremos que sea como se muestran las notas, que es del 1 hacia arriba y ya internamente nos encargaremos de restarle un número para que sea el índice correspondiente.

	Por ende, si el número es cero o menor a cero, se aplicará un continue para que vuelva a regresar al inicio del bucle y lanzará un mensaje donde indique que el número se tiene que ingresar mayor a 0.

	Luego haremos referencia a nuestro método *eliminar_nota* de nuestra instancia *gestor* al cual le pasaremos como argumento el número correspondiente que el usuario indico y le restaremos 1 para que corresponda al índice.

	<img src="/apuntes/python-desde-cero/img-676.webp" alt="Captura de los apuntes" width="300" height="50" loading="lazy" decoding="async">

	Y crearemos el método *eliminar_nota* en nuestra clase *GestorNota*:

	<img src="/apuntes/python-desde-cero/img-677.webp" alt="Captura de los apuntes" width="639" height="129" loading="lazy" decoding="async">

	Esta sería la forma de aplicarlo con una excepción, pero también podríamos aplicarlo donde se calcule el número total de elementos que contiene la lista y a este restarle 1 para que sea el último índice, si el índice dado por el usuario es mayor al calculado con *len()*, entonces no se podrá eliminar, ya que daría un *IndexError*:

	<img src="/apuntes/python-desde-cero/img-678.webp" alt="Captura de los apuntes" width="659" height="123" loading="lazy" decoding="async">

	Esto parece estar bien, pero aún nos falta guardar los cambios en nuestro archivo al momento en el que se borran las notas de la lista, por ende reutilizaremos nuestro método *guardar_notas*:

	<img src="/apuntes/python-desde-cero/img-679.webp" alt="Captura de los apuntes" width="626" height="138" loading="lazy" decoding="async">

	Finalmente tendríamos lo siguiente:

	<img src="/apuntes/python-desde-cero/img-680.webp" alt="Captura de los apuntes" width="453" height="505" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-681.webp" alt="Captura de los apuntes" width="598" height="383" loading="lazy" decoding="async">

	<img src="/apuntes/python-desde-cero/img-682.webp" alt="Captura de los apuntes" width="472" height="488" loading="lazy" decoding="async">

	Con esto ya estará finalizado el último proyecto de POO.
