/**
 * Lee los datos que una página incrustó con `components/ui/DatosParaNavegador.astro`.
 * Devuelve `null` si no están o no se pueden leer (la página debe seguir funcionando).
 */
export function leerDatosDePagina<T>(id: string): T | null {
  try {
    const texto = document.getElementById(id)?.textContent;
    return texto ? (JSON.parse(texto) as T) : null;
  } catch {
    return null;
  }
}
