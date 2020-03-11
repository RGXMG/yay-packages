// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  roots: ['<rootDir>/packages'],
  testMatch: [
    '<rootDir>/packages/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/packages/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
