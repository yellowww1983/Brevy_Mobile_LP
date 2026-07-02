"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Section, Stack, Reveal } from "@/components/primitives"
import { SectionHeader } from "@/components/patterns"
import { EASE } from "@/lib/motion"
import { readCssVar } from "@/lib/utils"
import { trust, assets } from "@/lib/content"

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

  const [t, setT] = useState({ slide: 700, stagger: 120, label: 400, rise: 8 })
  useEffect(() => {
    setT({
      slide: readCssVar("--trust-slide-ms", 700),
      stagger: readCssVar("--trust-stagger-ms", 120),
      label: readCssVar("--trust-label-ms", 400),
      rise: readCssVar("--trust-label-rise", 8),
    })
  }, [])

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
          {/* signal lines (behind everything) */}
          <div className="trust-lines trust-lines-out-left pointer-events-none absolute left-0 top-[37.3%] z-0 h-[20.7%] w-[calc(50%-1px)]" />
          <div className="trust-lines trust-lines-out-right pointer-events-none absolute right-0 top-[37.3%] z-0 h-[20.7%] w-[calc(50%-1px)]" />

          {/* trust badges — slide out from behind the shield along the lines */}
          {trust.items.map((item, i) => (
            <div
              key={item.icon}
              style={{ left: ITEM_X[i] }}
              className="absolute top-[47.8%] z-[1] w-[27.3%] -translate-x-1/2 -translate-y-[33.8%]"
            >
              <motion.div
                initial={reduce ? false : { x: SLIDE_FROM[i] }}
                animate={{ x: show ? "0%" : SLIDE_FROM[i] }}
                transition={{
                  duration: reduce ? 0 : t.slide / 1000,
                  delay: reduce ? 0 : (RING[i] * t.stagger) / 1000,
                  ease: EASE.outBack,
                }}
              >
                <Image
                  src={assets.trust[item.icon]}
                  alt=""
                  aria-hidden
                  width={328}
                  height={328}
                  unoptimized
                  className="w-full"
                />
              </motion.div>
            </div>
          ))}

          {/* shield (centre) — above the badges so they emerge from behind it */}
          <Image
            src={assets.trust.shield}
            alt="Brevy security shield"
            width={2104}
            height={2212}
            priority
            sizes="40rem"
            className="absolute left-1/2 top-1/2 z-10 w-[52%] -translate-x-1/2 -translate-y-[44%]"
          />

          {/* labels — fade up once each badge has landed */}
          {trust.items.map((item, i) => {
            const landMs = RING[i] * t.stagger + t.slide
            return (
              <div
                key={item.label}
                style={{ left: ITEM_X[i] }}
                className="absolute top-[71.7%] z-20 -translate-x-1/2 whitespace-nowrap text-center"
              >
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: t.rise }}
                  animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: t.rise }}
                  transition={{
                    duration: reduce ? 0 : t.label / 1000,
                    delay: reduce ? 0 : landMs / 1000 + 0.05,
                    ease: EASE.out,
                  }}
                >
                  <span className="block text-body font-medium text-foreground">
                    {item.label}
                  </span>
                  {"subLabel" in item && item.subLabel && (
                    <span className="mt-0.5 block text-xs font-medium text-foreground-muted">
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
            <div className="grid w-full max-w-[22rem] grid-cols-2 gap-x-6">
              {trust.items.map((item) => (
                <div key={item.icon} className="flex flex-col items-center">
                  <Image
                    src={assets.trust[item.icon]}
                    alt=""
                    aria-hidden
                    width={328}
                    height={328}
                    unoptimized
                    className="h-auto w-[9rem]"
                  />
                  <span className="-mt-12 text-center text-small font-medium text-foreground">
                    {item.label}
                  </span>
                  {"subLabel" in item && item.subLabel && (
                    <span className="text-center text-xs font-medium text-foreground-muted">
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
