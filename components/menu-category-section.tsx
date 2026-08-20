import { TearLine } from "@/components/ui/tear-line";
import { MenuItemTile } from "@/components/menu-item-tile";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import type { MenuCategory, MenuItem } from "@/lib/menu-data";

type MenuCategorySectionProps = {
  category: MenuCategory;
  items: MenuItem[];
};

export function MenuCategorySection({ category, items }: MenuCategorySectionProps) {
  const Icon = CATEGORY_ICONS[category];

  return (
    <section className="mx-auto max-w-(--container-brand) px-6 py-10 md:px-10">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 text-accent">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="font-display text-3xl text-foreground">{category}</h2>
      </div>

      <div className="mt-4">
        <TearLine />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <MenuItemTile key={item.name} {...item} />
        ))}
      </div>
    </section>
  );
}
