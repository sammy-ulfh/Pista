#!/usr/bin/env node
/**
 * `npm run contraste`: mide el contraste (WCAG 2.x) de los colores del sitio. Mínimo para texto: 4,5:1.
 *
 * Lee los tokens de `src/styles/global.css` (no los copia) y revisa:
 *   1. las combinaciones de texto y fondo que usan los componentes (lista COMBINACIONES, abajo);
 *   2. los colores que pone Shiki en los bloques de código, sobre el fondo `tinta` (se leen de `dist/`;
 *      corre antes `npm run build`).
 * Termina con código 1 si alguna combinación queda por debajo de 4,5:1.
 * Si cambias un color en global.css, vuelve a correrlo (CONSTRUCCION.md, sección 9).
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MINIMO = 4.5;

const css = readFileSync(path.join(RAIZ, 'src/styles/global.css'), 'utf8');
/** @type {Record<string, string>} */
const tokens = Object.fromEntries([...css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));

/** @param {string} hex */
function luminancia(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
/** @param {string} a @param {string} b */
export function contraste(a, b) {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const ESCUELAS = ['tecnologia', 'negocios', 'comunicacion', 'habilidades', 'diseno'];
/** [texto, fondo, dónde se usa] */
const COMBINACIONES = [
  ...['papel', 'blanco', 'relleno', 'suave'].flatMap((fondo) => [
    ['tinta', fondo, 'texto principal'],
    ['texto-2', fondo, 'metadatos'],
  ]),
  ['texto-3', 'blanco', 'bloqueado / próximamente'],
  ['texto-3', 'papel', 'insignias y semanas atenuadas'],
  ['blanco', 'tinta', 'botón principal, día de estudio'],
  ['papel', 'tinta', 'texto de bloques de código'],
  ...ESCUELAS.flatMap((e) => [
    ['blanco', e, `píldora y portada de ${e}`],
    [e, 'blanco', `texto de ${e} sobre tarjeta`],
    [e, 'papel', `texto de ${e} sobre el fondo`],
  ]),
];

let fallas = 0;
const fila = (/** @type {string} */ nombre, /** @type {number} */ r, /** @type {string} */ uso) => {
  const ok = r >= MINIMO;
  if (!ok) fallas++;
  console.log(`  ${ok ? '✓' : '✗'} ${r.toFixed(2).padStart(5)}:1  ${nombre.padEnd(30)} ${uso}`);
};

console.log(`Contraste de los tokens (mínimo ${MINIMO}:1)`);
for (const [texto, fondo, uso] of COMBINACIONES) {
  if (!tokens[texto] || !tokens[fondo]) throw new Error(`Falta el token --color-${tokens[texto] ? fondo : texto} en global.css`);
  fila(`${texto} sobre ${fondo}`, contraste(tokens[texto], tokens[fondo]), uso);
}

// Colores de Shiki en los bloques de código de dist/.
const DIST = path.join(RAIZ, 'dist/cursos');
if (existsSync(DIST)) {
  const colores = new Map();
  for (const e of readdirSync(DIST, { recursive: true, withFileTypes: true })) {
    if (e.name !== 'index.html') continue;
    const html = readFileSync(path.join(e.parentPath, e.name), 'utf8');
    for (const m of html.matchAll(/<span style="color:(#[0-9A-Fa-f]{6})/g)) colores.set(m[1].toLowerCase(), (colores.get(m[1].toLowerCase()) ?? 0) + 1);
  }
  console.log(`\nColores del código (Shiki) sobre tinta — ${colores.size} colores`);
  for (const [color, veces] of [...colores].sort((a, b) => contraste(a[0], tokens.tinta) - contraste(b[0], tokens.tinta))) {
    fila(color, contraste(color, tokens.tinta), `${veces} fragmentos`);
  }
} else {
  console.log('\n(Sin dist/: corre `npm run build` para medir también los colores del código.)');
}

console.log(fallas ? `\n✗ ${fallas} combinaciones por debajo de ${MINIMO}:1` : '\n✓ Todo el texto cumple 4,5:1');
process.exitCode = fallas ? 1 : 0;
