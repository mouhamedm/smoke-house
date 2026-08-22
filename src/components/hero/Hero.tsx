"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hookahRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial cinematic entrance
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Hookah entrance: from below, scaled down, slightly rotated
    tl.fromTo(
      hookahRef.current,
      { y: "100vh", opacity: 0, scale: 0.8, rotation: -10 },
      { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 2.5, ease: "power3.out" }
    );

    // Text entrance
    tl.fromTo(
      textRef.current?.children || [],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.2 },
      "-=1.5"
    );

    // Parallax effect on mouse move to simulate 3D depth
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yPos = (clientY / innerHeight - 0.5) * 2; // -1 to 1

      // Move layers at different speeds
      gsap.to(bgRef.current, { x: xPos * -15, y: yPos * -15, duration: 1 });
      gsap.to(smokeRef.current, { x: xPos * 25, y: yPos * 25, duration: 2 });
      gsap.to(hookahRef.current, { x: xPos * 40, y: yPos * 20, rotationY: xPos * 10, rotationX: yPos * -5, duration: 1.5 });
      gsap.to(textRef.current, { x: xPos * -20, y: yPos * -10, duration: 1 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-brand-black flex items-center justify-center perspective-[1000px]"
    >
      {/* Background Layer */}
      <div 
        ref={bgRef}
        className="absolute inset-[-5%] w-[110%] h-[110%] bg-gradient-to-b from-brand-black via-brand-charcoal to-brand-black opacity-80"
      >
        {/* Subtle glowing orb behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red rounded-full blur-[150px] opacity-10" />
      </div>

      {/* Smoke/Atmosphere Layer */}
      <div 
        ref={smokeRef}
        className="absolute inset-0 opacity-40 pointer-events-none mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)"
        }}
      />

      {/* Text Layer (Foreground) */}
      <div 
        ref={textRef}
        className="absolute z-20 flex flex-col items-center text-center px-4 w-full"
      >
        <span className="text-brand-lightgray uppercase tracking-[0.3em] text-xs mb-6 font-semibold">
          L'art de fumer autrement
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-brand-white leading-tight mb-10 drop-shadow-2xl">
          L'EXPÉRIENCE <br />
          <span className="italic font-light">SMOKING HOUSE</span>
        </h1>
        <Link 
          href="/shop"
          className="group relative px-8 py-4 bg-transparent border border-brand-white/30 text-brand-white text-sm uppercase tracking-widest overflow-hidden transition-colors hover:border-brand-white"
        >
          <span className="relative z-10">Découvrir la collection</span>
          <div className="absolute inset-0 bg-brand-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          <span className="absolute inset-0 z-20 flex items-center justify-center text-brand-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
            Découvrir la collection
          </span>
        </Link>
      </div>

      {/* Hookah 3D-like Layer (Center) */}
      <div 
        ref={hookahRef}
        className="relative z-10 w-[80vw] max-w-[600px] h-[70vh] md:h-[80vh] pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src="/images/hero/hero-hookah.png"
          alt="Premium Smoking House Hookah"
          fill
          priority
          className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        />
      </div>

    </section>
  );
}
