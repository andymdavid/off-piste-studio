import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
const slug = 'astro-publishing-smoke-test';
const source = `content/insights/${slug}.md`;
const legacy = `insights/${slug}.html`;
assert.ok(!existsSync(source) && !existsSync(legacy), 'Publishing fixture must not overwrite existing content');
const build = () => execFileSync('npm', ['run', 'build'], { stdio: 'pipe', maxBuffer: 16 * 1024 * 1024 });
try {
  writeFileSync(source, `---\ntitle: Publishing smoke test\nslug: ${slug}\ndescription: Temporary publishing compatibility verification.\nintro: Temporary fixture removed before this script exits.\ndate: 2099-01-01\nreadTime: 1 min read\ntags: Website Design\ntopics: Websites & UX\n---\n## Publishing works\n\nThis is temporary verification content.\n`);
  build();
  assert.ok(readFileSync(`dist/insights/${slug}.html`, 'utf8').includes('Publishing works'));
  assert.ok(readFileSync('dist/index.html', 'utf8').includes(`/insights/${slug}`));
  assert.ok(readFileSync('dist/sitemap.xml', 'utf8').includes(`/insights/${slug}`));
} finally {
  if (existsSync(source)) unlinkSync(source);
  if (existsSync(legacy)) unlinkSync(legacy);
  build();
}
assert.ok(!existsSync(`dist/insights/${slug}.html`), 'Deleted content must disappear from the release');
assert.ok(!readFileSync('dist/index.html', 'utf8').includes(`/insights/${slug}`));
assert.ok(!readFileSync('dist/sitemap.xml', 'utf8').includes(`/insights/${slug}`));
console.log('Publishing round trip passed: new article, homepage cards, sitemap and deletion cleanup.');
