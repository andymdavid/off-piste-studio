import { readdirSync, readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';

const rootDir = resolve('.');
const contentDir = resolve(rootDir, 'content/insights');
const outputDir = resolve(rootDir, 'insights');
const failures = [];

for (const filename of readdirSync(contentDir).filter(name => name.endsWith('.md'))) {
  const markdown = readFileSync(resolve(contentDir, filename), 'utf8');
  const expectedVisuals = (markdown.match(/^```insight-visual\s*$/gm) || []).length;
  const expectedModules = (markdown.match(/^```insight-module\s*$/gm) || []).length;
  if (expectedVisuals === 0 && expectedModules === 0) continue;

  const slug = basename(filename, '.md');
  const outputPath = resolve(outputDir, `${slug}.html`);
  let html;

  try {
    html = readFileSync(outputPath, 'utf8');
  } catch {
    failures.push(`${filename}: generated article is missing`);
    continue;
  }

  const renderedVisuals = (html.match(/<figure class="insight-visual\b/g) || []).length;
  const renderedModules = (html.match(/<aside class="insight-module\b/g) || []).length;
  const leakedCodeBlocks = (html.match(/language-insight-visual/g) || []).length;
  const leakedModules = (html.match(/language-insight-module/g) || []).length;

  if (renderedVisuals !== expectedVisuals) {
    failures.push(`${filename}: expected ${expectedVisuals} rendered visual(s), found ${renderedVisuals}`);
  }


  if (renderedModules !== expectedModules) {
    failures.push(`${filename}: expected ${expectedModules} editorial module(s), found ${renderedModules}`);
  }

  if (leakedCodeBlocks > 0) {
    failures.push(`${filename}: ${leakedCodeBlocks} insight visual(s) rendered as code`);
  }

  if (leakedModules > 0) {
    failures.push(`${filename}: ${leakedModules} editorial module(s) rendered as code`);
  }
}

if (failures.length > 0) {
  console.error('Insight visual verification failed:');
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('Insight visual verification passed.');
}
