module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        light: {
          css: {
            color: theme("colors.gray.300"),
            '[class~="lead"]': { color: theme("colors.gray.300") },
            a: { color: theme("colors.gray.200") },
            strong: { color: theme("colors.gray.200") },
            "ul > li::before": { backgroundColor: theme("colors.gray.600") },
            hr: { borderColor: theme("colors.gray.700") },
            blockquote: {
              color: theme("colors.gray.200"),
              borderLeftColor: theme("colors.gray.700"),
            },
            h1: { color: theme("colors.gray.200") },
            h2: { color: theme("colors.gray.200") },
            h3: { color: theme("colors.gray.200") },
            h4: { color: theme("colors.gray.200") },
            "figure figcaption": {
              color: theme("colors.gray.400"),
            },
            code: { color: theme("colors.gray.200") },
            "a code": { color: theme("colors.gray.200") },
            pre: {
              color: theme("colors.gray.200"),
              backgroundColor: theme("colors.gray.700"),
            },
            thead: {
              color: theme("colors.gray.200"),
              borderBottomColor: theme("colors.gray.600"),
            },
            "tbody tr": { borderBottomColor: theme("colors.gray.700") },
          },
        },
      }),
    },
  },

  variants: {
    extend: {
      typography: ["dark"],
    },
  },

  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
