"use client";

import { motion } from "framer-motion";

export default function LoaderKA({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  // Map sizes for flexibility
  const sizeMap = {
    sm: "w-8 h-8 text-xs",
    md: "w-16 h-16 text-lg",
    lg: "w-24 h-24 text-2xl"
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]}`}>
      {/* Outer Orbit */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/10 border-t-orange-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner Orbit */}
      <motion.div
        className="absolute inset-[15%] rounded-full border border-white/10 border-b-purple-500"
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      {/* Text */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-purple-500"
      >
        KA
      </motion.div>
    </div>
  );
}