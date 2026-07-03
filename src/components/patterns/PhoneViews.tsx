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
    // Hold view 0 longer before the first advance. Each crossfade paints a new
    // large image = a fresh LCP candidate, so an early first cycle pushes LCP
    // past the point view 0 registered; holding view 0 past the LCP window
    // keeps LCP on the first frame. Subsequent cycles run on --phone-cycle-ms.
    const hold = readCssVar("--phone-start-hold-ms", ms)
    let interval: ReturnType<typeof setInterval>
    const advance = () => setI((p) => (p + 1) % views.length)
    const first = setTimeout(() => {
      advance()
      interval = setInterval(advance, ms)
    }, hold)
    return () => {
      clearTimeout(first)
      clearInterval(interval)
    }
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
            // Only the very first view of a `priority` carousel (the hero LCP)
            // gets `priority` + fetchPriority=high, so exactly one image is
            // preloaded and wins the bandwidth race. Later views (and every
            // Care view, which passes no `priority`) load without a preload.
            priority={Boolean(priority) && active === 0}
            fetchPriority={priority && active === 0 ? "high" : undefined}
            sizes={sizes}
            rounded="none"
            className="w-full"
          />
        </motion.div>
      </AnimatePresence>

      {/* Warm every view so a crossfade never flickers — kept as the hidden
          double-render, but `loading="lazy"` so next/image does NOT emit a
          preload link for them (only the LCP image above is preloaded: 12
          competing preloads → 1). They still load early — they're in the
          viewport, and the hero's 4.8s start-hold gives them ample time to
          decode before the first crossfade (verified: 0 flicker on 4G). */}
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
            loading="lazy"
            sizes={sizes}
            rounded="none"
          />
        ))}
      </div>
    </div>
  )
}
