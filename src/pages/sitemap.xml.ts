import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  // Static Astro routes and validated collections are the only route sources.
  const pages = Object.keys(import.meta.glob('./**/*.astro'))
    .filter(path => !path.includes('[') && !['./archived-home.astro','./industries.astro'].includes(path))
    .map(path => path === './index.astro' ? '/' : path.replace(/^\.\//,'/').replace(/\.astro$/,''));
  const entries = pages.map(path => ({path,lastmod:undefined as string | undefined}));
  for (const section of ['insights','services','industries','locations'] as const) {
    for (const {data} of await getCollection(section)) entries.push({path:`/${section}/${data.slug}`,lastmod:'date' in data ? data.updatedDate || data.date : undefined});
  }
  const escape = (value: string) => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.sort((a,b) => a.path.localeCompare(b.path)).map(({path,lastmod}) => `  <url><loc>${escape(new URL(path,site).href)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>\n`;
  return new Response(xml, {headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
