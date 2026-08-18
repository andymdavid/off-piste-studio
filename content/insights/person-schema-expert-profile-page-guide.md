---
title: Building Expert Profile Pages with Person Schema
slug: person-schema-expert-profile-page-guide
description: Build an expert profile page with visible evidence, ProfilePage and Person structured data, stable identifiers, connected authorship, and clear ownership.
intro: An expert profile should give readers and search systems one accurate, maintained account of a person's role, work, and authorship. This guide shows how to build that page and connect it across the site.
author: Lara
date: 2026-08-18
readTime: 12 min read
tags: Person Schema, ProfilePage, Structured Data, Authorship, Entity Trust, Content Governance
topics: SEO & Search, Websites & UX
cluster: AI Search Visibility / Entity Trust and Brand Signals
relatedPosts: how-ai-search-understands-your-business, article-schema-authorship-dates-guide, organization-schema-service-business-guide
---
<!--
Primary-source and live SERP review record, accessed 18 August 2026 in Australia/Perth:
- Google Search Central ProfilePage structured data.
- Google Search Central Article structured data and author markup best practices.
- Google Search Central Creating helpful, reliable, people-first content.
- Google Search Central general structured data guidelines.
- Schema.org Person and ProfilePage definitions.
- Query set checked: person schema for authors, profile page schema, expert profile page SEO, author profile page structured data, Person schema JSON-LD, how to connect author schema to author page, founder profile page schema, ProfilePage vs Person schema, person @id article author schema.
- The result set mixed official documentation, schema generators, technical explainers, examples, and forum discussions. Many third-party pages framed Person markup as an E-E-A-T or AI visibility tactic. Those causal claims were not adopted.

Editorial boundaries:
- The worked example is a fictional Australian advisory firm and does not use Lara's personal details.
- The profile fields and maintenance choices are Off Piste implementation judgement, not Google ranking requirements.
- Structured data does not create expertise or guarantee rankings, Knowledge Panels, AI citations, recommendations, indexing, or search features.
-->

## Give each author one governed identity

A consultancy publishes articles under “Alex Morgan”. Its team page calls the same person “Alex J. Morgan, Director”. One article links the byline to the homepage, another has no link, and a third emits a new Person object with a different URL. LinkedIn still shows an earlier role.

Readers now have to decide whether these references describe one person and whether the claimed expertise is current. Templates face the same ambiguity. Another schema block would encode the disagreement.

An expert profile page gives the person one maintained home on the site. It can explain their role, relevant work, supported credentials, authored content, and public professional profiles. Articles and other templates can then refer back to that identity instead of recreating it.

Google's [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) encourages clear bylines where readers would expect them and links to background about the author and the areas they write about. That guidance supports useful authorship for readers. It doesn't say an author page automatically improves rankings.

If the public name, role, expertise, or profile owner is still disputed, begin with the wider [business entity and trust audit](/insights/how-ai-search-understands-your-business). Profile implementation should start once the organisation can approve what it is prepared to publish and maintain.

## Decide what the profile can truthfully claim

Start with evidence and consent. Agree the public name, current role, areas of work, first-hand experience, relevant credentials, affiliations, authored work, image, external profiles, and contact context. A claim belongs on the profile only when the business can support it and the person has approved its use.

The visible page is the source readers can inspect. Google's [general structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) require structured data to describe the page it appears on and not mislead people. They also make clear that correctly implemented markup does not guarantee a search feature.

Schema can't create experience that the page fails to demonstrate or guarantee rankings, a Knowledge Panel, an AI citation, a recommendation, or inclusion in a search feature. Off Piste's implementation judgement is to publish fewer, well-supported facts and assign an owner before a developer maps them into a template.

The short brief below prevents the profile copy, CMS fields, and schema from becoming three separate versions of the person.

```insight-module
{
  "type": "practice",
  "label": "In practice",
  "title": "Approve the identity before building the template",
  "intro": "Record the facts and ownership decisions that every visible profile and structured reference will reuse.",
  "items": [
    "Choose one public name, canonical profile URL, and stable Person @id",
    "Approve the role, areas of work, credentials, affiliations, and first-hand evidence",
    "Confirm consent for images, identifiers, and external profile links",
    "Name the person responsible for updates, redirects, and relationship changes"
  ]
}
```

## Build the page around visible evidence

Google's current [ProfilePage structured data documentation](https://developers.google.com/search/docs/appearance/structured-data/profile-page) says the page's primary focus must be one person or organisation affiliated with the site. Its valid examples include an author page, an employee page, and an About Me page. That describes feature eligibility. A prospective client needs more from an expert profile.

For a professional service firm, a useful template usually needs the following visible fields.

- One clear public name and current role
- A specific biography explaining relevant areas of work
- First-hand work such as projects, responsibilities, publications, or speaking
- Credentials and affiliations the firm can verify and keep current
- Authored or reviewed content that helps readers inspect the person's contribution
- Selected external profiles that genuinely identify the same person
- Appropriate, privacy-conscious contact context

Each field should earn its place. A long list of topic keywords is weaker than a short account of the work the person has actually done. A credential needs its correct name and current status. An external profile should resolve to the same individual and remain maintained.

Keep the profile at one stable, indexable canonical URL. Link to it from visible bylines, the relevant team area, and authored-content listings. If the wider page lacks useful semantic structure or evidence blocks, the [structured content guide](/insights/structured-content-ai-search-guide) covers that template work.

## Connect ProfilePage to one Person identity

`ProfilePage` describes the page. Its `mainEntity` identifies the person the page is about. Google requires `mainEntity` for ProfilePage feature eligibility and requires a name or alternate name for the person or organisation. The [Schema.org ProfilePage definition](https://schema.org/ProfilePage) supplies the broader page vocabulary, while [Schema.org Person](https://schema.org/Person) supplies properties for the individual and their relationships.

That distinction matters. A property can be valid Schema.org vocabulary even when Google's feature documentation neither requires nor recommends it. Choose properties because they accurately express approved, visible facts. Treat the available Person properties as options, with privacy and consent setting the limit.

This fictional example matches a visible profile for Alex Morgan at Example Advisory. The URL and identifiers are illustrative.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://www.example.com/people/alex-morgan#profile-page",
  "url": "https://www.example.com/people/alex-morgan",
  "mainEntity": {
    "@type": "Person",
    "@id": "https://www.example.com/people/alex-morgan#person",
    "name": "Alex Morgan",
    "url": "https://www.example.com/people/alex-morgan",
    "image": "https://www.example.com/images/alex-morgan.jpg",
    "jobTitle": "Advisory Director",
    "worksFor": {
      "@type": "Organization",
      "@id": "https://www.example.com/#organization",
      "name": "Example Advisory"
    },
    "sameAs": [
      "https://www.linkedin.com/in/example-alex-morgan"
    ]
  }
}
</script>
```

The visible page would need to show Alex's name, image, role, employer, and linked professional profile for this example to remain defensible. `jobTitle`, `worksFor`, and the chosen `sameAs` link are vocabulary choices based on those facts. They are not required ProfilePage properties in Google's documentation.

Use `sameAs` selectively for external pages that unambiguously identify the same person. A conference mention, an unrelated social account, or an unmaintained directory entry may be better as a normal visible link or omitted. Use the [third party signal audit](/insights/third-party-brand-signals-ai-search-audit) when professional profiles and association records disagree.

## Reuse the same identity across the site

Once the profile owns the Person identity, other templates should refer to it. Google's [Article author guidance](https://developers.google.com/search/docs/appearance/structured-data/article#author-markup-best-practices) says `author.url` should uniquely identify the author. When that URL is an internal profile page, Google recommends marking it with ProfilePage structured data.

An Article author reference can therefore point to the canonical profile URL and reuse the stable Person `@id`. The profile's Person node can use `worksFor` to refer to the organisation's established identifier. In plain relationship notation, the pattern is `Article → author → Person` and `ProfilePage → mainEntity → Person`, with the same Person identity in both places.

Keep the neighbouring implementations governed in their own templates. The [Article schema and authorship guide](/insights/article-schema-authorship-dates-guide) covers author fields, dates, and article validation. The [Organization schema guide](/insights/organization-schema-service-business-guide) covers the business node reused by `worksFor`.

Generate article references from one author record in the CMS rather than copying a full Person object into every article. That keeps role changes, profile migrations, and name updates together. Test representative pages whenever the model changes.

## Validate the page and its relationships

Validation needs to cover the reader-facing page, the markup, and the references between templates. Google's ProfilePage deployment guidance recommends validating markup, testing deployed pages with URL Inspection, ensuring Google can access them, and keeping sitemaps current.

1. Review the visible profile with the person and the fact owners. Remove unsupported claims and confirm consent for personal details, images, credentials, and links.
2. Check the canonical URL, indexability, internal links, and rendered HTML. The profile should be accessible without login and focused on one affiliated person.
3. Inspect the rendered JSON-LD. Confirm its claims appear visibly and its canonical URL, ProfilePage `@id`, Person `@id`, and organisation `@id` are consistent.
4. Run Google's Rich Results Test against the rendered page. Review errors and warnings against the current ProfilePage documentation.
5. Use Schema.org's validator when you need to inspect vocabulary relationships beyond Google's supported feature guidance.
6. Open representative articles and confirm the visible byline and Article author reference resolve to the governed profile and Person identity.
7. After deployment, use Search Console URL Inspection and monitor the live output after crawls and template releases.

A passing validator proves only that the tested output meets the rules the tool checked. It doesn't prove the biography is true, guarantee indexing, or predict a search or AI feature.

## Keep the profile accurate after publication

Give the profile a named editorial owner and a technical owner. Editorial responsibility covers the public biography, role, credentials, affiliations, image permissions, and external links. Technical responsibility covers the canonical URL, identifiers, template output, relationship references, redirects, and validation.

Review the profile when the person changes role, earns or loses a relevant credential, moves organisation, changes public name, withdraws image consent, or stops maintaining an external profile. A periodic review is useful, but event-driven ownership catches the important changes sooner. That cadence is Off Piste editorial judgement rather than a platform requirement.

When someone leaves, decide whether their historical authorship remains useful and accurate. An article's real author shouldn't be reassigned for convenience. The old profile may remain as a limited historical record, move to an alumni status where appropriate, or be retired. The decision should respect consent, employment policy, and the reader's need to understand existing work.

If the profile URL changes, redirect the old URL to the new canonical location and update internal links, sitemaps, Article author URLs, and reused `@id` references deliberately. A careless change to the Person identifier can split one maintained identity into two. Check external profiles for stale roles, old employers, broken links, and conflicting names after any material change.

## Turn the audit into a scoped site change

One accurate profile can become a reusable specification for the CMS. Define its approved fields, visible layout, canonical behaviour, Person identifier, organisation relationship, article references, validation checks, and ownership. Then test the pattern with a second profile before rolling it across a multi-author site.

If the identity is agreed but the CMS has no reusable author or expert profile model, the work belongs in [website design and development](/services/website-design). If names, identifiers, markup, indexing, and external profiles conflict across several templates and sources, scope a coordinated [SEO and structured-data audit](/services/seo).
