/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./cart-products.html", "./public/**/*.js"],
  theme: {
    extend:{
      colors:{
        text: "var(--text)",
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        border: "var(--border)",
      },
      rotate:{
        'turn': '1turn'
      }
    },
    fontFamily: {
      Michroma: "var(--Michroma)",
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
