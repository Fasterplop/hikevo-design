# Hikevo Design — Portafolio

Sitio bilingüe (ES/EN) de la agencia Hikevo Design. Este contexto cubre el lenguaje del portafolio: los case studies que muestran el trabajo hecho para clientes.

## Language

**Case Study**:
La historia de UN engagement contratado (≈ una propuesta con objetivos y resultados propios). Un mismo cliente puede tener varios case studies (ej. Ganesha Stores: e-commerce y POS son engagements distintos). Criterio: un sistema nuevo con superficies propias genera un case study nuevo; una propuesta nueva sobre un sistema ya publicado (ej. programa de fidelidad sobre el e-commerce de Ganesha) extiende el case study existente, no crea otro. Si solo es otra interfaz del mismo sistema, es una superficie.
_Avoid_: Project, Proyecto (como nombre de la entidad — ambiguo entre engagement, cliente y producto)

**Category** (Categoría):
La cara principal del entregable de un case study; es única y parte el portafolio en filtros: `web` (sitio o tienda que navega el público, aunque tenga admin detrás — ej. APL, Ganesha e-commerce), `system` (plataforma operativa con login — ej. POS, Lucky Pet Tag) y `social` (gestión de redes). Alineada con los planes de soluciones: `system` es la vitrina del plan "A Medida".
_Avoid_: Tipo de proyecto, servicio (el servicio es lo que se vendió; la categoría es lo que se filtra)

**Stack**:
Lista plana y curada de tecnologías e integraciones visibles al cliente que hicieron posible el case study (ej. Astro, Stripe, DoorDash). Se elige por impacto comercial, no por exhaustividad técnica. Opcional: los case studies de social media no llevan.
_Avoid_: Tecnologías (a secas), herramientas

**Outcome** (Resultado destacado):
Un hecho destacable del case study presentado como dato: valor + etiqueta + contexto opcional (ej. "+70% / Ventas online", "3 semanas / De propuesta a lanzamiento"). Puede ser métrica de negocio o hecho de capacidad/entrega, pero siempre honesto y con forma de dato; los logros cualitativos ("comunidad fiel") van en la narrativa o el testimonio, no aquí. Opcional: un case study no lanzado no tiene outcomes y no muestra la sección.
_Avoid_: Métricas (promete precisión que no siempre hay), results, KPIs

**Redesign** (Case Study de Rediseño):
Tipo aparte de case study donde el artefacto ya existía y se rediseñó — mismo sitio/dominio, nueva versión (ej. fortitudeins.us). Lleva evidencia del antes (capturas) y comparativa antes/después. Criterio de frontera: si lo previo era OTRO producto que no resolvía el problema (ej. Valery vs. el POS de Ganesha), NO es redesign — es un case study estándar y el sistema previo pertenece a la narrativa del Desafío.
_Avoid_: Transformación, reemplazo (un reemplazo desde cero no es rediseño)

**Status** (Estado):
El punto del ciclo de vida de un case study, no su infraestructura: `live` (en producción), `coming-soon` (construido, dominio decidido pero aún no resuelve — ej. APL Dynamics → flyapldynamics.com), `in-development` (funcional solo en entorno de desarrollo). Controla el badge. La navegabilidad NO es parte del status: un sistema puede ser live y privado (ej. POS de Ganesha).
_Avoid_: local-only (describe dónde corre, no en qué punto está), deployed

**Access** (Acceso):
Propiedad de cada URL de un case study, independiente del status: `public` (cualquiera puede navegarla → puede ser CTA) o `private` (detrás de login — ej. pos.ganeshastores.com, admin.luckypetag.com → nunca se enlaza; se menciona como hecho).
_Avoid_: Visibilidad, interno

**Surface** (Superficie):
Una interfaz/área de un mismo sistema entregado dentro de un case study, con audiencia propia (ej. Lucky Pet Tag: vista pública QR, portal del dueño, panel admin). Cada superficie puede tener URL propia con su propio Access, y los CTAs del portafolio nombran la superficie que abren ("Ver storefront", "Ver perfil de Instagram") — nunca un genérico que mienta. Una superficie nunca tiene resultados propios; los outcomes pertenecen al case study.
_Avoid_: Vista, producto, módulo
