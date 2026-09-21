"use client";

import { Sparkles, Store } from "lucide-react";
import { CATEGORY_LABELS, type Category } from "@/data/products";
import type { SaleMode } from "@/store/useCartStore";

type FilterValue = Category | "tous";

interface CategoryFilterProps {
  selected: FilterValue;
  onSelect: (value: FilterValue) => void;
  saleMode: SaleMode;
  onSaleModeChange: (mode: SaleMode) => void;
}

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "robes", label: CATEGORY_LABELS.robes },
  { value: "hidjabs", label: CATEGORY_LABELS.hidjabs },
  { value: "sacs", label: CATEGORY_LABELS.sacs },
  { value: "cosmetiques", label: CATEGORY_LABELS.cosmetiques },
  { value: "accessoires", label: CATEGORY_LABELS.accessoires },
  { value: "maison", label: CATEGORY_LABELS.maison },
];

export default function CategoryFilter({
  selected,
  onSelect,
  saleMode,
  onSaleModeChange,
}: CategoryFilterProps) {
  return (
    <section className="sticky top-16 z-30 border-b border-line bg-white/90 backdrop-blur-xl sm:top-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Sale mode toggle */}
        <div className="flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            <Store className="h-3.5 w-3.5" strokeWidth={2.2} />
            <span className="hidden sm:inline">Mode d&apos;achat</span>
            <span className="sm:hidden">Achat</span>
          </div>

          <div className="flex rounded-full border border-line bg-soft p-1">
            <button
              type="button"
              onClick={() => onSaleModeChange("detail")}
              className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all sm:px-5 sm:text-[13px] ${
                saleMode === "detail"
                  ? "bg-ink text-white shadow-sm"
                  : "text-zinc-500 hover:text-ink"
              }`}
            >
              Détail
            </button>
            <button
              type="button"
              onClick={() => onSaleModeChange("gros")}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all sm:px-5 sm:text-[13px] ${
                saleMode === "gros"
                  ? "bg-rose-deep text-white shadow-sm"
                  : "text-zinc-500 hover:text-ink"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.2} />
              Gros
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0">
          {FILTERS.map((filter) => {
            const isActive = selected === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => onSelect(filter.value)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-all sm:text-sm ${
                  isActive
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-zinc-600 hover:border-ink hover:text-ink"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}