"use client"

import { useRef } from "react"
import Image from "next/image"
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion"
import {
  Section,
  Stack,
  Heading,
  Text,
  Reveal,
  Action,
} from "@/components/primitives"
import {
  StoreButtons,
  ProgressiveGlass,
  HeroBadge,
  HeroOrbit,
  PhoneViews,
} from "@/components/patterns"
import { ENTRANCE } from "@/lib/motion"
import { useWebmAlpha } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import { hero, assets } from "@/lib/content"

// Scroll tuning tokens (live-tweakable):
const PHONE_LAG = 0 // px the phone lags scroll. 0 = locked to content, so the
// tagline can never overtake the phone and ride onto its nav (forbidden state).
const BAND_FADE: [number, number] = [0.55, 0.8] // hero progress over which the glass fades out.

// On-load entrance order, top → bottom (Linear-style blur reveal). The upper
// block (badge → CTA → phone) animates on mount. The lower block (clover →
// headline → buttons) starts below the fold, so it reveals on scroll-into-view
// instead (see bottomInView), never on load.
const S = ENTRANCE.stagger
const IN = {
  badge: S * 0,
  title: S * 1,
  subtitle: S * 2,
  cta: S * 3,
  phone: S * 4,
} as const

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const webmAlpha = useWebmAlpha()
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  })

  // Lower block (clover + headline + buttons) reveal: one shared trigger so
  // the three rise together as a staggered group when the block scrolls in.
  // Margin fires it a touch early, so the entrance plays inside the frame.
  const bottomRef = useRef<HTMLDivElement>(null)
  const bottomInView = useInView(bottomRef, {
    once: true,
    margin: "0px 0px -15% 0px",
  })

  // Phone parallax (0 by default → no differential, so content keeps its
  // resting relation to the phone and never collides with it). Runs on the
  // outer wrapper; the entrance blur/rise rides on the inner Reveal, so the
  // two transforms never fight over the same element.
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, PHONE_LAG])
  // Band fades out as the hero leaves, so it never blurs the next section.
  const bandOpacity = useTransform(scrollYProgress, BAND_FADE, [1, 0])

  return (
    <Section rhythm="hero" surface="gradient" width="container">
      <Stack size="lg" align="center" className="text-center">
        <Stack size="md" align="center" className="text-center">
          <Reveal blurUp delay={IN.badge}>
            <HeroBadge />
          </Reveal>
          <Reveal blurUp delay={IN.title}>
            <Heading level="h1" as="h1" tone="accent">
              {hero.title}
            </Heading>
          </Reveal>
          <Reveal blurUp delay={IN.subtitle}>
            <Text variant="editorial" className="mx-auto max-w-2xl">
              {hero.subtitle}
            </Text>
          </Reveal>
          <Reveal blurUp delay={IN.cta} className="mt-2">
            <Action variant="talk" size="lg" href={hero.cta.href}>
              {hero.cta.label}
            </Action>
          </Reveal>
        </Stack>

        {/* clip-x: on phones the device shift (18.5%) pushes the PNG's
            transparent shadow past the screen edge, which would cause a
            horizontal scroll. overflow-y stays visible (clip allows it). */}
        <div ref={stageRef} className="relative w-full overflow-x-clip">
          {/* [0] orbit — concentric rings + floating tags, behind the phone */}
          <HeroOrbit />

          {/* [1] phone — outer: scroll parallax + horizontal shift;
              inner Reveal: on-load blur entrance */}
          <motion.div
            style={reduce ? undefined : { y: phoneY }}
            className="relative z-10 mx-auto w-[var(--size-hero-phone)] max-w-full translate-x-[var(--hero-phone-shift)]"
          >
            <Reveal blurUp delay={IN.phone}>
              <PhoneViews
                views={assets.heroPhones}
                alt="Brevy app on iPhone"
                width={2232}
                height={3348}
                priority
                sizes="(min-width: 768px) 46rem, 92vw"
                className="w-full"
              />
            </Reveal>
          </motion.div>

          {/* [3] clover badge — pinned to the phone's bottom casing edge.
              z sits above the glass band (z-40) but below the sticky navbar
              (z-50), so on scroll it slides UNDER the nav, not over it.
              Outer holds the position; inner Reveal enters. */}
          {assets.glassClover && (
            <div
              style={{
                top: "calc(var(--size-hero-phone) * var(--hero-clover-bottom))",
              }}
              className="pointer-events-none absolute left-1/2 z-[45] -translate-x-1/2"
            >
              <Reveal blur inView={bottomInView} delay={0}>
                {/* Animated glass webm (alpha) — desktop, and only on engines
                    that render webm's alpha channel. Safari (desktop + iOS)
                    paints webm alpha as a black box, so it — and SSR, before
                    detection — falls back to the still PNG below. */}
                {webmAlpha && (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden
                    className="hidden size-[var(--size-hero-clover)] object-contain md:block"
                  >
                    <source
                      src={assets.glassClover}
                      type='video/webm; codecs="vp9"'
                    />
                    <source
                      src={assets.glassCloverVp8}
                      type='video/webm; codecs="vp8"'
                    />
                  </video>
                )}
                {/* Static transparent PNG — always on mobile, and on desktop
                    whenever the webm can't show its alpha (Safari / pre-mount). */}
                <Image
                  src={assets.glassCloverPng}
                  alt=""
                  aria-hidden
                  width={448}
                  height={448}
                  className={cn(
                    "size-[var(--size-hero-clover)] object-contain",
                    webmAlpha && "md:hidden",
                  )}
                />
              </Reveal>
            </div>
          )}

          {/* [4] headline + buttons — reveal on scroll-into-view (below the
              fold on load), staggered after the clover via the shared trigger */}
          {/* Mobile sits the block just below the (proportionally larger)
              clover with a clean gap; desktop keeps the -7rem overlap so the
              tagline rides onto the phone's bottom casing. */}
          <div
            ref={bottomRef}
            className="relative z-10 mx-auto mt-14 flex max-w-2xl flex-col items-center gap-8 text-center md:-mt-[7rem]"
          >
            <Reveal blur inView={bottomInView} delay={S * 1}>
              {/* Raw <p> on purpose: a one-off gradient display tagline at h3
                  size but SANS + clipped gradient fill — fits neither Text
                  (body ≤ editorial) nor the serif Heading primitive, so a
                  single-use variant would pollute a primitive for one usage. */}
              <p className="text-gradient-brevy max-w-2xl text-balance text-h3 font-semibold leading-tight">
                {hero.tagline}
              </p>
            </Reveal>
            <Reveal blur inView={bottomInView} delay={S * 2}>
              <StoreButtons
                buttons={hero.storeButtons}
                variant="store"
                align="center"
              />
            </Reveal>
          </div>
        </div>
      </Stack>

      {/* [2] progressive-blur glass — fixed to the viewport bottom */}
      <motion.div
        aria-hidden
        style={{ opacity: reduce ? 1 : bandOpacity }}
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-[var(--hero-glass-band-h)]"
      >
        <ProgressiveGlass />
      </motion.div>
    </Section>
  )
}
