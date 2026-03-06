module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'vue/html-indent': ['error', 2],
    'vue/script-indent': ['error', 2, {
      'baseIndent': 1,
      'switchCase': 1
    }]
  }
}