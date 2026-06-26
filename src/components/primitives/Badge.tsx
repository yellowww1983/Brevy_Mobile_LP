import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type BadgeProps = {
  tone?: "default" | "accent" | "soft" | "inverse" | "chip"
  count?: string // renders an inner olive count pill (Figma chip pattern)
  className?: string // position only
  children: ReactNode
}

const toneMap = {
  default: "bg-surface text-foreground-muted border border-border px-3 py-1",
  accent: "bg-accent text-accent-foreground px-3 py-1",
  soft: "bg-accent-subtle text-accent px-3 py-1",
  inverse: "bg-border-inverse text-foreground-inverse px-3 py-1",
  // Figma hero chip: glass face, 14px regular emerald text. Height 24px
  // (px-8 / py-4 / 16px line), 4px gap, inner olive count pill.
  chip: "chip-glass gap-1 px-2 py-1 text-small font-normal leading-4 text-accent-deep",
} as const

/**
 * Pill label. `tone="chip"` with a `count` reproduces the Figma eyebrow:
 * a glass pill wrapping an inner olive count pill plus the emerald label.
 * `beam` orbits a subtle accent arc around the border.
 */
export function Badge({
  tone = "default",
  count,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        toneMap[tone],
        className,
      )}
    >
      {count && (
        <span className="inline-flex h-4 items-center rounded-full bg-surface-olive px-1 text-accent-deep">
          {count}
        </span>
      )}
      {children}
    </span>
  )
}
