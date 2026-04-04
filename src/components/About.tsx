"use client";

import { motion } from "framer-motion";
import { 
  GraduationCap, 
  MapPin, 
  GitBranch, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Mail, 
  MessageCircle,
  Code2,
  Terminal,
  ArrowUpRight
} from "lucide-react";

/* =========================
   Custom Icons
========================= */
const LeetCodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-orange-500">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.37 1.37 0 0 0 0 1.892l3.854 4.126 5.406 5.789a1.374 1.374 0 0 0 1.961 0l1.043-1.117a1.374 1.374 0 0 0 0-1.892l-5.116-5.479 5.116-5.479a1.374 1.374 0 0 0 0-1.892L14.444.438A1.374 1.374 0 0 0 13.483 0z" />
  </svg>
);

const CodeforcesIcon = () => (
  <div className="flex gap-[3px] items-end h-[14px]">
    <div className="w-[4px] h-[8px] bg-blue-500 rounded-sm"></div>
    <div className="w-[4px] h-[14px] bg-yellow-400 rounded-sm"></div>
    <div className="w-[4px] h-[11px] bg-red-500 rounded-sm"></div>
  </div>
);

/* =========================
   Data
========================= */
const experience = [
  {
    role: "Full Stack Developer Intern",
    company: "NexusCzar Pvt. Ltd.",
    location: "Remote",
    period: "June 2023 - Present",
    description: "Developing and maintaining scalable web applications using React and Node.js. Focused on performance optimization and responsive UI implementation.",
  },
  {
    role: "Full Stack Developer",
    company: "Freelancer",
    location: "Remote",
    period: "Jan 2025 - Present",
    description: "Designed and developed client-specific websites, automation tools, and customized business solutions with full deployment lifecycles.",
  },
  {
    role: "Team Lead - Campus Social Network",
    company: "PSIT",
    location: "Kanpur, UP",
    period: "Sep 2025 - Oct 2025",
    description: "Led a team of developers to architect and build a secure, high-performance campus social network platform for over 500 users.",
  },
];

const education = [
  {
    degree: "B.Tech in Computer Science",
    institution: "Pranveer Singh Institute of Technology",
    period: "2023 - 2027",
    grade: "7.8 CGPA",
    highlights: ["DSA", "OOPs", "DBMS", "OS", "CN", "Web Dev"],
  },
  {
    degree: "Intermediate (12th Grade)",
    institution: "Gardenia Public School",
    period: "2022 - 2023",
    grade: "77%",
    highlights: ["Science Stream", "CBSE"],
  },
  {
    degree: "High School (10th Grade)",
    institution: "Gardenia Public School",
    period: "2020 - 2021",
    grade: "91%",
    highlights: ["Science Stream", "CBSE"],
  },
];

const skills = [
  "C++", "Python", "JavaScript", "Node.js", "React.js", "FastAPI", 
  "MongoDB", "PostgreSQL", "Redis", "Docker", "AWS", "Linux", "Nginx", "Git"
];

/* =========================
   Components
========================= */

function StatsCard() {
  return (
    <div className="sticky top-24 rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl flex flex-col gap-8">
      
      {/* Profile Header */}
      <div className="flex items-start gap-4">
        <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
          <img
            src="/image4.jpg"
            alt="Krishna Awasthi"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="pt-1">
          <h3 className="font-bold text-xl text-white tracking-tight">Krishna Awasthi</h3>
          <p className="text-sm text-zinc-400 mt-1">Software Engineer</p>
          
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 mt-3 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Available for work
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="flex flex-col gap-3 text-sm text-zinc-300">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-4 h-4 text-zinc-500" />
          <span>PSIT Kanpur</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-zinc-500" />
          <span>Uttar Pradesh, India</span>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      {/* Coding Profiles */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Metrics</h4>
        
        <a href="https://leetcode.com/kr1shxnaa" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3 text-sm">
            <LeetCodeIcon />
            <span className="text-zinc-300 group-hover:text-white transition-colors">LeetCode</span>
          </div>
          <span className="text-xs font-medium text-zinc-400">360+ Solved</span>
        </a>

        <a href="https://github.com/krishnaa-awasthi" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3 text-sm">
            <GitBranch className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            <span className="text-zinc-300 group-hover:text-white transition-colors">GitHub</span>
          </div>
          <span className="text-xs font-medium text-zinc-400">260+ Commits</span>
        </a>

        <a href="https://codeforces.com/profile/krishna-awasthi" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3 text-sm">
            <CodeforcesIcon />
            <span className="text-zinc-300 group-hover:text-white transition-colors">Codeforces</span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
        </a>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-2 pt-2">
        {[
          { icon: Instagram, href: "https://www.instagram.com/krishna_awasthi/" },
          { icon: Facebook, href: "https://www.facebook.com/krishna.awasthi.7" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/krishna-awasthi/" },
          { icon: MessageCircle, href: "whatsapp://send?phone=+918470950837" },
          { icon: Mail, href: "mailto:krishnaawasthi0306@gmail.com" },
        ].map((social, i) => (
          <a
            key={i}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex justify-center py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <social.icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-32 px-4 md:px-8 text-white bg-black min-h-screen">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* CRITICAL FIX: 
        Removed 'items-start'. 
        By default, grid items 'stretch'. Now the right column is as tall as the left column!
      */}
      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1fr_340px] gap-16">
        
        {/* LEFT COLUMN: Main Content (This dictates the height) */}
        <div className="space-y-24 pb-24">
          
          {/* About Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              About <span className="text-zinc-500">Me</span>
            </h2>
            
            <div className="prose prose-invert max-w-none text-zinc-400 text-base md:text-lg leading-relaxed space-y-6">
              <p>
                I’m a Computer Science undergraduate at PSIT Kanpur, focused on building practical, scalable systems rather than just academic projects. My core strength lies in backend engineering, where I design RESTful APIs, manage database architecture, and deploy applications using AWS, Linux, and Nginx.
              </p>
              <p>
                I’ve worked as a Full Stack Developer Intern and built real-world applications including client websites and a secure campus social network. I’m an active competitive programmer with <span className="text-white font-medium">1000+ DSA problems solved</span> across platforms, establishing a strong foundation in complex logic and data structures.
              </p>
              <p>
                Beyond coding, I focus on solving real-world problems using automation, AI-driven systems, and IoT. I believe in execution—figuring things out and getting things done.
              </p>
            </div>

            {/* Skills Pills */}
            <div className="pt-6">
              <div className="flex items-center gap-2 mb-4 text-zinc-100 font-medium">
                <Terminal className="w-4 h-4" /> Technical Arsenal
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium bg-white/5 border border-white/10 rounded-full text-zinc-300 hover:text-white hover:border-white/30 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Code2 className="w-6 h-6 text-orange-400" /> Experience
            </h3>
            
            <div className="space-y-0 border-l border-white/10 ml-3">
              {experience.map((exp, index) => (
                <div key={index} className="relative pl-8 pb-12 group last:pb-0">
                  <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-white/20 group-hover:bg-orange-400 group-hover:scale-150 transition-all duration-300" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
                    <h4 className="text-lg font-semibold text-zinc-100">{exp.role}</h4>
                    <span className="text-sm font-medium text-zinc-500 font-mono">{exp.period}</span>
                  </div>
                  <p className="text-orange-400/80 font-medium text-sm mb-4">
                    {exp.company} <span className="text-zinc-600 px-1">•</span> {exp.location}
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-purple-400" /> Education
            </h3>
            
            <div className="grid gap-4">
              {education.map((edu, index) => (
                <div 
                  key={index} 
                  className="group flex flex-col md:flex-row justify-between p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">{edu.degree}</h4>
                    <p className="text-sm text-zinc-400">{edu.institution}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {edu.highlights.map((h, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-zinc-400">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
                    <span className="text-sm font-mono text-zinc-500">{edu.period}</span>
                    <span className="text-sm font-medium text-zinc-300 bg-white/5 px-2.5 py-1 rounded-lg mt-2">
                      {edu.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN TRACK */}
        <div className="hidden lg:block relative h-full">
          <div className="sticky top-24">
            <StatsCard />
          </div>
        </div>

        {/* Mobile-only Stats Card */}
        <div className="block lg:hidden mt-12">
          <StatsCard />
        </div>

      </div>
    </section>
  );
}