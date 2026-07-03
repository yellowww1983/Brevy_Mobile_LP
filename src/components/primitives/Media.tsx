import Image from "next/image"
import { cn } from "@/lib/utils"

type MediaProps = {
  src: string
  alt: string
  aspect?: "square" | "video" | "portrait" | "phone" | "natural" | "auto"
  width?: number // required for aspect="natural"
  height?: number // required for aspect="natural"
  rounded?: "none" | "md" | "lg"
  priority?: boolean
  /**
   * Loading hint for non-priority images. "eager" fetches on mount without the
   * priority treatment (no preload link, no high fetch-priority) — used to warm
   * the carousel's off-screen views so a crossfade never flickers, while keeping
   * only the true LCP image at `priority`.
   */
  loading?: "eager" | "lazy"
  /** Fetch priority hint — set "high" on the LCP image so it wins the race. */
  fetchPriority?: "high" | "low" | "auto"
  sizes?: string
  className?: string // position / max-width only
}

const aspectMap = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  phone: "aspect-[9/19]",
  natural: "",
  auto: "",
} as const

const roundedMap = {
  none: "",
  md: "rounded-md",
  lg: "rounded-lg",
} as const

/**
 * The only way to render an image in a section. Wraps next/image.
 * - aspect="natural": shows the whole image at its own ratio (no crop);
 *   pass width/height. Use for finished mockups (e.g. the hero phone).
 * - other aspects: object-cover inside a fixed ratio box.
 * Empty `src` renders a labelled placeholder so sections compose now and
 * assets drop in 1:1 later.
 */
export function Media({
  src,
  alt,
  aspect = "video",
  width,
  height,
  rounded = "lg",
  priority = false,
  loading,
  fetchPriority,
  sizes = "100vw",
  className,
}: MediaProps) {
  if (aspect === "natural") {
    if (!src) {
      return (
        <div
          style={width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
          className={cn(
            "flex items-center justify-center border border-border-soft bg-surface-soft",
            roundedMap[rounded],
            className,
          )}
        >
          <span className="px-4 text-center text-label uppercase tracking-label text-foreground-subtle">
            {alt}
          </span>
        </div>
      )
    }
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? undefined : loading}
        fetchPriority={fetchPriority}
        sizes={sizes}
        className={cn("h-auto w-full", roundedMap[rounded], className)}
      />
    )
  }

  const shape = cn(
    "relative w-full overflow-hidden",
    aspectMap[aspect],
    roundedMap[rounded],
    className,
  )

  if (!src) {
    return (
      <div
        className={cn(
          shape,
          "flex items-center justify-center border border-border-soft bg-surface-soft",
        )}
      >
        <span className="px-4 text-center text-label uppercase tracking-label text-foreground-subtle">
          {alt}
        </span>
      </div>
    )
  }

  return (
    <div className={shape}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : loading}
        fetchPriority={fetchPriority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  )
}
