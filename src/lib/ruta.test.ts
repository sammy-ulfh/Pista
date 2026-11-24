/**
 * Pruebas de la ruta (`npm run probar`).
 *
 * Cada perfil de `datos/perfiles-demo.json` de un área SIN etapas debe dar EXACTAMENTE su `resultadoEsperado`,
 * leyendo los datos reales de `datos/`. Los perfiles de áreas con etapas (Ciberseguridad) se comprueban en
 * `roadmap.test.ts`, porque su ruta se arma con `calcularRoadmap()`. Si cambias una pregunta, un efecto, los minutos de una lección o el ritmo, actualiza
 * el resultado esperado del perfil afectado.
 */
import { describe, expect, it } from 'vitest';
import ajustes from '../../datos/ajustes.json';
import escuelas from '../../datos/escuelas.json';
import perfilesCrudos from '../../datos/perfiles-demo.json';

// Los JSON se importan con tipos literales; se leen con la forma del esquema (respuestas como texto → texto).
const perfiles = perfilesCrudos as unknown as ((typeof perfilesCrudos)[number] & { respuestasDiagnostico: Record<string, string>; respuestasOrientacion: Record<string, string> })[];
import {
  calcularRuta,
  diagnosticoCompleto,
  lunesSiguiente,
  repartirEnSemanas,
  semanaActual,
  type CursoRuta,
  type DatosRuta,
  type DiagnosticoRuta,
  type ElementoSemana,
  type Ruta,
} from './ruta';

const cursos: Record<string, CursoRuta> = Object.fromEntries(
  Object.values(import.meta.glob<CursoRuta>('../../datos/cursos/*.json', { eager: true, import: 'default' })).map((c) => [c.id, c]),
);
const diagnosticos: Record<string, DiagnosticoRuta> = Object.fromEntries(
  Object.values(import.meta.glob<DiagnosticoRuta>('../../datos/diagnosticos/*.json', { eager: true, import: 'default' })).map(
    (d) => [d.area, d],
  ),
);
const areas = escuelas.flatMap((e) => e.areas);

function area(id: string) {
  const encontrada = areas.find((a) => a.id === id);
  if (!encontrada) throw new Error(`No existe el área ${id}`);
  return encontrada;
}

function datos(areaId: string, cambios: Partial<DatosRuta> = {}): DatosRuta {
  return {
    diagnostico: diagnosticos[areaId],
    cursos,
    horasSemanaPorDefecto: ajustes.ritmo.horasSemanaPorDefecto,
    ocultarDatosPersonales: ajustes.ocultarDatosPersonales,
    ocultarRiesgoAlto: ajustes.ocultarRiesgoAlto,
    ...cambios,
  };
}

/** La ruta con la misma forma que `resultadoEsperado` (sin los campos extra que usa la pantalla). */
function comoEsperado(ruta: Ruta) {
  return {
    horasSemana: ruta.horasSemana,
    cursos: ruta.cursos,
    cursosOmitidos: ruta.cursosOmitidos.map(({ curso, motivo, pregunta }) => ({ curso, motivo, pregunta })),
    leccionesOmitidas: ruta.leccionesOmitidas.map(({ leccion, pregunta }) => ({ leccion, pregunta })),
    semanas: ruta.semanas.map(({ numero, lecciones, minutos }) => ({ numero, lecciones, minutos })),
    totalSemanas: ruta.totalSemanas,
    minutosTotal: ruta.minutosTotal,
  };
}

/**
 * Respuestas de alguien que empieza de cero: en cada pregunta, la primera opción que no omite nada
 * (en las de experiencia es «Nunca lo he hecho» o «No»; en «tiempo», «Menos de 1 hora»). Se pueden cambiar
 * preguntas sueltas con `elegidas`.
 */
function respuestasDePrincipiante(areaId: string, elegidas: Record<string, string> = {}): Record<string, string> {
  const primerCurso = area(areaId).ruta[0];
  return Object.fromEntries(
    diagnosticos[areaId].preguntas.map((p) => {
      const sinOmitir = p.opciones.find(
        ({ efectos: e }) =>
          !e.omitirLecciones && !e.omitirModulos && !e.omitirCursos && (!e.cursoInicio || e.cursoInicio === primerCurso),
      );
      return [p.id, elegidas[p.id] ?? (sinOmitir ?? p.opciones[0]).id];
    }),
  );
}

/** Responde la primera opción de cada pregunta, salvo las indicadas. */
function respuestasCon(areaId: string, elegidas: Record<string, string> = {}): Record<string, string> {
  return Object.fromEntries(diagnosticos[areaId].preguntas.map((p) => [p.id, elegidas[p.id] ?? p.opciones[0].id]));
}

/** `true` si el área tiene roadmap por etapas. */
const conEtapas = (areaId: string) => 'etapas' in area(areaId);

describe('perfiles de la presentación', () => {
  for (const perfil of perfiles.filter((p) => !conEtapas(p.area))) {
    it(`${perfil.nombre} obtiene exactamente su resultado esperado`, () => {
      const ruta = calcularRuta(area(perfil.area), perfil.respuestasDiagnostico, datos(perfil.area));
      expect(comoEsperado(ruta)).toEqual(perfil.resultadoEsperado);
    });
  }

  it('Mariana: 4 semanas con sus 3 cursos y «Qué es emprender» omitido con su motivo', () => {
    const mariana = perfiles.find((p) => p.id === 'mariana')!;
    const ruta = calcularRuta(area(mariana.area), mariana.respuestasDiagnostico, datos(mariana.area));
    expect(ruta.totalSemanas).toBe(4);
    expect(ruta.cursos).toEqual(['tus-primeros-clientes', 'hablar-para-vender', 'precios-sin-miedo']);
    expect(ruta.cursosOmitidos[0].texto).toBe('ya tienes algo que ofrecer');
    // La semana 3 solo tiene lecciones en preparación: se ve atenuada.
    expect(ruta.semanas.map((s) => s.estado)).toEqual(['disponible', 'disponible', 'en-preparacion', 'en-preparacion']);
  });

  it('Diego: los cursos «próximamente» ocupan semanas propias en partes iguales', () => {
    const diego = perfiles.find((p) => p.id === 'diego')!;
    const ruta = calcularRuta(area(diego.area), diego.respuestasDiagnostico, datos(diego.area));
    expect(ruta.semanas.slice(2).map((s) => [s.estado, s.minutos])).toEqual([
      ['proximamente', 60],
      ['proximamente', 40],
      ['proximamente', 40],
    ]);
    expect(ruta.detalleCursos.at(-1)).toMatchObject({ curso: 'argumentar-y-convencer', agregadoPor: 'diagnostico' });
  });

  it('Mariana no depende del tiempo de práctica: sus cursos tienen factor 1', () => {
    const mariana = perfiles.find((p) => p.id === 'mariana')!;
    for (const id of mariana.resultadoEsperado.cursos) expect(cursos[id].factorPractica ?? 1, id).toBe(1);
  });
});

describe('casos borde', () => {
  it('todas las respuestas en «nunca lo he hecho»: no se omite nada y se usa la ruta completa del área', () => {
    for (const areaId of Object.keys(diagnosticos)) {
      const ruta = calcularRuta(area(areaId), respuestasDePrincipiante(areaId), datos(areaId));
      expect(ruta.leccionesOmitidas, areaId).toEqual([]);
      expect(ruta.cursosOmitidos, areaId).toEqual([]);
      expect(ruta.cursos.slice(0, area(areaId).ruta.length), areaId).toEqual(area(areaId).ruta);
    }
    const ruta = calcularRuta(area('linux'), respuestasDePrincipiante('linux'), datos('linux'));
    expect(ruta.cursos).toEqual(area('linux').ruta);
    expect(ruta.horasSemana).toBe(0.5);
    // 30 minutos por semana: ninguna semana pasa del límite salvo una lección que sola ya lo pasa.
    for (const semana of ruta.semanas) {
      expect(semana.minutos <= 30 || semana.lecciones.length === 1).toBe(true);
    }
  });

  it('máximo de horas: 5 h por semana caben más lecciones y nunca se pasa de 300 minutos', () => {
    const respuestas = respuestasCon('programacion', { tiempo: '5-mas', meta: 'automatizar' });
    const ruta = calcularRuta(area('programacion'), respuestas, datos('programacion'));
    expect(ruta.horasSemana).toBe(5);
    expect(ruta.cursos).toEqual(['python-desde-cero', 'python-practico', 'linux-desde-cero', 'python-automatizacion']);
    for (const semana of ruta.semanas) expect(semana.minutos).toBeLessThanOrEqual(300);
    // Ninguna lección se pierde ni se repite al repartir.
    const enSemanas = ruta.semanas.flatMap((s) => s.lecciones);
    expect(new Set(enSemanas).size).toBe(enSemanas.length);
    expect(ruta.minutosTotal).toBe(Math.round(ruta.semanas.reduce((t, s) => t + s.minutos, 0) * 10) / 10);
  });

  it('un curso agregado trae su prerrequisito si el diagnóstico no lo omitió', () => {
    const ruta = calcularRuta(area('programacion'), respuestasCon('programacion', { meta: 'automatizar' }), datos('programacion'));
    // python-automatizacion necesita linux-desde-cero, que no está en la ruta de Programación.
    expect(ruta.detalleCursos.find((c) => c.curso === 'linux-desde-cero')?.agregadoPor).toBe('prerrequisito');
    expect(ruta.cursos.indexOf('linux-desde-cero')).toBeLessThan(ruta.cursos.indexOf('python-automatizacion'));
  });

  it('un prerrequisito que el diagnóstico omitió se da por sabido', () => {
    // En Cloud y DevOps, «uso la terminal seguido» empieza en Docker, que necesita Linux desde cero.
    const respuestas = respuestasCon('cloud-devops', { terminal: 'seguido', meta: 'automatizar' });
    const ruta = calcularRuta(area('cloud-devops'), respuestas, datos('cloud-devops'));
    expect(cursos['docker-desde-cero'].prerrequisitos).toContain('linux-desde-cero');
    expect(ruta.cursos[0]).toBe('docker-desde-cero');
    expect(ruta.cursos).not.toContain('linux-desde-cero');
    expect(ruta.cursosOmitidos.map(({ curso, motivo, pregunta }) => ({ curso, motivo, pregunta }))).toEqual([
      { curso: 'linux-desde-cero', motivo: 'cursoInicio', pregunta: 'terminal' },
    ]);
  });

  it('tiempo de práctica: en la ruta cada lección dura minutos × factorPractica', () => {
    const conFactor = { ...cursos, 'tus-primeros-clientes': { ...cursos['tus-primeros-clientes'], factorPractica: 2 } };
    const mariana = perfiles.find((p) => p.id === 'mariana')!;
    const normal = calcularRuta(area('conseguir-clientes'), mariana.respuestasDiagnostico, datos('conseguir-clientes'));
    const doble = calcularRuta(area('conseguir-clientes'), mariana.respuestasDiagnostico, datos('conseguir-clientes', { cursos: conFactor }));
    const minutosDe = (r: Ruta) => r.detalleCursos.find((c) => c.curso === 'tus-primeros-clientes')!.minutos;
    expect(minutosDe(doble)).toBeCloseTo(minutosDe(normal) * 2, 1);
    expect(doble.totalSemanas).toBeGreaterThan(normal.totalSemanas);
  });

  it('con grupoDeCurso, cada grupo empieza en semana nueva', () => {
    const r = calcularRuta(area('hablar-en-publico'), {}, datos('hablar-en-publico'), { grupoDeCurso: (c) => c });
    const cursosPorSemana = r.semanas.map((s) => new Set(s.elementos.map((e) => e.curso)).size);
    expect(cursosPorSemana.every((n) => n === 1)).toBe(true);
  });

  it('área con lecciones en preparación: cuentan sus minutos y la semana se marca «en preparación»', () => {
    const respuestas = respuestasCon('conseguir-clientes', { oferta: 'si', 'has-vendido': 'clientes', tiempo: '3-4', meta: 'cobrar-mejor' });
    const ruta = calcularRuta(area('conseguir-clientes'), respuestas, datos('conseguir-clientes'));
    expect(ruta.cursos).toEqual(['tus-primeros-clientes', 'precios-sin-miedo']);
    expect(ruta.cursosOmitidos.map((o) => [o.curso, o.motivo, o.texto])).toEqual([
      ['que-es-emprender', 'cursoInicio', 'ya tienes algo que ofrecer'],
      ['hablar-para-vender', 'diagnostico', 'tu meta es cobrar mejor'],
    ]);
    expect(ruta.leccionesOmitidas.map((l) => l.leccion)).toEqual(['tus-primeros-clientes/donde-encontrarlo']);
    // 3 h por semana: todo cabe en una semana, que mezcla lecciones listas y en preparación.
    expect(ruta.semanas).toHaveLength(1);
    expect(ruta.semanas[0].estado).toBe('disponible');
  });

  it('las lecciones ocultas no cuentan: datos personales siempre fuera; riesgo alto según su interruptor', () => {
    const respuestas = respuestasCon('ciberseguridad', { objetivo: 'practicas' });
    const lecciones = (r: Ruta) => r.semanas.flatMap((s) => s.lecciones);
    const todas = Object.values(cursos).flatMap((c) => c.modulos.flatMap((m) => m.lecciones));
    const personales = todas.filter((l) => l.datosPersonales).map((l) => l.id);
    const altoSinDatos = todas.filter((l) => l.riesgo === 'alto' && !l.datosPersonales).map((l) => l.id);

    const demo = lecciones(calcularRuta(area('ciberseguridad'), respuestas, datos('ciberseguridad')));
    expect(demo.some((id) => personales.includes(id))).toBe(false);
    expect(altoSinDatos.every((id) => demo.includes(id))).toBe(true);

    const sinAlto = lecciones(calcularRuta(area('ciberseguridad'), respuestas, datos('ciberseguridad', { ocultarRiesgoAlto: true })));
    expect(sinAlto.some((id) => altoSinDatos.includes(id))).toBe(false);

    const todo = lecciones(
      calcularRuta(area('ciberseguridad'), respuestas, datos('ciberseguridad', { ocultarDatosPersonales: false, ocultarRiesgoAlto: false })),
    );
    expect(todo.some((id) => personales.includes(id))).toBe(true);
  });

  it('un curso oculto nunca entra, aunque el diagnóstico lo agregue', () => {
    const conOculto = { ...cursos, 'python-automatizacion': { ...cursos['python-automatizacion'], oculto: true } };
    const ruta = calcularRuta(area('programacion'), respuestasCon('programacion', { meta: 'automatizar' }), datos('programacion', { cursos: conOculto }));
    expect(ruta.cursos).not.toContain('python-automatizacion');
  });

  it('sin respuestas usa las horas por defecto y la ruta del área', () => {
    const ruta = calcularRuta(area('hablar-en-publico'), {}, datos('hablar-en-publico'));
    expect(ruta.horasSemana).toBe(ajustes.ritmo.horasSemanaPorDefecto);
    expect(ruta.cursos).toEqual(['habla-en-publico-sin-miedo', 'presentaciones-claras']);
    expect(diagnosticoCompleto(diagnosticos['hablar-en-publico'], {})).toBe(false);
  });

  it('es determinista: las mismas respuestas dan siempre la misma ruta', () => {
    const r = perfiles[0].respuestasDiagnostico;
    expect(calcularRuta(area('conseguir-clientes'), r, datos('conseguir-clientes'))).toEqual(
      calcularRuta(area('conseguir-clientes'), { ...r }, datos('conseguir-clientes')),
    );
  });
});

describe('repartirEnSemanas', () => {
  const leccion = (id: string, minutos: number, enPreparacion = false): ElementoSemana => ({
    tipo: 'leccion',
    id: `c/${id}`,
    curso: 'c',
    titulo: id,
    minutos,
    enPreparacion,
  });

  it('una lección que sola pasa del límite ocupa su propia semana', () => {
    const semanas = repartirEnSemanas([leccion('a', 20), leccion('b', 90), leccion('c', 10)], 1);
    expect(semanas.map((s) => s.lecciones)).toEqual([['c/a'], ['c/b'], ['c/c']]);
  });

  it('llenar exactamente el límite no abre semana nueva', () => {
    const semanas = repartirEnSemanas([leccion('a', 35), leccion('b', 25), leccion('c', 0.1)], 1);
    expect(semanas.map((s) => s.minutos)).toEqual([60, 0.1]);
  });

  it('lo que sigue a un curso «próximamente» empieza en semana nueva', () => {
    const semanas = repartirEnSemanas(
      [leccion('a', 10), { tipo: 'proximamente', id: 'curso:p', curso: 'p', titulo: 'P', minutos: 45 }, leccion('b', 10)],
      0.5,
    );
    expect(semanas.map((s) => [s.lecciones, s.minutos])).toEqual([
      [['c/a'], 10],
      [['curso:p'], 22.5],
      [['curso:p'], 22.5],
      [['c/b'], 10],
    ]);
  });
});

describe('semanaActual y lunesSiguiente', () => {
  const mariana = perfiles.find((p) => p.id === 'mariana')!;
  const ruta = calcularRuta(area(mariana.area), mariana.respuestasDiagnostico, datos(mariana.area));

  it('empieza en la semana 1 y avanza cuando se ven todas las lecciones de una semana', () => {
    expect(semanaActual(ruta, [])).toBe(1);
    expect(semanaActual(ruta, ruta.semanas[0].lecciones)).toBe(2);
    // Las lecciones en preparación no se pueden ver: al terminar lo disponible, queda la última semana.
    expect(semanaActual(ruta, ruta.semanas.flatMap((s) => s.lecciones))).toBe(4);
  });

  it('el lunes siguiente siempre es después de hoy', () => {
    expect(lunesSiguiente(new Date(2026, 10, 22)).toDateString()).toBe(new Date(2026, 10, 23).toDateString()); // domingo → lunes
    expect(lunesSiguiente(new Date(2026, 10, 23)).toDateString()).toBe(new Date(2026, 10, 30).toDateString()); // lunes → lunes siguiente
    expect(lunesSiguiente(new Date(2026, 10, 28)).toDateString()).toBe(new Date(2026, 10, 30).toDateString()); // sábado
  });
});
