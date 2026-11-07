import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { readdir, readFile } from 'node:fs/promises';

const topics = ['AI & Automation', 'SEO & Search', 'Content & Brand', 'Websites & UX', 'Growth & Leads', 'Small Business'];
const csv = (value: unknown) => typeof value === 'string' ? value.split(',').map(v => v.trim()).filter(Boolean) : [];

const directoryLoader = (name: string) => async () => {
    const directory = new URL(`../content/${name}/`, import.meta.url);
    const files = (await readdir(directory)).filter(f => f.endsWith('.md') && f !== 'README.md');
    return Promise.all(files.map(async file => {
      const source = await readFile(new URL(file, directory), 'utf8');
      const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
      if (!match) throw new Error(`Missing frontmatter: ${file}`);
      const data: Record<string, string> = {};
      for (const line of match[1].split(/\r?\n/)) {
        const separator = line.indexOf(':');
        if (separator !== -1) data[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
      }
      return { ...data, id: data.slug || file.slice(0, -3), markdown: match[2] };
    }));
  };

const insights = defineCollection({
  // Preserve the existing line-based frontmatter format used by publishing automation.
  loader: directoryLoader('insights'),
  schema: z.object({
    title: z.string().min(1), slug: z.string().regex(/^[a-z0-9-]+$/),
    description: z.string().min(1), intro: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updatedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    readTime: z.string().min(1),
    tags: z.preprocess(csv, z.array(z.string())),
    topics: z.preprocess(csv, z.array(z.string().refine(v => topics.includes(v))).min(1).max(2)),
    relatedPosts: z.preprocess(csv, z.array(z.string())),
    cluster: z.string().optional(), image: z.string().optional(), imageAlt: z.string().optional(),
    markdown: z.string(),
  }),
});
const services = defineCollection({
  loader: directoryLoader('services'),
  schema: z.object({
    title: z.string().min(1), slug: z.string().regex(/^[a-z0-9-]+$/),
    description: z.string().min(1), intro: z.string().min(1), keywords: z.string().default(''),
    faqs: z.preprocess(v => typeof v === 'string' ? JSON.parse(v) : [], z.array(z.object({ q: z.string(), a: z.string() }))),
    markdown: z.string(),
  }),
});
export const collections = { insights, services };
