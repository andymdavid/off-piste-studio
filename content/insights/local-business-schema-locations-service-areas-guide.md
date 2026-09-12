---
title: LocalBusiness Schema for Real Locations and Service Areas
slug: local-business-schema-locations-service-areas-guide
description: Build accurate, privacy-safe LocalBusiness schema for a storefront, service-area or hybrid business, or several staffed locations.
intro: Model storefronts, service areas, hybrid operations and staffed branches with facts your team can prove and maintain, while keeping private addresses private.
author: Lara
date: 2026-09-01
readTime: 13 min read
tags: LocalBusiness Schema, Structured Data, JSON-LD, Local SEO, Service Area Businesses, Multi-location SEO, Content Governance
topics: SEO & Search, Websites & UX
cluster: AI Search Visibility / Structured Content and Schema
relatedPosts: organization-schema-service-business-guide, service-schema-service-pages-guide, structured-data-schema-audit-guide
---
<!--
Primary sources checked 1 September 2026 in Australia/Perth:
- Google Search Central, Local Business structured data.
- Google Search Central, General structured data guidelines.
- Google Business Profile Help, Manage your service areas.
- Google Business Profile Help, Guidelines for representing your business on Google.
- Schema.org, LocalBusiness.

Editorial boundaries:
- Coastline Electrical and Harbour Allied Health are fictional examples.
- Google Business Profile policy and Schema.org vocabulary are related systems with separate scopes.
- Valid markup does not guarantee rankings, local-pack placement, rich results, Knowledge Panels, AI citations or recommendations.
-->

## Start with the location model you've approved

The business has chosen LocalBusiness. The next questions are practical. Which address can customers visit? Does the team travel to customers instead? Is there one genuine premises or a network of staffed branches? The answers decide what the page can say and what the JSON-LD can responsibly describe.

This guide begins after eligibility, canonical identity and type selection. If those decisions aren't settled, use the [Organisation schema guide](/insights/organization-schema-service-business-guide) first. If you're still deciding whether location markup deserves investment, start with the [schema prioritisation framework](/insights/schema-markup-priorities-service-business).

A storefront receives customers during stated hours. A service-area business travels to customers and doesn't receive them at its operating address. A hybrid business has a qualifying customer-facing location and also serves customers elsewhere. A multi-location business has several genuine staffed locations, each with its own facts.

That operating model needs approval before a developer copies a snippet. It controls whether an address can be public, whether opening hours describe customer access, whether a location page has a real purpose and whether several LocalBusiness nodes are justified.

## Match the markup to the real operation

Google's [Local Business structured data documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business) tells implementers to define each local business location and use the most specific applicable LocalBusiness subtype. It also documents details such as business hours and departments. That makes the real location, rather than a target keyword or sales territory, the starting point.

A storefront can publish its customer-facing address, phone, opening hours and verified coordinates on a maintained location page. A service-area business needs a different public record because customers don't visit its operating address. A hybrid can publish a qualifying storefront and explain the areas its team serves. Several staffed branches need separate location records rather than one node that blends addresses, phones and hours.

An online-only consultancy stays on the Organization path unless its operation supports a local business type. City pages and a Perth customer base alone don't create a storefront.

Google Business Profile rules and Schema.org vocabulary influence the same public facts, but they aren't the same system. Business Profile policy governs how a business represents locations and service areas on Google. Schema.org defines types and relationships that publishers can express on the web. A valid Schema.org property doesn't override Business Profile eligibility or make an unsupported location real.

Google's [business representation guidelines](https://support.google.com/business/answer/3038177) require accurate real-world names and locations and constrain virtual offices and duplicate profiles. For implementation, that means a mailbox, occasional meeting room or unstaffed coverage point shouldn't become a LocalBusiness node. Each location needs operational evidence and a team able to keep its public facts accurate.

## Protect private addresses in service-area setups

Imagine Coastline Electrical, a fictional Perth electrician. Its team travels to homes and businesses, and customers aren't received at the owner's home. Publishing that residential address in JSON-LD would expose a private fact and misrepresent the customer experience.

Google's [service-area business guidance](https://support.google.com/business/answer/9157481) says a service-area business that doesn't serve customers at its address should remove the address from its Business Profile. A qualifying hybrid business can show its storefront address and its service area. The same privacy boundary should guide the website. If customers can't visit an address, don't reveal it in visible copy or hide it inside JSON-LD.

The service-area page can still be useful. It can name honestly served areas, explain the travel model, show a monitored phone number and provide a clear enquiry route. Schema.org's `areaServed` can express a supported service area, but it shouldn't become a list of every suburb the business hopes to rank for. The visible page needs to support the coverage claim, and operations need to be able to fulfil it.

For this case, don't force Google's LocalBusiness rich-result requirements into a privacy-sensitive implementation. Google's feature documentation currently lists a physical `address` as required for that search appearance. Privacy and factual accuracy take priority over completing a feature checklist. Use the accurate entity model that your page supports, then accept that a particular Google presentation may not be available.

## Build one governed node for each real location

Every genuine location needs a stable identity. Give it a canonical location page, a stable `@id` and facts specific to that premises. Connect it to the parent Organization when that relationship helps the graph stay coherent.

[Schema.org defines LocalBusiness](https://schema.org/LocalBusiness) as a subtype of Organization and offers more specific business subtypes. It also inherits organisation and place relationships. This vocabulary supports a parent brand with distinct locations, but the nodes should follow real operations rather than an abstract organisation chart.

Consider Harbour Allied Health, a fictional clinic with staffed Perth and Fremantle premises. Its implementation can use a parent Organization node plus one MedicalBusiness node for each clinic. Each clinic has its own page, address, phone, hours and stable identifier such as `https://www.harbourallied.example/locations/perth/#location`. The Fremantle page uses a different `@id` and never inherits Perth's address or opening hours.

The parent relationship can be expressed with `parentOrganization`. Individual offers remain separate. A physiotherapy assessment is a Service, while the clinic is the place and provider. The [Service schema guide](/insights/service-schema-service-pages-guide) shows how to connect an offer to a governed provider without turning every service into another location.

A compact hybrid-location pattern might look like this after its visible page carries the same public facts:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Electrician",
  "@id": "https://www.coastlineelectrical.example/locations/osborne-park/#location",
  "name": "Coastline Electrical Osborne Park",
  "url": "https://www.coastlineelectrical.example/locations/osborne-park/",
  "telephone": "+61 8 5550 0140",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "42 Example Street",
    "addressLocality": "Osborne Park",
    "addressRegion": "WA",
    "postalCode": "6017",
    "addressCountry": "AU"
  },
  "areaServed": ["Osborne Park", "Innaloo", "Balcatta"],
  "parentOrganization": {
    "@id": "https://www.coastlineelectrical.example/#organization"
  }
}
</script>
```

Every value is fictional. A real implementation must replace it with approved evidence or omit it. Add `openingHoursSpecification` only when the published hours describe customer access and someone owns holiday changes. Add `geo` only from verified coordinates for the public location.

For two branches, reuse the parent Organization identifier and create two complete location nodes. Don't put two addresses into one LocalBusiness node or change a single `@id` according to which page renders. A location finder can list both branches, while each canonical location page carries the complete maintained record for one premises.

## Publish only facts the page can prove

Google's [general structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) require markup to represent the main content of the page and warn against misleading information. Valid code still doesn't guarantee a search feature. That boundary keeps this work focused on accurate public facts rather than promises about rankings or display.

Start with the public name, the most specific accurate subtype, canonical URL and primary customer phone. Add a `PostalAddress` only for a public customer-facing location. Opening hours need to agree with the page and the hours customers can rely on. Coordinates need to resolve to the verified premises. `areaServed` needs operational support and clear visible copy.

Ratings have a particularly high evidence burden. Google's current LocalBusiness documentation limits its review and aggregate-rating recommendations to sites that capture reviews about other local businesses. Don't copy a Business Profile rating into self-serving markup. Likewise, don't create departments unless they are real, distinct parts of the location with their own maintained facts.

Before publication, the team needs a repeatable check that protects privacy and prevents speculative properties from entering templates.

```insight-module
{
  "type": "practice",
  "label": "In practice",
  "title": "Check every location fact before publishing",
  "intro": "A location property is ready only when the business can prove it publicly and keep it current.",
  "items": [
    "Confirm the location is genuine and eligible",
    "Check that the fact appears on the rendered page",
    "Protect any address that customers cannot visit",
    "Match maintained website and Business Profile facts",
    "Assign an owner for future changes"
  ]
}
```

Omit unsupported addresses, departments, coordinates, opening hours, ratings and coverage areas.

## Give every location page a clear job

The organisation page explains the parent business and its shared identity. An individual location page helps a customer understand and use one real premises. It should provide the public address or an honest service-area explanation, local contact route, customer access hours, directions where useful and any relevant accessibility information.

A location finder helps people choose among several branches. It should link to each canonical location page and avoid creating thin indexable pages for filters or map states. Service pages explain offers across the business and can link to the locations that genuinely provide them. They shouldn't become duplicate location pages with a city swapped into the heading.

This architecture makes the structured data easier to govern because each page has an identifiable source of truth. It also gives customers usable navigation. The [structured content guide](/insights/structured-content-ai-search-guide) explains how visible page structure, internal links and metadata work together. When a CMS can't maintain distinct location records or render their facts reliably, [website design and development](/services/website-design) can address the template and content-model problem.

## Deploy and test the rendered output

Choose one source of truth for each location. CMS fields, a location database or a governed configuration can work. Several independent generators rarely do. A theme, SEO plugin, tag manager and custom component can each emit schema, leaving the rendered page with duplicate LocalBusiness nodes and conflicting identifiers.

Inspect the final HTML rather than the editor preview. Confirm that the intended node appears once, its `@id` is stable and each public fact matches the page. Parse the JSON-LD, then use Google's Rich Results Test to review supported properties and critical errors. Test a storefront, a service-area page, a hybrid page and at least two location templates when those cases exist.

Validation can't decide whether a premises is genuine or an address is safe to publish. It also can't promise a ranking, local-pack placement, rich result, Knowledge Panel or AI recommendation. When duplicate nodes, plugin output or conflicting facts span templates, use the [structured data audit workflow](/insights/structured-data-schema-audit-guide) before making isolated fixes.

Keep the Business Profile aligned through its own maintained process. The [Google Business Profile guide](/insights/google-business-profile-guide) covers optimisation and upkeep. The website and profile should agree on public facts, while each system continues to follow its own rules.

## Maintain alignment as locations change

Assign an operational owner for addresses, phones, customer access hours, service areas, temporary closures and branch openings. Assign a technical owner for templates, identifiers and duplicate-output checks. Both owners need a change path that updates the visible page, JSON-LD and relevant Business Profile without exposing a private address. Where several locations share templates and data, [SEO support](/services/seo) can connect governance, rendered-output checks and monitoring.

Review a location after a move, phone change, change in staffed hours, service-area expansion, closure, CMS migration or plugin update. Recheck the official documentation during implementation because supported properties and platform policies can change.

Publish locations customers can genuinely use, facts the business can prove and properties the team can maintain. That discipline keeps the website, markup and Business Profile aligned as the operation changes.
