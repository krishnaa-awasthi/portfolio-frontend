"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowUpRight, Github, Terminal } from "lucide-react";
import ProfileSlider from "./ProfileSlider";
// import FloatingTech from "./FloatingTech";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A] overflow-hidden px-4 md:px-8">
      
      {/* 1. Modern Background: Grid & Soft Mesh Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* FIX: Scaled down glows on mobile to prevent washing out the text */}
      <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      {/* Floating Icons (Uncomment when ready) */}
      {/* <FloatingTech /> */}

      {/* Main Content Container */}
      {/* FIX: Reduced the vertical gap on mobile from gap-12 to gap-8 so the slider isn't pushed too far down */}
      <div className="max-w-7xl w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-20 items-center z-10 pt-24 md:pt-20 pb-12 lg:py-0">
        
        {/* LEFT SIDE: Text & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start"
        >
          {/* Availability Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 md:mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-zinc-300">Available for new opportunities</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.1] text-white mb-4 md:mb-6">
            Hi, I'm Krishna.<br />
            <span className="text-zinc-500 block mt-2 text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
              I build{" "}
              <TypeAnimation
                sequence={[
                  "scalable backends.",
                  2000,
                  "full-stack apps.",
                  2000,
                  "real solutions.",
                  2000,
                  "fast APIs.",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500"
              />
            </span>
          </h1>

          {/* Intro Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mb-8 md:mb-10 font-medium">
            Computer Science undergraduate and Full Stack Developer. I engineer scalable systems, deploy robust APIs, and ship production-grade applications that solve real-world problems.
          </p>

          {/* CTAs */}
          {/* FIX: Scaled buttons from h-14 to h-12 on mobile, and px-8 to px-6 */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 w-full sm:w-auto">
            <a
              href="/projects"
              className="group relative inline-flex h-12 md:h-14 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full bg-zinc-100 px-6 md:px-8 font-medium text-black transition-all hover:scale-105 active:scale-95"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="relative flex items-center gap-2 group-hover:text-white text-sm md:text-base">
                View My Work <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>

            <a
              href="#contact"
              className="inline-flex h-12 md:h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 md:px-8 font-medium text-white transition-colors hover:bg-white/10 hover:border-white/20 text-sm md:text-base"
            >
              Contact Me
            </a>
          </div>

          {/* Quick Stats / Trust Indicators */}
          {/* FIX: Added flex-wrap and scaled down gaps so they don't break on narrow screens */}
          <div className="mt-8 md:mt-12 flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm font-medium text-zinc-500">
            <div className="flex items-center gap-1.5 md:gap-2">
              <Terminal className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-400" />
              350+ DSA Solved
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700" />
            <div className="flex items-center gap-1.5 md:gap-2">
              <Github className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" />
              260+ Commits
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Profile Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full flex justify-center lg:justify-end mt-4 lg:mt-0"
        >
          {/* Decorative ring around the slider */}
          {/* FIX: Scaled down the blur ring for mobile */}
          <div className="absolute inset-0 max-w-[300px] md:max-w-[400px] max-h-[400px] md:max-h-[500px] m-auto bg-gradient-to-tr from-orange-500/20 to-purple-500/20 rounded-3xl blur-xl md:blur-2xl -z-10" />
          
          <div className="relative w-full max-w-[350px] md:max-w-[450px]">
            <ProfileSlider />
          </div>
        </motion.div>

      </div>
    </section>
  );
}