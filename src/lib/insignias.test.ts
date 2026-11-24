/**
 * Pruebas de las insignias de «Mi bitácora».
 */
import { describe, expect, it } from 'vitest';
import { calcularInsignias, type DatosInsignias } from './insignias';

const DATOS: DatosInsignias = {
  cursos: {
    'tus-primeros-clientes': ['tus-primeros-clientes/a', 'tus-primeros-clientes/b'],
    'hablar-para-vender': [], // todo «en preparación»: no se puede completar
  },
  leccionesRuta: ['tus-primeros-clientes/a', 'tus-primeros-clientes/b'],
};

const obtenidas = (estado: { leccionesVistas: string[]; diasEstudio: string[] }, datos = DATOS) =>
  calcularInsignias(estado, datos)
    .filter((i) => i.obtenida)
    .map((i) => i.id);

describe('calcularInsignias', () => {
  it('son 5, en orden, y sin progreso no hay ninguna', () => {
    const lista = calcularInsignias({ leccionesVistas: [], diasEstudio: [] }, DATOS);
    expect(lista.map((i) => i.nombre)).toEqual(['Primera lección', 'Racha de 3', 'Primer curso', 'Racha de 7', 'Ruta completa']);
    expect(lista.every((i) => !i.obtenida)).toBe(true);
  });

  it('Primera lección con una lección vista', () => {
    expect(obtenidas({ leccionesVistas: ['tus-primeros-clientes/a'], diasEstudio: ['2026-11-23'] })).toEqual(['primera-leccion']);
  });

  it('Racha de 3 y de 7 con días seguidos (aunque la racha ya se haya roto)', () => {
    const tres = ['2026-11-01', '2026-11-02', '2026-11-03'];
    const siete = ['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04', '2026-10-05', '2026-10-06', '2026-10-07'];
    expect(obtenidas({ leccionesVistas: ['x/y'], diasEstudio: tres })).toEqual(['primera-leccion', 'racha-3']);
    expect(obtenidas({ leccionesVistas: ['x/y'], diasEstudio: siete })).toEqual(['primera-leccion', 'racha-3', 'racha-7']);
  });

  it('Primer curso y Ruta completa al ver todas las lecciones disponibles', () => {
    const estado = { leccionesVistas: ['tus-primeros-clientes/a', 'tus-primeros-clientes/b'], diasEstudio: ['2026-11-23'] };
    expect(obtenidas(estado)).toEqual(['primera-leccion', 'primer-curso', 'ruta-completa']);
  });

  it('sin ruta no hay «Ruta completa», y un curso sin lecciones disponibles no cuenta como terminado', () => {
    const estado = { leccionesVistas: ['tus-primeros-clientes/a'], diasEstudio: [] };
    expect(obtenidas(estado, { ...DATOS, leccionesRuta: null })).toEqual(['primera-leccion']);
    expect(obtenidas({ leccionesVistas: [], diasEstudio: [] }, { cursos: { vacio: [] }, leccionesRuta: [] })).toEqual([]);
  });
});
