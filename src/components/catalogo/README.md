# components/catalogo/ — escuelas, áreas, cursos y el plan

Piezas de las pantallas 02 (Escuelas), 03 (Área), 08 (Curso) y 09 (Suscripción simulada).

- `TarjetaEscuela.astro` — una escuela: estado, áreas (enlaces a `/areas/<área>`) y «Avisarme» si es «próximamente».
- `TarjetaCurso.astro` — un curso dentro de un área: portada, estado, idioma, duración e «Incluido en el plan». Sin precio.
- `ListaTemario.astro` — módulos y lecciones visibles de un curso, con «Vista previa gratis», «En preparación», «En inglés» y «Uso ético».
- `TarjetaPlan.astro` — la tarjeta «Pista completo · $50 MXN al mes» **y** su diálogo «Confirmar suscripción». Con el plan activo cambia a «Tu plan está activo · Empezar».
- `DialogoSuscripcion.astro` — solo el diálogo «Confirmar suscripción» (lo usa `TarjetaPlan`, y «Mi bitácora» por separado).
- `MigasDePan.astro` — «Escuelas › Escuela › Área».

**¿Cambiar un texto?** El plan (nombre, precio, qué incluye) y todos los textos de la tarjeta y del diálogo están en
`datos/ajustes.json` (`plan` y `suscripcion`). «Avisarme» usa `textoFuncionNoDisponible`; la nota de uso ético, `textoAvisoEtico`.
Los datos salen de `src/lib/catalogo.ts` (solo lo visible); el plan activo, de `src/lib/estado-demo.ts`.
