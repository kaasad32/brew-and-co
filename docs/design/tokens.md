# Brew & Co — Design Tokens

Reference documentation for every token in `tokens.css`. `tokens.css` is the
source of truth for values; this file is the source of truth for *why* and
*where to use it*. Stack: Next.js 16 (App Router) + Tailwind CSS v4
(CSS-first `@theme`, no `tailwind.config.js`) + TypeScript.

To adopt: replace the contents of `app/globals.css` with `tokens.css`, then
register the three typefaces in `app/layout.tsx` (see the comment at the top
of `tokens.css` for the exact `next/font/google` calls), matching the
existing `Geist`/`Geist_Mono` pattern.

## Color

| Token (Tailwind class root) | Hex | Contrast vs. Parchment | Usage |
|---|---|---|---|
| `parchment` | `#F3E7D3` | — | Page background. |
| `kraft` | `#E4CBA6` | — | Card/input surfaces, table stripes. |
| `roast-900` | `#2A1810` | **13.9:1** | Primary text, icons, borders. |
| `roast-700` | `#4A2F20` | ~10.8:1 | Secondary text (captions, metadata). |
| `roast-500` | `#6B4630` | ~6.5:1 | Placeholder text, disabled labels (large/medium text only). |
| `cherry-600` | `#A83A2C` | **5.2:1** | Primary action fill, one hero accent. AA for text ≥18px or bold; below that, use as a fill with `paper` text. |
| `cherry-700` | `#8A2E22` | — | Hover/active state for `cherry-600` fills. |
| `moss-600` | `#5C6B47` | **4.7:1** | Provenance data only — origin tags, process labels, stock indicators. Set ≥14px/medium weight. Never used for actions. |
| `paper` | `#FBF4E8` | — | Text on `roast-900`/`cherry-600` fills; card surfaces inside dark sections. `paper` on `cherry-600` = **5.8:1**. |

Semantic aliases (defined in `@theme inline`, prefer these in component code):
`background`, `surface`, `foreground`, `foreground-muted`, `accent`,
`accent-hover`, `accent-foreground`, `provenance`, `inverse-background`,
`inverse-foreground`.

**Rule:** never use a raw scale color (`cherry-600`) where a semantic alias
(`accent`) says what it's *for*. The alias is the contract; the scale value
is the implementation.

## Typography

Three faces, one job each — see `style-guide.md` §6 for the rationale.

| Role | Token | Typeface | Weights used |
|---|---|---|---|
| Display | `font-display` | Fraunces | 400, 500, 600 (never bolder) |
| Body/UI | `font-body` | Archivo | 400, 500, 600, 700 |
| Utility/mono | `font-mono` | IBM Plex Mono | 400, 500 |

### Scale

`--text-*` pairs size with line-height (and tracking, where set) using
Tailwind v4's shorthand syntax, so `text-5xl` alone gets the right leading —
no separate `leading-*` utility needed.

| Token | Size | Line-height | Tracking | Typical use |
|---|---|---|---|---|
| `text-xs` | 12px | 1.4 | +0.02em | Mono ledger labels ("LOT NO.", "ROASTED"), uppercase |
| `text-sm` | 14px | 1.5 | — | Captions, helper text, nav secondary |
| `text-base` | 16px | 1.6 | — | Body copy |
| `text-lg` | 18px | 1.6 | — | Lead paragraphs |
| `text-xl` | 20px | 1.4 | — | Card titles (Archivo, 600) |
| `text-2xl` | 24px | 1.3 | — | Subheadings (Fraunces, 500) |
| `text-3xl` | 28px | 1.25 | — | Section headings (Fraunces, 500) |
| `text-4xl` | 36px | 1.15 | −0.01em | Section headings, large |
| `text-5xl` | 44px | 1.1 | −0.02em | Page/sub-hero headings |
| `text-6xl` | 56px | 1.05 | −0.02em | Hero headline, tablet |
| `text-7xl` | 72px | 1.0 | −0.02em | Hero headline, desktop |

Mono ledger labels (`text-xs`/`text-sm`, IBM Plex Mono, uppercase, tracked)
are the *only* uppercase text in the system — that restriction is what keeps
them reading as a deliberate device rather than default emphasis.

## Spacing & Layout

Uses Tailwind v4's default `--spacing` scale (4px base) unmodified — no
brand-specific override needed for a marketing/e-commerce layout like this.

| Token | Value | Usage |
|---|---|---|
| `container-brand` | 1200px | Max content width. Pair with responsive padding: `px-6 md:px-10 lg:px-16`. |

Section rhythm (apply directly, not tokenized — these are layout decisions,
not reusable primitives): mobile `py-16`, tablet `py-20`, desktop `py-28`.

## Radius

| Token | Value | Usage |
|---|---|---|
| `radius-xs` | 4px | Chips, small tags |
| `radius-sm` | 8px | Inputs, small buttons |
| `radius-md` | 14px | Cards |
| `radius-lg` | 24px | Hero panel, large media containers |
| (Tailwind default) `rounded-full` | 999px | Pill buttons, the Batch Stamp circle |

## Shadow

Warm, brown-tinted (`rgba(42,24,16,…)`), never pure black — a black shadow on
a warm palette reads as a generic UI-kit default.

| Token | Usage |
|---|---|
| `shadow-xs` | Inputs, chips at rest |
| `shadow-sm` | Buttons/cards at rest |
| `shadow-md` | Buttons/cards on hover, dropdowns |
| `shadow-lg` | Modals, the hero panel |
| `shadow-stamp` | The Batch Stamp only — a 1px ink ring plus a soft lift, mimicking pressed ink rather than a floating card |

## Motion

Deliberately **not** under `@theme` — these drive hand-written
`transition`/`animation` CSS and JS (the stamp-down sequence), not generated
Tailwind utilities. Defined once in `:root` so `prefers-reduced-motion`
collapses them all to `1ms` in one place (see `tokens.css`).

| Token | Value | Usage |
|---|---|---|
| `duration-fast` | 120ms | Micro feedback (icon toggles) |
| `duration-base` | 200ms | Hover/active transitions |
| `duration-slow` | 400ms | Panel/menu open-close |
| `duration-deliberate` | 650ms | The hero stamp-down, once per page load |
| `ease-standard` | `cubic-bezier(.4,0,.2,1)` | Default for hover/active |
| `ease-out` | `cubic-bezier(0,0,.2,1)` | Entrances (menus, toasts) |
| `ease-emphasized` | `cubic-bezier(.2,0,0,1)` | The stamp-down only |

## Focus

Not a token table entry but a fixed rule, applied via a single utility class
(see `components.md` → shared patterns):

```css
:focus-visible {
  outline: 2px solid var(--color-cherry-600);
  outline-offset: 2px;
}
```

Never `outline: none` without this replacement present.

## Breakpoints

Tailwind v4 defaults, unmodified: `sm` 640px, `md` 768px, `lg` 1024px, `xl`
1280px, `2xl` 1536px. No brand-specific breakpoints — the container cap
(`container-brand`, 1200px) is what actually governs the widescreen layout,
not a custom breakpoint.
