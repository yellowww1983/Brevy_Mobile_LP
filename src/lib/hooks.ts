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

/**
 * True when the browser renders webm's alpha channel. Safari (desktop + iOS)
 * plays webm but paints its transparency as solid black, so it must fall back
 * to a static PNG. Returns `false` on the server and first render (→ PNG, never
 * a black box), then `true` after mount on engines that support alpha. Detection
 * finishes on mount — long before the below-the-fold clover scrolls into view —
 * so capable browsers never flash the PNG. Extend the exclusion list if another
 * engine turns up with the same limitation.
 */
export function useWebmAlpha(): boolean {
  const [supported, setSupported] = useState(false)
  useEffect(() => {
    const ua = navigator.userAgent
    const isSafari =
      /safari/i.test(ua) &&
      !/chrome|chromium|crios|android|edg|edgios|fxios|opr|opera|samsungbrowser/i.test(
        ua,
      )
    setSupported(!isSafari)
  }, [])
  return supported
}

/**
 * True when the viewport is at least `px` wide. Returns `false` on the server
 * and first render (mobile-first), then matches after mount. Used to *not mount*
 * heavy desktop-only media on phones — CSS `hidden`/`md:block` keeps the element
 * in the DOM, so a `<video autoPlay>` or `priority` image still downloads on
 * mobile; conditional rendering skips the download entirely.
 */
export function useMinWidth(px: number): boolean {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [px])
  return matches
}
