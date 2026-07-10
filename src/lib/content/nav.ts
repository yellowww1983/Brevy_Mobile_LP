import { anchors, links } from "./links"

export const nav = {
  brand: "Brevy",
  announcement: {
    // `lead` is desktop-only; mobile shortens to just "Available Now on …".
    lead: "For Brevy Caregivers:",
    prefix: "Available Now on",
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
