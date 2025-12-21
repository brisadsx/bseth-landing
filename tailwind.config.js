/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bseth-cream': '#F9F6F2',
        'bseth-beige': '#BAAD93',
        'bseth-sand': '#ECE4CE',
        'bseth-brown': '#8C6A58',
        'bseth-olive': '#8E9F6C',
        'bseth-black': '#111111',
        'bseth-rose': '#C8A6A0',
      },
      
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        drowner: ['Drowner', 'serif'],
        serif: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}