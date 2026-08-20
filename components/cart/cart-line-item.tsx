import { Minus, Plus, Trash2 } from "lucide-react";
import { Price } from "@/components/ui/price";
import { useCart, type CartLine } from "@/components/cart/cart-provider";

export function CartLineItem({ category, name, priceCents, quantity }: CartLine) {
  const { setQuantity, removeItem } = useCart();

  return (
    <div className="flex items-start justify-between gap-4 border-b border-foreground/10 py-4 last:border-b-0">
      <div className="min-w-0">
        <p className="font-body font-semibold text-foreground">{name}</p>
        <p className="mt-0.5 text-sm text-foreground-muted">{category}</p>
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            aria-label={`Decrease quantity of ${name}`}
            onClick={() => setQuantity(category, name, quantity - 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors duration-base ease-standard hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <span className="w-5 text-center font-mono text-sm text-foreground">{quantity}</span>
          <button
            type="button"
            aria-label={`Increase quantity of ${name}`}
            onClick={() => setQuantity(category, name, quantity + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors duration-base ease-standard hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`Remove ${name} from bag`}
            onClick={() => removeItem(category, name)}
            className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-foreground-muted transition-colors duration-base ease-standard hover:bg-cherry-600/10 hover:text-cherry-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <Price cents={priceCents * quantity} />
    </div>
  );
}
