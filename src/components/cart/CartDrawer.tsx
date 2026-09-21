"use client";

import { useEffect, useState } from "react";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  X,
  MessageCircle,
} from "lucide-react";
import { formatXOF } from "@/data/products";
import {
  cartTotal,
  lineTotal,
  unitPrice,
  useCartStore,
} from "@/store/useCartStore";

interface CartDrawerProps {
  isOpen: boolean;
}

const CITIES = [
  "Ouagadougou",
  "Bobo-Dioulasso",
  "Koudougou",
  "Autre / Expédition régionale",
] as const;

export default function CartDrawer({ isOpen }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const closeCart = useCartStore((state) => state.closeCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const setMode = useCartStore((state) => state.setMode);
  const clearCart = useCartStore((state) => state.clearCart);

  const [city, setCity] = useState<string>("Ouagadougou");

  const total = cartTotal(items);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close with Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeCart]);

  const handleWhatsApp = () => {
    if (items.length === 0) return;
    const message = useCartStore.getState().buildWhatsAppMessage(city);
    const url = `https://wa.me/22666937272?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/45 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Panier"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-ink" strokeWidth={2} />
            <h2 className="text-[15px] font-bold tracking-tight text-ink">
              Mon Panier
            </h2>
            {items.length > 0 && (
              <span className="rounded-full bg-soft px-2 py-0.5 text-[11px] font-bold text-zinc-600">
                {items.length}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fermer le panier"
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-soft hover:text-ink"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-soft">
                <ShoppingBag className="h-7 w-7 text-zinc-400" strokeWidth={1.6} />
              </div>
              <p className="text-[15px] font-semibold text-ink">
                Votre panier est vide
              </p>
              <p className="max-w-[240px] text-[13px] text-zinc-500">
                Parcourez le catalogue et ajoutez vos articles préférés.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => {
                const price = unitPrice(item);
                const sub = lineTotal(item);
                return (
                  <li
                    key={item.id}
                    className="flex gap-3 border-b border-line pb-4 last:border-b-0 last:pb-0"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-20 shrink-0 rounded-xl object-cover"
                    />

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-ink">
                          {item.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Retirer ${item.name}`}
                          className="shrink-0 text-zinc-400 transition-colors hover:text-rose-deep"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={2} />
                        </button>
                      </div>

                      {/* Mode toggle */}
                      <div className="mt-2 inline-flex w-fit rounded-full border border-line bg-soft p-0.5">
                        <button
                          type="button"
                          onClick={() => setMode(item.id, "detail")}
                          className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold transition-all ${
                            item.mode === "detail"
                              ? "bg-ink text-white"
                              : "text-zinc-500"
                          }`}
                        >
                          Détail
                        </button>
                        <button
                          type="button"
                          onClick={() => setMode(item.id, "gros")}
                          className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold transition-all ${
                            item.mode === "gros"
                              ? "bg-rose-deep text-white"
                              : "text-zinc-500"
                          }`}
                        >
                          Gros
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                        {/* Qty */}
                        <div className="flex h-8 items-center rounded-full border border-line bg-white">
                          <button
                            type="button"
                            onClick={() => decrement(item.id)}
                            aria-label="Diminuer"
                            className="flex h-full w-8 items-center justify-center text-ink disabled:opacity-30"
                            disabled={
                              item.quantity <=
                              (item.mode === "gros"
                                ? item.minGrosQuantity
                                : 1)
                            }
                          >
                            <Minus className="h-3 w-3" strokeWidth={2.6} />
                          </button>
                          <span className="min-w-[24px] text-center text-[12px] font-semibold tabular-nums text-ink">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increment(item.id)}
                            aria-label="Augmenter"
                            className="flex h-full w-8 items-center justify-center text-ink"
                          >
                            <Plus className="h-3 w-3" strokeWidth={2.6} />
                          </button>
                        </div>

                        <div className="flex flex-col items-end">
                          <span className="text-[10.5px] text-zinc-500">
                            {formatXOF(price)} × {item.quantity}
                          </span>
                          <span className="text-[13.5px] font-bold tabular-nums text-ink">
                            {formatXOF(sub)}
                          </span>
                        </div>
                      </div>

                      {item.mode === "gros" &&
                        item.quantity < item.minGrosQuantity && (
                          <p className="mt-1 text-[10.5px] font-medium text-rose-deep">
                            Minimum {item.minGrosQuantity} pièces requis
                          </p>
                        )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-line bg-white px-5 pb-5 pt-4">
            {/* City */}
            <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
              <Truck className="h-3.5 w-3.5" strokeWidth={2.2} />
              Ville de livraison
            </label>
            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="mb-4 h-11 w-full appearance-none rounded-xl border border-line bg-soft px-3.5 text-[13.5px] font-medium text-ink outline-none transition-colors focus:border-rose-nude focus:bg-white focus:ring-4 focus:ring-rose-nude/10"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Total */}
            <div className="mb-3 flex items-center justify-between border-t border-line pt-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Total général
              </span>
              <span className="text-lg font-extrabold tracking-tight text-ink">
                {formatXOF(total)}
              </span>
            </div>

            {/* WhatsApp */}
            <button
              type="button"
              onClick={handleWhatsApp}
              className="group flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] text-[14px] font-bold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:brightness-105 active:scale-[0.985] sm:text-[15px]"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={2.4} />
              Valider et envoyer sur WhatsApp
            </button>

            <button
              type="button"
              onClick={clearCart}
              className="mt-2.5 w-full text-center text-[12px] font-medium text-zinc-400 transition-colors hover:text-rose-deep"
            >
              Vider le panier
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}