"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { cn, readCssVar } from "@/lib/utils"
import { Media } from "@/components/primitives"
import { EASE } from "@/lib/motion"

type PhoneViewsProps = {
  views: readonly string[]
  alt: string
  width: number
  height: number
  sizes?: string
  priority?: boolean
  className?: string
  /**
   * Controlled active view. When set, PhoneViews crossfades to this index and
   * runs no internal timer (the parent drives it). When omitted, it auto-cycles
   * on --phone-cycle-ms (hero behavior).
   */
  index?: number
}

/**
 * Phone screen swapper. Crossfades through `views` — a soft pure-opacity fade,
 * both layers absolute inset-0 and identically sized so only the screen appears
 * to change (the casing is part of the artwork). Every view is preloaded so the
 * first swap can't flicker. Reduced motion swaps instantly, no fade.
 *
 * Uncontrolled: auto-cycles on --phone-cycle-ms (hero). Controlled (`index`):
 * the parent picks the view (compare section, synced to the active row).
 */
export function PhoneViews({
  views,
  alt,
  width,
  height,
  sizes,
  priority,
  className,
  index,
}: PhoneViewsProps) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  const controlled = index !== undefined
  const active = controlled
    ? Math.min(Math.max(index, 0), views.length - 1)
    : i

  useEffect(() => {
    if (controlled || reduce || views.length < 2) return
    const ms = readCssVar("--phone-cycle-ms", 3200)
    const id = setInterval(() => setI((p) => (p + 1) % views.length), ms)
    return () => clearInterval(id)
  }, [controlled, reduce, views.length])

  // Reduced motion: show the active view, swap instantly (no crossfade).
  if (reduce) {
    return (
      <Media
        src={views[active]}
        alt={alt}
        aspect="natural"
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        rounded="none"
        className={className}
      />
    )
  }

  return (
    <div
      className={cn("relative", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={active}
          className="absolute inset-0 origin-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: EASE.inOut }}
        >
          <Media
            src={views[active]}
            alt={alt}
            aspect="natural"
            width={width}
            height={height}
            priority
            sizes={sizes}
            rounded="none"
            className="w-full"
          />
        </motion.div>
      </AnimatePresence>

      {/* Preload every view up front so the first crossfade never flickers. */}
      <div
        aria-hidden
        className="pointer-events-none absolute size-0 overflow-hidden opacity-0"
      >
        {views.map((src, idx) => (
          <Media
            key={idx}
            src={src}
            alt=""
            aspect="natural"
            width={width}
            height={height}
            priority
            sizes={sizes}
            rounded="none"
          />
        ))}
      </div>
    </div>
  )
}
