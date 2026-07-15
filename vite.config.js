import { readdirSync, existsSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// Auto-discover generated HTML pages from multiple directories
function discoverPages(dir, prefix = '') {
  const inputs = {}
  const fullPath = resolve(__dirname, dir)

  if (existsSync(fullPath)) {
    readdirSync(fullPath)
      .filter(file => file.endsWith('.html'))
      .forEach(file => {
        const key = prefix + file.replace(/\.html$/, '')
        inputs[key] = resolve(fullPath, file)
      })
  }

  return inputs
}

export default defineConfig({
  server: {
    port: parseInt(process.env.PORT) || 5173,
    host: true,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'archived-home': resolve(__dirname, 'archived-home.html'),
        work: resolve(__dirname, 'work.html'),
        about: resolve(__dirname, 'about.html'),
        resources: resolve(__dirname, 'resources.html'),
        tools: resolve(__dirname, 'tools.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        industries: resolve(__dirname, 'industries.html'),
        locations: resolve(__dirname, 'locations.html'),
        ...discoverPages('insights', 'insight-'),
        ...discoverPages('industries', 'industry-'),
        ...discoverPages('services', 'service-'),
        ...discoverPages('locations', 'location-'),
        ...discoverPages('tools', 'tool-'),
      },
    },
  },
})
