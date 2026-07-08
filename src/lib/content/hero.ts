import type { IconName } from "@/lib/icons"
import { links } from "./links"

interface StoreButton {
  icon: IconName
  label: string
  href: string
}

export const hero = {
  // Hero chip. A single EVV announcement: the date sits in the pill, the rest
  // reads as the callout. (One variant → the chip renders static, no cycle.)
  badge: [
    {
      pill: "Coming August 3, 2026",
      text: "Clock in and out directly in the Brevy app, no more HAeXchange+",
    },
  ],
  title: "Your caregiver super app",
  subtitle:
    "Everything about your patient’s care in one place - so you can focus on what really matters.",
  // Primary CTA sitting directly under the headline (Figma 24962:877).
  cta: { label: "Get started", href: links.enroll },
  // Decorative tags that float around the phone (Figma 24984:636/666/648).
  // `tone` selects the pastel icon-chip colour; placement lives in HeroOrbit.
  orbit: {
    tags: [
      { icon: "dollar", tone: "pay", label: "Know your pay before payday" },
      { icon: "hours", tone: "hours", label: "Stay on top of every patient’s care" },
      { icon: "stub", tone: "stub", label: "Feel confident on every visit" },
    ],
  },
  tagline: "Everything you need for caregiving. All in one place.",
  storeButtons: [
    { icon: "ios", label: "Download iOS", href: links.iosApp },
    { icon: "android", label: "Download Android", href: links.androidApp },
  ] satisfies StoreButton[],
} as const
