export type ImageAsset = {
  src: string;
  alt: string;
  credit: string;
};

// Downloaded and converted to local WebP with the image-optimizer skill
// (.claude/skills/image-optimizer) — originally hotlinked from Pexels;
// credit is kept even though the file is now self-hosted.
export const HERO_IMAGE: ImageAsset = {
  src: "/images/hero.webp",
  alt: "A barista pouring latte art in a warmly lit artisan cafe",
  credit: "Photo by yasin-onus / Pexels",
};

export const ABOUT_IMAGE: ImageAsset = {
  src: "/images/about-roaster.webp",
  alt: "An industrial coffee bean roaster mid-roast, fresh coffee tumbling out",
  credit: "Photo by betul-ustun / Pexels",
};

// Per-category photos (Espresso/Pastries/Sandwiches/Cold Drinks) were
// removed when the menu moved to an icon grid — see
// docs/design/components.md's "Menu Category Section" note. Their verified
// Pexels URLs are still on record in the project plan if photography is
// ever reintroduced there.
