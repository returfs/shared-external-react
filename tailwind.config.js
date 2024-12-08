/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  //   prefix: 'rser-',
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
};
