/**
 * Section #6 "The super app" — sticky scrollytelling. One phone view per step;
 * the right phone stays pinned while these blocks scroll on the left. Copy is
 * working text derived from the product pillars (Figma only specced step 1);
 * `screen` is empty until the real per-step UI exports land (Media placeholder).
 */
export const superApp = {
  chip: "Everything in one app",
  // Two centred lines (Figma breaks after the first sentence).
  title: ["Less coordinating.", "More caring."],
  // Cards, copy and per-card tints are 1:1 from Figma (24990:688 + 24995:1035).
  steps: [
    {
      title: "See your hours",
      body: "Track your hours across every patient at a glance, with your remaining authorized time always in view. No more calling ops to check where you stand.",
      screen: "/feature1@3x.png",
      tint: "violet", // violet/200
    },
    {
      title: "Know your pay before payday",
      body: "See your estimated take-home, browse and download every pay stub, and manage direct deposit. The separate pay app is gone.",
      screen: "", // /story/pay@2x.png (incoming)
      tint: "amber", // yellow/200
    },
    {
      title: "Your patients, organized",
      body: "Everyone you're assigned to in one place, with care plans and authorization details for each.",
      screen: "", // /story/patients@2x.png (incoming)
      tint: "sage", // olive/300
    },
    {
      title: "Trainings & resources",
      body: "Reach your required trainings and guides without hunting for links across your inbox.",
      screen: "", // /story/trainings@2x.png (incoming)
      tint: "mint", // emerald/100
    },
    {
      title: "Set up the easy way",
      body: "Finish enrollment right in the app, and watch your progress from your first call to your first authorized visit.",
      screen: "", // /story/setup@2x.png (incoming)
      tint: "indigo", // indigo/200
    },
    {
      title: "Texas EVV, built right in",
      body: "Clock-in and clock-out with automatic GPS and time capture, fully compliant with Texas HHSC. It's the one piece that arrives after launch, and it lives in the same app you already use, so there's nothing new to learn.",
      screen: "", // /story/evv@2x.png (incoming)
      tint: "purple", // purple/200
      badge: "Coming Aug 1, 2026",
    },
  ],
} as const
