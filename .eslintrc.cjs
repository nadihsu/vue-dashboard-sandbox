/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vitest-globals/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue-pug/vue3-recommended',
    'eslint:recommended',
    'airbnb-base',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
    'vitest-globals/env': true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      ignores: ['sidebar'],
    }],
    'vue/multi-word-component-names': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 3,
        multiline: {
          max: 1,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['Tests', './tests'],
        ],
        extensions: ['.js', '.vue'],
      },
    },
  },
};
