import { links } from "./links"

/**
 * Section #9 footer (Figma 25109:1719). A light legal bar: a divider, the
 * copyright line (brief copy) on the left, Privacy / Terms links on the right.
 * Figma shows no logo and a white surface, so neither is added here.
 */
export const footer = {
  copyright: "© 2026 Brevy · Caregiving, made simple",
  links: [
    { label: "Privacy Policy", href: links.privacy },
    { label: "Terms of Service", href: links.terms },
  ],
} as const
