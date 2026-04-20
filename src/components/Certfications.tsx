"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { 
  HoverSlider, 
  HoverSliderImage, 
  HoverSliderImageWrap, 
  TextStaggerHover 
} from "./ui/animated-slideshow";

const CERTIFICATES = [
  { id: "cert-1", title: "Python (Basic) Certification", issuer: "HackerRank", imageUrl: "/pythonBasic.png" },
  { id: "cert-2", title: "Data Analytics Simulation", issuer: "Accenture", imageUrl: "/accenture.png" },
  { id: "cert-3", title: "Data Visualisation", issuer: "Tata", imageUrl: "/tata.png" },
  { id: "cert-4", title: "Python for Data Science", issuer: "Infosys", imageUrl: "/datascience.png" },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 md:py-32 bg-[#0A0A0A] overflow-hidden border-t border-white/5">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <HoverSlider className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 flex items-center gap-4">
              <Award className="w-10 h-10 text-orange-500" />
              Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500">Credentials</span>
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Hover over the titles to preview my top industry-recognized certifications.
            </p>
          </div>

          <Link 
            href="/certificates" 
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all text-sm font-medium text-white shrink-0 w-fit"
          >
            Explore All 
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-orange-400" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Text List */}
          <div className="flex flex-col space-y-4 md:space-y-6">
            {CERTIFICATES.map((cert, index) => (
              <div key={cert.id} className="flex flex-col border-b border-white/5 pb-4 last:border-0">
                <TextStaggerHover
                  index={index}
                  className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white"
                  text={cert.title}
                />
                <span className="text-zinc-500 text-sm font-medium mt-2 tracking-wide flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
                  {cert.issuer}
                </span>
              </div>
            ))}
          </div>

          {/* RIGHT: Image Reveal Gallery */}
          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-orange-500/20 to-purple-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* The Wrap component acts as a grid stacker */}
            <HoverSliderImageWrap className="relative w-full aspect-[1.414/1] rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl p-2 md:p-4">
              {CERTIFICATES.map((cert, index) => (
                <HoverSliderImage
                  key={cert.id}
                  index={index}
                  imageUrl={cert.imageUrl}
                  alt={cert.title}
                  className="w-full h-full"
                />
              ))}
              
              {/* Subtle vignette overlay placed inside the stack */}
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none rounded-lg" />
            </HoverSliderImageWrap>
          </div>

        </div>
      </HoverSlider>
    </section>
  );
}