import { findMenuItem, type MenuCategory } from "@/lib/menu-data";
import type { ImageAsset } from "@/lib/images";

// Downloaded and converted to local WebP with the image-optimizer skill
// (.claude/skills/image-optimizer) — originally hotlinked from Pexels (or
// Unsplash where noted); credit is kept even though the file is now
// self-hosted. One entry per MENU_ITEMS row — see components.md's "Menu
// Item Tile" for why this replaced the per-category lucide-react icon.
//
// The 4 items that overlap with lib/featured-items.ts's "Most popular"
// picks intentionally duplicate that data (src/alt/credit) rather than
// importing FEATURED — this file and featured-items.ts are unrelated
// concepts (full menu vs. home-page picks) that happen to share 4 photos.
const MENU_ITEM_IMAGES: { category: MenuCategory; name: string; image: ImageAsset }[] = [
  // Espresso
  {
    category: "Espresso",
    name: "Espresso",
    image: {
      src: "/images/menu-espresso.webp",
      alt: "A simple espresso shot in a small white cup, highlighting the crema",
      credit: "Photo by Jean-Paul Wright / Pexels",
    },
  },
  {
    category: "Espresso",
    name: "Macchiato",
    image: {
      src: "/images/menu-macchiato.webp",
      alt: "A close-up shot of a short macchiato in a cafe",
      credit: "Photo by bianca-jelezniac / Pexels",
    },
  },
  {
    category: "Espresso",
    name: "Americano",
    image: {
      src: "/images/menu-americano.webp",
      alt: "Black coffee in a white cup on a plain background",
      credit: "Photo by Tugba Ozturk / Pexels",
    },
  },
  {
    category: "Espresso",
    name: "Cortado",
    image: {
      src: "/images/menu-cortado.webp",
      alt: "A hand holding a cortado coffee with heart-shaped latte art on a wooden table",
      credit: "Photo by Raymond Petrik / Pexels",
    },
  },
  {
    category: "Espresso",
    name: "Cappuccino",
    image: {
      src: "/images/menu-cappuccino.webp",
      alt: "An overhead view of a foamy cappuccino with latte art",
      credit: "Photo by Orlovamaria / Pexels",
    },
  },
  {
    category: "Espresso",
    name: "Flat White",
    image: {
      src: "/images/menu-flat-white.webp",
      alt: "A flat white coffee with heart-shaped latte art",
      credit: "Photo by Anne-Marie / Pexels",
    },
  },
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
    category: "Espresso",
    name: "Mocha",
    image: {
      src: "/images/menu-mocha.webp",
      alt: "A glass of mocha coffee topped with whipped cream and chocolate",
      credit: "Photo by Franco Monsalvo / Pexels",
    },
  },

  // Pastries
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
    category: "Pastries",
    name: "Pain au Chocolat",
    image: {
      src: "/images/menu-pain-au-chocolat.webp",
      alt: "A pain au chocolat pastry on a white plate",
      credit: "Photo by Roop Sarkar / Pexels",
    },
  },
  {
    category: "Pastries",
    name: "Banana Walnut Muffin",
    image: {
      src: "/images/menu-banana-walnut-muffin.webp",
      alt: "A close-up of a banana walnut muffin topped with oats",
      credit: "Photo by Kiara Coll / Pexels",
    },
  },
  {
    category: "Pastries",
    name: "Blueberry Scone",
    image: {
      src: "/images/menu-blueberry-scone.webp",
      alt: "Freshly prepared blueberry scones being glazed in a home kitchen",
      credit: "Photo by Wendy Wei / Pexels",
    },
  },
  {
    category: "Pastries",
    name: "Morning Bun",
    image: {
      src: "/images/menu-morning-bun.webp",
      alt: "Morning buns on a bakery display",
      credit: "Photo by James Collington / Pexels",
    },
  },
  {
    category: "Pastries",
    name: "Almond Croissant",
    image: {
      src: "/images/menu-almond-croissant.webp",
      alt: "A freshly baked almond croissant topped with toasted almond slices",
      credit: "Photo by nano-erdozain / Pexels",
    },
  },
  {
    category: "Pastries",
    name: "Cinnamon Roll",
    image: {
      src: "/images/menu-cinnamon-roll.webp",
      alt: "A close-up of a freshly baked cinnamon roll",
      credit: "Photo by Alex Koval / Pexels",
    },
  },

  // Sandwiches
  {
    category: "Sandwiches",
    name: "Egg & Cheddar Biscuit",
    image: {
      src: "/images/menu-egg-cheddar-biscuit.webp",
      alt: "A breakfast biscuit sandwich with egg and cheese",
      credit: "Photo by Angele J / Pexels",
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
    category: "Sandwiches",
    name: "Avocado Toast",
    image: {
      src: "/images/menu-avocado-toast.webp",
      alt: "Avocado toast with lemon slices on a plate",
      credit: "Photo by Fotios Photos / Pexels",
    },
  },
  {
    category: "Sandwiches",
    name: "Caprese Panini",
    image: {
      src: "/images/menu-caprese-panini.webp",
      alt: "A caprese sandwich with fresh mozzarella, tomato, and basil on ciabatta bread",
      credit: "Photo by Andres Alaniz / Pexels",
    },
  },
  {
    category: "Sandwiches",
    name: "BLT",
    image: {
      src: "/images/menu-blt.webp",
      alt: "A BLT sandwich with lettuce, tomato, and bacon",
      credit: "Photo by Nano Erdozain / Pexels",
    },
  },
  {
    category: "Sandwiches",
    name: "Turkey & Swiss on Rye",
    image: {
      src: "/images/menu-turkey-swiss-rye.webp",
      alt: "A sliced turkey and cheese sandwich wrapped in paper",
      credit: "Photo by Wendy Wei / Pexels",
    },
  },

  // Cold Drinks
  {
    category: "Cold Drinks",
    name: "Iced Americano",
    image: {
      src: "/images/menu-iced-americano.webp",
      alt: "An iced Americano showing layered espresso and ice in a glass",
      credit: "Photo by Nguyễn Tiến Thành / Pexels",
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
  {
    category: "Cold Drinks",
    name: "Cold Brew",
    image: {
      src: "/images/menu-cold-brew.webp",
      alt: "A chilled glass of iced cold brew coffee on a bar mat",
      credit: "Photo by Kari Alfonso / Pexels",
    },
  },
  {
    category: "Cold Drinks",
    name: "Sparkling Espresso Tonic",
    image: {
      src: "/images/menu-sparkling-espresso-tonic.webp",
      alt: "An espresso tonic with mint, served on a cafe table",
      credit: "Photo by Haberdoedas / Pexels",
    },
  },
  {
    category: "Cold Drinks",
    name: "Iced Mocha",
    image: {
      src: "/images/menu-iced-mocha.webp",
      alt: "An iced mocha topped with whipped cream and chocolate drizzle",
      credit: "Photo by Luis Espinoza / Pexels",
    },
  },
  {
    category: "Cold Drinks",
    name: "Nitro Cold Brew",
    image: {
      src: "/images/menu-nitro-cold-brew.webp",
      alt: "A barista pouring nitro cold brew coffee from a tap in a cafe",
      credit: "Photo by Eden FC / Pexels",
    },
  },
  {
    category: "Cold Drinks",
    name: "Iced Matcha Latte",
    image: {
      src: "/images/menu-iced-matcha-latte.webp",
      alt: "A chilled glass of iced matcha latte with milk",
      credit: "Photo by Soc Nang Dung / Pexels",
    },
  },
  {
    category: "Cold Drinks",
    name: "Horchata Cold Brew",
    image: {
      src: "/images/menu-horchata-cold-brew.webp",
      alt: "A traditional horchata drink in a mason jar",
      credit: "Photo by Diana Reyes / Pexels",
    },
  },
];

export function getMenuItemImage(category: MenuCategory, name: string): ImageAsset {
  // Confirm the item is real (throws with the same message shape as
  // findMenuItem) before looking up its photo, so a typo in this file's
  // category/name pair fails the same way a typo in MENU_ITEMS would.
  findMenuItem(category, name);

  const entry = MENU_ITEM_IMAGES.find((i) => i.category === category && i.name === name);
  if (!entry) {
    throw new Error(`Menu item image not found: ${category} / ${name}`);
  }
  return entry.image;
}
