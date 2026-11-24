/**
 * Colecciones de contenido de Astro: conectan los archivos de `datos/` con el sitio.
 *
 * Los esquemas no se escriben aquí: viven en `src/lib/compartido/esquemas.js`, porque también los usa
 * `scripts/validar-datos.mjs`. Para agregar un campo a un archivo de datos, edita ese archivo de esquemas.
 *
 * `lecciones` no sale de `datos/`: la genera `npm run sincronizar` en `contenido-generado/` (ignorado por git).
 *
 * Las páginas no leen estas colecciones directamente: usan `src/lib/catalogo.ts`, que aplica la regla de
 * visibilidad (lecciones y cursos ocultos).
 */
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import {
  esquemaCurso,
  esquemaDiagnostico,
  esquemaEscuela,
  esquemaFrontmatterLeccion,
  esquemaOrientacion,
  esquemaPerfil,
} from './lib/compartido/esquemas.js';

/** `datos/escuelas.json`: una entrada por escuela, con sus áreas. */
const escuelas = defineCollection({
  loader: file('datos/escuelas.json'),
  schema: esquemaEscuela,
});

/** `datos/cursos/<curso>.json`: ficha, módulos y lecciones de cada curso. */
const cursos = defineCollection({
  loader: glob({ pattern: '*.json', base: './datos/cursos' }),
  schema: esquemaCurso,
});

/** `datos/orientacion.json`: una sola entrada (`orientacion`) con las preguntas y sus puntos. */
const orientacion = defineCollection({
  loader: file('datos/orientacion.json', { parser: (texto) => ({ orientacion: JSON.parse(texto) }) }),
  schema: esquemaOrientacion,
});

/** `datos/diagnosticos/<area>.json`: el diagnóstico de cada área (el id de la entrada es el del área). */
const diagnosticos = defineCollection({
  loader: glob({ pattern: '*.json', base: './datos/diagnosticos' }),
  schema: esquemaDiagnostico,
});

/** `datos/perfiles-demo.json`: perfiles de la presentación y su resultado esperado. */
const perfiles = defineCollection({
  loader: file('datos/perfiles-demo.json'),
  schema: esquemaPerfil,
});

/**
 * `contenido-generado/<curso>/<leccion>.md`: las lecciones ya convertidas por `npm run sincronizar`.
 * El id de cada entrada es `curso/leccion`, igual que en `datos/cursos/`. Solo existen las lecciones visibles:
 * la sincronización no genera las ocultas. Los archivos que empiezan con `_` (reportes) no son lecciones.
 */
const lecciones = defineCollection({
  loader: glob({ pattern: '*/[!_]*.md', base: './contenido-generado' }),
  schema: esquemaFrontmatterLeccion,
});

export const collections = { escuelas, cursos, orientacion, diagnosticos, perfiles, lecciones };
