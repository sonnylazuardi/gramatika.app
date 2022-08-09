module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["GeneralSans", "ui-sans-serif", "system-ui"],
      serif: ["GeneralSans", "ui-serif", "Georgia"],
      display: ["GeneralSans", "ui-sans-serif", "system-ui"],
      body: ["GeneralSans", "ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          "base-100":
            "#1a1a1a" /* Base color of page, used for blank backgrounds */,
          "base-200": "#242424" /* Base color, a little darker */,
          "base-300": "#d1d5db" /* Base color, even more darker */,
          "base-content":
            "#e8e8e8" /* Foreground content color to use on base color */,
        },
      },
      "light",
    ],
  },
};
