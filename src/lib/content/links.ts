/**
 * Every outbound destination in one place. Swap the placeholder "#"
 * values for real URLs without touching a single component.
 */
export const links = {
  enroll: "#", // external enrollment funnel (URL TBD)
  talk: "#", // "talk to us about joining" contact funnel (URL TBD)
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
