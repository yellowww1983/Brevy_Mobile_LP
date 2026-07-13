"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { grow, EASE } from "@/lib/motion"
import { Action } from "@/components/primitives"
import { Logo } from "@/components/patterns"
import { Icon } from "@/lib/icons"
import { nav } from "@/lib/content"

const ChatIcon = Icon.chat
const MenuIcon = Icon.menu
const CloseIcon = Icon.cross

// Brevy clover mark (gradient SVG), bled into the banner corners as decor.
// Fixed 96x96 (the mark's native size) so it never stretches on resize.
const leaf =
  "pointer-events-none absolute size-24 bg-[url('/decor/banner-leaf.svg')] bg-contain bg-no-repeat"

/**
 * Announcement banner + floating beige pill nav (sticky). At the top it's the
 * Figma pill; once scrolled past the threshold it turns to glass (translucent
 * surface + backdrop-blur of the content sliding behind it).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduce = useReducedMotion()

  // Corner leaves sprout in on load (origin-anchored, slight overshoot).
  const sprout = (delay: number) =>
    reduce
      ? {}
      : {
          variants: grow,
          initial: "hidden" as const,
          animate: "visible" as const,
          transition: { duration: 0.7, ease: EASE.outBack, delay },
        }

  useEffect(() => {
    const threshold =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--nav-scroll-threshold",
        ),
      ) || 90
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // While the mobile menu is open: lock body scroll and close on Escape.
  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  return (
    <>
      <div className="relative overflow-hidden bg-surface-inverse">
        <motion.span
          aria-hidden
          className={cn(leaf, "left-[-59px] top-[8px] origin-top-left")}
          {...sprout(0)}
        />
        <motion.span
          aria-hidden
          className={cn(leaf, "right-[-58px] top-[-56px] origin-top-right")}
          {...sprout(0.1)}
        />
        <p className="relative z-10 px-4 py-3 text-center text-body text-foreground-inverse">
          <span className="hidden sm:inline">{nav.announcement.lead} </span>
          {nav.announcement.prefix}{" "}
          {nav.announcement.platforms.map((platform, i) => (
            <span key={platform}>
              <span className="text-foreground-inverse-muted">{platform}</span>
              {i < nav.announcement.platforms.length - 1
                ? ` ${nav.announcement.conjunction} `
                : ""}
            </span>
          ))}
        </p>
      </div>

      {/* pt sets the gap above the pill; -mb pulls the hero up by the full
          header height so the sticky nav overlays it. Mobile uses a smaller
          gap so the pill sits closer to the top once the banner scrolls away. */}
      <header
        className={cn(
          "section-gutter sticky top-0 z-50 -mb-[88px] pt-4 md:-mb-[112px] md:pt-10",
          // While the mobile menu is open, pin the pill to the very top so it
          // never sits under the (now-hidden) banner — no scroll-dependent jump.
          menuOpen && "!fixed inset-x-0 !top-0",
        )}
      >
        <nav
          className={cn(
            "mx-auto flex w-full max-w-[816px] items-center justify-between rounded-full px-6 py-4 transition-[background-color,box-shadow,backdrop-filter] duration-[var(--duration-base)] ease-[var(--ease-out)]",
            scrolled
              ? "bg-surface/70 shadow-lg backdrop-blur-[var(--nav-glass-blur)]"
              : "bg-surface shadow-navbar backdrop-blur-0",
          )}
        >
          <Logo />

          <div className="flex items-center md:gap-2">
            <div className="hidden items-center md:flex">
              {nav.links.map((link) => (
                <Action
                  key={link.href}
                  variant="ghost"
                  size="sm"
                  href={link.href}
                >
                  {link.label}
                </Action>
              ))}
            </div>

            {/* Desktop: "New chat" slides in once scrolled past the hero. */}
            <div className="hidden md:block">
              <AnimatePresence>
                {scrolled && (
                  <motion.div
                    key="new-chat"
                    initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? {} : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: EASE.out }}
                  >
                    <Action variant="talk" size="sm" href={nav.cta.href}>
                      <ChatIcon className="size-5" />
                      {nav.cta.label}
                    </Action>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile: hamburger toggles the full-screen menu (turns into ✕). */}
            <button
              type="button"
              aria-label={menuOpen ? nav.menu.close : nav.menu.label}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border-pill text-foreground transition-colors hover:bg-surface-hover md:hidden"
            >
              {menuOpen ? (
                <CloseIcon className="size-6" />
              ) : (
                <MenuIcon className="size-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — full-screen panel under the nav (Figma 22687-2120): the
          links as large text up top, "New chat" pinned at the bottom, over a
          beige→white wash with the faint mountains. The nav pill (z-50) stays
          above it and holds the ✕. Desktop never renders it. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            // z-[46]: above the hero's progressive-glass + sticky CTA (z-40) AND
            // the hero clover badge (z-45, later in the DOM so it would paint
            // over an equal z), but below the nav pill (z-50) that holds the ✕.
            className="fixed inset-0 z-[46] flex flex-col overflow-hidden bg-gradient-to-b from-surface to-background md:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? {} : { opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE.out }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-16 top-40 bg-[url('/decor/menu-mountains.webp')] bg-cover bg-[position:65%_50%] bg-no-repeat"
            />
            <nav className="relative z-10 flex flex-col px-8 pt-32">
              {nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-12 items-center text-editorial font-medium text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="relative z-10 mt-auto px-4 pb-4">
              <Action
                variant="talk"
                size="lg"
                href={nav.cta.href}
                className="w-full"
              >
                <ChatIcon className="size-6" />
                {nav.cta.label}
              </Action>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
