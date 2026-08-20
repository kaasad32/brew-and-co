# Brew & Co — Style Guide

This is the foundation document for the Brew & Co design system. It sets the brand
direction that `tokens.md` / `tokens.css` and `components.md` implement. Read this
first if you're deciding *whether* something belongs on the site; read the other two
if you're deciding *how* to build it.

## 1. Brief, in one paragraph

Brew & Co is a specialty coffee roastery and trading company: single-origin beans,
a brew bar, subscriptions. The audience is people who already care about origin,
process, and roast date — not newcomers who need coffee explained to them. The
site's job is to make sourcing and craft legible at a glance (this lot, this farm,
this date) and to move people to either buy beans or visit the bar. Tone: a working
roastery's paperwork, not a café's chalkboard.

## 2. Reference image — what we took and what we didn't

`references/1.png.webp` (the "Onea" site) is useful as a *category* reference —
warm background, product-forward hero, pill CTA — but its execution (illustrated
drinks, flat circular icon badges, rounded display sans) reads as a casual
drinks bar for a younger, browsing audience. Brew & Co is a trading company:
older, more precise, more "paperwork." So:

- **Kept:** warm paper-toned background, a confident hero, pill-shaped primary CTA,
  a product grid below the fold, a compact category/nav bar.
- **Changed:** illustration → a stamped/ledger system built from real product data
  (origin, altitude, process, date) instead of decorative art; rounded friendly
  sans → a serif+grotesk pairing with more weight and history; flat colour icon
  badges → the Batch Stamp (§6); plain section breaks → a receipt tear-line.

## 3. Brand personality

**Honest. Precise. Warm. Unhurried. Grounded.** Not twee, not corporate-minimal,
not loud. Copy and layout should read like they were written by someone who
actually roasts the coffee, not a marketing team describing the roaster.

## 4. Voice & tone

- **Active voice, plain verbs.** "Add to bag," not "Submit." "Ships Tuesday," not
  "Your order will be processed."
- **Name things by what the person controls.** A person manages a *subscription*,
  not a "recurring billing profile." A person's *bag*, not their "cart session."
- **Keep the vocabulary through the whole flow.** The button that says "Add to bag"
  is followed by a toast that says "Added to bag" — never "Item added successfully."
- **Be specific, not clever.** "Washed, 1,850m, Huila" beats "notes of sunshine."
  Save personality for the one place it's earned (the stamp, a section label) —
  not for functional copy.
- **Errors explain what happened and how to fix it, without apologising.**
  - Do: "Couldn't reach the roastery — check your connection and try again."
  - Don't: "Oops! Something went wrong. Please try again later. 😢"
- **Empty states are an invitation to act, not a dead end.**
  - Do: "Your bag is empty. Add something from the menu." → *Browse menu*
  - Don't: "No items in cart."
- **Sentence case everywhere** (buttons, nav, headings). Small caps / uppercase is
  reserved for the mono "ledger" labels (§7) — that contrast is what makes them
  read as a system, not decoration.

## 5. Colour

Six named colours, each with a job. Full hex values and contrast data live in
`tokens.md`; this is the *why*.

| Name | Role |
|---|---|
| **Parchment** | Page background. Warm, slightly yellowed paper — not a neutral grey-cream. |
| **Kraft** | Secondary surface: cards, input fills, table stripes. Reads as kraft paper next to Parchment, not as "grey-100." |
| **Roast** | Primary text and ink. A near-black warm brown, never pure `#000`. |
| **Cherry** | The one accent. Named for the coffee cherry (the fruit the bean comes from), not "brand red." Used for primary actions and the one hero moment — not for decoration. |
| **Moss** | Secondary accent for provenance data only: origin tags, process labels, in-stock indicators. Never used for actions. |
| **Paper** | Near-white, warm. Text-on-Cherry, card backgrounds inside the dark footer. |

Rule of thumb: if you're reaching for Cherry a second time on the same screen,
you're probably decorating, not directing. One primary action per view gets it.

## 6. Typography

- **Fraunces** (display) — headlines, product names, pull quotes. Set with the
  softer optical size, medium weight (500/600 max). Never bold-italic; the
  wonkiness is the personality, extra weight fights it.
- **Archivo** (body/UI) — paragraphs, nav, buttons, form labels. A grotesk with
  enough personality not to disappear, but neutral enough to carry long text.
- **IBM Plex Mono** (utility) — prices, batch codes, dates, the Batch Stamp,
  table data. Anywhere a number needs to look measured rather than styled.

Full scale, weights, and line-height/tracking pairs are in `tokens.md`.

**Rule:** a heading is Fraunces *or* it's a mono ledger label — never both, and
never Archivo bold standing in for a heading. If a section needs a label that
feels like a stamp or receipt line ("LOT NO.", "ROASTED"), that's mono, uppercase,
tracked out; if it needs a human headline, that's Fraunces, sentence case.

## 7. The Batch Stamp — signature element

Every specialty bag carries a stamp: origin, altitude, process, roast date. That's
the one piece of the physical product we translate directly into the interface,
rather than inventing decoration. It appears:

- **Small**, once, rotated in the hero's corner — the page's one deliberate
  "thump" (see §9), now layered onto the hero photo rather than replacing it.
- **As a watermark**, faint, in the footer.

It is not a badge system to reuse everywhere — it has exactly one shape (a
circle, curved mono text around the rim, roast data centered) and it always
carries *real* data (a real origin, a real date), never placeholder ornamentation.
It does **not** appear on menu items or cart lines — a latte or a sandwich has
no origin/altitude/process/roast-date of its own to stamp, and fabricating
that data would break the "real data only" rule. Category icons (§12) do that
job instead. Full spec and SVG structure: `components.md` → Batch Stamp.

## 8. Layout & the tear-line

- Content column: 1200px max, generous side gutters (see `tokens.md` §Container).
- Hero: full-bleed photograph with a bottom-anchored gradient scrim carrying
  the headline, subhead, and CTAs, and the small Batch Stamp rotated in the
  corner — the photo itself is the hook now, the stamp is a signature layered
  on top of it, not a separate hero element.
- Headline size is intentionally restrained (`text-3xl`/`md:text-5xl`, not the
  type scale's largest steps) — a hero headline that size reads as shouting
  over its own photo rather than pairing with it.
- **Section divider:** instead of a plain `<hr>` or a numbered marker (this
  content isn't a sequence, so numbering it would be decorative, not
  informative), sections break on a **tear-line** — a dashed rule with a small
  circular notch at each end, mimicking a receipt perforation. Optional centered
  mono label ("— ORIGIN STORY —"). Spec in `components.md`.
- One section per page runs on **Roast** background with **Paper** text (the
  footer, always; optionally one mid-page "the roastery" section) — the single
  moment of high contrast, used deliberately, not as a repeating striped
  pattern.

## 9. Motion

Restraint by default; one orchestrated moment on load.

- **Hero stamp-down:** on first paint, the large Batch Stamp animates in like a
  rubber stamp hitting paper — scales from 1.12→1.0 with a slight rotational
  settle (±2°) over 500–700ms, `ease-emphasized`. This is the *only* entrance
  animation on the page; nothing else staggers in around it.
- **Hover:** buttons and cards lift 1–2px with a shadow step-up, 150–200ms,
  `ease-standard`. No colour-shifting gradients, no scale-bounce.
- **Focus:** instant, no transition — focus rings must never be delayed.
- **Reduced motion:** the stamp-down becomes a plain opacity fade (200ms); all
  hover lifts collapse to colour-only feedback. Respect
  `prefers-reduced-motion` at the token level (`tokens.md` §Motion), not by
  scattering media queries through component code.

## 10. Accessibility commitments

- Body text is always Roast-on-Parchment or Paper-on-Roast (~13.9:1) — never
  Cherry or Moss for paragraph copy.
- Cherry as text is restricted to 18px+/medium-weight-or-larger (~5.2:1 on
  Parchment); as a button fill it always carries Paper text (~5.8:1).
- Every interactive element gets a visible `:focus-visible` ring (Cherry, 2px,
  2px offset) — see `tokens.md` §Focus. No `outline: none` without a
  replacement.
- Hit targets: 44×44px minimum on touch, including the tear-line's optional
  interactive label if it's ever made clickable (it isn't, by default).

## 12. Iconography

Two distinct icon systems, not one — don't blur them:

- **The Batch Stamp** (§7) is the signature — one shape, always real
  provenance data, used sparingly (hero corner, footer watermark).
- **`lucide-react`** is the stock/utility icon set for everything else:
  category markers (`Coffee`, `Croissant`, `Sandwich`, `CupSoda` — one per
  menu category, reused across every item in it, not 29 bespoke icons), and
  cart/UI controls (`ShoppingBag`, `Plus`, `Minus`, `Trash2`, `Receipt`).
  These are generic by design — they mark a category or an action, not a
  product's identity, so they don't compete with the stamp's role.

A menu item never gets its own icon; it gets its category's icon. If a new
category is added, add its icon to `lib/category-icons.tsx` rather than
picking a one-off icon inline in a component.

## 13. What this system is not

Not a component library with infinite variants "for future flexibility." Every
component in `components.md` exists because a real page section needs it.
Not dark-mode-aware — Brew & Co is a single warm paper theme by design (a
roastery's paperwork doesn't have a night shift); revisit only if a real product
need appears.
