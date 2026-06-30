/**
 * Section #7 "Trust & compliance". Copy is the brief (authoritative); the
 * visual is Figma 25072:1043 — a central glass shield with four glowing trust
 * badges, one per item. Brief keeps "ready Aug 1" on the EVV label even though
 * the Figma mock shortened it. `icon` keys map to assets.trust.
 */
export const trust = {
  kicker: "Trusted & compliant",
  // Two centred lines (Figma forces the break after the first sentence).
  title: ["Secure by design.", "Compliant by default."],
  // Order = left-of-shield ×2, then right-of-shield ×2 (Figma label x-order).
  items: [
    { icon: "evv", label: "Texas HHSC EVV ready Aug 1" },
    { icon: "twoFactor", label: "Secure two-factor sign-in" },
    { icon: "data", label: "Your data stays private" },
    { icon: "brevy", label: "Built & backed by Brevy" },
  ],
} as const
