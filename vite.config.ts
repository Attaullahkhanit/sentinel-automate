import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import electron from 'vite-plugin-electron/simple'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main/index.ts',
        onstart(options) {
          options.startup()
        },
        vite: {
          build: {
            rollupOptions: {
              external: [
                'playwright',
                'playwright-core',
                '@prisma/client',
                '@prisma/adapter-better-sqlite3',
                'better-sqlite3'
              ]
            }
          }
        }
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload/index.ts'),
      },
    }),
  ],
})
