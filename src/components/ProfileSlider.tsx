"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Preserving your exact imports
import image1 from "../assets/audi_image.jpg";
import image2 from "../assets/formal.jpg";
import image3 from "../assets/badgelist.png";
import image4 from "../assets/leetcodegrind.png";
import image5 from "../assets/introductory2.jpg";

const slides = [
  {
    image: image1,
    caption: "Presented Research at ICNGTSE (PSIT Kanpur)",
  },
  {
    image: image3,
    caption: "LeetCode Achievements & Global Rankings",
  },
  {
    image: image4,
    caption: "Solved 350+ DSA Problems (Consistency: 150+ Days)",
  },
];

export default function ProfileSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000); // Slightly increased to 4s for comfortable reading

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group w-full max-w-[360px] mx-auto">

      {/* 1. Ambient Background Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-500/30 to-purple-600/30 rounded-[2.5rem] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      {/* 2. Glassmorphic Outer Container */}
      <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-3 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)]">

        {/* 3. Image & Content Mask */}
        <div className="relative w-full aspect-[4/5] rounded-[1.8rem] overflow-hidden bg-black/40 border border-white/5">
          
          {/* Slider Indicators (Top Right) */}
          <div className="absolute top-4 right-4 flex gap-1.5 z-20">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 backdrop-blur-md ${
                  i === index 
                    ? "w-6 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                    : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Animated Images */}
          <AnimatePresence mode="popLayout">
            <motion.img
              key={index}
              src={typeof slides[index].image === 'string' ? slides[index].image : slides[index].image.src}
              alt={slides[index].caption}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Smooth ease-out curve
            />
          </AnimatePresence>

          {/* Glassmorphic Caption Overlay (Bottom) */}
          <div className="absolute bottom-0 left-0 right-0 p-6 pt-16 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={`caption-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-white text-sm font-medium leading-relaxed drop-shadow-lg"
              >
                {slides[index].caption}
              </motion.p>
            </AnimatePresence>
          </div>

        </div>
      </div>

    </div>
  );
}