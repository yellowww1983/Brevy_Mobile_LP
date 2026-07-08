import { anchors, links } from "./links"

export const nav = {
  brand: "Brevy",
  announcement: {
    prefix: "For Brevy Caregivers: Available Now on",
    platforms: ["iOS", "Android"],
    conjunction: "and",
  },
  links: [
    { label: "How it works", href: anchors.howItWorks },
    { label: "Features", href: anchors.features },
    { label: "Compliance", href: anchors.compliance },
  ],
  cta: { label: "Get started", href: links.enroll },
} as const
