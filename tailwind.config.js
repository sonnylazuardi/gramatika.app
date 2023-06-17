module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  daisyui: {
    themes: ["forest"],
  },
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
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
};
