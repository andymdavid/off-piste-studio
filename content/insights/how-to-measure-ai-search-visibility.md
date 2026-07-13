---
title: How to Measure AI Search Visibility
slug: how-to-measure-ai-search-visibility
description: A practical framework for measuring how clearly AI search tools understand, mention, cite, and recommend your business.
intro: AI search visibility is a pattern to measure across many signals. The useful work is checking whether answer engines can find your business, describe it accurately, cite credible sources, and send better-informed buyers toward the right next step.
date: 2026-07-13
readTime: 13 min read
tags: SEO, AI
---
## Start with the buyer problem

The commercial question is rarely "are we visible in AI?" in the abstract. It is usually sharper than that. A buyer is asking ChatGPT, Perplexity, Google AI Overviews, AI Mode, or another answer engine who they should shortlist. Your business may be omitted, mentioned with thin proof, described in old language, or grouped with competitors that look clearer because their sites explain the offer better.

That makes AI visibility measurement a diagnosis job before it becomes a tools job. A dashboard can be useful, but only if the team already knows what it is trying to measure. The aim is to understand whether AI systems can find the right evidence, connect it to the right buyer problem, and represent the business in a way that would help a real person make a decision.

For a service business or professional firm, the audit should answer five questions.

- Are we mentioned for the prompts that matter?
- Are we cited by name or only described indirectly?
- Is the answer accurate about our services, geography, proof, and fit?
- Can the relevant crawlers and retrieval systems access our useful pages?
- Do AI-influenced visits, searches, and enquiries look commercially better over time?

Those questions keep the work grounded. They also stop the conversation becoming a vague score that moves around every time a model, prompt, location, or source set changes.

## Measure More Than One Score

Generated answers vary by platform, prompt wording, location, timing, account context, source access, and the way each system retrieves information. A single screenshot is evidence that something happened once. A stable measurement system needs repeated checks.

Google says its AI Overviews and AI Mode use the same broad Search foundations as the rest of Google Search, with no additional technical requirements, no special AI text files, and no special schema needed for eligibility ([Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)). Google also says AI features can use query fan-out, which means the system may issue multiple related searches across subtopics and data sources before forming an answer ([Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)).

That matters for measurement. One exact keyword is too narrow. A useful audit measures groups of buyer prompts, related questions, comparison scenarios, local modifiers, and proof-seeking searches. The goal is a practical pattern that shows whether the business is consistently findable, accurately represented, and supported by sources that would make a buyer trust the answer.

Use four measurement levels.

| Level | What it shows | Confidence |
| --- | --- | --- |
| Answer output | What the model said for a prompt on a date | Low to medium |
| Citation and source set | Which pages, brands, and third parties supported the answer | Medium |
| Access and log data | Whether crawlers, referrals, and user-triggered fetches reached the site | Medium to high |
| Commercial signals | Whether branded demand, enquiries, and lead quality changed | High when repeated |

The higher levels are slower to collect, but they are more useful. Screenshots can start a conversation. Logs, citations, Search Console trends, referral traffic, and enquiry quality help decide what to change.

## Build a prompt set around buyer decisions

Start with prompts a real buyer would use before they know what to buy, who to trust, or which questions to ask. Keep the prompt set small enough to repeat monthly. A bloated prompt library becomes hard to maintain and easy to over-interpret.

Use six groups.

| Prompt type | Example prompt | What to watch |
| --- | --- | --- |
| Navigational | "What does [business name] do?" | Accuracy, old positioning, wrong services |
| Commercial | "Who helps [audience] with [service]?" | Mentions, competitors, service fit |
| Local | "Best [service] studio for [location] businesses" | Geography, local proof, local competitors |
| Comparison | "[Business] vs [competitor] for [need]" | Differentiation, proof, positioning |
| Diagnostic | "Why is my [problem] not converting leads?" | Whether your expertise is connected to the problem |
| Proof-seeking | "Show examples of [business] work or results" | Case studies, reviews, cited sources |

Run each prompt across the platforms that matter for your buyers. For some businesses that means ChatGPT, Perplexity, Google AI Overviews, AI Mode, and Microsoft Copilot. For others, Google plus one answer engine is enough.

Test more than the brand name. Branded prompts show whether the system understands you. Unbranded and comparison prompts show whether it considers you before the buyer has chosen you.

## Record what the answer actually does

Measurement improves when the team records the same fields each time. The audit log should capture what was asked, what was answered, what was cited, and what a buyer would take away.

| Field | Record |
| --- | --- |
| Platform | ChatGPT, Perplexity, Google, Copilot, or another tool |
| Date | The day the prompt was run |
| Prompt | Exact wording used |
| Brands named | Your business and competitors mentioned |
| Sources cited | Pages, third-party sites, directories, reviews, or no citation |
| Accuracy | Correct, partly correct, wrong, or missing |
| Service fit | Whether the answer links you to the right work |
| Geography | Locations named or implied |
| Proof | Case studies, reviews, credentials, examples, or claims |
| Sentiment | Positive, neutral, cautious, or negative |
| Evidence gap | What the answer needed but could not find |
| Next action | Fix content, source quality, access, positioning, or tracking |

This is where a visibility tool can help, especially if it tracks prompts over time. The tool is still only useful if the prompt set reflects how buyers actually decide. A neat chart built on weak prompts creates false confidence.

## Separate mentions, citations, and recommendations

A brand mention, a citation, and a recommendation are different signals.

A mention means the system knows the business exists or has seen it in a source. That can be useful, but it may not be enough to influence a shortlist. A cited source means the answer is leaning on a page, profile, review, article, or directory. A recommendation means the answer is actively positioning the business as a fit for the buyer's need.

The gaps matter.

| Result | What it means | Likely fix |
| --- | --- | --- |
| Mentioned with weak support | The brand is known, but the answer lacks a strong supporting source | Improve source-worthy pages, third-party proof, and internal evidence |
| Cited but misrepresented | The source exists, but the page or external profile is unclear or stale | Update service language, page structure, and business profiles |
| Recommended with thin proof | The answer sounds positive but gives the buyer little reason to trust it | Add case studies, reviews, outcomes, process, and author context |
| Competitors cited instead | Other sources explain the category or decision better | Build stronger comparison, service, and proof content |

This is also where [AI-ready website foundations](/insights/building-your-website-for-llms) become practical. If an audit shows weak source quality, unclear service pages, blocked crawlers, or thin proof, the fix usually sits in the content system and site structure beyond the measurement tool.

## Check whether AI systems can access the site

If answer engines have limited access to important pages, the visibility audit will keep finding gaps that need technical investigation as well as content work. Check crawlability, indexability, robots.txt, CDN settings, WAF rules, server responses, and whether key pages are available as text.

OpenAI separates its crawlers by job. `OAI-SearchBot` is used for search products, `GPTBot` is used for model training, and `ChatGPT-User` supports user-triggered requests ([OpenAI](https://developers.openai.com/api/docs/bots)). Perplexity also separates `PerplexityBot`, which supports website surfacing in Perplexity search results, from `Perplexity-User`, which handles user-triggered fetches, and it recommends using current published IP ranges when configuring WAF rules ([Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)).

Those distinctions matter because a business may choose different access rules for search visibility, training, and live user retrieval. Treating every AI crawler as one category can create noisy conclusions.

Infrastructure data is more reliable than a one-off answer check. Cloudflare's AI Crawl Control can monitor AI crawler activity, set crawler-level rules, monitor robots.txt compliance, and inspect crawler behaviour through its dashboard ([Cloudflare](https://developers.cloudflare.com/ai-crawl-control/)). Similar checks can come from server logs, CDN logs, Search Console, and analytics data.

When the audit finds access issues, link the measurement finding to the likely cause.

- A key service page is not indexed
- Useful proof is hidden in images, scripts, PDFs, or inaccessible components
- A WAF rule blocks a crawler needed for retrieval
- robots.txt allows one class of access but blocks another
- The page loads for humans but returns poor text to crawlers
- Internal links make priority pages hard to discover

If the issue is structure, the repair may sit with [website design](/services/website-design) alongside content work. If the issue is search interpretation, internal linking, citations, or topic coverage, it belongs in [SEO](/services/seo).

## Use Google data carefully

Google measurement needs its own handling because Google AI features sit inside Search rather than in a clean standalone report. Google says sites appearing in AI Overviews and AI Mode are included in overall Search Console traffic, specifically within the Performance report's Web search type ([Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)).

Use Search Console as broad Search performance data, not as a dedicated AI Overview tracker. Watch query groups, landing pages, impressions, clicks, country, device, and topic-level movement. Pair it with manual AI feature checks, analytics, and lead data.

For Google-focused context, read our article on [AI Overviews and SEO](/insights/google-sge-and-seo). The terminology has moved from SGE into AI Overviews and AI Mode, so use current language when reporting or briefing internal teams.

Practical Google checks include:

- Branded query movement for the business name, founders, products, and services
- Impressions and clicks for comparison, local, and proof-seeking topics
- Landing pages that gain impressions but lose clicks
- Queries where Google compresses generic information into an answer
- Pages that still earn clicks because they add proof, examples, pricing context, or local detail

The useful question is whether the pages that matter are still being discovered, understood, and chosen across the query groups that influence revenue.

## Look for referral and lead-quality signals

AI visibility reaches beyond a search report. Some buyers will click a cited source. Others will remember the brand and search later. Some will arrive through referrals from answer engines. Some will mention in an enquiry that they already compared providers before contacting you.

Track the signals that show better-informed demand.

- Referral traffic from answer engines where analytics can identify it
- Server log events from AI crawlers and user-triggered fetches
- Branded search increases after content or PR activity
- Enquiries that mention specific services, case studies, articles, or comparison questions
- Higher conversion rates on service and proof pages
- Sales calls where prospects arrive with better context

This is where the commercial view matters. A site can lose some low-value informational clicks while gaining better-qualified enquiries. Every traffic decline still deserves investigation, and visibility should be judged against the work the website is meant to do, which is build trust, clarify fit, and help the right buyer take action.

## Place llms.txt in the low-confidence layer

An `llms.txt` file can be useful as a maintained support asset. It can clarify priority pages, canonical URLs, service language, and machine-readable context. Keep it in a supporting role while citations, crawler logs, referrals, branded demand, and lead quality do the heavier measurement work.

The evidence is still cautious. Ahrefs analysed 137,189 websites with valid `llms.txt` files and found that 97% received no requests during May 2026 ([Ahrefs](https://ahrefs.com/blog/llmstxt-study/)). Contentful also argues that there is not yet validated evidence that `llms.txt` reliably improves AI citation frequency, referral traffic, or answer inclusion ([Contentful](https://www.contentful.com/blog/llms-txt-search-visibility/)).

For measurement, that puts `llms.txt` in the low-confidence layer. Record whether the file exists, whether it is current, whether it is requested, and whether it points to the strongest pages. Then keep watching actual citations, crawler logs, referrals, branded demand, and lead quality.

Off Piste's own [`llms.txt`](/llms.txt) and [`llms-full.txt`](/llms-full.txt) are examples of support files. They are useful housekeeping alongside crawlable pages, clear service content, structured proof, accessible HTML, and earned authority.

## Turn the audit into fixes

The value of the audit is the repair map. Every finding should point to an action type.

| Finding | Fix path |
| --- | --- |
| AI tools omit the business for obvious buyer prompts | Strengthen service pages, internal links, topical coverage, and third-party proof |
| Answers describe old positioning | Update site copy, business profiles, structured data, and cited pages |
| Competitors are cited for category explanations | Publish stronger decision content, comparisons, examples, and practical frameworks |
| The business is cited but weakly recommended | Add proof, outcomes, process detail, reviews, and clearer fit signals |
| Important content is hard to parse | Improve headings, semantic HTML, accessible content, and page structure |
| Crawler logs show blocked access | Review robots.txt, WAF rules, CDN settings, and bot-specific controls |
| Enquiries are low quality despite mentions | Refine positioning, service boundaries, pricing context, and next steps |

The overlap between accessibility, search, and AI visibility is strongest when structure is the problem. Clear headings, descriptive links, text alternatives, readable content, and logical page sections help people and machines understand the same page. Our guide to [website accessibility and SEO](/insights/website-accessibility-and-seo) covers that foundation in more detail.

Some fixes are content-led. Some are technical. Some are positioning decisions that need sharper service language. Measurement is useful because it stops the team guessing which kind of problem they have.

## Set a review rhythm

Repeat the audit on a cadence the business can maintain. Monthly is enough for most service businesses. Fortnightly can make sense during a launch, repositioning, technical migration, or active content campaign.

Use the same prompt set, the same logging fields, and the same commercial signals. Add new prompts only when buyer behaviour changes or a new service matters. Keep a short notes field for model changes, website updates, PR mentions, new reviews, and major search shifts.

Act when the evidence repeats across more than one signal. A single odd answer is a watch item. A repeated omission across buyer prompts, missing citations for priority pages, blocked crawler evidence, and weak enquiries is a business problem worth fixing.

The decision rule is simple. Measure prompts to spot the issue. Use citations and source checks to understand the evidence gap. Use crawler logs and analytics to confirm access and demand. Use lead quality to decide whether the visibility is helping the right buyers move closer to you.
