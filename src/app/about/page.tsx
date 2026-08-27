"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const section3Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Hero text animation
    gsap.fromTo(
      heroRef.current?.children || [],
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );

    // Sections scroll reveal
    [section1Ref, section2Ref, section3Ref].forEach((ref) => {
      if (!ref.current) return;

      const imageWrapper = ref.current.querySelector(".image-reveal");
      const textWrapper = ref.current.querySelector(".text-reveal");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });

      if (imageWrapper) {
        tl.fromTo(
          imageWrapper,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power3.out" }
        );
      }

      if (textWrapper) {
        tl.fromTo(
          textWrapper.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: "power3.out" },
          "-=1.1",
        );
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-brand-black">

      {/* Hero */}
      <div
        ref={heroRef}
        className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        {/* Background gradient glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-150 h-100 bg-brand-red/10 rounded-full blur-[120px]" />
        </div>
        <span className="relative text-brand-lightgray uppercase tracking-[0.4em] text-xs font-semibold mb-6">
          Notre Histoire
        </span>
        <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-serif text-brand-white mb-8 max-w-4xl leading-tight">
          L'art de fumer,<br />
          <span className="italic font-light">élevé au rang d'excellence.</span>
        </h1>
        <p className="relative text-brand-lightgray text-lg md:text-xl leading-relaxed max-w-2xl">
          Fondée sur la conviction qu'une tradition ancestrale mérite un écrin contemporain, Smoke House redéfinit les standards de l'industrie.
        </p>
        {/* Scroll indicator */}
        <div className="absolute bottom-12 flex flex-col items-center gap-2">
          <span className="text-brand-lightgray text-xs tracking-widest uppercase">Défiler</span>
          <div className="w-px h-12 bg-linear-to-b from-brand-white/50 to-transparent" />
        </div>
      </div>

      {/* Big stat banner */}
      <div className="border-y border-brand-white/10 py-12 bg-brand-charcoal/30">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "2019", label: "Année de fondation" },
            { value: "12+", label: "Modèles exclusifs" },
            { value: "4 000+", label: "Clients premium" },
            { value: "3", label: "Collections signature" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="text-3xl md:text-5xl font-serif text-brand-white">{stat.value}</span>
              <span className="text-brand-lightgray text-sm uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-32">

        {/* Section 1: Notre Vision */}
        <section ref={section1Ref} className="flex flex-col md:flex-row gap-16 md:gap-24 items-center mb-32">
          <div className="w-full md:w-1/2 relative aspect-[3/4] overflow-hidden image-reveal">
            <Image
              src="/images/about/vision.png"
              alt="Notre vision"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-6 text-reveal">
            <span className="text-brand-lightgray text-xs uppercase tracking-[0.3em] font-semibold">01 / 03</span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-white leading-tight">Notre Vision</h2>
            <div className="w-12 h-[1px] bg-brand-white/30" />
            <p className="text-brand-lightgray leading-relaxed text-lg">
              Nous avons observé un marché saturé de produits jetables et d'esthétiques criardes. Smoke House est née de la volonté d'offrir une alternative radicale : des matériaux nobles comme l'aluminium aérospatial, le titane et le verre borosilicate, associés à un design minimaliste et ténébreux.
            </p>
            <p className="text-brand-lightgray leading-relaxed">
              Chaque détail est pensé pour sublimer l'expérience. Du tirage fluide et silencieux à l'équilibre parfait de nos manches de tuyaux, nous ne laissons rien au hasard.
            </p>
          </div>
        </section>

        {/* Section 2: Savoir-faire */}
        <section ref={section2Ref} className="flex flex-col md:flex-row-reverse gap-16 md:gap-24 items-center mb-32">
          <div className="w-full md:w-1/2 relative aspect-[3/4] overflow-hidden image-reveal">
            <Image
              src="/images/about/savoir-faire.png"
              alt="Savoir-faire"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-6 text-reveal">
            <span className="text-brand-lightgray text-xs uppercase tracking-[0.3em] font-semibold">02 / 03</span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-white leading-tight">Savoir-faire<br />& Ingénierie</h2>
            <div className="w-12 h-[1px] bg-brand-white/30" />
            <p className="text-brand-lightgray leading-relaxed text-lg">
              L'esthétique ne fait aucun compromis sur la performance. Nos modèles intègrent des systèmes de purge invisibles brevetés et des chambres de combustion optimisées pour une gestion thermique parfaite.
            </p>
            <p className="text-brand-lightgray leading-relaxed">
              Nous collaborons avec des maîtres verriers et des ingénieurs de précision pour garantir que chaque pièce qui quitte nos ateliers répond à nos standards stricts d'excellence et de durabilité.
            </p>
          </div>
        </section>

        {/* Section 3: Expérience */}
        <section ref={section3Ref} className="flex flex-col md:flex-row gap-16 md:gap-24 items-center mb-32">
          <div className="w-full md:w-1/2 relative aspect-[3/4] overflow-hidden image-reveal">
            <Image
              src="/images/about/experience.png"
              alt="L'expérience"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-6 text-reveal">
            <span className="text-brand-lightgray text-xs uppercase tracking-[0.3em] font-semibold">03 / 03</span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-white leading-tight">Une Expérience<br />Inégalée</h2>
            <div className="w-12 h-[1px] bg-brand-white/30" />
            <p className="text-brand-lightgray leading-relaxed text-lg">
              Au-delà du produit, Smoke House propose une véritable culture. Nos saveurs sont élaborées par des experts en mixologie pour offrir des profils aromatiques complexes et persistants.
            </p>
            <p className="text-brand-lightgray leading-relaxed">
              Chaque session devient un rituel, une pause dans le temps. C'est cette philosophie du soin, du luxe discret et de la précision que nous insufflons dans chacun de nos produits.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col items-center text-center py-24 border-t border-brand-white/10">
          <h2 className="text-3xl md:text-5xl font-serif text-brand-white mb-8">
            Prêt à vivre l'expérience ?
          </h2>
          <Link
            href="/shop"
            className="px-12 py-5 bg-brand-white text-brand-black uppercase tracking-widest text-sm font-semibold hover:bg-brand-lightgray transition-colors"
          >
            Découvrir la boutique
          </Link>
        </div>

      </div>
    </div>
  );
}
