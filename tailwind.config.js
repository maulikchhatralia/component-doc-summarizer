
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ enables class-based dark mode
  content: [
    "./src/pages/api/*.{js,ts,jsx,tsx}",
    "./src/pages/*.{js,ts,jsx,tsx}",
    "./src/components/ui/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

// module.exports = {
//   darkMode: 'class',
//   content: [
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };