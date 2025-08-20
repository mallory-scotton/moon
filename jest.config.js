/**
 * @brief Jest configuration file
 * @description Configuration file for Jest testing framework
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
