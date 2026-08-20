import { findMenuItem, type MenuCategory } from "@/lib/menu-data";
import type { ImageAsset } from "@/lib/images";

// Downloaded and converted to local WebP with the image-optimizer skill
// (.claude/skills/image-optimizer) — originally hotlinked from Pexels;
// credit is kept even though the file is now self-hosted.
const FEATURED: { category: MenuCategory; name: string; image: ImageAsset }[] = [
  {
    category: "Espresso",
    name: "Latte",
    image: {
      src: "/images/popular-latte.webp",
      alt: "An elegant flat white style coffee with latte art on a wooden table",
      credit: "Photo by thiagomobile / Pexels",
    },
  },
  {
    category: "Pastries",
    name: "Butter Croissant",
    image: {
      src: "/images/popular-butter-croissant.webp",
      alt: "A basket of golden croissants",
      credit: "Photo by Wijs Wise / Pexels",
    },
  },
  {
    category: "Sandwiches",
    name: "Ham & Gruyère Croissant",
    image: {
      src: "/images/popular-ham-gruyere-croissant.webp",
      alt: "A toasted panini sandwich on a wooden plate",
      credit: "Photo by Bert Christiaens / Pexels",
    },
  },
  {
    category: "Cold Drinks",
    name: "Iced Latte",
    image: {
      src: "/images/popular-iced-latte.webp",
      alt: "A refreshing iced coffee in a glass",
      credit: "Photo by Koushalya Karthikeyan / Pexels",
    },
  },
];

export function getFeaturedItems() {
  return FEATURED.map(({ category, name, image }) => ({
    ...findMenuItem(category, name),
    ...image,
  }));
}
