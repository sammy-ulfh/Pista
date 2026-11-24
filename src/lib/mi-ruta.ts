/**
 * «Mi ruta» a partir del estado: el área elegida y sus respuestas → `calcularRuta()` o, si el área tiene etapas,
 * `calcularRoadmap()` (que usa `calcularRuta()` por dentro).
 *
 * Lo usan «Mi ruta» (`components/ruta/vista-ruta.ts`), el lector («← Volver a mi ruta» si el curso está en la ruta)
 * y la bitácora (semanas completadas, etapas, cursos de la ruta). Función pura: recibe los datos que la página incrustó.
 */
import type { EstadoDemo } from './estado-demo';
import { calcularRoadmap, tieneEtapas, type EtapaArea, type Roadmap } from './roadmap';
import { calcularRuta, type AreaRuta, type CursoRuta, type DatosRuta, type DiagnosticoRuta, type Ruta } from './ruta';

/** Un área con lo mínimo para su ruta: el orden base y, si tiene roadmap, sus etapas. */
export type AreaMiRuta = AreaRuta & { etapas?: EtapaArea[] | null };

/** Lo mínimo para calcular la ruta de cualquier área. */
export type DatosMiRuta = Omit<DatosRuta, 'diagnostico' | 'cursos'> & {
  areas: AreaMiRuta[];
  cursos: Record<string, CursoRuta>;
  diagnosticos: Record<string, DiagnosticoRuta>;
};

/**
 * La ruta del área elegida, o `null` si todavía no hay diagnóstico (o la ruta queda vacía).
 * `roadmap` solo existe si el área tiene etapas; en ese caso `ruta` es la ruta sobre la que se armó el roadmap.
 */
export function rutaDelEstado<A extends AreaMiRuta>(
  estado: Pick<EstadoDemo, 'areaElegida' | 'diagnosticos' | 'leccionesVistas'>,
  datos: Omit<DatosMiRuta, 'areas'> & { areas: A[] },
): { ruta: Ruta; area: A; roadmap: Roadmap | null } | null {
  if (!estado.areaElegida) return null;
  const area = datos.areas.find((a) => a.id === estado.areaElegida);
  const diagnostico = datos.diagnosticos[estado.areaElegida];
  const respuestas = estado.diagnosticos[estado.areaElegida];
  if (!area || !diagnostico || !respuestas) return null;
  const datosRuta = { ...datos, diagnostico };
  if (tieneEtapas(area)) {
    const roadmap = calcularRoadmap(area, respuestas, datosRuta, estado);
    return roadmap.ruta.cursos.length > 0 ? { ruta: roadmap.ruta, area, roadmap } : null;
  }
  const ruta = calcularRuta(area, respuestas, datosRuta);
  return ruta.cursos.length > 0 ? { ruta, area, roadmap: null } : null;
}
