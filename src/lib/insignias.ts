/**
 * Insignias de «Mi bitácora» (pantalla 12). Se CALCULAN a partir del estado; nunca se guardan.
 *
 * Función pura, probada en `insignias.test.ts`. Para cambiar un nombre o una condición, edita `INSIGNIAS`.
 *
 * Condiciones:
 *   - Primera lección: al menos una lección marcada como vista.
 *   - Racha de 3 / Racha de 7: la mejor racha de la bitácora llega a 3 / 7 días seguidos (una vez ganada,
 *     no se pierde aunque la racha actual se reinicie).
 *   - Primer curso: todas las lecciones disponibles de algún curso están vistas.
 *   - Ruta completa: hay ruta y todas sus lecciones disponibles están vistas.
 * «Disponible» = visible y no «en preparación».
 */
import { mejorRacha } from './bitacora';
import type { EstadoDemo } from './estado-demo';

export type DatosInsignias = {
  /** Curso → ids de sus lecciones disponibles. */
  cursos: Record<string, readonly string[]>;
  /** Ids de las lecciones disponibles de la ruta, o `null` si todavía no hay ruta. */
  leccionesRuta: readonly string[] | null;
};

type Contexto = { vistas: Set<string>; mejorRacha: number; datos: DatosInsignias };

const todasVistas = (ids: readonly string[], vistas: Set<string>) => ids.length > 0 && ids.every((id) => vistas.has(id));

/** Las 5 insignias, en el orden en que se muestran. */
export const INSIGNIAS = [
  { id: 'primera-leccion', nombre: 'Primera lección', obtenida: (c: Contexto) => c.vistas.size > 0 },
  { id: 'racha-3', nombre: 'Racha de 3', obtenida: (c: Contexto) => c.mejorRacha >= 3 },
  {
    id: 'primer-curso',
    nombre: 'Primer curso',
    obtenida: (c: Contexto) => Object.values(c.datos.cursos).some((ids) => todasVistas(ids, c.vistas)),
  },
  { id: 'racha-7', nombre: 'Racha de 7', obtenida: (c: Contexto) => c.mejorRacha >= 7 },
  {
    id: 'ruta-completa',
    nombre: 'Ruta completa',
    obtenida: (c: Contexto) => c.datos.leccionesRuta !== null && todasVistas(c.datos.leccionesRuta, c.vistas),
  },
] as const;

export type IdInsignia = (typeof INSIGNIAS)[number]['id'];
export type Insignia = { id: IdInsignia; nombre: string; obtenida: boolean };

export function calcularInsignias(
  estado: Pick<EstadoDemo, 'leccionesVistas' | 'diasEstudio'>,
  datos: DatosInsignias,
): Insignia[] {
  const contexto: Contexto = { vistas: new Set(estado.leccionesVistas), mejorRacha: mejorRacha(estado.diasEstudio), datos };
  return INSIGNIAS.map(({ id, nombre, obtenida }) => ({ id, nombre, obtenida: obtenida(contexto) }));
}
