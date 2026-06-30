/**
 * Every outbound destination in one place. Swap the placeholder "#"
 * values for real URLs without touching a single component.
 */
export const links = {
  enroll: "#", // external enrollment funnel (URL TBD)
  talk: "#", // "talk to us about joining" contact funnel (URL TBD)
  download: "#", // generic "download the app" smart link (URL TBD)
  iosApp: "#", // App Store (URL TBD)
  androidApp: "#", // Google Play (URL TBD)
  privacy: "#", // privacy policy (URL TBD)
  terms: "#", // terms of service (URL TBD)
} as const

/** In-page scroll targets. Section ids must match these. */
export const anchors = {
  video: "#video",
  features: "#features",
  compliance: "#compliance",
  gettingStarted: "#getting-started",
} as const
