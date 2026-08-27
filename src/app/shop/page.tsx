"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductCard } from "@/components/products/ProductCard";
import { products, collections } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { label: "TOUT", value: "all" },
  { label: "CHICHAS", value: "hookahs" },
  { label: "SAVEURS", value: "flavors" },
  { label: "ACCESSOIRES", value: "accessories" },
  { label: "CHARBON", value: "charcoal" },
];

const CATEGORY_ALIASES: Record<string, string> = {
  chichas: "hookahs",
  saveurs: "flavors",
  accessoires: "accessories",
  charbon: "charcoal",
};

function resolveCategory(param: string | null) {
  if (!param) return "all";
  return CATEGORY_ALIASES[param] ?? param;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const collectionParam = searchParams.get("collection");
  const categoryParam = resolveCategory(searchParams.get("category"));

  const [selectedCategory, setSelectedCategory] =
    useState<string>(categoryParam);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    collectionParam,
  );

  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedCategory(categoryParam);
    if (collectionParam) setSelectedCollection(collectionParam);
  }, [categoryParam, collectionParam]);

  // Initial GSAP Hero animation
  useEffect(() => {
    gsap.fromTo(
      heroRef.current?.children || [],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      },
    );
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const children = Array.from(gridRef.current.children);
    if (children.length > 0) {
      gsap.fromTo(
        children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: "power3.out" },
      );
    }
  }, [selectedCategory, selectedCollection]);

  const activeCollectionObj = collections.find(
    (c) => c.slug === selectedCollection,
  );

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesCollection =
      !selectedCollection || product.collection === selectedCollection;
    return matchesCategory && matchesCollection;
  });

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative h-[45vh] flex flex-col items-center justify-center text-center px-6 pt-28 overflow-hidden border-b border-brand-white/10"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-125 h-50 bg-brand-red/10 rounded-full blur-[100px]" />
        </div>
        <span className="relative text-brand-lightgray uppercase tracking-[0.4em] text-xs font-semibold mb-4">
          La sélection Smoke House
        </span>
        <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-serif text-brand-white">
          {activeCollectionObj ? activeCollectionObj.name : "Boutique"}
        </h1>
        <p className="relative mt-4 text-brand-lightgray text-lg max-w-lg">
          {activeCollectionObj
            ? activeCollectionObj.description
            : "Des pièces d'exception conçues pour transcender l'expérience."}
        </p>

        {selectedCollection && (
          <button
            onClick={() => setSelectedCollection(null)}
            className="relative mt-4 text-xs uppercase tracking-widest text-brand-red hover:underline"
          >
            ← Voir toutes les collections
          </button>
        )}
      </div>

      <div className="container mx-auto px-6 md:px-12 py-16">
        {/* Category Filters Bar */}
        <div className="flex gap-8 mb-12 border-b border-brand-white/10 pb-6 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`text-sm uppercase tracking-widest font-semibold whitespace-nowrap pb-1 transition-all border-b-2 cursor-pointer ${
                  isActive
                    ? "text-brand-white border-brand-white"
                    : "text-brand-lightgray border-transparent hover:text-brand-white hover:border-brand-white/30"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Count info */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-brand-lightgray text-sm">
            {filteredProducts.length}{" "}
            {filteredProducts.length > 1 ? "produits" : "produit"}
          </p>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-brand-lightgray text-lg">
              Aucun produit ne correspond à cette sélection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedCollection(null);
              }}
              className="mt-6 px-6 py-3 border border-brand-white/30 text-brand-white text-xs uppercase tracking-widest hover:border-brand-white transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-black flex items-center justify-center text-brand-lightgray">
          Chargement de la boutique...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
