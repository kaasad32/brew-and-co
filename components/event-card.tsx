import type { UpcomingEvent } from "@/lib/events";

const WEEKDAY_ABBR = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function EventCard({ title, description, date, timeLabel, cadenceLabel }: UpcomingEvent) {
  return (
    <div className="flex overflow-hidden rounded-md bg-surface shadow-xs">
      <div className="flex w-24 shrink-0 flex-col items-center justify-center gap-1 bg-kraft py-6 font-mono">
        <span className="text-xs tracking-[0.15em] text-foreground-muted">
          {WEEKDAY_ABBR[date.getDay()]}
        </span>
        <span className="text-3xl font-medium text-foreground">{date.getDate()}</span>
      </div>
      {/* Internal perforation: a documented, deliberate exception to the
          "no tear-line inside a card" rule — this card is styled as a
          ticket stub, where the tear IS the object being represented. */}
      <div className="tear-edge-side flex-1 px-5 py-5">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-provenance">
          {cadenceLabel}
        </p>
        <h3 className="mt-1 font-display text-xl text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-foreground-muted">{description}</p>
        <p className="mt-3 font-mono text-sm text-foreground-muted">{timeLabel}</p>
      </div>
    </div>
  );
}
