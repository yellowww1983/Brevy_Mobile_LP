"use client"

import { useEffect, useState } from "react"
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
