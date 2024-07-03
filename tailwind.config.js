/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "card-shadow": "0px 2px 0 rgba(0, 0, 0, 0.5)", // Custom shadow with opacity
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        base: "12px" /* Default font size for Tailwind */,
        h2Size: ["1.5rem"],
        h2SmSize: ["1.2rem"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      colors: {
        mirageColor: "#282c2d" /* black, text, bgbuttoncolor*/,
        mirageOpa50Color: "rgba(57, 62, 65, 0.5)" /* text black, opacity 50%,*/,
        mirageOpa01Color: "rgba(57, 62, 65, 0.1)" /* border*/,
        amaranthColor: "#E63946" /*red, cardcolor*/,
        romanceColor: "#F6F6F6" /* white ,text,search, bgcolor */,
        romanceOpa50Color:
          "rgba(246, 246, 246, 0.4)" /* text white ,opacity 50%*/,
        romanceOpa01Color:
          "rgba(246, 246, 246, 0.1)" /* border */,
        whitesmokeColor: "#F0F0F0" /* whitecardcolor*/,
        gainsboroColor: "#E3E2E2" /*lightdarkabovecardcolor*/,
        montanaColor: "#363B3D" /*darkmodeabovecardcolor*/,
        codgreyColor: "#2D3133" /*cardcolor for darkmode*/,
      },
    },
  },
  plugins: [],
};
