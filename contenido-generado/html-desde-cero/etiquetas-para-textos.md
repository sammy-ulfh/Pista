---
curso: "html-desde-cero"
modulo: "html-desde-cero/html"
leccion: "etiquetas-para-textos"
titulo: "Etiquetas para textos"
orden: 4
minutos: 6.9
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 11
ejercicios: []
---

Mucho del contenido que mostramos en una pagina web es practicamente texto. Es por ello que una de las cosas mas importantes son las etiquetas de utilicemos para textos en html. 

Lo que sucede es que con HTML construimos una maqueta basica de la información que queremos mostrar, mientras con otras tecnologias o lenguajes lo hacemos mas atractivo visualmente o incluso interactivo, que es donde entra el lenguaje de programacion javascript.

### Encabezados

Si bien lo vimos ya, los encabezados son una parte muy importante de nuestro etiquetado en HTML. Tenemos distintos niveles de ancabezado del 1 a el 6, donde el 1 es el mas importante y deberiamos tener solamente uno como el titulo de nuestra pagina, mientras que de los niveles del 2 al 6 si podriamos tener mas de uno.

```html
<h1></h1>
<h2></h2>
<h3></h3>
<h4></h4>
<h5></h5>
<h6></h6>
```

### Parrafos

En HTML podemos definir bloques de texto los cuales seran considerados parrafos con la etiqueta <\p>, lo cual veriamos de la siguiente manera:

```html
<p>
	Mi primer parrafo
</p>
```

Si esto lo colocamos dentro de nuestro body de la pagina que hemos estado construyendo, después de nuestros encabezados, en la pagina lo veriamos de la siguiente manera:

<img src="/apuntes/html-desde-cero/img-007.webp" alt="Captura de los apuntes" width="655" height="376" decoding="async">

Y si copeamos la misma etiqueta con este contenido y la pegamos debajo de la misma, nos quedaria en un parrafo distinto:

<img src="/apuntes/html-desde-cero/img-008.webp" alt="Captura de los apuntes" width="782" height="382" loading="lazy" decoding="async">

Nuestro body hasta ahora lo tendremos de esta forma:

```html
<body>
	<h1>Titulo de mi web</h1>
	<h2>Bienvenidos a mi web</h2>

	<p>
		Mi primer parrafo
	</p>

	<p>
		Mi primer parrafo
	</p>
</body>
```

Existe una página, la cual es [Lorem Ipsum]([Lorem Ipsum - All the facts - Lipsum generator](https://www.lipsum.com/)), de ella podremos generar parrafos de ejemplo y colocarlo en cada una de las etiquetas de parrafo para ver como se verian:

<img src="/apuntes/html-desde-cero/img-009.webp" alt="Captura de los apuntes" width="1743" height="548" loading="lazy" decoding="async">

### Salto de linea

Con html podremos agregar dentro de los párrafos, entre texto o incluso entre elementos, saltos de linea. Esto nos ayuda a mapear de forma distinta, con un salto de linea la información o texto a mostrar. 

La etiqueta que nos ayuda a realizar esto es <\br/>, esta etiqueta, al no tener contenido, no necesita tener una de apertura y una de cierre, por lo que con colocarla tal cual como esta representada nos funcionaria. En este caso dentro de nuestro parrado, podriamos colocarla justo después de un punto, para que asi aplique un salto de linea y lo veamos en nuestra pagina.

```html
<p>
	Esta es mi primera web. <br/>De verdad estoy muy feliz.
</p>
```

Con el ejemplo donde anteriormente ya tenemos un párrafo, al colocarlo lo veríamos de esta forma:

<img src="/apuntes/html-desde-cero/img-010.webp" alt="Captura de los apuntes" width="1578" height="193" loading="lazy" decoding="async">

<img src="/apuntes/html-desde-cero/img-011.webp" alt="Captura de los apuntes" width="795" height="483" loading="lazy" decoding="async">

Esta etiqueta podremos utilizarla las veces que nosotros consideremos y si la utolozamos mas de una vez, se mostraran mas de un salto de linea.

### Salto de linea con division

Podremos realizar un salto de linea, dibujando una linea horizontal como si de una division se tratase. Para lograr esto se utilizaria la etiqueta <\hr/> y se utiliza de la misma forma que <\br> al no llevar contenido.

<img src="/apuntes/html-desde-cero/img-012.webp" alt="Captura de los apuntes" width="1727" height="562" loading="lazy" decoding="async">

De la misma forma que con el salto de línea tradicional, podremos utilizar mas de uno, con la diferencia de que en cada salto de linea dibujara una linea. 

Con esto en mente, en nuestro código ahora podriamos quitar este tipo de salto de linea y colocarlo después de nuestros parrafos a forma de separados, para después agregar un nuevo encabezado de valor 3:

<img src="/apuntes/html-desde-cero/img-013.webp" alt="Captura de los apuntes" width="1717" height="841" loading="lazy" decoding="async">

<img src="/apuntes/html-desde-cero/img-014.webp" alt="Captura de los apuntes" width="1741" height="726" loading="lazy" decoding="async">

### Resaltado en negritas

Como ya vimos anteriormente, la etiqueta <\strong> nos permite que el texto que tenga como contenido se vea de forma resaltada; es por ello, que esto podremos probarlo en el parrafo después de nuestro tercer encabezado:

```html
<strong>Nullam ut tristique lectus. Nulla mollis in sapien non efficitur.</strong>
```

<img src="/apuntes/html-desde-cero/img-015.webp" alt="Captura de los apuntes" width="986" height="142" loading="lazy" decoding="async">

### Texto en cursiva

Similar a strong, se puede utilizar <\em> o <\i>, la diferencia es que esta etiqueta en lugar de mostrar su contenido en negritas, lo que hace es mostrar su contenido en cursivas:

```html
<em>Nulla porttitor libero vel fringilla commodo</em>
<i>Nulla porttitor libero vel fringilla commodo</i>
```

<img src="/apuntes/html-desde-cero/img-016.webp" alt="Captura de los apuntes" width="910" height="135" loading="lazy" decoding="async">

Recordemos que todas aquellas etiquetas que tengan contenido dentro, ocuparan de apertura y cierre. De no ser asi, podrian tener unicamente su apertura, colocando al final un '/' como su propio cierre dentro de la apertura.

### Contenedor de texto

Como ya mencionamos, CSS nos ayuda a estilar nuestra pagina para mejorarla visualmente. Es por ello que existe una forma de realizar pequenos contenedores de texto lo cuales no tienen ninguna accion sobre el texto, pero permiten colocar un identificador o mediante el atributo "class" colocar nombre de clases definidas mediante CSS para una mejora visual.

Para ello se utiliza la etiqueta <\span>.

```html
<span id="texto" class="rojo negritas">Mi texto online</span>
```

El id es un identificador unico de este elemento que encierra a su contenido "Mi texto online" para poder hacer referencia hacia el, ademas de que __class__ permite agregar nombres colocados a una serie de instrucciones de estilos. Por ejemplo, yo creo mi clase a la cual nombro "rojo", dentro de esta defino que mi texto se muestre color rojo.

Cuando asigne este nombre de clase mediante el atributo __class__, hare que el texto que contiene esta etiqueta <\span>, se muestre de color rojo, ya que fue el comportamiento indicado y se lo estoy otrogando a este bloque.

### Contenedor en formato de cita o con un tabulado especial

La etiqueta <\blockquote> nos ayuda a que el texto que esté dentro de la misma se muestre en un formato tipo cita, donde se muestra con una tabulacion especial y el formato se da a notar automaticamente.

```html
<blockquote>
Este es mi texto en un <strong>formato muy lindo</strong>.<em>Recomendado!</em>
</blockquote>
```

Si agregamos lo anterior a nuestro codigo actual o modificamos lo que tenemos, veremos como se notara este formato facilmente:

<img src="/apuntes/html-desde-cero/img-017.webp" alt="Captura de los apuntes" width="718" height="757" loading="lazy" decoding="async">
