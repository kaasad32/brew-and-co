"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Price } from "@/components/ui/price";
import { useCart } from "@/components/cart/cart-provider";
import type { MenuItem } from "@/lib/menu-data";
import type { ImageAsset } from "@/lib/images";

type FeaturedItemCardProps = MenuItem & ImageAsset;

export function FeaturedItemCard({
  category,
  name,
  description,
  priceCents,
  badge,
  src,
  alt,
}: FeaturedItemCardProps) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem({ category, name, priceCents })}
      aria-label={`Add ${name} to bag, ${(priceCents / 100).toFixed(2)} pounds`}
      className="group w-full rounded-md bg-surface p-3 text-left shadow-xs transition-[transform,box-shadow] duration-base ease-standard hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-background">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
        <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm transition-transform duration-base ease-standard group-hover:scale-110">
          <Plus className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
      <div className="p-2">
        {badge && (
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-provenance">
            {badge}
          </p>
        )}
        <h3 className="mt-1 font-display text-xl text-foreground">{name}</h3>
        <p className="mt-1 text-sm text-foreground-muted">{description}</p>
        <div className="mt-3">
          <Price cents={priceCents} />
        </div>
      </div>
    </button>
  );
}
