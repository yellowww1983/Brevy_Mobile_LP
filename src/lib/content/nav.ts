import { anchors, links } from "./links"

export const nav = {
  brand: "Brevy",
  announcement: {
    prefix: "For Brevy caregivers available for:",
    platforms: ["iOS", "Android"],
  },
  links: [
    { label: "How it works", href: anchors.video },
    { label: "Features", href: anchors.features },
    { label: "Compliance", href: anchors.compliance },
  ],
  cta: { label: "Talk to us", href: links.enroll },
} as const
