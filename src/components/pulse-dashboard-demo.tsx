import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import {
  Activity,
  User,
  ShieldAlert,
  Clock,
  Sparkles,
  CheckCircle,
  FileText,
  AlertTriangle,
  Send,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface VitalData {
  time: string;
  heartRate: number;
  spo2: number;
  riskScore: number;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  risk: number;
  status: "high" | "medium" | "low";
  vitals: VitalData[];
  agents: {
    name: string;
    avatar: string;
    role: string;
    content: string;
    status: "alert" | "info" | "success";
  }[];
  sbar: {
    situation: string;
    background: string;
    assessment: string;
    recommendation: string;
  };
}

const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "Sarah Jenkins",
    age: 62,
    condition: "Stage IV Non-Small Cell Lung Cancer (NSCLC)",
    risk: 84,
    status: "high",
    vitals: [
      { time: "10:00", heartRate: 78, spo2: 96, riskScore: 15 },
      { time: "12:00", heartRate: 82, spo2: 95, riskScore: 22 },
      { time: "14:00", heartRate: 89, spo2: 94, riskScore: 35 },
      { time: "16:00", heartRate: 94, spo2: 93, riskScore: 50 },
      { time: "18:00", heartRate: 101, spo2: 92, riskScore: 68 },
      { time: "20:00", heartRate: 106, spo2: 91, riskScore: 84 },
    ],
    agents: [
      {
        name: "Vitals Agent",
        avatar: "V",
        role: "Continuous Monitoring",
        content: "SpO2 trend shows gradual decline to 91%. Heart rate has increased from baseline of 75 bpm to 106 bpm. Respiratory rate is elevated at 22/min. Meets SIRS criteria.",
        status: "alert"
      },
      {
        name: "Oncology Context Agent",
        avatar: "O",
        role: "Chemotherapy Records",
        content: "Patient is Day 6 post-cycle 2 Cisplatin/Pemetrexed chemotherapy. Nadir period for neutrophil counts runs between Day 5-10. Immunosuppressed alert.",
        status: "alert"
      },
      {
        name: "Note Analysis Agent",
        avatar: "N",
        role: "EHR Notes & Caregiver Logs",
        content: "Analyzed phone log from today at 14:30: Caregiver reported patient feeling fatigued with minor chills. No cough reported. Temperature was not checked.",
        status: "info"
      },
      {
        name: "Risk Synthesis Agent",
        avatar: "S",
        role: "Predictive Analytics",
        content: "Synthesis of clinical inputs suggests 84% probability of impending septic/neutropenic deterioration. Calibrated timeframe: crisis onset within 4 hours.",
        status: "alert"
      }
    ],
    sbar: {
      situation: "Sarah Jenkins (62yo NSCLC patient) is exhibiting early signs of neutropenic sepsis, with a calculated deterioration risk of 84%.",
      background: "Day 6 post-chemotherapy (Cisplatin/Pemetrexed). Caregiver notes chills and fatigue.",
      assessment: "Persistent tachycardia (106 bpm) and hypoxemia (SpO2 91%). Temperature check required immediately. Clear trajectory towards systemic inflammatory response.",
      recommendation: "Urgently call patient in for blood counts, lactate level evaluation, and initiate empirical broad-spectrum IV antibiotics within 1 hour."
    }
  },
  {
    id: "p2",
    name: "Maria Garcia",
    age: 71,
    condition: "Post-op Colon Resection (Stage III Adenocarcinoma)",
    risk: 56,
    status: "medium",
    vitals: [
      { time: "10:00", heartRate: 72, spo2: 98, riskScore: 10 },
      { time: "12:00", heartRate: 75, spo2: 97, riskScore: 18 },
      { time: "14:00", heartRate: 78, spo2: 97, riskScore: 24 },
      { time: "16:00", heartRate: 85, spo2: 96, riskScore: 38 },
      { time: "18:00", heartRate: 91, spo2: 96, riskScore: 48 },
      { time: "20:00", heartRate: 94, spo2: 95, riskScore: 56 },
    ],
    agents: [
      {
        name: "Vitals Agent",
        avatar: "V",
        role: "Continuous Monitoring",
        content: "Heart rate rising gradually (94 bpm). SpO2 stable at 95-96%. Blood pressure is showing a mild downward trend (currently 105/65 mmHg).",
        status: "info"
      },
      {
        name: "Oncology Context Agent",
        avatar: "O",
        role: "Surgical Recovery",
        content: "Post-operative Day 3. Typical post-surgical inflammatory response window is closing. Risk of localized site infection or anastomotic leak must be monitored.",
        status: "info"
      },
      {
        name: "Note Analysis Agent",
        avatar: "N",
        role: "EHR Notes & Caregiver Logs",
        content: "EHR fluid intake balance is negative. Caregiver noted patient took only 400ml of fluids today due to mild nausea.",
        status: "info"
      },
      {
        name: "Risk Synthesis Agent",
        avatar: "S",
        role: "Predictive Analytics",
        content: "Risk calibrated at 56%. Secondary to mild dehydration and possible surgical site inflammation. Does not meet sepsis criteria yet, but active trend is positive.",
        status: "info"
      }
    ],
    sbar: {
      situation: "Maria Garcia is showing mild signs of volume depletion and tachycardia post-colon resection, with deterioration risk at 56%.",
      background: "Post-op day 3. Decreased fluid intake due to post-operative nausea.",
      assessment: "Mild dehydration signs coupled with heart rate rise (94 bpm). No signs of sepsis or peritonitis.",
      recommendation: "Encourage oral rehydration, administer prescribed antiemetics, and review fluid balance chart in 2 hours. Escalate if heart rate exceeds 100 bpm."
    }
  },
  {
    id: "p3",
    name: "David Chen",
    age: 48,
    condition: "Hodgkin Lymphoma (Active Immunotherapy)",
    risk: 21,
    status: "low",
    vitals: [
      { time: "10:00", heartRate: 70, spo2: 98, riskScore: 12 },
      { time: "12:00", heartRate: 71, spo2: 98, riskScore: 14 },
      { time: "14:00", heartRate: 72, spo2: 99, riskScore: 15 },
      { time: "16:00", heartRate: 70, spo2: 98, riskScore: 18 },
      { time: "18:00", heartRate: 73, spo2: 98, riskScore: 20 },
      { time: "20:00", heartRate: 72, spo2: 99, riskScore: 21 },
    ],
    agents: [
      {
        name: "Vitals Agent",
        avatar: "V",
        role: "Continuous Monitoring",
        content: "All parameters stable. Heart rate remains between 70-75 bpm. Oxygen levels excellent at 98-99%.",
        status: "success"
      },
      {
        name: "Oncology Context Agent",
        avatar: "O",
        role: "Therapy Log",
        content: "Completed immunotherapy infusion 2 days ago. No immediate adverse reaction history.",
        status: "success"
      },
      {
        name: "Risk Synthesis Agent",
        avatar: "S",
        role: "Predictive Analytics",
        content: "Deterioration risk is 21% (Normal recovery baseline). No clinical intervention required. Continue standard remote monitoring protocol.",
        status: "success"
      }
    ],
    sbar: {
      situation: "David Chen is stable and recovering well post-immunotherapy, risk is baseline at 21%.",
      background: "Hodgkin Lymphoma, receiving routine immunotherapy protocol.",
      assessment: "Vitals are within physiological limits. Patient reports feeling well.",
      recommendation: "Continue routine remote observation."
    }
  }
];

export function PulseDashboardDemo() {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(mockPatients[0]);
  const [activeTab, setActiveTab] = useState<"vitals" | "agents" | "sbar">("vitals");
  const [isPlaying, setIsPlaying] = useState(true);
  const [simulatedTime, setSimulatedTime] = useState<string>("20:00");
  const [alertSent, setAlertSent] = useState(false);

  // Switch tabs auto-cycle or simulate live ticking data
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSelectedPatient((prev) => {
        const lastVitals = [...prev.vitals];
        const lastIndex = lastVitals.length - 1;
        const currentPulse = lastVitals[lastIndex].heartRate;
        
        // Add random walk to pulse
        const delta = Math.floor(Math.random() * 3) - 1;
        const newPulse = Math.max(60, Math.min(130, currentPulse + delta));
        
        const updatedVitals = [...lastVitals];
        updatedVitals[lastIndex] = {
          ...updatedVitals[lastIndex],
          heartRate: newPulse
        };
        
        return {
          ...prev,
          vitals: updatedVitals
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePatientSelect = (p: Patient) => {
    setSelectedPatient(p);
    setAlertSent(false);
  };

  const triggerAlert = () => {
    setAlertSent(true);
    toast.success(`Priority Handover Alert dispatched to oncology team for ${selectedPatient.name}`, {
      description: "SBAR summary has been appended to electronic record system.",
      duration: 5000,
    });
  };

  const getRiskColor = (status: Patient["status"]) => {
    if (status === "high") return "text-red-400 border-red-500/30 bg-red-500/10 shadow-[0_0_10px_rgba(248,113,113,0.1)]";
    if (status === "medium") return "text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_10px_rgba(251,191,36,0.1)]";
    return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_10px_rgba(52,211,153,0.1)]";
  };

  const getRiskBg = (status: Patient["status"]) => {
    if (status === "high") return "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]";
    if (status === "medium") return "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]";
    return "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]";
  };

  const tabs = [
    { id: "vitals", label: "Live Vitals", icon: Activity },
    { id: "agents", label: "AI Reasonings", icon: MessageSquare },
    { id: "sbar", label: "Handover (SBAR)", icon: FileText }
  ] as const;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-slate-950 text-slate-300 font-sans selection:bg-[#9ada00]/30 selection:text-white">
      {/* Simulation Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-slate-900/50 backdrop-blur-md px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9ada00] opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#9ada00]"></span>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold">
            Live Clinical AI Simulation
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-slate-400 bg-slate-900 border border-white/10 px-3 py-1 rounded-md shadow-inner">
            SYS TIME: {simulatedTime}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-[11px] text-[#9ada00] font-mono bg-slate-900 border border-[#9ada00]/30 hover:bg-[#9ada00]/10 hover:border-[#9ada00]/60 transition-all px-3 py-1 rounded-md shadow-[0_0_10px_rgba(154,218,0,0.1)]"
          >
            {isPlaying ? "PAUSE_SIM" : "RESUME_SIM"}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-[320px_1fr] flex-1 overflow-hidden">
        {/* Left Side: Patient selector */}
        <div className="border-b md:border-b-0 md:border-r border-white/10 bg-slate-900/30 p-5 overflow-y-auto custom-scrollbar">
          <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-slate-500 font-semibold">
            Active Ward List
          </h3>
          <div className="space-y-3">
            {mockPatients.map((p) => {
              const isSelected = selectedPatient.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePatientSelect(p)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                    isSelected
                      ? "border-[#9ada00]/50 bg-slate-800/80 shadow-[0_0_20px_rgba(154,218,0,0.05)]"
                      : "border-white/5 hover:bg-slate-800/40 hover:border-white/20"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#9ada00]/10 to-transparent opacity-50" />
                  )}
                  
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <h4 className={`text-sm font-semibold transition-colors ${isSelected ? "text-white" : "text-slate-200 group-hover:text-white"}`}>{p.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{p.condition}</p>
                    </div>
                  </div>
                  <div className="relative z-10 mt-4 flex items-center justify-between text-xs text-slate-400">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border ${getRiskColor(
                        p.status
                      )}`}
                    >
                      {p.risk}% RISK
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[11px]">
                      <Activity size={12} className={isSelected ? "text-[#9ada00] animate-pulse" : ""} /> HR: {p.vitals[p.vitals.length - 1].heartRate}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 border-t border-white/10 pt-5 text-[11px] text-slate-500 leading-relaxed font-mono">
            <span className="font-semibold text-slate-400 block mb-2 tracking-wider">SYSTEM_LOG</span>
            Pulse AI reads multimodal history & live telemetry to predict deterioration up to 15 hours before crisis. Select patient to audit reasoning.
          </div>
        </div>

        {/* Right Side: Core interactive panel */}
        <div className="flex flex-col bg-slate-950 overflow-hidden relative">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-[#9ada00]/5 blur-[120px] rounded-full pointer-events-none opacity-50" />

          {/* Patient Panel Info Header */}
          <div className="border-b border-white/10 bg-slate-900/50 p-6 sm:p-8 relative z-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#9ada00] mb-2 block">
                  {selectedPatient.condition}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {selectedPatient.name} <span className="text-slate-500 font-normal ml-2">/ {selectedPatient.age}y</span>
                </h2>
              </div>
              <div className="flex items-center gap-4 bg-slate-900/80 border border-white/10 p-3 rounded-2xl shadow-xl">
                <div className="text-right">
                  <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    AI Assessment
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {selectedPatient.status === "high" ? "Critical Review" : selectedPatient.status === "medium" ? "Elevated Watch" : "Standard Monitoring"}
                  </span>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-slate-950 font-mono font-bold text-lg ${getRiskBg(selectedPatient.status)}`}>
                  {selectedPatient.risk}%
                </div>
              </div>
            </div>

            {/* Action/Tab buttons with Framer Motion */}
            <div className="flex flex-wrap gap-2 mt-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-colors z-10 ${
                      isActive ? "text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-[#9ada00] rounded-full shadow-[0_0_15px_rgba(154,218,0,0.4)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon size={14} className={isActive ? "text-slate-950" : ""} />
                      {tab.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Contents */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto relative z-10 custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === "vitals" && (
                <motion.div 
                  key="vitals"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full gap-6"
                >
                  <div className="flex-1 min-h-[300px] flex flex-col">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                      <Activity size={16} className="text-[#9ada00]" />
                      Live Telemetry & Predictive Risk Curve
                    </h3>
                    <div className="flex-1 w-full bg-slate-900/60 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={selectedPatient.vitals} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                          <YAxis yAxisId="left" stroke="#10b981" fontSize={11} tickLine={false} axisLine={false} domain={[50, 140]} />
                          <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(15, 23, 42, 0.9)",
                              borderColor: "rgba(255,255,255,0.1)",
                              borderRadius: "12px",
                              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
                              fontSize: "12px",
                              color: "#f8fafc",
                              backdropFilter: "blur(8px)"
                            }}
                          />
                          <ReferenceLine yAxisId="left" y={100} stroke="#f43f5e" strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: 'Tachycardia', fill: '#f43f5e', fontSize: 10, position: 'insideTopLeft' }} />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="heartRate"
                            name="Heart Rate (bpm)"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, fill: "#10b981", stroke: "#022c22", strokeWidth: 2 }}
                            style={{ filter: "drop-shadow(0px 0px 4px rgba(16,185,129,0.5))" }}
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="riskScore"
                            name="AI Deterioration Risk (%)"
                            stroke="#f43f5e"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                            style={{ filter: "drop-shadow(0px 0px 4px rgba(244,63,94,0.5))" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-900/60 border border-white/10 p-4 rounded-2xl shadow-lg backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3 opacity-20"><Activity size={24} /></div>
                      <span className="text-[10px] font-mono text-slate-400 block tracking-wider">CURRENT HEART RATE</span>
                      <span className="text-2xl font-bold text-white mt-2 block">
                        {selectedPatient.vitals[selectedPatient.vitals.length - 1].heartRate} <span className="text-sm font-normal text-slate-500">bpm</span>
                      </span>
                    </div>
                    <div className="bg-slate-900/60 border border-white/10 p-4 rounded-2xl shadow-lg backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3 opacity-20"><Activity size={24} /></div>
                      <span className="text-[10px] font-mono text-slate-400 block tracking-wider">CURRENT SPO2</span>
                      <span className="text-2xl font-bold text-white mt-2 block">
                        {selectedPatient.vitals[selectedPatient.vitals.length - 1].spo2} <span className="text-sm font-normal text-slate-500">%</span>
                      </span>
                    </div>
                    <div className="bg-slate-900/60 border border-white/10 p-4 rounded-2xl shadow-lg backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3 opacity-20"><Activity size={24} /></div>
                      <span className="text-[10px] font-mono text-slate-400 block tracking-wider">DETERIORATION TREND</span>
                      <span className={`text-xl font-bold mt-2 block ${selectedPatient.status === 'high' ? 'text-red-400' : selectedPatient.status === 'medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {selectedPatient.status === "high" ? "Upward Spike" : selectedPatient.status === "medium" ? "Slow Rise" : "Flat / Normal"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "agents" && (
                <motion.div 
                  key="agents"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full gap-6"
                >
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Sparkles size={16} className="text-[#9ada00]" />
                    Agentic Discussion & Deliberation Log
                  </h3>
                  <div className="space-y-4">
                    {selectedPatient.agents.map((agent, idx) => (
                      <motion.div
                        key={agent.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                        className="bg-slate-900/60 border border-white/10 p-5 rounded-2xl shadow-lg backdrop-blur-sm relative overflow-hidden group"
                      >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10 flex items-center gap-3 justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 border border-white/10 text-[#9ada00] text-sm font-bold shadow-inner">
                              {agent.avatar}
                            </div>
                            <div>
                              <span className="text-sm font-bold text-white block mb-0.5">{agent.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono tracking-wider">{agent.role}</span>
                            </div>
                          </div>
                          <span
                            className={`inline-flex px-2 py-1 rounded text-[10px] font-mono border uppercase tracking-widest font-semibold ${
                              agent.status === "alert"
                                ? "border-red-500/50 text-red-400 bg-red-500/10 shadow-[0_0_10px_rgba(248,113,113,0.2)]"
                                : agent.status === "info"
                                ? "border-blue-500/50 text-blue-400 bg-blue-500/10 shadow-[0_0_10px_rgba(96,165,250,0.2)]"
                                : "border-emerald-500/50 text-emerald-400 bg-emerald-500/10 shadow-[0_0_10px_rgba(52,211,153,0.2)]"
                            }`}
                          >
                            {agent.status}
                          </span>
                        </div>
                        <p className="relative z-10 mt-4 text-[13px] text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                          {agent.content}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "sbar" && (
                <motion.div 
                  key="sbar"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col h-full gap-6"
                >
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <FileText size={16} className="text-[#9ada00]" />
                    SBAR Handover Report
                  </h3>

                  <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-5">
                    <div>
                      <span className="font-bold text-red-400 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                        [S] Situation
                      </span>
                      <p className="text-[13px] text-slate-200 leading-relaxed pl-3 border-l border-white/10">{selectedPatient.sbar.situation}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 block font-mono text-[11px] uppercase tracking-widest mb-2">
                        [B] Background
                      </span>
                      <p className="text-[13px] text-slate-400 leading-relaxed pl-3 border-l border-white/10">{selectedPatient.sbar.background}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 block font-mono text-[11px] uppercase tracking-widest mb-2">
                        [A] Assessment
                      </span>
                      <p className="text-[13px] text-slate-400 leading-relaxed pl-3 border-l border-white/10">{selectedPatient.sbar.assessment}</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#9ada00] block font-mono text-[11px] uppercase tracking-widest mb-2">
                        [R] Recommendation
                      </span>
                      <p className="text-[13px] text-white font-medium leading-relaxed pl-3 border-l border-[#9ada00]/30">{selectedPatient.sbar.recommendation}</p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `SBAR report for ${selectedPatient.name}:\nS: ${selectedPatient.sbar.situation}\nB: ${selectedPatient.sbar.background}\nA: ${selectedPatient.sbar.assessment}\nR: ${selectedPatient.sbar.recommendation}`
                        );
                        toast.success("SBAR text copied to clipboard!", { className: "bg-slate-900 text-white border-white/10" });
                      }}
                      className="h-11 items-center justify-center rounded-full border border-white/10 bg-slate-800 px-6 text-xs font-semibold text-white hover:bg-slate-700 hover:border-white/20 transition-all hidden sm:inline-flex shadow-lg"
                    >
                      Copy SBAR Text
                    </button>
                    <button
                      onClick={triggerAlert}
                      disabled={alertSent}
                      className={`h-11 inline-flex items-center gap-2 rounded-full px-6 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(154,218,0,0.3)] transition-all ${
                        alertSent
                          ? "bg-emerald-500 hover:bg-emerald-500 cursor-default shadow-none text-white"
                          : selectedPatient.status === "high"
                          ? "bg-red-500 text-white hover:bg-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                          : "bg-[#9ada00] hover:bg-[#aef500] hover:scale-105"
                      }`}
                    >
                      {alertSent ? (
                        <>
                          <CheckCircle size={15} /> Alert Sent Successfully
                        </>
                      ) : (
                        <>
                          <Send size={15} /> Send Priority Alert to Ward
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
