/**
 * Casos reales tomados de `analisis/problemas.csv` (archivo y línea en cada prueba).
 * Los archivos de cada vault se escriben aquí a mano (solo los que importan para el caso), así las pruebas no
 * necesitan `fuentes/` clonado.
 */
import { describe, expect, it } from 'vitest';
import { crearIndiceVault, idEncabezado, resolverArchivo, separarEnlace, claveEncabezado } from '../resolver-enlaces.mjs';
import { buscarEncabezados, aLineas } from '../convertir-obsidian.mjs';

const NBSP = ' ';

/** Resuelve un `![[…]]` o `[[…]]` como lo hace la sincronización. */
function resolver(/** @type {string} */ enlace, /** @type {string} */ nota, /** @type {string[]} */ archivos, extensiones = /** @type {string[]} */ ([])) {
  const partes = separarEnlace(enlace);
  return resolverArchivo(partes.destino, nota, crearIndiceVault(archivos), { extensiones });
}

// Vault Cloud&DevOps_Fundamentals
const CLOUD = [
  'Bash/Bash_syntax/Bash options.md',
  'Bash/Bash_syntax/images/001.png',
  'Bash/Text processors - AWK y SED/images/001.png',
  'Bash/Bash_syntax/Functions.md',
  'Python/Python Language Syntax/Functions.md',
  'Python/Python Language Syntax/Sets.md',
];

// Vault Hacking_introduction
const HACKING = [
  'Conceptos básicos/TIPS de subnetting y cálculo veloz de direccionamiento en redes.md',
  'Conceptos básicos/Direcciones IP (IPv4 e IPv6).md',
  'Conceptos básicos/Direcciones MAC (OUI y NIC).md',
  ...[
    'Conceptos básicos', 'Docker/MaquinasVulnerbales', 'Docker/Construccion', 'Conceptos básicos de enumeración y explotación/Shells',
    'Conceptos básicos de enumeración y explotación/Burpsuite', 'Conceptos básicos de enumeración y explotación/Tipos de explotación',
    'Reconocimiento/Fuzzing', 'EnumServComunes/Gestores de contenido (CMS)/Wordpress/1-2',
  ].map((c) => `${c}/images/017.png`),
  'Conceptos básicos de enumeración y explotación/Burpsuite/images/034.png',
  'Conceptos básicos de enumeración y explotación/Tipos de explotación/images/034.png',
  'Conceptos básicos de enumeración y explotación/Tipos de explotación/images/001.PNG',
  'EnumServComunes/Gestores de contenido (CMS)/Wordpress/1-2/images/034.png',
  'EnumServComunes/Gestores de contenido (CMS)/Wordpress/1-2/Enumeración de gestores de contenido (CMS) – WordPress (1-2).md',
  'Reconocimiento/ScriptsNmap/images/025.PNG',
  'Reconocimiento/EscaneoDescriptores/Alternativas para la enumeración de puertos usando descriptores de archivo.md',
];

// Vault Linux_Introduction (nombres con U+00A0 en lugar de «á»)
const LINUX = [
  `Introduction/Creando una m${NBSP}quina virtual.md`,
  'Introduction/Sistemas operativos para pentesting.md',
  'Introduction/System_installation.md',
  'Introduction/images/6.PNG',
  'Temario/images/6.PNG',
  `Temario/Comandos b${NBSP}sicos 1-2.md`,
  `Temario/Comandos b${NBSP}sicos 2-2.md`,
];

describe('imágenes ambiguas: gana la más cercana a la nota', () => {
  it('1. Bash options.md:22 — ![[001.png]] (2 candidatos)', () => {
    const r = resolver('001.png', 'Bash/Bash_syntax/Bash options.md', CLOUD);
    expect(r?.ruta).toBe('Bash/Bash_syntax/images/001.png');
    expect(r?.candidatos).toHaveLength(2);
  });

  it('2. TIPS de subnetting…md:41 — ![[017.png]] (8 candidatos)', () => {
    const r = resolver('017.png', 'Conceptos básicos/TIPS de subnetting y cálculo veloz de direccionamiento en redes.md', HACKING);
    expect(r?.ruta).toBe('Conceptos básicos/images/017.png');
    expect(r?.candidatos).toHaveLength(8);
  });

  it('3. WordPress (1-2).md:370 — ![[034.png]] (3 candidatos)', () => {
    const nota = 'EnumServComunes/Gestores de contenido (CMS)/Wordpress/1-2/Enumeración de gestores de contenido (CMS) – WordPress (1-2).md';
    expect(resolver('034.png', nota, HACKING)?.ruta).toBe('EnumServComunes/Gestores de contenido (CMS)/Wordpress/1-2/images/034.png');
  });

  it('4. Creando una m\\u00A0quina virtual.md:8 — ![[6.PNG]] desde una nota con U+00A0 en el nombre', () => {
    const r = resolver('6.PNG', `Introduction/Creando una m${NBSP}quina virtual.md`, LINUX);
    expect(r?.ruta).toBe('Introduction/images/6.PNG');
    expect(r?.candidatos).toHaveLength(2);
  });
});

describe('nombres con U+00A0 (codificación rota)', () => {
  it('5. System_installation.md:58 — [[Comandos básicos 1-2]] encuentra «Comandos b\\u00A0sicos 1-2.md»', () => {
    const r = resolver('Comandos básicos 1-2', 'Introduction/System_installation.md', LINUX, ['.md']);
    expect(r?.ruta).toBe(`Temario/Comandos b${NBSP}sicos 1-2.md`);
  });

  it('6. Sistemas operativos para pentesting.md:44 — [[Creando una máquina virtual]]', () => {
    const r = resolver('Creando una máquina virtual', 'Introduction/Sistemas operativos para pentesting.md', LINUX, ['.md']);
    expect(r?.ruta).toBe(`Introduction/Creando una m${NBSP}quina virtual.md`);
  });
});

describe('extensión .PNG', () => {
  it('7. Alternativas para la enumeración…md:26 — ![[025.PNG]] se busca con el nombre exacto', () => {
    const nota = 'Reconocimiento/EscaneoDescriptores/Alternativas para la enumeración de puertos usando descriptores de archivo.md';
    expect(resolver('025.PNG', nota, HACKING)?.ruta).toBe('Reconocimiento/ScriptsNmap/images/025.PNG');
    // Si el enlace la escribe en minúsculas, también se encuentra (sin distinguir mayúsculas).
    expect(resolver('025.png', nota, HACKING)?.ruta).toBe('Reconocimiento/ScriptsNmap/images/025.PNG');
  });

  it('8. Tipos de explotación…md:27 — ruta desde la raíz del vault y .PNG', () => {
    const r = resolver(
      'Conceptos básicos de enumeración y explotación/Tipos de explotación/images/001.PNG',
      'Conceptos básicos de enumeración y explotación/Tipos de explotación/Tipos de explotación (Manuales y Automatizadas).md',
      HACKING,
    );
    expect(r).toMatchObject({ ruta: 'Conceptos básicos de enumeración y explotación/Tipos de explotación/images/001.PNG', como: 'ruta-vault' });
  });
});

describe('tamaño, alias y encabezados', () => {
  it('9. |300 y |alias: Sets.md:56 — [[Python/Python Language Syntax/Functions|Functions]] elige la de Python, no la de Bash', () => {
    expect(separarEnlace('foto.png|300')).toEqual({ destino: 'foto.png', ancla: null, alias: null, tamano: '300' });
    const partes = separarEnlace('Python/Python Language Syntax/Functions|Functions');
    expect(partes.alias).toBe('Functions');
    const r = resolverArchivo(partes.destino, 'Python/Python Language Syntax/Sets.md', crearIndiceVault(CLOUD), { extensiones: ['.md'] });
    expect(r?.ruta).toBe('Python/Python Language Syntax/Functions.md');
  });

  it('10. Direcciones MAC (OUI y NIC).md:4 — [[Direcciones IP (IPv4 e IPv6)#Índice]] y anclas de la misma nota', () => {
    const partes = separarEnlace('Direcciones IP (IPv4 e IPv6)#Índice');
    expect(partes).toMatchObject({ destino: 'Direcciones IP (IPv4 e IPv6)', ancla: 'Índice' });
    expect(resolver('Direcciones IP (IPv4 e IPv6)', 'Conceptos básicos/Direcciones MAC (OUI y NIC).md', HACKING, ['.md'])?.ruta).toBe(
      'Conceptos básicos/Direcciones IP (IPv4 e IPv6).md',
    );
    // Additional Materials.md:4 — [[#Additional Materials]] coincide con «# Additional Materials».
    const encabezados = buscarEncabezados(aLineas('# Index\n\n- [[#Additional Materials]]\n\n# Additional Materials\n'));
    expect(encabezados.some((e) => claveEncabezado(e.texto) === claveEncabezado('Additional Materials'))).toBe(true);
    // Nmap…md:7 — [[#Introduccion]] no coincide con ningún encabezado de esa nota (ancla rota → texto plano).
    expect(claveEncabezado('Introduccion')).not.toBe(claveEncabezado('Introducción a Nmap'));
  });
});

describe('ids de encabezado iguales a los de Astro (github-slugger)', () => {
  it('quita negritas, acentos se conservan y signos se quitan', () => {
    expect(idEncabezado('**Listas**')).toBe('listas');
    expect(idEncabezado('¿Que es *Picom*?')).toBe('que-es-picom');
    expect(idEncabezado('Diferencias entre Python2, Python3, PIP2 y PIP3')).toBe('diferencias-entre-python2-python3-pip2-y-pip3');
    expect(idEncabezado('Instalación de *Batcat* y *Lsd*')).toBe('instalación-de-batcat-y-lsd');
  });
});
