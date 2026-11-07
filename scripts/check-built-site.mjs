import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { load } from 'cheerio';
import assert from 'node:assert/strict';
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]);
const files = walk('dist').filter(f => f.endsWith('.html'));
const urls = [...readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
for (const url of urls) assert.ok(existsSync(url === '/' ? 'dist/index.html' : `dist${url}.html`), `Sitemap route missing: ${url}`);
for (const file of files) {
  const $ = load(readFileSync(file, 'utf8'));
  assert.ok($('title').text(), `Missing title: ${file}`);
  assert.ok($('link[rel="canonical"]').attr('href'), `Missing canonical: ${file}`);
  for (const el of $('script[src],link[rel="stylesheet"][href],img[src],source[src]').toArray()) {
    const url = $(el).attr('src') || $(el).attr('href');
    if (url?.startsWith('/') && !url.startsWith('//')) assert.ok(existsSync(`dist${decodeURIComponent(url.split('?')[0])}`), `Missing asset ${url} in ${file}`);
  }
  for (const el of $('a[href]').toArray()) {
    const href = $(el).attr('href');
    if (!href?.startsWith('/') || href.startsWith('//')) continue;
    const path = decodeURIComponent(href.split(/[?#]/)[0]);
    assert.ok([path, path + '.html', path + '/index.html'].some(candidate => existsSync('dist' + candidate)), `Broken internal link ${href} in ${file}`);
  }
  for (const el of $('script[type="application/ld+json"]').toArray()) assert.doesNotThrow(() => JSON.parse($(el).html()), `Invalid structured data: ${file}`);
}
for (const file of files) {
  const path = file === 'dist/index.html' ? '/' : file.replace(/^dist/, '').replace(/\.html$/, '');
  if (!['/industries', '/archived-home'].includes(path)) assert.ok(urls.includes(path), `Page missing from sitemap: ${path}`);
}
const resources = load(readFileSync('dist/resources.html', 'utf8'));
assert.ok(resources('[data-insights-list] article').length > 0, 'Resources must include articles without JS');
const home = readFileSync('dist/index.html', 'utf8');
assert.ok(!home.includes('data-hero-distortion'));
assert.ok(!home.includes('fonts.googleapis.com'));
const $home = load(home);
assert.equal($home('#insights-cards article').length, 3, 'Homepage article cards must be present without JS');
assert.ok(!readFileSync('dist/robots.txt', 'utf8').includes('LLMS:'));
console.log(`Verified ${files.length} HTML pages, ${urls.length} sitemap routes, local assets, structured data and homepage performance invariants.`);
