module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  options: {
    safelist: ['bg-yellow-50', 'bg-yellow-300', 'text-yellow-900', 'bg-indigo-50', 'bg-indigo-300', 'text-indigo-900', 'bg-gray-50', 'bg-gray-300', 'text-gray-900',],
  },
}
