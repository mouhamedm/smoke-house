"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import clsx from "clsx";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || product.images.length === 0) return;
    
    const { left, width } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    
    // Calculate which image to show based on mouse X percentage
    const percent = Math.max(0, Math.min(1, x / width));
    const index = Math.floor(percent * product.images.length);
    
    // Make sure index is within bounds
    setCurrentImageIndex(Math.min(index, product.images.length - 1));
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0); // Reset to first image on leave
  };

  return (
    <Link 
      href={`/product/${product.slug}`}
      className="group flex flex-col gap-4 w-full"
    >
      {/* Image Gallery Container */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[3/4] w-full bg-brand-charcoal overflow-hidden rounded-sm"
      >
        {product.images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`${product.name} - Vue ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={clsx(
              "object-cover transition-opacity duration-300 ease-in-out",
              idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          />
        ))}

        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.featured && (
            <span className="text-[10px] uppercase tracking-widest bg-brand-white text-brand-black px-2 py-1 font-semibold">
              Signature
            </span>
          )}
          {product.stock === 0 && (
            <span className="text-[10px] uppercase tracking-widest bg-brand-red text-white px-2 py-1 font-semibold">
              Rupture
            </span>
          )}
        </div>

        {/* Hover Progress Indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-0 w-full flex justify-center gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-8">
            {product.images.map((_, idx) => (
              <div 
                key={idx}
                className={clsx(
                  "h-[2px] flex-1 transition-colors duration-300",
                  idx === currentImageIndex ? "bg-brand-white" : "bg-brand-white/30"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] text-brand-lightgray uppercase tracking-widest mb-1">
              {product.category}
            </p>
            <h3 className="text-lg font-serif text-brand-white group-hover:text-brand-lightgray transition-colors">
              {product.name}
            </h3>
          </div>
          <p className="text-brand-white font-medium">
            {product.price.toFixed(2)} €
          </p>
        </div>
      </div>
    </Link>
  );
}
