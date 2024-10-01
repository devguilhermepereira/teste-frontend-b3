module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    collectCoverage: true,
    coverageDirectory: "dist/test-coverage",
    collectCoverageFrom: ["src/app/**/*.ts"],
    coveragePathIgnorePatterns: [
      "setup-jest.ts",
      "public_api.ts",
      ".module.ts",
      ".interface.ts",
      ".utils.ts",
      ".service.ts",
    ],
    coverageThreshold: {
      global: {
        statements: 85,
        branches: 85,
        functions: 75,
        lines: 80,
      },
    },
    modulePaths: [
      "<rootDir>"
    ],
    testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/', '<rootDir>/cypress/integration'],
    globals: {
      "ts-jest": {
        tsconfig: "<rootDir>/tsconfig.spec.json",
      },
    },
  };
   