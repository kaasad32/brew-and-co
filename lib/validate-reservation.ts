import { isWithinBusinessHours, formatDayHours } from "@/lib/hours";

export type ReservationValues = {
  name: string;
  partySize: string;
  date: string;
  time: string;
};

export type ReservationErrors = Partial<Record<keyof ReservationValues, string>>;

const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function validateReservation(values: ReservationValues): ReservationErrors {
  const errors: ReservationErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Enter your name so we know who to expect.";
  }

  const partySize = Number(values.partySize);
  if (!Number.isInteger(partySize) || partySize < 1 || partySize > 10) {
    errors.partySize = "Parties of 10 or fewer can book online — for more, call us.";
  }

  if (!values.date) {
    errors.date = "Pick a date.";
  } else {
    const chosenDate = new Date(`${values.date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 60);

    if (chosenDate < today) {
      errors.date = "Pick a date that hasn't passed yet.";
    } else if (chosenDate > maxDate) {
      errors.date = "We only take bookings up to 60 days out.";
    }
  }

  if (!values.time) {
    errors.time = "Pick a time.";
  } else if (!errors.date) {
    const weekday = new Date(`${values.date}T00:00:00`).getDay();
    if (!isWithinBusinessHours(weekday, values.time)) {
      errors.time = `We're open ${formatDayHours(weekday)} on ${WEEKDAY_NAMES[weekday]}s — pick a time in that window.`;
    }
  }

  return errors;
}

export function hasErrors(errors: ReservationErrors): boolean {
  return Object.keys(errors).length > 0;
}
