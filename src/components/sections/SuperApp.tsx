"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { Section, Stack, Reveal, Badge, Text } from "@/components/primitives"
import { SectionHeader, PhoneStory } from "@/components/patterns"
import { cn } from "@/lib/utils"
import { useCssVar } from "@/lib/hooks"
import { Icon } from "@/lib/icons"
import { superApp } from "@/lib/content"

type Step = (typeof superApp.steps)[number]

// Per-card phone-column tint → gradient start class (Figma 24990 + 24995:1035).
const TINT: Record<string, string> = {
  violet: "from-surface-violet",
  amber: "from-surface-amber",
  sage: "from-surface-sage",
  mint: "from-surface-mint",
  indigo: "from-surface-indigo",
  purple: "from-surface-purple",
}

const ArrowLeftIcon = Icon.arrowLeft
const ArrowRightIcon = Icon.arrow

function StepCopy({ step }: { step: Step }) {
  return (
    <div className="flex flex-col gap-3">
      {"badge" in step && step.badge && (
        <Badge tone="soft" className="self-start">
          {step.badge}
        </Badge>
      )}
      <Text as="h3" variant="cardHeading">
        {step.title}
      </Text>
      <Text variant="editorial" tone="muted" className="max-w-[30rem]">
        {step.body}
      </Text>
    </div>
  )
}

/** Prev / next slider controls — Figma 24990: two 48px outlined circles. */
function SliderNav({
  onPrev,
  onNext,
  className,
}: {
  onPrev: () => void
  onNext: () => void
  className?: string
}) {
  // Figma 25181-584 (default) / 25182-611 (hover): white circle, 1px neutral
  // edge + xs shadow; on hover the border and glyph turn emerald (no fill shift).
  const btn =
    "grid size-12 place-items-center rounded-full border border-divider bg-background text-foreground-muted shadow-sm transition-colors hover:border-accent-deep hover:text-accent-deep"
  return (
    <div className={cn("flex gap-2", className)}>
      <button
        type="button"
        aria-label={superApp.nav.prev}
        onClick={onPrev}
        className={btn}
      >
        <ArrowLeftIcon className="size-6" />
      </button>
      <button
        type="button"
        aria-label={superApp.nav.next}
        onClick={onNext}
        className={btn}
      >
        <ArrowRightIcon className="size-6" />
      </button>
    </div>
  )
}

/**
 * Section #6 "The super app". A testimonial-style card slider: one {copy +
 * phone screen} card at a time, switched by the ‹ › arrows and auto-advancing
 * every --story-cycle-ms (looping). Any arrow click resets the countdown — the
 * auto-advance effect is keyed to the active index, so a manual change restarts
 * it (same reset-on-interaction semantics as CareComparison). Desktop keeps the
 * Figma two-column card (copy left, phone-in-hand right, per-card tint); mobile
 * stacks the phone over the copy. Reduced motion: no auto-advance and no
 * transitions (the global reduced-motion rule zeroes them) — arrows still work.
 */
export function SuperApp() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const n = superApp.steps.length
  const cycleMs = useCssVar("--story-cycle-ms", 4000)

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-20%" })

  const go = (dir: number) => setActive((a) => (a + dir + n) % n)

  // Auto-advance while the slider is in view. Keyed to `active`, so an arrow
  // click (which changes `active`) tears down the pending timeout and starts a
  // fresh one — the countdown resets on interaction with no extra bookkeeping.
  useEffect(() => {
    if (reduce || !inView) return
    const id = setTimeout(() => setActive((a) => (a + 1) % n), cycleMs)
    return () => clearTimeout(id)
  }, [active, inView, reduce, n, cycleMs])

  const step = superApp.steps[active]

  return (
    <Section
      id="super-app"
      rhythm="content"
      surface="default"
      className="scroll-mt-24"
    >
      <Stack size="xl" align="center">
        <Reveal blur>
          <SectionHeader
            chip
            kicker={superApp.chip}
            title={
              <>
                {superApp.title[0]}
                <br />
                {superApp.title[1]}
              </>
            }
          />
        </Reveal>

        <div ref={ref} className="w-full max-w-[75rem]">
          {/* Desktop — Figma two-column card. Normal height (no pin, no tall
              scroll driver): the arrows + timer drive the active card. */}
          <div className="mx-auto hidden h-[var(--story-card-h)] grid-cols-2 overflow-hidden rounded-2xl border border-divider lg:grid">
            {/* LEFT — copy crossfades in place; arrows pinned bottom-left */}
            <div className="relative bg-gradient-to-b from-surface to-background">
              {superApp.steps.map((s, i) => (
                <div
                  key={s.title}
                  aria-hidden={active !== i}
                  className="pointer-events-none absolute inset-0 flex flex-col justify-center px-12 transition-opacity duration-500"
                  style={{ opacity: active === i ? 1 : 0 }}
                >
                  <StepCopy step={s} />
                </div>
              ))}
              <SliderNav
                onPrev={() => go(-1)}
                onNext={() => go(1)}
                className="absolute bottom-8 left-12 z-10"
              />
            </div>

            {/* RIGHT — per-card tint crossfade + phone-in-hand (bleed, drops
                the new screen in on change) */}
            <div className="relative">
              {superApp.steps.map((s, i) => (
                <div
                  key={s.title}
                  aria-hidden
                  className={cn(
                    "absolute inset-0 bg-gradient-to-b to-surface transition-opacity duration-500",
                    TINT[s.tint],
                  )}
                  style={{ opacity: active === i ? 1 : 0 }}
                />
              ))}
              <PhoneStory active={active} mode="bleed" />
            </div>
          </div>

          {/* Mobile — single-card slider: phone over copy, arrows below. */}
          <div
            className={cn(
              "mx-auto flex max-w-[26rem] flex-col gap-6 overflow-hidden rounded-2xl border border-divider bg-gradient-to-b to-surface p-6 lg:hidden",
              TINT[step.tint],
            )}
          >
            <div className="mx-auto w-full max-w-[15rem]">
              <PhoneStory active={active} />
            </div>
            <StepCopy step={step} />
            <SliderNav
              onPrev={() => go(-1)}
              onNext={() => go(1)}
              className="mt-2"
            />
          </div>
        </div>
      </Stack>
    </Section>
  )
}
