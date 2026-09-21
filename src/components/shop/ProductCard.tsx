"use client";

import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { formatXOF, type Product } from "@/data/products";
import { useCartStore, type SaleMode } from "@/store/useCartStore";

interface ProductCardProps {
  product: Product;
  saleMode: SaleMode;
}

export default function ProductCard({ product, saleMode }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [justAdded, setJustAdded] = useState(false);

  const isGros = saleMode === "gros";
  const minQty = isGros ? product.minGrosQuantity : 1;
  const [quantity, setQuantity] = useState<number>(minQty);

  // Sync min when switching mode
  const [lastMode, setLastMode] = useState<SaleMode>(saleMode);
  if (lastMode !== saleMode) {
    setLastMode(saleMode);
    setQuantity(isGros ? product.minGrosQuantity : 1);
  }

  const currentPrice = isGros ? product.priceGros : product.priceDetail;

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () =>
    setQuantity((q) => Math.max(minQty, q - 1));

  const handleAdd = () => {
    if (!product.inStock) return;
    addItem(product, quantity, saleMode);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_12px_40px_-16px_rgba(9,9,11,0.18)]">
      {/* Image — plus large que haute sur mobile */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-soft sm:aspect-[4/5]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.inStock ? (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 backdrop-blur">
              En Stock
            </span>
          ) : (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 backdrop-blur">
              Épuisé
            </span>
          )}
          {isGros && (
            <span className="rounded-full bg-rose-deep px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Prix Gros
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 backdrop-blur">
          <Star
            className="h-3 w-3 fill-amber-400 text-amber-400"
            strokeWidth={1.5}
          />
          <span className="text-[11px] font-semibold text-ink">
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-4">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-ink sm:text-[15px]">
          {product.name}
        </h3>

        {/* Prix */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight text-ink sm:text-lg">
            {formatXOF(currentPrice)}
          </span>
          {isGros && (
            <span className="text-[12px] font-medium text-zinc-400 line-through">
              {formatXOF(product.priceDetail)}
            </span>
          )}
        </div>

        {isGros && (
          <p className="mt-1 text-[11px] font-medium text-rose-deep">
            Minimum {product.minGrosQuantity} pièces
          </p>
        )}

        {/* Quantité + Ajouter — empilés sur mobile */}
        <div className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
          <div className="flex h-11 items-center justify-between rounded-full border border-line bg-soft sm:h-10 sm:w-auto sm:justify-start">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantity <= minQty}
              aria-label="Diminuer la quantité"
              className="flex h-full w-12 items-center justify-center text-ink transition-opacity disabled:opacity-30 sm:w-9"
            >
              <Minus className="h-4 w-4 sm:h-3.5 sm:w-3.5" strokeWidth={2.4} />
            </button>
            <span className="min-w-[32px] text-center text-[14px] font-semibold tabular-nums text-ink sm:min-w-[26px] sm:text-[13px]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label="Augmenter la quantité"
              className="flex h-full w-12 items-center justify-center text-ink transition-opacity hover:opacity-70 sm:w-9"
            >
              <Plus className="h-4 w-4 sm:h-3.5 sm:w-3.5" strokeWidth={2.4} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-[13.5px] font-semibold transition-all sm:h-10 sm:text-[13px] ${
              !product.inStock
                ? "cursor-not-allowed bg-zinc-100 text-zinc-400"
                : justAdded
                ? "bg-emerald-500 text-white"
                : "bg-ink text-white hover:bg-rose-deep active:scale-[0.98]"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4" strokeWidth={2.6} />
                Ajouté
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" strokeWidth={2.2} />
                Ajouter au panier
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}