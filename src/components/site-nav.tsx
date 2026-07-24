import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#demo", label: "Simulator" },
  { href: "#timeline", label: "Trajectory" },
  { href: "#projects", label: "Pilots" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[95vw] pointer-events-none">
      <header className="inline-flex items-center gap-2 sm:gap-6 rounded-full bg-slate-900/80 backdrop-blur-2xl border border-white/10 px-3.5 sm:px-6 h-12 sm:h-14 pointer-events-auto shadow-2xl max-w-full overflow-x-auto no-scrollbar">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center shrink-0 gap-1.5 sm:gap-2 pr-2">
          <span className="w-2 h-2 rounded-full bg-[#9ada00] animate-pulse shadow-[0_0_10px_rgba(154,218,0,0.5)]"></span>
          <span className="text-xs sm:text-sm font-semibold text-white tracking-tight font-sans">Pulse AI</span>
        </Link>

        {/* Navigation Links */}
        <nav 
          className="flex items-center gap-1 sm:gap-2 shrink-0 relative"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onMouseEnter={() => setHoveredLink(l.href)}
              className="relative text-[11px] sm:text-[13px] font-medium transition-colors px-2.5 sm:px-3 py-1.5 shrink-0 font-sans z-10"
            >
              {hoveredLink === l.href && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-300 ${hoveredLink === l.href ? "text-white" : "text-slate-400"}`}>
                {l.label}
              </span>
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <a
          href="#contact"
          className="relative group inline-flex h-8 sm:h-9 items-center rounded-full bg-[#9ada00] px-4 sm:px-5 text-[11px] sm:text-xs font-bold text-slate-950 hover:bg-[#a6ec00] transition-all shadow-[0_0_20px_rgba(154,218,0,0.2)] shrink-0 ml-1 font-sans overflow-hidden"
        >
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10">Partner</span>
        </a>
      </header>
    </div>
  );
}
