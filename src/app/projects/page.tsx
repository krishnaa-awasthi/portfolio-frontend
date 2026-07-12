"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, ArrowUpRight, Filter } from "lucide-react";
import Link from "next/link";

const allProjects = [
  // --- FREELANCE WORKS ---
  {
    title: "Fast In Cloud",
    type: "Freelance",
    category: "Corporate Site",
    description: "Developed a responsive corporate website for a cloud services company, focusing on lead generation and service showcase.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "https://fastincloud.com",
    isGithub: false
  },
  {
    title: "MQL Experts",
    type: "Freelance",
    category: "Corporate Site",
    description: "Production-grade full-stack website handling complete lifecycle. Deployed on AWS EC2 with Nginx, configured domain, SSL, and reverse proxy.",
    tech: ["React.js", "Node.js", "AWS EC2", "Nginx"],
    link: "https://mqlexperts.com",
    isGithub: false
  },
  {
    title: "Apricoat Insurance",
    type: "Freelance",
    category: "Business Portal",
    description: "Designed and developed a modern, responsive corporate website for an insurance firm focusing on lead generation and client trust.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "https://apricoatinsurance.in",
    isGithub: false
  },
  {
    title: "Zartek Smart Homes",
    type: "Freelance",
    category: "E-Commerce / Showcase",
    description: "Client website showcasing smart home automation products and services with a focus on high-end visual aesthetics.",
    tech: ["React.js", "Tailwind CSS", "Node.js"],
    link: "https://zarteksmarthomes.com",
    isGithub: false
  },
  {
    title: "MQL Data Source",
    type: "Freelance",
    category: "Dashboard",
    description: "A secure, internal data management dashboard built for the MQL Experts team to handle client metrics and data pipelines.",
    tech: ["React.js", "Express", "PostgreSQL", "AWS"],
    link: "https://datasource.mqlexperts.com",
    isGithub: false
  },
  {
    title: "MQL Business",
    type: "Freelance",
    category: "B2B Platform",
    description: "A dedicated B2B portal for enterprise clients to interact with MQL Experts' services and track their business growth.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://business.mqlexperts.com",
    isGithub: false
  },

  // --- PERSONAL PROJECTS ---
  {
    title: "UniConnect",
    type: "Personal",
    category: "Full Stack",
    description: "Closed social platform for 500+ students with secure authentication, supporting posts, profiles, and real-time interactions.",
    tech: ["React.js", "Node.js", "MongoDB", "JWT"],
    link: "https://github.com/krishnaa-awasthi/UniConnect",
    isGithub: true
  },
  {
    title: "Padh.AI",
    type: "Personal",
    category: "AI / ML",
    description: "Document-based chatbot enabling users to interact with PDFs via NLP. Improved answer relevance using context-aware retrieval.",
    tech: ["Python", "NLP", "React", "Vector Search"],
    link: "https://github.com/krishnaa-awasthi/Padh.AI",
    isGithub: true
  },
  {
    title: "Smart School Fees System",
    type: "Personal",
    category: "Management System",
    description: "An automated fee management system designed to track student payments, generate invoices, and manage administrative records.",
    tech: ["Python", "Django", "PostgreSQL"],
    link: "https://github.com/krishnaa-awasthi/smart_school_fees_system", // Update if needed
    isGithub: true
  },
  {
    title: "Code Analyzer & Automation AI",
    type: "Personal",
    category: "Developer Tool",
    description: "An AI-driven automation script builder that reads heavy data and analyzes code architecture to streamline developer workflows.",
    tech: ["Python", "Machine Learning", "NLP"],
    link: "https://github.com/krishnaa-awasthi", // Add specific repo link
    isGithub: true
  }
];

// The filter categories
const filters = ["All", "Freelance", "Personal"];

export default function ProjectsArchive() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter logic
  const filteredProjects = allProjects.filter((project) => 
    activeFilter === "All" ? true : project.type === activeFilter
  );

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white py-16 md:py-32 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors mb-8 group w-fit"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">
            Project <span className="text-zinc-500">Archive</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">
            A comprehensive list of things I've built, ranging from freelance client work to deep technical experiments and university projects.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 md:gap-4 mb-10 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 mr-2 shrink-0">
            <Filter className="w-4 h-4" />
          </div>
          
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-5 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-colors shrink-0 ${
                activeFilter === filter 
                  ? "text-black" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {activeFilter === filter && (
                <motion.div
                  layoutId="activeFilterBubble"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {filter === "All" ? "All Works" : filter + " Projects"}
            </button>
          ))}
        </div>

        {/* Projects Grid (Animated) */}
        {/* Use motion.div layout to animate the grid repositioning */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                key={project.title} // Use title as key so Framer Motion tracks the exact item
                layout // This tells the card to smoothly glide to its new grid spot
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/60 hover:border-white/10 transition-colors h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold tracking-wider text-orange-400 uppercase bg-orange-500/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    {project.isGithub ? (
                      <Github className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State Fallback (just in case) */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            No projects found in this category.
          </div>
        )}

      </div>
    </main>
  );
}