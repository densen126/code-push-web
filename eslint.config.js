const eslintPlugin = require('@typescript-eslint/eslint-plugin');
const parser = require('@typescript-eslint/parser');

module.exports = [
    {
        ignores: ['build/**'],
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: { jsx: true }
            }
        },
        plugins: {
            '@typescript-eslint': eslintPlugin
        },
        rules: {
            indent: ['error', 4],
            'no-console': 'off',
            "no-unused-expressions": 0,
            "padded-blocks": 0
        }
    }
];
