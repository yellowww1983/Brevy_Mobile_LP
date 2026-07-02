"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { Section, Stack, Reveal, Badge, Text } from "@/components/primitives"
import { SectionHeader, PhoneStory } from "@/components/patterns"
import { cn } from "@/lib/utils"
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

/** Stacked card for mobile / reduced motion — no pin, no fall. */
function StackedStep({ step, index }: { step: Step; index: number }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 overflow-hidden rounded-2xl border border-divider bg-gradient-to-b to-surface p-6",
        TINT[step.tint],
      )}
    >
      <div className="mx-auto w-full max-w-[15rem]">
        <PhoneStory active={index} />
      </div>
      <StepCopy step={step} />
    </div>
  )
}

/**
 * Section #6 "The super app". Desktop: SafeStep-style scrollytelling — a
 * FIXED-height card is position:sticky (pinned) while an invisible driver gives
 * the scroll distance. Scroll progress picks the active step; the left copy and
 * the right phone screen crossfade in place (screen also falls in from above).
 * The hand is anchored to the card bottom and its wrist fades into the gradient.
 * Mobile and reduced motion fall back to a plain stacked list.
 */
export function SuperApp() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const n = superApp.steps.length

  // Pin scrubbing. The driver is tall; the card is sticky. activeIndex maps to
  // EVEN segments of the driver's travel through the viewport, read straight off
  // getBoundingClientRect (Lenis runs in native mode, so this is accurate).
  // Card 0 shows the instant the section enters (progress clamps to 0 before the
  // pin starts), and there's no dead zone — distance === the scrub range.
  const driverRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = driverRef.current
    if (!el) return
    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const distance = rect.height - window.innerHeight
      const p = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0
      setActive(Math.min(n - 1, Math.floor(p * n)))
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [n])

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

        {/* Desktop pinned scrollytelling — hidden under reduced motion. The
            driver is tall (scroll distance); the card inside stays fixed. */}
        {!reduce && (
          <div
            ref={driverRef}
            className="relative hidden w-full lg:block"
            style={{ height: `calc(${n} * var(--story-step-scroll) + 100svh)` }}
          >
            <div className="sticky top-[var(--story-pin-top)]">
              <div className="mx-auto grid h-[var(--story-card-h)] w-full max-w-[75rem] grid-cols-2 overflow-hidden rounded-2xl border border-divider">
                {/* LEFT — copy crossfades in place */}
                <div className="relative bg-gradient-to-b from-surface to-background">
                  {superApp.steps.map((step, i) => (
                    <div
                      key={step.title}
                      aria-hidden={active !== i}
                      className="absolute inset-0 flex flex-col justify-center px-12 transition-opacity duration-500"
                      style={{ opacity: active === i ? 1 : 0 }}
                    >
                      <StepCopy step={step} />
                    </div>
                  ))}
                </div>
                {/* RIGHT — pinned hand (bleeds to bottom, masked) + screen.
                    The column tint crossfades per step (stacked gradient
                    layers fading on the active index). */}
                <div className="relative">
                  {superApp.steps.map((step, i) => (
                    <div
                      key={step.title}
                      aria-hidden
                      className={cn(
                        "absolute inset-0 bg-gradient-to-b to-surface transition-opacity duration-500",
                        TINT[step.tint],
                      )}
                      style={{ opacity: active === i ? 1 : 0 }}
                    />
                  ))}
                  <PhoneStory active={active} mode="bleed" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile (always) + desktop reduced-motion: stacked list. */}
        <div
          className={
            reduce
              ? "flex w-full max-w-[26rem] flex-col gap-8"
              : "flex w-full max-w-[26rem] flex-col gap-8 lg:hidden"
          }
        >
          {superApp.steps.map((step, i) => (
            <StackedStep key={step.title} step={step} index={i} />
          ))}
        </div>
      </Stack>
    </Section>
  )
}
