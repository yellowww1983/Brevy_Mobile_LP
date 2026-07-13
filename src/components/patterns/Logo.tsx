import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
}

/**
 * Brevy lockup — the official logotype SVG (clover mark + "Brevy" wordmark,
 * Figma 24930-585 / 25188:691). Served as a background-image so the SVG stays
 * crisp (no image optimizer). 115×40 natural, rendered at 40px tall.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span
      role="img"
      aria-label="Brevy"
      className={cn(
        "block h-10 w-[115px] bg-[url('/logo.svg')] bg-contain bg-left bg-no-repeat",
        className,
      )}
    />
  )
}
