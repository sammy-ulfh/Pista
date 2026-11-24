/**
 * Une, en el navegador, los datos de la página `/mi-ruta` con el estado de la demo y la regla de la ruta.
 *
 * No tiene reglas propias: la ruta la calcula `calcularRuta()` (`lib/ruta.ts`) o, si el área tiene etapas,
 * `calcularRoadmap()` (`lib/roadmap.ts`), ambas vía `rutaDelEstado()` (`lib/mi-ruta.ts`); el estado lo lee
 * `lib/estado-demo.ts`. Cada componente de `components/ruta/` llama a `alTenerRuta(pintar)` y pinta su parte;
 * se vuelve a pintar si el estado cambia (por ejemplo, con «Reiniciar demo»).
 *
 * También conecta dos atributos de la página:
 *   - `data-con-ruta` / `data-sin-ruta`: se muestran solo con o sin diagnóstico hecho.
 *   - `data-vista-roadmap` / `data-vista-semanas`: la vista por etapas (áreas con `etapas`) o la de semanas.
 *   - `data-enlace-primer-curso`: su `href` pasa a ser la ficha del primer curso de la ruta.
 *   - `data-cursos-de-ruta` (en la tarjeta del plan): «Los 3 cursos de tu ruta».
 */
import type { AreaParaNavegador, CursoParaNavegador } from '../../lib/catalogo';
import { leerDatosDePagina } from '../../lib/datos-en-pagina';
import { alCambiarEstado, leerEstado, type EstadoDemo } from '../../lib/estado-demo';
import { rutaDelEstado } from '../../lib/mi-ruta';
import type { Roadmap } from '../../lib/roadmap';
import { lunesSiguiente, semanaActual, type DatosRuta, type Ruta } from '../../lib/ruta';

/** Lo que `pages/mi-ruta.astro` incrusta con el id `datos-ruta`. */
export type DatosPaginaRuta = Omit<DatosRuta, 'diagnostico' | 'cursos'> & {
  cursos: Record<string, CursoParaNavegador>;
  diagnosticos: Record<string, DatosRuta['diagnostico']>;
  areas: AreaParaNavegador[];
};

export type VistaRuta = {
  ruta: Ruta;
  /** El roadmap por etapas, o `null` si el área usa la ruta por semanas. */
  roadmap: Roadmap | null;
  area: AreaParaNavegador;
  cursos: Record<string, CursoParaNavegador>;
  /** Número de la semana que se destaca. */
  semanaActual: number;
  /** El lunes siguiente a hoy. */
  inicio: Date;
};

let datos: DatosPaginaRuta | null | undefined;

/** La ruta del área elegida, o `null` si todavía no hay diagnóstico. */
export function vistaDesdeEstado(estado: EstadoDemo): VistaRuta | null {
  if (datos === undefined) datos = leerDatosDePagina<DatosPaginaRuta>('datos-ruta');
  if (!datos) return null;
  const resultado = rutaDelEstado(estado, datos);
  if (!resultado) return null;
  const { ruta, area, roadmap } = resultado;
  return {
    ruta,
    roadmap,
    area,
    cursos: datos.cursos,
    semanaActual: semanaActual(ruta, estado.leccionesVistas),
    inicio: lunesSiguiente(new Date()),
  };
}

const pintores: ((vista: VistaRuta | null) => void)[] = [];
let escuchando = false;

function pintarTodo(estado: EstadoDemo) {
  const vista = vistaDesdeEstado(estado);
  document.querySelectorAll<HTMLElement>('[data-con-ruta]').forEach((el) => (el.hidden = !vista));
  document.querySelectorAll<HTMLElement>('[data-sin-ruta]').forEach((el) => (el.hidden = Boolean(vista)));
  document.querySelectorAll<HTMLElement>('[data-vista-roadmap]').forEach((el) => (el.hidden = !vista?.roadmap));
  document.querySelectorAll<HTMLElement>('[data-vista-semanas]').forEach((el) => (el.hidden = !vista || Boolean(vista.roadmap)));
  if (vista) {
    document
      .querySelectorAll<HTMLAnchorElement>('[data-enlace-primer-curso]')
      .forEach((el) => (el.href = `/cursos/${vista.ruta.cursos[0]}`));
    const n = vista.ruta.cursos.length;
    document.querySelectorAll<HTMLElement>('[data-cursos-de-ruta]').forEach((el) => {
      ponerTexto(el, 'cursos-de-ruta', n === 1 ? 'El curso de tu ruta' : `Los ${n} cursos de tu ruta`);
      el.hidden = false;
    });
  }
  for (const pintar of pintores) pintar(vista);
}

/** Registra una función que pinta una parte de la ruta (recibe `null` si no hay ruta). */
export function alTenerRuta(pintar: (vista: VistaRuta | null) => void): void {
  pintores.push(pintar);
  if (escuchando) return pintar(vistaDesdeEstado(leerEstado()));
  escuchando = true;
  pintarTodo(leerEstado());
  alCambiarEstado(pintarTodo);
}

/** Copia una `<template>` y devuelve su primer elemento. */
export function copiarPlantilla(plantilla: HTMLTemplateElement): HTMLElement {
  return (plantilla.content.cloneNode(true) as DocumentFragment).firstElementChild as HTMLElement;
}

/** Pone texto en todos los `[data-campo="nombre"]` dentro de `raiz`. */
export function ponerTexto(raiz: ParentNode, nombre: string, texto: string): void {
  raiz.querySelectorAll<HTMLElement>(`[data-campo="${nombre}"]`).forEach((el) => (el.textContent = texto));
}
