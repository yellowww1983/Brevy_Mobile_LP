# Anti-pattern: AI Aesthetic

The visual signature of AI-generated UI. These patterns scream "generated", "Webflow template", "v0 default". Recognizing them is the first step to avoiding them.

This document is dual-purpose: warning list AND a calibration tool. When your draft has more than 3 of these elements, you've drifted into the AI default. Audit and fix.

## Visual hallmarks

### 1. Multi-hue decorative gradients

The purple → pink → orange (or blue → cyan → purple) full-bleed gradient behind a hero section. Multiple distinct hues blending. Generic "AI startup" energy.

- Why it's a tell: every v0/Webflow/Vercel-demo landing page does this. Multi-hue gradient = color trying to substitute for brand identity.
- The cousins: noise textures over multi-hue gradients, mesh gradients with 4+ stops, "frosted glass" gradient orbs.

**Why it fails:** the gradient is decoration unrelated to brand or content. It's a visual filler. Premium designs commit to ONE hue (or stay monochrome) and let the gradient be brand atmosphere, not generic ambient color.

**What to do instead:**
- Solid backgrounds (most premium choice)
- OR single-hue atmospheric gradient (e.g. zinc-950 → blue-950 if blue IS the brand) — this is gradient-as-atmosphere, not decoration. The brand owns the hue; the gradient extends it.
- OR a subtle (oklch 0.985 → 0.97) gradient behind one specific section as a deliberate moment.

The line: ONE hue committed = atmosphere = OK. Multiple hues blending = decoration = AI tell.

### 2. Decorative glassmorphism

Translucent cards with heavy backdrop-blur, slight rotation (5–10°), floating over a gradient. The transparency exists FOR aesthetic effect, not because it's saying something structural about the content.

- Why it's a tell: this was a 2021–2022 trend. Using it in 2026 without intent dates the design.
- Often combined with: floating 3D blobs/shapes behind the cards, multi-hue gradients (see #1).

**Why it fails:** transparency in real design conveys depth/relationship between layers. When transparency is decoration, it's a visual treatment without information value.

**What to do instead:**
- Flat cards with simple borders or subtle shadows, aligned to the grid, not rotated
- OR structural transparency where it communicates relationship (e.g. an "API integration" card semi-transparent to show data flowing through it; a notification card overlaying content it relates to)

The line: transparency that SAYS SOMETHING about layered relationship = legitimate. Transparency as ambient mood = AI tell.

### 3. Phone mockup at -15deg rotation
The product screenshot embedded in an iPhone frame, rotated -10 to -15 degrees, floating over a gradient.

- Why it's a tell: the angle is the cliché. The angle has been the cliché since 2018.
- Variants: dual phone mockups (one slightly behind the other), MacBook + phone combo, "this is what the app looks like" stickers.

**What to do instead:** Show product UI flat, cropped to specific elements, integrated into the section layout. Or skip phone mockups entirely if the product isn't mobile-first.

### 4. Floating 3D shapes / orbs / blobs
Translucent 3D spheres, donuts, or amorphous "blob" shapes scattered in the background.

- Why it's a tell: this is the AI default for "make this section more interesting". Spline.design widgets, Blender-rendered shapes, Three.js floaters.
- They never serve the content. They're just there.

**What to do instead:** Nothing. Empty space is fine. If you need visual interest, lean on typography or one specific brand illustration.

### 5. "Trusted by" row of grey logos
A horizontal row of customer logos in greyscale or low opacity, labeled "Trusted by" or "Used by teams at".

- Why it's a tell: this is the most copy-pasted section in B2B SaaS. The logos look the same on every site (Stripe, Airbnb, Spotify, Notion appear on landings for products those companies probably don't use).
- It's not actually trusted-signal anymore — viewers tune it out.

**What to do instead:** One specific quote from one specific customer, with their face/name/role. OR a specific data point ("X teams use this"). OR skip social proof above the fold entirely if you don't have A-tier customers.

### 6. Stock illustrations of diverse cartoon people
"Working at a laptop", "celebrating", "high-five", "thinking" — illustrations of stylized people, usually with abstract surroundings.

- Why it's a tell: these come from a library (Storyset, Undraw, etc.) and are recognizable across hundreds of sites. The same illustrations appear on different brands.
- They communicate nothing specific about your product.

**What to do instead:** Real photos (with quality direction). Product UI. Typography. Diagrams. Abstract brand illustrations if you genuinely have a custom illustration system.

### 7. Centered everything, every section
Hero centered. Section title centered. CTA centered. Card grid centered. Every section uses the same axis.

- Why it's a tell: the AI default is `flex items-center justify-center text-center` because it's the safest. The result is monotony.

**What to do instead:** Vary alignment by section. Hero left-aligned. Some sections centered. Some asymmetric. Section composition should change as the page progresses.

### 8. Emoji in headings
"🚀 Launch faster", "✨ Magic at your fingertips", "💎 Premium features".

- Why it's a tell: emoji-in-headlines was a 2019 LinkedIn-post style. On 2026 premium landings, it reads as marketing-juniors-on-a-content-calendar.

**What to do instead:** Words. Confident words. If you need an icon for category signaling, use a Lucide icon, not an emoji.

### 9. CTAs that say "Get Started Free"
The exact phrase "Get Started Free" or "Sign Up Free" as the primary CTA, in a gradient-filled button.

- Why it's a tell: it's the most common CTA copy on the internet. It says nothing specific about what you're getting started with.

**What to do instead:** Specific CTAs. "Start your free 14-day trial". "Book a 30-min demo". "Create your first project". "See the live demo". The specificity is the differentiator.

### 10. "Sparkles" icon
The four-pointed sparkle icon (✦) used for "AI", "magic", "premium", "new".

- Why it's a tell: every AI product launch in 2023–2025 used this. It's now the visual cliché for "AI inside".

**What to do instead:** Be specific about what you mean. If it's AI, say "AI". If it's "new", use a Badge labeled "NEW". Skip the sparkle.

### 11. Bento grid where every cell is the same vibe
The trendy "bento grid" layout — except every cell has the same gradient, same border, same content density. Bento should imply variety; many implementations are just "feature grid with rounded corners and a gradient on each tile".

- Why it's a tell: a real bento grid has *information density variety* — one big cell, two medium, four small, each with different content types (text-only, image, chart, code). A fake bento has 6 identical cells.

**What to do instead:** Either do bento with real variety (different cell sizes, different content types per cell), or use a regular grid. Don't pretend a uniform grid is bento.

### 12. Section: "How it works" with 3 numbered steps
"1. Sign up. 2. Configure. 3. Profit." (or some variant). Always 3 steps, always with a number bubble, always vague.

- Why it's a tell: this section is on every SaaS landing. It rarely conveys anything specific.

**What to do instead:** If the product workflow is genuinely 3 steps and the user benefits from understanding them, fine — but make the steps specific and visual. "Connect your repo → Push code → Get a preview URL" with screenshots of each. Vague step-by-step = cut the section.

### 13. Pricing page with three identical cards, middle one "Most Popular"
Three pricing tiers, all cards same size, middle one with a "Most Popular" badge and a different border color.

- Why it's a tell: this is the template every pricing page uses. Most readers skim it because they've seen this layout 1000 times.

**What to do instead:** A real pricing strategy: maybe 2 tiers, not 3. Maybe prose-based pricing instead of cards. Maybe a comparison table. Visual variety in pricing reads as having thought about pricing, not having grabbed a template.

### 14. Three-column feature grid that's all the design
Hero → 3-col feature grid → 3-col feature grid → 3-col feature grid → CTA. The page is one section repeated.

- Why it's a tell: this is what happens when you tell an AI "give me a landing page" without art direction.

**What to do instead:** Vary section structure aggressively (see Stripe study). Hero → feature-split-alternating → quote → stats → pricing-paragraph → FAQ → CTA. Section variety IS the design.

### 15. Footer with 4 columns labeled "Product / Company / Resources / Legal"
The default footer structure. Always 4 columns. Always those labels. Always with social icons on the right.

- Why it's a tell: it's the Webflow default. Recognizable as "didn't design the footer".

**What to do instead:** Either go minimal (logo + 3 links + copyright, like Linear), or design the footer with intent (like Stripe's structural sitemap). The default 4-column is the worst middle ground.

### 16. AI-generated brand logos in mockups
Logos created via Midjourney / DALL-E / Stable Diffusion for "logo cloud" or "customer mentions" sections. They have a specific look — over-stylized geometric shapes, bland gradients, fake-professional vibe, all sharing the same generation aesthetic.

- Why it's a tell: AI-generated logos all share a recognizable visual signature regardless of prompt. They scream "I asked an AI for placeholder logos."
- Often paired with: AI-generated names ("Nexora", "Ravnex", "Helixion") that sound like they're from a startup name generator (because they are).

**What to do instead:** Use placeholder logos exclusively from [logoipsum.com](https://logoipsum.com/) as SVG files saved to `public/logos/placeholders/`. Never invent a brand name or inline a fabricated logo mark. Logoipsum exists precisely to solve this problem — designed placeholder logos with proper visual variety, intended to be replaced with real client logos before launch.

### 17. Mixed real-brand placeholders in mockups
Using actual company logos (Stripe, Microsoft, Shopify, Apple, Google) in "trusted by" / "featured in" sections during design exploration or in templates the client will buy.

- Why it's a tell: viewers recognize the brands and assume real customer relationships. When the client sees it, they get confused ("do we work with Stripe?"). When it ships, you risk trademark complaints.
- Cousins: using competitor logos to imply integrations that don't exist.

**What to do instead:** Same as #16 — use logoipsum.com placeholders. Real brand logos appear ONLY when the client has documented permission and the relationship is real.

## The audit

When you've drafted a landing page, count how many of the above appear in your design. Acceptable:
- **0–2:** Probably fine. You're working from intent, not defaults.
- **3–5:** Drift warning. Audit and decide if each is serving or just default.
- **6+:** You've defaulted to AI-aesthetic. Strip back. Re-direct from a reference instead.

## The deeper lesson

These patterns aren't bad because they're trendy. They're bad because they're *unmotivated* — they're applied as defaults, not chosen for the brand.

Any of these patterns could be the right choice for a specific brand. Phone mockups are right for a mobile-first consumer product. Gradients are right for a brand that's intentionally vibrant. "Trusted by" rows are right for a B2B product with A-list customers.

The anti-pattern isn't the element itself. It's using the element WITHOUT a reason. Every visual choice should have a "we did this because [specific reason]" answer. If the answer is "it looked good" or "it felt modern", the choice was a default, not a decision.

## Cross-references

- See [one-accent-discipline](../patterns/one-accent-discipline.md) — the discipline that prevents items 1, 11, 14 from happening
- See [typography-as-design](../patterns/typography-as-design.md) — when typography is doing the work, you don't need most of the items above
- See `.claude/rules/visual-taste.md` — the operational rules informed by these anti-patterns
- Logo discipline: only logoipsum.com SVGs in `public/logos/placeholders/`, never fabricated brands — prevents items 16, 17
