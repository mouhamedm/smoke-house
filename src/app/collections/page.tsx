"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { collections } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

export default function CollectionsPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current?.children || [],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );

    // Animate each collection section
    collections.forEach((_, idx) => {
      const el = document.getElementById(`collection-${idx}`);
      if (!el) return;
      gsap.fromTo(
        el.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-brand-black">

      {/* Hero */}
      <div
        ref={heroRef}
        className="relative h-[70vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden border-b border-brand-white/10"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[300px] bg-brand-red/10 rounded-full blur-[100px]" />
        </div>
        <span className="relative text-brand-lightgray uppercase tracking-[0.4em] text-xs font-semibold mb-6">
          L'excellence par thème
        </span>
        <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-serif text-brand-white leading-none">
          Nos Collections
        </h1>
        <p className="relative text-brand-lightgray mt-6 text-lg max-w-xl">
          Trois univers, une seule obsession : la perfection.
        </p>
      </div>

      {/* Collections */}
      <div className="container mx-auto px-6 md:px-12 py-32 flex flex-col gap-40">
        {collections.map((collection, idx) => (
          <section
            id={`collection-${idx}`}
            key={collection.id}
            className={`flex flex-col ${idx % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-24`}
          >
            {/* Image */}
            <div className="w-full md:w-3/5 relative aspect-[4/3] overflow-hidden group">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
              {/* Number overlay */}
              <div className="absolute top-8 left-8 text-[80px] md:text-[120px] font-serif text-brand-white/5 leading-none select-none pointer-events-none">
                0{idx + 1}
              </div>
            </div>

            {/* Text */}
            <div className="w-full md:w-2/5 flex flex-col items-start gap-6">
              <span className="text-brand-lightgray text-xs uppercase tracking-[0.3em] font-semibold">
                Collection N°0{idx + 1}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-white leading-tight">
                {collection.name}
              </h2>
              <div className="w-12 h-[1px] bg-brand-white/30" />
              <p className="text-brand-lightgray text-lg leading-relaxed">
                {collection.description}
              </p>
              <Link
                href={`/shop?collection=${collection.slug}`}
                className="group/btn relative mt-4 px-8 py-4 border border-brand-white/30 text-brand-white text-sm uppercase tracking-widest overflow-hidden hover:border-brand-white/60 transition-colors"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-brand-black">
                  Explorer la collection
                </span>
                <div className="absolute inset-0 bg-brand-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-in-out" />
              </Link>
            </div>
          </section>
        ))}
      </div>

      {/* Full-width CTA */}
      <div className="relative border-t border-brand-white/10 py-32 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[200px] bg-brand-red/5 rounded-full blur-[80px]" />
        </div>
        <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-8">
          <h2 className="text-3xl md:text-5xl font-serif text-brand-white">
            Découvrez toute la boutique
          </h2>
          <p className="text-brand-lightgray text-lg max-w-xl">
            Explorez les 12 produits qui composent l'univers Smoking House.
          </p>
          <Link
            href="/shop"
            className="px-12 py-5 bg-brand-white text-brand-black uppercase tracking-widest text-sm font-semibold hover:bg-brand-lightgray transition-colors"
          >
            Voir la boutique
          </Link>
        </div>
      </div>
    </div>
  );
}
