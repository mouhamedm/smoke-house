"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { products } from "@/data/products";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";

interface CartItem {
  product: (typeof products)[0];
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: products[0], quantity: 1 },
    { product: products[3], quantity: 2 },
  ]);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current?.children || [],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.4 }
    );
  }, []);

  const updateQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty < 1) return prev;
      if (newQty > next[index].product.stock) return prev;
      next[index] = { ...next[index], quantity: newQty };
      return next;
    });
  };

  const removeItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-brand-black">

      {/* Hero */}
      <div
        ref={heroRef}
        className="relative h-[40vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden border-b border-brand-white/10"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[400px] h-[200px] bg-brand-red/6 rounded-full blur-[80px]" />
        </div>
        <span className="relative text-brand-lightgray uppercase tracking-[0.4em] text-xs font-semibold mb-4">
          Récapitulatif
        </span>
        <h1 className="relative text-4xl md:text-6xl font-serif text-brand-white">
          Votre Panier
        </h1>
      </div>

      {/* Content */}
      <div ref={contentRef} className="container mx-auto px-6 md:px-12 py-16">

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-16 h-16 border border-brand-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-lightgray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-brand-lightgray text-lg">Votre panier est vide.</p>
            <Link
              href="/shop"
              className="flex items-center gap-2 text-brand-white hover:text-brand-lightgray transition-colors text-sm uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" />
              Retourner à la boutique
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Items */}
            <div className="w-full lg:w-3/5 flex flex-col gap-0">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-brand-white/20 text-xs uppercase tracking-widest text-brand-lightgray">
                <div className="col-span-6">Produit</div>
                <div className="col-span-2 text-center">Prix</div>
                <div className="col-span-2 text-center">Qté</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {cartItems.map((item, idx) => (
                <div
                  key={`${item.product.id}-${idx}`}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-8 border-b border-brand-white/10"
                >
                  {/* Product */}
                  <div className="col-span-1 md:col-span-6 flex gap-5 items-center">
                    <div className="w-20 h-28 relative bg-brand-charcoal flex-shrink-0 overflow-hidden">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-brand-lightgray text-[10px] uppercase tracking-widest">{item.product.category}</span>
                      <h3 className="text-lg font-serif text-brand-white">{item.product.name}</h3>
                      <p className="text-brand-lightgray text-sm md:hidden mt-1">{item.product.price.toFixed(2)} €</p>
                      <button
                        onClick={() => removeItem(idx)}
                        className="flex items-center gap-1.5 text-brand-lightgray hover:text-brand-red transition-colors mt-2 text-xs uppercase tracking-widest self-start"
                      >
                        <Trash2 className="w-3 h-3" />
                        Supprimer
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="hidden md:flex col-span-2 justify-center text-brand-white text-sm">
                    {item.product.price.toFixed(2)} €
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                    <div className="flex items-center border border-brand-white/20 h-10">
                      <button
                        onClick={() => updateQuantity(idx, -1)}
                        className="w-10 h-full flex items-center justify-center text-brand-lightgray hover:text-brand-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-brand-white text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(idx, 1)}
                        className="w-10 h-full flex items-center justify-center text-brand-lightgray hover:text-brand-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="col-span-1 md:col-span-2 text-left md:text-right text-brand-white font-medium text-sm">
                    <span className="text-brand-lightgray mr-2 md:hidden">Total :</span>
                    {(item.product.price * item.quantity).toFixed(2)} €
                  </div>
                </div>
              ))}

              <Link
                href="/shop"
                className="flex items-center gap-2 text-brand-lightgray hover:text-brand-white transition-colors text-sm uppercase tracking-widest mt-8 self-start"
              >
                <ArrowLeft className="w-4 h-4" />
                Continuer vos achats
              </Link>
            </div>

            {/* Summary */}
            <div className="w-full lg:w-2/5">
              <div className="bg-brand-charcoal/40 border border-brand-white/10 p-8 sticky top-32 flex flex-col gap-6">
                <h2 className="text-xl font-serif text-brand-white border-b border-brand-white/10 pb-4">
                  Résumé de la commande
                </h2>

                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex justify-between text-brand-lightgray">
                    <span>Sous-total ({cartItems.length} article{cartItems.length > 1 ? "s" : ""})</span>
                    <span className="text-brand-white">{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-brand-lightgray">
                    <span>Livraison express</span>
                    <span className="text-brand-white">{shipping.toFixed(2)} €</span>
                  </div>
                </div>

                <div className="border-t border-brand-white/10 pt-4 flex justify-between text-brand-white">
                  <span className="font-semibold uppercase tracking-widest text-sm">Total TTC</span>
                  <span className="text-xl font-serif">{total.toFixed(2)} €</span>
                </div>

                <button className="w-full bg-brand-white text-brand-black uppercase tracking-widest text-sm font-semibold py-4 hover:bg-brand-lightgray transition-colors">
                  Procéder au paiement
                </button>

                <div className="flex flex-col gap-1.5 text-center">
                  <p className="text-brand-lightgray text-xs tracking-wide">🔒 Paiement sécurisé 256-bit SSL</p>
                  <p className="text-brand-lightgray text-xs tracking-wide">↩ Retours gratuits sous 30 jours</p>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
