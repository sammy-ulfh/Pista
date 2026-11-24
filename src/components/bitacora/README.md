# components/bitacora/ — «Mi bitácora» (pantalla 12)

Todo se pinta en el navegador a partir del estado de la demo. `vista-bitacora.ts` junta los datos de la página
con el estado y avisa a cada componente con `alTenerBitacora(pintar)`; las reglas están en `src/lib/`.

- `Estadisticas.astro` — días de racha, lecciones vistas y semanas de la ruta completadas («1/5»).
- `EtapasBitacora.astro` — «Tu roadmap»: cada etapa con su estado («Completada», «Estás aquí», pendiente) y lecciones vistas. Solo si el área tiene etapas (`src/lib/roadmap.ts`).
- `CalendarioEstudio.astro` — las últimas 3 semanas (lunes a domingo); los días de estudio, en tinta.
- `Insignias.astro` — las 5 insignias; las que faltan se ven punteadas.
- `MisCursos.astro` — «Pista completo · activo» o «Suscribirme», cursos empezados con su avance y «Seguir», y el resto de la ruta.

**¿Cambiar algo?** Racha, calendario y filas de «Mis cursos»: `src/lib/bitacora.ts`. Nombres y condiciones de las
insignias: `src/lib/insignias.ts`. Nada de esto se guarda: se recalcula con `leccionesVistas` y `diasEstudio`.
