---
name: build-section
description: "Build a reusable landing-page section (Hero, FeatureGrid, LogoCloud, CTA, Footer, etc.). Sections compose primitives. They're the unit of landing-page composition. Use AFTER tokens and necessary primitives exist."
---

# Build Section

A section is a self-contained, full-width block of the landing page. It's the unit a non-engineer would point at and say "the hero" or "the pricing table".

## Section taxonomy

Common landing-page sections (your project will subset these):

| Section | Job |
|---|---|
| Hero | Above-fold value proposition + primary CTA |
| LogoCloud | Social proof: "trusted by these companies" |
| FeatureGrid | 3–6 features in a grid, each with icon/title/description |
| FeatureSplit | Alternating image-left/text-right for 2–4 features |
| Stats | Big numbers as proof points |
| Testimonials | Customer quotes (single, grid, or carousel) |
| Pricing | Plan cards with CTAs |
| FAQ | Accordion or grid of common questions |
| CTA | Mid-page or end-page conversion push |
| Footer | Final navigation + legal |

## Procedure

### Step 1 — Confirm the section spec

Before writing, you should have answered (from the design or from the user):
- What's the section's job? (what does the visitor do/feel/learn?)
- What primitives does it use? (Button, Card, Badge, SectionHeader, Container)
- What props does it expose? (title is almost always a prop; structure usually isn't)
- How does it behave at 375px? Is it a 1-col stack, or does it keep some structure?

### Step 1.5 — Logo placeholder pre-flight (mandatory if section has brand logo)

If this section includes ANY brand logo placement (nav logo, footer logo, logo cloud row, testimonial attribution, partner section), STOP before writing code. Verify (logo discipline):

1. Check if logoipsum SVG files exist:
   ```bash
   ls public/logos/placeholders/logoipsum-*.svg
   ```

2. If files exist → note which one(s) this section uses, reference directly via `<Image src="/logos/placeholders/logoipsum-X.svg" />`

3. If files do NOT exist → BLOCK. Surface to user:

> "Section `<name>` includes a logo at [position]. This needs a logoipsum.com SVG file. Three options:
> 1. Tell me which logoipsum.com number to use (e.g. `127`) — I'll fetch via WebFetch and save it
> 2. Download from logoipsum.com yourself and drop into `public/logos/placeholders/`
> 3. The real client logo exists — drop into `public/logos/client/` instead
>
> Which?"

4. Do NOT proceed with ANY of:
   - Inline SVG of a fabricated logo mark
   - Text-only placeholder like `<span>LOGO</span>` or any made-up brand name like "Stratus" / "Acme" / "Lumen"
   - Emoji as logo
   - A brand name pulled from a reference site you saw earlier

This pre-flight check is non-negotiable. The cost of asking is 30 seconds. The cost of inventing a brand is the user spotting "stratus" in their mockup and questioning everything else you generated.

### Step 2 — Anatomy template

Most sections follow this anatomy:

```
<section>                          ← semantic root, owns vertical padding
  <Container>                       ← max-width + horizontal padding
    <SectionHeader>                 ← eyebrow + title + description (optional)
    <main content>                  ← grid, list, split, etc.
    <optional CTA>                  ← bottom CTA if relevant
  </Container>
</section>
```

If your project doesn't have `<Container>` and `<SectionHeader>` yet, build them now via `build-component.md`.

### Step 3 — Implement using modular folder structure + primitives

Every section lives in its own folder. Section files compose primitives ONLY — never raw HTML, never section-specific names.

```
src/components/sections/hero/
├── index.tsx           # main export
├── hero-split.tsx      # variant
├── types.ts            # if types > 30 lines
├── content.ts          # example content (FAST) or schema (PRODUCTION)
├── README.md           # always
└── figma.ts            # if Figma counterpart exists
```

**Critical rule (from `rules/architecture.md`):**

Section files import ONLY from `@/components/primitives`. No raw HTML (`<div>`, `<button>`, `<img>`, `<h1>` etc.). Use:

- `<Section rhythm width>` instead of `<section>` — owns rhythm, NO padding className
- `<Stack>` / `<Flex>` / `<Grid>` instead of `<div className="flex...">`
- `<Card>` / `<Panel>` / `<Item>` for surfaces
- `<Heading level={N}>` instead of `<h1>` / `<h2>` etc.
- `<Text>` instead of `<p>`
- `<Action>` instead of `<button>` / `<a>`
- `<Media>` instead of `<img>` / `<Image>`
- `<Eyebrow>` / `<Caption>` for labels

Template for `index.tsx` of a single-variant section (e.g. Footer):

```tsx
// src/components/sections/footer/index.tsx
import type { ComponentProps } from "react"
import {
  Section,
  Stack,
  Flex,
  Grid,
  Heading,
  Text,
  Action,
  Caption,
} from "@/components/primitives"

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterProps extends ComponentProps<"footer"> {
  columns: FooterColumn[]
  copyright?: string
}

export function Footer({ columns, copyright }: FooterProps) {
  return (
    <Section as="footer" rhythm="tight" width="container">
      <Grid cols={columns.length} gap="lg">
        {columns.map((column) => (
          <Stack key={column.title} gap="sm">
            <Heading level={4}>{column.title}</Heading>
            <Stack gap="xs">
              {column.links.map((link) => (
                <Action key={link.href} variant="ghost" href={link.href}>
                  {link.label}
                </Action>
              ))}
            </Stack>
          </Stack>
        ))}
      </Grid>
      {copyright && <Caption className="mt-section-sm">{copyright}</Caption>}
    </Section>
  )
}
```

Notice:
- No `<div>` anywhere
- No `<h4>` — `<Heading level={4}>`
- No `<a>` — `<Action variant="ghost" href>`
- No `<p>` — `<Caption>`
- Section file is ~25 lines of composition

Template for multi-variant section (e.g. Hero) — `index.tsx` exports variants:

```tsx
// src/components/sections/hero/index.tsx
export { HeroSplit as Hero } from "./hero-split"
export { HeroSplit } from "./hero-split"
export { HeroCentered } from "./hero-centered"
export { HeroTypeOnly } from "./hero-type-only"
export type { HeroProps, HeroSplitProps, HeroCenteredProps, HeroTypeOnlyProps } from "./types"
```

And `hero-split.tsx` composes primitives:

```tsx
// src/components/sections/hero/hero-split.tsx
import type { ComponentProps, ReactNode } from "react"
import {
  Section,
  Stack,
  Flex,
  Grid,
  Heading,
  Text,
  Action,
  Media,
} from "@/components/primitives"

export interface HeroSplitProps extends ComponentProps<"section"> {
  title: string
  description?: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  visual: ReactNode
}

export function HeroSplit({
  title,
  description,
  primaryCta,
  secondaryCta,
  visual,
}: HeroSplitProps) {
  return (
    <Section rhythm="content" width="container">
      <Grid cols={2} gap="xl" align="center">
        <Stack gap="lg">
          <Heading level={1}>{title}</Heading>
          {description && (
            <Text size="lg" color="muted">{description}</Text>
          )}
          <Flex gap="sm">
            <Action variant="primary" href={primaryCta.href}>
              {primaryCta.label}
            </Action>
            {secondaryCta && (
              <Action variant="secondary" href={secondaryCta.href}>
                {secondaryCta.label}
              </Action>
            )}
          </Flex>
        </Stack>
        {visual}
      </Grid>
    </Section>
  )
}
```

Section file is pure composition. Anything in this section can be moved to a different section because it's all generic primitives.

Add the README.md from `rules/modular-folder-structure.md` template.

### Step 4 — Wire data, don't hardcode

Sections take their content via props. The page composes them:

```tsx
// src/app/page.tsx
import { FeatureGrid } from "@/components/sections/feature-grid"
import { Zap, Lock, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <FeatureGrid
        eyebrow="Features"
        title="Everything you need to ship"
        description="Designed to fit how your team actually works."
        features={[
          {
            icon: <Zap className="size-5" />,
            title: "Real-time sync",
            description: "Changes appear instantly across all clients.",
          },
          {
            icon: <Lock className="size-5" />,
            title: "End-to-end encrypted",
            description: "Your data is encrypted at rest and in transit.",
          },
          {
            icon: <BarChart3 className="size-5" />,
            title: "Detailed analytics",
            description: "Track every metric that matters to your team.",
          },
        ]}
      />
    </main>
  )
}
```

If the page needs CMS content later, swap the inline data for a fetch call. The section stays unchanged.

### Step 5 — Server Component by default

Sections are static unless they need interactivity. Don't add `"use client"` to a `<FeatureGrid>`. Add it only when:
- Carousel with state
- Animated scroll-trigger
- Form with state
- Anything reading `useState`, `useEffect`, refs, browser APIs

### Step 6 — Verify

Same as build-component:
- `pnpm typecheck`
- `pnpm lint`
- Visual check at 375/768/1280/1920
- Keyboard navigation across all interactive elements
- Run `pnpm test:a11y` (or add a section-specific a11y test to `tests/a11y/`)

### Step 7 — Add a section-level a11y test

`tests/a11y/sections.spec.ts`:
```ts
import { test } from "@playwright/test"
import { scanA11y } from "../utils/a11y"

test("@a11y feature-grid section has no violations", async ({ page }, testInfo) => {
  await page.goto("/")
  await scanA11y(page, testInfo, "[data-slot='feature-grid']")
})
```

The `data-slot` attribute on the section root makes scoped scans easy.

## Patterns to remember

- **Mobile-first.** Default classes are mobile. `md:`, `lg:` add desktop variants.
- **Vertical rhythm via tokens.** `py-section-md` not `py-24`.
- **Don't reach into children's spacing from the section.** If a `<FeatureCard>` has wrong padding, fix it in `<FeatureCard>` — don't override from `<FeatureGrid>`.
- **Headings stay in order.** Section title is `<h2>` (page title is `<h1>`). Inside a feature card, the feature title is `<h3>`.

## Common mistakes

- ❌ `<div className="py-24">` instead of `<section className="py-section-md">`
- ❌ Hardcoded feature data inside the section component (couples content to structure)
- ❌ `"use client"` on a static section (kills server-rendering benefits)
- ❌ One giant `<HomePage>` component with every section inlined (decompose into sections, compose in page)
- ❌ Skipping mobile verification because "I'll fix it later" (you won't; fix at build time)
