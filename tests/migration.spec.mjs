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
  page.on('response', response => { if (new URL(response.url()).hostname === 'localhost' && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  for (const route of ['/', '/about', '/pricing', '/work', '/resources', '/services/website-design', '/locations', '/industries/electricians', '/locations/perth', '/contact', '/insights/website-redesign-checklist', ...['color-palette','color-converter','contrast-checker','brand-color-extractor','favicon-generator','font-pairing','gradient-generator','palette-preview','svg-to-png'].map(tool => `/tools/${tool}`)]) {
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

test('representative layouts fit the viewport in either theme', async ({ page }) => {
  for (const theme of ['light', 'dark']) {
    await page.addInitScript(theme => localStorage.setItem('off-piste-duplicate-theme', theme), theme);
    for (const route of ['/', '/about', '/work', '/pricing', '/resources', '/locations', '/services/website-design', '/industries/electricians', '/locations/perth']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('body')).toHaveAttribute('data-theme', theme);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `${theme} ${route} overflows`).toBe(true);
    }
  }
});

test('contact fallback and booking links are usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto((process.env.TEST_BASE_URL || 'http://localhost:4321') + '/contact');
  await expect(page.getByRole('link', { name: 'hello@offpistestudio.com' }).first()).toHaveAttribute('href', 'mailto:hello@offpistestudio.com');
  await expect(page.getByRole('link', { name: 'Book a discovery call', exact: true })).toHaveAttribute('href', 'https://cal.com/off-piste-studio/discovery');
  await context.close();
});

test('header and site footer preserve the original logo font on all page families', async ({ page }) => {
  for (const theme of ['dark', 'light']) {
    await page.addInitScript(theme => localStorage.setItem('off-piste-duplicate-theme', theme), theme);
    for (const route of ['/', '/about', '/work', '/pricing', '/resources', '/tools', '/tools/color-converter', '/locations', '/locations/perth', '/industries/electricians', '/services/website-design', '/insights/website-redesign-checklist', '/contact']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('footer.footer--current')).toHaveCount(1);
      for (const selector of ['.duplicate-header__brand-text', '.footer__brand-text']) {
        await expect(page.locator(selector)).toBeVisible();
        expect(await page.locator(selector).evaluate(el => getComputedStyle(el).fontFamily)).toContain('Bebas Neue');
      }
      expect(await page.evaluate(() => document.fonts.check('16px "Bebas Neue"'))).toBe(true);
    }
  }
  await page.goto('/');
  await expect(page.locator('.testimonial-feature__author')).toHaveCount(3);
});

test('resources renders articles without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled:false });
  const page = await context.newPage();
  await page.goto((process.env.TEST_BASE_URL || 'http://localhost:4321') + '/resources');
  expect(await page.locator('[data-insights-list] article').count()).toBeGreaterThan(12);
  await expect(page.locator('[data-insights-list] a').first()).toHaveAttribute('href', /^\/insights\//);
  await context.close();
});

test('resources topic filter and show more use pre-rendered cards', async ({ page }) => {
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/resources');
  const cards = page.locator('[data-insights-list] article');
  await expect(cards).toHaveCount(12);
  await page.getByRole('button',{name:/^Show More/}).click();
  expect(await cards.count()).toBeGreaterThan(12);
  await page.locator('[data-insights-filter]').selectOption('Websites & UX');
  expect(await cards.count()).toBeGreaterThan(0);
  for (const data of await cards.evaluateAll(elements => elements.map(el => el.dataset.topics))) expect(JSON.parse(data)).toContain('Websites & UX');
  await page.locator('[data-insights-filter]').selectOption('all');
  await expect(cards).toHaveCount(12);
  expect(requests.some(url => /insights-data|catalogue/.test(url))).toBe(false);
});

test('navigation and homepage FAQ states remain usable', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo({ top:500, behavior:'instant' }));
  await expect(page.locator('.duplicate-header')).toHaveClass(/is-scrolled/);
  const navigation = page.locator('[data-duplicate-nav-toggle]');
  await navigation.click();
  await expect(navigation).toHaveAttribute('aria-expanded','true');
  await expect(page.locator('.duplicate-header')).toHaveClass(/is-open/);
  await page.keyboard.press('Escape');
  await expect(navigation).toHaveAttribute('aria-expanded','false');
  const question = page.locator('details.faq__item').first();
  await question.locator('summary').click();
  await expect(question).toHaveAttribute('open','');
});


test('archived contact modal remains usable', async ({ page }) => {
  await page.goto('/archived-home');
  await page.locator('a[href="/contact"]').first().click();
  await expect(page.locator('.lead-modal')).toBeVisible();
  await page.locator('.lead-modal__close').click();
  await expect(page.locator('.lead-modal')).toBeHidden();
});
