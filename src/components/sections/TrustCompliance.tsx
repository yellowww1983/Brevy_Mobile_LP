"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Section, Stack, Reveal } from "@/components/primitives"
import { SectionHeader } from "@/components/patterns"
import { cn } from "@/lib/utils"
import { EASE } from "@/lib/motion"
import { useCssVar, useMinWidth } from "@/lib/hooks"
import { trust, assets } from "@/lib/content"

// Crisp badge circle (Figma 25072-1043): 1px olive border, white→olive-200
// gradient face, soft drop shadow. Drawn as a DOM element so the edge stays
// sharp at any size/DPR — the icon SVG sits centred inside it.
const badgeFace =
  "grid place-items-center rounded-full border border-badge-border bg-gradient-to-b from-background to-surface-soft shadow-badge"

// Figma 25072-1043: each glyph is 64px wide inside the 128px circle (= 50%),
// with per-icon heights — pass the real intrinsic size so the aspect is kept.
const ICON_DIM: Record<string, { w: number; h: number }> = {
  "/evv-icon.svg": { w: 64, h: 39 },
  "/2fa-icon.svg": { w: 64, h: 54 },
  "/data-icon.svg": { w: 64, h: 59 },
  "/brevy-icon.svg": { w: 64, h: 64 },
}

function BadgeIcon({ src }: { src: string }) {
  const dim = ICON_DIM[src] ?? { w: 64, h: 64 }
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={dim.w}
      height={dim.h}
      unoptimized
      className="h-auto w-1/2"
    />
  )
}

// Item x-centres as a % of the 1200-wide stage (Figma 25073), mirrored for even
// left/right spacing — outer pair at ±42.9%, inner pair at ±20.8% of centre.
const ITEM_X = ["7.08%", "29.17%", "70.83%", "92.92%"] as const
// Slide-in start offset (% of the badge's own width) that parks each circle
// behind the shield centre (50%): (50 − ITEM_X) ÷ 27.3 (badge width %) × 100.
const SLIDE_FROM = ["157%", "76%", "-76%", "-157%"] as const
// Stagger ring: the inner pair (2fa/data) leads, the outer pair (evv/brevy)
// follows — nearer circles emerge from behind the shield first.
const RING = [1, 0, 0, 1] as const

/**
 * Section #7 "Trust & compliance". A glass shield sits centre stage; on scroll
 * into view the four trust badges slide out from behind it along the signal
 * lines (inner pair first, then outer), and each label fades up once its circle
 * lands. The shield stays above the badges the whole time, so they appear to
 * emerge from behind its edges. Reduced motion shows everything in place.
 */
export function TrustCompliance() {
  const reduce = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, { once: true, margin: "-15%" })

  const slide = useCssVar("--trust-slide-ms", 700)
  const stagger = useCssVar("--trust-stagger-ms", 120)
  const label = useCssVar("--trust-label-ms", 400)
  const rise = useCssVar("--trust-label-rise", 8)
  // Only mount the desktop shield (w=1200, ~278 KiB) on ≥ lg — its `priority`
  // otherwise downloads it on mobile even though the desktop stage is CSS-hidden.
  const isLg = useMinWidth(1024)

  const show = reduce || inView

  return (
    <Section
      id="trust"
      surface="gradient"
      rhythm="content"
      className="scroll-mt-24"
    >
      <Stack size="xl" align="center">
        <Reveal blur>
          <SectionHeader
            chip
            kicker={trust.kicker}
            title={
              <>
                {trust.title[0]}
                <br />
                {trust.title[1]}
              </>
            }
          />
        </Reveal>

        {/* Desktop stage — 1:1 Figma composition + slide-out entrance */}
        <div
          ref={stageRef}
          className="relative mx-auto hidden aspect-[1200/410] w-full max-w-[var(--container-max)] lg:block"
        >
          {/* signal lines (behind everything) — a fixed 51px band centred on the
              badge midline holds exactly 3 lines at 25px pitch (Figma 25072-1047) */}
          <div className="trust-lines trust-lines-out-left pointer-events-none absolute left-0 top-[47.7%] z-0 h-[51px] w-[calc(50%-1px)] -translate-y-1/2" />
          <div className="trust-lines trust-lines-out-right pointer-events-none absolute right-0 top-[47.7%] z-0 h-[51px] w-[calc(50%-1px)] -translate-y-1/2" />

          {/* trust badges — slide out from behind the shield along the lines */}
          {trust.items.map((item, i) => (
            <div
              key={item.icon}
              style={{ left: ITEM_X[i] }}
              className="absolute top-[47.8%] z-[1] aspect-square w-[27.3%] -translate-x-1/2 -translate-y-[33.8%]"
            >
              <motion.div
                className="relative size-full"
                initial={reduce ? false : { x: SLIDE_FROM[i] }}
                animate={{ x: show ? "0%" : SLIDE_FROM[i] }}
                transition={{
                  duration: reduce ? 0 : slide / 1000,
                  delay: reduce ? 0 : (RING[i] * stagger) / 1000,
                  ease: EASE.outBack,
                }}
              >
                {/* circle sits where the source SVG's circle did: 50% / 33.8%,
                    39% of the box (= the 128px Figma badge on the 328 stage) */}
                <span
                  className={cn(
                    badgeFace,
                    "absolute left-1/2 top-[33.8%] aspect-square w-[39%] -translate-x-1/2 -translate-y-1/2",
                  )}
                >
                  <BadgeIcon src={assets.trust[item.icon]} />
                </span>
              </motion.div>
            </div>
          ))}

          {/* shield (centre) — above the badges so they emerge from behind it.
              Mounted only on ≥ lg (never downloads on mobile). No `priority`:
              it's below the fold, not the LCP, so it shouldn't compete for
              bandwidth — it lazy-loads as the section scrolls in. */}
          {isLg && (
          <Image
            src={assets.trust.shield}
            alt="Brevy security shield"
            width={2104}
            height={2212}
            sizes="40rem"
            className="absolute left-1/2 top-1/2 z-10 w-[52%] -translate-x-1/2 -translate-y-[44%]"
          />
          )}

          {/* labels — fade up once each badge has landed */}
          {trust.items.map((item, i) => {
            const landMs = RING[i] * stagger + slide
            return (
              <div
                key={item.label}
                style={{ left: ITEM_X[i] }}
                className="absolute top-[71.7%] z-20 -translate-x-1/2 whitespace-nowrap text-center"
              >
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: rise }}
                  animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: rise }}
                  transition={{
                    duration: reduce ? 0 : label / 1000,
                    delay: reduce ? 0 : landMs / 1000 + 0.05,
                    ease: EASE.out,
                  }}
                >
                  <span className="block text-body font-medium text-foreground">
                    {item.label}
                  </span>
                  {"subLabel" in item && item.subLabel && (
                    <span className="mt-0.5 block text-micro font-medium text-foreground-muted">
                      {item.subLabel}
                    </span>
                  )}
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* Mobile — shield over a 2×2 badge grid */}
        <Reveal blur delay={0.1} className="w-full lg:hidden">
          <div className="flex flex-col items-center gap-6">
            <Image
              src={assets.trust.shield}
              alt="Brevy security shield"
              width={2104}
              height={2212}
              sizes="16rem"
              className="h-auto w-[64%] max-w-[15rem]"
            />
            <div className="grid w-full max-w-[22rem] grid-cols-2 gap-x-6 gap-y-8">
              {trust.items.map((item) => (
                <div
                  key={item.icon}
                  className="flex flex-col items-center gap-3"
                >
                  <span className={cn(badgeFace, "size-28")}>
                    <BadgeIcon src={assets.trust[item.icon]} />
                  </span>
                  <span className="text-center text-small font-medium text-foreground">
                    {item.label}
                  </span>
                  {"subLabel" in item && item.subLabel && (
                    <span className="text-center text-micro font-medium text-foreground-muted">
                      {item.subLabel}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Stack>
    </Section>
  )
}
