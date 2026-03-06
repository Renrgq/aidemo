module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss'
  ],
  overrides: [
    {
      files: ['*.vue'],
      customSyntax: 'postcss-html'
    }
  ],
  rules: {
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'scss/at-extend-no-missing-placeholder': null
  }
}