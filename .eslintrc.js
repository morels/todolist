/* eslint-env node */
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      "jsx": true
    }
  },
  extends: [
    // "airbnb",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    // "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:import/typescript",
    "plugin:react/jsx-runtime",
    "plugin:@next/next/core-web-vitals",
  ],
  plugins: [
    "react",
    "react-hooks",
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
    "react/function-component-definition": ["error", {
      namedComponents: ["arrow-function", "function-declaration"],
      unnamedComponents: "arrow-function",
    }],
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react/jsx-props-no-spreading": ["warn"],
    "react/require-default-props": "off",
    "react/prop-types": "off",
    "import/prefer-default-export": "off",
    // airbnb plugin overrides nextjs import rules. The following rules settings fix it:
    // - "eslint-import/extensions"
    // - "eslint-import/no-extraneous-dependencies"
    "import/extensions": ["warn", { extensions: [".js", ".ts", ".tsx"] }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
    "react": {
      "version": "detect"
    }
  },
};
