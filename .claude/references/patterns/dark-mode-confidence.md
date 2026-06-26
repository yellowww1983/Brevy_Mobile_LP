# Pattern: Dark Mode Confidence

Dark mode is not a theme switch. It's a design decision. A site designed light-first and "dark-moded" by inverting colors usually looks worse in dark mode. A site designed dark-first with confidence looks dramatically better.

## The principle

Two distinct philosophies:

**Light-first with dark-mode toggle**: dark mode is an accessibility/preference accommodation. Light is the canonical experience. Both modes work, but light is where design decisions were made.

**Dark-first**: the brand IS dark. Light mode is the accommodation (if it exists at all). Design decisions made in dark; light may not even be offered.

Confusion happens when teams say "we support dark mode" but mean "we toggle colors." That's the worst of both worlds.

## When dark mode is appropriate

- Product is developer-facing or technical (code editors, terminals, dev tools)
- Brand identity is built around precision, sophistication, exclusivity
- Content is dense and dark reduces eye strain for long sessions
- Team has design capacity for TWO color systems (not just inversion)

## When dark mode is a trap

- It's done because "it looks cool" or competitors do it
- Light mode is an afterthought
- Color system isn't designed for both modes independently
- Team doesn't have capacity to maintain two systems

If you ship dark mode as an inversion of light mode, you have two mediocre experiences instead of one great one.

## When to recommend dark-first

Recommend dark-first to clients when:
- Developer tools, CLI products, code editors, terminals
- Security / infosec products (darkness = seriousness, trust)
- Creative tools (dark canvas lets the work stand out)
- Data-heavy dashboards or analytics products
- Brand has black/dark identity baked in (think Vercel, Linear)

Do NOT recommend dark-first when:
- Consumer-facing (health, food, lifestyle, family)
- Finance / banking / insurance (light = trust + legibility)
- Any product where primary user is NOT a technical professional

## How to do dark mode correctly

The token architecture supports it. Apply correctly:

```css
/* globals.css */
:root {
  --color-background: var(--color-zinc-50);
  --color-foreground: var(--color-zinc-900);
  --color-accent: var(--color-blue-600);
  --color-border: var(--color-zinc-200);
  --color-surface: var(--color-zinc-100);
}

.dark {
  --color-background: var(--color-zinc-950);
  --color-foreground: var(--color-zinc-50);
  --color-accent: var(--color-blue-400);  /* SHIFTED LIGHTER */
  --color-border: var(--color-zinc-800);
  --color-surface: var(--color-zinc-900);
}
```

**Critical**: accents shift LIGHTER in dark mode. blue-600 on white has good contrast; blue-600 on black does not. blue-400 on black works better.

This is NOT automatic. Must be explicitly defined per token. Most "dark mode broken" issues come from forgetting this.

## Common breakages in dark mode

### 1. Borders disappear

❌ `border-zinc-200` directly in components — looks fine in light, vanishes in dark
✅ `border-border` — semantic token, defined per mode

### 2. Shadows break

Shadows on dark backgrounds barely show. Either:
- Use lighter shadows in dark mode (`shadow-zinc-100/20`)
- Drop shadows entirely in dark mode (use borders instead)
- Use `box-shadow: inset` for inverted depth

### 3. Images with white backgrounds

Customer-provided logos with white backgrounds look terrible on dark bg. Solutions:
- Request SVG with transparent background
- Use `mix-blend-mode: multiply` for non-transparent images (works for some)
- Maintain dark-mode-specific image variants

### 4. Form inputs

shadcn defaults handle this, but custom inputs often forget. `bg-input` (token), not `bg-white`.

### 5. Loading skeletons

`bg-zinc-100` in light = visible. In dark = invisible (matches background). Use `bg-surface` and adjust to a slightly lighter surface in dark.

### 6. Accent on accent

Buttons with accent background, accent-foreground text. Contrast ratios change between modes. ALWAYS run `skills/audit-brand-customization.md` after enabling dark mode.

## The "dark mode toggle" question

If the brand is dark-first: no toggle. Site is dark, period.

If supporting both:
- Default to `prefers-color-scheme` (respect user OS preference)
- Provide toggle for explicit override
- Persist choice in `localStorage`
- Use `next-themes` package — handles SSR + hydration correctly

```tsx
"use client"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  )
}
```

Root layout needs `suppressHydrationWarning` on `<html>` and the `ThemeProvider`. See `next-themes` docs.

## Testing dark mode

- View every section in dark mode (not just spot-check)
- Run `skills/audit-brand-customization.md` after enabling
- Check contrast: dark mode often has DIFFERENT contrast issues than light
- Check borders: lots of "where did this card go?" in dark
- Check images: any white-background images visible?
- Check focus rings: visible against dark background?

## Seen in

- **Linear** — dark-first, never toggles to light, total confidence
- **Vercel** — dark-default, both modes, both well-designed
- **Stripe** — light-first, no dark mode (consumer trust)

The pattern: companies that ARE the brand commit to dark. Companies whose users vary support both. Companies serving non-technical users skip dark.

## Anti-patterns

- ❌ Dark mode as last-minute toggle (poorly designed, breaks accessibility)
- ❌ "Auto" without testing both modes (your "auto" might serve broken UX 50% of the time)
- ❌ Forgetting accent shift (accents too dark for dark backgrounds)
- ❌ Using `dark:` Tailwind variants directly in components instead of semantic tokens (every component re-implements dark logic)
- ❌ Skipping dark-mode contrast audit (different math than light mode)

## Cross-references

- `rules/tailwind-palette-discipline.md` (token discipline applies to both modes)
- `skills/audit-brand-customization.md` (run after enabling dark)
- `rules/accessibility.md` (contrast standards in both modes)
