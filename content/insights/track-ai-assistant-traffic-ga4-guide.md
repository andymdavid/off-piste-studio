---
title: Measure Identifiable AI Assistant Traffic in GA4
slug: track-ai-assistant-traffic-ga4-guide
description: Use GA4’s AI Assistant channel to validate identifiable referrals, landing pages and key events while keeping attribution claims within the evidence.
intro: AI Assistant traffic in GA4 can show whether identifiable external assistant visits reach useful pages and complete meaningful actions. A sound review checks the native channel, source details, landing pages and key events while keeping unknown traffic and commercial attribution in their proper place.
author: Lara
date: 2026-10-15
readTime: 11 min read
tags: GA4, AI Assistant Traffic, AI Referrals, ChatGPT Traffic, Perplexity Traffic, Traffic Acquisition, Key Events, Attribution
topics: SEO & Search, AI & Automation
cluster: AI Search Visibility
relatedPosts: how-to-measure-ai-search-visibility, google-search-console-generative-ai-report-guide, ai-visibility-tools-evaluation-guide
checkedOn: 2026-10-15
refreshTriggers: Google changes the AI Assistant channel definition or recognised source list, Google changes the ai-assistant medium or campaign classification, Google changes Traffic acquisition dimensions or key-event terminology, Google changes custom channel group behaviour or historical scope, A major assistant changes referral handling
---
<!--
Google Analytics and OpenAI documentation checked 15 October 2026 in Australia/Perth.

The service-business scenario is hypothetical and contains no client result or benchmark. Recommendations about CRM validation, reporting language and next actions are Off Piste operating judgements.

Refresh this article when Google changes the AI Assistant channel definition, recognised sources, medium or campaign values, Traffic acquisition dimensions, key-event terminology, custom channel group behaviour or historical scope, or when a major assistant changes referral handling.
-->

## Start with the question GA4 can answer

A service business opens its monthly acquisition report and sees a new AI Assistant row. The useful question is whether GA4 identified sessions from external assistants, where those visitors landed and whether they completed actions that matter.

Google introduced [native AI Assistant traffic measurement](https://support.google.com/analytics/answer/9164320) on 13 May 2026. When a referrer matches its recognised list, Analytics assigns the medium `ai-assistant`, the campaign `(ai-assistant)` and the AI Assistant channel. Older guidance that begins with a custom regex now misses the native view.

The segment still has a firm boundary. GA4 can report referral information it received and classified. It cannot observe every time an assistant shaped a person's decision, recover a source that never arrived or prove that one answer caused a later sale. Use this guide for the GA4 implementation. Use the [wider AI search measurement framework](/insights/how-to-measure-ai-search-visibility) when the question also covers prompts, citations, platform visibility and lead quality.

## Find the native AI Assistant channel

Start in Reports, then Acquisition, then Traffic acquisition. Google's [Traffic acquisition documentation](https://support.google.com/analytics/answer/12923437) explains that the report uses session-scoped dimensions. This makes it the appropriate starting point for visits attributed to a channel during a session.

Record the context before interpreting the row so another person can reproduce it.

1. Confirm the GA4 property and its reporting timezone.
2. Set the reporting period and a like-for-like comparison period.
3. Use Session primary channel group, or Session default channel group where that is the available report dimension.
4. Find AI Assistant and record sessions, engaged sessions, engagement rate and relevant key events.
5. Add or switch to Session source / medium, then inspect Session campaign.
6. Review the landing pages reached by the same segment.

Keep the date range explicit. The native classification was announced in May 2026, so a comparison that crosses the product change needs a note. A movement can reflect classification as well as demand.

The default channel definition reflects current product logic and will evolve. Google's [current AI Assistant channel description](https://support.google.com/analytics/answer/9756891) names sources such as ChatGPT, Gemini, Deepseek, Copilot and Grok. Report what the property shows for the chosen dates and record the review date.

## Validate the source and medium

The channel row is a starting point. Break it down by Session source / medium and confirm that recognised assistant sources carry the `ai-assistant` medium. Check Session campaign for `(ai-assistant)`. This verifies the classification chain instead of treating the channel label as enough evidence.

Then inspect nearby rows. A known assistant domain under Referral may indicate that the source wasn't covered by the current default rule, that the selected dates predate a classification change or that the source value differs from what you expected. Unassigned means no channel rule matched the event data. Investigate the actual values and collection path before editing any reporting rule.

If ChatGPT appears, use the [ChatGPT visibility guide](/insights/chatgpt-search-visibility-business-guide) to investigate access and source quality outside GA4. If Perplexity is material, the [Perplexity visibility diagnostic](/insights/perplexity-search-visibility-business-guide) owns that platform-specific work. Neither guide changes what the recorded session source proves.

Keep Direct outside AI Assistant. Google's guidance on [`(direct) / (none)` traffic](https://support.google.com/analytics/answer/15258820) says it represents traffic without a clear referral source. Missing traffic information, redirects, shortened links and blockers can contribute. Those explanations support investigation, not reassignment.

## Compare landing pages and useful outcomes

Once the sources look credible, ask where identifiable visitors arrived and what they did. Review landing pages within the AI Assistant segment. Compare sessions, engaged sessions, engagement rate and key events with suitable context from other channels or periods.

The comparison should answer a business question. A high engagement rate is not automatically valuable if visitors land on an article that offers no relevant next step. A lower-volume service page can matter more if it produces qualified enquiries. Check that the key events in the report represent useful actions such as a completed enquiry, booked consultation or confirmed call interaction. Google's report definition describes key events as [events marked as important to the business](https://support.google.com/analytics/answer/12923437). It doesn't make them proof of revenue or causation.

Consider a hypothetical accounting firm. GA4 identifies ChatGPT sessions that enter through a guide to changing accountants. Some visitors reach the service page and trigger the enquiry-submission key event. The CRM then shows whether those submissions fit the firm's location, service and client criteria. The defensible report says that identifiable ChatGPT sessions produced observed enquiries during the period, followed by the number that qualified. It doesn't say ChatGPT caused every eventual sale.

When identifiable referrals arrive and the landing page gives them no clear route forward, the constraint sits in the post-click experience. That can justify reviewing the page and enquiry path as part of [website design and conversion work](/services/website-design). Fix the observed path before drawing a larger conclusion about the channel.

## Use custom channel groups with care

The native channel should remain the baseline. A custom channel group can help when the property needs a tailored source set, wants to examine recognised historical source values or needs a separate validation view.

Google's [custom channel group guidance](https://support.google.com/analytics/answer/13051316) says these groups use rule-based conditions, can be applied to reports retroactively and assign traffic to the first matching channel in the ordered list. Put a narrowly defined assistant rule before Referral if that is the intended classification. Test it against source values actually present in the property.

Google currently publishes an AI-assistant regex example that includes broad terms. Copying a pattern without testing can capture unrelated sources. A token such as `ai` is especially prone to accidental matches. Build from observed domains, check the matched rows and assign an owner to review the rule when assistants or referral formats change.

Retroactive application has a precise limit. A custom group can reclassify historical source data that GA4 already captured and that matches the rule. It cannot reveal that an unknown Direct session came from an assistant. If a custom group is later made the property's primary channel group, Google says that primary definition populates on future reporting from the change point. Record both the rule version and the period it governed.

## Keep Google AI search in its own report

Google's default definitions explicitly exclude AI Overviews and AI Mode from AI Assistant. Visits from those Google experiences remain within Organic Search. Keep the external assistant row separate from Google AI search, even though both use generated answers.

Use the [Google Search Console Generative AI performance report guide](/insights/google-search-console-generative-ai-report-guide) for exposure in Google's supported generative search experiences. GA4 can still show what an Organic Search visitor did on the site, while Search Console owns the Google-specific exposure view. Keeping the systems separate preserves the meaning of each measure.

## Preserve unknown traffic as unknown

Some AI-influenced journeys will never appear in the AI Assistant row. A person might read an answer, remember the business name and search later. An app or redirect might omit referral information. A blocker may interfere with source collection. The person may copy a URL into another browser or return directly another day.

GA4 may record part of those journeys as Organic Search or Direct, or may not record them at all. That doesn't justify estimating a hidden AI percentage. Preserve the provenance as unknown unless another reliable source connects the observations.

CRM notes can add commercial context when they ask how a prospect found the business. Self-reported answers have their own limits, so use them as a separate signal. A recurring answer such as “ChatGPT recommended you” can justify deeper investigation without rewriting the GA4 source.

## Separate referrals from crawler evidence

A human referral session, an automated request and a later branded visit are different observations. GA4 primarily helps with the first. Server or CDN logs are the appropriate place to investigate bot requests. Search and prompt records can hold other evidence about appearances and answer quality.

OpenAI's [crawler documentation](https://developers.openai.com/api/docs/bots) distinguishes OAI-SearchBot, GPTBot and user-triggered ChatGPT-User activity. This supports an important operational boundary. A ChatGPT referral in GA4 isn't proof that a particular crawler accessed the page, and a crawler request in a server log isn't proof that a person clicked through or submitted an enquiry.

When bot access is the question, use the [AI crawler and robots.txt guide](/insights/ai-crawler-access-robots-txt-guide). Keep its log and access evidence out of the referral total.

## Build a reporting decision from several signals

A useful report states what GA4 observed, then names the limits. Record the AI Assistant sessions, source and medium values, landing pages, engagement and relevant key events. Add qualified-enquiry evidence from the CRM where it exists. Note Direct traffic, missing referrers and later journeys as unknown.

The next action should follow the constraint. Classification uncertainty may need a measurement review or an [SEO and attribution audit](/services/seo). Weak platform visibility belongs in the relevant platform diagnostic. Poor landing-page progression belongs in the website journey. A need for prompt, citation and competitor monitoring may justify evaluating [specialist AI visibility tools](/insights/ai-visibility-tools-evaluation-guide) after the first-party baseline is sound.

Before the finding enters a management report, run one compact validation routine.

```insight-module
{
  "type": "practice",
  "label": "In practice",
  "title": "Validate the evidence before reporting the outcome",
  "intro": "A defensible review records what GA4 observed, what remains unknown and which evidence should be checked next.",
  "items": [
    "Confirm the property, reporting period, timezone and Session primary channel group",
    "Inspect session source, medium and campaign for the AI Assistant row",
    "Compare landing pages, engagement and relevant key events",
    "Check qualified enquiries or CRM notes before making a commercial claim",
    "Record Direct traffic and referral gaps as unknown instead of reallocating them"
  ]
}
```

This gives the team a repeatable view of identifiable assistant referrals. Use it to improve measurement, content or the on-site journey, and keep unobserved influence outside the claim.
