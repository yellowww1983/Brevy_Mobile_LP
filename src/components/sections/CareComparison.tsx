"use client"

import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion"
import { Section, Stack, Reveal } from "@/components/primitives"
import {
  SectionHeader,
  CompareColumn,
  PhoneViews,
  CareIntro,
} from "@/components/patterns"
import { EASE } from "@/lib/motion"
import { readCssVar } from "@/lib/utils"
import { care, assets } from "@/lib/content"

/**
 * Care-coordination section. Plays a one-time intro ("Brevy turns chaos into
 * clarity", word-by-word, fuzzy "chaos") when it scrolls into view, holds for
 * --intro-duration, then lifts to reveal the before / with-Brevy comparison.
 * The comparison's right column auto-advances (progress bar) and drives the
 * centre phone; clicking a row jumps to it. Reduced motion skips the intro and
 * the auto-advance — content is shown immediately, clicks still switch rows.
 */
export function CareComparison() {
  const [active, setActive] = useState(0)
  const [cycleMs, setCycleMs] = useState(4500)
  const [introMs, setIntroMs] = useState(4000)
  const [phase, setPhase] = useState<"intro" | "content">("intro")
  const reduce = useReducedMotion()
  const count = care.after.items.length

  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { once: true, margin: "-10%" })

  useEffect(() => {
    setCycleMs(readCssVar("--feature-cycle-ms", 4500))
    setIntroMs(readCssVar("--intro-duration", 4000))
  }, [])

  // Reduced motion: no intro, straight to the comparison.
  useEffect(() => {
    if (reduce) setPhase("content")
  }, [reduce])

  const advance = () => setActive((a) => (a + 1) % count)
  const showContent = phase === "content"

  return (
    <Section id="care" surface="gradient-warm" rhythm="content">
      <Stack size="xl" align="center">
        <Reveal blur>
          <SectionHeader
            chip
            kicker={care.kicker}
            title={care.title}
            subtitle={care.subtitle}
            align="center"
            subtitleClassName="max-w-[29.25rem]"
          />
        </Reveal>

        <div
          ref={cardRef}
          className="relative mx-auto w-full max-w-[75rem] overflow-hidden rounded-2xl border border-divider bg-background"
        >
          {/* Comparison — always mounted, so it owns the card height and the
              intro can lift off it with no layout jump. */}
          <div className="grid divide-y divide-divider lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            <CompareColumn
              tone="negative"
              label={care.before.label}
              heading={care.before.heading}
              items={care.before.items}
            />

            <div className="flex items-center justify-center px-6 py-12">
              <PhoneViews
                views={assets.featurePhones}
                index={active}
                alt="Brevy app screen"
                width={1560}
                height={2339}
                sizes="20rem"
                className="w-full max-w-[20rem] translate-x-[var(--feature-phone-shift)] translate-y-[var(--feature-phone-shift-y)]"
              />
            </div>

            <CompareColumn
              tone="positive"
              label={care.after.label}
              heading={care.after.heading}
              items={care.after.items}
              activeIndex={active}
              onSelect={setActive}
              animateProgress={!reduce && showContent}
              cycleMs={cycleMs}
              onCycleComplete={advance}
            />
          </div>

          {/* Intro overlay — covers the comparison, then fades out to reveal it. */}
          <AnimatePresence>
            {!reduce && phase === "intro" && (
              <motion.div
                key="intro"
                className="absolute inset-0 bg-background"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE.inOut }}
              >
                <CareIntro
                  inView={inView}
                  durationMs={introMs}
                  onComplete={() => setPhase("content")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Stack>
    </Section>
  )
}
