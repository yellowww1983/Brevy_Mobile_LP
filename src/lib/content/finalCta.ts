import { links } from "./links"

/**
 * Section #8 "Final CTA". Copy is the brief (matches Figma 25109:1684 1:1) — a
 * dark card inviting prospective caregivers to join. No store buttons here; the
 * platforms are named in the reassurance line, so the page never shows a third
 * iOS/Android CTA (hero has the store buttons, the sticky band repeats them).
 */
export const finalCta = {
  // Two centred lines (Figma breaks after the first sentence).
  title: ["Care for your loved ones.", "We'll handle the rest."],
  subhead:
    "Brevy caregivers get the app, steady hours, and a team that has their back. Want to see if it's right for you?",
  cta: { label: "Get started", href: links.talk },
  // Reassurance: small print on two lines; the platform names render semibold.
  reassurance: {
    line1: "The Brevy app is free for Brevy caregivers",
    line2: "Available on",
    platforms: ["iOS", "Android"],
  },
} as const
