/*eslint-env node*/

/** @type {import('@types/eslint').ESLint.Options['baseConfig']} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  settings: {
    react: { pragma: "h", version: "16.0" },
  },
  plugins: [
    "@typescript-eslint",
    "jsx-a11y",
    "prettier",
    "promise",
    "react",
    "react-hooks",
    "simple-import-sort",
    "sonarjs",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "plugin:promise/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:sonarjs/recommended",
  ],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "crlf", trailingComma: "es5" }],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
