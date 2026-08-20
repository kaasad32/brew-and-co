import Image from "next/image";
import { BatchStamp } from "@/components/ui/batch-stamp";
import { HeroCta } from "@/components/hero-cta";
import { HERO_IMAGE } from "@/lib/images";

// Page-specific flavor for the corner stamp — not reused elsewhere, so it
// doesn't need its own lib/ entry. Real, specific data, not a placeholder.
const HERO_LOT = {
  origin: "Gedeb, Yirgacheffe",
  altitude: "1,950m",
  process: "Washed",
  roastedOn: "14 AUG 2026",
};

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative h-[85vh] min-h-[560px]">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-roast-900 via-roast-900/40 to-transparent" />

        <BatchStamp
          {...HERO_LOT}
          size="sm"
          className="stamp-hero absolute right-6 top-6 rotate-6 text-paper md:right-10 md:top-10"
        />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-(--container-brand) px-6 pb-14 md:px-10 md:pb-20">
            <h1 className="max-w-xl font-display text-3xl leading-tight text-paper md:text-5xl">
              Coffee, sourced and roasted two streets from where you&apos;re standing.
            </h1>
            <p className="mt-4 max-w-lg text-base text-paper/85 md:text-lg">
              Specialty coffee, fresh pastries, and a full kitchen on Evelina Road —
              plus Friday night open mic and Saturday morning cupping.
            </p>
            <div className="mt-8">
              <HeroCta />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
