import { create } from "zustand";
import {
  formatXOF,
  WHATSAPP_PRIMARY,
  type Product,
} from "@/data/products";

export type SaleMode = "detail" | "gros";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  category: string;
  priceDetail: number;
  priceGros: number;
  minGrosQuantity: number;
  quantity: number;
  mode: SaleMode;
}

export const unitPrice = (item: CartItem): number =>
  item.mode === "gros" ? item.priceGros : item.priceDetail;

export const lineTotal = (item: CartItem): number =>
  unitPrice(item) * item.quantity;

export const cartTotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + lineTotal(item), 0);

export const cartCount = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.quantity, 0);

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity: number, mode: SaleMode) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  setMode: (id: string, mode: SaleMode) => void;
  clearCart: () => void;
  buildWhatsAppMessage: (city: string) => string;
  getWhatsAppLink: (city: string) => string;
}

const normalizeQuantity = (item: CartItem, quantity: number): number => {
  const min = item.mode === "gros" ? item.minGrosQuantity : 1;
  return Math.max(min, Math.floor(quantity) || min);
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product, quantity, mode) => {
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        const nextMode: SaleMode = mode === "gros" ? "gros" : existing.mode;
        const merged: CartItem = { ...existing, mode: nextMode };
        merged.quantity = normalizeQuantity(
          merged,
          existing.quantity + quantity
        );

        return {
          items: state.items.map((item) =>
            item.id === product.id ? merged : item
          ),
          isOpen: true,
        };
      }

      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        image: product.image,
        category: product.category,
        priceDetail: product.priceDetail,
        priceGros: product.priceGros,
        minGrosQuantity: product.minGrosQuantity,
        quantity: 0,
        mode,
      };
      newItem.quantity = normalizeQuantity(newItem, quantity);

      return { items: [...state.items, newItem], isOpen: true };
    });
  },

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  increment: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decrement: (id) =>
    set((state) => ({
      items: state.items.map((item) => {
        if (item.id !== id) return item;
        const min = item.mode === "gros" ? item.minGrosQuantity : 1;
        return { ...item, quantity: Math.max(min, item.quantity - 1) };
      }),
    })),

  setQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, quantity: normalizeQuantity(item, quantity) }
          : item
      ),
    })),

  setMode: (id, mode) =>
    set((state) => ({
      items: state.items.map((item) => {
        if (item.id !== id) return item;
        const next: CartItem = { ...item, mode };
        next.quantity = normalizeQuantity(next, item.quantity);
        return next;
      }),
    })),

  clearCart: () => set({ items: [] }),

  buildWhatsAppMessage: (city) => {
    const items = get().items;
    const total = cartTotal(items);

    const lines: string[] = [];
    lines.push("*NOUVELLE COMMANDE — DJE'S EMPIRE*");
    lines.push("");
    lines.push("Bonjour, je souhaite passer la commande suivante :");
    lines.push("");

    items.forEach((item, index) => {
      lines.push(`${index + 1}. *${item.name}*`);
      lines.push(`   Quantité : ${item.quantity}`);
      lines.push(
        `   Type de vente : ${
          item.mode === "gros" ? "Vente en Gros" : "Vente au Détail"
        }`
      );
      lines.push(`   Prix unitaire : ${formatXOF(unitPrice(item))}`);
      lines.push(`   Sous-total : ${formatXOF(lineTotal(item))}`);
      lines.push("");
    });

    lines.push("--------------------------------");
    lines.push(`*TOTAL GÉNÉRAL : ${formatXOF(total)}*`);
    lines.push("--------------------------------");
    lines.push("");
    lines.push(`Ville de livraison : ${city || "À préciser"}`);
    lines.push("");
    lines.push("Merci de me confirmer la disponibilité et le délai de livraison.");

    return lines.join("\n");
  },

  getWhatsAppLink: (city) => {
    const message = get().buildWhatsAppMessage(city);
    return `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(
      message
    )}`;
  },
}));