---
title: How to Test an AI Workflow Before Launch
slug: ai-workflow-pre-launch-testing-guide
description: Build acceptance criteria, representative test cases and a controlled release plan for an AI workflow across tools, handoffs, permissions and recovery.
intro: A convincing demo shows that an AI workflow can work. A release test shows whether the complete business process is useful, controlled and recoverable enough to face real work.
author: Lara
date: 2026-09-04
readTime: 13 min read
tags: AI, Workflow Automation, AI Testing, Acceptance Criteria, AI Reliability, Internal Systems, Human Oversight
topics: AI & Automation, Growth & Leads
cluster: AI Workflow Automation and Internal Systems
relatedPosts: ai-workflow-automation-business-systems-guide, measure-ai-workflow-automation-roi-reliability, ai-workflow-automation-failure-diagnostic-guide
---
<!--
Source check record, 4 September 2026 Australia/Perth:
- Australian Government National AI Centre implementation guidance remains live. It defines pre-deployment acceptance criteria, documented testing, authorisation, monitoring and human control.
- NIST AI 800-4 remains available as the July 2026 final publication. It explains why controlled pre-deployment evaluation cannot represent every deployment condition and why monitoring is needed.
- AWS Prescriptive Guidance remains live. It supports layered preproduction testing with realistic data, edge cases, end-to-end checks and failure scenarios.
- OWASP LLM06:2025 remains live. It identifies excessive functionality, permissions and autonomy and recommends downstream authorisation and human approval for high-impact actions.
- Microsoft Foundry agent evaluator guidance remains live. It separates end-to-end task completion from tool selection, input, output use and safety evaluation.
- The enquiry-to-CRM workflow is a worked example. It contains no invented performance result.
-->
## A working automation still needs release evidence

In a successful enquiry-to-CRM demo, a test form arrives, the AI produces a clear summary, the CRM record appears and a useful follow-up draft waits for approval. The happy path works once.

That demo doesn't show what happens when the postcode is missing, the enquiry describes two services, the CRM is unavailable or a prompt asks the system to reveal another customer's details. It may hide a field written to the wrong record, a draft sent before approval or a retry that creates a duplicate lead.

Release evidence has to cover the business outcome and the path that produces it. The workflow must behave acceptably across realistic conditions, keep failures bounded and leave enough evidence for a person to understand what happened.

This work begins after the team has [chosen and mapped a suitable workflow](/insights/ai-workflow-automation-business-systems-guide). It ends with a decision to release, reduce the scope, fix a weakness or stop. Normal reliability and return measurement begin once controlled production starts.

## Turn the intended outcome into acceptance criteria

Write the release criteria before assembling test cases. Otherwise, a polished answer can quietly become the definition of success.

For the enquiry workflow, the business outcome might be an accurate CRM record and an appropriate follow-up draft that a named person can review before anything reaches the prospect. That outcome becomes observable when each important condition has a pass rule.

The CRM record must attach to the correct person and enquiry. Required source fields must transfer without invention. The service classification must use an approved category or mark the case for review. The follow-up must use current service information and make no unsupported promise. No message can send before approval. The log must retain the input, output, tool actions, reviewer and final state.

Add prohibited outcomes as hard gates. The workflow must not expose another record, change deal value, assign an owner outside its rules or continue silently when a dependency fails. Define who can approve release and which failure prevents it.

The [Australian Government National AI Centre implementation guidance](https://www.ai.gov.au/staying-safe-and-responsible/essential-ai-practices/guidance-ai-adoption-implementation-guidance) calls for acceptance criteria and test methods that reflect intended use, context and potential risks. It also calls for documented results, accountable authorisation, monitoring requirements and human oversight before deployment. For an operator, this turns acceptance criteria into a release contract rather than a loose quality aspiration.

Some criteria are hard gates. A privacy breach, unauthorised send or corrupted record blocks release even if every other case passes. Other measures become operational indicators after launch, such as average review time or the proportion of drafts accepted with minor edits. Keep that boundary clear so a future performance target doesn't excuse a current control failure.

## Build a representative test set

A useful test set resembles the variation the workflow will face. Start from real patterns in forms, CRM records and staff decisions. Remove or replace personal and sensitive details where using them isn't appropriate. Synthetic cases can cover risky conditions without copying a real customer's information into a test environment.

Include four families of cases.

- **Normal cases** cover common services, complete fields, known locations and straightforward next steps. Vary the language so the test doesn't reward one carefully phrased input.
- **Boundary and ambiguous cases** include missing details, conflicting selections, unusual spellings, mixed service needs, unsupported locations and requests near an approval threshold. The expected outcome may be a question or a human review rather than a confident classification.
- **Dependency and recovery cases** simulate a CRM timeout, invalid field value, unavailable knowledge source, failed notification and interrupted approval. Check the visible error, retained work and safe retry.
- **Adversarial and unauthorised cases** ask the workflow to ignore its rules, retrieve unrelated data, use an unapproved tool, alter a protected field or send without approval. Include risky instructions inside the enquiry text, not just in the operator prompt.

One example isn't enough for a material criterion. Repeat important cases with varied wording and data shapes. Include past defects as regression cases so a later prompt, model, connector or field change can't quietly restore an old failure.

The record for each case needs enough detail for another reviewer to reproduce the result and understand its release consequence.

```insight-module
{
  "type": "practice",
  "label": "In practice",
  "title": "Record enough evidence to reproduce every result",
  "intro": "Each case should let another reviewer understand the condition, expected behaviour, actual behaviour and release consequence.",
  "items": [
    "Name the scenario, input conditions and expected business outcome",
    "Record the actual output, tool calls, system writes and human handoff",
    "Assign severity, evidence, owner, fix and retest result",
    "Mark the acceptance criterion as passed, failed or blocked"
  ]
}
```

## Test the whole path

Run each case from the first real input to the final business state. The [AWS preproduction hardening guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/preprod-hardening.html) recommends testing with realistic data and edge cases at multiple layers, followed by end-to-end testing and failure scenarios. For an operator, a good model response cannot compensate for a broken connector, incorrect field mapping or missing approval.

Follow one test enquiry through the full path.

1. Submit the form through the same validation and consent route a prospect uses.
2. Confirm that deterministic rules preserve the source values, reject invalid formats and apply known service or location logic.
3. Inspect the model's summary, classification, missing-information flags and follow-up draft against the approved sources.
4. Inspect every tool call, including the chosen tool, arguments, returned value and how the result influenced the next step.
5. Confirm that the CRM creates or updates the correct record without overwriting protected fields or creating an unintended duplicate.
6. Check the human review view, correction route and approval state before any customer communication.
7. Confirm the final send state, analytics event, owner, follow-up date and audit record.

Test deterministic rules separately from model judgement. A postcode lookup and required-field check should return consistent results. A model classification needs representative examples, an allowed set of outputs and a safe response when evidence is unclear.

The [Microsoft Foundry agent evaluation guidance](https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/agent-evaluators?preserve-view=true&view=foundry) distinguishes end-to-end task completion from intermediate tool behaviour, including tool selection, input accuracy, output use and safety. You don't need Microsoft's platform to use that distinction. Record both whether the enquiry reached the correct business state and whether each tool action was valid on the way there.

Customer-facing logic adds another layer. If the workflow changes form questions, routing or follow-up based on inferred intent, apply the same release discipline to the complete lead journey. The guide to [trustworthy AI personalisation](/insights/ai-personalisation-website-lead-journey-guide) covers the visitor controls and fallback choices around that specialised use.

## Verify permissions, handoff and recovery

Permissions determine how far a bad interpretation can travel. Give the workflow only the functions and records it needs for the approved task. Test the configured identity in the real preproduction environment rather than relying on a permissions document.

The [OWASP guidance on excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) identifies excessive functionality, permissions and autonomy as distinct causes of damaging actions. It recommends minimising tools and privileges, enforcing authorisation in downstream systems and requiring human approval for high-impact actions. In practice, the CRM must reject a protected change even when the model asks persuasively, and the send service must enforce approval independently of text in the prompt.

Try to make the enquiry workflow edit another salesperson's restricted record, export an unrelated contact, change a deal value and send a message before approval. Confirm that each attempt fails at the system boundary and appears in the evidence.

Then test the human handoff. The reviewer needs the original enquiry, the proposed fields, the source used for claims, uncertainty or missing information and the exact action awaiting approval. They must be able to correct, reject, pause and escalate without working around the interface.

Recovery deserves its own test. Interrupt the CRM write after the draft is created. Retry the job. Confirm that it resumes safely or stops clearly, without duplicate records or sends. Pause the workflow while jobs are waiting. Confirm that a named owner can find the queue and move urgent enquiries into a manual route.

These controls should align with the organisation's [AI governance policy](/insights/ai-governance-policy-checklist-growing-businesses), including data boundaries, approval authority, incident responsibility and stop authority. A release test proves that those decisions work in this workflow. It doesn't replace the wider policy.

## Record failures so fixes can be retested

Treat a failed case as evidence, not an awkward result to average away. Capture the input conditions, expected outcome, actual outcome, tool trace, reviewer, severity and supporting logs or screenshots. Link the failure to the acceptance criterion it breached.

A pass rate can conceal one unacceptable event. Ninety-nine harmless successes don't offset a single disclosure of another customer's information. Report hard-gate failures separately from lower-severity quality issues and blocked cases where the test environment couldn't produce a valid result.

Assign the fix to the layer that failed. A vague form may need an intake change. An invented service claim may need better source constraints. A wrong CRM owner may come from deterministic mapping. A duplicate send may be a retry and idempotency defect. Retest the failed case, nearby variations and the wider regression set after the change.

If a defect escapes into production, preserve the live evidence and use the [live AI workflow failure diagnostic](/insights/ai-workflow-automation-failure-diagnostic-guide) to contain and trace it. Add the repaired case to the pre-launch suite before the next release.

## Choose go, narrow, fix or stop

The evidence should lead to one explicit decision.

**Go** when every hard gate passes, remaining limitations are understood and the workflow can enter a monitored, controlled release. Record the approver and rationale.

**Narrow** when a smaller version is useful and supportable. Limit the cohort, accepted services, data, connected tools or permitted actions. An enquiry workflow might prepare a summary and draft while leaving every CRM write and send to a person.

**Fix** when a failed criterion has a credible remedy. Hold release, change the responsible layer and rerun the failed, adjacent and regression cases. A deadline isn't evidence that the criterion has changed.

**Stop** when the intended outcome remains too uncertain, a material risk cannot be bounded or the operating effort defeats the value. Keep the existing manual route while the business changes the underlying process or abandons the use case.

Testing should be proportionate to the potential impact. A workflow handling sensitive information, consequential decisions or important legal obligations may need specialist privacy, security or legal review. Passing an internal checklist doesn't replace that expertise.

## Plan the controlled release

Pre-launch testing reduces uncertainty within the cases and environment examined. It cannot prove how the workflow will behave across every live condition.

The [NIST report on monitoring deployed AI systems](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.800-4.pdf) explains that controlled evaluation conditions cannot fully represent deployment and that AI performance can change with operational data, environments, behaviour and system interactions. The release implication is direct. Start with a bounded cohort, watch the complete workflow and retain the ability to return to a safe manual route.

Name the initial users and case types. Define the signals that receive daily attention, the review cadence after the first week and month, and the owner who can pause the workflow. Set rollback triggers around hard-gate failures, repeated recovery problems, unacceptable review effort or loss of trace evidence. Keep the tested version of prompts, rules, model, tools and field mappings identifiable.

The next lifecycle step is to [measure workflow outcomes, reliability, review effort and cost](/insights/measure-ai-workflow-automation-roi-reliability) under real operating conditions. Re-run the relevant pre-launch cases whenever a model, prompt, connector, permission, source or business rule changes.

Missing release evidence often reveals a design problem. The form may collect the wrong information. CRM fields may misrepresent the decision. Approval may depend on an informal message. Analytics may stop before the commercial outcome. When testing exposes faults across intake, accessibility, integrations and follow-up, fix the [website and connected lead journey](/services/website-design) before automation magnifies them.
