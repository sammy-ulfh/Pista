/**
 * Pruebas de la orientación (`npm run probar`).
 *
 * Cada perfil de `datos/perfiles-demo.json` y cada caso de `datos/orientacion.json → casosDePrueba` debe dar
 * exactamente su recomendación esperada, con los datos reales de `datos/`.
 */
import { describe, expect, it } from 'vitest';
import escuelas from '../../datos/escuelas.json';
import orientacion from '../../datos/orientacion.json';
import perfilesCrudos from '../../datos/perfiles-demo.json';

// Los JSON se importan con tipos literales; se leen con la forma del esquema (respuestas como texto → texto).
const perfiles = perfilesCrudos as unknown as ((typeof perfilesCrudos)[number] & { respuestasDiagnostico: Record<string, string>; respuestasOrientacion: Record<string, string> })[];
import { orientacionCompleta, recomendarArea, type DatosOrientacion, type EscuelaOrientacion } from './orientacion';

const datos: DatosOrientacion = {
  preguntas: orientacion.preguntas as unknown as DatosOrientacion['preguntas'],
  escuelas: escuelas as EscuelaOrientacion[],
  avisoProximamente: orientacion.avisoProximamente,
};

/** Solo los campos que guarda `datos/` como resultado esperado. */
function comoEsperado(r: ReturnType<typeof recomendarArea>) {
  const { escuela, area, areasRecomendadas, tambienTePuedeServir, avisoProximamente } = r;
  return { escuela, area, areasRecomendadas, tambienTePuedeServir, avisoProximamente };
}

describe('perfiles de la presentación', () => {
  for (const perfil of perfiles) {
    it(`${perfil.nombre} recibe exactamente su recomendación esperada`, () => {
      const r = recomendarArea(perfil.respuestasOrientacion, datos);
      const { puntos, ...resto } = perfil.orientacionEsperada;
      expect(comoEsperado(r)).toEqual(resto);
      expect(r.puntos).toEqual(puntos);
      // La recomendación lleva al área cuyo diagnóstico responde el perfil.
      expect(r.area).toBe(perfil.area);
    });
  }

  it('la alternativa que se muestra: «También te puede servir» o la segunda área si está disponible', () => {
    const [mariana, diego, valeria, sofia] = ['mariana', 'diego', 'valeria', 'sofia'].map((id) =>
      recomendarArea(perfiles.find((p) => p.id === id)!.respuestasOrientacion, datos),
    );
    expect(mariana.alternativa).toEqual({ escuela: 'comunicacion', area: 'hablar-en-publico' });
    expect(diego.alternativa).toBeNull(); // «Persuasión» está en próximamente
    expect(valeria.alternativa).toEqual({ escuela: 'tecnologia', area: 'programacion' });
    expect(sofia.alternativa).toEqual({ escuela: 'habilidades', area: 'productividad' });
  });

  it('con respuestas naturales de alguien que quiere protegerse se llega a Ciberseguridad', () => {
    // Sofía estudia Contaduría: la carrera suma a Negocios, pero «Entender cómo me pueden hackear» pesa más.
    const r = recomendarArea({ carrera: 'negocios', lograr: 'protegerme', disfrutas: 'organizar', 'primer-paso': 'proteger' }, datos);
    expect(r.area).toBe('ciberseguridad');
  });
});

describe('casos de prueba de datos/orientacion.json', () => {
  for (const caso of orientacion.casosDePrueba) {
    it(caso.nombre, () => {
      expect(comoEsperado(recomendarArea(caso.respuestas, datos))).toEqual(caso.esperado);
    });
  }
});

describe('casos borde', () => {
  it('sin respuestas: gana la primera escuela del catálogo y su primera área disponible', () => {
    const r = recomendarArea({}, datos);
    expect(r.escuela).toBe('tecnologia');
    expect(r.area).toBe('programacion');
    expect(r.tambienTePuedeServir).toBeNull();
    expect(orientacionCompleta({}, datos)).toBe(false);
  });

  it('una escuela completa en «próximamente» recomienda un área disponible de otra escuela, con aviso', () => {
    // Diseño 4 · Tecnología 3 · Habilidades 2. Diseño no tiene áreas disponibles.
    const respuestas = { carrera: 'artes', lograr: 'trabajo-tecnologia', disfrutas: 'visual', 'primer-paso': 'presupuesto' };
    const r = recomendarArea(respuestas, datos);
    // Empate a 1 punto: gana la que va primero en escuelas.json.
    expect(r.areasRecomendadas).toEqual(['diseno-grafico', 'contenido-visual']);
    expect(r.avisoProximamente).toBe('«Diseño gráfico básico» llega pronto. Mientras tanto te recomendamos un área disponible.');
    // Finanzas personales tiene más puntos, pero está en próximamente.
    expect([r.escuela, r.area]).toEqual(['tecnologia', 'programacion']);
    expect(r.tambienTePuedeServir).toBeNull();
  });

  it('respuestas que no existen no suman', () => {
    expect(recomendarArea({ carrera: 'no-existe', otra: 'x' }, datos).puntos.areas).toEqual({});
  });

  it('es determinista', () => {
    const r = perfiles[0].respuestasOrientacion;
    expect(recomendarArea(r, datos)).toEqual(recomendarArea({ ...r }, datos));
  });
});
