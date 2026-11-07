import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { load } from 'cheerio';
import assert from 'node:assert/strict';
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]);
const files = walk('dist').filter(f => f.endsWith('.html'));
const urls = [...readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
for (const url of urls) assert.ok(existsSync(url === '/' ? 'dist/index.html' : `dist${url}.html`), `Sitemap route missing: ${url}`);
for (const file of files) {
  const $ = load(readFileSync(file, 'utf8'));
  assert.ok($('title').text(), `Missing title: ${file}`);
  assert.ok($('link[rel="canonical"]').attr('href'), `Missing canonical: ${file}`);
  const originalPath = file.replace(/^dist\//, '');
  if (existsSync(originalPath)) {
    const original = load(readFileSync(originalPath, 'utf8'));
    assert.equal($('title').text(), original('title').text(), `Title changed: ${file}`);
    assert.equal($('link[rel="canonical"]').attr('href'), original('link[rel="canonical"]').attr('href'), `Canonical changed: ${file}`);
    assert.equal($('meta[name="description"]').attr('content'), original('meta[name="description"]').attr('content'), `Description changed: ${file}`);
    assert.deepEqual($('main h1').map((_, e) => $(e).text().trim()).get(), original('main h1').map((_, e) => original(e).text().trim()).get(), `Heading changed: ${file}`);
  }
  for (const el of $('script[src],link[rel="stylesheet"][href],img[src],source[src]').toArray()) {
    const url = $(el).attr('src') || $(el).attr('href');
    if (url?.startsWith('/') && !url.startsWith('//')) assert.ok(existsSync(`dist${decodeURIComponent(url.split('?')[0])}`), `Missing asset ${url} in ${file}`);
  }
  for (const el of $('script[type="application/ld+json"]').toArray()) assert.doesNotThrow(() => JSON.parse($(el).html()), `Invalid structured data: ${file}`);
}
const home = readFileSync('dist/index.html', 'utf8');
assert.ok(!home.includes('data-hero-distortion'));
assert.ok(!home.includes('fonts.googleapis.com'));
const $home = load(home);
assert.equal($home('#insights-cards article').length, 3, 'Homepage article cards must be present without JS');
assert.ok(!readFileSync('dist/robots.txt', 'utf8').includes('LLMS:'));
console.log(`Verified ${files.length} HTML pages, ${urls.length} sitemap routes, local assets, structured data and homepage performance invariants.`);
