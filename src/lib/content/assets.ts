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
    "/phone-home@4x.png", // "Welcome back, Maria!" dashboard
    "/phone-visits@4x.png", // Visits & Hours
    "/phone-payroll@4x.png", // Payroll
    "/phone-setup@4x.png", // "Welcome to Brevy" — setup / to-do's
    "/phone-paystub@4x.png", // Pay stub
    "/phone-resources@4x.png", // Resources
    "/phone-congrats@4x.png", // Congratulations
  ],
  // Compare section: phone screen behind the "With Brevy" rows. One real
  // screen so far; append per-row screens here and PhoneViews crossfades
  // between them (index clamps to the last while only one exists).
  // One screen per "With Brevy" row (index = row). screenN = the Nth row;
  // rows without a dedicated screen yet fall back to screen1.
  featurePhones: [
    "/screen1@4x.png", // row 1 — authorized hours, tracked automatically
    "/screen2@4x.png", // row 2 — what's due and what's next
    "/screen3@4x.png", // row 3 — offload the paperwork and renewals
    "/screen4@4x.png", // row 4 — patient & providers in sync
  ],
  appIcon: "", // /brand/brevy-app-icon.png (glass clover, incoming)
  glassClover: "/brevy-glass.webm", // animated glass clover (VP9, alpha)
  glassCloverVp8: "/brevy-glass-vp8.webm", // VP8 fallback
  // Static frame of the glass clover, used on mobile: iOS Safari does not
  // render webm alpha (the transparent video shows a black box), so phones
  // get this transparent PNG instead of the animated webm.
  glassCloverPng: "/brevy-glass.png",
  videoPoster: "", // /media/app-tour-poster.jpg (pending)
  // Trust section — central shield is a transparent @4x glass render (glow
  // baked in); the four item badges are SVGs (light circle + line icon + soft
  // shadow, all inside a 328 viewBox, circle centred at 50%/33.8%).
  trust: {
    // The badge circle is drawn in code (crisp DOM element, Figma 25072-1043);
    // these are the icon glyphs only (circle + shadow stripped from the source
    // SVGs), rendered inside that circle.
    shield: "/secure@4x.png",
    evv: "/evv-icon.svg",
    twoFactor: "/2fa-icon.svg",
    data: "/data-icon.svg",
    brevy: "/brevy-icon.svg",
  },
} as const
