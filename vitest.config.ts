import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude],
      root: fileURLToPath(new URL('./', import.meta.url)),
      globals: true,
      setupFiles: ['./tests/unit/setup.js'],
      deps: {
        inline: ['element-plus'],
      },
    },
    resolve: {
      alias: {
        Tests: fileURLToPath(new URL('./tests', import.meta.url)),
      },
    },
  }),
);
