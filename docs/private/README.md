# Off Piste Private Blog Pipeline

This folder holds private planning material for the Off Piste blog writing pipeline.

The public website content lives elsewhere. These files are intentionally ignored by Git so the working strategy can evolve without being published or deployed.

## Structure

### `foundation/`

Durable operating principles for the pipeline.

- `blog-writing-pipeline-foundation.md`
- `topical-map-blog-pipeline-reference.md`

Use this layer to understand the editorial standard, evidence requirements, style enforcement, maintenance model, and publishing flow.

### `territories/`

One folder per active topical territory.

Each active territory should usually contain:

- `brief.md`: durable definition, audience, anxieties, subclusters, evidence base, and source tiers.
- `map.md`: content assignment, coverage assessment, internal-linking opportunities, and research priorities.

Current active territories:

- `search-ai-discovery/`
- `ai-trust-business-capability/`

Create a new territory folder only when Off Piste is ready to actively build that territory. Do not create territory folders for every possible future idea.

### `runs/`

One working file per research, refresh, writing, or publishing cycle.

Use the template in:

- `runs/templates/pipeline-run-template.md`

Run files are allowed to be temporary and specific. They should capture the work needed for one article, one refresh, one keyword-research pass, or one cluster investigation.

## Operating Principle

The hierarchy is:

1. Foundation tells agents how to think and write.
2. Territory docs tell agents where a topic fits.
3. Run docs tell agents what to do this time.

Keep durable strategy in foundation or territory docs.

Keep stale-prone working detail in run docs.

## Current Next Step

Create the first run from the template for the `AI Strategy and Use Case Selection` cluster inside `ai-trust-business-capability`.

The first run should focus on keyword and evidence research before choosing whether to refresh existing overlap content or draft a new article.

## Current Schedule

The live Off Piste blog pipeline is scheduled in Wingman Autopilot as `Off Piste Blog Pipeline`.

Current cadence:

- Daily at 7:00 AM `Australia/Perth`.
- Cron expression: `0 7 * * *`.

The schedule itself lives in the Wingman scheduler database, not in the pipeline definition JSON.
