"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "@/components/hero/Hero";
import { ProductCard } from "@/components/products/ProductCard";
import { products, collections } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const categoriesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Categories Entrance
    gsap.fromTo(
      categoriesRef.current?.children || [],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 85%",
        },
      }
    );

    // Products Entrance
    gsap.fromTo(
      productsRef.current?.children || [],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top 80%",
        },
      }
    );
    
    // Brand Experience Parallax
    gsap.fromTo(
      ".brand-image-parallax",
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: brandRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

  }, []);

  const featuredProducts = [
    ...products.filter((p) => p.category === "hookahs").slice(0, 6),
    ...products.filter((p) => p.category === "charcoal").slice(0, 2),
  ];
  const mainCollection = collections[0];

  return (
    <>
      <Hero />

      {/* Categories Navigation */}
      <section className="py-20 bg-brand-black">
        <div className="container mx-auto px-6 md:px-12">
          <div 
            ref={categoriesRef}
            className="flex overflow-x-auto no-scrollbar gap-8 md:justify-center border-b border-brand-white/10 pb-6"
          >
            {[
              { label: "TOUT", href: "/shop" },
              { label: "CHICHAS", href: "/shop?category=hookahs" },
              { label: "SAVEURS", href: "/shop?category=flavors" },
              { label: "ACCESSOIRES", href: "/shop?category=accessories" },
              { label: "CHARBON", href: "/shop?category=charcoal" },
              { label: "COLLECTIONS", href: "/collections" },
            ].map((cat, i) => (
              <Link 
                key={cat.label} 
                href={cat.href}
                className={`text-sm tracking-widest font-semibold whitespace-nowrap transition-colors ${i === 0 ? "text-brand-white" : "text-brand-lightgray hover:text-brand-white"}`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-brand-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-brand-white">Nouveautés & <br/>Sélection</h2>
            <Link href="/shop" className="text-brand-lightgray hover:text-brand-white uppercase tracking-widest text-sm underline underline-offset-8 transition-colors">
              Voir tout
            </Link>
          </div>
          
          <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection / Brand Experience */}
      <section ref={brandRef} className="py-32 bg-brand-black relative overflow-hidden h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={mainCollection.image}
            alt={mainCollection.name}
            fill
            className="object-cover opacity-40 brand-image-parallax"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-brand-black" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
          <span className="text-brand-lightgray uppercase tracking-[0.2em] text-sm mb-6">Collection</span>
          <h2 className="text-5xl md:text-7xl font-serif text-brand-white mb-8 max-w-4xl leading-tight">
            {mainCollection.name}
          </h2>
          <p className="text-brand-lightgray text-lg md:text-xl max-w-2xl mb-12">
            {mainCollection.description}
          </p>
          <Link 
            href={`/shop?collection=${mainCollection.slug}`}
            className="px-10 py-4 bg-brand-white text-brand-black text-sm uppercase tracking-widest font-semibold hover:bg-brand-lightgray transition-colors"
          >
            Découvrir la collection
          </Link>
        </div>
      </section>
    </>
  );
}
