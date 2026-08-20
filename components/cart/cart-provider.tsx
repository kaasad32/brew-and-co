"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Toast } from "@/components/ui/toast";
import type { MenuCategory } from "@/lib/menu-data";

export type CartLine = {
  category: MenuCategory;
  name: string;
  priceCents: number;
  quantity: number;
};

type AddableItem = {
  category: MenuCategory;
  name: string;
  priceCents: number;
};

type CartContextValue = {
  items: CartLine[];
  addItem: (item: AddableItem) => void;
  removeItem: (category: MenuCategory, name: string) => void;
  setQuantity: (category: MenuCategory, name: string, quantity: number) => void;
  clear: () => void;
  totalCents: number;
  totalCount: number;
  open: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

const STORAGE_KEY = "brew-and-co-cart";

function sameLine(a: { category: MenuCategory; name: string }, b: { category: MenuCategory; name: string }) {
  return a.category === b.category && a.name === b.name;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Hydrate from localStorage once, client-side only — the server always
  // renders an empty cart, so this runs after mount to avoid a hydration
  // mismatch rather than trying to read localStorage during render.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // One-time localStorage hydration on mount: SSR always renders an
      // empty cart, so this effect is the sync point that reconciles it
      // with the persisted client-only value, not a cascading-render bug.
      if (raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(JSON.parse(raw));
      }
    } catch {
      // Corrupt or unavailable storage — start with an empty cart.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    return () => {
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
    };
  }, []);

  function addItem(item: AddableItem) {
    setItems((prev) => {
      const existing = prev.find((line) => sameLine(line, item));
      if (existing) {
        return prev.map((line) =>
          sameLine(line, item) ? { ...line, quantity: line.quantity + 1 } : line
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    setLastAdded(item.name);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setLastAdded(null), 2200);
  }

  function removeItem(category: MenuCategory, name: string) {
    setItems((prev) => prev.filter((line) => !sameLine(line, { category, name })));
  }

  function setQuantity(category: MenuCategory, name: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(category, name);
      return;
    }
    setItems((prev) =>
      prev.map((line) => (sameLine(line, { category, name }) ? { ...line, quantity } : line))
    );
  }

  function clear() {
    setItems([]);
  }

  function open() {
    dialogRef.current?.showModal();
  }

  const totalCents = items.reduce((sum, line) => sum + line.priceCents * line.quantity, 0);
  const totalCount = items.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, setQuantity, clear, totalCents, totalCount, open }}
    >
      {children}
      <CartDrawer dialogRef={dialogRef} />
      {lastAdded && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <Toast tone="confirm" message={`Added ${lastAdded} to your bag.`} />
        </div>
      )}
    </CartContext.Provider>
  );
}
