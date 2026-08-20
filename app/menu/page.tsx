import type { Metadata } from "next";
import { MENU_CATEGORIES, getItemsByCategory } from "@/lib/menu-data";
import { MenuCategorySection } from "@/components/menu-category-section";

export const metadata: Metadata = {
  title: "Menu — Brew & Co",
  description: "Espresso, pastries, sandwiches, and cold drinks at Brew & Co, Nunhead.",
};

export default function MenuPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-(--container-brand) px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-provenance">The menu</p>
        <h1 className="mt-2 font-display text-4xl text-foreground md:text-5xl">
          What&apos;s on the counter
        </h1>
        <p className="mt-3 max-w-xl text-foreground-muted">
          Everything&apos;s made in-house, most of it that morning. Tap anything to add it to
          your bag.
        </p>
      </div>

      {MENU_CATEGORIES.map((category) => (
        <MenuCategorySection key={category} category={category} items={getItemsByCategory(category)} />
      ))}
    </div>
  );
}
