module.exports = {
  root: true,
  extends: ['../../.eslintrc.js'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['dist/', 'node_modules/', '__tests__/**', '*.test.ts', '*.spec.ts'],
}

