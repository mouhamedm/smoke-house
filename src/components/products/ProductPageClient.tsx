"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import { Minus, Plus, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { useCart } from "@/context/CartContext";

gsap.registerPlugin(ScrollTrigger);

export default function ProductPageClient({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug);

  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const heroRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!product) return;

    gsap.fromTo(
      heroRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 },
    );
    gsap.fromTo(
      infoRef.current?.children || [],
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      },
    );
  }, [product]);

  if (!product) {
    notFound();
    return null;
  }

  const specLabels: Record<string, string> = {
    materials: "Matériaux",
    dimensions: "Dimensions",
    weight: "Poids",
    origin: "Origine",
  };

  const stockStatus = () => {
    if (product.stock === 0)
      return { label: "Rupture de stock", color: "text-brand-red" };
    if (product.stock <= 5)
      return {
        label: `Plus que ${product.stock} disponibles`,
        color: "text-amber-400",
      };
    return {
      label: `${product.stock} disponibles`,
      color: "text-green-500/70",
    };
  };

  const { label: stockLabel, color: stockColor } = stockStatus();

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-8">
        <div className="flex items-center gap-2 text-brand-lightgray text-xs uppercase tracking-widest">
          <Link href="/" className="hover:text-brand-white transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href="/shop"
            className="hover:text-brand-white transition-colors"
          >
            Boutique
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-white">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-24 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Carousel */}
        <div ref={heroRef} className="w-full lg:w-1/2">
          <div
            className="relative aspect-4/5 bg-brand-charcoal overflow-hidden select-none"
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 40) {
                if (diff > 0) setCurrentImage((p) => (p + 1) % product.images.length);
                else setCurrentImage((p) => (p - 1 + product.images.length) % product.images.length);
              }
              touchStartX.current = null;
            }}
            onWheel={(e) => {
              if (Math.abs(e.deltaX) < 10) return;
              if (wheelTimeout.current) return;
              if (e.deltaX > 0) setCurrentImage((p) => (p + 1) % product.images.length);
              else setCurrentImage((p) => (p - 1 + product.images.length) % product.images.length);
              wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null; }, 600);
            }}
          >
            {product.images.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  idx === currentImage ? "opacity-100 z-1" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} — vue ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                />
              </div>
            ))}

            {/* Badge */}
            {product.featured && (
              <div className="absolute top-6 left-6 bg-brand-white text-brand-black text-[10px] uppercase tracking-widest px-3 py-1.5 font-semibold z-10">
                Signature
              </div>
            )}

            {/* Flèches */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage((p) => (p - 1 + product.images.length) % product.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center text-xl bg-brand-black/50 text-brand-white hover:bg-brand-black/80 transition-colors rounded-full backdrop-blur-sm"
                  aria-label="Image précédente"
                >
                  ‹
                </button>
                <button
                  onClick={() => setCurrentImage((p) => (p + 1) % product.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center text-xl bg-brand-black/50 text-brand-white hover:bg-brand-black/80 transition-colors rounded-full backdrop-blur-sm"
                  aria-label="Image suivante"
                >
                  ›
                </button>
              </>
            )}

            {/* Dots */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentImage === idx ? "bg-brand-white w-4" : "bg-brand-white/40 w-1.5"
                    }`}
                    aria-label={`Image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info (Sticky) */}
        <div className="w-full lg:w-1/2">
          <div ref={infoRef} className="sticky top-28 flex flex-col gap-6">
            {/* Category & Name */}
            <div>
              <span className="text-brand-lightgray text-xs uppercase tracking-[0.3em] font-semibold block mb-3">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-brand-white leading-tight mb-4">
                {product.name}
              </h1>
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < Math.round(product.rating!) ? "text-brand-white" : "text-brand-white/20"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-brand-lightgray text-xs">
                    ({product.rating} / 5)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="py-4 border-y border-brand-white/10">
              <span className="text-3xl text-brand-white font-serif">
                {product.price.toFixed(2)} €
              </span>
              <p className="text-brand-lightgray text-sm mt-1">
                TVA incluse · Livraison à partir de 15 €
              </p>
            </div>

            {/* Description */}
            <p className="text-brand-lightgray leading-relaxed">
              {product.description}
            </p>

            {/* Stock */}
            <p className={`text-sm font-medium ${stockColor}`}>
              ● {stockLabel}
            </p>

            {/* Quantity & Actions */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-brand-white/20 h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-full flex items-center justify-center text-brand-lightgray hover:text-brand-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-brand-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="w-12 h-full flex items-center justify-center text-brand-lightgray hover:text-brand-white transition-colors"
                    disabled={product.stock === 0}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-brand-lightgray text-sm">
                  {(product.price * quantity).toFixed(2)} € au total
                </span>
              </div>

              <button
                disabled={product.stock === 0 || isAdded}
                onClick={handleAddToCart}
                className="w-full bg-brand-white text-brand-black uppercase tracking-widest text-sm font-semibold py-4 hover:bg-brand-offwhite transition-colors disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {isAdded ? "Ajouté au panier ✓" : "Ajouter au panier"}
              </button>

              <button
                disabled={product.stock === 0}
                className="w-full bg-transparent border border-brand-white text-brand-white uppercase tracking-widest text-sm font-semibold py-4 hover:bg-brand-white hover:text-brand-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Acheter maintenant
              </button>
            </div>

            {/* Specifications */}
            {Object.keys(product.specifications).length > 0 && (
              <div className="pt-6 border-t border-brand-white/10">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-brand-white mb-4">
                  Détails du produit
                </h3>
                <div className="flex flex-col gap-3">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex justify-between border-b border-brand-white/5 pb-2.5 text-sm"
                    >
                      <span className="text-brand-lightgray">
                        {specLabels[key] ?? key}
                      </span>
                      <span className="text-brand-white text-right w-2/3">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products teaser */}
      <div className="border-t border-brand-white/10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-serif text-brand-white mb-8">
            Vous aimerez aussi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products
              .filter(
                (p) => p.id !== product.id && p.category === product.category,
              )
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
