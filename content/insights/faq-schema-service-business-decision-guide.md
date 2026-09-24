---
title: Should Service Businesses Keep FAQ Schema
slug: faq-schema-service-business-decision-guide
description: A current decision guide for keeping, simplifying or removing FAQPage markup after Google retired FAQ rich results.
intro: Google has retired FAQ rich results. Service businesses now need to weigh the value of visible answers, the validity of FAQPage vocabulary and the cost of maintaining the markup before deciding what stays.
author: Lara
date: 2026-09-25
readTime: 10 min read
tags: FAQ Schema, FAQPage, Structured Data, Google Rich Results, Schema Markup Maintenance, Technical SEO, Content Governance
topics: SEO & Search, AI & Automation
cluster: AI Search Visibility / Structured Content and Schema
relatedPosts: structured-content-ai-search-guide, schema-markup-priorities-service-business, structured-data-schema-audit-guide
---
<!--
Primary sources checked 25 September 2026 in Australia/Perth:
- Google Search Central, Latest documentation updates.
- Google Search Central, Search appearance documentation.
- Google Search Central, General structured data guidelines.
- Google Search Central, Introduction to structured data markup.
- Google Search Central Blog, Changes to HowTo and FAQ rich results, 8 August 2023.
- Google Search Central, QAPage structured data documentation.
- Schema.org, FAQPage.

Editorial boundaries:
- Google feature support, Schema.org vocabulary validity and the value of visible FAQ content are separate decisions.
- No ranking, rich-result, AI-citation or answer-engine benefit is claimed for FAQPage markup.
- Keep decisions require a named consumer or a clear, proportionate operational reason.
- The review sequence is Off Piste editorial guidance, not a Google requirement.
-->

## The FAQ rich-result promise has ended

Google stopped showing FAQ rich results on 7 May 2026. Its [Search documentation update log](https://developers.google.com/search/updates) recorded the deprecation on 8 May and the removal of the feature documentation on 15 June. The [current Search appearance documentation](https://developers.google.com/search/docs/appearance) no longer lists FAQ as a supported search feature.

That change removes the strongest reason many service businesses funded FAQ schema. Adding `FAQPage` markup no longer makes a page eligible for a Google FAQ rich result because that result has retired. A proposal that still promises the enhancement is working from obsolete information.

Visible FAQ content and the Schema.org type can still serve a purpose. The practical decision has three parts. Decide whether the questions help a buyer, whether a current system consumes the markup, and whether the implementation is accurate enough to justify its upkeep.

This is one narrow decision inside a wider page system. The guide to [structuring a website for AI search](/insights/structured-content-ai-search-guide) explains how visible copy, semantic HTML, metadata, proof, internal links and schema work together. FAQPage is one optional machine-readable layer, not a substitute for that structure.

## Four things are easy to confuse

A useful visible FAQ answers questions that delay an enquiry or make a service difficult to understand. It may clarify scope, timing, preparation, pricing factors or what happens next. That content can still help people navigate a decision, appear in ordinary search results and support accessible page structure without any FAQPage markup.

`FAQPage` is the formal Schema.org type. [Schema.org continues to define FAQPage](https://schema.org/FAQPage) as a subtype of `WebPage` for a page presenting one or more frequently asked questions. Vocabulary validity means the type can accurately describe a suitable page. It doesn't create eligibility for a particular Google display.

Google feature support is a separate state. Google chooses which structured data types power documented Search appearances. FAQ is absent from its current feature inventory. A block can therefore be valid Schema.org vocabulary while having no FAQ rich-result role in Google Search.

Claims about rankings, AI citations or answer-engine extraction are a fourth matter. Neither vocabulary validity nor a clean validator result proves those outcomes. Google's [general structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) say marked-up information should represent visible page content and warn that correct markup doesn't guarantee a search result feature. Keep an FAQPage implementation for a verified purpose, not for a vague promise that AI systems prefer it.

## Why old advice still looks current

The advice changed in stages. In August 2023, Google [restricted FAQ rich results](https://developers.google.com/search/blog/2023/08/howto-faq-changes) mainly to well-known government and health websites. At that point, Google said unused FAQ structured data caused no Search problems and didn't need proactive removal. Many articles, templates and plugin descriptions still reflect that period.

The 2026 change went further. Google ended the FAQ rich result and then removed its feature documentation. An old tutorial can remain technically correct about JSON-LD syntax while being wrong about the outcome available today. A plugin can also keep generating a valid Schema.org node after the Google feature that motivated its setting has disappeared.

Check the date and the promised outcome when reviewing a recommendation. Syntax examples answer how markup is written. They don't prove that a current search platform uses it for the feature named in the article.

## When keeping the markup can still be reasonable

Retention needs a reason that can be named and checked. A non-Google service may consume FAQPage from the live site. A partner feed, internal search system or other contracted product may depend on it. Record the consumer, the behaviour it enables and evidence that the behaviour is current. A vendor's broad compatibility claim isn't enough.

Keeping the node can also be proportionate when a centrally governed template produces accurate markup from the same fields as the visible answers. The marginal maintenance cost may be low, particularly when the node has a deliberate role in a [connected schema graph](/insights/connected-schema-graph-service-business-guide). Even then, identify the owner and reason. “It might help AI” isn't an operational requirement.

Google's [introduction to structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) describes structured data as explicit information about page meaning and recommends the format that is easiest to implement and maintain, often JSON-LD. It also directs publishers to choose from Google's supported features when seeking an enhanced Search display. That guidance supports accurate, maintainable implementation. It doesn't establish a ranking or AI-citation benefit for FAQPage.

## When simplifying or removing it is better

Remove or simplify the markup when its original purpose was only the retired Google enhancement and no current consumer has replaced that purpose. This is especially sensible when the implementation duplicates content in plugin fields, creates stale answers, adds template conditions or produces validation work that competes with higher-value fixes.

Make the content decision separately. Useful questions can stay in the visible page after the JSON-LD is removed. Weak questions written only to expand a search result can be rewritten into the service copy or removed on their own merits. Deleting helpful buyer guidance simply because a search treatment ended confuses content value with markup value.

The same budget may be better directed to accurate organisation, article, breadcrumb or other supported markup that matches the site's real pages. Use the [service-business schema prioritisation guide](/insights/schema-markup-priorities-service-business) to compare evidence, current support, template reach, business value and maintenance ownership rather than treating every valid type as equal work.

Central cleanup may need more than switching off a plugin option. A theme, page builder and tag manager can each emit their own node. If duplicated fields or fragile template rules are the real cost, a [website design and CMS cleanup](/services/website-design) can remove the redundant source instead of hiding its output page by page.

## A practical FAQ schema review

Start with the deployed site because a CMS setting doesn't prove what visitors and crawlers receive. The decision about visible content and the decision about markup should remain separate throughout the review.

```insight-module
{
  "type": "practice",
  "label": "In practice",
  "title": "Review the markup before you remove it",
  "intro": "Work from the live page and rendered output before changing a plugin or template.",
  "items": [
    "Inventory every template and page that emits FAQPage",
    "Confirm every marked-up question and answer is visible and accurate",
    "Name any current consumer outside Google and record the evidence",
    "Choose keep, simplify or remove separately from the visible FAQ decision",
    "Validate rendered output after deployment and set a review trigger"
  ]
}
```

Search the source response and rendered page for `FAQPage`, `Question` and `acceptedAnswer`. Sample every affected template and meaningful variant. Check whether a plugin, theme component, tag manager or custom template owns each output. Preserve any historical Search Console export the business still needs before old reporting becomes harder to retrieve.

Compare every marked-up question and answer with what a visitor can see. Google's structured data policies say not to mark up content hidden from readers. Accuracy still matters when the type has no current Google enhancement because inaccurate output gives other consumers a false description and creates avoidable governance debt.

Then record the decision and deploy it at the source. If markup stays, document its consumer, owner and review trigger. If it goes, remove the generator and confirm the rendered node is absent without breaking other graph relationships. If the implementation is uncertain, follow the [structured data audit method](/insights/structured-data-schema-audit-guide) through source content, CMS data, rendered output and platform-facing checks.

Validation after removal is different from proving eligibility. Inspect representative live URLs, check the rendered DOM and confirm retained nodes still connect correctly. The Rich Results Test only covers supported Google features, so its silence about FAQPage isn't proof that no Schema.org markup exists. A broad markup validator can inspect vocabulary, while source and rendered checks establish what the site actually publishes.

## Choose the type from the page pattern

Use `QAPage` only for its distinct page pattern. Google's [QAPage documentation](https://developers.google.com/search/docs/appearance/structured-data/qapage) requires a page focused on one question where users can submit answers. Google explicitly lists a publisher-written FAQ with no way to add alternative answers as an invalid use.

A service page with several business-authored questions remains an FAQ pattern, whether or not its FAQPage markup stays. A support forum page centred on one user question with community answers may qualify for QAPage. The visible experience determines the type. Changing the label without changing the page doesn't create eligibility.

## Make the decision part of schema governance

Close the review with a short record. Name the affected templates, visible FAQ decision, markup decision, current consumer, evidence, deployment date, owner and next review trigger. For retained markup, schedule a check when its consumer or generating template changes. For removed markup, keep the rationale so a future plugin update doesn't restore it by accident.

Google's documentation is a moving source. Recheck the Search update log and supported features when the site changes its schema backlog, when a vendor makes a new benefit claim or when Search Console reporting changes. The broader [schema change-management guide](/insights/schema-markup-change-management-guide) provides the monitoring and ownership system without requiring every announcement to become urgent development work.

Keep accurate FAQPage for a named consumer, retain useful questions while removing redundant markup, or remove both when neither helps a real user or system. Give the decision current evidence and an owner. When the inventory exposes conflicting generators or unclear priorities, a focused [SEO and structured-data review](/services/seo) can turn the findings into scoped work.
