"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { grow, EASE } from "@/lib/motion"
import { Action } from "@/components/primitives"
import { Logo } from "@/components/patterns"
import { nav } from "@/lib/content"

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
          {nav.announcement.prefix}{" "}
          {nav.announcement.platforms.map((platform, i) => (
            <span key={platform}>
              <span className="text-foreground-inverse-muted">{platform}</span>
              {i < nav.announcement.platforms.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>

      {/* pt sets the gap above the pill; -mb pulls the hero up by the full
          header height so the sticky nav overlays it. Mobile uses a smaller
          gap so the pill sits closer to the top once the banner scrolls away. */}
      <header className="section-gutter sticky top-0 z-50 -mb-[88px] pt-4 md:-mb-[112px] md:pt-10">
        <nav
          className={cn(
            "mx-auto flex w-full max-w-[816px] items-center justify-between rounded-lg px-6 py-4 transition-[background-color,box-shadow,backdrop-filter] duration-[var(--duration-base)] ease-[var(--ease-out)]",
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
            <Action variant="talk" size="sm" href={nav.cta.href}>
              {nav.cta.label}
            </Action>
          </div>
        </nav>
      </header>
    </>
  )
}
