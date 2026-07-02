"use client"

import { type CSSProperties, useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Icon } from "@/lib/icons"
import { EASE, ORBIT } from "@/lib/motion"
import { cn, readCssVar } from "@/lib/utils"
import { hero } from "@/lib/content"

/**
 * Decorative layer behind the hero phone: three faint concentric rings that
 * line-draw from the top (splitting both ways down to the bottom), plus three
 * tags that drop in from above and then idle-float. Sequence on entry: rings
 * draw → tags drop → tags float. Desktop-only (xl+) — the tags sit ±400px from
 * the phone, so below xl we show just the phone. Reduced motion renders the
 * rings drawn and the tags in place, with no drawing, dropping or floating.
 */

// Ring radii as a fraction of the 100-unit viewBox (outer → inner). Mirrors
// Figma's 680/580/480 concentric set. Stroke stays 1px at any scale.
const RINGS = [49, 41.8, 34.6]

// Per-tag placement: px offset of the tag centre from the orbit centre, and the
// float-period token that desyncs its idle bob. Index-aligned with the content.
const LAYOUT = [
  { x: -396, y: -47, durToken: "--hero-float-dur-1" },
  { x: 358, y: -142, durToken: "--hero-float-dur-2" },
  { x: 442, y: 20, durToken: "--hero-float-dur-3" },
] as const

const TONE = {
  pay: "bg-tag-pay",
  hours: "bg-tag-hours",
  stub: "bg-tag-stub",
} as const

export function HeroOrbit() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })
  const reduce = useReducedMotion()

  // Live timing from the design tokens (fall back to the motion defaults).
  const [t, setT] = useState<Record<
    "drop" | "dropMs" | "tagStagger" | "tagDelay" | "ringDrawMs" | "ringStaggerMs",
    number
  >>({
    drop: ORBIT.drop,
    dropMs: ORBIT.dropDuration * 1000,
    tagStagger: ORBIT.tagStagger * 1000,
    tagDelay: ORBIT.tagDelay * 1000,
    ringDrawMs: ORBIT.ringDraw * 1000,
    ringStaggerMs: ORBIT.ringStagger * 1000,
  })
  useEffect(() => {
    setT({
      drop: readCssVar("--hero-tags-drop", ORBIT.drop),
      dropMs: readCssVar("--hero-tags-drop-ms", ORBIT.dropDuration * 1000),
      tagStagger: readCssVar("--hero-tags-stagger-ms", ORBIT.tagStagger * 1000),
      tagDelay: readCssVar("--hero-tags-delay-ms", ORBIT.tagDelay * 1000),
      ringDrawMs: readCssVar("--rings-draw-ms", ORBIT.ringDraw * 1000),
      ringStaggerMs: readCssVar("--rings-stagger-ms", ORBIT.ringStagger * 1000),
    })
  }, [])

  const show = reduce || inView

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[var(--hero-orbit-top)] z-0 hidden size-[var(--hero-orbit-d)] -translate-x-1/2 -translate-y-1/2 xl:block"
    >
      {/* Concentric rings — each ring is two semicircles drawn from the top
          (12 o'clock) outward in both directions, meeting at the bottom. */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="absolute inset-0 size-full overflow-visible"
      >
        {RINGS.map((r, i) => {
          // Inner ring draws first, then outward.
          const order = RINGS.length - 1 - i
          return (
            <g key={r}>
              {/* sweep 1 = right half, sweep 0 = left half */}
              {[1, 0].map((sweep) => (
                <motion.path
                  key={sweep}
                  d={`M 50 ${50 - r} A ${r} ${r} 0 0 ${sweep} 50 ${50 + r}`}
                  className="stroke-hero-ring/50"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: show ? 1 : 0 }}
                  transition={{
                    duration: t.ringDrawMs / 1000,
                    delay: (order * t.ringStaggerMs) / 1000,
                    ease: EASE.out,
                  }}
                />
              ))}
            </g>
          )
        })}
      </svg>

      {/* Floating tags */}
      {hero.orbit.tags.map((tag, i) => {
        const L = LAYOUT[i]
        const TagIcon = Icon[tag.icon]
        // Float begins the instant this tag finishes dropping, so the hand-off
        // from drop (framer) to float (CSS) is seamless.
        const landMs = t.tagDelay + i * t.tagStagger + t.dropMs
        return (
          <div
            key={tag.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `calc(50% + ${L.x}px)`, top: `calc(50% + ${L.y}px)` }}
          >
            {/* phase 1 — drop in from above */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -t.drop }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -t.drop }}
              transition={{
                duration: t.dropMs / 1000,
                delay: (t.tagDelay + i * t.tagStagger) / 1000,
                ease: EASE.outBack,
              }}
            >
              {/* phase 2 — idle float (CSS, desynced per tag) */}
              <div
                className="hero-float"
                style={
                  {
                    "--hero-float-dur": `var(${L.durToken})`,
                    "--hero-float-delay": `${landMs}ms`,
                  } as CSSProperties
                }
              >
                <div className="flex h-11 items-center gap-2 rounded-2xl border border-border-field bg-background pl-[0.6875rem] pr-3 shadow-md">
                  <span
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full",
                      TONE[tag.tone],
                    )}
                  >
                    <TagIcon className="size-4 text-foreground-muted" />
                  </span>
                  <span className="whitespace-nowrap text-xs font-medium text-foreground">
                    {tag.label}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
