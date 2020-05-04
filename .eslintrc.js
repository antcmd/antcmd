module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 0, // Next.js provides react by default
    'react/jsx-filename-extension': 0, // Prefer .js more
    'react/prop-types': 0, // Not using PropTypes
    'jsx-a11y/no-autofocus': 0, // We need autofocus on signup and and post editor pages
    'import/no-unresolved': 0, // Todo: need to configure absolute import to ignore lint
  },
}
