"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Icon } from "@/lib/icons"
import { readCssVar } from "@/lib/utils"
import { onboarding } from "@/lib/content"

const Eye = Icon.eye
const ScanFace = Icon.scanFace

/**
 * Step 1 mock. On scroll-in, a password types itself in dot-by-dot; once full,
 * the Face ID glyph runs a gentle scan loop. Reduced motion shows the filled
 * field statically with no scan.
 */
export function PasskeyMock() {
  const { input, dots, calloutLabel, callout, button } = onboarding.passkey
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })
  const reduce = useReducedMotion()
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    if (reduce) {
      setTyped(dots)
      return
    }
    if (!inView) return
    const speed = readCssVar("--step1-type-speed", 120)
    let n = 0
    const id = setInterval(() => {
      n += 1
      setTyped(n)
      if (n >= dots) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [inView, reduce, dots])

  const scanning = !reduce && typed >= dots

  return (
    <div ref={ref} className="flex w-full flex-col gap-4">
      <div className="flex h-12 items-center gap-1 rounded-field border border-border-field bg-background px-3 shadow-sm">
        <span className="flex flex-1 items-center gap-1.5 overflow-hidden">
          {typed === 0 ? (
            <span className="truncate text-body text-foreground-subtle">
              {input}
            </span>
          ) : (
            Array.from({ length: typed }).map((_, i) => (
              <span
                key={i}
                aria-hidden
                className="size-2.5 shrink-0 rounded-full bg-foreground"
              />
            ))
          )}
        </span>
        <Eye className="size-4 shrink-0 text-foreground-subtle" />
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-positive-edge bg-gradient-to-b from-positive-ring to-surface p-3">
        {/* next/image (q90 WebP/AVIF) instead of a raw-PNG CSS background — the
            188 KiB source is served resized + re-encoded for an 80px avatar. */}
        <span className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-background">
          <Image
            src="/onboarding/passkey-face.png"
            alt=""
            aria-hidden
            fill
            sizes="80px"
            quality={90}
            className="object-cover object-center"
          />
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-label font-semibold uppercase leading-4 text-accent-deep">
            {calloutLabel}
          </span>
          <span className="text-small leading-5 text-foreground-muted">
            {callout}
          </span>
        </span>
      </div>

      <div className="flex h-12 w-full items-center justify-center gap-2 rounded-leaf bg-accent-deep px-4 text-foreground-inverse-muted shadow-sm">
        <span className="relative flex size-6 shrink-0 items-center justify-center overflow-hidden">
          <ScanFace className="size-6" />
          {scanning && (
            <motion.span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px] rounded-full bg-foreground-inverse-muted"
              initial={{ y: 2, opacity: 0 }}
              animate={{ y: [2, 22, 2], opacity: [0, 0.9, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </span>
        <span className="text-body">{button}</span>
      </div>
    </div>
  )
}
