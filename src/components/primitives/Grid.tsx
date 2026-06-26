import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type GridProps = {
  cols?: 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
  align?: "start" | "center" | "stretch"
  as?: "div" | "ul"
  className?: string // position only, never gap or grid-cols
  children: ReactNode
}

const colsMap = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
} as const

const gapMap = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-10",
} as const

const alignMap = {
  start: "items-start",
  center: "items-center",
  stretch: "items-stretch",
} as const

/** Responsive grid. Owns columns and gap. No gap or grid-cols className. */
export function Grid({
  cols = 3,
  gap = "md",
  align,
  as: Tag = "div",
  className,
  children,
}: GridProps) {
  return (
    <Tag
      className={cn(
        "grid",
        colsMap[cols],
        gapMap[gap],
        align && alignMap[align],
        className,
      )}
    >
      {children}
    </Tag>
  )
}
