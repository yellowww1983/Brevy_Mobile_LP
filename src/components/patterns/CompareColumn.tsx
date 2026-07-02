"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Text } from "@/components/primitives"
import { Icon } from "@/lib/icons"

const Check = Icon.check
const Cross = Icon.cross

type CompareColumnProps = {
  label: string
  heading: string
  tone: "negative" | "positive"
  items: readonly string[]
  className?: string
  /** Index of the highlighted row (positive/interactive column only). */
  activeIndex?: number
  /** Selecting a row. Presence of this makes the rows interactive buttons. */
  onSelect?: (index: number) => void
  /** Run the progress bar on the active row (off for reduced motion). */
  animateProgress?: boolean
  /** Auto-advance duration in ms, drives the progress bar. */
  cycleMs?: number
  /** Fired when the active row's progress bar fills. */
  onCycleComplete?: () => void
}

/**
 * One side of the before/with-Brevy comparison: a colored label, a heading,
 * and a list of rows (gradient chip + glyph + copy). `negative` is static and
 * coral (the cost of doing it yourself); `positive` is olive and, when given
 * `onSelect`, interactive — the active row tints and runs a progress bar that
 * auto-advances to the next.
 */
export function CompareColumn({
  label,
  heading,
  tone,
  items,
  className,
  activeIndex,
  onSelect,
  animateProgress = false,
  cycleMs = 4500,
  onCycleComplete,
}: CompareColumnProps) {
  const positive = tone === "positive"
  const interactive = onSelect !== undefined
  const Glyph = positive ? Check : Cross

  return (
    <div className={cn("flex flex-col gap-12 py-16", className)}>
      <div className="flex flex-col gap-2 px-6">
        <Text
          as="span"
          variant="small"
          className={cn("uppercase", positive ? "text-accent" : "text-negative")}
        >
          {label}
        </Text>
        <Text as="h3" variant="cardHeading" tone="muted">
          {heading}
        </Text>
      </div>

      <ul className="flex flex-col">
        {items.map((text, index) => {
          const active = interactive && activeIndex === index
          const rowClass = cn(
            // min-h keeps every row the height of a two-line row, so a
            // one-line row doesn't shrink and break the before/with alignment.
            "relative flex min-h-[5.25rem] w-full items-center gap-4 border-b border-divider px-6 py-4 text-left transition-colors",
            index === 0 && "border-t",
            active && "bg-surface-active",
            interactive && "cursor-pointer",
          )
          const inner = (
            <>
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full border bg-gradient-to-b shadow-sm",
                  positive
                    ? "border-positive-ring from-positive-fill to-positive-ring"
                    : "border-negative-ring from-negative-fill to-negative-ring",
                )}
              >
                <Glyph
                  className={cn(
                    "size-4",
                    positive ? "text-accent" : "text-negative",
                  )}
                />
              </span>
              <Text as="span" variant="body" tone="muted" className="flex-1">
                {text}
              </Text>
              {active && animateProgress && (
                <motion.span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: cycleMs / 1000, ease: "linear" }}
                  onAnimationComplete={onCycleComplete}
                />
              )}
            </>
          )

          return (
            <li key={text}>
              {interactive ? (
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  className={rowClass}
                >
                  {inner}
                </button>
              ) : (
                <div className={rowClass}>{inner}</div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
