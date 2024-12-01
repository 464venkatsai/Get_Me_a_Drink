import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily:{
      poppins: ['Poppins', 'sans-serif'],
      nunito: ['"Nunito Sans"', 'sans-serif'],
      inter : [ "Inter", "sans-serif"]
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: {
          DEFAULT: "#000",
          100: "#000319",
          200: "rgba(17, 25, 40, 0.75)",
          300: "rgba(255, 255, 255, 0.125)",
        }
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
} satisfies Config;
