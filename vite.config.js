/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import jsConfig from './jsconfig.json';

const createViteAliasFromJsConfig = (jsConfiguration) => {
  return Object.entries(jsConfiguration.compilerOptions.paths).reduce((acc, [key, [value]]) => {
    acc[key.replace(/\/\*$/g, '')] = value.replace(/(^\.)|(\/\*$)/g, '');
    return acc;
  }, {});
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: createViteAliasFromJsConfig(jsConfig),
  },
});
