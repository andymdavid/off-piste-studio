---
title: How to Decide Whether to Opt Out of Google AI Overviews
slug: google-ai-overviews-opt-out-decision-guide
description: A practical guide to Google's generative AI control, its traffic trade-offs and the evidence you need before opting out.
intro: Google now gives some Search Console owners a direct choice about whether their site can appear in AI Overviews, AI Mode and covered generative features in Discover. Before you exclude your content, measure the visibility at stake, identify the risk you're trying to solve and choose the control that actually matches it.
author: Lara
date: 2026-08-03
readTime: 13 min read
tags: SEO, AI, Content Strategy, Technical SEO
cluster: AI Search Visibility
relatedPosts: google-sge-and-seo, how-to-measure-ai-search-visibility, ai-crawler-access-robots-txt-guide
---
<!--
Source and search validation completed 3 August 2026 in Australia/Perth.

Live SERP sample:
- Queries checked: should I opt out of Google AI Overviews, Google AI Overviews opt out website, Search Console generative AI control, exclude website from Google AI Mode, Google AI Overview opt out traffic impact, Google AI search control vs Google-Extended, nosnippet vs Google AI opt out.
- Observed shape: official Google help and product documentation, fresh publisher-control coverage, tactical SEO explainers and user questions about turning AI results off. The publisher decision and the searcher's interface preference are separate intents.
- Google Search Console control and report help pages, Google Search Central AI feature and snippet documentation, and the UK CMA announcement were checked 3 August 2026.
- The Search Console control and report were still documented as rolling out to a subset of website owners. Availability may differ by property.

Editorial boundaries:
- The recommendation for expertise-led service businesses is Off Piste judgement, not Google guidance.
- No universal traffic effect is claimed.
-->

## Your choice now affects a measurable source of visibility

If your Search Console property has the new Search generative AI control, you can choose whether Google's covered generative Search features may show links to your site and use its content to help ground their responses. Excluding the site means giving up impressions and traffic from those experiences. It doesn't mean turning AI Overviews off for searchers.

That makes this a visibility and governance decision, not a technical tidy-up. The right answer depends on what your content does for the business, how much exposure it currently receives, what risk you need to control and whether a narrower setting would solve the problem.

If you need the platform mechanics first, read our guide to [Google AI Overviews, AI Mode and SEO](/insights/google-sge-and-seo). This guide focuses on the next decision. Should your site remain eligible, should you improve the source, or is exclusion justified?

For most expertise-led service businesses, Off Piste's working default is to stay included while measuring the result. That's our judgement based on the documented visibility trade-off. A business that relies on being discovered and trusted usually needs a clear reason to surrender a possible route to its website.

## What the Search generative AI control covers

Google's [Search generative AI control documentation](https://support.google.com/webmasters/answer/16908024?hl=en) currently names three covered experiences. They are AI Overviews, AI Mode and generative AI features in Google Discover. The control sits under Settings in Search Console and is still rolling out to a subset of website owners, so you may not see it yet.

Include is the default for properties. A property with a parent property inherits the closest manually configured parent choice by default, though an owner can override that choice for the child property. That hierarchy matters when a company has a domain property alongside URL-prefix properties for a subdomain, section or protocol. Record the property you changed and check whether a more specific property overrides it.

When you choose Exclude, Google says the site's links and content won't be visible to users in the covered features or used as an input to ground those responses. Google says a change generally takes a few days, with exclusion expected within one or two days after the control goes live, though caching and propagation can take longer.

These details are volatile. Check the help page and your own interface on the day you act. Keep a screenshot of the property, setting and change date so the next reviewer knows what was changed.

## What opting out can change

The immediate consequence is clear. Google's documentation says an excluded site won't receive impressions or traffic from the covered generative features. Content from other sites remains available, so exclusion doesn't remove the generative result or prevent a competitor from becoming a supporting source.

Google also says the setting isn't used as a ranking or inclusion signal for other parts of Search. That is different from claiming there can never be an indirect commercial effect. You may still lose a discovery path, an assisted visit or a branded search that began with an AI result. The size of that loss will differ by site and cannot be inferred from a generic industry percentage.

The choice doesn't control AI training. Google directs owners to Google-Extended for that separate purpose. It also doesn't override participation choices for services such as Merchant Center or Google Ads, and it doesn't stop Google using site content to power Search more broadly.

Ordinary Search eligibility remains its own issue. Google's guidance on [AI features and website eligibility](https://developers.google.com/search/docs/appearance/ai-features) says a supporting page must be indexed and eligible to appear in Search with a snippet. Inclusion creates eligibility, not a promise that Google will show the page.

## Choose the control that matches your concern

A broad opt-out is a poor substitute for naming the problem. Is the concern generative Search visibility, training, a sensitive passage, snippet length or all Search appearances? The controls act at different levels.

| Control | AI feature visibility | Ordinary Search | Training | Granularity | Likely traffic consequence |
| --- | --- | --- | --- | --- | --- |
| Include | Eligible for covered features | No direct change | No control | Search Console property | Keeps possible generative impressions and visits |
| Exclude | Removes site from covered features | Not a ranking or inclusion signal elsewhere | No control | Search Console property, with inheritance | Loses covered generative impressions and visits |
| `nosnippet` | Removes snippet eligibility, including supporting-link eligibility | Result may appear without a text or video snippet | No control | Page | Can weaken Search presentation and remove AI eligibility |
| `data-nosnippet` | Prevents marked page sections being used in snippets | Page can remain eligible with other text | No control | HTML section | Narrower effect depends on remaining eligible text |
| `max-snippet` | Limits the amount of text available for snippets | Limits snippet length | No control | Page | May constrain previews and AI use without excluding the page from Search |
| Google-Extended | No direct control over Search appearance | No direct change | Limits use for specified Gemini training and grounding uses | Crawler token in robots.txt | Not designed to remove Search traffic |
| `noindex` | Removes the page from Search and its AI features after processing | Removes the page from Google Search | No complete training policy by itself | Page | Gives up ordinary and generative Search visibility |

Google's [snippet control documentation](https://developers.google.com/search/docs/appearance/snippet) defines `nosnippet`, `max-snippet` and `data-nosnippet`. These are preview controls, not clean equivalents to the new property setting. Googlebot access in robots.txt, Google-Extended and user-triggered crawlers also serve different purposes. Our [AI crawler access and robots.txt guide](/insights/ai-crawler-access-robots-txt-guide) explains those boundaries in more detail.

Treat the table as a starting taxonomy, then verify the current documentation before implementation. A directive that solves one use case may create a larger visibility loss elsewhere.

## Measure your current exposure before changing the setting

Owners with access can use Google's [Generative AI performance report](https://support.google.com/webmasters/answer/16984139?hl=en) to see impressions for supported features. The report can group data by page, country, device and date. It was still rolling out to a subset of owners when checked on 3 August 2026, and a property may also lack the report if it hasn't received enough eligible impressions.

Start with a stable baseline that reflects your normal sales cycle. Four to eight weeks is often more useful than a few noisy days, though seasonal or low-volume businesses may need longer. Export the report if available and record the pages, countries and devices producing impressions. Keep ordinary Search Console performance, analytics and lead records beside it.

Our framework for [measuring AI search visibility](/insights/how-to-measure-ai-search-visibility) separates exposure from commercial value. At minimum, record generative impressions, organic landing-page visits, branded searches, qualified enquiries and lead quality. Note campaigns, site releases, seasonality and ranking changes that could distort the comparison.

<div class="insight-article__callout">
  <strong>How to review a setting change</strong>
  <ol>
    <li><strong>Baseline.</strong> Record the property, setting, pages, impressions, visits and qualified outcomes across a stable period.</li>
    <li><strong>Change.</strong> Save the date, owner, reason and screenshot. Avoid unrelated site changes where practical.</li>
    <li><strong>Propagation.</strong> Allow for the documented processing delay and mark the comparison period accordingly.</li>
    <li><strong>Review.</strong> Compare visibility and commercial outcomes while accounting for seasonality, campaigns and other Search changes.</li>
  </ol>
  <p>A movement after the setting change is an observation. It isn't automatically proof that the setting caused every difference.</p>
</div>

If you don't have the dedicated report, don't pretend you have a clean baseline. Document the gap. Use ordinary performance data, manual observations and commercial outcomes, then postpone an irreversible-looking policy decision unless the risk demands immediate action.

## When exclusion is a defensible choice

Exclusion can be reasonable when the business can name a material conflict that visibility does not outweigh. The evidence threshold should rise with the likely commercial cost.

A publisher may have licensing obligations that prohibit a defined use of its work. A membership business may find that generative exposure undermines a paid-access model. A site may contain sensitive material that should remain searchable in ordinary results but not be used to ground covered generative features. A company may also document repeated, material misrepresentation that creates regulatory, safety or customer harm and cannot be addressed quickly enough at the source.

A defensible decision needs evidence. Record the affected content, the obligation or harm, examples, current exposure, alternative controls considered and the expected cost of exclusion. Assign a decision owner and a review date. Ask the appropriate adviser to assess legal or contractual obligations instead of inferring them from a Search setting.

The regulatory background is also specific. On 3 June 2026, the UK Competition and Markets Authority announced a [UK conduct requirement giving publishers stronger control over content used in Google's AI search features](https://www.gov.uk/government/news/cma-secures-fairer-deal-for-publishers-and-improves-google-search-services-in-uk). That explains important UK publisher context. It doesn't establish that every market, website or business has the same legal position.

## When improving the source is the stronger response

An inaccurate or unhelpful summary may expose a weakness in the source page. Exclusion can remove the site from the covered features, but it won't correct vague claims, conflicting service details, thin proof or poor page structure for buyers and ordinary Search.

Start by identifying the exact statement at risk. Our [website claim and evidence audit](/insights/website-content-evidence-audit) gives each material claim a source, owner, status and repair action. If a claim is unsupported, prove it, soften it, qualify it or remove it. If the evidence is sound but hidden, make it visible near the claim.

Then inspect the page's hierarchy. Clear headings, descriptive links, visible text and accurate structured data help people and search systems understand what the page says. Use the [structured content guide](/insights/structured-content-ai-search-guide) when page clarity is the repair, or consider [website design support](/services/website-design) when templates and proof presentation are blocking the work.

Improvement strengthens the owned source without guaranteeing a citation. Buyers get better information whether or not Google shows the page in a generative result.

## Make the decision with a review date

Use a short decision path and keep the evidence attached to it.

1. Name the business goal. Decide whether discovery, licensing, accuracy, access or another obligation is driving the review.
2. Check the exact Search Console property, inherited setting and current report access.
3. Measure existing generative exposure and the commercial value of the pages involved.
4. Identify the content-level risk and test whether a narrower control or source repair would address it.
5. Estimate what exclusion gives up, including covered impressions, visits and possible assisted discovery.
6. Choose an owner, record the decision and set a review date tied to evidence or a platform change.

For an expertise-led service business, retain inclusion when the main goal is qualified discovery and there is no documented licensing, sensitivity or material accuracy conflict. Improve and measure when the source is weak or the evidence is incomplete. Exclude when a defined risk outweighs the visibility and narrower controls cannot solve it.

Bring scattered evidence into one baseline, property policy and monitoring plan. Our [SEO work](/services/seo) can help if you need an independent view. Whatever you decide, set the next review date. Revisit the setting after a stable measurement window and whenever Google changes the control, report scope or covered features.
