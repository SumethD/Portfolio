/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['InterVariable', 'Inter', '-apple-system', 'sans-serif'],
      },
      colors: {
        accent: '#ff5500',
        dark: {
          DEFAULT: '#060606',
          100: '#0a0a0a',
          200: '#111111',
          300: '#1a1a1a',
          400: '#222222',
        },
      },
    },
  },
  plugins: [],
}
