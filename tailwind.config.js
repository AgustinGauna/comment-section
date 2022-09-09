/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens:{
      sm: '200px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors:{
        ModerateBlue: 'hsl(238, 40%, 52%)',
        SoftRed: 'hsl(358, 79%, 66%)',
        LightGrayishBlue: 'hsl(239, 57%, 85%)',
        PaleRed: 'hsl(357, 100%, 86%)',
        DarkBlue: 'hsl(212, 24%, 26%)',
        GrayishBlue: 'hsl(211, 10%, 45%)',
        LightGray: 'hsl(223, 19%, 93%)',
        VeryLightGray: 'hsl(228, 33%, 97%)',
        White: 'hsl(0, 0%, 100%)',
        TransparentGray: 'rgba(97, 97, 97, 0.6)'
      }
    },
    
  },
  plugins: [],
}
