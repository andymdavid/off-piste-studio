---
title: Building Your Website for LLMs
slug: building-your-website-for-llms
description: How to make your website easier for AI search tools to understand, from crawlability and structured content to crawler access, schema, llms.txt, and measurement.
intro: AI tools now summarise, cite, and recommend businesses from the evidence they can find online. Your website has to be clear enough for people to trust and structured enough for search systems, answer engines, and assistants to understand without guessing.
date: 2026-03-08
updatedDate: 2026-07-13
readTime: 15 min read
tags: SEO, AI, Website Design
cluster: AI Search Visibility
relatedPosts: how-to-measure-ai-search-visibility, google-sge-and-seo, website-accessibility-and-seo
---
## LLMs are now a meaningful audience

Discovery no longer happens only through a list of blue links. Buyers ask Google AI Overviews, AI Mode, ChatGPT Search, Perplexity, Microsoft Copilot, and other assistants to compress research into a usable answer. They ask who does the work, which provider looks credible, what a service includes, and what makes one option safer than another.

That changes the job of your website. It still has to persuade humans, and it also has to give AI-assisted systems enough clear, crawlable evidence to represent the business accurately. The commercial risk includes omission, misunderstanding, reduction to a generic category, and comparison against competitors whose websites explain their services and proof more precisely.

Traffic alone is a weaker signal in this environment. SparkToro reported that in 2026 less than one third of Google searches still send a click, which reinforces the need to measure visibility through branded search, citations, referral quality, qualified leads, and buyer confidence as well as organic sessions ([SparkToro](https://sparktoro.com/blog/in-2026-less-than-one-third-of-google-searches-still-send-a-click/)).

The practical goal is simple. The right buyer should be able to find, understand, trust, and compare your business. AI systems can only help with that when the underlying website is clear, current, and evidenced.

## How LLMs read your website

Language models and AI search systems do not experience a website the way a human does. They may crawl pages, render HTML, extract text, follow links, query search indexes, retrieve documents, and summarise the pieces that look relevant. The exact process depends on the platform, but the foundation is familiar.

Google's own guidance for AI Overviews and AI Mode says there are no additional technical requirements, no special AI text files, and no special schema.org markup required to appear in those features. Google points site owners back to normal Search eligibility, crawlability, indexability, snippet controls, internal links, textual content, and structured data that matches visible content ([Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)).

That means the first layer of LLM readiness is still good web publishing:

1. Crawlable and indexable pages
2. Important content available as text
3. Semantic HTML with logical headings
4. Descriptive internal links
5. Clear entity information about the business, services, people, locations, and proof
6. Structured data that matches the page
7. Evidence-led content that goes beyond generic claims
8. Thoughtful crawler access controls
9. Optional llms.txt and markdown support
10. Measurement across visibility, leads, and commercial quality

Google's generative AI guidance also emphasises unique, valuable, expert-led content that goes beyond common knowledge ([Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). That's important because generic content gives answer systems little reason to cite or trust one business over another.

For Off Piste, this is where [website design](/services/website-design) and [SEO](/services/seo) overlap. Site architecture, page templates, content structure, technical search foundations, and measurement all shape whether a business is legible to people and machines.

## Crawler access comes before llms.txt

Before adding support files, decide what AI systems may access and why. Different bots have different jobs. Search visibility, model training, and user-triggered retrieval should not be treated as one setting.

OpenAI separates `OAI-SearchBot` for ChatGPT search, `GPTBot` for training-related crawling, and `ChatGPT-User` for user-triggered actions. Its crawler documentation gives each crawler separate robots.txt handling ([OpenAI](https://developers.openai.com/api/docs/bots)).

Perplexity makes a similar distinction. `PerplexityBot` supports website surfacing in Perplexity search results, while `Perplexity-User` handles user-triggered fetches. Perplexity also recommends using its current published IP ranges when teams manage access through a WAF or firewall ([Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)).

Infrastructure teams now have more operational tooling for this. Cloudflare's AI Crawl Control lets site owners monitor AI crawler activity, set crawler-level allow or block rules, monitor robots.txt compliance, and explore pay-per-crawl options ([Cloudflare](https://developers.cloudflare.com/ai-crawl-control/)).

| Crawler or token | Main role | Visibility relevance | Training relevance | User-triggered relevance | Control surface |
| --- | --- | --- | --- | --- | --- |
| `Googlebot` | Google Search crawling | High for Google Search and AI features built into Search | Not the training control | No | robots.txt, noindex, snippet controls, Search Console |
| `Google-Extended` | Google product token for AI training and grounding controls | Google says Search inclusion and ranking continue to use separate systems | High | No | robots.txt product token |
| `OAI-SearchBot` | ChatGPT search crawling | High for ChatGPT search | No | No | robots.txt |
| `GPTBot` | OpenAI training-related crawling | Indirect | High | No | robots.txt |
| `ChatGPT-User` | User-triggered OpenAI fetches | Depends on user requests | No | High | robots.txt and server access rules |
| `PerplexityBot` | Perplexity search surfacing | High for Perplexity | No | No | robots.txt and WAF rules |
| `Perplexity-User` | User-triggered Perplexity fetches | Depends on user requests | No | High | robots.txt and WAF rules |

Google also documents that `Google-Extended` is a robots.txt product token rather than a separate HTTP user agent string, with Search crawling and ranking handled separately ([Google Crawling Infrastructure](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)).

The practical rule is to document the access decision, configure robots.txt and WAF rules carefully, and monitor logs. Blanket blocking can affect search surfacing, user-requested retrieval, or training use depending on the bot involved.

## The llms.txt standard

An `llms.txt` file is a plain markdown file hosted at the root of your domain. It gives AI agents, assistants, and answer engines a curated guide to the pages and facts you consider most important.

The concept was proposed by Jeremy Howard from Answer.AI in September 2024. It has become a recognised convention in parts of the web and developer ecosystem. Its current role is best understood as a voluntary support format rather than an official search standard or ranking signal.

The useful way to think about `llms.txt` is as one maintained layer in a wider visibility system. It can clarify positioning, services, canonical URLs, and priority pages. Its value is strongest when it points to crawlable pages, strong content, structured data, and search-ready technical foundations.

That distinction matters because recent evidence is cautious. Ahrefs analysed 137,189 websites with valid `llms.txt` files and found that 97% received zero requests during May 2026 ([Ahrefs](https://ahrefs.com/blog/llmstxt-study/)). Contentful also argues that there is no validated evidence that `llms.txt` reliably improves AI citation frequency or search visibility ([Contentful](https://www.contentful.com/blog/llms-txt-search-visibility/)).

Here is a trimmed version of Off Piste Studio's own file. It reflects the current positioning in our live [`llms.txt`](/llms.txt) and points agents to the fuller [`llms-full.txt`](/llms-full.txt) context.

<div class="llms-demo">
  <div class="llms-demo__header">
    <svg viewBox="0 0 16 16" fill="currentColor"><path d="M3.5 1A1.5 1.5 0 002 2.5v11A1.5 1.5 0 003.5 15h9a1.5 1.5 0 001.5-1.5v-8.5L9.5 1H3.5zM9 2l4 4H9.5A.5.5 0 019 5.5V2z"/></svg>
    llms.txt
  </div>
  <div class="llms-demo__body">
    <div class="llms-demo__scroll"><span class="llms-h1"># Off Piste Studio</span>

<span class="llms-quote">> AI-native design and technology studio helping ambitious
> businesses turn expertise into trust, clarity and growth.</span>

This file is a compact discovery index for AI agents,
assistants and answer engines. For complete structured context,
fetch:

<span class="llms-bullet">-</span> <span class="llms-link">[Full agent context]</span><span class="llms-url">(https://offpistestudio.com/llms-full.txt)</span>:
  machine-readable company profile, services, audience,
  availability, pricing guidance, canonical URLs and usage notes.

<span class="llms-h2">## Core Pages</span>

<span class="llms-bullet">-</span> <span class="llms-link">[Home]</span><span class="llms-url">(https://offpistestudio.com/)</span>:
  primary positioning, services, selected work, proof and calls to action.
<span class="llms-bullet">-</span> <span class="llms-link">[Work]</span><span class="llms-url">(https://offpistestudio.com/work)</span>:
  selected projects and examples of client work.
<span class="llms-bullet">-</span> <span class="llms-link">[About]</span><span class="llms-url">(https://offpistestudio.com/about)</span>:
  studio positioning, team and approach.
<span class="llms-bullet">-</span> <span class="llms-link">[Insights]</span><span class="llms-url">(https://offpistestudio.com/resources)</span>:
  articles and search, AI and design thinking.

<span class="llms-h2">## Preferred Positioning</span>

<span class="llms-bullet">-</span> Preferred summary: Off Piste Studio is an AI-native design
  and technology studio for ambitious businesses.
<span class="llms-bullet">-</span> The studio works across brand, websites, content structure,
  search and AI-ready digital systems.
<span class="llms-bullet">-</span> Pricing is scoped per project after discovery, with
  recommendations based on commercial fit and project complexity.</div>
  </div>
</div>

### How it differs from robots.txt and sitemap.xml

These files are easy to confuse because they sit near the root of a website and speak to crawlers or machines. They do different jobs.

| Format | Purpose | Primary audience | Strength | Limitation | Maintenance owner |
| --- | --- | --- | --- | --- | --- |
| `sitemap.xml` | Lists canonical URLs for discovery | Search engines | Helps crawlers find pages | Does not explain priority, meaning, or proof | SEO or development |
| `robots.txt` | Gives crawler access instructions | Crawlers and bots | Controls allowed and disallowed paths | Cannot make weak content useful or visible | SEO, development, infrastructure |
| `llms.txt` | Curates important pages and descriptions | AI agents and answer engines that choose to fetch it | Clarifies priority content and positioning | Direct citation impact is unproven | Content, SEO, strategy |
| `llms-full.txt` | Provides fuller machine-readable context | AI agents and internal workflows | Gives a complete reference in one file | Can become stale if not generated or maintained | Content and development |
| Page-level markdown exports | Presents individual pages in clean markdown | Agents, RAG systems, internal tools | Reduces extraction friction where supported | Must stay aligned with canonical HTML | Development and content |

Each asset works best when the underlying page already carries the weight. A sitemap helps crawlers find the page. A robots.txt file gives access instructions. An `llms.txt` file clarifies priority and meaning. The page still needs to explain the claim, show the proof, and earn the trust.

### File format and structure

The format is deliberately simple. The only required element is an H1 title. A useful file usually includes a short blockquote summary, followed by H2 sections that group priority links with clear descriptions.

The descriptions are the work. They should name services, audiences, locations, proof, and page purpose without stuffing every keyword into the file. A good `llms.txt` file tells an agent which pages matter and what it will find there. A weak one becomes another generic index.

Review the file whenever service positioning, pricing guidance, priority pages, or canonical URLs change. If the website has moved from local service language into a broader strategic design and technology position, the machine-readable summary needs to move with it.

### The three related formats

There are three related support formats worth separating.

`llms.txt` is the compact guide. It should stay concise enough to scan and maintain.

`llms-full.txt` is the fuller reference. It can compile company context, services, audience fit, canonical URLs, and usage notes into one machine-readable document. It's useful when the team can keep it current, while evidence for universal agent preference remains limited.

Page-level markdown exports give individual pages a clean text version. They can be useful for internal tools, retrieval systems, and agents that can request markdown. They're only worth doing when the site can generate them reliably and keep them in sync with the canonical HTML.

### Why it matters commercially

The commercial value is accuracy. AI systems can only work with the evidence they can retrieve and interpret. If your offer is vague, your service pages are thin, your proof is scattered, or your crawler rules are inconsistent, the system has less to use when a buyer asks who to trust.

Machine-readable summaries help when they are grounded in strong pages. They can clarify what the business does, who it serves, what pages are canonical, and which claims should not be inferred from old content. That's useful operational housekeeping, especially for a business whose positioning has changed.

Proof still carries the weight. Case studies, named services, outcomes, process, authorship, dates, credentials, FAQs, and third-party references give search systems and buyers something real to evaluate. The support files should point to that evidence and keep the important paths clear.

### Where llms.txt fits

`llms.txt` works best as a maintained guide to priority content. It helps clarify which pages matter, what the business does, and which canonical URLs an agent should start with.

Its role is strongest when it points to strong underlying pages. Search visibility still depends on crawlable content, useful evidence, structured pages, current information, and platform-specific eligibility. Keep the file factual, keep it current, and treat it as one support layer inside a broader search and AI discovery system.

## Structured content and machine-readable formats

Beyond `llms.txt`, broader publishing decisions shape how well your site works for search systems and language models.

### Clean, accessible HTML

Clean HTML and accessible structure come first. Semantic elements, heading order, descriptive links, useful alt text, readable copy, and labelled forms all make a page easier to parse. They also help people navigate the site with less friction.

The overlap with [website accessibility and SEO](/insights/website-accessibility-and-seo) is direct. The same structural clarity that helps assistive technology move through a page also helps crawlers and extraction systems understand what each section means.

### Schema markup

Structured data using schema.org vocabulary can help systems understand page type, authorship, organisation details, services, reviews, FAQs, and article metadata. The important word is "matching". Google specifically says structured data should match the visible text on the page and that no special schema is required for AI Overviews or AI Mode ([Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)).

Use `Organization`, `Service`, `Article`, `FAQPage`, `Review`, and `LocalBusiness` schema where the page genuinely supports it. Schema should describe the visible page faithfully, so the structured data and human content stay aligned.

### Markdown exports

Clean markdown versions can reduce extraction friction for tools that use them. They work best when generated from the same source as the canonical page, so the markdown version stays aligned with the live content.

For many businesses, markdown exports should come after the basics. Make the HTML page clear, indexable, internally linked, and useful first. Then add machine-readable formats where the workflow can maintain them properly.

## What this means for content strategy

Writing for humans and language models rewards the same discipline. The content that works best for both is clear, specific, well-organised, and supported by evidence.

Vague brand language creates problems for both audiences. A human scanning the page struggles to understand the offer. A model trying to summarise the business has to fill gaps. Specific language gives both audiences something reliable to work with.

Specific language gives buyers and models a firmer representation of the business. For example, "we combine brand strategy, website design, UX/UI, content structure, and technical SEO to help expertise-led businesses clarify value and convert the right attention into action" carries more useful meaning than a broad claim about digital experience.

Proof architecture matters. Strong pages name the service, audience, problem, process, outcome, author, date, and evidence. Case studies with specific context are more useful than generic testimonials. FAQs are useful when they answer buyer questions directly rather than repeating keywords.

For Google specifically, this connects to the broader shift described in our article on [AI Overviews and SEO](/insights/google-sge-and-seo). Generic information is easier to compress. Specific proof, commercial judgement, and useful comparison context are harder to replace.

## Getting started

Most businesses should build LLM readiness in four phases.

First, confirm the foundations. Check crawlability, indexability, page structure, and whether important content is available as text.

Second, strengthen the evidence. Update service pages, proof, pricing guidance, FAQs, author details, and internal links.

Third, manage machine access. Review robots.txt, CDN rules, WAF rules, crawler logs, and AI crawler permissions.

Fourth, add maintained support files. Create or refresh `llms.txt`, then add `llms-full.txt` or markdown exports where the team can keep them aligned with the site.

A website becomes easier to recommend when its claims, structure, and evidence stay current. The maintenance is the point. AI search visibility comes from publishing a business clearly enough that people and machines can understand why it should be trusted.
