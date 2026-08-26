"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import clsx from "clsx";
import { products } from "@/data/products";

const navLinks = [
  { name: "À propos", href: "/about" },
  { name: "Boutique", href: "/shop" },
  { name: "Guide", href: "/shop" },
  { name: "Collections", href: "/collections" },
  { name: "Contact", href: "/contact" },
  { name: "Fidélité", href: "/contact" },
];

export function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!navbarRef.current) return;

      // Scroll Down -> Hide
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        gsap.to(navbarRef.current, {
          y: "-200%",
          duration: 0.4,
          ease: "power3.out",
        });
      }
      // Scroll Up -> Show
      else if (currentScrollY < lastScrollY.current) {
        gsap.to(navbarRef.current, {
          y: "0%",
          duration: 0.4,
          ease: "power3.out",
        });
      }

      setIsScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchQuery("");
    }
  }, [isSearchOpen]);

  // Close search on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Close search on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const searchResults = searchQuery.trim().length > 0
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <>
      <header
        ref={navbarRef}
        className={clsx(
          "fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl h-16 rounded-full z-50 flex items-center px-6 md:px-10 transition-colors duration-300",
          isScrolled || pathname !== "/"
            ? "bg-brand-black shadow-2xl"
            : "bg-transparent",
        )}
      >
        {/* Absolute Centered Logo (Overflowing) */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 transition-transform hover:scale-105"
        >
          <Image
            src="/images/smoke-house-logo-v2.png"
            alt="Smoke House"
            width={90}
            height={90}
            className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] object-cover rounded-full shadow-xl bg-brand-black"
            priority
          />
        </Link>

        <div className="w-full flex items-center justify-between">
          {/* Left Links (Desktop) */}
          <nav className="hidden lg:flex w-1/2 justify-center items-center gap-12 pr-36">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-brand-lightgray hover:text-brand-white transition-colors"
              aria-label="Rechercher"
            >
              <Search className="w-4 h-4" />
            </button>
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-xs uppercase tracking-[0.2em] font-medium hover:text-brand-white transition-colors relative group",
                  pathname === link.href
                    ? "text-brand-white"
                    : "text-brand-lightgray",
                )}
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Links & Icons (Desktop) */}
          <nav className="hidden lg:flex w-1/2 justify-center items-center gap-12 pl-36">
            {navLinks.slice(3, 6).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-xs uppercase tracking-[0.2em] font-medium hover:text-brand-white transition-colors relative group",
                  pathname === link.href
                    ? "text-brand-white"
                    : "text-brand-lightgray",
                )}
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/cart"
              className="text-brand-lightgray hover:text-brand-white transition-colors relative group"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden w-full flex justify-between items-center">
            <Link
              href="/cart"
              className="text-brand-lightgray hover:text-brand-white transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-white z-[70] relative"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-brand-black z-[60] flex flex-col items-center justify-center gap-8 lg:hidden transition-all duration-500 ease-in-out",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-full",
        )}
      >
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

      {/* Search Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-[80] transition-all duration-400 ease-in-out",
          isSearchOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-brand-black/90 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        />

        {/* Search Panel */}
        <div
          className={clsx(
            "relative z-10 max-w-2xl mx-auto mt-32 px-6 transition-all duration-400",
            isSearchOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0",
          )}
        >
          {/* Input */}
          <div className="flex items-center border-b border-brand-white/40 pb-4 gap-4">
            <Search className="w-5 h-5 text-brand-lightgray flex-shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit…"
              className="flex-1 bg-transparent text-brand-white text-xl outline-none placeholder-brand-lightgray/50"
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-brand-lightgray hover:text-brand-white transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          {searchQuery.trim().length > 0 && (
            <div className="mt-6 flex flex-col gap-2">
              {searchResults.length === 0 ? (
                <p className="text-brand-lightgray text-sm">Aucun résultat pour « {searchQuery} »</p>
              ) : (
                searchResults.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center gap-4 p-3 hover:bg-brand-white/5 transition-colors rounded-sm group"
                  >
                    <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden bg-brand-charcoal">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-brand-white text-sm font-medium group-hover:text-brand-lightgray transition-colors truncate">
                        {p.name}
                      </p>
                      <p className="text-brand-lightgray text-xs uppercase tracking-widest">
                        {p.category}
                      </p>
                    </div>
                    <span className="text-brand-white text-sm font-medium flex-shrink-0">
                      {p.price.toFixed(2)} €
                    </span>
                  </Link>
                ))
              )}
            </div>
          )}

          {/* Hint */}
          {searchQuery.trim().length === 0 && (
            <p className="mt-6 text-brand-lightgray/50 text-xs uppercase tracking-widest">
              Tapez pour rechercher parmi {products.length} produits
            </p>
          )}
        </div>
      </div>
    </>
  );
}
