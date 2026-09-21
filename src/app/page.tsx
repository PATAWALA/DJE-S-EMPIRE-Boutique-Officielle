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

      {/* HERO — aligné, centré sur mobile */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-gold-50 via-white to-white">
        {/* Cercles décoratifs Or */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-300 bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
              Nouvelle Collection
            </span>

            <h1 className="mt-6 text-[30px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[52px]">
              L&apos;élégance à portée de main,
              <span className="text-gold-gradient"> au détail comme en gros.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-zinc-600 sm:text-[16px]">
              Explorez notre catalogue exclusif : robes, hidjabs, sacs,
              cosmétiques et articles maison. Sélectionnez vos quantités, puis
              validez votre commande directement sur WhatsApp.
            </p>

            {/* Boutons CTA — pleine largeur égale sur mobile, Or */}
            <div className="mt-8 grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("catalogue")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-gold-gradient flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[14px] font-bold tracking-wide text-ink shadow-[0_8px_24px_-10px_rgba(201,162,39,0.8)] transition-all hover:brightness-105 hover:shadow-[0_12px_32px_-10px_rgba(201,162,39,1)] active:scale-[0.98]"
              >
                Voir le catalogue
                <ChevronRight className="h-4 w-4" strokeWidth={2.6} />
              </button>

              <button
                type="button"
                onClick={openCart}
                className="flex h-12 items-center justify-center gap-2 rounded-full border-2 border-ink bg-white px-6 text-[14px] font-bold tracking-wide text-ink transition-all hover:bg-ink hover:text-white active:scale-[0.98]"
              >
                Mon panier
              </button>
            </div>

            {/* Infos livraison */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[12.5px] font-medium text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-gold-700" strokeWidth={2.2} />
                Livraison Ouagadougou &amp; régions
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-gold-500 sm:inline-block" />
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-gold-700" strokeWidth={2.2} />
                Prix dégressifs en gros
              </span>
            </div>
          </div>
        </div>
      </section>

      <CategoryFilter
        selected={category}
        onSelect={setCategory}
        saleMode={saleMode}
        onSaleModeChange={setSaleMode}
      />

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
              {saleMode === "gros" && (
                <span className="text-gold-700"> — Mode Gros activé</span>
              )}
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
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