/**
 * Actualiza en el navegador una `components/ui/BarraAvance.astro` (por ejemplo, al marcar una lección como vista).
 *
 *   pintarBarraAvance(document.querySelector('[data-barra-avance]'), 2, 4);
 */
export function pintarBarraAvance(contenedor: Element | null, valor: number, maximo: number): void {
  if (!contenedor) return;
  const barra = contenedor.querySelector<HTMLElement>('[role="progressbar"]');
  const relleno = contenedor.querySelector<HTMLElement>('[data-relleno]');
  const texto = contenedor.querySelector<HTMLElement>('[data-texto]');
  const porcentaje = maximo > 0 ? Math.min(100, Math.max(0, (valor / maximo) * 100)) : 0;
  barra?.setAttribute('aria-valuenow', String(valor));
  barra?.setAttribute('aria-valuemax', String(maximo));
  barra?.setAttribute('aria-valuetext', `${valor} de ${maximo}`);
  if (relleno) relleno.style.width = `${porcentaje}%`;
  if (texto) texto.textContent = `${valor} de ${maximo}`;
}
