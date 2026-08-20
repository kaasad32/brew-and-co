export type CheckoutValues = {
  name: string;
  email: string;
};

export type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCheckout(values: CheckoutValues): CheckoutErrors {
  const errors: CheckoutErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Enter your name so we can put it on the order.";
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email so we can send your receipt.";
  }

  return errors;
}

export function hasErrors(errors: CheckoutErrors): boolean {
  return Object.keys(errors).length > 0;
}
