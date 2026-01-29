/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fitin': {
          'primary': '#FF6B9D',
          'secondary': '#7DD3C0',
          'dark': '#2D3748',
          'light': '#FFF5F8',
          'accent': '#FFD93D',
        }
      },
      fontFamily: {
        'sans': ['Pretendard', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
