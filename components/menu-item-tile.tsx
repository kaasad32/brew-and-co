"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Price } from "@/components/ui/price";
import { useCart } from "@/components/cart/cart-provider";
import { getMenuItemImage } from "@/lib/menu-item-images";
import type { MenuItem } from "@/lib/menu-data";

export function MenuItemTile({ category, name, description, priceCents, badge }: MenuItem) {
  const { addItem } = useCart();
  const { src, alt } = getMenuItemImage(category, name);

  return (
    <button
      type="button"
      onClick={() => addItem({ category, name, priceCents })}
      aria-label={`Add ${name} to bag, ${(priceCents / 100).toFixed(2)} pounds`}
      title={description}
      className="group w-full rounded-md bg-surface p-3 text-center shadow-xs transition-[transform,box-shadow] duration-base ease-standard hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      <div className="relative aspect-square overflow-hidden rounded-sm bg-background">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
          className="object-cover"
        />
        <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm transition-transform duration-base ease-standard group-hover:scale-110">
          <Plus className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-3 flex flex-col items-center gap-1">
        <span className="font-body text-sm font-semibold text-foreground">{name}</span>
        {badge && (
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-provenance">
            {badge}
          </span>
        )}
        <Price cents={priceCents} />
      </div>
    </button>
  );
}
