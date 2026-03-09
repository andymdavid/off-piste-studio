import { readdirSync, existsSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'

const insightInputs = {}
const insightsDir = resolve(__dirname, 'insights')

if (existsSync(insightsDir)) {
  readdirSync(insightsDir)
    .filter(file => file.endsWith('.html'))
    .forEach(file => {
      insightInputs[file.replace(/\.html$/, '')] = resolve(insightsDir, file)
    })
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        work: resolve(__dirname, 'work.html'),
        about: resolve(__dirname, 'about.html'),
        resources: resolve(__dirname, 'resources.html'),
        contact: resolve(__dirname, 'contact.html'),
        ...insightInputs,
      },
    },
  },
})
