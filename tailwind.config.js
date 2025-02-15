/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#00f0ff',
          red: '#ff0033',
          dark: '#1a1a2e',
        },
        secondary: {
          blue: '#0ea5e9',
          red: '#dc2626',
        },
        background: '#0f172a',
      },
    },
  },
  plugins: [],
};