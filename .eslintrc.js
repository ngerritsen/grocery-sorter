'use strict';

module.exports = {
  extends: 'ngerritsen',
  env: {
    browser: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'no-magic-numbers': 0,
    'semi': 0,
    'operator-linebreak': [2, 'after'],
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
    'max-statements': [2, 11]
  }
};
