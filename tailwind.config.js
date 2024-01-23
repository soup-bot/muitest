/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  plugins: [
    // other plugins...
    require("flowbite/plugin"),
    require("tailwindcss-animated"),
  ],
  theme: {
    fontFamily: {
      body: ["Gotham"],
    },
    extend: {
      colors: {
        primary: "#F26940",
        secondary: "#0FA5B7",
        hoverprim: "#d9440e",
        hoversec: "#0c8492",
      },
    },
    fontFamily: {
      custom: ["Rubik", "sans-serif"],
    },
  },
};
