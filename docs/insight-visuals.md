# Insight visual blocks

New insight graphics use structured `insight-visual` blocks. The site generator turns the JSON into responsive, accessible HTML that follows the Off Piste article design system.

Use a visual only when it makes a relationship, sequence, comparison, or small body of evidence materially easier to understand. Keep ordinary explanation as prose. Do not add raw SVG, manual coordinates, decorative diagrams, or generic stock imagery.

Every block requires `type` and `title`. Optional shared fields are `eyebrow`, `summary`, `source`, and `caption`. Text is escaped by the renderer and cannot contain HTML or Markdown.

## Metrics

Use for two to four important figures from a consistent evidence base.

```insight-visual
{
  "type": "metrics",
  "eyebrow": "What the evidence shows",
  "title": "Support has grown faster than company policy",
  "summary": "The strongest figures establish the gap before the article explains it.",
  "items": [
    { "value": "87%", "label": "receive organisational support", "detail": "Moderate or strong support" },
    { "value": "28%", "label": "have changed formal processes" },
    { "value": "60%", "label": "expect stable or growing teams" }
  ],
  "source": "Named report, survey and date"
}
```

Never invent a metric. The source must support every figure shown.

## Process

Use for a genuine sequence or lifecycle. Each item requires `title`; `description` is optional.

```insight-visual
{
  "type": "process",
  "eyebrow": "Operating model",
  "title": "A reliable workflow has four control points",
  "items": [
    { "title": "Define the decision", "description": "State what the workflow may decide and what remains human." },
    { "title": "Prepare the evidence", "description": "Give the system current, authoritative source material." },
    { "title": "Review the output", "description": "Test accuracy before the result reaches a customer." },
    { "title": "Monitor the outcome", "description": "Track exceptions, corrections and changing source material." }
  ]
}
```

## Comparison

Use for two or three parallel categories with genuinely comparable points.

```insight-visual
{
  "type": "comparison",
  "eyebrow": "Where the difference sits",
  "title": "The same traffic can serve different jobs",
  "columns": [
    { "title": "Research intent", "items": ["Explains the problem", "Builds confidence", "Supports later comparison"] },
    { "title": "Decision intent", "items": ["Clarifies the offer", "Resolves practical risk", "Creates a next step"] }
  ]
}
```

## Matrix

Use only when two axes create four meaningful quadrants. Provide exactly four useful items; extra items are ignored by the renderer.

```insight-visual
{
  "type": "matrix",
  "eyebrow": "Prioritisation",
  "title": "Consequence and exposure determine the control level",
  "xAxis": "Customer exposure increases",
  "yAxis": "Consequence increases",
  "items": [
    { "title": "High", "description": "Specialist input and approval" },
    { "title": "Restricted", "description": "Do not proceed without specialist review" },
    { "title": "Low", "description": "Register and sample outputs" },
    { "title": "Moderate", "description": "Test and approve before use" }
  ]
}
```

The item order is top-left, top-right, bottom-left, bottom-right on larger screens. On narrow screens the same reading order becomes a vertical list.

## Editorial checks

- The preceding prose must introduce why the visual matters.
- The visual should add scanning or relational value rather than repeat a nearby list.
- Titles should state the insight, not merely name the format.
- Labels should be short enough to remain readable on mobile.
- Source lines should name the source and relevant date or edition.
- A build failure caused by visual JSON must be fixed before publishing.
