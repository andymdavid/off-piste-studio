---
title: Build a Connected Schema Graph Across Your Website
slug: connected-schema-graph-service-business-guide
description: Plan stable schema identities and relationships across website templates so your structured data stays connected, accurate and maintainable.
intro: Once a business has chosen useful schema types, the harder job is making them describe the same services, people and provider across every template. A connected graph gives that implementation a shared contract.
author: Lara
date: 2026-09-10
readTime: 11 min read
tags: Connected Schema Graph, Structured Data, JSON-LD, Schema @id, Technical SEO, Website Architecture, Content Governance
topics: SEO & Search, Websites & UX
cluster: AI Search Visibility / Structured Content and Schema
relatedPosts: schema-markup-priorities-service-business, structured-data-schema-audit-guide, structured-content-ai-search-guide
---
<!--
Primary sources checked 10 September 2026 in Australia/Perth:
- Google Search Central general structured data guidelines and multiple-items guidance.
- Google Search Central introduction to structured data markup.
- W3C JSON-LD 1.1 Recommendation.
- Schema.org data model documentation.
- Google Search Central Organization structured data documentation.
- Google Search Central guidance for AI features and websites.

The graph contract, ID register and deployment approach are Off Piste implementation guidance. The example business and identifiers are illustrative. They do not represent a client implementation or promise a search outcome.
-->
## Turn schema choices into a deployment contract

A business can choose sensible schema types and still deploy a messy result. One plugin describes the organisation on the homepage. A service template creates another version of the same provider. An article plugin generates a third publisher object with a different name or logo. Every item may be valid in isolation, yet the site has no shared account of what each entity is or who maintains it.

This guide starts after you [prioritise the schema types worth maintaining](/insights/schema-markup-priorities-service-business). It turns those decisions into a graph contract that developers, marketers and content owners can use across templates. If you're still deciding what the wider website needs to communicate, first [structure the website for search and AI systems](/insights/structured-content-ai-search-guide).

Google's guidance for [multiple structured data items on a page](https://developers.google.com/search/docs/appearance/structured-data/sd-policies#multiple-items-on-a-page) says items can be nested or specified individually. Where separate items are related, Google recommends using `@id` to connect them. One `@graph` wrapper remains optional.

A connected graph also doesn't guarantee rankings, rich results, Knowledge Panels, entity recognition, AI Overviews or AI citations. Google's guidance for [AI features and websites](https://developers.google.com/search/docs/appearance/ai-features) says no special schema is required for AI Overviews or AI Mode. It also says structured data should match the visible text. The implementation goal is accurate, maintainable meaning.

## Start with the entities the business can govern

List the real things the website describes before listing schema types. For a straightforward service business, that may include the provider, website, individual pages, services, people, articles, breadcrumbs and genuine staffed locations. Each item needs a stable identity and an owned source of truth.

The provider is often the reusable anchor. Google's [Organization structured data documentation](https://developers.google.com/search/docs/appearance/structured-data/organization) explains that organisation markup can help Google understand and disambiguate administrative details such as the name, address, contact details and identifiers. Only include applicable facts that the business can keep accurate. Our detailed guide explains how to [govern the provider identity](/insights/organization-schema-service-business-guide) without turning every template into another source of company data.

Model the business that actually exists. Separate legal entities may need separate identities. Brands can relate to an organisation while retaining their own identities. A business with several staffed premises needs an intentional location model. A service-area business can define the area it serves from its real operating model. Our location guide explains how to [model locations and service areas](/insights/local-business-schema-locations-service-areas-guide).

People need the same care. Create a reusable Person identity only when there is a real expert or author with governed profile facts. A maintained profile page can become the defining page for that person. The implementation detail sits in our guide to [building a governed expert identity](/insights/person-schema-expert-profile-page-guide).

Schema.org's [data model](https://schema.org/docs/datamodel.html) uses URLs and URIs as identifiers. It also distinguishes the main entity described by a page from other subjects the page is about. That distinction is useful for architecture. A service page can be a WebPage whose main entity is a Service. The service can then reference its provider instead of redefining the provider from scratch.

## Give every reusable node a stable identity

In JSON-LD, `@id` identifies a node. A node reference can point to a node described elsewhere, while `@graph` can hold a set of nodes. The [W3C JSON-LD 1.1 Recommendation](https://www.w3.org/TR/json-ld11/) defines these mechanics.

A practical ID often starts with the canonical URL for the entity's defining page and adds a fragment. For example, `https://example.com/#organization` can identify the provider while `https://example.com/services/strategy/#service` can identify one service. The exact fragments are an implementation choice. Choose a convention, document it and keep it stable when templates or plugins change.

The register below makes those decisions reviewable before code reaches production. The URLs are illustrative.

| Entity | Canonical `@id` | Source of truth | Defines | References | Owner |
| --- | --- | --- | --- | --- | --- |
| Provider | `https://example.com/#organization` | Business record | Home | Service, insight, expert | Marketing lead |
| Website | `https://example.com/#website` | Site settings | Home | All page templates | Web owner |
| Strategy service | `https://example.com/services/strategy/#service` | Service entry | Service | Related pages | Service owner |
| Lara | `https://example.com/people/lara/#person` | Profile entry | Expert | Insight | Content lead |

The register is an operating record rather than another schema generator. It tells the team whether a template defines a node or only points to it. It also gives factual changes somewhere to begin.

```insight-module
{
  "type": "practice",
  "label": "In practice",
  "title": "A stable identity needs an owner and source",
  "intro": "Record these fields before a reusable node reaches a template.",
  "items": [
    "Name the entity and canonical @id",
    "Identify the maintained source of truth",
    "Record the defining and referencing templates",
    "Assign an owner for factual changes"
  ]
}
```

## Write the relationship contract before the JSON-LD

The contract states which template defines each page-specific node, which shared identities it references and where the facts originate. Keep it narrow enough that a developer can translate it into template rules.

| Template | Defines | References | Source |
| --- | --- | --- | --- |
| Home | WebSite, provider | Canonical business identity | Site settings and business record |
| Service | WebPage, Service, BreadcrumbList | Provider, WebSite | Service entry and hierarchy |
| Insight | WebPage, Article, BreadcrumbList | Author, publisher, WebSite | Article, profile and site settings |
| Expert | ProfilePage, Person, BreadcrumbList | Employer, WebSite | Profile entry and hierarchy |
| Location | WebPage, location, BreadcrumbList | Parent organisation, WebSite | Verified location record |

The edges carry the meaning. A service page can identify its Service as the WebPage's `mainEntity`. The Service can use `provider` to reference the stable provider ID. See the property-level guide when you need to [connect a service to its provider](/insights/service-schema-service-pages-guide).

An insight page can reference the governed Person node as `author` and the provider as `publisher`. Its dates must follow the visible publishing record. The detailed rules for how to [keep article authorship and dates accurate](/insights/article-schema-authorship-dates-guide) belong in the publishing template rather than this site-wide contract.

BreadcrumbList supplies page context rather than a replacement entity hierarchy. Generate it from the same navigation model as the visible trail. Our breadcrumb guide shows how to [generate breadcrumbs from the maintained hierarchy](/insights/breadcrumb-schema-site-hierarchy-guide).

Treat reviews and ratings as conditional nodes. Don't connect them to the provider simply because a plugin can emit them. First [check review schema eligibility before connecting ratings](/insights/review-schema-service-business-mistakes-guide), then confirm that the visible evidence and current platform rules support the relationship.

## Choose a graph shape your rendering stack can maintain

Google [recommends JSON-LD when practical](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) because it is generally the easiest supported format to implement and maintain at scale. A single `@graph` block can make a page's nodes and references convenient to inspect. Nested or separate items remain valid when the relationships are explicit.

This abbreviated service-page example defines page-specific nodes and references the shared provider. Production markup would add only the supported properties that match the visible page.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://example.com/services/strategy/#webpage",
      "url": "https://example.com/services/strategy/",
      "name": "Strategy consulting",
      "isPartOf": { "@id": "https://example.com/#website" },
      "mainEntity": { "@id": "https://example.com/services/strategy/#service" }
    },
    {
      "@type": "Service",
      "@id": "https://example.com/services/strategy/#service",
      "name": "Strategy consulting",
      "provider": { "@id": "https://example.com/#organization" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://example.com/services/strategy/#breadcrumb"
    }
  ]
}
```

The provider and website nodes may be defined in the same rendered block if your templates can source them reliably. They may also be described elsewhere and referenced by stable IDs. Test the rendered result rather than assuming that source-code placement proves the relationship survived the CMS or JavaScript pipeline.

For a static site, shared data files can supply canonical provider, website and person IDs to each template. In a traditional CMS, governed global settings and structured content fields can do the same job. A headless system can expose the IDs through its content model. The best shape is the one your stack can render consistently from owned data.

## Deploy from one source of truth

Assign every property to the source that also drives the visible page. A service name should come from the service record. An author name should come from the governed profile. The organisation logo and contact details should come from controlled business settings. This keeps schema aligned with what buyers see.

Then inventory every system that emits structured data. Themes, SEO plugins, review widgets, CMS extensions and custom templates can all produce overlapping nodes. Decide which system owns each output. Disable or configure the others where they create a second provider, stale facts or conflicting identifiers.

Roll out one representative page for each template first. Compare its visible content, canonical URL, node IDs and references with the contract. Once the pattern holds, release it across the template set. This sequence is Off Piste implementation judgement. It keeps a modelling mistake from becoming a site-wide cleanup.

Changes also need ownership. When the business name, logo, service, author profile, location or URL changes, the owner should know which source to update and which templates to verify. That's why the register matters more than a one-off valid test.

## Test the rendered graph and maintain the contract

Inspect the HTML a crawler receives. Confirm that the JSON-LD parses, every reusable ID follows the register, references resolve to the intended identity and the facts agree with visible content. Check for duplicated provider or person nodes created by another plugin. Sample the homepage, one service, one insight, one expert profile and each conditional location pattern.

Validation confirms syntax and feature requirements. It cannot confirm that your business model is true or that ownership will keep the graph current. Record exceptions, test the relevant Google feature documentation where applicable and review the graph when a template, plugin, URL convention or source of truth changes.

After deployment, use the full workflow to [audit the rendered structured data](/insights/structured-data-schema-audit-guide). It covers discovery, rendering, eligibility and monitoring while this guide stays focused on architecture.

## A connected graph is a governance decision

You can now make a concrete implementation decision. Approve the stable entities, canonical IDs, relationship contract, sources and owners before commissioning the templates. Choose `@graph`, nesting or separate items according to what the rendering stack can maintain. Keep explicit relationships and accurate visible facts whichever format you use.

If the difficult work is deciding scope, ownership and ongoing standards, [SEO strategy and governance](/services/seo) can turn the contract into an accountable programme. If the CMS cannot express shared identities or produces conflicting output, [website and template implementation](/services/website-design) is the practical next step.
