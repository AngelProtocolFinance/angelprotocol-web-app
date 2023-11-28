/** @type {import("prettier").Config} */
const config = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  endOfLine: "lf",
  embeddedLanguageFormatting: "auto",
  singleAttributePerLine: false,
  importOrder: [
    "types.*",
    "^assets.*",
    "^pages.*",
    "^services.*",
    "^providers.*",
    "^contexts.*",
    "^components.*",
    "^store.*",
    "^slices.*",
    "^contracts.*",
    "^hooks.*",
    "^helpers.*",
    "^schemas.*",
    "^errors.*",
    "^constants.*",
    "^[../]",
    "^[./]",
  ],
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};

module.exports = config;
