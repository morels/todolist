/* eslint-disable */
// The following configuration was taken from https://nextjs.org/docs/basic-features/eslint#lint-staged
const path = require("path");

const buildEslintCommand = (filenames) => `next lint --fix --file ${filenames
  .map((f) => path.relative(process.cwd(), f))
  .join(" --file ")}`;

module.exports = {
  "*.{ts,tsx}": [buildEslintCommand],
};
