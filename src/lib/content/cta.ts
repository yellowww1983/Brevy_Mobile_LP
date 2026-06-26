import type { IconName } from "@/lib/icons"
import { links } from "./links"

/**
 * Sticky download band (appears from the comparison section down). One primary
 * "Download app" plus the two store buttons.
 */
export const stickyCta = {
  primary: { label: "Download app", href: links.download },
  stores: [
    { icon: "ios", label: "Download on the App Store", href: links.iosApp },
    { icon: "android", label: "Get it on Google Play", href: links.androidApp },
  ] satisfies { icon: IconName; label: string; href: string }[],
  /** Section the band starts showing from (matches the id below). */
  showFrom: "care",
} as const
