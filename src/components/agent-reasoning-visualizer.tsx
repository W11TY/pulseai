import { useState } from "react";
import {
  BrainCircuit,
  Activity,
  FileText,
  Pill,
  Sparkles,
  TrendingUp,
  FileCode,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

interface AgentNode {
  id: string;
  name: string;
  icon: any;
  inputSource: string;
  deliberation: string;
  riskWeight: string;
  clinicalRationals: string[];
}

const agents: AgentNode[] = [
  {
    id: "vitals",
    name: "Vitals Agent",
    icon: Activity,
    inputSource: "Continuous monitoring devices, EHR vitals records (temp, heart rate, blood pressure, SpO2, respiratory rate)",
    deliberation: "Calculates physiologic drift. Evaluates vital trends using clinical markers (SIRS, qSOFA). Recognizes minor but correlated changes (e.g. slight respiratory rate rise paired with minor SpO2 dip).",
    riskWeight: "Medium-High (Physiological state indicator)",
    clinicalRationals: [
      "Tracks heart rate variability over 24 hours to find autonomic stress",
      "Calculates hypoxia risk from cumulative SpO2 dip durations",
      "Flags respiratory rate elevation above 20 breaths/min as an early signal"
    ]
  },
  {
    id: "meds",
    name: "Medication & History Agent",
    icon: Pill,
    inputSource: "Active prescription lists, chemotherapy protocol dates, contraindications databases, past histories",
    deliberation: "Contextualizes physiological trends. A heart rate spike is normal post-exercise, but highly concerning 6 days post-chemo (neutropenic nadir window). Evaluates drug interaction flags.",
    riskWeight: "Medium (Contextual baseline)",
    clinicalRationals: [
      "Flags drug-induced immunosuppression status (nadir period)",
      "Highlights cardiotoxicity warnings on active drug regimens",
      "Monitors medication compliance logs for gaps in therapy"
    ]
  },
  {
    id: "notes",
    name: "Note Analysis Agent",
    icon: FileText,
    inputSource: "Unstructured clinician nursing notes, caregiver home logs, patient symptom surveys, call logs",
    deliberation: "Applies clinical NLP to parse qualitative complaints. Identifies flags like 'chills', 'confusion', or 'decreased drinking' which don't show up on a standard heart rate monitor.",
    riskWeight: "Medium (Qualitative symptoms)",
    clinicalRationals: [
      "Parses phone logs for early symptoms like 'shivering' or 'chills'",
      "Extracts patient-reported fatigue levels and grades severity",
      "Evaluates cognitive changes or confusion mentioned in nursing handovers"
    ]
  },
  {
    id: "synthesis",
    name: "Risk Synthesis Agent",
    icon: Sparkles,
    inputSource: "Evaluations and confidence weights from all specialized agents",
    deliberation: "Fuses evidence using a calibrated clinical model. Re-weighs individual signals: a SpO2 of 92% is flagged, but when combined with chemotherapy nadir status and reported chills, it triggers a critical escalation recommendation.",
    riskWeight: "Final Output (Synthesis & auditable justification)",
    clinicalRationals: [
      "Combines independent agent findings into a single risk probability",
      "Translates raw model weights into natural language clinical justifications",
      "Formats output into standard clinical SBAR structure for instant clinician review"
    ]
  }
];

export function AgentReasoningVisualizer() {
  const [activeAgent, setActiveAgent] = useState<AgentNode>(agents[0]);

  return (
    <div className="card-elevated bg-bg-panel border-hairline overflow-hidden p-6 transition-colors duration-300">
      <div className="mb-6">
        <span className="font-mono text-xs uppercase tracking-wider text-accent-pulse">
          Interactive Architecture Map
        </span>
        <h3 className="text-xl font-bold text-text-primary mt-1">
          Multi-Agent Deliberation Flow
        </h3>
        <p className="text-sm text-text-muted mt-2">
          Pulse AI doesn't calculate one simple score. It deploys specialized reasoning agents that analyze clinical aspects independently before synthesizing an audited consensus. Click an agent below to see how it operates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Agent Selection List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-2">
            Reasoning Agents
          </div>
          {agents.map((agent) => {
            const Icon = agent.icon;
            const isActive = activeAgent.id === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => setActiveAgent(agent)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                  isActive
                    ? "border-accent-pulse bg-bg-base shadow-sm ring-1 ring-accent-pulse/30"
                    : "border-hairline bg-bg-base hover:bg-bg-panel-raised"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${isActive ? "bg-accent-pulse text-white" : "bg-bg-panel text-text-muted"}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary">{agent.name}</h4>
                    <p className="text-xs text-text-muted mt-0.5">
                      {agent.id === 'synthesis' ? 'Synthesis Layer' : 'Specialized Evaluator'}
                    </p>
                  </div>
                </div>
                <ChevronRight size={16} className={`text-text-muted transition-transform ${isActive ? "translate-x-1 text-accent-pulse" : ""}`} />
              </button>
            );
          })}
        </div>

        {/* Right Side: Detailed Agent Inspection Panel */}
        <div className="lg:col-span-7 bg-bg-base border border-hairline rounded-2xl p-6">
          <div className="flex items-center gap-3 border-b border-hairline pb-4 mb-4">
            <div className="p-3 rounded-xl bg-accent-pulse-bright/10 text-accent-pulse">
              <activeAgent.icon size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary">{activeAgent.name}</h3>
              <p className="text-xs text-text-muted">Clinical Subsystem Specification</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="font-mono text-[10px] uppercase text-text-muted block">
                Primary Data Ingestion
              </span>
              <p className="text-xs text-text-primary mt-1 font-medium bg-bg-panel p-2.5 rounded border border-hairline">
                {activeAgent.inputSource}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase text-text-muted block">
                Clinical Deliberation Mechanism
              </span>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">
                {activeAgent.deliberation}
              </p>
            </div>

            <div className="border-t border-hairline pt-4">
              <span className="font-mono text-[10px] uppercase text-text-muted block mb-2">
                Core Clinical Rules Applied
              </span>
              <ul className="space-y-2">
                {activeAgent.clinicalRationals.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-text-muted">
                    <ShieldCheck size={14} className="text-accent-pulse flex-shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-hairline pt-4 flex items-center justify-between text-xs">
              <span className="font-mono text-[10px] uppercase text-text-muted">
                Influence on Final Consensus
              </span>
              <span className="font-semibold text-accent-pulse bg-accent-pulse/10 border border-accent-pulse/25 px-2 py-0.5 rounded-full">
                {activeAgent.riskWeight}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
