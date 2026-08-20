import { getFeaturedItems } from "@/lib/featured-items";
import { FeaturedItemCard } from "@/components/featured-item-card";
import { TearLine } from "@/components/ui/tear-line";

export function PopularItems() {
  const items = getFeaturedItems();

  return (
    <section className="mx-auto max-w-(--container-brand) px-6 py-16 md:px-10 md:py-20">
      <TearLine label="Most popular" />
      <h2 className="sr-only">Most popular</h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <FeaturedItemCard key={`${item.category}-${item.name}`} {...item} />
        ))}
      </div>
    </section>
  );
}
