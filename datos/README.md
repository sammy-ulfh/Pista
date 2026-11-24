# datos/ — todo lo que se edita sin programar

Aquí están las escuelas, los cursos, las preguntas, las reglas y el plan. Es la **fuente de verdad**: se
generó una sola vez desde `analisis/` (con `scripts/importar-analisis.mjs`) y desde entonces se edita a mano.
Después de cualquier cambio, corre **`npm run validar`**: te dice qué archivo y qué campo están mal.

| Archivo | Qué es |
|---|---|
| `ajustes.json` | El plan (nombre, precio, moneda, periodo, qué incluye), los textos de la tarjeta del plan y del diálogo de suscripción (`suscripcion`), los interruptores de la demo, los textos de «Avisarme» (`textoFuncionNoDisponible`) y de uso ético (`textoAvisoEtico`) y la regla de ritmo de la ruta. |
| `fuentes.json` | De dónde salen los apuntes: el repositorio de la Escuela de Tecnología (fijado a un commit) y `apuntes-demo/`. |
| `escuelas.json` | Las escuelas en el orden en que se muestran, con su `estado`, su `color` (uno de los colores de `src/styles/global.css`: `tecnologia`, `negocios`, `comunicacion`, `habilidades` o `diseno`; dos escuelas pueden compartirlo) y sus áreas (cursos del área y `ruta`: el orden base). |
| `cursos/<curso>.json` | Un archivo por curso: ficha, módulos y lecciones. Cada lección dice de qué nota sale (`fuente` + `ruta`, y `seccion` si la nota se parte; `bloquesExtra` agrega a esa lección bloques sin lección propia). Los cursos de muestra salen de `apuntes-demo/`. |
| `orientacion.json` | Las 4 preguntas de «No sé por dónde empezar» y cuántos puntos suma cada respuesta a cada escuela y área. |
| `diagnosticos/<area>.json` | Las preguntas del diagnóstico de cada área (5; Ciberseguridad tiene 6) y el efecto de cada respuesta (curso de inicio, lecciones o cursos que se omiten, horas por semana y, en áreas con etapas, `etapasOpcionales` / `etapasPrimero`), con su `motivo`. |
| `perfiles-demo.json` | Los perfiles de la presentación (el orden del archivo es el de `/demo`: Sofía, Valeria, Mariana, Diego), sus respuestas y la ruta que deben obtener; los de Ciberseguridad, también su `roadmapEsperado` (las pruebas lo comprueban). |

Valores permitidos: `estado` = `disponible` · `muestra` · `proximamente`; `riesgo` = `ninguno` · `medio` · `alto`;
`nivel` = `basico` · `intermedio` · `avanzado`; `idioma` = `es` · `en`. Los ids van en minúsculas con guiones.
**Ningún curso, área ni perfil lleva precio**: el único precio es el del plan.

## Ejemplos

**Cambiar el precio del plan.** En `ajustes.json`, cambia `"precio"` (y, si hace falta, `moneda` o `periodo`).
Todo el sitio lo lee de ahí; es el único lugar donde está escrito. `npm run validar` solo comprueba que sea un número
mayor que 0 y que ningún otro archivo tenga precio.

**Ocultar un curso.** En `cursos/<curso>.json`, pon `"oculto": true`: desaparece del sitio. Para ocultar una sola
lección, ponle `"datosPersonales": true` (se oculta mientras `ocultarDatosPersonales` sea `true` en `ajustes.json`).
Las lecciones con `"riesgo": "alto"` se ocultan solo si `ocultarRiesgoAlto` es `true`; con `false` (lo de la demo) se
publican con el aviso fuerte `textoAvisoEticoAlto`.

**Cambiar el roadmap de Ciberseguridad.** En `escuelas.json`, el área tiene `etapas`: cada una con `id`, `nombre`,
`cursos` (en orden), `alTerminar` y `soloLaboratorio`. La `ruta` del área debe ser los cursos de las etapas en el mismo
orden (`npm run validar` lo revisa). Un área sin `etapas` usa la ruta por semanas. En `diagnosticos/ciberseguridad.json`,
`etapasOpcionales` hace opcional una etapa y `etapasPrimero` la adelanta en cuanto se cumplen sus prerrequisitos.

**Tiempo de práctica.** `factorPractica` en `cursos/<curso>.json` (por defecto 1): en la ruta, cada lección dura
`minutos × factorPractica`. La ficha del curso sigue mostrando solo el tiempo de lectura.

**Ocultar una imagen de una lección.** Abre `contenido-generado/_revision-capturas.html` (después de `npm run sincronizar`).
Si una captura muestra datos reales, agrega su nombre de archivo (el de negritas) a la lista `"imagenesOcultas"` de su
lección: `"imagenesOcultas": ["021.PNG"]`. Vuelve a correr `npm run sincronizar`: la imagen desaparece de
`public/apuntes/` y la lección dice «Imagen omitida en esta versión».

**Cambiar el texto de una pregunta.** En `orientacion.json` o en `diagnosticos/<area>.json`, busca la pregunta por su
`id` y cambia `"texto"` (o el `"texto"` de una opción). No cambies los `id`: los perfiles de demo los usan.
Si cambias un efecto (por ejemplo, `horasSemana`), actualiza el `resultadoEsperado` del perfil que use esa respuesta.
