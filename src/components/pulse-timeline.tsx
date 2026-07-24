import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Stage {
  label: string;
  caption: string;
  status: "Live" | "In development" | "Future";
}

const stages: Stage[] = [
  { label: "Monitoring", caption: "Continuous patient signals", status: "Live" },
  { label: "Rehabilitation", caption: "With Marengo", status: "Live" },
  { label: "Deterioration Prediction", caption: "Oncology, first", status: "In development" },
  { label: "Clinical AI Platform", caption: "Unified care intelligence", status: "Future" },
];

const statusStyles: Record<Stage["status"], string> = {
  "Live": "text-[#9ada00] font-semibold drop-shadow-[0_0_8px_rgba(154,218,0,0.5)]",
  "In development": "text-slate-800",
  "Future": "text-slate-400",
};

export function PulseTimeline({ condensed = false }: { condensed?: boolean }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Scroll tracking for the timeline
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 80%", "end 20%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    restDelta: 0.001
  });

  // Calculate the drawing of the path
  const pathLength = useTransform(smoothProgress, [0, 0.8], [0, 1]);

  // Horizontal layout: 4 peaks evenly spaced
  return (
    <div ref={wrapRef} className="w-full relative">
      {/* Desktop: horizontal */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="grid grid-cols-4 mb-6">
            {stages.map((s, i) => (
              <motion.div 
                key={s.label} 
                className="flex flex-col items-center text-center px-3 relative" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#9ada00]/5 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">{`0${i + 1}`}</p>
                <h4 className="mt-2 text-lg font-bold text-slate-900 tracking-tight">{s.label}</h4>
                {!condensed && <p className="mt-1.5 text-sm text-slate-600 font-medium">{s.caption}</p>}
                <p className={`mt-3 font-mono text-[11px] tracking-[0.15em] uppercase px-3 py-1 rounded-full border ${s.status === 'Live' ? 'border-[#9ada00]/30 bg-[#9ada00]/10' : 'border-slate-200 bg-slate-50'} ${statusStyles[s.status]}`}>
                  {s.status}
                </p>
              </motion.div>
            ))}
          </div>

          <svg viewBox="0 0 1200 120" className="w-full h-auto overflow-visible" fill="none" aria-hidden>
            {/* Background Path */}
            <path
              d="M0 80 H90 L130 30 L170 110 L210 80 H390 L430 30 L470 110 L510 80 H690 L730 30 L770 110 L810 80 H990 L1030 30 L1070 110 L1110 80 H1200"
              stroke="#e2e8f0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Animated Glow Path */}
            <motion.path
              d="M0 80 H90 L130 30 L170 110 L210 80 H390 L430 30 L470 110 L510 80 H690 L730 30 L770 110 L810 80 H990 L1030 30 L1070 110 L1110 80 H1200"
              stroke="#9ada00"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ 
                pathLength,
                filter: "drop-shadow(0px 0px 8px rgba(154,218,0,0.6))"
              }}
            />
          </svg>
        </div>
      </div>

      {/* Mobile: vertical spine */}
      <div className="md:hidden">
        <ol className="relative ml-6 border-l-2 border-slate-200">
          <motion.div 
            className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-[#9ada00]" 
            style={{ scaleY: pathLength, originY: 0, filter: "drop-shadow(0px 0px 4px rgba(154,218,0,0.8))" }} 
          />
          {stages.map((s, i) => (
            <motion.li 
              key={s.label} 
              className="relative pl-8 pb-10 last:pb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <span className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-white ${s.status === 'Live' ? 'bg-[#9ada00] shadow-[0_0_10px_rgba(154,218,0,0.6)]' : 'bg-slate-300'}`} />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">{`0${i + 1}`}</p>
              <h4 className="mt-1 text-lg font-bold text-slate-900">{s.label}</h4>
              <p className="mt-1 text-sm text-slate-600 font-medium">{s.caption}</p>
              <p className={`mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.15em] px-3 py-1 rounded-full border ${s.status === 'Live' ? 'border-[#9ada00]/30 bg-[#9ada00]/10' : 'border-slate-200 bg-slate-50'} ${statusStyles[s.status]}`}>
                {s.status}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
