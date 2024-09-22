/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile': '480px', // New smaller screen size
      'sm': '640px',  // Tailwind's default small screen size
      'md': '768px',  // Tailwind's default medium screen size
      'lg': '1024px', // Tailwind's default large screen size
      'xl': '1280px', // Tailwind's default extra-large screen size
    },
    extend: {
      fontFamily: {
        clash: ['ClashDisplay-Variable', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
