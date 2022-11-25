/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'phone': {'max': '640px'},
      // => @media (min-width: 640px) { ... }

      'ipad': {'max': '1024px'},
      // => @media (min-width: 1024px) { ... }

      'desktop':  {'max': '1280px'},
      // => @media (min-width: 1280px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        inria: ["Inria Serif", "serif"]
      },
      backgroundImage: {
        'hero-pattern': "url('https://raw.githubusercontent.com/hoangvantuan123/Covid-19-news/main/client/src/Components/file/svg/WorldMap.svg')",
      }
    },
    colors: {
      'tahiti': {
        100: '#3C4E66',
        200: 'rgba(60, 78, 102, 0.29);',
      },
      'regal-blue': 'rgba(40, 109, 168, 0.1);',
      'regal-oranges': 'rgba(215, 95, 36, 0.1);',
      'regal-green': 'rgba(123, 178, 36, 0.1);',

    },

  },
  plugins: [],
}
