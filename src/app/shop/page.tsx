"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["TOUT", "CHICHAS", "SAVEURS", "ACCESSOIRES", "CHARBON"];

export default function ShopPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current?.children || [],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(
      gridRef.current?.children || [],
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-brand-black">

      {/* Hero */}
      <div
        ref={heroRef}
        className="relative h-[45vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden border-b border-brand-white/10"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[200px] bg-brand-red/8 rounded-full blur-[100px]" />
        </div>
        <span className="relative text-brand-lightgray uppercase tracking-[0.4em] text-xs font-semibold mb-4">
          La sélection Smoking House
        </span>
        <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-serif text-brand-white">
          Boutique
        </h1>
        <p className="relative mt-4 text-brand-lightgray text-lg max-w-lg">
          12 produits conçus pour transcender l'expérience.
        </p>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-16">

        {/* Filters */}
        <div className="flex gap-8 mb-12 border-b border-brand-white/10 pb-6 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              className={`text-sm uppercase tracking-widest font-semibold whitespace-nowrap pb-1 transition-colors border-b-2 ${
                i === 0
                  ? "text-brand-white border-brand-white"
                  : "text-brand-lightgray border-transparent hover:text-brand-white hover:border-brand-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-brand-lightgray text-sm mb-8">
          {products.length} produits
        </p>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
