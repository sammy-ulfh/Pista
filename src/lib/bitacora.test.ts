/**
 * Pruebas de la bitácora con fechas fijas (hora local). «Hoy» es el lunes 23 de noviembre de 2026.
 */
import { describe, expect, it } from 'vitest';
import {
  avanceCurso,
  calcularRacha,
  calendarioEstudio,
  fechaLocal,
  leerFecha,
  lunesDeLaSemana,
  mejorRacha,
  filasMisCursos,
  semanasCompletadas,
} from './bitacora';
import type { Ruta, Semana } from './ruta';

const HOY = new Date(2026, 10, 23, 10, 0); // lunes

describe('fechas locales', () => {
  it('fechaLocal usa el día del navegador, no UTC', () => {
    expect(fechaLocal(new Date(2026, 10, 23, 23, 59))).toBe('2026-11-23');
    expect(fechaLocal(new Date(2026, 0, 5, 0, 0))).toBe('2026-01-05');
  });

  it('leerFecha descarta textos que no son fechas reales', () => {
    expect(leerFecha('2026-11-23')?.getDate()).toBe(23);
    expect(leerFecha('2026-02-31')).toBeNull();
    expect(leerFecha('ayer')).toBeNull();
  });

  it('lunesDeLaSemana: el domingo pertenece a la semana que empezó el lunes anterior', () => {
    expect(fechaLocal(lunesDeLaSemana(new Date(2026, 10, 29)))).toBe('2026-11-23'); // domingo
    expect(fechaLocal(lunesDeLaSemana(HOY))).toBe('2026-11-23');
  });
});

describe('racha', () => {
  it('sin días de estudio, 0', () => {
    expect(calcularRacha([], HOY)).toBe(0);
  });

  it('cuenta los días seguidos hasta hoy', () => {
    expect(calcularRacha(['2026-11-20', '2026-11-21', '2026-11-22', '2026-11-23'], HOY)).toBe(4);
  });

  it('si hoy aún no estudias pero ayer sí, la racha sigue viva', () => {
    expect(calcularRacha(['2026-11-21', '2026-11-22'], HOY)).toBe(2);
  });

  it('un día sin estudiar la reinicia', () => {
    expect(calcularRacha(['2026-11-19', '2026-11-20', '2026-11-23'], HOY)).toBe(1); // faltó el 21 y el 22
    expect(calcularRacha(['2026-11-20', '2026-11-21'], HOY)).toBe(0); // faltó el 22: ya se rompió
  });

  it('cruza meses y años, e ignora repetidos y textos dañados', () => {
    expect(calcularRacha(['2025-12-31', '2026-01-01', '2026-01-01', 'xx'], new Date(2026, 0, 1))).toBe(2);
    expect(calcularRacha(['2026-02-28', '2026-03-01'], new Date(2026, 2, 1))).toBe(2);
  });

  it('mejorRacha: la más larga de toda la bitácora, aunque ya se haya roto', () => {
    expect(mejorRacha([])).toBe(0);
    expect(mejorRacha(['2026-11-01', '2026-11-02', '2026-11-03', '2026-11-10', '2026-11-23'])).toBe(3);
    expect(mejorRacha(['2026-11-23', '2026-11-22', '2026-11-21'])).toBe(3); // el orden no importa
  });
});

describe('calendario', () => {
  it('3 semanas de lunes a domingo, terminando con la semana de hoy', () => {
    const semanas = calendarioEstudio(['2026-11-10', '2026-11-23', '2026-12-01'], HOY);
    expect(semanas).toHaveLength(3);
    expect(semanas.map((s) => s.length)).toEqual([7, 7, 7]);
    expect(semanas[0][0].fecha).toBe('2026-11-09'); // lunes
    expect(semanas[2][6].fecha).toBe('2026-11-29'); // domingo
    const dias = semanas.flat();
    expect(dias.filter((d) => d.estudiado).map((d) => d.fecha)).toEqual(['2026-11-10', '2026-11-23']);
    expect(dias.find((d) => d.esHoy)?.fecha).toBe('2026-11-23');
    expect(dias.filter((d) => d.futuro)).toHaveLength(6); // martes a domingo de esta semana
  });
});

describe('avance', () => {
  it('avanceCurso cuenta las vistas y da la siguiente pendiente', () => {
    const ids = ['c/a', 'c/b', 'c/c'];
    expect(avanceCurso(ids, ['c/a', 'otro/x'])).toEqual({ vistas: 1, total: 3, siguiente: 'c/b' });
    expect(avanceCurso(ids, ids)).toEqual({ vistas: 3, total: 3, siguiente: null });
  });

  it('semanasCompletadas: solo las semanas con lecciones disponibles y todas vistas', () => {
    const leccion = (id: string, enPreparacion = false) =>
      ({ tipo: 'leccion', id, curso: 'c', titulo: id, minutos: 10, enPreparacion }) as const;
    const semana = (numero: number, elementos: Semana['elementos']): Semana => ({
      numero,
      elementos,
      lecciones: elementos.map((e) => e.id),
      minutos: 0,
      estado: 'disponible',
    });
    const ruta = {
      semanas: [
        semana(1, [leccion('c/a'), leccion('c/b')]),
        semana(2, [leccion('c/c'), leccion('c/d', true)]),
        semana(3, [leccion('c/e', true)]),
        semana(4, [{ tipo: 'proximamente', id: 'curso:p', curso: 'p', titulo: 'P', minutos: 60 }]),
      ],
    } as Ruta;
    expect(semanasCompletadas(ruta, [])).toBe(0);
    expect(semanasCompletadas(ruta, ['c/a'])).toBe(0);
    expect(semanasCompletadas(ruta, ['c/a', 'c/b', 'c/c'])).toBe(2);
  });
});

describe('filasMisCursos', () => {
  const curso = (id: string, lecciones: [string, boolean][], estado: 'disponible' | 'muestra' | 'proximamente' = 'muestra') => ({
    id,
    titulo: id.toUpperCase(),
    estado,
    modulos: [{ lecciones: lecciones.map(([slug, enPreparacion]) => ({ id: `${id}/${slug}`, slug, enPreparacion })) }],
  });
  const CURSOS = {
    clientes: curso('clientes', [['a', false], ['b', false]]),
    vender: curso('vender', [['a', true]]),
    precios: curso('precios', [], 'proximamente'),
    linux: curso('linux', [['x', false]], 'disponible'),
  };

  it('empezados primero (con avance y «Seguir»), luego el resto de la ruta', () => {
    const filas = filasMisCursos(CURSOS, ['clientes', 'vender', 'precios'], ['linux/x', 'clientes/a']);
    expect(filas.map((f) => [f.curso, f.tipo, f.boton, f.href])).toEqual([
      ['clientes', 'empezado', 'Seguir', '/cursos/clientes/b'],
      ['linux', 'empezado', 'Repasar', '/cursos/linux'],
      ['vender', 'en-preparacion', 'Ver', '/cursos/vender'],
      ['precios', 'proximamente', 'Ver', '/cursos/precios'],
    ]);
    expect(filas[0].avance).toEqual({ vistas: 1, total: 2, siguiente: 'clientes/b' });
  });

  it('sin ruta ni lecciones vistas, no hay filas; con ruta, «Empezar» lleva a la primera lección', () => {
    expect(filasMisCursos(CURSOS, null, [])).toEqual([]);
    expect(filasMisCursos(CURSOS, ['clientes'], [])[0]).toMatchObject({ tipo: 'por-empezar', boton: 'Empezar', href: '/cursos/clientes/a' });
  });
});
