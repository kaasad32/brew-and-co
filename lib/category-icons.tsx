import { Coffee, Croissant, Sandwich, CupSoda, type LucideIcon } from "lucide-react";
import type { MenuCategory } from "@/lib/menu-data";

// Stock icons standing in for photography on the menu grid — one per
// category, not per item (29 distinct icons would be noise, not signal).
export const CATEGORY_ICONS: Record<MenuCategory, LucideIcon> = {
  Espresso: Coffee,
  Pastries: Croissant,
  Sandwiches: Sandwich,
  "Cold Drinks": CupSoda,
};
