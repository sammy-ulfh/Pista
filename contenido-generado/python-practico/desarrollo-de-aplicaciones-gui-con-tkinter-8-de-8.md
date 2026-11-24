---
curso: "python-practico"
modulo: "python-practico/apps-de-escritorio"
leccion: "desarrollo-de-aplicaciones-gui-con-tkinter-8-de-8"
titulo: "Desarrollo de aplicaciones GUI con Tkinter (8 de 8)"
orden: 20
minutos: 8.9
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 20
ejercicios: []
---

1. **Introducción**

	En lo siguiente se finalizará la construcción de nuestra aplicación calculadora con interfaz gráfica, además realizando una revisión de los métodos para verificar la funcionalidad final y correcta de nuestra aplicación.
	</br>
2. **Práctica**

	*Método calculate*

	Al hacer esto, cuando ya tengamos una operatoria seleccionada y los dos caracteres de los cuales se calculará esa operación, ahora pasaremos a lo que se realizará cuando presionemos el botón de igual, que se irá al método *calculate*.

	Aqui primeramente se verifica si *current* ya tiene un valor numérico, que sería nuestro segundo número y, además, si *op* ya cuenta con el tipo de operación que se va a realizar. De no tener estos dos, no abra un segundo número con el cual realizar una opción o no abra un tipo de opción a realizar.

	Luego de esta verificación, iremos verificando con condicionales qué tipo de operación se va a realizar. Comenzaremos por la división, donde dividiremos el primer valor *total* entre el segundo *current*, aplicando la conversión current a *float*:

	<img src="/apuntes/python-practico/img-1079.webp" alt="Captura de los apuntes" width="522" height="105" decoding="async">	

	Aplicaríamos esta misma lógica para el resto de operaciones:

	<img src="/apuntes/python-practico/img-1080.webp" alt="Captura de los apuntes" width="537" height="233" loading="lazy" decoding="async">

	Luego de esto, tendríamos que limpiar nuestro display y mostrar el resultado, recordemos que el resultado tendremos que agregarlo al final, para que se nos muestre sin ningún problema a la derecha del todo:

	<img src="/apuntes/python-practico/img-1081.webp" alt="Captura de los apuntes" width="552" height="297" loading="lazy" decoding="async">

	Finalmente, antes de realizar nuestra prueba de que estas operaciones funcionen, tendremos que asegurarnos de que nuestro método que se encarga de limpiar el display cuando se presiona la *C*, limpie todas las variables que se utilizan al efectuar una operación, ademas de eliminar lo que se imprime en terminal, ya que eso lo teniamos para veificar el funcionamiento, teniéndolo de la siguiente manera:

	<img src="/apuntes/python-practico/img-1082.webp" alt="Captura de los apuntes" width="582" height="891" loading="lazy" decoding="async">

	Ahora, si empezamos a practicar operaciones de dos valores, veremos que todo funciona correctamente:

	<img src="/apuntes/python-practico/img-1083.webp" alt="Captura de los apuntes" width="279" height="214" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-1084.webp" alt="Captura de los apuntes" width="279" height="214" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-1085.webp" alt="Captura de los apuntes" width="279" height="214" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-1086.webp" alt="Captura de los apuntes" width="279" height="214" loading="lazy" decoding="async">

	Aqui, si ya efectuamos una operación antes, como 100\/2 y seguimos dándole a igual, los siguientes resultados seguirán dividiéndose entre 2, debido a que se mantienen los valores de *op* y *current*, mientras que la aplicación de la operación va manipulando el valor de *total*:

	<img src="/apuntes/python-practico/img-1087.webp" alt="Captura de los apuntes" width="279" height="214" loading="lazy" decoding="async">

	Para darle un pequeño ajuste, podremos hacerlo al mostrar el resultado. Si efectuamos una división de *5\/7*, esto nos dará bastantes decimales. Para evitar esto en operaciones así, haremos que nos muestre solamente 3 decimales con *round* al momento de mostar el resultado en el display:

	<img src="/apuntes/python-practico/img-1088.webp" alt="Captura de los apuntes" width="279" height="214" loading="lazy" decoding="async">

	<img src="/apuntes/python-practico/img-1089.webp" alt="Captura de los apuntes" width="650" height="299" loading="lazy" decoding="async">

	Con esto aplicado, ahora, si repetimos la división *5\/7*, tendremos lo siguiente:

	<img src="/apuntes/python-practico/img-1090.webp" alt="Captura de los apuntes" width="279" height="214" loading="lazy" decoding="async">

	**Entrada por teclado**

	Ahora todo funciona correctamente cuando utilizamos los botones, pero si intentamos utilizar el teclado no funciona, ya que no registra tecla por tecla, como sería utilizar los botones.

	Por ello utilizaremos un manejador de eventos especiales, que nos permitirá registrar las entradas por teclado y por cada tecla podremos asignarlo al método que ya tenemos que es *click* para enviarle tecla por tecla como lo hacemos con los botones.

	Para ello dentro de nuestro constructor utilizaremos un método especial de la propia ventana, el cual es *bind*, donde como primer argumento le daremos *\<Key\>* que es especialmente para reconocer cuando se presiona una tecla, así como segundo argumento se llamara a un método que crearemos el cual será *press_key*, dentro de este colocaremos un print que solo diga que se ha presionado una tecla y observaremos como cada que presionamos alguna tecla, entra en este método:

	<img src="/apuntes/python-practico/img-1091.webp" alt="Captura de los apuntes" width="549" height="272" loading="lazy" decoding="async">

	En nuestro método, tenemos en cuenta que recibiremos un evento, por lo tanto, utilizamos *event* para recibirlo y trabajar con ello más adelante. Con esto podremos observar cómo al presionar con el mouse sobre el display y empezar a presionar teclas, nos mostrará el mensaje en la terminal:

	<img src="/apuntes/python-practico/img-1092.webp" alt="Captura de los apuntes" width="618" height="260" loading="lazy" decoding="async">

	Dentro de nuestro método, al recibir el evento como *event*, es posible ver la tecla que se está presionando con la propiedad *char*; de esta manera, podremos ver las teclas normales:

	<img src="/apuntes/python-practico/img-1093.webp" alt="Captura de los apuntes" width="580" height="144" loading="lazy" decoding="async">

	Nos mostrará las teclas normales, pero teclas especiales como el *Enter*, *Espacio*, entre otros. Se debe a que estos tienen una representación especial que no será visual si solo lo imprimimos en pantalla:

	<img src="/apuntes/python-practico/img-1094.webp" alt="Captura de los apuntes" width="658" height="490" loading="lazy" decoding="async">

	*Representación de teclas especiales*

	Para estas teclas, tenemos una representación especial. No podremos verlas en pantalla, pero sí realizar comparaciones en nuestro código para comprobar cuál es la tecla que se ha presionado.

	Para ello podremos ver la siguiente tabla:

	<img src="/apuntes/python-practico/img-1095.webp" alt="Captura de los apuntes" width="744" height="852" loading="lazy" decoding="async">

	Si deseamos visualizar esta tabla, nosotros, dentro del sistema operativo Linux bastará con utilizar el comando `man ascii`.

	Podremos ver que la tecla *Enter* se representa como *\\r* o, en su defecto, en hexadecimal, como *\\x0D*. Con esto en mente podremos comprobar estas teclas especiales y representar un mensaje cuando estas sean presionadas:

	<img src="/apuntes/python-practico/img-1096.webp" alt="Captura de los apuntes" width="636" height="205" loading="lazy" decoding="async">

	De esta manera, aqui lo que podremos hacer es que para cada número que se presione, llamar a la misma función que llaman los botones que es *click* y pasarle como argumento el número que se presiona, de esta manera estaríamos teniendo el mismo funcionamiento:

	<img src="/apuntes/python-practico/img-1097.webp" alt="Captura de los apuntes" width="637" height="237" loading="lazy" decoding="async">

	 Con esto listo, ahora para los caracteres especiales, le indicaremos a *Enter* que sea como el igual y llame al método *calculate* y aplicamos un *return* para que salga del método sin ejecutar nada más.

	Para el carácter especial de la tecla *Esc* indicaremos que nos ejecute el método *clear_display* para que nos limpie todo, tal como presionar *C* en los botones.

	Finalmente, para el *Space*, indicaremos que nos cierre la aplicación, en lugar de usar *destroy()* para simplemente cerrar forzadamente la ventana como en la actividad anterior, se utilizara *quit()* para cerrar la aplicación, de una forma menos agresiva.

	<img src="/apuntes/python-practico/img-1098.webp" alt="Captura de los apuntes" width="561" height="350" loading="lazy" decoding="async">

	Con esto ya tendríamos todo el funcionamiento de nuestra calculadora para utilizarla con teclado y los botones, adicionalmente podremos agregarle al constructor que la ventana solo se quede en el tamaño que se le de y que no tenga la posibilidad de tener un resize, mediante `root.resizable(False, False)`. Esto nos funcionaría para que nuestra calculadora únicamente esté en el tamaño que requerimos.

	*resizable* cuenta con dos parámetros, ya que es asignarle que no se pueda hacer resize en el eje X ni en el Y.

	¡Con esto estará totalmente lista nuestra calculadora sencilla con GUI!
