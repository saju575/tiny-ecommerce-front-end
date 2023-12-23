/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0f172a",
        // dark: "#2f3640",
        light: "#f5f6fa",
        swanWhite: "#f7f1e3",
        slight: "#dcdde1",
        softlight: "#f0f0f0",
        softdark: "#626262",
        gray: "#546E7A",
        red: "#E53935",
      },
    },
  },
  darkMode: "class",
  // plugins: [require("tw-elements/dist/plugin.cjs")],
};
