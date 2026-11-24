# components/cuestionario/ — preguntas y recomendación

Piezas de las pantallas 04 (Orientación), 05 (Recomendación) y 06 (Diagnóstico del área).

- `Cuestionario.astro` — una pregunta a la vez: «Pregunta N de M», barra de avance, opciones, «← Atrás» y «Siguiente →», y la caja «No hay respuestas malas…». Guarda cada respuesta en el estado de la demo. Lo usan la orientación y el diagnóstico.
- `OpcionRespuesta.astro` — una opción con su círculo (un `<input type="radio">` real).
- `Recomendacion.astro` — el área recomendada, la alternativa y el aviso de «próximamente». La calcula `lib/orientacion.ts`.

**¿Cambiar una pregunta, una opción o sus puntos?** `datos/orientacion.json` (orientación) o `datos/diagnosticos/<área>.json`
(diagnóstico, con sus efectos). Estos componentes no tienen reglas propias: no hay que tocarlos.
