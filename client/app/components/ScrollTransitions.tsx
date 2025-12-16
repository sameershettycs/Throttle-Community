"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll Progress Indicator
export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const bikeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    const bike = bikeRef.current;

    if (!progress || !bike) return;

    gsap.to(progress, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    // Bike indicator follows scroll
    gsap.to(bike, {
      left: "calc(100% - 30px)",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    // Rotate bike wheels on scroll
    gsap.to(".scroll-wheel", {
      rotation: 360 * 5,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1.5 bg-charcoal/80 backdrop-blur-sm">
      {/* Progress Bar */}
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-ember via-orange-400 to-amber-500 origin-left"
        style={{ transform: "scaleX(0)" }}
      />
      {/* Mini Bike Indicator */}
      <div
        ref={bikeRef}
        className="absolute top-1/2 -translate-y-1/2 left-0"
        style={{ transform: "translateY(-50%)" }}
      >
        <svg width="30" height="16" viewBox="0 0 30 16" className="drop-shadow-lg">
          {/* Body */}
          <path
            d="M8,10 L22,8 L20,10 L12,12 Z"
            fill="#0d0d0d"
            stroke="#ff4500"
            strokeWidth="0.5"
          />
          {/* Tank */}
          <ellipse cx="14" cy="7" rx="3" ry="2" fill="#ff4500" />
          {/* Seat */}
          <rect x="17" y="6" width="4" height="2" rx="1" fill="#1a1a1a" />
          {/* Handlebar */}
          <line x1="10" y1="5" x2="10" y2="9" stroke="#666" strokeWidth="1" />
          {/* Front Wheel */}
          <g className="scroll-wheel" style={{ transformOrigin: "6px 12px" }}>
            <circle cx="6" cy="12" r="3.5" fill="none" stroke="#333" strokeWidth="1.5" />
            <circle cx="6" cy="12" r="2" fill="none" stroke="#ff4500" strokeWidth="0.5" />
            {/* Spokes */}
            <line x1="6" y1="9" x2="6" y2="15" stroke="#888" strokeWidth="0.3" />
            <line x1="3" y1="12" x2="9" y2="12" stroke="#888" strokeWidth="0.3" />
          </g>
          {/* Rear Wheel */}
          <g className="scroll-wheel" style={{ transformOrigin: "24px 12px" }}>
            <circle cx="24" cy="12" r="3.5" fill="none" stroke="#333" strokeWidth="1.5" />
            <circle cx="24" cy="12" r="2" fill="none" stroke="#ff4500" strokeWidth="0.5" />
            {/* Spokes */}
            <line x1="24" y1="9" x2="24" y2="15" stroke="#888" strokeWidth="0.3" />
            <line x1="21" y1="12" x2="27" y2="12" stroke="#888" strokeWidth="0.3" />
          </g>
          {/* Exhaust flame */}
          <path d="M26,11 Q28,10 29,11 Q28,12 26,11" fill="#ff4500" opacity="0.8">
            <animate
              attributeName="d"
              values="M26,11 Q28,10 29,11 Q28,12 26,11;M26,11 Q29,9 30,11 Q29,13 26,11;M26,11 Q28,10 29,11 Q28,12 26,11"
              dur="0.3s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    </div>
  );
}

// Reveal on Scroll Animation Component
export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const directionMap = {
      up: { y: 80, x: 0 },
      down: { y: -80, x: 0 },
      left: { y: 0, x: 80 },
      right: { y: 0, x: -80 },
    };

    const { x, y } = directionMap[direction];

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y,
        x,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [direction, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

// Parallax Section Component
export function ParallaxSection({
  children,
  speed = 0.5,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    gsap.to(content, {
      yPercent: -30 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return (
    <div ref={sectionRef} className={`overflow-hidden ${className}`}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

// Text Scramble Effect on Scroll
export function ScrambleText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    let iteration = 0;
    let interval: NodeJS.Timeout;

    const scramble = () => {
      iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        if (!element) return;

        element.innerText = text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };

    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: scramble,
      onEnterBack: scramble,
    });

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [text, chars]);

  return (
    <span ref={textRef} className={className}>
      {text}
    </span>
  );
}

// Magnetic Button Effect
export function MagneticElement({
  children,
  className = "",
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

// Horizontal Scroll Section
export function HorizontalScrollSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContent = scrollRef.current;

    if (!container || !scrollContent) return;

    const scrollWidth = scrollContent.scrollWidth - container.offsetWidth;

    gsap.to(scrollContent, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={scrollRef} className="flex">
        {children}
      </div>
    </div>
  );
}

// Section Divider with Bike Animation
export function BikeDivider() {
  const dividerRef = useRef<HTMLDivElement>(null);
  const bikeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const divider = dividerRef.current;
    const bike = bikeRef.current;

    if (!divider || !bike) return;

    gsap.fromTo(
      bike,
      { x: "-100%" },
      {
        x: "100vw",
        ease: "none",
        scrollTrigger: {
          trigger: divider,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={dividerRef} className="relative h-20 overflow-hidden">
      {/* Track Line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-ember to-transparent" />

      {/* Animated Bike */}
      <div
        ref={bikeRef}
        className="absolute top-1/2 -translate-y-1/2"
        style={{ transform: "translateY(-50%) translateX(-100%)" }}
      >
        <svg width="60" height="30" viewBox="0 0 60 30" className="drop-shadow-[0_0_10px_rgba(255,69,0,0.5)]">
          {/* Body */}
          <path
            d="M15,18 L45,14 L42,18 L24,22 Z"
            fill="#0d0d0d"
            stroke="#ff4500"
            strokeWidth="1"
          />
          {/* Tank */}
          <ellipse cx="28" cy="12" rx="6" ry="4" fill="#ff4500" />
          {/* Rider silhouette */}
          <ellipse cx="32" cy="8" rx="3" ry="3" fill="#1a1a1a" />
          <path d="M28,11 L32,8 L36,12" fill="none" stroke="#1a1a1a" strokeWidth="2" />
          {/* Front Wheel */}
          <g className="scroll-wheel" style={{ transformOrigin: "12px 22px" }}>
            <circle cx="12" cy="22" r="7" fill="none" stroke="#333" strokeWidth="2" />
            <circle cx="12" cy="22" r="4" fill="none" stroke="#ff4500" strokeWidth="1" />
          </g>
          {/* Rear Wheel */}
          <g className="scroll-wheel" style={{ transformOrigin: "48px 22px" }}>
            <circle cx="48" cy="22" r="7" fill="none" stroke="#333" strokeWidth="2" />
            <circle cx="48" cy="22" r="4" fill="none" stroke="#ff4500" strokeWidth="1" />
          </g>
          {/* Exhaust */}
          <path d="M52,20 Q58,18 60,20 Q58,22 52,20" fill="#ff4500" opacity="0.8">
            <animate
              attributeName="d"
              values="M52,20 Q58,18 60,20 Q58,22 52,20;M52,20 Q60,16 65,20 Q60,24 52,20;M52,20 Q58,18 60,20 Q58,22 52,20"
              dur="0.2s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      {/* Tire tracks */}
      <div className="absolute top-1/2 left-0 right-0 h-px">
        <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(255,69,0,0.2)_10px,rgba(255,69,0,0.2)_20px)]" />
      </div>
    </div>
  );
}
