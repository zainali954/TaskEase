/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        'cat-1': '#A47E42',
        'cat-2': '#9B7EBD',
        'cat-3': '#009688',
        'cat-4': '#795548',
        'cat-5': '#ADA397',
        'cat-6': '#D2797F',
        'cat-7': '#8BC34A',
        'cat-8': '#BD5734',
        'cat-9': '#C08552',
        'cat-10': '#9E9E1C',
        'cat-11': '#FFAB91',
        'cat-12': '#607D8B',
      },
    },
  },
  plugins: [],
}