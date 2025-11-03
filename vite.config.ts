import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  root: 'renderer',
  base: './',
  plugins: [vue(), svgLoader({ svgo: false })],
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
    target: 'esnext',
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, 'preload/preload.ts'),
      formats: ['es'],
      fileName: () => 'preload.js',
    },
  },
});
