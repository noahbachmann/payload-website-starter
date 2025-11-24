import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import stylistic from '@stylistic/eslint-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
		files: [
			"**/*.{js,ts,jsx,tsx}"
		],
		plugins: {
			'@style': stylistic,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			'prefer-const': 'warn',
			'no-unused-vars': 'warn',
			'import/no-anonymous-default-export': 'off',
			'react/no-unescaped-entities': 'off',
			'react-hooks/exhaustive-deps': 'off',
			'react-hooks/incompatible-library': 'off',

			'@style/no-trailing-spaces': 'warn',
			'@style/quotes': ['warn', 'single'],
			'@style/semi': ['warn', 'never'],
			'@style/object-curly-spacing': ['warn', 'always'],
			'@style/jsx-curly-spacing': ['warn', 'always'],
		}
	},
  {
    ignores: ['.next/'],
  },
]

export default eslintConfig
