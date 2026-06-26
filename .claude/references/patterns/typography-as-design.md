# Pattern: Typography as Design

## Seen in

- **Vercel** — the patron saint of this pattern; massive H1, almost no decoration
- **Linear** — H1 weight + tracking does the work
- **Stripe** — typography hierarchy carries dense information without feeling busy

## The pattern

On premium B2B landing pages, **typography does 70% of the design work, decoration does ~10%, color does ~20%.**

The most modern, confident landing pages are not the ones with the most beautiful illustrations — they're the ones where the type itself is the visual identity. The reader's first impression is the H1, and the H1 carries the brand voice in its weight, tracking, size, and rhythm.

## Why it works

**Scalability.** Type-driven design works at any viewport. Illustrations break; type adapts.

**Performance.** Typography is text + a font file. Illustrations are images + complexity.

**Confidence signaling.** "We don't need illustration to sell this" reads as confident. "We need 3D shapes and a phone mockup at -15deg" reads as decoration covering for weak content.

**Accessibility.** Text-heavy designs are accessible by default. Illustration-heavy designs require extra alt-text discipline.

**Timeless.** A typography-driven design from 2018 still looks contemporary. A 2018 illustration-driven design looks dated. Type doesn't trend.

## Components of the pattern

### 1. A confident H1 size
- 56px+ on mobile
- 72–120px on desktop
- Tight tracking (-0.02 to -0.04em)
- Weight 500–600 (not 800; 800 is shouting)
- Line height 1.0–1.2

### 2. Weight contrast, not size contrast (for hierarchy)
- H1: weight 600, ~96px
- H2: weight 600, ~48px
- Body: weight 400, ~18px
- Caption: weight 400, ~14px, muted color

Notice the weight is consistent on display levels and consistent on body levels. The differentiator is size + color, not weight permutations. Don't mix weights 500/600/700 randomly.

### 3. Tracking discipline
- Display sizes: tight tracking (-0.02 to -0.04em). Looks modern.
- Body: neutral tracking (0).
- Caption / labels: sometimes slight positive tracking (0 to +0.02em) for legibility at small sizes.

Positive tracking on display sizes = editorial / serif feel. Use deliberately if that's the brand; avoid if going for modern-tech.

### 4. Constrained body width
Body paragraphs should have max-width that targets ~50–75 characters per line. Easier to read.

`max-w-prose` in Tailwind (`max-w-[65ch]`) is the default. For dense informational pages (like FAQ or pricing detail), narrower (~50ch); for hero body copy, narrower still (often ~45ch).

### 5. Section type hierarchy beyond H1/H2/H3
For long landing pages, design 5 type roles:
- **Display** (hero H1)
- **Title** (section H2)
- **Subtitle** (section sub, sometimes eyebrow)
- **Body** (paragraph)
- **Caption** (metadata, labels)

If everything is just H1/H2/body, the page feels like a Word doc. If there are 12 type sizes, the system is broken.

### 6. Strategic use of mono
Mono (monospace) fonts as accents for technical/specific content:
- Code samples (obviously)
- Version numbers, IDs, technical identifiers
- Feature labels in technical products
- "Pull quotes" or callouts where the mono signals "this is the precise thing"

Don't use mono for body text or headlines unless that's the brand. Mono is punctuation, not voice.

## Concrete typographic scales

For a premium B2B landing page targeting density 2 (Linear-spacious):

```css
@theme inline {
  --text-display-xl: 96px;   /* hero H1, desktop */
  --text-display-lg: 64px;   /* hero H1, tablet */
  --text-display-md: 48px;   /* hero H1, mobile / section H2 desktop */
  --text-display-sm: 36px;   /* section H2 mobile */
  --text-title: 24px;        /* card titles, sub-section headers */
  --text-subtitle: 20px;     /* hero sub-line */
  --text-body-lg: 18px;      /* body in hero / important paragraphs */
  --text-body: 16px;         /* default body */
  --text-caption: 14px;      /* metadata, labels */
}
```

For density 3 (Stripe), scale these down ~10%; for density 1 (Apple), scale up ~15%.

## Anti-patterns

- **Same-weight everywhere.** All weight 600, all weight 400 — flatness, no hierarchy.
- **Random weights.** H1 at 700, H2 at 500, H3 at 600, body at 400, caption at 500 — chaos.
- **Display size on body.** Using `font-display` family for body text — uncomfortable to read.
- **Body size on display.** Using `font-sans` body for an H1 — feels weak.
- **Color-only hierarchy.** Same size and weight, different colors — fails in monochrome and for users with color vision differences.
- **Three or more font families.** Sans + serif + mono is fine if each has a role. Adding a fourth display font is showing off.

## Test for whether typography is doing the work

Strip the page of:
- All colors (greyscale only)
- All images
- All illustrations
- All decorative elements

Does it still feel like the brand? Does the hierarchy still work? Can you still tell what's important?

If yes — typography is doing the work. If no — the page is leaning on decoration.

The best landings pass this test. Try it on Linear, Vercel, Stripe (mentally) and you'll see the structure intact even without color or images.

## When to deviate

- **Editorial / magazine brands.** Mix serif + sans, lean into asymmetric type compositions.
- **Brand IS the illustration.** A children's app, a creative tool — illustrations are core to the identity.
- **Specific design movement.** Brutalism, anti-design, swiss grid — these intentionally subvert "premium typography" conventions.

For default premium B2B work, this pattern is the right starting point.
