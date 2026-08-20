export type RecurringEvent = {
  slug: string;
  title: string;
  description: string;
  weekday: number; // 0=Sun .. 6=Sat, matches Date#getDay()
  startHour: number;
  startMinute: number;
  timeLabel: string;
  cadenceLabel: string;
};

export const RECURRING_EVENTS: RecurringEvent[] = [
  {
    slug: "open-mic-night",
    title: "Open Mic Night",
    description: "Bring a song, a poem, or just an audience. Sign-ups from 6:45, first act at 7.",
    weekday: 5,
    startHour: 19,
    startMinute: 0,
    timeLabel: "7–9pm",
    cadenceLabel: "Every Friday",
  },
  {
    slug: "coffee-tasting",
    title: "Coffee Tasting",
    description: "A guided cupping through whatever's newest in the hopper. Free, drop in.",
    weekday: 6,
    startHour: 10,
    startMinute: 0,
    timeLabel: "10–11am",
    cadenceLabel: "Every Saturday",
  },
];

/** Next occurrence of `targetDay`/`hour`/`minute` on or after `from`. */
export function getNextWeekday(
  targetDay: number,
  hour: number,
  minute: number,
  from: Date = new Date()
): Date {
  const result = new Date(from);
  result.setHours(hour, minute, 0, 0);
  const dayDiff = (targetDay - from.getDay() + 7) % 7;
  result.setDate(from.getDate() + dayDiff);
  if (result.getTime() <= from.getTime()) {
    result.setDate(result.getDate() + 7);
  }
  return result;
}

export type UpcomingEvent = RecurringEvent & { date: Date };

export function getUpcomingEvents(from: Date = new Date()): UpcomingEvent[] {
  return RECURRING_EVENTS.map((event) => ({
    ...event,
    date: getNextWeekday(event.weekday, event.startHour, event.startMinute, from),
  })).sort((a, b) => a.date.getTime() - b.date.getTime());
}
