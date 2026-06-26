"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"

type FuzzyTextProps = {
  children: string
  /** Fuzz amount; higher = noisier horizontal jitter. */
  baseIntensity?: number
}

/**
 * Canvas VHS-noise text. Inherits font (size/family/weight) and color from
 * its computed style, so it matches the surrounding sentence 1:1 — drop it
 * inline and set the font/color on the parent. Aligns its text baseline to
 * the line via a measured vertical-align so it sits cleanly amongst plain
 * words. Reduced motion renders the word as static text (no canvas).
 */
export function FuzzyText({ children, baseIntensity = 0.18 }: FuzzyTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [valign, setValign] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    let raf = 0
    let cancelled = false
    const canvas = canvasRef.current
    if (!canvas) return

    const run = async () => {
      if (document.fonts?.ready) await document.fonts.ready
      if (cancelled || !canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const cs = getComputedStyle(canvas)
      const font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
      const color = cs.color
      const text = children

      // Offscreen: draw the word tight to its ink bounds.
      const off = document.createElement("canvas")
      const octx = off.getContext("2d")
      if (!octx) return
      octx.font = font
      octx.textBaseline = "alphabetic"
      const m = octx.measureText(text)
      const px = parseFloat(cs.fontSize)
      const ascent = Math.ceil(m.actualBoundingBoxAscent || px * 0.8)
      const descent = Math.ceil(m.actualBoundingBoxDescent || px * 0.2)
      const left = Math.ceil(m.actualBoundingBoxLeft || 0)
      const right = Math.ceil(m.actualBoundingBoxRight || m.width)
      const pad = 4
      off.width = left + right + pad * 2
      off.height = ascent + descent + pad * 2
      const ox = pad + left
      const oy = pad + ascent
      octx.font = font
      octx.textBaseline = "alphabetic"
      octx.fillStyle = color
      octx.fillText(text, ox, oy)

      // Visible canvas: room on the sides for the horizontal jitter.
      const hMargin = 10
      const cw = off.width + hMargin * 2
      const ch = off.height
      canvas.width = cw
      canvas.height = ch
      canvas.style.width = `${cw}px`
      canvas.style.height = `${ch}px`
      ctx.translate(hMargin, 0)

      // Text baseline sits `oy` from the canvas top; align it to the line.
      setValign(-(ch - oy))

      const fuzzRange = 30
      const draw = () => {
        if (cancelled) return
        ctx.clearRect(-hMargin, 0, cw, ch)
        for (let j = 0; j < off.height; j++) {
          const dx = Math.floor(baseIntensity * (Math.random() - 0.5) * fuzzRange)
          ctx.drawImage(off, 0, j, off.width, 1, dx, j, off.width, 1)
        }
        raf = requestAnimationFrame(draw)
      }
      draw()
    }

    run()
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [children, baseIntensity, reduce])

  if (reduce) return <span>{children}</span>

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={children}
      className="inline-block [margin-inline:-10px]"
      style={{ verticalAlign: `${valign}px` }}
    />
  )
}
