"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useScrollEffect } from "@/lib/hooks"
import { Action } from "@/components/primitives"
import { DownloadModal } from "@/components/patterns"
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
// …but hide again once the Final CTA section enters, so the band doesn't double
// up over the real call to action.
const HIDE_RATIO = 0.9

export function StickyCta() {
  const [visible, setVisible] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const reduce = useReducedMotion()

  useScrollEffect(() => {
    const trigger = document.getElementById(stickyCta.showFrom)
    const hideEl = document.getElementById(stickyCta.hideAt)
    const vh = window.innerHeight
    const entered = trigger
      ? trigger.getBoundingClientRect().top < vh * TRIGGER_RATIO
      : false
    const finalInView = hideEl
      ? hideEl.getBoundingClientRect().top < vh * HIDE_RATIO
      : false
    setVisible(entered && !finalInView)
  })

  return (
    <>
    {/* Static wrapper: no transform here, or it would isolate the pill's
        backdrop-filter (the glass would compute but render nothing). */}
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-5">
      <motion.div
        aria-hidden={!visible}
        // `inert` while hidden: opacity-0 doesn't remove the CTA button / store
        // links from the tab order, so a keyboard/agent could focus into the
        // invisible band. inert pulls the whole subtree out of tab order + the
        // a11y tree in one shot. No visual effect.
        inert={!visible}
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
        <Action
          variant="store"
          size="lg"
          onClick={() => setDownloadOpen(true)}
        >
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
    <DownloadModal open={downloadOpen} onOpenChange={setDownloadOpen} />
    </>
  )
}
