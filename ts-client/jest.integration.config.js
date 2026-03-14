const base = require("./jest.config");

module.exports = {
  ...base,
  testMatch: [
    "<rootDir>/src/test/bug_fix.test.ts",
    "<rootDir>/src/test/calculate_distribution.test.ts",
    "<rootDir>/src/test/decode.test.ts",
    "<rootDir>/src/test/ilm.test.ts",
    "<rootDir>/src/test/rebalance.test.ts",
    "<rootDir>/src/test/rebalance_with_strategy.test.ts",
    "<rootDir>/src/test/sdk.test.ts",
    "<rootDir>/src/test/sdk_token2022.test.ts",
    "<rootDir>/src/test/single_bin.test.ts",
    "<rootDir>/src/test/token_2022.test.ts",
  ],
};
