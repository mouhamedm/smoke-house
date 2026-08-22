"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ShoppingBag, Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { name: "À propos", href: "/about" },
  { name: "Boutique", href: "/shop" },
  { name: "Collections", href: "/collections" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (!navbarRef.current) return;

      // Scroll Down -> Hide
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        gsap.to(navbarRef.current, { y: "-100%", duration: 0.4, ease: "power3.out" });
      } 
      // Scroll Up -> Show
      else if (currentScrollY < lastScrollY.current) {
        gsap.to(navbarRef.current, { y: "0%", duration: 0.4, ease: "power3.out" });
      }

      // Add background when scrolled
      if (currentScrollY > 50) {
        navbarRef.current.classList.add("glass");
      } else {
        navbarRef.current.classList.remove("glass");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      ref={navbarRef} 
      className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 py-6"
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Left Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 w-1/3">
          {navLinks.slice(0, 2).map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={clsx(
                "text-sm uppercase tracking-widest font-medium hover:text-brand-white transition-colors relative group",
                pathname === link.href ? "text-brand-white" : "text-brand-lightgray"
              )}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Logo (Center) */}
        <div className="flex-shrink-0 w-1/3 flex justify-center">
          <Link href="/" className="text-2xl md:text-3xl font-serif tracking-widest text-brand-white text-center">
            SMOKING HOUSE
          </Link>
        </div>

        {/* Right Links & Icons (Desktop) */}
        <nav className="hidden lg:flex items-center justify-end gap-8 w-1/3">
          {navLinks.slice(2, 4).map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={clsx(
                "text-sm uppercase tracking-widest font-medium hover:text-brand-white transition-colors relative group",
                pathname === link.href ? "text-brand-white" : "text-brand-lightgray"
              )}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link href="/cart" className="text-brand-lightgray hover:text-brand-white transition-colors relative group">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-6">
          <Link href="/cart" className="text-brand-lightgray hover:text-brand-white transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-brand-white z-50 relative"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={clsx(
        "fixed inset-0 bg-brand-black z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out lg:hidden",
        isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-serif tracking-widest text-brand-white uppercase"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
}
