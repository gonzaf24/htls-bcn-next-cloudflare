import type { Config } from "tailwindcss";
const { nextui } = require('@nextui-org/react');

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A237E', //blue
        secondary: '#6A1B9A', //purple
        warning: '#FF6F00', //orange
        success: '#4CAF50', // green
        danger: '#ff0000', //red
        c_food: '#FF6F00', //orange
        c_bar: '#ff0000', //red
        c_entertainment: '#6A1B9A', //purple
        c_highlights: '#f82555', //highlights red
        c_highlights_hover: '#ff6b8b', //highlights red hovered
        c_gray_20: '#ffffff33', //gray
        c_text_primary: '#FFFFFF', // Blanco
        c_text_secondary: '#333333', // Negro
        c_bg_food: '#7c2d12',
        c_bg_bar: '#7f1d1d',
        c_bg_entertainment: '#312e81',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui(), require('@tailwindcss/forms')],
};
export default config;
