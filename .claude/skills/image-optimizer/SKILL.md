---
name: image-optimizer
description: Downloads an image from a URL (e.g. a Pexels stock photo), resizes it, and converts it to WebP, saving the result into public/images/ so it's served locally instead of hotlinked from an external site. Use whenever adding, replacing, or optimizing a stock/external image in this project — including migrating existing Pexels-hotlinked images to local files.
---

# Image Optimizer

Fetches a remote image, resizes and re-encodes it as WebP with `sharp`, and
writes it into this project's `public/` folder. Use this any time an image
comes from an external URL (Pexels, another stock site, a one-off link
someone shares) and needs to end up as a local, optimized asset instead of
a live hotlink.

## Run it

From the repo root:

```bash
node .claude/skills/image-optimizer/scripts/optimize-image.mjs <url> <outputName> [--width=1600] [--quality=78] [--out-dir=public/images]
```

- `<url>` — the source image URL. Must resolve to an actual image response
  (the script checks `content-type` and fails clearly if it doesn't).
- `<outputName>` — filename without extension; `.webp` is appended. Use a
  short, descriptive kebab-case name (`hero`, `about-roaster`,
  `popular-latte`), not the source's numeric photo ID — the ID means
  nothing once the file is local.
- `--width` — target width in pixels; height scales proportionally. The
  script never upscales (`withoutEnlargement`), so a source narrower than
  the target is left at its native size rather than blurred up. Pick the
  width for the *largest* size the image will actually render at (its
  container width × the highest device pixel ratio you want to support),
  not the source's original size.
- `--quality` — WebP quality, 0–100 (default 78 — a good balance for
  photography; drop to ~65–70 for large hero images where file size matters
  more than pixel-level fidelity).
- `--out-dir` — output directory, relative to the repo root (default
  `public/images`).

The script prints the final path, dimensions, and file size on success, so
you can sanity-check the result before wiring it into a component.

## After running it

1. Reference the file with a root-relative path (`/images/hero.webp`), the
   same way any file in `public/` is served — no import needed.
2. If the image replaces a remote URL a component was hotlinking, update
   that reference and remove the now-unneeded entry from
   `next.config.ts`'s `images.remotePatterns` once nothing on the site
   still hotlinks that host.
3. Keep the source's photographer credit as a comment next to the new
   local path if the original data had one — self-hosting the file doesn't
   remove the point of crediting the photographer.

## In this project (Brew & Co)

Image constants live in `lib/images.ts` and `lib/featured-items.ts` as
`{ src, alt, credit }` objects. When migrating one of these from a Pexels
URL to a local file: run this skill with a size matching where the image
actually renders (see each file's usage — the Hero is full-bleed and needs
the largest width; Featured Item Card images render in a ~4-column grid
and need much less), then edit the `src` field in place. Don't change
`alt`/`credit` — they still describe the same photo.
