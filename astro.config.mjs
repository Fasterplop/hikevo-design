// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare'; // [!code ++]

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hikevodesign.com', 
  integrations: [tailwind(), sitemap()],
  adapter: cloudflare(), // [!code ++] (Conecta el adaptador)
});