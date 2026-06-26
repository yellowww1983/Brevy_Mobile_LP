import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Stack, Heading, Text, Badge } from "@/components/primitives"

type SectionHeaderProps = {
  kicker?: string
  title: ReactNode
  subtitle?: string
  align?: "start" | "center"
  tone?: "default" | "inverse"
  level?: "h1" | "h2"
  as?: "h1" | "h2"
  /** Override the subhead measure (default is prose width). */
  subtitleClassName?: string
  /** Constrain / re-wrap the heading (e.g. to match a Figma line break). */
  titleClassName?: string
  /** Render the kicker as a sentence-case pill chip instead of an eyebrow. */
  chip?: boolean
}

/** Eyebrow + heading + subhead. The repeated head of nearly every section. */
export function SectionHeader({
  kicker,
  title,
  subtitle,
  align = "center",
  tone = "default",
  level = "h2",
  as = "h2",
  subtitleClassName,
  titleClassName,
  chip = false,
}: SectionHeaderProps) {
  const inverse = tone === "inverse"
  const centered = align === "center"

  return (
    <Stack
      size="sm"
      align={centered ? "center" : "start"}
      className={cn("max-w-2xl", centered && "mx-auto text-center")}
    >
      {kicker &&
        (chip ? (
          <Badge tone="chip">{kicker}</Badge>
        ) : (
          <Badge
            tone={inverse ? "soft" : "chip"}
            className="uppercase tracking-label"
          >
            {kicker}
          </Badge>
        ))}
      <Heading
        level={level}
        as={as}
        tone={inverse ? "inverse" : "default"}
        className={titleClassName}
      >
        {title}
      </Heading>
      {subtitle && (
        <Text
          variant="editorial"
          tone={inverse ? "inverse-muted" : "muted"}
          className={cn("max-w-prose", subtitleClassName)}
        >
          {subtitle}
        </Text>
      )}
    </Stack>
  )
}
