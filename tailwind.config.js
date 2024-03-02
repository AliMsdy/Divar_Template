/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        "primary": "#a62626"
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: "#root",
};
