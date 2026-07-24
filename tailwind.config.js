/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: { 300: '#E8C87A', 400: '#D4AF37', 500: '#B8962E', 600: '#9A7B1A' },
        obsidian: { 50: '#F5F5F7', 100: '#E8E8ED', 800: '#1C1C1E', 900: '#0A0A0B', 950: '#050506' },
        crimson: { 400: '#E53935', 500: '#C62828', 600: '#B71C1C' },
        ivory: '#FFF8E7',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-anton)', 'Impact', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra': '0.4em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #E8C87A 50%, #B8962E 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0A0A0B 0%, #1C1C1E 50%, #0A0A0B 100%)',
        'shoe-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212,175,55,0.3) 0%, transparent 60%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotateY(0deg)' },
          '50%': { transform: 'translateY(-20px) rotateY(5deg)' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212,175,55,0.3)' },
          '100%': { boxShadow: '0 0 60px rgba(212,175,55,0.8), 0 0 120px rgba(212,175,55,0.4)' },
        },
      },
    },
  },
  plugins: [],
}
