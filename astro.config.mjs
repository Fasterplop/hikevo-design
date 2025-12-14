import { defineConfig } from 'astro/config';
// Importamos la integración oficial de Astro (la que tienes instalada en package.json)
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Usamos la integración aquí, NO en vite.plugins
  site: 'https://hikevodesign.com', 
  integrations: [tailwind()],
});