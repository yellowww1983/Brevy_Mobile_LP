"use client"

import { type CSSProperties, useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { EASE } from "@/lib/motion"
import { superApp } from "@/lib/content"

const readMs = (token: string, fallback: number) =>
  parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(token),
  ) || fallback

// Rectangle of the empty white screen inside /phone-in-hand.png, as design
// tokens — the UI overlay is clipped to exactly this box.
const screenBox: CSSProperties = {
  left: "var(--story-screen-left)",
  top: "var(--story-screen-top)",
  width: "var(--story-screen-w)",
  height: "var(--story-screen-h)",
  borderRadius: "var(--story-screen-radius)",
}

/**
 * One app screen. Real per-step exports drop into `screen`; until then a light
 * faux-screen stands in (header band + lines + the step title) so the fall +
 * crossfade reads clearly and steps are distinguishable.
 */
function ScreenView({ index }: { index: number }) {
  const step = superApp.steps[index]
  if (step.screen) {
    return (
      <Image
        src={step.screen}
        alt={step.title}
        fill
        sizes="20rem"
        className="object-cover"
      />
    )
  }
  return (
    <div className="flex h-full w-full flex-col bg-background">
      <div className="h-[22%] bg-accent-subtle" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="h-2.5 w-2/3 rounded-full bg-surface" />
        <div className="h-2.5 w-1/2 rounded-full bg-surface" />
        <div className="h-2.5 w-3/5 rounded-full bg-surface" />
        <span className="mt-auto text-label font-medium uppercase tracking-label text-foreground-subtle">
          {step.title}
        </span>
      </div>
    </div>
  )
}

/**
 * Phone-in-hand (empty white screen) with the active app screen layered over
 * the screen rect; on `active` change the new screen falls in from above
 * (clipped to the screen) while the previous fades.
 *  - mode="bleed": pinned variant — the hand is anchored to the bottom of its
 *    column, runs taller than the (fixed-height) card, and its wrist fades into
 *    the gradient via a bottom mask (Figma 24993:925).
 *  - mode="contain": the whole device sits centred in its box (mobile cards).
 * Reduced motion shows a plain swap.
 */
export function PhoneStory({
  active,
  mode = "contain",
}: {
  active: number
  mode?: "contain" | "bleed"
}) {
  const reduce = useReducedMotion()
  const [dropMs, setDropMs] = useState(600)
  useEffect(() => setDropMs(readMs("--story-drop-ms", 600)), [])

  const overlay = (
    <div className="absolute overflow-hidden" style={screenBox}>
      <AnimatePresence>
        <motion.div
          key={active}
          className="absolute inset-0"
          initial={
            reduce ? false : { y: "calc(-1 * var(--story-drop))", opacity: 0 }
          }
          animate={{ y: "0%", opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduce ? 0 : dropMs / 1000,
            ease: EASE.outBack,
            opacity: {
              duration: reduce ? 0 : (dropMs / 1000) * 0.7,
              ease: EASE.out,
            },
          }}
        >
          <ScreenView index={active} />
        </motion.div>
      </AnimatePresence>
    </div>
  )

  if (mode === "bleed") {
    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="relative mx-auto aspect-[420/595] w-[var(--story-phone-w)]">
          <Image
            src="/phone-in-hand.png"
            alt=""
            aria-hidden
            fill
            priority
            sizes="32rem"
            className="story-fade object-contain"
          />
          {overlay}
        </div>
      </div>
    )
  }

  return (
    <div className="relative mx-auto aspect-[420/595] w-full max-w-[22rem]">
      <Image
        src="/phone-in-hand.png"
        alt=""
        aria-hidden
        fill
        sizes="22rem"
        className="pointer-events-none object-contain"
      />
      {overlay}
    </div>
  )
}
