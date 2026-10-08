---
title: Build an About Page People and Search Systems Understand
slug: about-page-entity-trust-ai-search-guide
description: Build a clear About page that identifies your business, earns buyer confidence, connects claims to evidence, and stays accurate as the company changes.
intro: A useful About page tells a buyer who the business is, what it does, who it helps, and where to verify the claims that matter. It also gives search and AI systems a clear public account of the organisation while recognising that representation depends on wider evidence.
author: Lara
date: 2026-09-28
readTime: 10 min read
tags: About Page, Entity Trust, AI Search Visibility, Business Representation, Brand Signals, Organization Schema, Website Content
topics: AI & Automation, Websites & UX
cluster: AI Search Visibility / Entity Trust and Brand Signals
relatedPosts: how-ai-search-understands-your-business, organization-schema-service-business-guide, person-schema-expert-profile-page-guide
---
<!--
Source review record, accessed 28 September 2026 in Australia/Perth:
- Google Search Central, Organization structured data, last updated 8 September 2026 UTC.
- Google Search Central, Creating helpful, reliable, people-first content.
- Google Business Profile Help, Guidelines for representing your business on Google.
- Google Search Central, General structured data guidelines.
- Nielsen Norman Group, Presenting Company Information on Corporate Websites, Third Edition. This older report is used only for durable usability guidance, not current platform behaviour.

Distinctness check completed 28 September 2026:
- This article owns visible About-page anatomy, evidence placement, internal links, approval and maintenance.
- Organization schema code, cross-surface diagnosis, third-party remediation and entity correction remain in their dedicated guides.
-->
## The About page has a practical job

A buyer reaches an About page because they want to identify the business behind the promise. They need to know what the company does, who it serves, who is responsible for the work, and whether its claims lead to credible evidence.

That makes the page more than a company story. It should act as a concise public identity record and a route to deeper proof. A search engine or AI system may also use those visible facts when resolving the organisation, but the buyer's decision remains the useful design constraint.

Google's [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) asks whether a reader can find background about the site and its authors, including through an About page and author pages. This is a trust question, not an E-E-A-T score or a promise of higher rankings.

Older corporate website research from Nielsen Norman Group also found that people expect company information to be easy to locate and want to understand quickly what an organisation does. Its [third-edition company information report](https://media.nngroup.com/media/reports/free/Presenting_Company_Information_on_Corporate_Websites_3rd_Edition.pdf) predates current search and AI products, so its value here is limited to that durable usability principle.

If the problem is wider than one page, start with the guide to [how AI search understands your business](/insights/how-ai-search-understands-your-business). It separates problems in owned pages, public profiles, structured data, external evidence and crawler access.

## Start with an approved business record

Copywriting is too early if the team hasn't agreed what the business is. Create a small approved record first. It should cover the public business name, a concise description, core services, intended audience, operating locations, ownership or leadership, the primary contact route, and authoritative profiles.

Google's [Business Profile representation guidelines](https://support.google.com/business/answer/3038177) say a business should be represented accurately and use its real-world name consistently across its website, signage, stationery and branding. The guidance supports factual alignment, while keyword additions and repeated administrative detail fall outside its scope.

Legal names, business numbers and registered addresses can help a customer verify the organisation. Treat them as optional details, guided by the business model, privacy obligations and buyer need.

Disagreements across the website, listings and social profiles need a separate reconciliation exercise. Use the process to [audit third-party business signals](/insights/third-party-brand-signals-ai-search-audit) once the approved record is settled.

## Make the first screen answer the buyer's basic questions

The opening should identify the organisation before telling its history. A clear first screen names the business, describes its work, identifies the people it serves, and gives enough operating context for a visitor to decide whether to continue.

A professional service firm might open this way.

> Northbank Advisory is a Perth operations consultancy for established service businesses. We help leadership teams redesign delivery systems when growth has made roles, handovers and reporting difficult to manage.

The example is specific enough to orient a buyer and restrained enough to support. The next section can explain who leads the work and why the firm's approach is relevant.

An origin story may still deserve a place. Put it after the reader understands the current business. A chronology only earns space when it explains the company's capabilities, values or operating model today.

## Build the page around identity, relevance and proof

Once the opening establishes identity, the rest of the page should help a buyer assess fit and confidence. Introduce the problems the firm is equipped to solve. Explain the capabilities behind that work. Name the people or ownership that matter to delivery. Add operating facts that affect eligibility, availability or location.

Proof should sit close to the claim it supports. A statement about sector experience can link to relevant case studies. A claim about specialist expertise can lead to a maintained profile. A service description can lead to the page that explains scope, process and exclusions.

In our editorial judgement, the page should introduce the organisation and help readers reach the best supporting evidence. That focus keeps it concise and makes important claims easier to verify.

That distinction matters commercially. Unsupported confidence language creates another reason to hesitate. A useful evidence path lets the buyer test the claim without hunting through the site.

The drafting brief below turns that judgement into a practical review. Use it after the team has agreed the business record and the role of the page.

```insight-module
{
  "type": "practice",
  "label": "In practice",
  "title": "Brief the page around facts buyers can verify",
  "intro": "Use the agreed business record to brief a concise page that introduces the organisation and routes readers to stronger evidence.",
  "items": [
    "State the public business name, work, audience, and operating context clearly",
    "Introduce the people or ownership relevant to buyer confidence",
    "Support important claims with links to services, profiles, case studies, and authoritative external references",
    "Align visible facts with accurate Organization structured data",
    "Name the page owner and the events that trigger review"
  ]
}
```

## Send detailed evidence to the page that can support it

An About page loses focus when it becomes a compressed version of the whole website. Give each claim a useful home.

Service pages should explain the work in enough detail for a buyer to understand scope and fit. The About page can summarise the firm's capabilities and link to those services.

A short leadership introduction may establish ownership and accountability. Individual credentials, authored work and professional profiles belong on a maintained expert page. The guide to [building a dedicated expert profile](/insights/person-schema-expert-profile-page-guide) explains how to connect that person-level evidence without confusing the individual with the organisation.

Outcome claims need the conditions, method and evidence that make them credible. Move that detail into a case study and use the About page to point to it. Our guide to [building credible case-study evidence](/insights/credible-client-case-study-evidence-guide) covers attribution, context and substantiation.

Contact, location and policy pages should own operational details that change independently. The About page can state the relevant operating context, then link to the current source. This allocation is Off Piste's editorial judgement rather than a documented search requirement.

## Align visible facts with Organization structured data

Structured data can reinforce the organisation described on the page. Google's [Organization structured data documentation](https://developers.google.com/search/docs/appearance/structured-data/organization) says the markup can help Google understand administrative details and disambiguate an organisation. Google recommends placing it on the homepage or one page that describes the organisation, such as an About page.

The markup should describe the same entity a visitor can see. Google's [general structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) require structured data to represent the page accurately and prohibit misleading content. Ownership, affiliation, purpose and identity shouldn't change when they move from prose into markup.

Settle the visible record before choosing properties. Then [implement and validate Organisation schema](/insights/organization-schema-service-business-guide) through the dedicated technical guide. It covers entity type, fields, `sameAs`, JSON-LD deployment and validation without turning the About page into a schema tutorial.

Accurate markup doesn't guarantee rankings, a Knowledge Panel, AI citations or recommendations. It gives machines an explicit version of facts the organisation can support.

## Connect the About page to the rest of the site

Use a familiar About label in the main navigation or another dependable site-wide location. The older Nielsen Norman Group research supports recognisable access to company information. Current site architecture still needs to reflect the journeys and constraints of the actual website.

The page should link out where the buyer's next question becomes more specific. Services explain the offer. Expert profiles substantiate individual experience. Case studies hold detailed proof. Contact information supports action. Relevant policies explain obligations or safeguards.

Incoming links also matter. A service page can identify the company delivering the work. An article can link an author's role to a profile. A case study can connect an outcome to the organisation responsible. These links turn isolated claims into a navigable evidence system.

The broader guide to [structuring a website for AI search](/insights/structured-content-ai-search-guide) explains how semantic content, internal links, visible proof and markup work together across the site.

## Give the page an owner and a review trigger

Assign one person to approve the public business record and one implementation owner to keep the page and markup aligned. They may be the same person in a small firm. What matters is that a change has somewhere to go.

Review the page after a trading-name change, rebrand, acquisition, leadership change, major service shift, new operating location or material new proof. Check the visible page first. Then update structured data and the external profiles affected by the same change. When a founder, CEO or senior expert changes while the company continues, follow the [leadership change transition guide](/insights/leadership-change-entity-search-transition-guide) so the About page changes on the same governed timeline as profiles and public records.

A rebrand needs a broader migration sequence than an About-page edit. Follow the [business rebrand and entity migration guide](/insights/business-rebrand-entity-search-migration-guide) when names, domains or public identity are changing together. Use the third-party signal audit when outside records need correction.

Record the review date and what changed. That small governance step reduces the chance that a polished page becomes an authoritative-looking source of stale information.

## Use the page as a self-audit

Read the published page as if you know nothing about the company. Can you identify its public name, work, audience and operating context from the opening? Can you tell who is responsible? Can you follow important claims to a service, profile, case study or authoritative external source? Do the contact route and next action fit the buyer's likely need?

Then compare the visible facts with the Organization markup and priority public profiles. Look for differences that would change a buying decision. Don't treat minor wording variation as failure.

If the facts are sound but the page buries identity and proof, the constraint is likely [website design that connects identity and evidence](/services/website-design). If names, services or locations conflict across the site, profiles and search surfaces, the next step is [SEO strategy for conflicting business signals](/services/seo). If the team still needs to agree what the organisation does or who it serves, resolve that brand decision before polishing the page.
