# Pattern: Sticky CTA Band

A narrow strip fixed at top or bottom of viewport, appearing once the user scrolls past the hero's primary CTA. Contains short value prop + repeat of the primary CTA.

Also called: "sticky nav CTA", "floating action bar", "sticky bottom bar".

## When it helps

- **Long-form landing pages** — 3+ screens of content between hero and final CTA. Without sticky CTA, mid-page readers have no quick path to action.
- **High-intent primary action** — signup, purchase, demo request. NOT for low-intent (newsletter).
- **Mobile-first sites** — thumb reach to bottom CTA is ergonomic. Mobile users scroll one-handed.
- **Pages where the CTA is the whole point** — pricing, signup, checkout.

## When it hurts

- **Short landing pages** — adds noise without payoff. If page is 1-2 screens, no need.
- **Pages with heavy motion / scroll-driven animation** — conflicts visually, distracts from designed scroll experience.
- **When it covers important content on mobile** — most common failure mode. Sticky bar at bottom = bottom of every screen is occluded. Footer links, last paragraph, last form field — all blocked.
- **When it appears too soon** — before user formed intent. If sticky appears at scroll 200px, user hasn't decided yet, feels pushy.
- **When the page has multiple competing CTAs** — sticky must show the ONE most important; otherwise it's noise.

## Trigger logic

The sticky bar should appear when the user has clearly scrolled past the hero AND is engaged enough to make CTA visible useful.

**Good trigger**: hero is no longer in viewport (use IntersectionObserver on hero element).

**Bad triggers**:
- Fixed scroll distance (`scrollY > 800`) — breaks on different screen sizes
- Time-based (`after 5s`) — annoys fast readers, comes too late for slow ones
- After scroll up (smart, but feels intrusive — they're going back up FOR a reason)

## Implementation

```tsx
// components/sections/sticky-cta/index.tsx
"use client"

import { useEffect, useState } from "react"
import { Action } from "@/components/primitives"

interface StickyCtaProps {
  label: string
  href: string
  description?: string  // optional short value prop
}

export function StickyCta({ label, href, description }: StickyCtaProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('[data-section="hero"]')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background px-4 py-3"
      role="complementary"
      aria-label="Quick action"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        {description && (
          <span className="text-sm text-foreground-muted hidden sm:block">
            {description}
          </span>
        )}
        <Action variant="primary" href={href} className="ms-auto">
          {label}
        </Action>
      </div>
    </div>
  )
}
```

Notes:
- `data-section="hero"` attribute on the hero section — drives the observer
- `role="complementary"` — a11y, indicates this is secondary navigation
- `z-50` — above page content but below modals (which use `z-100` etc.)
- Mobile: hide description, show only CTA (sm:block)
- Desktop: show description + CTA

## Schema integration

If sticky-cta becomes a PRODUCT module, schema follows the pattern:

```ts
// sections/sticky-cta/schema.ts
import { z } from "zod"
import { ctaSchema } from "@/lib/schemas/shared"

export const stickyCtaSchema = z.object({
  cta: ctaSchema.describe("The action shown in the sticky bar"),
  description: z.string().max(80).optional().describe("Short value prop (hidden on mobile)"),
  // Could add: triggerSelector (default '[data-section=\"hero\"]'), position ('top' | 'bottom')
})
```

## Position decision

**Bottom** (default): more ergonomic on mobile, doesn't compete with nav, feels less aggressive.

**Top**: replaces or augments the nav. Works when nav has its own CTA already, or when the page has no traditional nav.

Most successful implementations: bottom.

## Spacing for content

When sticky-cta is on the page, the FINAL section needs extra bottom padding so its content isn't hidden behind the sticky bar:

```tsx
// page.tsx — last section
<Footer className="pb-section-xl" />  // extra space below content
```

Or use scroll padding to ensure links scroll above the sticky:
```css
:root {
  scroll-padding-bottom: 80px;  /* same as sticky bar height */
}
```

## Mobile considerations

- Sticky bar height: minimize. 56-64px max.
- One CTA only on mobile. No description.
- Don't add a close/dismiss button on first visit — pushy and rarely valuable
- IF you have a dismiss, persist via `localStorage` for that session only (not permanently)
- Avoid sticky bar on iOS Safari with address bar showing — interaction can feel cramped

## A11y considerations

- `role="complementary"` or `role="region"` with `aria-label`
- Focus styling: sticky-bar CTA must have visible focus ring
- Don't trap focus inside the sticky (user should be able to tab through normally)
- Screen reader: announce when sticky appears? Don't — too intrusive. Leave silent.

## Seen in

Common in:
- Pricing pages (CTA always 1 tap away)
- Long-form sales pages (info-marketing style)
- Mobile e-commerce product pages

Notably absent from:
- Linear, Vercel, Stripe — confident enough in their hero CTA + final CTA, no sticky needed
- Creative agency sites — would conflict with motion design

## Anti-patterns

- ❌ Sticky CTA appearing on every page including ones with no clear CTA goal
- ❌ Multiple sticky elements stacking (sticky nav + sticky CTA + cookie banner = chaos)
- ❌ Sticky CTA that animates in with bounce — distracting; subtle fade-in only
- ❌ Sticky CTA that hides relevant content on mobile (most common failure)
- ❌ Sticky CTA on pages < 2 screens long
- ❌ "Limited time: Click now!" urgency text in the sticky — manipulative

## Decision: should this page have sticky CTA?

Quick test:
- Page > 3 screens AND
- Has ONE clear primary action AND
- That action has high commitment value (signup, demo, buy) AND
- Page isn't motion-heavy

If all 4 yes → add sticky CTA.
If any no → skip.

## Cross-references

- `skills/section-library.md` (sticky-cta archetype)
- `agents/copy-strategist.md` (the value prop copy in the sticky)
- `rules/accessibility.md` (focus + ARIA)
- `references/patterns/social-proof-progression.md` (sticky bar is the "final CTA" stop in progression)
