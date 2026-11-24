# Pista · Análisis del repositorio de apuntes (Etapa 1)

> Archivo generado por `analisis/scripts/armar_informe.py` a partir de `analisis/curacion/plantilla_informe.md`.
> Todas las cifras y tablas salen de los scripts de `analisis/scripts/` (ver «Cómo reproducir» al final).
> Repositorio analizado: <https://github.com/sammy-ulfh/Notes>, commit `{{CIFRA:commit}}`.
> Lo marcado como **SUPUESTO** es una deducción o una propuesta, no un hecho del repositorio.

## Resumen ejecutivo

1. El repositorio tiene **{{CIFRA:notas}} notas**, **{{CIFRA:imagenes}} imágenes** y **{{CIFRA:mb}} MB** (sin `.git`) en 8 carpetas de primer nivel; solo {{CIFRA:vaults_con_obsidian}} tienen `.obsidian/`. Leerlo todo toma ~{{CIFRA:horas_lectura}} h (200 palabras/min + 0,2 min por imagen).
2. Los 8 vaults no son 8 cursos: propongo **{{CIFRA:cursos_reales}} cursos reales** con **{{CIFRA:lecciones_reales}} lecciones** ({{CIFRA:notas_en_cursos}} notas). `Cloud&DevOps_Fundamentals` se parte en 4 cursos, `Hacking_introduction` en 4, `Python_ofensivo` en 4; `VLANS` se une a Redes y `Fixes` pasa a recursos extra.
3. Escuela de Tecnología con 6 áreas: Programación, Ciberseguridad y Linux (sólidas), Cloud y DevOps y Redes (básicas) y Desarrollo web (insuficiente → próximamente). **Linux desde cero** y **Redes desde cero** son la base de varias áreas.
4. Otras 4 escuelas (SUPUESTO): Negocios y Emprendimiento, Comunicación y Habilidades personales, cada una con **un curso de muestra**, y Diseño y Creatividad solo en «próximamente».
5. Orientación de 4 preguntas y diagnósticos de 5 preguntas para las 8 áreas con contenido; todo son sumas de puntos y efectos fijos en `diagnostico.json`. Un script aplica las reglas y deja resueltos los 3 perfiles.
6. El perfil 1 (Mariana, Administración) reproduce la pantalla 06: **5 semanas, $90 MXN o $75 MXN en paquete**. Solo el perfil 3 es de tecnología.
7. Precios: ajusto la regla a la duración real medida (**< 1 h = $20 · 1-3 h = $35 · > 3 h = $50**). Con la regla original, {{CIFRA:n20_original}} de {{CIFRA:cursos_a_la_venta}} cursos costarían $20 y ninguno $50.
8. Sintaxis: solo `![[...]]`, `[[...]]` y Markdown básico; no hay callouts, tags, LaTeX ni Mermaid. Hay **{{CIFRA:ambiguas}} imágenes ambiguas** (ningún par de candidatos es idéntico), **{{CIFRA:enlaces_rotos}} enlaces rotos** (por nombres con codificación rota) y {{CIFRA:png_mayus}} imágenes `.PNG`.
9. Contenido sensible: {{CIFRA:ofensivas_alto}} notas de riesgo ofensivo alto y {{CIFRA:ofensivas_medio}} medio (aviso ético; fuera de la presentación) y **{{CIFRA:sensibles_alta}} hallazgos de datos personales de severidad alta** (correos reales) que hay que limpiar antes de publicar.
10. Recomendación técnica: script de sincronización que copia, renombra y normaliza los apuntes; colecciones de Astro con `glob()`; un plugin remark propio y pequeño para `![[ ]]`/`[[ ]]`; imágenes usadas copiadas a `public/`; Tailwind 4 (lo que instala hoy `npx astro add tailwind`) con los tokens en `@theme`.

---

## 1. Inventario general

{{INVENTARIO_VAULTS}}

- Palabras totales: {{CIFRA:palabras}}. Imágenes: {{CIFRA:mb_imagenes}} MB de los {{CIFRA:mb}} MB.
- `Linux_Introduction` y `Personalizacion_entrono` **no tienen `.obsidian/`**: no son vaults en sentido estricto, pero sí son cursos. Se tratan igual: la raíz para resolver rutas es la carpeta de primer nivel.
- Hay `.obsidian/` **anidados** en `Fixes/Vmware`, `Hacking_introduction/Conceptos básicos` y hasta en `Hacking_introduction/Conceptos básicos/images`. SUPUESTO: en algún momento se abrieron esas subcarpetas como vaults sueltos; se ignoran.
- Archivos que no pertenecen a ningún vault:

{{SUELTOS}}

- El `README.md` raíz enlaza a carpetas que no existen (`Personalizacion_entorno`, `Hacking_introuction`, `Python2_Install` en la raíz). No sirve como índice; el catálogo saldrá de `inventario.json`.
- Solo 1 nota tiene frontmatter; {{CIFRA:notas_con_indice}} tienen un índice `[[#...]]` al inicio y {{CIFRA:notas_con_siguientes}} una sección «Siguientes apuntes» que enlaza a la nota siguiente (la uso para deducir el orden).

## 2. Estructura de cada curso

### 2.1 De vaults a cursos

| Vault | Qué es | Propuesta |
|---|---|---|
| `Linux_Introduction` | Curso corto y muy visual (105 imágenes en 8 notas) | **Linux desde cero**. La nota «Sistemas operativos para pentesting» sale del recorrido (la pantalla 10 muestra 7 lecciones) y pasa a recurso extra de Ciberseguridad. |
| `Personalizacion_entrono` | **Una sola nota** de 16 673 palabras y 46 imágenes | **Personaliza tu escritorio Linux**, partida en lecciones por sus encabezados H2. |
| `Cloud&DevOps_Fundamentals` | Mezcla Bash, Docker, Linux y Python, **en inglés** | Se parte en 4: **Automatiza tareas con la terminal (Bash)**, **Administra un servidor Linux**, **Python para automatizar (DevOps)** y el módulo «Docker a fondo» de *Docker desde cero*. |
| `Hacking_introduction` | Redes, reconocimiento, Docker, enumeración y explotación | Se parte en 4: **Redes desde cero**, **Docker desde cero** (módulos 1-2), **Hacking ético: reconocimiento** y **Hacking ético: enumeración y explotación**. `Tools/` (4 listas de enlaces) pasa a recursos extra. |
| `Python_ofensivo` | 10 notas largas de Python general + 24 de herramientas ofensivas | Se parte en 4: **Python desde cero**, **Python práctico**, **Herramientas de red con Python** (escáneres) y **Python ofensivo (solo en laboratorio)**. |
| `Full-Stack` | 4 notas de HTML (13 min) | **Mini-curso «Tu primera página web»**; el área Desarrollo web queda en próximamente. |
| `VLANS` | 3 notas sin imágenes (2 min) | No es un curso: se **une como módulo final de Redes desde cero**. |
| `Fixes` | 3 recetas sueltas; `Vmware.md` tiene 7 palabras | No es un curso: 2 notas pasan a **recursos extra** y `Vmware.md` se **descarta**. |

**Reglas de orden** (en este orden de prioridad):
1. La cadena «Siguientes apuntes» / «Next Notes» / «Siguientes notas» / «Continuar apuntes» de cada nota.
2. El sufijo de parte `(1-2)`, `(2-4)`, ` 1-2`.
3. Orden pedagógico de las carpetas (introducción → práctica), fijado a mano en `analisis/curacion/cursos_tecnologia.json`.
4. Alfabético, como último recurso.
5. Excepción ética: en *Hacking ético: reconocimiento* la primera lección es «Antes de empezar: un objetivo autorizado» (HackerOne), aunque en la cadena original va a la mitad.

**Notas que se parten en varias lecciones:** las 10 notas largas de `Python_ofensivo/Introduction` (de 7 a 129 min cada una) y la de `Personalizacion_entrono`. Regla: cada entrada del índice inicial de la nota (o cada H2 si no hay índice) es una lección; las secciones de menos de 2 min y sin imágenes se unen a la siguiente (por ejemplo «¿Qué es Picom?» + «Configurando… con Picom»). El índice es más fiable que el nivel de encabezado: en la nota de POO, «Clases y objetos (1/2)» es H3 y «(2/2)» es H2.

**Cálculo por lección:** palabras de prosa + código (sin sintaxis de imágenes, URLs ni HTML); minutos = palabras/200 + 0,2 × imágenes. ★ = lección destacada para la demo; ⚠ = contenido sensible (aviso ético).

### 2.2 Cursos

#### Linux desde cero (`linux-desde-cero`)
{{CURSO:linux-desde-cero}}

#### Personaliza tu escritorio Linux (`personaliza-tu-linux`)
{{CURSO:personaliza-tu-linux}}

#### Automatiza tareas con la terminal (`terminal-y-bash`)
{{CURSO:terminal-y-bash}}

#### Administra un servidor Linux (`administracion-linux`)
{{CURSO:administracion-linux}}

#### Python desde cero (`python-desde-cero`)
{{CURSO:python-desde-cero}}

#### Python práctico (`python-practico`)
{{CURSO:python-practico}}

#### Python para automatizar (`python-automatizacion`)
{{CURSO:python-automatizacion}}

#### Docker desde cero (`docker-desde-cero`)
{{CURSO:docker-desde-cero}}

#### Redes desde cero (`redes-desde-cero`)
{{CURSO:redes-desde-cero}}

#### Hacking ético: reconocimiento (`hacking-etico-reconocimiento`)
{{CURSO:hacking-etico-reconocimiento}}

#### Hacking ético: enumeración y explotación (`hacking-etico-explotacion`)
{{CURSO:hacking-etico-explotacion}}

#### Herramientas de red con Python (`python-redes`)
{{CURSO:python-redes}}

#### Python ofensivo, solo en laboratorio (`python-ofensivo-laboratorio`)
{{CURSO:python-ofensivo-laboratorio}}

#### Tu primera página web (`html-desde-cero`)
{{CURSO:html-desde-cero}}

### 2.3 Lecciones que mejor lucen en la presentación

Candidatas calculadas por script (curso sin aviso ético, ≥ 8 imágenes, 4-25 min; ranking en `datos/ranking_destacadas.json`); entre ellas elegí las que dan un **resultado visible para alguien que no programa**. El ranking puro por imágenes elige lecciones de Python llenas de código, que no ayudan a este público.

{{DESTACADAS}}

- *Comandos básicos (1 de 2)* es la que usa la pantalla 10. Ojo: la pantalla dice «~30 min · 14 imágenes» y la nota real tiene 9 imágenes y ~5 min de lectura.
- *Configurando la ZSH…* y *Etiquetas para textos* son las de resultado más vistoso (terminal con colores e íconos; una página en el navegador).

## 3. Taxonomía: escuelas → áreas → cursos

### 3.1 Escuela de Tecnología (contenido real)

{{TAXONOMIA_TEC}}

- Reglas de cobertura: **sólida** = 2 o más cursos con apuntes reales y 3 h o más; **básica** = al menos 1 curso y 30 min; **insuficiente** = lo demás. *Cloud y DevOps* saldría sólida por volumen, pero la bajo a básica a mano: no hay nada de nubes públicas (AWS, Azure, GCP), CI/CD ni Kubernetes.
- **Cursos base:** *Linux desde cero* (Linux, Ciberseguridad, Cloud y DevOps), *Redes desde cero* (Redes, Ciberseguridad) y *Python desde cero* (Programación y requisito de *Herramientas de red con Python*).
- **Próximamente:** Desarrollo web (solo 13 min de HTML). El mini-curso se puede comprar desde el catálogo, pero el área no se recomienda en la orientación.
- *Python ofensivo (solo en laboratorio)* y *Herramientas de red con Python* no están en ninguna ruta por defecto; solo entran si en el diagnóstico de Ciberseguridad se elige «Crear mis propias herramientas» (y en ese caso entran *Python desde cero* y *Herramientas de red*, no el de laboratorio).

### 3.2 Otras escuelas (todo es SUPUESTO)

{{TAXONOMIA_OTRAS}}

- **Diferencia con `pantallas.html`:** la pantalla 02 muestra «Habilidades personales» como próximamente. PROMPT_ANALISIS pide un curso de muestra por escuela, así que le doy uno (*Tu semana en orden*) y dejo **Diseño y Creatividad** como la escuela en «próximamente», para conservar ese estado en la demo (botón «Avisarme»). Ver Preguntas abiertas.
- Los temarios de los 3 cursos de muestra están en `temarios_muestra.md`.

### 3.3 Cómo se agrega una escuela nueva sin tocar código

1. **Apuntes:** ahora en `apuntes-demo/<escuela>/<curso>/NN-slug.md` con imágenes en `apuntes-demo/<escuela>/<curso>/images/`. Después, cada escuela puede tener su propio repositorio de Obsidian.
2. **Fuente:** una entrada en un archivo de datos de fuentes (por ejemplo `src/data/fuentes.json`): `{ "id": "negocios", "tipo": "local", "ruta": "apuntes-demo/negocios" }` o `{ "id": "negocios", "tipo": "git", "url": "…", "commit": "…" }`. El script de sincronización recorre esa lista.
3. **Catálogo:** la escuela, sus áreas y sus cursos se agregan en los archivos de datos (`escuelas.json` / `cursos.json`), con la misma forma que `inventario.json`. El orden de las lecciones sale del prefijo `NN-` y de «Siguientes apuntes».
4. **Diagnóstico:** si el área tiene curso disponible, se agrega su bloque de preguntas en el archivo de diagnósticos y, si hace falta, sus puntos en las opciones de orientación.

Ningún componente cambia: las páginas se generan recorriendo los datos.

## 4. Diagnóstico, roadmap y perfiles para la presentación

### 4.1 Orientación (para quien no sabe por dónde empezar)

{{ORIENTACION}}

**Regla:** se suman los puntos; gana la escuela con más puntos (empate: la primera del catálogo) y, dentro de ella, las 1-2 áreas con más puntos. Si la principal está en «próximamente», se avisa y se propone la alternativa disponible más cercana (la disponible con más puntos de la misma escuela; si no hay, la de cualquier escuela). «También te puede servir» es el área disponible con más puntos de **otra** escuela. Caso comprobado por script: *Salud + organizar + planear + presupuesto* → Habilidades / Finanzas personales (próximamente) → aviso y **Productividad**.

### 4.2 Diagnóstico por área

Todas las áreas con un curso disponible o de muestra tienen 5 preguntas: experiencia (2-3), tiempo y objetivo. La pregunta de tiempo es la misma para todas: *Menos de 1 h* → 0,5 h · *1 a 2 h* → 1 h · *3 a 4 h* → 3 h · *5 h o más* → 5 h. Se planea con el **mínimo** del rango, para que la ruta sea realista. Al final de cada diagnóstico se muestra: «No hay respuestas malas: esto solo sirve para saber dónde empezar.»

{{DIAGNOSTICOS}}

### 4.3 Reglas del roadmap

- **Combinar respuestas:** si varias respuestas fijan un `curso_inicio`, gana el que está más adelante en la ruta y los anteriores se muestran como «Omitido: …». `omitir_lecciones`, `omitir_modulos`, `omitir_cursos` y `agregar_cursos` se unen. `horas_semana` es la de la pregunta de tiempo. (`omitir_cursos` y `agregar_cursos` son una extensión del formato pedido, necesaria para las preguntas de objetivo.)
- **Lecciones omitidas:** se muestran como «ya lo sabes, opcional», no desaparecen.
- **Ritmo:** lecciones por semana = ⌊horas_semana × 60 / minutos promedio por lección del curso⌋ (mínimo 1). Cada curso empieza en una semana nueva. Un curso «próximamente» ocupa ⌈minutos / (horas × 60)⌉ semanas con su nombre.
- **Costo:** suma de los precios de los cursos de la ruta (los próximamente con precio de referencia) y el paquete de la ruta (× 0,85, redondeado hacia abajo a múltiplos de 5).

### 4.4 Perfiles para la presentación (guion de la demo)

{{PERFILES}}

Notas sobre los perfiles:
- **Mariana** coincide con la pantalla 06: semanas «Tu cliente ideal / Tu primer mensaje / Hablar para vender / … / Precios sin miedo», «Omitido: Qué es emprender» y **$90 o $75**. Mantengo los cursos de la pantalla: son los que piden sus respuestas. *Hablar para vender* y *Precios sin miedo* quedan en próximamente (un solo curso de muestra por escuela), así que en la demo solo se compra el primero.
- **Diego** recorre todo con el curso de muestra de Comunicación; agrega *Argumentar y convencer* porque eligió «convencer a otros».
- **Valeria** (único perfil de tecnología) recorre Linux → Redes → Hacking ético: reconocimiento → Docker → Hacking ético: explotación (Docker entra porque el laboratorio de explotación lo usa; el validador comprueba que cada prerrequisito vaya antes). La semana 5 junta 24 lecciones porque la fórmula de ritmo usa el **promedio** de minutos; ver Preguntas abiertas. En la presentación conviene enseñar sus lecciones de Linux y no las de explotación.

## 5. Sintaxis de Obsidian que se usa

### 5.1 Conteos y ejemplos

{{SINTAXIS}}

Lenguajes de los bloques de código ({{CIFRA:bloques_codigo}} bloques, {{CIFRA:bloques_sin_lenguaje}} sin lenguaje):

{{LENGUAJES}}

### 5.2 Reglas para resolver `![[...]]` y `[[...]]` (como Obsidian)

1. Quitar `|alias` o `|tamaño` y `#ancla`.
2. Buscar la ruta **relativa a la carpeta de la nota**.
3. Buscar la ruta **relativa a la raíz del vault** (la carpeta de primer nivel, aunque no tenga `.obsidian/`).
4. Buscar **por nombre** dentro del vault. Si hay un candidato, ese; si hay varios, es **ambigua**: se elige el que comparte más carpetas con la nota (normalmente `<carpeta de la nota>/images/`) y se deja fijado en el inventario.
5. Sin coincidencia exacta, repetir sin distinguir mayúsculas (hoy no hace falta: ninguna imagen depende de eso).
6. Para notas `[[nota]]` se prueba con y sin `.md`. `[[#Título]]` se compara con los encabezados de la propia nota quitando `*`, `_`, `` ` `` y los caracteres `: # ^ [ ] | ?`, como hace Obsidian.

### 5.3 Lo que no se resuelve o se resuelve de forma ambigua

- Imágenes rotas: **{{CIFRA:rotas_img}}**. Imágenes ambiguas: **{{CIFRA:ambiguas}}** (en ninguna los candidatos son el mismo archivo, así que elegir mal muestra **otra** imagen):

{{AMBIGUAS}}

- Enlaces que no se resuelven y anclas que no coinciden:

{{ENLACES_PROBLEMA}}

  Los 3 enlaces rotos se arreglan solos al reparar la codificación del nombre (la nota se llama `Comandos b sicos 1-2.md` y el enlace dice `Comandos básicos 1-2`). De las 7 anclas, 3 son falsos positivos por corchetes en el título (`Modules.md`).

### 5.4 Otros elementos

- `![[README]]` incrusta una nota dentro de otra (`Módulos_y_paquetes_en_Python.md`): el conversor debe insertar su contenido o volverlo enlace.
- `![[basic_commands.pdf]]` y `![[bash_redirections.pdf]]` incrustan PDF: mostrarlos como enlace de descarga. Hay 1 GIF y 16 SVG.
- `<br>` y `</br>` sueltos (161), sobre todo en `Personalización_Linux.md`; casi todas las secciones terminan con «Siguientes apuntes» y empiezan con un índice: el lector ya tiene navegación, así que **SUPUESTO**: conviene ocultar esas dos secciones al mostrar la nota.
- Hay **{{CIFRA:resaltados}} líneas con resaltado `==texto==`** (p. ej. `Python_ofensivo/Introduction/Introducción_a_Python.md:94`): el conversor debe pasarlo a `<mark>`.
- No hay callouts, tags, checklists, LaTeX, Mermaid ni imágenes con tamaño (`|300`).

### 5.5 Subconjunto para los cursos de muestra

Detallado en `temarios_muestra.md`: archivos `NN-slug.md`, `# Título`, `##` secciones, párrafos, negritas, listas, tablas, imágenes `![[images/NN-nombre.png]]` (siempre con ruta, en minúsculas), enlaces `[[NN-slug|Título]]`, sección `## Ejercicio` y sección `## Siguientes apuntes`. Se permite `==resaltado==` (lo usan los apuntes reales). Sin HTML, callouts, tags, LaTeX, Mermaid ni frontmatter.

## 6. Nombres y slugs

**Regla de slug** (`proponer_slugs.py`):
1. Reparar la codificación rota: U+00A0 (espacio duro) entre dos letras → «á». En CP437 el byte `0xA0` es «á»; así se rompió «Comandos básicos» → «Comandos b sicos».
2. Quitar acentos (NFKD), minúsculas, `&` → `y`.
3. Todo lo que no sea `[a-z0-9]` → `-`; colapsar guiones.
4. Sufijo de parte `(1-2)`, ` 1-2`, `(1/4)` → `-1-de-2`.
5. El slug de la lección es el del **título limpio** (traducido cuando el apunte está en inglés) y se usa dentro del curso: `curso/slug`.

{{CIFRA:nombres_con_problemas}} de {{CIFRA:nombres_total}} nombres de carpeta o nota tienen algún problema (espacios, acentos o símbolos). Los que tienen codificación rota, símbolos o guion largo:

{{SLUGS}}

**Choques:** con la ruta completa no hay ninguno. Por nombre de nota dentro de un mismo vault sí: `Shell programming`, `Conditions`, `Functions` y `Loops` existen en `Bash/` y en `Linux/` o `Python/` de `Cloud&DevOps_Fundamentals`. Con el esquema `curso/slug` y los títulos traducidos no chocan (validado por script: los {{CIFRA:lecciones_reales}} ids reales son únicos).

## 7. Imágenes

{{IMAGENES_FORMATOS}}

- Promedio: {{CIFRA:promedio_kb}} KB por imagen; {{CIFRA:mayor_500kb}} pesan más de 500 KB y {{CIFRA:mayor_1mb}} más de 1 MB.
- {{CIFRA:nombres_repetidos}} nombres de archivo se repiten dentro de un mismo vault ({{CIFRA:archivos_nombre_repetido}} archivos): `001.png`, `IMG_001.png`, `7.PNG`… Resolver solo por nombre es el origen de las ambigüedades.
- {{CIFRA:png_mayus}} imágenes tienen extensión `.PNG`. En Linux `.png` y `.PNG` son archivos distintos: hay que copiar el nombre exacto (o normalizarlo y reescribir la referencia al mismo tiempo).

**Las 20 más pesadas:**

{{TOP20}}

**Imágenes que ninguna nota usa** ({{CIFRA:sin_usar}}, {{CIFRA:sin_usar_mb}} MB; depende de cómo se resuelvan las ambiguas):

{{SIN_USAR}}

**Imágenes que se usan pero no existen:** {{CIFRA:rotas_img}}.

**Cómo servirlas en Astro:**

| Opción | A favor | En contra |
|---|---|---|
| Copiar tal cual a `public/` | Build instantáneo; nada que configurar; rutas predecibles | ~207 MB sin optimizar; sin `srcset`; hay que poner `width`/`height` a mano para evitar saltos |
| `astro:assets` (imágenes relativas en Markdown de una colección) | WebP/AVIF, tamaños responsivos y dimensiones automáticas; el sitio pesaría mucho menos | Procesar ~2 200 imágenes con sharp alarga cada build en limpio (minutos) y usa mucha memoria; la caché ayuda en local, no siempre en CI |

**Recomendación para la demo:** que el script de sincronización copie **solo las imágenes usadas** a `public/apuntes/<curso>/` con nombres normalizados y extensión en minúsculas, y que el lector use `loading="lazy"` con `width`/`height` leídos de la cabecera del PNG. Es lo más simple y transparente. Si después el peso importa, se agrega un paso de conversión a WebP en el mismo script (o se pasa a `astro:assets`) sin cambiar los componentes.

## 8. Contenido sensible

### 8.1 Técnicas ofensivas

Detección por palabras clave en la ruta y en el texto (`buscar_sensibles.py`): {{CIFRA:ofensivas_alto}} notas de riesgo **alto**, {{CIFRA:ofensivas_medio}} **medio** y {{CIFRA:ofensivas_bajo}} bajo (reconocimiento, escaneo). Todas las de riesgo alto y medio llevan `sensible: true` en el inventario ({{CIFRA:lecciones_sensibles}} lecciones):

{{OFENSIVAS}}

**Recomendaciones:**
- Aviso fijo en esas lecciones y en la ficha de sus cursos: «Contenido para aprender a defenderse. Practícalo solo en tu propio laboratorio o con autorización por escrito; usarlo contra otros es un delito.»
- **No usar ninguna de estas notas en la presentación.** *Python ofensivo (solo en laboratorio)* lleva `mostrar_en_presentacion: false`; SUPUESTO: también se puede ocultar del catálogo de la demo.
- En el perfil de Valeria se muestra la ruta, pero en vivo se abren solo lecciones de Linux o Redes.

### 8.2 Datos que no deben publicarse

{{CIFRA:sensibles_alta}} hallazgos de severidad alta, {{CIFRA:sensibles_media}} media, {{CIFRA:sensibles_baja}} baja (IPs de ejemplo de manuales y ejercicios de subredes) y {{CIFRA:sensibles_fp}} falsos positivos. No se encontraron contraseñas reales, tokens, claves de API ni llaves privadas. Valores omitidos a propósito:

{{SENSIBLES}}

- **Alta:** correos de personas reales de una empresa real (notas de OSINT) y un correo personal en el keylogger. Hay que reemplazarlos en la copia publicada.
- **Media:** nombres de host internos de una empresa (`Remote Access.md`), probablemente de un laboratorio de formación. Conviene cambiarlos por `servidor.ejemplo.com`.
- **No revisado por script:** el texto de las **capturas**. Las notas de OSINT (correos, filtraciones), el keylogger (configuración de una contraseña de aplicación) y las de Burp Suite pueden mostrar datos reales en las imágenes. Hay que revisarlas a mano antes de publicar (ver Preguntas abiertas).

## 9. Catálogo y precios

### 9.1 Regla de precios

- **Regla propuesta:** duración del curso **< 60 min = $20 · 60 a 180 min = $35 · > 180 min = $50 MXN**. Duración = suma de minutos de lectura de sus lecciones (+ minutos de ejercicio en los cursos de muestra).
- **Por qué ajusto la de PROYECTO.md** (< 3 h / 3-8 h / > 8 h): esa regla supone horas de estudio, pero lo medible es el tiempo de lectura de los apuntes, que va de 13 min a 6 h. Con ella, {{CIFRA:n20_original}} de los {{CIFRA:cursos_a_la_venta}} cursos a la venta costarían $20, {{CIFRA:n35_original}} costarían $35 y **ninguno** $50. Con la propuesta: {{CIFRA:n20_propuesta}} a $20, {{CIFRA:n35_propuesta}} a $35 y {{CIFRA:n50_propuesta}} a $50.
- **Próximamente:** recomiendo mostrar un **precio de referencia** con la misma regla (marcado «precio estimado»), porque esos cursos aparecen en las rutas y el costo total los necesita. En el catálogo se puede ocultar.
- **Paquete:** suma de la ruta × 0,85, redondeado hacia abajo al múltiplo de 5; solo con 2 cursos o más. Siempre es más barato que la suma (validado por script).

{{PRECIOS}}

**Paquetes por área** (ruta completa del área; el paquete de una ruta personal se calcula igual con sus cursos):

{{PAQUETES}}

### 9.2 Fichas de la tienda

{{CATALOGO}}

## 10. Recomendaciones técnicas para Astro + Tailwind

**Versiones comprobadas hoy (20/11/2026)** con `npm view` y leyendo el código de `astro@7.4.13`: `npx astro add tailwind` instala `@tailwindcss/vite` y `tailwindcss` `^4.0.0` (hoy **4.3.5**), agrega el plugin de Vite en `astro.config` y crea `src/styles/global.css` con `@import "tailwindcss";`. Ya no usa `@astrojs/tailwind` (integración de Tailwind 3). Astro 7.4 pide Node ≥ 22.23.4.

1. **Cómo traer el contenido — script de sincronización (recomendado).** Un script lee una lista de fuentes (`Notes`, `apuntes-demo/`, futuros repos por escuela), clona o lee cada una en `fuentes/<id>/` y escribe una copia normalizada en una carpeta de contenido: nombres en slug, codificación reparada, imágenes resueltas con ruta explícita, lenguajes de código normalizados, notas largas partidas y frontmatter generado desde el catálogo (curso, módulo, orden, título). *Submódulo*: mete 217 MB y nombres con `&`, espacios y U+00A0 en el build, y no sirve para `apuntes-demo/`. *Lectura directa desde `fuentes/`*: obliga a resolver ambigüedades y renombrados en cada build y deja la lógica de Obsidian repartida. La sincronización deja todo eso en un módulo pequeño y verificable.
2. **Content Collections.** Lecciones: `defineCollection({ loader: glob({ pattern: "**/*.md", base: "<carpeta sincronizada>" }) })`, con el frontmatter que escribe la sincronización (las notas originales no se tocan). Escuelas, áreas, cursos y diagnósticos: colecciones de datos con `file()` sobre JSON. La jerarquía escuela → área → curso → módulo → lección vive en los datos; las lecciones solo dicen a qué curso y módulo pertenecen.
3. **Plugins remark/rehype.** Recomiendo **un plugin remark propio y pequeño** (`remark-obsidian`): convierte `![[x]]` en imagen usando el mapa de rutas que dejó la sincronización, `[[nota|alias]]` en enlace a la URL de la lección y `[[#Título]]` en ancla y `==texto==` en `<mark>`, y quita las secciones «Índice» y «Siguientes apuntes». Los plugins genéricos de wikilinks no aplican las reglas de resolución por carpeta ni las ambigüedades de este repositorio. El resaltado de código lo hace Shiki (incluido en Astro) si antes se normalizan los lenguajes (`HTML` → `html`, `python3` → `python`, `msf` → `shell`).
4. **Dónde viven los datos.** En una carpeta de datos separada del código (por ejemplo `src/data/`): `fuentes.json`, `escuelas.json`, `cursos.json` (con precio calculado o la regla), `orientacion.json`, `diagnosticos.json` y `reglas.json` (precios, paquete, ritmo). La lógica (orientación, ruta, precio, estado del navegador) en módulos TypeScript pequeños, uno por responsabilidad.
5. **Tailwind 4.** Los tokens de la sección 6 de PROYECTO.md van **una sola vez** en `src/styles/global.css` con `@theme { --color-ink: #262626; --color-paper: #fff; --color-fill-muted: #e9e9e9; --color-fill-soft: #f4f4f4; --color-text-muted: #555; --color-text-faint: #8a8a8a; --color-line-soft: #cfcfcf; }`, lo que genera `bg-ink`, `text-text-muted`, `border-line-soft`, etc. No hace falta `tailwind.config.js`. Para el HTML de los apuntes: `@plugin "@tailwindcss/typography";` (hoy 0.5.20) y la clase `prose`, ajustando sus variables (`--tw-prose-body`, `--tw-prose-headings`…) a los mismos tokens en ese archivo; las imágenes de los apuntes con borde `line-soft` y ancho máximo del contenedor.
6. **Riesgos.**
   - Rutas con `&`, paréntesis, espacios, guion largo y U+00A0: solo existen en `fuentes/`; nada del sitio debe usarlas.
   - `.PNG` vs `.png`: en Linux (y en el hosting) son archivos distintos.
   - {{CIFRA:ambiguas}} imágenes ambiguas y {{CIFRA:enlaces_rotos}} enlaces rotos: la sincronización debe fallar o avisar si aparece una nueva.
   - {{CIFRA:lecciones_ingles}} lecciones están en inglés (cursos de `Cloud&DevOps_Fundamentals` y el módulo «Docker a fondo»): chocan con el público de la demo.
   - Tiempo de build: ~300 páginas es poco; el riesgo son las imágenes si se usa `astro:assets`.
   - Clonar 217 MB en CI: usar `--depth 1` y caché.
   - El conteo de minutos es solo de lectura; no incluye practicar.

## Validación automática

Resultado de `validar.py` (ids de `diagnostico.json` contra `inventario.json`, precios, perfiles):

{{VALIDACION}}

## Preguntas abiertas

1. **Escuelas sin apuntes:** ¿escribimos un curso de muestra para Habilidades personales (como pide PROMPT_ANALISIS) o la dejamos en «próximamente» como en la pantalla 02? Si se deja, ¿quitamos la escuela de Diseño?
2. **Ruta de Mariana:** *Hablar para vender* y *Precios sin miedo* quedan en próximamente. ¿Escribimos también esos dos cursos para que la ruta de la pantalla 06 se pueda comprar completa en la demo?
3. **Precios:** ¿aceptan la regla ajustada a minutos de lectura (< 1 h / 1-3 h / > 3 h) o prefieren sumar un tiempo de práctica estimado y conservar la de PROYECTO.md?
4. **Apuntes en inglés:** {{CIFRA:lecciones_ingles}} lecciones de `Cloud&DevOps_Fundamentals` están en inglés. ¿Se traducen, se marcan «Apuntes en inglés» o se dejan fuera de la demo?
5. **Capturas con datos reales:** ¿quién revisa a mano las imágenes de las notas de OSINT, keylogger y Burp Suite antes de publicar? ¿Se publican esas notas o se quedan fuera del sitio de la demo?
6. **Python ofensivo (solo en laboratorio):** ¿se vende en el catálogo de la demo o se oculta?
7. **Ritmo:** la fórmula pedida (promedio de minutos por lección) junta semanas muy desiguales cuando las lecciones varían mucho (semana 5 de Valeria). ¿Llenamos las semanas por minutos acumulados?
8. **Lecciones partidas:** ¿está bien partir las notas largas de Python y Personalización por su índice (35 + 26 + 14 lecciones), o preferimos 1 nota = 1 lección aunque duren hasta 2 h?
9. **Botones de las pantallas fuera del alcance:** «Descargar mi avance (PDF)» (pantalla 11), «Avisarme» (escuela próximamente), «Comunidad» y «Entrar» en la cabecera. ¿Se simulan (por ejemplo, imprimir la página o un mensaje «Disponible pronto») o se quitan?
10. **Índice y «Siguientes apuntes»:** ¿se ocultan dentro del lector (que ya tiene navegación) o se muestran tal cual?
11. **Portadas:** se eligieron por regla (primera imagen de la primera lección con 3 o más). ¿Las revisamos a mano o hacemos ilustraciones propias por curso?

---

### Cómo reproducir

```bash
git clone --depth 1 https://github.com/sammy-ulfh/Notes.git fuentes/Notes
python3 -I analisis/scripts/escanear_repo.py fuentes/Notes analisis/datos
python3 -I analisis/scripts/buscar_sensibles.py fuentes/Notes analisis/datos
python3 -I analisis/scripts/analizar_imagenes.py analisis/datos
python3 -I analisis/scripts/analizar_sintaxis.py analisis/datos
python3 -I analisis/scripts/proponer_slugs.py fuentes/Notes analisis/datos
python3 -I analisis/scripts/construir_inventario.py fuentes/Notes analisis
python3 -I analisis/scripts/generar_diagnostico.py analisis
python3 -I analisis/scripts/validar.py fuentes/Notes analisis
python3 -I analisis/scripts/generar_problemas.py fuentes/Notes analisis
python3 -I analisis/scripts/generar_temarios.py analisis
python3 -I analisis/scripts/armar_informe.py analisis
```

O todo junto: `bash analisis/scripts/ejecutar_todo.sh fuentes/Notes`.
