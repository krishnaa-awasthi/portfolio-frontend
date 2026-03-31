"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function GlobalAuthToast() {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Try to grab their Google/GitHub name, fallback to 'Guest'
        const name = session.user.user_metadata?.full_name || session.user.user_metadata?.name || "Guest";
        setUserName(name);
        
        setShow(true);
        
        // Hide it after 5 seconds
        setTimeout(() => setShow(false), 5000);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex justify-center pt-8 sm:pt-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="pointer-events-auto flex items-center gap-5 bg-[#0A0A0A]/80 backdrop-blur-2xl border border-green-500/30 px-6 py-5 rounded-3xl shadow-[0_0_60px_-10px_rgba(34,197,94,0.3)] max-w-lg w-full"
          >
            {/* Big Glowing Icon */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-green-500 blur-xl opacity-40 rounded-full"></div>
              <CheckCircle2 className="relative w-12 h-12 text-green-400" />
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
              <h2 className="text-white text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2">
                Authentication Successful <Sparkles className="w-5 h-5 text-orange-400" />
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base mt-0.5">
                Welcome to the network, <span className="text-white font-medium">{userName}</span>. You now have secure chat access.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}