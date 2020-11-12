module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'semi': [
      'error',
      'always',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'eol-last': [
      'error',
      'always',
    ],
    'no-unused-vars': [
      'error',
      {
        'args': 'none',
      },
    ],
    'arrow-parens': [
      'error',
      'always',
    ],
    'func-style': [
      'error',
      'expression',
    ],
    'no-unsafe-finally': 'off',
  },
};
