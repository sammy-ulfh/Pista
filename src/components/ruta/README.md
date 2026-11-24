# components/ruta/ — la pantalla «Mi ruta» (07 y 07b)

`pages/mi-ruta.astro` muestra una de dos vistas según el área elegida:

- `VistaRoadmap.astro` — áreas con `etapas` (Ciberseguridad, pantalla 07). La forman:
  - `ResumenRoadmap.astro` — «Tu roadmap: Ciberseguridad» y «5 etapas · ~10 semanas · 3 h por semana».
  - `EtapasRoadmap.astro` — las etapas en fila (escritorio) o como línea de tiempo (móvil), con sus píldoras y «Al terminar».
  - `EstaSemana.astro` — las lecciones de la semana actual y el botón principal «Empezar semana N →».
  - `AjustesRoadmap.astro` — «Lo que ajustamos por tus respuestas».
- `VistaSemanas.astro` — áreas sin etapas (pantalla 07b): `ResumenRuta`, `SemanasRuta`, `CursosRuta`, «Ver el primer curso →» y `TarjetaOrden` («¿Por qué este orden?»).
- `InvitacionRuta.astro` — lo que se ve sin diagnóstico: invita a `/orientacion` y a `/escuelas`.
- `vista-ruta.ts` — une los datos de la página, el estado de la demo y `rutaDelEstado()`; cada componente pinta su parte.

Las reglas están en **`src/lib/ruta.ts`** (ruta por semanas, ritmo y tiempo de práctica) y **`src/lib/roadmap.ts`**
(orden de las etapas, estado y ajustes; usa `ruta.ts`). Las etapas se editan en `datos/escuelas.json` → `etapas`, y
los efectos y motivos de cada respuesta en `datos/diagnosticos/<área>.json`. La tarjeta del plan es `catalogo/TarjetaPlan.astro`.
