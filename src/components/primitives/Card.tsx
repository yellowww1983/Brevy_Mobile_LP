import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type CardProps = {
  surface?: "default" | "soft" | "inverse"
  padding?: "md" | "lg"
  as?: "div" | "article" | "li"
  className?: string // position only, never padding or surface
  children: ReactNode
}

const surfaceMap = {
  default: "bg-background border border-border",
  soft: "bg-surface-soft border border-border-soft",
  inverse: "bg-surface-inverse text-foreground-inverse border border-border-inverse",
} as const

const padMap = {
  md: "p-6",
  lg: "p-8",
} as const

/** Surface primitive. Owns radius, border, padding. Feature/step/compare cards wrap it. */
export function Card({
  surface = "default",
  padding = "md",
  as: Tag = "div",
  className,
  children,
}: CardProps) {
  return (
    <Tag
      className={cn("rounded-lg", surfaceMap[surface], padMap[padding], className)}
    >
      {children}
    </Tag>
  )
}
