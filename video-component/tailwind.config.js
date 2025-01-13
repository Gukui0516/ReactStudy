/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "kakao-yellow": "#FAE100",
      },
      spacing: {
        12: "3rem",
        32: "8rem",
        48: "12rem",
        64: "16rem",
      },
    },
  },
  plugins: [],
};
