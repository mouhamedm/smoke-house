"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [isScrolled, setIsScrolled] = useState(false);
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
    handleScroll(); // Initialize state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={navbarRef}
      className={clsx(
        "fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl h-16 rounded-full z-50 flex items-center px-6 md:px-10 transition-colors duration-300",
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
        <nav className="hidden lg:flex w-1/2 justify-center gap-10 pr-12">
          {navLinks.slice(0, 2).map((link) => (
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
        <nav className="hidden lg:flex w-1/2 justify-center items-center gap-10 pl-12">
          {navLinks.slice(2, 4).map((link) => (
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
            className="text-brand-white z-50 relative"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-brand-black z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full",
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
    </header>
  );
}
