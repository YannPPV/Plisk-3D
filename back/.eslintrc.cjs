module.exports = {
  root: true,

  env: {
    node: true,
    es2021: true,
  },

  extends: ['airbnb-base'],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    'no-console': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'linebreak-style': 'off',
  },
};
