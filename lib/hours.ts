type DayHours = { open: string; close: string };

// Keyed by Date#getDay(): 0=Sun .. 6=Sat.
export const BUSINESS_HOURS: Record<number, DayHours> = {
  0: { open: "08:00", close: "16:00" },
  1: { open: "07:30", close: "18:00" },
  2: { open: "07:30", close: "18:00" },
  3: { open: "07:30", close: "18:00" },
  4: { open: "07:30", close: "18:00" },
  5: { open: "07:30", close: "21:00" },
  6: { open: "08:00", close: "18:00" },
};

export const HOURS_DISPLAY = [
  { label: "Mon–Thu", hours: "7:30am–6pm" },
  { label: "Friday", hours: "7:30am–9pm" },
  { label: "Saturday", hours: "8am–6pm" },
  { label: "Sunday", hours: "8am–4pm" },
] as const;

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function isWithinBusinessHours(weekday: number, time: string): boolean {
  const day = BUSINESS_HOURS[weekday];
  if (!day || !time) return false;
  const minutes = toMinutes(time);
  return minutes >= toMinutes(day.open) && minutes <= toMinutes(day.close);
}

export function formatDayHours(weekday: number): string {
  const day = BUSINESS_HOURS[weekday];
  if (!day) return "closed";
  return `${formatTime(day.open)}–${formatTime(day.close)}`;
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "pm" : "am";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return minutes === 0 ? `${displayHour}${period}` : `${displayHour}:${String(minutes).padStart(2, "0")}${period}`;
}
