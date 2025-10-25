module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'prettier',
  ],
  plugins: ['vue', '@typescript-eslint', 'import', 'sonarjs', 'prettier'],
  rules: {
    //  Автоформатирование
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        trailingComma: 'none',
        printWidth: 100,
        tabWidth: 2,
      },
    ],

    //  Sonar-паттерны
    'sonarjs/no-identical-functions': 'warn',
    'sonarjs/no-duplicate-string': 'warn',

    // 🧩 TypeScript
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    //  Vue
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',

    // Импорты
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-duplicates': 'error',
    'import/no-useless-path-segments': 'warn',
    'import/prefer-default-export': 'off',

    'no-restricted-globals': [
      'error',
      { name: 'window', message: 'Используй globalThis вместо window' },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './renderer'],
          ['@app', './renderer/app'],
          ['@entities', './renderer/entities'],
          ['@features', './renderer/features'],
          ['@widgets', './renderer/widgets'],
          ['@pages', './renderer/pages'],
          ['@shared', './renderer/shared'],
        ],
        extensions: ['.ts', '.js', '.vue', '.json'],
      },
    },
  },
};
