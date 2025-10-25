import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  root: 'renderer',
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './renderer'),
      '@app': path.resolve(__dirname, './renderer/app'),
      '@entities': path.resolve(__dirname, './renderer/entities'),
      '@features': path.resolve(__dirname, './renderer/features'),
      '@widgets': path.resolve(__dirname, './renderer/widgets'),
      '@pages': path.resolve(__dirname, './renderer/pages'),
      '@shared': path.resolve(__dirname, './renderer/shared'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
});
