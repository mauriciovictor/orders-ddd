import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    threads: false, // ⬅️ MUITO IMPORTANTE
    isolate: false,
    sequence: {
      concurrent: false,
    },
    root: './src',
    setupFiles: ['./src/Infra/Repository/typeorm.setup.ts'],
  },
});
