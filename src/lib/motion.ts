import type { Variants } from "framer-motion"

/**
 * Single source for easing curves. Mirrors the --ease-* tokens in
 * globals.css so motion in JS and CSS stay in sync. Never inline a
 * cubic-bezier array in a component.
 */
export const EASE = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  // Slight overshoot, for things that "pop" or sprout into place.
  outBack: [0.34, 1.56, 0.64, 1],
} as const

export const DURATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.5,
} as const

/**
 * Standard on-scroll reveal: fade up into place once, when the
 * element enters the viewport. Use with `whileInView` + `viewport`.
 * Never redefine a local fadeUp in a section.
 */
export const fadeInView: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
}

/**
 * Container that staggers its children's reveal. Pair with
 * `fadeInView` on each child.
 */
export const staggerInView: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

/**
 * On-load entrance tokens (Linear-style). Confirmed against linear.app
 * live DOM: elements start at filter blur(10px) / opacity 0 and ease out
 * into place. These are the JS-side motion tokens, mirroring --ease-*.
 */
export const ENTRANCE = {
  blur: 10, // px the element starts blurred by
  rise: 12, // px it travels up into place
  duration: 0.7, // s — soft and quick
  stagger: 0.1, // s between elements, top → bottom
} as const

/**
 * Page-load reveal: each element rises out of a soft blur once, on mount.
 * Drive with `animate` (not `whileInView`) and offset each element's
 * transition `delay` to stagger. Never redefine a local blurUp.
 */
export const blurUp: Variants = {
  hidden: { opacity: 0, filter: `blur(${ENTRANCE.blur}px)`, y: ENTRANCE.rise },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
}

/**
 * On-scroll variant of the blur reveal: same soft blur as the hero, but a
 * larger upward travel so a whole section visibly rises into place as it
 * enters the viewport. Use with `whileInView` (Reveal `blur`). No transition
 * here on purpose — Reveal supplies duration/ease/delay so per-element stagger
 * delays actually apply (a variant transition would override the component's).
 */
export const blurInView: Variants = {
  hidden: { opacity: 0, filter: `blur(${ENTRANCE.blur}px)`, y: 40 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
}

/**
 * Word-by-word reveal (text-generate): each word rises out of a soft blur.
 * Put `wordIn` on each word inside a `staggerWords` container.
 */
export const wordIn: Variants = {
  hidden: { opacity: 0, filter: `blur(${ENTRANCE.blur}px)`, y: 12 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.5, ease: EASE.out },
  },
}

export const staggerWords: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
}

/**
 * On-load "sprout": scale up from a corner with a touch of rotate, like a leaf
 * unfurling. No transition here — the component supplies duration/ease (use
 * EASE.outBack for the overshoot) and the per-element delay. Anchor the growth
 * with a transform-origin utility (e.g. origin-top-left).
 */
export const grow: Variants = {
  hidden: { opacity: 0, scale: 0.2, rotate: -6 },
  visible: { opacity: 1, scale: 1, rotate: 0 },
}

/**
 * Hero orbit (concentric rings + floating tags) fallback timings. The live
 * values are the --rings-* / --hero-tags-* tokens in globals.css, read in the
 * component; these are the defaults used until they resolve. Seconds.
 */
export const ORBIT = {
  drop: 120, // px the tags fall from
  dropDuration: 0.8,
  tagStagger: 0.15,
  tagDelay: 0.6, // hold after rings start, before tags drop
  ringDraw: 0.9,
  ringStagger: 0.2,
} as const

/** Shared viewport config so reveals trigger consistently. */
export const VIEWPORT = { once: true, amount: 0.3 } as const
