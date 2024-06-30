/** @type {import('tailwindcss').Config} */
module.exports = {
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
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      colors: {
        mirageColor: "#393e41" /* black, text, bgbuttoncolor*/,
        amaranthColor: "#E63946" /*red, cardcolor*/,
        romanceColor: "#F5F4F1" /* white ,text,search , bgcolor*/,
        whitesmokeColor: "#F0F0F0" /* whitecardcolor*/,
        gainsboroColor: "#E3E2E2" /*lightdarkabovecardcolor*/,
      },
    },
  },
  plugins: [],
};
