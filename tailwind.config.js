/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7F56D9",
        icon: "#596371",
        bodyBg: "#F2F4F7",
        cardBg: "#FFFFFF",
      },
      borderRadius: {
        custom: "0.65rem",
      }
    },
  },
  plugins: [],
}
