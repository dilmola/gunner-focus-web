/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        base: "14px" /* Default font size for Tailwind */,
      },
      fontWeight: {
        normal: "400" /* Define a default 'normal' font weight */,
        medium: "500",
        semibold: "600" /* Define a default 'normal' font weight */,
        bold: "700" /* Define a default 'bold' font weight */,
      },
    },
  },
  plugins: [],
};
