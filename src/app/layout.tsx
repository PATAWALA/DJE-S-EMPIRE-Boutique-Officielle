import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DJE'S EMPIRE — Boutique Officielle | Mode, Beauté & Maison",
  description:
    "Découvrez le catalogue DJE'S EMPIRE : robes, hidjabs, sacs, cosmétiques, accessoires et articles maison. Vente au détail et en gros. Livraison au Burkina Faso.",
  keywords: [
    "DJE'S EMPIRE",
    "boutique Burkina Faso",
    "vente en gros",
    "robes",
    "hidjabs",
    "cosmétiques",
    "Ouagadougou",
  ],
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",        // ← barre du navigateur BLANCHE
  colorScheme: "light",          // ← force le mode clair
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={inter.variable} style={{ colorScheme: "light" }}>
      <body className="font-sans bg-white text-ink antialiased">
        {children}
      </body>
    </html>
  );
}