---
title: A Practical Structured Data Audit for Your Website
slug: structured-data-schema-audit-guide
description: Audit rendered schema markup across your website, diagnose why tools disagree, assign repairs and verify structured data fixes after deployment.
intro: A structured data audit follows the evidence from visible business facts through CMS data and rendered markup to the state Google can fetch, index and assess.
author: Lara
date: 2026-08-23
readTime: 13 min read
tags: Structured Data, Schema Markup, Technical SEO, Schema Validation, Search Console, JSON-LD
topics: SEO & Search, AI & Automation
cluster: AI Search Visibility
relatedPosts: structured-content-ai-search-guide, organization-schema-service-business-guide, article-schema-authorship-dates-guide
---
<!--
Primary sources checked 23 August 2026 in Australia/Perth:
- Google Search Central, General structured data guidelines.
- Google Search Console Help, Fix structured data issues.
- Google Search Console Help, Rich Results Test.
- Schema.org, Markup Validator.
- Google Search Central, Generate structured data with JavaScript.
- Google Search Central, AI features and your website.

Editorial boundaries:
- The audit sample, defect classes, prioritisation method and fictional examples are Off Piste's practical workflow, not a Google scoring system.
- Passing a validator does not guarantee indexing, a rich result, rankings, a Knowledge Panel, an AI citation or a recommendation.
- Tool interfaces and supported search features change. Check the current documentation while conducting an audit.
-->

## When valid markup still leaves you uncertain

A website redesign goes live. The SEO plugin reports no problems, but Search Console shows an Article warning. A service page passes one validator and appears absent from another. The homepage now contains two Organization nodes with different identifiers. Nobody is sure whether the cause sits in the copy, a CMS field, the template or Google's last crawl.

Opening another testing tool won't resolve that uncertainty on its own. A useful structured data audit follows one claim through four states. What can a visitor see? What does the CMS or source record contain? What graph reaches the rendered page? What can Google currently fetch and what has it indexed?

These states matter because syntax is only one test. Google's [general structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) require markup to describe the page it appears on, represent visible content and follow technical and quality rules. Google also makes clear that correctly marked-up content isn't guaranteed a rich result. Validity, factual agreement, policy compliance, feature eligibility, indexing and display selection are separate judgements.

The wider guide to [structuring a website for AI search](/insights/structured-content-ai-search-guide) explains the relationship between semantic HTML, metadata, schema, proof and internal links. This guide takes the next job. It diagnoses an existing implementation and routes each repair to its owner.

If the business is choosing what to fund before implementation, use [the service-business schema prioritisation framework](/insights/schema-markup-priorities-service-business) to scope the backlog first.

## Define the audit sample before opening a validator

Choose a representative page from every template that emits structured data. Start with the homepage, a service page, an article and an expert profile where those templates exist. Add pages that are commercially important, recently changed or named in a Search Console issue. A random collection of URLs can hide template-wide defects.

If a template has meaningful variants, sample them. A service page with a price, one without a price and one created before the latest CMS update may produce different graphs. Likewise, one clean article doesn't prove that older author records or migrated dates render correctly.

Record the sample before investigation begins. This keeps a single alarming warning from displacing a defect that affects every high-value service page.

| URL or template | Intended subject | Why it matters | Signal to investigate | Owner |
| --- | --- | --- | --- | --- |
| Homepage | Primary business | Identity used across the site | Duplicate Organization IDs | Technical lead |
| Service template | Visible service offer | Supports enquiries | Provider reference missing | Service owner |
| Article template | Article, author and publisher | Publishing integrity | Date warning in Search Console | Editor |
| Profile template | Expert and profile page | Connects authorship evidence | Person ID changes by page | Content lead |

Search Console groups affected items by issue, which is useful evidence about reach. Google's [structured data issue workflow](https://support.google.com/webmasters/answer/13300208?hl=en) recommends inspecting representative pages, testing the live URL and fixing all instances of a template problem before starting validation. Treat the report as one route into the sample, not a complete inventory of everything Schema.org can express.

## Check the facts people can actually see

Read each sampled page before reading its JSON-LD. Write down the name of the business, service, author, date, location and any material claim the markup is meant to describe. Confirm those facts against an approved business record where one exists.

Imagine a fictional consultancy called Northbank Advisory. Its visible footer and approved profile use that trading name. An old theme component emits “Northbank Consulting Pty Ltd”, while a plugin emits a second Organization with a discontinued phone number. Both blocks may be readable JSON. The audit finding is still a factual and governance conflict.

Ask the business to approve its canonical identity before a developer chooses between competing names. If that identity remains disputed, use the [business entity and trust audit](/insights/how-ai-search-understands-your-business) first. Code should express an agreed fact rather than settle a commercial or legal disagreement.

Visible structure also needs attention. Accurate JSON-LD doesn't compensate for an article with no byline, a service that never appears in the copy or a location hidden from visitors. When headings, labels, link text and page meaning are unclear, the repair belongs in [accessible semantic website structure](/insights/website-accessibility-and-seo) as well as the markup.

For every property that matters, record three things in plain language. State the rendered value, point to the visible or approved evidence and name who can approve a correction. This is the factual baseline for the technical inspection.

## Inspect source HTML and rendered output separately

View source tells you what the server returned initially. The rendered DOM tells you what exists after scripts and page components have run. A CMS field tells you what an editor entered. They're related, but none is proof of the others.

Start by searching the initial response for `application/ld+json`, Microdata or RDFa. Then inspect the final DOM in browser developer tools. Count the nodes, copy the rendered blocks and compare their values with the factual baseline. Look for markup that appears twice, disappears during hydration or changes after a component loads.

Google's guidance on [JavaScript-generated structured data](https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript) confirms that dynamically generated markup can be processed. It recommends testing the implementation with the Rich Results Test and checking the rendered HTML through URL Inspection. That makes the deployed output the audit evidence. A correct tag-manager rule or CMS preview isn't enough if the final page omits the node or a crawler can't retrieve its dependencies.

When the results differ, capture the exact URL, test time, source block, rendered block and fetch result. A developer can act on that evidence. “Schema isn't detected” doesn't say whether the code was absent from source, injected late, removed by hydration, blocked during fetch or simply outside a tool's supported feature set.

## Use each testing tool for the question it answers

Tool disagreement often reflects a difference in scope or state. Use each result to answer its own question.

| Check | Question it answers | What it cannot prove |
| --- | --- | --- |
| Source HTML | What did the server return before scripts ran? | What remained after rendering |
| Rendered HTML | What graph exists after the page runs? | What Google has indexed |
| Schema.org Markup Validator | Can the vocabulary and graph be extracted? | Google feature eligibility |
| Rich Results Test | Does the fetched page contain supported rich-result markup and relevant errors or warnings? | Support for every Schema.org type |
| URL Inspection | Can Google access the live or indexed URL, and what state does it report? | That a rich result will be shown |
| Search Console report | Which detected issue groups and affected items does Google report? | A complete vocabulary audit |

The [Schema.org Markup Validator documentation](https://schema.org/docs/validator.html) says the tool extracts JSON-LD, RDFa and Microdata and presents a graph of the results. It can also evaluate dynamically generated markup. Use it to inspect vocabulary relationships and syntax without interpreting silence about a Google feature as a failure.

Google's [Rich Results Test documentation](https://support.google.com/webmasters/answer/7445569?hl=en) describes a different purpose. The test checks which Google rich-result types it finds on a public URL or code sample, reports crawl status, and shows detected items, errors and warnings. It also lets you inspect rendered HTML. It isn't a universal Schema.org validator.

A Service node can therefore appear coherently in the Schema.org graph without producing a dedicated rich-result preview. A live test may also see a fix before the indexed result changes. Record which version each tool examined and what question you asked before treating the results as contradictory.

## Read the site as one connected entity graph

Page-by-page validation can miss a site-wide identity problem. Search the rendered sample for every `@id`, then map which nodes define an entity and which nodes refer to it.

Return to Northbank Advisory. Its homepage defines `https://northbank.example/#organization`. Article pages identify the publisher as `https://northbank.example/#publisher`. Service pages embed a complete provider object with no `@id`. Those pages contain plausible values, but they don't express one consistently referenced provider.

The repair is to approve one stable identity and make the relevant templates refer to it. The [Organization schema implementation guide](/insights/organization-schema-service-business-guide) covers canonical business facts, stable identifiers and duplicate provider nodes. The [Service schema guide](/insights/service-schema-service-pages-guide) covers connecting an accurate service offer to that provider without copying unsupported claims.

Apply the same relationship check to publishing. Byline, Article author and expert profile should identify the same person where that is the intended model. Route article byline, publisher and date defects to the [Article schema guide](/insights/article-schema-authorship-dates-guide). Route disconnected authors, weak profile evidence and unstable Person identifiers to the [expert profile and Person schema guide](/insights/person-schema-expert-profile-page-guide).

Consolidate nodes only when the evidence shows they describe the same entity. A parent company, local branch, practitioner and brand may be genuinely distinct. The audit should expose the modelling decision and its evidence while preserving those distinctions.

## Classify the defect before choosing the repair

The same symptom can have several causes. “Markup not detected” might be an empty required CMS field, a conditional template bug, client-side rendering failure, blocked fetch, unsupported rich-result type or an indexed version that predates the fix. Assign a defect class only after comparing the visible facts, source, rendered DOM and Google-facing evidence.

| Defect class | Typical evidence | Likely owner | Verification |
| --- | --- | --- | --- |
| Content | Visible fact is missing, stale or unsupported | Editor or business owner | Approved page and markup agree |
| CMS data | Correct field is empty or mapped inconsistently | CMS owner | Sample records render consistently |
| Template logic | Duplicate or wrong nodes recur by page type | Developer | Multiple template samples pass |
| Rendering | Markup appears late, changes or disappears | Developer | Deployed rendered DOM is stable |
| Crawler access | Live fetch can't retrieve the page or resources | SEO and developer | Live inspection succeeds |
| Feature eligibility | Valid type isn't supported for the expected display | SEO lead | Current feature documentation checked |
| Stale indexing | Live page is fixed but indexed state is older | SEO lead | Recrawl and report state monitored |

Give the repair owner a precise handoff. Include the affected URL or template, the observed output, the expected output, the evidence for that expectation, the suspected owning layer and the method that will verify the deployed fix. Attach the smallest relevant snippets rather than a screenshot with no fetch state or URL.

This classification keeps content teams from repeatedly editing copy to solve a rendering defect. It also keeps developers from changing a template before the business approves the fact it should publish.

## Prioritise by reach, risk and commercial importance

Fix misleading, hidden or policy-sensitive claims first. A false rating, unavailable offer or wrong business identity deserves attention even when it affects one page. Next, address defects repeated across important templates. Then handle warnings and useful enhancements that leave the page accurate.

Consider two fictional findings. One article carries a recommended image warning. Every service page also emits a discontinued phone number in a duplicate provider node. The second issue has wider reach, exposes a stale business fact and affects pages close to enquiry. It should normally be repaired first, even if the warning is more visible in a dashboard.

Avoid inventing a weighted score that implies more precision than the evidence supports. Record reach as the affected template set, risk as the consequence of leaving the statement live and importance as the page's role in a real customer journey. Add confidence when the cause is uncertain. The team can then see why a high-reach template defect outranks an isolated enhancement.

## Verify the deployed fix and the indexed state

Retest the public URL after deployment. Inspect the visible page and rendered graph again, then sample other pages using the same template. A fix on the example URL isn't complete if the shared template still fails for records with missing authors, optional prices or legacy fields.

Run the relevant live tests and keep the output with the issue record. Use URL Inspection and request indexing when it is appropriate for the changed page. For a Search Console issue group, start **Validate fix** only after all known affected instances are corrected. Google's [fix structured data issues guidance](https://support.google.com/webmasters/answer/13300208?hl=en) explains that validation checks pages in the issue group and can fail when an affected instance remains unresolved.

Keep three statuses separate in reporting. The deployed page can be fixed. Google can recrawl and index the new version later. Google can then decide whether and how to display an eligible result. A passed live test proves neither the indexed state nor future presentation.

This boundary also matters for AI search. Google's current [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) says there is no special Schema.org markup required for AI Overviews or AI Mode. Normal Search technical requirements still apply, and structured data should match visible text. An accurate graph can improve clarity and governance, but don't report it as a guarantee of rankings, Knowledge Panels, AI citations or recommendations.

## Turn the audit into a governed repair plan

An audit is useful when every finding ends in a decision. Isolated content or CMS mismatches can often be corrected internally once an owner approves the source fact. Known entity problems can move into the linked Organization, Service, Article or Person implementation guide. Template-wide duplication, crawl uncertainty and Search Console reporting may need a coordinated [technical SEO audit](/services/seo). Weak CMS modelling, hydration problems and inconsistent page architecture may need [website design and development](/services/website-design).

Keep the evidence record after the repair. It becomes the regression sample for the next redesign, plugin update or CMS migration. Give each critical template an editorial owner for meaning and a technical owner for output. Review stable identifiers and visible facts when the business changes, not whenever a validator changes colour.

Fix what is false or risky, repair what repeats at scale, document what is ineligible for a hoped-for feature and monitor what is waiting for recrawl. That's how a structured data audit turns uncertain warnings into owned website work.
