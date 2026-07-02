"use client"

import { type DependencyList, useEffect, useState } from "react"
import { readCssVar } from "@/lib/utils"

/**
 * Read a numeric CSS custom property into state, hydrating once after mount.
 * Returns `fallback` on the server and the first client render, then the
 * resolved token value — exactly the useState(fallback)+useEffect(readCssVar)
 * pattern this replaces, so timing (paint with fallback → hydrate) is unchanged.
 */
export function useCssVar(token: string, fallback: number): number {
  const [value, setValue] = useState(fallback)
  useEffect(() => setValue(readCssVar(token, fallback)), [token, fallback])
  return value
}

/**
 * Run `onScroll` on scroll and resize, rAF-throttled, plus once on mount, with
 * teardown. Only the event plumbing — the callback reads position itself
 * (getBoundingClientRect / scrollY) and sets whatever state it owns. Deliberately
 * NOT built on framer `useScroll`: the callers read getBoundingClientRect, which
 * is accurate under Lenis's native scroll, and switching sources risks a lag
 * between progress and the visible position. `deps` captures the values the
 * callback closes over (matches the effects this replaces).
 */
export function useScrollEffect(onScroll: () => void, deps: DependencyList = []) {
  useEffect(() => {
    let raf = 0
    const run = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(onScroll)
    }
    onScroll()
    window.addEventListener("scroll", run, { passive: true })
    window.addEventListener("resize", run, { passive: true })
    return () => {
      window.removeEventListener("scroll", run)
      window.removeEventListener("resize", run)
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
