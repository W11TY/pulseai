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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 bottom-24 z-40 md:hidden"
          >
            <div className="bg-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-slate-300 hover:text-white transition-colors py-3 px-4 rounded-xl hover:bg-white/5 active:bg-white/10"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95vw] sm:max-w-max pointer-events-none px-4 sm:px-0">
        <header className="flex items-center justify-between gap-2 sm:gap-6 rounded-full bg-slate-900/80 backdrop-blur-2xl border border-white/10 px-4 sm:px-6 h-14 sm:h-14 pointer-events-auto shadow-2xl w-full sm:w-auto overflow-hidden">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center shrink-0 gap-2 pr-2" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-full bg-[#9ada00] animate-pulse shadow-[0_0_10px_rgba(154,218,0,0.5)]"></span>
            <span className="text-sm font-semibold text-white tracking-tight font-sans">Pulse AI</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav 
            className="hidden md:flex items-center gap-2 shrink-0 relative"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => setHoveredLink(l.href)}
                className="relative text-[13px] font-medium transition-colors px-3 py-2 shrink-0 font-sans z-10"
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

          <div className="flex items-center gap-2 shrink-0">
            {/* CTA Button */}
            <a
              href="#contact"
              className="relative group inline-flex h-9 sm:h-9 items-center justify-center rounded-full bg-[#9ada00] px-5 sm:px-5 text-[13px] sm:text-xs font-bold text-slate-950 hover:bg-[#a6ec00] transition-all shadow-[0_0_20px_rgba(154,218,0,0.2)] shrink-0 font-sans overflow-hidden min-w-[80px]"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Partner</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""}`}
              >
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </header>
      </div>
    </>
  );
}
