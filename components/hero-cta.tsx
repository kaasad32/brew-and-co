"use client";

import Link from "next/link";
import { Button, buttonClassName } from "@/components/ui/button";
import { useReservationModal } from "@/components/reservation/reservation-provider";

export function HeroCta() {
  const { open } = useReservationModal();

  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" size="lg" onClick={open}>
        Reserve a table
      </Button>
      <Link href="/menu" className={buttonClassName("secondary-inverse", "lg")}>
        View menu
      </Link>
    </div>
  );
}
