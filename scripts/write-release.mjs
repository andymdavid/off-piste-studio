import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]);
const files = [...walk('src'), ...walk('content'), ...walk('scripts'), ...walk('public').filter(f => f !== 'public/sitemap.xml'), 'package.json', 'package-lock.json', 'astro.config.mjs', 'nginx.conf', 'Dockerfile'].sort();
const hash = createHash('sha256');
for (const file of files) hash.update(file).update('\0').update(readFileSync(file)).update('\0');
const manifest = { schema: 1, framework: 'astro', sourceDigest: hash.digest('hex'), builtAt: new Date().toISOString(), pages: walk('dist').filter(f => f.endsWith('.html')).length };
writeFileSync('dist/release.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Release source digest: ${manifest.sourceDigest}`);
