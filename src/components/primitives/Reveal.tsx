"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { fadeInView, blurUp, blurInView, ENTRANCE, EASE, VIEWPORT } from "@/lib/motion"

type RevealProps = {
  as?: "div" | "li"
  /** On-load blur entrance (Linear-style), animate on mount. For the hero. */
  blurUp?: boolean
  /** On-scroll reveal with blur + larger rise instead of the plain fade-up. */
  blur?: boolean
  /**
   * Externally-controlled trigger (scroll modes only). When provided, the
   * reveal animates off this boolean instead of its own `whileInView`, so
   * several elements can share one `useInView` and reveal as a coordinated,
   * staggered group.
   */
  inView?: boolean
  /** Stagger / sequencing offset in seconds. */
  delay?: number
  className?: string
  children: ReactNode
}

const map = { div: motion.div, li: motion.li } as const

/**
 * Reveal motion wrapper. One curve source (lib/motion), three modes:
 *  - default:  on-scroll fade-up (`whileInView`).
 *  - blur:     on-scroll blur + rise — a section visibly lifts out of blur.
 *  - blurUp:   on-load entrance that rises out of blur (`animate`), staggered.
 * Reduced motion shows the content immediately in every mode.
 */
export function Reveal({
  as = "div",
  blurUp: onLoad = false,
  blur = false,
  inView,
  delay = 0,
  className,
  children,
}: RevealProps) {
  const Cmp = map[as]
  const reduce = useReducedMotion()
  const variants = onLoad ? blurUp : blur ? blurInView : fadeInView
  // blur/blurUp carry no variant transition, so the component owns timing —
  // this is what makes the `delay` stagger apply. fadeInView keeps its own.
  const scrollTransition = blur
    ? { delay, duration: ENTRANCE.duration, ease: EASE.out }
    : { delay }

  // Reduced motion: render at rest, no transform or blur.
  if (reduce) {
    return (
      <Cmp
        variants={variants}
        initial={false}
        animate="visible"
        transition={{ duration: 0 }}
        className={className}
      >
        {children}
      </Cmp>
    )
  }

  // On-load entrance (hero): play once on mount.
  if (onLoad) {
    return (
      <Cmp
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay, duration: ENTRANCE.duration, ease: EASE.out }}
        className={className}
      >
        {children}
      </Cmp>
    )
  }

  // Externally-coordinated trigger: animate off the shared `inView` flag.
  if (inView !== undefined) {
    return (
      <Cmp
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={scrollTransition}
        className={className}
      >
        {children}
      </Cmp>
    )
  }

  // On-scroll reveal: trigger when it enters the viewport.
  return (
    <Cmp
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={scrollTransition}
      className={className}
    >
      {children}
    </Cmp>
  )
}
