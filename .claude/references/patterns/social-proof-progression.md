# Pattern: Social Proof Progression

Credibility must be earned in stages as the reader scrolls. Dumping all social proof at once (logo cloud + testimonials + stats in one section) creates "credibility overload" that paradoxically reduces trust — looks like you're trying too hard.

The pattern: one credibility signal per major section transition, each addressing the specific doubt the reader has at THAT point in the scroll.

## The progression map

```
Hero (above fold)
  Reader doubt: "Is this real? Used by real companies?"
  Signal: Logo cloud (3-5 recognizable logos, no names needed)
  Form: subtle — inline, small, grey. NOT a full section.

After first feature section
  Reader doubt: "Does this actually work in practice?"
  Signal: One strong testimonial. Specific outcome, not generic praise.
  Form: "We cut onboarding time by 60%" >> "Great product, very happy!"

After pricing (or instead of FAQ)
  Reader doubt: "Will I be stuck? Can I trust them?"
  Signal: Stats that address risk. Uptime, customer count, years in business.
  Or: a guarantee statement.

Just before final CTA
  Reader doubt: "Am I the only one hesitating? What did others do?"
  Signal: Named quote from someone SIMILAR to the reader.
  Form: persona match > brand name. "VP Product at a Series B" beats "Stripe employee" if reader is at a startup.
```

## Why progressive

A buyer's questions change as they scroll:
- Top of page: "Should I read further?" → social proof = "yes, others did"
- Middle: "Is this for real?" → social proof = specific outcome
- Bottom: "Should I act?" → social proof = "others like me did"

Dumping all three at the top is like a salesperson opening with "here are 47 reasons we're trustworthy." Suspicious.

## What to avoid

- **Logo cloud as full-width section** — looks like compensating. Inline + small > full section.
- **Testimonials without outcomes** — "Great team!" is noise. "Saved us 12 hours/week" is signal.
- **Stats without context** — "500,000 users" means nothing. "500,000 startups simplified payments" is something.
- **Social proof before value prop is established** — reader doesn't care yet
- **All social proof from one customer type** — shows limited appeal. Mix: enterprise + startup, or technical + business persona

## Implementation in section library

Map progression stages to existing archetypes:

| Stage | Archetype | Notes |
|---|---|---|
| Hero | `logo-cloud-row` | inline, subtle, monochrome logos |
| Mid-page | `testimonial-single-large` | one strong outcome quote |
| After pricing | `stats-row` | 3-4 numbers with context |
| Before final CTA | `testimonial-grid-3` | 3 diverse personas |

Note: don't use ALL of these on every site. Pick 2-3 progression points based on page length.

## Page-length rules

- Short page (3-4 sections): one logo cloud at hero, one testimonial mid-page. Done.
- Medium page (5-7 sections): logo cloud + 1-2 testimonials at strategic points + stats once
- Long page (8+ sections): full progression as mapped above

If you find yourself with 4+ social proof sections, the page is too long. Cut, don't add more proof.

## Seen in

- **Linear** — does logo cloud subtle, testimonial before pricing, restraint elsewhere
- **Stripe** — heavy on social proof but spaced out, never two adjacent
- **Vercel** — surprisingly little social proof; thesis-driven instead

Sites NOT using this pattern (and why it doesn't hurt them):
- Vercel: brand is strong enough that proof is implicit
- Linear: design discipline is the proof

If your brand can carry the page on design alone, you may need less proof. Most can't.

## Anti-pattern crossover

In `references/anti-patterns/ai-aesthetic.md`, this is "social proof overload":
- Logo cloud + 3-column testimonial grid + stats row in immediate sequence
- Reads as AI-generated page filling sections mechanically
- Watermark: every section feels equally weighted, no narrative arc

If you're tempted to add 3 social proof sections in a row, the page has weak value prop and you're trying to compensate.

## Quick test

Read your page top to bottom out loud. After each section ask: "what doubt does this address?" If two adjacent sections answer the same question, cut one. If a section answers no doubt the reader has yet, move it.

## Cross-references

- `references/anti-patterns/ai-aesthetic.md` (the overload pattern)
- `skills/section-library.md` (archetype names referenced above)
- `agents/copy-strategist.md` (writes the actual quotes/stats)
