# Insight visual and editorial modules

The article system separates data visualisation, a tightly constrained decision matrix, and editorial modules. Do not turn an ordinary list, table, process, or hierarchy into a graphic.

Before using an `insight-visual`, identify the pattern being encoded and explain what becomes easier to understand visually. If there is no numeric pattern or pair of meaningful axes, use prose or an `insight-module` instead.

Every visual requires one concise, direct `title`. Do not add an eyebrow, label, internal summary, or caption. Put context and interpretation in the surrounding article. Data visuals also require a named `source`. Text is escaped and cannot contain HTML or Markdown.

## Data visualisations

Data types require real values and a named source. The renderer calculates proportions; authors never supply CSS dimensions or coordinates.

### Headline statistic

Use `headline-stat` for one to three important sourced findings.

```insight-visual
{
  "type": "headline-stat",
  "title": "Support has grown faster than company policy",
  "unit": "%",
  "items": [
    { "value": 87, "label": "receive organisational support" },
    { "value": 28, "label": "report changed formal processes" }
  ],
  "source": "Named survey, edition and date"
}
```

### Ranked horizontal bars

Use `ranked-bars` to compare values across categories. `value` must be numeric. `display` controls the written value; `max` is optional and otherwise derived from the largest value.

```insight-visual
{
  "type": "ranked-bars",
  "title": "Peer learning now leads formal training",
  "unit": "%",
  "max": 100,
  "items": [
    { "label": "Peer learning", "value": 70 },
    { "label": "Leadership recommendations", "value": 16 }
  ],
  "source": "Named survey, edition and date"
}
```

### Grouped bars

Use `grouped-bars` for two or three series compared across the same categories, including year-over-year change.

```insight-visual
{
  "type": "grouped-bars",
  "title": "Peer learning grew while formal direction declined",
  "unit": "%",
  "max": 100,
  "series": [
    { "key": "previous", "label": "2025" },
    { "key": "current", "label": "2026" }
  ],
  "items": [
    { "label": "Peer learning", "values": { "previous": 24, "current": 70 } },
    { "label": "Leadership recommendations", "values": { "previous": 32, "current": 16 } }
  ],
  "source": "Named survey, edition and date"
}
```

### Stacked proportions

Use `stacked-bars` for part-to-whole comparisons or distributions. Each row is normalised to 100% by the renderer.

```insight-visual
{
  "type": "stacked-bars",
  "title": "Support differs by company stage",
  "unit": "%",
  "series": [
    { "key": "strong", "label": "Strong" },
    { "key": "moderate", "label": "Moderate" },
    { "key": "minimal", "label": "Minimal or none" }
  ],
  "items": [
    { "label": "Early stage", "values": { "strong": 64, "moderate": 23, "minimal": 13 } },
    { "label": "Growth stage", "values": { "strong": 59, "moderate": 34, "minimal": 7 } }
  ],
  "source": "Named survey, edition and date"
}
```

## Decision matrix

### Matrix

Use `matrix` only when two meaningful axes produce four distinct decision areas. Item order is top-left, top-right, bottom-left, bottom-right.

```insight-visual
{
  "type": "matrix",
  "title": "Value and risk determine the default route",
  "xAxis": "Risk increases",
  "yAxis": "Value increases",
  "items": [
    { "title": "Pilot", "description": "High value with bounded risk" },
    { "title": "Redesign", "description": "High value with excessive risk" },
    { "title": "Defer", "description": "Foundations need work" },
    { "title": "Reject", "description": "Weak value with high risk" }
  ]
}
```

## Editorial modules

Editorial modules create reading rhythm but are not graphics. Use the separate `insight-module` fence.

### In practice

```insight-module
{
  "type": "practice",
  "label": "In practice",
  "title": "Start with the decision the team needs to make",
  "intro": "A useful review asks a small number of concrete questions.",
  "items": [
    "Name the outcome and owner",
    "Record the evidence and uncertainty",
    "Define a stop condition"
  ]
}
```

### Key takeaways

```insight-module
{
  "type": "takeaways",
  "label": "Key takeaways",
  "title": "What the evidence changes",
  "items": [
    { "title": "Screen before scoring", "body": "A failed hard gate overrides an attractive total." },
    { "title": "Expose uncertainty", "body": "Confidence belongs beside every estimate." }
  ]
}
```

## Selection rules

- Use a data visual only when verified numeric values are available.
- Use a matrix only when two meaningful axes create four distinct decision areas.
- Keep processes, branches, hierarchies, lists, and table-like comparisons in prose or editorial modules unless they receive bespoke art direction outside the automated pipeline.
- Use an editorial module for advice, examples, or takeaways.
- Use ordinary prose for everything else.
- Introduce why the component matters in the preceding prose.
- Visual titles state the finding or decision directly, without a separate eyebrow, label, summary, or caption.
- Sources name the publication and relevant date or edition.
- Never use raw SVG, manual coordinates, decorative diagrams, stock imagery, or legacy brand colours.
