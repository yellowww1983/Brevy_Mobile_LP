import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Text } from "@/components/primitives"

type StepCardProps = {
  step: string
  title: string
  description: string
  className?: string
  /** The mockup visual shown in the card's tray. */
  children: ReactNode
}

/**
 * Onboarding step card: a white header (step label + title + copy) over a
 * beige→white "tray" that holds a small product mockup. Equal height across
 * the row so the trays line up.
 */
export function StepCard({
  step,
  title,
  description,
  className,
  children,
}: StepCardProps) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[30.5rem] flex-col overflow-hidden rounded-2xl border border-divider bg-background shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col gap-2 px-6 pb-6 pt-6">
        <Text as="span" variant="small" tone="accent" className="uppercase">
          {step}
        </Text>
        <h3 className="text-editorial font-semibold leading-snug text-foreground-muted">
          {title}
        </h3>
        <Text variant="body" tone="muted">
          {description}
        </Text>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-4 bg-gradient-to-b from-surface to-background p-6">
        {children}
      </div>
    </div>
  )
}
