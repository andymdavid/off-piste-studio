import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        work: resolve(__dirname, 'work.html'),
        about: resolve(__dirname, 'about.html'),
        resources: resolve(__dirname, 'resources.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
