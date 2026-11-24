/**
 * Pruebas de las piezas pequeñas: nombres públicos, hoja de revisión, visibilidad, decisión de git, lenguajes y textos alternativos.
 */
import { mkdir, mkdtemp, readdir, rm, stat, utimes, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { normalizarLenguajes, aLineas, aTexto, textoAlternativo, quitarSeccionesNavegacion } from '../convertir-obsidian.mjs';
import { copiarArchivos, hojaRevisionCapturas, medirImagen, NombresPublicos, seConvierte } from '../copiar-imagenes.mjs';
import { imagenOculta, separarLecciones } from '../filtrar-sensibles.mjs';
import { decidirAccion, mismoCommit } from '../obtener-fuentes.mjs';
import { repararNombre, slugificar } from '../resolver-enlaces.mjs';

describe('NombresPublicos', () => {
  it('slug + extensión en minúsculas, sin colisiones y estable para la misma imagen', () => {
    const n = new NombresPublicos();
    expect(n.nombre('v:Bash/Bash_syntax/images/001.png')).toBe('001.png');
    expect(n.nombre('v:Bash/Text processors - AWK y SED/images/001.png')).toBe('text-processors-awk-y-sed-001.png');
    expect(n.nombre('v:Bash/Bash_syntax/images/001.png')).toBe('001.png');
    expect(n.nombre('v:Otra/images/001.PNG')).toBe('otra-001.png');
    expect(n.nombre('v:Otra/sub/images/001.png')).toBe('sub-001.png');
    expect(n.nombre('w:Otra/images/001.png')).toBe('001-2.png');
    expect(n.nombre('v:Captura Ñandú (1).PNG')).toBe('captura-nandu-1.png');
  });
});

describe('NombresPublicos con WebP', () => {
  it('PNG y JPG pasan a .webp; SVG, GIF y PDF conservan su extensión; sin choques entre .png y .jpg', () => {
    const n = new NombresPublicos({ webp: true });
    expect(n.nombre('v:A/images/021.PNG')).toBe('021.webp');
    expect(n.nombre('v:A/images/foto.jpeg')).toBe('foto.webp');
    expect(n.nombre('v:A/images/esquema.svg')).toBe('esquema.svg');
    expect(n.nombre('v:A/images/animacion.gif')).toBe('animacion.gif');
    expect(n.nombre('v:A/guia.pdf')).toBe('guia.pdf');
    expect(n.nombre('v:B/images/021.jpg')).toBe('b-021.webp'); // 021.png y 021.jpg no chocan
    expect(seConvierte('/x/021.PNG', '/y/021.webp')).toBe(true);
    expect(seConvierte('/x/esquema.svg', '/y/esquema.svg')).toBe(false);
  });
});

describe('copiarArchivos con WebP', () => {
  // sharp llega con Astro (no es dependencia propia); se carga igual que en copiar-imagenes.mjs.
  const sharp = createRequire(import.meta.url)('sharp');

  it('convierte el PNG (mismas medidas), copia el SVG, no repite trabajo y reporta lo que falla', async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), 'pista-webp-'));
    try {
      const origen = path.join(dir, 'origen');
      const destino = path.join(dir, 'publico');
      await mkdir(origen, { recursive: true });
      // Una «captura» de 640×360.
      const ruido = Buffer.from(Array.from({ length: 640 * 360 * 3 }, (_, i) => (i * 7919) % 251));
      await sharp(ruido, { raw: { width: 640, height: 360, channels: 3 } }).png().toFile(path.join(origen, 'captura.png'));
      await writeFile(path.join(origen, 'esquema.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"/>');
      await writeFile(path.join(origen, 'danada.png'), 'esto no es una imagen');
      const archivos = [
        { origen: path.join(origen, 'captura.png'), destino: path.join(destino, 'c', 'captura.webp') },
        { origen: path.join(origen, 'esquema.svg'), destino: path.join(destino, 'c', 'esquema.svg') },
        { origen: path.join(origen, 'danada.png'), destino: path.join(destino, 'c', 'danada.webp') },
      ];

      const primera = await copiarArchivos(archivos, destino);
      expect(primera).toMatchObject({ convertidos: 1, copiados: 1, sinCambios: 0 });
      expect(primera.fallidos.map((f) => path.basename(f.origen))).toEqual(['danada.png']);
      expect((await readdir(path.join(destino, 'c'))).sort()).toEqual(['captura.webp', 'esquema.svg']);
      expect(await medirImagen(path.join(destino, 'c', 'captura.webp'))).toEqual({ ancho: 640, alto: 360 });
      expect((await sharp(path.join(destino, 'c', 'captura.webp')).metadata()).format).toBe('webp');

      // Segunda vez: nada que hacer (la dañada se vuelve a intentar y vuelve a fallar).
      const segunda = await copiarArchivos(archivos, destino);
      expect(segunda).toMatchObject({ convertidos: 0, copiados: 0, sinCambios: 2 });

      // Si el original cambia (fecha más nueva), se vuelve a convertir.
      const futuro = new Date(Date.now() + 60_000);
      await utimes(path.join(origen, 'captura.png'), futuro, futuro);
      expect((await copiarArchivos(archivos, destino)).convertidos).toBe(1);
      expect((await stat(path.join(destino, 'c', 'captura.webp'))).size).toBeGreaterThan(0);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe('separarLecciones', () => {
  const leccion = (/** @type {any} */ cambios) => ({ riesgo: 'ninguno', datosPersonales: false, enPreparacion: false, ruta: 'a.md', ...cambios });
  const cursos = [
    { id: 'a', oculto: false, modulos: [{ lecciones: [leccion({}), leccion({ riesgo: 'alto' }), leccion({ datosPersonales: true }), leccion({ enPreparacion: true, ruta: null }), leccion({ riesgo: 'medio' })] }] },
    { id: 'b', oculto: true, modulos: [{ lecciones: [leccion({})] }] },
  ];

  it('con los dos interruptores encendidos deja fuera lo sensible y lo que está en preparación', () => {
    const { visibles, omitidas } = separarLecciones(cursos, { ocultarDatosPersonales: true, ocultarRiesgoAlto: true });
    expect(visibles.map((v) => v.orden)).toEqual([1, 5]);
    expect(omitidas.map((o) => o.motivo)).toEqual(['riesgo-alto', 'datos-personales', 'en-preparacion', 'curso-oculto']);
  });

  it('con los ajustes de la demo (3.9) el riesgo alto se genera y los datos personales no', () => {
    const { visibles, omitidas } = separarLecciones(cursos, { ocultarDatosPersonales: true, ocultarRiesgoAlto: false });
    expect(visibles.map((v) => v.orden)).toEqual([1, 2, 5]);
    expect(omitidas.map((o) => o.motivo)).toEqual(['datos-personales', 'en-preparacion', 'curso-oculto']);
  });

  it('con los dos interruptores apagados solo quedan fuera las lecciones en preparación y los cursos ocultos', () => {
    const { omitidas } = separarLecciones(cursos, { ocultarDatosPersonales: false, ocultarRiesgoAlto: false });
    expect(omitidas.map((o) => o.motivo)).toEqual(['en-preparacion', 'curso-oculto']);
  });
});

describe('imagenOculta', () => {
  it('compara el nombre del archivo sin carpetas ni mayúsculas, original o publicado', () => {
    const l = { imagenesOcultas: ['021.PNG'] };
    expect(imagenOculta(l, 'Burpsuite/images/021.PNG')).toBe(true);
    expect(imagenOculta({ imagenesOcultas: ['021.png'] }, 'x/021.PNG')).toBe(true);
    expect(imagenOculta({ imagenesOcultas: ['burpsuite-021.png'] }, 'x/021.PNG', 'burpsuite-021.png')).toBe(true);
    expect(imagenOculta(l, 'images/022.PNG')).toBe(false);
    expect(imagenOculta({}, 'images/021.PNG')).toBe(false);
  });
});

describe('obtener-fuentes: decidirAccion', () => {
  it('clona, deja, avisa o cambia', () => {
    expect(decidirAccion({ existe: false, commitActual: null, commitFijado: 'a3438f4', actualizar: false })).toBe('clonar');
    expect(decidirAccion({ existe: true, commitActual: 'a3438f4c0ffee', commitFijado: 'a3438f4', actualizar: false })).toBe('listo');
    expect(decidirAccion({ existe: true, commitActual: 'b000000aaaa', commitFijado: 'a3438f4', actualizar: false })).toBe('avisar');
    expect(decidirAccion({ existe: true, commitActual: 'b000000aaaa', commitFijado: 'a3438f4', actualizar: true })).toBe('cambiar');
  });

  it('mismoCommit acepta hashes abreviados de al menos 7 caracteres', () => {
    expect(mismoCommit('a3438f4', 'A3438F4abc')).toBe(true);
    expect(mismoCommit('a343', 'a3438f4abc')).toBe(false);
  });
});

describe('textos y nombres', () => {
  it('repararNombre y slugificar', () => {
    expect(repararNombre('Comandos b sicos 1-2')).toBe('Comandos básicos 1-2');
    expect(repararNombre('a   b')).toBe('a   b');
    expect(slugificar('Cloud&DevOps_Fundamentals')).toBe('cloud-y-devops-fundamentals');
  });

  it('textoAlternativo', () => {
    expect(textoAlternativo('IMG_0040.png')).toBe('Captura de los apuntes');
    expect(textoAlternativo('001.PNG')).toBe('Captura de los apuntes');
    expect(textoAlternativo('Pasted image 20240101.png')).toBe('Captura de los apuntes');
    expect(textoAlternativo('quality_gates.png')).toBe('Quality gates');
  });

  it('normalizarLenguajes', () => {
    const md = '```HTML\n<p>\n```\n\n```msf\nuse x\n```\n\n~~~\nnada\n~~~';
    expect(aTexto(normalizarLenguajes(aLineas(md)))).toBe('```html\n<p>\n```\n\n```shell\nuse x\n```\n\n~~~text\nnada\n~~~');
  });

  it('un índice con otro nombre («Temario») también se quita', () => {
    const md = '# Temario\n\n- [[#¿Que es HTML?]]\n- [[#Siguientes apuntes]]\n## ¿Que es HTML?\n\nTexto';
    expect(aTexto(quitarSeccionesNavegacion(aLineas(md)))).toBe('## ¿Que es HTML?\n\nTexto');
  });
});

describe('hojaRevisionCapturas', () => {
  it('lista los adjuntos (PDF) con un enlace y el nombre de su lección', () => {
    const pdf = { leccionId: 'linux/comandos', titulo: 'Comandos básicos', original: 'Basic commands.pdf', rutaRelativa: '../public/apuntes/linux/basic-commands.pdf' };
    const html = hojaRevisionCapturas([], [pdf]);
    expect(html).toContain('<a href="../public/apuntes/linux/basic-commands.pdf" target="_blank"><strong>Basic commands.pdf</strong></a> · Comandos básicos');
    expect(html).toContain('1 adjunto(s)');
    expect(hojaRevisionCapturas([])).not.toContain('Adjuntos (PDF');
  });
});

describe('textoAlternativo con alias', () => {
  it('usa el texto después de | si la nota lo escribe (sin corchetes, para no romper el Markdown)', () => {
    expect(textoAlternativo('images/mapa-de-canales.svg', 'Mapa de canales: en línea y en persona')).toBe('Mapa de canales: en línea y en persona');
    expect(textoAlternativo('images/x.svg', 'Texto [con] corchetes')).toBe('Texto con corchetes');
    expect(textoAlternativo('images/mapa-de-canales.svg', null)).toBe('Mapa de canales');
  });
});
