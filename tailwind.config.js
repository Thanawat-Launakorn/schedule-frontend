/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
  "./src/view/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
  "./src/app/**/*.{js,ts,jsx,tsx}"
],
  theme: {
    colors: {
      themeWhiteContainer: 'var(--theme-white-container-color)'
    },
    extend: {},
  },
  plugins: [
  ],
}

