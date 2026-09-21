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
        {/* Logo avec anneau Or + texte Or dégradé */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80"
          aria-label="DJE'S EMPIRE — Accueil"
        >
          {/* Monogramme avec bordure Or */}
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full p-[1.5px] shadow-sm sm:h-11 sm:w-11"
            style={{
              backgroundImage:
                "linear-gradient(135deg,#bf953f 0%,#fcf6ba 35%,#b38728 65%,#aa771c 100%)",
            }}
          >
            <span className="flex h-full w-full items-center justify-center rounded-full bg-ink text-[12px] font-bold tracking-tight text-gold-gradient sm:text-[13px]">
              <span className="text-gold-gradient">DE</span>
            </span>
          </span>

          {/* Nom avec dégradé Or */}
          <span className="flex flex-col items-start leading-none">
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