import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { markdownDirectory } from './lib/markdown-loader';
import { INSIGHT_TOPICS as topics } from './lib/content.mjs';
const csv = (value: unknown) => typeof value === 'string' ? value.split(',').map(v => v.trim()).filter(Boolean) : [];

const insights = defineCollection({
  // Preserve the existing line-based frontmatter format used by publishing automation.
  loader: markdownDirectory('insights'),
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
const pageSchema = z.object({
  title: z.string().min(1), slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().min(1), intro: z.string().min(1), keywords: z.string().default(''),
  industry: z.string().optional(), location: z.string().optional(), region: z.string().optional(),
  faqs: z.preprocess(v => typeof v === 'string' ? JSON.parse(v) : [], z.array(z.object({ q: z.string(), a: z.string() }))),
  markdown: z.string(),
});
const services = defineCollection({
  loader: markdownDirectory('services'),
  schema: pageSchema,
});
const industries = defineCollection({ loader: markdownDirectory('industries'), schema: pageSchema.extend({ industry: z.string().min(1) }) });
const locations = defineCollection({ loader: markdownDirectory('locations'), schema: pageSchema.extend({ location: z.string().min(1) }) });
export const collections = { insights, services, industries, locations };
