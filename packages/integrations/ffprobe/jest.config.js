/**
 * @brief Jest configuration for testing
 * @description This configuration file sets up Jest with TypeScript support and specifies the test environment.
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '((\\.|/)(test|spec)\\.tsx?$)',
  transform: {
    'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!variables/.*)']
};
