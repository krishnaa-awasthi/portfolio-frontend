"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { MessageSquareQuote, Star, Edit3, X, Github, Mail } from "lucide-react";
import { supabase } from "../lib/supabase";

// --- SCROLLING ROW COMPONENT ---
const ScrollingRow = ({ items, direction = "left", speed = 40 }: { items: any[], direction?: "left" | "right", speed?: number }) => {
  if (items.length === 0) return null;
  return (
    <div className="flex overflow-hidden relative w-full group">
      <motion.div
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        className="flex gap-6 w-max px-3"
      >
        {/* Tripled to ensure a smooth infinite scroll loop even with a few items */}
        {[...items, ...items, ...items].map((testimonial, index) => (
          <div key={index} className="w-[300px] md:w-[400px] shrink-0 p-6 md:p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-900/60 hover:border-orange-500/30 transition-all group/card flex flex-col">
            <div className="flex items-center gap-1 mb-4 text-orange-400">
              {[...Array(testimonial.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            
            {/* The User's Review */}
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
              "{testimonial.text}"
            </p>

            {/* The Admin's Reply (if it exists in the database) */}
            {testimonial.admin_reply && (
              <div className="bg-orange-500/10 border-l-2 border-orange-500 pl-3 py-2 mb-6 rounded-r-lg">
                <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-0.5">Response from Krishna</p>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {testimonial.admin_reply}
                </p>
              </div>
            )}

            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-800 border border-white/10 overflow-hidden shrink-0">
                <img 
                  // Strictly uses the Google/GitHub avatar URL saved in the database
                  src={testimonial.avatar_url} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { 
                    // Fallback to initial avatar if their Google/GitHub link breaks
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${testimonial.name}&background=18181b&color=f97316`; 
                  }}
                />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm md:text-base group-hover/card:text-orange-400 transition-colors">{testimonial.name}</h4>
                <p className="text-zinc-500 text-xs md:text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Testimonials() {
  const [session, setSession] = useState<any>(null);
  const [liveReviews, setLiveReviews] = useState<any[]>([]);
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [userRole, setUserRole] = useState("Verified Guest");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
    
    // Auth Listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) checkExistingReview(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) checkExistingReview(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchReviews = async () => {
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (data) setLiveReviews(data);
  };

  // FIX: Changed .single() to .maybeSingle()
  const checkExistingReview = async (userId: string) => {
    const { data } = await supabase.from('reviews').select('*').eq('user_id', userId).maybeSingle();
    if (data) {
      setIsEditing(true);
      setReviewText(data.text);
      setRating(data.rating);
      setUserRole(data.role);
    } else {
      setIsEditing(false);
    }
  };

  const handleLogin = async (provider: 'github' | 'google') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin }
    });
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !reviewText.trim()) return;
    setIsSubmitting(true);

    const userMeta = session.user.user_metadata;
    // Safely grab the avatar from either Google (picture) or GitHub (avatar_url)
    const avatar = userMeta.avatar_url || userMeta.picture;
    const name = userMeta.full_name || userMeta.name || "Anonymous User";

    const payload = {
      user_id: session.user.id,
      name: name,
      avatar_url: avatar,
      role: userRole,
      text: reviewText,
      rating: rating,
    };

    if (isEditing) {
      await supabase.from('reviews').update(payload).eq('user_id', session.user.id);
    } else {
      await supabase.from('reviews').insert([payload]);
    }

    await fetchReviews();
    setIsSubmitting(false);
    setIsModalOpen(false);
  };

  // Dynamically split the live reviews into two rows
  const row1 = liveReviews.filter((_, i) => i % 2 === 0);
  const row2 = liveReviews.filter((_, i) => i % 2 !== 0);

  return (
    <section className="relative py-20 md:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-16 flex flex-col md:flex-row items-center justify-between relative z-10 gap-6 text-center md:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 text-xs md:text-sm font-medium text-zinc-300">
            <MessageSquareQuote className="w-4 h-4 text-purple-400" /> Community
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white">
            <span className="text-zinc-500 block mt-2 text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
              Wall Of {" "}
              <TypeAnimation
                sequence={[
                  "Trust.",
                  2000,
                  "Endorsements.",
                  2000,
                  "Impact.",
                  2000,
                  "Recognition.",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500"
              />
            </span>
          </h2>
        </div>

        {/* WRITE A REVIEW BUTTON */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-orange-500 px-6 font-medium text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(249,115,22,0.3)] shrink-0"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="relative flex items-center gap-2 group-hover:text-orange-500 transition-colors">
            <Edit3 className="w-4 h-4" /> 
            {isEditing ? "Edit Your Review" : "Write a Review"}
          </span>
        </button>
      </div>

      {/* RENDER THE ROWS OR EMPTY STATE */}
      <div className="relative z-10 flex flex-col gap-6 w-full max-w-[100vw] min-h-[200px] justify-center">
        {liveReviews.length === 0 ? (
          <div className="text-center py-12 px-4 border border-dashed border-white/10 rounded-3xl mx-4 md:mx-8 bg-white/5">
            <p className="text-zinc-400 mb-4">No reviews yet.</p>
            <p className="text-white font-medium">Be the first to verify your identity and leave a review!</p>
          </div>
        ) : (
          <>
            <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
            <ScrollingRow items={row1} direction="left" speed={45} />
            <ScrollingRow items={row2} direction="right" speed={55} />
          </>
        )}
      </div>

      {/* --- REVIEW MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 pt-10 sm:pt-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl z-10"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-white mb-2">
                {isEditing ? "Update Your Review" : "Leave a Review"}
              </h3>
              <p className="text-zinc-400 text-sm mb-6">
                {isEditing ? "Thanks for coming back! You can update your thoughts below." : "Sign in to verify your identity and share your experience working with me."}
              </p>

              {!session ? (
                // NOT LOGGED IN - SHOW AUTH
                <div className="space-y-3">
                  <button onClick={() => handleLogin('github')} className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3.5 rounded-xl transition-all font-medium">
                    <Github className="w-5 h-5" /> Continue with GitHub
                  </button>
                  <button onClick={() => handleLogin('google')} className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3.5 rounded-xl transition-all font-medium">
                    <Mail className="w-5 h-5" /> Continue with Google
                  </button>
                </div>
              ) : (
                // LOGGED IN - SHOW FORM
                <form onSubmit={handleSubmitReview} className="space-y-5">
                  <div>
                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 block">Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none transition-transform hover:scale-110">
                          <Star className={`w-7 h-7 ${rating >= star ? "fill-orange-400 text-orange-400" : "text-zinc-700"}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 block">Your Role / Relationship</label>
                    <input 
                      type="text" 
                      value={userRole} 
                      onChange={(e) => setUserRole(e.target.value)} 
                      placeholder="e.g. Client, Co-worker, Mentor" 
                      maxLength={30}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-orange-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 block">Review</label>
                    <textarea 
                      required 
                      value={reviewText} 
                      onChange={(e) => setReviewText(e.target.value)} 
                      placeholder="What was it like working with Krishna?" 
                      rows={4}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-orange-500/50 transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || !reviewText.trim()}
                    className="w-full bg-orange-500 text-white font-medium py-3.5 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : isEditing ? "Update Review" : "Post Review"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}