// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Configuración de Astro: sitio 100 % estático (sin servidor) y Tailwind CSS 4 como plugin de Vite.
// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  output: 'static',
  // Colores del código en las lecciones. El fondo lo pone global.css (tinta); este tema es el que da 4,5:1 o más
  // en todos sus colores sobre ese fondo, incluidos los comentarios (se mide con `npm run contraste`).
  markdown: {
    shikiConfig: { theme: 'github-dark-high-contrast' },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
