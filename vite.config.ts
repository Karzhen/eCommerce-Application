import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@api': path.resolve(__dirname, './src/api'),
      '@components': path.resolve(__dirname, './src/components'),
      '@baseComponents': path.resolve(
        __dirname,
        './src/components/baseComponents',
      ),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@router': path.resolve(__dirname, './src/router'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@actions': path.resolve(__dirname, './src/redux/actions'),
      '@reducers': path.resolve(__dirname, './src/redux/reducers'),
      '@store': path.resolve(__dirname, './src/redux/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
