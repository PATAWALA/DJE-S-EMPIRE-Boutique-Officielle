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

  const [lastMode, setLastMode] = useState<SaleMode>(saleMode);
  if (lastMode !== saleMode) {
    setLastMode(saleMode);
    setQuantity(isGros ? product.minGrosQuantity : 1);
  }

  const currentPrice = isGros ? product.priceGros : product.priceDetail;

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => Math.max(minQty, q - 1));

  const handleAdd = () => {
    if (!product.inStock) return;
    addItem(product, quantity, saleMode);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:border-gold-300 hover:shadow-[0_12px_40px_-16px_rgba(201,162,39,0.28)]">
      {/* Image */}
      <div className="relative aspect-[16/11] w-full shrink-0 overflow-hidden bg-soft sm:aspect-[4/5]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

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
            <span className="bg-gold-gradient rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink shadow-sm">
              Prix Gros
            </span>
          )}
        </div>

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 backdrop-blur">
          <Star className="h-3 w-3 fill-gold-500 text-gold-500" strokeWidth={1.5} />
          <span className="text-[11px] font-semibold text-ink">
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <h3 className="line-clamp-2 min-h-[42px] text-[15px] font-semibold leading-snug text-ink">
            {product.name}
          </h3>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight text-ink">
              {formatXOF(currentPrice)}
            </span>
            {isGros && (
              <span className="text-[12px] font-medium text-zinc-400 line-through">
                {formatXOF(product.priceDetail)}
              </span>
            )}
          </div>

          <p
            className={`mt-1 text-[11px] font-semibold ${
              isGros ? "text-gold-700" : "text-transparent select-none"
            }`}
            aria-hidden={!isGros}
          >
            {isGros ? `Minimum ${product.minGrosQuantity} pièces` : "—"}
          </p>
        </div>

        {/* ✅ Bloc boutons corrigé : w-full partout sur mobile */}
        <div className="mt-4 flex w-full flex-col gap-2.5 sm:flex-row sm:items-stretch">
          {/* Sélecteur quantité — pleine largeur mobile */}
          <div className="flex h-14 w-full items-center justify-between rounded-full border-2 border-line bg-soft px-1 sm:h-14 sm:w-auto sm:min-w-[140px]">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantity <= minQty}
              aria-label="Diminuer la quantité"
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-all hover:bg-white disabled:opacity-30 active:scale-95"
            >
              <Minus className="h-5 w-5" strokeWidth={2.6} />
            </button>
            <span className="min-w-[40px] text-center text-[17px] font-extrabold tabular-nums text-ink">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label="Augmenter la quantité"
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-all hover:bg-white hover:text-gold-700 active:scale-95"
            >
              <Plus className="h-5 w-5" strokeWidth={2.6} />
            </button>
          </div>

          {/* ✅ Bouton Ajouter — w-full mobile, flex-1 desktop, plus grand */}
          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`flex h-14 w-full items-center justify-center gap-2.5 rounded-full text-[15px] font-bold tracking-wide transition-all sm:flex-1 ${
              !product.inStock
                ? "cursor-not-allowed bg-zinc-100 text-zinc-400"
                : justAdded
                ? "bg-emerald-500 text-white shadow-[0_8px_24px_-10px_rgba(16,185,129,0.9)]"
                : "bg-gold-gradient text-ink shadow-[0_8px_24px_-10px_rgba(201,162,39,0.85)] hover:shadow-[0_12px_32px_-10px_rgba(201,162,39,1)] hover:brightness-105 active:scale-[0.98]"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-5 w-5" strokeWidth={2.8} />
                Ajouter
              </>
            ) : (
              <>
                <ShoppingBag className="h-5 w-5" strokeWidth={2.4} />
                Ajouter
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}