# Brew & Co — Design System

A specialty coffee roastery & trading company. Built for Next.js 16 (App
Router) + React 19 + Tailwind CSS v4 (CSS-first `@theme`) + TypeScript +
`lucide-react` (utility icons — see `style-guide.md` §12).

| Doc | What's in it |
|---|---|
| [`style-guide.md`](./style-guide.md) | Brand direction, voice & tone, color/type rationale, the Batch Stamp signature element, iconography, layout, motion, accessibility commitments. Read this first. |
| [`tokens.md`](./tokens.md) | Reference table for every design token — color, type scale, radius, shadow, motion, breakpoints — with usage and contrast notes. |
| [`tokens.css`](./tokens.css) | The actual Tailwind v4 `@theme` CSS. Drop-in replacement for `app/globals.css` once the brand is adopted (see the comment at the top for the `next/font/google` setup it expects). |
| [`components.md`](./components.md) | Specs + copy-pasteable TSX for every component: Button, the Batch Stamp, Product Card, Origin Chip, Nav Bar, the tear-line divider, Form Field, Price, Footer, Empty State, Toast, plus the site components (Hero, the reservation modal, Event Card, Featured Item Card, Menu Item Tile, Menu Category Section) and the 5-file cart system. |
| [`menu-items.csv`](./menu-items.csv) | The 29-item menu (source of truth), hand-transcribed into `lib/menu-data.ts`. |
| [`references/`](./references/) | Source inspiration (`1.png.webp`) and notes on what was kept vs. changed — see `style-guide.md` §2. |

## Quick orientation

- **Palette:** Parchment / Kraft / Roast / Cherry / Moss / Paper — a coffee
  cherry red, not terracotta; a near-black warm brown, never pure black.
- **Type:** Fraunces (display) + Archivo (body/UI) + IBM Plex Mono (prices,
  batch codes, the stamp).
- **Signature:** the Batch Stamp — a circular, mono-set rubber-stamp mark
  carrying real origin/altitude/process/roast-date data. Small in the hero's
  corner, faint as a footer watermark. Never used as generic decoration, and
  never on a menu item — see style-guide.md §7/§12 for why that's a firm
  line, not an oversight.
- **Structural device:** the tear-line — a dashed, receipt-style perforation
  between major sections, replacing plain rules or numbered markers (this
  content isn't a sequence, so it isn't numbered).
- **Cart:** click-to-add on both the Home "Most popular" cards and every
  `/menu` tile, a right-docked drawer (bag → checkout → confirmation),
  `localStorage`-persisted, no backend — see `components.md` → Cart system.
- **Images:** local WebP files under `public/images/`, not hotlinked —
  every image was downloaded and optimized with the `image-optimizer`
  skill (`.claude/skills/image-optimizer`). Use that skill for any new
  stock/external image rather than linking to `images.pexels.com` (or any
  other external host) directly.

## Status

Adopted, and iterated three times. `app/globals.css`, `app/layout.tsx`,
`next.config.ts`, and `components/`/`lib/` implement this system for three
live pages — Home (`app/page.tsx`), About (`app/about/page.tsx`), Menu
(`app/menu/page.tsx`) — with a working cart and checkout. The menu started
as category photos + a typographic item list; the user then explicitly
asked for a clickable icon grid instead, which superseded that decision
outright. That grid then moved from one shared `lucide-react` icon per
category to a real photo per item in a small circular badge
(`lib/menu-item-images.ts`), since 29 items sharing 4 icons read as noise
once the grid was live. The badge then grew into a full-width square photo
filling the top of each tile (matching Featured Item Card's treatment),
which forced 25 of those per-item photos to be re-sourced at 800px — the
originals were downloaded at 300px for the old 96px circle and would have
looked soft at full grid-column width (`components.md` → Menu Item Tile
explains all three changes and why none of them is drift).

Real bugs surfaced across both builds and are now documented as lessons in
`components.md` so they don't recur: (1) never override a variant's
text/border color from outside via `className` — two same-specificity
color utilities are ordered by Tailwind's generated stylesheet, not by
className string order, so use a dedicated variant instead (Button →
`secondary-inverse`); (2) a native `<dialog>`'s default centering
(`margin: auto`) is silently defeated by Tailwind's Preflight reset —
center it explicitly, and give backdrop-click-to-close its own handler
too, since native `<dialog>` doesn't do either on its own; (3) React's
`set-state-in-effect` lint rule will flag the standard
localStorage-hydration-on-mount pattern even though it's correct — a
documented, targeted suppression is the right call there, not a rewrite.

Building a new page or component:

1. Read `style-guide.md` and `tokens.md` first — extend the existing system,
   don't invent parallel conventions.
2. Check `components.md`'s inventory before building anything — reuse what's
   there; only add new specs for genuinely new page sections (see style-guide
   §13: nothing gets scaffolded speculatively).
3. If you add a component, document it in `components.md` in the same pass
   — don't let the docs drift behind the code.
