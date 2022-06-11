module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    '@typescript-eslint/no-explicit-any': 2,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/require-default-props': 'off',
    'implicit-arrow-linebreak': 0,
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: { consistent: true },
      },
    ],
    'react/jsx-wrap-multilines': 'off',
    'operator-linebreak': 'off',
  },
};
