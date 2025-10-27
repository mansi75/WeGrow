/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { inter: ['Inter', 'system-ui', 'sans-serif'] },
      boxShadow: { card: '0 10px 30px rgba(17,24,39,.08)' },
      colors: { brand: '#7c3aed', brandSoft: '#ede9fe' }
    }
  },
  plugins: []
};
