# components/ui/ — piezas genéricas

`Boton` (principal / secundario; uno principal por pantalla) · `Tarjeta` (normal, destacada, punteada) ·
`Pildora` (normal, suave, relleno, escuela) · `CajaAviso` (nota, atención) · `BarraAvance` · `Insignia` ·
`Dialogo` (`<dialog>` nativo) · `AvisoFlotante` (contenedor de avisos; ya está en LayoutBase) ·
`Portada` (portada hecha con CSS con el color de la escuela).

No llevan colores escritos a mano: usan los tokens de `src/styles/global.css`.
La lógica de diálogos, avisos y portadas está en `src/lib/` (`dialogo.ts`, `avisos.ts`, `portadas.ts`).
