"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaMotorcycle,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaDiscord,
  FaPaperPlane,
} from "react-icons/fa";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  explore: [
    { name: "Home", href: "/" },
    { name: "All Questions", href: "/questions" },
    { name: "Ask Question", href: "/#ask" },
    { name: "Hot Questions", href: "/#questions" },
  ],
  categories: [
    { name: "Maintenance", href: "/questions?category=Maintenance" },
    { name: "Gear & Equipment", href: "/questions?category=Gear" },
    { name: "Routes & Tours", href: "/questions?category=Routes" },
    { name: "Technical Help", href: "/questions?category=Technical" },
  ],
  community: [
    { name: "About Us", href: "/#community" },
    { name: "Guidelines", href: "/#community" },
    { name: "Contact", href: "/#community" },
    { name: "Careers", href: "/#community" },
  ],
};

const socialLinks = [
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaTwitter, href: "#", label: "Twitter" },
  { Icon: FaYoutube, href: "#", label: "YouTube" },
  { Icon: FaDiscord, href: "#", label: "Discord" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Make footer visible after a small delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || !isVisible) return;

    // Kill any existing ScrollTriggers for this element
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === footer) {
        trigger.kill();
      }
    });

    // Create new animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [pathname, isVisible]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer
      ref={footerRef}
      className={`bg-charcoal border-t border-white/5 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      id="community"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-ember to-orange-600 rounded-xl flex items-center justify-center">
                <FaMotorcycle className="text-2xl text-white" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-white tracking-wide">
                  THROTTLE
                </h2>
                <p className="text-xs text-silver/70 tracking-widest uppercase">
                  Community
                </p>
              </div>
            </div>
            <p className="text-silver/70 leading-relaxed mb-6 max-w-sm">
              The ultimate community for motorcycle enthusiasts. Ask questions,
              share experiences, and connect with riders worldwide.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">
                Subscribe to our newsletter
              </h3>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-silver/50 focus:outline-none focus:border-ember/50 focus:ring-1 focus:ring-ember/30 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 bg-gradient-to-r from-ember to-orange-600 text-white rounded-xl hover:shadow-lg hover:shadow-ember/30 transform hover:scale-105 transition-all duration-300"
                >
                  <FaPaperPlane />
                </button>
              </form>
              {isSubscribed && (
                <p className="text-green-400 text-sm mt-2 animate-fadeIn">
                  Thanks for subscribing!
                </p>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-silver/70 hover:text-white hover:bg-ember/20 hover:border-ember/50 transition-all duration-300"
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-silver/70 hover:text-ember transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-silver/70 hover:text-ember transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Community
            </h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-silver/70 hover:text-ember transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-silver/50 text-sm">
            © {new Date().getFullYear()} Throttle Community. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/#community"
              className="text-silver/50 hover:text-silver transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/#community"
              className="text-silver/50 hover:text-silver transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/#community"
              className="text-silver/50 hover:text-silver transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
