const path = require('path')

module.exports = {
  verbose: false,
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
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
