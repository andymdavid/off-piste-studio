import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const base = new URL(process.argv[2] || 'http://localhost:8087');
const expected = JSON.parse(readFileSync('dist/release.json', 'utf8'));
const response = await fetch(new URL('/release.json', base), { cache: 'no-store' });
assert.equal(response.status, 200);
assert.equal((await response.json()).sourceDigest, expected.sourceDigest, 'Hosted source digest must match the tested build');
for (const [path, target] of [['/tools/color-palette.html?colors=ff0000,00ff00', '/tools/color-palette?colors=ff0000,00ff00'], ['/keyword-strategy-report', '/resources']]) {
  const result = await fetch(new URL(path, base), { redirect: 'manual' });
  assert.equal(result.status, 301);
  const destination = new URL(result.headers.get('location'), base);
  assert.equal(destination.protocol, base.protocol, 'Redirect must retain HTTPS behind the proxy');
  assert.equal(destination.pathname + destination.search, target);
}
const sitemap = await (await fetch(new URL('/sitemap.xml', base))).text();
const paths = [...sitemap.matchAll(/<loc>https:\/\/offpistestudio.com([^<]+)<\/loc>/g)].map(m => m[1]);
let next = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (next < paths.length) {
    const path = paths[next++];
    const result = await fetch(new URL(path, base));
    assert.equal(result.status, 200, `Published route must resolve: ${path}`);
    await result.arrayBuffer();
  }
}));
assert.equal((await fetch(new URL('/does-not-exist-astro-check', base))).status, 404);
const home = await fetch(base);
assert.match(home.headers.get('cache-control') || '', /no-cache/);
const html = await home.text();
const asset = html.match(/(?:src|href)="(\/_astro\/[^\"]+\.(?:js|css))"/)[1];
assert.match((await fetch(new URL(asset, base))).headers.get('cache-control') || '', /immutable/);
console.log(`Hosted release verified: source digest, ${paths.length} routes, scheme/query-preserving redirects, 404 and cache policies.`);
