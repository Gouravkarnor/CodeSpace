// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxHeight: {
        "screen-75": "75vh", // Custom max height
      },
    },
  },
  variants: {
    extend: {
      scrollbar: ["dark"], // To apply scrollbar styles in dark mode
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
        },
        ".scrollbar-thumb-rounded": {
          "scrollbar-color": "#4b5563 #1f2937",
          "scrollbar-radius": "10px",
        },
        ".scrollbar-track-gray": {
          "scrollbar-color": "#1f2937",
        },
        ".scrollbar-thumb-dark": {
          "scrollbar-color": "#4b5563",
        },
      });
    },
  ],
};
