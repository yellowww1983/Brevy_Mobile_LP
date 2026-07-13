import { links } from "./links"

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
    { label: "Get paid for caregiving", href: links.caregiving },
    { label: "Eldercare Guide", href: links.guide },
  ],
  // "New chat" — appears in the nav on scroll (desktop); the Brevy assistant.
  cta: { label: "New chat", href: links.chat },
  // Mobile menu trigger + its full-screen panel (links + New chat).
  menu: { label: "Open menu", close: "Close menu" },
} as const
