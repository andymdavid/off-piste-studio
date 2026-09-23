---
title: What Should Your AI Agent Remember
slug: ai-agent-memory-vs-knowledge-base-business-guide
description: Decide what an AI agent may remember, what it should retrieve from governed knowledge, and what must remain in an authoritative business system.
intro: An AI agent that remembers can save time and make each interaction feel more useful. It can also preserve the wrong fact, expose one client's information to another, or quietly become a second system of record. The useful question isn't whether the agent has memory. It's what the business will allow it to retain, why, and for how long.
author: Lara
date: 2026-09-21
updatedDate: 2026-09-24
readTime: 13 min read
tags: AI Agent Memory, Knowledge Management, AI Architecture, AI Governance, Privacy, Internal Systems
topics: AI & Automation
cluster: Knowledge, Data, and Business Memory
relatedPosts: ai-ready-knowledge-base-business-guide, rag-vs-fine-tuning-business-knowledge-guide, ai-governance-policy-checklist-growing-businesses
---
<!--
Primary sources checked 20 September 2026 in Australia/Perth:
- Microsoft Learn, Memory and knowledge in Azure SRE Agent, updated 27 March 2026.
- AWS Prescriptive Guidance, Generative AI agents: replacing symbolic logic with LLMs.
- Google Cloud, Core concepts of AI agents.
- OWASP Cheat Sheet Series, AI Agent Security Cheat Sheet.
- NIST AI 600-1, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, July 2024, publication page updated 8 April 2026. Relevant actions include GV-1.5-001 to GV-1.5-003, MP-2.2-001, MP-2.3-005, MS-4.2-001 and MG-4.1.
- Office of the Australian Information Commissioner, Guidance on privacy and the use of commercially available AI products, updated 17 January 2025.

Editorial boundaries:
- The five information classes are an Off Piste practical model, not a universal technical standard.
- The professional-services scenario is constructed to demonstrate the decision method. It is not a client case study.
- This is practical business guidance, not legal advice. Privacy obligations depend on the organisation, information, use and jurisdiction.
-->

## Memory promises hide several different decisions

A vendor says its AI assistant remembers your customers, learns from every conversation, and continues work across sessions. That sounds like one feature. It contains several business decisions.

What gets stored? Who can cause the system to store it? Who sees it later? How long does it last? What happens when the information changes? Can a customer inspect or delete it? Which source wins when the memory conflicts with an approved policy or a client record?

Those questions determine whether memory removes friction or creates an ungoverned copy of the business. They also shape the commercial result. A useful preference can improve continuity. A stale price, private client detail, or unapproved instruction can damage trust and create expensive repair work.

Product language won't settle the boundary for you. [Microsoft's documentation for Azure SRE Agent](https://learn.microsoft.com/en-us/azure/sre-agent/memory), for example, distinguishes user memories, past incidents and an uploaded knowledge base. It gives each source a different retrieval job. [AWS describes long-term agent capability](https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-foundations/generative-ai-agents.html) as a combination of prompt context, external stores, retrieval and other mechanisms.

The labels vary between platforms. The business still needs a stable model for deciding what each piece of information is allowed to do.

## Define memory by its operational role

The following five classes are an Off Piste practical model. They aren't a universal taxonomy. They separate information by ownership, authority and lifetime so a team can evaluate a product or brief a custom system without accepting a vendor's broad definition of memory.

| Information class | Business role | Typical write authority | Lifetime and correction |
| --- | --- | --- | --- |
| Working context | Keeps the current conversation or calculation coherent | The active interaction and system | Usually ends with the task or session |
| Workflow state | Tracks an unfinished task, approval or handoff | The workflow and authorised participants | Lasts until completion, cancellation or a defined archive event |
| User-specific memory | Carries a useful preference or durable fact across sessions | The user, or a validated process acting for them | Persists only while necessary and must be visible, correctable and deletable |
| Canonical business knowledge | Supplies approved policies, procedures and service facts | Named content owners through governed publishing | Follows the source's review and retirement cycle |
| System-of-record data | Records authoritative business events and status | The controlled business application and authorised roles | Follows operational, audit and legal requirements |

[Google Cloud's agent architecture guidance](https://cloud.google.com/resources/core-concepts-ai-agents) similarly separates short-term conversational context, distilled user memory, structured knowledge and transactional records. That doesn't make the five classes above an industry standard. It does support the underlying point that different jobs need different stores and controls.

The table is a starting map. A real implementation needs to define the owner, write rule, scope, retention period, correction path and deletion trigger for each item within a class.

## Working context should disappear when the task ends

Working context includes recent messages, temporary instructions, intermediate calculations and tool results needed to complete the current task. It helps an agent understand what “that proposal” refers to or which step has already finished.

Most of this material has little value once the task ends. Retaining it by default expands the pool of information that can become stale, leak into a later interaction, or be used for an unrelated purpose.

Set a short default lifetime. Keep a longer transcript only when there is a defined business need, a suitable access model and a separate retention rule. Don't let a temporary statement become a durable fact merely because it appeared in a conversation.

This distinction matters when a user corrects themselves. “Send the draft to my old address” may be relevant for one action. It shouldn't overwrite the approved contact record or become a lasting preference without confirmation.

## Workflow state needs an owner and an expiry

Some tasks genuinely need continuity beyond one session. A proposal may be waiting for approval. A support issue may be paused while a technician gathers evidence. An onboarding workflow may need to resume after a client supplies a document.

Treat that information as workflow state tied to a named process. Record who owns the next action, restrict access to the people and systems involved, and define the event that completes, cancels, archives or deletes it.

A workflow without an expiry becomes a collection of abandoned intentions. The agent may later act on an approval that was withdrawn or a task that another system already completed. A completion check against the authoritative system prevents convenience state from outranking reality.

## User memory needs consent, scope and correction

User-specific memory can make an assistant less repetitive. It might retain a preferred report format, the user's role, an accessibility preference, or a standing instruction about tone.

The benefit doesn't justify storing every personal detail. Before creating a memory, ask whether it is necessary for a defined experience. Show the user what will be retained where practical. Keep it scoped to the right person or account. Provide a way to correct and delete it. Treat sensitive information as a separate, higher-risk decision rather than an ordinary preference.

For Australian organisations handling personal information, the [OAIC guidance on commercially available AI products](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products) recommends examining intended purpose, who can access information, accuracy, provider controls, human oversight and ongoing review. It also warns against entering personal information, particularly sensitive information, into publicly available generative AI tools as a matter of best practice.

Memory makes accuracy an ongoing responsibility. A wrong inference about a person can still be personal information. A preference can change. An old role can grant the wrong context. The correction path therefore needs to update or remove the stored item itself, not merely instruct the model to ignore it in one chat.

Cross-user isolation is equally fundamental. A memory saved for one client, employee or tenant must not influence another. [OWASP's AI Agent Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html) recommends isolating memory and context between users and sessions. That boundary needs technical enforcement and testing, not just a sentence in a policy.

## Canonical knowledge belongs in a governed source

Policies, approved procedures, service inclusions, current prices and product facts have an organisational owner. Put them in maintained sources with provenance, permissions and a review cycle. Let the agent retrieve the relevant material when it needs to answer.

This is the role of a [business knowledge base prepared for reliable AI](/insights/ai-ready-knowledge-base-business-guide). The agent shouldn't learn a new refund policy from one customer's chat and silently reuse it as company truth. A content owner should approve the policy in the canonical source.

Retrieval-augmented generation can bring selected source material into the model's context at runtime. It isn't the same as a user preference, unfinished workflow or authoritative transaction. If the architecture decision is really about retrieval, prompt context or adapting model behaviour, use the fuller guide to [RAG and fine tuning for business knowledge](/insights/rag-vs-fine-tuning-business-knowledge-guide).

Keeping this boundary clear improves maintenance. When a policy changes, the team updates one approved source. It doesn't hunt through personal memories, transcripts and agent-created notes hoping to find every obsolete copy.

## Authoritative records stay in business systems

Consider a constructed professional-services firm using an agent to help account managers prepare for client calls.

The current conversation can hold the manager's temporary notes. Workflow state can show that a draft scope is awaiting review. User memory can retain the manager's preferred briefing format. The knowledge base can supply the firm's approved service definitions and engagement policy.

The signed contract, invoice status, client identity, consent record and final project status remain in the CRM, practice-management or finance system responsible for those records. The agent may read permitted fields or propose a change. It shouldn't become an unofficial ledger.

This division protects more than data quality. It preserves the controls people already rely on for permissions, audit history, reconciliation and reporting. If the agent's summary conflicts with the signed agreement, the agreement wins. If it says an invoice was paid, the finance system must confirm that event.

An agent can support the interaction without owning the truth.

## Write authority matters as much as read access

Teams often review what an agent may read and spend less time on what it may create. Persistent writing deserves the same scrutiny because one bad entry can shape many future interactions.

Define write authority for each information class. A user may explicitly save their own preference. A workflow engine may update task state after a verified event. A content owner may publish canonical knowledge. A controlled application may record a transaction after its normal validation succeeds.

Agent-generated inferences need a narrower route. Label them as inferred, retain their provenance and validate them before they become durable. Require human approval when a stored item could change access, affect a person, commit money, alter a record, or become organisational policy.

OWASP identifies memory poisoning as malicious data persisted to influence future sessions or users. Its security guidance calls for external inputs to be validated, memory to be scoped, and malicious content to be sanitised, expired or rejected before persistence. A retrieved document, email or user message can contain instructions that look useful to a model. It shouldn't gain write authority merely because the agent read it.

Record these decisions within the wider [AI governance policy](/insights/ai-governance-policy-checklist-growing-businesses). The policy should name accountable owners and prohibited writes rather than relying on a promise that the model will be careful.

If memory leaks across users, preserves a poisoned instruction or drives an unauthorised action, use the playbook to [respond when an AI memory boundary fails](/insights/ai-incident-response-playbook-growing-businesses) while the technical owner preserves evidence and traces the fault.

## Forgetting is a product requirement

Useful memory has an end condition. That might be task completion, a fixed expiry, a policy revision, a permission change, account closure, withdrawal of consent, or a verified deletion request.

Design those events before launch. Specify whether deletion covers the primary store, search index, cache, derived summary and backup process. Decide how quickly the change must take effect. Preserve only the audit evidence the business is authorised and required to keep.

Correction also needs precedence rules. New approved knowledge should outrank an old agent note. A system-of-record update should invalidate incompatible workflow state. A user's corrected preference should replace the previous item rather than sit beside it as a competing fact.

The [NIST Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1) provides lifecycle support for this approach without prescribing an agent-memory design. Action MP-2.2-001 calls for documenting reliance on upstream data sources. Actions GV-1.5-001 to GV-1.5-003 cover responsibilities for periodic review, incident monitoring and retention of evaluation history. Its Manage 4.1 category addresses post-deployment monitoring, override, decommissioning, incident response, recovery and change management.

Forgetting belongs in the information architecture and the customer promise.

## Test the boundaries before launch

A configuration screen can show that memory is enabled. It can't prove that the business boundaries work under pressure.

Test whether one user can retrieve another user's memory. Introduce a plausible but malicious instruction and confirm it cannot persist. Change a permission and verify that old access disappears. Correct a saved fact and search for the obsolete version. Trigger expiry and deletion across every derived store. Create a conflict between memory and a canonical source, then confirm the right source wins.

OWASP recommends structured security testing before production and after material changes to memory, retrieval, tools, prompts or providers. Its abuse-case guidance specifically tests whether malicious content is sanitised, scoped, expired or rejected before persistence. NIST action MP-2.3-005 calls for regular adversarial testing, while MS-4.2-001 calls for testing at a regular cadence to identify manipulation, misuse and unintended outputs.

Add these cases to the wider [AI workflow pre-launch testing plan](/insights/ai-workflow-pre-launch-testing-guide). After launch, monitor retrieval quality, freshness, access boundaries and repair outcomes with the [AI knowledge-base quality method](/insights/monitor-ai-knowledge-base-quality-guide). A passing launch test is the start of control, not the end.

## Turn the decision into an implementation brief

Before procurement, configuration or custom development, write down the information architecture in language that business owners, vendors and implementers can test. Start with actual information the proposed agent will encounter. Don't begin with the storage product.

The brief should make every durable item explainable. A reviewer should be able to see why it exists, who controls it, where truth lives and how the item disappears. This checklist captures the minimum decisions to carry forward.

```insight-module
{
  "type": "practice",
  "label": "In practice",
  "title": "Define every memory before the system stores it",
  "intro": "For each information class, record the decisions the team will need to configure and test.",
  "items": [
    "Name the business owner and authoritative source",
    "Define who or what may write and correct it",
    "Set user, team, or organisation scope",
    "Set retention, expiry, and deletion triggers",
    "Record permissions, provenance, and review requirements",
    "Write isolation, poisoning, conflict, and deletion tests"
  ]
}
```

Use the completed brief to compare vendor claims, configure an existing platform, or scope a custom system. If a provider can't explain how memory is isolated, corrected, expired and deleted, that gap belongs in the decision record.

The right design gives the agent enough continuity to do useful work while keeping authority, privacy and ownership where the business can govern them.
