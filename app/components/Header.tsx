"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { FaMotorcycle, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Questions", href: "/questions" },
  { name: "Ask", href: "/#ask" },
  { name: "Community", href: "/#community" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Entrance animation
    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      }
    );

    // Animate nav links with stagger
    gsap.fromTo(
      ".nav-link",
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5,
      }
    );
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 opacity-0"
    >
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-ember to-orange-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <FaMotorcycle className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-white tracking-wide">
                THROTTLE
              </h1>
              <p className="text-xs text-silver/70 tracking-widest uppercase">
                Community
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link font-medium tracking-wide transition-colors duration-300 relative group ${
                  pathname === link.href
                    ? "text-white"
                    : "text-silver/80 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-ember to-orange-500 transition-all duration-300 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/#ask"
              className="px-6 py-2.5 bg-gradient-to-r from-ember to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-ember/30 transform hover:scale-105 transition-all duration-300"
            >
              Ask Question
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 backdrop-blur-xl bg-black/90 border border-white/10 rounded-2xl p-6 animate-slideDown">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium text-lg py-2 border-b border-white/5 transition-colors ${
                    pathname === link.href
                      ? "text-ember"
                      : "text-silver/80 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/#ask"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 px-6 py-3 bg-gradient-to-r from-ember to-orange-600 text-white font-semibold rounded-xl text-center hover:shadow-lg hover:shadow-ember/30 transition-all duration-300"
              >
                Ask Question
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
