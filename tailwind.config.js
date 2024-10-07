/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tahoma', 'sans-serif'], // Thêm font Tahoma
      },
    },
  },
  plugins: [],
}
