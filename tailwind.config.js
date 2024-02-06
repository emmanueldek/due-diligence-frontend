/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      modalGrey: "rgba(0, 0, 0, 0.1);",
      neutral: {
        200: "#E5E5E5",
      },
      bacgroundColor: "#F7F7F7",
      link: "#144D98",
      /* foundation/grey */
      grey: {
        50: "#F1F1F2",
        100: "#E0E1E4",
        200: "#A2A3A7",
        300: "#78797F",
        400: "#5D5F66",
        500: "#353740",
        600: "#30323A",
        700: "#26272D",
        800: "#1D1E23",
        900: "#16171B",
      },
      /* foundation/red */
      red: {
        50: "#FDE9E9",
        100: "#F9BCBC",
        200: "#F69C9C",
        300: "#F26E6E",
        400: "#F05252",
        500: "#EC2727",
        600: "#D72323",
        700: "#A81C1C",
        800: "#821515",
        900: "#631010",
      },
      /* foundation/green */
      green: {
        50: "#E7F8F3",
        100: "#B5EADA",
        200: "#92E0C8",
        300: "#60D1AF",
        400: "#41C9A0",
        500: "#11BB88",
        600: "#0FAA7C",
        700: "#0C8561",
        800: "#09674B",
        900: "#074F39",
      },
    },

    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "28px",
      "4xl": "32px",
    },
    extend: {
      lineHeight: {
        "heading-lg": "120%",
      },
      fontFamily: {
        // primary: ["Hanken Grotesk", "sans-serif"],
        primary: ["'Hanken Grotesk'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
