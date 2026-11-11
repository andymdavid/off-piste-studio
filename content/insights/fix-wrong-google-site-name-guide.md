---
title: Fix a Wrong Site Name in Google Search
slug: fix-wrong-google-site-name-guide
description: Diagnose an incorrect site name in Google Search, brief a focused homepage repair and verify the deployed markup and later search appearance.
intro: An old or unfamiliar site label can make your result harder to recognise. Record what Google shows, agree the website name and give the developer a focused repair brief with a clear follow-up owner.
author: Lara
date: 2026-11-12
readTime: 7 min read
tags: Google Site Names, WebSite Schema, Structured Data, Homepage Naming, Technical SEO, Search Appearance, Content Governance
topics: SEO & Search, Websites & UX
cluster: Structured Content and Schema
relatedPosts: structured-data-schema-audit-guide, organization-schema-service-business-guide, how-ai-search-understands-your-business
---
<!-- Primary sources linked below accessed 12 November 2026, Australia/Perth. The example is fictional. Repair ownership and evidence records are Off Piste editorial judgement. No live client repair or Search Console inspection was performed. Maintenance trigger: changes to Google's site-name guidance, homepage naming source, domain, CMS or schema generator. -->

## Identify the name that's wrong

You search for your business and recognise the page, but the small website label above the result still carries an old name. Capture the result so the business owner and developer can investigate the same symptom.

The site name identifies the website. The clickable page heading is the title link, the URL identifies the destination, and the snippet gives a preview of its content. Google's [title-link guidance](https://developers.google.com/search/docs/appearance/title-link) covers the heading for an individual page. If that heading is wrong, record it as a separate issue so the developer can investigate the relevant page fields.

A wrong name in a Knowledge Panel belongs in the [Knowledge Panel correction workflow](/insights/fix-incorrect-google-knowledge-panel-business-guide). If descriptions combine your business with another company's services or people, use the guide to [business name confusion across search and AI](/insights/fix-ai-search-business-name-confusion-guide). Those symptoms need a wider evidence record than an isolated website label.

- Record the search query, result URL, observed site label and expected name.
- Save a dated screenshot showing the whole result and identify whether it's the homepage or an internal page.
- Note the device, search location, language and sign-in conditions, including anything you couldn't confirm.
- Name the person who approved the expected name and the person responsible for investigating the website output.

Use the same conditions when checking the repair so you can spot any differences in how the search was run.

## Approve the website name before changing the output

Google [selects site names automatically](https://developers.google.com/search/docs/appearance/site-names). Homepage `WebSite` markup signals your preference alongside visible naming and other homepage signals. Google still chooses the label shown.

Agree a concise, recognisable website name with the business owner. Review the homepage heading, visible brand text, `<title>` and `og:site_name` for conflicting names. A service description can remain descriptive while the website name stays consistent. Settle any branding disagreement before briefing the developer.

Record the approved primary name, any genuine alternative, canonical homepage URL, business approver and implementation owner. Note where each value is maintained in the CMS or template. We recommend recording approval before release. The same principle supports [dependable structured content across the website](/insights/structured-content-ai-search-guide).

[Schema.org defines WebSite](https://schema.org/WebSite) as a collection of related pages and other items. Google's [Organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization) addresses business identity and administrative details. Your website label may resemble your trading name, but each record has its own purpose. Use the [organisation-schema implementation guide](/insights/organization-schema-service-business-guide) if the underlying business identity also needs attention.

## Give the developer a bounded homepage brief

Google's [homepage implementation requirements](https://developers.google.com/search/docs/appearance/site-names) call for `name` and the canonical homepage `url`, with optional `alternateName`. Put these on the crawlable domain or subdomain homepage. Subdirectories cannot have independent site names. Align duplicate homepages and update the existing `WebSite` node where present.

Ask the developer to identify the current publishing route and the component that emits the node. Record the affected fields, template or plugin, release scope and existing identifiers so future maintainers can trace a value if a plugin update overwrites it. If competing generators disagree, follow the [schema conflict repair guide](/insights/fix-duplicate-conflicting-schema-markup-guide) before adding another declaration.

The following JSON-LD payload uses a fictional business and a reserved `.example` domain. Alpine Advisory is the approved primary name in this example, and Alpine is an established short form. Replace both with owner-approved values. Omit the alternative if there isn't a genuine one.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://alpine-advisory.example/#website",
  "name": "Alpine Advisory",
  "alternateName": "Alpine",
  "url": "https://alpine-advisory.example/"
}
```

The developer should adapt this payload to the existing implementation and emit it through the site's JSON-LD publishing mechanism. Preserve the current `@id` and useful graph relationships, such as the publisher reference, when updating an established node. The example covers only the naming fields, so retain the rest of the working graph.

Include a baseline capture of the homepage output and representative service and article pages. Specify that the release must preserve their provider, publisher, author and breadcrumb relationships where present. A shared plugin may control all of these schema types.

## Check the deployed homepage

Saving a CMS field records the value you entered. Check the public output to see whether the publishing route delivered it. Our recommended acceptance record connects each observation to the approved value, a responsible owner and a pass condition.

Google's [site-name testing guidance](https://developers.google.com/search/docs/appearance/site-names) recommends schema validation and URL Inspection. The Rich Results Test doesn't support site names.

1. **Capture the released output.** The implementation owner saves the public homepage response and rendered output, URL, deployment date and release reference. Record the observed naming fields beside the approved values. Pass when the deployed node and visible naming agree with the approved record.
2. **Review delivery variants.** The implementation owner checks the homepage variants identified in the brief, including duplicate pages that remain accessible. Record their actual URLs and output. Pass when no checked variant introduces an unexplained naming disagreement or stale cached declaration.
3. **Validate the markup.** The developer runs the deployed payload through the [Schema Markup Validator](https://validator.schema.org/) and saves the result. Investigate syntax or vocabulary errors. Pass when the intended node parses correctly and retains its required naming fields. Business approval and Google's choice remain separate checks.
4. **Inspect access.** The Search Console owner uses URL Inspection to check Google's view of the homepage. Save the inspection date, access findings and relevant indexed-state crawl date. Investigate robots restrictions, `noindex` or login barriers. Keep live-test evidence and older indexed evidence clearly identified.
5. **Check the surrounding graph.** The developer compares the sampled homepage, service and article output with the baseline. Pass when intended identifiers and relationships remain intact and no competing name has appeared. Record unresolved differences before accepting the release.

Accept the implementation only when there's evidence for the agreed checks. If a required check can't be performed, name the missing access or evidence and its owner. A broader pattern of damaged markup warrants a [structured data audit](/insights/structured-data-schema-audit-guide) with its own scope.

## Record what Google displays after the repair

Once the deployed checks pass, the Search Console owner can request a homepage recrawl. Google's [recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) says a request guarantees neither immediate inclusion nor inclusion at all. Repeated requests for the same URL don't accelerate crawling. There's no reliable correction deadline to put in the brief.

Maintain a separate search-appearance record with the deployment date, inspection evidence, recrawl request date, repeat query conditions, observed label and next review owner. Set an internal review date so the next check stays on your team's schedule. Google's timing remains outside your control.

If the symptom persists, follow Google's [site-name troubleshooting guidance](https://developers.google.com/search/docs/appearance/site-names). Check redirects and Googlebot access to their targets. Internal results may need further recrawling after the homepage label changes.

Use the saved baseline to make the next investigation specific. Ask whether the same result still carries the same label, whether Google has seen the released homepage, and whether a naming source changed again. Save dated evidence with each answer. The [business-information monitoring framework](/insights/entity-trust-monitoring-search-ai-framework) provides a way to carry those observations into ongoing review.

## Assign the next check

The business approver owns the naming decision, the developer owns deployed output, and the search reviewer owns the next observation. One person may hold several roles in a small team, but each responsibility still needs to be explicit.

If the CMS keeps restoring an obsolete name, a [website implementation brief](/services/website-design) can focus on that field mapping, template or generator. If the evidence expands to conflicting business identity across several search surfaces, give [SEO diagnosis](/services/seo) the captured results and inspection findings so the wider investigation starts with a clear symptom.

Keep the approved name, deployed evidence, latest observed result and next review date in the handover record.
