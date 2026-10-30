---
title: Fix Conflicting Schema Markup from Plugins and Themes
slug: fix-duplicate-conflicting-schema-markup-guide
description: Trace conflicting schema markup to plugins, themes and templates, reconcile business facts and verify that repairs preserve your website's graph.
intro: A safe schema repair traces each conflicting assertion to its source, agrees the correct facts and preserves the relationships the website still needs.
author: Lara
date: 2026-10-31
readTime: 11 min read
tags: Schema Conflict Repair, Duplicate Schema Markup, JSON-LD, Schema @id, Technical SEO, Content Governance
topics: SEO & Search, Websites & UX
cluster: Structured Content and Schema
relatedPosts: structured-data-schema-audit-guide, connected-schema-graph-service-business-guide, schema-markup-plugin-vs-custom-code-guide
---
<!-- Primary source guidance checked 31 October 2026, Australia/Perth. Fictional example and repair framework are Off Piste editorial guidance. No measured performance or client outcome is claimed. -->

## Start with the conflict you've already confirmed

Your SEO plugin publishes the current business telephone. Your theme publishes an obsolete number for the same provider. A service template points to the theme's provider record, while article pages use the plugin's organisation. You've confirmed the disagreement, and now you need to decide what can safely change.

The repair needs approved facts, identified generators and working relationships across the affected templates. If you're still locating the disagreement, begin with the [structured data audit](/insights/structured-data-schema-audit-guide).

Google's [guidance on multiple structured-data items](https://developers.google.com/search/docs/appearance/structured-data/sd-policies#multiple-items-on-a-page) allows several items on a page, including separately expressed items connected through identifiers. Multiple JSON-LD blocks can therefore be legitimate. Count scripts as an inventory aid, then inspect what they say about each entity.

Google's [guidance for AI search features](https://developers.google.com/search/docs/appearance/ai-features) says there's no special schema required for those features. Repairing a conflict brings no guaranteed ranking, rich result or AI citation. It supports the broader work of [structuring a website for AI search](/insights/structured-content-ai-search-guide).

## Trace each assertion to its source

Capture a representative homepage, service page and article before changing settings. Save the response HTML and rendered DOM, the public URL, capture time and active component versions. Include Microdata and RDFa in the inspection, because an overlapping business record may sit in HTML attributes rather than a JSON-LD script.

For every disputed assertion, record the page template, emitter and version, entity ID, property, value, business fact owner and supporting evidence. Add the proposed repair action once ownership is established. A script's class or comment can suggest a source, but a reproducible output change provides stronger evidence.

Yoast's [plugin conflict procedure](https://yoast.com/help/how-to-check-for-plugin-conflicts/) describes controlled isolation and finding the smallest component combination that reproduces the issue. Our adaptation is to reproduce the deployed configuration on staging, preserve its baseline and change one component at a time. Record exactly which assertion disappears or changes, then restore the baseline before the next independent test. Where components depend on each other, document the required combination.

Check server, application, page and CDN caches, plus any tag-manager container or consent conditions affecting browser output. A cached response can make a disabled generator appear active. A logged-in troubleshooting session can also differ from the page an external validator fetches. Save the actual output used for each comparison.

Keep configuration exports, the original generated output and a recoverable code revision. These provide rollback evidence if a narrow schema change unexpectedly affects another template. Avoid combining unrelated plugin upgrades with the attribution test, because you'll lose the ability to explain which change caused the result.

## Decide which records describe the same entity

Before changing IDs, confirm whether the records describe the same business. A parent company, subsidiary, branch and trading brand can have overlapping names while representing different things. A person who writes an article remains distinct from its publisher. The guide to [organisation identity and business facts](/insights/organization-schema-service-business-guide) helps establish those boundaries.

Different values need context. A trading name and a legal name may both be accurate in their respective properties. A business may have several legitimate contact numbers. An obsolete number incorrectly presented as the current general contact is a different finding. Ask the business owner to approve the intended meaning and source for each disputed property.

Use this Off Piste repair framework to choose an action from the captured evidence.

| Finding | Evidence | Action |
| :--- | :--- | :--- |
| Separate entities | Confirmed distinct roles | Retain identities and relationships |
| Consistent repetition | Same entity, equivalent facts | Retain useful output or use references |
| Compatible enrichment | Same entity, additional approved facts | Merge through an owned mapping |
| Conflicting facts | Same property and context, contradictory values | Approve the fact, then correct or suppress |
| Unresolved identity | Uncertain ownership or boundaries | Seek business approval before merging |

The [W3C JSON-LD recommendation](https://www.w3.org/TR/json-ld11/) defines node identifiers and references. Giving two records the same `@id` connects their assertions to one identity. It doesn't choose the correct telephone or establish that two businesses are the same. Combining disputed facts under one ID can preserve the disagreement.

Agree the [approved identities and graph relationships](/insights/connected-schema-graph-service-business-guide) before consolidating output. That gives the repair a stable target without requiring a redesign of the whole graph.

## Choose what to retain, reference, merge or suppress

**Retain** useful output that represents an approved entity accurately and has an accountable owner. A plugin's organisation declaration, author records and breadcrumbs may already meet the contract.

**Reference** an established identity when a template needs a relationship to it. A service can point to the retained organisation through `provider` without inventing another provider identity.

**Merge** compatible approved assertions when contributors describe the same entity. The mapping must define where each property comes from and who maintains it. Several contributors can remain, with one accountable owner for the shared identity and its property mappings.

**Suppress** redundant or incorrect output at the smallest supported scope after checking its dependants. Removing a theme's provider declaration should preserve its valid breadcrumbs. Disabling an entire SEO plugin could also remove article, author or website output you intended to keep.

As a vendor-specific example, [Yoast's schema integration guidelines](https://developer.yoast.com/features/schema/integration-guidelines/) describe replacing overlapping organisation output with a reference, enriching its existing graph and using matching IDs where values don't contradict. The practical choice depends on the installed version and integration. Have the developer verify the relevant API and supported suppression mechanism before implementation.

These actions define the output contract. Each implementation needs controls verified for its installed components. Once the immediate collision is repaired, use the implementation guide to [choose the long-term schema implementation owner](/insights/schema-markup-plugin-vs-custom-code-guide).

## Repair a fictional consultancy's provider graph

The following consultancy, component labels and facts are fictional. All URLs use the reserved example.com domain. Telephone values are illustrative placeholders. The excerpts show the repair contract, with unrelated properties omitted. Google feature eligibility needs a separate check against each feature's requirements.

Example Advisory's operations owner confirms that the CMS organisation record and visible contact page contain the approved general telephone, represented here as `CURRENT_PHONE`. A legacy theme option contains `OBSOLETE_PHONE`. Both declarations describe the same consultancy, with no separate branch or brand involved.

### The emitter inventory

**SEO plugin record.** The homepage, service and article templates receive `https://example.com/#organisation` from the plugin's organisation mapping. Its telephone comes from the approved CMS record. The operations owner approves the facts and the developer owns the mapping. Retain this identity and its compatible logo enrichment. In a real register, record the exact plugin version and output captures.

**Theme record.** A shared theme partial emits `https://example.com/#business` using the legacy telephone option. A staging test disabling only that partial removes the obsolete assertion. Suppress its redundant provider declaration after repointing its dependants. Record the deployed theme version and child-theme revision before editing.

**Service template record.** The service page's `provider` mapping points to `#business`. The template owner must reference `#organisation` instead. The service itself remains a separate entity with its own ID. Record the template revision and the URL on which the change was reproduced.

**Article and breadcrumb records.** The article uses the plugin organisation as publisher and a distinct Person as author. The theme also emits an accurate BreadcrumbList. Retain these records. Save their output as acceptance fixtures so scoped suppression can be checked against useful unchanged content.

The fictional baseline also checks for tag-manager injection and competing Microdata and finds neither. Record those checks in a real inventory, including the container revision and capture conditions.

### Before the repair

On the service page, the combined excerpts contain both provider declarations. The service references the obsolete one. These nodes may arrive in separate script elements.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://example.com/#organisation",
      "name": "Example Advisory",
      "telephone": "CURRENT_PHONE",
      "logo": "https://example.com/logo.png"
    },
    {
      "@type": "Organization",
      "@id": "https://example.com/#business",
      "name": "Example Advisory",
      "telephone": "OBSOLETE_PHONE"
    },
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "publisher": { "@id": "https://example.com/#organisation" }
    },
    {
      "@type": "Service",
      "@id": "https://example.com/services/advice#service",
      "name": "Business advice",
      "provider": { "@id": "https://example.com/#business" }
    }
  ]
}
```

The approved fact establishes which telephone belongs in the output. Changing `#business` to `#organisation` while leaving the obsolete telephone would still attach conflicting assertions to the provider.

### After the service repair

The developer corrects the theme's legacy source mapping to the approved organisation record so it no longer holds an independently maintained telephone. They repoint the service relationship and suppress only the redundant theme organisation declaration through the verified supported mechanism. If that mechanism can't separate provider output from useful breadcrumbs, the implementation needs a narrower integration before release.

The resulting service excerpt retains the established organisation, its correct telephone and its logo. The website publisher stays connected and the service now references the same approved provider.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://example.com/#organisation",
      "name": "Example Advisory",
      "telephone": "CURRENT_PHONE",
      "logo": "https://example.com/logo.png"
    },
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "publisher": { "@id": "https://example.com/#organisation" }
    },
    {
      "@type": "Service",
      "@id": "https://example.com/services/advice#service",
      "name": "Business advice",
      "provider": { "@id": "https://example.com/#organisation" }
    }
  ]
}
```

### Preserve the article and breadcrumb output

Before the repair, article pages received the same conflicting shared theme organisation declaration alongside their valid plugin output. After the repair, that declaration disappears there too. The following article-specific excerpt is unchanged across the repair. Each article page also retains the shared organisation and website nodes shown above.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://example.com/team/alex#person",
      "name": "Alex Example"
    },
    {
      "@type": "Article",
      "@id": "https://example.com/insights/planning#article",
      "headline": "Planning your advisory project",
      "publisher": { "@id": "https://example.com/#organisation" },
      "author": { "@id": "https://example.com/team/alex#person" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://example.com/insights/planning#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Insights",
          "item": "https://example.com/insights"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Planning your advisory project",
          "item": "https://example.com/insights/planning"
        }
      ]
    }
  ]
}
```

This preserves the human author, organisation publisher and valid breadcrumb sequence. The homepage also retains its organisation and WebSite relationship. Multiple script elements may remain across these templates. Acceptance depends on approved assertions and preserved relationships in their combined output.

## Prove the repaired output preserves the website

The [Schema.org validator documentation](https://schema.org/docs/validator.html) describes extraction of JSON-LD, Microdata and RDFa, a combined graph summary and syntax checks. That makes it useful evidence alongside business approval and applicable Google tests.

1. **Compare facts with the approved record.** Check the captured source and rendered output against the visible pages and owner-approved CMS facts. Confirm the obsolete telephone is absent from every affected template and inspect optional fields for unintended changes.
2. **Inspect the combined graph.** Check every emitter, including browser injections and HTML attributes. Confirm the retained identity has compatible assertions and that distinct organisations and people remain distinct.
3. **Follow preserved relationships.** Verify Service.provider, WebSite.publisher, Article.publisher and Article.author on their representative pages. Confirm intended local references resolve in the agreed page or site graph. Keep intentional external references recorded, without requiring every external entity to be declared locally. Compare breadcrumbs and logo enrichment with the baseline.
4. **Validate syntax and vocabulary.** Run the captured output through the Schema.org validator and investigate errors. A clean result doesn't establish that a business fact is correct.
5. **Check applicable Google features.** Use Google's [Rich Results Test](https://search.google.com/test/rich-results) for supported types and review their current requirements. General Schema.org validity and Google feature eligibility answer different questions. Neither guarantees a search appearance.
6. **Sample deployed public pages.** After deployment, clear relevant caches and capture unauthenticated source and rendered output for the homepage, service and article. Check normal consent conditions and browser delivery paths. Compare these results with staging evidence and record any unexplained difference.
7. **Record later indexed-state evidence separately.** Use Search Console URL Inspection to review what Google has indexed when that evidence becomes available. Keep its crawl timing separate from the repaired live output. Turn the approved facts and relationship checks into [schema regression checks for future releases](/insights/automated-schema-regression-testing-website-releases).

Record which templates and URLs passed, which optional cases were checked and what remains uncertain. Roll back the release if required provider, publisher or author relationships disappear, valid breadcrumb output is lost, visible facts diverge or public rendering introduces unexplained assertions. The rollback restores a known configuration while both the release defect and original conflict remain open.

## Leave the next maintainer a clear repair brief

The finished brief should let another developer explain every retained identity and every changed mapping. Keep the emitter register, exact component versions, approved fact owner, source records, suppressed declaration, preserved relationships, before-and-after captures and test evidence together. Add the release revision, rollback conditions and the person responsible for reviewing future updates.

Use the guide to [schema ownership and change records](/insights/schema-markup-change-management-guide) to carry that responsibility into maintenance. The operations owner approves changed business facts. The implementation owner maintains the mappings and checks that theme or plugin updates continue to respect the agreed output.

An agreed brief gives [template and plugin implementation](/services/website-design) a concrete scope. Where the unresolved work concerns factual evidence, policy or Google's inspection results, the next step is to [resolve schema evidence and search eligibility questions](/services/seo).

Assign a named owner to keep the approved facts, retained identities and preserved relationships accurate after the next website change.
