---
name: build-primitives
description: "KROK ZERO przed jakąkolwiek sekcją. Buduje zamknięte semantic primitives (Section, Stack, Text, Heading, Action, Media) które są JEDYNYM językiem budowania UI. Uruchom PO tokenach, PRZED pierwszą sekcją. Bez tego sekcje będą utility soup."
---

# Build Primitives — fundament systemu

To jest krok który decyduje czy template będzie senior-system czy AI-cleanup. Buduj te primitives ZANIM napiszesz pierwszą sekcję. Czytaj `rules/architecture.md` najpierw.

## Co budujesz (w tej kolejności)

```
1. Section  — sekcja z rytmem (hero/content/tight), zero raw padding
2. Stack    — flex-col z gap przez size
3. Text     — body copy przez variant + tone
4. Heading  — nagłówki przez level
5. Action   — link/button przez variant (CVA)
6. Media    — obraz z aspect + fill
```

Wszystkie ZAMKNIĘTE — nie przyjmują className dla wymiaru który kontrolują.

## Wymagane tokeny (musisz mieć z create-design-tokens)

```css
@theme inline {
  /* rytm sekcji — Section konsumuje */
  --container-max: 80rem;
  /* skala tekstu — Text/Heading konsumują (generują utilities) */
  --text-display: clamp(...); --text-h1: ...; --text-body: ...;
  /* named tones — Text konsumuje */
  --color-foreground-muted:  color-mix(in oklch, var(--color-foreground) 60%, transparent);
  --color-foreground-subtle: color-mix(in oklch, var(--color-foreground) 40%, transparent);
}

@layer utilities {
  /* rytm jako utility — Section mapuje rhythm→te klasy */
  .section-pad { padding-inline: 2rem; }
  @media(min-width:768px){ .section-pad{ padding-inline:4rem } }
  @media(min-width:1280px){ .section-pad{ padding-inline:6rem } }
  .section-pad-y       { padding-block: 6rem; }
  .section-pad-y-hero  { padding-block: 8rem; }
  .section-pad-y-tight { padding-block: 3rem; }
}
```

## Section

```tsx
// src/components/primitives/Section.tsx
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type SectionProps = {
  rhythm?: "hero" | "content" | "tight"
  width?: "full" | "container"
  as?: "section" | "footer" | "header" | "main"
  id?: string
  children: ReactNode
}

const rhythmMap = {
  hero:    "section-pad section-pad-y-hero",
  content: "section-pad section-pad-y",
  tight:   "section-pad section-pad-y-tight",
} as const

const widthMap = {
  full:      "w-full",
  container: "mx-auto w-full max-w-[var(--container-max)]",
} as const

export function Section({ rhythm = "content", width = "container", as: Tag = "section", id, children }: SectionProps) {
  return <Tag id={id} className={cn(rhythmMap[rhythm], widthMap[width])}>{children}</Tag>
}
```

Brak `className` prop. To jest celowe — sekcja nie może mieć arbitralnego paddingu.

## Stack

```tsx
// src/components/primitives/Stack.tsx
type StackProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  direction?: "col" | "row"
  align?: "start" | "center" | "end"
  justify?: "start" | "center" | "between"
  className?: string  // TYLKO pozycja (col-span, self-*), NIE gap
  children: ReactNode
}

const gapMap = { xs:"gap-2", sm:"gap-4", md:"gap-6", lg:"gap-10", xl:"gap-16" } as const

export function Stack({ size="md", direction="col", align, justify, className, children }: StackProps) {
  return (
    <div className={cn(
      "flex",
      direction === "col" ? "flex-col" : "flex-row",
      gapMap[size],
      align && `items-${align}`,
      justify && `justify-${justify}`,
      className,
    )}>{children}</div>
  )
}
```

## Text

```tsx
// src/components/primitives/Text.tsx
type TextProps = {
  variant?: "editorial" | "body" | "small" | "caption"
  serif?: boolean
  italic?: boolean
  tone?: "default" | "muted" | "subtle"
  as?: "p" | "span" | "div" | "blockquote" | "figcaption"
  className?: string  // TYLKO max-width / pozycja, NIE font/leading/size
  children: ReactNode
}

const variantMap = {
  editorial: "text-editorial leading-snug tracking-[-0.015em]",
  body:      "text-body leading-body",
  small:     "text-small leading-relaxed",
  caption:   "text-label tracking-label uppercase",
} as const

const toneMap = {
  default: "text-foreground",
  muted:   "text-foreground-muted",
  subtle:  "text-foreground-subtle",
} as const

export function Text({ variant="body", serif, italic, tone="default", as:Tag="p", className, children }: TextProps) {
  return (
    <Tag className={cn(
      variantMap[variant],
      toneMap[tone],
      serif && "font-serif font-light",
      italic && "italic",
      className,
    )}>{children}</Tag>
  )
}
```

## Heading

```tsx
// src/components/primitives/Heading.tsx
// level = rozmiar wizualny, as = tag semantyczny — ROZDZIELONE
type HeadingProps = {
  level: "display" | "h1" | "h2" | "h3"
  as?: "h1" | "h2" | "h3" | "h4" | "p"
  serif?: boolean
  className?: string  // TYLKO max-width / pozycja
  children: ReactNode
}

const levelMap = {
  display: "text-display leading-display tracking-[-0.035em]",
  h1:      "text-h1 leading-tight tracking-[-0.03em]",
  h2:      "text-h2 leading-tight tracking-[-0.025em]",
  h3:      "text-h3 leading-tight tracking-[-0.02em]",
} as const

export function Heading({ level, as:Tag="h2", serif=true, className, children }: HeadingProps) {
  return (
    <Tag className={cn("text-balance", levelMap[level], serif ? "font-serif font-light" : "font-sans", className)}>
      {children}
    </Tag>
  )
}
```

## Action (CVA — patrz build-component dla pełnego wzorca)

Link/button z wariantami primary/ghost/underline. Jedyny sposób na CTA.
Używa `ease-cinema` token, nie inline cubic-bezier.

## Media

Obraz z aspect-ratio i fill. Owija next/image. Jedyny sposób na obraz w sekcji.

## Po zbudowaniu — test zamknięcia

Dla każdego primitive zadaj pytanie:
- Section: czy da się napisać `<Section className="py-12">`? → NIE (brak className) ✓
- Text: czy da się `<Text className="text-2xl">`? → technicznie tak, ale to leak; variant kontroluje rozmiar
- Czy zmiana rytmu wszystkich sekcji = 1 miejsce (rhythmMap)? → TAK ✓

Dopiero gdy te 6 primitives istnieje i przechodzą test — przechodzisz do build-section.

## Barrel export

```tsx
// src/components/primitives/index.ts
export { Section } from "./Section"
export { Stack } from "./Stack"
export { Text } from "./Text"
export { Heading } from "./Heading"
export { Action } from "./Action"
export { Media } from "./Media"
```

Sekcje importują `from "@/components/primitives"` — jeden punkt wejścia.
