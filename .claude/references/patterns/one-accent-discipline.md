# Pattern: One Accent Discipline

## Seen in

- **Linear** — purple, used twice per page (CTA + one icon detail)
- **Vercel** — no accent at all, pure greyscale (extreme of this pattern)
- **Stripe** — purple, used systemically (semantic indicator) — same pattern, denser application

## The pattern

Premium B2B landing pages reserve color for moments of meaning. A single brand accent color appears in places that serve a purpose:
- Primary CTA
- Active state markers (current page in nav, selected option)
- Semantic indicators (success, error — but those are usually separate colors)
- Data emphasis where the brand color marks "this is the key number"

It does NOT appear in:
- Background gradients across multiple sections (that's decoration)
- Random "for visual interest" splashes
- Section labels just because the section needs "some color"
- Icon backgrounds for every feature in a feature grid

## Why it works

**The CTA actually pops.** If brand color appears 12 times on the page, the CTA blends in. If it appears 2 times and one is the CTA, the CTA is unmistakable.

**Reads as restraint, which reads as confidence.** "We don't need to paint everything our brand color for you to remember us." This is a social signal — the brands that need to over-color are the unsure ones.

**Gives the brand a signature.** When color is used semantically and rarely, the moments where it DOES appear become recognizable.

## The dial

This pattern has three levels of intensity:

**Level 1 — Zero accent (Vercel)**
No brand color on the marketing page. Only black/white/grey. The bravest move; only works if the typography is doing enough work.

**Level 2 — Used twice (Linear)**
Brand color appears 2-3 times on the entire page. CTA + maybe one detail. Default for "premium B2B with strong restraint".

**Level 3 — Used systemically (Stripe)**
Brand color appears many times, but always semantically — never as raw decoration. Requires more discipline (it's tempting to slip from "semantic use" into "vibes use").

Pick a level based on the brand's stage and confidence. Level 3 is appropriate for established brands; level 2 is the safe default; level 1 is the riskiest but most distinctive.

## When to deviate

- **Brand is intentionally playful.** Notion, Framer marketing, Linear's redesign for a specific campaign — colorful by design.
- **Product is creative-tool-ish.** Color = creativity signal. Figma, Canva, etc.
- **Consumer-facing, not B2B.** Consumers expect more visual signal; pure restraint reads as cold.
- **Brand has multiple intentional colors.** Some brands genuinely have 3+ brand colors as part of their identity. Adapt the pattern to "each brand color is used systemically, not decoratively".

## Reverse check

When reviewing a draft:

1. Count instances of brand color on the landing page.
2. For each instance, ask: "is this marking meaning, or is this decoration?"
3. Decoration instances are candidates for removal.

If brand color appears more than ~6 times on a single landing page, you're probably decorating. Strip back to meaning-only uses.

## Concrete implementation

In `globals.css`, define:

```css
--color-accent: oklch(0.55 0.18 290);
--color-accent-foreground: oklch(1 0 0);
--color-accent-hover: oklch(0.5 0.18 290);
```

In components, use `bg-accent` / `text-accent` ONLY for:
- Primary CTAs (Button variant="primary")
- Active state in navigation
- Focus rings (already wired via `--color-ring: var(--color-accent)`)
- Specific semantic emphasis (e.g. one data point that matters)

NOT for:
- Section labels (use `text-foreground-muted`)
- Card hover states (use subtle background or border change)
- Decorative pills/badges (use neutral surface colors)
- Section dividers (use `--color-border`)

This wiring at the token level makes the discipline automatic. A developer can't accidentally use brand color in 5 places if there's no `bg-accent-light` or `bg-accent-soft` to reach for.
