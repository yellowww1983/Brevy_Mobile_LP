import type { ComponentProps, ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type ActionVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "inverse"
  | "store"
  | "talk"
  | "join"
type ActionSize = "sm" | "md" | "lg"

type BaseProps = {
  variant?: ActionVariant
  size?: ActionSize
  className?: string // position only, never color/size of the control
  children: ReactNode
}

type LinkProps = BaseProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className"
  >

type ButtonProps = BaseProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className"
  >

type ActionProps = LinkProps | ButtonProps

const base =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors disabled:opacity-50 disabled:pointer-events-none"

const variantMap = {
  primary:
    "rounded-full bg-accent text-accent-foreground hover:bg-accent-hover shadow-sm",
  secondary:
    "rounded-full bg-background text-foreground border border-border hover:border-border-soft",
  // Nav text links: zinc-800, soft 10px corner, regular weight, subtle hover.
  ghost: "rounded-md font-normal text-foreground hover:bg-surface-hover",
  inverse:
    "rounded-full bg-background text-foreground hover:bg-surface-soft shadow-sm",
  // Hero download buttons: white field, emerald outline/text, leaf corners.
  // Hover (Figma 22912-1956): solid emerald fill with olive label + icon
  // (icon inherits via currentColor). Border stays emerald, blends into fill.
  store:
    "rounded-leaf bg-background text-accent-deep border border-accent-deep hover:bg-accent-deep hover:text-foreground-inverse-muted",
  // Nav "Talk to us": filled emerald with olive text, Figma leaf corners.
  // Hover (Figma): white fill + emerald outline + emerald label. The border
  // is always present (blends with the emerald fill at rest = no shift).
  talk: "rounded-leaf border border-accent-deep font-normal bg-accent-deep text-foreground-inverse-muted hover:bg-background hover:text-accent-deep",
  // Final-CTA on the dark card: the inverse of `talk` — olive fill, emerald
  // label, leaf corners. Hover lightens the fill to white.
  join: "rounded-leaf font-normal bg-surface-olive text-accent-deep hover:bg-background",
} as const

const sizeMap = {
  sm: "h-9 px-4 text-body",
  md: "h-10 px-5 text-small",
  lg: "h-12 px-7 text-body",
} as const

/** The only way to render a link or button CTA. Closed variants/sizes. */
export function Action({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ActionProps) {
  const classes = cn(base, variantMap[variant], sizeMap[size], className)

  if (props.href !== undefined) {
    return (
      <Link className={classes} {...(props as LinkProps)}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(props as ButtonProps)}>
      {children}
    </button>
  )
}
