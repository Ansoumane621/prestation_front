module.exports = {
  content: ["./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"],
  darkMode: "class",
  corePlugins: {
    preflight: true, // ✅ désactive le reset de base de Tailwind
  },
  theme: {
    extend: {
      
      colors: {
        backgroundLight: '#F5F8FC',
        // white: '#F5F6FA',
        // primary: {
        //   DEFAULT: "#0E9F6E",
        //   50: "#E6F6F2",
        //   100: "#B8EADB",
        //   200: "#8BDDCA",
        //   300: "#5DD0B7",
        //   400: "#30C3A4",
        //   500: "#0E9F6E", // la couleur principale
        //   600: "#0B7F5A",
        //   700: "#086047",
        //   800: "#054033",
        //   900: "#02201F",
        // },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
