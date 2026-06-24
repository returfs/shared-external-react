/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  //   prefix: 'rser-',
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
};
