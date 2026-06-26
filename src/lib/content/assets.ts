/**
 * Brand and media asset paths. Empty string renders a placeholder via
 * the Media primitive; drop the real file into /public and set the path
 * here to swap 1:1, no component change.
 */
export const assets = {
  logoMark: "", // /brand/brevy-mark.svg (incoming)
  logoWordmark: "", // /brand/brevy-wordmark.svg (incoming)
  // Hero phone views — crossfade in a loop. Same frame/ratio, so they swap
  // inside the casing without moving it. Append more to extend the cycle.
  heroPhones: [
    "/phone-hero@4x.png",
    "/phone-hero-2@4x.png",
    "/phone-hero-3@4x.png",
    "/phone-hero-4@4x.png",
    "/phone-hero-5@4x.png",
  ],
  // Compare section: phone screen behind the "With Brevy" rows. One real
  // screen so far; append per-row screens here and PhoneViews crossfades
  // between them (index clamps to the last while only one exists).
  featurePhones: ["/screen1@4x.png"],
  appIcon: "", // /brand/brevy-app-icon.png (glass clover, incoming)
  glassClover: "/brevy-glass.webm", // animated glass clover (VP9, alpha)
  glassCloverVp8: "/brevy-glass-vp8.webm", // VP8 fallback
  // Static frame of the glass clover, used on mobile: iOS Safari does not
  // render webm alpha (the transparent video shows a black box), so phones
  // get this transparent PNG instead of the animated webm.
  glassCloverPng: "/brevy-glass.png",
  videoPoster: "", // /media/app-tour-poster.jpg (pending)
} as const
