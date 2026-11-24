/**
 * Orientación («No sé por dónde empezar»): suma los puntos de las respuestas y recomienda un área.
 *
 * Función pura, sin HTML ni `localStorage`: la usan la página `/orientacion/resultado` (en el navegador)
 * y las pruebas (`orientacion.test.ts`). Las mismas respuestas dan siempre la misma recomendación.
 *
 * La regla está escrita en `datos/orientacion.json` → `regla`:
 *   1. Se suman los puntos de las respuestas (a escuelas y a áreas).
 *   2. Gana la escuela con más puntos; si empatan, la que aparece primero en `escuelas.json`.
 *   3. Dentro de ella se recomiendan las 1-2 áreas con más puntos (la segunda solo si tiene puntos).
 *   4. Si la primera está en «próximamente», se avisa y se recomienda la alternativa disponible más cercana:
 *      el área disponible con más puntos de la misma escuela; si no hay, la de cualquier escuela;
 *      si nadie tiene puntos, la primera área disponible de esa escuela (o del catálogo).
 *   5. «También te puede servir» = el área disponible con más puntos de otra escuela (si tiene puntos).
 *
 * Las preguntas, los puntos y el texto del aviso se cambian en `datos/orientacion.json`; el orden de
 * escuelas y áreas (que decide los empates) en `datos/escuelas.json`.
 */

export type Puntos = { escuelas: Record<string, number>; areas: Record<string, number> };

/** Lo mínimo que la regla necesita de `orientacion.json`. */
export type PreguntaOrientacion = {
  id: string;
  opciones: { id: string; suma: Puntos }[];
};

/** Lo mínimo que la regla necesita de `escuelas.json` (en el orden del archivo). */
export type EscuelaOrientacion = {
  id: string;
  areas: { id: string; nombre: string; estado: 'disponible' | 'muestra' | 'proximamente' }[];
};

export type DatosOrientacion = {
  preguntas: PreguntaOrientacion[];
  escuelas: EscuelaOrientacion[];
  /** `orientacion.json` → `avisoProximamente`, con `{area}`. */
  avisoProximamente: string;
};

export type AreaRecomendada = { escuela: string; area: string };

export type Recomendacion = {
  /** Escuela del área recomendada. */
  escuela: string;
  /** Área recomendada (siempre una que se puede cursar). */
  area: string;
  /** Las 1-2 áreas con más puntos de la escuela ganadora, aunque alguna esté en «próximamente». */
  areasRecomendadas: string[];
  /** Área disponible con más puntos de otra escuela, o `null`. */
  tambienTePuedeServir: AreaRecomendada | null;
  /** Aviso si el área con más puntos todavía no está disponible (es el motivo de la alternativa), o `null`. */
  avisoProximamente: string | null;
  /**
   * La alternativa que se muestra en pantalla: «También te puede servir» o, si no hay, la segunda área
   * recomendada cuando está disponible. `null` si no hay ninguna.
   */
  alternativa: AreaRecomendada | null;
  puntos: Puntos;
};

type AreaConEscuela = EscuelaOrientacion['areas'][number] & { escuela: string; orden: number };

const estaDisponible = (area: { estado: string }) => area.estado !== 'proximamente';

/** Suma los puntos de las respuestas. Las preguntas sin respuesta o con una opción que no existe no suman. */
export function sumarPuntos(respuestas: Record<string, string>, datos: DatosOrientacion): Puntos {
  const puntos: Puntos = { escuelas: Object.fromEntries(datos.escuelas.map((e) => [e.id, 0])), areas: {} };
  for (const pregunta of datos.preguntas) {
    const opcion = pregunta.opciones.find((o) => o.id === respuestas[pregunta.id]);
    if (!opcion) continue;
    for (const [id, valor] of Object.entries(opcion.suma.escuelas)) puntos.escuelas[id] = (puntos.escuelas[id] ?? 0) + valor;
    for (const [id, valor] of Object.entries(opcion.suma.areas)) puntos.areas[id] = (puntos.areas[id] ?? 0) + valor;
  }
  return puntos;
}

/** Ordena de más a menos puntos; si empatan, gana la que va primero en el catálogo. */
function porPuntos(areas: AreaConEscuela[], puntos: Puntos): AreaConEscuela[] {
  const de = (a: AreaConEscuela) => puntos.areas[a.id] ?? 0;
  return [...areas].sort((a, b) => de(b) - de(a) || a.orden - b.orden);
}

/** Recomienda escuela y área a partir de las respuestas de la orientación. */
export function recomendarArea(respuestas: Record<string, string>, datos: DatosOrientacion): Recomendacion {
  const puntos = sumarPuntos(respuestas, datos);
  const tienePuntos = (a: AreaConEscuela) => (puntos.areas[a.id] ?? 0) > 0;

  let orden = 0;
  const todas: AreaConEscuela[] = datos.escuelas.flatMap((e) => e.areas.map((a) => ({ ...a, escuela: e.id, orden: orden++ })));
  if (todas.length === 0) throw new Error('No hay áreas en el catálogo');

  // 2. Escuela ganadora (empate: la primera del catálogo).
  let ganadora = datos.escuelas[0];
  for (const escuela of datos.escuelas) {
    if ((puntos.escuelas[escuela.id] ?? 0) > (puntos.escuelas[ganadora.id] ?? 0)) ganadora = escuela;
  }

  // 3. Las 1-2 áreas con más puntos de esa escuela.
  const deLaGanadora = porPuntos(
    todas.filter((a) => a.escuela === ganadora.id),
    puntos,
  );
  const [primera, segunda] = deLaGanadora;
  const recomendadas = [primera, ...(segunda && tienePuntos(segunda) ? [segunda] : [])];

  // 4. Si la primera no está disponible, la alternativa disponible más cercana.
  let elegida: AreaConEscuela = primera;
  let avisoProximamente: string | null = null;
  if (!estaDisponible(primera)) {
    avisoProximamente = datos.avisoProximamente.replace('{area}', primera.nombre);
    const disponibles = todas.filter(estaDisponible);
    elegida =
      porPuntos(disponibles.filter((a) => a.escuela === ganadora.id && tienePuntos(a)), puntos)[0] ??
      porPuntos(disponibles.filter(tienePuntos), puntos)[0] ??
      disponibles.find((a) => a.escuela === ganadora.id) ??
      disponibles[0] ??
      primera;
  }

  // 5. «También te puede servir»: la mejor área disponible de otra escuela, si tiene puntos.
  const deOtraEscuela = porPuntos(
    todas.filter((a) => a.escuela !== elegida.escuela && estaDisponible(a) && tienePuntos(a)),
    puntos,
  )[0];
  const tambienTePuedeServir = deOtraEscuela ? { escuela: deOtraEscuela.escuela, area: deOtraEscuela.id } : null;

  const otraRecomendada = recomendadas.find((a) => a.id !== elegida.id && estaDisponible(a));
  const alternativa = tambienTePuedeServir ?? (otraRecomendada ? { escuela: otraRecomendada.escuela, area: otraRecomendada.id } : null);

  return {
    escuela: elegida.escuela,
    area: elegida.id,
    areasRecomendadas: recomendadas.map((a) => a.id),
    tambienTePuedeServir,
    avisoProximamente,
    alternativa,
    puntos,
  };
}

/** `true` si todas las preguntas tienen una respuesta válida. */
export function orientacionCompleta(respuestas: Record<string, string>, datos: Pick<DatosOrientacion, 'preguntas'>): boolean {
  return datos.preguntas.every((p) => p.opciones.some((o) => o.id === respuestas[p.id]));
}
