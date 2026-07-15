import { readdirSync, statSync, writeFileSync, existsSync } from 'fs';
import { resolve, basename } from 'path';

const rootDir = resolve('.');
const BASE_URL = 'https://offpistestudio.com';

// ---------------------------------------------------------------------------
// Collect all pages with their metadata
// ---------------------------------------------------------------------------

function getLastmod(filePath) {
  try {
    const stat = statSync(filePath);
    return stat.mtime.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

function scanDir(dirName, contentDirName = null) {
  const dirPath = resolve(rootDir, dirName);
  if (!existsSync(dirPath)) return [];

  return readdirSync(dirPath)
    .filter(f => f.endsWith('.html'))
    .sort()
    .map(f => ({
      slug: basename(f, '.html'),
      dir: dirName,
      lastmod: getLastmod(
        contentDirName && existsSync(resolve(rootDir, contentDirName, `${basename(f, '.html')}.md`))
          ? resolve(rootDir, contentDirName, `${basename(f, '.html')}.md`)
          : resolve(dirPath, f)
      ),
    }));
}

// Core pages (in project root)
const corePages = ['index.html', 'work.html', 'about.html', 'resources.html', 'pricing.html', 'tools.html'];

const entries = [];

// Homepage
entries.push({
  url: BASE_URL + '/',
  lastmod: getLastmod(resolve(rootDir, 'index.html')),
  changefreq: 'daily',
  priority: '1.0',
});

// Other core pages
for (const file of corePages) {
  if (file === 'index.html') continue;
  const filePath = resolve(rootDir, file);
  if (!existsSync(filePath)) continue;
  const slug = basename(file, '.html');
  entries.push({
    url: `${BASE_URL}/${slug}`,
    lastmod: getLastmod(filePath),
    changefreq: 'weekly',
    priority: slug === 'pricing' ? '0.9' : '0.8',
  });
}

function addScannedPages(dirName, pathPrefix, contentDirName, changefreq, priority) {
  for (const page of scanDir(dirName, contentDirName)) {
    entries.push({
      url: `${BASE_URL}/${pathPrefix}/${page.slug}`,
      lastmod: page.lastmod,
      changefreq,
      priority,
    });
  }
}

// Industry pages - priority 0.8
addScannedPages('industries', 'industries', 'content/industries', 'weekly', '0.8');

// Location pages - priority 0.8
addScannedPages('locations', 'locations', 'content/locations', 'weekly', '0.8');

// Tool pages - priority 0.7
for (const page of scanDir('tools')) {
  entries.push({
    url: `${BASE_URL}/tools/${page.slug}`,
    lastmod: page.lastmod,
    changefreq: 'monthly',
    priority: '0.7',
  });
}

// Insights pages - priority 0.6
for (const page of scanDir('insights', 'content/insights')) {
  entries.push({
    url: `${BASE_URL}/insights/${page.slug}`,
    lastmod: page.lastmod,
    changefreq: 'weekly',
    priority: '0.6',
  });
}

// ---------------------------------------------------------------------------
// Generate XML
// ---------------------------------------------------------------------------

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(e => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const outputPath = resolve(rootDir, 'public/sitemap.xml');
writeFileSync(outputPath, xml);
console.log(`Generated sitemap.xml with ${entries.length} URLs -> ${outputPath}`);
