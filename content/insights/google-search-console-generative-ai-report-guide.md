---
title: Using Google Search Console’s Generative AI Performance Report
slug: google-search-console-generative-ai-report-guide
description: Configure Google Search Console’s Generative AI performance report, build a sound baseline and turn page, country, device and date patterns into the right next investigation.
intro: Google’s Generative AI performance report gives website owners a first-party view of exposure in supported AI search experiences. It shows where visibility exists and what deserves investigation, while queries, citations, clicks and leads require other evidence.
author: Lara
date: 2026-10-10
readTime: 13 min read
tags: Google Search Console, Generative AI Performance Report, AI Overviews, AI Mode, SEO Measurement, Google Search, Reporting
topics: SEO & Search, AI & Automation
cluster: AI Search Visibility / Google Search and AI Overviews
relatedPosts: how-to-measure-ai-search-visibility, google-sge-and-seo, google-ai-overviews-traffic-drop-diagnostic
checkedOn: 2026-10-10
refreshTriggers: Google changes report metrics or dimensions, Google changes impression counting or availability, Google changes inclusion controls, A documented anomaly affects the report
---
<!--
Primary Google documentation checked 10 October 2026 in Australia/Perth.

Refresh this article when Google adds or removes metrics, dimensions, search types or export behaviour, changes report availability or impression counting, changes generative AI inclusion controls, or documents a Search Console anomaly that materially affects the report.

The baseline table is illustrative. It contains no client results. The review rhythm and routing guidance are Off Piste operating judgements rather than Google requirements.
-->

## What this report can answer

Google Search Console now gives verified site owners a dedicated view of how often links to their pages appear in supported generative AI Search experiences. The [Generative AI performance report documentation](https://support.google.com/webmasters/answer/16984139?hl=en) says the Search report covers impressions and lets an owner analyse Pages, Countries, Dates and Devices. Google made the report available worldwide on 31 August 2026, according to its updated [website-owner controls and insights announcement](https://blog.google/products-and-platforms/products/search/new-controls-website-owners/).

That makes the report useful for a specific job. It can establish a Google-specific exposure baseline, show which pages and markets account for that exposure, and reveal movements that deserve a closer look. It doesn't expose queries, citation counts, clicks, conversions or visibility in non-Google products. An impression is evidence that a link appeared in a supported experience. It isn't evidence that the answer described the business accurately or influenced a sale.

Google's [launch announcement for generative AI performance reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports) explains that the same activity remains included in overall performance reporting. Treat the dedicated report as a focused view of existing Search activity and keep its totals separate from the standard Performance report.

For the product mechanics and wider commercial context, start with [how Google’s generative AI search features work](/insights/google-sge-and-seo). For citations, prompt sampling, analytics, lead quality and other platforms, place this report inside the [wider AI search measurement framework](/insights/how-to-measure-ai-search-visibility).

## Open the right report and set the search type

Open the verified Search Console property you want to review, then select the Generative AI report under Performance. Confirm that you're in the Search report. Google launched separate generative AI reporting for Search and Discover, so results from those surfaces shouldn't be merged casually.

Before reading the chart, record the configuration that produced it.

1. Confirm the property, including whether it is a domain property or URL-prefix property.
2. Choose the search type. The [current report guidance](https://support.google.com/webmasters/answer/16984139?hl=en) distinguishes text-based web and multimodal web traffic.
3. Choose a stable date range. A complete 28-day period is a practical first baseline for many sites, while a full calendar month is easier to reconcile with monthly reporting.
4. Select a like-for-like comparison period when enough history exists.
5. Note the date, timezone and person making the export or observation.

Keep text-based and multimodal web results separate in the baseline. Combining them can hide a new pattern in a smaller search type. If a setting changes between reviews, record the change rather than comparing two different configurations as one trend.

## Build the first defensible baseline

A baseline should preserve enough context for another person to reproduce the view. Record the total impressions, period and search type first. Then note the leading pages, country mix and device mix. Export the report when the team needs a recurring record or more rows than the interface makes practical.

The table below is illustrative. Its values are examples of a working record, not Off Piste or client performance.

| Field | Illustrative entry | Why record it |
| --- | --- | --- |
| Period | 1 to 30 September 2026 | Fixes the observation window |
| Comparison | Previous 30 days | Makes the direction reproducible |
| Search type | Text-based web | Prevents unlike traffic from being mixed |
| Total impressions | 1,240 | Establishes the report-level baseline |
| Leading page group | Service guidance | Creates a page-review queue |
| Leading country | Australia | Preserves market context |
| Leading device | Mobile | Preserves experience context |
| Annotation | Service page updated 12 September | Records a plausible event without claiming cause |
| Next check | Compare standard Performance and analytics | Assigns the next evidence source |

Add annotations for launches, content changes, indexing incidents, migrations, campaigns and known seasonality. An annotation should say what happened and when. It shouldn't claim that the event caused a movement before the wider evidence supports that conclusion.

The export is a snapshot of the report configuration and available data. Store the property, filters and extraction date beside it. A CSV without those details becomes difficult to compare and easy to misread.

## Read patterns as evidence

Start with the smallest statement the data supports. A page with rising impressions appeared more often in the covered Google experiences during the selected period. The report alone can't reveal which queries triggered those appearances, whether Google used the page as a supporting citation, what the generated answer said or whether anyone converted.

A falling total warrants a check of dates, page, country and device distribution. Compare the same period in the standard Search Performance report and analytics. Review seasonality, indexing, recent site changes and commercial demand. Before diagnosing content or technical failure, check Google's [Search Console data anomaly log](https://support.google.com/webmasters/answer/6211453?hl=en) for an incident covering the affected dates.

A country shift can justify checking market demand, localisation, service availability and the pages gaining exposure. A device shift can justify reviewing mobile experience and landing-page behaviour. Emerging multimodal exposure can justify inspecting the pages and assets involved. None of those patterns establishes a cause by itself.

Page-level patterns can also expose a planning question. If one page role repeatedly appears while another important part of the buyer journey is absent, use the [AI Mode query-family planning process](/insights/google-ai-mode-query-fan-out-content-planning) to test coverage. That process builds and validates hypotheses elsewhere because this report has no query dimension.

## Why totals may disagree

Search Console reports aggregate data in ways that can make a chart total differ from the sum of visible table rows. Google's [Performance report documentation](https://support.google.com/webmasters/answer/7576553?hl=en) explains that table and chart totals can differ because of aggregation and omitted data. It also explains how most performance data is assigned to canonical URLs.

Use a short reconciliation check before declaring a reporting defect.

1. Confirm the property, dates, search type and filters match.
2. Check whether you're comparing a chart total with only the visible or exported table rows.
3. Look for low-volume or omitted data described in the report documentation.
4. Check canonical URL handling before assigning an impression to a duplicate or alternate URL.
5. Record rounding and export timing, then rerun the same configuration if the gap matters to a decision.

The goal isn't to force every view to sum perfectly. It is to understand whether the difference comes from a documented reporting rule, a mismatched configuration or a genuine issue that needs escalation.

## Check report availability

A missing report isn't automatically a Search Console fault. Google's [report availability guidance](https://support.google.com/webmasters/answer/16984139?hl=en) says a property may not show the report when it lacks sufficient generative AI impressions or when the site is excluded from generative AI features.

Confirm that you're using the intended verified property and that the account has access. Check the current report documentation and the anomaly log. Then review normal Search foundations. Google's [generative AI optimisation guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) says eligibility still depends on core SEO requirements, including indexing and eligibility to show a snippet, alongside inclusion in generative AI features.

Check whether priority pages are indexed, crawlable and eligible for snippets. Review any generative AI inclusion setting with the people responsible for governance. If the site is eligible and the report remains absent or exposure stays weak, use the [diagnostic for missing AI Overview citations](/insights/google-ai-overviews-not-citing-website-diagnostic). The report doesn't count citations, so that investigation needs manual result evidence and page-level checks as well.

## Turn each finding into the right next investigation

Keep this report as the observation layer, then route the finding to the workflow that owns the diagnosis.

- If a material decline survives the anomaly, configuration, aggregation and comparison checks, [diagnose the verified Google traffic drop](/insights/google-ai-overviews-traffic-drop-diagnostic).
- If the report is missing or exposure is persistently weak after eligibility checks, investigate indexing, query fit, evidence and supporting-link selection with the [citation-absence diagnostic](/insights/google-ai-overviews-not-citing-website-diagnostic).
- If visible pages reveal gaps across buyer questions, plan query families and page roles with the [AI Mode content planning guide](/insights/google-ai-mode-query-fan-out-content-planning).
- If the question is whether the site should remain eligible, separate that governance choice from measurement and use the [AI Overviews opt-out decision guide](/insights/google-ai-overviews-opt-out-decision-guide).
- If the team needs to measure other platforms, answer quality, citations, analytics or lead quality, return to the [cross-platform AI visibility framework](/insights/how-to-measure-ai-search-visibility).

Some findings cross reporting integrity, technical eligibility, content roles and commercial interpretation. When the team can't assign those checks internally or needs a repeatable reporting system, joined-up [SEO support](/services/seo) is a practical next step.

## Set a review rhythm the team can sustain

Monthly review is usually enough to establish a pattern for an established service business. Review sooner after a migration, major content release, inclusion-control change or documented reporting incident. Name one owner for the baseline and one person who can approve the resulting technical, content or governance work.

A useful review records what the team observed, what it checked, what remains uncertain and who owns the next investigation.

```insight-module
{
  "type": "practice",
  "label": "In practice",
  "title": "A reliable review ends with a recorded decision",
  "intro": "Use the same small set of checks each time so a movement becomes evidence the team can revisit.",
  "items": [
    "Confirm the date range, comparison period and search type",
    "Check Google’s anomaly log and your own change annotations",
    "Record the affected pages, countries and devices",
    "Separate observed data from query or causation hypotheses",
    "Assign the next investigation, owner and review date"
  ]
}
```

Keep the baseline and decision log together. Refresh this guide when Google changes the report's metrics, dimensions, search types, exports, availability rules, impression counting or inclusion controls, or when a documented anomaly changes how the data should be read. The result is a reporting habit that directs each finding to the right investigation.
