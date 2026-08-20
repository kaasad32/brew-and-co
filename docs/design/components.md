# Brew & Co — Component Specs

Implements `style-guide.md` using the tokens in `tokens.md`/`tokens.css`.
Stack conventions used throughout: Next.js 16 App Router, React 19,
TypeScript, Tailwind v4 utility classes built on the semantic aliases
(`bg-background`, `text-foreground`, `bg-accent`, etc.) — never raw hex or
raw scale tokens in component code. Components are Server Components by
default; `"use client"` is called out where local state or event handlers
require it.

## Inventory

| Component | Purpose | Client? |
|---|---|---|
| [Button](#button) | Primary/secondary/ghost actions | No (unless `onClick` passed) |
| [Batch Stamp](#batch-stamp) — signature | Origin/roast data, hero + card + watermark | No |
| [Product Card](#product-card) | Bean/product grid item | No |
| [Origin Chip](#origin-chip) | Category filter (Beans, Brew Bar, Merch, Subscriptions) | Yes (selection state) |
| [Nav Bar](#nav-bar) | Site header | Yes (mobile menu, search) |
| [Section Divider — tear-line](#section-divider--tear-line) | Break between page sections | No |
| [Form Field](#form-field) | Input/select/textarea with label + helper/error | Yes |
| [Price](#price) | Mono price display, sale state | No |
| [Footer](#footer) | Site footer, dark section | No |
| [Empty State](#empty-state) | Empty bag/search results | No |
| [Toast](#toast) | Inline confirmation/error | Yes |
| [Hero](#hero) | Photo hero with the signature corner stamp | Partial (CTA is client) |
| [Reservation modal](#reservation-modal) | "Reserve a table" dialog, 3 files | Yes |
| [Event Card](#event-card) | Ticket-stub for a recurring event | No |
| [Featured Item Card](#featured-item-card--popular-items) | Home "Most popular" card — click to add | Yes |
| [Menu Item Tile](#menu-item-tile) | Photo tile on `/menu` (per-item photo, not a category icon) — click to add | Yes |
| [Menu Category Section](#menu-category-section) | Category heading (icon) + item photo grid | No |
| [Cart system](#cart-system) | Bag, quantity management, checkout — 5 files | Yes |

`ProductCard` and `OriginChip` are specced above but not currently built —
the site has no filterable multi-page catalogue or bean-subscription flow
yet (see style-guide.md §13: don't scaffold speculatively). `EmptyState` was
speculative in the first build but is now used for real, by the cart.

Shared rule for every interactive component: `:focus-visible` uses the fixed
2px Cherry ring from `tokens.md` §Focus — do not redefine focus styling
per-component.

---

## Button

**Anatomy:** optional leading icon → label → optional trailing icon.

**Variants:** `primary` (Cherry fill, Paper text — the one action per view),
`secondary` (Roast outline, transparent fill), `secondary-inverse` (Paper
outline/text, for a secondary button placed over photography — see the hero
CTA), `ghost` (text-only, Roast).

**Don't recolor a variant via an external `className` override** — e.g.
passing `text-paper` into `buttonClassName("secondary", ...)` to use it over
a dark photo. Two same-specificity `text-*` (or `border-*`) utilities are
ordered by Tailwind's generated stylesheet, not by the order they appear in
the `className` string, so the override can silently lose. This bit the
first real build: the hero's "View menu" link happened to render correctly,
but only by luck of build ordering, not because the override was reliable.
The fix is always a dedicated variant (like `secondary-inverse`), never a
color-utility override from outside.

**Sizes:** `sm` (36px tall), `md` (44px, default), `lg` (52px, hero use).

**States:** default, hover (1px lift + shadow step-up), active (0px lift,
shadow-xs, slight Cherry-700/Roast-700 darken), `:focus-visible` (ring),
disabled (50% opacity, no pointer events, no hover/active transforms).

```tsx
// components/ui/button.tsx
import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold " +
  "transition-[transform,box-shadow,background-color] duration-base ease-standard " +
  "disabled:opacity-50 disabled:pointer-events-none " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

const variants = {
  primary:
    "bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-xs",
  secondary:
    "border border-foreground/20 text-foreground bg-transparent hover:bg-foreground/5 hover:-translate-y-px active:translate-y-0",
  "secondary-inverse":
    "border border-paper/40 text-paper bg-transparent hover:bg-paper/10 hover:-translate-y-px active:translate-y-0",
  ghost:
    "text-foreground hover:bg-foreground/5",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-13 px-8 text-lg",
};

// Exported so non-<button> elements (e.g. the <a> in EmptyState) can share
// identical styling without duplicating the variant/size logic.
export function buttonClassName(
  variant: ButtonProps["variant"] = "primary",
  size: ButtonProps["size"] = "md",
  className = ""
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...props }, ref) => (
    <button ref={ref} className={buttonClassName(variant, size, className)} {...props} />
  )
);
Button.displayName = "Button";
```

**Usage rule:** one `primary` per view. A card can have a `secondary`
"Add to bag" if the page's `primary` is elsewhere (e.g. hero "Shop beans").
Label copy follows `style-guide.md` §4 — active voice, e.g. "Add to bag,"
"Start subscription," never "Submit" / "Learn more."

---

## Batch Stamp

*Signature element — see `style-guide.md` §7 before reusing this anywhere
new.* A circle of curved mono text (`BREW & CO · SINGLE ORIGIN ·`, repeating)
around a rim, with real roast data centered inside. Built with SVG
`<textPath>` so the curved type is real text, not an image.

**Sizes:** `lg` (240px, hero — one per page), `sm` (72px, product card
corner), `watermark` (480px, 6% opacity, footer background — decorative,
`aria-hidden`).

**Data props are required, never placeholder text** — if a product has no
roast date yet, don't render the stamp; show the product without one rather
than fabricating data.

```tsx
// components/ui/batch-stamp.tsx
type BatchStampProps = {
  origin: string; // e.g. "Huila, Colombia"
  altitude: string; // e.g. "1,850m"
  process: string; // e.g. "Washed"
  roastedOn: string; // ISO date, formatted by caller e.g. "12 AUG 2026"
  size?: "lg" | "sm" | "watermark";
  className?: string;
};

const dims = { lg: 240, sm: 72, watermark: 480 };

export function BatchStamp({
  origin,
  altitude,
  process,
  roastedOn,
  size = "lg",
  // Default only applies when the caller omits className — an override
  // fully replaces it rather than competing with it in the generated
  // stylesheet (see the Button spec's note on the same class of bug).
  className = "text-roast-900",
}: BatchStampProps) {
  const d = dims[size];
  const id = `stamp-rim-${size}`;
  const decorative = size === "watermark";

  return (
    <svg
      viewBox="0 0 240 240"
      width={d}
      height={d}
      className={`${size === "watermark" ? "opacity-[0.06] " : ""}${className}`}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : `${origin}, ${altitude}, ${process}, roasted ${roastedOn}`}
    >
      <circle
        cx="120"
        cy="120"
        r="112"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray={size === "sm" ? "2 4" : "3 6"}
      />
      <path id={id} fill="none" d="M 120,120 m -96,0 a 96,96 0 1,1 192,0 a 96,96 0 1,1 -192,0" />
      {size !== "sm" && (
        <text fontFamily="var(--font-mono)" fontSize="11" letterSpacing="3" fill="currentColor">
          <textPath href={`#${id}`} startOffset="0%">
            BREW &amp; CO &#183; SINGLE ORIGIN &#183; BREW &amp; CO &#183; SINGLE ORIGIN &#183;
          </textPath>
        </text>
      )}
      {size === "lg" && (
        <g fontFamily="var(--font-mono)" fill="currentColor" textAnchor="middle">
          <text x="120" y="105" fontSize="13" fontWeight="500">{origin.toUpperCase()}</text>
          <text x="120" y="125" fontSize="10" opacity="0.75">{altitude} &#183; {process}</text>
          <text x="120" y="145" fontSize="10" opacity="0.75">{roastedOn}</text>
        </g>
      )}
    </svg>
  );
}
```

**Hero entrance (`lg` only):** wrap in a client component that adds the
stamp-down keyframe on mount:

```css
@keyframes stamp-down {
  from { opacity: 0; transform: scale(1.12) rotate(-2deg); }
  to   { opacity: 1; transform: scale(1) rotate(0deg); }
}
.stamp-hero {
  animation: stamp-down var(--duration-deliberate) var(--ease-emphasized) both;
}
@media (prefers-reduced-motion: reduce) {
  .stamp-hero { animation: opacity var(--duration-base) linear both; }
}
```

Runs once, on page load, never on scroll-into-view — see `style-guide.md` §9.

---

## Product Card

**Anatomy:** image → name (Fraunces) → origin chip (Moss text) → price
(mono) → `sm` Batch Stamp in the top-right corner, overlapping the image →
`secondary` "Add to bag" button.

```tsx
// components/ui/product-card.tsx
import Image from "next/image";
import { BatchStamp } from "./batch-stamp";
import { Price } from "./price";
import { Button } from "./button";

type ProductCardProps = {
  name: string;
  origin: string;
  process: string;
  altitude: string;
  roastedOn: string;
  priceCents: number;
  imageSrc: string;
  imageAlt: string;
};

export function ProductCard({
  name, origin, process, altitude, roastedOn, priceCents, imageSrc, imageAlt,
}: ProductCardProps) {
  return (
    <article className="group rounded-md bg-surface p-4 shadow-xs transition-shadow duration-base ease-standard hover:shadow-md">
      <div className="relative aspect-square overflow-hidden rounded-sm bg-background">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        <BatchStamp
          origin={origin} altitude={altitude} process={process} roastedOn={roastedOn}
          size="sm"
          className="absolute -right-2 -top-2 bg-background rounded-full shadow-stamp"
        />
      </div>
      <h3 className="mt-4 font-display text-xl text-foreground">{name}</h3>
      <p className="mt-1 text-sm text-provenance">{origin}</p>
      <div className="mt-3 flex items-center justify-between">
        <Price cents={priceCents} />
        <Button variant="secondary" size="sm">Add to bag</Button>
      </div>
    </article>
  );
}
```

---

## Origin Chip

Filter/category control (Beans, Brew Bar, Merch, Subscriptions — real
sections of the catalogue, not decorative categories). Toggle button, not a
link, since it filters in place.

```tsx
// components/ui/origin-chip.tsx
"use client";

type OriginChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

export function OriginChip({ label, selected = false, onClick }: OriginChipProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className={[
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-base ease-standard",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        selected
          ? "border-accent bg-accent text-accent-foreground"
          : "border-foreground/15 bg-transparent text-foreground hover:bg-foreground/5",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
```

---

## Nav Bar

**Anatomy:** wordmark (Fraunces, "Brew & Co.") → nav links (Archivo,
`text-sm font-medium`) → search input → bag button (icon + count). Sticky,
`bg-background/90 backdrop-blur` after scroll past hero height; plain
`bg-background` at top so the hero owns the first screen.

Mobile: links collapse into a disclosure menu; search and bag stay visible.

```tsx
// components/nav-bar.tsx
"use client";
import { useState } from "react";
import { Button } from "./ui/button";

const LINKS = [
  { href: "/beans", label: "Beans" },
  { href: "/brew-bar", label: "Brew bar" },
  { href: "/subscriptions", label: "Subscriptions" },
  { href: "/journal", label: "Journal" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-(--container-brand) items-center justify-between px-6 md:px-10">
        <a href="/" className="font-display text-xl text-foreground">Brew &amp; Co.</a>
        <nav className="hidden gap-8 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground hover:text-accent">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Bag (0)</Button>
          <button
            type="button"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="flex flex-col gap-4 border-t border-foreground/10 px-6 py-4 md:hidden">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-base font-medium text-foreground">{l.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
```

---

## Section Divider — tear-line

Replaces a plain `<hr>` between major page sections — a dashed rule with a
notch at each end, echoing a receipt perforation. Purely decorative
(`aria-hidden`); the optional label is a real heading rendered separately for
screen readers if the section needs one.

```tsx
// components/ui/tear-line.tsx
type TearLineProps = { label?: string };

export function TearLine({ label }: TearLineProps) {
  return (
    <div className="relative flex items-center py-2" aria-hidden="true">
      <span className="h-3 w-3 shrink-0 rounded-full border border-foreground/20 bg-background" />
      <span className="mx-2 h-px flex-1 border-t border-dashed border-foreground/25" />
      {label && (
        <span className="shrink-0 px-3 font-mono text-xs tracking-[0.15em] text-foreground-muted">
          {label.toUpperCase()}
        </span>
      )}
      <span className="mx-2 h-px flex-1 border-t border-dashed border-foreground/25" />
      <span className="h-3 w-3 shrink-0 rounded-full border border-foreground/20 bg-background" />
    </div>
  );
}
```

Use between page sections only (hero → featured lots → journal → footer,
etc.) — never inside a card or between individual products; at that scale
it competes with the Batch Stamp for attention.

---

## Form Field

Shared shell for input/select/textarea: label above, helper or error text
below (never both at once), Kraft fill at rest, Cherry focus ring.

```tsx
// components/ui/form-field.tsx
"use client";
import { useId, type InputHTMLAttributes } from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helperText?: string;
  error?: string;
};

export function FormField({ label, helperText, error, id, ...props }: FormFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-foreground">{label}</label>
      <input
        id={fieldId}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
        className={[
          "h-11 rounded-sm border bg-surface px-3.5 text-base text-foreground placeholder:text-foreground-muted/60",
          "transition-colors duration-base ease-standard",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
          error ? "border-cherry-600" : "border-foreground/15 focus:border-accent",
        ].join(" ")}
        {...props}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="text-sm text-cherry-600">{error}</p>
      ) : helperText ? (
        <p id={`${fieldId}-helper`} className="text-sm text-foreground-muted">{helperText}</p>
      ) : null}
    </div>
  );
}
```

Error copy follows `style-guide.md` §4: state what happened and how to fix
it — "Enter a valid email so we can send your receipt," not "Invalid input."

---

## Price

Always mono — a price is data, not prose. **Currency is £**, not $ — Brew &
Co is a London shop; this was caught during the first real build (see
`README.md`'s adoption note) and is not a per-market option, just the fixed
correct symbol for this brand.

```tsx
// components/ui/price.tsx
type PriceProps = { cents: number; compareAtCents?: number };

export function Price({ cents, compareAtCents }: PriceProps) {
  const format = (c: number) => `£${(c / 100).toFixed(2)}`;
  return (
    <span className="font-mono text-base text-foreground">
      {format(cents)}
      {compareAtCents && compareAtCents > cents && (
        <span className="ml-2 text-foreground-muted line-through">{format(compareAtCents)}</span>
      )}
    </span>
  );
}
```

---

## Footer

The one section that intentionally inverts to Roast background / Paper text
— see `style-guide.md` §8. Carries a large, low-opacity Batch Stamp
watermark, positioned so it never sits behind live text.

```tsx
// components/footer.tsx
import { BatchStamp } from "./ui/batch-stamp";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-inverse-background text-inverse-foreground">
      <BatchStamp
        origin="" altitude="" process="" roastedOn=""
        size="watermark"
        className="pointer-events-none absolute -right-24 -top-24 text-inverse-foreground"
      />
      <div className="relative mx-auto max-w-(--container-brand) px-6 py-16 md:px-10">
        <p className="font-display text-2xl">Brew &amp; Co.</p>
        <p className="mt-2 max-w-sm text-sm text-inverse-foreground/70">
          Roasted in small batches. Every bag ships within a week of its roast date.
        </p>
      </div>
    </footer>
  );
}
```

---

## Empty State

Used for an empty bag, no search results, or an empty order history — never
a bare "No items." Built for real by the cart drawer's empty-bag state.

```tsx
// components/ui/empty-state.tsx
import { buttonClassName } from "./button";

type EmptyStateProps = {
  message: string; // e.g. "Your bag is empty. Add something from the menu."
  actionLabel: string; // e.g. "Browse menu"
  actionHref: string;
  // Optional — lets an overlay (e.g. the cart drawer) close itself before
  // the link navigates, so it doesn't linger open over the destination page.
  onAction?: () => void;
};

export function EmptyState({ message, actionLabel, actionHref, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="max-w-sm font-display text-xl text-foreground">{message}</p>
      <a href={actionHref} onClick={onAction} className={buttonClassName("primary", "md")}>
        {actionLabel}
      </a>
    </div>
  );
}
```

---

## Toast

Inline confirmation, bottom-center on mobile, bottom-right on desktop. Two
tones only: `confirm` (Roast/Paper) and `error` (Cherry border, Paper fill).
No `success`-green — green is reserved for `moss` provenance data and would
blur that meaning.

```tsx
// components/ui/toast.tsx
type ToastProps = { message: string; tone?: "confirm" | "error" };

export function Toast({ message, tone = "confirm" }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "rounded-sm px-4 py-3 text-sm font-medium shadow-md",
        tone === "confirm"
          ? "bg-inverse-background text-inverse-foreground"
          : "border border-cherry-600 bg-paper text-cherry-600",
      ].join(" ")}
    >
      {message}
    </div>
  );
}
```

Copy examples per `style-guide.md` §4: `tone="confirm"` → "Added to bag."
`tone="error"` → "Couldn't add that — check your connection and try again."

---

## Site components (Home / About / Menu build)

The components below were built for the real pages and aren't generic
catalogue UI like the rest of this doc — each is specific to one page
section (except the cart system, which is genuinely site-wide).
Documented here so `design-enforcer` treats them as resolved gaps, not
drift, and so the next page reuses them instead of reinventing the pattern.

### Hero

Full-bleed photo (`next/image fill priority`) + a warm gradient scrim
(`bg-gradient-to-t from-roast-900 via-roast-900/40 to-transparent`) for
text legibility, a small `sm` `BatchStamp` rotated in the corner — carrying
real, specific data for the current lot, never placeholder — Fraunces
headline, Archivo subhead, and a client CTA row (primary "Reserve a table" +
`secondary-inverse` "View menu"). One per site, on Home only — this is the
"large, once" hero moment; other pages get a supporting image at most, not
a second full hero treatment.

### Reservation modal

Three files sharing one dialog instance via context, mounted once in
`app/layout.tsx` so both the NavBar trigger and the Home hero CTA open the
same `<dialog>`:

- **Provider** — context exposing `open()`, holding the `dialogRef`.
- **Dialog** — the native `<dialog>` itself. Centering is **explicit**
  (`position: fixed; top/left: 50%; transform: translate(-50%,-50%)`), not
  the UA-default `margin: auto` — Tailwind's Preflight resets margin on
  every element, which silently defeats native `<dialog>` centering if you
  rely on the default. Backdrop-click-to-close also needs an explicit
  handler (`onClick` on the dialog, close only when
  `event.target === event.currentTarget`) — native `<dialog>` does not do
  this on its own, only Escape and an explicit `close()` call do. Top edge
  uses `.tear-edge-top` (a torn-slip effect, not the `<TearLine>` component
  — wrong shape for a dialog edge).
- **Form** — 4 `FormField`s (name, party size, date, time), pure validation
  in a `lib/` function, errors describe the actual constraint (e.g. that
  day's real hours), success replaces the form with an inline
  `Toast(tone="confirm")` echoing the entered values. Reset-on-close is a
  `key` remount of the form from the dialog's `onClose`, not manual state
  clearing.

### Event Card

A ticket stub, not a generic card: fixed-width mono weekday/day-of-month
stub on the left, an **internal** dashed perforation
(`.tear-edge-side`) separating it from the content — this is a deliberate,
documented exception to "never use a tear-line inside a card" above, because
here the card *is* a torn ticket. `cadenceLabel` ("Every Friday") uses Moss
as a legitimate recurring-nature tag; a specific `timeLabel` ("7–9pm") does
not use Moss — a specific time isn't provenance data.

### Featured Item Card / Popular Items

Home's "Most popular" grid — now clickable (`"use client"`, calls
`useCart().addItem` directly on click; the whole card is a `<button>`, not
just a sub-element). A small `Plus`-in-a-circle badge overlaps the image's
top-right corner as a click-to-add affordance, echoing the corner-accent
position the Batch Stamp uses elsewhere so the grammar stays consistent
("top-right corner = a marker/action") even though this badge has nothing
to do with the stamp itself. Still has **no** per-item `BatchStamp`: the
menu items it displays have no origin/altitude/process/roast-date fields,
and fabricating that data to fill a stamp would violate the stamp's own
"real data only" rule — the stamp is reserved for things that actually
carry origin data (whole-bean bags), not prepared drinks/food.

### Menu Item Tile

**Supersedes an earlier decision, twice now.** The first pass at `/menu`
used category photo headers plus a plain typographic item list,
deliberately chosen to avoid feeling like a delivery-app grid. The user
then explicitly asked for a clickable icon grid so every item can be
tapped straight into the cart — that request overrode the earlier
restraint call outright (per the frontend-design skill: the brief's own
words always win). Category photos were removed from `/menu` entirely at
that point; `lib/images.ts`'s `CATEGORY_IMAGES` export was deleted rather
than left unused.

The icon grid then iterated once more: one `lucide-react` icon shared
across every item in a category (all 8 espresso drinks used the same cup
glyph) read as noise once the grid was in front of real content — a
Cortado and a Mocha looked identical at a glance. Each of the 29
`MENU_ITEMS` now gets its own real photo (sourced, downloaded, and
optimized to local WebP with the `image-optimizer` skill, same as every
other image on the site) instead of sharing its category's icon — see
`lib/menu-item-images.ts` and its `getMenuItemImage(category, name)`
lookup (mirrors `findMenuItem`'s not-found error shape). This is still
**not** a Batch Stamp (see Featured Item Card above for why): the stamp
stays reserved for whole-bean bags with real origin data.

**Iterated a third time**, from the circular photo badge described above to
a full-width square photo filling the top of the card — the same treatment
Featured Item Card uses. The circular badge read fine at the old 96px size
inside `MenuCategorySection`'s tighter grid, but once the grid widened
(`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`, a photo now spans a full
column instead of a small badge in the corner) a small ringed circle felt
under-scaled next to Featured Item Card's square treatment one section up —
two different photo shapes for what's visually the same "item card"
concept. Squaring the photo off and letting it fill the card's full width
brought the two into alignment.

Each tile (`"use client"`, calls `useCart().addItem` on click) is a
`<button>`: a full-width square photo — `next/image` `<Image fill
sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
className="object-cover">` inside an `aspect-square overflow-hidden
rounded-sm` — name, optional badge (mono, Moss), `Price` (mono, £), and the
same corner `Plus` affordance badge as Featured Item Card. Unlike the old
badge, the `<Image>` now carries its real `alt` from
`lib/menu-item-images.ts` rather than `alt=""`: at this size the photo is
no longer a small decorative accent next to the name, it's the dominant
element of the card, so it needs its own description. `aria-label` still
states the full add-to-bag action and price (e.g. "Add Latte to bag, 5.00
pounds") since the visible text alone doesn't say what the click does.

The photo swap forced a re-source of 25 of the 29 `lib/menu-item-images.ts`
files: they'd originally been downloaded at 300px wide, sized for the old
96px circle at up to ~3x DPR. Rendered full-width in a grid column at this
size, those 300px files would upscale and look soft. All 25 were re-found
on Pexels and re-downloaded at 800px with the same `image-optimizer` skill
(the 4 files shared with `lib/featured-items.ts` were already 800px and
didn't need touching).

### Menu Category Section

One per category on `/menu`: a heading row (the category's icon in a small
ring + the category name as a real `<h2>` in Fraunces — this is the
section's accessible heading), a decorative `<TearLine>` beneath it, then a
responsive grid (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`) of
`MenuItemTile`. No photo header — see Menu Item Tile above for why that
changed.

## Cart system

Five files, one `CartProvider` mounted once in `app/layout.tsx` (alongside,
not nested inside, `ReservationProvider` — two independent contexts, order
between them doesn't matter) so every page shares one cart and one drawer
instance:

- **`components/cart/cart-provider.tsx`** (`"use client"`) — holds
  `CartLine[]` (`{ category, name, priceCents, quantity }`), exposes
  `addItem`/`removeItem`/`setQuantity`/`clear`/`totalCents`/`totalCount`/
  `open()` via `useCart()`. Persists to `localStorage` (`brew-and-co-cart`):
  state starts empty (SSR-safe), hydrates from storage in a `useEffect` on
  mount, writes back on every change after hydration. `addItem` also drives
  a transient "Added {name} to your bag." `Toast`, auto-clearing after
  ~2.2s — the confirmation for a single-click add that has no other
  feedback moment (no page navigation, no visible cart until opened).
- **`components/cart/cart-drawer.tsx`** (`"use client"`) — the native
  `<dialog>`, same accessible-modal foundation as the reservation dialog
  (focus trap, Escape, explicit backdrop-click handler), styled as a
  right-docked full-height panel instead of a centered card
  (`dialog.cart-drawer` in `globals.css`: `position: fixed; inset: 0 0 0
  auto`, full height, `border-radius: 0`). Internal `step` state
  (`"cart" | "checkout" | "confirmed"`) resets to `"cart"` on the dialog's
  `onClose` — a half-finished checkout never lingers the next time the bag
  opens. Empty state uses `<EmptyState>` (with `onAction` closing the
  drawer before the "Browse menu" link navigates).
- **`components/cart/cart-line-item.tsx`** — one row: name/category, a
  quantity stepper (`Minus`/`Plus` icon buttons, 28px circular, each with a
  descriptive `aria-label` — "Decrease quantity of Latte", not just
  "Decrease"), a `Trash2` remove button, and the line's total `Price`.
  Quantity dropping to 0 removes the line (handled in the provider's
  `setQuantity`, not duplicated in the component).
- **`components/cart/checkout-form.tsx`** (`"use client"`) — name + email,
  validated by `lib/validate-checkout.ts` (same pattern as
  `lib/validate-reservation.ts`: pure function, field-keyed errors, focus
  moves to the first invalid field on submit). No payment fields — Brew &
  Co has no backend or payment processor, so checkout is honestly
  client-only, matching the reservation form's precedent — the no-backend
  stance applies to every form on the site, not just reservations.
- Confirmation (rendered inline by `cart-drawer.tsx`, not a separate file)
  — a `Receipt` icon, a generated order number (`BC-XXXXX`), item count,
  total, and the email entered, in copy that never claims more than what
  actually happened (no "your order is being prepared," no real email is
  sent). `clear()` runs immediately when the order is placed, before the
  confirmation is even shown, so there's no way to see stale items if the
  drawer is reopened mid-confirmation.

**Two dialogs, two drawer shapes, one CSS lesson repeated:** the cart
drawer's centering/positioning is explicit for the same reason the
reservation dialog's is (`components.md`'s Reservation modal note above) —
copy that pattern for any future `<dialog>`-based overlay rather than
rederiving it.
