const base = require("./jest.config");

module.exports = {
  ...base,
  testMatch: [
    "<rootDir>/src/test/cjs.test.js",
    "<rootDir>/src/test/esm_import.test.ts",
    "<rootDir>/src/test/esm_module.test.ts",
  ],
};
