"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Mail, Phone, Clock, AtSign } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current?.children || [],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(
      infoRef.current?.children || [],
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, stagger: 0.12, duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: infoRef.current, start: "top 80%" },
      }
    );

    gsap.fromTo(
      formRef.current,
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 80%" },
      }
    );
  }, []);

  const infoItems = [
    { icon: Mail, label: "Email", value: "contact@smokinghouse.fr" },
    { icon: Phone, label: "Téléphone", value: "+33 1 23 45 67 89" },
    { icon: MapPin, label: "Showroom (sur RDV)", value: "75008 Paris, France" },
    { icon: Clock, label: "Horaires", value: "Lun–Ven · 10h00 – 19h00" },
    { icon: AtSign, label: "Instagram", value: "@smokinghouse.fr" },
  ];

  return (
    <div className="min-h-screen bg-brand-black">

      {/* Hero */}
      <div
        ref={heroRef}
        className="relative h-[50vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden border-b border-brand-white/10"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-100 h-50 bg-brand-red/8 rounded-full blur-[80px]" />
        </div>
        <span className="relative text-brand-lightgray uppercase tracking-[0.4em] text-xs font-semibold mb-4">
          Restons en contact
        </span>
        <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-serif text-brand-white">
          Contact
        </h1>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 py-24 flex flex-col lg:flex-row gap-16 lg:gap-24">

        {/* Info */}
        <div ref={infoRef} className="w-full lg:w-2/5 flex flex-col gap-8">

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-serif text-brand-white">Notre équipe vous répond</h2>
            <p className="text-brand-lightgray leading-relaxed">
              Pour toute demande concernant nos produits, une commande ou des partenariats B2B, n'hésitez pas à nous écrire.
            </p>
          </div>

          <div className="w-full h-px bg-brand-white/10" />

          {infoItems.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4 group">
              <div className="w-10 h-10 flex items-center justify-center border border-brand-white/20 shrink-0 group-hover:border-brand-white/50 transition-colors">
                <Icon className="w-4 h-4 text-brand-lightgray group-hover:text-brand-white transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-brand-lightgray text-xs uppercase tracking-widest">{label}</span>
                <span className="text-brand-white font-medium">{value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form
          ref={formRef}
          className="w-full lg:w-3/5 flex flex-col gap-8 bg-brand-charcoal/40 border border-brand-white/10 p-8 md:p-12"
          onSubmit={(e) => e.preventDefault()}
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <label htmlFor="firstName" className="text-xs uppercase tracking-widest text-brand-lightgray">
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Jean"
                className="bg-transparent border-b border-brand-white/20 pb-3 text-brand-white placeholder:text-brand-white/20 focus:outline-none focus:border-brand-white transition-colors"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="lastName" className="text-xs uppercase tracking-widest text-brand-lightgray">
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Dupont"
                className="bg-transparent border-b border-brand-white/20 pb-3 text-brand-white placeholder:text-brand-white/20 focus:outline-none focus:border-brand-white transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-xs uppercase tracking-widest text-brand-lightgray">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="jean.dupont@email.fr"
              className="bg-transparent border-b border-brand-white/20 pb-3 text-brand-white placeholder:text-brand-white/20 focus:outline-none focus:border-brand-white transition-colors"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="subject" className="text-xs uppercase tracking-widest text-brand-lightgray">
              Sujet
            </label>
            <select
              id="subject"
              className="bg-brand-charcoal border-b border-brand-white/20 pb-3 text-brand-white focus:outline-none focus:border-brand-white transition-colors appearance-none"
            >
              <option className="bg-brand-charcoal">Information Produit</option>
              <option className="bg-brand-charcoal">Service Après-Vente</option>
              <option className="bg-brand-charcoal">Partenariat B2B</option>
              <option className="bg-brand-charcoal">Autre</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="message" className="text-xs uppercase tracking-widest text-brand-lightgray">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Votre message..."
              className="bg-transparent border-b border-brand-white/20 pb-3 text-brand-white placeholder:text-brand-white/20 focus:outline-none focus:border-brand-white transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="self-start px-12 py-4 bg-brand-white text-brand-black uppercase tracking-widest text-sm font-semibold hover:bg-brand-lightgray transition-colors mt-4"
          >
            Envoyer le message
          </button>

        </form>
      </div>
    </div>
  );
}
