module.exports = {
  root: true,
  extends: ['../../.eslintrc.js'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  ignorePatterns: ['dist/', 'node_modules/'],
}

