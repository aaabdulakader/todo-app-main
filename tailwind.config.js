/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "375px",
      lg: "1440px",
    },
    extend: {
      colors: {
        // primary: {
        //   'bright-blue': 'hsl(220, 98%, 61%)',
        //   'check-bg': 'linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))'
        // },
        // neutral: {
        //   'very-light-gray': 'hsl(0, 0%, 98%)',
        //   'very-light-grayish-blue': 'hsl(236, 33%, 92%)',
        //   'light-grayish-blue': 'hsl(233, 11%, 84%)',
        //   'dark-grayish-blue': 'hsl(236, 9%, 61%)',
        //   'very-dark-grayish-blue': 'hsl(235, 19%, 35%)'
        // },
        // dark: {
        //   'very-dark-blue': 'hsl(235, 21%, 11%)',
        //   'very-dark-desaturated-blue': 'hsl(235, 24%, 19%)',
        //   'light-grayish-blue': 'hsl(234, 39%, 85%)',
        //   'light-grayish-blue-hover': 'hsl(236, 33%, 92%)',
        //   'dark-grayish-blue': 'hsl(234, 11%, 52%)',
        //   'very-dark-grayish-blue': 'hsl(233, 14%, 35%)',
        //   'very-dark-grayish-blue2': 'hsl(237, 14%, 26%)'
        // }

        primary: {
          blue: "hsl(220, 98%, 61%)",
          "check-bg":
            "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
        },
        neutral: {
          "gray-100": "hsl(0, 0%, 98%)",
          "gray-200": "hsl(236, 33%, 92%)",
          "gray-300": "hsl(233, 11%, 84%)",
          "gray-400": "hsl(236, 9%, 61%)",
          "gray-500": "hsl(235, 19%, 35%)",
        },
        dark: {
          "blue-900": "hsl(235, 21%, 11%)",
          "blue-800": "hsl(235, 24%, 19%)",
          "gray-300": "hsl(234, 39%, 85%)",
          "gray-200": "hsl(236, 33%, 92%)",
          "gray-500": "hsl(234, 11%, 52%)",
          "gray-700": "hsl(233, 14%, 35%)",
          "gray-800": "hsl(237, 14%, 26%)",
        },
      },
    },
    fontFamily: {
      sans: ["Josefin Sans", "sans-serif"],
    },
    fontSize: {
      body: "18px",
    },
    fontWeight: {
      normal: 400,
      bold: 700,
    },
    backgroundImage: {
      desktop: "/images/bg-pattern-desktop.svg",
    },
  },
  plugins: [],
};
