/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Tokens extraídos de "Logo Hikevo - Presentacion original.pdf" y "UI_UX Direction.docx"
				hikevo: {
					black: '#000000',
					charcoal: '#1A1A1A', // Variante suave para fondos oscuros
					gray: {
						light: '#F5F5F7', // "Gris pálido" para fondos
						medium: '#9B9B9B', // Texto secundario
						DEFAULT: '#9B9B9B',
					},
					yellow: '#FFB919', // "Amarillo CTA"
				},
				// Sistema visual del portafolio (BRAND.md / ADR-0002).
				// Los pf-* son CSS vars: cada página de caso los declara vía <CaseTheme>
				// para que el kit funcione en modo claro y oscuro sin colores absolutos.
				pf: {
					surface: 'var(--pf-surface)',
					'surface-2': 'var(--pf-surface-2)',
					ink: 'var(--pf-ink)',
					'ink-soft': 'var(--pf-ink-soft)',
					accent: 'var(--pf-accent)',
					line: 'var(--pf-line)',
				},
				status: {
					live: '#10B981',
					soon: '#F59E0B',
					dev: '#9B9B9B',
				},
			},
			fontFamily: {
				// "Sans Serif Grotesk moderna (Inter)"
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
				// Voces del portafolio (BRAND.md): display para titulares, mono para datos
				display: ['"Space Grotesk Variable"', ...defaultTheme.fontFamily.sans],
				mono: ['"JetBrains Mono Variable"', ...defaultTheme.fontFamily.mono],
			},
			borderRadius: {
				'pill': '9999px', // Para botones "rounded-full"
				'card': '1rem',   // "rounded-2xl" (16px)
			},
			container: {
				center: true,
				padding: '1.5rem',
				screens: {
					lg: '1124px',
					xl: '1124px', // Limitamos el ancho para mantener el estilo "Apple-like" contenido
					'2xl': '1124px',
				},
			},
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
		},
	},
	plugins: [],
}