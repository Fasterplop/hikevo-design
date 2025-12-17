// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare'; // [!code ++]

export default defineConfig({
  site: 'https://hikevodesign.com', 
  integrations: [tailwind()],
  adapter: cloudflare(), // [!code ++] (Conecta el adaptador)
});