import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';
import { gzipSync } from 'node:zlib';
import assert from 'node:assert/strict';
import { load } from 'cheerio';
const walk = directory => readdirSync(directory,{withFileTypes:true}).flatMap(entry => entry.isDirectory() ? walk(`${directory}/${entry.name}`) : [`${directory}/${entry.name}`]);
function measure(directory,file) {
  const $ = load(readFileSync(`${directory}/${file}`,'utf8'));
  const paths = [...new Set($('link[rel="stylesheet"]').map((_,element) => $(element).attr('href')).get().filter(path => path.startsWith('/')))];
  const external = paths.map(path => {
    const bytes = readFileSync(`${directory}${path}`);
    for (const match of bytes.toString().matchAll(/url\((?:"([^"]+)"|'([^']+)'|([^)]*))\)/g)) {
      const asset = (match[1] || match[2] || match[3]).trim();
      if (asset.startsWith('/') && !asset.startsWith('//')) assert.ok(existsSync(directory+decodeURIComponent(asset.split(/[?#]/)[0])), `Missing CSS asset ${asset} in ${path}`);
    }
    return bytes;
  });
  // Font binaries have a separate budget; do not count base64 assets as CSS rules.
  const fontStyles = $('style[data-critical-fonts]').map((_,element) => $(element).html() || '').get().join('');
  const embeddedFontBytes = [...fontStyles.matchAll(/base64,([A-Za-z0-9+/=]+)/g)].reduce((total,match) => total+Buffer.from(match[1], 'base64').length, 0);
  assert.ok(embeddedFontBytes <= 40000, `${file}: embedded font budget exceeded`);
  if (fontStyles) assert.equal($('body').attr('data-page-type'), 'duplicate-home', `${file}: critical fonts belong only on the homepage`);
  if (fontStyles) assert.equal([...fontStyles.matchAll(/data:font\/woff2;base64,/g)].length, 3, `${file}: expected three embedded font faces`);
  const inline = $('style:not([data-critical-fonts])').map((_,element) => $(element).html() || '').get().map(css => Buffer.from(css));
  return {embeddedFontBytes,type:$('body').attr('data-page-type'),slug:$('body').attr('data-page-slug'),paths,externalBytes:external.reduce((total,bytes) => total+bytes.length,0),inlineBytes:inline.reduce((total,bytes) => total+bytes.length,0),gzipBytes:external.reduce((total,bytes) => total+gzipSync(bytes).length,0)};
}
const baseline = process.env.CSS_BASELINE_DIR;
const report = [];
for (const path of walk('dist').filter(file => file.endsWith('.html'))) {
  const file = path.slice('dist/'.length);
  const current = measure('dist',file);
  if (!current.type) continue; // Preserved industry redirect has no site stylesheet.
  const family = current.type === 'duplicate-home' ? 'home' : current.type;
  const allowed = new Set(['shared','fonts',family]);
  if (family === 'tool') allowed.add(current.slug);
  for (const asset of current.paths) assert.ok(allowed.has(basename(asset).split('.')[0]),`${file} loads unrelated stylesheet ${asset}`);
  const total = current.externalBytes+current.inlineBytes;
  // Includes the restored shared navigation and studio-information panel.
  const budget = family === 'home' ? 185000 : family === 'tool' ? 145000 : family === 'insight' ? 140000 : 135000;
  assert.ok(total <= budget,`${file}: CSS ${total} exceeds ${budget} byte budget`);
  assert.ok(current.paths.length <= (family === 'tool' ? 4 : 2),`${file}: unexpected stylesheet requests`);
  const previous = baseline && existsSync(`${baseline}/${file}`) ? measure(baseline,file) : undefined;
  report.push({route:file === 'index.html' ? '/' : '/'+file.replace(/\.html$/,''),...current,totalBytes:total,...(previous ? {beforeBytes:previous.externalBytes+previous.inlineBytes,beforeGzipBytes:previous.gzipBytes,reduction:1-total/(previous.externalBytes+previous.inlineBytes)} : {})});
}
if (process.env.CSS_REPORT_PATH) writeFileSync(process.env.CSS_REPORT_PATH,JSON.stringify(report,null,2)+'\n');
for (const route of ['/','/about','/work','/pricing','/resources','/insights/how-to-measure-ai-search-visibility','/services/website-design','/tools/color-converter','/tools/font-pairing']) {
  const entry=report.find(page=>page.route===route);
  console.log(`${route}: ${entry.totalBytes} CSS bytes (${entry.externalBytes} external, ${entry.inlineBytes} inline), ${entry.paths.length} stylesheets${entry.embeddedFontBytes ? `, ${entry.embeddedFontBytes} embedded font bytes` : ''}${entry.beforeBytes ? `, ${(entry.reduction*100).toFixed(1)}% less than reference` : ''}`);
}
console.log(`CSS budgets and route-specific bundles verified for ${report.length} site pages. Gzip figures cover external files; inline CSS compresses with its HTML.`);
