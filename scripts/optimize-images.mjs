import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { resolve, extname, basename } from 'path';

const imagesDir = resolve('.', 'public/images');
const quality = 80;

async function convertDir(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  let saved = 0;

  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);

    if (entry.isDirectory()) {
      saved += await convertDir(fullPath);
      continue;
    }

    const ext = extname(entry.name).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

    const originalSize = statSync(fullPath).size;
    const webpPath = fullPath.replace(/\.(png|jpe?g)$/i, '.webp');

    try {
      await sharp(fullPath)
        .webp({ quality })
        .toFile(webpPath);

      const newSize = statSync(webpPath).size;
      const pct = Math.round((1 - newSize / originalSize) * 100);
      const origKB = Math.round(originalSize / 1024);
      const newKB = Math.round(newSize / 1024);
      console.log(`  ${entry.name} → ${basename(webpPath)} (${origKB}KB → ${newKB}KB, -${pct}%)`);
      saved += originalSize - newSize;
    } catch (err) {
      console.warn(`  ⚠ Skipped ${entry.name}: ${err.message}`);
    }
  }

  return saved;
}

console.log('Converting images to WebP...\n');
const totalSaved = await convertDir(imagesDir);
console.log(`\nTotal saved: ${Math.round(totalSaved / 1024 / 1024)}MB`);
