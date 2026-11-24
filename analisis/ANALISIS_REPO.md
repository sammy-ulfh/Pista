# Pista · Análisis del repositorio de apuntes (Etapa 1)

> Archivo generado por `analisis/scripts/armar_informe.py` a partir de `analisis/curacion/plantilla_informe.md`.
> Todas las cifras y tablas salen de los scripts de `analisis/scripts/` (ver «Cómo reproducir» al final).
> Repositorio analizado: <https://github.com/sammy-ulfh/Notes>, commit `a3438f4`.
> Lo marcado como **SUPUESTO** es una deducción o una propuesta, no un hecho del repositorio.

## Resumen ejecutivo

1. El repositorio tiene **231 notas**, **2243 imágenes** y **210.41 MB** (sin `.git`) en 8 carpetas de primer nivel; solo 6 tienen `.obsidian/`. Leerlo todo toma ~26.9 h (200 palabras/min + 0,2 min por imagen).
2. Los 8 vaults no son 8 cursos: propongo **14 cursos reales** con **284 lecciones** (220 notas). `Cloud&DevOps_Fundamentals` se parte en 4 cursos, `Hacking_introduction` en 4, `Python_ofensivo` en 4; `VLANS` se une a Redes y `Fixes` pasa a recursos extra.
3. Escuela de Tecnología con 6 áreas: Programación, Ciberseguridad y Linux (sólidas), Cloud y DevOps y Redes (básicas) y Desarrollo web (insuficiente → próximamente). **Linux desde cero** y **Redes desde cero** son la base de varias áreas.
4. Otras 4 escuelas (SUPUESTO): Negocios y Emprendimiento, Comunicación y Habilidades personales, cada una con **un curso de muestra**, y Diseño y Creatividad solo en «próximamente».
5. Orientación de 4 preguntas y diagnósticos de 5 preguntas para las 8 áreas con contenido; todo son sumas de puntos y efectos fijos en `diagnostico.json`. Un script aplica las reglas y deja resueltos los 3 perfiles.
6. El perfil 1 (Mariana, Administración) reproduce la pantalla 06: **5 semanas, $90 MXN o $75 MXN en paquete**. Solo el perfil 3 es de tecnología.
7. Precios: ajusto la regla a la duración real medida (**< 1 h = $20 · 1-3 h = $35 · > 3 h = $50**). Con la regla original, 14 de 17 cursos costarían $20 y ninguno $50.
8. Sintaxis: solo `![[...]]`, `[[...]]` y Markdown básico; no hay callouts, tags, LaTeX ni Mermaid. Hay **64 imágenes ambiguas** (ningún par de candidatos es idéntico), **3 enlaces rotos** (por nombres con codificación rota) y 370 imágenes `.PNG`.
9. Contenido sensible: 20 notas de riesgo ofensivo alto y 21 medio (aviso ético; fuera de la presentación) y **6 hallazgos de datos personales de severidad alta** (correos reales) que hay que limpiar antes de publicar.
10. Recomendación técnica: script de sincronización que copia, renombra y normaliza los apuntes; colecciones de Astro con `glob()`; un plugin remark propio y pequeño para `![[ ]]`/`[[ ]]`; imágenes usadas copiadas a `public/`; Tailwind 4 (lo que instala hoy `npx astro add tailwind`) con los tokens en `@theme`.

---

## 1. Inventario general

| Vault | Notas | Imágenes | Palabras | Lectura | MB | .obsidian/ | .obsidian anidados |
|---|---|---|---|---|---|---|---|
| `Cloud&DevOps_Fundamentals` | 113 | 108 | 45 946 | 4 h 11 min | 13.2 | sí | — |
| `Fixes` | 3 | 0 | 241 | 1 min | 0.01 | sí | `Vmware` |
| `Full-Stack` | 4 | 19 | 1 937 | 14 min | 0.94 | sí | — |
| `Hacking_introduction` | 63 | 492 | 59 502 | 6 h 35 min | 69.68 | sí | `Conceptos básicos`, `Conceptos básicos/images` |
| `Linux_Introduction` | 8 | 107 | 5 422 | 48 min | 16.19 | **no** | — |
| `Personalizacion_entrono` | 1 | 48 | 16 673 | 1 h 33 min | 1.62 | **no** | — |
| `Python_ofensivo` | 35 | 1468 | 103 979 | 13 h 32 min | 108.57 | sí | — |
| `VLANS` | 3 | 0 | 448 | 2 min | 0.02 | sí | — |
| **Total** (incluye el README raíz) | 231 | 2243 | 234 216 | 26 h 56 min | 210.41 | 6 de 8 |  |

- Palabras totales: 234 216. Imágenes: 207.74 MB de los 210.41 MB.
- `Linux_Introduction` y `Personalizacion_entrono` **no tienen `.obsidian/`**: no son vaults en sentido estricto, pero sí son cursos. Se tratan igual: la raíz para resolver rutas es la carpeta de primer nivel.
- Hay `.obsidian/` **anidados** en `Fixes/Vmware`, `Hacking_introduction/Conceptos básicos` y hasta en `Hacking_introduction/Conceptos básicos/images`. SUPUESTO: en algún momento se abrieron esas subcarpetas como vaults sueltos; se ignoran.
- Archivos que no pertenecen a ningún vault:

- `README.md`
- `images/IMG_001.png`

- El `README.md` raíz enlaza a carpetas que no existen (`Personalizacion_entorno`, `Hacking_introuction`, `Python2_Install` en la raíz). No sirve como índice; el catálogo saldrá de `inventario.json`.
- Solo 1 nota tiene frontmatter; 174 tienen un índice `[[#...]]` al inicio y 200 una sección «Siguientes apuntes» que enlaza a la nota siguiente (la uso para deducir el orden).

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
- **Subtítulo:** Instala Linux en una máquina virtual, sin tocar tu sistema, y aprende a moverte con comandos.
- **Áreas:** Linux y terminal, Ciberseguridad, Cloud y DevOps · **Nivel:** básico — Empieza por crear una máquina virtual y explica cada comando con capturas; no supone nada previo.
- **Prerrequisitos:** ninguno
- **Duración:** 46 min · 7 lecciones · 100 imágenes · **$20 MXN**
- **Portada:** `Linux_Introduction/Temario/images/1.png` (SUPUESTO: revisar a mano)
- **Lo que aprenderás:**
  - Crear una computadora virtual para practicar sin riesgo de romper la tuya
  - Instalar Linux paso a paso
  - Moverte entre carpetas y crear, copiar y buscar archivos escribiendo comandos
  - Encadenar comandos y dejar tareas trabajando en segundo plano
  - Decidir quién puede ver o cambiar cada archivo (permisos)


**Módulo «Prepara tu equipo»** — carpeta `Linux_Introduction/Introduction`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 1 | Crear una máquina virtual ★ | `Creando una m quina virtual.md` | `crear-una-maquina-virtual` | 508 | 5.5 | 15 | — | básico |
| 2 | Instalar el sistema | `System_installation.md` | `instalar-el-sistema` | 308 | 3.7 | 11 | — | básico |

**Módulo «Comandos esenciales»** — carpeta `Linux_Introduction/Temario`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 3 | Comandos básicos (1 de 2) ★ | `Comandos b sicos 1-2.md` | `comandos-basicos-1-de-2` | 673 | 5.2 | 9 | — | básico |
| 4 | Comandos básicos (2 de 2) | `Comandos b sicos 2-2.md` | `comandos-basicos-2-de-2` | 1228 | 11.9 | 29 | — | básico |
| 5 | Control de flujo y procesos | `Control de flujo, operadores y procesos en segundo plano.md` | `control-de-flujo-y-procesos` | 674 | 6.4 | 15 | — | básico |

**Módulo «Permisos»** — carpeta `Linux_Introduction/Temario`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 6 | Permisos | `permisos.md` | `permisos` | 948 | 6.5 | 9 | — | básico |
| 7 | Permisos especiales | `Permisos especiales.md` | `permisos-especiales` | 858 | 6.7 | 12 | — | básico |

#### Personaliza tu escritorio Linux (`personaliza-tu-linux`)
- **Subtítulo:** Convierte un Linux recién instalado en un escritorio rápido, bonito y a tu gusto.
- **Áreas:** Linux y terminal · **Nivel:** intermedio — Supone que ya instalaste Linux y usas la terminal; edita archivos de configuración y compila programas.
- **Prerrequisitos:** Linux desde cero
- **Duración:** 1 h 32 min · 14 lecciones · 46 imágenes · **$35 MXN**
- **Portada:** `Personalizacion_entrono/images/IMG_0003.jpeg` (SUPUESTO: revisar a mano)
- **Lo que aprenderás:**
  - Cambiar el escritorio por un gestor de ventanas ligero que se maneja con el teclado
  - Agregar una barra superior con la hora, la red y tus atajos
  - Elegir fuentes, colores, transparencias y fondo de pantalla
  - Dejar la terminal con colores, autocompletado e íconos


**Módulo «Tu escritorio paso a paso»** — carpeta `Personalizacion_entrono`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 1 | Iniciando la configuración del sistema | `Personalización_Linux.md#Iniciando la configuración del sistema` | `iniciando-la-configuracion-del-sistema` | 215 | 1.3 | 1 | — | intermedio |
| 2 | Instalación y configuración de Bspwm y Sxhkd | `Personalización_Linux.md#Instalación y configuración de *Bspwm* y *Sxhkd*` | `instalacion-y-configuracion-de-bspwm-y-sxhkd` | 1967 | 10.4 | 3 | — | intermedio |
| 3 | Instalación de la Polybar, Picom y Rofi | `Personalización_Linux.md#Instalación de la *Polybar*, *Picom* y *Rofi*` | `instalacion-de-la-polybar-picom-y-rofi` | 814 | 4.7 | 3 | — | intermedio |
| 4 | Configurando las fuentes, la kitty e instalación de Feh | `Personalización_Linux.md#Configurando las fuentes, la kitty e instalación de Feh` | `configurando-las-fuentes-la-kitty-e-instalacion-de-feh` | 2094 | 11.3 | 4 | — | intermedio |
| 5 | Despliegue de la Polybar | `Personalización_Linux.md#Despliegue de la Polybar` | `despliegue-de-la-polybar` | 510 | 2.8 | 1 | — | intermedio |
| 6 | Configurando los bordeados, las sombras y los difuminados con Picom | `Personalización_Linux.md#Configurando los bordeados, las sombras y los difuminados con *Picom*` | `configurando-los-bordeados-las-sombras-y-los-difuminados-con-picom` | 2623 | 13.1 | 0 | — | intermedio |
| 7 | Configurando la ZSH e instalando la Powerlevel10k ★ | `Personalización_Linux.md#Configurando la ZSH e instalando la Powerlevel10k` | `configurando-la-zsh-e-instalando-la-powerlevel10k` | 2582 | 17.3 | 22 | — | intermedio |
| 8 | Instalación de Batcat y Lsd | `Personalización_Linux.md#Instalación de *Batcat* y *Lsd*` | `instalacion-de-batcat-y-lsd` | 860 | 4.7 | 2 | — | intermedio |
| 9 | Configurando la polybar | `Personalización_Linux.md#Configurando la polybar` | `configurando-la-polybar` | 1338 | 6.7 | 0 | — | intermedio |
| 10 | Creando nuevos módulos en la polybar | `Personalización_Linux.md#Creando nuevos módulos en la *polybar*` | `creando-nuevos-modulos-en-la-polybar` | 656 | 3.3 | 0 | — | intermedio |
| 11 | Configuración e integración de NVChad en Neovim | `Personalización_Linux.md#Configuración e integración de *NVChad* en *Neovim*` | `configuracion-e-integracion-de-nvchad-en-neovim` | 1444 | 7.4 | 1 | — | intermedio |
| 12 | Último detalle con nvim | `Personalización_Linux.md#Último detalle con nvim` | `ultimo-detalle-con-nvim` | 780 | 3.9 | 0 | — | intermedio |
| 13 | Configuración en Firefox | `Personalización_Linux.md#Configuración en Firefox` | `configuracion-en-firefox` | 481 | 4.2 | 9 | — | intermedio |
| 14 | Repaso por los atajos de teclado definidos | `Personalización_Linux.md#Repaso por los atajos de teclado definidos` | `repaso-por-los-atajos-de-teclado-definidos` | 230 | 1.1 | 0 | — | intermedio |

#### Automatiza tareas con la terminal (`terminal-y-bash`)
- **Subtítulo:** Escribe pequeños programas de terminal que hacen por ti las tareas repetitivas.
- **Áreas:** Linux y terminal, Cloud y DevOps · **Nivel:** intermedio — Usa la terminal desde el inicio y entra en variables, condiciones y ciclos; conviene haber hecho Linux desde cero.
- **Prerrequisitos:** Linux desde cero
- **Duración:** 49 min · 26 lecciones · 8 imágenes · **$20 MXN** · apuntes en: en
- **Portada:** `Cloud&DevOps_Fundamentals/Bash/Bash_syntax/images/002.png` (SUPUESTO: revisar a mano)
- **Lo que aprenderás:**
  - Qué es una terminal y qué tipos existen
  - Escribir tu primer script con variables, condiciones y repeticiones
  - Guardar y reutilizar resultados de comandos (redirecciones y tuberías)
  - Buscar y transformar texto con AWK y SED
  - Seguir una guía de estilo para que otros entiendan tus scripts


**Módulo «Qué es la terminal»** — carpeta `Cloud&DevOps_Fundamentals/Bash/Bash_Introduction`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 1 | ¿Qué es una terminal (shell)? | `What is Shell.md` | `que-es-una-terminal-shell` | 225 | 1.1 | 0 | shell | intermedio |
| 2 | Tipos de terminal | `Shell type.md` | `tipos-de-terminal` | 225 | 1.1 | 0 | — | intermedio |
| 3 | Archivos de arranque de Bash | `Bash startup files.md` | `archivos-de-arranque-de-bash` | 186 | 0.9 | 0 | — | intermedio |
| 4 | Programar en la terminal | `Shell programming.md` | `programar-en-la-terminal` | 112 | 0.6 | 0 | — | intermedio |
| 5 | Qué sí y qué no hacer con Bash | `Do's and Don'ts.md` | `que-si-y-que-no-hacer-con-bash` | 308 | 1.5 | 0 | — | intermedio |

**Módulo «Tu primer script»** — carpeta `Cloud&DevOps_Fundamentals/Bash/Bash_syntax`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 6 | Crear y ejecutar un script | `Script Development and Invocation.md` | `crear-y-ejecutar-un-script` | 175 | 0.9 | 0 | — | intermedio |
| 7 | Opciones de Bash | `Bash options.md` | `opciones-de-bash` | 168 | 1.0 | 1 | shell | intermedio |
| 8 | Códigos de salida | `Exit Codes.md` | `codigos-de-salida` | 11 | 0.3 | 1 | — | intermedio |
| 9 | Caracteres especiales | `Special characters.md` | `caracteres-especiales` | 49 | 0.4 | 1 | — | intermedio |
| 10 | Variables | `Variables.md` | `variables` | 1208 | 6.4 | 2 | shell | intermedio |
| 11 | Condiciones | `Conditions.md` | `condiciones` | 761 | 4.0 | 1 | shell | intermedio |
| 12 | Ciclos (repeticiones) | `Loops.md` | `ciclos-repeticiones` | 244 | 1.2 | 0 | shell | intermedio |
| 13 | Redirecciones y tuberías | `I-O Recirection.md` | `redirecciones-y-tuberias` | 931 | 4.9 | 1 | shell | intermedio |
| 14 | Funciones | `Functions.md` | `funciones` | 274 | 1.4 | 0 | shell | intermedio |

**Módulo «Guía de estilo»** — carpeta `Cloud&DevOps_Fundamentals/Bash/Bash_Style_Guide`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 15 | Entorno y salida de errores | `Environment.md` | `entorno-y-salida-de-errores` | 67 | 0.3 | 0 | shell | intermedio |
| 16 | Comentarios | `Comments.md` | `comentarios` | 380 | 1.9 | 0 | shell | intermedio |
| 17 | Formato | `Formating.md` | `formato` | 1217 | 6.1 | 0 | shell | intermedio |
| 18 | Cómo nombrar las cosas | `Naming conventions.md` | `como-nombrar-las-cosas` | 647 | 3.2 | 0 | shell | intermedio |
| 19 | Llamar comandos | `Calling commands.md` | `llamar-comandos` | 296 | 1.5 | 0 | shell | intermedio |

**Módulo «Procesar texto con AWK y SED»** — carpeta `Cloud&DevOps_Fundamentals/Bash/Text processors - AWK y SED`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 20 | AWK: visión general | `AWK Overview.md` | `awk-vision-general` | 287 | 1.4 | 0 | shell | intermedio |
| 21 | Variables integradas de AWK | `AWK Built-in Variables.md` | `variables-integradas-de-awk` | 251 | 1.3 | 0 | — | intermedio |
| 22 | AWK con ejemplos | `AWK Examples.md` | `awk-con-ejemplos` | 329 | 1.6 | 0 | shell | intermedio |
| 23 | SED: visión general | `Sed overview.md` | `sed-vision-general` | 207 | 1.0 | 0 | shell | intermedio |
| 24 | Scripts de SED | `Sed script overview.md` | `scripts-de-sed` | 259 | 1.3 | 0 | shell | intermedio |
| 25 | Direcciones en SED | `Sed address overview.md` | `direcciones-en-sed` | 302 | 1.5 | 0 | shell | intermedio |
| 26 | Comandos de SED | `Sed command overview.md` | `comandos-de-sed` | 324 | 1.8 | 1 | shell | intermedio |

#### Administra un servidor Linux (`administracion-linux`)
- **Subtítulo:** Lo que necesitas para cuidar un servidor: discos, programas, usuarios, red y registros.
- **Áreas:** Linux y terminal, Cloud y DevOps · **Nivel:** intermedio — Explica tareas de administrador (particiones, servicios, cortafuegos) que suponen soltura con la terminal.
- **Prerrequisitos:** Linux desde cero
- **Duración:** 1 h 21 min · 33 lecciones · 23 imágenes · **$35 MXN** · apuntes en: en
- **Portada:** `Cloud&DevOps_Fundamentals/Linux/Linux_shell_basics/images/vim_navigation.png` (SUPUESTO: revisar a mano)
- **Lo que aprenderás:**
  - Cómo se organiza Linux por dentro: discos, carpetas y arranque
  - Instalar programas y programar tareas automáticas
  - Crear usuarios y controlar a qué puede entrar cada uno
  - Conectarte a otra computadora de forma segura (SSH)
  - Revisar el uso de memoria, disco y los registros del sistema


**Módulo «Cómo funciona Linux»** — carpeta `Cloud&DevOps_Fundamentals/Linux/Linux_Introduction`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 1 | Sistemas tipo Unix | `Unix-Based OS's.md` | `sistemas-tipo-unix` | 255 | 1.5 | 1 | — | intermedio |
| 2 | Distribuciones de Linux | `Linux Distributions.md` | `distribuciones-de-linux` | 78 | 0.8 | 2 | — | intermedio |
| 3 | La terminal (shell) | `Shell.md` | `la-terminal-shell` | 568 | 3.0 | 1 | — | intermedio |
| 4 | Sistemas de archivos | `File systems.md` | `sistemas-de-archivos` | 358 | 2.2 | 2 | — | intermedio |
| 5 | Volúmenes lógicos (LVM) | `LVM.md` | `volumenes-logicos-lvm` | 521 | 2.8 | 1 | shell | intermedio |
| 6 | Memoria de intercambio (swap) | `Swap.md` | `memoria-de-intercambio-swap` | 926 | 4.6 | 0 | shell | intermedio |
| 7 | Cuotas de disco | `Disk Quotas.md` | `cuotas-de-disco` | 144 | 0.7 | 0 | — | intermedio |
| 8 | Cargadores de arranque | `Boot Loaders.md` | `cargadores-de-arranque` | 204 | 1.0 | 0 | — | intermedio |
| 9 | Niveles de ejecución | `Runlevels.md` | `niveles-de-ejecucion` | 209 | 1.2 | 1 | shell | intermedio |

**Módulo «Trabajo diario en la terminal»** — carpeta `Cloud&DevOps_Fundamentals/Linux/Linux_shell_basics`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 10 | Introducción a las terminales | `Introduction to shells.md` | `introduccion-a-las-terminales` | 677 | 3.6 | 1 | shell | intermedio |
| 11 | Variables de entorno | `Shell programming.md` | `variables-de-entorno` | 603 | 3.0 | 0 | — | intermedio |
| 12 | Comandos básicos | `Basic shell commands.md` | `comandos-basicos` | 1094 | 5.5 | 0 | shell | intermedio |
| 13 | Editores de texto (vim y nano) | `Text editors.md` | `editores-de-texto-vim-y-nano` | 699 | 4.5 | 5 | shell | intermedio |
| 14 | Buscar archivos | `Filesystem files search.md` | `buscar-archivos` | 158 | 0.8 | 0 | — | intermedio |
| 15 | Xargs | `Xargs.md` | `xargs` | 178 | 0.9 | 0 | — | intermedio |
| 16 | Comprimir y descomprimir | `Working with archives.md` | `comprimir-y-descomprimir` | 234 | 1.2 | 0 | — | intermedio |

**Módulo «Programas y servicios»** — carpeta `Cloud&DevOps_Fundamentals/Linux/Package_management`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 17 | Instalar programas | `Software management.md` | `instalar-programas` | 439 | 2.2 | 0 | — | intermedio |
| 18 | Alternativas | `Alternatives.md` | `alternativas` | 187 | 0.9 | 0 | — | intermedio |
| 19 | Servicios (systemd) | `Service Management in Linux.md` | `servicios-systemd` | 946 | 4.9 | 1 | bash | intermedio |
| 20 | Tareas programadas (cron) | `Crond.md` | `tareas-programadas-cron` | 496 | 2.7 | 1 | — | intermedio |
| 21 | Instalar Java | `JAVA (OpenJDK).md` | `instalar-java` | 147 | 0.7 | 0 | — | intermedio |

**Módulo «Usuarios y permisos»** — carpeta `Cloud&DevOps_Fundamentals/Linux/Users, Groups, Permissions`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 22 | Usuarios y grupos | `Users and Groups.md` | `usuarios-y-grupos` | 492 | 3.1 | 3 | — | intermedio |
| 23 | Modelo de permisos | `Permission Model.md` | `modelo-de-permisos` | 736 | 3.9 | 1 | — | intermedio |
| 24 | SELinux | `SELinux.md` | `selinux` | 499 | 2.5 | 0 | — | intermedio |

**Módulo «Red y acceso remoto»** — carpeta `Cloud&DevOps_Fundamentals/Linux/Networking, Remote Access`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 25 | Configurar la red | `Network Configuration.md` | `configurar-la-red` | 691 | 3.5 | 0 | — | intermedio |
| 26 | Herramientas de red | `Networking Tools.md` | `herramientas-de-red` | 445 | 2.2 | 0 | — | intermedio |
| 27 | Cortafuegos | `Firewall.d and IPtables.md` | `cortafuegos` | 680 | 3.6 | 1 | — | intermedio |
| 28 | Acceso remoto con SSH | `Remote Access.md` | `acceso-remoto-con-ssh` | 742 | 3.7 | 0 | — | intermedio |

**Módulo «Monitoreo y registros»** — carpeta `Cloud&DevOps_Fundamentals/Linux/Monitoring, Processes Control, Logs`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 29 | Procesos | `Process monitoring.md` | `procesos` | 66 | 0.7 | 2 | — | intermedio |
| 30 | Uso del procesador | `Monitoring CPU.md` | `uso-del-procesador` | 414 | 2.1 | 0 | — | intermedio |
| 31 | Uso de memoria | `Monitoring Memory.md` | `uso-de-memoria` | 141 | 0.7 | 0 | — | intermedio |
| 32 | Uso de disco | `Monitoring Storage.md` | `uso-de-disco` | 439 | 2.2 | 0 | — | intermedio |
| 33 | Registros del sistema (logs) | `Logs.md` | `registros-del-sistema-logs` | 823 | 4.1 | 0 | — | intermedio |

#### Python desde cero (`python-desde-cero`)
- **Subtítulo:** Aprende a programar con Python, el lenguaje más usado para empezar, con proyectos pequeños.
- **Áreas:** Programación, Ciberseguridad · **Nivel:** básico — Arranca con la historia del lenguaje y el intérprete; cada tema trae ejemplos que se pueden copiar.
- **Prerrequisitos:** ninguno
- **Duración:** 6 h 11 min · 35 lecciones · 680 imágenes · **$50 MXN**
- **Portada:** `Python_ofensivo/images/IMG_053.png` (SUPUESTO: revisar a mano)
- **Lo que aprenderás:**
  - Escribir y ejecutar tus primeros programas
  - Guardar datos en listas y diccionarios y recorrerlos
  - Organizar tu código en funciones, clases y módulos
  - Leer y escribir archivos
  - Construir proyectos pequeños, como un gestor de biblioteca o de notas


**Módulo «Fundamentos»** — carpeta `Python_ofensivo/Introduction`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 1 | Características y ventajas de Python | `Introducción_a_Python.md#**Características y ventajas de Python**` | `caracteristicas-y-ventajas-de-python` | 649 | 3.2 | 0 | — | básico |
| 2 | Diferencias entre Python2, Python3, PIP2 y PIP3 | `Introducción_a_Python.md#**Diferencias entre Python2, Python3, PIP2 y PIP3**` | `diferencias-entre-python2-python3-pip2-y-pip3` | 520 | 3.6 | 5 | python | básico |
| 3 | El intérprete de Python | `Conceptos_básicos_de_Python.md#**El intérprete de Python**` | `el-interprete-de-python` | 361 | 2.2 | 2 | — | básico |
| 4 | Shebang y convenios en Python | `Conceptos_básicos_de_Python.md#**Shebang y convenios en Python**` | `shebang-y-convenios-en-python` | 734 | 5.1 | 7 | — | básico |
| 5 | Variables y tipos de datos | `Conceptos_básicos_de_Python.md#**Variables y tipos de datos**` | `variables-y-tipos-de-datos` | 2389 | 19.7 | 39 | — | básico |
| 6 | Operadores básicos en Python | `Conceptos_básicos_de_Python.md#**Operadores básicos en Python**` | `operadores-basicos-en-python` | 1026 | 9.1 | 20 | — | básico |
| 7 | String Formatting | `Conceptos_básicos_de_Python.md#**String Formatting**` | `string-formatting` | 626 | 4.5 | 7 | — | básico |
| 8 | Control de flujo (Condicionales y Bucles) | `Conceptos_básicos_de_Python.md#**Control de flujo (Condicionales y Bucles)**` | `control-de-flujo-condicionales-y-bucles` | 3239 | 24.2 | 40 | — | básico |
| 9 | Funciones y ámbito de las variables | `Conceptos_básicos_de_Python.md#**Funciones y ámbito de las variables**` | `funciones-y-ambito-de-las-variables` | 874 | 6.6 | 11 | — | básico |
| 10 | Funciones lambda anónimas | `Conceptos_básicos_de_Python.md#**Funciones lambda anónimas**` | `funciones-lambda-anonimas` | 684 | 5.2 | 9 | — | básico |
| 11 | Manejo de errores y excepciones | `Conceptos_básicos_de_Python.md#**Manejo de errores y excepciones**` | `manejo-de-errores-y-excepciones` | 1069 | 7.9 | 13 | — | básico |

**Módulo «Listas, tuplas y diccionarios»** — carpeta `Python_ofensivo/Introduction`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 12 | Listas | `Colecciones_y_estructuras_de_datos_en_Python.md#**Listas**` | `listas` | 1783 | 14.3 | 27 | — | básico |
| 13 | Tuplas | `Colecciones_y_estructuras_de_datos_en_Python.md#**Tuplas**` | `tuplas` | 965 | 8.4 | 18 | — | básico |
| 14 | Conjuntos | `Colecciones_y_estructuras_de_datos_en_Python.md#**Conjuntos**` | `conjuntos` | 1453 | 13.3 | 30 | — | básico |
| 15 | Diccionarios | `Colecciones_y_estructuras_de_datos_en_Python.md#**Diccionarios**` | `diccionarios` | 1098 | 10.3 | 24 | — | básico |
| 16 | Proyecto de videojuegos | `Colecciones_y_estructuras_de_datos_en_Python.md#**Proyecto de videojuegos**` | `proyecto-de-videojuegos` | 1584 | 12.3 | 22 | shebang | básico |

**Módulo «Programación orientada a objetos»** — carpeta `Python_ofensivo/Introduction`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 17 | Clases y objetos (1 de 2) | `Programación_Orientada_a_Objetos_en_Python_(POO).md#**Clases y objetos (1/2)**` | `clases-y-objetos-1-de-2` | 1902 | 14.3 | 24 | — | básico |
| 18 | Clases y objetos (2 de 2) | `Programación_Orientada_a_Objetos_en_Python_(POO).md#**Clases y objetos (2/2)**` | `clases-y-objetos-2-de-2` | 1566 | 11.8 | 20 | — | básico |
| 19 | Métodos estáticos y métodos de clase | `Programación_Orientada_a_Objetos_en_Python_(POO).md#**Métodos estáticos y métodos de clase**` | `metodos-estaticos-y-metodos-de-clase` | 1263 | 9.5 | 16 | — | básico |
| 20 | Comprendiendo mejor el uso de self | `Programación_Orientada_a_Objetos_en_Python_(POO).md#**Comprendiendo mejor el uso de self**` | `comprendiendo-mejor-el-uso-de-self` | 1096 | 8.1 | 13 | — | básico |
| 21 | Herencia y polimorfismo | `Programación_Orientada_a_Objetos_en_Python_(POO).md#**Herencia y polimorfismo**` | `herencia-y-polimorfismo` | 1633 | 12.6 | 22 | — | básico |
| 22 | Encapsulamiento y métodos especiales | `Programación_Orientada_a_Objetos_en_Python_(POO).md#**Encapsulamiento y métodos especiales**` | `encapsulamiento-y-metodos-especiales` | 2736 | 20.1 | 32 | — | básico |
| 23 | Decoradores y popiedades | `Programación_Orientada_a_Objetos_en_Python_(POO).md#**Decoradores y popiedades**` | `decoradores-y-popiedades` | 2244 | 19.4 | 41 | — | básico |

**Módulo «Módulos y archivos»** — carpeta `Python_ofensivo/Introduction`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 24 | Organización del código en módulos | `Módulos_y_paquetes_en_Python.md#**Organización del código en módulos**` | `organizacion-del-codigo-en-modulos` | 768 | 5.8 | 10 | — | básico |
| 25 | Importación y uso de módulos | `Módulos_y_paquetes_en_Python.md#**Importación y uso de módulos**` | `importacion-y-uso-de-modulos` | 1338 | 8.7 | 10 | — | básico |
| 26 | Creación y distribución de paquetes | `Módulos_y_paquetes_en_Python.md#**Creación y distribución de paquetes**` | `creacion-y-distribucion-de-paquetes` | 2510 | 21.1 | 43 | — | básico |
| 27 | Entrada por teclado y salida por pantalla | `Entrada_y_salida_de_datos.md#**Entrada por teclado y salida por pantalla**` | `entrada-por-teclado-y-salida-por-pantalla` | 709 | 5.3 | 9 | — | básico |
| 28 | Lectura y escritura de archivos | `Entrada_y_salida_de_datos.md#**Lectura y escritura de archivos**` | `lectura-y-escritura-de-archivos` | 2356 | 18.0 | 31 | — | básico |
| 29 | Formateo de cadenas y manipulación de texto | `Entrada_y_salida_de_datos.md#**Formateo de cadenas y manipulación de texto**` | `formateo-de-cadenas-y-manipulacion-de-texto` | 1434 | 13.2 | 30 | — | básico |

**Módulo «Proyectos»** — carpeta `Python_ofensivo/Introduction`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 30 | Proyecto de gestión de biblioteca de libros (1 de 2) | `Proyectos_de_POO.md#**Proyecto de gestión de biblioteca de libros (1/2)**` | `proyecto-de-gestion-de-biblioteca-de-libros-1-de-2` | 814 | 6.7 | 13 | — | intermedio |
| 31 | Proyecto de gestión de biblioteca de libros (2 de 2) | `Proyectos_de_POO.md#**Proyecto de gestión de biblioteca de libros (2/2)**` | `proyecto-de-gestion-de-biblioteca-de-libros-2-de-2` | 612 | 5.5 | 12 | — | intermedio |
| 32 | Proyecto de gestión de animales en tienda | `Proyectos_de_POO.md#**Proyecto de gestión de animales en tienda**` | `proyecto-de-gestion-de-animales-en-tienda` | 1065 | 8.5 | 16 | — | intermedio |
| 33 | Proyecto de administración de flota de vehículos | `Proyectos_de_POO.md#**Proyecto de administración de flota de vehículos**` | `proyecto-de-administracion-de-flota-de-vehiculos` | 872 | 7.6 | 16 | — | intermedio |
| 34 | Proyecto de gestión de notas (1 de 2) | `Proyectos_de_POO.md#**Proyecto de gestión de notas (1/2)**` | `proyecto-de-gestion-de-notas-1-de-2` | 1881 | 14.2 | 24 | pip3 | intermedio |
| 35 | Proyecto de gestión de notas (2 de 2) | `Proyectos_de_POO.md#**Proyecto de gestión de notas (2/2)**` | `proyecto-de-gestion-de-notas-2-de-2` | 1144 | 10.5 | 24 | — | intermedio |

#### Python práctico (`python-practico`)
- **Subtítulo:** Usa las herramientas que ya trae Python para trabajar con fechas, archivos, internet y ventanas.
- **Áreas:** Programación · **Nivel:** intermedio — Supone dominar lo básico del lenguaje; trabaja con red, hilos y una app de chat con cifrado.
- **Prerrequisitos:** Python desde cero
- **Duración:** 4 h 26 min · 26 lecciones · 496 imágenes · **$50 MXN**
- **Portada:** `Python_ofensivo/images/IMG_683.png` (SUPUESTO: revisar a mano)
- **Lo que aprenderás:**
  - Manejar fechas, textos con patrones y carpetas desde Python
  - Pedir información a páginas web desde tu programa
  - Hacer que tu programa haga varias cosas a la vez
  - Crear aplicaciones con ventanas y botones
  - Construir un chat entre varias personas con mensajes cifrados


**Módulo «La biblioteca estándar»** — carpeta `Python_ofensivo/Introduction`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 1 | Manejo de fechas y horas | `Biblioteca_estándar_y_herramientas_adicionales.md#**Manejo de fechas y horas**` | `manejo-de-fechas-y-horas` | 372 | 3.3 | 7 | — | intermedio |
| 2 | Expresiones regulares | `Biblioteca_estándar_y_herramientas_adicionales.md#**Expresiones regulares**` | `expresiones-regulares` | 2114 | 16.0 | 27 | — | intermedio |
| 3 | Manejo de archivos y directorios | `Biblioteca_estándar_y_herramientas_adicionales.md#**Manejo de archivos y directorios**` | `manejo-de-archivos-y-directorios` | 1112 | 9.0 | 17 | — | intermedio |
| 4 | Conexiones de red y protocolos (1 de 4) | `Biblioteca_estándar_y_herramientas_adicionales.md#**Conexiones de red y protocolos (1/4)**` | `conexiones-de-red-y-protocolos-1-de-4` | 2032 | 14.2 | 20 | — | intermedio |
| 5 | Conexiones de red y protocolos (2 de 4) | `Biblioteca_estándar_y_herramientas_adicionales.md#**Conexiones de red y protocolos (2/4)**` | `conexiones-de-red-y-protocolos-2-de-4` | 1177 | 9.7 | 19 | — | intermedio |
| 6 | Conexiones de red y protocolos (3 de 4) | `Biblioteca_estándar_y_herramientas_adicionales.md#**Conexiones de red y protocolos (3/4)**` | `conexiones-de-red-y-protocolos-3-de-4` | 1371 | 9.1 | 11 | — | intermedio |
| 7 | Conexiones de red y protocolos (4 de 4) | `Biblioteca_estándar_y_herramientas_adicionales.md#**Conexiones de red y protocolos (4/4)**` | `conexiones-de-red-y-protocolos-4-de-4` | 1422 | 11.9 | 24 | — | intermedio |

**Módulo «Librerías comunes»** — carpeta `Python_ofensivo/Introduction`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 8 | Librería os y sys | `Manejo_de_librerías_comunes.md#**Librería os y sys**` | `libreria-os-y-sys` | 1415 | 10.7 | 18 | — | intermedio |
| 9 | Librería requests (1 de 2) | `Manejo_de_librerías_comunes.md#**Librería requests (1/2)**` | `libreria-requests-1-de-2` | 1886 | 15.4 | 30 | python3, web | intermedio |
| 10 | Librería requests (2 de 2) | `Manejo_de_librerías_comunes.md#**Librería requests (2/2)**` | `libreria-requests-2-de-2` | 2086 | 16.6 | 31 | — | intermedio |
| 11 | Librería Urllib3 | `Manejo_de_librerías_comunes.md#**Librería Urllib3**` | `libreria-urllib3` | 1503 | 13.3 | 29 | python3 | intermedio |
| 12 | Librería threading y multiprocessing | `Manejo_de_librerías_comunes.md#**Librería threading y multiprocessing**` | `libreria-threading-y-multiprocessing` | 1290 | 9.2 | 14 | — | intermedio |

**Módulo «Aplicaciones de escritorio»** — carpeta `Python_ofensivo/Introduction`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 13 | Desarrollo de aplicaciones GUI con Tkinter (1 de 8) | `Desarrollo_de_aplicaciones_de_escritorio_con_Python.md#**Desarrollo de aplicaciones GUI con Tkinter (1/8)**` | `desarrollo-de-aplicaciones-gui-con-tkinter-1-de-8` | 1792 | 15.6 | 33 | python3 | intermedio |
| 14 | Desarrollo de aplicaciones GUI con Tkinter (2 de 8) | `Desarrollo_de_aplicaciones_de_escritorio_con_Python.md#**Desarrollo de aplicaciones GUI con Tkinter (2/8)**` | `desarrollo-de-aplicaciones-gui-con-tkinter-2-de-8` | 1511 | 12.0 | 22 | — | intermedio |
| 15 | Desarrollo de aplicaciones GUI con Tkinter (3 de 8) | `Desarrollo_de_aplicaciones_de_escritorio_con_Python.md#**Desarrollo de aplicaciones GUI con Tkinter (3/8)**` | `desarrollo-de-aplicaciones-gui-con-tkinter-3-de-8` | 1862 | 15.3 | 30 | — | intermedio |
| 16 | Desarrollo de aplicaciones GUI con Tkinter (4 de 8) | `Desarrollo_de_aplicaciones_de_escritorio_con_Python.md#**Desarrollo de aplicaciones GUI con Tkinter (4/8)**` | `desarrollo-de-aplicaciones-gui-con-tkinter-4-de-8` | 1321 | 11.6 | 25 | — | intermedio |
| 17 | Desarrollo de aplicaciones GUI con Tkinter (5 de 8) | `Desarrollo_de_aplicaciones_de_escritorio_con_Python.md#**Desarrollo de aplicaciones GUI con Tkinter (5/8)**` | `desarrollo-de-aplicaciones-gui-con-tkinter-5-de-8` | 913 | 6.8 | 11 | — | intermedio |
| 18 | Desarrollo de aplicaciones GUI con Tkinter (6 de 8) | `Desarrollo_de_aplicaciones_de_escritorio_con_Python.md#**Desarrollo de aplicaciones GUI con Tkinter (6/8)**` | `desarrollo-de-aplicaciones-gui-con-tkinter-6-de-8` | 758 | 6.6 | 14 | — | intermedio |
| 19 | Desarrollo de aplicaciones GUI con Tkinter (7 de 8) | `Desarrollo_de_aplicaciones_de_escritorio_con_Python.md#**Desarrollo de aplicaciones GUI con Tkinter (7/8)**` | `desarrollo-de-aplicaciones-gui-con-tkinter-7-de-8` | 935 | 7.5 | 14 | — | intermedio |
| 20 | Desarrollo de aplicaciones GUI con Tkinter (8 de 8) | `Desarrollo_de_aplicaciones_de_escritorio_con_Python.md#**Desarrollo de aplicaciones GUI con Tkinter (8/8)**` | `desarrollo-de-aplicaciones-gui-con-tkinter-8-de-8` | 985 | 8.9 | 20 | — | intermedio |
| 21 | Desarrollo de aplicaciones GUI avanzado con CustomTkinter | `Desarrollo_de_aplicaciones_de_escritorio_con_Python.md#**Desarrollo de aplicaciones GUI avanzado con CustomTkinter**` | `desarrollo-de-aplicaciones-gui-avanzado-con-customtkinter` | 699 | 4.9 | 7 | git, pip | intermedio |
| 22 | Chat Multiusuario con GUI y Cifrado E2E (1 de 5) | `Desarrollo_de_aplicaciones_de_escritorio_con_Python.md#**Chat Multiusuario con GUI y Cifrado E2E (1/5)**` | `chat-multiusuario-con-gui-y-cifrado-e2e-1-de-5` | 1053 | 7.9 | 13 | — | intermedio |
| 23 | Chat Multiusuario con GUI y Cifrado E2E (2 de 5) | `Desarrollo_de_aplicaciones_de_escritorio_con_Python.md#**Chat Multiusuario con GUI y Cifrado E2E (2/5)**` | `chat-multiusuario-con-gui-y-cifrado-e2e-2-de-5` | 868 | 7.5 | 16 | — | intermedio |
| 24 | Chat Multiusuario con GUI y Cifrado E2E (3 de 5) | `Desarrollo_de_aplicaciones_de_escritorio_con_Python.md#**Chat Multiusuario con GUI y Cifrado E2E (3/5)**` | `chat-multiusuario-con-gui-y-cifrado-e2e-3-de-5` | 385 | 3.3 | 7 | — | intermedio |
| 25 | Chat Multiusuario con GUI y Cifrado E2E (4 de 5) | `Desarrollo_de_aplicaciones_de_escritorio_con_Python.md#**Chat Multiusuario con GUI y Cifrado E2E (4/5)**` | `chat-multiusuario-con-gui-y-cifrado-e2e-4-de-5` | 1132 | 9.7 | 20 | — | intermedio |
| 26 | Chat Multiusuario con GUI y Cifrado E2E (5 de 5) | `Desarrollo_de_aplicaciones_de_escritorio_con_Python.md#**Chat Multiusuario con GUI y Cifrado E2E (5/5)**` | `chat-multiusuario-con-gui-y-cifrado-e2e-5-de-5` | 1290 | 9.9 | 17 | bash, python | intermedio |

#### Python para automatizar (`python-automatizacion`)
- **Subtítulo:** Usa Python para automatizar tareas de servidores, probar tu código y empaquetarlo.
- **Áreas:** Programación, Cloud y DevOps · **Nivel:** intermedio — Repasa el lenguaje rápido y se enfoca en entornos, pruebas, Flask y Docker; está pensado para quien ya programa un poco.
- **Prerrequisitos:** Linux desde cero
- **Duración:** 1 h 20 min · 50 lecciones · 52 imágenes · **$35 MXN** · apuntes en: en
- **Portada:** `Cloud&DevOps_Fundamentals/Python/overview/images/pycharm.png` (SUPUESTO: revisar a mano)
- **Lo que aprenderás:**
  - Preparar un entorno de trabajo ordenado para cada proyecto
  - Repasar lo esencial de Python con ejemplos cortos
  - Encontrar y corregir errores en tu código
  - Escribir pruebas automáticas
  - Empaquetar tu programa y meterlo en un contenedor


**Módulo «Panorama y entorno»** — carpeta `Cloud&DevOps_Fundamentals/Python/overview`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 1 | Presentación de Python | `Introduction.md` | `presentacion-de-python` | 587 | 3.1 | 1 | python, shell | intermedio |
| 2 | Historia | `History.md` | `historia` | 246 | 1.4 | 1 | shell | intermedio |
| 3 | Pedir ayuda a Python | `Python Help.md` | `pedir-ayuda-a-python` | 51 | 0.3 | 0 | python | intermedio |
| 4 | Instalación | `Installation.md` | `instalacion` | 22 | 0.1 | 0 | — | intermedio |
| 5 | Entornos virtuales | `Virtual Environments.md` | `entornos-virtuales` | 341 | 2.1 | 2 | shell | intermedio |
| 6 | Instalar paquetes (pip) | `PIP.md` | `instalar-paquetes-pip` | 114 | 0.6 | 0 | shell | intermedio |
| 7 | Ejecutar scripts | `Scripts.md` | `ejecutar-scripts` | 179 | 0.9 | 0 | powershell, python, shell | intermedio |
| 8 | Editores | `Editors - IDEs.md` | `editores` | 107 | 1.3 | 4 | — | intermedio |
| 9 | Primeros pasos | `Python Introduction.md` | `primeros-pasos` | 867 | 4.7 | 2 | python | intermedio |
| 10 | Datos mutables e inmutables | `Working with data.md` | `datos-mutables-e-inmutables` | 336 | 2.5 | 4 | python | intermedio |
| 11 | Operadores | `Operators.md` | `operadores` | 150 | 2.0 | 6 | python | intermedio |
| 12 | Condiciones | `Conditions.md` | `condiciones` | 85 | 0.4 | 0 | python | intermedio |
| 13 | Entrada de datos | `Input.md` | `entrada-de-datos` | 50 | 0.2 | 0 | python | intermedio |
| 14 | Guía de estilo PEP 8 | `PEP8.md` | `guia-de-estilo-pep-8` | 235 | 1.2 | 0 | shell | intermedio |

**Módulo «Sintaxis del lenguaje»** — carpeta `Cloud&DevOps_Fundamentals/Python/Python Language Syntax`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 15 | Ciclos | `Loops.md` | `ciclos` | 291 | 1.9 | 2 | python | intermedio |
| 16 | Números | `Numbers.md` | `numeros` | 23 | 0.3 | 1 | — | intermedio |
| 17 | Textos (strings) | `Strings.md` | `textos-strings` | 475 | 2.6 | 1 | python | intermedio |
| 18 | Listas | `Lists.md` | `listas` | 484 | 3.2 | 4 | python | intermedio |
| 19 | Tuplas | `Tuples.md` | `tuplas` | 194 | 1.2 | 1 | python | intermedio |
| 20 | Diccionarios | `Dictionaries.md` | `diccionarios` | 624 | 3.3 | 1 | python | intermedio |
| 21 | Conjuntos | `Sets.md` | `conjuntos` | 152 | 0.8 | 0 | python | intermedio |
| 22 | Funciones | `Functions.md` | `funciones` | 350 | 1.9 | 1 | python | intermedio |
| 23 | Entrada y salida en consola | `Input and output from console.md` | `entrada-y-salida-en-consola` | 76 | 0.4 | 0 | python | intermedio |

**Módulo «Clases, módulos y paquetes»** — carpeta `Cloud&DevOps_Fundamentals/Python/Classes_Modules_Packaging`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 24 | Alcance de las variables | `Scopes.md` | `alcance-de-las-variables` | 485 | 2.6 | 1 | python | intermedio |
| 25 | Clases | `Class.md` | `clases` | 1082 | 5.6 | 1 | python | intermedio |
| 26 | Módulos | `Modules.md` | `modulos` | 534 | 2.9 | 1 | python | intermedio |
| 27 | Archivos | `Files.md` | `archivos` | 361 | 2.2 | 2 | python, txt | intermedio |
| 28 | Paquetes | `Packages.md` | `paquetes` | 180 | 0.9 | 0 | python, shell | intermedio |
| 29 | Empaquetar tu proyecto | `Packaging.md` | `empaquetar-tu-proyecto` | 438 | 2.2 | 0 | python, shell | intermedio |

**Módulo «Errores, plantillas y web»** — carpeta `Cloud&DevOps_Fundamentals/Python/Debugging_Jinja2 templates_Flask`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 30 | Excepciones | `Exceptions.md` | `excepciones` | 402 | 2.0 | 0 | python | intermedio |
| 31 | Depurar y registrar | `Debugging.md` | `depurar-y-registrar` | 590 | 3.4 | 2 | python, txt, yaml | intermedio |
| 32 | El depurador PDB | `PDB.md` | `el-depurador-pdb` | 208 | 1.2 | 1 | python | intermedio |
| 33 | Plantillas Jinja2 | `Jinja2 templates.md` | `plantillas-jinja2` | 479 | 2.4 | 0 | j2, python, shell, yml | intermedio |
| 34 | Arquitectura de una app web | `Python application architecture.md` | `arquitectura-de-una-app-web` | 568 | 3.0 | 1 | — | intermedio |
| 35 | Flask | `Flask.md` | `flask` | 175 | 0.9 | 0 | python, shell | intermedio |
| 36 | HTTP | `HTTP.md` | `http` | 101 | 1.1 | 3 | — | intermedio |
| 37 | La librería requests | `Requests.md` | `la-libreria-requests` | 202 | 1.2 | 1 | python, shell | intermedio |

**Módulo «Pruebas y contenedores»** — carpeta `Cloud&DevOps_Fundamentals/Python/Testing_Dockerizing`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 38 | Por qué probar tu código | `Testing.md` | `por-que-probar-tu-codigo` | 462 | 3.3 | 5 | — | intermedio |
| 39 | Pruebas unitarias | `Unit test.md` | `pruebas-unitarias` | 776 | 3.9 | 0 | python, shell | intermedio |
| 40 | Cobertura de pruebas | `Nose_Coverage.md` | `cobertura-de-pruebas` | 89 | 0.6 | 1 | shell | intermedio |
| 41 | Tox | `Tox.md` | `tox` | 104 | 0.7 | 1 | — | intermedio |
| 42 | Meter tu app en Docker | `Dockerizing.md` | `meter-tu-app-en-docker` | 307 | 1.7 | 1 | docker, shell | intermedio |

**Módulo «Archivos y carpetas»** — carpeta `Cloud&DevOps_Fundamentals/Python/Work with files`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 43 | Listar una carpeta | `Directory listing.md` | `listar-una-carpeta` | 23 | 0.1 | 0 | python | intermedio |
| 44 | Crear carpetas | `Making directories.md` | `crear-carpetas` | 26 | 0.1 | 0 | python | intermedio |
| 45 | Buscar por patrón | `Filename pattern.md` | `buscar-por-patron` | 29 | 0.1 | 0 | python | intermedio |
| 46 | Recorrer carpetas | `Traversing directory.md` | `recorrer-carpetas` | 70 | 0.3 | 0 | python | intermedio |
| 47 | Carpetas temporales | `Temporary directory.md` | `carpetas-temporales` | 46 | 0.2 | 0 | python | intermedio |
| 48 | Borrar | `Deleting.md` | `borrar` | 46 | 0.2 | 0 | python | intermedio |
| 49 | Copiar y mover | `Copying and moving.md` | `copiar-y-mover` | 79 | 0.4 | 0 | python | intermedio |
| 50 | Comprimir | `Archiving.md` | `comprimir` | 88 | 0.4 | 0 | python | intermedio |

#### Docker desde cero (`docker-desde-cero`)
- **Subtítulo:** Empaqueta programas en contenedores para que funcionen igual en cualquier computadora.
- **Áreas:** Cloud y DevOps, Ciberseguridad · **Nivel:** básico — Los dos primeros módulos van paso a paso con capturas; el tercero (en inglés) profundiza y es intermedio.
- **Prerrequisitos:** Linux desde cero
- **Duración:** 1 h 15 min · 10 lecciones · 61 imágenes · **$35 MXN** · apuntes en: en, es
- **Portada:** `Hacking_introduction/Docker/Construccion/images/003.png` (SUPUESTO: revisar a mano)
- **Lo que aprenderás:**
  - Qué es un contenedor y por qué todos los usan
  - Instalar Docker y levantar tu primer contenedor
  - Crear tu propia imagen con un Dockerfile
  - Conectar el contenedor con tu computadora (puertos y carpetas compartidas)


**Módulo «Introducción»** — carpeta `Hacking_introduction/Docker/Introduccion`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 1 | Introducción a Docker | `Introducción a Docker.md` | `introduccion-a-docker` | 411 | 2.1 | 0 | — | básico |
| 2 | Instalación de Docker en Linux | `Instalación de Docker en Linux.md` | `instalacion-de-docker-en-linux` | 198 | 1.2 | 1 | shell | básico |
| 3 | Definiendo la estructura básica de Dockerfile | `Definiendo la estructura básica de Dockerfile.md` | `definiendo-la-estructura-basica-de-dockerfile` | 266 | 1.7 | 2 | — | básico |

**Módulo «Tu primer contenedor»** — carpeta `Hacking_introduction/Docker/Construccion`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 4 | Creación y construcción de imágenes | `Creación y construcción de imágenes.md` | `creacion-y-construccion-de-imagenes` | 619 | 3.5 | 2 | — | básico |
| 5 | Desplegar tu primer contenedor ★ | `Carga de instrucciones en Docker y desplegando nuestro primer contenedor.md` | `desplegar-tu-primer-contenedor` | 982 | 6.7 | 9 | — | básico |
| 6 | Comandos comunes para la gestión de contenedores | `Comandos comunes para la gestión de contenedores.md` | `comandos-comunes-para-la-gestion-de-contenedores` | 861 | 6.1 | 9 | — | básico |
| 7 | Puertos y carpetas compartidas | `Port Forwarding en Docker y uso de monturas.md` | `puertos-y-carpetas-compartidas` | 2046 | 12.8 | 13 | php, shell | básico |

**Módulo «Docker a fondo»** — carpeta `Cloud&DevOps_Fundamentals/Docker/Theory`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 8 | Lo esencial de Docker | `Docker essentials.md` | `lo-esencial-de-docker` | 3172 | 17.7 | 9 | — | intermedio |
| 9 | Trabajar con Docker | `Working with Docker.md` | `trabajar-con-docker` | 2093 | 12.1 | 8 | — | intermedio |
| 10 | Trabajar con Dockerfile | `Working with Dockerfile.md` | `trabajar-con-dockerfile` | 1919 | 11.2 | 8 | Dockerfile | intermedio |

#### Redes desde cero (`redes-desde-cero`)
- **Subtítulo:** Entiende cómo se comunican las computadoras: direcciones IP, protocolos y subredes.
- **Áreas:** Redes, Ciberseguridad · **Nivel:** básico — Parte de qué es una dirección IP; el subnetting usa cuentas con binario explicadas paso a paso.
- **Prerrequisitos:** ninguno
- **Duración:** 34 min · 12 lecciones · 17 imágenes · **$20 MXN**
- **Portada:** `Hacking_introduction/Conceptos básicos/images/001.png` (SUPUESTO: revisar a mano)
- **Lo que aprenderás:**
  - Qué es una dirección IP y una dirección MAC
  - Cómo viaja la información por capas (modelo OSI)
  - Qué hacen los protocolos TCP y UDP
  - Calcular subredes a mano y con trucos rápidos
  - Dividir una red en partes con VLANs


**Módulo «Direcciones y protocolos»** — carpeta `Hacking_introduction/Conceptos básicos`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 1 | Direcciones IP (IPv4 e IPv6) | `Direcciones IP (IPv4 e IPv6).md` | `direcciones-ip-ipv4-e-ipv6` | 419 | 2.9 | 4 | — | básico |
| 2 | Direcciones MAC (OUI y NIC) | `Direcciones MAC (OUI y NIC).md` | `direcciones-mac-oui-y-nic` | 622 | 4.1 | 5 | — | básico |
| 3 | Protocolos TCP y UDP | `Protocolos comunes (UDP, TCP) y el famoso Three-Way Handshake.md` | `protocolos-tcp-y-udp` | 654 | 3.9 | 3 | SHELL, Shell | básico |
| 4 | Modelo OSI | `Modelo OSI.md` | `modelo-osi` | 376 | 2.1 | 1 | — | básico |

**Módulo «Subredes (subnetting)»** — carpeta `Hacking_introduction/Conceptos básicos`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 5 | Introducción a las subredes | `Subnetting - Introduccion.md` | `introduccion-a-las-subredes` | 558 | 3.0 | 1 | — | básico |
| 6 | CIDR y número de equipos | `Subnetting - CIDRs y cálculo total de hosts.md` | `cidr-y-numero-de-equipos` | 602 | 3.0 | 0 | — | básico |
| 7 | Máscaras y clases de red | `Subnetting – Máscaras de subred, tipos de clase e interpretación de prefijos de red.md` | `mascaras-y-clases-de-red` | 1054 | 5.3 | 0 | — | básico |
| 8 | Interpretar rangos de red | `Subnetting – Interpretación de los rangos de red que el cliente nos ofrece para auditar.md` | `interpretar-rangos-de-red` | 729 | 3.8 | 1 | — | básico |
| 9 | Trucos para calcular rápido | `TIPS de subnetting y cálculo veloz de direccionamiento en redes.md` | `trucos-para-calcular-rapido` | 577 | 3.3 | 2 | shell | básico |

**Módulo «VLANs»** — carpeta `VLANS/Base`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 10 | Qué es una VLAN | `VLANs.md` | `que-es-una-vlan` | 142 | 0.7 | 0 | — | intermedio |
| 11 | Configurar un switch | `Configuracion CLI.md` | `configurar-un-switch` | 121 | 0.6 | 0 | — | intermedio |
| 12 | Buenas prácticas | `Buenas practicas.md` | `buenas-practicas` | 185 | 0.9 | 0 | — | intermedio |

#### Hacking ético: reconocimiento (`hacking-etico-reconocimiento`)
- **Subtítulo:** La primera fase de una auditoría autorizada: descubrir qué equipos, servicios y datos públicos existen.
- **Áreas:** Ciberseguridad · **Nivel:** intermedio — Usa la terminal y conceptos de redes todo el tiempo; necesita Linux y Redes desde cero.
- **Prerrequisitos:** Linux desde cero, Redes desde cero
- **Duración:** 2 h 08 min · 16 lecciones · 167 imágenes · **$35 MXN**
- **Portada:** `Hacking_introduction/Reconocimiento/Hackerone/images/001.PNG` (SUPUESTO: revisar a mano)
- **Aviso ético:** sí
- **Lo que aprenderás:**
  - Elegir un objetivo con permiso (programas de recompensas como HackerOne)
  - Descubrir qué equipos hay en una red y qué servicios ofrecen
  - Encontrar información pública de una organización: subdominios, tecnologías, correos
  - Buscar archivos y rutas ocultas en un sitio web propio o autorizado


**Módulo «Escaneo de red»** — carpeta `Hacking_introduction/Reconocimiento`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 1 | Antes de empezar: un objetivo autorizado | `Hackerone/Validación del objetivo (Fijando un target en HackerOne).md` | `antes-de-empezar-un-objetivo-autorizado` | 365 | 3.0 | 6 | — | intermedio |
| 2 | Nmap y sus modos de escaneo | `EscaneoNmap/Nmap y sus diferentes modos de escaneo.md` | `nmap-y-sus-modos-de-escaneo` | 1016 | 6.9 | 9 | shell | intermedio |
| 3 | Escaneo frente a cortafuegos ⚠ | `EvasionFirewall/Técnicas de evasión de Firewalls.md` | `escaneo-frente-a-cortafuegos` | 2359 | 15.6 | 19 | shell | intermedio |
| 4 | Scripts de Nmap | `ScriptsNmap/Uso de scripts y categorías en nmap para aplicar reconocimiento.md` | `scripts-de-nmap` | 1832 | 13.2 | 20 | shell | intermedio |
| 5 | Tus propios scripts de Nmap | `ScriptsNmap/Creación de tus propios scripts en Lua para nmap.md` | `tus-propios-scripts-de-nmap` | 492 | 3.3 | 4 | shell | intermedio |
| 6 | Escanear puertos sin Nmap | `EscaneoDescriptores/Alternativas para la enumeración de puertos usando descriptores de archivo.md` | `escanear-puertos-sin-nmap` | 786 | 5.7 | 9 | shell | intermedio |
| 7 | Descubrir equipos en tu red | `DescubrirHosts/Descubrimiento de equipos en la red local (ARP e ICMP) y Tips.md` | `descubrir-equipos-en-tu-red` | 1571 | 10.5 | 13 | shell | intermedio |
| 8 | Identificar el sistema operativo | `OS/Identificación y verificación externa de la versión del sistema operativo.md` | `identificar-el-sistema-operativo` | 489 | 2.6 | 1 | — | intermedio |

**Módulo «Información pública (OSINT)»** — carpeta `Hacking_introduction/Reconocimiento`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 9 | Correos públicos de una organización ⚠ | `Correos/Descubrimiento de correos electrónicos.md` | `correos-publicos-de-una-organizacion` | 930 | 7.1 | 12 | — | intermedio |
| 10 | Búsqueda por imágenes | `RecImagen/Reconocimiento de imágenes.md` | `busqueda-por-imagenes` | 496 | 3.1 | 3 | — | intermedio |
| 11 | Encontrar subdominios | `Subdominios/Enumeración de subdominios.md` | `encontrar-subdominios` | 1581 | 11.1 | 16 | shell | intermedio |
| 12 | Filtraciones de datos ⚠ | `BrechasSeguridad/Credenciales y brechas de seguridad.md` | `filtraciones-de-datos` | 712 | 4.6 | 5 | — | intermedio |
| 13 | Búsquedas avanzadas en Google ⚠ | `GoogleDorks/Google Dorks - Google Hacking (Los 18 Dorks más usados).md` | `busquedas-avanzadas-en-google` | 1405 | 9.8 | 14 | — | intermedio |

**Módulo «Reconocimiento web»** — carpeta `Hacking_introduction/Reconocimiento`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 14 | Qué tecnologías usa una web | `TecnologiasWeb/Identificación de las tecnologías en una página web.md` | `que-tecnologias-usa-una-web` | 953 | 5.8 | 5 | shell | intermedio |
| 15 | Buscar rutas ocultas (1 de 2) ⚠ | `Fuzzing/Fuzzing y enumeración de archivos en un servidor web (1-2).md` | `buscar-rutas-ocultas-1-de-2` | 1466 | 9.3 | 10 | shell | intermedio |
| 16 | Buscar rutas ocultas (2 de 2) ⚠ | `Fuzzing/Fuzzing y enumeración de archivos en un servidor web (2-2).md` | `buscar-rutas-ocultas-2-de-2` | 2531 | 16.9 | 21 | shell | intermedio |

#### Hacking ético: enumeración y explotación (`hacking-etico-explotacion`)
- **Subtítulo:** Practica en un laboratorio propio cómo se revisan servicios y sitios web vulnerables.
- **Áreas:** Ciberseguridad · **Nivel:** avanzado — Encadena Docker, Burp Suite, shells y explotación de servicios; supone el curso de reconocimiento.
- **Prerrequisitos:** Hacking ético: reconocimiento, Docker desde cero
- **Duración:** 3 h 20 min · 27 lecciones · 267 imágenes · **$50 MXN**
- **Portada:** `Hacking_introduction/Docker/MaquinasVulnerbales/images/015.png` (SUPUESTO: revisar a mano)
- **Aviso ético:** sí
- **Lo que aprenderás:**
  - Montar un laboratorio con máquinas vulnerables dentro de tu computadora
  - Revisar servicios comunes (FTP, SSH, web, carpetas compartidas) en busca de fallas
  - Revisar sitios hechos con WordPress, Joomla, Drupal o Magento
  - Usar Burp Suite para ver y modificar lo que envía tu navegador
  - Entender cómo funcionan las inyecciones SQL para poder prevenirlas


**Módulo «Tu laboratorio»** — carpeta `Hacking_introduction/Docker/MaquinasVulnerbales`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 1 | Laboratorio con Docker Compose (1 de 2) ⚠ | `Despliegue de máquinas vulnerables con Docker-Compose (1-2).md` | `laboratorio-con-docker-compose-1-de-2` | 1542 | 10.5 | 14 | WEB, shell | avanzado |
| 2 | Laboratorio con Docker Compose (2 de 2) | `Despliegue de máquinas vulnerables con Docker-Compose (2-2).md` | `laboratorio-con-docker-compose-2-de-2` | 1728 | 12.4 | 19 | shell | avanzado |

**Módulo «Revisar servicios comunes»** — carpeta `Hacking_introduction/EnumServComunes`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 3 | Servicio FTP | `FTP/Enumeración del servicio FTP.md` | `servicio-ftp` | 1052 | 6.3 | 5 | shell | avanzado |
| 4 | Servicio SSH | `SSH/Enumeración del servicio SSH.md` | `servicio-ssh` | 1477 | 8.2 | 4 | TXT, docker, shell | avanzado |
| 5 | Servicios HTTP y HTTPS | `HTTP&HTTPS/Enumeración del servicio HTTP y HTTPS.md` | `servicios-http-y-https` | 1610 | 10.9 | 14 | shell | avanzado |
| 6 | Carpetas compartidas (SMB) | `SMB/Enumeración del servicio SMB.md` | `carpetas-compartidas-smb` | 2144 | 12.9 | 11 | shell, smbclient | avanzado |

**Módulo «Gestores de contenido (CMS)»** — carpeta `Hacking_introduction/EnumServComunes/Gestores de contenido (CMS)`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 7 | WordPress (1 de 2) | `Wordpress/1-2/Enumeración de gestores de contenido (CMS) – WordPress (1-2).md` | `wordpress-1-de-2` | 3330 | 24.9 | 41 | WEB, shell, xml | avanzado |
| 8 | WordPress (2 de 2) | `Wordpress/2-2/Enumeración de gestores de contenido (CMS) – WordPress (2-2).md` | `wordpress-2-de-2` | 466 | 2.7 | 2 | shell | avanzado |
| 9 | Joomla | `Joomla/Enumeración de gestores de contenido (CMS) – Joomla.md` | `joomla` | 657 | 4.9 | 8 | php, python3, shell | avanzado |
| 10 | Drupal | `Drupal/Enumeración de gestores de contenido (CMS) – Drupal.md` | `drupal` | 1126 | 8.0 | 12 | POST, shell | avanzado |
| 11 | Magento | `Magento/Enumeración de gestores de contenido (CMS) – Magento.md` | `magento` | 1128 | 8.4 | 14 | shell | avanzado |

**Módulo «Conceptos de explotación»** — carpeta `Hacking_introduction/Conceptos básicos de enumeración y explotación`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 12 | Introducción a la explotación ⚠ | `Introducción.md` | `introduccion-a-la-explotacion` | 149 | 0.7 | 0 | — | avanzado |
| 13 | Introducción a Shells ⚠ | `Shells/Introducción a Shells.md` | `introduccion-a-shells` | 465 | 2.5 | 1 | — | avanzado |
| 14 | Reverse Shell ⚠ | `Shells/Reverse Shell.md` | `reverse-shell` | 1063 | 6.9 | 8 | Dockerfile, PHP, shell, url | avanzado |
| 15 | Bind Shell ⚠ | `Shells/Bind Shell.md` | `bind-shell` | 172 | 1.5 | 3 | shell | avanzado |
| 16 | Forward Shell ⚠ | `Shells/Forward Shell.md` | `forward-shell` | 638 | 4.2 | 5 | shell | avanzado |
| 17 | Tipos de payloads ⚠ | `Tipos de payloads/Tipos de payloads (Staged y Non-taged).md` | `tipos-de-payloads` | 1603 | 11.0 | 15 | msf, shell | avanzado |
| 18 | Explotación manual y automatizada ⚠ | `Tipos de explotación/Tipos de explotación (Manuales y Automatizadas).md` | `explotacion-manual-y-automatizada` | 2329 | 19.2 | 38 | shell | avanzado |
| 19 | Revisar un sistema por dentro ⚠ | `Enumeracion del sistema/Enumeracion del sistema.md` | `revisar-un-sistema-por-dentro` | 1006 | 5.6 | 3 | shell | avanzado |

**Módulo «Burp Suite»** — carpeta `Hacking_introduction/Conceptos básicos de enumeración y explotación/Burpsuite`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 20 | Introducción a Burp Suite ⚠ | `Introduccion a Burpsuite.md` | `introduccion-a-burp-suite` | 853 | 6.1 | 9 | — | avanzado |
| 21 | Proxy ⚠ | `Proxy.md` | `proxy` | 1246 | 8.4 | 11 | — | avanzado |
| 22 | Intruder ⚠ | `Intruder.md` | `intruder` | 1081 | 7.6 | 11 | — | avanzado |
| 23 | Comparer ⚠ | `Comparer.md` | `comparer` | 134 | 1.3 | 3 | — | avanzado |
| 24 | Repeater ⚠ | `Repeater.md` | `repeater` | 140 | 1.7 | 5 | — | avanzado |
| 25 | Decoder ⚠ | `Decoder.md` | `decoder` | 77 | 0.8 | 2 | shell | avanzado |
| 26 | Extensiones ⚠ | `Extensions.md` | `extensiones` | 684 | 4.6 | 6 | python, shell | avanzado |

**Módulo «Vulnerabilidades web»** — carpeta `Hacking_introduction/OWASP TOP 10 y Vulnerabilidades Web/SQLI`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 27 | Introducción a la inyección SQL ⚠ | `Introduccion a SQLI.md` | `introduccion-a-la-inyeccion-sql` | 1520 | 8.2 | 3 | SQL, shell | avanzado |

#### Herramientas de red con Python (`python-redes`)
- **Subtítulo:** Programa tus propios escáneres para revisar qué equipos y servicios hay en tu red.
- **Áreas:** Ciberseguridad, Programación · **Nivel:** intermedio — Supone Python básico y conceptos de redes; cada herramienta crece por versiones.
- **Prerrequisitos:** Python desde cero, Redes desde cero
- **Duración:** 35 min · 7 lecciones · 62 imágenes · **$20 MXN**
- **Portada:** `Python_ofensivo/Offensive/port_scanner/v1_4/images/IMG_001.png` (SUPUESTO: revisar a mano)
- **Aviso ético:** sí
- **Lo que aprenderás:**
  - Programar un escáner de puertos y mejorarlo en cuatro versiones
  - Descubrir equipos de tu red con ICMP y ARP
  - Cambiar la dirección MAC de tu tarjeta de red desde un programa


**Módulo «Escáner de puertos»** — carpeta `Python_ofensivo/Offensive/port_scanner`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 1 | Creando un escáner de puertos (1 de 4) | `v1_4/Creando un escáner de puertos (1-4).md` | `creando-un-escaner-de-puertos-1-de-4` | 591 | 5.0 | 10 | python | intermedio |
| 2 | Creando un escáner de puertos (2 de 4) | `v2_4/Creando un escáner de puertos (2-4).md` | `creando-un-escaner-de-puertos-2-de-4` | 690 | 6.5 | 15 | — | intermedio |
| 3 | Creando un escáner de puertos (3 de 4) | `v3_4/Creando un escáner de puertos (3-4).md` | `creando-un-escaner-de-puertos-3-de-4` | 485 | 3.8 | 7 | — | intermedio |
| 4 | Creando un escáner de puertos (4 de 4) | `v4_4/Creando un escáner de puertos (4-4).md` | `creando-un-escaner-de-puertos-4-de-4` | 387 | 2.9 | 5 | — | intermedio |

**Módulo «Escáneres de red»** — carpeta `Python_ofensivo/Offensive`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 5 | Cambiar la dirección MAC ⚠ | `macchanger/Creando un programa que nos cambie la dirección MAC (macchanger).md` | `cambiar-la-direccion-mac` | 710 | 4.3 | 4 | shell | intermedio |
| 6 | Escáner de red con ICMP | `ICMP_scanner/Creando un escáner de red (ICMP).md` | `escaner-de-red-con-icmp` | 526 | 4.6 | 10 | — | intermedio |
| 7 | Escáner de red con ARP | `ARP_scanner/Creando un escáner de red (ARP) con Scapy.md` | `escaner-de-red-con-arp` | 1062 | 7.5 | 11 | python3, shell | intermedio |

#### Python ofensivo, solo en laboratorio (`python-ofensivo-laboratorio`)
- **Subtítulo:** Cómo se construyen las herramientas de ataque más comunes, para reconocerlas y defenderte. Solo en entornos propios o autorizados.
- **Áreas:** Ciberseguridad · **Nivel:** avanzado — Intercepta tráfico, crea malware de laboratorio y shells remotas; exige Python, redes y criterio ético.
- **Prerrequisitos:** Herramientas de red con Python, Hacking ético: reconocimiento
- **Duración:** 2 h 17 min · 17 lecciones · 225 imágenes · **$35 MXN**
- **Portada:** `None` — ninguna imagen apta: usar ilustración genérica
- **Aviso ético:** sí
- **Lo que aprenderás:**
  - Cómo un atacante intercepta y modifica el tráfico de una red
  - Cómo funcionan un keylogger, un malware y una puerta trasera, para detectarlos
  - Construir una shell remota en tu laboratorio


**Módulo «Interceptar tráfico»** — carpeta `Python_ofensivo/Offensive`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 1 | Envenenamiento ARP ⚠ | `arp_spoofer/Creando un envenenador ARP (ARP Spoofer) con Scapy.md` | `envenenamiento-arp` | 819 | 5.7 | 8 | shell | avanzado |
| 2 | Rastrear consultas DNS ⚠ | `dns_sniffer/Creando un rastreador de consultas DNS (DNS Sniffer) con Scapy.md` | `rastrear-consultas-dns` | 991 | 8.0 | 15 | — | avanzado |
| 3 | Rastrear tráfico HTTP ⚠ | `http_sniffer/Creando un rastreador de consultas HTTP (HTTP Sniffer) con Scapy.md` | `rastrear-trafico-http` | 1129 | 9.6 | 20 | — | avanzado |
| 4 | Rastrear tráfico HTTPS ⚠ | `https_sniffer/Creando un rastreador de consultas HTTPS (HTTPS Sniffer) con mitmdump.md` | `rastrear-trafico-https` | 2715 | 20.4 | 34 | POWERSHELL | avanzado |
| 5 | Rastrear imágenes por HTTPS ⚠ | `https_image_sniffer/Creando un rastreador de imágenes por HTTPS (HTTPS Image Snfifer) con mitmdump.md` | `rastrear-imagenes-por-https` | 453 | 3.3 | 5 | — | avanzado |
| 6 | Suplantar respuestas DNS ⚠ | `dns_spoofer/Creando un DNS Spoofer con Scapy y NetfilterQueue.md` | `suplantar-respuestas-dns` | 2678 | 18.0 | 23 | python3, shell | avanzado |
| 7 | Manipular tráfico ⚠ | `Traffic_Hijacking/Creando un Manipulador e Interceptor de Tráfico (Traffic Hijacking).md` | `manipular-trafico` | 1390 | 8.2 | 6 | shell | avanzado |

**Módulo «Malware y control remoto»** — carpeta `Python_ofensivo/Offensive`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 8 | Keylogger (1 de 2) ⚠ | `Keylogger/Creando un Keylogger (1-2).md` | `keylogger-1-de-2` | 871 | 7.2 | 14 | — | avanzado |
| 9 | Keylogger (2 de 2) ⚠ | `Keylogger/Creando un Keylogger (2-2).md` | `keylogger-2-de-2` | 679 | 5.2 | 9 | shell | avanzado |
| 10 | Malware de laboratorio (1 de 2) ⚠ | `Malware/Creación de Malware (1-2).md` | `malware-de-laboratorio-1-de-2` | 801 | 5.8 | 9 | pip, python3 | avanzado |
| 11 | Malware de laboratorio (2 de 2) ⚠ | `Malware/Creación de Malware (2-2).md` | `malware-de-laboratorio-2-de-2` | 901 | 6.7 | 11 | python | avanzado |
| 12 | Puertas traseras y C&C (1 de 2) ⚠ | `Backdoors y C&c/Creación de Backdoors y Command and Control (C&C) (1-2).md` | `puertas-traseras-y-c-y-c-1-de-2` | 599 | 4.8 | 9 | — | avanzado |
| 13 | Puertas traseras y C&C (2 de 2) ⚠ | `Backdoors y C&c/Creación de Backdoors y Command and Control (C&C) (2-2).md` | `puertas-traseras-y-c-y-c-2-de-2` | 377 | 2.5 | 3 | — | avanzado |
| 14 | Forward shell (1 de 4) ⚠ | `forward_shell/Creación de Forward Shell (1-4).md` | `forward-shell-1-de-4` | 2177 | 16.9 | 30 | shell | avanzado |
| 15 | Forward shell (2 de 4) ⚠ | `forward_shell/Creación de Forward Shell (2-4).md` | `forward-shell-2-de-4` | 868 | 6.7 | 12 | php, shell | avanzado |
| 16 | Forward shell (3 de 4) ⚠ | `forward_shell/Creación de Forward Shell (3-4).md` | `forward-shell-3-de-4` | 646 | 6.0 | 14 | — | avanzado |
| 17 | Forward shell (4 de 4) ⚠ | `forward_shell/Creación de Forward Shell (4-4).md` | `forward-shell-4-de-4` | 290 | 2.0 | 3 | — | avanzado |

#### Tu primera página web (`html-desde-cero`)
- **Subtítulo:** Mini-curso: escribe una página web sencilla con títulos, párrafos y listas.
- **Áreas:** Desarrollo web · **Nivel:** básico — Explica qué es una etiqueta y construye un archivo desde cero; solo necesitas un editor de texto.
- **Prerrequisitos:** ninguno
- **Duración:** 14 min · 4 lecciones · 19 imágenes · **$20 MXN**
- **Portada:** `Full-Stack/HTML/images/strong.png` (SUPUESTO: revisar a mano)
- **Lo que aprenderás:**
  - Qué es HTML y cómo lo lee el navegador
  - Escribir tu primer archivo .html y abrirlo
  - Usar etiquetas para títulos, párrafos y formato de texto


**Módulo «HTML básico»** — carpeta `Full-Stack/HTML`

| # | Lección | Archivo original | Slug | Palabras | Min | Img | Código | Nivel |
|---|---|---|---|---|---|---|---|---|
| 1 | ¿Qué es HTML? | `HTML (Conceptos).md` | `que-es-html` | 308 | 1.5 | 0 | — | básico |
| 2 | Etiquetas | `Etiquetas.md` | `etiquetas` | 301 | 2.5 | 5 | HTML | básico |
| 3 | Estructura de una página | `Estructura HTML.md` | `estructura-de-una-pagina` | 391 | 2.6 | 3 | HTML | básico |
| 4 | Etiquetas para textos ★ | `Etiquetas para textos.md` | `etiquetas-para-textos` | 937 | 6.9 | 11 | HTML | básico |

### 2.3 Lecciones que mejor lucen en la presentación

Candidatas calculadas por script (curso sin aviso ético, ≥ 8 imágenes, 4-25 min; ranking en `datos/ranking_destacadas.json`); entre ellas elegí las que dan un **resultado visible para alguien que no programa**. El ranking puro por imágenes elige lecciones de Python llenas de código, que no ayudan a este público.

| Lección | Curso | Ruta | Imágenes | Min | Código |
|---|---|---|---|---|---|
| Crear una máquina virtual | Linux desde cero | `Linux_Introduction/Introduction/Creando una m quina virtual.md` | 15 | 5.5 | — |
| Comandos básicos (1 de 2) | Linux desde cero | `Linux_Introduction/Temario/Comandos b sicos 1-2.md` | 9 | 5.2 | — |
| Configurando la ZSH e instalando la Powerlevel10k | Personaliza tu escritorio Linux | `Personalizacion_entrono/Personalización_Linux.md#Configurando la ZSH e instalando la Powerlevel10k` | 22 | 17.3 | — |
| Desplegar tu primer contenedor | Docker desde cero | `Hacking_introduction/Docker/Construccion/Carga de instrucciones en Docker y desplegando nuestro primer contenedor.md` | 9 | 6.7 | — |
| Etiquetas para textos | Tu primera página web (HTML) | `Full-Stack/HTML/Etiquetas para textos.md` | 11 | 6.9 | HTML |

- *Comandos básicos (1 de 2)* es la que usa la pantalla 10. Ojo: la pantalla dice «~30 min · 14 imágenes» y la nota real tiene 9 imágenes y ~5 min de lectura.
- *Configurando la ZSH…* y *Etiquetas para textos* son las de resultado más vistoso (terminal con colores e íconos; una página en el navegador).

## 3. Taxonomía: escuelas → áreas → cursos

### 3.1 Escuela de Tecnología (contenido real)

| id | Área | Descripción | Ruta (orden) | Otros cursos | Lecciones | Horas | Cobertura | Estado |
|---|---|---|---|---|---|---|---|---|
| `programacion` | Programación | Aprende a programar con Python, desde tu primer programa hasta apps con ventanas. | Python desde cero → Python práctico: librerías y apps de escritorio | Python para automatizar (DevOps), Herramientas de red con Python | 118 | 12.5 | solida | disponible |
| `ciberseguridad` | Ciberseguridad | Entiende cómo se protege (y cómo se ataca) un sistema, siempre en entornos autorizados. | Linux desde cero → Redes desde cero → Hacking ético: reconocimiento → Docker desde cero → Hacking ético: enumeración y explotación | Python desde cero, Herramientas de red con Python, Python ofensivo (solo en laboratorio) | 131 | 17.1 | solida | disponible |
| `linux` | Linux y terminal | Usa Linux con confianza: instalarlo, moverte con comandos y administrarlo. | Linux desde cero → Automatiza tareas con la terminal (Bash) → Administra un servidor Linux | Personaliza tu escritorio Linux | 80 | 4.5 | solida | disponible |
| `cloud-devops` | Cloud y DevOps | Prepara y automatiza servidores y empaqueta aplicaciones en contenedores. | Linux desde cero → Docker desde cero → Automatiza tareas con la terminal (Bash) → Python para automatizar (DevOps) | Administra un servidor Linux | 126 | 5.5 | basica | disponible |
| `redes` | Redes | Entiende cómo se conectan las computadoras y cómo se organiza una red. | Redes desde cero | — | 12 | 0.6 | basica | disponible |
| `desarrollo-web` | Desarrollo web | Crea páginas y aplicaciones web. | Tu primera página web (HTML) | — | 4 | 0.2 | insuficiente | próximamente |

- Reglas de cobertura: **sólida** = 2 o más cursos con apuntes reales y 3 h o más; **básica** = al menos 1 curso y 30 min; **insuficiente** = lo demás. *Cloud y DevOps* saldría sólida por volumen, pero la bajo a básica a mano: no hay nada de nubes públicas (AWS, Azure, GCP), CI/CD ni Kubernetes.
- **Cursos base:** *Linux desde cero* (Linux, Ciberseguridad, Cloud y DevOps), *Redes desde cero* (Redes, Ciberseguridad) y *Python desde cero* (Programación y requisito de *Herramientas de red con Python*).
- **Próximamente:** Desarrollo web (solo 13 min de HTML). El mini-curso se puede comprar desde el catálogo, pero el área no se recomienda en la orientación.
- *Python ofensivo (solo en laboratorio)* y *Herramientas de red con Python* no están en ninguna ruta por defecto; solo entran si en el diagnóstico de Ciberseguridad se elige «Crear mis propias herramientas» (y en ese caso entran *Python desde cero* y *Herramientas de red*, no el de laboratorio).

### 3.2 Otras escuelas (todo es SUPUESTO)

#### Negocios y Emprendimiento (`negocios`) — disponible · SUPUESTO

Convierte una idea en algo que se vende y consigue tus primeros clientes. Apuntes: `apuntes-demo/negocios`.


| id | Área | Descripción | Cursos | Estado |
|---|---|---|---|---|
| `conseguir-clientes` | Conseguir clientes | Encuentra a quién le sirve lo que haces y consigue tus primeras ventas. | Qué es emprender — Lo que nadie te cuenta antes de empezar un negocio. *(próximamente, $20)*<br>Tus primeros clientes — Aprende a encontrar a quién le sirve lo que haces y a pedir tu primera venta sin sentirte incómodo. *(de muestra, $35)*<br>Hablar para vender (de otra escuela)<br>Precios sin miedo — Calcula cuánto cobrar y dilo con seguridad. *(próximamente, $20)* | disponible |
| `emprender` | Emprender | Pasa de una idea a un proyecto que puedes probar con poco dinero. | Qué es emprender — Lo que nadie te cuenta antes de empezar un negocio. *(próximamente, $20)*<br>Valida tu idea sin gastar — Prueba si alguien pagaría por tu idea antes de invertir. *(próximamente, $35)*<br>Tu propuesta de valor en una hoja — Explica en una hoja por qué te deberían elegir. *(próximamente, $20)* | próximamente |
| `ventas` | Ventas | Vende con seguridad, responde dudas y cierra acuerdos. | Responder objeciones — Qué contestar cuando te dicen «está caro» o «lo pienso». *(próximamente, $35)*<br>Vender por WhatsApp y redes — Conversaciones por mensaje que terminan en venta. *(próximamente, $35)*<br>Precios sin miedo — Calcula cuánto cobrar y dilo con seguridad. *(próximamente, $20)* | próximamente |

#### Comunicación (`comunicacion`) — disponible · SUPUESTO

Habla en público con seguridad y explica tus ideas para convencer. Apuntes: `apuntes-demo/comunicacion`.


| id | Área | Descripción | Cursos | Estado |
|---|---|---|---|---|
| `hablar-en-publico` | Hablar en público | Presenta frente a un grupo sin que los nervios te ganen. | Habla en público sin miedo — Prepara y da una presentación corta con técnicas sencillas para controlar los nervios. *(de muestra, $35)*<br>Presentaciones que se entienden — Diapositivas simples que acompañan, no que distraen. *(próximamente, $35)*<br>Argumentar y convencer — Construye argumentos sólidos y responde objeciones con respeto. *(próximamente, $35)* | disponible |
| `persuasion` | Persuasión | Argumenta, negocia y convence con respeto. | Hablar para vender — Presenta lo que haces en un minuto y deja con ganas de saber más. *(próximamente, $35)*<br>Argumentar y convencer — Construye argumentos sólidos y responde objeciones con respeto. *(próximamente, $35)* | próximamente |
| `escritura` | Escritura | Escribe correos, trabajos y textos que se entienden a la primera. | Correos que sí se leen — Escribe correos cortos y claros a profesores, empresas y clientes. *(próximamente, $20)*<br>Redacción clara para trabajos y tesis — Ordena tus ideas y escribe sin rodeos. *(próximamente, $35)* | próximamente |

#### Habilidades personales (`habilidades`) — disponible · SUPUESTO

Organiza tu tiempo, tu dinero y tus hábitos de estudio. Apuntes: `apuntes-demo/habilidades`.


| id | Área | Descripción | Cursos | Estado |
|---|---|---|---|---|
| `productividad` | Productividad | Organiza tu semana y estudia mejor en menos tiempo. | Tu semana en orden — Descubre a dónde se va tu tiempo y arma una semana realista para estudiar, trabajar y descansar. *(de muestra, $35)*<br>Estudia mejor en menos tiempo — Técnicas de estudio con respaldo: repaso espaciado y autoexamen. *(próximamente, $35)* | disponible |
| `finanzas-personales` | Finanzas personales | Haz un presupuesto, ahorra y evita deudas siendo estudiante. | Tu primer presupuesto — Sabe cuánto entra, cuánto sale y cuánto puedes ahorrar. *(próximamente, $20)*<br>Ahorra siendo estudiante — Metas de ahorro realistas y cómo evitar deudas. *(próximamente, $20)* | próximamente |

#### Diseño y Creatividad (`diseno`) — próximamente · SUPUESTO

Comunica con imágenes: diseño básico, presentaciones y fotografía con tu celular. Apuntes: todavía no hay.


| id | Área | Descripción | Cursos | Estado |
|---|---|---|---|---|
| `diseno-grafico` | Diseño gráfico básico | Usa color, tipografía y espacio para que tus materiales se vean profesionales. | Diseño para no diseñadores — Color, tipografía y espacio para que todo se vea mejor. *(próximamente, $35)*<br>Presentaciones que lucen — Diapositivas limpias con herramientas gratuitas. *(próximamente, $35)* | próximamente |
| `contenido-visual` | Contenido visual | Haz fotos y videos cortos con tu celular para redes y proyectos. | Fotos con tu celular — Luz, encuadre y edición rápida. *(próximamente, $20)*<br>Video corto para redes — Graba y edita videos de 30 segundos que se entienden sin sonido. *(próximamente, $35)* | próximamente |

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

**1. ¿Qué estudias?** (`carrera`)

| Opción | Suma (escuelas, *áreas*) |
|---|---|
| Ingeniería o sistemas | tecnologia +2, *programacion* +1 |
| Administración, contaduría o negocios | negocios +2, *emprender* +1 |
| Comunicación, derecho o humanidades | comunicacion +2, *hablar-en-publico* +1 |
| Diseño, arquitectura o artes | diseno +2, *contenido-visual* +1 |
| Salud, ciencias u otra carrera | habilidades +1, *productividad* +1 |

**2. ¿Qué te gustaría lograr en los próximos meses?** (`lograr`)

| Opción | Suma (escuelas, *áreas*) |
|---|---|
| Conseguir trabajo o prácticas en tecnología | tecnologia +3, *programacion* +1, *ciberseguridad* +1 |
| Emprender o conseguir mis primeros clientes | negocios +3, *conseguir-clientes* +2, *emprender* +1 |
| Hablar en público sin ponerme nervioso | comunicacion +3, *hablar-en-publico* +3 |
| Organizar mejor mi tiempo y mi dinero | habilidades +3, *productividad* +2, *finanzas-personales* +2 |

**3. ¿Qué disfrutas más hacer?** (`disfrutas`)

| Opción | Suma (escuelas, *áreas*) |
|---|---|
| Resolver problemas con la computadora | tecnologia +2, *programacion* +1, *linux* +1 |
| Platicar con gente y convencerla | negocios +1, comunicacion +1, *ventas* +1, *persuasion* +1, *hablar-en-publico* +1 |
| Planear y organizar | habilidades +2, *productividad* +1 |
| Crear cosas visuales | diseno +2, *diseno-grafico* +1 |

**4. Si pudieras empezar mañana, ¿qué harías primero?** (`primer-paso`)

| Opción | Suma (escuelas, *áreas*) |
|---|---|
| Conseguir mi primer cliente o venta | negocios +2, *conseguir-clientes* +2 |
| Entender cómo atacan los hackers para protegerme | tecnologia +2, *ciberseguridad* +3 |
| Crear mi primer programa | tecnologia +2, *programacion* +3 |
| Dar una presentación que salga bien | comunicacion +2, *hablar-en-publico* +2 |
| Hacer un presupuesto que sí cumpla | habilidades +2, *finanzas-personales* +3 |

**Regla:** se suman los puntos; gana la escuela con más puntos (empate: la primera del catálogo) y, dentro de ella, las 1-2 áreas con más puntos. Si la principal está en «próximamente», se avisa y se propone la alternativa disponible más cercana (la disponible con más puntos de la misma escuela; si no hay, la de cualquier escuela). «También te puede servir» es el área disponible con más puntos de **otra** escuela. Caso comprobado por script: *Salud + organizar + planear + presupuesto* → Habilidades / Finanzas personales (próximamente) → aviso y **Productividad**.

### 4.2 Diagnóstico por área

Todas las áreas con un curso disponible o de muestra tienen 5 preguntas: experiencia (2-3), tiempo y objetivo. La pregunta de tiempo es la misma para todas: *Menos de 1 h* → 0,5 h · *1 a 2 h* → 1 h · *3 a 4 h* → 3 h · *5 h o más* → 5 h. Se planea con el **mínimo** del rango, para que la ruta sea realista. Al final de cada diagnóstico se muestra: «No hay respuestas malas: esto solo sirve para saber dónde empezar.»

**Conseguir clientes** (`conseguir-clientes`) — ruta base: Qué es emprender → Tus primeros clientes → Hablar para vender → Precios sin miedo

| Pregunta | Opción | Efecto en la ruta |
|---|---|---|
| 1. ¿Ya tienes algo que ofrecer (un producto o un servicio)? | Todavía no, solo una idea | empieza en *Qué es emprender* |
|  | Sí, pero no sé cómo explicarlo | empieza en *Tus primeros clientes* |
|  | Sí, y sé explicarlo bien | empieza en *Tus primeros clientes* |
| 2. ¿Sabes quién es tu cliente ideal? | No tengo idea | — |
|  | Más o menos | — |
|  | Sí, lo tengo muy claro | lección(es) opcional(es) `tus-primeros-clientes/cliente-ideal` |
| 3. ¿Alguna vez le has vendido algo a alguien? | Nunca | empieza en *Qué es emprender* |
|  | Sí, a amigos o familia | empieza en *Tus primeros clientes* |
|  | Sí, tengo clientes de vez en cuando | empieza en *Tus primeros clientes*; lección(es) opcional(es) `tus-primeros-clientes/donde-encontrarlo` |
| 4. ¿Cuánto tiempo puedes dedicarle a la semana? | Menos de 1 hora | 0.5 h/semana |
|  | De 1 a 2 horas | 1 h/semana |
|  | De 3 a 4 horas | 3 h/semana |
|  | 5 horas o más | 5 h/semana |
| 5. ¿Qué te gustaría lograr al terminar? | Conseguir mi primer cliente lo antes posible | quita Precios sin miedo |
|  | Tener clientes cada mes | — |
|  | Cobrar mejor por lo que hago | quita Hablar para vender |

**Hablar en público** (`hablar-en-publico`) — ruta base: Habla en público sin miedo → Presentaciones que se entienden

| Pregunta | Opción | Efecto en la ruta |
|---|---|---|
| 1. ¿Cuántas veces has hablado frente a un grupo este año? | Nunca | — |
|  | Una o dos veces | — |
|  | Seguido | — |
| 2. Cuando te toca presentar, ¿qué te pasa? | Me bloqueo o se me olvida todo | — |
|  | Me pongo nervioso, pero termino | — |
|  | Me siento tranquilo | lección(es) opcional(es) `habla-en-publico-sin-miedo/por-que-nos-ponemos-nerviosos` |
| 3. ¿Cómo preparas lo que vas a decir? | No lo preparo, improviso | — |
|  | Lo escribo completo y lo leo | — |
|  | Hago un guion con inicio, ideas y cierre | lección(es) opcional(es) `habla-en-publico-sin-miedo/estructura-del-discurso` |
| 4. ¿Cuánto tiempo puedes dedicarle a la semana? | Menos de 1 hora | 0.5 h/semana |
|  | De 1 a 2 horas | 1 h/semana |
|  | De 3 a 4 horas | 3 h/semana |
|  | 5 horas o más | 5 h/semana |
| 5. ¿Para qué lo necesitas más? | Exposiciones de clase | — |
|  | Entrevistas o exámenes orales | quita Presentaciones que se entienden |
|  | Convencer a otros (debates, juicios, juntas) | agrega Argumentar y convencer |

**Productividad** (`productividad`) — ruta base: Tu semana en orden → Estudia mejor en menos tiempo

| Pregunta | Opción | Efecto en la ruta |
|---|---|---|
| 1. ¿Usas agenda o calendario? | Nunca | — |
|  | A veces | — |
|  | Todos los días | lección(es) opcional(es) `tu-semana-en-orden/planea-tu-semana` |
| 2. ¿Sabes en qué se te va el tiempo? | No tengo idea | — |
|  | Más o menos | — |
|  | Sí, lo tengo medido | lección(es) opcional(es) `tu-semana-en-orden/a-donde-se-va-tu-tiempo` |
| 3. ¿Te cuesta concentrarte cuando estudias? | Mucho | — |
|  | A veces | — |
|  | Casi nunca | lección(es) opcional(es) `tu-semana-en-orden/estudia-en-bloques` |
| 4. ¿Cuánto tiempo puedes dedicarle a la semana? | Menos de 1 hora | 0.5 h/semana |
|  | De 1 a 2 horas | 1 h/semana |
|  | De 3 a 4 horas | 3 h/semana |
|  | 5 horas o más | 5 h/semana |
| 5. ¿Qué te gustaría lograr? | Entregar todo a tiempo | quita Estudia mejor en menos tiempo |
|  | Estudiar mejor en menos tiempo | — |
|  | Tener tiempo libre sin culpa | — |

**Ciberseguridad** (`ciberseguridad`) — ruta base: Linux desde cero → Redes desde cero → Hacking ético: reconocimiento → Docker desde cero → Hacking ético: enumeración y explotación

| Pregunta | Opción | Efecto en la ruta |
|---|---|---|
| 1. ¿Has usado Linux o la terminal (la ventana donde se escriben comandos)? | Nunca lo he hecho | — |
|  | Un poco: sé abrirla y escribir algunos comandos | lección(es) opcional(es) `linux-desde-cero/comandos-basicos-1-de-2` |
|  | La uso seguido | empieza en *Redes desde cero* |
| 2. ¿Tienes una máquina virtual o una computadora con Linux para practicar? | No | — |
|  | Sí | omite módulo(s) `linux-desde-cero/preparar-equipo` |
| 3. ¿Sabes qué es una dirección IP? | No | — |
|  | He oído de eso | — |
|  | Sí, y sé calcular subredes | omite módulo(s) `redes-desde-cero/direcciones-y-protocolos`, `redes-desde-cero/subredes` |
| 4. ¿Cuánto tiempo puedes dedicarle a la semana? | Menos de 1 hora | 0.5 h/semana |
|  | De 1 a 2 horas | 1 h/semana |
|  | De 3 a 4 horas | 3 h/semana |
|  | 5 horas o más | 5 h/semana |
| 5. ¿Qué te gustaría lograr? | Entender cómo me pueden atacar, para protegerme | quita Docker desde cero, Hacking ético: enumeración y explotación |
|  | Prepararme para trabajar en ciberseguridad | — |
|  | Crear mis propias herramientas | agrega Python desde cero, Herramientas de red con Python |

**Linux y terminal** (`linux`) — ruta base: Linux desde cero → Automatiza tareas con la terminal (Bash) → Administra un servidor Linux

| Pregunta | Opción | Efecto en la ruta |
|---|---|---|
| 1. ¿Has usado Linux alguna vez? | Nunca lo he hecho | — |
|  | Un poco | — |
|  | Lo uso seguido | empieza en *Automatiza tareas con la terminal (Bash)* |
| 2. ¿Tienes una máquina virtual o una computadora con Linux? | No | — |
|  | Sí | omite módulo(s) `linux-desde-cero/preparar-equipo` |
| 3. ¿Sabes moverte entre carpetas escribiendo comandos? | No | — |
|  | Más o menos | — |
|  | Sí | omite módulo(s) `linux-desde-cero/comandos` |
| 4. ¿Cuánto tiempo puedes dedicarle a la semana? | Menos de 1 hora | 0.5 h/semana |
|  | De 1 a 2 horas | 1 h/semana |
|  | De 3 a 4 horas | 3 h/semana |
|  | 5 horas o más | 5 h/semana |
| 5. ¿Para qué quieres usar Linux? | En mi computadora, y que se vea bien | quita Administra un servidor Linux; agrega Personaliza tu escritorio Linux |
|  | Para automatizar tareas | quita Administra un servidor Linux |
|  | Para administrar servidores | — |

**Programación** (`programacion`) — ruta base: Python desde cero → Python práctico: librerías y apps de escritorio

| Pregunta | Opción | Efecto en la ruta |
|---|---|---|
| 1. ¿Has programado antes? | Nunca lo he hecho | — |
|  | Hice ejercicios en clase | — |
|  | Ya hice proyectos pequeños | empieza en *Python práctico: librerías y apps de escritorio* |
| 2. ¿Has usado Python? | No | — |
|  | Un poco | lección(es) opcional(es) `python-desde-cero/caracteristicas-y-ventajas-de-python`, `python-desde-cero/diferencias-entre-python2-python3-pip2-y-pip3` |
| 3. ¿Sabes qué es una clase o un objeto en programación? | No | — |
|  | Sí | omite módulo(s) `python-desde-cero/objetos` |
| 4. ¿Cuánto tiempo puedes dedicarle a la semana? | Menos de 1 hora | 0.5 h/semana |
|  | De 1 a 2 horas | 1 h/semana |
|  | De 3 a 4 horas | 3 h/semana |
|  | 5 horas o más | 5 h/semana |
| 5. ¿Qué te gustaría poder hacer? | Entender lo básico de programar | quita Python práctico: librerías y apps de escritorio |
|  | Hacer programas con ventanas y botones | — |
|  | Automatizar tareas de servidores | agrega Python para automatizar (DevOps) |

**Cloud y DevOps** (`cloud-devops`) — ruta base: Linux desde cero → Docker desde cero → Automatiza tareas con la terminal (Bash) → Python para automatizar (DevOps)

| Pregunta | Opción | Efecto en la ruta |
|---|---|---|
| 1. ¿Has usado Linux o la terminal? | Nunca lo he hecho | — |
|  | Un poco | — |
|  | La uso seguido | empieza en *Docker desde cero* |
| 2. ¿Has oído hablar de Docker o de los contenedores? | Nunca | — |
|  | He oído, pero no los he usado | — |
|  | Ya los uso | omite módulo(s) `docker-desde-cero/introduccion` |
| 3. ¿Programas en Python? | No | — |
|  | Un poco | — |
|  | Sí | omite módulo(s) `python-automatizacion/panorama`, `python-automatizacion/sintaxis` |
| 4. ¿Cuánto tiempo puedes dedicarle a la semana? | Menos de 1 hora | 0.5 h/semana |
|  | De 1 a 2 horas | 1 h/semana |
|  | De 3 a 4 horas | 3 h/semana |
|  | 5 horas o más | 5 h/semana |
| 5. ¿Qué te gustaría lograr? | Entender qué hace un equipo de DevOps | quita Python para automatizar (DevOps) |
|  | Automatizar mis tareas | — |
|  | Publicar mi propia aplicación | — |

**Redes** (`redes`) — ruta base: Redes desde cero

| Pregunta | Opción | Efecto en la ruta |
|---|---|---|
| 1. ¿Sabes qué es una dirección IP? | No | — |
|  | Más o menos | — |
|  | Sí | lección(es) opcional(es) `redes-desde-cero/direcciones-ip-ipv4-e-ipv6` |
| 2. ¿Has calculado subredes alguna vez? | Nunca lo he hecho | — |
|  | En clase, con ayuda | — |
|  | Sí, con soltura | omite módulo(s) `redes-desde-cero/subredes` |
| 3. ¿Has configurado un router o un switch? | No | — |
|  | Sí | lección(es) opcional(es) `redes-desde-cero/configurar-un-switch` |
| 4. ¿Cuánto tiempo puedes dedicarle a la semana? | Menos de 1 hora | 0.5 h/semana |
|  | De 1 a 2 horas | 1 h/semana |
|  | De 3 a 4 horas | 3 h/semana |
|  | 5 horas o más | 5 h/semana |
| 5. ¿Para qué quieres aprender redes? | Para entender cómo funciona internet | omite módulo(s) `redes-desde-cero/vlans` |
|  | Para empezar en ciberseguridad | agrega Hacking ético: reconocimiento |
|  | Para administrar la red de un lugar | — |

### 4.3 Reglas del roadmap

- **Combinar respuestas:** si varias respuestas fijan un `curso_inicio`, gana el que está más adelante en la ruta y los anteriores se muestran como «Omitido: …». `omitir_lecciones`, `omitir_modulos`, `omitir_cursos` y `agregar_cursos` se unen. `horas_semana` es la de la pregunta de tiempo. (`omitir_cursos` y `agregar_cursos` son una extensión del formato pedido, necesaria para las preguntas de objetivo.)
- **Lecciones omitidas:** se muestran como «ya lo sabes, opcional», no desaparecen.
- **Ritmo:** lecciones por semana = ⌊horas_semana × 60 / minutos promedio por lección del curso⌋ (mínimo 1). Cada curso empieza en una semana nueva. Un curso «próximamente» ocupa ⌈minutos / (horas × 60)⌉ semanas con su nombre.
- **Costo:** suma de los precios de los cursos de la ruta (los próximamente con precio de referencia) y el paquete de la ruta (× 0,85, redondeado hacia abajo a múltiplos de 5).

### 4.4 Perfiles para la presentación (guion de la demo)

#### Perfil 1: Mariana — Administración de empresas

- **Objetivo:** Conseguir sus primeros clientes para un negocio de pasteles por encargo.
- **Orientación:** ¿Qué estudias? → *Administración, contaduría o negocios*; ¿Qué te gustaría lograr en los próximos meses? → *Emprender o conseguir mis primeros clientes*; ¿Qué disfrutas más hacer? → *Platicar con gente y convencerla*; Si pudieras empezar mañana, ¿qué harías primero? → *Conseguir mi primer cliente o venta*
- **Puntos:** negocios 8, comunicacion 1 → **Negocios y Emprendimiento / Conseguir clientes**; también te puede servir: Hablar en público (Escuela de Comunicación)
- **Diagnóstico:** ¿Ya tienes algo que ofrecer (un producto o un servicio)? → *Sí, pero no sé cómo explicarlo*; ¿Sabes quién es tu cliente ideal? → *Más o menos*; ¿Alguna vez le has vendido algo a alguien? → *Sí, a amigos o familia*; ¿Cuánto tiempo puedes dedicarle a la semana? → *De 1 a 2 horas*; ¿Qué te gustaría lograr al terminar? → *Tener clientes cada mes*
- **Se omite:** Qué es emprender (ya lo sabe)
- **Cursos de la ruta:**
  1. Tus primeros clientes — de muestra — 4 lecciones — 1 h 24 min — $35
  2. Hablar para vender — próximamente — sin lecciones todavía — 1 h 10 min — $35
  3. Precios sin miedo — próximamente — sin lecciones todavía — 50 min — $20
- **Ritmo:** 1 h/semana → **5 semanas**, 3 h 24 min en total
- **Costo:** **$90 MXN** (o $75 con el paquete de la ruta)

| Semana | Título de la semana | Lecciones | Min |
|---|---|---|---|
| 1 | ¿Quién es tu cliente ideal? | ¿Quién es tu cliente ideal?; Dónde encontrarlo | 39.3 |
| 2 | Tu primer mensaje | Tu primer mensaje; Cómo pedir la venta | 44.3 |
| 3 | Hablar para vender (1 de 2) | *Hablar para vender* (curso próximamente) | 35.0 |
| 4 | Hablar para vender (2 de 2) | *Hablar para vender* (curso próximamente) | 35.0 |
| 5 | Precios sin miedo | *Precios sin miedo* (curso próximamente) | 50.0 |

#### Perfil 2: Diego — Derecho

- **Objetivo:** Perder el miedo a hablar en público antes de sus audiencias simuladas.
- **Orientación:** ¿Qué estudias? → *Comunicación, derecho o humanidades*; ¿Qué te gustaría lograr en los próximos meses? → *Hablar en público sin ponerme nervioso*; ¿Qué disfrutas más hacer? → *Platicar con gente y convencerla*; Si pudieras empezar mañana, ¿qué harías primero? → *Dar una presentación que salga bien*
- **Puntos:** comunicacion 8, negocios 1 → **Comunicación / Hablar en público**; también te puede servir: ninguna (ninguna otra escuela sumó puntos)
- **Diagnóstico:** ¿Cuántas veces has hablado frente a un grupo este año? → *Una o dos veces*; Cuando te toca presentar, ¿qué te pasa? → *Me bloqueo o se me olvida todo*; ¿Cómo preparas lo que vas a decir? → *Lo escribo completo y lo leo*; ¿Cuánto tiempo puedes dedicarle a la semana? → *De 1 a 2 horas*; ¿Para qué lo necesitas más? → *Convencer a otros (debates, juicios, juntas)*
- **Se omite:** ningún curso
- **Cursos de la ruta:**
  1. Habla en público sin miedo — de muestra — 5 lecciones — 1 h 36 min — $35
  2. Presentaciones que se entienden — próximamente — sin lecciones todavía — 1 h 00 min — $35
  3. Argumentar y convencer — próximamente — sin lecciones todavía — 1 h 20 min — $35
- **Ritmo:** 1 h/semana → **5 semanas**, 3 h 56 min en total
- **Costo:** **$105 MXN** (o $85 con el paquete de la ruta)

| Semana | Título de la semana | Lecciones | Min |
|---|---|---|---|
| 1 | Por qué nos ponemos nerviosos | Por qué nos ponemos nerviosos; La estructura de un buen discurso; Tu voz y tu cuerpo | 59.7 |
| 2 | Ensayar sin público | Ensayar sin público; El día de la presentación y las preguntas | 36.6 |
| 3 | Presentaciones que se entienden | *Presentaciones que se entienden* (curso próximamente) | 60.0 |
| 4 | Argumentar y convencer (1 de 2) | *Argumentar y convencer* (curso próximamente) | 40.0 |
| 5 | Argumentar y convencer (2 de 2) | *Argumentar y convencer* (curso próximamente) | 40.0 |

#### Perfil 3: Valeria — Ingeniería en Mecatrónica (tecnología)

- **Objetivo:** Entrar a ciberseguridad y conseguir prácticas en el área.
- **Orientación:** ¿Qué estudias? → *Ingeniería o sistemas*; ¿Qué te gustaría lograr en los próximos meses? → *Conseguir trabajo o prácticas en tecnología*; ¿Qué disfrutas más hacer? → *Resolver problemas con la computadora*; Si pudieras empezar mañana, ¿qué harías primero? → *Entender cómo atacan los hackers para protegerme*
- **Puntos:** tecnologia 9 → **Tecnología / Ciberseguridad**; también te puede servir: ninguna (ninguna otra escuela sumó puntos)
- **Diagnóstico:** ¿Has usado Linux o la terminal (la ventana donde se escriben comandos)? → *Un poco: sé abrirla y escribir algunos comandos*; ¿Tienes una máquina virtual o una computadora con Linux para practicar? → *Sí*; ¿Sabes qué es una dirección IP? → *He oído de eso*; ¿Cuánto tiempo puedes dedicarle a la semana? → *De 3 a 4 horas*; ¿Qué te gustaría lograr? → *Prepararme para trabajar en ciberseguridad*
- **Se omite:** ningún curso; lecciones opcionales: Comandos básicos (1 de 2); módulos: `linux-desde-cero/preparar-equipo`
- **Cursos de la ruta:**
  1. Linux desde cero — disponible — 4 lecciones (3 omitidas) — 32 min — $20
  2. Redes desde cero — disponible — 12 lecciones — 34 min — $20
  3. Hacking ético: reconocimiento — disponible — 16 lecciones — 2 h 08 min — $35
  4. Docker desde cero — disponible — 10 lecciones — 1 h 15 min — $35
  5. Hacking ético: enumeración y explotación — disponible — 27 lecciones — 3 h 20 min — $50
- **Ritmo:** 3 h/semana → **6 semanas**, 7 h 49 min en total
- **Costo:** **$160 MXN** (o $135 con el paquete de la ruta)

| Semana | Título de la semana | Lecciones | Min |
|---|---|---|---|
| 1 | Comandos básicos (2 de 2) | Comandos básicos (2 de 2); Control de flujo y procesos; Permisos; Permisos especiales | 31.5 |
| 2 | Direcciones IP (IPv4 e IPv6) | Direcciones IP (IPv4 e IPv6); Direcciones MAC (OUI y NIC); Protocolos TCP y UDP; Modelo OSI; Introducción a las subredes; CIDR y número de equipos; Máscaras y clases de red; Interpretar rangos de red; Trucos para calcular rápido; Qué es una VLAN; Configurar un switch; Buenas prácticas | 33.6 |
| 3 | Antes de empezar: un objetivo autorizado | Antes de empezar: un objetivo autorizado; Nmap y sus modos de escaneo; Escaneo frente a cortafuegos; Scripts de Nmap; Tus propios scripts de Nmap; Escanear puertos sin Nmap; Descubrir equipos en tu red; Identificar el sistema operativo; Correos públicos de una organización; Búsqueda por imágenes; Encontrar subdominios; Filtraciones de datos; Búsquedas avanzadas en Google; Qué tecnologías usa una web; Buscar rutas ocultas (1 de 2); Buscar rutas ocultas (2 de 2) | 128.5 |
| 4 | Introducción a Docker | Introducción a Docker; Instalación de Docker en Linux; Definiendo la estructura básica de Dockerfile; Creación y construcción de imágenes; Desplegar tu primer contenedor; Comandos comunes para la gestión de contenedores; Puertos y carpetas compartidas; Lo esencial de Docker; Trabajar con Docker; Trabajar con Dockerfile | 75.1 |
| 5 | Laboratorio con Docker Compose (1 de 2) | Laboratorio con Docker Compose (1 de 2); Laboratorio con Docker Compose (2 de 2); Servicio FTP; Servicio SSH; Servicios HTTP y HTTPS; Carpetas compartidas (SMB); WordPress (1 de 2); WordPress (2 de 2); Joomla; Drupal; Magento; Introducción a la explotación; Introducción a Shells; Reverse Shell; Bind Shell; Forward Shell; Tipos de payloads; Explotación manual y automatizada; Revisar un sistema por dentro; Introducción a Burp Suite; Proxy; Intruder; Comparer; Repeater | 186.8 |
| 6 | Decoder | Decoder; Extensiones; Introducción a la inyección SQL | 13.6 |

Notas sobre los perfiles:
- **Mariana** coincide con la pantalla 06: semanas «Tu cliente ideal / Tu primer mensaje / Hablar para vender / … / Precios sin miedo», «Omitido: Qué es emprender» y **$90 o $75**. Mantengo los cursos de la pantalla: son los que piden sus respuestas. *Hablar para vender* y *Precios sin miedo* quedan en próximamente (un solo curso de muestra por escuela), así que en la demo solo se compra el primero.
- **Diego** recorre todo con el curso de muestra de Comunicación; agrega *Argumentar y convencer* porque eligió «convencer a otros».
- **Valeria** (único perfil de tecnología) recorre Linux → Redes → Hacking ético: reconocimiento → Docker → Hacking ético: explotación (Docker entra porque el laboratorio de explotación lo usa; el validador comprueba que cada prerrequisito vaya antes). La semana 5 junta 24 lecciones porque la fórmula de ritmo usa el **promedio** de minutos; ver Preguntas abiertas. En la presentación conviene enseñar sus lecciones de Linux y no las de explotación.

## 5. Sintaxis de Obsidian que se usa

### 5.1 Conteos y ejemplos

| Elemento | Cantidad | Ejemplos reales |
|---|---|---|
| Imagen con solo el nombre `![[x.png]]` | 1368 | `![[001.png]]` — `Cloud&DevOps_Fundamentals/Bash/Bash_syntax/Bash options.md:22`<br>`![[006.png]]` — `Cloud&DevOps_Fundamentals/Bash/Bash_syntax/Conditions.md:59` |
| … con extensión en mayúsculas `![[x.PNG]]` | 125 | `![[025.PNG]]` — `Hacking_introduction/Reconocimiento/EscaneoDescriptores/Alternativas para la enumeración de puertos usando descriptores de archivo.md:26` |
| Imagen con ruta desde la raíz del vault | 494 | `![[Bash/Text processors - AWK y SED/images/001.png]]` — `Cloud&DevOps_Fundamentals/Bash/Text processors - AWK y SED/Sed command overview.md:7`<br>`![[Conceptos básicos de enumeración y explotación/Burpsuite/images/041.png]]` — `Hacking_introduction/Conceptos básicos de enumeración y explotación/Burpsuite/Comparer.md:7` |
| … con ruta y extensión en mayúsculas | 241 | `![[Conceptos básicos de enumeración y explotación/Tipos de explotación/images/001.PNG]]` — `Hacking_introduction/Conceptos básicos de enumeración y explotación/Tipos de explotación/Tipos de explotación (Manuales y Automatizadas).md:27` |
| Imagen con tamaño `![[x.png\\|300]]` | 0 | — |
| PDF incrustado `![[archivo.pdf]]` | 2 | `![[basic_commands.pdf]]` — `Linux_Introduction/Temario/Comandos b sicos 2-2.md:203` |
| Nota incrustada `![[nota]]` | 1 | `![[README]]` — `Python_ofensivo/Introduction/Módulos_y_paquetes_en_Python.md:452` |
| Enlace a encabezado de la misma nota `[[#Título]]` | 1016 | `[[#Additional Materials]]` — `Cloud&DevOps_Fundamentals/Bash/Bash_Introduction/Additional Materials.md:4` |
| Enlace a nota `[[nota]]` | 220 | `[[Script Development and Invocation]]` — `Cloud&DevOps_Fundamentals/Bash/Bash_Introduction/Additional Materials.md:23`<br>`[[Script Development and Invocation]]` — `Cloud&DevOps_Fundamentals/Bash/Bash_Introduction/Do's and Don'ts.md:35` |
| Enlace a nota con ruta `[[carpeta/nota]]` | 6 | `[[Bash/Bash_Introduction/Shell programming]]` — `Cloud&DevOps_Fundamentals/Bash/Bash_Introduction/Bash startup files.md:36` |
| Enlace con alias `[[ruta/nota\\|alias]]` | 3 | `[[Python/Python Language Syntax/Functions\|Functions]]` — `Cloud&DevOps_Fundamentals/Python/Python Language Syntax/Sets.md:56` |
| Enlace a encabezado de otra nota `[[nota#Título]]` | 1 | `[[Direcciones IP (IPv4 e IPv6)#Índice]]` — `Hacking_introduction/Conceptos básicos/Direcciones MAC (OUI y NIC).md:4` |
| Enlace Markdown externo `[texto](url)` | 184 | `[Advanced Bash-Scripting Guide. An in-depth exploration of the art of shell scripting](https://tldp.org/LDP/abs/html/)` — `Cloud&DevOps_Fundamentals/Bash/Bash_Introduction/Additional Materials.md:13` |
| Imagen Markdown `![](ruta)` | 0 | — |
| HTML embebido (`<br>`, `<p>`, `<pre>`) | 164 | `</br>` — `Personalizacion_entrono/Personalización_Linux.md:57` |
| Tablas (filas separadoras) | 15 | — |
| Resaltado `==texto==` (líneas) | 57 | — |
| Comentario de Obsidian `%%` | 1 | — |
| Callouts `> [!note]` | 0 | — |
| Tags `#tag` | 0 | — |
| Checklists `- [ ]` | 0 | — |
| LaTeX `$...$` | 0 | — |
| Mermaid | 0 | — |
| Frontmatter YAML | 1 | `---` — `Hacking_introduction/Conceptos básicos de enumeración y explotación/Shells/Reverse Shell.md:1` |
| Notas con índice al inicio | 174 | — |
| Notas con «Siguientes apuntes» | 200 | — |

Lenguajes de los bloques de código (923 bloques, 270 sin lenguaje):

| Lenguaje | Bloques | Mayúsculas | Estándar | Normalizar a |
|---|---|---|---|---|
| `shell` | 400 |  |  | `shell` |
| `python` | 179 |  |  | `python` |
| `HTML` | 16 | sí |  | `html` |
| `bash` | 8 |  |  | `bash` |
| `python3` | 8 |  | **no** | `python` |
| `php` | 4 |  |  | `php` |
| `msf` | 3 |  | **no** | `shell` |
| `SQL` | 3 | sí |  | `sql` |
| `pip` | 3 |  | **no** | `shell` |
| `Dockerfile` | 2 | sí |  | `dockerfile` |
| `txt` | 2 |  |  | `text` |
| `docker` | 2 |  | **no** | `shell` |
| `url` | 2 |  | **no** | `text` |
| `Shell` | 2 | sí |  | `shell` |
| `WEB` | 2 | sí | **no** | `text` |
| `xml` | 2 |  |  | `xml` |
| `POWERSHELL` | 2 | sí |  | `powershell` |
| `yaml` | 1 |  |  | `yaml` |
| `j2` | 1 |  | **no** | `jinja` |
| `yml` | 1 |  |  | `yaml` |
| `powershell` | 1 |  |  | `powershell` |
| `PHP` | 1 | sí |  | `php` |
| `SHELL` | 1 | sí |  | `shell` |
| `POST` | 1 | sí | **no** | `http` |
| `smbclient` | 1 |  | **no** | `shell` |
| `TXT` | 1 | sí |  | `text` |
| `shebang` | 1 |  | **no** | `shell` |
| `git` | 1 |  | **no** | `shell` |
| `web` | 1 |  | **no** | `text` |
| `pip3` | 1 |  | **no** | `shell` |
| (sin lenguaje) | 270 |  |  | `text` |

### 5.2 Reglas para resolver `![[...]]` y `[[...]]` (como Obsidian)

1. Quitar `|alias` o `|tamaño` y `#ancla`.
2. Buscar la ruta **relativa a la carpeta de la nota**.
3. Buscar la ruta **relativa a la raíz del vault** (la carpeta de primer nivel, aunque no tenga `.obsidian/`).
4. Buscar **por nombre** dentro del vault. Si hay un candidato, ese; si hay varios, es **ambigua**: se elige el que comparte más carpetas con la nota (normalmente `<carpeta de la nota>/images/`) y se deja fijado en el inventario.
5. Sin coincidencia exacta, repetir sin distinguir mayúsculas (hoy no hace falta: ninguna imagen depende de eso).
6. Para notas `[[nota]]` se prueba con y sin `.md`. `[[#Título]]` se compara con los encabezados de la propia nota quitando `*`, `_`, `` ` `` y los caracteres `: # ^ [ ] | ?`, como hace Obsidian.

### 5.3 Lo que no se resuelve o se resuelve de forma ambigua

- Imágenes rotas: **0**. Imágenes ambiguas: **64** (en ninguna los candidatos son el mismo archivo, así que elegir mal muestra **otra** imagen):

| Nota | Imágenes ambiguas | Candidatos idénticos | Carpeta propuesta (más cercana) |
|---|---|---|---|
| `Linux_Introduction/Introduction/Creando una m quina virtual.md` | 15 | 0 | `Introduction/images` |
| `Python_ofensivo/Offensive/https_sniffer/Creando un rastreador de consultas HTTPS (HTTPS Sniffer) con mitmdump.md` | 13 | 0 | `Offensive/https_sniffer/images` |
| `Linux_Introduction/Introduction/System_installation.md` | 11 | 0 | `Introduction/images` |
| `Hacking_introduction/EnumServComunes/Gestores de contenido (CMS)/Wordpress/1-2/Enumeración de gestores de contenido (CMS) – WordPress (1-2).md` | 7 | 0 | `EnumServComunes/Gestores de contenido (CMS)/Wordpress/1-2/images` |
| `Python_ofensivo/Introduction/Conceptos_básicos_de_Python.md` | 6 | 0 | `images` |
| `Linux_Introduction/Introduction/Sistemas operativos para pentesting.md` | 4 | 0 | `Introduction/images` |
| `Python_ofensivo/Introduction/Introducción_a_Python.md` | 4 | 0 | `images` |
| `Hacking_introduction/Reconocimiento/EvasionFirewall/Técnicas de evasión de Firewalls.md` | 2 | 0 | `Reconocimiento/EvasionFirewall/images` |
| `Cloud&DevOps_Fundamentals/Bash/Bash_syntax/Bash options.md` | 1 | 0 | `Bash/Bash_syntax/images` |
| `Hacking_introduction/Conceptos básicos/TIPS de subnetting y cálculo veloz de direccionamiento en redes.md` | 1 | 0 | `Conceptos básicos/images` |

- Enlaces que no se resuelven y anclas que no coinciden:

| Tipo | Dónde | Enlace |
|---|---|---|
| ancla rota | `Cloud&DevOps_Fundamentals/Python/Classes_Modules_Packaging/Modules.md:4` | `[[#_import_ module1 [, module2 [,... moduleN]]` |
| ancla rota | `Cloud&DevOps_Fundamentals/Python/Classes_Modules_Packaging/Modules.md:6` | `[[#import name1 as new_name [, ... ]]` |
| ancla rota | `Cloud&DevOps_Fundamentals/Python/Classes_Modules_Packaging/Modules.md:7` | `[[#if _ _name _ _ == " _ _main _ _"]]` |
| ancla rota | `Full-Stack/HTML/HTML (Conceptos).md:4` | `[[#Como construyo mi primer archivo]]` |
| ancla rota | `Hacking_introduction/Reconocimiento/EscaneoNmap/Nmap y sus diferentes modos de escaneo.md:7` | `[[#Introduccion]]` |
| rota | `Linux_Introduction/Introduction/Sistemas operativos para pentesting.md:44` | `[[Creando una máquina virtual]]` |
| rota | `Linux_Introduction/Introduction/System_installation.md:58` | `[[Comandos básicos 1-2]]` |
| rota | `Linux_Introduction/Temario/Comandos b sicos 1-2.md:87` | `[[Comandos básicos 2-2]]` |
| ancla rota | `Python_ofensivo/Introduction/Colecciones_y_estructuras_de_datos_en_Python.md:878` | `[[#Índice]]` |
| ancla rota | `Python_ofensivo/Offensive/port_scanner/v1_4/Creando un escáner de puertos (1-4).md:3` | `[[#]]` |

  Los 3 enlaces rotos se arreglan solos al reparar la codificación del nombre (la nota se llama `Comandos b sicos 1-2.md` y el enlace dice `Comandos básicos 1-2`). De las 7 anclas, 3 son falsos positivos por corchetes en el título (`Modules.md`).

### 5.4 Otros elementos

- `![[README]]` incrusta una nota dentro de otra (`Módulos_y_paquetes_en_Python.md`): el conversor debe insertar su contenido o volverlo enlace.
- `![[basic_commands.pdf]]` y `![[bash_redirections.pdf]]` incrustan PDF: mostrarlos como enlace de descarga. Hay 1 GIF y 16 SVG.
- `<br>` y `</br>` sueltos (161), sobre todo en `Personalización_Linux.md`; casi todas las secciones terminan con «Siguientes apuntes» y empiezan con un índice: el lector ya tiene navegación, así que **SUPUESTO**: conviene ocultar esas dos secciones al mostrar la nota.
- Hay **57 líneas con resaltado `==texto==`** (p. ej. `Python_ofensivo/Introduction/Introducción_a_Python.md:94`): el conversor debe pasarlo a `<mark>`.
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

176 de 340 nombres de carpeta o nota tienen algún problema (espacios, acentos o símbolos). Los que tienen codificación rota, símbolos o guion largo:

| Tipo | Ruta | Problemas | Slug propuesto |
|---|---|---|---|
| carpeta | `Cloud&DevOps_Fundamentals` | simbolos | `cloud-y-devops-fundamentals` |
| nota | `Cloud&DevOps_Fundamentals/Bash/Bash_Introduction/Do's and Don'ts.md` | espacios, simbolos | `do-s-and-don-ts` |
| nota | `Cloud&DevOps_Fundamentals/Linux/Linux_Introduction/Unix-Based OS's.md` | espacios, simbolos | `unix-based-os-s` |
| carpeta | `Cloud&DevOps_Fundamentals/Linux/Monitoring, Processes Control, Logs` | espacios, simbolos | `monitoring-processes-control-logs` |
| carpeta | `Cloud&DevOps_Fundamentals/Linux/Networking, Remote Access` | espacios, simbolos | `networking-remote-access` |
| nota | `Cloud&DevOps_Fundamentals/Linux/Package_management/JAVA (OpenJDK).md` | espacios, simbolos | `java-openjdk` |
| carpeta | `Cloud&DevOps_Fundamentals/Linux/Users, Groups, Permissions` | espacios, simbolos | `users-groups-permissions` |
| nota | `Full-Stack/HTML/HTML (Conceptos).md` | espacios, simbolos | `html-conceptos` |
| nota | `Hacking_introduction/Conceptos básicos/Direcciones IP (IPv4 e IPv6).md` | espacios, simbolos | `direcciones-ip-ipv4-e-ipv6` |
| nota | `Hacking_introduction/Conceptos básicos/Direcciones MAC (OUI y NIC).md` | espacios, simbolos | `direcciones-mac-oui-y-nic` |
| nota | `Hacking_introduction/Conceptos básicos/Protocolos comunes (UDP, TCP) y el famoso Three-Way Handshake.md` | espacios, simbolos | `protocolos-comunes-udp-tcp-y-el-famoso-three-way-handshake` |
| nota | `Hacking_introduction/Conceptos básicos/Subnetting – Interpretación de los rangos de red que el cliente nos ofrece para auditar.md` | espacios, acentos, simbolos, guion_largo | `subnetting-interpretacion-de-los-rangos-de-red-que-el-cliente-nos-ofrece-para-auditar` |
| nota | `Hacking_introduction/Conceptos básicos/Subnetting – Máscaras de subred, tipos de clase e interpretación de prefijos de red.md` | espacios, acentos, simbolos, guion_largo | `subnetting-mascaras-de-subred-tipos-de-clase-e-interpretacion-de-prefijos-de-red` |
| nota | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Tipos de explotación/Tipos de explotación (Manuales y Automatizadas).md` | espacios, acentos, simbolos | `tipos-de-explotacion-manuales-y-automatizadas` |
| nota | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Tipos de payloads/Tipos de payloads (Staged y Non-taged).md` | espacios, simbolos | `tipos-de-payloads-staged-y-non-taged` |
| nota | `Hacking_introduction/Docker/MaquinasVulnerbales/Despliegue de máquinas vulnerables con Docker-Compose (1-2).md` | espacios, acentos, simbolos | `despliegue-de-maquinas-vulnerables-con-docker-compose-1-de-2` |
| nota | `Hacking_introduction/Docker/MaquinasVulnerbales/Despliegue de máquinas vulnerables con Docker-Compose (2-2).md` | espacios, acentos, simbolos | `despliegue-de-maquinas-vulnerables-con-docker-compose-2-de-2` |
| carpeta | `Hacking_introduction/EnumServComunes/Gestores de contenido (CMS)` | espacios, simbolos | `gestores-de-contenido-cms` |
| nota | `Hacking_introduction/EnumServComunes/Gestores de contenido (CMS)/Drupal/Enumeración de gestores de contenido (CMS) – Drupal.md` | espacios, acentos, simbolos, guion_largo | `enumeracion-de-gestores-de-contenido-cms-drupal` |
| nota | `Hacking_introduction/EnumServComunes/Gestores de contenido (CMS)/Joomla/Enumeración de gestores de contenido (CMS) – Joomla.md` | espacios, acentos, simbolos, guion_largo | `enumeracion-de-gestores-de-contenido-cms-joomla` |
| nota | `Hacking_introduction/EnumServComunes/Gestores de contenido (CMS)/Magento/Enumeración de gestores de contenido (CMS) – Magento.md` | espacios, acentos, simbolos, guion_largo | `enumeracion-de-gestores-de-contenido-cms-magento` |
| nota | `Hacking_introduction/EnumServComunes/Gestores de contenido (CMS)/Wordpress/1-2/Enumeración de gestores de contenido (CMS) – WordPress (1-2).md` | espacios, acentos, simbolos, guion_largo | `enumeracion-de-gestores-de-contenido-cms-wordpress-1-de-2` |
| nota | `Hacking_introduction/EnumServComunes/Gestores de contenido (CMS)/Wordpress/2-2/Enumeración de gestores de contenido (CMS) – WordPress (2-2).md` | espacios, acentos, simbolos, guion_largo | `enumeracion-de-gestores-de-contenido-cms-wordpress-2-de-2` |
| carpeta | `Hacking_introduction/EnumServComunes/HTTP&HTTPS` | simbolos | `http-y-https` |
| nota | `Hacking_introduction/Reconocimiento/DescubrirHosts/Descubrimiento de equipos en la red local (ARP e ICMP) y Tips.md` | espacios, simbolos | `descubrimiento-de-equipos-en-la-red-local-arp-e-icmp-y-tips` |
| nota | `Hacking_introduction/Reconocimiento/Fuzzing/Fuzzing y enumeración de archivos en un servidor web (1-2).md` | espacios, acentos, simbolos | `fuzzing-y-enumeracion-de-archivos-en-un-servidor-web-1-de-2` |
| nota | `Hacking_introduction/Reconocimiento/Fuzzing/Fuzzing y enumeración de archivos en un servidor web (2-2).md` | espacios, acentos, simbolos | `fuzzing-y-enumeracion-de-archivos-en-un-servidor-web-2-de-2` |
| nota | `Hacking_introduction/Reconocimiento/GoogleDorks/Google Dorks - Google Hacking (Los 18 Dorks más usados).md` | espacios, acentos, simbolos | `google-dorks-google-hacking-los-18-dorks-mas-usados` |
| nota | `Hacking_introduction/Reconocimiento/Hackerone/Validación del objetivo (Fijando un target en HackerOne).md` | espacios, acentos, simbolos | `validacion-del-objetivo-fijando-un-target-en-hackerone` |
| nota | `Linux_Introduction/Introduction/Creando una m quina virtual.md` | codificacion_rota, espacios | `creando-una-maquina-virtual` |
| nota | `Linux_Introduction/Temario/Comandos b sicos 1-2.md` | codificacion_rota, espacios | `comandos-basicos-1-de-2` |
| nota | `Linux_Introduction/Temario/Comandos b sicos 2-2.md` | codificacion_rota, espacios | `comandos-basicos-2-de-2` |
| nota | `Linux_Introduction/Temario/Control de flujo, operadores y procesos en segundo plano.md` | espacios, simbolos | `control-de-flujo-operadores-y-procesos-en-segundo-plano` |
| nota | `Python_ofensivo/Introduction/Programación_Orientada_a_Objetos_en_Python_(POO).md` | acentos, simbolos | `programacion-orientada-a-objetos-en-python-poo` |
| nota | `Python_ofensivo/Offensive/ARP_scanner/Creando un escáner de red (ARP) con Scapy.md` | espacios, acentos, simbolos | `creando-un-escaner-de-red-arp-con-scapy` |
| carpeta | `Python_ofensivo/Offensive/Backdoors y C&c` | espacios, simbolos | `backdoors-y-c-y-c` |
| nota | `Python_ofensivo/Offensive/Backdoors y C&c/Creación de Backdoors y Command and Control (C&C) (1-2).md` | espacios, acentos, simbolos | `creacion-de-backdoors-y-command-and-control-c-y-c-1-de-2` |
| nota | `Python_ofensivo/Offensive/Backdoors y C&c/Creación de Backdoors y Command and Control (C&C) (2-2).md` | espacios, acentos, simbolos | `creacion-de-backdoors-y-command-and-control-c-y-c-2-de-2` |
| nota | `Python_ofensivo/Offensive/ICMP_scanner/Creando un escáner de red (ICMP).md` | espacios, acentos, simbolos | `creando-un-escaner-de-red-icmp` |
| nota | `Python_ofensivo/Offensive/Keylogger/Creando un Keylogger (1-2).md` | espacios, simbolos | `creando-un-keylogger-1-de-2` |
| nota | `Python_ofensivo/Offensive/Keylogger/Creando un Keylogger (2-2).md` | espacios, simbolos | `creando-un-keylogger-2-de-2` |
| nota | `Python_ofensivo/Offensive/Malware/Creación de Malware (1-2).md` | espacios, acentos, simbolos | `creacion-de-malware-1-de-2` |
| nota | `Python_ofensivo/Offensive/Malware/Creación de Malware (2-2).md` | espacios, acentos, simbolos | `creacion-de-malware-2-de-2` |
| nota | `Python_ofensivo/Offensive/Traffic_Hijacking/Creando un Manipulador e Interceptor de Tráfico (Traffic Hijacking).md` | espacios, acentos, simbolos | `creando-un-manipulador-e-interceptor-de-trafico-traffic-hijacking` |
| nota | `Python_ofensivo/Offensive/arp_spoofer/Creando un envenenador ARP (ARP Spoofer) con Scapy.md` | espacios, simbolos | `creando-un-envenenador-arp-arp-spoofer-con-scapy` |
| nota | `Python_ofensivo/Offensive/dns_sniffer/Creando un rastreador de consultas DNS (DNS Sniffer) con Scapy.md` | espacios, simbolos | `creando-un-rastreador-de-consultas-dns-dns-sniffer-con-scapy` |
| nota | `Python_ofensivo/Offensive/forward_shell/Creación de Forward Shell (1-4).md` | espacios, acentos, simbolos | `creacion-de-forward-shell-1-de-4` |
| nota | `Python_ofensivo/Offensive/forward_shell/Creación de Forward Shell (2-4).md` | espacios, acentos, simbolos | `creacion-de-forward-shell-2-de-4` |
| nota | `Python_ofensivo/Offensive/forward_shell/Creación de Forward Shell (3-4).md` | espacios, acentos, simbolos | `creacion-de-forward-shell-3-de-4` |
| nota | `Python_ofensivo/Offensive/forward_shell/Creación de Forward Shell (4-4).md` | espacios, acentos, simbolos | `creacion-de-forward-shell-4-de-4` |
| nota | `Python_ofensivo/Offensive/http_sniffer/Creando un rastreador de consultas HTTP (HTTP Sniffer) con Scapy.md` | espacios, simbolos | `creando-un-rastreador-de-consultas-http-http-sniffer-con-scapy` |
| nota | `Python_ofensivo/Offensive/https_image_sniffer/Creando un rastreador de imágenes por HTTPS (HTTPS Image Snfifer) con mitmdump.md` | espacios, acentos, simbolos | `creando-un-rastreador-de-imagenes-por-https-https-image-snfifer-con-mitmdump` |
| nota | `Python_ofensivo/Offensive/https_sniffer/Creando un rastreador de consultas HTTPS (HTTPS Sniffer) con mitmdump.md` | espacios, simbolos | `creando-un-rastreador-de-consultas-https-https-sniffer-con-mitmdump` |
| nota | `Python_ofensivo/Offensive/macchanger/Creando un programa que nos cambie la dirección MAC (macchanger).md` | espacios, acentos, simbolos | `creando-un-programa-que-nos-cambie-la-direccion-mac-macchanger` |
| nota | `Python_ofensivo/Offensive/port_scanner/v1_4/Creando un escáner de puertos (1-4).md` | espacios, acentos, simbolos | `creando-un-escaner-de-puertos-1-de-4` |
| nota | `Python_ofensivo/Offensive/port_scanner/v2_4/Creando un escáner de puertos (2-4).md` | espacios, acentos, simbolos | `creando-un-escaner-de-puertos-2-de-4` |
| nota | `Python_ofensivo/Offensive/port_scanner/v3_4/Creando un escáner de puertos (3-4).md` | espacios, acentos, simbolos | `creando-un-escaner-de-puertos-3-de-4` |
| nota | `Python_ofensivo/Offensive/port_scanner/v4_4/Creando un escáner de puertos (4-4).md` | espacios, acentos, simbolos | `creando-un-escaner-de-puertos-4-de-4` |

**Choques:** con la ruta completa no hay ninguno. Por nombre de nota dentro de un mismo vault sí: `Shell programming`, `Conditions`, `Functions` y `Loops` existen en `Bash/` y en `Linux/` o `Python/` de `Cloud&DevOps_Fundamentals`. Con el esquema `curso/slug` y los títulos traducidos no chocan (validado por script: los 284 ids reales son únicos).

## 7. Imágenes

| Formato | Archivos | MB |
|---|---|---|
| .png | 1852 | 158.96 |
| .PNG | 370 | 46.38 |
| .svg | 16 | 1.4 |
| .jpeg | 4 | 0.12 |
| .gif | 1 | 0.87 |

- Promedio: 94.8 KB por imagen; 46 pesan más de 500 KB y 4 más de 1 MB.
- 153 nombres de archivo se repiten dentro de un mismo vault (805 archivos): `001.png`, `IMG_001.png`, `7.PNG`… Resolver solo por nombre es el origen de las ambigüedades.
- 370 imágenes tienen extensión `.PNG`. En Linux `.png` y `.PNG` son archivos distintos: hay que copiar el nombre exacto (o normalizarlo y reescribir la referencia al mismo tiempo).

**Las 20 más pesadas:**

| # | Imagen | KB |
|---|---|---|
| 1 | `Python_ofensivo/Offensive/https_sniffer/images/019.PNG` | 1155.2 |
| 2 | `Python_ofensivo/images/IMG_543.png` | 1131.3 |
| 3 | `Linux_Introduction/Introduction/images/22.PNG` | 1070.6 |
| 4 | `Linux_Introduction/Introduction/images/33.PNG` | 1064.4 |
| 5 | `Cloud&DevOps_Fundamentals/Python/Testing_Dockerizing/images/quality_gates.png` | 978.8 |
| 6 | `Hacking_introduction/Reconocimiento/Subdominios/imagenes/009.png` | 954.1 |
| 7 | `Hacking_introduction/Reconocimiento/Fuzzing/images/006.png` | 922.8 |
| 8 | `Cloud&DevOps_Fundamentals/Python/Testing_Dockerizing/images/testing.gif` | 888.8 |
| 9 | `Hacking_introduction/Reconocimiento/Fuzzing/images/005.png` | 824.4 |
| 10 | `Hacking_introduction/Reconocimiento/ScriptsNmap/images/012.PNG` | 821.5 |
| 11 | `Hacking_introduction/Reconocimiento/Fuzzing/images/002.png` | 805.8 |
| 12 | `Hacking_introduction/Reconocimiento/Correos/images/010.png` | 800.8 |
| 13 | `Hacking_introduction/Reconocimiento/ScriptsNmap/images/013.PNG` | 791.5 |
| 14 | `Python_ofensivo/Offensive/https_sniffer/images/022.PNG` | 780.1 |
| 15 | `Hacking_introduction/Reconocimiento/TecnologiasWeb/images/003.png` | 775.0 |
| 16 | `Hacking_introduction/Reconocimiento/GoogleDorks/images/006.png` | 770.0 |
| 17 | `Hacking_introduction/Reconocimiento/ScriptsNmap/images/014.PNG` | 767.5 |
| 18 | `Hacking_introduction/Reconocimiento/ScriptsNmap/images/011.PNG` | 755.7 |
| 19 | `Python_ofensivo/Offensive/Keylogger/images/005.PNG` | 752.9 |
| 20 | `Python_ofensivo/Offensive/https_sniffer/images/020.PNG` | 737.6 |

**Imágenes que ninguna nota usa** (18, 1.16 MB; depende de cómo se resuelvan las ambiguas):

- `Hacking_introduction/Conceptos básicos de enumeración y explotación/Burpsuite/images/007.png`
- `Hacking_introduction/Conceptos básicos de enumeración y explotación/Burpsuite/images/008.png`
- `Hacking_introduction/Conceptos básicos de enumeración y explotación/Burpsuite/images/034.png`
- `Hacking_introduction/EnumServComunes/Gestores de contenido (CMS)/Wordpress/1-2/images/042.png`
- `Hacking_introduction/EnumServComunes/SSH/images/003.png`
- `Hacking_introduction/Reconocimiento/OS/images/002.png`
- `Linux_Introduction/Introduction/images/10.PNG`
- `Linux_Introduction/Introduction/images/13.PNG`
- `Personalizacion_entrono/images/IMG_0026.png`
- `Personalizacion_entrono/images/IMG_0040.png`
- `Python_ofensivo/Offensive/dns_spoofer/images/009.PNG`
- `Python_ofensivo/Offensive/forward_shell/images/047.PNG`
- `Python_ofensivo/Offensive/http_sniffer/images/006.png`
- `Python_ofensivo/images/IMG_116.png`
- `Python_ofensivo/images/IMG_1169.png`
- `Python_ofensivo/images/IMG_617.png`
- `Python_ofensivo/images/IMG_701.png`
- `images/IMG_001.png`

**Imágenes que se usan pero no existen:** 0.

**Cómo servirlas en Astro:**

| Opción | A favor | En contra |
|---|---|---|
| Copiar tal cual a `public/` | Build instantáneo; nada que configurar; rutas predecibles | ~207 MB sin optimizar; sin `srcset`; hay que poner `width`/`height` a mano para evitar saltos |
| `astro:assets` (imágenes relativas en Markdown de una colección) | WebP/AVIF, tamaños responsivos y dimensiones automáticas; el sitio pesaría mucho menos | Procesar ~2 200 imágenes con sharp alarga cada build en limpio (minutos) y usa mucha memoria; la caché ayuda en local, no siempre en CI |

**Recomendación para la demo:** que el script de sincronización copie **solo las imágenes usadas** a `public/apuntes/<curso>/` con nombres normalizados y extensión en minúsculas, y que el lector use `loading="lazy"` con `width`/`height` leídos de la cabecera del PNG. Es lo más simple y transparente. Si después el peso importa, se agrega un paso de conversión a WebP en el mismo script (o se pasa a `astro:assets`) sin cambiar los componentes.

## 8. Contenido sensible

### 8.1 Técnicas ofensivas

Detección por palabras clave en la ruta y en el texto (`buscar_sensibles.py`): 20 notas de riesgo **alto**, 21 **medio** y 31 bajo (reconocimiento, escaneo). Todas las de riesgo alto y medio llevan `sensible: true` en el inventario (41 lecciones):

| Riesgo | Nota | Técnicas detectadas | Curso |
|---|---|---|---|
| alto | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Shells/Bind Shell.md` | shells_remotas, explotacion, reconocimiento | Hacking ético: enumeración y explotación |
| alto | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Shells/Forward Shell.md` | shells_remotas, explotacion, reconocimiento | Hacking ético: enumeración y explotación |
| alto | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Shells/Reverse Shell.md` | shells_remotas, explotacion, reconocimiento | Hacking ético: enumeración y explotación |
| alto | `Python_ofensivo/Offensive/Backdoors y C&c/Creación de Backdoors y Command and Control (C&C) (1-2).md` | backdoor, comando_y_control | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/Backdoors y C&c/Creación de Backdoors y Command and Control (C&C) (2-2).md` | backdoor, comando_y_control | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/Keylogger/Creando un Keylogger (1-2).md` | keylogger | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/Keylogger/Creando un Keylogger (2-2).md` | keylogger | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/Malware/Creación de Malware (1-2).md` | malware, osint_credenciales | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/Malware/Creación de Malware (2-2).md` | malware, osint_credenciales | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/Traffic_Hijacking/Creando un Manipulador e Interceptor de Tráfico (Traffic Hijacking).md` | secuestro_trafico, payloads | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/arp_spoofer/Creando un envenenador ARP (ARP Spoofer) con Scapy.md` | suplantacion_spoofing, envenenamiento_arp | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/dns_sniffer/Creando un rastreador de consultas DNS (DNS Sniffer) con Scapy.md` | captura_trafico | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/dns_spoofer/Creando un DNS Spoofer con Scapy y NetfilterQueue.md` | suplantacion_spoofing, payloads | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/forward_shell/Creación de Forward Shell (1-4).md` | shells_remotas | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/forward_shell/Creación de Forward Shell (2-4).md` | shells_remotas | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/forward_shell/Creación de Forward Shell (3-4).md` | shells_remotas | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/forward_shell/Creación de Forward Shell (4-4).md` | shells_remotas | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/http_sniffer/Creando un rastreador de consultas HTTP (HTTP Sniffer) con Scapy.md` | captura_trafico, osint_credenciales | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/https_image_sniffer/Creando un rastreador de imágenes por HTTPS (HTTPS Image Snfifer) con mitmdump.md` | captura_trafico | Python ofensivo (solo en laboratorio) |
| alto | `Python_ofensivo/Offensive/https_sniffer/Creando un rastreador de consultas HTTPS (HTTPS Sniffer) con mitmdump.md` | captura_trafico, osint_credenciales | Python ofensivo (solo en laboratorio) |
| medio | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Burpsuite/Comparer.md` | explotacion, reconocimiento, proxy_interceptacion | Hacking ético: enumeración y explotación |
| medio | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Burpsuite/Decoder.md` | explotacion, reconocimiento, proxy_interceptacion | Hacking ético: enumeración y explotación |
| medio | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Burpsuite/Extensions.md` | explotacion, reconocimiento, proxy_interceptacion | Hacking ético: enumeración y explotación |
| medio | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Burpsuite/Introduccion a Burpsuite.md` | explotacion, reconocimiento, proxy_interceptacion | Hacking ético: enumeración y explotación |
| medio | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Burpsuite/Intruder.md` | payloads, explotacion, reconocimiento, proxy_interceptacion | Hacking ético: enumeración y explotación |
| medio | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Burpsuite/Proxy.md` | explotacion, reconocimiento, proxy_interceptacion | Hacking ético: enumeración y explotación |
| medio | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Burpsuite/Repeater.md` | explotacion, reconocimiento, proxy_interceptacion | Hacking ético: enumeración y explotación |
| medio | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Enumeracion del sistema/Enumeracion del sistema.md` | explotacion, reconocimiento | Hacking ético: enumeración y explotación |
| medio | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Introducción.md` | shells_remotas, explotacion, reconocimiento | Hacking ético: enumeración y explotación |
| medio | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Shells/Introducción a Shells.md` | shells_remotas, explotacion, reconocimiento | Hacking ético: enumeración y explotación |
| medio | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Tipos de explotación/Tipos de explotación (Manuales y Automatizadas).md` | explotacion, inyeccion_sql, reconocimiento, proxy_interceptacion | Hacking ético: enumeración y explotación |
| medio | `Hacking_introduction/Conceptos básicos de enumeración y explotación/Tipos de payloads/Tipos de payloads (Staged y Non-taged).md` | shells_remotas, payloads, explotacion, reconocimiento | Hacking ético: enumeración y explotación |
| medio | `Hacking_introduction/Docker/MaquinasVulnerbales/Despliegue de máquinas vulnerables con Docker-Compose (1-2).md` | shells_remotas, laboratorio_vulnerable | Hacking ético: enumeración y explotación |
| medio | `Hacking_introduction/OWASP TOP 10 y Vulnerabilidades Web/SQLI/Introduccion a SQLI.md` | inyeccion_sql | Hacking ético: enumeración y explotación |
| medio | `Hacking_introduction/Reconocimiento/BrechasSeguridad/Credenciales y brechas de seguridad.md` | osint_credenciales, reconocimiento | Hacking ético: reconocimiento |
| medio | `Hacking_introduction/Reconocimiento/Correos/Descubrimiento de correos electrónicos.md` | osint_correos, reconocimiento | Hacking ético: reconocimiento |
| medio | `Hacking_introduction/Reconocimiento/EvasionFirewall/Técnicas de evasión de Firewalls.md` | suplantacion_spoofing, evasion_firewall, reconocimiento | Hacking ético: reconocimiento |
| medio | `Hacking_introduction/Reconocimiento/Fuzzing/Fuzzing y enumeración de archivos en un servidor web (1-2).md` | fuerza_bruta, fuzzing, reconocimiento | Hacking ético: reconocimiento |
| medio | `Hacking_introduction/Reconocimiento/Fuzzing/Fuzzing y enumeración de archivos en un servidor web (2-2).md` | fuzzing, reconocimiento, proxy_interceptacion | Hacking ético: reconocimiento |
| medio | `Hacking_introduction/Reconocimiento/GoogleDorks/Google Dorks - Google Hacking (Los 18 Dorks más usados).md` | explotacion, osint_dorks, reconocimiento | Hacking ético: reconocimiento |
| medio | `Python_ofensivo/Offensive/macchanger/Creando un programa que nos cambie la dirección MAC (macchanger).md` | cambio_mac | Herramientas de red con Python |

**Recomendaciones:**
- Aviso fijo en esas lecciones y en la ficha de sus cursos: «Contenido para aprender a defenderse. Practícalo solo en tu propio laboratorio o con autorización por escrito; usarlo contra otros es un delito.»
- **No usar ninguna de estas notas en la presentación.** *Python ofensivo (solo en laboratorio)* lleva `mostrar_en_presentacion: false`; SUPUESTO: también se puede ocultar del catálogo de la demo.
- En el perfil de Valeria se muestra la ruta, pero en vivo se abren solo lecciones de Linux o Redes.

### 8.2 Datos que no deben publicarse

6 hallazgos de severidad alta, 11 media, 26 baja (IPs de ejemplo de manuales y ejercicios de subredes) y 7 falsos positivos. No se encontraron contraseñas reales, tokens, claves de API ni llaves privadas. Valores omitidos a propósito:

| Severidad | Tipo | Archivo | Línea | Motivo (valor omitido) |
|---|---|---|---|---|
| media | correo | `Cloud&DevOps_Fundamentals/Linux/Networking, Remote Access/Remote Access.md` | 70 | Nombre de host interno de una empresa (laboratorio corporativo) |
| media | correo | `Cloud&DevOps_Fundamentals/Linux/Networking, Remote Access/Remote Access.md` | 83 | Nombre de host interno de una empresa (laboratorio corporativo) |
| media | correo | `Cloud&DevOps_Fundamentals/Linux/Networking, Remote Access/Remote Access.md` | 85 | Nombre de host interno de una empresa (laboratorio corporativo) |
| media | correo | `Cloud&DevOps_Fundamentals/Linux/Networking, Remote Access/Remote Access.md` | 87 | Nombre de host interno de una empresa (laboratorio corporativo) |
| media | correo | `Cloud&DevOps_Fundamentals/Linux/Networking, Remote Access/Remote Access.md` | 89 | Nombre de host interno de una empresa (laboratorio corporativo) |
| media | correo | `Cloud&DevOps_Fundamentals/Linux/Networking, Remote Access/Remote Access.md` | 97 | Nombre de host interno de una empresa (laboratorio corporativo) |
| media | correo | `Cloud&DevOps_Fundamentals/Linux/Networking, Remote Access/Remote Access.md` | 98 | Nombre de host interno de una empresa (laboratorio corporativo) |
| media | correo | `Cloud&DevOps_Fundamentals/Linux/Networking, Remote Access/Remote Access.md` | 99 | Nombre de host interno de una empresa (laboratorio corporativo) |
| media | correo | `Cloud&DevOps_Fundamentals/Linux/Networking, Remote Access/Remote Access.md` | 100 | Nombre de host interno de una empresa (laboratorio corporativo) |
| media | correo | `Cloud&DevOps_Fundamentals/Linux/Networking, Remote Access/Remote Access.md` | 108 | Nombre de host interno de una empresa (laboratorio corporativo) |
| media | correo | `Cloud&DevOps_Fundamentals/Linux/Networking, Remote Access/Remote Access.md` | 108 | Nombre de host interno de una empresa (laboratorio corporativo) |
| alta | correo | `Hacking_introduction/Reconocimiento/BrechasSeguridad/Credenciales y brechas de seguridad.md` | 56 | Correo real de una persona de una empresa real, obtenido con OSINT |
| alta | correo | `Hacking_introduction/Reconocimiento/BrechasSeguridad/Credenciales y brechas de seguridad.md` | 56 | Correo real de una persona de una empresa real, obtenido con OSINT |
| alta | correo | `Hacking_introduction/Reconocimiento/Correos/Descubrimiento de correos electrónicos.md` | 53 | Correo real de una persona de una empresa real, obtenido con OSINT |
| alta | correo | `Hacking_introduction/Reconocimiento/Correos/Descubrimiento de correos electrónicos.md` | 91 | Correo real de una persona de una empresa real, obtenido con OSINT |
| alta | correo | `Python_ofensivo/Offensive/Keylogger/Creando un Keylogger (2-2).md` | 35 | Correo personal (gmail) usado en el ejemplo; revisar también las capturas de esa nota (posible contraseña de aplicación) |
| alta | correo | `Python_ofensivo/Offensive/Keylogger/Creando un Keylogger (2-2).md` | 35 | Correo personal (gmail) usado en el ejemplo; revisar también las capturas de esa nota (posible contraseña de aplicación) |

- **Alta:** correos de personas reales de una empresa real (notas de OSINT) y un correo personal en el keylogger. Hay que reemplazarlos en la copia publicada.
- **Media:** nombres de host internos de una empresa (`Remote Access.md`), probablemente de un laboratorio de formación. Conviene cambiarlos por `servidor.ejemplo.com`.
- **No revisado por script:** el texto de las **capturas**. Las notas de OSINT (correos, filtraciones), el keylogger (configuración de una contraseña de aplicación) y las de Burp Suite pueden mostrar datos reales en las imágenes. Hay que revisarlas a mano antes de publicar (ver Preguntas abiertas).

## 9. Catálogo y precios

### 9.1 Regla de precios

- **Regla propuesta:** duración del curso **< 60 min = $20 · 60 a 180 min = $35 · > 180 min = $50 MXN**. Duración = suma de minutos de lectura de sus lecciones (+ minutos de ejercicio en los cursos de muestra).
- **Por qué ajusto la de PROYECTO.md** (< 3 h / 3-8 h / > 8 h): esa regla supone horas de estudio, pero lo medible es el tiempo de lectura de los apuntes, que va de 13 min a 6 h. Con ella, 14 de los 17 cursos a la venta costarían $20, 3 costarían $35 y **ninguno** $50. Con la propuesta: 5 a $20, 9 a $35 y 3 a $50.
- **Próximamente:** recomiendo mostrar un **precio de referencia** con la misma regla (marcado «precio estimado»), porque esos cursos aparecen en las rutas y el costo total los necesita. En el catálogo se puede ocultar.
- **Paquete:** suma de la ruta × 0,85, redondeado hacia abajo al múltiplo de 5; solo con 2 cursos o más. Siempre es más barato que la suma (validado por script).

| Curso | Estado | Duración | Precio (regla propuesta) | Con la regla de PROYECTO.md |
|---|---|---|---|---|
| Linux desde cero | disponible | 46 min | **$20** | $20 |
| Personaliza tu escritorio Linux | disponible | 1 h 32 min | **$35** | $20 |
| Automatiza tareas con la terminal (Bash) | disponible | 49 min | **$20** | $20 |
| Administra un servidor Linux | disponible | 1 h 21 min | **$35** | $20 |
| Python desde cero | disponible | 6 h 11 min | **$50** | $35 |
| Python práctico: librerías y apps de escritorio | disponible | 4 h 26 min | **$50** | $35 |
| Python para automatizar (DevOps) | disponible | 1 h 20 min | **$35** | $20 |
| Docker desde cero | disponible | 1 h 15 min | **$35** | $20 |
| Redes desde cero | disponible | 34 min | **$20** | $20 |
| Hacking ético: reconocimiento | disponible | 2 h 08 min | **$35** | $20 |
| Hacking ético: enumeración y explotación | disponible | 3 h 20 min | **$50** | $35 |
| Herramientas de red con Python | disponible | 35 min | **$20** | $20 |
| Python ofensivo (solo en laboratorio) | disponible | 2 h 17 min | **$35** | $20 |
| Tu primera página web (HTML) | disponible | 14 min | **$20** | $20 |
| Tus primeros clientes | de muestra | 1 h 24 min | **$35** | $20 |
| Habla en público sin miedo | de muestra | 1 h 36 min | **$35** | $20 |
| Tu semana en orden | de muestra | 1 h 17 min | **$35** | $20 |
| Qué es emprender | próximamente | 45 min | **$20** | $20 |
| Valida tu idea sin gastar | próximamente | 1 h 10 min | **$35** | $20 |
| Tu propuesta de valor en una hoja | próximamente | 50 min | **$20** | $20 |
| Precios sin miedo | próximamente | 50 min | **$20** | $20 |
| Responder objeciones | próximamente | 1 h 00 min | **$35** | $20 |
| Vender por WhatsApp y redes | próximamente | 1 h 00 min | **$35** | $20 |
| Hablar para vender | próximamente | 1 h 10 min | **$35** | $20 |
| Argumentar y convencer | próximamente | 1 h 20 min | **$35** | $20 |
| Presentaciones que se entienden | próximamente | 1 h 00 min | **$35** | $20 |
| Correos que sí se leen | próximamente | 40 min | **$20** | $20 |
| Redacción clara para trabajos y tesis | próximamente | 1 h 30 min | **$35** | $20 |
| Estudia mejor en menos tiempo | próximamente | 1 h 00 min | **$35** | $20 |
| Tu primer presupuesto | próximamente | 50 min | **$20** | $20 |
| Ahorra siendo estudiante | próximamente | 45 min | **$20** | $20 |
| Diseño para no diseñadores | próximamente | 1 h 10 min | **$35** | $20 |
| Presentaciones que lucen | próximamente | 1 h 00 min | **$35** | $20 |
| Fotos con tu celular | próximamente | 50 min | **$20** | $20 |
| Video corto para redes | próximamente | 1 h 00 min | **$35** | $20 |

**Paquetes por área** (ruta completa del área; el paquete de una ruta personal se calcula igual con sus cursos):

| Escuela | Área | Cursos de la ruta | Suma | Paquete |
|---|---|---|---|---|
| Tecnología | Programación | $50 + $50 | $100 | **$85** |
| Tecnología | Ciberseguridad | $20 + $20 + $35 + $35 + $50 | $160 | **$135** |
| Tecnología | Linux y terminal | $20 + $20 + $35 | $75 | **$60** |
| Tecnología | Cloud y DevOps | $20 + $35 + $20 + $35 | $110 | **$90** |
| Negocios y Emprendimiento | Conseguir clientes | $20 + $35 + $35 + $20 | $110 | **$90** |
| Negocios y Emprendimiento | Emprender | $20 + $35 + $20 | $75 | **$60** |
| Negocios y Emprendimiento | Ventas | $35 + $35 | $70 | **$55** |
| Comunicación | Hablar en público | $35 + $35 | $70 | **$55** |
| Comunicación | Persuasión | $35 + $35 | $70 | **$55** |
| Comunicación | Escritura | $20 + $35 | $55 | **$45** |
| Habilidades personales | Productividad | $35 + $35 | $70 | **$55** |
| Habilidades personales | Finanzas personales | $20 + $20 | $40 | **$30** |
| Diseño y Creatividad | Diseño gráfico básico | $35 + $35 | $70 | **$55** |
| Diseño y Creatividad | Contenido visual | $20 + $35 | $55 | **$45** |

### 9.2 Fichas de la tienda

| Campo | Valor |
|---|---|
| Título | **Linux desde cero** |
| Subtítulo | Instala Linux en una máquina virtual, sin tocar tu sistema, y aprende a moverte con comandos. |
| Escuela | Tecnología |
| Área(s) | Linux y terminal, Ciberseguridad, Cloud y DevOps |
| Nivel | básico |
| Duración | 46 min |
| Lecciones | 7 |
| Lo que aprenderás | • Crear una computadora virtual para practicar sin riesgo de romper la tuya<br>• Instalar Linux paso a paso<br>• Moverte entre carpetas y crear, copiar y buscar archivos escribiendo comandos<br>• Encadenar comandos y dejar tareas trabajando en segundo plano<br>• Decidir quién puede ver o cambiar cada archivo (permisos) |
| Portada | `Linux_Introduction/Temario/images/1.png` |
| Prerrequisitos | ninguno |
| Precio | $20 MXN |
| Aviso ético | no |

| Campo | Valor |
|---|---|
| Título | **Personaliza tu escritorio Linux** |
| Subtítulo | Convierte un Linux recién instalado en un escritorio rápido, bonito y a tu gusto. |
| Escuela | Tecnología |
| Área(s) | Linux y terminal |
| Nivel | intermedio |
| Duración | 1 h 32 min |
| Lecciones | 14 |
| Lo que aprenderás | • Cambiar el escritorio por un gestor de ventanas ligero que se maneja con el teclado<br>• Agregar una barra superior con la hora, la red y tus atajos<br>• Elegir fuentes, colores, transparencias y fondo de pantalla<br>• Dejar la terminal con colores, autocompletado e íconos |
| Portada | `Personalizacion_entrono/images/IMG_0003.jpeg` |
| Prerrequisitos | Linux desde cero |
| Precio | $35 MXN |
| Aviso ético | no |

| Campo | Valor |
|---|---|
| Título | **Automatiza tareas con la terminal (Bash)** |
| Subtítulo | Escribe pequeños programas de terminal que hacen por ti las tareas repetitivas. |
| Escuela | Tecnología |
| Área(s) | Linux y terminal, Cloud y DevOps |
| Nivel | intermedio |
| Duración | 49 min |
| Lecciones | 26 |
| Lo que aprenderás | • Qué es una terminal y qué tipos existen<br>• Escribir tu primer script con variables, condiciones y repeticiones<br>• Guardar y reutilizar resultados de comandos (redirecciones y tuberías)<br>• Buscar y transformar texto con AWK y SED<br>• Seguir una guía de estilo para que otros entiendan tus scripts |
| Portada | `Cloud&DevOps_Fundamentals/Bash/Bash_syntax/images/002.png` |
| Prerrequisitos | Linux desde cero |
| Precio | $20 MXN |
| Aviso ético | no |

| Campo | Valor |
|---|---|
| Título | **Administra un servidor Linux** |
| Subtítulo | Lo que necesitas para cuidar un servidor: discos, programas, usuarios, red y registros. |
| Escuela | Tecnología |
| Área(s) | Linux y terminal, Cloud y DevOps |
| Nivel | intermedio |
| Duración | 1 h 21 min |
| Lecciones | 33 |
| Lo que aprenderás | • Cómo se organiza Linux por dentro: discos, carpetas y arranque<br>• Instalar programas y programar tareas automáticas<br>• Crear usuarios y controlar a qué puede entrar cada uno<br>• Conectarte a otra computadora de forma segura (SSH)<br>• Revisar el uso de memoria, disco y los registros del sistema |
| Portada | `Cloud&DevOps_Fundamentals/Linux/Linux_shell_basics/images/vim_navigation.png` |
| Prerrequisitos | Linux desde cero |
| Precio | $35 MXN |
| Aviso ético | no |

| Campo | Valor |
|---|---|
| Título | **Python desde cero** |
| Subtítulo | Aprende a programar con Python, el lenguaje más usado para empezar, con proyectos pequeños. |
| Escuela | Tecnología |
| Área(s) | Programación, Ciberseguridad |
| Nivel | básico |
| Duración | 6 h 11 min |
| Lecciones | 35 |
| Lo que aprenderás | • Escribir y ejecutar tus primeros programas<br>• Guardar datos en listas y diccionarios y recorrerlos<br>• Organizar tu código en funciones, clases y módulos<br>• Leer y escribir archivos<br>• Construir proyectos pequeños, como un gestor de biblioteca o de notas |
| Portada | `Python_ofensivo/images/IMG_053.png` |
| Prerrequisitos | ninguno |
| Precio | $50 MXN |
| Aviso ético | no |

| Campo | Valor |
|---|---|
| Título | **Python práctico: librerías y apps de escritorio** |
| Subtítulo | Usa las herramientas que ya trae Python para trabajar con fechas, archivos, internet y ventanas. |
| Escuela | Tecnología |
| Área(s) | Programación |
| Nivel | intermedio |
| Duración | 4 h 26 min |
| Lecciones | 26 |
| Lo que aprenderás | • Manejar fechas, textos con patrones y carpetas desde Python<br>• Pedir información a páginas web desde tu programa<br>• Hacer que tu programa haga varias cosas a la vez<br>• Crear aplicaciones con ventanas y botones<br>• Construir un chat entre varias personas con mensajes cifrados |
| Portada | `Python_ofensivo/images/IMG_683.png` |
| Prerrequisitos | Python desde cero |
| Precio | $50 MXN |
| Aviso ético | no |

| Campo | Valor |
|---|---|
| Título | **Python para automatizar (DevOps)** |
| Subtítulo | Usa Python para automatizar tareas de servidores, probar tu código y empaquetarlo. |
| Escuela | Tecnología |
| Área(s) | Programación, Cloud y DevOps |
| Nivel | intermedio |
| Duración | 1 h 20 min |
| Lecciones | 50 |
| Lo que aprenderás | • Preparar un entorno de trabajo ordenado para cada proyecto<br>• Repasar lo esencial de Python con ejemplos cortos<br>• Encontrar y corregir errores en tu código<br>• Escribir pruebas automáticas<br>• Empaquetar tu programa y meterlo en un contenedor |
| Portada | `Cloud&DevOps_Fundamentals/Python/overview/images/pycharm.png` |
| Prerrequisitos | Linux desde cero |
| Precio | $35 MXN |
| Aviso ético | no |

| Campo | Valor |
|---|---|
| Título | **Docker desde cero** |
| Subtítulo | Empaqueta programas en contenedores para que funcionen igual en cualquier computadora. |
| Escuela | Tecnología |
| Área(s) | Cloud y DevOps, Ciberseguridad |
| Nivel | básico |
| Duración | 1 h 15 min |
| Lecciones | 10 |
| Lo que aprenderás | • Qué es un contenedor y por qué todos los usan<br>• Instalar Docker y levantar tu primer contenedor<br>• Crear tu propia imagen con un Dockerfile<br>• Conectar el contenedor con tu computadora (puertos y carpetas compartidas) |
| Portada | `Hacking_introduction/Docker/Construccion/images/003.png` |
| Prerrequisitos | Linux desde cero |
| Precio | $35 MXN |
| Aviso ético | no |

| Campo | Valor |
|---|---|
| Título | **Redes desde cero** |
| Subtítulo | Entiende cómo se comunican las computadoras: direcciones IP, protocolos y subredes. |
| Escuela | Tecnología |
| Área(s) | Redes, Ciberseguridad |
| Nivel | básico |
| Duración | 34 min |
| Lecciones | 12 |
| Lo que aprenderás | • Qué es una dirección IP y una dirección MAC<br>• Cómo viaja la información por capas (modelo OSI)<br>• Qué hacen los protocolos TCP y UDP<br>• Calcular subredes a mano y con trucos rápidos<br>• Dividir una red en partes con VLANs |
| Portada | `Hacking_introduction/Conceptos básicos/images/001.png` |
| Prerrequisitos | ninguno |
| Precio | $20 MXN |
| Aviso ético | no |

| Campo | Valor |
|---|---|
| Título | **Hacking ético: reconocimiento** |
| Subtítulo | La primera fase de una auditoría autorizada: descubrir qué equipos, servicios y datos públicos existen. |
| Escuela | Tecnología |
| Área(s) | Ciberseguridad |
| Nivel | intermedio |
| Duración | 2 h 08 min |
| Lecciones | 16 |
| Lo que aprenderás | • Elegir un objetivo con permiso (programas de recompensas como HackerOne)<br>• Descubrir qué equipos hay en una red y qué servicios ofrecen<br>• Encontrar información pública de una organización: subdominios, tecnologías, correos<br>• Buscar archivos y rutas ocultas en un sitio web propio o autorizado |
| Portada | `Hacking_introduction/Reconocimiento/Hackerone/images/001.PNG` |
| Prerrequisitos | Linux desde cero, Redes desde cero |
| Precio | $35 MXN |
| Aviso ético | sí |

| Campo | Valor |
|---|---|
| Título | **Hacking ético: enumeración y explotación** |
| Subtítulo | Practica en un laboratorio propio cómo se revisan servicios y sitios web vulnerables. |
| Escuela | Tecnología |
| Área(s) | Ciberseguridad |
| Nivel | avanzado |
| Duración | 3 h 20 min |
| Lecciones | 27 |
| Lo que aprenderás | • Montar un laboratorio con máquinas vulnerables dentro de tu computadora<br>• Revisar servicios comunes (FTP, SSH, web, carpetas compartidas) en busca de fallas<br>• Revisar sitios hechos con WordPress, Joomla, Drupal o Magento<br>• Usar Burp Suite para ver y modificar lo que envía tu navegador<br>• Entender cómo funcionan las inyecciones SQL para poder prevenirlas |
| Portada | `Hacking_introduction/Docker/MaquinasVulnerbales/images/015.png` |
| Prerrequisitos | Hacking ético: reconocimiento, Docker desde cero |
| Precio | $50 MXN |
| Aviso ético | sí |

| Campo | Valor |
|---|---|
| Título | **Herramientas de red con Python** |
| Subtítulo | Programa tus propios escáneres para revisar qué equipos y servicios hay en tu red. |
| Escuela | Tecnología |
| Área(s) | Ciberseguridad, Programación |
| Nivel | intermedio |
| Duración | 35 min |
| Lecciones | 7 |
| Lo que aprenderás | • Programar un escáner de puertos y mejorarlo en cuatro versiones<br>• Descubrir equipos de tu red con ICMP y ARP<br>• Cambiar la dirección MAC de tu tarjeta de red desde un programa |
| Portada | `Python_ofensivo/Offensive/port_scanner/v1_4/images/IMG_001.png` |
| Prerrequisitos | Python desde cero, Redes desde cero |
| Precio | $20 MXN |
| Aviso ético | sí |

| Campo | Valor |
|---|---|
| Título | **Python ofensivo (solo en laboratorio)** |
| Subtítulo | Cómo se construyen las herramientas de ataque más comunes, para reconocerlas y defenderte. Solo en entornos propios o autorizados. |
| Escuela | Tecnología |
| Área(s) | Ciberseguridad |
| Nivel | avanzado |
| Duración | 2 h 17 min |
| Lecciones | 17 |
| Lo que aprenderás | • Cómo un atacante intercepta y modifica el tráfico de una red<br>• Cómo funcionan un keylogger, un malware y una puerta trasera, para detectarlos<br>• Construir una shell remota en tu laboratorio |
| Portada | ilustración genérica |
| Prerrequisitos | Herramientas de red con Python, Hacking ético: reconocimiento |
| Precio | $35 MXN |
| Aviso ético | sí |

| Campo | Valor |
|---|---|
| Título | **Tu primera página web (HTML)** |
| Subtítulo | Mini-curso: escribe una página web sencilla con títulos, párrafos y listas. |
| Escuela | Tecnología |
| Área(s) | Desarrollo web |
| Nivel | básico |
| Duración | 14 min |
| Lecciones | 4 |
| Lo que aprenderás | • Qué es HTML y cómo lo lee el navegador<br>• Escribir tu primer archivo .html y abrirlo<br>• Usar etiquetas para títulos, párrafos y formato de texto |
| Portada | `Full-Stack/HTML/images/strong.png` |
| Prerrequisitos | ninguno |
| Precio | $20 MXN |
| Aviso ético | no |

| Campo | Valor |
|---|---|
| Título | **Tus primeros clientes** · *curso de muestra (SUPUESTO)* |
| Subtítulo | Aprende a encontrar a quién le sirve lo que haces y a pedir tu primera venta sin sentirte incómodo. |
| Escuela | Negocios y Emprendimiento |
| Área(s) | Conseguir clientes |
| Nivel | básico |
| Duración | 1 h 24 min |
| Lecciones | 4 |
| Lo que aprenderás | • Describir a tu cliente ideal en una frase<br>• Saber dónde buscarlo, en línea y en persona<br>• Escribir tu primer mensaje sin sonar a spam<br>• Pedir la venta y responder a un «lo pienso» |
| Portada | `apuntes-demo/negocios/tus-primeros-clientes/images/portada.png` |
| Prerrequisitos | ninguno |
| Precio | $35 MXN |
| Aviso ético | no |

| Campo | Valor |
|---|---|
| Título | **Habla en público sin miedo** · *curso de muestra (SUPUESTO)* |
| Subtítulo | Prepara y da una presentación corta con técnicas sencillas para controlar los nervios. |
| Escuela | Comunicación |
| Área(s) | Hablar en público |
| Nivel | básico |
| Duración | 1 h 36 min |
| Lecciones | 5 |
| Lo que aprenderás | • Calmar los nervios en dos minutos antes de hablar<br>• Ordenar lo que vas a decir con una estructura de inicio, tres ideas y cierre<br>• Usar tu voz y tu cuerpo para que te pongan atención<br>• Ensayar solo y responder preguntas difíciles |
| Portada | `apuntes-demo/comunicacion/habla-en-publico-sin-miedo/images/portada.png` |
| Prerrequisitos | ninguno |
| Precio | $35 MXN |
| Aviso ético | no |

| Campo | Valor |
|---|---|
| Título | **Tu semana en orden** · *curso de muestra (SUPUESTO)* |
| Subtítulo | Descubre a dónde se va tu tiempo y arma una semana realista para estudiar, trabajar y descansar. |
| Escuela | Habilidades personales |
| Área(s) | Productividad |
| Nivel | básico |
| Duración | 1 h 17 min |
| Lecciones | 4 |
| Lo que aprenderás | • Medir a dónde se va tu tiempo durante tres días<br>• Separar lo urgente de lo importante<br>• Planear tu semana en 20 minutos<br>• Estudiar en bloques cortos con descansos |
| Portada | `apuntes-demo/habilidades/tu-semana-en-orden/images/portada.png` |
| Prerrequisitos | ninguno |
| Precio | $35 MXN |
| Aviso ético | no |

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
   - 64 imágenes ambiguas y 3 enlaces rotos: la sincronización debe fallar o avisar si aparece una nueva.
   - 112 lecciones están en inglés (cursos de `Cloud&DevOps_Fundamentals` y el módulo «Docker a fondo»): chocan con el público de la demo.
   - Tiempo de build: ~300 páginas es poco; el riesgo son las imágenes si se usa `astro:assets`.
   - Clonar 217 MB en CI: usar `--depth 1` y caché.
   - El conteo de minutos es solo de lectura; no incluye practicar.

## Validación automática

Resultado de `validar.py` (ids de `diagnostico.json` contra `inventario.json`, precios, perfiles):

- OK: ids de lección únicos (297)
- OK: referencias internas del inventario revisadas
- OK: ids de diagnostico.json revisados contra inventario.json (y prerrequisitos de las rutas)
- OK: 35 precios entre $20 y $50
- OK: perfiles de tecnología: 1 (['Valeria'])
- OK: 8 áreas con diagnóstico
- OK: orientación con 4 preguntas
- Aviso: escuela diseno sin curso de muestra (próximamente a propósito)
- Aviso: imágenes ambiguas en lecciones del inventario: 60
- Aviso: enlaces rotos en lecciones del inventario: 0

## Preguntas abiertas

1. **Escuelas sin apuntes:** ¿escribimos un curso de muestra para Habilidades personales (como pide PROMPT_ANALISIS) o la dejamos en «próximamente» como en la pantalla 02? Si se deja, ¿quitamos la escuela de Diseño?
2. **Ruta de Mariana:** *Hablar para vender* y *Precios sin miedo* quedan en próximamente. ¿Escribimos también esos dos cursos para que la ruta de la pantalla 06 se pueda comprar completa en la demo?
3. **Precios:** ¿aceptan la regla ajustada a minutos de lectura (< 1 h / 1-3 h / > 3 h) o prefieren sumar un tiempo de práctica estimado y conservar la de PROYECTO.md?
4. **Apuntes en inglés:** 112 lecciones de `Cloud&DevOps_Fundamentals` están en inglés. ¿Se traducen, se marcan «Apuntes en inglés» o se dejan fuera de la demo?
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
