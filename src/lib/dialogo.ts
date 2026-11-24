/**
 * Abrir y cerrar diálogos (`components/ui/Dialogo.astro`, hecho con `<dialog>` nativo).
 *
 * - Esc cierra el diálogo (lo hace el navegador).
 * - El botón con `data-cerrar-dialogo` y el clic fuera del recuadro también lo cierran.
 * - Al cerrarse, el foco vuelve al elemento que lo abrió.
 *
 * Sin escribir código: un botón con `data-abrir-dialogo="id-del-dialogo"` lo abre.
 */

/** Elemento que tenía el foco antes de abrir cada diálogo. */
const focoAnterior = new WeakMap<HTMLDialogElement, HTMLElement>();

function buscarDialogo(id: string): HTMLDialogElement | null {
  const elemento = document.getElementById(id);
  return elemento instanceof HTMLDialogElement ? elemento : null;
}

/** Abre el diálogo con ese id. */
export function abrirDialogo(id: string): void {
  const dialogo = buscarDialogo(id);
  if (!dialogo || dialogo.open) return;
  if (document.activeElement instanceof HTMLElement) focoAnterior.set(dialogo, document.activeElement);
  dialogo.showModal();
}

/** Cierra el diálogo con ese id. */
export function cerrarDialogo(id: string): void {
  buscarDialogo(id)?.close();
}

let conectado = false;

/** Activa los atributos `data-abrir-dialogo` y `data-cerrar-dialogo`. Se llama desde Dialogo.astro. */
export function conectarDialogos(): void {
  if (conectado) return;
  conectado = true;

  document.addEventListener('click', (evento) => {
    if (!(evento.target instanceof Element)) return;

    const abridor = evento.target.closest<HTMLElement>('[data-abrir-dialogo]');
    if (abridor?.dataset.abrirDialogo) {
      abrirDialogo(abridor.dataset.abrirDialogo);
      return;
    }

    const cerrador = evento.target.closest<HTMLElement>('[data-cerrar-dialogo]');
    if (cerrador) {
      cerrador.closest('dialog')?.close();
      return;
    }

    // Clic en el fondo oscuro: el objetivo es el propio <dialog>, no su contenido.
    if (evento.target instanceof HTMLDialogElement && evento.target.open) evento.target.close();
  });

  // Devolver el foco al cerrar, sea con Esc, con un botón o con el fondo.
  document.querySelectorAll('dialog').forEach((dialogo) => {
    dialogo.addEventListener('close', () => {
      const anterior = focoAnterior.get(dialogo);
      focoAnterior.delete(dialogo);
      // Si el botón que lo abrió ya no se ve (p. ej. «Suscribirme» tras «Sí, compré»), no se le roba el foco
      // a quien ya lo movió a otro lado.
      if (anterior?.isConnected && anterior.offsetParent !== null) anterior.focus();
    });
  });
}
