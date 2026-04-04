"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: "Work", href: "/#featuredworks" },
    { name: "Thoughts", href: "/#thoughts" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[#0A0A0A] py-8 md:py-10 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Desktop: 3 equal columns for perfect centering. Mobile: Stacked column */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          
          {/* LEFT: Made with love and coffee */}
          <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 md:w-1/3 justify-center md:justify-start">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span>and lots of caffeine.</span>
          </div>

          {/* CENTER: Navigation Links */}
          <div className="flex items-center gap-6 md:gap-8 text-sm font-medium text-zinc-300 md:w-1/3 justify-center">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="hover:text-orange-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT: Copyright */}
          <div className="text-sm font-medium text-zinc-500 md:w-1/3 flex justify-center md:justify-end">
            © {currentYear} Krishna Awasthi. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
}