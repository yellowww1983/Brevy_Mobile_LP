"use client"

import { motion } from "framer-motion"
import { staggerWords, wordIn } from "@/lib/motion"
import { care } from "@/lib/content"
import { FuzzyText } from "./FuzzyText"

type CareIntroProps = {
  /** Drives the word reveal and starts the progress bar once true. */
  inView: boolean
  /** Fill time of the bar, in ms — the single source for the intro→content swap. */
  durationMs: number
  /** Fired when the bar reaches 100% (hand-off to the comparison view). */
  onComplete: () => void
}

/**
 * Intro state of the comparison card: a clover mark + the line "Brevy turns
 * chaos into clarity" revealed word-by-word (text-generate), the middle word
 * fuzzy VHS text, and a progress bar underneath. The bar is the single timer —
 * it fills left→right over `durationMs` and, on reaching 100%, calls
 * `onComplete` to swap to the comparison (no separate countdown).
 */
export function CareIntro({ inView, durationMs, onComplete }: CareIntroProps) {
  const words = [
    ...care.intro.before.split(" ").map((w) => ({ kind: "word" as const, w })),
    { kind: "fuzzy" as const, w: care.intro.fuzzy },
    ...care.intro.after.split(" ").map((w) => ({ kind: "word" as const, w })),
  ]

  // Mobile: pin the intro near the top of the (tall, stacked) card so it's
  // visible the moment the section enters, instead of centred far down in
  // empty space. Desktop keeps it centred.
  return (
    <div className="flex h-full items-start justify-center px-6 pt-14 md:items-center md:pt-0">
      <div className="inline-flex w-full max-w-[20rem] flex-col items-center gap-5 md:w-auto md:max-w-none">
        <motion.p
          variants={staggerWords}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-balance text-center text-h3 font-semibold leading-tight text-accent whitespace-normal md:whitespace-nowrap md:leading-none"
        >
          <motion.span
            variants={wordIn}
            aria-hidden
            className="mr-[0.4em] inline-block size-7 translate-y-[0.15em] bg-[url('/brand/brevy-mark.svg')] bg-contain bg-center bg-no-repeat align-baseline"
          />
          {words.map((item, i) => (
            <motion.span
              key={`${item.kind}-${i}`}
              variants={wordIn}
              className="mr-[0.28em] inline-block last:mr-0"
            >
              {item.kind === "fuzzy" ? <FuzzyText>{item.w}</FuzzyText> : item.w}
            </motion.span>
          ))}
        </motion.p>

        {/* Progress bar — same timer fills it and triggers the swap. */}
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-divider">
          <motion.div
            className="h-full w-full origin-left rounded-full bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: durationMs / 1000, ease: "linear" }}
            onAnimationComplete={() => {
              if (inView) onComplete()
            }}
          />
        </div>
      </div>
    </div>
  )
}
