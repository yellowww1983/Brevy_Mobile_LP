# Design Reference Library

Principle-driven knowledge about what makes premium landing pages work. Used as Claude's design vocabulary when making decisions.

## How to use

**Before making an aesthetic decision:** skim relevant patterns. Decide with a specific principle in mind, not from defaults.

**When reviewing a draft:** check it against the anti-patterns. The gap is your edit list.

**When a screenshot comes up in conversation:** discuss it. Don't reflexively persist it. See `agents/visual-learner.md` for the conversation-first behavior.

## Library contents

### Tailwind palette reference

- **`tailwind-palette-reference.md`** — the complete Tailwind v4.3 default palette in OKLCH format. Used for color matching when extracting colors from designs. Per `rules/tailwind-palette-discipline.md`, this is the SOURCE of all color in the project.

### Patterns (principle-driven)

Cross-cutting design principles. Each pattern is a PRINCIPLE, illustrated with 2-3 example sites. The principle is the durable knowledge; the examples illustrate it.

Current patterns:
- `patterns/one-accent-discipline.md` — premium sites reserve color for meaning
- `patterns/typography-as-design.md` — type does 70% of the work on great landings
- `patterns/social-proof-progression.md` — credibility earned in stages, not dumped
- `patterns/pricing-psychology.md` — framing value vs cost, middle-tier emphasis, anchors
- `patterns/dark-mode-confidence.md` — dark as design decision, not theme switch
- `patterns/sticky-cta-band.md` — when sticky helps, when it hurts

Pattern files include:
- The principle (stated abstractly, no site-specific narrative)
- When it works / when it fails
- 2-3 example sites as illustrations
- Anti-pattern crossover

### Anti-patterns

What to recognize as bad and avoid. Each anti-pattern distinguishes the failure case from the legitimate use of the same visual element where applicable.

Current anti-patterns:
- `anti-patterns/ai-aesthetic.md` — multi-hue decorative gradients, decorative glassmorphism, sparkles icon, "Get Started Free" CTA, AI-generated logos, etc.

### Clients (per-engagement brand briefs)

One file per active client engagement. Contains brand voice, typography, palette mappings, asset locations, project-specific notes.

Folder: `clients/<client-slug>.md`

This folder gets created the first time `visual-learner` agent or `discovery-strategist` agent persists a client brief.

## What was retired

**`studies/` folder** — removed. Individual site studies (Linear, Vercel, Stripe as standalone files) accumulated repetition (same observations across files) and added file count without proportional knowledge. Lessons from specific sites now live AS EXAMPLES inside pattern files — that's where durable knowledge belongs.

If a site is so distinctive it can't be captured as an example in an existing pattern, that's a signal a new pattern needs naming (rare). See `skills/learn-from-screenshot.md` for the criteria.

## How the library grows

Two paths, both with strict criteria:

1. **Manual curation**: you identify a recurring principle worth naming and write it as a pattern. ~1-2 new pattern files per quarter at most.

2. **Screenshot-driven**: you upload screenshots and conversation reveals something worth keeping. Default: conversation, no files. When persistence IS justified, prefer APPENDING examples to existing patterns over creating new files. See `skills/learn-from-screenshot.md` for the decision tree.

## What this library is NOT

- **Not a list of sites to imitate.** The point is to extract principles, not copy elements.
- **Not a place for every interesting screenshot.** Most screenshots illustrate existing principles — discuss them, don't file them.
- **Not exhaustive.** 6-15 well-named patterns beats 40 site studies. Quality over quantity.
- **Not static.** Patterns evolve as design conventions evolve. Anything that hasn't been useful in 18 months should be reviewed.

## Health check

If `.claude/references/` is growing by 3+ files per month, the bar for new files is too low. Re-read `agents/visual-learner.md` — most screenshots should result in conversation, not files.
