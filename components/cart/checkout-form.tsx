"use client";

import { useState, type FormEvent } from "react";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import {
  validateCheckout,
  hasErrors,
  type CheckoutValues,
  type CheckoutErrors,
} from "@/lib/validate-checkout";

type CheckoutFormProps = {
  onBack: () => void;
  onPlaceOrder: (values: CheckoutValues) => void;
};

export function CheckoutForm({ onBack, onPlaceOrder }: CheckoutFormProps) {
  const [values, setValues] = useState<CheckoutValues>({ name: "", email: "" });
  const [errors, setErrors] = useState<CheckoutErrors>({});

  function update<K extends keyof CheckoutValues>(key: K, value: CheckoutValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCheckout(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      const firstInvalidKey = Object.keys(nextErrors)[0];
      document.getElementById(`checkout-${firstInvalidKey}`)?.focus();
      return;
    }
    onPlaceOrder(values);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <FormField
        id="checkout-name"
        label="Name"
        value={values.name}
        onChange={(e) => update("name", e.target.value)}
        error={errors.name}
        autoComplete="name"
      />
      <FormField
        id="checkout-email"
        label="Email"
        type="email"
        value={values.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
        helperText={!errors.email ? "We'll send your receipt here." : undefined}
        autoComplete="email"
      />
      <div className="mt-2 flex gap-3">
        <Button type="button" variant="secondary" size="md" className="flex-1" onClick={onBack}>
          Back to bag
        </Button>
        <Button type="submit" variant="primary" size="md" className="flex-1">
          Place order
        </Button>
      </div>
    </form>
  );
}
