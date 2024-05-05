const jsConfig = require('./jsconfig.json');

const createViteAliasFromJsConfig = (jsConfiguration) => {
  return Object.entries(jsConfiguration.compilerOptions.paths).reduce((acc, [key, [value]]) => {
    acc.push([key.replace(/\/\*$/g, ''), value.replace(/(\/\*$)/g, '')]);
    return acc;
  }, []);
};

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: '18.2' },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
        paths: ['src'],
      },
      alias: {
        map: createViteAliasFromJsConfig(jsConfig),
        extensions: ['.js', '.jsx'],
      },
    },
  },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
  },
};
