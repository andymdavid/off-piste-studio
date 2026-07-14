---
title: How to Measure AI Search Visibility
slug: how-to-measure-ai-search-visibility
description: A practical framework for measuring how clearly AI search tools understand, mention, cite, and recommend your business.
intro: AI search visibility is a pattern to measure across many signals. The useful work is checking whether answer engines can find your business, describe it accurately, cite credible sources, and send better-informed buyers toward the right next step.
date: 2026-07-13
updatedDate: 2026-07-14
readTime: 13 min read
tags: SEO, AI
cluster: AI Search Visibility
relatedPosts: building-your-website-for-llms, google-sge-and-seo, small-business-seo-guide-2026
---
## Start with the buyer problem

The commercial question is rarely "are we visible in AI?" in the abstract. It's usually sharper than that. A buyer is asking ChatGPT, Perplexity, Google AI Overviews, AI Mode, or another answer engine who they should shortlist. Your business may be omitted, mentioned with thin proof, described in old language, or grouped with competitors that look clearer because their sites explain the offer better.

That makes AI visibility measurement a diagnosis job before it becomes a tools job. A dashboard helps only when the team knows what it's measuring. The aim is to see whether AI systems can find the right evidence, connect it to the buyer problem, and represent the business accurately.

For a service business or professional firm, the audit should answer whether the business is mentioned for the prompts that matter, whether it's cited by name, whether the answer is accurate about services and geography, whether useful pages can be accessed, and whether AI-influenced searches or enquiries look commercially better over time.

That keeps the work grounded and stops the conversation becoming a vague score that moves around every time a model, prompt, location, or source set changes.

## Measure Across Several Signals

Generated answers vary by platform, prompt wording, location, timing, account context, source access, and retrieval method. A single screenshot proves only that something happened once. A stable measurement system needs repeated checks.

Google says its AI Overviews and AI Mode use the same broad Search foundations as the rest of Google Search, with no additional technical requirements, no special AI text files, and no special schema needed for eligibility ([Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)). Google also says AI features can use query fan-out, which means the system may issue multiple related searches across subtopics and data sources before forming an answer ([Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)).

One exact keyword is too narrow. A useful audit measures groups of buyer prompts, related questions, comparison scenarios, local modifiers, and proof-seeking searches. The goal is to see whether the business is consistently findable, accurately represented, and supported by sources a buyer would trust.

Use four measurement levels.

| Level | What it shows | Confidence |
| --- | --- | --- |
| Answer output | What the model said for a prompt on a date | Low to medium |
| Citation and source set | Which pages, brands, and third parties supported the answer | Medium |
| Access and log data | Whether crawlers, referrals, and user-triggered fetches reached the site | Medium to high |
| Commercial signals | Whether branded demand, enquiries, and lead quality changed | High when repeated |

The higher levels are slower to collect, but more useful. Screenshots can start a conversation. Logs, citations, Search Console trends, referral traffic, and enquiry quality help decide what to change.

Dedicated Google reporting now gives teams a stronger Google-specific layer. It works best beside prompts, citations, crawler logs, analytics, and commercial signals.

## Build a prompt set around buyer decisions

Start with prompts a real buyer would use before they know what to buy or who to trust. Keep the set small enough to repeat monthly. A bloated prompt library becomes hard to maintain and easy to over-interpret.

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

Measurement improves when the team records the same fields each time. The audit log should capture the prompt, answer, citations, and likely buyer takeaway.

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
| Google report access | Whether the Search Console property has dedicated generative AI reports available |
| Next action | Fix content, source quality, access, positioning, or tracking |

Visibility tools can help when they track prompts over time. They still need a prompt set that reflects how buyers decide. A neat chart built on weak prompts creates false confidence.

## Separate mentions, citations, and recommendations

A brand mention, a citation, and a recommendation are different signals.

A mention means the system knows the business exists or has seen it in a source. A cited source means the answer is leaning on a page, profile, review, article, or directory. A recommendation means the answer is actively positioning the business as a fit for the buyer's need.

Google reporting can show whether pages appeared in Google's generative AI features. Answer quality still needs prompt checks, citation review, analytics, and sales feedback because the report won't show whether an answer recommended the business with the right proof, described the offer accurately, or sent a qualified buyer.

The gaps matter.

| Result | What it means | Likely fix |
| --- | --- | --- |
| Mentioned with weak support | The brand is known, but the answer lacks a strong supporting source | Improve source-worthy pages, third-party proof, and internal evidence |
| Cited but misrepresented | The source exists, but the page or external profile is unclear or stale | Update service language, page structure, and business profiles |
| Recommended with thin proof | The answer sounds positive but gives the buyer little reason to trust it | Add case studies, reviews, outcomes, process, and author context |
| Competitors cited instead | Other sources explain the category or decision better | Build stronger comparison, service, and proof content |

This is where [AI-ready website foundations](/insights/building-your-website-for-llms) become practical. If an audit shows weak source quality, unclear service pages, blocked crawlers, or thin proof, the fix usually sits in the content system and site structure.

## Check whether AI systems can access the site

If answer engines have limited access to important pages, the audit will keep finding gaps. Check crawlability, indexability, robots.txt, CDN settings, WAF rules, server responses, and whether key pages are available as text.

OpenAI separates its crawlers by job. `OAI-SearchBot` is used for search products, `GPTBot` is used for model training, and `ChatGPT-User` supports user-triggered requests ([OpenAI](https://developers.openai.com/api/docs/bots)). Perplexity also separates `PerplexityBot`, which supports website surfacing in Perplexity search results, from `Perplexity-User`, which handles user-triggered fetches, and it recommends using current published IP ranges when configuring WAF rules ([Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)).

Those distinctions matter because a business may choose different access rules for search visibility, training, and live user retrieval. Treating every AI crawler as one category creates noisy conclusions.

Infrastructure data is more reliable than a one-off answer check. Cloudflare's AI Crawl Control can monitor AI crawler activity, set crawler-level rules, monitor robots.txt compliance, and inspect crawler behaviour through its dashboard ([Cloudflare](https://developers.cloudflare.com/ai-crawl-control/)). Server logs, CDN logs, Search Console, and analytics data can fill in the same picture.

When the audit finds access issues, link the finding to the likely cause. A key service page may be missing from the index. Useful proof may be hidden in images, scripts, PDFs, or inaccessible components. A WAF rule may block a crawler needed for retrieval. robots.txt may allow one class of access while blocking another. The page may load for humans while returning poor text to crawlers. Internal links may also make priority pages harder to discover.

If the issue is structure, the repair may sit with [website design](/services/website-design) alongside content work. If the issue is search interpretation, internal linking, citations, or topic coverage, it belongs in [SEO](/services/seo).

## Use Google data carefully

Google measurement needs its own handling because AI features are part of Search, but the reporting layer has changed.

On 3 June 2026, Google announced dedicated Search Generative AI performance reports in Search Console, including separate views for Search and Discover generative AI features ([Google Search Central Blog](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)). Google said the new reports show impressions, pages, countries, devices for Search results, and dates, with hourly, daily, weekly, and monthly views where available ([Google Search Central Blog](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)).

The access caveat matters. Google said the reports were initially rolling out to a subset of websites, so wait to rebuild reporting assumptions until the Search Console property has access ([Google Search Central Blog](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)).

> Check availability first. If the dedicated reports have not reached your property yet, keep using normal Search Console performance data, manual AI feature checks, prompt audits, analytics, and crawler logs until access appears.

Google's documentation still says pages need normal Search eligibility for AI Overviews and AI Mode. A page must be indexed and eligible to show with a snippet, with no additional technical requirements for those supporting links ([Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)). Google also says sites appearing in AI features are included in overall Search Console traffic in the Web search type ([Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)).

That gives you two useful Google layers. The overall Performance report remains the broad Search trend view. The dedicated generative AI reports, when available, are the better view for Google-specific AI visibility.

| Layer | Shows | Limits |
| --- | --- | --- |
| Search Generative AI reports | Whether URLs appeared in Google's generative AI features, with views such as impressions, pages, countries, devices, and dates | Limited rollout, Google-only, and focused on visibility rather than recommendation quality |
| Manual Google AI feature checks | What AI Overviews or AI Mode actually say for priority queries | Sampled, time-sensitive, and affected by location, account context, and wording |
| Prompt audits across answer engines | Mentions, citations, positioning, and answer quality across buyer questions | Needs a stable prompt set and human judgement |
| Crawler and server logs | Whether search and AI crawlers can reach important pages | Access proves reachability rather than citation, trust, or commercial impact |
| Analytics referrals and branded demand | Whether answer engines, branded searches, or returning visitors are changing | Attribution is partial because many buyers search again or arrive later |
| Lead-quality signals | Whether enquiries are better informed and closer to the right service | Slower to collect and needs sales notes or CRM discipline |

Use the Google report when the question is "are our pages appearing more often in Google's generative AI features?" Use prompt tracking when the question is "does the answer describe and cite us properly?" Use crawler logs when the question is "can the systems access the pages they would need?" Use lead-quality review when the question is "is this visibility helping the right buyers move forward?"

For Google-focused context, read our article on [AI Overviews and SEO](/insights/google-sge-and-seo). The terminology has moved from SGE into AI Overviews and AI Mode, so use current language when reporting or briefing internal teams.

Practical Google checks should focus on branded query movement, comparison topics, local searches, proof-seeking searches, and pages that gain impressions while losing clicks. Look closely at queries where Google compresses generic information into an answer, then compare them with pages that still earn clicks because they add proof, examples, pricing context, or local detail. The wider [small business SEO](/insights/small-business-seo-guide-2026) work still matters because AI reporting sits on top of clear services, useful pages, local relevance, and commercial intent.

The useful question is whether the pages that matter are still being discovered, understood, and chosen across the query groups that influence revenue.

## Look for referral and lead-quality signals

AI visibility reaches beyond a search report. Some buyers click a cited source. Others remember the brand and search later. Some arrive through answer-engine referrals or mention in an enquiry that they already compared providers.

Track signals that show better-informed demand: identifiable referral traffic from answer engines, server log events from AI crawlers and user-triggered fetches, branded search increases after content or PR activity, enquiries that mention specific services or case studies, higher conversion rates on service and proof pages, and sales calls where prospects arrive with better context.

[SparkToro's 2026 zero-click research](https://sparktoro.com/blog/in-2026-less-than-one-third-of-google-searches-still-send-a-click/) is useful context because it reinforces a practical reporting problem. Many search journeys never become a clean organic session, so sessions alone understate visibility and influence. Use that as context, then bring the report back to citations, branded demand, referral quality, and leads.

A site can lose some low-value informational clicks while gaining better-qualified enquiries. Every traffic decline still deserves investigation, but visibility should be judged against the work the website is meant to do: build trust, clarify fit, and help the right buyer take action.

## Keep llms.txt as Supporting Evidence

An `llms.txt` file can clarify priority pages, canonical URLs, service language, and machine-readable context. Keep it in a supporting role while citations, crawler logs, referrals, branded demand, and lead quality do the heavier measurement work.

The evidence is still cautious. Ahrefs analysed 137,189 websites with valid `llms.txt` files and found that 97% received no requests during May 2026 ([Ahrefs](https://ahrefs.com/blog/llmstxt-study/)). Contentful also argues that there is not yet validated evidence that `llms.txt` reliably improves AI citation frequency, referral traffic, or answer inclusion ([Contentful](https://www.contentful.com/blog/llms-txt-search-visibility/)).

For measurement, `llms.txt` belongs in the low-confidence layer. Record whether the file exists, whether it's current, whether it's requested, and whether it points to the strongest pages. Then keep watching actual citations, crawler logs, referrals, branded demand, and lead quality.

Off Piste's own [`llms.txt`](/llms.txt) and [`llms-full.txt`](/llms-full.txt) are examples of support files. They're useful housekeeping alongside crawlable pages, clear service content, structured proof, accessible HTML, and earned authority.

## Turn the audit into fixes

The audit's value is the repair map. Every finding should point to an action.

| Finding | Fix path |
| --- | --- |
| AI tools omit the business for obvious buyer prompts | Strengthen service pages, internal links, topical coverage, and third-party proof |
| Answers describe old positioning | Update site copy, business profiles, structured data, and cited pages |
| Competitors are cited for category explanations | Publish stronger decision content, comparisons, examples, and practical frameworks |
| The business is cited but weakly recommended | Add proof, outcomes, process detail, reviews, and clearer fit signals |
| Important content is hard to parse | Improve headings, semantic HTML, accessible content, and page structure |
| Crawler logs show blocked access | Review robots.txt, WAF rules, CDN settings, and bot-specific controls |
| Dedicated Google generative AI reports are unavailable | Keep manual Google AI feature checks and query-group reporting until the property has access |
| Enquiries are low quality despite mentions | Refine positioning, service boundaries, pricing context, and next steps |

The overlap between accessibility, search, and AI visibility is strongest when structure is the problem. Clear headings, descriptive links, text alternatives, readable content, and logical sections help people and machines understand the same page. Our guide to [website accessibility and SEO](/insights/website-accessibility-and-seo) covers that foundation in more detail.

Some fixes are content-led. Some are technical. Some are positioning decisions that need sharper service language. Measurement stops the team guessing which problem they have.

## Set a review rhythm

Repeat the audit on a cadence the business can maintain. Monthly is enough for most service businesses. Fortnightly can make sense during a launch, repositioning, migration, or active content campaign.

Use the same prompt set, logging fields, and commercial signals. Add new prompts only when buyer behaviour changes or a new service matters. Keep a short notes field for model changes, website updates, PR mentions, reviews, and major search shifts.

Once the dedicated Google report is available, review it on the same cadence. Note any significant reporting changes beside content refreshes, technical releases, PR mentions, reviews, and service-page updates so the trend has context.

Act when the evidence repeats across more than one signal. A single odd answer is a watch item. Repeated omissions, missing citations for priority pages, blocked crawler evidence, and weak enquiries are business problems worth fixing.

The decision rule is simple. Measure prompts to spot the issue. Use citations and source checks to understand the evidence gap. Use crawler logs and analytics to confirm access and demand. Use lead quality to decide whether visibility is moving the right buyers closer.
