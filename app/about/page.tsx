import type { Metadata } from "next";
import Image from "next/image";
import { TearLine } from "@/components/ui/tear-line";
import { ABOUT_IMAGE } from "@/lib/images";
import { SITE } from "@/lib/site-config";
import { HOURS_DISPLAY } from "@/lib/hours";

export const metadata: Metadata = {
  title: "About — Brew & Co",
  description: "How Marion Kessler and Dele Osei started Brew & Co on Evelina Road, Nunhead.",
};

const STORY_PARAGRAPHS = [
  "Marion Kessler spent four years buying green coffee for a City trading desk — flying out to Huila and Yirgacheffe twice a year, sitting at cupping tables from six in the morning, writing purchase orders for containers she'd never see opened. Dele Osei roasted a kilo at a time on a converted popcorn machine behind his flat in Nunhead and sold what he could from a horsebox at the Sunday market on Evelina Road. Marion started buying a bag most weeks in 2016, mostly out of curiosity about a roast that good coming out of somewhere that small. She kept coming back with the same question: why did the beans she was sourcing at origin always end up in a shipping container bound for somewhere else, when there could be a shop two streets from her own front door pulling shots from the same lot?",
  "They opened Brew & Co in the spring of 2018, in a unit two doors down from Dele's old market pitch. The name isn't a coffee pun — it's literal. Marion had spent years reading the ledgers of old London trading firms for a hobby — tea, spice, rubber, coffee, usually a small partnership of two names and an \"& Co\" standing in for whoever came after — and she wanted the shop to read like one of those firms' paperwork, not a café's chalkboard: a receipt, not a decoration. Dele runs the roaster and the bar; Marion still flies out twice a year to buy the lots direct, the same way she always did, except now the coffee she brings back gets poured three streets from where she buys it, not shipped somewhere she'll never see it.",
  "Eight years on, Brew & Co is still a two-person trading company that happens to also be a coffee shop. Marion sources and does the books; Dele roasts and pulls most of the espresso himself; the rest of the crew has been here long enough to know the regulars by their order. Every bag still carries a stamp with the same four facts Marion writes down at origin — where it's from, how high it grew, how it was processed, and the date it was roasted. Come in on a Friday evening and you'll catch the tail end of Open Mic Night; come Saturday morning and Dele will pour you whatever's newest in the hopper before he tells you what it is.",
];

export default function AboutPage() {
  return (
    <div className="py-14 md:py-20">
      <div className="mx-auto max-w-(--container-brand) px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-provenance">
          Marion Kessler &amp; Dele Osei
        </p>
        <h1 className="mt-2 max-w-2xl font-display text-4xl text-foreground md:text-5xl">
          Two people, one trading company, a very good espresso machine.
        </h1>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg md:aspect-[21/9]">
          <Image
            src={ABOUT_IMAGE.src}
            alt={ABOUT_IMAGE.alt}
            fill
            sizes="(min-width: 1024px) 1200px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {STORY_PARAGRAPHS.map((paragraph, index) => (
            <p key={index} className="max-w-2xl text-lg leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-14">
          <TearLine label="Where to find us" />
        </div>

        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-foreground-muted">
              Address
            </p>
            <p className="mt-2 text-foreground">{SITE.addressLine1}</p>
            <p className="text-foreground">{SITE.addressLine2}</p>
            <p className="mt-3 text-foreground">
              <a href={SITE.phoneHref} className="hover:text-accent">
                {SITE.phone}
              </a>
            </p>
            <p className="text-foreground">
              <a href={`mailto:${SITE.email}`} className="hover:text-accent">
                {SITE.email}
              </a>
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-foreground-muted">
              Hours
            </p>
            <dl className="mt-2 space-y-1">
              {HOURS_DISPLAY.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 text-foreground">
                  <dt>{row.label}</dt>
                  <dd className="font-mono">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
