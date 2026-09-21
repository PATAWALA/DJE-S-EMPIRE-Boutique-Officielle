export type Category =
  | "robes"
  | "hidjabs"
  | "sacs"
  | "cosmetiques"
  | "accessoires"
  | "maison";

export interface Product {
  id: string;
  name: string;
  category: Category;
  priceDetail: number;
  priceGros: number;
  minGrosQuantity: number;
  image: string;
  inStock: boolean;
  rating: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  robes: "Robes",
  hidjabs: "Hidjabs",
  sacs: "Sacs & Cartables",
  cosmetiques: "Cosmétiques & Pommades",
  accessoires: "Accessoires",
  maison: "Maison & Cuisine",
};

export const formatXOF = (value: number): string => {
  const formatted = new Intl.NumberFormat("fr-FR")
    .format(Math.round(value))
    .replace(/\u202f|\u00a0/g, " ");
  return `${formatted} FCFA`;
};

export const WHATSAPP_PRIMARY = "22666937272";
export const WHATSAPP_SECONDARY = "22660057171";

export const PRODUCTS: Product[] = [
  {
    id: "robe-sahel-01",
    name: "Robe Longue Sahel",
    category: "robes",
    priceDetail: 18500,
    priceGros: 14000,
    minGrosQuantity: 5,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    rating: 4.8,
  },
  {
    id: "robe-ouaga-02",
    name: "Robe Fluide Ouaga",
    category: "robes",
    priceDetail: 15500,
    priceGros: 11500,
    minGrosQuantity: 5,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    rating: 4.6,
  },
  {
    id: "robe-kaya-03",
    name: "Robe Wax Moderne Kaya",
    category: "robes",
    priceDetail: 22000,
    priceGros: 16500,
    minGrosQuantity: 6,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    rating: 4.9,
  },
  {
    id: "hidjab-nour-04",
    name: "Hidjab Premium Soie Nour",
    category: "hidjabs",
    priceDetail: 6500,
    priceGros: 4500,
    minGrosQuantity: 10,
    image:
      "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    rating: 4.7,
  },
  {
    id: "hidjab-amina-05",
    name: "Hidjab Jersey Stretch Amina",
    category: "hidjabs",
    priceDetail: 4500,
    priceGros: 3200,
    minGrosQuantity: 12,
    image:
      "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    rating: 4.5,
  },
  {
    id: "hidjab-safiya-06",
    name: "Ensemble Hidjab + Bonnet Safiya",
    category: "hidjabs",
    priceDetail: 9000,
    priceGros: 6500,
    minGrosQuantity: 8,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    rating: 4.8,
  },
  {
    id: "sac-signature-07",
    name: "Sac à Main Cuir Signature",
    category: "sacs",
    priceDetail: 27500,
    priceGros: 21000,
    minGrosQuantity: 4,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    rating: 4.9,
  },
  {
    id: "sac-bureau-08",
    name: "Cartable Élégant Bureau Chic",
    category: "sacs",
    priceDetail: 32000,
    priceGros: 24500,
    minGrosQuantity: 4,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    rating: 4.7,
  },
  {
    id: "sac-mini-09",
    name: "Sac Bandoulière Mini Nude",
    category: "sacs",
    priceDetail: 14500,
    priceGros: 10500,
    minGrosQuantity: 6,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    rating: 4.6,
  },
  {
    id: "cosmo-karite-10",
    name: "Pommade Karité Gold",
    category: "cosmetiques",
    priceDetail: 5500,
    priceGros: 3800,
    minGrosQuantity: 12,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    rating: 4.8,
  },
  {
    id: "cosmo-baobab-11",
    name: "Huile de Soin Baobab Pure",
    category: "cosmetiques",
    priceDetail: 7000,
    priceGros: 5000,
    minGrosQuantity: 10,
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    rating: 4.9,
  },
  {
    id: "cosmo-coffret-12",
    name: "Coffret Beauté Sahel",
    category: "cosmetiques",
    priceDetail: 18000,
    priceGros: 13500,
    minGrosQuantity: 5,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80",
    inStock: false,
    rating: 4.7,
  },
  {
    id: "maison-marmite-13",
    name: "Set Ustensiles Marmite Pro",
    category: "maison",
    priceDetail: 24000,
    priceGros: 18000,
    minGrosQuantity: 5,
    image:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    rating: 4.6,
  },
  {
    id: "maison-inox-14",
    name: "Batterie de Cuisine Inox 12 pièces",
    category: "maison",
    priceDetail: 45000,
    priceGros: 35000,
    minGrosQuantity: 3,
    image:
      "https://images.unsplash.com/photo-1584990347449-a2d4c2c2b4d0?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    rating: 4.8,
  },
  {
    id: "access-montre-15",
    name: "Montre Femme Éclat Doré",
    category: "accessoires",
    priceDetail: 16000,
    priceGros: 12000,
    minGrosQuantity: 6,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    rating: 4.7,
  },
  {
    id: "access-parure-16",
    name: "Parure Bijoux Reine du Faso",
    category: "accessoires",
    priceDetail: 12500,
    priceGros: 9000,
    minGrosQuantity: 8,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    rating: 4.9,
  },
];