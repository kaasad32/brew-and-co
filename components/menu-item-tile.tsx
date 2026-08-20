"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Price } from "@/components/ui/price";
import { useCart } from "@/components/cart/cart-provider";
import { getMenuItemImage } from "@/lib/menu-item-images";
import type { MenuItem } from "@/lib/menu-data";

export function MenuItemTile({ category, name, description, priceCents, badge }: MenuItem) {
  const { addItem } = useCart();
  const { src } = getMenuItemImage(category, name);

  return (
    <button
      type="button"
      onClick={() => addItem({ category, name, priceCents })}
      aria-label={`Add ${name} to bag, ${(priceCents / 100).toFixed(2)} pounds`}
      title={description}
      className="group relative flex flex-col items-center gap-3 rounded-md bg-surface p-5 text-center shadow-xs transition-[transform,box-shadow] duration-base ease-standard hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm transition-transform duration-base ease-standard group-hover:scale-110">
        <Plus className="h-4 w-4" aria-hidden="true" />
      </span>

      <span className="relative block h-16 w-16 overflow-hidden rounded-full border border-foreground/15 bg-background transition-colors duration-base ease-standard group-hover:border-accent/40">
        <Image src={src} alt="" fill sizes="64px" className="object-cover" />
      </span>

      <span className="flex flex-col items-center gap-1">
        <span className="font-body text-sm font-semibold text-foreground">{name}</span>
        {badge && (
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-provenance">
            {badge}
          </span>
        )}
        <Price cents={priceCents} />
      </span>
    </button>
  );
}
