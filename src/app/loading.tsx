"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    // The fixed container ensures it covers the whole screen while page loads
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0A0A0A]">
      
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* 1. Subtle Glowing Backdrop */}
        <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full animate-pulse" />

        {/* 2. Outer Fast Orbit (Orange) */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/5 border-t-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />

        {/* 3. Inner Slow Orbit (Purple) */}
        <motion.div
          className="absolute inset-2 rounded-full border border-white/5 border-b-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* 4. The "KA" Core */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-purple-500"
        >
          KA
        </motion.div>
      </div>

    </div>
  );
}