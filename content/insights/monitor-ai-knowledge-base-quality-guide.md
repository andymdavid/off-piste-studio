---
title: How to Monitor AI Knowledge Base Quality
slug: monitor-ai-knowledge-base-quality-guide
description: Learn how to detect retrieval failures, unsupported answers, stale sources and access problems in a live AI knowledge base, then route each issue to the right repair.
intro: A live AI knowledge base can keep producing fluent answers while its sources, questions and permissions change around it. This guide shows you how to find quality drift, diagnose the failing layer and decide whether to monitor, fix or narrow the system.
author: Lara
date: 2026-08-15
readTime: 13 min read
tags: AI, Knowledge Management, RAG Evaluation, AI Governance, Internal Systems
topics: AI & Automation
cluster: Knowledge, Data, and Business Memory
relatedPosts: ai-ready-knowledge-base-business-guide, measure-ai-workflow-automation-roi-reliability, ai-governance-policy-checklist-growing-businesses
---
<!--
Primary sources accessed 15 August 2026 in Australia/Perth:
- Amazon Bedrock documentation, Use metrics to understand RAG system performance.
- Microsoft Azure Architecture Center, Large language model end-to-end evaluation.
- Microsoft Foundry RAG evaluators documentation.
- NIST AI 600-1, Generative Artificial Intelligence Profile.
- OAIC guidance on privacy and commercially available AI products.

Examples in this article are hypothetical. They do not represent client results.
-->
## A live knowledge system can drift quietly

A service team launches an assistant that answers questions about packages, delivery and customer eligibility. It performs well in the launch review. Six weeks later, a service owner updates the catalogue, customers start using a new name for one package and an indexing change alters which passages appear first. The assistant still sounds confident. Some answers now cite an old page, omit a condition or retrieve nothing for a question the team thought it covered.

That's the difficult part of production quality. The corpus, user questions, permissions and system configuration can all change after a successful launch. A polished response can hide which layer failed.

Microsoft's [end-to-end RAG evaluation guidance](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-llm-evaluation-phase) recommends retaining evaluation results and repeating tests as documents and query patterns change. Monitoring therefore needs a stable baseline, evidence from live use and a way to compare results after each meaningful change.

This guide begins after launch. If canonical sources, owners, permissions, provenance or an initial question set aren't established yet, use the [AI-ready knowledge base guide](/insights/ai-ready-knowledge-base-business-guide) first.

## Start with failures people can actually see

Metric names are useful after the team has named the problem. Begin with observable cases from query logs, citations, feedback, incidents and access tests.

A stale answer uses a superseded price or policy. A wrong-source failure retrieves material that mentions the topic but lacks authority for the decision. A missing-condition failure gives the main rule and drops an eligibility limit or exception. An unsupported claim adds something the cited evidence does not say. A permission failure exposes a source or fact to the wrong role. An unnecessary no-answer response fails to use evidence that is present and permitted.

Save the exact query, user role, retrieved passages, answer, citations and expected behaviour for each case. That record prevents a vague complaint such as “the AI is inaccurate” from becoming a vague prompt rewrite. It also lets the team reproduce the failure after a repair.

Use real production evidence where access and privacy controls allow it. Remove or mask personal information when the diagnostic task doesn't need it. Add difficult cases to a governed test set only after an owner confirms the expected source and behaviour.

## Test retrieval before judging the answer

Retrieval and generation need separate tests because they answer different diagnostic questions. Amazon Bedrock's [RAG evaluation metrics](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation-metrics.html) distinguish retrieve-only evaluation from retrieve-and-generate evaluation. Its retrieval measures include whether the retrieved context is relevant and whether it covers the information needed for the expected answer.

Microsoft Foundry makes a similar diagnostic separation in its [RAG evaluator taxonomy](https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/rag-evaluators). Retrieval relevance asks whether the returned passages help answer the query. Retrieval completeness asks whether they contain the information represented in the expected answer. These are vendor definitions, not a universal naming standard, so record the definition used beside every score.

Build an expected-source test set from questions the system should answer, should refuse and should route to a person. For each question, name the acceptable source or sources, required conditions, user role and expected behaviour. Then inspect what retrieval actually returns.

If the correct evidence never appears, generation cannot repair the missing foundation. Check whether the source is approved and current, whether ingestion processed it, whether chunking kept important conditions together, whether metadata and filters match the query, and whether ranking favours a weaker source. A fluent final answer should not turn a retrieval miss into a pass.

Avoid making one aggregate score the release decision. A high average can conceal a failed access test or a rare high-consequence question. Keep individual results available and group them by failure type, source area, user role and consequence.

## Check whether the answer uses evidence faithfully

Once retrieval supplies sufficient evidence, test the response. AWS uses measures including faithfulness and citation precision and coverage in its retrieve-and-generate evaluation. Microsoft describes response measures including groundedness, relevance and completeness. The labels overlap without being identical, so use each vendor's documented meaning rather than merging them into one claimed industry standard.

In plain language, ask whether every material claim follows from the retrieved evidence, whether the answer addresses the question, whether it includes necessary conditions and whether each citation supports the nearby claim. Then ask whether important evidence was cited at all.

Automated evaluators make repeated review practical, though their outputs are evidence rather than truth. Microsoft's end-to-end guidance notes that generative systems are nondeterministic and recommends several complementary measures with target ranges. Calibrate an evaluator against human-reviewed cases from the actual use case. Retain the prompt, model, configuration and evaluator version with the result so a later comparison remains meaningful.

Human review matters most for ambiguous wording, conflicting sources and high-consequence decisions. Reviewers need an agreed rubric and an expected answer or source. Otherwise their preferences can add as much inconsistency as the system being tested.

## Monitor freshness conflicts and access boundaries

Source-change records reveal whether yesterday's approved source became today's stale one. A price change, policy approval, service rename, expiry event or new document version should trigger a targeted regression test for the questions that depend on it.

Keep conflict cases in the test set. Ask a question for which an old and current source disagree, then verify that retrieval respects the recorded authority rule. If no owner can identify which source should win, the problem sits in business knowledge governance rather than model behaviour.

Access deserves its own tests. Run representative questions as each relevant role, including a user who should not reach the sensitive source. Confirm both the retrieved passages and the answer respect the boundary. Test direct wording, indirect wording and requests that combine public and restricted facts.

Where personal information is involved, the OAIC's [guidance on commercially available AI products](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products) asks organisations to consider purpose, access, accuracy, provider controls, human oversight and ongoing privacy review. Monitoring should therefore check why personal information remains necessary, who can retrieve it, how inaccurate information is corrected and when a person must intervene.

This is practical risk guidance, not legal advice. Privacy duties and suitable controls depend on the organisation, information and use case. Put material access failures, privacy incidents and unclear accountability into the wider [AI governance policy](/insights/ai-governance-policy-checklist-growing-businesses).

## Set a monitoring rhythm around real change

Start with a reviewed baseline before the system reaches broad use. Keep the test set, expected sources, target ranges, configuration and results together. This gives every later release a meaningful comparison.

Run regression tests before a material release. Sample live queries on a recurring schedule that matches volume and consequence. Trigger focused tests when a source, permission, model, prompt, index or retrieval rule changes. Review incidents immediately, then use a periodic trend review to see whether the same failure class is growing.

There is no responsible universal pass mark for every knowledge system. A customer-facing answer about eligibility needs a different tolerance from an internal assistant that helps staff find a template. Define acceptable ranges for the bounded use case, and make access violations or unsupported high-consequence claims hard gates where appropriate.

The [NIST Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence) supports documenting data sources, system changes, evaluation, monitoring and risk responses across the lifecycle. A compact change record should say what changed, why it changed, which tests ran, what moved and who accepted the remaining risk.

## Route each failure to the right repair

The evidence should narrow the repair. When an approved source itself is wrong or stale, its business owner corrects the source. When the correct source is absent from the index, the technical owner repairs ingestion. When retrieval returns related but weaker material, tune chunking, metadata, filters or ranking and rerun the expected-source cases.

If retrieval is sound and the response adds unsupported content, review the generation instructions, model behaviour and answer boundary. If a role can retrieve restricted material, treat that as an access-control failure rather than a relevance problem. Stop affected use until the permission path is repaired and verified.

Some failures should end in a handoff. Missing evidence, unresolved conflict, restricted information and high-consequence uncertainty need a safe next step instead of a more forceful answer. The [human handoff guide](/insights/ai-customer-experience-human-handoff-guide) explains how to make that recovery clear for customers.

The review becomes repeatable when every failed case leaves an evidence trail and one owned next test.

```insight-module
{
  "type": "practice",
  "label": "In practice",
  "title": "Give every failure an owner and a retest",
  "intro": "For each failed case, record enough evidence to make one repair decision.",
  "items": [
    "Name the observed failure and affected query",
    "Save the retrieved sources and generated answer",
    "Identify the likely source, retrieval, generation or access layer",
    "Assign the repair owner and the next test",
    "Record whether the system should keep answering, narrow its scope or hand off"
  ]
}
```

This source-to-access model is Off Piste's operator-focused interpretation of the evidence, not a vendor taxonomy. Its purpose is to connect an observable failure to the person who can change the relevant layer.

## Decide whether to monitor, fix or narrow

Close each review with a decision record. Name the failure, supporting evidence, consequence, owner, repair, next test and any temporary boundary. Keep monitoring when results remain inside the agreed range and no hard gate fails. Fix when the cause is understood and the team can verify the change. Narrow or pause the system when evidence, ownership or access cannot support the current promise.

Knowledge quality is only one part of the operating decision. Once retrieval and answer failures have been isolated, use the [workflow ROI and reliability guide](/insights/measure-ai-workflow-automation-roi-reliability) to evaluate verified outcomes, review effort, exceptions and cost.

A knowledge-system health check or AI systems discovery engagement should produce an expected-source test set, quality baseline, failure taxonomy, prioritised repair backlog, named owners and a documented monitor, fix or narrow decision.
