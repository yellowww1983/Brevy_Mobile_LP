/**
 * "Before / With Brevy" comparison section. Copy mirrors Figma 1:1 (no brief
 * file in repo to cross-check). The `after` rows are interactive — each one
 * pairs with a phone screen via its index.
 */
export const care = {
  kicker: "Free care coordination",
  // Intro line that plays before the comparison. The middle word renders as
  // fuzzy (VHS) text; everything else is plain.
  intro: { before: "Brevy turns", fuzzy: "chaos", after: "into clarity" },
  title: "You shouldn't have to be the care coordinator, too",
  subtitle:
    "Let Brevy track your hours, flag what's due, and keep everyone in sync - so you can just show up and provide great care.",
  before: {
    label: "Before",
    heading: "Care coordination falls on you",
    items: [
      "You track how many authorized hours are left",
      "You remember what each payer and program needs",
      "You chase down paperwork, renewals, and deadlines",
      "You're the one calling and texting providers to stay in the loop",
    ],
  },
  after: {
    label: "With Brevy",
    heading: "The app coordinates care for you",
    items: [
      "Your authorized hours, tracked automatically as you work",
      "What's due and what's next, surfaced before it's a problem",
      "Offload the paperwork and renewals",
      "Your patient and their providers are always in sync",
    ],
  },
} as const
