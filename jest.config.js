const path = require('path')

module.exports = {
  verbose: false,
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // '**/tests/**/*.tsx': 'ts-jest',
  },
  // testRegex: '(/tests/**/.*|(\\.|/)(test|spec))\\.tsx?$',
  // transformIgnorePatterns: ['<rootDir>/tests/frontend/components/'],
  // testEnvironment: '',
  // moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  collectCoverageFrom: [
    '**/admin-components/**/*.{ts,tsx}',
    '**/common/**/*.{ts,tsx}',
    '**/components/**/*.{ts,tsx}',
    '**/pages/**/*.{ts,tsx}',
    '**/server/**/*.{ts,tsx}',
    '**/store/**/*.{ts,tsx}',
    '**/style/**/*.{ts,tsx}',
    '**/utils/**/*.{ts,tsx}',
  ],
  globals: {
    'ts-jest': {
      tsConfig: {
        jsx: 'react',
      },
    },
  },
}
