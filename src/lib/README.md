# src/lib/ — lógica sin HTML

Módulos pequeños de TypeScript que usan los componentes en sus `<script>` o al generar la página.

- `avisos.ts` — `mostrarAviso(texto)` y los elementos con `data-aviso`.
- `dialogo.ts` — `abrirDialogo(id)`, `cerrarDialogo(id)` y los atributos `data-abrir-dialogo` / `data-cerrar-dialogo`.
- `portadas.ts` — patrón de las portadas y el valor CSS de un color de escuela (funciones puras, con `portadas.test.ts`). El color de cada escuela lo da `colorDeEscuela(id)` de `catalogo.ts`, que lee el campo `color` de `escuelas.json`.
- `catalogo.ts` — perfiles de la demo en el orden del archivo (`obtenerPerfiles`), escuelas, áreas, cursos y lecciones **visibles**, duración de cada curso, datos del plan y el contenido convertido de cada lección (`obtenerContenidoLeccion`). Las páginas leen el catálogo solo desde aquí.
- `compartido/` — JavaScript con JSDoc que también usan los scripts de Node (sin compilar):
  - `visibilidad.js` — qué curso o lección se oculta (con su prueba `visibilidad.test.js`);
  - `esquemas.js` — los esquemas Zod de cada archivo de `datos/` y del frontmatter de las lecciones generadas (los usan `content.config.ts`, `npm run validar` y `npm run sincronizar`).

- `formato.ts` — cómo se muestran duraciones («~1 h 10 min»), niveles, estados y plurales.
- `estado-demo.ts` — el estado de la demo en el navegador (plan activo, respuestas, progreso; `cargarPerfil` para `/demo`). **Único** archivo que toca `localStorage`; emite `estado-demo:cambio`.
- `estado-en-pagina.ts` — conecta ese estado con el HTML: mantiene al día `<html data-plan data-sesion>` (de eso dependen `data-con-plan` / `data-sin-plan` y la cabecera), «Sí, compré» (`data-activar-plan`) y «Reiniciar demo» (`data-reiniciar-demo`). Lo llama `LayoutBase`, que además trae un script en línea que pone esos atributos antes de pintar (sin parpadeo).

- `orientacion.ts` — `recomendarArea(respuestas, datos)`: suma los puntos de la orientación y recomienda escuela, área y alternativa. La regla está escrita en `datos/orientacion.json` → `regla`.
- `ruta.ts` — `calcularRuta(area, respuestas, datos, opciones?)`: aplica el diagnóstico (curso de inicio, omisiones, horas por semana), suma el tiempo de práctica (`minutos × factorPractica`) y reparte las lecciones en semanas según `datos/ajustes.json` → `ritmo` (con `grupoDeCurso`, cada etapa empieza semana nueva).
- `roadmap.ts` — `calcularRoadmap(area, respuestas, datos, estado?)`: el roadmap por etapas (Ciberseguridad). Ordena las etapas, llama a `calcularRuta()` y agrupa: semanas, estado de cada etapa, ajustes con su motivo y «Esta semana». Probado en `roadmap.test.ts` con Sofía y Valeria.
- `mi-ruta.ts` — `rutaDelEstado(estado, datos)`: la ruta (o el roadmap, si el área tiene etapas) del área elegida; la usan Mi ruta, el lector y la bitácora.
- `bitacora.ts` — fechas locales, racha (`calcularRacha`, `mejorRacha`), calendario de 3 semanas, avance por curso, semanas completadas y filas de «Mis cursos».
- `insignias.ts` — `calcularInsignias(estado, datos)`: las 5 insignias (nombres y condiciones en `INSIGNIAS`). No se guardan.
- `barra-avance.ts` — actualiza una `ui/BarraAvance` desde el navegador.
- `datos-en-pagina.ts` — lee el JSON que una página incrusta para el navegador (`ui/DatosParaNavegador.astro`).

Las pruebas (`*.test.ts` / `*.test.js`) están junto a cada archivo. `ruta.test.ts` comprueba que cada perfil de
`datos/perfiles-demo.json` obtenga **exactamente** su `resultadoEsperado`.
