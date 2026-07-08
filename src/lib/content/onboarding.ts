/**
 * "Getting started" section (#5): three onboarding steps, each with a small
 * UI mockup. Copy mirrors Figma 1:1 and matches the brief (3 steps).
 */
export const onboarding = {
  kicker: "Getting started",
  title: "From enrollment to your first paycheck",
  subtitle: "Brevy walks you through setup, one step at a time.",
  steps: [
    {
      step: "Step 1",
      title: "Get your invite",
      description:
        "Once your background check clears, you get a text link. Tap it, set a password, and sign in easily.",
    },
    {
      step: "Step 2",
      title: "Finish setup in the app",
      description:
        "A simple checklist covers your W-4, direct deposit, and I-9. You always see what's next and how far you've come.",
    },
    {
      step: "Step 3",
      title: "Start caring",
      description:
        "See your patients, your hours, and your pay in one place. Starting August 3, clock in and out from here, too.",
    },
  ],
  // Mockup content rendered in each step's tray.
  passkey: {
    input: "Create password",
    dots: 8, // password chars typed in by the animation

    calloutLabel: "What happens next",
    callout:
      "Your passkey is securely stored and available across your devices, making sign-in quick and seamless.",
    button: "Enable Face ID",
  },
  todos: {
    title: "Your to-do's",
    items: [
      { title: "Complete your W-4", desc: "Federal withholding form", done: true },
      {
        title: "Set up direct deposit",
        desc: "Required before your first check",
        done: false,
      },
      {
        title: "Verify your I-9",
        desc: "Proves your eligibility to work",
        done: false,
      },
    ],
  },
  patient: {
    name: "Dorothy K. Mitchell",
    tag: "PAS",
    status: "Active",
    plan: "Superior HealthPlan",
    auth: "Auth Period: Mar 1 - Sep 30, 2026",
    weekLabel: "This week",
    hours: 8, // starting hours
    hoursTarget: 20, // hours the count-up animates to
    hoursTotal: 30,
  },
} as const
