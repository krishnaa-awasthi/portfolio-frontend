"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Github, Bell, CheckCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

// A clean Google SVG icon
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 1. Fetch History & Setup Realtime Subscription
  const setupRealtimeChat = async (user: any) => {
    // Fetch past messages
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("sender_id", user.id)
      .order("created_at", { ascending: true });
      
    if (data) setChatHistory(data);

    // Listen for new incoming messages (Realtime)
    const channel = supabase
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `sender_id=eq.${user.id}` },
        (payload) => {
          const newMsg = payload.new;
          setChatHistory((prev) => [...prev, newMsg]);

          // Trigger browser notification if the message is from Admin AND the user is tabbed out
          if (newMsg.is_admin && document.hidden && Notification.permission === "granted") {
            new Notification("Krishna replied!", {
              body: newMsg.text,
              icon: "/image4.jpg" // Change this to your actual avatar path
            });
          }
        }
      )
      .subscribe();

    return channel;
  };

  // 2. Auth Listener
  useEffect(() => {
    let activeChannel: any = null;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
        setCurrentUser(session.user);
        setupRealtimeChat(session.user).then(ch => activeChannel = ch);
        
        // Check if notifications are already granted
        if (Notification.permission === "granted") setNotificationsEnabled(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // 1. Check for the specific login event
      if (event === 'SIGNED_IN') {
        setShowToast(true);
        // Hide the toast automatically after 4 seconds
        setTimeout(() => setShowToast(false), 4000);
      }

      // 2. Handle normal session logic
      if (session) {
        setIsAuthenticated(true);
        setCurrentUser(session.user);
        setupRealtimeChat(session.user).then(ch => activeChannel = ch);
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setChatHistory([]);
        if (activeChannel) supabase.removeChannel(activeChannel);
      }
    });

    return () => {
      subscription.unsubscribe();
      if (activeChannel) supabase.removeChannel(activeChannel);
    };
  }, []);

  // 3. Request Notifications Function
  const requestNotifications = () => {
    if (!("Notification" in window)) return;
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") setNotificationsEnabled(true);
    });
  };

  // 4. Navbar Toggle Listener
  useEffect(() => {
    const handleToggleChat = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-chat", handleToggleChat);
    return () => window.removeEventListener("toggle-chat", handleToggleChat);
  }, []);

  // 5. Auto-scroll
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isOpen]);

  // 6. Login Handlers
  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: window.location.origin }});
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin }});
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // 7. Send Message to Supabase DB
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !currentUser) return;

    const msgText = message;
    setMessage(""); // Clear input immediately for snappy UX

    // Optimistic UI update (optional, but makes it feel faster)
    // We rely on the realtime subscription to actually populate it, but saving it directly works too.
    
    await supabase.from("messages").insert([
      {
        sender_id: currentUser.id,
        sender_email: currentUser.email,
        text: msgText,
        is_admin: false
      }
    ]);
  };

  // Format time helper
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] h-[500px] bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="/image4.jpg" alt="Krishna" className="w-10 h-10 rounded-full object-cover border border-white/20" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black/50 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm drop-shadow-sm">Chat with Krishna</h3>
                  <p className="text-zinc-300 text-xs flex items-center gap-1 drop-shadow-sm">
                    <Sparkles className="w-3 h-3 text-orange-400" /> Typically replies instantly
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isAuthenticated && (
                  <button onClick={handleLogout} className="text-[10px] text-zinc-400 hover:text-white px-2 py-1 bg-white/5 rounded-md transition">
                    Logout
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notification Banner (Only show if logged in and notifications not enabled) */}
            {isAuthenticated && !notificationsEnabled && "Notification" in window && (
              <div className="bg-orange-500/10 border-b border-orange-500/20 p-2 flex items-center justify-between px-4 backdrop-blur-md">
                <span className="text-xs text-orange-200 flex items-center gap-2">
                  <Bell className="w-3 h-3" /> Turn on alerts for my reply
                </span>
                <button onClick={requestNotifications} className="text-xs font-medium text-orange-400 hover:text-orange-300">
                  Enable
                </button>
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
              {!isAuthenticated ? (
                // OAUTH LOGIN SCREEN
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col justify-center pb-8">
                  {/* ... (Keep your existing Auth Buttons UI exactly the same here) ... */}
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-inner">
                      <MessageSquare className="w-6 h-6 text-orange-400" />
                    </div>
                    <h4 className="text-white font-medium text-lg mb-2 drop-shadow-sm">Secure Connection</h4>
                    <p className="text-zinc-300 text-sm px-4 drop-shadow-sm">
                      Log in to send a message. Your chat history will be saved securely for your next visit.
                    </p>
                  </div>
                  <div className="space-y-3 px-2">
                    <button onClick={handleGithubLogin} className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-black/50 hover:bg-black/70 text-white text-sm font-medium transition-colors border border-white/10 backdrop-blur-sm">
                      <Github className="w-5 h-5" /> Continue with GitHub
                    </button>
                    <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white/90 hover:bg-white text-black text-sm font-medium transition-colors backdrop-blur-sm">
                      <GoogleIcon /> Continue with Google
                    </button>
                  </div>
                </motion.div>
              ) : (
                // ACTUAL CHAT SCREEN
                <div className="space-y-4">
                  {/* Default welcome message */}
                  <div className="flex flex-col items-start">
                    <div className="max-w-[85%] px-4 py-2.5 rounded-2xl text-sm bg-white/10 text-zinc-100 border border-white/10 rounded-tl-sm backdrop-blur-md shadow-sm">
                      Hey {currentUser?.user_metadata?.name?.split(' ')[0] || 'there'}! Thanks for connecting. Drop a message and I'll get back to you ASAP.
                    </div>
                  </div>

                  {/* Render Database Messages */}
                  {chatHistory.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${!msg.is_admin ? "items-end" : "items-start"}`}>
                      <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${!msg.is_admin ? "bg-gradient-to-r from-orange-500/90 to-purple-600/90 text-white rounded-tr-sm shadow-md backdrop-blur-sm" : "bg-white/10 text-zinc-100 border border-white/10 rounded-tl-sm backdrop-blur-md shadow-sm"}`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-zinc-400 mt-1 px-1 drop-shadow-sm">{formatTime(msg.created_at)}</span>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            {isAuthenticated && (
              <div className="p-4 bg-white/5 border-t border-white/10">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                  <input type="text" placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-full pl-4 pr-12 py-3 text-white text-sm placeholder:text-zinc-400 outline-none focus:bg-black/60 focus:border-orange-500/50 transition-all backdrop-blur-sm shadow-inner" />
                  <button type="submit" disabled={!message.trim()} className="absolute right-2 p-2 bg-orange-500 rounded-full text-white disabled:opacity-50 disabled:bg-white/10 transition-colors shadow-md">
                    <Send className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE FLOATING BUTTON */}
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-2xl shadow-orange-500/30 flex items-center justify-center border border-white/20">
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}