"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronDown, FaUsers, FaQuestionCircle, FaFire, FaMotorcycle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { MagneticElement, ScrambleText } from "./ScrollTransitions";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;
    const image = imageRef.current;

    if (!hero || !content || !overlay || !image) return;

    // Fade out content on scroll
    gsap.to(content, {
      opacity: 0,
      y: -150,
      scale: 0.9,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "center center",
        end: "bottom top",
        scrub: true,
      },
    });

    // Darken overlay on scroll
    gsap.to(overlay, {
      opacity: 0.9,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Parallax image effect on scroll
    gsap.to(image, {
      y: 150,
      scale: 0.9,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Initial animations
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      ".hero-badge",
      { opacity: 0, scale: 0.8, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
    )
      .fromTo(
        ".hero-title-line",
        { opacity: 0, y: 100, rotationX: -80 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        },
        "-=0.4"
      )
      .fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 50, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ".hero-cta",
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .fromTo(
        ".hero-stats",
        { opacity: 0, y: 40, rotationY: -30 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .fromTo(
        ".scroll-indicator",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      );

    // Scroll indicator continuous animation
    gsap.to(".scroll-indicator", {
      y: 15,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "power1.inOut",
    });

    // Floating animation for stats
    gsap.to(".hero-stats", {
      y: -5,
      repeat: -1,
      yoyo: true,
      duration: 2,
      stagger: 0.3,
      ease: "sine.inOut",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const stats = [
    { icon: FaUsers, value: "50K+", label: "Riders" },
    { icon: FaQuestionCircle, value: "120K+", label: "Questions" },
    { icon: FaFire, value: "1M+", label: "Answers" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[800px] overflow-hidden bg-charcoal"
    >
      {/* Background Image with Parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/kaza-brown.avif"
          alt="Motorcycle background"
          fill
          priority
          className="object-cover object-center opacity-50"
          style={{ transform: "scale(0.7)" }}
        />
      </div>

      {/* Gradient Overlays */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-charcoal/80 pointer-events-none"
        style={{ opacity: 0.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 via-transparent to-charcoal/30 pointer-events-none" />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 69, 0, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 69, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <MagneticElement strength={0.2}>
            <div className="hero-badge inline-flex items-center gap-3 px-5 py-2.5 bg-ember/10 border border-ember/40 rounded-full mb-10 backdrop-blur-sm">
              <div className="relative">
                <FaMotorcycle className="text-ember text-lg" />
                <div className="absolute inset-0 animate-ping opacity-50">
                  <FaMotorcycle className="text-ember text-lg" />
                </div>
              </div>
              <span className="text-white/90 text-sm font-semibold tracking-wide">
                Join the #1 Motorcycle Community
              </span>
              <div className="w-2 h-2 rounded-full bg-ember animate-pulse" />
            </div>
          </MagneticElement>

          {/* Main Title with 3D perspective */}
          <div className="perspective-1000">
            <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-8 leading-none tracking-tight">
              <div className="hero-title-line block overflow-hidden">
                <span className="inline-block">THE ULTIMATE</span>
              </div>
              <div className="hero-title-line block overflow-hidden">
                <span className="inline-block bg-gradient-to-r from-ember via-orange-400 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,69,0,0.5)]">
                  <ScrambleText text="BIKER COMMUNITY" className="inline" />
                </span>
              </div>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-silver/70 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Ask questions, share your expertise, and connect with motorcycle
            enthusiasts from around the world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
            <MagneticElement strength={0.15}>
              <Link
                href="#ask"
                className="hero-cta group px-10 py-4 bg-gradient-to-r from-ember to-orange-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-ember/40 transform hover:scale-[1.02] transition-all duration-300 flex items-center gap-3"
              >
                <FaQuestionCircle className="text-xl group-hover:rotate-12 transition-transform" />
                Ask a Question
              </Link>
            </MagneticElement>

            <MagneticElement strength={0.15}>
              <Link
                href="#questions"
                className="hero-cta group px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-lg rounded-xl hover:bg-white/10 hover:border-ember/50 transition-all duration-300 flex items-center gap-3"
              >
                <FaMotorcycle className="text-xl text-ember group-hover:translate-x-1 transition-transform" />
                Browse Questions
              </Link>
            </MagneticElement>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {stats.map(({ icon: Icon, value, label }, index) => (
              <MagneticElement key={label} strength={0.1}>
                <div
                  className="hero-stats group flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-ember/30 transition-colors cursor-pointer"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-ember/20 to-orange-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="text-2xl text-ember" />
                  </div>
                  <div className="text-left">
                    <p className="text-3xl font-bold text-white font-heading tracking-wide">
                      {value}
                    </p>
                    <p className="text-silver/50 text-sm uppercase tracking-widest">
                      {label}
                    </p>
                  </div>
                </div>
              </MagneticElement>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-light">
          Scroll to Explore
        </span>
        <div className="relative">
          <FaChevronDown className="text-ember text-2xl" />
          <FaChevronDown className="text-ember/30 text-2xl absolute top-2 left-0 animate-ping" />
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-20 left-10 w-40 h-40 border border-ember/20 rounded-full opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-60 h-60 border border-ember/10 rounded-full opacity-20" />
      <div className="absolute top-1/3 right-20 w-4 h-4 bg-ember rounded-full opacity-50 animate-bounce" />
      <div className="absolute bottom-1/3 left-20 w-3 h-3 bg-orange-400 rounded-full opacity-40 animate-pulse" />
    </section>
  );
}
