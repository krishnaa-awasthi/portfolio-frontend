"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Github } from "lucide-react";

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
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: "krishna",
      text: "Hey! Thanks for checking out my work. Log in below and drop me a message.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatEndRef = useRef(null);

  // Listen for the custom event from the Navbar
  useEffect(() => {
    const handleToggleChat = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-chat", handleToggleChat);
    return () => window.removeEventListener("toggle-chat", handleToggleChat);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isOpen]);

  const handleGithubLogin = async () => {
    // TODO: Trigger Supabase/Firebase GitHub Auth
    console.log("Initiating GitHub Auth...");
    // Mocking auth success for UI preview
    setTimeout(() => setIsAuthenticated(true), 1000);
  };

  const handleGoogleLogin = async () => {
    // TODO: Trigger Supabase/Firebase Google Auth
    console.log("Initiating Google Auth...");
    // Mocking auth success for UI preview
    setTimeout(() => setIsAuthenticated(true), 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory([...chatHistory, newMsg]);
    setMessage("");

    // TODO: Emit message to your backend
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
            className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] h-[500px] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-zinc-900/50 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="/image4.jpg" alt="Krishna" className="w-10 h-10 rounded-full object-cover border border-white/10" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0A0A0A] rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Chat with Krishna</h3>
                  <p className="text-zinc-400 text-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-orange-400" /> Typically replies instantly
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0A0A0A] to-zinc-900/20">
              {!isAuthenticated ? (
                // OAUTH LOGIN SCREEN
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="h-full flex flex-col justify-center pb-8"
                >
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                      <MessageSquare className="w-6 h-6 text-orange-400" />
                    </div>
                    <h4 className="text-white font-medium text-lg mb-2">Secure Connection</h4>
                    <p className="text-zinc-400 text-sm px-4">
                      Log in to send a message. Your chat history will be saved securely for your next visit.
                    </p>
                  </div>

                  <div className="space-y-3 px-2">
                    {/* GitHub Button */}
                    <button
                      onClick={handleGithubLogin}
                      className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-[#24292e] hover:bg-[#2f363d] text-white text-sm font-medium transition-colors border border-white/5"
                    >
                      <Github className="w-5 h-5" />
                      Continue with GitHub
                    </button>

                    {/* Google Button */}
                    <button
                      onClick={handleGoogleLogin}
                      className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-black text-sm font-medium transition-colors"
                    >
                      <GoogleIcon />
                      Continue with Google
                    </button>
                  </div>
                  
                  <p className="text-center text-[11px] text-zinc-600 mt-6">
                    By continuing, you agree to secure authentication.
                  </p>
                </motion.div>
              ) : (
                // ACTUAL CHAT SCREEN
                <div className="space-y-4">
                  {chatHistory.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div 
                        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                          msg.sender === "user" 
                            ? "bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-tr-sm shadow-md" 
                            : "bg-white/10 text-zinc-200 border border-white/5 rounded-tl-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-zinc-500 mt-1 px-1">{msg.time}</span>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              )}
            </div>

            {/* Input Area (Only visible if authenticated) */}
            {isAuthenticated && (
              <div className="p-4 bg-zinc-900/50 border-t border-white/10 backdrop-blur-md">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-white text-sm placeholder:text-zinc-600 outline-none focus:bg-white/10 focus:border-orange-500/50 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="absolute right-2 p-2 bg-orange-500 rounded-full text-white disabled:opacity-50 disabled:bg-white/10 transition-colors"
                  >
                    <Send className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE FLOATING BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-2xl shadow-orange-500/20 flex items-center justify-center border border-white/20"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}