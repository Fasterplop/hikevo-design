// SEO por case study y por idioma, derivado del registro (ADR-0001):
// title, meta description, OG image (1200×630 desde cardImage) y breadcrumb JSON-LD.
// Las páginas lo consumen y pasan el resultado a MainLayout — nunca hardcodean SEO.

import { getImage } from 'astro:assets';
import type { CaseStudy, Lang } from './case-studies';

const SITE = 'https://hikevodesign.com';

const portfolioPath: Record<Lang, string> = {
  es: '/portafolio',
  en: '/en/portfolio',
};

const portfolioName: Record<Lang, string> = {
  es: 'Portafolio',
  en: 'Portfolio',
};

export function caseUrl(cs: Pick<CaseStudy, 'slug'>, lang: Lang): string {
  return `${portfolioPath[lang]}/${cs.slug}`;
}

export interface CaseSeo {
  title: string;
  description: string;
  /** Ruta local de la OG image optimizada; MainLayout la vuelve absoluta. */
  image: string;
  /** JSON-LD BreadcrumbList listo para <script type="application/ld+json">. */
  breadcrumbSchema: string;
}

export async function buildCaseSeo(cs: CaseStudy, lang: Lang): Promise<CaseSeo> {
  const og = await getImage({
    src: cs.cardImage,
    width: 1200,
    height: 630,
    fit: 'cover',
    format: 'jpeg',
  });

  const suffix = lang === 'es' ? 'Caso de Estudio Hikevo' : 'Hikevo Case Study';

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      {
        '@type': 'ListItem',
        position: 2,
        name: portfolioName[lang],
        item: `${SITE}${portfolioPath[lang]}`,
      },
      { '@type': 'ListItem', position: 3, name: cs.title },
    ],
  });

  return {
    title: `${cs.title} | ${suffix}`,
    description: cs.description[lang],
    image: og.src,
    breadcrumbSchema,
  };
}
