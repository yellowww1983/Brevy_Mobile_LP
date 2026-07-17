"use client"

import { useState } from "react"

import { Media, Text } from "@/components/primitives"
import { Icon } from "@/lib/icons"

type VideoPlayerProps = {
  label: string
  src: string
  poster?: string
}

const Play = Icon.play

/**
 * App-tour player surface. Until the viewer clicks, it shows a deep emerald
 * cover with a centered clover watermark and a gradient play affordance that
 * gently pulses to invite a click. On click the cover is swapped for the
 * actual <video>, which mounts (and only then downloads) and starts playing —
 * so the file never loads until it's asked for.
 */
export function VideoPlayer({ label, src, poster = "" }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-surface-inverse">
      {playing ? (
        <video
          src={src}
          poster={poster || undefined}
          controls
          autoPlay
          playsInline
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <>
          {poster && (
            <Media
              src={poster}
              alt={label}
              aspect="auto"
              rounded="none"
              className="absolute inset-0 h-full"
            />
          )}

          {/* centered clover watermark */}
          <span
            aria-hidden
            className="absolute inset-x-[32%] inset-y-[19%] bg-[url('/decor/video-logo.svg')] bg-contain bg-center bg-no-repeat"
          />

          <button
            type="button"
            aria-label={label}
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-5"
          >
            <span className="relative flex items-center justify-center">
              {/* static halo + pulsing invite ring */}
              <span
                aria-hidden
                className="absolute size-28 rounded-full bg-accent-subtle opacity-10"
              />
              <span
                aria-hidden
                className="play-ping absolute size-28 rounded-full border border-accent-subtle"
              />
              {/* play button (Figma: olive gradient, dark olive outline, xs shadow).
                  Grows slightly on hover to confirm it's interactive. */}
              <span className="relative flex size-[88px] items-center justify-center rounded-full border border-play-edge bg-gradient-to-b from-surface-olive to-border-soft shadow-sm transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:scale-110">
                <Play className="size-6 fill-current text-accent-deep" />
              </span>
            </span>
            <Text as="span" tone="inverse-muted" className="font-medium">
              {label}
            </Text>
          </button>
        </>
      )}
    </div>
  )
}
