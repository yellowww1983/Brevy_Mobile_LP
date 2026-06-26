# Pattern: Pricing Psychology

Pricing is where the buyer's analytical mode kicks in and emotional connection drops. Good pricing presentation keeps the emotional frame alive while satisfying the analytical need.

## The principle

Up to the pricing section, the reader is engaged with the value prop. The pricing section forces them to compare cost to value. If pricing is presented poorly, they leave with sticker shock. If presented well, they leave thinking "that's a reasonable price for what I get."

The goal isn't to hide the price. The goal is to frame it.

## Tier emphasis: the middle tier trick

The 3-tier layout exists to make the middle tier look obvious. This only works if:
- **Middle tier has genuine value** (not just "more of the same")
- **"Most popular" label is earned**, not just placed
- **Left tier is meaningfully limited** (not a trap that makes the middle look like the only option)
- **Right tier is genuinely for enterprise** (not just "more expensive middle")

If the client only has 2 meaningful tiers, use `pricing-2-tier-emphasis` archetype — don't pad to 3. A fake third tier undermines the entire design's credibility.

## Anchor pricing

The right tier (highest price) anchors perception:
- $299/mo right tier → $99/mo middle feels reasonable
- No right tier → $99/mo has no anchor → feels expensive

For clients with a single tier: consider adding "Custom / Enterprise — Contact us" as right anchor, even with no price. Costs nothing, makes the main tier feel accessible.

## Value vs cost framing

Bad: "€99/month"
Good: "€99/month — less than one missed client"
Better: "€99/month — one customer pays for the whole year"

Pricing copy should frame the price relative to the value delivered, not to the price itself. `agents/copy-strategist.md` owns this framing — every pricing section gets a value-frame sentence.

## The "most popular" badge

Use once, on the middle tier. Rules:
- **Small, not garish** — `bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs`
- **Position above tier name** (not below)
- **"Most popular"** is factual; "Best value" sounds desperate
- **Don't fake it** — if you don't know which is most popular, don't use the badge

## Annual vs monthly toggle

When present:
- **Default to ANNUAL** — shows higher commitment, better economics for seller
- **Annual discount: 15-20%** — below 15% not motivating; above 25% questions monthly pricing
- **Show savings concretely** — "Save €240/year" > "2 months free" (same thing, more concrete)
- **Toggle prominent but not focal** — tiers are the focus, toggle is secondary

```tsx
// Pricing section is a client component for the toggle
"use client"
// State: billing period (monthly | annual)
// Compute displayed price based on period
// Show "Save €X" badge when annual is selected
```

## What to avoid

- **Fake strikethrough prices** ("was $299, now $99!") unless genuinely a limited offer — destroys trust if seen through
- **"Free forever" claims** — legal/compliance risk, buyers know it's unsustainable
- **Per-seat pricing without a calculator** — buyers immediately worry about team cost; show a calculator or pre-computed examples
- **Hiding the price** — forces a demo call. Valid for enterprise; manipulative for SMB. If you must, say "Custom — starts at $X" not just "Contact us."
- **Long feature comparison tables on mobile** — unreadable. Use icon grid or accordion on mobile, full table on desktop.

## Implementation notes

For section library archetypes:

`pricing-3-tier`:
- Before using, confirm the client has 3 genuine tiers
- If not, use `pricing-2-tier-emphasis` (don't fake the third)
- Middle tier visually emphasized (slightly larger card, accent border)
- "Most popular" badge on middle tier
- Annual/monthly toggle above tier grid

`pricing-2-tier-emphasis`:
- Right tier emphasized (premium positioning)
- No "most popular" badge needed
- Same toggle pattern

`pricing-paragraph`:
- For premium/high-touch where the number isn't the point
- "Pricing starts at €X/mo. Custom for your team's needs."
- CTA: "Talk to us" instead of "Buy now"

## Currency

For multi-locale sites: detect locale, show appropriate currency. Use `Intl.NumberFormat` with proper currency code. Don't just append `$` regardless of locale (Polish buyer sees `$` and converts mentally — friction).

```ts
const fmt = new Intl.NumberFormat(locale, { style: "currency", currency: localeToCurrency(locale) })
fmt.format(99) // "€99,00" in PL, "$99.00" in en-US
```

## Seen in

- **Stripe** — does middle-tier emphasis subtly, never aggressive
- **Linear** — famously restrained pricing, "starts at" framing
- **Cursor** — single tier with strong anchor pricing on enterprise

## Anti-pattern crossover

Watch for:
- **Pricing FOMO panels** — "Only 3 spots left at this price!" — manipulative, hurts brand
- **Tiered features that don't matter** — middle tier has 17 checkmarks vs left's 12, but the 5 extra are filler
- **Aggressive "save 60% if you sign up today"** — works once, costs brand long-term

## Cross-references

- `skills/section-library.md` (pricing archetypes)
- `agents/copy-strategist.md` (value-frame copy)
- `rules/i18n-ready.md` (multi-currency formatting)
