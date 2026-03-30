"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Send } from "lucide-react";

const links = [
  { name: "About", href: "#about" },
  { name: "Works", href: "#featuredworks" },
  { name: "Thoughts", href: "#thoughts" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // ✅ Expand on scroll (desktop only)
  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) {
        setExpanded(window.scrollY > 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div
        onMouseEnter={() => !isMobile && setExpanded(true)}
        onMouseLeave={() =>
          !isMobile && window.scrollY < 50 && setExpanded(false)
        }
        animate={{
          width: isMobile
            ? "95vw"
            : expanded
            ? "min(90vw, 850px)"
            : "220px",
        }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        style={{ transformOrigin: "center" }}
        className="flex items-center justify-between py-3 px-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-xl"
      >
        {/* LOGO / NAME */}
        <div
          className={`text-white font-semibold tracking-wide text-lg transition-all ${
            expanded || isMobile ? "text-left" : "mx-auto"
          }`}
        >
          Krishna{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500">
            Awasthi
          </span>
        </div>

        {/* DESKTOP LINKS */}
        {!isMobile && expanded && (
          <div className="hidden md:flex gap-8 text-sm text-gray-300">
            {links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                className="relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-400 transition-all group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>
        )}

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          
          {/* THE NEW CHAT BUTTON */}
          {(expanded || isMobile) && (
            <motion.button
              onClick={() => window.dispatchEvent(new Event("toggle-chat"))}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition cursor-pointer"
            >
              <Send className="w-5 h-5 text-white" />
            </motion.button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="text-white md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.div>

      {/* MOBILE MENU */}
      {open && isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 w-[95vw] rounded-2xl backdrop-blur-xl bg-black/80 border border-white/10 p-6 flex flex-col gap-4 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-white text-lg"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}