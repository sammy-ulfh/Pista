/**
 * Pruebas de la regla de visibilidad (`npm run probar`).
 * Incluye una prueba contra los datos reales de `datos/` con los interruptores de `datos/ajustes.json`
 * (`ocultarDatosPersonales` y `ocultarRiesgoAlto`).
 */
import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { cursoOculto, leccionOculta, motivoCursoOculto, motivoLeccionOculta } from './visibilidad.js';

/** Los valores de la demo desde la parte 3.9. */
const DEMO = { ocultarDatosPersonales: true, ocultarRiesgoAlto: false };
const OCULTAR_TODO = { ocultarDatosPersonales: true, ocultarRiesgoAlto: true };
const MOSTRAR_TODO = { ocultarDatosPersonales: false, ocultarRiesgoAlto: false };

const cursoNormal = { oculto: false };
const cursoMarcado = { oculto: true };
const leccion = (cambios = {}) => ({ riesgo: 'ninguno', datosPersonales: false, ...cambios });

describe('cursos', () => {
  it('un curso normal siempre se muestra', () => {
    for (const ajustes of [DEMO, OCULTAR_TODO, MOSTRAR_TODO]) expect(cursoOculto(cursoNormal, ajustes)).toBe(false);
  });

  it('un curso con oculto: true se oculta con cualquier ajuste', () => {
    for (const ajustes of [DEMO, OCULTAR_TODO, MOSTRAR_TODO]) {
      expect(cursoOculto(cursoMarcado, ajustes)).toBe(true);
      expect(motivoCursoOculto(cursoMarcado, ajustes)).toBe('curso-oculto');
    }
  });
});

describe('lecciones', () => {
  it('sin riesgo ni datos personales, se muestra', () => {
    expect(leccionOculta(leccion(), cursoNormal, OCULTAR_TODO)).toBe(false);
  });

  it('el riesgo medio siempre se muestra (con aviso ético, que decide la vista)', () => {
    expect(leccionOculta(leccion({ riesgo: 'medio' }), cursoNormal, OCULTAR_TODO)).toBe(false);
  });

  it('el riesgo alto se muestra con ocultarRiesgoAlto: false y se oculta con true', () => {
    expect(leccionOculta(leccion({ riesgo: 'alto' }), cursoNormal, DEMO)).toBe(false);
    expect(motivoLeccionOculta(leccion({ riesgo: 'alto' }), cursoNormal, OCULTAR_TODO)).toBe('riesgo-alto');
  });

  it('los datos personales se ocultan con ocultarDatosPersonales: true, aunque el riesgo sea bajo', () => {
    expect(motivoLeccionOculta(leccion({ datosPersonales: true }), cursoNormal, DEMO)).toBe('datos-personales');
    expect(leccionOculta(leccion({ datosPersonales: true }), cursoNormal, MOSTRAR_TODO)).toBe(false);
  });

  it('con riesgo alto Y datos personales, gana el motivo de datos personales', () => {
    const ambas = leccion({ riesgo: 'alto', datosPersonales: true });
    expect(motivoLeccionOculta(ambas, cursoNormal, DEMO)).toBe('datos-personales');
    expect(motivoLeccionOculta(ambas, cursoNormal, OCULTAR_TODO)).toBe('datos-personales');
  });

  it('cualquier lección de un curso oculto se oculta', () => {
    expect(motivoLeccionOculta(leccion(), cursoMarcado, MOSTRAR_TODO)).toBe('curso-oculto');
  });
});

describe('con los datos reales de datos/', () => {
  const carpeta = new URL('../../../datos/cursos/', import.meta.url);
  const ajustes = JSON.parse(readFileSync(new URL('../../../datos/ajustes.json', import.meta.url), 'utf8'));
  const cursos = readdirSync(carpeta)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(new URL(f, carpeta), 'utf8')));
  const lecciones = cursos.flatMap((c) => c.modulos.flatMap((m) => m.lecciones.map((l) => ({ l, c }))));
  const visibles = (a) => ({
    cursos: cursos.filter((c) => !cursoOculto(c, a)).map((c) => c.id),
    lecciones: lecciones.filter(({ l, c }) => !leccionOculta(l, c, a)).map(({ l }) => l.id),
  });

  it('ajustes.json tiene los valores de la demo', () => {
    expect({ ocultarDatosPersonales: ajustes.ocultarDatosPersonales, ocultarRiesgoAlto: ajustes.ocultarRiesgoAlto }).toEqual(DEMO);
  });

  it('con los ajustes de la demo se ve Python ofensivo y el riesgo alto, pero ningún dato personal', () => {
    const v = visibles(ajustes);
    expect(v.cursos).toContain('python-ofensivo-laboratorio');
    for (const { l } of lecciones) {
      if (l.datosPersonales) expect(v.lecciones, l.id).not.toContain(l.id);
      else if (l.riesgo === 'alto') expect(v.lecciones, l.id).toContain(l.id);
    }
  });

  it('con los dos interruptores encendidos desaparece todo lo de riesgo alto y los datos personales', () => {
    const v = visibles(OCULTAR_TODO);
    for (const { l } of lecciones.filter(({ l }) => l.riesgo === 'alto' || l.datosPersonales)) expect(v.lecciones).not.toContain(l.id);
  });

  it('con los dos interruptores apagados aparecen todas las lecciones de los cursos visibles', () => {
    const v = visibles(MOSTRAR_TODO);
    const deVisibles = lecciones.filter(({ c }) => !c.oculto);
    expect(v.lecciones).toHaveLength(deVisibles.length);
  });
});
