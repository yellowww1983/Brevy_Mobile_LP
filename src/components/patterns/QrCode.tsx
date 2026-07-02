"use client"

import { QRCodeSVG } from "qrcode.react"
import { BrevyMark } from "@/lib/brand-icons"

// 1×1 transparent GIF. qrcode.react needs an image src to excavate the centre
// modules; the visible mark is our own overlay on top, so this placeholder just
// clears the space (error-correction level H keeps the code scannable).
const CLEAR =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

/**
 * Brand QR code. The value (a store URL) is encoded live — swap the link in
 * links.ts and the code regenerates, no asset to redraw. Foreground/background
 * pull from tokens; the green Brevy mark sits on a white tile over the
 * excavated centre.
 */
export function QrCode({ value, size = 176 }: { value: string; size?: number }) {
  const tile = Math.round(size * 0.24)
  return (
    <div className="relative text-foreground" style={{ width: size, height: size }}>
      <QRCodeSVG
        value={value}
        size={size}
        level="H"
        marginSize={0}
        bgColor="transparent"
        fgColor="currentColor"
        imageSettings={{ src: CLEAR, height: tile, width: tile, excavate: true }}
      />
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[var(--radius-md)] bg-background p-1.5"
        style={{ width: tile, height: tile }}
      >
        <BrevyMark className="size-full text-accent" />
      </span>
    </div>
  )
}
