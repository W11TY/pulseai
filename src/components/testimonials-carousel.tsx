import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const testimonials = [
  {
    quote: "Pulse AI identified subtle deterioration patterns in my post-op patient hours before standard telemetry triggered. We intervened before sepsis took hold.",
    author: "Dr. Sarah Jenkins",
    role: "Head of Oncology Surgery, Barts Health",
  },
  {
    quote: "The ability to fuse EHR notes, lab results, and continuous vitals into one cohesive risk score is a paradigm shift for acute care.",
    author: "Dr. James Chen",
    role: "Critical Care Lead, Imperial College",
  },
  {
    quote: "Finally, an AI that doesn't just alert, but provides clinical reasoning. The SBAR handover generation saves us crucial minutes during emergencies.",
    author: "Dr. Emily Rostova",
    role: "Chief Medical Officer, NHS Trust",
  },
  {
    quote: "It's like having a dedicated clinical fellow constantly reviewing the patient's entire trajectory. The predictive precision is unprecedented.",
    author: "Dr. Marcus Thorne",
    role: "Consultant Oncologist, UCLH",
  }
];

export function TestimonialsCarousel() {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 20, stiffness: 100 });

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
    
    // Auto scroll logic could go here, but drag is more interactive
  }, []);

  return (
    <div className="w-full overflow-hidden py-12 relative cursor-grab active:cursor-grabbing">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <motion.div ref={carousel} className="flex">
        <motion.div 
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.1}
          style={{ x: smoothX }}
          className="flex gap-8 px-8 sm:px-24"
        >
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx} 
              className="min-w-[85vw] sm:min-w-[450px] bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-lg shadow-black/5 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div>
                <div className="text-4xl text-[#9ada00] font-serif mb-6 leading-none">"</div>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-8 italic relative z-10">
                  {t.quote}
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-sans text-base font-bold text-slate-900 tracking-tight">
                    {t.author}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    {t.role}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#9ada00]/10 text-[#9ada00] flex items-center justify-center font-bold text-lg shadow-inner">
                  {t.author.charAt(0)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      <div className="flex items-center justify-center gap-2 mt-12">
        <div className="w-12 h-1.5 rounded-full bg-[#9ada00]" />
        <div className="w-2 h-1.5 rounded-full bg-slate-200" />
        <div className="w-2 h-1.5 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}
