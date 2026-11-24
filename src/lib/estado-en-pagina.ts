/**
 * Conecta el estado de la demo (`estado-demo.ts`) con el HTML de cualquier página, sin escribir código
 * en cada componente. Se llama una sola vez desde `layouts/LayoutBase.astro`.
 *
 * Marca `<html>` con `data-plan="activo|inactivo"` y `data-sesion="si|no"`, y los vuelve a marcar cada vez que
 * el estado cambia. Al cargar la página ya vienen puestos por el script en línea de `LayoutBase.astro` (que solo
 * lee); aquí se mantienen al día. `styles/global.css` muestra u oculta según esos atributos:
 * - `data-con-plan`   → el elemento se muestra solo con el plan activo.
 * - `data-sin-plan`   → el elemento se muestra solo SIN plan activo.
 * - `data-con-sesion` / `data-sin-sesion` → las dos variantes de la cabecera.
 *
 * Además:
 * - `data-activar-plan` (en un botón) → activa el plan, cierra su diálogo y, si el botón trae
 *   `data-aviso-al-activar="texto"`, muestra ese aviso. Después lleva el foco al primer elemento visible
 *   con `data-foco-tras-activar`.
 * - `data-reiniciar-demo` (en un botón) → borra el estado; si trae `data-aviso-al-reiniciar`, lo muestra.
 */
import { mostrarAviso } from './avisos';
import { activarPlan, alCambiarEstado, haySesion, leerEstado, reiniciarDemo, type EstadoDemo } from './estado-demo';

/** Pone en `<html>` los atributos `data-plan` y `data-sesion` según el estado (el CSS hace el resto). */
export function marcarEstado(estado: EstadoDemo, html: HTMLElement = document.documentElement): void {
  html.dataset.plan = estado.planActivo ? 'activo' : 'inactivo';
  html.dataset.sesion = haySesion(estado) ? 'si' : 'no';
}

/** Primer elemento visible con `data-foco-tras-activar`. */
function destinoDelFoco(): HTMLElement | undefined {
  return [...document.querySelectorAll<HTMLElement>('[data-foco-tras-activar]')].find((el) => el.offsetParent !== null);
}

let conectado = false;

export function conectarEstadoEnPagina(): void {
  if (conectado) return;
  conectado = true;

  marcarEstado(leerEstado());
  alCambiarEstado((estado) => marcarEstado(estado));

  document.addEventListener('click', (evento) => {
    if (!(evento.target instanceof Element)) return;

    const activador = evento.target.closest<HTMLElement>('[data-activar-plan]');
    if (activador) {
      activarPlan(); // emite el evento de cambio: las tarjetas pasan a «Tu plan está activo»
      activador.closest('dialog')?.close();
      destinoDelFoco()?.focus();
      if (activador.dataset.avisoAlActivar) mostrarAviso(activador.dataset.avisoAlActivar);
      return;
    }

    const reiniciador = evento.target.closest<HTMLElement>('[data-reiniciar-demo]');
    if (reiniciador) {
      reiniciarDemo();
      if (reiniciador.dataset.avisoAlReiniciar) mostrarAviso(reiniciador.dataset.avisoAlReiniciar);
    }
  });
}
