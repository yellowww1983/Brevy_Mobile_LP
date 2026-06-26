---
name: create-design-tokens
description: "Translates a design audit into globals.css semantic tokens that MAP TO Tailwind palette values. Components use semantic names (bg-background, text-foreground, bg-accent), tokens reference Tailwind colors (var(--color-zinc-50), var(--color-blue-600)). NEVER define raw OKLCH or hex — always reference palette per rules/tailwind-palette-discipline.md."
---

# Create Design Tokens

This skill produces a complete, working `src/app/globals.css` that:
1. Defines semantic tokens (`--color-background`, `--color-accent`, etc.)
2. References Tailwind palette values (`var(--color-zinc-50)`, `var(--color-blue-600)`)
3. NEVER uses raw hex/OKLCH/RGB for colors

Per `rules/tailwind-palette-discipline.md`: paleta jako source, semantic tokens jako interface.

## Inputs

- A design audit (from `analyze-design.md` or design-analyst agent)
- The existing `src/app/globals.css` (shadcn-generated)
- `.claude/references/tailwind-palette-reference.md` for color matching

## Procedure

### Step 1 — Read the existing globals.css

shadcn init created a baseline. Read it before changing anything.

### Step 2 — Map design colors to Tailwind palette

For every color in the audit, find the closest Tailwind palette match.

**Process for each color:**

1. Identify the color (from screenshot eyedropper, Figma extract, brand spec)
2. Convert to OKLCH if not already
3. Open `.claude/references/tailwind-palette-reference.md`
4. Use the hue index to pick the hue family
5. Use lightness (first OKLCH number) to pick the stop (50-950)
6. Confirm by comparing chroma values

Example mapping table:

```
DESIGN AUDIT                        →  TAILWIND PALETTE          →  USAGE
Background  oklch(1 0 0)            →  white                     →  --color-background (light)
Surface     oklch(0.97 0 0)         →  zinc-100                  →  --color-surface (light)
Foreground  oklch(0.15 0 0)         →  zinc-900                  →  --color-foreground (light)
Muted text  oklch(0.55 0 0)         →  zinc-500                  →  --color-foreground-muted
Border      oklch(0.92 0 0)         →  zinc-200                  →  --color-border
Accent      oklch(0.55 0.20 280)    →  indigo-500                →  --color-accent
Brand red   oklch(0.58 0.24 25)     →  red-600                   →  --color-destructive
Success     oklch(0.65 0.18 145)    →  emerald-500               →  --color-success
```

If a color is genuinely far from any palette value (ΔE > 10 perceptually), DO NOT add a custom color. Pick the closest acceptable match and document the substitution.

### Step 3 — Compose the new globals.css

Replace contents with the audit-driven version. Template:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* ============================================
   DESIGN TOKENS
   
   Semantic tokens reference Tailwind palette values.
   Components use semantic names (bg-background, text-foreground).
   NEVER define raw colors — only reference Tailwind palette per
   .claude/rules/tailwind-palette-discipline.md
   ============================================ */

:root {
  /* ---- Surfaces (light theme) ---- */
  --color-background: var(--color-white);
  --color-surface: var(--color-zinc-50);
  --color-surface-elevated: var(--color-zinc-100);

  /* ---- Text (light theme) ---- */
  --color-foreground: var(--color-zinc-900);
  --color-foreground-muted: var(--color-zinc-500);
  --color-foreground-subtle: var(--color-zinc-400);

  /* ---- Borders (light theme) ---- */
  --color-border: var(--color-zinc-200);
  --color-border-subtle: var(--color-zinc-100);

  /* ---- Accent (brand) ---- */
  /* CHOOSE ONE HUE — used for CTAs, links, focus rings, active states */
  --color-accent: var(--color-blue-600);              /* CHANGE per brand */
  --color-accent-foreground: var(--color-white);
  --color-accent-hover: var(--color-blue-700);
  --color-accent-subtle: var(--color-blue-50);
  
  /* ---- Semantic states ---- */
  --color-destructive: var(--color-red-600);
  --color-destructive-foreground: var(--color-white);
  --color-success: var(--color-emerald-600);
  --color-warning: var(--color-amber-500);
  
  /* ---- Focus ring (same hue as accent) ---- */
  --color-ring: var(--color-blue-500);

  /* ---- Radius ---- */
  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-full: 9999px;

  /* ---- Spacing (section rhythm) ---- */
  --space-section-sm: 4rem;
  --space-section-md: 6rem;
  --space-section-lg: 8rem;
  --space-section-xl: 10rem;

  /* ---- Container widths (grid system) ---- */
  /* See rules/grid-system.md for canonical canvas/content/gutter specs */
  --container-content-mobile: 358px;
  --container-content-tablet: 720px;
  --container-content-desktop: 1200px;
  --container-content: var(--container-content-mobile); /* active value, switches per media query below */

  /* ---- Gutters (canvas margin per breakpoint) ---- */
  --gutter-mobile: 16px;
  --gutter-tablet: 57px;
  --gutter-desktop: 120px;
  --gutter-active: var(--gutter-mobile);

  /* ---- Grid (column gaps) ---- */
  --grid-gap-mobile: 16px;
  --grid-gap-tablet: 24px;
  --grid-gap-desktop: 24px;
  --grid-gap-active: var(--grid-gap-mobile);
  --grid-cols-mobile: 4;
  --grid-cols-tablet: 8;
  --grid-cols-desktop: 12;

  /* ---- Typography ---- */
  --font-sans: var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif);
  --font-display: var(--font-display, var(--font-sans));
  --font-mono: var(--font-geist-mono, ui-monospace, monospace);

  --tracking-tight: -0.02em;
  --tracking-tighter: -0.03em;

  /* ---- Elevation ---- */
  --shadow-xs: 0 1px 2px 0 --alpha(var(--color-zinc-950) / 4%);
  --shadow-sm: 0 1px 3px 0 --alpha(var(--color-zinc-950) / 6%);
  --shadow-md: 0 4px 12px -2px --alpha(var(--color-zinc-950) / 8%);
  --shadow-lg: 0 12px 24px -6px --alpha(var(--color-zinc-950) / 10%);
  --shadow-xl: 0 24px 48px -12px --alpha(var(--color-zinc-950) / 15%);

  /* ---- Motion ---- */
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}

.dark {
  /* ---- Surfaces (dark theme) — invert through palette stops ---- */
  --color-background: var(--color-zinc-950);
  --color-surface: var(--color-zinc-900);
  --color-surface-elevated: var(--color-zinc-800);

  /* ---- Text (dark theme) ---- */
  --color-foreground: var(--color-zinc-50);
  --color-foreground-muted: var(--color-zinc-400);
  --color-foreground-subtle: var(--color-zinc-500);

  /* ---- Borders (dark theme) ---- */
  --color-border: var(--color-zinc-800);
  --color-border-subtle: var(--color-zinc-900);

  /* ---- Accent (lighter in dark mode for contrast) ---- */
  --color-accent: var(--color-blue-500);
  --color-accent-foreground: var(--color-zinc-950);
  --color-accent-hover: var(--color-blue-400);
  --color-accent-subtle: var(--color-blue-950);

  /* ---- States (slightly lighter in dark mode) ---- */
  --color-destructive: var(--color-red-500);
  --color-success: var(--color-emerald-500);
  --color-warning: var(--color-amber-400);
  
  --color-ring: var(--color-blue-400);
}

/* ============================================
   RESPONSIVE CONTAINER / GRID
   Switches active container width, gutter, and grid gap per breakpoint.
   Matches Tailwind v4 breakpoints (md: 768, lg: 1024).
   See rules/grid-system.md for the canonical specs.
   ============================================ */

@media (min-width: 768px) {
  :root {
    --container-content: var(--container-content-tablet);
    --gutter-active: var(--gutter-tablet);
    --grid-gap-active: var(--grid-gap-tablet);
  }
}

@media (min-width: 1024px) {
  :root {
    --container-content: var(--container-content-desktop);
    --gutter-active: var(--gutter-desktop);
    --grid-gap-active: var(--grid-gap-desktop);
  }
}

/* ============================================
   THEME MAPPING (Tailwind v4 inline)
   Maps tokens → Tailwind utility namespace.
   After this, `bg-background`, `text-foreground-muted`, etc. work automatically.
   ============================================ */

@theme inline {
  --color-background: var(--color-background);
  --color-surface: var(--color-surface);
  --color-surface-elevated: var(--color-surface-elevated);

  --color-foreground: var(--color-foreground);
  --color-foreground-muted: var(--color-foreground-muted);
  --color-foreground-subtle: var(--color-foreground-subtle);

  --color-border: var(--color-border);
  --color-border-subtle: var(--color-border-subtle);

  --color-accent: var(--color-accent);
  --color-accent-foreground: var(--color-accent-foreground);
  --color-accent-hover: var(--color-accent-hover);
  --color-accent-subtle: var(--color-accent-subtle);

  --color-destructive: var(--color-destructive);
  --color-destructive-foreground: var(--color-destructive-foreground);
  --color-success: var(--color-success);
  --color-warning: var(--color-warning);

  --color-ring: var(--color-ring);

  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);

  --font-sans: var(--font-sans);
  --font-display: var(--font-display);
  --font-mono: var(--font-mono);

  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);

  --spacing-section-sm: var(--space-section-sm);
  --spacing-section-md: var(--space-section-md);
  --spacing-section-lg: var(--space-section-lg);
  --spacing-section-xl: var(--space-section-xl);
}

/* ============================================
   BASE STYLES
   ============================================ */

* {
  border-color: var(--color-border);
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
  font-feature-settings: "rlig" 1, "calt" 1;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.text-display {
  font-family: var(--font-display);
  letter-spacing: var(--tracking-tighter);
  line-height: 1.05;
  font-weight: 600;
}

*:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Step 4 — Choose the accent hue family

The accent is the brand color. Pick ONE hue family from Tailwind palette:

| Brand vibe | Suggested hue family |
|---|---|
| Trustworthy, classic | `blue` |
| Modern tech / SaaS | `indigo`, `violet` |
| Premium / creative | `purple`, `fuchsia` |
| Energetic / playful | `orange`, `pink` |
| Natural / wellness | `emerald`, `teal` |
| Warm / luxurious | `amber`, `orange` |
| Bold / urgent | `red`, `rose` |

Once chosen, use the SAME hue family for all accent variants (subtle/base/hover) — just different stops. Never mix `--color-accent: var(--color-blue-600)` with `--color-accent-hover: var(--color-purple-700)`.

### Step 5 — Choose the neutral family

For text, surfaces, borders — pick ONE neutral family. They differ subtly:

| Neutral family | Feel | Common use |
|---|---|---|
| `zinc` | True neutral, modern | shadcn default, most projects |
| `slate` | Cool, slight blue cast | Tech/data brands |
| `gray` | Slightly cool | Generic |
| `neutral` | Pure gray | When you want zero color cast |
| `stone` | Warm, slight tan | Editorial, warm brands |
| `taupe` | Warmer | Premium / earthy |
| `mauve` | Cool warm, slight purple | Sophisticated |

Pick one and stick with it. Don't mix `slate` foregrounds with `stone` borders — looks inconsistent.

### Step 6 — Fonts via next/font

In `src/app/layout.tsx`:

```tsx
import { Geist, Geist_Mono } from "next/font/google"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
```

### Step 7 — Document substitutions

If the audit had any off-palette colors, document the substitutions at the top of `globals.css`:

```css
/* ============================================
   COLOR SUBSTITUTIONS (off-palette → palette)
   
   Original brand color #5e6ad2 (Linear-ish purple)
     → matched to indigo-400 (ΔE ≈ 2.1, perceptually identical)
   
   Original neutral #f5f5f4 (warm off-white)
     → matched to stone-100 (ΔE ≈ 1.8)
   
   See .claude/references/tailwind-palette-reference.md for matching procedure.
   ============================================ */
```

This documents the design history so future devs understand the choices.

### Step 8 — Verify

```bash
pnpm dev
```

Open browser. Inspect any element. Confirm:
- `var(--color-foreground)` resolves to one of Tailwind palette values
- Tailwind utilities like `bg-background`, `text-foreground-muted` work
- Toggling dark mode (via next-themes) swaps token values
- NO raw hex/OKLCH colors appear in globals.css (only palette references)

```bash
# Lint check: no raw colors in globals.css besides Tailwind palette
grep -E "(oklch|rgb|hsl|#[0-9a-fA-F]{3,8})" src/app/globals.css
```

If anything appears in this grep that ISN'T a comment, something violates the rule. Fix.

### Step 9 — Commit

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat(tokens): design system tokens via Tailwind palette per rule"
```

## Anti-patterns

- ❌ Defining `--color-brand: #ff6600` instead of mapping to `var(--color-orange-500)`
- ❌ Using `oklch(0.5 0.2 250)` in a semantic token (always reference palette)
- ❌ Adding "in-between" colors when palette stops feel too far apart (use the next nearest)
- ❌ Using different hue families for accent variants (`indigo-500` for accent, `blue-600` for hover — pick one family)
- ❌ Skipping the substitution documentation when off-palette colors were involved
- ❌ Touching shadcn's `globals.css` to add custom colors (they should map to palette too)

## When off-palette is genuinely unavoidable

Very rare. Only acceptable when:
1. Client has a legally trademarked brand color (Coca-Cola red, Tiffany blue) that genuinely doesn't match palette
2. You've tried 3+ palette matches and none are perceptually acceptable
3. The user has explicitly approved the deviation

Even then:
- Use a CSS custom property name that's CLEARLY non-palette: `--color-brand-trademarked: #FE2C55`
- Add a HUGE comment explaining why this exists
- Only use this single non-palette color for the one branded element
- Don't propagate the off-palette color to other tokens

This is genuinely the only loophole. Don't normalize it.
