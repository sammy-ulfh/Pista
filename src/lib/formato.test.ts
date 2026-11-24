/** Pruebas de `formato.ts` (`npm run probar`). */
import { describe, expect, it } from 'vitest';
import {
  formatoDuracion,
  formatoFechaInicio,
  formatoHorasSemana,
  formatoMinutosLeccion,
  plural,
  rellenar,
  textoOrdenCursos,
} from './formato';

describe('formatoDuracion', () => {
  it('redondea a 5 minutos y usa horas desde 60', () => {
    expect(formatoDuracion(70.9)).toBe('~1 h 10 min');
    expect(formatoDuracion(48)).toBe('~50 min');
    expect(formatoDuracion(180)).toBe('~3 h');
    expect(formatoDuracion(223)).toBe('~3 h 45 min');
  });

  it('nunca muestra 0', () => {
    expect(formatoDuracion(0)).toBe('~5 min');
    expect(formatoDuracion(1)).toBe('~5 min');
  });
});

describe('formatoMinutosLeccion', () => {
  it('redondea al minuto y nunca baja de 1', () => {
    expect(formatoMinutosLeccion(14.3)).toBe('14 min');
    expect(formatoMinutosLeccion(0.2)).toBe('1 min');
  });
});

describe('plural y rellenar', () => {
  it('plural', () => {
    expect(plural(1, 'curso')).toBe('1 curso');
    expect(plural(3, 'lección', 'lecciones')).toBe('3 lecciones');
  });

  it('rellenar cambia las claves conocidas y deja las demás', () => {
    expect(rellenar('incluido «{curso}» {otro}', { curso: 'Tus primeros clientes' })).toBe('incluido «Tus primeros clientes» {otro}');
  });
});

describe('formatoHorasSemana', () => {
  it('usa minutos debajo de 1 hora', () => {
    expect(formatoHorasSemana(0.5)).toBe('30 min por semana');
    expect(formatoHorasSemana(1)).toBe('1 h por semana');
    expect(formatoHorasSemana(1.5)).toBe('1 h 30 min por semana');
    expect(formatoHorasSemana(5)).toBe('5 h por semana');
  });
});

describe('formatoFechaInicio', () => {
  it('dice el día de la semana, el día y el mes', () => {
    expect(formatoFechaInicio(new Date(2026, 10, 23))).toBe('lunes 23 de noviembre');
  });
});

describe('textoOrdenCursos', () => {
  it('nombra los cursos en orden', () => {
    expect(textoOrdenCursos(['A', 'B', 'C'])).toBe('Cada curso prepara el siguiente: primero «A», después «B» y al final «C».');
    expect(textoOrdenCursos(['A', 'B'])).toBe('Cada curso prepara el siguiente: primero «A» y al final «B».');
  });
});
