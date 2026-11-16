---
title: Minimise Client Data Before Using AI Tools
slug: minimise-client-data-before-ai-use-guide
description: Decide which client information an AI task needs, minimise a fictional enquiry and check the outgoing content before approving or holding a submission.
intro: A client enquiry can contain far more information than an AI task needs. Define the output, prepare the smallest authorised input and check what will leave the business before submitting it.
author: Lara
date: 2026-11-17
readTime: 9 min read
tags: AI, Data Minimisation, Client Data, Personal Information, AI Governance, Data Privacy, Input Validation
topics: AI & Automation
cluster: AI Governance, Risk, and Trust
relatedPosts: ai-governance-policy-checklist-growing-businesses, ai-vendor-due-diligence-checklist-growing-businesses, ai-workflow-pre-launch-testing-guide
---
<!--
Primary sources checked 17 November 2026, Australia/Perth.
All enquiry details, field decisions and connector tests are fictional.
The operating model is Off Piste editorial interpretation informed by the cited guidance.
Read time calculated from visible copy at 200 words per minute, rounded up.
-->

## The enquiry contains more than the task needs

You're preparing a client enquiry for an approved AI tool. The team wants a short internal website-project scoping brief and three missing-information questions for human review. The email also contains a phone number, a budget, a personal explanation for the deadline and a long signature.

Copying the whole email sends information that contributes nothing to that brief. Attaching the CRM record can widen the input further. Before submitting anything, decide which facts the task needs and check that the tool will receive only the authorised material.

We'll use one invented enquiry to work through Off Piste's operating model, informed by the cited guidance. The task ends with an internal brief and questions for review. Lead scoring, pricing, legal advice and client replies need separate authority and inputs.

## Define the output and confirm permission

Write a task statement before opening the client record. For this example, the project coordinator owns preparation, the delivery lead reviews the result and the approved project workspace receives the internal brief. The necessary facts are website requirements, current-site problems and a broad timing requirement.

The [OAIC's guidance on commercially available AI products](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products) advises minimising personal information inputs. As best practice, it recommends keeping personal information, particularly sensitive information, out of publicly available generative AI tools. Its discussion of legal obligations concerns entities covered by the Privacy Act. Whether a particular use or disclosure is permitted needs assessment in context.

Confirm the proposed purpose, applicable privacy requirements and confidentiality commitments with the responsible owner. Tool approval applies to specific datasets, integrations and purposes. You still need permission after removing names.

Use your [AI governance policy](/insights/ai-governance-policy-checklist-growing-businesses) to identify the owner, prohibited uses and approval route. Then [check the AI supplier and configuration](/insights/ai-vendor-due-diligence-checklist-growing-businesses) against the proposed input and destination. That includes any enabled connector. If permission or contractual scope remains unclear, hold the task for the owner or a qualified adviser before copying client material.

## Decide which fields earn a place

Prepare the input in an approved local or otherwise authorised environment. Keep raw client data out of unapproved AI tools, including when preparing it for redaction.

These field decisions apply to this scoping task. For a later pricing or scheduling task, you'd need to assess which fields it needs and confirm authority again.

| Field | Decision | Reason |
| :--- | :--- | :--- |
| Person and business names | Omit | Requirements define the scope. |
| Email, phone and signature | Omit | Contact stays with the project owner. |
| Precise street location | Omit | Location-dependent delivery is outside scope. |
| Budget | Omit | Pricing and lead scoring are outside the task. |
| Personal circumstances | Omit | Website functions define the scope. |
| Exact deadline and distinctive launch | Generalise | Broad timing flags feasibility questions. |
| Service-page requirements | Retain | They define part of the work to scope. |
| Existing-site problems | Retain | They explain what the replacement should address. |
| Editable project examples and enquiry form | Retain | They identify required website functions. |

The coordinator proposes these decisions and the delivery lead reviews them under the business's approval rules. Keep the original record and any reference linking the prepared brief to it in the authorised system, outside the model input.

## Work through a fictional enquiry

Every detail in this example is invented, including the people, business, address, event and contact details. The original enquiry reads as follows.

> I'm Morgan Example from Example Joinery at 12 Example Lane, Sampletown. Email morgan@example.com or use the fictional phone placeholder 04XX XXX XXX. We need a replacement website with service pages, project examples we can edit ourselves and an enquiry form. Our current site is hard to update and the form fails on mobile. We'd like it ready by 18 February 2027 for the first lantern-lit workshop launch at Sampletown's restored signal tower. Our budget is $14,000. I'm also caring for an unwell family member, so I can't manage a complicated update process. Kind regards, Morgan Example, owner, Example Joinery.

Removing Morgan's name and contact details would still leave a distinctive combination of place, event and date. In a real enquiry, someone with access to a launch announcement might recognise the business and connect it to an individual. The personal circumstances and budget would still be present too.

The [OAIC's explanation of contextual de-identification](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/handling-personal-information/de-identification-and-the-privacy-act) describes how identifiability depends on both the information and its receiving environment. Removing direct identifiers alone may leave someone reasonably identifiable through other available information. Placeholders and redaction don't establish that a record has been de-identified.

For this task, the coordinator prepares the following minimised fictional prompt.

> Prepare a short internal website-project scoping brief and exactly three missing-information questions for a delivery lead to review. Use only the requirements below. Flag unknowns without inventing answers. Do not score the lead, estimate a price or draft a client reply.
>
> The project needs a replacement website with service pages, project examples the business can edit itself and an enquiry form. The current site is hard to update and its enquiry form fails on mobile. The desired launch is within the next few months, subject to feasibility review.

The service pages establish the content scope, while editable project examples show an ongoing publishing need. The enquiry form and its mobile failure give the delivery lead a function and a problem to investigate. Broad timing lets the brief flag scheduling uncertainty. The exact date can stay with the human project owner for later planning.

Ease of updating is already an explicit requirement, so the personal explanation adds nothing necessary. The business name, address and launch story can stay in the authorised record. This minimised input still needs review for identifiability and permission in its receiving environment.

## Inspect what will actually leave the business

The submission boundary extends beyond the prepared prompt. [OWASP's sensitive information disclosure guidance](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/) covers confidential business information as well as personal information. It recommends input validation, least-privilege access and restrictions on data sources. Check the connected workflow alongside the visible message. Sanitisation alone doesn't guarantee prevention of disclosure.

Follow the submission path in order. The details depend on the interface and integration you're using.

1. Review the complete outgoing message and relevant conversation context. Check whether earlier messages contain the original enquiry or other excluded material. Use an approved clean context where the task requires it.
2. Review any attachments. Check the content and relevant comments, revision history and metadata that the chosen tool or integration may read or transmit. Remove unnecessary files and prepare an authorised clean extract where needed.
3. Inspect retrieved records and connector field mappings. Confirm which fields and linked records are selected, including any automatically appended notes. Restrict the source scope to the task's allowed categories.
4. Run a wholly fictional connector test. Put recognisable test markers in excluded fields such as contact details, budget and internal notes. Inspect the resulting outbound request in the authorised test environment and confirm those markers are absent while the website requirements remain.
5. Confirm the actual destination, account and configuration. Inspect the final payload or the integration's enforceable field boundary before approving submission. If outgoing content can't be exposed or reliably bounded, hold it for technical review.

For example, a fictional CRM test might show that the visible preview contains only website requirements while the connector also appends an internal note. That fails this task's boundary. Hold the submission, remove the extra mapping and rerun the fictional test before using client material.

Automated detectors can assist this inspection, but they can miss identifying combinations or material outside the text they examine. Tool behaviour varies. Check what your chosen route sends. Don't assume every interface includes, or excludes, the same context.

## Record an approval or hold decision

Release the prepared input only when purpose and authority are confirmed, the fields are necessary, the destination and configuration are approved, the outgoing scope has been inspected and a named reviewer accepts it. An unresolved identifying detail or unexplained connector field is enough to hold this submission.

Keep a small decision record with the task reference, allowed field categories, tool and configuration reference, reviewer, date and approval or hold outcome. A hold record should identify the unresolved issue and its owner. Avoid copying the raw enquiry into that record or into routine logs.

For the fictional connector failure, record a hold and assign the mapping fix to the technical owner. The reviewer checks the new test evidence before recording a fresh decision.

Use the existing guidance to [keep a protected AI workflow audit trail](/insights/ai-workflow-observability-audit-log-guide) when designing evidence access and retention. For a repeatable integration, [test the whole AI workflow before launch](/insights/ai-workflow-pre-launch-testing-guide), including excluded-field cases and configuration changes. If real information has already crossed an unapproved boundary, [respond to an AI data incident](/insights/ai-incident-response-playbook-growing-businesses) through the established response route.

## Review the output before it moves elsewhere

The delivery lead checks the generated brief against authorised source material. Look for invented requirements, unnecessary identifiers, inappropriate personal detail and questions that drift beyond website scoping. Confirm that the output includes the agreed three missing-information questions and remains an internal draft for human review.

A person owns the final brief and any later client message. Store the result in approved systems with the applicable access and retention rules. Require review before a CRM update or client reply.

If the workflow retains information between tasks, [decide what the AI agent should remember](/insights/ai-agent-memory-vs-knowledge-base-business-guide) through a separate persistence decision. Future memory and wider reuse each need explicit authority.

## Check one enquiry path before expanding the workflow

Trace one enquiry from the website form into the CRM and then to the proposed AI submission. Compare what each step collects, stores and sends with what this scoping brief needs. Choose a concrete gap to resolve, such as an unnecessary mapped field, an overbroad connector or an approval with no named owner.

The guide to [designing the website enquiry handoff](/insights/ai-lead-qualification-website-intake-guide) can help when the gap concerns intake and routing. If the form or handoff needs implementation work, define that requirement within the [website design](/services/website-design) scope. Take unresolved specialist privacy or security questions to qualified advisers.

Give the gap an owner. Hold submission until test evidence shows the outgoing input meets the agreed boundary.
