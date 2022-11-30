/* eslint-env node */
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "airbnb",
    "plugin:@next/next/recommended",
  ],
  plugins: [
    "@typescript-eslint",
  ],
  root: true,
  rules: {
    // https://stackoverflow.com/questions/57802057/eslint-configuring-no-unused-vars-for-typescript
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
    ],
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    quotes: ["error", "double"],
    "react/function-component-definition": [2, {
      namedComponents: ["arrow-function", "function-declaration"],
      unnamedComponents: "arrow-function",
    }],
  },
};
