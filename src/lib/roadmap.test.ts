/**
 * Pruebas del roadmap por etapas (`npm run probar`).
 *
 * Cada perfil de `datos/perfiles-demo.json` de un área con etapas (Ciberseguridad) debe dar EXACTAMENTE su
 * `resultadoEsperado` (la ruta) y su `roadmapEsperado` (las etapas), con los datos reales de `datos/`. Si cambias
 * una pregunta, un efecto, los minutos de una lección, un `factorPractica` o una etapa, actualiza esos resultados.
 */
import { describe, expect, it } from 'vitest';
import ajustes from '../../datos/ajustes.json';
import escuelas from '../../datos/escuelas.json';
import perfilesCrudos from '../../datos/perfiles-demo.json';
import { rutaDelEstado } from './mi-ruta';
import { calcularRoadmap, ordenarEtapas, resumenRoadmap, tieneEtapas, type AreaRoadmap, type Roadmap } from './roadmap';
import { calcularRuta, type CursoRuta, type DatosRuta, type DiagnosticoRuta, type Ruta } from './ruta';

type PerfilPrueba = (typeof perfilesCrudos)[number] & {
  respuestasDiagnostico: Record<string, string>;
  roadmapEsperado?: unknown;
};
const perfiles = perfilesCrudos as unknown as PerfilPrueba[];

const cursos: Record<string, CursoRuta> = Object.fromEntries(
  Object.values(import.meta.glob<CursoRuta>('../../datos/cursos/*.json', { eager: true, import: 'default' })).map((c) => [c.id, c]),
);
const diagnosticos: Record<string, DiagnosticoRuta> = Object.fromEntries(
  Object.values(import.meta.glob<DiagnosticoRuta>('../../datos/diagnosticos/*.json', { eager: true, import: 'default' })).map(
    (d) => [d.area, d],
  ),
);
const areas = escuelas.flatMap((e) => e.areas) as unknown as (AreaRoadmap | (Omit<AreaRoadmap, 'etapas'> & { etapas?: undefined }))[];
const ciberseguridad = areas.find((a) => a.id === 'ciberseguridad') as AreaRoadmap;

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

/** La ruta con la misma forma que `resultadoEsperado`. */
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

const perfil = (id: string) => perfiles.find((p) => p.id === id)!;
const roadmapDe = (id: string, vistas: string[] = []) =>
  calcularRoadmap(ciberseguridad, perfil(id).respuestasDiagnostico, datos('ciberseguridad'), { leccionesVistas: vistas });
const etapa = (r: Roadmap, id: string) => r.etapas.find((e) => e.id === id)!;

/** Respuestas de Ciberseguridad con cambios sobre las de Sofía. */
const respuestas = (cambios: Record<string, string>) => ({ ...perfil('sofia').respuestasDiagnostico, ...cambios });

describe('perfiles de ciberseguridad', () => {
  const conEtapas = perfiles.filter((p) => areas.find((a) => a.id === p.area)?.etapas);

  it('hay al menos 2 (Sofía y Valeria), y Sofía va primero en el archivo', () => {
    expect(conEtapas.map((p) => p.id)).toEqual(['sofia', 'valeria']);
    expect(perfiles[0].id).toBe('sofia');
  });

  for (const p of conEtapas) {
    it(`${p.nombre} obtiene exactamente su roadmap y su ruta esperados`, () => {
      const r = roadmapDe(p.id);
      expect(comoEsperado(r.ruta)).toEqual(p.resultadoEsperado);
      expect(resumenRoadmap(r)).toEqual(p.roadmapEsperado);
    });
  }

  it('Sofía y Valeria dan roadmaps visiblemente distintos', () => {
    const sofia = roadmapDe('sofia');
    const valeria = roadmapDe('valeria');
    // Distinto número de semanas.
    expect(sofia.semanasObligatorias).not.toBe(valeria.semanasObligatorias);
    expect(sofia.totalSemanas).not.toBe(valeria.totalSemanas);
    // La etapa Avanzado: opcional para Sofía, obligatoria para Valeria.
    expect(etapa(sofia, 'avanzado').opcional).toBe(true);
    expect(etapa(valeria, 'avanzado').opcional).toBe(false);
    // Sofía no se salta nada; Valeria sí, y empieza la etapa 1 en otra lección.
    expect(sofia.ruta.leccionesOmitidas).toEqual([]);
    expect(valeria.ruta.leccionesOmitidas.length).toBeGreaterThan(0);
    expect(sofia.semanaActual!.lecciones[0]).not.toBe(valeria.semanaActual!.lecciones[0]);
  });

  it('Sofía: «Esta semana» es la semana 1 y empieza por crear una máquina virtual', () => {
    const sofia = roadmapDe('sofia');
    expect(sofia.etapaActual).toBe('fundamentos');
    expect(sofia.semanaActual!.numero).toBe(1);
    expect(sofia.siguienteLeccion).toBe('linux-desde-cero/crear-una-maquina-virtual');
    expect(sofia.ajustes.map((a) => a.texto)).toContain('Tu meta es protegerte: la etapa Avanzado es opcional');
  });

  it('el roadmap de /mi-ruta (rutaDelEstado) es el mismo que el de las pruebas', () => {
    const sofia = perfil('sofia');
    const resultado = rutaDelEstado(
      { areaElegida: 'ciberseguridad', diagnosticos: { ciberseguridad: sofia.respuestasDiagnostico }, leccionesVistas: [] },
      { cursos, diagnosticos, horasSemanaPorDefecto: ajustes.ritmo.horasSemanaPorDefecto, ocultarDatosPersonales: true, ocultarRiesgoAlto: false, areas },
    );
    expect(resultado?.roadmap && resumenRoadmap(resultado.roadmap)).toEqual(sofia.roadmapEsperado);
  });
});

describe('reglas del roadmap', () => {
  const todos = [
    roadmapDe('sofia'),
    roadmapDe('valeria'),
    calcularRoadmap(ciberseguridad, respuestas({ objetivo: 'ctf' }), datos('ciberseguridad')),
    calcularRoadmap(ciberseguridad, respuestas({ terminal: 'seguido', redes: 'subredes', programar: 'seguido', virtuales: 'docker', objetivo: 'ctf', tiempo: '2-horas' }), datos('ciberseguridad')),
  ];

  it('ninguna lección cae en una etapa equivocada y cada semana es de una sola etapa', () => {
    const etapaDe = new Map(ciberseguridad.etapas.flatMap((e) => e.cursos.map((c) => [c, e.id] as const)));
    for (const r of todos) {
      for (const e of r.etapas) {
        for (const c of e.cursos) expect(etapaDe.get(c), c).toBe(e.id);
        for (const id of e.lecciones) expect(etapaDe.get(id.split('/')[0]), id).toBe(e.id);
        if (!e.semanas) continue;
        for (const semana of r.ruta.semanas.slice(e.semanas[0] - 1, e.semanas[1])) {
          for (const el of semana.elementos) expect(etapaDe.get(el.curso), `${el.id} en semana ${semana.numero}`).toBe(e.id);
        }
      }
      // Las semanas de las etapas van seguidas, sin huecos ni repeticiones.
      const rangos = r.etapas.flatMap((e) => (e.semanas ? [e.semanas] : []));
      rangos.forEach(([inicio], i) => expect(inicio).toBe(i === 0 ? 1 : rangos[i - 1][1] + 1));
      expect(rangos.at(-1)![1]).toBe(r.totalSemanas);
    }
  });

  it('se respetan los prerrequisitos: ningún curso va antes que otro que necesita', () => {
    for (const r of todos) {
      r.ruta.cursos.forEach((id, i) => {
        for (const previo of cursos[id].prerrequisitos) {
          const j = r.ruta.cursos.indexOf(previo);
          const omitido = r.ruta.cursosOmitidos.some((o) => o.curso === previo);
          expect(j >= 0 ? j < i : omitido, `${previo} antes de ${id}`).toBe(true);
        }
      });
    }
  });

  it('el tiempo de práctica se suma: la ruta dura minutos × factorPractica', () => {
    const sofia = roadmapDe('sofia');
    const lectura = Object.values(cursos)
      .filter((c) => sofia.ruta.cursos.includes(c.id))
      .flatMap((c) => c.modulos.flatMap((m) => m.lecciones.filter((l) => !l.datosPersonales).map((l) => l.minutos * (c.factorPractica ?? 1))))
      .reduce((a, b) => a + b, 0);
    expect(sofia.ruta.minutosTotal).toBeCloseTo(lectura, 0);
    expect(cursos['linux-desde-cero'].factorPractica).toBeGreaterThanOrEqual(2);
  });

  it('CTF: Reconocimiento se adelanta en cuanto puede; Explotación espera a Docker (Tu laboratorio)', () => {
    const r = calcularRoadmap(ciberseguridad, respuestas({ objetivo: 'ctf' }), datos('ciberseguridad'));
    expect(r.etapas.map((e) => e.id)).toEqual(['fundamentos', 'reconocimiento', 'laboratorio', 'explotacion', 'avanzado']);
    expect(r.etapas.every((e) => !e.opcional)).toBe(true);
    expect(r.ajustes.find((a) => a.pregunta === 'objetivo')!.texto).toBe(
      'Quieres competir en retos CTF: adelantamos Reconocimiento; Explotación sigue después de Tu laboratorio, porque necesita lo que aprendes ahí',
    );
  });

  it('«Prepararme para prácticas»: todas las etapas son obligatorias y van en el orden del área', () => {
    const r = calcularRoadmap(ciberseguridad, respuestas({ objetivo: 'practicas' }), datos('ciberseguridad'));
    expect(r.etapas.map((e) => e.id)).toEqual(ciberseguridad.etapas.map((e) => e.id));
    expect(r.semanasObligatorias).toBe(r.totalSemanas);
  });

  it('cada pregunta tiene una opción tipo «Nunca lo he hecho» que no omite nada', () => {
    for (const pregunta of diagnosticos.ciberseguridad.preguntas.filter((p) => !['objetivo', 'tiempo'].includes(p.id))) {
      const e = pregunta.opciones[0].efectos;
      expect(Object.keys(e), pregunta.id).toEqual([]);
    }
    expect(diagnosticos.ciberseguridad.preguntas).toHaveLength(6);
  });
});

describe('estado de las etapas', () => {
  it('al ver todas las lecciones de la etapa 1, queda «Completada» y «Estás aquí» pasa a la etapa 2', () => {
    const inicio = roadmapDe('sofia');
    expect(inicio.etapas.map((e) => e.estado)).toEqual(['actual', 'pendiente', 'pendiente', 'pendiente', 'pendiente']);
    const despues = roadmapDe('sofia', inicio.etapas[0].lecciones);
    expect(despues.etapas.map((e) => e.estado)).toEqual(['completada', 'actual', 'pendiente', 'pendiente', 'pendiente']);
    expect(despues.etapaActual).toBe('laboratorio');
    expect(despues.semanaActual!.numero).toBe(etapa(despues, 'laboratorio').semanas![0]);
  });

  it('con todo visto no hay etapa actual', () => {
    const inicio = roadmapDe('valeria');
    const final = roadmapDe('valeria', inicio.etapas.flatMap((e) => e.lecciones));
    expect(final.etapaActual).toBeNull();
    expect(final.etapas.every((e) => e.estado === 'completada')).toBe(true);
    expect(final.siguienteLeccion).toBeNull();
  });
});

describe('ordenarEtapas', () => {
  const etapas = [
    { id: 'a', nombre: 'A', cursos: ['x'], alTerminar: '…', soloLaboratorio: false },
    { id: 'b', nombre: 'B', cursos: ['y'], alTerminar: '…', soloLaboratorio: false },
    { id: 'c', nombre: 'C', cursos: ['z'], alTerminar: '…', soloLaboratorio: false },
  ];
  const prerrequisitos: Record<string, string[]> = { x: [], y: ['x'], z: ['x'] };

  it('sin preferencia sigue el orden del área', () => {
    expect(ordenarEtapas(etapas, (c) => prerrequisitos[c]).orden.map((e) => e.id)).toEqual(['a', 'b', 'c']);
  });

  it('adelanta una etapa preferida en cuanto sus prerrequisitos están puestos, nunca antes', () => {
    expect(ordenarEtapas(etapas, (c) => prerrequisitos[c], new Set(['c'])).orden.map((e) => e.id)).toEqual(['a', 'c', 'b']);
    expect(ordenarEtapas(etapas, (c) => prerrequisitos[c], new Set(['c', 'a'])).orden.map((e) => e.id)).toEqual(['a', 'c', 'b']);
  });
});

describe('áreas sin etapas', () => {
  it('siguen usando la ruta por semanas, sin cambios', () => {
    const mariana = perfil('mariana');
    const area = areas.find((a) => a.id === mariana.area)!;
    expect(tieneEtapas(area)).toBe(false);
    const estado = { areaElegida: mariana.area, diagnosticos: { [mariana.area]: mariana.respuestasDiagnostico }, leccionesVistas: [] };
    const resultado = rutaDelEstado(estado, {
      cursos,
      diagnosticos,
      horasSemanaPorDefecto: ajustes.ritmo.horasSemanaPorDefecto,
      ocultarDatosPersonales: true,
      ocultarRiesgoAlto: false,
      areas,
    });
    expect(resultado?.roadmap).toBeNull();
    expect(resultado?.ruta).toEqual(calcularRuta(area, mariana.respuestasDiagnostico, datos(mariana.area)));
    expect(comoEsperado(resultado!.ruta)).toEqual(mariana.resultadoEsperado);
  });
});

describe('textos de la pantalla', () => {
  it('encabezado, píldoras y resumen de Sofía', async () => {
    const { pildorasEtapa, textoEncabezadoEtapa, textoResumenRoadmap } = await import('./roadmap');
    const sofia = roadmapDe('sofia');
    expect(textoEncabezadoEtapa(sofia.etapas[0])).toBe('Etapa 1 · Sem 1–2');
    expect(pildorasEtapa(sofia.etapas[0])).toEqual(['Estás aquí']);
    expect(pildorasEtapa(etapa(sofia, 'avanzado'))).toEqual(['Opcional', 'Solo en laboratorio']);
    expect(textoResumenRoadmap(sofia, '3 h por semana')).toBe('5 etapas · ~10 semanas (+8 si haces la etapa opcional) · 3 h por semana');
    expect(textoResumenRoadmap(roadmapDe('valeria'), '5 h por semana')).toBe('5 etapas · ~12 semanas · 5 h por semana');
  });
});
