"use client";

import { useState, type FormEvent } from "react";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { SITE } from "@/lib/site-config";
import {
  validateReservation,
  hasErrors,
  type ReservationValues,
  type ReservationErrors,
} from "@/lib/validate-reservation";

const EMPTY_VALUES: ReservationValues = { name: "", partySize: "2", date: "", time: "" };

function todayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}

function maxISODate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return d.toISOString().slice(0, 10);
}

function formatConfirmation(values: ReservationValues): string {
  const date = new Date(`${values.date}T${values.time}`);
  const dateLabel = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const timeLabel = date
    .toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true })
    .replace(" ", "");
  const party = values.partySize === "1" ? "1 guest" : `${values.partySize} guests`;

  return `Table noted for ${party}, ${dateLabel} at ${timeLabel}. We've pencilled you in as ${values.name}. Plans change? Call ${SITE.phone} or just let us know when you arrive.`;
}

export function ReservationForm() {
  const [values, setValues] = useState<ReservationValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [confirmation, setConfirmation] = useState<string | null>(null);

  function update<K extends keyof ReservationValues>(key: K, value: ReservationValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateReservation(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      const firstInvalidKey = Object.keys(nextErrors)[0];
      document.getElementById(`reservation-${firstInvalidKey}`)?.focus();
      return;
    }
    setConfirmation(formatConfirmation(values));
  }

  if (confirmation) {
    return <Toast tone="confirm" message={confirmation} />;
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <FormField
        id="reservation-name"
        label="Name"
        value={values.name}
        onChange={(e) => update("name", e.target.value)}
        error={errors.name}
        autoComplete="name"
      />
      <FormField
        id="reservation-partySize"
        label="Party size"
        type="number"
        min={1}
        max={10}
        value={values.partySize}
        onChange={(e) => update("partySize", e.target.value)}
        error={errors.partySize}
        helperText={!errors.partySize ? `Bigger group? Call us at ${SITE.phone}.` : undefined}
      />
      <FormField
        id="reservation-date"
        label="Preferred date"
        type="date"
        min={todayISODate()}
        max={maxISODate()}
        value={values.date}
        onChange={(e) => update("date", e.target.value)}
        error={errors.date}
      />
      <FormField
        id="reservation-time"
        label="Preferred time"
        type="time"
        value={values.time}
        onChange={(e) => update("time", e.target.value)}
        error={errors.time}
        helperText={!errors.time ? "Mon–Thu 7:30am–6pm, Fri 7:30am–9pm, Sat 8am–6pm, Sun 8am–4pm." : undefined}
      />
      <Button type="submit" variant="primary" size="md" className="mt-2 w-full">
        Reserve a table
      </Button>
    </form>
  );
}
