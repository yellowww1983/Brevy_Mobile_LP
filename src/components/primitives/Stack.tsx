import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type StackProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  direction?: "col" | "row"
  align?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "between" | "end"
  wrap?: boolean
  as?: "div" | "ul" | "ol" | "li"
  className?: string // position only (self-*, col-span), never gap
  children: ReactNode
}

const gapMap = {
  xs: "gap-2",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-10",
  xl: "gap-16",
} as const

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
} as const

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  between: "justify-between",
  end: "justify-end",
} as const

/** Flex container. Owns gap through `size` (both axes). No gap className. */
export function Stack({
  size = "md",
  direction = "col",
  align,
  justify,
  wrap,
  as: Tag = "div",
  className,
  children,
}: StackProps) {
  return (
    <Tag
      className={cn(
        "flex",
        direction === "col" ? "flex-col" : "flex-row",
        gapMap[size],
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && "flex-wrap",
        className,
      )}
    >
      {children}
    </Tag>
  )
}
