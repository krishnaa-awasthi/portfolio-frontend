"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, X } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function GlobalAuthToast() {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // 1. Trigger only on SIGNED_IN
      if (event === 'SIGNED_IN' && session) {
        
        // 2. Check short-term memory to see if we already welcomed them this session
        const hasSeenToast = sessionStorage.getItem('authToastShown');

        if (!hasSeenToast) {
          const name = session.user.user_metadata?.full_name || session.user.user_metadata?.name || "Guest";
          setUserName(name);
          setShow(true);
          
          // Save to memory so it doesn't trigger on refresh or tab focus
          sessionStorage.setItem('authToastShown', 'true');
          
          // Auto-hide after 5 seconds
          setTimeout(() => setShow(false), 5000);
        }
      }

      // 3. Clear memory if they log out, so it works again next time
      if (event === 'SIGNED_OUT') {
        sessionStorage.removeItem('authToastShown');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        // FIX: Removed inset-0. Now it specifically targets the top center.
        <div className="fixed top-6 left-0 right-0 z-[100] pointer-events-none flex justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            // FIX: Made the UI a compact, sleek horizontal pill
            className="pointer-events-auto flex items-center gap-3 bg-[#111111]/90 backdrop-blur-xl border border-green-500/30 px-4 py-3 rounded-2xl shadow-[0_10px_40px_-10px_rgba(34,197,94,0.2)] max-w-md w-full sm:w-auto"
          >
            {/* Compact Glowing Icon */}
            <div className="relative flex-shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-green-500 blur-md opacity-40 rounded-full"></div>
              <CheckCircle2 className="relative w-6 h-6 text-green-400" />
            </div>

            {/* Sleeker Text Content */}
            <div className="flex flex-col flex-1 pr-4">
              <h2 className="text-white text-sm font-bold flex items-center gap-1.5">
                Login Successful <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              </h2>
              <p className="text-zinc-400 text-xs mt-0.5">
                Welcome back, <span className="text-white font-medium">{userName}</span>.
              </p>
            </div>
            
            {/* Quick Dismiss Button */}
            <button 
              onClick={() => setShow(false)}
              className="flex-shrink-0 p-1.5 hover:bg-white/10 rounded-full transition-colors text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}