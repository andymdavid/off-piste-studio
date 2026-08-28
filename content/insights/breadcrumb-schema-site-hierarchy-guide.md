---
title: Breadcrumb Schema That Reflects Your Site Hierarchy
slug: breadcrumb-schema-site-hierarchy-guide
description: Learn how to build accessible breadcrumbs and matching BreadcrumbList JSON-LD from one maintained site hierarchy.
intro: Breadcrumb schema works when the visible trail and the machine-readable trail describe the same place. This guide shows how to choose that path, build it accessibly, generate it once and keep it accurate.
author: Lara
date: 2026-08-29
readTime: 12 min read
tags: Breadcrumb Schema, BreadcrumbList, Structured Data, JSON-LD, Technical SEO, Website Accessibility, Content Governance
topics: SEO & Search, Websites & UX
cluster: AI Search Visibility
relatedPosts: schema-markup-priorities-service-business, structured-content-ai-search-guide, structured-data-schema-audit-guide
---
<!--
Primary sources checked 29 August 2026 in Australia/Perth:
- Google Search Central, Breadcrumb structured data.
- Google Search Central, General structured data guidelines.
- Schema.org, BreadcrumbList.
- W3C WAI-ARIA Authoring Practices Guide, Breadcrumb Pattern.
- Google Search Console Help, Rich Results Test.
- Google Search Console Help, Rich result report overview.

Editorial boundaries:
- The fictional Coastline Electrical example is illustrative.
- The one-source generation pattern is Off Piste field practice, not a Google or Schema.org requirement.
- Correct structured data does not guarantee search presentation, rankings, click-through rate, AI citations or entity understanding.
-->

## A breadcrumb is a claim about where a page belongs

A marketing team chooses breadcrumb schema from its technical SEO backlog. The developer asks for the parent of a commercial solar page. Marketing calls it a service. The website navigation places it under solutions. The CMS treats it as a child of electrical services. That small schema task has exposed an information architecture decision.

Breadcrumb schema is the common phrase. `BreadcrumbList` is the Schema.org type used to express the ordered trail. Google's current [Breadcrumb structured data documentation](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) says breadcrumb markup helps categorise page information in search results. It recommends a typical user path rather than a mechanical copy of the URL structure.

The implementation job begins after the type has been selected. If you're still deciding which markup deserves investment, use [the service-business schema prioritisation framework](/insights/schema-markup-priorities-service-business). If you need the wider relationship between visible copy, semantic HTML and metadata, start with [the structured content guide](/insights/structured-content-ai-search-guide).

Here, the requirement is narrower. Choose a path a visitor would recognise, show it on the page, express the same order in JSON-LD and give the templates one maintained hierarchy to use. Correct markup can create eligibility for Google's breadcrumb presentation. Google's [general structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) make clear that correct markup does not guarantee a search feature will appear.

## Choose the path a visitor would recognise

Start with the site's information architecture and the route that helps someone understand the page. A fictional electrical company might place its commercial solar page in this trail:

Home > Services > Commercial Solar

That path tells a visitor that Commercial Solar is an offer within the Services area. The page URL might be `/solutions/energy/commercial-solar`, but those folders don't automatically make Solutions and Energy useful breadcrumb levels. URL structure can reflect routing history, a migration or a technical grouping that has little meaning to a buyer.

Test each proposed level by asking whether it is a real destination, whether its label is familiar and whether moving up one level helps the visitor continue their task. Service pages usually belong beneath a useful services hub. A location page might belong beneath Locations. An industry page may sit under Industries if that hub contains a genuine browsing route. An insight should use the editorial hierarchy readers can navigate, not every category stored in the CMS.

The canonical trail should be stable enough to maintain. If three teams give the same page three different parents, the commercial consequence is wider than a schema warning. Internal links, navigation labels, analytics groupings and ownership are likely to drift too.

## Build the visible breadcrumb first

The structured data describes a relationship that should make sense to people. Build the visible component first so the hierarchy can be reviewed in the browser before it is encoded for search systems.

The [W3C WAI-ARIA breadcrumb pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/) places the trail in a navigation landmark with an accessible label. It identifies the current page with `aria-current="page"` when the final item is represented by a link. An ordered list also communicates that the sequence matters.

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="https://www.coastlineelectrical.example/">Home</a></li>
    <li><a href="https://www.coastlineelectrical.example/services/">Services</a></li>
    <li><span aria-current="page">Commercial Solar</span></li>
  </ol>
</nav>
```

The separators can be added through CSS so assistive technology does not announce decorative characters as part of every label. Keep link wording concise and recognisable. The final item is plain text here because it already represents the current page. If your design makes it a link, apply `aria-current="page"` to that link.

This is one application of a wider semantic navigation discipline. [Website accessibility and SEO](/insights/website-accessibility-and-seo) covers landmarks, labels, headings and usable interactions across the rest of the site.

## Express the same hierarchy in BreadcrumbList JSON-LD

Once the visible trail is agreed, map the same items into JSON-LD. [Schema.org defines BreadcrumbList](https://schema.org/BreadcrumbList) as an `ItemList` made from ordered `ListItem` entries. Google's feature documentation sets the requirements for eligibility in its breadcrumb presentation.

Google currently requires a `BreadcrumbList` with at least two `ListItem` entries. Each entry needs a `position`, starting at 1, and a displayed `name` unless the `item` is expressed as a named Thing. The `item` identifies the page represented by that level. Google says it may be omitted for the final entry, in which case the containing page URL is used.

This complete JSON-LD example matches the visible Coastline Electrical trail:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.coastlineelectrical.example/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://www.coastlineelectrical.example/services/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Commercial Solar"
    }
  ]
}
</script>
```

Use absolute canonical URLs for linked levels. Keep positions sequential and keep names aligned with the visible labels. Omitting `item` from the final entry follows Google's current example and requirements. Schema.org permits broader modelling choices, but Google feature eligibility should be checked against Google's current documentation at deployment time.

BreadcrumbList can sit alongside other accurate page markup. On a service page, the breadcrumb describes hierarchy while Service markup describes the offer and provider. [The Service schema guide](/insights/service-schema-service-pages-guide) covers that separate relationship.

## Generate both outputs from one maintained source

Handwriting an HTML trail and a separate JSON-LD array creates two places for labels and URLs to go stale. A more dependable pattern is to maintain one ordered collection and let the template render both outputs from it. That's implementation practice, not a Google requirement.

The source might be a CMS parent field, route metadata or a governed hierarchy map. It needs a clear owner and enough information to provide the label, canonical URL and current-page state. The rendering logic can be platform-neutral:

```text
trail = resolveBreadcrumbs(currentPage)

render visible navigation from trail
  create a labelled nav and ordered list
  link every item except the current page
  mark the current page with aria-current

render BreadcrumbList from trail
  map each item to ListItem
  set position from its order, starting at 1
  copy the visible label into name
  copy the canonical URL into item, except for the final entry
```

The shared source needs rules. Decide what happens when a parent is unpublished, when a label changes, when a canonical URL moves or when a landing page belongs to no useful hierarchy. A template should opt out when it cannot produce a truthful trail. Inventing a fallback parent simply to keep the JSON-LD valid hides an architecture problem and can mislead visitors.

Ownership matters here. Content may control labels, product or marketing may control parent relationships and development may control rendering. A change process that names all three responsibilities prevents an innocent CMS edit from creating conflicting output across hundreds of pages.

## Publish multiple trails for genuine routes

Google supports multiple breadcrumb trails for one page when there are genuinely different ways to navigate to it. A commercial solar page could reasonably be reached through Services > Commercial Solar and Industries > Property Management > Commercial Solar if both routes exist as useful, visible browsing paths.

In JSON-LD, those routes are expressed as two separate `BreadcrumbList` objects in an array. Each list keeps its own positions and describes a complete path to the same page. Google's [multiple breadcrumb trail example](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb#multiple-breadcrumb-trail) shows this structure directly.

Publishing both requires more than two possible keyword groupings. Each intermediate page should exist, each route should help a visitor and the relationship should remain owned when navigation changes. If the second route exists only to add “property management solar” to the markup, it isn't a useful trail.

Most service sites benefit from one canonical trail per page because it simplifies navigation and governance. Use a second trail when the information architecture supports two real discovery paths and the team can keep both accurate.

## Test rendered pages across the template set

Source files can look correct while the deployed page contains stale data, duplicate generators or a client-side rendering fault. Google's [Rich Results Test guidance](https://support.google.com/webmasters/answer/7445569?hl=en) explains that the tool checks supported structured data in rendered output. Test the public URL when possible and test code before deployment when the page isn't live.

One passing page isn't evidence that every template works. Choose representative service, location, industry, resource and insight URLs that participate in the system. Check a shallow trail, a deeper trail, a renamed parent and any template with separate SEO tooling. Confirm canonical URLs and inspect whether a plugin and the site generator are both emitting BreadcrumbList.

The sequence matters because it follows one hierarchy claim from the human-facing page into rendered markup and then across the deployed template set.

```insight-module
{
  "type": "practice",
  "label": "In practice",
  "title": "Check the trail before you scale it",
  "intro": "Validate one truthful trail from its visible links through to live reporting.",
  "items": [
    "Confirm the visible links, labels, order and current page",
    "Inspect rendered JSON-LD for the same ordered items",
    "Run representative URLs through the Rich Results Test",
    "Check every participating template for duplicates and stale values",
    "Monitor Search Console after deployment and after template changes"
  ]
}
```

Critical errors in the test need correction before rollout. Non-critical warnings still deserve review because they may reveal incomplete data. A valid result confirms supported syntax and properties for the tested output. It doesn't prove that Google has indexed the page or that a breadcrumb presentation will appear.

## Use Search Console as monitoring evidence

After deployment, use Search Console to check what Google reports across affected pages. Google's [rich result report overview](https://support.google.com/webmasters/answer/7552505?hl=en-GB) explains that reports group valid and invalid items and allow site owners to validate a fix. Breadcrumbs are one of the supported report types.

A repeated error across many URLs usually points to shared template logic or shared source data. One stale label may belong to a page record. Missing `item` values on intermediate levels may come from the hierarchy resolver. Duplicate objects may come from two active generators. Search Console can surface the pattern, but the implementation still has to be traced through the CMS and rendered page.

Allow for crawling and indexing time after a release. An unchanged report may mean Google hasn't recrawled the affected pages yet. Recheck after navigation changes, CMS migrations, route changes and SEO plugin updates because each can alter the hierarchy or add another generator.

When tools disagree or the fault spans several templates, move into [the structured data audit workflow](/insights/structured-data-schema-audit-guide). If the work needs rollout evidence and continuing ownership, [technical SEO governance](/services/seo) can connect template checks, Search Console findings and maintenance.

## A reliable breadcrumb starts with a reliable hierarchy

Breadcrumb schema implementation is straightforward once the path is settled. The difficult part is deciding where the page belongs and keeping the visible trail, internal navigation, canonical URLs and JSON-LD aligned.

If the hierarchy is clear, store it once, render it in both places and test representative templates. If it isn't clear, resolve the information architecture before scaling the markup. That may require [website design and development](/services/website-design) work across navigation, CMS fields and shared components.

A reliable system gives visitors a recognisable route, maintainers a clear source and search systems an accurate description of the page.
