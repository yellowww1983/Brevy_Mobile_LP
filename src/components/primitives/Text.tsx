import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type TextProps = {
  variant?: "editorial" | "body" | "small" | "caption"
  tone?:
    | "default"
    | "muted"
    | "subtle"
    | "accent"
    | "inverse"
    | "inverse-muted"
  as?: "p" | "span" | "div" | "blockquote" | "figcaption" | "li"
  className?: string // max-width / position only, never font/size/leading
  children: ReactNode
}

const variantMap = {
  editorial: "text-editorial leading-snug",
  body: "text-body leading-body",
  small: "text-small leading-body",
  caption: "text-label tracking-label uppercase font-medium",
} as const

const toneMap = {
  default: "text-foreground",
  muted: "text-foreground-muted",
  subtle: "text-foreground-subtle",
  accent: "text-accent",
  inverse: "text-foreground-inverse",
  "inverse-muted": "text-foreground-inverse-muted",
} as const

/** Body copy and labels. Size/leading via `variant`, color via `tone`. */
export function Text({
  variant = "body",
  tone = "default",
  as: Tag = "p",
  className,
  children,
}: TextProps) {
  return (
    <Tag className={cn(variantMap[variant], toneMap[tone], className)}>
      {children}
    </Tag>
  )
}
