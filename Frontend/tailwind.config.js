/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          contrast: "var(--color-primary-contrast)",
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)",
          background: "var(--color-primary-background)",
        },
        secondary: {
          light: "var(--color-secondary-light)",
          DEFAULT: "var(--color-secondary)",
          dark: "var(--color-secondary-dark)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          light: "var(--color-text-light)",
        },
      },
    },
  },
  plugins: [],
};
