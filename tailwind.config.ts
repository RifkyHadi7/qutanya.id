import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#808585",
        background:"#25E5DA",
        background2:"#F2F2FE",
        balance: "#21FF5C",
        saldo: "#21FF5C" ,
      },
      borderWidth: {
        small: "1px", // border-small
        medium: "2px", // border-medium (default)
        large: "3px", // border-large
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: "#FFFFFF",
          secondary: "#808585",
          background:"#25E5DA",
          background2:"#F2F2FE",
          balance: "#21FF5C",
          saldo: "#21FF5C" ,
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "2px", // border-medium (default)
          large: "3px", // border-large
        },
      },
      dark: {
        colors: {
          primary: "#FFFFFF",
          secondary: "#808585",
          background: "#25E5DA",
          background2:"#F2F2FE",
          balance: "#21FF5C",
          saldo: "#21FF5C" ,
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "2px", // border-medium (default)
          large: "3px", // border-large
        },
      },
    },
  }),
  ],
};


  
export default config;
