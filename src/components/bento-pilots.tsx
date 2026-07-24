import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { StaggerReveal, StaggerItem } from "@/components/reveal";

const clinicalPilots = [
  {
    category: "Oncology Ward",
    title: "Barts Health NHS Trust",
    tagline: "Predicting neutropenic sepsis up to 15 hours before clinical manifestation.",
    location: "London, UK",
    accentColor: "#9ada00",
    bgGradient: "from-[#9ada00]/5 to-transparent",
  },
  {
    category: "Post-Surgical",
    title: "Imperial College Healthcare",
    tagline: "Monitoring post-op recovery trajectories for signs of silent deterioration.",
    location: "London, UK",
    accentColor: "#3b82f6",
    bgGradient: "from-blue-500/5 to-transparent",
  },
  {
    category: "Outpatient Rehab",
    title: "UCLH Research Cohort",
    tagline: "Continuous remote telemetry integration with daily patient-reported outcomes.",
    location: "London, UK",
    accentColor: "#f43f5e",
    bgGradient: "from-rose-500/5 to-transparent",
  },
  {
    category: "Acute Medicine",
    title: "Guy's and St Thomas'",
    tagline: "Deploying the Agentic Reasoner to summarize handover SBARs automatically.",
    location: "London, UK",
    accentColor: "#f59e0b",
    bgGradient: "from-amber-500/5 to-transparent",
  },
];

export function BentoPilots() {
  return (
    <StaggerReveal staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {clinicalPilots.map((pilot, idx) => (
        <StaggerItem key={idx}>
          <PilotCard pilot={pilot} />
        </StaggerItem>
      ))}
    </StaggerReveal>
  );
}

function PilotCard({ pilot }: { pilot: typeof clinicalPilots[0] }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/60 p-8 sm:p-10 transition-all duration-500 hover:shadow-2xl hover:border-slate-300 h-full cursor-pointer group"
      whileHover={{ y: -5 }}
    >
      {/* Dynamic hover spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 rounded-3xl z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(154,218,0,.1), transparent 40%)`,
        }}
      />
      
      {/* Background static glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${pilot.bgGradient} opacity-30 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0`}></div>
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full animate-pulse shadow-sm" style={{ backgroundColor: pilot.accentColor }}></span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-500">
              {pilot.category}
            </span>
          </div>
          <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-3 group-hover:text-[#9ada00] transition-colors">
            {pilot.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium mb-8">
            {pilot.tagline}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <svg className="w-3.5 h-3.5 text-[#9ada00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            {pilot.location}
          </div>
          
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#9ada00] group-hover:text-slate-950 transition-all duration-300 shadow-sm group-hover:shadow-lg">
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
