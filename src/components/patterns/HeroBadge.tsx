"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { EASE } from "@/lib/motion"
import { readCssVar } from "@/lib/utils"
import { hero } from "@/lib/content"

/**
 * Hero chip that cycles through its variants (pill + text) on an interval.
 * The glass shell and orbiting border-beam stay mounted, so the beam never
 * resets; only the inner content crossfades (slide + blur) and the shell
 * width animates (layout) to each variant. Static first variant under
 * reduced motion.
 */
export function HeroBadge() {
  const variants = hero.badge
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduce || variants.length < 2) return
    const ms = readCssVar("--badge-cycle-ms", 2500)
    const delay = readCssVar("--badge-cycle-delay-ms", 0)

    let interval: ReturnType<typeof setInterval>
    const start = setTimeout(() => {
      interval = setInterval(
        () => setIndex((prev) => (prev + 1) % variants.length),
        ms,
      )
    }, delay)

    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [reduce, variants.length])

  const variant = variants[index]

  return (
    <motion.span
      layout
      className="border-beam chip-glass inline-flex items-center gap-1 rounded-full px-2 py-1 text-small font-normal leading-4 text-accent-deep"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          layout
          initial={reduce ? false : { opacity: 0, y: 5, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduce ? {} : { opacity: 0, y: -5, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: EASE.out }}
          className="inline-flex items-center gap-1 whitespace-nowrap"
        >
          <span className="inline-flex h-4 items-center rounded-full bg-surface-olive px-1 text-accent-deep">
            {variant.pill}
          </span>
          {variant.text}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
}
