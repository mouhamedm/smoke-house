import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smoke House - L'expérience chicha premium",
  description:
    "Découvrez notre collection premium de chichas, saveurs et accessoires. L'art de fumer autrement.",
  openGraph: {
    title: "Smoke House - L'expérience chicha premium",
    description:
      "Découvrez notre collection premium de chichas, saveurs et accessoires. L'art de fumer autrement.",
    siteName: "Smoke House",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="min-h-screen bg-brand-black text-brand-offwhite flex flex-col font-sans">
        <CartProvider>
          <CustomCursor />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
