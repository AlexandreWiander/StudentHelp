/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'blueTheme': '#092545',
      'greenTheme': '#2FBB45',
      'lightBlueTheme': '#2075DA',
      'orangeTheme': '#EA882E',
      'redTheme': '#F63737',
      'yellowTheme': '#E5BB25',
      'white':'rgba(249,249,249)'
    },
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
};
