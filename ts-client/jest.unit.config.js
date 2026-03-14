const base = require("./jest.config");

module.exports = {
  ...base,
  testMatch: ["<rootDir>/src/test/rebalance_parameter_builder.test.ts"],
};
