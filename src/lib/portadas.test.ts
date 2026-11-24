/**
 * Pruebas del color de escuela: sale del campo `color` de `escuelas.json`, no del id.
 */
import { describe, expect, it } from 'vitest';
import datosEscuelas from '../../datos/escuelas.json';
import { COLORES_ESCUELA } from './compartido/esquemas.js';
import { colorSegunEscuelas, valorColor } from './portadas';

describe('color de escuela', () => {
  it('usa el campo color, aunque no coincida con el id', () => {
    const escuelas = [{ id: 'derecho', color: 'diseno' }, { id: 'medicina', color: 'comunicacion' }];
    expect(colorSegunEscuelas(escuelas, 'derecho')).toBe('var(--color-diseno, var(--color-tinta))');
    expect(colorSegunEscuelas(escuelas, 'medicina')).toBe('var(--color-comunicacion, var(--color-tinta))');
  });

  it('una escuela desconocida usa la tinta', () => {
    expect(colorSegunEscuelas([], 'no-existe')).toBe('var(--color-tinta)');
    expect(valorColor(null)).toBe('var(--color-tinta)');
  });

  it('las escuelas de datos/ usan colores permitidos', () => {
    for (const escuela of datosEscuelas) expect(COLORES_ESCUELA).toContain(escuela.color);
  });
});
