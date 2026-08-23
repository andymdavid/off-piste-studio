---
title: Article Schema That Keeps Authorship and Dates Accurate
slug: article-schema-authorship-dates-guide
description: Learn how to map article facts into accurate JSON-LD, govern authors and dates, validate rendered markup, and maintain the publishing template.
intro: Article schema becomes unreliable when the page, CMS and JSON-LD disagree about who wrote an article or when it changed. This guide shows how to govern those facts and keep the rendered output accurate.
author: Lara
date: 2026-08-10
readTime: 12 min read
tags: Article Schema, Structured Data, Technical SEO, Authorship, Content Governance
topics: SEO & Search, AI & Automation
cluster: AI Search Visibility
relatedPosts: structured-content-ai-search-guide, organization-schema-service-business-guide, ai-search-citation-worthy-content
---
## Start with the mismatch a reader can see

An article page says it was written by Lara and updated this week. Its meta tags name a different author. Its JSON-LD still carries the first publication date as `dateModified`. A crawler can parse every field, but the publishing record is no longer trustworthy.

Reliable Article schema begins with governed facts. The visible byline, visible dates, canonical metadata and structured data should all resolve to the same content record. If the wider page structure is unclear, start with [the structure that helps search and AI systems understand a page](/insights/structured-content-ai-search-guide). This guide stays with the narrower implementation job.

## What Article schema tells search systems

Google's current [Article structured data documentation](https://developers.google.com/search/docs/appearance/structured-data/article) says `Article`, `NewsArticle` and `BlogPosting` markup can help Google understand an article and its title, images, dates and authorship. The documentation recommends properties rather than defining a compulsory set for every article.

The markup describes the article. Valid code alone doesn't earn rankings or guarantee a rich result. Google's [general structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) require the markup to represent visible page content and comply with technical and quality policies. Search-feature eligibility remains Google's decision.

Article markup supports publishing hygiene rather than acting as an AI citation shortcut. Google's [guidance for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) says no special Schema.org markup is required for AI Overviews or AI Mode. The article still needs useful content, accessible rendering and evidence worth using.

Four checks answer different questions. Schema.org validation tests the vocabulary model. Google's policies govern truthful, eligible implementations. A rich-result test checks supported search-feature markup. Indexing confirms whether Google can access, process and include the URL. Each result covers only its own scope.

## Choose the article facts before writing JSON-LD

Give the CMS or frontmatter one source-of-truth record. It should hold the headline, canonical URL, representative image, author, publisher, first publication date and meaningful modification date. The template can then use those values in the visible page, canonical tag, social metadata and JSON-LD.

The headline in structured data should agree with the visible title. The canonical URL should identify the final article rather than a preview, tracking URL or duplicate route. The image should represent the article and remain crawlable. The author should identify the person or organisation credited on the page. The publisher should identify the organisation responsible for publication.

Dates need the same discipline. `datePublished` records first publication. `dateModified` records the latest substantive revision. Neither field should be generated from a build timestamp. A rebuild can change HTML without changing the editorial work.

Visible presentation matters as much as field storage. Clear headings, bylines and dates help readers inspect the same record that machines receive. Our guide to [accessible, machine-readable article templates](/insights/website-accessibility-and-seo) covers that semantic layer in more depth.

## Map the publishing fields into Article JSON-LD

The example below is platform-neutral. Its fictional content record has the same facts in the visible title, byline, publication notice, canonical metadata and hero image. The template renders this JSON-LD from that record rather than maintaining a second handwritten copy.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://www.example.com/insights/article-schema-guide#article",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.example.com/insights/article-schema-guide"
  },
  "headline": "A Practical Guide to Article Schema",
  "image": {
    "@type": "ImageObject",
    "url": "https://www.example.com/images/article-schema-guide.jpg"
  },
  "datePublished": "2026-08-10T09:00:00+08:00",
  "dateModified": "2026-08-10T09:00:00+08:00",
  "author": {
    "@type": "Person",
    "name": "Lara Chen"
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://www.example.com/#organization",
    "name": "Example Studio",
    "url": "https://www.example.com/"
  },
  "url": "https://www.example.com/insights/article-schema-guide"
}
</script>
```

The `mainEntityOfPage` relationship ties the article node to its canonical page. The author is a `Person` because the visible byline credits one person. The publisher reuses the stable organisation `@id` used elsewhere on the site. The image URL represents this article rather than the publisher logo.

The [Schema.org Article vocabulary](https://schema.org/Article) defines the broader type and property relationships. Google's Article documentation defines what Google supports and recommends for its search features. A property can be valid in Schema.org without changing eligibility for a Google result.

`BlogPosting` is a valid subtype when it accurately describes the content. A service-business insights article can use `Article` without inventing a more specific editorial identity. The important decision is consistency between the page, the content model and the chosen type.

## Connect authors and publishers consistently

Google's [author markup best practices](https://developers.google.com/search/docs/appearance/structured-data/article#author-markup-best-practices) recommend including every visible author, using the correct `Person` or `Organization` type, and placing only the author's name in `author.name`. An author URL can help identify the person when a real profile page or other identifying page exists.

Use an author URL when it leads to a real identifying page. A plain `Person` with an accurate name is more defensible than a broken or empty profile. When a dedicated profile exists, our guide to [building an expert profile with ProfilePage and Person schema](/insights/person-schema-expert-profile-page-guide) shows how to govern the visible biography, stable identity, and `mainEntity` relationship. The article byline still needs to agree.

Publisher identity should be reused rather than recreated inside every template. A stable Organization `@id` lets article nodes refer to the same publisher. The implementation work for [governing the business identity behind publisher markup](/insights/organization-schema-service-business-guide) includes choosing canonical facts, maintaining the organisation node and avoiding duplicate identifiers.

If author, publisher and profile signals disagree beyond the website, check [whether business and people signals agree across the web](/insights/how-ai-search-understands-your-business) before adding more fields. Schema can express an agreed identity. It can't resolve uncertainty on its own.

## Set datePublished once and dateModified deliberately

Google's [page-date guidance](https://developers.google.com/search/blog/2019/03/help-google-search-know-best-date-for) recommends clear visible dates supported by consistent structured data and cautions against artificially fresh dates after minor changes. Its current Article documentation also defines `datePublished` as the first publication time and `dateModified` as the most recent modification time, with timezone information recommended for both.

Keep the original publication date fixed after the article goes live. Change the modified date when a revision materially affects accuracy, evidence, recommendations or useful scope. Record the reason in the editorial history so the date has an explanation.

| Change | Date decision |
| --- | --- |
| Replace outdated guidance after a platform change | Update `dateModified` |
| Add new research that changes the conclusion | Update `dateModified` |
| Correct a factual error or expand useful scope | Update `dateModified` |
| Fix a typo or punctuation | Keep the existing date |
| Adjust formatting or spacing | Keep the existing date |
| Repair a routine internal link | Keep the existing date |

The threshold is editorial significance, not the number of changed characters. A one-line correction to a critical requirement can justify a new modified date. Rewriting several sentences for tone may not.

Evidence review belongs in this decision. If revised research materially strengthens or changes the article, use the [citation-worthy content guide](/insights/ai-search-citation-worthy-content) to assess the source and then update the date. If a source URL changes but the claim and evidence remain intact, routine link maintenance usually doesn't make the article newly current.

## Validate the rendered page

When the mismatch appears across templates or testing tools disagree, begin with the [site-wide structured data audit](/insights/structured-data-schema-audit-guide) to separate source, rendering, eligibility and indexed-state defects.

Validation should follow the publishing path that crawlers receive. A CMS preview or source field can look correct while the final template emits stale values.

1. Open the deployed page and inspect its rendered HTML. Confirm the visible headline, byline, publication date, modified date and canonical URL.
2. Find the JSON-LD in the rendered output. Check that each value matches the visible record and that the article and publisher identifiers are stable.
3. Run Google's Rich Results Test. Fix parsing errors and review warnings in the context of the current Article documentation.
4. Use a Schema.org validator when you need to inspect vocabulary relationships beyond Google's supported feature checks.
5. Use Search Console URL Inspection after deployment. Confirm Google can access the canonical URL and request recrawling when appropriate.
6. Compare the parsed result with the source-of-truth record once more. Record any warning that needs editorial or technical judgement.

Google's Article implementation workflow includes the Rich Results Test, deployment, URL Inspection and crawl-access checks. A green result confirms only what the tool evaluated. It doesn't prove that the claims are true, the page meets every policy or the URL will be indexed.

## Make the template maintainable

Split ownership without splitting the facts. Editorial owns the headline, credited author, publication event and significance of a revision. The CMS owner controls required fields and prevents impossible states. The technical owner maps those fields into rendered HTML, metadata and JSON-LD, then monitors validation after template changes.

Useful release checks catch a missing author, a publication date in the future, a modified date before publication, a non-canonical URL, a stale publisher `@id` and an inaccessible image. They should also flag two plugins or components emitting conflicting Article nodes.

Review the template whenever the CMS, theme, author model, domain or publisher identity changes. Review individual articles when their evidence or advice changes. That separation prevents routine deployments from creating fake editorial freshness while still keeping technical output under control.

## Repair the source, the template or the wider system

If the visible facts are wrong, repair the content record and its editorial history. If the record is right but the rendered page disagrees, repair the CMS mapping or template through [website design and development](/services/website-design). If conflicting markup appears across many templates, indexing is uncertain or ownership has broken down, widen the work into an [SEO and structured-data audit](/services/seo).

One governed record produces a clear page and matching Article markup. Authors remain identifiable, dates retain meaning, and validation tests the output the site publishes.
