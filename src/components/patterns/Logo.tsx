import { cn } from "@/lib/utils"

type LogoProps = {
  tone?: "default" | "inverse"
  className?: string
}

/**
 * Brevy lockup: clover mark (40px gradient-free brand SVG) + "Brevy"
 * wordmark in Hedvig. Mark served as background-image (crisp SVG, no
 * image optimizer). Wordmark is Hedvig green; swap for the official
 * logotype SVG when the brand pack lands.
 */
export function Logo({ tone = "default", className }: LogoProps) {
  const inverse = tone === "inverse"

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden
        className="size-10 shrink-0 bg-[url('/brand/brevy-mark.svg')] bg-contain bg-center bg-no-repeat"
      />
      <span
        className={cn(
          "font-display text-h3 leading-none",
          inverse ? "text-foreground-inverse" : "text-accent",
        )}
      >
        Brevy
      </span>
    </span>
  )
}
