"use client"

import { useReducedMotion } from "framer-motion"
import { useMinWidth } from "@/lib/hooks"
import { hero } from "@/lib/content"

/**
 * Hero announcement chip: a static date pill + the EVV callout. The callout is
 * long, so on phones — where it would wrap to three lines — the text becomes a
 * seamless horizontal marquee while the date pill stays put as an anchor.
 * Desktop (≥ sm) fits it on one line, so it renders static (no marquee).
 * Reduced motion (and the pre-hydration frame): static too, wrapping if it must.
 */
export function HeroBadge() {
  const { pill, text } = hero.badge[0]
  const isDesktop = useMinWidth(640)
  const reduce = useReducedMotion()
  const marquee = !isDesktop && !reduce

  if (!marquee) {
    // Static — desktop keeps it on one line; reduced motion / SSR wraps if the
    // callout doesn't fit (no motion), which is the acceptable fallback.
    return (
      <span className="border-beam chip-glass inline-block max-w-[20rem] rounded-3xl px-3 py-1.5 text-center text-small font-normal leading-snug text-accent-deep sm:max-w-[40rem] sm:rounded-full sm:px-2 sm:py-1">
        <span className="text-balance">
          <span className="mr-1.5 inline-block whitespace-nowrap rounded-full bg-surface-olive px-1.5 align-middle text-accent-deep">
            {pill}
          </span>
          {text}
        </span>
      </span>
    )
  }

  // Mobile + motion — one line: the pill is fixed and the callout scrolls in a
  // seamless loop (two copies, shifted one copy width). The inner viewport clips
  // the overflow; the chip stays overflow-visible so the border-beam isn't cut.
  return (
    <span className="border-beam chip-glass inline-flex max-w-[20rem] items-center gap-1.5 rounded-3xl px-3 py-1.5 text-small font-normal leading-snug text-accent-deep">
      <span className="inline-block shrink-0 whitespace-nowrap rounded-full bg-surface-olive px-1.5 text-accent-deep">
        {pill}
      </span>
      <span className="min-w-0 flex-1 overflow-hidden">
        <span className="hero-marquee flex w-max whitespace-nowrap">
          <span className="pr-8">{text}</span>
          <span aria-hidden className="pr-8">
            {text}
          </span>
        </span>
      </span>
    </span>
  )
}
