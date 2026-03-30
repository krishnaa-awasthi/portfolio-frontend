"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group w-[340px]">

      {/* glow border */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl blur opacity-40"></div>

      <div className="relative bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl">

        <AnimatePresence mode="wait">
          <motion.img
            key={slides[index].image.src}
            src={slides[index].image.src}
            alt="profile"
            className="max-w-full h-auto"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        <div className="p-4 border-t border-zinc-800 text-center text-sm text-gray-400">
          {slides[index].caption}
        </div>

      </div>

    </div>
  );
}