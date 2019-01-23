const env = require('./env-config.js')

module.exports = {
  plugins: [['styled-components', { ssr: true, displayName: true, preprocess: false }], ['transform-define', env]],
  env: {
    development: {
      presets: ['next/babel', '@zeit/next-typescript/babel'],
    },
    production: {
      presets: ['next/babel', '@zeit/next-typescript/babel'],
    },
    test: {
      presets: [['next/babel', { 'preset-env': { modules: 'commonjs' } }], '@zeit/next-typescript/babel'],
    },
  },
}
