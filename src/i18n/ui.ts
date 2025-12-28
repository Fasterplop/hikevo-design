export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

export const ui = {
  es: {
    'nav.solutions': 'Soluciones',
    'nav.portfolio': 'Portafolio',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.home': 'Inicio',
    'btn.talk': 'Hablemos',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.desc': 'Tu departamento digital, externo y sin complicaciones.',
    'footer.legal': 'Legal',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos y Condiciones',
  },
  en: {
    'nav.solutions': 'Solutions',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.home': 'Home',
    'btn.talk': "Let's Talk",
    'footer.rights': 'All rights reserved.',
    'footer.desc': 'Your digital department, external and hassle-free.',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
  },
} as const;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}