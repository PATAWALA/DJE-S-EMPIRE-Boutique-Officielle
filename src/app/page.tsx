"use client";

import { useMemo, useState } from "react";
import { ChevronRight, Sparkles, Truck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryFilter from "@/components/shop/CategoryFilter";
import ProductCard from "@/components/shop/ProductCard";
import CartDrawer from "@/components/cart/CartDrawer";
import { PRODUCTS, type Category } from "@/data/products";
import { useCartStore, type SaleMode } from "@/store/useCartStore";

type FilterValue = Category | "tous";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<FilterValue>("tous");
  const [saleMode, setSaleMode] = useState<SaleMode>("detail");

  const isOpen = useCartStore((state) => state.isOpen);
  const openCart = useCartStore((state) => state.openCart);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchCategory =
        category === "tous" || product.category === category;
      const matchSearch =
        query.length === 0 || product.name.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });
  }, [category, searchQuery]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-soft to-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="flex flex-col items-start">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-nude/30 bg-rose-nude/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-deep">
              <Sparkles className="h-3 w-3" strokeWidth={2.4} />
              Nouvelle Collection
            </span>

            <h1 className="mt-5 max-w-2xl text-[28px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              L&apos;élégance à portée de main,
              <span className="text-rose-deep"> au détail comme en gros.</span>
            </h1>

            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-zinc-600 sm:text-[15.5px]">
              Explorez notre catalogue exclusif : robes, hidjabs, sacs,
              cosmétiques et articles maison. Sélectionnez vos quantités, puis
              validez votre commande directement sur WhatsApp.
            </p>

            <div className="mt-6 flex w-full flex-wrap items-center gap-3 sm:w-auto">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("catalogue")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5 text-[13.5px] font-semibold text-white transition-all hover:bg-rose-deep active:scale-[0.98] sm:flex-none"
              >
                Voir le catalogue
                <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
              </button>

              <button
                type="button"
                onClick={openCart}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line bg-white px-5 text-[13.5px] font-semibold text-ink transition-all hover:border-ink sm:flex-none"
              >
                Mon panier
              </button>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] font-medium text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5" strokeWidth={2.2} />
                Livraison Ouagadougou &amp; régions
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2.2} />
                Prix dégressifs en gros
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTRES */}
      <CategoryFilter
        selected={category}
        onSelect={setCategory}
        saleMode={saleMode}
        onSaleModeChange={setSaleMode}
      />

      {/* CATALOGUE */}
      <main
        id="catalogue"
        className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
              Catalogue
            </h2>
            <p className="mt-1 text-[12.5px] text-zinc-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length > 1 ? "articles" : "article"}
              {saleMode === "gros" && " — Mode Gros activé"}
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-soft py-20 text-center">
            <p className="text-[15px] font-semibold text-ink">
              Aucun article trouvé
            </p>
            <p className="mt-1 max-w-xs text-[13px] text-zinc-500">
              Essayez de modifier votre recherche ou de choisir une autre
              catégorie.
            </p>
          </div>
        ) : (
          /* 🔽 CORRECTION : 1 colonne sur mobile */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                saleMode={saleMode}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer isOpen={isOpen} />
    </div>
  );
}