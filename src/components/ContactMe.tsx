"use client";

import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, MapPin, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

  // Replace this with your actual Web3Forms Access Key
  const ACCESS_KEY = "84485d49-b072-45e6-bfa2-25f4b07b9918"; 

  // FIXED: Added React.ChangeEvent type for the input/textarea event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // FIXED: Added React.FormEvent type for the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        // Reset status after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-32 px-4 md:px-8 text-white bg-[#0A0A0A] overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* LEFT COLUMN: Text & Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Let's build something <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500">
                great together.
              </span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
              Whether you have a question, a project idea, or just want to say hi, I try my best to get back to everyone.
            </p>
          </div>

          <div className="space-y-6">
            <a 
              href="mailto:krishnaawasthi0306@gmail.com"
              className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all w-fit"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium mb-0.5">Email</p>
                <p className="text-zinc-200 font-medium flex items-center gap-2">
                  krishnaawasthi0306@gmail.com
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 w-fit">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10">
                <MapPin className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium mb-0.5">Location</p>
                <p className="text-zinc-200 font-medium">Kanpur, Uttar Pradesh</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: The Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 shadow-2xl overflow-hidden">
            {/* Form Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/20 blur-[60px] rounded-full pointer-events-none" />

            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-[400px] text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-zinc-400">
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-zinc-400 ml-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 outline-none focus:bg-white/10 focus:border-orange-500/50 transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-zinc-400 ml-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 outline-none focus:bg-white/10 focus:border-orange-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-zinc-400 ml-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 outline-none focus:bg-white/10 focus:border-orange-500/50 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full relative group inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-zinc-100 px-8 font-medium text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-500 rounded-full group-hover:w-full group-hover:h-56"></span>
                  <span className="relative flex items-center gap-2 group-hover:text-white transition-colors">
                    {status === "submitting" ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black group-hover:border-white/30 group-hover:border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <Send className="w-4 h-4" />
                      </span>
                    )}
                  </span>
                </button>

                {status === "error" && (
                  <p className="text-red-400 text-sm text-center mt-4">
                    Something went wrong. Please try emailing me directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}