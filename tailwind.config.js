/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      orange: "#FDA214",
      white: "#FCFCFC",
      gray: "#F2F2F2",
      "blue-100": "#BCCED9",
      "blue-200": "#7191A5",
      "blue-300": "#6395B8",
      "blue-400": "#304859",
      "blue-500": "#152938",
    },
    fontSize: {
      h1: ["3rem", { fontWeight: 700 }],
      h2: ["2rem", { fontWeight: 700 }],
      h3: ["1.25rem", { fontWeight: 700 }],
      body: ["1.125rem", { fontWeight: 700 }],
      number6x6: ["2.75rem", { fontWeight: 700 }],
      number4x4: ["3.5rem", { fontWeight: 700 }],
    },
    fontFamily: { sans: ["Atkinson Hyperlegible", "sans-serif"] },
    extend: {},
  },
  plugins: [],
};
