import css from '@eslint/css';
import js from '@eslint/js';
import json from '@eslint/json';
// import reactHooks from 'eslint-plugin-react-hooks';
// import preact from 'eslint-config-preact';
import compat from 'eslint-plugin-compat';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	// ...preact,
	compat.configs['flat/recommended'],
	globalIgnores(['node_modules']),
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		plugins: { js },
		extends: ['js/all'],
		languageOptions: { globals: globals.browser },
		rules: {
			'sort-imports': ['off'],
			'sort-keys': ['off'],
			'no-underscore-dangle': ['off'],
			'one-var': ['off'],
			'no-console': ['off'],
			'no-ternary': ['off'],
			'max-lines-per-function': ['off'],
			'capitalized-comments': ['off'],
			'func-style': ['off'],
			'consistent-return': ['off'],
		},
	},
	tseslint.configs.strict,
	// reactHooks.configs.flat.recommended,
	{ languageOptions: { parserOptions: { projectService: true } } },
	{
		files: ['**/*.jsonc', '**/*.json'],
		plugins: { json },
		language: 'json/jsonc',
		extends: ['json/recommended'],
	},
	{
		files: ['**/*.css'],
		plugins: { css },
		language: 'css/css',
		extends: ['css/recommended'],
	},
]);
