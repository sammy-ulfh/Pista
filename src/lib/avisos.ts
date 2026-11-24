/**
 * Avisos flotantes (los mensajes breves que aparecen abajo de la pantalla y se van solos).
 *
 * Uso desde el `<script>` de cualquier componente:
 *   import { mostrarAviso } from '../../lib/avisos';
 *   mostrarAviso('Disponible en la versión completa');
 *
 * O sin escribir código: cualquier elemento con `data-aviso="texto"` muestra ese texto al hacer clic.
 *
 * Necesita el contenedor de `components/ui/AvisoFlotante.astro`, que ya incluye `LayoutBase`.
 */

const ID_CONTENEDOR = 'avisos-flotantes';
const ID_PLANTILLA = 'plantilla-aviso-flotante';
const MAXIMO_VISIBLES = 3;

/** Muestra un aviso durante `duracionMs` milisegundos. */
export function mostrarAviso(texto: string, duracionMs = 3500): void {
  const contenedor = document.getElementById(ID_CONTENEDOR);
  const plantilla = document.getElementById(ID_PLANTILLA);
  if (!contenedor || !(plantilla instanceof HTMLTemplateElement)) {
    console.warn('Pista: falta <AvisoFlotante /> en la página; no se puede mostrar el aviso.');
    return;
  }

  const modelo = plantilla.content.firstElementChild;
  if (!modelo) return;
  const aviso = modelo.cloneNode(true) as HTMLElement;
  aviso.textContent = texto;

  // Si hay demasiados, se quita el más viejo.
  while (contenedor.children.length >= MAXIMO_VISIBLES) contenedor.firstElementChild?.remove();

  contenedor.append(aviso);
  window.setTimeout(() => aviso.remove(), duracionMs);
}

let conectado = false;

/** Activa los elementos con `data-aviso`. Se llama una sola vez desde AvisoFlotante.astro. */
export function conectarAvisosDeclarativos(): void {
  if (conectado) return;
  conectado = true;
  document.addEventListener('click', (evento) => {
    const objetivo = evento.target instanceof Element ? evento.target.closest<HTMLElement>('[data-aviso]') : null;
    if (!objetivo) return;
    evento.preventDefault();
    mostrarAviso(objetivo.dataset.aviso ?? '');
  });
}
