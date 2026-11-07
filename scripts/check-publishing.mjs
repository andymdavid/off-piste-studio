import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { load } from 'cheerio';

const slug = 'astro-publishing-smoke-test';
const families = ['insights', 'services', 'industries', 'locations'];
// Deliberately use a filename different from slug: URLs follow validated frontmatter.
const source = family => `content/${family}/astro-publishing-fixture.md`;
const output = family => `dist/${family}/${slug}.html`;
const title = revision => `Publishing ${revision} & <review> "fixture"`;
const build = () => {
  try { return execFileSync('npm', ['run', 'build'], { stdio:'pipe', maxBuffer:16*1024*1024 }); }
  catch (error) { process.stderr.write(error.stdout || ''); process.stderr.write(error.stderr || ''); throw error; }
};
const fixture = (family, revision) => `---
title: ${title(revision)}
slug: ${slug}
description: Publishing ${revision} & <review> metadata.
intro: Temporary fixture removed before this script exits.
date: 2099-01-01
updatedDate: 2099-01-0${revision}
readTime: 1 min read
tags: Website Design
topics: Websites & UX
industry: Publishing
location: Publishing
region: WA
faqs: [{"q":"Does publishing work?","a":"Revision ${revision} & <review>."}]
---
## Publishing revision ${revision}

This is temporary verification content.
`;
const assertPublished = revision => {
  const sitemap = readFileSync('dist/sitemap.xml','utf8');
  for (const family of families) {
    const $ = load(readFileSync(output(family),'utf8'));
    assert.equal($('main h1').text(), title(revision), `${family} title did not update`);
    assert.ok($('main').text().includes(`Publishing revision ${revision}`));
    assert.equal($('link[rel="canonical"]').attr('href'), `https://offpistestudio.com/${family}/${slug}`);
    const schema = JSON.parse($('script[type="application/ld+json"]').html());
    const entity = schema['@graph'][0];
    assert.equal(entity.description, `Publishing ${revision} & <review> metadata.`);
    assert.ok(sitemap.includes(`/${family}/${slug}</loc>`));
    assert.ok(!existsSync(`${family}/${slug}.html`), 'Build must not write legacy source HTML');
  }
  const home = load(readFileSync('dist/index.html','utf8'));
  const resources = load(readFileSync('dist/resources.html','utf8'));
  assert.equal(home(`a[href="/insights/${slug}"] h3`).text(),title(revision));
  assert.equal(resources(`a[href="/insights/${slug}"] h3`).text(),title(revision));
  const hub = load(readFileSync('dist/locations.html','utf8'));
  assert.equal(hub(`a[href="/locations/${slug}"]`).text(),'Publishing');
  assert.ok(JSON.stringify(JSON.parse(hub('script[type="application/ld+json"]').html())).includes(`/locations/${slug}`));
  const articleSchema = JSON.parse(load(readFileSync(output('insights'),'utf8'))('script[type="application/ld+json"]').html());
  assert.equal(articleSchema['@graph'][0].dateModified,`2099-01-0${revision}`);
  assert.ok(sitemap.includes(`<lastmod>2099-01-0${revision}</lastmod>`));
};
for (const family of families) assert.ok(!existsSync(source(family)), 'Fixture must not overwrite content');
const duplicate = 'content/insights/astro-publishing-duplicate.md';
assert.ok(!existsSync(duplicate));
try {
  for (const family of families) writeFileSync(source(family),fixture(family,1));
  build();
  assertPublished(1);
  for (const family of families) writeFileSync(source(family),fixture(family,2));
  build();
  assertPublished(2);
  writeFileSync(duplicate,fixture('insights',2));
  assert.throws(() => execFileSync('npm',['run','build'],{stdio:'pipe',maxBuffer:16*1024*1024}), error => /Duplicate slug in insights/.test(error.stdout?.toString() + error.stderr?.toString()), 'Duplicate slugs must fail rather than silently replace content');
} finally {
  for (const path of [...families.map(source),duplicate]) if (existsSync(path)) unlinkSync(path);
  build();
}
for (const family of families) assert.ok(!existsSync(output(family)), `${family}: deleted route remains`);
for (const file of ['index.html','resources.html','locations.html','sitemap.xml']) assert.ok(!readFileSync(`dist/${file}`,'utf8').includes(slug),`${file}: deleted content remains`);
console.log('Publishing passed: create, edit, delete in all four collections; homepage/resources/location hub/sitemap/schema updates; duplicate-slug rejection; no legacy HTML writes.');
