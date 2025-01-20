/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.css",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blue :{
          600 : '#002d58',
          500 : '#18416a',
          100 : '#8095aa'
        },
        green: {
          200: '#5ec9d1'
        }
      }
    },
  },
  plugins: [],
}

