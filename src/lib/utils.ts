import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge our custom text-size tokens so they group as
// font-size, not color. Without this, `text-body` (size) and
// `text-foreground-inverse-muted` (color) collide and the color is dropped.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "editorial",
            "body",
            "small",
            "label",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Read a numeric CSS custom property off :root, falling back when it's unset
 * or unparseable. `parseFloat` handles both integer (ms) and float tokens.
 * Client-only — call inside an effect, never at import time (touches
 * `document`).
 */
export function readCssVar(token: string, fallback: number): number {
  return (
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(token),
    ) || fallback
  )
}
