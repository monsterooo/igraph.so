module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        "30-rem": "30rem",
      },
      flexGrow: {
        10: '10'
      },
      flexShrink: {
        2: '2'
      },
      transformOrigin: {
        'center-top': '50% 0'
      },
      gridTemplateColumns: {
        'color': 'repeat(2, auto)',
        'background-color': 'repeat(4, auto)',
        'type': 'repeat(6, auto)'
      },
      colors: {
        igraph: {
          25: '#faffff',
          50: '#edfcf6',
          100: '#d4f7e7',
          200: '#aceed3',
          300: '#77deba',
          400: '#36bb91',
          500: '#1cad84',
          600: '#0f8c6b',
          700: '#0c7058',
          800: '#0c5947',
          900: '#0b493c',
          950: '#052922'
        }
      }
    },
  },
  plugins: [],
}