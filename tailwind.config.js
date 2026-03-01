/** @type {import('tailwindcss').Config} */
module.exports = {
  // ESTO ES LO QUE TE FALTABA: Le decimos a Tailwind que lea tus archivos HTML
  content: ["./*.html", "./js/**/*.js"], 
  theme: {
    extend: {
      // Tu punto de quiebre personalizado
      screens: {
        'mi-salto': '865px', 
      },
    },
  },
  plugins: [],
}