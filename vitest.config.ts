import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        setupFiles: './test/setup.ts',
        include: ['src/**/*.test.{ts,tsx}', 'test/**/*.test.{ts,tsx}']
    }
});
