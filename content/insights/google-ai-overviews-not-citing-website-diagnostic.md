---
title: Why Your Website Isn't Cited in Google AI Overviews
slug: google-ai-overviews-not-citing-website-diagnostic
description: Diagnose why an eligible website is absent from Google AI Overview supporting links, then choose the narrowest evidenced repair.
intro: Seeing competitors cited in a Google AI Overview while your website is absent can point to several different problems. This diagnostic separates result variation, eligibility, query fit, source value and business clarity so you can test the cause before changing the site.
author: Lara
date: 2026-08-21
readTime: 10 min read
tags: SEO, AI, Google Search, AI Overviews, AI Mode, Traffic Diagnosis, Technical SEO, Content Strategy
topics: AI & Automation, SEO & Search
cluster: AI Search Visibility / Google Search and AI Overviews
relatedPosts: google-sge-and-seo, google-ai-mode-query-fan-out-content-planning, ai-search-citation-worthy-content
---
<!-- Sources accessed 21 August 2026 in Australia/Perth. Live results vary by query, location, device, account context and time. The Perth example is illustrative. -->
## Start with what the result proves

A business owner searches a question their best page answers. Google shows an AI Overview and links to competitors. Their own website is missing.

That observation establishes one fact. The site wasn't selected as a supporting link in that result. A penalty, indexing defect or authority gap remains unproven. Google calls the linked sources **supporting links**. Buyers and practitioners commonly call them citations.

Google publishes eligibility rules and optimisation guidance. It doesn't publish a deterministic formula that guarantees selection. The useful response is to isolate what you can observe, test plausible explanations and make the smallest repair the evidence supports.

## Establish the result pattern

AI Overviews don't appear for every query. Google also says AI Overviews and AI Mode can use different models and techniques, so responses and links vary. Record the result rather than relying on one screenshot.

For each test, note the exact query and date, market and location, device and sign-in state, AI feature, supporting links, source formats and repeat outcome. Run the same bounded query set across more than one session and device. Separate queries with no AI feature from those where a feature appeared without your site.

A 2026 [longitudinal preprint on Google AI Overviews](https://arxiv.org/abs/2605.14021) shows why sampling matters. Its researchers issued 55,393 trending queries across 19 categories over 40 days and found that activation and source overlap varied across the observed results. The paper is under review and its trending-query sample shouldn't be generalised to every commercial or local search. It supports repeat observation, not a universal benchmark.

For ongoing observation, use a fixed query set and the framework for [measuring AI search visibility](/insights/how-to-measure-ai-search-visibility).

## Check eligibility first

Google's [technical requirements for AI feature supporting links](https://developers.google.com/search/docs/appearance/ai-features) are the first gate. A page must be indexed and eligible to appear in Google Search with a snippet. Google says there are no additional AI-only technical requirements. Meeting those requirements still doesn't guarantee crawling, indexing or selection.

Inspect the exact URL in Search Console. Confirm that Google can crawl it, the intended canonical is selected and the live page returns normally. Check `noindex`, robots rules, redirects and CDN or security controls that could affect Googlebot.

Then inspect snippet eligibility. Google's [snippet-control documentation](https://developers.google.com/search/docs/appearance/snippet) explains that `nosnippet` can prevent a snippet, `max-snippet` can limit its length and `data-nosnippet` can exclude selected text. If a restriction is intentional, revisit [deciding whether to limit AI Overview use](/insights/google-ai-overviews-opt-out-decision-guide).

The current [Search Console generative AI performance report](https://support.google.com/webmasters/answer/16984139?hl=en) reports impressions for AI Overviews and AI Mode by page, country, date and device. Dates use Pacific Time. As at 21 August 2026, Google says access remains limited to a subset of properties and a site may lack enough impressions to see it. An absent report isn't proof of ineligibility.

For the wider mechanics, read [how Google displays AI Overview supporting links](/insights/google-sge-and-seo).

## Test the query-family fit

An eligible page can still be a weak fit for the information retrieved around a question. Google describes query fan-out as issuing related searches across subtopics and data sources. You can't see the private retrieval trace, so inferred subqueries remain a planning hypothesis.

A Perth accounting firm might have a strong page for "business accountant Perth" yet say little about changing structures, payroll obligations, software migration or how buyers should compare firms. A complex question can surface sources that answer those narrower jobs more directly.

Look for unclear page roles, missing supporting questions and useful pages that aren't connected by descriptive links. If coverage is fragmented, use the process for [planning content around AI Mode query fan-out](/insights/google-ai-mode-query-fan-out-content-planning). Don't create a page for every imagined query. Build connected coverage where a buyer needs it.

## Assess the page's source value

Completeness isn't the same as usefulness. A page can cover familiar points and add little that another source hasn't already said.

Google's [guidance for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) recommends valuable, non-commodity content, clear technical structure, accurate business details and relevant media. It says structured data should support the visible page rather than act as special AI markup.

Review what a reader can verify. Useful source material can include original data with a method, named expertise, first-hand examples, primary-source synthesis, dated facts, commercial boundaries and a practical decision method.

Source value is a diagnostic hypothesis, not a guaranteed selection factor. Strengthening generic copy may improve the page without earning a supporting link. Use the framework for [creating defensible evidence worth citing](/insights/ai-search-citation-worthy-content) when the page lacks a distinct, supportable contribution.

## Verify a consistent business identity

Business identity problems are another bounded hypothesis. Review whether organisation names, services, locations, people and contact details agree across the website, Google Business Profile and important third-party references.

Check visible content before markup. Structured data should describe what a visitor can read. If a service page calls the offer "strategic advisory" while profiles and supporting pages use unrelated labels, the business may be harder to connect with a specific buyer need.

Don't treat every variation as an entity defect. Record the inconsistency, correct facts that are genuinely wrong and retest the relevant query group.

## Compare selected sources carefully

Competitor citations sharpen the next test when observation remains separate from speculation.

| Observation | Possible meaning | Next test |
| --- | --- | --- |
| Your page isn't indexed | It fails the eligibility gate | Inspect crawl, canonical and indexing evidence |
| A competitor answers a narrower subtopic | Query-family fit may be weak | Map visible coverage and supporting pages |
| Selected pages contain original evidence | Your page may add limited source value | Compare methods, examples and sourcing |
| Business facts differ across properties | Entity clarity may be weak | Correct confirmed inconsistencies and retest |
| Sources change across runs | Selection is variable | Expand the sample before changing content |

These are possible meanings, not confirmed causes. A selected competitor isn't a template to copy. Its presence doesn't prove that domain authority, schema volume or content length caused selection.

The preprint cited earlier found that some cited domains were absent from co-displayed first-page results. That suggests citation overlap and conventional ranking weren't identical in its sample. Its 55,393 trending queries across 19 categories and 40 days don't reveal Google's formula or predict a local commercial query.

## Choose the narrowest repair

Match the change to the evidenced failure. Repair crawl, canonical, indexing or snippet controls when eligibility fails. Improve page roles and internal links when query-family coverage is disconnected. Use [structuring content for search and AI systems](/insights/structured-content-ai-search-guide) when the visible hierarchy is unclear or markup doesn't match the page.

Strengthen evidence when the page offers a commodity summary. Correct inconsistent business facts when the mismatch is real. Keep measuring when the page is eligible, useful and repeatedly absent but no narrower cause has enough support.

Record the query set, observations, likely failure class, confidence, chosen change and review date. That record prevents a broad rewrite from replacing a testable diagnosis.

## Set the boundary for specialist diagnosis

A page-level issue has a page-level repair. One incorrect canonical, unintended snippet control or missing piece of evidence can often be handled directly.

The boundary changes when several important pages show inconsistent indexing, unclear architecture, weak internal relationships, conflicting business information or the same gap across a valuable query family. Those patterns justify [a deeper SEO diagnosis across pages and technical systems](/services/seo).

End with one documented decision. Name the observed failure class, evidence, narrowest repair and date you will rerun the sample. If the evidence only confirms eligibility and repeated absence, keep selection uncertain and test the next bounded hypothesis.
