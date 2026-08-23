"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    
    gsap.fromTo(
      footerRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        }
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="bg-brand-black pt-32 pb-12 border-t border-brand-white/10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Huge Logo Signature */}
        <div className="w-full mb-20 overflow-hidden flex justify-center">
          <h2 className="text-[12vw] md:text-[8vw] leading-none font-serif text-brand-white opacity-10 whitespace-nowrap">
            SMOKE HOUSE
          </h2>
        </div>

        {/* Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl mb-20 text-center md:text-left">
          
          <div className="flex flex-col gap-4">
            <h3 className="text-sm tracking-widest uppercase font-semibold text-brand-white mb-2">Navigation</h3>
            <Link href="/about" className="text-brand-lightgray hover:text-brand-white transition-colors">À propos</Link>
            <Link href="/shop" className="text-brand-lightgray hover:text-brand-white transition-colors">Boutique</Link>
            <Link href="/collections" className="text-brand-lightgray hover:text-brand-white transition-colors">Collections</Link>
            <Link href="/contact" className="text-brand-lightgray hover:text-brand-white transition-colors">Contact</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm tracking-widest uppercase font-semibold text-brand-white mb-2">Réseaux Sociaux</h3>
            <a href="#" className="text-brand-lightgray hover:text-brand-white transition-colors">Instagram</a>
            <a href="#" className="text-brand-lightgray hover:text-brand-white transition-colors">TikTok</a>
            <a href="#" className="text-brand-lightgray hover:text-brand-white transition-colors">Pinterest</a>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm tracking-widest uppercase font-semibold text-brand-white mb-2">Légal</h3>
            <Link href="#" className="text-brand-lightgray hover:text-brand-white transition-colors">Mentions Légales</Link>
            <Link href="#" className="text-brand-lightgray hover:text-brand-white transition-colors">Politique de Confidentialité</Link>
            <Link href="#" className="text-brand-lightgray hover:text-brand-white transition-colors">CGV</Link>
          </div>
          
        </div>

        {/* Copyright */}
        <div className="w-full text-center border-t border-brand-white/10 pt-8">
          <p className="text-brand-lightgray text-sm tracking-widest">
            © {new Date().getFullYear()} SMOKE HOUSE. TOUS DROITS RÉSERVÉS.
          </p>
        </div>
      </div>
    </footer>
  );
}
