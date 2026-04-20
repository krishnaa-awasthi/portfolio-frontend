"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Award, ExternalLink, ShieldCheck } from "lucide-react";

// The Complete Array of 10 Certificates
const ALL_CERTIFICATES = [
    {
    id: "cert-5",
    title: "What Is Generative AI?",
    issuer: "LinkedIn Learning",
    imageUrl: "/genAi.png",
    link: "#",
  },
    {
    id: "cert-1",
    title: "Python (Basic) Certification",
    issuer: "HackerRank",
    imageUrl: "/pythonBasic.png",
    link: "#",
  },
  {
    id: "cert-2",
    title: "Data Analytics Job Simulation",
    issuer: "Accenture",
    imageUrl: "/accenture.png",
    link: "#",
  },
  {
    id: "cert-3",
    title: "Data Visualisation Simulation",
    issuer: "Tata",
    imageUrl: "/tata.png",
    link: "#",
  },
  {
    id: "cert-4",
    title: "Python for Data Science",
    issuer: "Infosys Springboard",
    imageUrl: "/datascience.png",
    link: "#",
  },
  
  {
    id: "cert-6",
    title: "Programming in Python - Part 2",
    issuer: "Infosys Springboard",
    imageUrl: "/infopython2.png",
    link: "#",
  },
  {
    id: "cert-7",
    title: "Programming in Python - Part 1",
    issuer: "Infosys Springboard",
    imageUrl: "/infopython1.png",
    link: "#",
  },
  {
    id: "cert-8",
    title: "Twitter Bootstrap",
    issuer: "Infosys Springboard",
    imageUrl: "/bootstrap.png",
    link: "#",
  },
  {
    id: "cert-9",
    title: "CSS3",
    issuer: "Infosys Springboard",
    imageUrl: "/css3.png",
    link: "#",
  },
  {
    id: "cert-10",
    title: "HTML5 - The Language",
    issuer: "Infosys Springboard",
    imageUrl: "/html5.png",
    link: "#",
  },
];

export default function CertificatesPage() {
  return (
    <main className="relative min-h-[100dvh] bg-[#0A0A0A] text-white overflow-x-hidden w-full pt-24 pb-32">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex flex-col items-start mb-16">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 flex items-center gap-4">
            <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-orange-500" />
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500">Certificates</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            A comprehensive archive of my continuous learning journey. From proctored HackerRank assessments to corporate job simulations and core software engineering courses.
          </p>
        </div>

        {/* Certificates Grid */}
        {/* Uses a responsive grid: 1 column on mobile, 2 on tablets, 3 on desktops */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_CERTIFICATES.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="group flex flex-col rounded-2xl bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-orange-500/30 transition-colors shadow-xl overflow-hidden p-3"
            >
              
              {/* Image Container (A4 Ratio) */}
              <div className="relative w-full aspect-[1.414/1] rounded-xl overflow-hidden bg-[#111] mb-5 border border-white/5">
                <Image
                  src={cert.imageUrl}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500"
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none rounded-xl" />
              </div>

              {/* Text Metadata */}
              <div className="px-3 pb-3 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span className="text-xs font-medium text-orange-400 uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-white leading-snug mb-6">
                  {cert.title}
                </h3>

                {/* Bottom CTA */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm text-zinc-500 flex items-center gap-1.5">
                    <Award className="w-4 h-4" /> Verified
                  </span>
                  
                  <a 
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-orange-400 transition-colors"
                  >
                    View Credential <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}