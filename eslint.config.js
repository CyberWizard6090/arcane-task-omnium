import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import importPlugin from 'eslint-plugin-import';
import sonarjs from 'eslint-plugin-sonarjs';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';

export default [
  js.configs.recommended,

  {
    ignores: ['dist/**', 'node_modules/**', '*.config.*', '**/*.d.ts'],
  },

  //  Renderer (Vue / Browser)
  {
    files: ['renderer/**/*.{ts,js,vue}'],
    languageOptions: {
      parser: vueParser,
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint,
      import: importPlugin,
      sonarjs,
      prettier,
    },
    rules: {
      // Prettier
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'all',
          printWidth: 100,
          tabWidth: 2,
        },
      ],
      'no-unused-vars': 'off',

      // TS
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',

      // Vue
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
    },
  },

  //  Main & Preload (Node / Electron backend)
  {
    files: ['main/**/*.{ts,js}', 'preload/**/*.{ts,js}', 'vite.config.mjs'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.main.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'off',
    },
  },
];
