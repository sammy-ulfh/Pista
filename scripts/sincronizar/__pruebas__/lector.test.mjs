/**
 * Ajustes de la sincronización para el lector (parte 3.7): título repetido, ejercicios e imágenes con medidas.
 * La nota real se copia aquí (no hace falta `fuentes/`); la de muestra se lee de `apuntes-demo/`.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  aLineas,
  aTexto,
  bajarEncabezados,
  calcularAnclas,
  htmlImagen,
  partirPorSecciones,
  prepararNota,
  quitarEncabezadoInicial,
  quitarH1Inicial,
  separarEjercicios,
  separarImagenesSolas,
} from '../convertir-obsidian.mjs';
import { medirImagen } from '../copiar-imagenes.mjs';
import { claveEncabezado } from '../resolver-enlaces.mjs';

// Inicio real de `fuentes/Notes/Cloud&DevOps_Fundamentals/Linux/Linux_Introduction/Unix-Based OS's.md`
// (lección `administracion-linux/sistemas-tipo-unix`, sin `seccion`).
const NOTA_REAL = `
# Index

- [[#Introduction to Unix-Based Operating Systems]]
- [[#Linux]]
- [[#Kernel]]
- [[#Next Notes]]

# Introduction to Unix-Based Operating Systems

- 1969-1970 - The Unix operating system was implemented and released by Ken Thompson and Dennis Ritchie.
- 1977 - Berkeley Software Distribution (BSD) released another free operating system project contianed Unix code.

## Linux

Texto de Linux.
`;

const RAIZ = fileURLToPath(new URL('../../../', import.meta.url));
const NOTA_MUESTRA = readFileSync(`${RAIZ}apuntes-demo/negocios/tus-primeros-clientes/01-cliente-ideal.md`, 'utf8');

describe('título repetido: se quita el H1 inicial', () => {
  it('nota real: quita «# Introduction to…» (tras quitar el índice) y conserva lo demás', () => {
    const { lineas, titulo } = quitarH1Inicial(prepararNota(NOTA_REAL));
    expect(titulo).toBe('Introduction to Unix-Based Operating Systems');
    const md = aTexto(lineas);
    expect(md).not.toMatch(/^\s*# /m);
    expect(md).toContain('1969-1970');
    expect(md).toContain('## Linux');
  });

  it('nota de muestra: quita «# ¿Quién es tu cliente ideal?» y el texto empieza con el primer párrafo', () => {
    const { lineas, titulo } = quitarH1Inicial(prepararNota(NOTA_MUESTRA));
    expect(titulo).toBe('¿Quién es tu cliente ideal?');
    expect(aTexto(lineas).trim()).toMatch(/^Cuando empiezas a ofrecer algo/);
  });

  it('ignora espacios y líneas vacías previas, y el «#» de cierre', () => {
    const { lineas, titulo } = quitarH1Inicial(aLineas('\n\n   # Título #\nTexto'));
    expect(titulo).toBe('Título');
    expect(aTexto(lineas).trim()).toBe('Texto');
  });

  it('no toca un H2 inicial, un H1 que no está al principio ni un «#» dentro de código', () => {
    for (const texto of ['## Sección\nTexto', 'Texto\n# Título', '```bash\n# comentario\n```']) {
      const { lineas, titulo } = quitarH1Inicial(aLineas(texto));
      expect(titulo).toBeNull();
      expect(aTexto(lineas)).toBe(texto);
    }
  });

  it('si después del H1 viene un bloque unido con bloquesExtra, ese bloque se conserva', () => {
    const nota = prepararNota('# Curso de prueba\nIntroducción del curso.\n\n## Parte 1\nUno.\n\n## Parte 2\nDos.\n');
    const { partes } = partirPorSecciones(nota, ['Parte 1', 'Parte 2'], { 'Parte 2': ['Curso de prueba'] });
    const parte2 = quitarEncabezadoInicial(/** @type {any} */ (partes.get('Parte 2')), 'Parte 2');
    const { lineas, titulo } = quitarH1Inicial(parte2);
    expect(titulo).toBe('Curso de prueba');
    const md = aTexto(lineas);
    expect(md).not.toContain('# Curso de prueba');
    expect(md).toContain('Introducción del curso.');
    expect(md).toContain('Dos.');
  });

  it('un encabezado inicial de otro nivel igual al título de la lección también se quita (html-desde-cero)', () => {
    const lineas = quitarEncabezadoInicial(aLineas('\n## ¿Que es HTML?\nTexto\n## Otra'), '¿Qué es HTML?');
    expect(aTexto(lineas).trim()).toBe('Texto\n## Otra');
  });

  it('un enlace al H1 quitado lleva a la lección, sin ancla', () => {
    const { lineas, titulo } = quitarH1Inicial(prepararNota(NOTA_REAL));
    const anclas = calcularAnclas(lineas, null, titulo);
    expect(anclas.get(claveEncabezado('Introduction to Unix-Based Operating Systems'))).toBeNull();
    expect(anclas.get(claveEncabezado('Linux'))).toBe('linux');
  });
});

describe('ejercicios', () => {
  it('la línea «Ejercicio:» de la nota de muestra sale del cuerpo y queda en la lista', () => {
    const { lineas, ejercicios } = separarEjercicios(prepararNota(NOTA_MUESTRA));
    expect(ejercicios).toHaveLength(1);
    expect(ejercicios[0]).toMatch(/^Completa la frase «Ayudo a ___/);
    expect(aTexto(lineas)).not.toContain('Ejercicio:');
  });

  it('no toma «Ejercicio:» dentro de código ni con sangría', () => {
    const texto = '```\nEjercicio: no\n```\n  Ejercicio: tampoco';
    const { lineas, ejercicios } = separarEjercicios(aLineas(texto));
    expect(ejercicios).toEqual([]);
    expect(aTexto(lineas)).toBe(texto);
  });
});

describe('imágenes', () => {
  it('htmlImagen: medidas, lazy salvo la primera, decoding async y atributos escapados', () => {
    expect(htmlImagen({ url: '/apuntes/c/a.png', alt: 'Dice "hola" & <adiós>', ancho: 800, alto: 600 })).toBe(
      '<img src="/apuntes/c/a.png" alt="Dice &quot;hola&quot; &amp; &lt;adiós&gt;" width="800" height="600" loading="lazy" decoding="async">',
    );
    expect(htmlImagen({ url: '/a.png', alt: '', ancho: 10, alto: 5, primera: true })).toBe(
      '<img src="/a.png" alt="" width="10" height="5" decoding="async">',
    );
    expect(htmlImagen({ url: '/a.png', alt: 'x' })).not.toContain('width');
  });

  it('una imagen sola en su línea se separa del texto que va pegado debajo (si no, saldría sin formato)', () => {
    const img = '<img src="/a.png" alt="" decoding="async">';
    const texto = [img, '## Título', 'Texto', img, img, '**negritas**', '```html', img, 'código', '```'].join('\n');
    expect(aTexto(separarImagenesSolas(aLineas(texto)))).toBe(
      [img, '', '## Título', 'Texto', img, img, '', '**negritas**', '```html', img, 'código', '```'].join('\n'),
    );
  });

  it('medirImagen lee el ancho y el alto de un SVG de muestra', async () => {
    const ruta = `${RAIZ}apuntes-demo/negocios/tus-primeros-clientes/images/persona-problema-solucion.svg`;
    expect(await medirImagen(ruta)).toEqual({ ancho: 900, alto: 506 });
    expect(await medirImagen(`${RAIZ}no-existe.png`)).toBeNull();
  });
});

describe('un solo h1 por página', () => {
  it('si quedan «# …» en el cuerpo, todos los encabezados bajan un nivel (no dentro de código)', () => {
    const texto = 'Intro\n# Práctica\n## Paso 1\n###### Detalle\n```bash\n# comentario\n```';
    const { lineas, bajados } = bajarEncabezados(aLineas(texto));
    expect(bajados).toBe(true);
    expect(aTexto(lineas)).toBe('Intro\n## Práctica\n### Paso 1\n###### Detalle\n```bash\n# comentario\n```');
  });

  it('sin H1 en el cuerpo no cambia nada', () => {
    const texto = '## Uno\n### Dos';
    expect(bajarEncabezados(aLineas(texto))).toEqual({ lineas: aLineas(texto), bajados: false });
  });
});
