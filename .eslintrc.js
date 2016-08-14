module.exports = {
  extends: 'airbnb',
  plugins: ['react'],
  ecmaFeatures: {
    jsx: true,
  },
  globals: {
    React: true,
    gapi: true,
  },
  rules: {
    'no-console': 0,
    'react/prefer-stateless-function': 0,
  },
};
