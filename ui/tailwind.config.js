/** @type {import('tailwindcss/types/config').Config} */
module.exports = {
  safelist: [
    {
      pattern: /order-(?:[1-9]|[1-9][0-9]|1[0-9][0-9]|200)/,
    },
    "order-0",
    "order-first",
    "order-last",
  ],
  theme: {
    extend: {
      colors: {
        "custom-test-color": "#FF00FF", // Magenta
      },
    },
  },
};
