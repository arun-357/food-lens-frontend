/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bento-light': '#f5f5f5',
        'bento-dark': '#1a1a1a',
        'accent-green': '#10b981',
        'accent-blue': '#3b82f6',
        'accent-red': '#ef4444',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};