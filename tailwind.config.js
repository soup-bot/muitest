/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js"
  ],
  plugins: [
    // other plugins...
    require("flowbite/plugin")
  ],
  theme: {
    extend: {
      colors: {
        'primary':'#F05425',
        'secondary':'#0FA5B7',
      }
    },
  },  
};
