/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#121A4B',
          light: '#4A1A9C',
        },
        secondary: {
          blue: '#232D6A',
        },
        sidebar: {
          active: '#E0E7FF',
          text: '#666666',
        },
        accent: '#FF8C00',
        bgLight: '#f4f6f9',
      },
    },
  },
  plugins: [],
};