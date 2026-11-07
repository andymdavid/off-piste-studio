import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://offpistestudio.com',
  output: 'static',
  build: { format: 'file' },
  server: { host: true, port: Number(process.env.PORT) || 5173, allowedHosts: ['.otherstuff.ai'] },
});
