# Sistema visual propio para la sección de portafolio

Al rediseñar los case studies (2026-07-05) se decidió que la sección de portafolio completa — index + páginas de caso, ES y EN — tenga un sistema visual propio (tipografía display, paleta extendida, lenguaje de composición), en lugar de consolidar sobre los tokens `hikevo-*` del resto del sitio. El header y el footer globales no cambian; la costura visual queda en home→portafolio, donde se lee como intención de showroom.

Razón: el portafolio es la pieza de venta de una agencia de diseño y el "wow" es requisito explícito; se aceptó el costo de mantener dos sistemas en un sitio. Alternativa rechazada: consolidar la deriva y extender mínimamente los tokens actuales (recomendación técnica por coherencia de marca y por proteger el Lighthouse 100/100 del commit `0731645`) — el dueño priorizó impacto visual.

Consecuencia a vigilar: cualquier token nuevo del portafolio vive separado y documentado en `BRAND.md`; el presupuesto de performance (fuentes, imágenes) debe revalidarse contra Lighthouse antes de publicar.
