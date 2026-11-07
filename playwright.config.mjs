import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  use: { baseURL: process.env.TEST_BASE_URL || 'http://localhost:4321', launchOptions: { args: ['--no-sandbox'] } },
  projects: [
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
  ],
  webServer: process.env.TEST_BASE_URL ? undefined : { command: 'npm run preview -- --port 4321', url: 'http://localhost:4321', reuseExistingServer: true },
});
