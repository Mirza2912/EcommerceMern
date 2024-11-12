/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-color": "#141516",
        "menu-color": "#6161b9",
        gold: "#faaf00",
      },
      screens: {
        xsm: { max: "639px" },
        xxsm: { max: "450px" },
        slg: { min: "990px" },
        xlg: { min: "1237px" },
        xxl: { min: "1400px" },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        poppin: ["Poppins", "serif"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".clip-custom-triangle": {
          clipPath: "polygon(100% 75%, 0 100%, 100% 100%)",
        },
      });
    },
  ],
};
