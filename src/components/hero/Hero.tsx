"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const TITLE = "SMOKE HOUSE";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const chars = section.querySelectorAll<HTMLElement>(".hero-char");
    const metaItems = metaRef.current?.children ?? [];

    const ctx = gsap.context(() => {
      gsap.set(chars, { opacity: 0 });
      gsap.set(lineRef.current, { scaleX: 0 });
      gsap.set(metaItems, { y: 28, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(
        chars,
        {
          opacity: 1,
          duration: 1.5,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.2
      )
        .to(
          lineRef.current,
          { scaleX: 1, duration: 1, ease: "power3.inOut" },
          "-=1.0"
        )
        .to(
          metaItems,
          { y: 0, opacity: 1, duration: 0.95, stagger: 0.14 },
          "-=0.5"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-brand-black"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src="/videos/hero_video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-24 px-6 pointer-events-none">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] tracking-[0.18em] text-brand-white">
            {TITLE.split("").map((char, i) => (
              <span key={i} className="inline-block align-bottom">
                <span className="hero-char inline-block will-change-transform">
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </h1>

          <div
            ref={lineRef}
            className="mt-6 h-px w-24 origin-center bg-brand-white/70"
          />

          <div ref={metaRef} className="mt-6 flex flex-col items-center gap-4">
            <p className="font-serif text-lg md:text-2xl text-brand-white">
              Design. Fumée. Caractère.
            </p>
            <Link
              href="/shop"
              className="pointer-events-auto text-[10px] uppercase tracking-[0.28em] text-brand-white/85 hover:text-brand-white transition-colors"
            >
              Découvrir la boutique →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
