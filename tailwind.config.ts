import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'royal-blue': '#001a4d',
        'deep-blue': '#001f3f',
        'maroon': '#4a0e0e',
        'dark-crimson': '#6b0e0e',
        'rose-gold': '#d4a574',
        'soft-gold': '#f4d4a8',
        'dark-bg': '#0a0e27',
        'card-dark': '#151c3a',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease-out',
        'slide-up': 'slide-up 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 165, 116, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 165, 116, 0.8)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        'elegant': ['Cormorant Garamond', 'serif'],
        'modern': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'velvet': 'linear-gradient(135deg, #4a0e0e 0%, #2a1a3a 100%)',
      },
    },
  },
  plugins: [],
}
export default config
