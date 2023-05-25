/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        greenRight: 'rgb(42, 207, 58)',
        redWrong: 'rgb(189, 40, 40)',
        blackHeader: 'rgb(59, 59, 59)'
      },
    },
  },
  plugins: [],
}

