"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, LayoutGrid, ArrowRight } from "lucide-react";

const works = [
  {
    title: "UniConnect",
    subtitle: "Private Social Network of the Institute",
    description: [
      "Built a closed social platform for 500+ students with secure authentication.",
      "Developed a full-stack system supporting posts, profiles, and real-time interactions.",
      "Optimized backend APIs reducing response time by ~30%"
    ],
    tech: ["React.js", "Node.js", "MongoDB", "JWT"],
    image: "/uniconnectScreen.png",
    link: "https://github.com/krishnaa-awasthi/UniConnect",
  },
  {
    title: "Padh.AI",
    subtitle: "Document-Based AI Chatbot",
    description: [
      "Document-based chatbot enabling users to interact with PDFs via NLP.",
      "Improved answer relevance by ~40% using context-aware retrieval."
    ],
    tech: ["Python", "NLP", "React", "Vector Search"],
    image: "/padhAI1.png",
    link: "https://github.com/krishnaa-awasthi/Padh.AI",
  },
  {
    title: "MQL Experts",
    subtitle: "Freelance Client Website",
    description: [
      "Production-grade full-stack website handling complete lifecycle.",
      "Deployed on AWS EC2 with Nginx, configured domain, SSL, and reverse proxy."
    ],
    tech: ["React.js", "Node.js", "AWS EC2", "Nginx"],
    image: "/mqlLanding.jpg",
    link: "https://mqlexperts.com",
    // ADDED THIS: Tells the UI to render the secondary "View All" button
    archiveLink: "/projects", 
    archiveText: "View All Freelance Work"
  },
];

export default function FeaturedWorks() {
  return (
    // FIX: Scaled down py-32 to py-16 on mobile
    <section className="relative py-16 md:py-32 px-4 md:px-8 text-white bg-[#0A0A0A] overflow-hidden">
      {/* Background Subtle Mesh */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* FIX: Scaled down the blur sizes on mobile */}
        <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[50%] h-[300px] md:h-[50%] bg-orange-500/10 blur-[80px] md:blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[50%] h-[300px] md:h-[50%] bg-purple-500/10 blur-[80px] md:blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 md:mb-6 text-xs md:text-sm font-medium text-zinc-300">
            <LayoutGrid className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-400" /> Case Studies
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter">
            Selected <span className="text-zinc-500">Works</span>
          </h2>
        </div>
        
        <p className="text-zinc-400 max-w-sm text-sm md:text-base leading-relaxed">
          A showcase of my recent full-stack projects, focusing on scalable architecture, AI integrations, and real-world deployment.
        </p>
      </div>

      {/* BENTO GRID */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {works.map((work, index) => {
          const isFeatured = index === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} // FIX: Reduced trigger margin for mobile
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative flex flex-col rounded-3xl bg-zinc-900/40 border border-white/10 overflow-hidden hover:bg-zinc-900/60 transition-colors ${
                isFeatured ? "md:col-span-12 md:flex-row" : "md:col-span-6"
              }`}
            >
              {/* Content Side */}
              <div className={`flex flex-col justify-between p-6 md:p-10 ${isFeatured ? "md:w-1/2" : "w-full"}`}>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {work.title}
                  </h3>
                  <p className="text-orange-400 text-xs md:text-sm font-medium tracking-wide uppercase mb-6">
                    {work.subtitle}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {work.description.map((point, i) => (
                      <li key={i} className="flex items-start text-zinc-400 text-xs md:text-sm leading-relaxed">
                        <span className="mr-3 text-zinc-600 mt-0.5">✦</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6 mt-auto">
                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-2">
                    {work.tech.map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 md:px-3 md:py-1.5 text-[11px] md:text-xs font-medium text-zinc-300 bg-black/50 border border-white/5 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Action Links - FIX: Added flex-wrap to handle the new button gracefully on small screens */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2 text-sm font-medium text-white hover:text-orange-400 transition-colors"
                    >
                      {work.link.includes("github") ? (
                        <Github className="w-4 h-4" />
                      ) : (
                        <span className="w-4 h-4 flex items-center justify-center border border-current rounded-full text-[10px]">
                          W
                        </span>
                      )}
                      Explore Project
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                    </a>

                    {/* DYNAMIC SECONDARY BUTTON */}
                    {work.archiveLink && (
                      <a
                        href={work.archiveLink}
                        className="group/archive inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors pl-0 sm:pl-4 sm:border-l border-white/10"
                      >
                        {work.archiveText}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/archive:translate-x-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Side */}
              <div className={`relative overflow-hidden bg-black/50 ${isFeatured ? "md:w-1/2 min-h-[250px] md:min-h-[300px]" : "h-[200px] md:h-[300px] border-t border-white/5"}`}>
                <div className="absolute inset-0 border-[4px] border-[#0A0A0A]/20 rounded-t-[3rem] z-10 hidden md:block" />
                
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  src={work.image}
                  alt={work.title}
                  className={`absolute w-full h-full object-cover transition-opacity duration-500 opacity-80 group-hover:opacity-100 ${
                    isFeatured ? "object-left-top px-6 pt-6 md:pl-8 md:pt-8 rounded-t-2xl md:rounded-t-none md:rounded-tl-[2rem]" : "object-top px-6 pt-6 md:px-8 md:pt-8 rounded-t-2xl md:rounded-t-[2rem]"
                  }`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Primary Archive CTA */}
      <div className="relative z-10 flex justify-center mt-12 md:mt-16">
        <a
          href="/projects"
          className="group relative inline-flex h-12 md:h-14 items-center justify-center overflow-hidden rounded-full bg-zinc-100 px-6 md:px-8 font-medium text-black transition-all hover:scale-105 active:scale-95 text-sm md:text-base"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="relative flex items-center gap-2 group-hover:text-white">
            View Project Archive <ArrowUpRight className="w-4 h-4" />
          </span>
        </a>
      </div>
    </section>
  );
}