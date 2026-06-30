import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type HeadingProps = {
  level: "display" | "h1" | "h2" | "h3"
  as?: "h1" | "h2" | "h3" | "h4" | "p"
  tone?: "default" | "accent" | "inverse"
  className?: string // max-width / position only, never font-size
  children: ReactNode
}

// Visual size (level) is decoupled from semantic tag (as). Leading is set per
// level from the Figma type scale (tokens) — font-display no longer dictates it.
const levelMap = {
  display: "text-display leading-[var(--leading-hd)]",
  h1: "text-h1 leading-[var(--leading-h1)]",
  h2: "text-h2 leading-[var(--leading-h2)]",
  h3: "text-h3 leading-[var(--leading-h3)]",
} as const

const toneMap = {
  default: "text-foreground",
  accent: "text-accent",
  inverse: "text-foreground-inverse",
} as const

/** Serif display headings (Hedvig). Size via `level`, tag via `as`. */
export function Heading({
  level,
  as: Tag = "h2",
  tone = "default",
  className,
  children,
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display text-balance",
        levelMap[level],
        toneMap[tone],
        className,
      )}
    >
      {children}
    </Tag>
  )
}
