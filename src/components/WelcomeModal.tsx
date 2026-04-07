"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, ShieldCheck, ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      // 1. Check if they already clicked skip during this session
      const hasSkipped = sessionStorage.getItem("hasSkippedWelcomeAuth");
      if (hasSkipped === "true") return;

      // 2. Check if they are already logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      // 3. If they aren't logged in and haven't skipped, show the modal after a short delay
      if (!session) {
        setTimeout(() => setIsOpen(true), 1500); // 1.5s delay feels highly natural
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = async (provider: 'github' | 'google') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin }
    });
  };

  const handleSkip = () => {
    // Remember that they skipped so we don't annoy them on refresh
    sessionStorage.setItem("hasSkippedWelcomeAuth", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl z-10 flex flex-col items-center text-center overflow-hidden"
          >
            {/* Background glowing effect */}
            <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner relative z-10">
              <ShieldCheck className="w-8 h-8 text-orange-400" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">
              Welcome to my space.
            </h3>
            <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
              Sign in to gain full access. You'll be able to chat with me live, drop a review on the Wall of Trust, and interact with the portfolio.
            </p>

            <div className="w-full space-y-3 mb-6 relative z-10">
              <button 
                onClick={() => handleLogin('github')} 
                className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3.5 rounded-xl transition-all font-medium"
              >
                <Github className="w-5 h-5" /> Continue with GitHub
              </button>
              <button 
                onClick={() => handleLogin('google')} 
                className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3.5 rounded-xl transition-all font-medium"
              >
                <Mail className="w-5 h-5" /> Continue with Google
              </button>
            </div>

            <button 
              onClick={handleSkip}
              className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium relative z-10"
            >
              Skip for now 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}