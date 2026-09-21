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
        {/* Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-70"
          aria-label="DJE'S EMPIRE — Accueil"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[13px] font-bold tracking-tight text-white sm:h-10 sm:w-10">
            DE
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className="text-[15px] font-extrabold tracking-[0.18em] text-ink sm:text-base">
              DJE&apos;S
            </span>
            <span className="text-[10px] font-medium tracking-[0.42em] text-rose-deep sm:text-[11px]">
              EMPIRE
            </span>
          </span>
        </button>

        {/* Search */}
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
            className="h-10 w-full rounded-full border border-line bg-soft pl-10 pr-9 text-sm text-ink outline-none transition-all placeholder:text-zinc-400 focus:border-rose-nude focus:bg-white focus:ring-4 focus:ring-rose-nude/10 sm:h-11 sm:text-[15px]"
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

        {/* Cart */}
        <button
          type="button"
          onClick={openCart}
          aria-label="Ouvrir le panier"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition-all hover:border-ink hover:bg-ink hover:text-white sm:h-11 sm:w-11"
        >
          <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={2} />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-deep px-1 text-[11px] font-bold text-white ring-2 ring-white">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}