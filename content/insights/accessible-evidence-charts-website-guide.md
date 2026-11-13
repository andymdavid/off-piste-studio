---
title: Publishing Accessible Evidence Charts on Your Website
slug: accessible-evidence-charts-website-guide
description: Publish evidence charts with clear findings, usable text alternatives, source data and practical checks for your website team.
intro: An approved finding still needs a usable public presentation. Give readers a clear chart, equivalent text, inspectable values and a source they can follow, then check the component on the page where they'll use it.
author: Lara
date: 2026-11-14
readTime: 7 min read
tags: Accessible Charts, Evidence Publishing, Data Visualisation, Text Alternatives, Content Governance
topics: Websites & UX, Content & Brand
cluster: Evidence-Led Content and Citation-Worthiness
relatedPosts: ai-search-citation-worthy-content, citation-worthy-original-research-business-data, website-accessibility-and-seo
---
<!-- Primary sources checked 14 November 2026, Australia/Perth. Worked values are W3C tutorial data, not Off Piste analytics. Acceptance sequence and ownership recommendations are Off Piste editorial judgement. -->

## Start with the finding you've approved

A prospective client opens your case study on their phone. The outcome chart looks convincing, but its labels are tiny and the source is baked into the image. They can't inspect the figures or establish what period they cover. The evidence is approved, but the reader can't verify it.

When you publish a finding, readers need its meaning, values, scope and provenance together. That's a practical part of producing [citation-worthy content](/insights/ai-search-citation-worthy-content). Your editor and developer need to check all four before release.

Write down the reader's question alongside the metric, unit, period and population. Include the approved wording and its main limitation. For a client outcome, that might mean identifying which customers were measured and whether a total includes repeat activity. If those decisions are unresolved, return to the guide to [turn business data into original research](/insights/citation-worthy-original-research-business-data). If the evidence doesn't clearly support the wording, [evaluate the source behind the claim](/insights/evaluate-sources-website-content-guide) first.

The [Scottish Government's chart guidance](https://designsystem.gov.scot/guidance/charts) connects chart choice to the data relationship, message and audience. A ranking of quarterly totals shows which site recorded the largest total. A monthly series answers how activity changed through that quarter. Agree the question before choosing the presentation so the chart preserves the approved claim.

## Publish one bounded example

We'll use the [W3C WAI long-description tutorial's published values](https://www.w3.org/WAI/tutorials/images/examples/long-description/). These are demonstration data for three example websites, not Off Piste analytics, client results or market benchmarks. The source table describes first-quarter 2025 visitors in thousands. We're retaining the source's terminology, so don't read these totals as a verified count of distinct people across the quarter.

Site 1 has the largest quarterly total at 348 thousand visitors, followed by Site 2 at 337 thousand and Site 3 at 308 thousand. Horizontal bars would make the ranking and gaps easier to compare. Here, prose and a small table give readers the finding and exact values. The quarterly totals don't show how activity changed month by month in the original tutorial.

The linked tutorial is the source for this adapted quarterly comparison. Its page was updated on 27 February 2026 and checked for this article on 14 November 2026. The measurement period remains Q1 2025. Keep those dates distinct when recording a chart's provenance.

## Make the finding available in text

A visible explanation should give readers the ranking, exact totals, unit, period and limitation. Readers can then understand the finding without estimating bar lengths.

The Government Analysis Function's [guidance on publishing charts](https://analysisfunction.civilservice.gov.uk/support/communicating-analysis/introduction-to-data-visualisation-e-learning/module-10-publishing-charts/) distinguishes equivalents for a chart's message from access to individual values. Choose the equivalent for the reader's task. A short interpretation can explain a relationship, while a table supports exact lookup. A large table of raw observations may still leave someone struggling to identify the pattern.

For chart images, [W3C's complex-image guidance](https://www.w3.org/WAI/tutorials/images/complex/) describes a short alternative identifying the image and a longer description conveying its essential information. Brief the developer on how those descriptions connect to the image in its actual page context. Keep the short `alt` attribute concise and put the full explanation in the longer description.

For an HTML chart with CSS bars, ask the developer to check that the rendered content exposes the title, categories and values in a sensible reading order and that readers can access the surrounding explanation. An `alt` attribute belongs to an image, so check the representation you've published before choosing the technique.

Google's [guidance for AI features](https://developers.google.com/search/docs/appearance/ai-features) recommends making important content available in textual form. That's a reason to put the finding in page text. Inclusion remains at Google's discretion. Accessible presentation alone provides no evidence of a ranking or citation gain.

## Give readers values they can inspect

Readers can look up the exact tutorial totals in the table below. Each row represents one example site in Q1 2025, and the values use the source table's unit of thousands of visitors.

| Site | Q1 visitors (000s) |
| :--- | :--- |
| Site 1 | 348 |
| Site 2 | 337 |
| Site 3 | 308 |

Keep the [original tutorial table](https://www.w3.org/WAI/tutorials/images/examples/long-description/) available through an ordinary page link. Readers can then inspect the monthly figures that this quarterly comparison omits. For business research, link the approved public methodology or data page and retain any necessary qualifications beside the finding.

W3C's [table-header examples](https://www.w3.org/WAI/tutorials/tables/one-header/) show how header cells identify the relationships between labels and data. Ask the developer to inspect the generated HTML. This table needs genuine column headers for the site and visitor totals. Bold text alone provides no header semantics. More complex tables can need explicit header associations.

## Check labels and contrast on the page

The site names and values should remain understandable when colour is removed. W3C's explanation of [WCAG's use-of-colour criterion](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) rules out colour as the only way of communicating meaning. Direct labels give the reader another way to identify each category without matching a coloured bar to a distant legend.

Check graphical contrast separately from text readability. Under the [non-text contrast criterion](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), graphical parts required to understand the content generally need at least 3:1 contrast against adjacent colours, subject to the criterion's exceptions. Text has separate contrast requirements. Measure the relevant marks against their actual surroundings and review labels under the text requirements.

Repeat the checks in both website themes. On a narrow screen and with browser zoom increased, confirm that labels, values and source links remain readable without overlapping or disappearing. Read through the component with assistive technology as well as inspecting its HTML. Reading order and table navigation need their own checks. The broader [website accessibility foundations](/insights/website-accessibility-and-seo) guide covers checks beyond this component.

## Accept the complete evidence component

Assign an editor to the finding and a developer to its presentation. Keep a short acceptance record for the rendered page. This sequence is Off Piste's recommendation, informed by the guidance above.

1. **Reconcile every representation.** The editor compares the approved source with the prose, bars and table, including units, period and rounding. A mismatched total goes back to the editor before release.
2. **Check equivalent meaning.** Read the page without relying on the bars. Can you recover the ranking, exact values and limitation? The editor supplies missing interpretation, and the developer repairs content that's hidden from the reading order.
3. **Follow the source.** Open the public link and locate the supporting values. If it points to a general homepage or an inaccessible private file, the editor supplies a usable public reference or revises what can be published.
4. **Inspect structure and navigation.** The developer checks header cells, label-value order and table navigation with assistive technology. If the associations are unclear, the developer corrects the component and checks the rendered page again.
5. **Review presentation under different conditions.** The developer checks narrow screens, increased zoom, both themes, non-colour cues and measured contrast. Record failures against the affected text or mark. If the supported chart can't pass, retain the complete explanation and semantic table while the visual is withheld.
6. **Confirm one consistent version.** The editor checks that a later data edit hasn't left an old finding or table behind. Record the data version, review date, owners and any unresolved limitation together.

These checks don't assess whole-site WCAG compliance. Keep the record specific enough for someone to repeat the checks after a template or theme change.

## Hand over something the team can maintain

Brief one chart with its approved wording, source values, scope, equivalent explanation and acceptance record. When several pages need the same capability, [website design support](/services/website-design) can help turn that brief into a reusable component with dependable labels, tables and theme behaviour.

Store the chart's text and data where future editors can find them together. Name the person who will update each representation when the evidence changes, and use the guide to [keeping published evidence accurate](/insights/evidence-maintenance-content-refresh-guide) for later source checks and corrections.
