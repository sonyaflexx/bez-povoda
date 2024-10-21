import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foregroud: {
          primary: "rgb(30, 30, 30)",
          secondary: "rgb(41, 45, 50)",
          tertiary: "rgb(113, 113, 113)",
        },
        background: {
          secondary: "rgb(255, 230, 183)",
        }
      },
    },
  },
  plugins: [],
};
export default config;
