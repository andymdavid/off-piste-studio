---
title: Review Schema Rules for Service Businesses
slug: review-schema-service-business-mistakes-guide
description: Understand when Review and AggregateRating markup is eligible for Google stars, diagnose self-serving review schema and repair inherited service-business implementations.
intro: Google review-star eligibility depends on the reviewed entity, control of the page and visible evidence. A valid JSON-LD block and a green test result answer narrower technical questions.
author: Lara
date: 2026-09-05
readTime: 11 min read
tags: Review Schema, AggregateRating, Structured Data, LocalBusiness Schema, Organization Schema, Google Rich Results, Schema Validation, Content Governance
topics: SEO & Search, Websites & UX
cluster: AI Search Visibility / Structured Content and Schema
relatedPosts: schema-markup-priorities-service-business, local-business-schema-locations-service-areas-guide, structured-data-schema-audit-guide
---
<!--
Primary sources checked 5 September 2026 in Australia/Perth:
- Google Search Central, Review snippet structured data, last updated 24 July 2026 UTC.
- Google Search Central, General structured data guidelines.
- Google Search Central Blog, Making review rich results more helpful.
- Schema.org, Review and AggregateRating.
- ACCC, Online reviews for products and services.

Live search results checked 5 September 2026 for the planned query set. Results included Google documentation, technical explainers, plugin guidance and troubleshooting discussions. AI Overview appearance was not treated as stable or universal.

Editorial boundaries:
- Google rich-result eligibility, Schema.org vocabulary validity and syntactically valid JSON-LD are separate checks.
- This article does not promise rankings, stars, traffic, AI citations or any other search presentation.
- The ACCC section is general information, not legal advice.
-->

## What valid review markup proves

Imagine inheriting a service-business website with a review plugin. The homepage shows testimonials, the plugin adds `AggregateRating` to the business node and the code parses without an error. Search Console still reports a warning, or Google simply shows no stars.

That result can reflect eligibility rather than a coding failure. Google's current [review snippet documentation](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) says valid review or rating markup may produce a snippet. It limits `LocalBusiness` and `Organization` review eligibility to sites that capture reviews about other businesses or organisations. A business marking up reviews of itself on a page it controls falls on the other side of that rule.

A plugin's valid result can collapse three questions into one.

| Check | What it proves |
| --- | --- |
| Schema.org vocabulary | The graph uses recognised types and properties such as [`Review`](https://schema.org/Review) and [`AggregateRating`](https://schema.org/AggregateRating) |
| JSON-LD syntax | A parser can read the code and its nesting |
| Google eligibility | The reviewed item, page and implementation meet the rules for a specific Google search feature |

Passing the first two leaves the third unanswered. Google's [general structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) explain that correct markup creates eligibility, while Google decides whether to display a rich result.

## The self-serving review rule

Google calls a review self-serving when the entity being reviewed controls reviews about itself. For pages using `LocalBusiness` or another `Organization` type, those reviews are ineligible for Google's star review feature. This applies to both individual `Review` markup and `AggregateRating`.

The practical test begins with the relationship, not the rating source. If Northbank Plumbing controls northbankplumbing.example and the page describes Northbank Plumbing as the reviewed `LocalBusiness`, its customer rating is self-serving for this feature. Genuine customers, accurate numbers and visible testimonials don't change who controls the page.

This rule is about organic review snippets. Google's [explanation of the self-serving review change](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful) says the change does not affect a Google Business Profile. A rating can still matter to people on the website and appear within Google's local products without making the company's own organic page eligible for review stars.

Don't change the reviewed type to `Product` simply to pursue stars when the page sells a service and does not describe a genuine product. Google's guidelines require the structured data to represent the page's main content accurately. Relabelling an entity to fit a feature creates a misleading model rather than an eligibility route.

## How Google treats third-party widgets

A widget can change how reviews reach the page. Page control and the reviewed identity still determine eligibility.

Suppose a reputation platform supplies a carousel of Google reviews and injects an average rating into the website's `LocalBusiness` node. The reviews originated elsewhere and the widget vendor wrote the code. The service business still chose to place that rating on a page it controls about itself. Google's [third-party widget guidance](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful#what-if-im-using-a-third-party-widget-to-display-reviews-about-my-business) explicitly says Google Search won't display review snippets for those pages.

Keep a widget when the testimonials genuinely help prospective customers and its use complies with the platform's terms. Judge its structured-data output separately. A display component does not need to emit `Review` or `AggregateRating` markup to be useful.

## Five mistakes to check in an inherited implementation

### 1. Marking up the business's own rating

Inspect `itemReviewed`, the node containing `aggregateRating` and any referenced `@id`. If they resolve to the service business that controls the website, `LocalBusiness` or `Organization` review markup is self-serving and ineligible for stars. The correct repair depends on what else uses the node. Remove the ineligible review properties without deleting accurate identity data needed by the [LocalBusiness implementation](/insights/local-business-schema-locations-service-areas-guide) or Organization graph.

### 2. Copying a Business Profile rating

A Business Profile and an organic website result are different surfaces. Copying its rating and review count into the business's controlled schema does not transfer eligibility. It also creates an upkeep problem because the visible count, embedded widget and JSON-LD can drift apart.

Retain a truthful, properly attributed display when it helps readers. Don't add the Business Profile total to controlled `LocalBusiness` or `Organization` markup in pursuit of organic stars. For the legitimate work around collecting and responding to customer feedback, use the [local review request and response workflow](/insights/google-review-request-response-workflow-local-business).

### 3. Marking up evidence people cannot see

Google requires structured data to represent visible page content and warns against hidden or misleading content in its [structured data quality guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies#quality-guidelines). A rating in JSON-LD with no corresponding rating on the page fails that evidence check. So can a stale count, a testimonial assigned to the wrong service or a selectively presented total that gives readers a false impression.

Compare the rendered page with the rendered JSON-LD. Confirm the reviewer, review text, rating scale, average and count agree wherever those fields are used. Removing hidden data is usually safer than adding an unsupported claim to the visible page simply to preserve a schema block.

### 4. Letting a plugin publish ratings site-wide

A plugin setting can turn one local mistake into a template-wide defect. Search the rendered output across the homepage, service pages, location pages and articles. Check whether a theme, SEO plugin, widget and tag manager each create their own review or rating nodes.

Don't rely on the CMS editor's preview. Inspect what reaches the browser after scripts run. Where output repeats across templates, use the [structured data audit workflow](/insights/structured-data-schema-audit-guide) to identify its source, affected pages and technical owner before patching individual URLs.

### 5. Treating every warning as the same problem

A syntax error, recommended-property warning and policy ineligibility describe different states. Fix malformed JSON-LD and inaccurate relationships. Assess warnings against the current documentation and the page's purpose. Treat self-serving star ineligibility as a rule decision even when a general Schema.org validator accepts the graph.

Google notes that the Rich Results Test cannot identify every policy problem. Record which tool was used, which version of the page it fetched and which question the result answers. A green result is evidence about that test, not a promise of presentation.

## What to remove, keep or repair

Start with evidence before editing code. View the page as a reader, inspect the rendered JSON-LD and trace the reviewed item to its defining node. Then identify which system created each block. The preceding checks establish whether you have an isolated field, an ineligible claim or a shared template problem.

```insight-module
{
  "type": "practice",
  "label": "In practice",
  "title": "Check the reviewed entity before changing the code",
  "intro": "Use the page, rendered markup and source rules to establish what the implementation is claiming.",
  "items": [
    "Identify the reviewed entity and page owner",
    "Match markup to review content people can see",
    "Check Google eligibility separately from Schema.org validity",
    "Remove ineligible ratings before retesting",
    "Escalate template-wide defects through the structured data audit"
  ]
}
```

Removing ineligible rating properties does not require deleting honest testimonials that help people evaluate the business. Keep useful review content visible and properly attributed. Remove or correct structured data that is false, hidden, mismatched or attached to an entity that is not eligible for the intended feature.

Retest the deployed page, then sample other URLs using the same template. A single clean page does not prove that a plugin has stopped injecting the old block elsewhere. When a theme or CMS owns the defect, [website design and development](/services/website-design) may be the appropriate implementation route.

## Where eligible review markup can still make sense

`Review` and `AggregateRating` remain legitimate Schema.org vocabulary. Google's current supported list includes item types such as Product, Recipe, Movie, SoftwareApplication and several CreativeWork types. `LocalBusiness` and `Organization` can be eligible when a site genuinely captures reviews about other businesses or organisations.

That does not create a loophole for an ordinary service page. Begin with the real item and the page's purpose, then check the current [Google review snippet requirements](https://developers.google.com/search/docs/appearance/structured-data/review-snippet#structured-data-type-definitions). Use the required properties, ensure the content is visible and accurate, and test the final output. Eligibility still isn't a guarantee that Google will show stars.

## Australian review claims still need to be fair

Schema policy is only one part of review governance. The [ACCC's guidance on online reviews](https://www.accc.gov.au/consumers/advertising-and-promotions/online-reviews-for-product-and-services) says businesses must not create or arrange fake or misleading reviews. It also warns that suppressing genuine negative feedback can mislead consumers. Incentives should apply regardless of sentiment and must be clearly disclosed.

Review totals, selected testimonials and widget displays should give readers a fair overall impression. This is general information, not legal advice. Seek appropriate advice where a campaign, incentive or moderation policy creates uncertainty.

## Choose the next action from the evidence

If the business marks up its own rating as `LocalBusiness` or `Organization`, stop treating stars as the expected outcome. Remove misleading or ineligible rating claims while keeping accurate business identity markup and useful testimonials.

If several generators, templates or page types are involved, a [technical SEO audit](/services/seo) can record the rendered evidence, eligibility decision, source system and repair owner. A shared theme, plugin or CMS defect may also need website design support. Let the reviewed entity and implementation evidence determine the repair.
