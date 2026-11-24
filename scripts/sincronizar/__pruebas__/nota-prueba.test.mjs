/**
 * Prueba de punta a punta (sin disco) con `nota-prueba.md`: limpieza, partición por `seccion`, imágenes,
 * enlaces, resaltado, código, adjuntos e `imagenesOcultas`.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  aTexto,
  calcularAnclas,
  convertirLeccion,
  esAnclaDeNavegacion,
  partirPorSecciones,
  prepararNota,
  quitarEncabezadoInicial,
  textoAlternativo,
} from '../convertir-obsidian.mjs';
import { imagenOculta } from '../filtrar-sensibles.mjs';
import { crearIndiceVault, esAdjunto, esImagen, resolverArchivo, resolverEnlaceNota } from '../resolver-enlaces.mjs';

const texto = readFileSync(new URL('./nota-prueba.md', import.meta.url), 'utf8');
const RUTA_NOTA = 'Curso/nota-prueba.md';
const indice = crearIndiceVault([
  RUTA_NOTA,
  'Curso/images/foto.PNG',
  'Curso/Otra/images/foto.PNG',
  'Curso/images/esquema.png',
  'Curso/images/oculta.png',
  'Curso/guia.pdf',
  'Curso/Otra/Otra nota.md',
  'Curso/Nota b sica.md',
]);

const SECCIONES = ['**Primera parte**', 'Segunda parte'];
const leccionPrimera = { slug: 'primera', imagenesOcultas: ['oculta.png'] };

/** Lecciones de destino como las arma index.mjs. */
function destinos(/** @type {Map<string, any>} */ partes) {
  return SECCIONES.map((s, i) => ({
    id: `curso/${i === 0 ? 'primera' : 'segunda'}`,
    curso: 'curso',
    url: `/cursos/curso/${i === 0 ? 'primera' : 'segunda'}`,
    anclas: calcularAnclas(quitarEncabezadoInicial(partes.get(s), s), s),
  }));
}

function convertir() {
  const nota = prepararNota(texto);
  const { partes, sinEmpatar, unidos } = partirPorSecciones(nota, SECCIONES);
  const [primera, segunda] = destinos(partes);
  const otra = { id: 'otro/detalle', curso: 'otro', url: '/cursos/otro/detalle', anclas: new Map([['detalle', 'detalle']]) };
  /** @type {any[]} */
  const textoPlano = [];
  const cuerpo = convertirLeccion(quitarEncabezadoInicial(partes.get(SECCIONES[0]), SECCIONES[0]), ({ incrustado, partes: p, num }) => {
    if (esImagen(p.destino)) {
      const r = resolverArchivo(p.destino, RUTA_NOTA, indice);
      if (!r) return '*(Imagen no disponible)*';
      if (imagenOculta(leccionPrimera, r.ruta)) return '*Imagen omitida en esta versión.*';
      return `![${textoAlternativo(r.ruta)}](/apuntes/curso/${r.ruta.split('/').pop()?.toLowerCase()})`;
    }
    if (esAdjunto(p.destino)) return `[Descargar «${p.destino}»](/apuntes/curso/${p.destino})`;
    if (!incrustado && p.destino === '' && esAnclaDeNavegacion(p.ancla)) return '';
    const r = resolverEnlaceNota({
      partes: p,
      leccionActual: primera,
      leccionesNotaActual: [primera, segunda],
      leccionesDeNota: (destino) => {
        const nota = resolverArchivo(destino, RUTA_NOTA, indice, { extensiones: ['.md'] });
        if (!nota) return { encontrada: false, lecciones: [] };
        return { encontrada: true, lecciones: nota.ruta === 'Curso/Otra/Otra nota.md' ? [otra] : [] };
      },
    });
    if (r.tipo === 'texto') textoPlano.push({ num, ...r });
    return r.tipo === 'enlace' ? `[${r.texto}](${r.url})` : r.texto;
  });
  return { md: aTexto(cuerpo), partes, sinEmpatar, unidos, textoPlano };
}

describe('nota de prueba', () => {
  const { md, partes, sinEmpatar, unidos, textoPlano } = convertir();

  it('quita frontmatter, comentarios, índice y «Siguientes apuntes»', () => {
    const todo = aTexto(prepararNota(texto));
    expect(todo).not.toContain('tags: prueba');
    expect(todo).not.toContain('comentario oculto');
    expect(todo).not.toMatch(/Índice\*\*|Siguientes apuntes/);
  });

  it('parte por seccion (también un H3) y une a la siguiente lo que no tiene lección', () => {
    expect(sinEmpatar).toEqual([]);
    expect([...partes.keys()]).toEqual(SECCIONES);
    expect(unidos).toEqual([{ encabezado: '¿Qué es esto?', num: 10, seUneA: '**Primera parte**' }]);
    expect(aTexto(partes.get('Segunda parte'))).toContain('sin lenguaje');
    expect(md).toContain('### Detalle de la primera');
    expect(md).not.toContain('sin lenguaje');
  });

  it('bloquesExtra une un bloque sin lección a otra lección (aquí, la anterior) y no a la siguiente', () => {
    const r = partirPorSecciones(prepararNota(texto), ['Segunda parte', '**Primera parte**'], { 'Segunda parte': ['¿Qué es esto?'] });
    expect(r.sinEmpatar).toEqual([]);
    expect(r.unidos).toEqual([{ encabezado: '¿Qué es esto?', num: 10, seUneA: 'Segunda parte', porBloquesExtra: true }]);
    expect(aTexto(r.partes.get('**Primera parte**'))).not.toContain('Introducción corta');
    const segunda = /** @type {any[]} */ (r.partes.get('Segunda parte'));
    expect(aTexto(segunda)).toContain('Introducción corta');
    // Respeta el orden de la nota: el bloque extra (línea 10) va antes que la Segunda parte (línea 36).
    expect(segunda.map((l) => l.num)).toEqual([...segunda.map((l) => l.num)].sort((a, b) => a - b));
  });

  it('un encabezado de bloquesExtra que no existe se reporta', () => {
    const r = partirPorSecciones(prepararNota(texto), SECCIONES, { 'Segunda parte': ['No existe'] });
    expect(r.sinEmpatar).toEqual(['No existe']);
  });

  it('una seccion que no existe se reporta', () => {
    expect(partirPorSecciones(prepararNota(texto), ['No existe']).sinEmpatar).toEqual(['No existe']);
  });

  it('resaltado a <mark>, pero no dentro de código', () => {
    expect(md).toContain('<mark>resaltado</mark>');
    expect(md).toContain('`==código==`');
    expect(md).toContain('# ==no es resaltado== ni [[enlace]]');
  });

  it('imágenes: la más cercana, extensión en minúsculas, |300 ignorado y las ocultas con su nota', () => {
    expect(md).toContain('![Foto](/apuntes/curso/foto.png)');
    expect(md).toContain('![Esquema](/apuntes/curso/esquema.png)');
    expect(md).toContain('*Imagen omitida en esta versión.*');
    expect(md).not.toContain('oculta.png');
  });

  it('enlaces: lección hermana, otra nota con ancla, nombre con U+00A0 y nota inexistente', () => {
    expect(md).toContain('[la segunda parte](/cursos/curso/segunda)');
    expect(md).toContain('[Otra nota](/cursos/otro/detalle#detalle)');
    expect(md).toContain('Nota básica');
    expect(textoPlano.map((t) => t.motivo)).toEqual(['la nota no es una lección visible', 'la nota no existe']);
    expect(md).toContain('[Descargar «guia.pdf»](/apuntes/curso/guia.pdf)');
  });

  it('lenguajes de código en minúsculas y normalizados', () => {
    expect(md).toContain('```python\n');
    expect(md).not.toContain('Python3');
  });

  it('no queda sintaxis de Obsidian fuera del código', () => {
    const fuera = md.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
    expect(fuera).not.toMatch(/\[\[|==/);
  });
});
