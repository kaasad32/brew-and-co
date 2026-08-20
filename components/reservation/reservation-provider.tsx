"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { ReservationDialog } from "@/components/reservation/reservation-dialog";

type ReservationModalContextValue = {
  open: () => void;
};

const ReservationModalContext = createContext<ReservationModalContextValue | null>(null);

export function useReservationModal(): ReservationModalContextValue {
  const context = useContext(ReservationModalContext);
  if (!context) {
    throw new Error("useReservationModal must be used within a ReservationProvider");
  }
  return context;
}

export function ReservationProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => {
    dialogRef.current?.showModal();
  };

  return (
    <ReservationModalContext.Provider value={{ open }}>
      {children}
      <ReservationDialog dialogRef={dialogRef} />
    </ReservationModalContext.Provider>
  );
}
