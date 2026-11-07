import { test, expect } from '@playwright/test';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const image = async () => sharp({ create: { width: 64, height: 32, channels: 3, background: '#ff0000' } }).png().toBuffer();

test('colour converter synchronises formats and restores its URL', async ({ page }) => {
  await page.goto('/tools/color-converter');
  await page.locator('#hex-input').fill('#00ff00');
  await expect(page.locator('#rgb-r')).toHaveValue('0');
  await expect(page.locator('#rgb-g')).toHaveValue('255');
  await expect(page.locator('#rgb-b')).toHaveValue('0');
  await expect(page).toHaveURL(/color=00ff00/i);
  await page.reload();
  await expect(page.locator('#rgb-g')).toHaveValue('255');
});

test('palette generation preserves a locked colour and exports CSS', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/tools/color-palette?colors=ff0000,00ff00,0000ff,ffffff,000000');
  await expect(page.locator('.palette-slot')).toHaveCount(5);
  const first = page.locator('.palette-slot__hex').first();
  const original = await first.inputValue();
  await page.locator('.palette-slot__lock').first().click();
  await page.locator('#generate-btn').click();
  await expect(first).toHaveValue(original);
  await page.locator('#palette-copy-css').click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('--');
});

test('palette preview applies colour and switches templates', async ({ page }) => {
  await page.goto('/tools/palette-preview');
  await page.locator('[data-role="primary"] .preview-color-input__text').fill('#123456');
  await page.locator('[data-role="primary"] .preview-color-input__text').press('Tab');
  await expect.poll(() => page.locator('#preview-frame').evaluate(el => el.style.getPropertyValue('--preview-primary'))).toBe('#123456');
  const next = page.locator('button[data-template]').last();
  await next.click();
  await expect(next).toHaveClass(/is-active/);
  await page.locator('#preview-reset').click();
  await expect.poll(() => page.locator('#preview-frame').evaluate(el => el.style.getPropertyValue('--preview-primary').toLowerCase())).toBe('#f37021');
});

test('gradient controls and PNG/SVG downloads work', async ({ page }) => {
  await page.goto('/tools/gradient-generator');
  const before = await page.locator('.gradient-stop').count();
  await page.locator('#add-stop').click();
  await expect(page.locator('.gradient-stop')).toHaveCount(before + 1);
  await page.locator('#gradient-type').selectOption('radial');
  await expect(page.locator('#gradient-css')).toContainText('radial-gradient');
  for (const type of ['png', 'svg']) {
    const download = page.waitForEvent('download');
    await page.locator(`#download-${type}`).click();
    const file = await download;
    expect(file.suggestedFilename()).toBe(`gradient.${type}`);
    const bytes = await readFile(await file.path());
    if (type === 'png') expect((await sharp(bytes).metadata()).format).toBe('png');
    else expect(bytes.toString()).toContain('<svg');
  }
});

test('SVG conversion produces a PNG at requested dimensions', async ({ page }) => {
  await page.goto('/tools/svg-to-png');
  await page.locator('#tab-paste').click();
  await page.locator('#svg-code').fill('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="32"><rect width="64" height="32" fill="red"/></svg>');
  await page.locator('#load-svg-btn').click();
  await expect(page.locator('#workspace')).toBeVisible();
  await page.locator('#output-width').fill('128');
  await expect(page.locator('#output-height')).toHaveValue('64');
  const download = page.waitForEvent('download');
  await page.locator('#download-btn').click();
  const metadata = await sharp(await readFile(await (await download).path())).metadata();
  expect(metadata.width).toBe(128);
  expect(metadata.height).toBe(64);
});

test('favicon upload generates six sizes and downloads a valid PNG', async ({ page }) => {
  await page.goto('/tools/favicon-generator');
  await page.locator('#file-input').setInputFiles({ name: 'test.png', mimeType: 'image/png', buffer: await image() });
  await expect(page.locator('.favicon-card')).toHaveCount(6);
  await expect(page.locator('#snippet-code')).toContainText('apple-touch-icon');
  const download = page.waitForEvent('download');
  await page.locator('.favicon-card__download').first().click();
  const metadata = await sharp(await readFile(await (await download).path())).metadata();
  expect(metadata.width).toBe(16);
  expect(metadata.height).toBe(16);
});

test('brand colour extraction produces a palette and a usable refine link', async ({ page }) => {
  await page.goto('/tools/brand-color-extractor');
  await page.locator('#file-input').setInputFiles({ name: 'red.png', mimeType: 'image/png', buffer: await image() });
  await expect(page.locator('#extractor-results')).toBeVisible();
  await expect(page.locator('.palette-card').first()).toBeVisible();
  await page.locator('#refine-link').click();
  await expect(page).toHaveURL(/\/tools\/color-palette\?colors=/);
  await expect(page.locator('.palette-slot')).toHaveCount(5);
});

test('font selection produces a preview and export snippets', async ({ page }) => {
  await page.goto('/tools/font-pairing');
  await page.locator('#font-search').fill('Playfair');
  await page.locator('[data-font="Playfair Display"]').click();
  await page.locator('.pairing-card__preview-btn').first().click();
  await expect(page.locator('#font-preview-area')).toBeVisible();
  await expect(page.locator('#export-link-code')).toContainText('fonts.googleapis.com');
  await expect(page.locator('#export-css-code')).toContainText('Playfair Display');
});
