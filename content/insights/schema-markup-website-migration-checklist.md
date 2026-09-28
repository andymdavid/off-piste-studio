---
title: Keep Schema Markup Intact During a Website Migration
slug: schema-markup-website-migration-checklist
description: Preserve accurate structured data through a website redesign with a practical baseline, staging checks, launch gates, production validation and handover.
intro: A redesign can leave every page looking right while changing the structured data beneath it. This checklist gives project owners and implementers an evidence trail from the old site's schema graph to the new site's indexed output.
author: Lara
date: 2026-09-28
readTime: 11 min read
tags: Schema Markup Migration, Structured Data, Website Migration, JSON-LD, Schema Validation, Technical SEO, Content Governance
topics: SEO & Search, Websites & UX
cluster: AI Search Visibility / Structured Content and Schema
relatedPosts: connected-schema-graph-service-business-guide, structured-data-schema-audit-guide, schema-markup-change-management-guide
---
<!--
Primary sources checked 28 September 2026 in Australia/Perth:
- Google Search Central, Site moves and migrations.
- Google Search Central, General structured data guidelines.
- Google Search Central, Generate structured data with JavaScript.
- Google Search Central, Structured data markup and testing tools.
- Schema.org, Markup Validator.
- Google Search Central Blog, URL Inspection API announcement, 31 January 2022.

Review trigger: recheck Google's structured data testing and URL Inspection documentation when Search Console reports, supported rich-result features or testing interfaces change.

This article owns the planned migration sequence from baseline to operational handover. Type selection, property-level implementation, general live-site diagnosis and ongoing change governance remain in their dedicated guides.
-->
## A redesign can silently change the facts search systems receive

A rebuilt service page can look identical to the old one while emitting a different provider ID. An article template can keep its byline and lose the author relationship in JSON-LD. A new JavaScript stack can place valid markup in the source yet fail to deliver it in the rendered page. None of those defects needs to be visible in the design review.

Schema migration belongs in release control. The team needs evidence of what the current site emits, what the new templates should emit, what staging renders and what production delivers after launch.

Google's [general structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) require markup to represent visible content accurately and remain accessible to Google. They also make clear that valid markup doesn't guarantee a rich result. For a migration, the useful acceptance standard is accurate and intentional output, not a promised search outcome.

Where URLs change, Google's [site move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) recommends preparation, URL mapping, testing and continued monitoring. It also recommends changing one major thing at a time where practical. Separating a domain move, CMS replacement and redesign can make faults easier to isolate. When they must ship together, the evidence record becomes even more important.

## Capture the current graph before rebuilding it

Start before staging exists. Select representative pages for every template that emits structured data, then add commercially important exceptions. A sensible sample might include the homepage, one service, one location pattern, one article, one expert profile and any page with conditional review markup.

For each page, record the visible facts, canonical URL, schema types, nodes, important relationships and stable `@id` values. Note whether a theme, plugin, server template, tag manager or client-side script generates the output. Assign an owner who can explain whether the current result is intentional.

Inspect rendered output as well as page source when JavaScript is involved. Google's guidance on [generating structured data with JavaScript](https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript) says dynamically generated JSON-LD can be processed when it appears in the rendered DOM. That makes source inspection alone an incomplete baseline for a JavaScript rendering stack.

Run the representative pages through the [Schema.org Markup Validator](https://schema.org/docs/validator.html). It extracts JSON-LD, RDFa and Microdata, displays the resulting graph and identifies syntax issues. The validator documentation also describes support for some dynamically inserted markup. Save the result or record the relevant nodes rather than relying on memory after the old site disappears.

The baseline is not a demand to preserve every existing item. Use the [schema priority framework](/insights/schema-markup-priorities-service-business) to classify output as keep, change or retire. A duplicate provider node or unsupported feature should not survive merely because it already exists. Retirement should still be a named decision rather than an accidental omission.

If the site already has an agreed graph contract, bring its entity register into the baseline. The guide to [building a connected schema graph](/insights/connected-schema-graph-service-business-guide) explains how stable IDs and relationships work across templates.

## Map old templates to new sources and outputs

Turn the baseline into an implementation contract. Every old template should map to a new page pattern, content source and expected output. If URLs change, include the new URL and canonical target. If the CMS changes, name the field that supplies each important visible and machine-readable fact.

Keep the working record compact enough to review in a launch meeting. Combine related fields so the table also remains readable on a phone.

| Page move | Expected output | ID decision | Owner / status |
| --- | --- | --- | --- |
| Service to service | WebPage, Service, BreadcrumbList | Retain provider and service | Web lead / ready |
| Location to location | WebPage, location, BreadcrumbList | Retain location | SEO lead / check |
| Insight to article | WebPage, Article, BreadcrumbList | Retain author and publisher | Content lead / ready |

A service page moving into a new component library may still need to reference the same provider and service identities. A location moving to a new URL may need a new page ID while retaining the identity of the real place. An article can preserve its URL yet lose its author relationship when a new CMS stores the byline as plain text.

These are source and ownership problems as much as code problems. The guide to [building a structured content model](/insights/structured-content-model-service-website-guide) shows how governed fields and relationships can supply both visible components and justified schema output.

## Test staging with the evidence each tool can provide

Each test answers a different migration question. Separate the checks so a green result cannot hide another kind of failure.

Inspect the source to identify what the server or initial response contains. Inspect the rendered DOM to see what the browser produces after scripts run. Compare the rendered facts with the visible page. Then validate both vocabulary and relevant Google feature requirements.

Google's [structured data testing guidance](https://developers.google.com/search/docs/appearance/structured-data) directs teams to the Rich Results Test for Google-supported rich-result features and the Schema Markup Validator for general Schema.org validation. Those tools have different jobs. A Schema.org-valid graph may not meet a Google feature's requirements, while a Rich Results Test pass doesn't prove that every intended node and relationship survived the rebuild. Interfaces and supported features can change, so these tool roles were checked on 28 September 2026 in Australia/Perth.

Blocked staging creates a practical limit. Code-input tests can provide an early syntax and feature check when an external tool cannot reach the environment. They don't prove that the deployed URL returns the same code, that scripts execute successfully or that crawlers can access the result. Use an accessible preview environment where security policy allows, then repeat URL-based rendered tests in production.

For each representative template, retain enough evidence to compare the result with the baseline. Record the URL or fixture, test date, expected nodes, actual nodes, differences, decision and owner. Screenshots can help a launch record, but machine-readable output and a written decision are more useful than a collection of unexplained green ticks.

## Set the schema launch gate

The project owner needs a compact gate because validation warnings have different consequences. A missing required property for an important supported feature carries more risk than a recommendation for optional detail. An intentional ID change is materially different from a plugin silently creating another organisation.

Review representative templates and priority URLs against the migration contract. Accept only the exceptions that someone has understood, owned and recorded. That lets the launch decision reflect business risk without pretending every warning must block release.

```insight-module
{
  "type": "practice",
  "label": "In practice",
  "title": "Launch only when the schema evidence agrees",
  "intro": "The release record should answer these checks for the representative templates and priority URLs.",
  "items": [
    "Expected nodes and relationships appear in rendered output",
    "Visible facts agree with the markup",
    "Stable IDs, canonicals, and mapped URLs are intentional",
    "Google feature checks and Schema.org validation have both been interpreted",
    "Every unresolved exception has an owner and an accepted launch decision"
  ]
}
```

## Validate production before the old evidence disappears

Begin production checks as soon as the cutover is stable. Test the same representative pages used for staging, then test high-value URLs and conditional templates. Compare rendered output with the approved staging record rather than starting a fresh, subjective review.

Where URLs changed, verify that redirects reach the mapped destination and that the new page declares the intended canonical. Confirm that IDs which use page URLs changed only where the graph contract required it. Recheck visible facts, rendered nodes and relationships with both general Schema.org validation and the relevant Google feature test.

Google's site move guidance recommends monitoring both old and new sites and keeping redirects in place generally for at least a year. That wider migration work supports discovery of the new URLs, but it doesn't replace schema parity testing on the destination pages.

Record each production defect with its affected template, severity, owner and immediate decision. A widespread missing provider relationship may justify a rollback or urgent template repair. A low-risk optional recommendation may enter the backlog. The release owner should make that distinction explicitly.

If production output disagrees with staging or the validators produce results the team cannot explain, move into the [structured data audit workflow](/insights/structured-data-schema-audit-guide). That guide covers live diagnosis in depth while this checklist keeps the release decision focused.

## Monitor what Google has indexed and hand over ownership

Correct production HTML and Google's indexed view are different evidence states. After Google has had an opportunity to recrawl the new URLs, sample priority pages in URL Inspection and review relevant Search Console enhancement reports where they exist.

Google's [URL Inspection API announcement](https://developers.google.com/search/blog/2022/01/url-inspection-api) describes indexed-version information that includes rich-result analysis. It reports what Google has indexed rather than running a live staging test. Use it as post-launch evidence, not as a substitute for the baseline, rendered checks or production validation. This capability was reviewed on 28 September 2026 in Australia/Perth. Recheck current documentation if Google changes the interface, supported fields or inspection workflow.

Compare the indexed sample with the migration record. Look for priority URLs that remain on an old canonical, expected features that no longer appear, or new templates that haven't produced the intended graph. Avoid treating one inspection as proof of every page. Sample by template and commercial importance, then investigate patterns.

Finish by handing over the baseline, mapping, accepted exceptions, owners and review triggers. The guide to [keeping schema accurate when search rules change](/insights/schema-markup-change-management-guide) turns that release record into ongoing sampling and governance.

## The useful outcome is a migration record the team can defend

A successful schema migration creates a defensible evidence trail from the old site's visible facts and graph to the new site's rendered and indexed output. It can't promise continued rankings, rich results or AI citations.

That record lets the team say what was preserved, what changed, what was retired and who accepted each exception. It also makes the next plugin update, template change or platform rule easier to assess.

When URL mapping, Search Console evidence and cross-template ownership span several teams, a scoped [SEO migration and governance engagement](/services/seo) can establish the controls. When the defect sits in CMS fields, rendering or schema components, [website design and implementation support](/services/website-design) can repair the source rather than repeatedly patching the output.
