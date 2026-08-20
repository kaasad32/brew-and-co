"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReservationModal } from "@/components/reservation/reservation-provider";
import { useCart } from "@/components/cart/cart-provider";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const { open: openReservation } = useReservationModal();
  const { open: openCart, totalCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-(--container-brand) items-center justify-between px-6 md:px-10">
        <Link href="/" className="font-display text-xl text-foreground">
          Brew &amp; Co.
        </Link>
        <nav className="hidden gap-8 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground transition-colors duration-base ease-standard hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open bag, ${totalCount} ${totalCount === 1 ? "item" : "items"}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors duration-base ease-standard hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {totalCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent font-mono text-[0.6rem] text-accent-foreground">
                {totalCount > 9 ? "9+" : totalCount}
              </span>
            )}
          </button>
          <Button
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={openReservation}
          >
            Reserve a table
          </Button>
          <button
            type="button"
            className="text-sm font-medium text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-4 border-t border-foreground/10 px-6 py-4 md:hidden"
          aria-label="Primary"
        >
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-base font-medium text-foreground" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Button variant="secondary" size="sm" className="mt-2 w-full" onClick={openReservation}>
            Reserve a table
          </Button>
        </nav>
      )}
    </header>
  );
}
