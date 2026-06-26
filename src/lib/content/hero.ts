import type { IconName } from "@/lib/icons"
import { links } from "./links"

interface StoreButton {
  icon: IconName
  label: string
  href: string
}

export const hero = {
  // Hero chip cycles through these variants (pill + text).
  badge: [
    { pill: "5000+", text: "caregivers trusted us in Texas" },
    { pill: "August 1, 2026", text: "Texas EVV clock-in and clock-out arrives." },
  ],
  title: "Your caregiver super app",
  subtitle:
    "Your hours, your pay, your patients, and your trainings, finally in one place. No more hunting across emails, portals, and paperwork.",
  // Primary CTA sitting directly under the headline (Figma 24962:877).
  cta: { label: "Get started", href: links.enroll },
  // Decorative tags that float around the phone (Figma 24984:636/666/648).
  // `tone` selects the pastel icon-chip colour; placement lives in HeroOrbit.
  orbit: {
    tags: [
      { icon: "dollar", tone: "pay", label: "Know your pay before payday" },
      { icon: "hours", tone: "hours", label: "Your hours always accurate" },
      { icon: "stub", tone: "stub", label: "Every pay stub, in one place" },
    ],
  },
  tagline: "Everything you need for caregiving. All in one place.",
  storeButtons: [
    { icon: "ios", label: "Download iOS", href: links.iosApp },
    { icon: "android", label: "Download Android", href: links.androidApp },
  ] satisfies StoreButton[],
} as const
