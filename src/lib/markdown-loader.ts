import type { Loader } from 'astro/loaders';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// The publishing format is deliberately line-based, not YAML. Astro's glob
// Markdown parser would reinterpret existing unquoted values (colons, JSON FAQs).
export function markdownDirectory(name: string): Loader {
  const directory = new URL(`../../content/${name}/`, import.meta.url);
  const basePath = fileURLToPath(directory);
  return {
    name: `off-piste-${name}`,
    async load({ store, parseData, generateDigest, watcher, logger, config }) {
      const sync = async () => {
        const files = (await readdir(directory)).filter(file => file.endsWith('.md') && file !== 'README.md').sort();
        const ids = new Set<string>();
        const entries = [];
        for (const file of files) {
          const url = new URL(file, directory);
          const source = await readFile(url, 'utf8');
          const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
          if (!match) throw new Error(`Missing frontmatter: ${name}/${file}`);
          const fields: Record<string,string> = {};
          for (const line of match[1].split(/\r?\n/)) {
            const separator = line.indexOf(':');
            if (separator !== -1) fields[line.slice(0,separator).trim()] = line.slice(separator+1).trim();
          }
          const id = fields.slug || file.slice(0,-3);
          if (ids.has(id)) throw new Error(`Duplicate slug in ${name}: ${id}`);
          ids.add(id);
          const filePath = relative(fileURLToPath(config.root),fileURLToPath(url)).replaceAll('\\','/');
          const data = await parseData({id,data:{...fields,markdown:match[2]},filePath});
          entries.push({id,data,filePath,digest:generateDigest(source)});
        }
        // Validate every entry before replacing the store; remove stale IDs on
        // deletion or slug changes, including during local development.
        store.clear();
        for (const entry of entries) store.set(entry);
      };
      await sync();
      if (watcher) {
        watcher.add(basePath);
        let pending = Promise.resolve();
        const reload = (path: string) => {
          if (dirname(path) !== basePath.replace(/[\\/]$/,'') || !path.endsWith('.md') || path.endsWith('/README.md')) return;
          pending = pending.then(sync).then(() => { logger.info(`Reloaded ${name}`); }).catch(error => { logger.error(error.message); });
        };
        watcher.on('add',reload).on('change',reload).on('unlink',reload);
      }
    },
  };
}
