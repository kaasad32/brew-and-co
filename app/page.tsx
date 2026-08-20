import { Hero } from "@/components/hero";
import { PopularItems } from "@/components/popular-items";
import { UpcomingEvents } from "@/components/upcoming-events";

// Events are computed from "now" — regenerate hourly so the upcoming Friday/
// Saturday dates never freeze at build time (see lib/events.ts).
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <PopularItems />
      <UpcomingEvents />
    </>
  );
}
