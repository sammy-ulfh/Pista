# Temarios de los cursos de muestra

> **SUPUESTO.** Todo este archivo es una propuesta: no hay apuntes reales de estas escuelas. Se escribe un curso de muestra por escuela (Negocios, Comunicación y Habilidades personales). La Escuela de Diseño y Creatividad queda en «próximamente» sin curso de muestra.

Minutos estimados con la misma fórmula que los apuntes reales: palabras/200 + 0,2 min por imagen, más los minutos del ejercicio. Los precios salen de la regla de la sección 9 del informe.

## Sintaxis que deben usar los cursos de muestra

Es el mismo subconjunto que aparece en los apuntes reales, para que el conversor trate igual a ambos.

| Elemento | Cómo se escribe | Por qué |
|---|---|---|
| Archivo de lección | `NN-slug.md` (ej. `01-cliente-ideal.md`), sin espacios ni acentos | El prefijo fija el orden; el nombre ya es el slug |
| Título | `# Título visible` en la primera línea | Las notas reales no tienen frontmatter; el título sale del H1 |
| Secciones | `## Sección` y `### Subsección` | Igual que en los apuntes |
| Texto | párrafos, `**negritas**`, listas `-` y `1.` | Igual que en los apuntes |
| Tablas | tablas Markdown con `\|---\|` | Se usan en los apuntes reales |
| Imágenes | `![[images/NN-nombre.png]]` (ruta relativa a la carpeta del curso, minúsculas, `.png`) | Ruta explícita: evita las imágenes ambiguas del repositorio real |
| Enlace a otra lección | `[[02-donde-encontrarlo\|Dónde encontrarlo]]` | Variante `[[nota\|alias]]`, ya soportada |
| Ejercicio | sección `## Ejercicio` al final | El lector la muestra como caja de ejercicio (pantalla 09); no se usan callouts porque los apuntes reales no los tienen |
| Siguiente lección | sección `## Siguientes apuntes` con `[[NN-slug]]` | Misma convención que 200 notas reales |
| Resaltado | `==texto==` (con moderación) | Lo usan los apuntes reales; se muestra como `<mark>` |
| **No usar** | HTML, callouts `> [!note]`, tags `#tag`, LaTeX, Mermaid, frontmatter | No aparecen (o casi no aparecen) en los apuntes reales |

Plantilla de una lección:

```markdown
# ¿Quién es tu cliente ideal?

Tu cliente ideal no es «todo el mundo». Es una persona concreta…

## Empieza por un problema

Piensa en las últimas tres personas que te pidieron ayuda…

![[images/01-persona-problema-solucion.png]]

## Ejercicio

Completa la frase «Ayudo a ___ que tienen problemas con ___».

## Siguientes apuntes

[[02-donde-encontrarlo|Dónde encontrarlo]]
```

## Tus primeros clientes

- **Escuela / área:** Negocios y Emprendimiento / Conseguir clientes
- **Nivel:** básico · **Lecciones:** 4 · **Duración estimada:** 84 min · **Precio:** $35 MXN
- **Carpeta:** `apuntes-demo/negocios/tus-primeros-clientes/` (lecciones `NN-slug.md`, imágenes en `apuntes-demo/negocios/tus-primeros-clientes/images/`)
- **Subtítulo:** Aprende a encontrar a quién le sirve lo que haces y a pedir tu primera venta sin sentirte incómodo.
- **Lo que aprenderás:**
  - Describir a tu cliente ideal en una frase
  - Saber dónde buscarlo, en línea y en persona
  - Escribir tu primer mensaje sin sonar a spam
  - Pedir la venta y responder a un «lo pienso»

| # | Lección | Objetivo | Palabras | Imágenes / esquemas | Ejercicio | Min |
|---|---|---|---|---|---|---|
| 1 | **¿Quién es tu cliente ideal?**<br>`01-cliente-ideal.md` | Describir en una frase a quién ayudas y con qué problema. | ~1300 | 1. Esquema persona → problema → solución<br>2. Ejemplo de ficha de cliente ideal llena | Completa la frase «Ayudo a ___ que tienen problemas con ___». (10 min) | 16.9 |
| 2 | **Dónde encontrarlo**<br>`02-donde-encontrarlo.md` | Hacer una lista de 10 lugares, en línea y en persona, donde está tu cliente. | ~1400 | 1. Mapa de canales: en línea / en persona<br>2. Tabla de ejemplo con 10 lugares y cuántos clientes hay en cada uno | Llena tu propia tabla de 10 lugares y marca los 3 más prometedores. (15 min) | 22.4 |
| 3 | **Tu primer mensaje**<br>`03-primer-mensaje.md` | Escribir un mensaje corto, personal y con una pregunta clara. | ~1200 | 1. Plantilla de mensaje en 4 partes<br>2. Comparación: mensaje que parece spam vs. mensaje personal | Escribe 3 mensajes con la plantilla y envía uno. (15 min) | 21.4 |
| 4 | **Cómo pedir la venta**<br>`04-pedir-la-venta.md` | Pedir la venta sin presionar y responder a las dudas más comunes. | ~1500 | 1. Guion de 3 pasos para pedir la venta<br>2. Tabla de objeciones frecuentes y cómo responderlas | Ensaya en voz alta la respuesta a «lo pienso» y a «está caro». (15 min) | 22.9 |

## Habla en público sin miedo

- **Escuela / área:** Comunicación / Hablar en público
- **Nivel:** básico · **Lecciones:** 5 · **Duración estimada:** 96 min · **Precio:** $35 MXN
- **Carpeta:** `apuntes-demo/comunicacion/habla-en-publico-sin-miedo/` (lecciones `NN-slug.md`, imágenes en `apuntes-demo/comunicacion/habla-en-publico-sin-miedo/images/`)
- **Subtítulo:** Prepara y da una presentación corta con técnicas sencillas para controlar los nervios.
- **Lo que aprenderás:**
  - Calmar los nervios en dos minutos antes de hablar
  - Ordenar lo que vas a decir con una estructura de inicio, tres ideas y cierre
  - Usar tu voz y tu cuerpo para que te pongan atención
  - Ensayar solo y responder preguntas difíciles

| # | Lección | Objetivo | Palabras | Imágenes / esquemas | Ejercicio | Min |
|---|---|---|---|---|---|---|
| 1 | **Por qué nos ponemos nerviosos**<br>`01-por-que-nos-ponemos-nerviosos.md` | Entender qué le pasa a tu cuerpo y aplicar una respiración que lo calma. | ~1100 | 1. Esquema de lo que pasa en el cuerpo con los nervios<br>2. Guía visual de la respiración 4-4-4 | Practica la respiración 4-4-4 y grábate diciendo tu nombre y tu carrera en 30 segundos. (10 min) | 15.9 |
| 2 | **La estructura de un buen discurso**<br>`02-estructura-del-discurso.md` | Ordenar cualquier presentación en inicio, tres ideas y cierre. | ~1400 | 1. Esquema de la estructura de un discurso<br>2. Plantilla de una hoja para preparar tu presentación | Llena la plantilla para una presentación de 3 minutos sobre un tema de tu carrera. (15 min) | 22.4 |
| 3 | **Tu voz y tu cuerpo**<br>`03-voz-y-cuerpo.md` | Usar el volumen, las pausas, la mirada y las manos a tu favor. | ~1200 | 1. Posturas: sí / no<br>2. Partitura de pausas sobre un párrafo de ejemplo | Grábate 1 minuto, mira el video y anota dos cosas que mejorarías. (15 min) | 21.4 |
| 4 | **Ensayar sin público**<br>`04-ensayar-sin-publico.md` | Planear tres ensayos cortos que sí te preparan. | ~1000 | 1. Calendario de ensayo de 3 días | Haz un ensayo completo con cronómetro y ajusta lo que se pase de tiempo. (15 min) | 20.2 |
| 5 | **El día de la presentación y las preguntas**<br>`05-el-dia-de-la-presentacion.md` | Llegar preparado y responder preguntas aunque no sepas la respuesta. | ~1200 | 1. Lista de revisión para el día<br>2. Esquema para responder una pregunta difícil en 3 pasos | Pide a alguien tres preguntas sobre tu tema y respóndelas con el esquema. (10 min) | 16.4 |

## Tu semana en orden

- **Escuela / área:** Habilidades personales / Productividad
- **Nivel:** básico · **Lecciones:** 4 · **Duración estimada:** 77 min · **Precio:** $35 MXN
- **Carpeta:** `apuntes-demo/habilidades/tu-semana-en-orden/` (lecciones `NN-slug.md`, imágenes en `apuntes-demo/habilidades/tu-semana-en-orden/images/`)
- **Subtítulo:** Descubre a dónde se va tu tiempo y arma una semana realista para estudiar, trabajar y descansar.
- **Lo que aprenderás:**
  - Medir a dónde se va tu tiempo durante tres días
  - Separar lo urgente de lo importante
  - Planear tu semana en 20 minutos
  - Estudiar en bloques cortos con descansos

| # | Lección | Objetivo | Palabras | Imágenes / esquemas | Ejercicio | Min |
|---|---|---|---|---|---|---|
| 1 | **¿A dónde se va tu tiempo?**<br>`01-a-donde-se-va-tu-tiempo.md` | Registrar tres días y encontrar tus «fugas» de tiempo. | ~1000 | 1. Plantilla de registro de tiempo por horas<br>2. Ejemplo de registro lleno con las fugas marcadas | Llena el registro durante tres días. (15 min) | 20.4 |
| 2 | **Prioriza lo importante**<br>`02-prioriza-lo-importante.md` | Ordenar tus pendientes en urgente/importante. | ~1100 | 1. Matriz urgente / importante<br>2. Ejemplo con pendientes de un estudiante | Acomoda tus pendientes de esta semana en la matriz. (10 min) | 15.9 |
| 3 | **Planea tu semana en 20 minutos**<br>`03-planea-tu-semana.md` | Armar un plan semanal por bloques que sí se puede cumplir. | ~1200 | 1. Ejemplo de semana por bloques<br>2. Plantilla semanal en blanco | Planea tu próxima semana con la plantilla. (20 min) | 26.4 |
| 4 | **Estudia en bloques y descansa**<br>`04-estudia-en-bloques.md` | Usar bloques de 25 minutos con descansos para concentrarte. | ~900 | 1. Esquema de un bloque de estudio 25/5 | Haz cuatro bloques de estudio y anota cuántos terminaste sin distraerte. (10 min) | 14.7 |

## Cursos que aparecen en las rutas pero quedan en «próximamente»

No se escriben ahora; tienen ficha y precio de referencia. Si se quiere que la ruta del perfil 1 (pantalla 06) se pueda comprar completa, habría que escribir también «Hablar para vender» y «Precios sin miedo» (ver Preguntas abiertas).

| Curso | Escuela | Minutos estimados | Precio de referencia |
|---|---|---|---|
| Qué es emprender | Negocios y Emprendimiento | 45 | $20 |
| Valida tu idea sin gastar | Negocios y Emprendimiento | 70 | $35 |
| Tu propuesta de valor en una hoja | Negocios y Emprendimiento | 50 | $20 |
| Precios sin miedo | Negocios y Emprendimiento | 50 | $20 |
| Responder objeciones | Negocios y Emprendimiento | 60 | $35 |
| Vender por WhatsApp y redes | Negocios y Emprendimiento | 60 | $35 |
| Hablar para vender | Comunicación | 70 | $35 |
| Argumentar y convencer | Comunicación | 80 | $35 |
| Presentaciones que se entienden | Comunicación | 60 | $35 |
| Correos que sí se leen | Comunicación | 40 | $20 |
| Redacción clara para trabajos y tesis | Comunicación | 90 | $35 |
| Estudia mejor en menos tiempo | Habilidades personales | 60 | $35 |
| Tu primer presupuesto | Habilidades personales | 50 | $20 |
| Ahorra siendo estudiante | Habilidades personales | 45 | $20 |
| Diseño para no diseñadores | Diseño y Creatividad | 70 | $35 |
| Presentaciones que lucen | Diseño y Creatividad | 60 | $35 |
| Fotos con tu celular | Diseño y Creatividad | 50 | $20 |
| Video corto para redes | Diseño y Creatividad | 60 | $35 |
