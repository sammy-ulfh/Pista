/**
 * Roadmap por etapas (pantalla 07 · Ciberseguridad; CONSTRUCCION.md, sección 13).
 *
 * `calcularRoadmap()` NO tiene reglas de ruta propias: usa `calcularRuta()` de `lib/ruta.ts` (omisiones, horas por
 * semana, prerrequisitos, tiempo de práctica y reparto en semanas) y solo:
 *   1. decide el orden de las etapas (las de `etapasPrimero` se adelantan en cuanto se cumplen sus prerrequisitos);
 *   2. le pasa a `calcularRuta()` los cursos de las etapas en ese orden, con un corte de semana entre etapas;
 *   3. agrupa el resultado por etapa: cursos, semanas, minutos, si es opcional y su estado según lo visto;
 *   4. arma «Lo que ajustamos por tus respuestas» con el `motivo` de cada respuesta y lo que cambió.
 *
 * Función pura, sin HTML ni `localStorage`. La usan `/mi-ruta` y la bitácora (en el navegador, vía `lib/mi-ruta.ts`)
 * y las pruebas (`roadmap.test.ts`, que comprueban los perfiles de `datos/perfiles-demo.json`).
 *
 * Datos: las etapas están en `datos/escuelas.json` (campo `etapas` del área) y los efectos `etapasOpcionales` y
 * `etapasPrimero`, en `datos/diagnosticos/<área>.json`.
 */
import { calcularRuta, respuestasElegidas, semanaActual, redondear1, type AreaRuta, type DatosRuta, type Ruta, type Semana } from './ruta';

// ── Datos ───────────────────────────────────────────────────────────────────

/** Una etapa tal como está en `escuelas.json`. */
export type EtapaArea = {
  id: string;
  nombre: string;
  cursos: string[];
  alTerminar: string;
  soloLaboratorio: boolean;
};

export type AreaRoadmap = AreaRuta & { etapas: EtapaArea[] };

/** `true` si el área tiene roadmap por etapas. */
export function tieneEtapas<A extends AreaRuta & { etapas?: EtapaArea[] | null }>(area: A): area is A & AreaRoadmap {
  return Array.isArray(area.etapas) && area.etapas.length > 0;
}

// ── Resultado ───────────────────────────────────────────────────────────────

/** completada: ya se vieron todas sus lecciones · actual: la primera sin completar («Estás aquí») · pendiente. */
export type EstadoEtapa = 'completada' | 'actual' | 'pendiente';

export type EtapaRoadmap = {
  id: string;
  nombre: string;
  /** Posición en el roadmap, desde 1 («Etapa 1»). */
  numero: number;
  alTerminar: string;
  soloLaboratorio: boolean;
  opcional: boolean;
  /** Cursos de la etapa que quedan en la ruta, en orden. */
  cursos: string[];
  /** Primera y última semana, o `null` si el diagnóstico le quitó todo («ya lo sabes»). */
  semanas: [number, number] | null;
  /** Lectura + práctica, en minutos. */
  minutos: number;
  /** Lecciones que ya se pueden ver (sin las «en preparación»), en orden. */
  lecciones: string[];
  vistas: number;
  estado: EstadoEtapa;
  /** `true` si no le queda ninguna lección (todo se omitió). */
  sinLecciones: boolean;
};

/** Una línea de «Lo que ajustamos por tus respuestas». */
export type AjusteRoadmap = { pregunta: string; texto: string };

export type Roadmap = {
  area: string;
  /** La ruta de `calcularRuta()` (semanas, omisiones, cursos) sobre la que se arma el roadmap. */
  ruta: Ruta;
  etapas: EtapaRoadmap[];
  ajustes: AjusteRoadmap[];
  /** Id de la etapa «Estás aquí», o `null` si ya se completó todo. */
  etapaActual: string | null;
  /** La semana en curso con sus lecciones, o `null` si la ruta quedó vacía. */
  semanaActual: Semana | null;
  /** Primera lección de la semana actual que todavía no se ve (`curso/leccion`), o `null`. */
  siguienteLeccion: string | null;
  totalSemanas: number;
  /** Semanas sin contar las etapas opcionales. */
  semanasObligatorias: number;
};

// ── Orden de las etapas ─────────────────────────────────────────────────────

/**
 * Orden en que se recorren las etapas. Una etapa depende de otra si alguno de sus cursos tiene un prerrequisito en
 * ella. Se toma siempre, entre las etapas listas (con sus dependencias ya puestas), la primera de `primero` en el
 * orden del área; si ninguna de `primero` está lista, la primera etapa lista en el orden del área.
 * Sin `primero`, el orden es el del área (el validador comprueba que ese orden respeta los prerrequisitos).
 */
export function ordenarEtapas(
  etapas: EtapaArea[],
  prerrequisitosDe: (curso: string) => string[],
  primero: ReadonlySet<string> = new Set(),
): { orden: EtapaArea[]; dependencias: Map<string, Set<string>> } {
  const etapaDe = new Map(etapas.flatMap((e) => e.cursos.map((c) => [c, e.id] as const)));
  const dependencias = new Map(
    etapas.map((e) => [
      e.id,
      new Set(
        e.cursos
          .flatMap(prerrequisitosDe)
          .map((p) => etapaDe.get(p))
          .filter((id): id is string => id !== undefined && id !== e.id),
      ),
    ]),
  );
  const puestas = new Set<string>();
  const orden: EtapaArea[] = [];
  while (orden.length < etapas.length) {
    const pendientes = etapas.filter((e) => !puestas.has(e.id));
    const listas = pendientes.filter((e) => [...dependencias.get(e.id)!].every((d) => puestas.has(d)));
    // Con datos mal escritos (un ciclo) ninguna está lista: se sigue el orden del área para no quedar atorados.
    const siguiente = listas.find((e) => primero.has(e.id)) ?? listas[0] ?? pendientes[0];
    puestas.add(siguiente.id);
    orden.push(siguiente);
  }
  return { orden, dependencias };
}

// ── La regla ────────────────────────────────────────────────────────────────

const mayuscula = (texto: string) => texto.charAt(0).toLocaleUpperCase('es') + texto.slice(1);
const unirConY = (partes: string[]) => (partes.length < 2 ? partes.join('') : `${partes.slice(0, -1).join(', ')} y ${partes.at(-1)}`);

/**
 * Calcula el roadmap de un área con etapas.
 * `estado.leccionesVistas` decide qué etapa está completada y cuál es la actual (sin él, se empieza de cero).
 */
export function calcularRoadmap(
  area: AreaRoadmap,
  respuestas: Record<string, string>,
  datos: DatosRuta,
  estado: { leccionesVistas: readonly string[] } = { leccionesVistas: [] },
): Roadmap {
  const elegidas = respuestasElegidas(datos.diagnostico, respuestas);
  const opcionales = new Set(elegidas.flatMap((e) => e.efectos.etapasOpcionales ?? []));
  const primero = new Set(elegidas.flatMap((e) => e.efectos.etapasPrimero ?? []));

  const prerrequisitosDe = (curso: string) => datos.cursos[curso]?.prerrequisitos ?? [];
  const { orden, dependencias } = ordenarEtapas(area.etapas, prerrequisitosDe, primero);

  // La ruta de siempre, con los cursos en el orden de las etapas y una semana nueva al cambiar de etapa.
  const etapaDe = new Map(orden.flatMap((e) => e.cursos.map((c) => [c, e.id] as const)));
  const ultima = orden.at(-1)!.id;
  const ruta = calcularRuta({ id: area.id, ruta: orden.flatMap((e) => e.cursos) }, respuestas, datos, {
    // Un curso fuera de las etapas (agregado por el diagnóstico) va en la última; el validador lo evita.
    grupoDeCurso: (curso) => etapaDe.get(curso) ?? ultima,
  });
  const grupo = (curso: string) => etapaDe.get(curso) ?? ultima;

  const vistas = new Set(estado.leccionesVistas);
  let actualPuesta = false;
  const etapas: EtapaRoadmap[] = orden.map((etapa, i) => {
    const semanas = ruta.semanas.filter((s) => s.elementos.some((e) => grupo(e.curso) === etapa.id));
    const elementos = semanas.flatMap((s) => s.elementos.filter((e) => grupo(e.curso) === etapa.id));
    const lecciones = elementos.flatMap((e) => (e.tipo === 'leccion' && !e.enPreparacion ? [e.id] : []));
    const vistasEtapa = lecciones.filter((id) => vistas.has(id)).length;
    const completada = vistasEtapa === lecciones.length;
    let estadoEtapa: EstadoEtapa = completada ? 'completada' : 'pendiente';
    if (!completada && !actualPuesta) {
      estadoEtapa = 'actual';
      actualPuesta = true;
    }
    return {
      id: etapa.id,
      nombre: etapa.nombre,
      numero: i + 1,
      alTerminar: etapa.alTerminar,
      soloLaboratorio: etapa.soloLaboratorio,
      opcional: opcionales.has(etapa.id),
      cursos: ruta.cursos.filter((c) => grupo(c) === etapa.id),
      semanas: semanas.length ? [semanas[0].numero, semanas.at(-1)!.numero] : null,
      minutos: redondear1(elementos.reduce((total, e) => total + e.minutos, 0)),
      lecciones,
      vistas: vistasEtapa,
      estado: estadoEtapa,
      sinLecciones: elementos.length === 0,
    };
  });

  // «Lo que ajustamos por tus respuestas»: cada respuesta con `motivo`, y lo que cambió por ella.
  const titulo = (curso: string) => datos.cursos[curso]?.titulo ?? curso;
  const nombreEtapa = new Map(area.etapas.map((e) => [e.id, e.nombre]));
  const posicionBase = new Map(area.etapas.map((e, i) => [e.id, i]));
  const ajustes: AjusteRoadmap[] = elegidas
    .filter((e) => e.conMotivo)
    .map((e) => {
      const detalles: string[] = [];
      const porCurso = new Map<string, number>();
      for (const l of ruta.leccionesOmitidas.filter((l) => l.pregunta === e.pregunta)) {
        const curso = l.leccion.split('/')[0];
        porCurso.set(curso, (porCurso.get(curso) ?? 0) + 1);
      }
      if (porCurso.size) {
        detalles.push(
          `omitimos ${unirConY([...porCurso].map(([curso, n]) => `${n} ${n === 1 ? 'lección' : 'lecciones'} de «${titulo(curso)}»`))}`,
        );
      }
      const cursos = ruta.cursosOmitidos.filter((o) => o.pregunta === e.pregunta).map((o) => `«${titulo(o.curso)}»`);
      if (cursos.length) detalles.push(`te saltas ${unirConY(cursos)}`);
      for (const id of e.efectos.etapasOpcionales ?? []) if (nombreEtapa.has(id)) detalles.push(`la etapa ${nombreEtapa.get(id)} es opcional`);
      const adelantadas: string[] = [];
      for (const id of e.efectos.etapasPrimero ?? []) {
        const nueva = orden.findIndex((x) => x.id === id);
        if (nueva < 0) continue;
        if (nueva < posicionBase.get(id)!) {
          adelantadas.push(nombreEtapa.get(id)!);
          continue;
        }
        // No se pudo adelantar: dice qué etapa (que no se adelanta) necesita antes.
        const espera = [...dependencias.get(id)!].filter((d) => !primero.has(d)).map((d) => nombreEtapa.get(d)!);
        if (espera.length) detalles.push(`${nombreEtapa.get(id)} sigue después de ${unirConY(espera)}, porque necesita lo que aprendes ahí`);
      }
      if (adelantadas.length) detalles.unshift(`adelantamos ${unirConY(adelantadas)}`);
      return { pregunta: e.pregunta, texto: mayuscula(detalles.length ? `${e.texto}: ${detalles.join('; ')}` : e.texto) };
    });

  const numeroActual = semanaActual(ruta, estado.leccionesVistas);
  const semana = ruta.semanas.find((s) => s.numero === numeroActual) ?? null;
  const siguienteLeccion =
    semana?.elementos.find((e) => e.tipo === 'leccion' && !e.enPreparacion && !vistas.has(e.id))?.id ?? null;
  const opcionalesSemanas = new Set(etapas.filter((e) => e.opcional).map((e) => e.id));

  return {
    area: area.id,
    ruta,
    etapas,
    ajustes,
    etapaActual: etapas.find((e) => e.estado === 'actual')?.id ?? null,
    semanaActual: semana,
    siguienteLeccion,
    totalSemanas: ruta.totalSemanas,
    semanasObligatorias: ruta.semanas.filter((s) => !opcionalesSemanas.has(grupo(s.elementos[0].curso))).length,
  };
}

/** El roadmap con la forma de `perfiles-demo.json` → `roadmapEsperado` (lo que comprueban las pruebas). */
export function resumenRoadmap(roadmap: Roadmap) {
  return {
    etapas: roadmap.etapas.map(({ id, cursos, semanas, opcional }) => ({ id, cursos, semanas, opcional })),
    ajustes: roadmap.ajustes,
    totalSemanas: roadmap.totalSemanas,
    semanasObligatorias: roadmap.semanasObligatorias,
  };
}

// ── Para la pantalla ────────────────────────────────────────────────────────

/** «Etapa 1 · Sem 1–2», «Etapa 4 · Sem 7» o «Etapa 2 · ya lo sabes» (si se omitió todo). */
export function textoEncabezadoEtapa(etapa: EtapaRoadmap): string {
  if (!etapa.semanas) return `Etapa ${etapa.numero} · ya lo sabes`;
  const [inicio, fin] = etapa.semanas;
  return `Etapa ${etapa.numero} · Sem ${inicio === fin ? inicio : `${inicio}–${fin}`}`;
}

/** Las píldoras de una etapa, en orden: su estado («Estás aquí» o «Completada»), «Opcional» y «Solo en laboratorio». */
export function pildorasEtapa(etapa: EtapaRoadmap): string[] {
  const pildoras: string[] = [];
  if (etapa.sinLecciones) pildoras.push('Ya lo sabes');
  else if (etapa.estado === 'actual') pildoras.push('Estás aquí');
  else if (etapa.estado === 'completada') pildoras.push('Completada');
  if (etapa.opcional) pildoras.push('Opcional');
  if (etapa.soloLaboratorio) pildoras.push('Solo en laboratorio');
  return pildoras;
}

/** «5 etapas · ~10 semanas · 3 h por semana», con «(+8 si haces la etapa opcional)» si hay opcionales. */
export function textoResumenRoadmap(roadmap: Roadmap, horasPorSemana: string): string {
  const extra = roadmap.totalSemanas - roadmap.semanasObligatorias;
  const opcionales = roadmap.etapas.filter((e) => e.opcional).length;
  const semanas = `~${roadmap.semanasObligatorias} ${roadmap.semanasObligatorias === 1 ? 'semana' : 'semanas'}`;
  const conOpcional = extra > 0 ? ` (+${extra} si haces ${opcionales === 1 ? 'la etapa opcional' : 'las etapas opcionales'})` : '';
  return [`${roadmap.etapas.length} etapas`, `${semanas}${conOpcional}`, horasPorSemana].join(' · ');
}
