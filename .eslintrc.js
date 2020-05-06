module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react',
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
    'jsx-a11y/anchor-is-valid': 0, // To style next/Link
    'import/prefer-default-export': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/jsx-props-no-spreading': 0,
  },
}
