import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionProps = {
  rhythm?: "hero" | "content" | "tight"
  width?: "full" | "container"
  surface?:
    | "default"
    | "soft"
    | "warm"
    | "inverse"
    | "gradient"
    | "gradient-warm"
  as?: "section" | "footer" | "header" | "main" | "div"
  id?: string
  className?: string
  children: ReactNode
}

const padMap = {
  hero: "section-pad-hero",
  content: "section-pad-content",
  tight: "section-pad-tight",
} as const

const surfaceMap = {
  default: "bg-background text-foreground",
  soft: "bg-surface-soft text-foreground",
  warm: "bg-surface text-foreground",
  inverse: "bg-surface-inverse text-foreground-inverse",
  gradient: "bg-gradient-to-b from-surface-olive to-background text-foreground",
  "gradient-warm":
    "bg-gradient-to-b from-surface to-background text-foreground",
} as const

/**
 * Full-bleed band that owns vertical rhythm and surface. The inner
 * wrapper owns max-width and gutter. There is no padding escape hatch:
 * pick a rhythm, pick a surface. `className` is for the band only
 * (e.g. scroll-margin), never for spacing.
 */
export function Section({
  rhythm = "content",
  width = "container",
  surface = "default",
  as: Tag = "section",
  id,
  className,
  children,
}: SectionProps) {
  return (
    <Tag id={id} className={cn(padMap[rhythm], surfaceMap[surface], className)}>
      <div
        className={cn(
          "section-gutter",
          width === "container"
            ? "mx-auto w-full max-w-[var(--container-max)]"
            : "w-full",
        )}
      >
        {children}
      </div>
    </Tag>
  )
}
