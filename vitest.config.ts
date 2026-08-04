import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

// Merged onto the real Vite config rather than redeclared, so tests inherit the
// React plugin (JSX transform) and the `@/*` → `src/*` alias from one place. A
// standalone config here would silently shadow vite.config.ts and break both.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/app/test/setup.ts'],
      include: ['src/**/*.test.{ts,tsx}'],
    },
  }),
)
