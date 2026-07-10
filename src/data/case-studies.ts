// Registro central de case studies (ADR-0001).
// Única fuente de verdad de los hechos estructurados: el index, los filtros,
// los badges, el SEO y las fact bars se derivan de aquí. Ningún hecho
// estructurado se hardcodea en una página. La prosa (desafío/solución/testimonio)
// y el arte viven en cada página .astro por caso.
// Vocabulario: CONTEXT.md. Patrones de UI: BRAND.md.

import type { ImageMetadata } from 'astro';

// --- Imágenes de card (index + morph hacia el hero) ---
import paulinaCard from '../assets/images/projects/paulinalopezescritora/paulinalopezescritora.com.png';
import ganeshaCard from '../assets/images/projects/ganeshastores/ganeshastores.com.png';
import mangoCard from '../assets/images/projects/mistermango/mistermango-desktop.png';
import anisCard from '../assets/images/projects/anis-barbara/anisbarbara-desktop.png';
import globoCard from '../assets/images/projects/globo-care-remodeling/fresh-home.png';
// Hero de Fortitude: la captura "solo hero" (desktop-6), no la full-page.
import fortitudeCard from '../assets/images/projects/fortitude-insurance/desktop-6.png';
import luckyCard from '../assets/images/projects/lucky-pet-tag/owner-portal.png';
import posCard from '../assets/images/projects/ganesha-pos/dashboard-1.png';
import aplCard from '../assets/images/projects/apl-dynamics/storefront-1.png';

// --- Evidencia del "antes" (redesigns) ---
import ftBeforeHome from '../assets/images/projects/fortitude-insurance/before-home.png';
import ftBeforeService from '../assets/images/projects/fortitude-insurance/before-customer-service.png';
import ftBeforeQuotes from '../assets/images/projects/fortitude-insurance/before-compare-quotes.png';
import ftBeforeContact from '../assets/images/projects/fortitude-insurance/before-contact.png';
import ftAfterHome from '../assets/images/projects/fortitude-insurance/desktop-1.png';

export type Lang = 'es' | 'en';
export type Locale = { es: string; en: string };

export interface Outcome {
  value: string; // siempre con forma de dato: "+70%", "3 semanas", "24/7"
  label: Locale;
  detail?: Locale;
}

export interface Surface {
  name: Locale; // el CTA hereda este nombre — nunca un genérico que mienta
  url?: string;
  access: 'public' | 'private';
}

export type CaseStatus = 'live' | 'coming-soon' | 'in-development';
export type CaseCategory = 'web' | 'system' | 'social';

export interface CaseTheme {
  mode: 'light' | 'dark';
  accent: string; // color de la marca del cliente; nunca sustituye al amarillo CTA
}

interface CaseStudyBase {
  slug: string; // idéntico en ambos locales
  title: string;
  client: string;
  year: string;
  category: CaseCategory;
  status: CaseStatus;
  industry: Locale;
  services: Locale;
  description: Locale; // card + meta description
  stack?: string[];
  outcomes?: Outcome[]; // 0–3; sin outcomes la sección no se renderiza
  websiteUrl?: string; // SIEMPRE una URL pública navegable (regla dura)
  surfaces?: Surface[]; // multi-superficie o superficies privadas
  ctaLabel?: Locale; // default: t('pf.cta.default')
  cardImage: ImageMetadata;
  theme: CaseTheme;
}

export type CaseStudy =
  | (CaseStudyBase & { type: 'standard' })
  | (CaseStudyBase & {
      type: 'redesign';
      before: { summary: Locale; screenshots: ImageMetadata[] };
      /** Par homólogo para el BeforeAfterSlider (misma página antes/después). */
      comparison: { before: ImageMetadata; after: ImageMetadata };
    });

// Orden del array = orden de aparición en el index del portafolio.
export const caseStudies: CaseStudy[] = [
  {
    type: 'standard',
    slug: 'apl-dynamics',
    title: 'APL Dynamics',
    client: 'APL Dynamics', // TODO(usuario): confirmar nombre de contacto y año
    year: '2026',
    category: 'web',
    status: 'live',
    industry: {
      es: 'Hardware para simuladores de vuelo',
      en: 'Flight-sim hardware',
    },
    services: {
      es: 'E-commerce A Medida con Panel de Administración',
      en: 'Custom E-commerce with Admin Panel',
    },
    description: {
      es: 'Tienda en línea a medida de hardware estructural para simuladores de vuelo: catálogo, checkout sin cuenta, flete en tiempo real y panel de administración.',
      en: 'Custom online store for flight-sim structural hardware: catalog, guest checkout, real-time freight and a full admin panel.',
    },
    stack: ['Stripe', 'Estes Express API'], // TODO(usuario): confirmar framework (¿repo GitHub?)
    websiteUrl: 'https://flyapldynamics.com',
    ctaLabel: { es: 'Ver la tienda en vivo', en: 'View the live store' },
    surfaces: [
      {
        name: { es: 'Storefront', en: 'Storefront' },
        url: 'https://flyapldynamics.com',
        access: 'public',
      },
      {
        name: { es: 'Panel de administración', en: 'Admin panel' },
        access: 'private',
      },
    ],
    cardImage: aplCard,
    theme: { mode: 'dark', accent: '#5B8DEF' },
  },
  {
    type: 'standard',
    slug: 'lucky-pet-tag',
    title: 'Lucky Pet Tag',
    client: 'Lucky Pet Tag',
    year: '2025',
    category: 'system',
    status: 'live',
    industry: { es: 'Mascotas / E-commerce', en: 'Pets / E-commerce' },
    services: {
      es: 'Aplicación Web A Medida integrada a Shopify',
      en: 'Custom Web Application integrated with Shopify',
    },
    description: {
      es: 'Ecosistema web que convierte cada compra en un perfil QR de mascota: vista pública al escanear, portal del dueño y panel administrativo.',
      en: 'Web ecosystem that turns every purchase into a pet QR profile: public scan view, owner portal and admin dashboard.',
    },
    stack: ['Next.js', 'Supabase', 'Shopify', 'Cloudflare'],
    outcomes: [
      {
        value: '100%',
        label: { es: 'Perfiles automáticos', en: 'Automated profiles' },
        detail: {
          es: 'cada compra genera su perfil sin intervención manual',
          en: 'every purchase generates its profile with no manual work',
        },
      },
      {
        value: '3',
        label: { es: 'Superficies del ecosistema', en: 'Ecosystem surfaces' },
        detail: {
          es: 'vista pública QR, portal del dueño y panel admin',
          en: 'public QR view, owner portal and admin dashboard',
        },
      },
      {
        value: '4 semanas',
        label: { es: 'De propuesta a producción', en: 'From proposal to production' },
      },
    ],
    // TODO(usuario): crear perfil demo para enlazar la vista pública QR
    surfaces: [
      { name: { es: 'Vista pública QR', en: 'Public QR view' }, access: 'public' },
      { name: { es: 'Portal del dueño', en: 'Owner portal' }, access: 'private' },
      { name: { es: 'Panel administrativo', en: 'Admin dashboard' }, access: 'private' },
    ],
    cardImage: luckyCard,
    theme: { mode: 'light', accent: '#14B8A6' },
  },
  {
    type: 'redesign',
    slug: 'fortitude-insurance',
    title: 'Fortitude Insurance',
    client: 'Fortitude Insurance Services LLC',
    year: '2026',
    category: 'web',
    status: 'live',
    industry: { es: 'Seguros', en: 'Insurance' },
    services: {
      es: 'Rediseño Web + Plataforma de Autoservicio',
      en: 'Web Redesign + Self-Service Platform',
    },
    description: {
      es: 'Rediseño integral de la plataforma de seguros: bilingüe espejo, cotización en línea y autoservicio de documentos y reclamos.',
      en: 'Full redesign of the insurance platform: mirrored bilingual experience, online quoting and self-service for documents and claims.',
    },
    stack: ['Astro', 'Tailwind CSS', 'Cloudflare', 'Resend'],
    outcomes: [
      {
        value: 'EN + ES',
        label: { es: 'Experiencia bilingüe espejo', en: 'Mirrored bilingual experience' },
      },
      {
        value: '24/7',
        label: { es: 'Cotización y autoservicio', en: 'Quoting & self-service' },
        detail: {
          es: 'cotizador y centro de cuentas integrados al sitio',
          en: 'quoting system and account center built into the site',
        },
      },
      {
        value: '100%',
        label: { es: 'Accesible para todos', en: 'Accessible to everyone' },
        detail: {
          es: 'dos idiomas, modo claro y oscuro',
          en: 'two languages, light & dark modes',
        },
      },
    ],
    websiteUrl: 'https://fortitudeins.us',
    before: {
      summary: {
        es: 'El sitio anterior era un conjunto de páginas .html estáticas de plantilla: sin español, sin cotización en línea y sin acceso a documentos — cada gestión dependía de una llamada a la agencia.',
        en: 'The previous site was a set of static template .html pages: no Spanish, no online quoting and no document access — every task required calling the agency.',
      },
      screenshots: [ftBeforeHome, ftBeforeService, ftBeforeQuotes, ftBeforeContact],
    },
    comparison: { before: ftBeforeHome, after: ftAfterHome },
    cardImage: fortitudeCard,
    theme: { mode: 'light', accent: '#2563EB' },
  },
  {
    type: 'standard',
    slug: 'ganesha-pos',
    title: 'Ganesha POS',
    client: 'Gerardo G.',
    year: '2026',
    category: 'system',
    status: 'live',
    industry: { es: 'Retail / Juguetes y Ropa', en: 'Retail / Toys & Clothing' },
    services: {
      es: 'Sistema POS e Inventario Web A Medida',
      en: 'Custom Web POS & Inventory System',
    },
    description: {
      es: 'Punto de venta e inventario web a medida que reemplazó al software legacy de la tienda: roles, etiquetas térmicas y dashboard del negocio.',
      en: "Custom web point-of-sale and inventory that replaced the store's legacy software: roles, thermal labels and a business dashboard.",
    },
    stack: ['Next.js', 'PostgreSQL', 'Supabase'],
    outcomes: [
      {
        value: '-80%',
        label: { es: 'Tiempo por venta', en: 'Time per sale' },
        detail: {
          es: 'cobrar pasó de minutos a segundos',
          en: 'checkout went from minutes to seconds',
        },
      },
      {
        value: '100%',
        label: { es: 'Visibilidad del negocio', en: 'Business visibility' },
        detail: {
          es: 'ventas, caja e inventario en un solo panel',
          en: 'sales, cash and inventory in one dashboard',
        },
      },
      {
        value: '1 clic',
        label: { es: 'Etiquetas de descuento', en: 'Discount labels' },
        detail: { es: 'impresión térmica integrada', en: 'integrated thermal printing' },
      },
    ],
    surfaces: [{ name: { es: 'Panel POS', en: 'POS dashboard' }, access: 'private' }],
    cardImage: posCard,
    theme: { mode: 'dark', accent: '#818CF8' },
  },
  {
    type: 'standard',
    slug: 'ganesha-stores',
    title: 'Ganesha Stores',
    client: 'Gerardo G.',
    year: '2025',
    category: 'web',
    status: 'live',
    industry: { es: 'E-commerce / Retail', en: 'E-commerce / Retail' },
    services: {
      es: 'Desarrollo Web A Medida + Social Media + Ads',
      en: 'Custom Web Dev + Social Media + Ads',
    },
    description: {
      es: 'E-commerce a medida con catálogo digital 24/7, base de datos estructurada y programa de puntos y recompensas.',
      en: 'Custom e-commerce with a 24/7 digital catalog, structured database and a points & rewards program.',
    },
    outcomes: [
      { value: '+70%', label: { es: 'Ventas online', en: 'Online sales' } },
      { value: '+5000', label: { es: 'Visitas al catálogo', en: 'Catalog visits' } },
      { value: '100%', label: { es: 'Clientes felices', en: 'Happy customers' } },
    ],
    websiteUrl: 'https://ganeshastores.com',
    cardImage: ganeshaCard,
    theme: { mode: 'light', accent: '#F43F5E' },
  },
  {
    type: 'standard',
    slug: 'globo-care-remodeling',
    title: 'Globo Care Remodeling',
    client: 'Globo Care Remodeling',
    year: '2026',
    category: 'web',
    status: 'live',
    industry: { es: 'Remodelación / Construcción', en: 'Remodeling / Construction' },
    services: {
      es: 'Desarrollo Web + SEO Local',
      en: 'Web Development + Local SEO',
    },
    description: {
      es: 'Sitio bilingüe de remodelación en Sarasota: galería filtrable, deslizador antes/después y formulario que califica al cliente.',
      en: 'Bilingual remodeling website for Sarasota: filterable gallery, before/after slider and a lead-qualifying contact form.',
    },
    outcomes: [
      {
        value: '<1s',
        label: { es: 'Carga instantánea', en: 'Instant loading' },
        detail: {
          es: 'tecnología de última generación',
          en: 'state-of-the-art technology',
        },
      },
      {
        value: '100%',
        label: { es: 'Bilingüe nativo', en: 'Natively bilingual' },
        detail: {
          es: 'todo el mercado de Sarasota, EN y ES',
          en: 'the whole Sarasota market, EN & ES',
        },
      },
      {
        value: '3 semanas',
        label: { es: 'De propuesta a lanzamiento', en: 'From proposal to launch' },
      },
    ],
    websiteUrl: 'https://globocareremodeling.net',
    cardImage: globoCard,
    theme: { mode: 'light', accent: '#F08A00' },
  },
  {
    type: 'standard',
    slug: 'paulina-lopez-escritora',
    title: 'Paulina López',
    client: 'Paulina L.',
    year: '2025',
    category: 'web',
    status: 'live',
    industry: { es: 'Escritora / Autora', en: 'Writer / Author' },
    services: {
      es: 'Desarrollo Web A Medida + Social Media + Ads',
      en: 'Custom Web Dev + Social Media + Ads',
    },
    description: {
      es: 'Desarrollo web a medida con sistema de marketing y base de datos: un hub profesional que convierte seguidores en suscriptores.',
      en: 'Custom web development with a marketing system and database: a professional hub that turns followers into subscribers.',
    },
    outcomes: [
      { value: '+1000', label: { es: 'Suscriptores al newsletter', en: 'Newsletter subscribers' } },
      { value: '5.0', label: { es: 'Calificación en Amazon', en: 'Amazon rating' } },
    ],
    websiteUrl: 'https://paulinalopezescritora.com',
    cardImage: paulinaCard,
    theme: { mode: 'light', accent: '#8B5CF6' },
  },
  {
    type: 'standard',
    slug: 'mister-mango',
    title: 'Mister Mango',
    client: 'Mateo L.',
    year: '2024',
    category: 'social',
    status: 'live',
    industry: { es: 'Comida y alimentos', en: 'Food & Beverage' },
    services: { es: 'Presencia Orgánica', en: 'Organic Presence' },
    description: {
      es: 'Creación de contenido y gestión de redes sociales: del antojo en el feed al pedido directo por DoorDash.',
      en: 'Content creation and social media management: from feed cravings to direct DoorDash orders.',
    },
    outcomes: [
      { value: '+100', label: { es: 'Pedidos por DoorDash', en: 'DoorDash orders' } },
      { value: '+1000', label: { es: 'Seguidores', en: 'Followers' } },
    ],
    websiteUrl: 'https://instagram.com/mistermango1',
    ctaLabel: { es: 'Ver perfil de Instagram', en: 'View Instagram profile' },
    cardImage: mangoCard,
    theme: { mode: 'light', accent: '#F97316' },
  },
  {
    type: 'standard',
    slug: 'anis-barbara',
    title: 'Anis Barbara',
    client: 'Barbara S.',
    year: '2025',
    category: 'social',
    status: 'live',
    industry: { es: 'Bebidas Alcohólicas', en: 'Alcoholic Beverages' },
    services: { es: 'Presencia Orgánica', en: 'Organic Presence' },
    description: {
      es: 'Creación de contenido y gestión de redes: un feed que actúa como catálogo, vitrina y canal de venta por DM.',
      en: 'Content creation and social media management: a feed that works as catalog, showcase and DM sales channel.',
    },
    websiteUrl: 'https://instagram.com/anisbarbara_',
    ctaLabel: { es: 'Ver perfil de Instagram', en: 'View Instagram profile' },
    cardImage: anisCard,
    theme: { mode: 'dark', accent: '#F87171' },
  },
];

export function getCaseStudy(slug: string): CaseStudy {
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) throw new Error(`Case study no registrado: ${slug}`);
  return cs;
}

/** Primera superficie pública con URL — de aquí se deriva el CTA (BRAND.md). */
export function getPublicUrl(cs: CaseStudy): string | undefined {
  const fromSurface = cs.surfaces?.find((s) => s.access === 'public' && s.url)?.url;
  return fromSurface ?? cs.websiteUrl;
}
