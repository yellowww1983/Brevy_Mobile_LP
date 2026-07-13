/**
 * Every outbound destination in one place. Swap the placeholder "#"
 * values for real URLs without touching a single component.
 */
export const links = {
  enroll: "https://brevy.com/funnel", // "Get started" — hero + nav funnel
  talk: "https://brevy.com/funnel", // "Get started" — final-CTA funnel (same funnel)
  caregiving: "https://brevy.com/caregiving", // nav: "Get paid for caregiving"
  guide: "https://brevy.com/guide", // nav: "Eldercare Guide"
  chat: "https://brevy.com/", // nav: "New chat" (Brevy assistant)
  download: "#", // generic "download the app" smart link (URL TBD)
  iosApp: "https://apps.apple.com/us/app/brevy-care/id6775679941", // App Store
  androidApp: "https://play.google.com/store/apps/details?id=com.brevy.caregiverapp", // Google Play
  privacy: "#", // privacy policy (URL TBD)
  terms: "#", // terms of service (URL TBD)
} as const

/** In-page scroll targets — nav links. Values must match a section id. */
export const anchors = {
  howItWorks: "#getting-started", // "How it works" → Getting Started
  features: "#super-app", // "Features" → Everything in one app
  compliance: "#trust", // "Compliance" → Trusted & compliant
} as const
