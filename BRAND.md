# Hikevo Design — Sistema de Diseño

Documento de referencia del sistema visual. Los tokens viven en `tailwind.config.mjs`; este documento registra qué significan y las decisiones de diseño que los usan. Se actualiza cuando se cierra una decisión, no antes. Decisiones de dominio: ver `CONTEXT.md`; decisiones arquitectónicas: ver `docs/adr/`.

## Tokens del sitio (estado actual)

| Token | Valor | Uso |
|---|---|---|
| `hikevo-black` | `#000000` | Texto principal, fondos de máximo contraste |
| `hikevo-charcoal` | `#1A1A1A` | Variante suave para fondos oscuros |
| `hikevo-gray-light` | `#F5F5F7` | Fondos pálidos de sección |
| `hikevo-gray` | `#9B9B9B` | Texto secundario |
| `hikevo-yellow` | `#FFB919` | Color de acción (CTA) y acentos |
| Tipografía | Inter 400/600/900, tracking `-0.025em` en headings | Única familia del sitio |
| Ancho | Container "Apple-like" ~1124px | Ver deriva conocida |
| Radios | `pill` (botones), `card` 1rem; en práctica `rounded-2xl/3xl` | Tarjetas y paneles |
| Motion | `reveal-smooth` (blur+translate+scale, `cubic-bezier(0.16,1,0.3,1)` 1s) por IntersectionObserver; `shine`; `fade-in` | Entradas de sección del sitio |
| Botones | `primary` (amarillo pill), `outline`, `text`, `ws` (WhatsApp) | `Button.astro` |

### Deriva conocida (a corregir cuando se toque esa zona)

- El template viejo de case study usa grises genéricos (`bg-gray-900`, `text-gray-300/400/500/600`) en vez de tokens `hikevo-*`.
- `Container.astro` (`max-w-7xl`) vs. config del container (1124px): dos anchos conviviendo.
- Badge de resultado del index del portafolio usa verdes ad-hoc (`green-50/700`) fuera de paleta.
- `src/components/home/ProjectsGrid.astro` es un archivo muerto (1 línea).

---

## Portafolio — sistema visual propio (ADR-0002)

La sección de portafolio (index + páginas de caso, ES/EN) tiene sistema visual propio, separado de los tokens del sitio. **Frontera:** header/footer globales intactos; la costura home→portafolio es intencional (showroom).

**Invariante único de marca:** `hikevo-yellow #FFB919` es el color de acción también dentro del portafolio — CTAs y links activos; los acentos nuevos no lo reemplazan en botones. Todo lo demás es lienzo del sistema nuevo.

**Piso de ingeniería no negociable:** contraste AA, `prefers-reduced-motion`, presupuesto de fuentes/imágenes validado contra Lighthouse antes de publicar.

### Atmósfera

- **Index: oscuro** — showroom con paredes negras/charcoal; las cards (screenshots claros) hacen el pop.
- **Página de caso: atmósfera libre por caso** — cada case study declara su tema: fondo claro u oscuro + color de acento derivado de la marca del cliente.
- **Regla del kit (obligatoria):** todo componente compartido se diseña en dos modos y consume tokens de tema (`--surface`, `--ink`, `--accent`, …) declarados por la página; nunca colores absolutos. El amarillo CTA es la excepción invariante y debe pasar contraste en ambos modos.

### Tipografía

Tres voces con roles fijos:

- **Display: Space Grotesk Variable** (elegida en la prueba visual del piloto, 2026-07-05) — titulares y números de outcomes.
- **Mono: JetBrains Mono Variable** — labels de fact bar, badges de stack, metadatos.
- **Inter** — body, sin cambios.

Presupuesto: máximo dos archivos de fuente nuevos, variables y subseteados.

### Motion

- **Gesto firma: morph card→hero** con View Transitions nativas (`transition:name` sobre la imagen de card e imagen de hero; `ClientRouter` ya activo). Sin JS nuevo.
- **Entradas secas:** translate + opacity, ~400–500ms, sin blur (el blur de `reveal-smooth` no entra al portafolio: jank móvil sobre imágenes grandes). Stagger en elementos de datos.
- **Count-up en outcomes** (añadido en el piloto): los valores numéricos puros ("+70%", "100%") cuentan de 0 al valor al entrar en viewport; los no numéricos ("EN + ES", "24/7") quedan estáticos. Sin JS o con reduced-motion, el valor final ya está renderizado.
- `prefers-reduced-motion`: sin morph (fade simple), sin stagger, sin count-up.

---

## Kit de case studies

### Artefacto: kit de secciones + receta base

No hay template rígido (ADR-0001): hay un **kit de componentes de sección** compartidos que cada página libre compone, en ambos idiomas. La **receta base** es el orden por defecto que una página sigue si no tiene razón de diseño para romperlo. La libertad es de composición y arte entre secciones; las piezas estructurales son idénticas en todos los casos.

### Criterio e inventario del kit

**Criterio:** si una pieza pinta datos del registro → componente compartido obligatorio; si es prosa o arte → lienzo libre de la página.

Inventario: `CaseTheme` (CSS vars del tema por caso), `CaseHero` (con `transition:name` para el morph y CTA derivado), `FactBar`, `OutcomeTiles` (con count-up), `SurfaceChapter` + `AnchorChips`, `BeforeAfterSlider`, `Lightbox` (modal `<dialog>` nativo: cualquier `<button data-lightbox>` con `<img>` abre la imagen ampliada — flechas, teclado, contador y cierre; muestra la variante más grande del srcset del tile), `TestimonialQuote`, `CaseCta`; en el index `CaseCard` + `FilterBar`. (`StatusBadge` se eliminó en la revisión del piloto: el estado ya no se muestra, solo gobierna el CTA.)

Reglas anti-divergencia ES/EN:

1. Ningún string visible hardcodeado en el kit: datos `{es,en}` del registro + microcopy desde `i18n/ui.ts`.
2. Una página jamás re-implementa una pieza del kit; si necesita variar, la variante entra al kit.

Libre por página: narrativa Desafío/Solución, disposición de galerías dentro de un capítulo, secciones únicas de un caso.

### Reglas de composición (revisión del piloto, 2026-07-05)

- **Sin numeraciones** ("01, 02, 03…") en kickers, capítulos ni anclas. El kicker del sistema es: línea corta de acento (`h-px w-10 bg-pf-accent`) + texto mono uppercase.
- **Las capturas se muestran completas, jamás recortadas por CSS** (revisión 2026-07-10: `h-auto w-full`, sin marcos `aspect-*` con `object-cover`). El ritmo de una grilla se logra emparejando capturas del mismo ratio en la misma fila; si los ratios difieren, la grilla usa `items-start`. Las capturas full-page ultra-altas no entran crudas a una galería: se produce un asset "solo hero" recortado en la fuente (ej. `desktop-4-hero.png`, `storefront-2-hero.png`). Excepciones con marco: `CaseCard` en el index (marco `16/10` + `object-cover object-top` — la card es un teaser uniforme; se eligen cardImages con ratio cercano a 1.6–1.8 para que el recorte sea mínimo, y la captura completa vive en el hero del caso), `BeforeAfterSlider` (el widget exige marco común para comparar) y los tiles-botón que abren el `Lightbox`: cuando las capturas de una misma grilla tienen ratios muy distintos (ej. full-pages), el tile va con marco uniforme (`3/4` u otro) porque la captura completa se ve ampliada en el modal.
- **Tipografía de outcomes:** el número siempre a escala display; las unidades-palabra ("semanas", "clic") bajan a `text-2xl/3xl` en tinta suave; símbolos cortos ("%", "s") acompañan al número a tamaño completo; valores no numéricos largos ("EN + ES") bajan un escalón. Ningún tile rompe el ritmo de la grilla.
- **Unicidad por caso:** las páginas no clonan la composición del piloto — varían disposición de galerías, momentos tipográficos y uso del acento. El kit da las piezas; la página, el carácter.

### Receta base ("la obra primero")

1. `CaseHero` — título display, badge, CTA derivado, imagen protagonista (destino del morph)
2. `FactBar` — mono: cliente · industria · servicios · año · stack · acceso
3. Narrativa (libre): Desafío → (`BeforeAfterSlider` aquí, solo redesigns) → Solución
4. Capítulos de superficie — el cuerpo de la página, la obra en grande
5. `OutcomeTiles` — números display después de ver el trabajo
6. `TestimonialQuote` — la voz humana cierra
7. `CaseCta`

Lógica de peso: el impacto recae en 1 y 4, que **todo caso tiene garantizado**. 5, 6 y el slider son amplificadores opcionales: su ausencia no deja hueco (APL publica completo sin outcomes ni testimonio).

### Estados y acceso en UI

*(Revisado en el piloto 2026-07-05: el badge visible se eliminó a pedido del dueño.)*

- **Ninguna superficie muestra badge de estado** — ni el index ni la página de caso. El status vive en el registro y **solo gobierna el CTA**:
  1. CTA solo si `live` + URL pública; `coming-soon` → dominio futuro en mono como texto, sin `<a>`; superficie privada → hecho en fact bar ("Sistema interno"), sin link.
  2. Sin penalización visual a lo no-live: el estado informa (vía CTA), no degrada.
- La card promete "ver el caso", nunca "ver en vivo".

### Superficies

Secciones apiladas como **capítulos numerados** en el flujo de scroll: label mono ("01 — Vista pública QR"), nombre, descripción corta y capturas propias. Chips de ancla bajo el hero cuando hay 3+ superficies. Móvil: el mismo stack. Superficie única (incl. privada, ej. POS) = capítulo único con su hecho de acceso. Nunca tabs ni selectores que oculten trabajo.

### Before/After (redesigns)

**Slider comparativo sobre `<input type="range">`** — teclado, touch y mouse nativos; labels "Antes/Después" siempre visibles; `alt` por lado; fallback sin JS con imágenes apiladas. Compara pares homólogos (home vs home); pares adicionales en side-by-side estático debajo. Eco deliberado del "Deslizador Antes y Después" que la agencia vende (propuesta Globo Care §2).

### Galerías: molde fijo = checklist de producción

Cada case study entrega un **set mínimo obligatorio de capturas antes de publicarse**: desktop + mobile + detalle, capturadas del software real (todo proyecto corre — incluso los `in-development` en localhost). El molde garantiza uniformidad; los placeholders y mockups genéricos **no existen en producción**. Un caso que no puede producir su set no está listo para publicarse. Material extra: libre por página dentro de los capítulos.
