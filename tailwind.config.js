/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'Open Sans'],
    },
    extend: {
      colors: {
        coral: "#ce4257",
        wine: "#720026",
        paleblue: "#eff3f4",
        palepaleblue: "#fafbfd",
        antblue: "#3681d1",
        antbluelight: "#6dadf2",
        antbluetrans:"#3681d180",
        whitetrans: "#ffffffc0",
        aquabluetrans: "#e1f3f7c0",
        lagoonbluetrans: "#90e0efc0",
      },
    },
  },
  plugins: [],
}
