import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden w-full bg-slate-950 text-white pt-24 pb-32 border-t border-slate-900 mt-12 z-10">
      {/* Background terminal grid */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#9ada00]/5 to-transparent pointer-events-none blur-3xl"></div>
      
      <div className="container-page relative z-10">
        
        {/* Massive Brand Statement */}
        <div className="mb-20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-4xl sm:text-7xl font-bold tracking-tighter text-white mb-6">
              Intelligence<br/>
              <span className="text-[#9ada00]">Before Crisis.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed">
              Agentic clinical AI for predicting patient deterioration hours before standard telemetry triggers.
            </p>
          </div>
          <a
            href="#contact"
            className="group relative inline-flex h-16 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-slate-950 hover:bg-[#9ada00] transition-colors duration-500 overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(154,218,0,0.3)] hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-3">
              Deploy in your Ward
              <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </div>

        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-3 h-3 rounded-full bg-[#9ada00] animate-pulse shadow-[0_0_15px_rgba(154,218,0,0.6)]"></span>
              <span className="text-2xl font-bold text-white tracking-tight">Pulse AI</span>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">System Status</p>
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-white/10 px-3 py-1.5 rounded-md shadow-inner text-xs font-mono text-[#9ada00]">
              All Agents Operational
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
              Navigation
            </p>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-300 hover:text-white hover:underline transition-all text-sm font-medium">Home</a></li>
              <li><a href="#capabilities" className="text-slate-300 hover:text-white hover:underline transition-all text-sm font-medium">Capabilities</a></li>
              <li><a href="#demo" className="text-slate-300 hover:text-white hover:underline transition-all text-sm font-medium">Ward Simulator</a></li>
              <li><a href="#timeline" className="text-slate-300 hover:text-white hover:underline transition-all text-sm font-medium">Trajectory</a></li>
              <li><a href="#projects" className="text-slate-300 hover:text-white hover:underline transition-all text-sm font-medium">Pilots</a></li>
              <li><a href="#contact" className="text-slate-300 hover:text-white hover:underline transition-all text-sm font-medium">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
              Capabilities
            </p>
            <ul className="space-y-4">
              <li className="text-slate-300 text-sm font-medium">Continuous Telemetry</li>
              <li className="text-slate-300 text-sm font-medium">Multi-Agent Deliberation</li>
              <li className="text-slate-300 text-sm font-medium">Oncology Risk Scoring</li>
              <li className="text-slate-300 text-sm font-medium">EHR & Workflow Sync</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
              Clinical Partners
            </p>
            <ul className="space-y-4 text-sm text-slate-300 font-medium">
              <li>Barts Health NHS Trust</li>
              <li>Innovate UK Cohort</li>
              <li>Marengo Rehabilitation</li>
              <li>Cancer Research UK</li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-slate-500 font-mono">
            &copy; {new Date().getFullYear()} Pulse AI Health Ltd. London, UK.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-medium">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-medium">Terms of Service</a>
            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-medium">Information Governance</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
