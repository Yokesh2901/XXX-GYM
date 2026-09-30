/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gym: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
          red: '#dc2626',
          crimson: '#e11d48',
          amber: '#f59e0b',
          yellow: '#eab308',
        }
      },
      fontFamily: {
        display: ['"Montserrat"', '"Oswald"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'light-mesh': 'radial-gradient(at 0% 0%, rgba(225, 29, 72, 0.08) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(245, 158, 11, 0.08) 0px, transparent 50%)',
        'athletic-grid': "radial-gradient(#cbd5e1 1px, transparent 1px)",
        'diagonal-stripes': "repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02) 10px, transparent 10px, transparent 20px)",
      },
      boxShadow: {
        'card-light': '0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 20px 40px -10px rgba(225, 29, 72, 0.15), 0 8px 20px -4px rgba(15, 23, 42, 0.08)',
        'glow-red': '0 0 25px -3px rgba(225, 29, 72, 0.4)',
        'glow-amber': '0 0 25px -3px rgba(245, 158, 11, 0.35)',
      },
    },
  },
  plugins: [],
}
