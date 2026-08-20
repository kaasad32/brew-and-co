export type MenuCategory = "Espresso" | "Pastries" | "Sandwiches" | "Cold Drinks";

export type MenuItem = {
  category: MenuCategory;
  name: string;
  description: string;
  priceCents: number;
  badge?: "Popular" | "House favorite";
};

export const MENU_CATEGORIES: MenuCategory[] = ["Espresso", "Pastries", "Sandwiches", "Cold Drinks"];

// Hand-transcribed from docs/design/menu-items.csv. Keep the two in sync if
// either changes — there is no CSV-parsing step at build time by design.
export const MENU_ITEMS: MenuItem[] = [
  { category: "Espresso", name: "Espresso", description: "A double shot, pulled to order.", priceCents: 350 },
  { category: "Espresso", name: "Macchiato", description: "Espresso marked with a spoon of foam.", priceCents: 375 },
  { category: "Espresso", name: "Americano", description: "Espresso, hot water, nothing else.", priceCents: 400 },
  { category: "Espresso", name: "Cortado", description: "Equal parts espresso and steamed milk.", priceCents: 450 },
  { category: "Espresso", name: "Cappuccino", description: "Espresso, steamed milk, a thick cap of foam.", priceCents: 475, badge: "Popular" },
  { category: "Espresso", name: "Flat White", description: "Double espresso, microfoam, no cap.", priceCents: 500 },
  { category: "Espresso", name: "Latte", description: "Espresso and steamed milk, light foam.", priceCents: 500, badge: "House favorite" },
  { category: "Espresso", name: "Mocha", description: "Espresso, steamed milk, dark chocolate.", priceCents: 550 },

  { category: "Pastries", name: "Butter Croissant", description: "Laminated dough baked fresh each morning.", priceCents: 375, badge: "House favorite" },
  { category: "Pastries", name: "Pain au Chocolat", description: "Butter pastry wrapped around two batons of dark chocolate.", priceCents: 425 },
  { category: "Pastries", name: "Banana Walnut Muffin", description: "Ripe banana, toasted walnuts, brown butter crumble.", priceCents: 400 },
  { category: "Pastries", name: "Blueberry Scone", description: "Buttermilk scone, wild blueberries, turbinado sugar.", priceCents: 400 },
  { category: "Pastries", name: "Morning Bun", description: "Croissant dough rolled in orange sugar.", priceCents: 425 },
  { category: "Pastries", name: "Almond Croissant", description: "Butter croissant, almond cream, sliced almonds.", priceCents: 475 },
  { category: "Pastries", name: "Cinnamon Roll", description: "Slow-proofed, brown sugar swirl, cream cheese icing.", priceCents: 475, badge: "Popular" },

  { category: "Sandwiches", name: "Egg & Cheddar Biscuit", description: "Fried egg, aged cheddar, on a buttermilk biscuit.", priceCents: 750 },
  { category: "Sandwiches", name: "Ham & Gruyère Croissant", description: "Black forest ham, gruyère, dijon, on a butter croissant.", priceCents: 850, badge: "Popular" },
  { category: "Sandwiches", name: "Avocado Toast", description: "Mashed avocado, chili flake, lemon, on sourdough.", priceCents: 875, badge: "House favorite" },
  { category: "Sandwiches", name: "Caprese Panini", description: "Fresh mozzarella, tomato, basil, balsamic, pressed on ciabatta.", priceCents: 925 },
  { category: "Sandwiches", name: "BLT", description: "Applewood bacon, lettuce, tomato, aioli, on sourdough.", priceCents: 900 },
  { category: "Sandwiches", name: "Turkey & Swiss on Rye", description: "Roast turkey, swiss, whole grain mustard, on rye.", priceCents: 950 },

  { category: "Cold Drinks", name: "Iced Americano", description: "Espresso over ice with cold water.", priceCents: 425 },
  { category: "Cold Drinks", name: "Iced Latte", description: "Espresso, cold milk, ice.", priceCents: 525, badge: "Popular" },
  { category: "Cold Drinks", name: "Cold Brew", description: "Steeped 18 hours, served over ice.", priceCents: 475, badge: "House favorite" },
  { category: "Cold Drinks", name: "Sparkling Espresso Tonic", description: "Espresso over tonic water and ice.", priceCents: 525 },
  { category: "Cold Drinks", name: "Iced Mocha", description: "Espresso, cold milk, dark chocolate, ice.", priceCents: 575 },
  { category: "Cold Drinks", name: "Nitro Cold Brew", description: "Cold brew on tap, nitrogen-charged for a creamy pour.", priceCents: 550 },
  { category: "Cold Drinks", name: "Iced Matcha Latte", description: "Ceremonial matcha, cold milk, ice.", priceCents: 550 },
  { category: "Cold Drinks", name: "Horchata Cold Brew", description: "Cold brew over house-made horchata.", priceCents: 575, badge: "Popular" },
];

export function getItemsByCategory(category: MenuCategory): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.category === category);
}

export function findMenuItem(category: MenuCategory, name: string): MenuItem {
  const item = MENU_ITEMS.find((i) => i.category === category && i.name === name);
  if (!item) {
    throw new Error(`Menu item not found: ${category} / ${name}`);
  }
  return item;
}
