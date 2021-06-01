const colors = require("tailwindcss/colors");

module.exports = {
  future: { webpack5: false },
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      indigo: colors.indigo,
      yellow: colors.yellow,
      gray: colors.gray,
      white: colors.white,
      green: colors.green,
      purple: colors.purple,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  options: {
    safelist: ['bg-yellow-50', 'bg-yellow-300', 'text-yellow-900', 'bg-indigo-50', 'bg-indigo-300', 'text-indigo-900', 'bg-gray-50', 'bg-gray-300', 'text-gray-900'],
  },
}
