---
title: AI Crawler Access and Robots.txt Guide for Business Websites
slug: ai-crawler-access-robots-txt-guide
description: A practical guide to AI crawler access, robots.txt, WAF rules, CDN logs, and validation checks for business websites.
intro: AI crawler access is now a practical website decision. The useful question is which crawler does which job, what your business wants from that access, and how to check that robots.txt, CDN settings, WAF rules, and logs all tell the same story.
date: 2026-07-14
readTime: 14 min read
tags: SEO, AI, Technical SEO, Website Design
cluster: AI Search Visibility
relatedPosts: building-your-website-for-llms, how-to-measure-ai-search-visibility, google-sge-and-seo
---
## AI crawler access is now a website decision

Business websites are being read by more than traditional search crawlers. ChatGPT, Perplexity, Google AI features, AI assistants, SEO tools, research bots, and user-triggered fetchers may all touch the site in different ways.

That creates a real operating question. Should you allow AI crawlers, block them, monitor them, or set different rules for different jobs?

For most service businesses, the best answer is a named policy. Search crawlers, training crawlers, and user-triggered fetchers do different work. A crawler that helps a page surface in an answer engine serves a different purpose from one used for model training. A user-triggered fetch is different again.

Crawler access also sits inside a wider set of [AI-ready website foundations](/insights/building-your-website-for-llms). A page still needs clear content, crawlable HTML, useful internal links, accessible structure, current evidence, and strong service language. Access can make retrieval possible. Citation, ranking, recommendation, traffic, and leads still depend on relevance, evidence, and trust.

## Search crawlers, training crawlers, and user-triggered fetchers do different jobs

OpenAI's crawler documentation separates `OAI-SearchBot`, `GPTBot`, and `ChatGPT-User`. `OAI-SearchBot` is used for search products. `GPTBot` is used for training-related crawling. `ChatGPT-User` supports certain user actions in ChatGPT and Custom GPTs, and OpenAI says it is not used for automatic web crawling or to determine whether content may appear in Search. OpenAI also says site owners should use `OAI-SearchBot` in robots.txt for managing Search opt-outs and automatic crawl, while user-triggered `ChatGPT-User` requests may not follow robots.txt in the same way because they are initiated by a user. Those distinctions come from the current [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots), checked on 14 July 2026.

Perplexity makes a similar split. `PerplexityBot` supports surfacing websites in Perplexity search results. `Perplexity-User` supports user actions inside Perplexity and is not used for web crawling or training. Perplexity also publishes IP address sources and says WAF configurations should use the current official endpoints as the source of truth. That guidance is in the current [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers), checked on 14 July 2026.

These differences matter commercially. A business that blocks all AI user agents may also block the fetchers that answer a buyer's live question. A business that allows everything without a policy may permit training access it never intended. A clean robots.txt file can also be undermined by a WAF rule that blocks the same crawler at the infrastructure layer.

## Google AI visibility still starts with normal Search eligibility

Google needs separate handling because Google AI Overviews and AI Mode are part of Google Search.

Google says pages are eligible for AI Overviews and AI Mode through normal Search eligibility. A page needs to be indexed and eligible to show with a snippet. Google also says there are no additional technical requirements, no special schema.org structured data, and no new AI text files required to appear in those features. That is the current position in [Google's AI features and your website documentation](https://developers.google.com/search/docs/appearance/ai-features), checked on 14 July 2026.

Technical setup still matters. It's familiar Search work. Googlebot needs access to crawl and index useful pages. Important content needs to be visible in the page. Snippet controls need deliberate settings. Structured data should match the visible content and support standard Search understanding.

`Google-Extended` is a different control. Google describes it as a product token for controlling whether site content may help improve certain Google AI products. Treat it separately from Googlebot, Google Search indexing, and AI Overview eligibility. For broader Google context, see our guide to [Google AI search context](/insights/google-sge-and-seo). Its original title still references SGE, but the practical issue now is AI Overviews and AI Mode.

## How to decide what to allow, block, or monitor

The decision depends on the business model, content sensitivity, visibility goals, and operational capacity.

Most service businesses want to be found when a buyer asks an AI system for options, explanations, comparisons, or local recommendations. For those businesses, cautious openness usually makes sense for search crawlers and user-triggered retrieval, with more deliberate decisions around training crawlers.

Rights-sensitive publishers, paid research businesses, media companies, course platforms, and organisations with valuable proprietary content may need a more restrictive policy. That choice goes beyond SEO. It can involve licensing, copyright, contracts, and commercial strategy. Get specialist advice where those issues matter.

Treat this matrix as a decision prompt, not a universal policy.

| Crawler | Purpose | Allow when | Caution | Visibility | Training | Validate |
| --- | --- | --- | --- | --- | --- | --- |
| `Googlebot` | Google Search crawling | You want pages indexed for Search and Google AI features | Pages are private, duplicate, thin, or unsuitable for Search | Direct for Google Search eligibility | Separate from training opt-outs | Search Console, server logs |
| `Google-Extended` | Google AI product token | You allow eligible Google AI product improvement use | You want to limit use in those Google AI products | Separate from Search indexing | Direct policy role for covered Google AI use | robots.txt review |
| `OAI-SearchBot` | ChatGPT search crawling | You want ChatGPT search systems to access public pages | Content is unsuitable for ChatGPT search | Enables access for search retrieval | No | robots.txt, logs, WAF events |
| `GPTBot` | OpenAI training-related crawling | You allow training-related crawling | You want to restrict training access | Separate from ChatGPT Search | Yes | robots.txt, logs |
| `ChatGPT-User` | User-triggered OpenAI fetches | You want pages reachable when a user asks ChatGPT to fetch them | Pages are sensitive or unsuitable for live retrieval | Depends on user prompts | No | logs, IP verification, WAF events |
| `PerplexityBot` | Perplexity search surfacing | You want visibility in Perplexity search results | Content is unsuitable for Perplexity results | Enables Perplexity surfacing | No | robots.txt, Perplexity IPs, logs |
| `Perplexity-User` | User-triggered Perplexity fetches | You want Perplexity users to retrieve public pages | Pages are sensitive or blocked for live retrieval | Depends on user prompts | No | logs, official IP endpoints, WAF events |

The commercial decision is simple enough to write down. Which public pages should answer engines be able to retrieve? Which pages should remain private or excluded? Which training uses are acceptable? Who owns the review when platform documentation changes?

## What robots.txt can control

Robots.txt is the public place to state crawler preferences. It helps well-behaved crawlers understand which paths and user agents they may access. It is also easy to get wrong.

User-agent specificity matters. A rule for `GPTBot` leaves `OAI-SearchBot` untouched. A rule for `PerplexityBot` leaves `Perplexity-User` to its own documented behaviour. `Google-Extended` is a product token rather than a Googlebot replacement. If the policy treats these controls as interchangeable, the file will be misleading.

Here is an example policy. Treat it as a pattern, not a recommendation for every business.

```txt
# Normal Google Search crawling
User-agent: Googlebot
Allow: /

# ChatGPT search access
User-agent: OAI-SearchBot
Allow: /

# OpenAI training-related crawling
User-agent: GPTBot
Disallow: /

# User-triggered OpenAI fetches
User-agent: ChatGPT-User
Allow: /

# Perplexity search surfacing
User-agent: PerplexityBot
Allow: /

# User-triggered Perplexity fetches
User-agent: Perplexity-User
Allow: /

# Google AI product token
User-agent: Google-Extended
Disallow: /

# Default rule for other crawlers
User-agent: *
Allow: /
```

The example separates search visibility, training access, user-triggered retrieval, and Google AI product controls. A different business could make different choices.

Robots.txt is a directive for crawlers that choose to comply. Private content still needs authentication. AI answer inclusion still depends on the system's judgement. Weak pages, missing proof, confusing service language, inaccessible content, and thin internal links still need content and technical work.

For content to be useful after access is granted, the page still needs [crawlable and machine-readable website structure](/insights/website-accessibility-and-seo). Clean HTML, logical headings, descriptive links, and text-based evidence make the crawler access decision worth something.

## CDN and WAF rules need the same policy logic

Many access problems live in the hosting stack rather than robots.txt.

A CDN, firewall, bot protection product, rate limit, challenge page, geo rule, or managed WAF rule can block a crawler even when robots.txt allows it. A marketing team may think the site is open because the file says `Allow: /`, while the infrastructure quietly rejects the user agent or IP range.

Cloudflare's AI Crawl Control documentation says the product can monitor which AI services access content, set allow or block rules for individual crawlers, monitor robots.txt compliance, and inspect crawler activity. Cloudflare also describes use cases for publishers, ecommerce sites, business sites, and documentation sites in its [AI Crawl Control documentation](https://developers.cloudflare.com/ai-crawl-control/), checked on 14 July 2026.

The implementation question for a developer or hosting provider is concrete.

- Does the WAF challenge or block the named user agent?
- Are official IP ranges being used where the platform publishes them?
- Are bot rules different for HTML pages, assets, APIs, and support files?
- Are important service pages returning a normal `200` response to allowed crawlers?
- Are blocked events logged in a way the SEO or marketing team can review?
- Does the rule still work after the CDN or security product updates?

This is where [technical SEO and AI search readiness](/resources) overlaps with [website design and technical implementation](/work). The policy is only useful when the site architecture and infrastructure enforce it accurately.

## llms.txt is a supporting clarity file

An `llms.txt` file can help clarify priority pages, service language, canonical URLs, and business context for systems that choose to read it. It is low-cost when the site already has a clean content model and a reliable generation workflow.

Treat it as a context file rather than the primary access-control mechanism. Crawlers still need robots.txt, WAF rules, and normal page access controls. Google Search eligibility still comes from indexed, snippet-eligible pages. An answer engine still decides whether the site is worth citing.

Google's generative AI guidance says Google Search does not use `llms.txt` or other special AI text files for Search visibility, including generative AI capabilities. Google also says creating such files for other systems will neither help nor harm a site's Google Search visibility. That current guidance appears in [Google's generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), checked on 14 July 2026.

The broader evidence is cautious too. In June 2026, the [Ahrefs llms.txt study](https://ahrefs.com/blog/llmstxt-study/) analysed 137K domains using Ahrefs Web Analytics and found that 97% of valid `llms.txt` files received zero requests in May 2026. Contentful's [llms.txt visibility analysis](https://www.contentful.com/blog/llms-txt-search-visibility/) argues that there is no widely validated evidence that the file reliably improves AI citation frequency, referral traffic, or inclusion in generated answers.

That makes `llms.txt` a supporting experiment. Keep it factual, useful, and current if you publish it. Measure whether anyone fetches it. Use it alongside crawlable pages, strong evidence, internal links, schema that matches visible content, and platform-specific access controls.

## How to check whether AI crawlers can actually reach the site

The strongest proof comes from several checks together. One prompt result is too noisy. One robots.txt review is too thin. One log event only proves one request.

Use this validation sequence.

| Check | What it proves | Limits |
| --- | --- | --- |
| robots.txt review | The published crawler preference for named bots | Whether the crawler obeyed it or reached the page |
| WAF or CDN events | Whether infrastructure allowed, challenged, or blocked a request | Whether the page was useful or cited |
| Server logs | Whether a user agent requested a URL and what response it received | Whether the bot was legitimate without IP verification |
| Official IP checks | Whether the request aligns with published ranges where available | Whether the crawler will use the page in an answer |
| Search Console | Whether Google can crawl, index, and report eligible pages | How non-Google answer engines interpret the page |
| Prompt and citation tests | Whether answers mention, cite, or describe the business | Whether access caused the result |
| Analytics and enquiry review | Whether referrals, branded demand, or lead quality changed | Full attribution across zero-click journeys |

When you [measure whether AI systems can find and cite your content](/insights/how-to-measure-ai-search-visibility), keep access as one layer in the audit. Ask whether the right systems could reach the right evidence, then check whether that changed how the business is represented.

For WAF rules, prefer official IP ranges where the platform publishes them. Perplexity explicitly recommends using its current official JSON endpoints for WAF configurations. OpenAI also publishes IP address files for its crawlers. Keep those ranges tied to the source endpoints because they can change.

## Crawler access needs routine review

Crawler documentation changes. User agents change. New answer engines appear. CDN and WAF products update their managed rules. A business may become more open to AI search retrieval or more protective of training use as its content library grows.

Review the policy quarterly, after a redesign, after a hosting move, after a major content launch, and whenever crawler documentation changes in a way that affects your rules.

Keep the maintenance practical.

- Confirm robots.txt still reflects the business policy.
- Check whether named crawlers have changed user-agent strings or IP guidance.
- Review WAF and CDN logs for blocked or challenged allowed crawlers.
- Test important service pages, proof pages, and articles.
- Check Search Console for Google crawl, indexing, and generative AI reporting where available.
- Run a small prompt and citation audit against priority buyer questions.
- Update `llms.txt` only if the underlying pages or positioning changed.

The practical takeaway is simple. A business can choose which doors to open and still avoid blocking useful discovery by accident. The right policy names the crawler, understands the job, checks the infrastructure, and measures what happens next.
