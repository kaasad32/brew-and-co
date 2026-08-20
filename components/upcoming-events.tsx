import { getUpcomingEvents } from "@/lib/events";
import { EventCard } from "@/components/event-card";
import { TearLine } from "@/components/ui/tear-line";

export function UpcomingEvents() {
  const events = getUpcomingEvents();

  return (
    <section className="mx-auto max-w-(--container-brand) px-6 py-16 md:px-10 md:py-20">
      <TearLine label="Upcoming events" />
      <h2 className="sr-only">Upcoming events</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {events.map((event) => (
          <EventCard key={event.slug} {...event} />
        ))}
      </div>
    </section>
  );
}
