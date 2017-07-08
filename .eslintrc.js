'use strict';

module.exports = {
  extends: 'ngerritsen',
  env: {
    browser: true
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
    'semi': 0
  }
}
