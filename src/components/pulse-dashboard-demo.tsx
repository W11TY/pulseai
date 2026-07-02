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
      // Simulate live vital updates slightly
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
    if (status === "high") return "text-red-500 border-red-500 bg-red-500/10";
    if (status === "medium") return "text-amber-500 border-amber-500 bg-amber-500/10";
    return "text-green-500 border-green-500 bg-green-500/10";
  };

  const getRiskBg = (status: Patient["status"]) => {
    if (status === "high") return "bg-red-500";
    if (status === "medium") return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className="card-elevated overflow-hidden bg-bg-panel border-hairline transition-all duration-300">
      {/* Simulation Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline bg-bg-panel-raised px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-pulse opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent-pulse"></span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            Live Clinical AI Simulation
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-text-muted bg-bg-base border border-hairline px-2 py-0.5 rounded">
            {simulatedTime}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-[10px] text-accent-pulse font-mono bg-bg-base border border-hairline px-2 py-0.5 rounded"
          >
            {isPlaying ? "Pause" : "Resume"}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-3">
        {/* Left Side: Patient selector */}
        <div className="border-b md:border-b-0 md:border-r border-hairline bg-bg-base p-4">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-text-muted">
            Active Ward / Outpatients
          </h3>
          <div className="space-y-2">
            {mockPatients.map((p) => {
              const isSelected = selectedPatient.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePatientSelect(p)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                    isSelected
                      ? "border-accent-pulse bg-bg-panel-raised shadow-sm"
                      : "border-hairline hover:bg-bg-panel hover:border-text-muted/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">{p.name}</h4>
                      <p className="text-xs text-text-muted mt-0.5">{p.condition}</p>
                    </div>
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono border ${getRiskColor(
                        p.status
                      )}`}
                    >
                      {p.risk}% Risk
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-text-muted">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock size={12} /> Age {p.age}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Activity size={12} /> HR: {p.vitals[p.vitals.length - 1].heartRate} bpm
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 border-t border-hairline pt-4 text-xs text-text-muted leading-relaxed">
            <span className="font-semibold text-text-primary block mb-1">Clinical Context</span>
            Pulse AI constantly reads patient history and live streams to find risk patterns that standard alerts miss. Select patients above to audit the AI's logic.
          </div>
        </div>

        {/* Right Side: Core interactive panel */}
        <div className="col-span-2 flex flex-col bg-bg-panel">
          {/* Patient Panel Info Header */}
          <div className="border-b border-hairline bg-bg-base p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-accent-pulse">
                  {selectedPatient.condition}
                </span>
                <h2 className="text-xl font-bold text-text-primary mt-1">
                  {selectedPatient.name}, {selectedPatient.age} years old
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="block text-[10px] font-mono text-text-muted uppercase">
                    Risk Assessment
                  </span>
                  <span className="text-sm font-bold text-text-primary">
                    {selectedPatient.status === "high" ? "Critical Review" : selectedPatient.status === "medium" ? "Elevated Watch" : "Standard Monitoring"}
                  </span>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-full text-white font-mono font-bold text-lg ${getRiskBg(selectedPatient.status)}`}>
                  {selectedPatient.risk}%
                </div>
              </div>
            </div>

            {/* Action/Tab buttons */}
            <div className="flex flex-wrap gap-2 mt-4 border-t border-hairline pt-4">
              <button
                onClick={() => setActiveTab("vitals")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  activeTab === "vitals"
                    ? "bg-text-primary text-background border-text-primary"
                    : "bg-bg-base border-hairline text-text-primary hover:bg-bg-panel"
                }`}
              >
                <Activity size={14} />
                Live Vitals Chart
              </button>
              <button
                onClick={() => setActiveTab("agents")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  activeTab === "agents"
                    ? "bg-text-primary text-background border-text-primary"
                    : "bg-bg-base border-hairline text-text-primary hover:bg-bg-panel"
                }`}
              >
                <MessageSquare size={14} />
                Clinical Agent Reasonings
              </button>
              <button
                onClick={() => setActiveTab("sbar")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  activeTab === "sbar"
                    ? "bg-text-primary text-background border-text-primary"
                    : "bg-bg-base border-hairline text-text-primary hover:bg-bg-panel"
                }`}
              >
                <FileText size={14} />
                AI Handover Report (SBAR)
              </button>
            </div>
          </div>

          {/* Tab Contents */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            {activeTab === "vitals" && (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2 mb-4">
                    <Activity size={16} className="text-accent-pulse animate-pulse" />
                    Patient Vital Sign Stream & Predicted Risk Curve
                  </h3>
                  <div className="h-48 md:h-64 w-full bg-bg-base border border-hairline rounded-xl p-2 md:p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={selectedPatient.vitals}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--hairline)" />
                        <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                        <YAxis yAxisId="left" stroke="#1F8A5C" fontSize={11} tickLine={false} domain={[50, 140]} />
                        <YAxis yAxisId="right" orientation="right" stroke="var(--text-muted)" fontSize={11} tickLine={false} domain={[0, 100]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--bg-panel)",
                            borderColor: "var(--hairline)",
                            borderRadius: "8px",
                            fontSize: "12px",
                            color: "var(--text-primary)"
                          }}
                        />
                        <ReferenceLine yAxisId="left" y={100} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: 'Tachycardia Threshold', fill: '#f43f5e', fontSize: 9 }} />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="heartRate"
                          name="Heart Rate (bpm)"
                          stroke="#1F8A5C"
                          strokeWidth={2}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="spo2"
                          name="Oxygen SpO2 (%)"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="riskScore"
                          name="AI Deterioration Risk (%)"
                          stroke="#f43f5e"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="bg-bg-base border border-hairline p-3 rounded-lg">
                    <span className="text-[10px] font-mono text-text-muted block">CURRENT HEART RATE</span>
                    <span className="text-lg font-bold text-text-primary mt-1 block">
                      {selectedPatient.vitals[selectedPatient.vitals.length - 1].heartRate} <span className="text-xs font-normal text-text-muted">bpm</span>
                    </span>
                  </div>
                  <div className="bg-bg-base border border-hairline p-3 rounded-lg">
                    <span className="text-[10px] font-mono text-text-muted block">CURRENT SPO2</span>
                    <span className="text-lg font-bold text-text-primary mt-1 block">
                      {selectedPatient.vitals[selectedPatient.vitals.length - 1].spo2} <span className="text-xs font-normal text-text-muted">%</span>
                    </span>
                  </div>
                  <div className="bg-bg-base border border-hairline p-3 rounded-lg">
                    <span className="text-[10px] font-mono text-text-muted block">DETERIORATION TREND</span>
                    <span className={`text-lg font-bold mt-1 block ${selectedPatient.status === 'high' ? 'text-red-500' : selectedPatient.status === 'medium' ? 'text-amber-500' : 'text-green-500'}`}>
                      {selectedPatient.status === "high" ? "Upward Spike" : selectedPatient.status === "medium" ? "Slow Rise" : "Flat / Normal"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "agents" && (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-accent-pulse" />
                    Agentic Discussion & Deliberation Log
                  </h3>
                  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                    {selectedPatient.agents.map((agent) => (
                      <div
                        key={agent.name}
                        className="bg-bg-base border border-hairline p-4 rounded-xl shadow-sm animate-fade-in"
                      >
                        <div className="flex items-center gap-2 justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-pulse-bright/20 text-accent-pulse text-xs font-bold">
                              {agent.avatar}
                            </div>
                            <div>
                              <span className="text-sm font-bold text-text-primary">{agent.name}</span>
                              <span className="text-[10px] text-text-muted block -mt-0.5">{agent.role}</span>
                            </div>
                          </div>
                          <span
                            className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-mono border uppercase tracking-wider ${
                              agent.status === "alert"
                                ? "border-red-500/20 text-red-500 bg-red-500/5"
                                : agent.status === "info"
                                ? "border-blue-500/20 text-blue-500 bg-blue-500/5"
                                : "border-green-500/20 text-green-500 bg-green-500/5"
                            }`}
                          >
                            {agent.status}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-text-muted leading-relaxed">
                          {agent.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "sbar" && (
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                    <FileText size={16} className="text-accent-pulse" />
                    SBAR Handover Report Drafted by Synthesis Agent
                  </h3>

                  <div className="bg-bg-base border border-hairline rounded-xl p-4 text-xs space-y-3">
                    <div>
                      <span className="font-bold text-red-500 block font-mono text-[10px] uppercase">
                        [S] Situation
                      </span>
                      <p className="mt-1 text-text-primary">{selectedPatient.sbar.situation}</p>
                    </div>
                    <div className="border-t border-hairline pt-2">
                      <span className="font-bold text-text-primary block font-mono text-[10px] uppercase">
                        [B] Background
                      </span>
                      <p className="mt-1 text-text-muted">{selectedPatient.sbar.background}</p>
                    </div>
                    <div className="border-t border-hairline pt-2">
                      <span className="font-bold text-text-primary block font-mono text-[10px] uppercase">
                        [A] Assessment
                      </span>
                      <p className="mt-1 text-text-muted">{selectedPatient.sbar.assessment}</p>
                    </div>
                    <div className="border-t border-hairline pt-2">
                      <span className="font-bold text-accent-pulse block font-mono text-[10px] uppercase">
                        [R] Recommendation
                      </span>
                      <p className="mt-1 text-text-primary font-medium">{selectedPatient.sbar.recommendation}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `SBAR report for ${selectedPatient.name}:\nS: ${selectedPatient.sbar.situation}\nB: ${selectedPatient.sbar.background}\nA: ${selectedPatient.sbar.assessment}\nR: ${selectedPatient.sbar.recommendation}`
                      );
                      toast.success("SBAR text copied to clipboard!");
                    }}
                    className="h-10 items-center justify-center rounded-full border border-hairline bg-bg-base px-4 text-xs font-medium text-text-primary hover:bg-bg-panel hidden sm:inline-flex"
                  >
                    Copy SBAR Text
                  </button>
                  <button
                    onClick={triggerAlert}
                    disabled={alertSent}
                    className={`h-10 inline-flex items-center gap-1.5 rounded-full px-5 text-xs font-semibold text-white shadow-sm transition-colors ${
                      alertSent
                        ? "bg-green-600 hover:bg-green-600 cursor-default"
                        : selectedPatient.status === "high"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-accent-pulse hover:bg-[#196f4a]"
                    }`}
                  >
                    {alertSent ? (
                      <>
                        <CheckCircle size={14} /> Alert Sent
                      </>
                    ) : (
                      <>
                        <Send size={14} /> Send Priority Alert to Ward
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
