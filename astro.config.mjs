import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hikevodesign.com',
  output: 'static',
  // Configuración de i18n
  i18n: {
    defaultLocale: "es", // Idioma principal
    locales: ["es", "en"], // Idiomas soportados
    routing: {
        // false: 'es' carga en /, 'en' carga en /en
        // true: 'es' carga en /es, 'en' carga en /en
        prefixDefaultLocale: false 
    }
  },
  integrations: [tailwind(), sitemap()],
  adapter: cloudflare(),
});