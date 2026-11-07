import { test, expect } from '@playwright/test';

test('both themes persist across navigation and reload', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark');
  await page.locator('[data-theme-toggle]').click();
  await expect(page.locator('body')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('body')).toHaveAttribute('data-theme', 'light');
  await page.goto('/about');
  await expect(page.locator('body')).toHaveAttribute('data-theme', 'light');
  await page.locator('[data-theme-toggle]').click();
  await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark');
  await page.goto('/');
  await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark');
});

test('representative routes and all tools load without JS errors or missing local assets', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.url().startsWith('http://localhost:4321/') && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  for (const route of ['/', '/about', '/pricing', '/work', '/resources', '/services/website-design', '/insights/website-redesign-checklist', ...['color-palette','color-converter','contrast-checker','brand-color-extractor','favicon-generator','font-pairing','gradient-generator','palette-preview','svg-to-png'].map(tool => `/tools/${tool}`)]) {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('[data-theme-toggle]')).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('contrast checker updates its calculation', async ({ page }) => {
  await page.goto('/tools/contrast-checker');
  await page.locator('#text-color').fill('#000000');
  await page.locator('#bg-color').fill('#FFFFFF');
  await expect(page.locator('#contrast-ratio')).toHaveText('21.00:1');
  await page.locator('#text-color').fill('#FFFFFF');
  await expect(page.locator('#contrast-ratio')).toHaveText('1.00:1');
});

test('homepage ships content without WebGL, external fonts or the article catalogue', async ({ page }) => {
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/');
  await expect(page.locator('#insights-cards article')).toHaveCount(3);
  await expect(page.locator('canvas[data-hero-distortion]')).toHaveCount(0);
  await page.evaluate(() => document.fonts.ready);
  expect(requests.some(url => /duplicate-hero-background|fonts.googleapis.com|insights-data/.test(url))).toBe(false);
  expect(await page.locator('.hero-intro__title').evaluate(el => getComputedStyle(el).fontFamily)).toContain('Geist Serif');
});
