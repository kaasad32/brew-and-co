"use client";

import { useState, type MouseEvent, type RefObject } from "react";
import { Button } from "@/components/ui/button";
import { ReservationForm } from "@/components/reservation/reservation-form";

type ReservationDialogProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
};

export function ReservationDialog({ dialogRef }: ReservationDialogProps) {
  // Remounting ReservationForm on close is the simplest reliable reset —
  // no imperative form-reset API to keep in sync with validation state.
  const [formKey, setFormKey] = useState(0);

  const close = () => dialogRef.current?.close();

  // Native <dialog> only closes on Escape or an explicit close() call — a
  // click on the backdrop needs its own handler. The backdrop is the
  // <dialog> element's own padding box; a click that lands there (not on
  // any child content) has the dialog itself as the event target.
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="reservation-dialog"
      onClose={() => setFormKey((k) => k + 1)}
      onClick={handleBackdropClick}
      aria-labelledby="reservation-dialog-title"
    >
      <div className="tear-edge-top mx-6 mt-6" />
      <div className="flex items-start justify-between gap-4 px-6 pb-2 pt-4">
        <div>
          <h2 id="reservation-dialog-title" className="font-display text-2xl text-foreground">
            Reserve a table
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">
            Tell us who&apos;s coming and when — we&apos;ll have the table ready.
          </p>
        </div>
        <Button variant="ghost" size="sm" aria-label="Close reservation form" onClick={close}>
          Close
        </Button>
      </div>
      <div className="px-6 pb-8">
        <ReservationForm key={formKey} />
      </div>
    </dialog>
  );
}
