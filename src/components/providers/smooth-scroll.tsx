"use client"

import { type ReactNode, useEffect } from "react"
import Lenis from "lenis"

/**
 * Lenis smooth scroll, mounted once at the root. Respects the user's
 * reduced-motion preference by skipping initialization entirely.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (prefersReduced) return

    const lenis = new Lenis({ duration: 1.1 })
    let frame = 0

    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
