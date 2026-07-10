# Páginas .astro libres por case study + registro central de hechos

Al migrar los case studies fuera de los arrays hardcodeados de `[slug].astro`, se decidió NO usar Astro Content Collections (la vía idiomática) sino: una página `.astro` independiente por case study y por idioma (`src/pages/portafolio/<slug>.astro`, `src/pages/en/portfolio/<slug>.astro`) con libertad total de layout, más un registro central tipado `src/data/case-studies.ts` (`CaseStudy[]`) como única fuente de verdad de los hechos estructurados: slug, cliente, categoría, status, URLs, stack, outcomes y SEO.

Razón: el portafolio de una agencia de diseño es en sí la pieza de venta — cada case study debe poder tener arte y estructura propios, cosa que un template compartido con schema de colección restringe. El costo aceptado: la prosa ES/EN se duplica por página (a cambio de libertad editorial por idioma) y la disciplina del schema recae en el tipo `CaseStudy` del registro, no en validación de contenido.

El index, los filtros, los badges de estado y el sitemap se derivan exclusivamente del registro; las páginas importan su entrada por slug para la barra de hechos, el CTA y el SEO. Regla: ningún hecho estructurado se hardcodea en una página — si un dato aparece en el index y en el detalle, vive en el registro.

## Considered Options

- **Content Collections (md/mdx + schema Zod, template compartido)** — rechazada: enforcement gratis y menos duplicación, pero encorseta el diseño por caso, que aquí es el producto.
- **Exports de metadata en cada página + `import.meta.glob`** — rechazada: reparte el schema en N archivos y duplica también los hechos en el par ES/EN.
