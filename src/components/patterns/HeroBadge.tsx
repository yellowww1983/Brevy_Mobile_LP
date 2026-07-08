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
      className="border-beam chip-glass inline-block max-w-[20rem] rounded-3xl px-3 py-1.5 text-center text-small font-normal leading-snug text-accent-deep sm:max-w-[40rem] sm:rounded-full sm:px-2 sm:py-1"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          layout
          initial={reduce ? false : { opacity: 0, y: 5, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduce ? {} : { opacity: 0, y: -5, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: EASE.out }}
          className="inline text-balance"
        >
          {/* date pill stays on one line; the callout flows and wraps after it */}
          <span className="mr-1.5 inline-block whitespace-nowrap rounded-full bg-surface-olive px-1.5 align-middle text-accent-deep">
            {variant.pill}
          </span>
          {variant.text}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
}
