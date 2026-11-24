---
curso: "python-practico"
modulo: "python-practico/apps-de-escritorio"
leccion: "desarrollo-de-aplicaciones-gui-avanzado-con-customtkinter"
titulo: "Desarrollo de aplicaciones GUI avanzado con CustomTkinter"
orden: 21
minutos: 4.9
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 7
ejercicios: []
---

1. **Introducción**

	**CustomTkinter** es una extensión de la conocida biblioteca Tkinter de Python, diseñada para facilitar la creación de interfaces gráficas de usuario (GUI) con un estilo más moderno y personalizable. A continuación se detallan sus características y diferencias con respecto a tkinter tradicional:

	**Características de CustomTkinter**

	- **Estilo Moderno y Personalizable:** CustomTkinter ofrece widgets con un diseño más moderno y atractivo en comparación con los estándares de Tkinter. Estos widgets pueden personalizarse ampliamente en términos de colores, formas y efectos visuales.
	  </br>
	- **Facilidad de Uso:** Mantiene la simplicidad y facilidad de uso de Tkinter, permitiendo a los desarrolladores crear interfaces gráficas de manera intuitiva, pero con aspecto visual más atractivo y profesional.
	  </br>
	- **Compatibilidad:** Es compatible con el código Tkinter existente, lo que permite a los desarrolladores mejorar las interfaces de aplicaciones existentes sin necesidad de reescribir todo desde cero.
	  </br>
	- **Widgets Mejorados:** Incluye versiones mejoradas de los widgets estándar de Tkinter, como botones, etiquetas, campos de texto, etc. Con mejoras en la interactividad y el diseño.

	**Diferencias con Tkinter**

	- **Diseño Visual:** La diferencia más notable es el estilo visual. CustomTkinter proporciona un aspecto más moderno y elegante, mientras que Tkinter tiene un aspecto más tradicional y básico.
	  </br>
	- **Personalización de Widgets:** CustonTkinter permite una mayor personalización en la apariencia de los widgets, como temas oscuros, bordes redondeados, y efectos de animación, que no están disponibles directamente en Tkinter estándar.
	  </br>
	- **Facilidad de Transición:** Aunque CustonTkinter es una extensión, los desarrolladores familiarizados con Tkinter encontrarán la transición suave, ya que muchos de los conceptos y estructuras son similares.
	  </br>
	- **Comunidad y Soporte:** Tkinter al ser una biblioteca más antigua y establecida, tiene una comunidad más grande y una amplia gama de recursos y documentación. CustomTkinter, siendo más nuevo, está en proceso de crecimiento en términos de comunidad y recursos disponibles.

	En resumen, CustomTkinter se posiciona como una excelente opción para los desarrolladores que buscan mejorar la estética y la funcionalidad de sus interfaces gráficas en Python, manteniendo al mismo tiempo la simplicidad y la familiaridad de Tkinter.

	</br>
2. **Práctica**

	CustomTkinter cuenta con su propia [documentación](https://customtkinter.tomschimansky.com/documentation/)

	**Instalación**

	Para instalarlo tendremos que utilizar pip, instalando así CustomTkinter:

	```shell
	pip install customtkinter  
	```

	Estando en la documentación oficial, podríamos dirigirnos al tutorial y a principiante, donde se encuentra toda la documentación perfectamente explicada, si vemos el ejemplo de [grid system](https://customtkinter.tomschimansky.com/tutorial/grid-system), el cual es el primero.

	Observaremos cómo la sintaxis es muy similar a la de Tkinter:

	<img src="/apuntes/python-practico/img-1099.webp" alt="Captura de los apuntes" width="971" height="464" decoding="async">

	Lo cual podríamos ejecutar y observaremos que es lo mismo con una mejor estética visual:

	<img src="/apuntes/python-practico/img-1100.webp" alt="Captura de los apuntes" width="905" height="570" loading="lazy" decoding="async">

	**Ejemplos**

	Para ver algunos ejemplos cloraneros el [repositorio](https://github.com/TomSchimansky/CustomTkinter) de custontkinter, una vez clonado, entramos en la carpeta e instalaremos con el parámetro **\-r** todo lo del archivo **requirements.txt**:

	**clonar repositorio**
	```shell
	git clone https://github.com/TomSchimansky/CustomTkinter
	```

	**Instalar requerimientos**

	```shell
	pip install -r requirements.txt 
	```

	Para observar algunos ejemplos, podremos meternos a la carpeta **examples** y aquí primeramente ejecutaremos el archivo **scrollable_frame_example.py**. Veremos que esto nos abre una ventana con 3 espacios de scroll, con diferentes tipos de seleccionables y nos retornara la información en terminal:

	<img src="/apuntes/python-practico/img-1101.webp" alt="Captura de los apuntes" width="1465" height="575" loading="lazy" decoding="async">

	En el caso anterior fue necesaria una librería extra que aún no teníamos en el sistema, la cual es **pillow** por ello se instala con pip y ya funciona sin problemas.

	Podremos ver otro ejemplo como el **image_example.py**:

	<img src="/apuntes/python-practico/img-1102.webp" alt="Captura de los apuntes" width="1023" height="571" loading="lazy" decoding="async">

	O otro ejemplo muy interesante, el cual es un login y este será el archivo **example_background_image.py**:

	<img src="/apuntes/python-practico/img-1103.webp" alt="Captura de los apuntes" width="945" height="651" loading="lazy" decoding="async">

	Y si hacemos el intento de logueo, pues la aplicación estará preparada para tomar la información, mostrarla en terminal y llevarnos a otra pantalla:

	<img src="/apuntes/python-practico/img-1104.webp" alt="Captura de los apuntes" width="920" height="657" loading="lazy" decoding="async">

	Podremos ver otro ejemplo, el cual es **complex_example.py** y veremos que este ya contiene una mayor cantidad de widgets. Podremos cambiar entre el modo oscuro o claro, escribir en una caja de texto, seleccionar entre un menú, escalar la aplicación completa, etc.

	<img src="/apuntes/python-practico/img-1105.webp" alt="Captura de los apuntes" width="1149" height="614" loading="lazy" decoding="async">

	Incluso si nos pusiéramos a ver algún archivo, observaríamos cómo la sintaxis es muy similar a lo que se ha estado viendo de tkinter, cambiarán algunas cosas y la complejidad será un poco mayor, pero sigue la misma línea.

	Esto ha sido una visión general de las cosas que se pueden hacer con CustomTkinter. Si es algo que deseas aprender y tenerlo en cuenta más a fondo, recuerda que puedes acceder a la propia [documentación](https://customtkinter.tomschimansky.com/documentation/) y aprender muchas cosas muy interesantes por tu cuenta.
