/**
 * Une, en el navegador, los datos de la página `/bitacora` con el estado de la demo.
 *
 * No tiene reglas propias: la racha, el calendario y «Mis cursos» salen de `lib/bitacora.ts`, las insignias de
 * `lib/insignias.ts` y la ruta (o el roadmap por etapas) de `lib/mi-ruta.ts`. Cada componente de `components/bitacora/` llama a
 * `alTenerBitacora(pintar)` y pinta su parte; se vuelve a pintar si el estado cambia (por ejemplo, con
 * «Reiniciar demo» o al activar el plan).
 */
import {
  calcularRacha,
  calendarioEstudio,
  filasMisCursos,
  leccionesDisponibles,
  leccionesDisponiblesDeRuta,
  semanasCompletadas,
  type DiaCalendario,
  type FilaMisCursos,
} from '../../lib/bitacora';
import type { AreaParaNavegador, CursoParaNavegador } from '../../lib/catalogo';
import { leerDatosDePagina } from '../../lib/datos-en-pagina';
import { alCambiarEstado, leerEstado, type EstadoDemo } from '../../lib/estado-demo';
import { calcularInsignias, type Insignia } from '../../lib/insignias';
import { rutaDelEstado, type DatosMiRuta } from '../../lib/mi-ruta';
import type { EtapaRoadmap } from '../../lib/roadmap';

/** Lo que `pages/bitacora.astro` incrusta con el id `datos-bitacora`. */
export type DatosPaginaBitacora = Omit<DatosMiRuta, 'areas' | 'cursos'> & {
  areas: AreaParaNavegador[];
  cursos: Record<string, CursoParaNavegador>;
};

export type VistaBitacora = {
  racha: number;
  leccionesVistas: number;
  /** `null` si todavía no hay ruta. */
  semanas: { completadas: number; total: number } | null;
  /** Las etapas del roadmap con su estado, o `null` si el área no tiene etapas (o aún no hay ruta). */
  etapas: EtapaRoadmap[] | null;
  calendario: DiaCalendario[][];
  insignias: Insignia[];
  misCursos: FilaMisCursos[];
};

let datos: DatosPaginaBitacora | null | undefined;

export function vistaDesdeEstado(estado: EstadoDemo, hoy = new Date()): VistaBitacora {
  if (datos === undefined) datos = leerDatosDePagina<DatosPaginaBitacora>('datos-bitacora');
  const cursos = datos?.cursos ?? {};
  const resultado = datos ? rutaDelEstado(estado, datos) : null;
  const ruta = resultado?.ruta ?? null;
  return {
    racha: calcularRacha(estado.diasEstudio, hoy),
    leccionesVistas: estado.leccionesVistas.length,
    semanas: ruta ? { completadas: semanasCompletadas(ruta, estado.leccionesVistas), total: ruta.totalSemanas } : null,
    etapas: resultado?.roadmap?.etapas ?? null,
    calendario: calendarioEstudio(estado.diasEstudio, hoy),
    insignias: calcularInsignias(estado, {
      cursos: Object.fromEntries(Object.values(cursos).map((c) => [c.id, leccionesDisponibles(c)])),
      leccionesRuta: ruta ? leccionesDisponiblesDeRuta(ruta) : null,
    }),
    misCursos: filasMisCursos(cursos, ruta?.cursos ?? null, estado.leccionesVistas),
  };
}

const pintores: ((vista: VistaBitacora) => void)[] = [];
let escuchando = false;

function pintarTodo(estado: EstadoDemo) {
  const vista = vistaDesdeEstado(estado);
  for (const pintar of pintores) pintar(vista);
}

/** Registra una función que pinta una parte de la bitácora. */
export function alTenerBitacora(pintar: (vista: VistaBitacora) => void): void {
  pintores.push(pintar);
  if (escuchando) return pintar(vistaDesdeEstado(leerEstado()));
  escuchando = true;
  pintarTodo(leerEstado());
  alCambiarEstado(pintarTodo);
}
