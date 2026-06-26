"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Action } from "@/components/primitives"
import { Icon } from "@/lib/icons"
import { EASE } from "@/lib/motion"
import { stickyCta } from "@/lib/content"

/**
 * Sticky download band. Hidden over the hero/video; once the trigger section
 * (`stickyCta.showFrom`) scrolls into view it slides up from the bottom and
 * stays for the rest of the page. Reduced motion fades only. Visual is the
 * Figma bar — a beige pill with the store CTAs.
 */
// Show once the trigger section's top has risen past this fraction of the
// viewport (i.e. the section has entered); stay shown for everything below it.
const TRIGGER_RATIO = 0.85

export function StickyCta() {
  const [visible, setVisible] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const target = document.getElementById(stickyCta.showFrom)
    if (!target) return
    let raf = 0
    const update = () =>
      setVisible(
        target.getBoundingClientRect().top < window.innerHeight * TRIGGER_RATIO,
      )
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
  }, [])

  return (
    // Static wrapper: no transform here, or it would isolate the pill's
    // backdrop-filter (the glass would compute but render nothing).
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-5">
      <motion.div
        aria-hidden={!visible}
        className={cn(
          "flex max-w-full items-center gap-2 rounded-2xl bg-surface/70 p-2 shadow-lg backdrop-blur-[var(--nav-glass-blur)]",
          visible ? "pointer-events-auto" : "pointer-events-none",
        )}
        initial={false}
        animate={
          reduce
            ? { opacity: visible ? 1 : 0 }
            : { y: visible ? 0 : 24, opacity: visible ? 1 : 0 }
        }
        transition={{ duration: 0.4, ease: EASE.out }}
      >
        <Action variant="store" size="lg" href={stickyCta.primary.href}>
          {stickyCta.primary.label}
        </Action>
        {stickyCta.stores.map((store) => {
          const StoreIcon = Icon[store.icon]
          return (
            <a
              key={store.icon}
              href={store.href}
              aria-label={store.label}
              className="flex size-12 shrink-0 items-center justify-center rounded-leaf border border-accent-deep bg-background text-accent-deep transition-colors hover:bg-accent-deep hover:text-foreground-inverse-muted"
            >
              <StoreIcon className="size-6" />
            </a>
          )
        })}
      </motion.div>
    </div>
  )
}
