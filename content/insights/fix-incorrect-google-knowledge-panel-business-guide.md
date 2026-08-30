---
title: Fix Incorrect Information in a Google Knowledge Panel
slug: fix-incorrect-google-knowledge-panel-business-guide
description: Identify a wrong Google Knowledge Panel, trace the affected fact and submit an evidence-backed correction without confusing it with a Business Profile.
intro: A wrong Knowledge Panel is visible in seconds, but the correction route depends on the result type, the affected entity and the source behind the displayed fact. This guide shows you how to diagnose the panel, prepare evidence and use the route Google currently provides.
author: Lara
date: 2026-08-31
readTime: 11 min read
tags: Google Knowledge Panel, Entity Trust, Brand Signals, Knowledge Graph, Search Visibility, Entity Correction
topics: SEO & Search, AI & Automation
cluster: AI Search Visibility / Entity Trust and Brand Signals
relatedPosts: how-ai-search-understands-your-business, third-party-brand-signals-ai-search-audit, organization-schema-service-business-guide
---
<!--
Primary sources checked 31 August 2026 in Australia/Perth:
- Google Knowledge Panel Help, About knowledge panels.
- Google Knowledge Panel Help, Get verified on Google.
- Google Knowledge Panel Help, Submit feedback on content about you.
- Google Knowledge Panel Help, How Google's Knowledge Graph works.
- Google Business Profile Help, Edit your Business Profile.
- Google Search Central, Establish your business details with Google.
- Google Search Central, Organization structured data.

Editorial boundaries:
- The opening scenario is a composite Australian business example, not a client result.
- Current official documentation was checked for desktop and mobile instructions. A location-controlled Australian result and interface could not be captured in this environment, so interface labels should be rechecked on the live result before use.
- The article does not promise panel creation, claimability, persistence, correction acceptance, review timing, rankings or AI visibility gains.
-->

## The wrong result is visible before the cause is

Imagine a Perth consultancy searching its exact trading name on desktop on 31 August 2026. A panel beside the results shows its current website but an old company description and a founder's photo from before a rebrand. The same search on mobile places the panel within the results, where the errors look just as authoritative.

This is a composite example, not an Off Piste client case or an observed outcome. It shows why the first task isn't to edit every profile you can find. You need to identify the Google surface, the entity it represents and the particular fact that's wrong.

Google's [explanation of Knowledge Panels](https://support.google.com/knowledgepanel/answer/9163198?hl=en) says they are generated automatically from information across the web. Google's systems decide whether a panel appears. A business can't create one on demand or dictate every field.

If the problem is broader than one Google panel, start with the [entity-trust audit](/insights/how-ai-search-understands-your-business). It maps how the website, profiles, schema and outside sources describe the business. This guide begins once a visible Google result needs investigation.

## Confirm which Google surface you're looking at

A Knowledge Panel is an information box about an entity in Google's Knowledge Graph. The subject might be an organisation, person, place or thing. It can include a title, subtitle, description, website, images, social profiles and related entities.

A Google Business Profile is different. It represents a local business that serves customers at a location or within a service area. It commonly shows operational details such as reviews, opening hours, directions, calls and local photos. Google's Knowledge Panel help makes [the local Business Profile distinction](https://support.google.com/knowledgepanel/answer/9163198?hl=en#business_profile) explicit.

If you own or manage that local profile, Google says you can [edit a verified Business Profile directly on Search or Maps](https://support.google.com/business/answer/3039617?hl=en-GB). Use the [Google Business Profile guide](/insights/google-business-profile-guide) for the local management route. Don't submit a Knowledge Panel correction for information you can manage in the profile.

An ordinary result is usually a blue link, a site name, a URL and a snippet drawn from or related to a web page. Correct the page, its metadata or the indexing issue rather than looking for a panel claim flow.

Person panels need the same initial diagnosis, but the official source is usually the person's maintained profile page rather than an organisation About page. For a founder, author or expert, use the [expert profile and Person schema guide](/insights/person-schema-expert-profile-page-guide) after confirming which identity is mixed or incomplete.

## Record the error before anything changes

Search presentation can vary by query, country, device, account and time. A screenshot without that context is difficult to reproduce. Record the baseline before correcting a source or sending feedback, then use the same conditions for later checks.

```insight-module
{
  "type": "practice",
  "label": "In practice",
  "title": "Build a correction record Google can check",
  "intro": "Capture the same evidence before correcting a source or submitting feedback so later checks remain comparable.",
  "items": [
    "Record the exact query, country, device and date",
    "Save a screenshot and name the affected panel field",
    "Write the displayed fact and the correct canonical fact",
    "Attach authoritative supporting URLs",
    "Assign an owner and a dated follow-up status"
  ]
}
```

Keep one issue per record. “The whole panel is wrong” doesn't tell Google whether the error is the title, website, image or relationship to another entity. A precise field and a supported replacement fact are easier to evaluate.

## Find where the displayed fact comes from

Start with the affected field. Search the incorrect phrase in quotation marks. Check the page linked from the description, the image source, official profiles and prominent third-party pages. Compare each version with the approved fact on the business's own site.

Google says panel information can come from [multiple web sources and data partners](https://support.google.com/knowledgepanel/answer/9163198?hl=en). A panel submission may treat the symptom while the source continues to publish the wrong fact.

Don't turn this into an indiscriminate directory cleanup. Use the [third-party business signals audit](/insights/third-party-brand-signals-ai-search-audit) when you need to inventory conflicting profiles, weigh their relevance and assign correction owners. For this repair, capture only the sources that support or contradict the affected panel field.

Descriptions need particular care. Google's [panel feedback guidance](https://support.google.com/knowledgepanel/answer/7534842?hl=en-GB) says it may remove an inaccurate description when strong evidence supports the request, but it doesn't create a custom replacement on demand. Correct the underlying source when you can, and don't write a preferred marketing paragraph as though Google must display it.

## Strengthen the official source of truth

Make the correct fact easy to find on assets the business controls. Use one current organisation name, a canonical website, a clear About page, maintained contact details and an explicit relationship between the company and relevant people or parent brands.

Google's guide to [establishing official business details](https://developers.google.com/search/docs/appearance/establish-business-details) treats website ownership, Business Profile details and structured data as separate ways to establish information. They support one another, but they aren't a single control panel.

Verify the canonical site in Search Console where appropriate. Keep the visible page and machine-readable declaration aligned. The [Organisation schema implementation guide](/insights/organization-schema-service-business-guide) covers the technical work once the facts are approved.

Google says [Organization structured data can help it understand and disambiguate an organisation](https://developers.google.com/search/docs/appearance/structured-data/organization). The markup doesn't guarantee a Knowledge Panel or any other search feature. Treat it as a supported declaration, not a panel-generation switch.

## Claim and verify the panel when Google offers it

Search for the exact entity while signed into the Google Account that should represent it. If Google shows “Claim this knowledge panel”, follow that route and review the available verification methods. On mobile, Google currently documents the claim option within the panel menu.

Google's current [verification instructions](https://support.google.com/knowledgepanel/answer/7534902?hl=en) list associated official sites and profiles such as Search Console, YouTube and supported social accounts as possible routes. Availability depends on what Google associates with the entity. Verification is therefore conditional, not an entitlement.

Not every panel is claimable. Google tells representatives to check again periodically and use Feedback in the meantime. If no claim option appears, don't manufacture a workaround or create duplicate profiles. Strengthen the official sources, correct the identified contradiction and submit public feedback.

Keep access governed. Use an organisation-controlled account where possible, record who owns it and add authorised representatives through Google's permissions rather than sharing credentials.

## Submit a correction Google can evaluate

Use “Suggest edits” when you're signed into a verified representative account and Google offers it. Otherwise use “Feedback” on the panel. Interface wording can differ by device and verification state, so confirm the live label before writing internal instructions.

Submit one field at a time. State what is wrong, give the exact supported fact and link to public pages that verify it. Google's [feedback process asks for publicly accessible supporting URLs](https://support.google.com/knowledgepanel/answer/7534842?hl=en-GB) and says suggestions are compared with other public information on the web.

Evidence should establish the fact rather than repeat the request. An official About page can support a current trading name. A maintained profile page can clarify a founder's role. A public announcement and consistent official records can support a completed rebrand. Avoid private documents unless Google support specifically requests them through an appropriate channel.

Google may decline a request it can't confirm. It may also handle fields differently. Titles are automatically generated, custom subtitles aren't accepted and related image collections can't simply be reordered through a verified suggestion. Record the submission and confirmation without marking the fact as corrected until the live result changes.

## Handle merged identities and recent business changes

A panel that combines two similarly named companies needs more than a wording edit. Record which title, website, profiles, images and people belong to each entity. Google's verification help directs mixed panels, wrong websites and wrong profiles to [Knowledge Panel support troubleshooting](https://support.google.com/knowledgepanel/answer/7534902?hl=en#troubleshoot).

Recent name changes, mergers and domain moves often leave two plausible versions in public sources. Use the [business rebrand migration guide](/insights/business-rebrand-entity-search-migration-guide) to align the website, redirects, profiles and outside records around the approved identity. Keep the correction request focused on the panel field rather than repeating the whole migration plan.

Impersonation, disputed ownership, defamation and potentially unlawful content aren't routine SEO corrections. Preserve evidence and use the relevant platform reporting, account recovery or legal-removal route. Seek legal advice when rights, safety or liability are in dispute.

## Monitor the result and keep a correction log

Retest the same query, country and device recorded in the baseline. Check the live result rather than relying only on a confirmation email. Record whether the affected field changed, remained the same, disappeared or drew from a different source.

Keep verified facts stable while the request is assessed. Repeatedly changing names, descriptions, profile URLs or schema makes the public record harder to reconcile. Don't assign a universal review deadline. Google describes review and update processes, but timing and outcomes vary.

A single wrong link with one clear source may remain a routine correction. Repeated failures, mixed entities and contradictions across several influential sources point to a wider entity problem. An [SEO and AI visibility strategy](/services/seo) can connect source diagnosis, platform troubleshooting and monitoring without promising control over the panel.

## Make the business easier to verify next time

A Knowledge Panel correction is easier to defend when the business already maintains clear facts, stable ownership and dated evidence. Keep the official site, approved profiles and structured data aligned. Review them after a rebrand, acquisition, leadership change, domain move or material service change.

If the site's templates can't keep names, biographies, contact details and schema consistent, the remaining issue is a [website structure and design problem](/services/website-design). Fix the source system before asking every downstream platform to reconcile its output.

Your control lies in making the error reproducible, the correct fact public and the correction evidence specific. That gives Google a clearer record to evaluate and your team a maintainable process when the result changes again.
