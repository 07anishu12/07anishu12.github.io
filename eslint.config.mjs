import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/public/**', '**/generated/**', '**/next-env.d.ts'] },
  ...tseslint.configs.recommended.map(config => ({ ...config, files: ['apps/**/*.{ts,tsx}', 'packages/**/*.ts'] })),
  { files: ['apps/**/*.{ts,tsx}', 'packages/**/*.ts'], languageOptions: { globals: {...globals.node, ...globals.browser} }, rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
  } },
);
