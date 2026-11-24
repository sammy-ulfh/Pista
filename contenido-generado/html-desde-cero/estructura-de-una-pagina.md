---
curso: "html-desde-cero"
modulo: "html-desde-cero/html"
leccion: "estructura-de-una-pagina"
titulo: "Estructura de una página"
orden: 3
minutos: 2.6
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 3
ejercicios: []
---

## Estructura

Existen distintos tipos de etiquetas en HTML, estas etiquetas pueden ser con apertura y cierre o simplemente con apertura.

La etiqueta principal en HTML nos sirve para indicar la version de HTML que vamos a utilizar, en este caso, una de las versiones mas recientes de HTML es HTML5, para indicar que utilizaremos esta version, tendremos que colocar al inicio de nuestro documento la siguiente etiqueta:

```html
<!DOCTYPE HTML>
```

Una pagina web tiene que tener una estructura de envolturas, donde todo esta dentro de una etiqueta principal <\html>, la cual tiene apertura. Esto como estructura  tiene que tener una cabecera <\head> y un cuerpo <\body>, donde generalmente va el cuerpo o contenido de nuestra pagina web.

```html
<!DOCTYPE HTML>
<html>
	<head>
	</head>
	<body>
	</body>
</html>
```

En cuanto a atributos respecta, nosotros en nuestra etiqueta html podremos indicar el lenguaje que estaremos utilizando con el atributo __lang__ y para espanol, utilizaremos __es__.

```html
<!DOCTYPE HTML>
<html lang="es">
	<head>
	</head>
	<body>
	</body>
</html>
```

## Cabecera

### title

Nuestra cabecera o etiqueta <\head> puede llevar contenido que podriamos considerar como configuraciones o datos importantes que no son directamente el contenido de nuestra pagina web. Como configuraciones de codificacion de caracteres, estilos, cierto comportamiento, etc.

Aqui podemos definir cosas como el titulo de nuestra pagina con la etiqueta <\title>:

```html
<!DOCTYPE HTML>
<html>
	<head>
		<title>Mi primera pagina web</title>
	</head>
	<body>
	</body>
</html>
```

Esto hara que ahora en nuestra pagina web, el contenido del titulo en la pestana cambie y ahora muestre el nombre que nosotros le hemos colocado a la pagina:

<img src="/apuntes/html-desde-cero/img-004.webp" alt="Captura de los apuntes" width="361" height="137" decoding="async">

## Cuerpo

El body es el cuerpo de nuestra pagina web, esto quiere decir que es lo que se va a mostrar visualmente en nuestra pagina.

Es por ello que dentro de nuestro cuerpo nosotros ya podriamos agregar un encabezado o titulo <\h1>, donde h1 es el titulo mas grande existente en HTML y h6 es el mas chico.

La idea con h1 es que siempre represente el titulo, por ende lo ideal es que solo hubiese uno. Mientras que a partir del h2 podriamos verlos como distintos tipos de subtitulos para utilizar en distintas partes. Dentro de nuestra etiqueta html podriamos tener nuestro siguiente cuerpo:

```html
<body>
	<h1>Titulo de mi web</h1>
	<h2>Bienvenidos a mi web</h2>
</body>
```

Y esto al mostrarlo en nuestra web, lo tendriamos de la siguiente forma:

<img src="/apuntes/html-desde-cero/img-005.webp" alt="Captura de los apuntes" width="667" height="326" loading="lazy" decoding="async">

Si nosotros en nuestra pagina damos click derecho y seleccionamos __inspeccionar__, veremos como el codigo que se nos muestra es exactamente el que nosotros hemos puesto en el archivo con nuestro editor de codigo:

<img src="/apuntes/html-desde-cero/img-006.webp" alt="Captura de los apuntes" width="667" height="711" loading="lazy" decoding="async">
