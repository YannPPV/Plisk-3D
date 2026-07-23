module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
  },

  extends: [
    'airbnb-base',
    'plugin:vue/vue3-recommended',
  ],

  plugins: ['vue'],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    'no-console': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'vue/multi-word-component-names': 'off',
    'linebreak-style': 'off', // Windows CRLF
    'import/no-unresolved': 'off', // faux positifs Vite
  },
};
