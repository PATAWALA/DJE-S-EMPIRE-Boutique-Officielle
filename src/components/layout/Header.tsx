"use client";

import { Search, ShoppingBag, X } from "lucide-react";
import { cartCount, useCartStore } from "@/store/useCartStore";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function Header({
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const count = cartCount(items);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-20 sm:gap-6 sm:px-6 lg:px-8">
        {/* Logo image */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-85"
          aria-label="DJE'S EMPIRE — Accueil"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpeg"
            alt="DJE'S EMPIRE"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-gold-500/40 sm:h-11 sm:w-11"
          />

          {/* Nom avec dégradé Or (facultatif — supprime si présent dans le logo) */}
          <span className="hidden flex-col items-start leading-none xs:flex sm:flex">
            <span className="text-gold-gradient text-[15px] font-extrabold tracking-[0.20em] sm:text-base">
              DJE&apos;S
            </span>
            <span className="text-gold-gradient text-[10px] font-semibold tracking-[0.42em] sm:text-[11px]">
              EMPIRE
            </span>
          </span>
        </button>

        {/* Recherche */}
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            strokeWidth={2}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Rechercher un article..."
            className="h-10 w-full rounded-full border border-line bg-soft pl-10 pr-9 text-sm text-ink outline-none transition-all placeholder:text-zinc-400 focus:border-gold-500 focus:bg-white focus:ring-4 focus:ring-gold-500/15 sm:h-11 sm:text-[15px]"
          />
          {searchQuery.length > 0 && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Effacer la recherche"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-ink"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Panier */}
        <button
          type="button"
          onClick={openCart}
          aria-label="Ouvrir le panier"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition-all hover:border-gold-500 hover:text-gold-700 sm:h-11 sm:w-11"
        >
          <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={2} />
          {count > 0 && (
            <span
              className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[11px] font-bold text-ink ring-2 ring-white"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#fcf6ba 0%,#bf953f 50%,#aa771c 100%)",
              }}
            >
              {count > 99 ? "99+" : count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}