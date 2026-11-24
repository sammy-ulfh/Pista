/**
 * Esquemas (Zod) de todos los archivos de `datos/`.
 *
 * Los usan dos lugares, sin copiarlos:
 *   - `src/content.config.ts`, para que Astro valide las colecciones al generar el sitio;
 *   - `scripts/validar-datos.mjs` (`npm run validar`), que además revisa las referencias entre archivos.
 *
 * Todos son estrictos: un campo que no esté aquí (por ejemplo, un `precio` en un curso) es un error.
 * Si agregas un campo a un archivo de datos, decláralo aquí primero.
 *
 * JavaScript con JSDoc (no TypeScript) para que Node lo importe sin compilar.
 */
import { z } from 'astro/zod';

/** Identificador en minúsculas con guiones: `tus-primeros-clientes`. */
export const esquemaId = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Usa minúsculas, números y guiones (ej. «mi-curso»)');

/** Id de lección o módulo: `curso/slug`. */
export const esquemaIdCompuesto = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*\/[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Usa la forma «curso/slug»');

const texto = z.string().min(1);

/** Estado de una escuela, un área o un curso. */
export const ESTADOS = /** @type {const} */ (['disponible', 'muestra', 'proximamente']);

/**
 * Colores de escuela permitidos en el campo `color` de `escuelas.json`. Cada uno es un token `--color-<color>` de
 * `src/styles/global.css` (`npm run validar` comprueba que exista). Para un color nuevo: agrega el token y su nombre aquí.
 */
export const COLORES_ESCUELA = /** @type {const} */ (['tecnologia', 'negocios', 'comunicacion', 'habilidades', 'diseno']);

export const NIVELES = /** @type {const} */ (['basico', 'intermedio', 'avanzado']);
export const IDIOMAS = /** @type {const} */ (['es', 'en']);
export const RIESGOS = /** @type {const} */ (['ninguno', 'medio', 'alto']);

// ── ajustes.json ────────────────────────────────────────────────────────────

export const esquemaPlan = z.strictObject({
  nombre: texto,
  precio: z.number().positive(),
  moneda: z.string().length(3),
  periodo: texto,
  incluye: z.array(texto).min(1),
});

/**
 * Textos de la tarjeta del plan, del diálogo «Confirmar suscripción» (`components/catalogo/`) y de la vista previa
 * en el lector (`components/lector/InvitacionSuscripcion.astro`).
 * `incluyeEnDialogo` lleva `{curso}`, que se cambia por el título del curso.
 */
export const esquemaTextosSuscripcion = z.strictObject({
  incluidoEnCurso: texto,
  incluidoEnRuta: texto,
  acceso: texto,
  botonSuscribirme: texto,
  notaVistaPrevia: texto,
  /** Lector: píldora de la lección gratis, y lo que ve quien abre otra lección sin plan (`{curso}` → título). */
  etiquetaVistaPrevia: texto,
  tituloLeccionBloqueada: texto,
  textoLeccionBloqueada: texto.includes('{curso}', { message: 'Debe incluir «{curso}»' }),
  enlaceVistaPrevia: texto,
  tituloDialogo: texto,
  incluyeEnDialogo: texto.includes('{curso}', { message: 'Debe incluir «{curso}»' }),
  avisoDemo: texto,
  botonCancelar: texto,
  botonConfirmar: texto,
  planActivo: texto,
  botonEmpezar: texto,
  sinLecciones: texto,
  avisoActivado: texto,
  avisoReinicio: texto,
});

export const esquemaAjustes = z.strictObject({
  plan: esquemaPlan,
  suscripcion: esquemaTextosSuscripcion,
  /** Oculta las lecciones con `datosPersonales: true` (regla en `compartido/visibilidad.js`). */
  ocultarDatosPersonales: z.boolean(),
  /** Oculta las lecciones con `riesgo: "alto"`. Con `false` se publican con `textoAvisoEticoAlto`. */
  ocultarRiesgoAlto: z.boolean(),
  mostrarEtiquetaIdioma: z.boolean(),
  textoFuncionNoDisponible: texto,
  /** Nota de uso ético para cursos con `avisoEtico` y lecciones de riesgo medio. */
  textoAvisoEtico: texto,
  /** Aviso más fuerte para las lecciones de riesgo alto (y la ficha de los cursos que las tienen). */
  textoAvisoEticoAlto: texto,
  ritmo: z.strictObject({
    horasSemanaPorDefecto: z.number().positive(),
    descripcion: texto,
    combinarRespuestas: texto,
  }),
});

// ── fuentes.json ────────────────────────────────────────────────────────────

export const esquemaFuente = z.strictObject({
  id: esquemaId,
  repositorio: z.url().nullable(),
  commit: z.string().regex(/^[0-9a-f]{7,40}$/).optional(),
  carpeta: texto,
  escuela: esquemaId.nullable(),
});

export const esquemaFuentes = z.array(esquemaFuente).min(1);

// ── escuelas.json ───────────────────────────────────────────────────────────

/** Una etapa del roadmap de un área. */
export const esquemaEtapa = z.strictObject({
  id: esquemaId,
  nombre: texto,
  /** Cursos de la etapa, en orden. */
  cursos: z.array(esquemaId).min(1),
  /** Lo que la persona sabrá hacer al terminar la etapa, en lenguaje sencillo. */
  alTerminar: texto,
  /** Se practica solo en un laboratorio propio (lleva la píldora «Solo en laboratorio»). */
  soloLaboratorio: z.boolean(),
});

export const esquemaArea = z.strictObject({
  id: esquemaId,
  nombre: texto,
  descripcion: texto,
  estado: z.enum(ESTADOS),
  /** Todos los cursos que se muestran en la página del área. */
  cursos: z.array(esquemaId).min(1),
  /** Orden base de la ruta del área (antes de aplicar el diagnóstico). */
  ruta: z.array(esquemaId).min(1),
  /** Texto de la tarjeta «¿Por qué este orden?» en «Tu ruta». Sin él, se arma uno con los nombres de los cursos. */
  porQueEsteOrden: texto.optional(),
  /**
   * Roadmap por etapas (parte 3.9, CONSTRUCCION.md sección 13). Si el área lo tiene, «Mi ruta» muestra las etapas
   * en vez de la lista de semanas. `ruta` debe ser los cursos de las etapas, en el mismo orden (`npm run validar`).
   */
  etapas: z.array(esquemaEtapa).min(1).optional(),
});

export const esquemaEscuela = z.strictObject({
  id: esquemaId,
  nombre: texto,
  descripcion: texto,
  estado: z.enum(ESTADOS),
  color: z.enum(COLORES_ESCUELA),
  areas: z.array(esquemaArea).min(1),
});

// ── cursos/<curso>.json ─────────────────────────────────────────────────────

export const esquemaLeccion = z.strictObject({
  id: esquemaIdCompuesto,
  slug: esquemaId,
  titulo: texto,
  /** Id de `fuentes.json`. */
  fuente: esquemaId,
  /** Ruta de la nota dentro de la carpeta de su fuente. `null` solo si la lección está en preparación. */
  ruta: texto.nullable(),
  /** Encabezado donde empieza la lección, para notas largas partidas en varias lecciones. */
  seccion: texto.nullable(),
  /**
   * Encabezados de bloques sin lección propia que se agregan a ESTA lección (necesita `seccion`). Sin esto, un
   * bloque así se une a la lección siguiente; con esto se puede unir a la anterior o a cualquier otra de la misma
   * nota (por ejemplo, la continuación de un tema). Se escribe el encabezado tal como está en la nota.
   */
  bloquesExtra: z.array(texto).min(1).optional(),
  /** Solo informativo: duración y ritmo de la ruta. */
  minutos: z.number().nonnegative(),
  idioma: z.enum(IDIOMAS),
  riesgo: z.enum(RIESGOS),
  datosPersonales: z.boolean(),
  enPreparacion: z.boolean(),
  /**
   * Imágenes que no se publican aunque la lección sí (por ejemplo, una captura con datos reales). Se escribe el
   * nombre del archivo tal como aparece en `contenido-generado/_revision-capturas.html` (`021.PNG`). La
   * sincronización no la copia y deja en su lugar «Imagen omitida en esta versión».
   */
  imagenesOcultas: z.array(texto).optional(),
});

export const esquemaModulo = z.strictObject({
  id: esquemaIdCompuesto,
  titulo: texto,
  lecciones: z.array(esquemaLeccion).min(1),
});

export const esquemaCurso = z.strictObject({
  id: esquemaId,
  estado: z.enum(ESTADOS),
  oculto: z.boolean(),
  titulo: texto,
  subtitulo: texto,
  escuela: esquemaId,
  areas: z.array(esquemaId).min(1),
  nivel: z.enum(NIVELES),
  prerrequisitos: z.array(esquemaId),
  aprenderas: z.array(texto),
  idiomas: z.array(z.enum(IDIOMAS)).min(1),
  /** Muestra el aviso de uso ético en la ficha del curso. */
  avisoEtico: z.boolean(),
  /** Duración estimada de un curso «próximamente» (no tiene lecciones). `null` en los demás. */
  minutosEstimados: z.number().positive().nullable(),
  /**
   * Cuánto tiempo de práctica se suma a la lectura en la ruta: la duración en la ruta es `minutos × factorPractica`.
   * Por defecto 1 (solo lectura). La ficha del curso sigue mostrando solo el tiempo de lectura.
   */
  factorPractica: z.number().min(1).max(5).optional(),
  modulos: z.array(esquemaModulo),
});

// ── contenido-generado/<curso>/<leccion>.md ────────────────────────────────

/**
 * Frontmatter de cada lección generada por `npm run sincronizar` (colección `lecciones`).
 * Lo escribe `scripts/sincronizar/index.mjs` a partir de `datos/cursos/`; no se edita a mano.
 */
export const esquemaFrontmatterLeccion = z.strictObject({
  /** Id del curso. */
  curso: esquemaId,
  /** Id del módulo (`curso/modulo`). */
  modulo: esquemaIdCompuesto,
  /** Slug de la lección (el id completo es `curso/leccion`). */
  leccion: esquemaId,
  titulo: texto,
  /** Posición dentro del curso, desde 1 (cuenta también las lecciones ocultas). */
  orden: z.number().int().positive(),
  minutos: z.number().nonnegative(),
  idioma: z.enum(IDIOMAS),
  riesgo: z.enum(RIESGOS),
  /** Id de `fuentes.json`. */
  fuente: esquemaId,
  /** Cuántas imágenes muestra la lección (metadatos del lector: «14 imágenes»). */
  imagenes: z.number().int().nonnegative(),
  /** Texto de cada línea `Ejercicio:` de la nota (el lector las muestra en una caja, al final). */
  ejercicios: z.array(texto),
});

// ── orientacion.json y diagnosticos/<area>.json ─────────────────────────────

const esquemaPuntos = z.strictObject({
  escuelas: z.record(esquemaId, z.number()),
  areas: z.record(esquemaId, z.number()),
});

export const esquemaOrientacion = z.strictObject({
  regla: texto,
  notaAlFinal: texto,
  /** Aviso cuando el área recomendada está en «próximamente». `{area}` se cambia por su nombre. */
  avisoProximamente: texto.includes('{area}', { message: 'Debe incluir «{area}»' }),
  preguntas: z
    .array(
      z.strictObject({
        id: esquemaId,
        texto: texto,
        opciones: z.array(z.strictObject({ id: esquemaId, texto: texto, suma: esquemaPuntos })).min(2),
      }),
    )
    .min(1),
  /** Casos extra que deben cumplir las pruebas de `lib/orientacion.ts` (además de los perfiles de demo). */
  casosDePrueba: z.array(
    z.strictObject({
      nombre: texto,
      respuestas: z.record(esquemaId, esquemaId),
      esperado: z.strictObject({
        escuela: esquemaId,
        area: esquemaId,
        areasRecomendadas: z.array(esquemaId).min(1),
        tambienTePuedeServir: z.strictObject({ escuela: esquemaId, area: esquemaId }).nullable(),
        avisoProximamente: texto.nullable(),
      }),
    }),
  ),
});

/** Efectos de una respuesta del diagnóstico. Solo se escriben los que aplican. */
export const esquemaEfectos = z.strictObject({
  cursoInicio: esquemaId.optional(),
  omitirLecciones: z.array(esquemaIdCompuesto).optional(),
  omitirModulos: z.array(esquemaIdCompuesto).optional(),
  omitirCursos: z.array(esquemaId).optional(),
  agregarCursos: z.array(esquemaId).optional(),
  horasSemana: z.number().positive().optional(),
  /** Solo en áreas con `etapas`: estas etapas pasan a ser opcionales. */
  etapasOpcionales: z.array(esquemaId).optional(),
  /** Solo en áreas con `etapas`: estas etapas se adelantan en cuanto se cumplan sus prerrequisitos. */
  etapasPrimero: z.array(esquemaId).optional(),
});

export const esquemaDiagnostico = z.strictObject({
  area: esquemaId,
  notaAlFinal: texto,
  preguntas: z
    .array(
      z.strictObject({
        id: esquemaId,
        texto: texto,
        opciones: z
          .array(
            z.strictObject({
              id: esquemaId,
              texto: texto,
              /**
               * Motivo corto que «Tu ruta» muestra junto a lo que esta respuesta omite: «Omitido: ya le vendes a
               * conocidos». Sin él se muestra «Omitido: respondiste "<texto>"».
               */
              motivo: texto.optional(),
              efectos: esquemaEfectos,
            }),
          )
          .min(2),
      }),
    )
    .min(1),
});

// ── perfiles-demo.json ──────────────────────────────────────────────────────

export const esquemaResultadoRuta = z.strictObject({
  horasSemana: z.number().positive(),
  /** Cursos de la ruta, en orden. */
  cursos: z.array(esquemaId).min(1),
  /** Cursos de la ruta base que no entran, y la pregunta que los quitó. */
  cursosOmitidos: z.array(z.strictObject({ curso: esquemaId, motivo: z.enum(['cursoInicio', 'diagnostico']), pregunta: esquemaId })),
  /** Lecciones que el diagnóstico quitó (incluye las de módulos omitidos), y la pregunta que las quitó. */
  leccionesOmitidas: z.array(z.strictObject({ leccion: esquemaIdCompuesto, pregunta: esquemaId })),
  /** Semana a semana. Un curso «próximamente» aparece como `curso:<id>`. */
  semanas: z
    .array(
      z.strictObject({
        numero: z.number().int().positive(),
        lecciones: z.array(z.string().min(1)).min(1),
        minutos: z.number().nonnegative(),
      }),
    )
    .min(1),
  totalSemanas: z.number().int().positive(),
  minutosTotal: z.number().nonnegative(),
});

/** Resumen del roadmap esperado de un perfil (`lib/roadmap.ts` → `resumenRoadmap`). */
export const esquemaResultadoRoadmap = z.strictObject({
  /** Etapas en el orden en que se recorren. */
  etapas: z
    .array(
      z.strictObject({
        id: esquemaId,
        cursos: z.array(esquemaId),
        /** Primera y última semana de la etapa (`null` si el diagnóstico le quitó todo). */
        semanas: z.tuple([z.number().int().positive(), z.number().int().positive()]).nullable(),
        opcional: z.boolean(),
      }),
    )
    .min(1),
  /** Las preguntas cuyas respuestas aparecen en «Lo que ajustamos por tus respuestas», con su texto. */
  ajustes: z.array(z.strictObject({ pregunta: esquemaId, texto: texto })),
  totalSemanas: z.number().int().positive(),
  /** Semanas sin contar las etapas opcionales. */
  semanasObligatorias: z.number().int().nonnegative(),
});

export const esquemaPerfil = z.strictObject({
  id: esquemaId,
  nombre: texto,
  carrera: texto,
  objetivo: texto,
  esTecnologia: z.boolean(),
  respuestasOrientacion: z.record(esquemaId, esquemaId),
  orientacionEsperada: z.strictObject({
    escuela: esquemaId,
    area: esquemaId,
    areasRecomendadas: z.array(esquemaId).min(1),
    tambienTePuedeServir: z.strictObject({ escuela: esquemaId, area: esquemaId }).nullable(),
    avisoProximamente: texto.nullable(),
    puntos: esquemaPuntos,
  }),
  /** Área cuyo diagnóstico responde el perfil. */
  area: esquemaId,
  respuestasDiagnostico: z.record(esquemaId, esquemaId),
  resultadoEsperado: esquemaResultadoRuta,
  /** Solo en áreas con `etapas`: el roadmap que debe obtener (las pruebas de `lib/roadmap.ts` lo comprueban). */
  roadmapEsperado: esquemaResultadoRoadmap.optional(),
});
