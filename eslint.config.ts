import { globalIgnores } from 'eslint/config';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  prettierConfig,
  {
    plugins: {
      prettier: pluginPrettier,
    },
  },

  // Custom rules for Vue 3 best practices
  {
    rules: {
      // Prefer inline type definitions over interfaces
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // Disallow unused variables (including props/emit variables)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Enforce proper Vue 3 patterns
      'vue/no-unused-vars': 'error',

      // Prefer script setup syntax
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],

      // Enforce proper prop validation
      'vue/require-prop-types': 'error',

      // Enforce consistent defineProps usage
      'vue/define-props-declaration': ['error', 'type-based'],

      // Enforce consistent defineEmits usage
      'vue/define-emits-declaration': ['error', 'type-based'],

      // Prettier integration
      'prettier/prettier': 'error',
    },
  }
);
