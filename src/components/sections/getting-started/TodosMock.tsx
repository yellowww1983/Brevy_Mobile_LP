"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Icon } from "@/lib/icons"
import { onboarding } from "@/lib/content"
import { EASE } from "@/lib/motion"

const Check = Icon.check
const ChevronRight = Icon.chevronRight

const readMs = (token: string, fallback: number) =>
  parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(token),
  ) || fallback

/**
 * Step 2 mock. The first item starts done; on scroll-in the remaining items
 * tick off one by one (ring → olive check + strike-through), staggered. Reduced
 * motion shows them all done immediately.
 */
export function TodosMock() {
  const { title, items } = onboarding.todos
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })
  const reduce = useReducedMotion()
  const animate = !reduce
  const [checked, setChecked] = useState<number[]>([])

  const pending = items
    .map((item, i) => (item.done ? -1 : i))
    .filter((i) => i >= 0)

  useEffect(() => {
    if (reduce) {
      setChecked(pending)
      return
    }
    if (!inView) return
    const stagger = readMs("--step2-check-stagger", 600)
    const timers = pending.map((idx, k) =>
      setTimeout(() => setChecked((c) => [...c, idx]), stagger * (k + 1)),
    )
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce])

  return (
    <div
      ref={ref}
      className="min-h-[16.875rem] w-full overflow-hidden rounded-field border border-border-field bg-background shadow-sm"
    >
      <p className="px-4 pt-2 text-lg font-semibold leading-7 text-foreground">
        {title}
      </p>
      <ul className="flex flex-col px-4 pb-4">
        {items.map((item, i) => {
          const isDone = item.done || checked.includes(i)
          return (
            <li key={item.title} className="flex items-center gap-3 py-2">
              <span className="relative size-6 shrink-0">
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-dashed border-border-field"
                  initial={false}
                  animate={{ opacity: isDone ? 0 : 1 }}
                  transition={{ duration: animate ? 0.3 : 0 }}
                />
                <motion.span
                  className="absolute inset-0 flex items-center justify-center rounded-full border border-positive-ring bg-gradient-to-b from-positive-fill to-positive-ring shadow-sm"
                  initial={
                    item.done || !animate ? false : { scale: 0.4, opacity: 0 }
                  }
                  animate={{ scale: isDone ? 1 : 0.4, opacity: isDone ? 1 : 0 }}
                  transition={
                    animate ? { duration: 0.4, ease: EASE.outBack } : { duration: 0 }
                  }
                >
                  <Check className="size-4 text-accent" />
                </motion.span>
              </span>

              <span
                className={cn(
                  "flex-1 transition-opacity duration-300",
                  isDone && "opacity-50",
                )}
              >
                <span
                  className={cn(
                    "block text-body font-medium text-foreground",
                    isDone && "line-through",
                  )}
                >
                  {item.title}
                </span>
                <span className="block text-body text-foreground-subtle">
                  {item.desc}
                </span>
              </span>

              {/* Always laid out (only faded) so removing it can't widen the
                  text column and reflow the description mid-animation. */}
              <ChevronRight
                aria-hidden
                className={cn(
                  "size-4 shrink-0 text-foreground-subtle transition-opacity duration-300",
                  isDone && "opacity-0",
                )}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
