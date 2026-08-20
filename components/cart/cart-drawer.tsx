"use client";

import { useState, type MouseEvent, type RefObject } from "react";
import { Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Price } from "@/components/ui/price";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { CheckoutForm } from "@/components/cart/checkout-form";
import { useCart } from "@/components/cart/cart-provider";
import type { CheckoutValues } from "@/lib/validate-checkout";

type Step = "cart" | "checkout" | "confirmed";

type ConfirmedOrder = {
  orderNumber: string;
  totalCents: number;
  itemCount: number;
  email: string;
};

function generateOrderNumber(): string {
  return `BC-${Math.floor(10000 + Math.random() * 90000)}`;
}

type CartDrawerProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
};

export function CartDrawer({ dialogRef }: CartDrawerProps) {
  const { items, totalCents, totalCount, clear } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  const close = () => dialogRef.current?.close();

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  function handlePlaceOrder(values: CheckoutValues) {
    setConfirmedOrder({
      orderNumber: generateOrderNumber(),
      totalCents,
      itemCount: totalCount,
      email: values.email,
    });
    clear();
    setStep("confirmed");
  }

  function handleClose() {
    // A step reset belongs on close, not on every state change, so a
    // half-finished checkout doesn't linger the next time the bag opens.
    setStep("cart");
    setConfirmedOrder(null);
  }

  const title = step === "checkout" ? "Checkout" : step === "confirmed" ? "Order placed" : "Your bag";

  return (
    <dialog
      ref={dialogRef}
      className="cart-drawer"
      onClose={handleClose}
      onClick={handleBackdropClick}
      aria-labelledby="cart-drawer-title"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-5">
          <h2 id="cart-drawer-title" className="font-display text-2xl text-foreground">
            {title}
          </h2>
          <Button variant="ghost" size="sm" aria-label="Close bag" onClick={close}>
            Close
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {step === "confirmed" && confirmedOrder && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <Receipt className="h-10 w-10 text-accent" aria-hidden="true" />
              <p className="font-display text-xl text-foreground">Thanks — order placed.</p>
              <p className="max-w-xs text-sm text-foreground-muted">
                Order <span className="font-mono text-foreground">{confirmedOrder.orderNumber}</span>,{" "}
                {confirmedOrder.itemCount} {confirmedOrder.itemCount === 1 ? "item" : "items"},{" "}
                <Price cents={confirmedOrder.totalCents} />. We&apos;ll send the receipt to{" "}
                {confirmedOrder.email}.
              </p>
              <Button variant="primary" size="md" className="mt-2" onClick={close}>
                Continue browsing
              </Button>
            </div>
          )}

          {step === "cart" && items.length === 0 && (
            <EmptyState
              message="Your bag is empty. Add something from the menu."
              actionLabel="Browse menu"
              actionHref="/menu"
              onAction={close}
            />
          )}

          {step === "cart" && items.length > 0 && (
            <div>
              {items.map((line) => (
                <CartLineItem key={`${line.category}-${line.name}`} {...line} />
              ))}
            </div>
          )}

          {step === "checkout" && (
            <div className="py-6">
              <CheckoutForm onBack={() => setStep("cart")} onPlaceOrder={handlePlaceOrder} />
            </div>
          )}
        </div>

        {step === "cart" && items.length > 0 && (
          <div className="border-t border-foreground/10 px-6 py-5">
            <div className="flex items-center justify-between text-foreground">
              <span className="font-body font-semibold">Subtotal</span>
              <Price cents={totalCents} />
            </div>
            <Button variant="primary" size="md" className="mt-4 w-full" onClick={() => setStep("checkout")}>
              Checkout
            </Button>
          </div>
        )}
      </div>
    </dialog>
  );
}
