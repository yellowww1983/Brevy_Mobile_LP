"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { QrCode } from "./QrCode"
import { Icon } from "@/lib/icons"
import { EASE } from "@/lib/motion"
import { downloadModal } from "@/lib/content"

/**
 * "Scan to install" dialog behind the Download-app CTA. A frosted-glass scrim
 * over the page; the title + live QR codes (mark in each centre) sit directly on
 * the blur — no panel, no shadow — with a "Close ✕" control in the top-right
 * corner of the screen. Closed by Esc / backdrop / the corner button. Radix
 * gives focus trap + scroll lock + a11y; framer handles the fade+scale entrance
 * (scale dropped under reduced motion). Controlled from the trigger.
 */
export function DownloadModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const reduce = useReducedMotion()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[60] bg-overlay backdrop-blur-[var(--overlay-blur)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE.out }}
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              forceMount
              aria-describedby={undefined}
              // Don't yank focus onto the ✕ on open (it'd show a focus ring on a
              // mouse-opened dialog). Focus still traps here for keyboard users,
              // and Tab reveals the ✕ ring intentionally.
              onOpenAutoFocus={(e) => e.preventDefault()}
              className="fixed inset-0 z-[61] flex items-center justify-center p-4"
            >
              <motion.div
                // Content fills the viewport, so backdrop clicks land here (not
                // on the Overlay). Close when the click hits the empty area
                // itself — never when it bubbles up from the QR codes / title.
                onClick={(e) => {
                  if (e.target === e.currentTarget) onOpenChange(false)
                }}
                className="flex h-full w-full flex-col items-center justify-center gap-10 p-6"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: EASE.out }}
              >
                {/* Close — top-right corner of the screen, "Close ✕" */}
                <Dialog.Close
                  aria-label={downloadModal.close}
                  className="group absolute right-5 top-5 flex items-center gap-2 rounded-full outline-none sm:right-8 sm:top-8"
                >
                  <span className="text-micro font-medium uppercase tracking-label text-foreground-muted transition-colors group-hover:text-foreground">
                    {downloadModal.close}
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors group-hover:bg-surface-hover group-hover:text-foreground group-focus-visible:ring-2 group-focus-visible:ring-accent-deep group-focus-visible:ring-offset-2">
                    <Icon.cross className="size-4" />
                  </span>
                </Dialog.Close>

                {/* Title + QR codes, straight on the blurred backdrop */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <Dialog.Title className="text-h3 font-semibold text-foreground">
                    {downloadModal.title}
                  </Dialog.Title>
                  <p className="text-body text-foreground-muted">
                    {downloadModal.subtitle}
                  </p>
                </div>

                <div className="grid gap-10 sm:grid-cols-2 sm:gap-14">
                  {downloadModal.stores.map((store) => {
                    const StoreIcon = Icon[store.icon]
                    return (
                      <div
                        key={store.icon}
                        className="flex flex-col items-center gap-4"
                      >
                        <QrCode value={store.href} />
                        <div className="flex items-center gap-2 text-body font-medium text-foreground">
                          <StoreIcon className="size-5" />
                          {store.label}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
