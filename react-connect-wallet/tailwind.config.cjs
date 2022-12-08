/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        baseYellow: '#F49416',
        lightYellow: '#FFA318',
        darkYellow: '#AB7021',
        baseBlue: '#002E6B',
        lightBlue: '#0048B3',
        brightBlue: '#0970D3',
        darkBlue: '#00101A',
      },
    },
  },
  plugins: [],
};
